import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { isFragmentId, restoreFragment } from "../../../lib/200325/restoration";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Código incompatible" }, { status: 400 });
  }

  const { fragment, code } = (body ?? {}) as Record<string, unknown>;
  if (!isFragmentId(fragment) || typeof code !== "string")
    return Response.json({ error: "Código incompatible" }, { status: 400 });

  const fragments = await restoreFragment(env, fragment, code);
  if (!fragments)
    return Response.json({ error: "Código incompatible" }, { status: 400 });

  return Response.json(
    { fragments, restored: fragment },
    { headers: { "Cache-Control": "no-store" } },
  );
};
