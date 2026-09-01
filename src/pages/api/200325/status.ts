import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getPublicRestorationState } from "../../../lib/200325/restoration";

export const prerender = false;

export const GET: APIRoute = async () =>
  Response.json(
    { fragments: await getPublicRestorationState(env) },
    { headers: { "Cache-Control": "no-store" } },
  );
