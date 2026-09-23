import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { isChainId, unlockChain } from "../../../lib/cadenas/chains";
import { getPublicRestorationState } from "../../../lib/200325/restoration";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const fragments = await getPublicRestorationState(env);
  if (!fragments.every((fragment) => fragment.unlocked))
    return Response.json({ error: "La cámara sigue sellada" }, { status: 403 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Llave incompatible" }, { status: 400 });
  }

  const { chain, code } = (body ?? {}) as Record<string, unknown>;
  if (!isChainId(chain) || typeof code !== "string")
    return Response.json({ error: "Llave incompatible" }, { status: 400 });

  const chainState = await unlockChain(env, chain, code);
  if (!chainState)
    return Response.json({ error: "Llave incompatible" }, { status: 400 });

  return Response.json(
    { chains: chainState, unlocked: chain },
    { headers: { "Cache-Control": "no-store" } },
  );
};
