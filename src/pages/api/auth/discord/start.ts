import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { setOAuthState } from "../../../../lib/discord/session.ts";

export const prerender = false;

const VALID_HOUSES = new Set(["febe", "jano", "dione", "rea"]);

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const raw = url.searchParams.get("house");
  const house = raw && VALID_HOUSES.has(raw) ? raw : null;
  const state = await setOAuthState(cookies, env.SESSION_SECRET, house);
  const redirectUri = new URL(
    "/api/auth/discord/callback",
    url.origin,
  ).toString();

  const authUrl = new URL("https://discord.com/api/oauth2/authorize");
  authUrl.searchParams.set("client_id", env.DISCORD_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "identify");
  authUrl.searchParams.set("state", state);

  return redirect(authUrl.toString());
};
