'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import {
  assertPortalMfaSatisfied,
  clearBackupCodeHashes,
  consumeBackupCode,
  generateBackupCodes,
  storeBackupCodeHashes,
} from '@/lib/portal/mfa';

export async function savePortalBackupCodesAction(): Promise<{
  success: boolean;
  codes?: string[];
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Sign in required' };

  // Only issue codes when a verified TOTP factor exists
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const verified = factors?.totp?.filter((f) => f.status === 'verified') ?? [];
  if (verified.length === 0) {
    return { success: false, error: 'Enable authenticator 2FA before generating backup codes.' };
  }

  // Require AAL2 so a magic-link-only session cannot mint recovery codes
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal?.nextLevel === 'aal2' && aal.currentLevel !== 'aal2') {
    return {
      success: false,
      error: 'Enter your authenticator code first, then generate backup codes.',
    };
  }

  const codes = generateBackupCodes(8);
  const stored = await storeBackupCodeHashes(user.id, codes);
  if (!stored.ok) {
    return {
      success: false,
      error: stored.error ?? 'Could not store backup codes. Save your authenticator secret carefully.',
    };
  }

  revalidatePath('/portal/security');
  revalidatePath('/portal');
  return { success: true, codes };
}

export async function clearPortalBackupCodesAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const mfa = await assertPortalMfaSatisfied();
  if (!mfa.ok) return { success: false, error: mfa.error };

  const result = await clearBackupCodeHashes(user.id);
  if (!result.ok) return { success: false, error: result.error };
  revalidatePath('/portal/security');
  return { success: true };
}

/**
 * Verify a backup code during MFA challenge.
 * Note: Supabase still requires a TOTP factor verify for AAL2; backup codes are a
 * recovery path that unenrolls TOTP so the owner can re-enroll (last resort).
 * Prefer normal TOTP codes when the phone is available.
 */
export async function recoverPortalMfaWithBackupCodeAction(code: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const consumed = await consumeBackupCode(user.id, code);
  if (!consumed.ok) {
    return { success: false, error: consumed.error ?? 'Invalid backup code' };
  }

  // Unenroll all TOTP factors so the user can reach the portal and re-enable 2FA
  const { data: factors } = await supabase.auth.mfa.listFactors();
  for (const factor of factors?.all ?? []) {
    if (factor.factor_type === 'totp') {
      await supabase.auth.mfa.unenroll({ factorId: factor.id });
    }
  }

  revalidatePath('/portal');
  revalidatePath('/portal/security');
  revalidatePath('/portal/mfa');
  return { success: true };
}
