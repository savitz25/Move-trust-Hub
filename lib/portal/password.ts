import 'server-only';

import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { scorePasswordStrength } from '@/lib/portal/password-strength';
import { randomBytes } from 'crypto';

/** user_metadata: owner opted into email+password for portal convenience */
export const PORTAL_PASSWORD_ENABLED_KEY = 'portal_password_enabled';
/** user_metadata: owner skipped the one-time create-password screen */
export const PORTAL_PASSWORD_PROMPT_DISMISSED_KEY = 'portal_password_prompt_dismissed';

export type PortalPasswordStatus = {
  passwordEnabled: boolean;
  promptDismissed: boolean;
  /** Show one-time “create a password?” screen */
  shouldOfferCreatePassword: boolean;
};

export function passwordStatusFromUser(user: User | null | undefined): PortalPasswordStatus {
  if (!user) {
    return {
      passwordEnabled: false,
      promptDismissed: false,
      shouldOfferCreatePassword: false,
    };
  }
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const passwordEnabled = meta[PORTAL_PASSWORD_ENABLED_KEY] === true;
  const promptDismissed = meta[PORTAL_PASSWORD_PROMPT_DISMISSED_KEY] === true;
  return {
    passwordEnabled,
    promptDismissed,
    shouldOfferCreatePassword: !passwordEnabled && !promptDismissed,
  };
}

export async function getPortalPasswordStatus(): Promise<PortalPasswordStatus | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return passwordStatusFromUser(user);
}

export function validatePortalPassword(password: string, confirm: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (password.length > 72) return 'Password must be 72 characters or fewer.';
  if (password !== confirm) return 'Passwords do not match.';
  const strength = scorePasswordStrength(password);
  if (!strength.ok) {
    return 'Choose a stronger password (mix of letters and numbers recommended).';
  }
  return null;
}

export async function mergeUserMetadata(
  userId: string,
  patch: Record<string, unknown>
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.id !== userId) {
    return { ok: false, error: 'Sign in required' };
  }

  // Prefer self-service updateUser (works without service role for metadata)
  const { error } = await supabase.auth.updateUser({
    data: {
      ...(user.user_metadata ?? {}),
      ...patch,
    },
  });
  if (!error) return { ok: true };

  // Fallback: admin merge if self-update blocked
  if (!isSupabaseAdminConfigured()) {
    return { ok: false, error: error.message };
  }
  try {
    const admin = createAdminClient();
    const { data, error: getErr } = await admin.auth.admin.getUserById(userId);
    if (getErr || !data.user) return { ok: false, error: getErr?.message ?? 'User not found' };
    const { error: upErr } = await admin.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...(data.user.user_metadata ?? {}),
        ...patch,
      },
    });
    if (upErr) return { ok: false, error: upErr.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Metadata update failed' };
  }
}

/** Invalidate password login by rotating to a random secret and clearing the portal flag. */
export async function revokePortalPasswordLogin(
  userId: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseAdminConfigured()) {
    return {
      ok: false,
      error: 'Password disable requires server admin configuration. Contact support if this persists.',
    };
  }
  try {
    const admin = createAdminClient();
    const { data, error: getErr } = await admin.auth.admin.getUserById(userId);
    if (getErr || !data.user) return { ok: false, error: getErr?.message ?? 'User not found' };
    const randomPassword = randomBytes(32).toString('base64url');
    const { error } = await admin.auth.admin.updateUserById(userId, {
      password: randomPassword,
      user_metadata: {
        ...(data.user.user_metadata ?? {}),
        [PORTAL_PASSWORD_ENABLED_KEY]: false,
        [PORTAL_PASSWORD_PROMPT_DISMISSED_KEY]: true,
      },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Could not disable password' };
  }
}
