/**
 * Pure helpers for admin / trusted onboarding emails (safe for scripts + server).
 */

function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function normalizeTrustedEmail(email: string | null | undefined): string {
  return (email ?? '').trim().toLowerCase();
}

/**
 * Emails treated as admin submitters for onboarding (rate-limit bypass + auto-publish).
 * Includes ADMIN_SUBMITTER_EMAIL and optional ADMIN_TRUSTED_EMAILS (comma-separated).
 */
export function getTrustedSubmitterEmails(): string[] {
  const primary =
    normalizeTrustedEmail(readEnv(process.env.ADMIN_SUBMITTER_EMAIL)) ||
    'info@movetrusthub.com';
  const fromEnv =
    process.env.ADMIN_TRUSTED_EMAILS?.split(',')
      .map((e) => normalizeTrustedEmail(e))
      .filter(Boolean) ?? [];
  const set = new Set<string>(fromEnv);
  if (primary) set.add(primary);
  set.add('info@movetrusthub.com');
  return [...set];
}

export function isTrustedSubmitterEmail(email: string | null | undefined): boolean {
  const normalized = normalizeTrustedEmail(email);
  if (!normalized) return false;
  return getTrustedSubmitterEmails().includes(normalized);
}
