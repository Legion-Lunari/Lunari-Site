export const chains = [
  { id: 1, limb: "Muñeca izquierda" },
  { id: 2, limb: "Muñeca derecha" },
  { id: 3, limb: "Tobillo izquierdo" },
  { id: 4, limb: "Tobillo derecho" },
] as const;

export const chainIds = [1, 2, 3, 4] as const;
export type ChainId = (typeof chainIds)[number];

type ChainsEnv = {
  legionLunariHouses: D1Database;
  CHAIN_CODE_1?: string;
  CHAIN_CODE_2?: string;
  CHAIN_CODE_3?: string;
  CHAIN_CODE_4?: string;
};

export type PublicChainState = {
  id: ChainId;
  unlocked: boolean;
  code: string | null;
};

export const isChainId = (value: unknown): value is ChainId =>
  typeof value === "number" && chainIds.includes(value as ChainId);

function codeFor(env: ChainsEnv, chain: ChainId) {
  return env[`CHAIN_CODE_${chain}` as const];
}

/** Returns codes only after their corresponding chain has been broken. */
export async function getPublicChainState(
  env: ChainsEnv,
): Promise<PublicChainState[]> {
  const result = await env.legionLunariHouses
    .prepare(
      "SELECT chain, unlocked FROM chain_locks WHERE chain IN (1, 2, 3, 4)",
    )
    .all<{ chain: number; unlocked: number }>();
  const unlocked = new Set(
    result.results.filter((row) => row.unlocked === 1).map((row) => row.chain),
  );

  return chainIds.map((id) => ({
    id,
    unlocked: unlocked.has(id),
    code: unlocked.has(id) ? (codeFor(env, id) ?? null) : null,
  }));
}

export async function unlockChain(
  env: ChainsEnv,
  chain: ChainId,
  submittedCode: string,
) {
  const current = await getPublicChainState(env);
  if (current.find((item) => item.id === chain)?.unlocked) return current;

  const configuredCode = codeFor(env, chain);
  if (configuredCode === undefined) return null;

  if (submittedCode.toLowerCase() !== configuredCode.toLowerCase()) return null;

  await env.legionLunariHouses
    .prepare(
      `INSERT INTO chain_locks (chain, unlocked, unlocked_at)
       VALUES (?, 1, ?)
       ON CONFLICT(chain) DO UPDATE SET
         unlocked = 1,
         unlocked_at = COALESCE(chain_locks.unlocked_at, excluded.unlocked_at)`,
    )
    .bind(chain, new Date().toISOString())
    .run();

  return getPublicChainState(env);
}
