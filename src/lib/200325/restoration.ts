export const fragmentIds = [1, 2, 3] as const;
export type FragmentId = (typeof fragmentIds)[number];

type RestorationEnv = {
  legionLunariHouses: D1Database;
  RESTORATION_CODE_1?: string;
  RESTORATION_CODE_2?: string;
  RESTORATION_CODE_3?: string;
};

export type PublicFragmentState = {
  id: FragmentId;
  unlocked: boolean;
  code: string | null;
};

export const isFragmentId = (value: unknown): value is FragmentId =>
  typeof value === "number" && fragmentIds.includes(value as FragmentId);

function codeFor(env: RestorationEnv, fragment: FragmentId) {
  return env[`RESTORATION_CODE_${fragment}` as const];
}

/** Returns only codes whose fragment has already been made public. */
export async function getPublicRestorationState(
  env: RestorationEnv,
): Promise<PublicFragmentState[]> {
  const result = await env.legionLunariHouses
    .prepare(
      "SELECT fragment, unlocked FROM restoration_fragments WHERE fragment IN (1, 2, 3)",
    )
    .all<{ fragment: number; unlocked: number }>();
  const unlocked = new Set(
    result.results.filter((row) => row.unlocked === 1).map((row) => row.fragment),
  );

  return fragmentIds.map((id) => ({
    id,
    unlocked: unlocked.has(id),
    code: unlocked.has(id) ? codeFor(env, id) ?? null : null,
  }));
}

/**
 * Codes are compared directly; do not trim, case-fold, or normalize this input.
 */
export async function restoreFragment(
  env: RestorationEnv,
  fragment: FragmentId,
  submittedCode: string,
) {
  const current = await getPublicRestorationState(env);
  if (current.find((item) => item.id === fragment)?.unlocked) return current;

  const configuredCode = codeFor(env, fragment);
  if (configuredCode === undefined || submittedCode !== configuredCode)
    return null;

  await env.legionLunariHouses
    .prepare(
      `INSERT INTO restoration_fragments (fragment, unlocked, unlocked_at)
       VALUES (?, 1, ?)
       ON CONFLICT(fragment) DO UPDATE SET
         unlocked = 1,
         unlocked_at = COALESCE(restoration_fragments.unlocked_at, excluded.unlocked_at)`,
    )
    .bind(fragment, new Date().toISOString())
    .run();

  return getPublicRestorationState(env);
}
