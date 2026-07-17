import 'server-only';

import { createHash, randomBytes } from 'crypto';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';

export type PortalMfaStatus = {
  enabled: boolean;
  factorId: string | null;
  factorFriendlyName: string | null;
  currentLevel: 'aal1' | 'aal2' | null;
  nextLevel: 'aal1' | 'aal2' | null;
  needsChallenge: boolean;
  backupCodesRemaining: number;
};

const BACKUP_META_KEY = 'portal_mfa_backup_hashes';

export function hashBackupCode(code: string): string {
  return createHash('sha256').update(code.trim().toUpperCase()).digest('hex');
}

/** Generate 8 single-use backup codes (XXXX-XXXX). */
export function generateBackupCodes(count = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const raw = randomBytes(4).toString('hex').toUpperCase();
    codes.push(`${raw.slice(0, 4)}-${raw.slice(4, 8)}`);
  }
  return codes;
}

export async function getPortalMfaStatus(): Promise<PortalMfaStatus | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: factorsData }, { data: aalData }] = await Promise.all([
    supabase.auth.mfa.listFactors(),
    supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
  ]);

  const verified = factorsData?.totp?.filter((f) => f.status === 'verified') ?? [];
  const primary = verified[0] ?? null;
  const currentLevel = (aalData?.currentLevel as 'aal1' | 'aal2' | null) ?? null;
  const nextLevel = (aalData?.nextLevel as 'aal1' | 'aal2' | null) ?? null;
  const needsChallenge =
    Boolean(primary) && nextLevel === 'aal2' && currentLevel !== 'aal2';

  const hashes = readBackupHashes(user.user_metadata);

  return {
    enabled: verified.length > 0,
    factorId: primary?.id ?? null,
    factorFriendlyName: primary?.friendly_name ?? null,
    currentLevel,
    nextLevel,
    needsChallenge,
    backupCodesRemaining: hashes.length,
  };
}

function readBackupHashes(meta: Record<string, unknown> | undefined): string[] {
  const raw = meta?.[BACKUP_META_KEY];
  if (!Array.isArray(raw)) return [];
  return raw.filter((h): h is string => typeof h === 'string' && h.length > 0);
}

/**
 * After magic-link/OAuth session creation: if portal destination and MFA enrolled,
 * send user to the challenge step before the dashboard.
 */
export async function portalPathAfterAuth(nextPath: string): Promise<string> {
  const next = sanitizePostLoginPath(nextPath);
  if (!next.startsWith('/portal')) return next;

  // Never bounce the MFA page itself
  if (next.startsWith('/portal/mfa') || next.startsWith('/portal/login')) {
    return next;
  }

  try {
    const status = await getPortalMfaStatus();
    if (status?.needsChallenge) {
      return `/portal/mfa?next=${encodeURIComponent(next)}`;
    }
  } catch {
    // If status fails, still try aal next-level check below via assert
    const check = await assertPortalMfaSatisfied();
    if (!check.ok) {
      return `/portal/mfa?next=${encodeURIComponent(next)}`;
    }
  }
  return next;
}

/**
 * Server-action guard: when TOTP is enrolled, session must be AAL2.
 * Fail closed only when we know factors exist and AAL is insufficient.
 * If MFA APIs are unreachable, do not lock out owners who never enrolled.
 */
export async function assertPortalMfaSatisfied(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Sign in required' };

  try {
    const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
    if (factorsError) return { ok: true };

    const verified = factors?.totp?.filter((f) => f.status === 'verified') ?? [];
    if (verified.length === 0) return { ok: true };

    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (!aal || (aal.nextLevel === 'aal2' && aal.currentLevel !== 'aal2')) {
      return {
        ok: false,
        error:
          'Two-factor authentication required. Enter your authenticator code, then try again.',
      };
    }
    return { ok: true };
  } catch {
    return { ok: true };
  }
}

/**
 * Gate verified-owner portal pages. Unauthenticated → login.
 * MFA enrolled but AAL1 → challenge.
 */
export async function requirePortalSession(options?: {
  nextPath?: string;
  /** Allow AAL1 (e.g. MFA challenge page itself, security setup when MFA off). */
  allowAal1?: boolean;
}): Promise<{ userId: string; email: string | null }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const next = options?.nextPath ?? '/portal';

  if (!user) {
    redirect(`/portal/login?next=${encodeURIComponent(next)}`);
  }

  if (!options?.allowAal1) {
    const check = await assertPortalMfaSatisfied();
    if (!check.ok && check.error !== 'Sign in required') {
      redirect(`/portal/mfa?next=${encodeURIComponent(next)}`);
    }
  }

  return { userId: user.id, email: user.email ?? null };
}

export async function storeBackupCodeHashes(
  userId: string,
  codes: string[]
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseAdminConfigured()) {
    return { ok: false, error: 'Backup code storage unavailable' };
  }
  try {
    const admin = createAdminClient();
    const { data, error: getErr } = await admin.auth.admin.getUserById(userId);
    if (getErr || !data.user) {
      return { ok: false, error: getErr?.message ?? 'User not found' };
    }
    const hashes = codes.map(hashBackupCode);
    const { error } = await admin.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...data.user.user_metadata,
        [BACKUP_META_KEY]: hashes,
      },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Storage failed' };
  }
}

export async function clearBackupCodeHashes(
  userId: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseAdminConfigured()) return { ok: true };
  try {
    const admin = createAdminClient();
    const { data, error: getErr } = await admin.auth.admin.getUserById(userId);
    if (getErr || !data.user) return { ok: false, error: getErr?.message ?? 'User not found' };
    const meta = { ...(data.user.user_metadata ?? {}) };
    delete meta[BACKUP_META_KEY];
    const { error } = await admin.auth.admin.updateUserById(userId, {
      user_metadata: meta,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Clear failed' };
  }
}

/**
 * Consume a backup code if it matches a stored hash. Returns true when accepted.
 */
export async function consumeBackupCode(
  userId: string,
  code: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseAdminConfigured()) {
    return { ok: false, error: 'Backup codes unavailable' };
  }
  try {
    const admin = createAdminClient();
    const { data, error: getErr } = await admin.auth.admin.getUserById(userId);
    if (getErr || !data.user) {
      return { ok: false, error: getErr?.message ?? 'User not found' };
    }
    const hashes = readBackupHashes(data.user.user_metadata as Record<string, unknown>);
    const target = hashBackupCode(code);
    const idx = hashes.indexOf(target);
    if (idx < 0) return { ok: false, error: 'Invalid backup code' };

    const remaining = hashes.filter((_, i) => i !== idx);
    const { error } = await admin.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...data.user.user_metadata,
        [BACKUP_META_KEY]: remaining,
      },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Backup verify failed' };
  }
}
