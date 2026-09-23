import { timingSafeEqual } from 'node:crypto';

export const SENTRY_PROBE_ERROR_NAME = 'AthRel002AProbeError';
export const SENTRY_PROBE_ERROR_MESSAGE = 'ATH-REL-002A controlled Sentry probe';

type ProbeEnv = Record<string, string | undefined>;

function timingSafeEqualText(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function sentryProbeEnabled(env: ProbeEnv = process.env): boolean {
  return env.SENTRY_PROBE_ENABLED === 'true';
}

export function sentryProbeAuthorized(
  header: string | null | undefined,
  env: ProbeEnv = process.env,
): boolean {
  const expected = (env.SENTRY_PROBE_SECRET || env.ATH_OPERATOR_SECRET || '').trim();
  if (!expected || expected.length < 16) return false;
  const got = header?.startsWith('Bearer ') ? header.slice(7) : '';
  if (!got || got.length !== expected.length) return false;
  return timingSafeEqualText(got, expected);
}

export function createSentryProbeError(): Error {
  const error = new Error(SENTRY_PROBE_ERROR_MESSAGE);
  error.name = SENTRY_PROBE_ERROR_NAME;
  return error;
}
