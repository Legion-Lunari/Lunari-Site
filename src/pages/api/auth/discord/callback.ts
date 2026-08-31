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

const VALID_HOUSES = new Set(["febe", "jano", "dione", "rea"]);

const getRoleId = (house: string) =>
  ({
    febe: env.ROLE_ID_FEBE,
    jano: env.ROLE_ID_JANO,
    dione: env.ROLE_ID_DIONE,
    rea: env.ROLE_ID_REA,
  })[house];

const getHouseFromMemberRoles = (roleIds: string[]) =>
  (["febe", "jano", "dione", "rea"] as const).find((house) => {
    const roleId = getRoleId(house);
    return roleId ? roleIds.includes(roleId) : false;
  }) ?? null;

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

    const existing = await env.legionLunariHouses
      .prepare("SELECT house from house_claims WHERE discord_id = ? LIMIT 1")
      .bind(discordUser.id)
      .first<{ house: string }>();

    // A stored claim is authoritative. Never let OAuth state or a quiz result
    // replace it; role assignment is a PUT, so ensuring the existing role is
    // safely idempotent.
    if (existing) {
      const roleId = getRoleId(existing.house);
      if (!roleId)
        throw new Error(`invalid stored house claim: ${existing.house}`);

      const member = await getGuildMember(
        env.DISCORD_GUILD_ID,
        discordUser.id,
        env.DISCORD_BOT_TOKEN,
      );
      if (!member) {
        await setHouseSession(cookies, env.SESSION_SECRET, discordUser.id);
        return redirect(
          `/quiz-de-casas?join_required=1&house=${encodeURIComponent(existing.house)}`,
        );
      }

      await assignRole(
        env.DISCORD_GUILD_ID,
        discordUser.id,
        roleId,
        env.DISCORD_BOT_TOKEN,
      );
      await setHouseSession(cookies, env.SESSION_SECRET, discordUser.id);
      return redirect("/quiz-de-casas?claimed=1&existing_claim=1");
    }

    const requestedHouse = state.house;
    if (!requestedHouse || !VALID_HOUSES.has(requestedHouse)) {
      // House-less recovery can import a legacy Discord role once, but only
      // when no D1 claim exists (the existing-claim branch returned above).
      const member = await getGuildMember(
        env.DISCORD_GUILD_ID,
        discordUser.id,
        env.DISCORD_BOT_TOKEN,
      );
      const roleHouse = member ? getHouseFromMemberRoles(member.roles) : null;

      if (roleHouse) {
        await env.legionLunariHouses
          .prepare(
            "INSERT INTO house_claims (discord_id, house, discord_username, claimed_at) values (?, ?, ?, ?)",
          )
          .bind(discordUser.id, roleHouse, discordUser.username, Date.now())
          .run();
        await setHouseSession(cookies, env.SESSION_SECRET, discordUser.id);
        return redirect("/quiz-de-casas?claimed=1&recovered_role=1");
      }

      // No stored claim and no matching Discord role: authenticate without
      // assigning a role or creating a claim.
      await setHouseSession(cookies, env.SESSION_SECRET, discordUser.id);
      return redirect("/quiz-de-casas?no_claim=1");
    }

    const member = await getGuildMember(
      env.DISCORD_GUILD_ID,
      discordUser.id,
      env.DISCORD_BOT_TOKEN,
    );
    if (!member) {
      return redirect(
        `/quiz-de-casas?join_required=1&house=${encodeURIComponent(requestedHouse)}`,
      );
    }

    const roleId = getRoleId(requestedHouse);
    if (!roleId)
      throw new Error(`missing role configuration for ${requestedHouse}`);

    // First-time claim: assign the verified house role, then persist it. The
    // primary key on discord_id prevents duplicate rows on a later same-house claim.
    await assignRole(
      env.DISCORD_GUILD_ID,
      discordUser.id,
      roleId,
      env.DISCORD_BOT_TOKEN,
    );
    await env.legionLunariHouses
      .prepare(
        "INSERT INTO house_claims (discord_id, house, discord_username, claimed_at) values (?, ?, ?, ?)",
      )
      .bind(discordUser.id, requestedHouse, discordUser.username, Date.now())
      .run();

    await setHouseSession(cookies, env.SESSION_SECRET, discordUser.id);
    return redirect(`/quiz-de-casas?claimed=1`);
  } catch (e) {
    console.error("[discord oauth callback]", e);
    return redirect("/quiz-de-casas?auth_error=1");
  }
};
