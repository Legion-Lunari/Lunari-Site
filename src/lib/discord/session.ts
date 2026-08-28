import type { AstroCookies } from "astro";
import { signPayload, verifyPayload } from "./sign.ts";

const STATE_COOKIE = "ll_oauth_state";
const SESSION_COOKIE = "ll_house";
const secureCookies = !import.meta.env.DEV;

export const setOAuthState = async (
  cookies: AstroCookies,
  secret: string,
  house: string | null,
) => {
  const payload = {
    house,
    nonce: crypto.randomUUID(),
    exp: Date.now() + 10 + 60 * 1000,
  };

  const token = await signPayload(payload, secret);

  cookies.set(STATE_COOKIE, token, {
    httpOnly: true,
    secure: secureCookies,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return token;
};

export const readOAuthState = async (
  cookies: AstroCookies,
  secret: string,
  incomingState: string | null,
) => {
  const token = cookies.get(STATE_COOKIE)?.value;
  cookies.delete(STATE_COOKIE, { path: "/" });

  if (!token || !incomingState || token !== incomingState) return null;

  const payload = await verifyPayload<{
    house: string | null;
    nonce: string;
    exp: number;
  }>(token, secret);

  if (!payload || payload.exp < Date.now()) return null;

  return payload;
};

export const setHouseSession = async (
  cookies: AstroCookies,
  secret: string,
  discordId: string,
) => {
  // The database is the claim source of truth; this cookie only identifies the
  // Discord user whose stored claim may be restored.
  const token = await signPayload({ discordId }, secret);
  cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: secureCookies,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
};

export const readHouseSession = async (
  cookies: AstroCookies,
  secret: string,
) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  return verifyPayload<{ discordId: string }>(token, secret);
};
