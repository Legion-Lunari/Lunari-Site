import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getPublicRestorationState } from "../../../lib/200325/restoration";
import { getPublicChainState } from "../../../lib/cadenas/chains";

export const prerender = false;

export const GET: APIRoute = async () => {
  const fragments = await getPublicRestorationState(env);
  if (!fragments.every((fragment) => fragment.unlocked))
    return Response.json({ error: "La cámara sigue sellada" }, { status: 403 });

  return Response.json(
    { chains: await getPublicChainState(env) },
    { headers: { "Cache-Control": "no-store" } },
  );
};
