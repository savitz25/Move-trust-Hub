/**
 * Next.js startup hook — env sanity check on Node runtime only.
 * Non-strict so `next build` succeeds without every optional secret.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const { validateEnv } = await import('@/lib/lender/env');
  validateEnv({ strict: false });
}