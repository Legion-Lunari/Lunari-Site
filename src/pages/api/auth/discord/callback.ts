import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import {
  readOAuthState,
  setHouseSession,
} from "../../../../lib/discord/session.ts";
import {
  assignRole,
  exchangeCode,
  fetchDiscordUser,
  getGuildMember,
} from "../../../../lib/discord/api.ts";

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get("code");
  const stateParam = url.searchParams.get("state");

  if (url.searchParams.get("error"))
    return redirect("/quiz-de-casas?auth-error=1");

  const state = await readOAuthState(cookies, env.SESSION_SECRET, stateParam);
  if (!state || !code) return redirect("/quiz-de-casas?auth-error=1");

  const redirectUri = new URL(
    "/api/auth/discord/callback",
    url.origin,
  ).toString();
  try {
    const { access_token: accessToken } = await exchangeCode({
      code,
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      redirectUri: redirectUri,
    });

    const discordUser = await fetchDiscordUser(accessToken);

    // we ask what's already on the DB and reuse that if it's populated for the specific user
    const existing = await env.legionLunariHouses
      .prepare("SELECT house from house_claims WHERE discord_id = ? LIMIT 1")
      .bind(discordUser.id)
      .first<{ house: string }>();
    const house = existing?.house ?? state.house;

    if (!existing) {
      if (!house) {
        return redirect("/quiz-de-casas?no_claim=1");
      }

      const member = await getGuildMember(
        env.DISCORD_GUILD_ID,
        discordUser.id,
        env.DISCORD_BOT_TOKEN,
      );

      if (!member) {
        return redirect(`/quiz-de-casas?join_required=1&house=${house}`);
      }

      await env.legionLunariHouses
        .prepare(
          "INSERT INTO house_claims (discord_id, house, discord_username, claimed_at) values (?, ?, ?, ?)",
        )
        .bind(discordUser.id, house, discordUser.username, Date.now())
        .run();

      const roleId = {
        febe: env.ROLE_ID_FEBE,
        jano: env.ROLE_ID_JANO,
        dione: env.ROLE_ID_DIONE,
        rea: env.ROLE_ID_REA,
      }[house];

      if (roleId) {
        try {
          await assignRole(
            env.DISCORD_GUILD_ID,
            discordUser.id,
            roleId,
            env.DISCORD_BOT_TOKEN,
          );
        } catch (e) {
          console.error("[discord role assign]", e);
        }
      }
    }

    await setHouseSession(cookies, env.SESSION_SECRET, discordUser.id, house!);
    return redirect(`/quiz-de-casas?claimed=1`);
  } catch (e) {
    console.error("[discord oauth callback]", e);
    return redirect("/quiz-de-casas?auth_error=1");
  }
};
