'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { assertPortalMfaSatisfied, portalPathAfterAuth } from '@/lib/portal/mfa';
import {
  mergeUserMetadata,
  PORTAL_PASSWORD_ENABLED_KEY,
  PORTAL_PASSWORD_PROMPT_DISMISSED_KEY,
  revokePortalPasswordLogin,
  validatePortalPassword,
} from '@/lib/portal/password';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';

/** After MFA (or any client step), resolve MFA + optional password offer. */
export async function resolvePortalContinuePathAction(nextPath?: string | null) {
  const next = sanitizePostLoginPath(nextPath ?? '/portal');
  const safe = next.startsWith('/portal') ? next : '/portal';
  return { path: await portalPathAfterAuth(safe) };
}

export async function setPortalPasswordAction(input: {
  password: string;
  confirm: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const mfa = await assertPortalMfaSatisfied();
  if (!mfa.ok) return { success: false, error: mfa.error };

  const validation = validatePortalPassword(input.password, input.confirm);
  if (validation) return { success: false, error: validation };

  const { error } = await supabase.auth.updateUser({
    password: input.password,
    data: {
      ...(user.user_metadata ?? {}),
      [PORTAL_PASSWORD_ENABLED_KEY]: true,
      [PORTAL_PASSWORD_PROMPT_DISMISSED_KEY]: true,
    },
  });

  if (error) {
    return { success: false, error: error.message || 'Could not save password' };
  }

  revalidatePath('/portal');
  revalidatePath('/portal/security');
  revalidatePath('/portal/create-password');
  return { success: true };
}

export async function skipPortalPasswordPromptAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const result = await mergeUserMetadata(user.id, {
    [PORTAL_PASSWORD_PROMPT_DISMISSED_KEY]: true,
  });
  if (!result.ok) return { success: false, error: result.error };

  revalidatePath('/portal');
  revalidatePath('/portal/create-password');
  return { success: true };
}

export async function changePortalPasswordAction(input: {
  password: string;
  confirm: string;
}): Promise<{ success: boolean; error?: string }> {
  return setPortalPasswordAction(input);
}

export async function disablePortalPasswordAction(): Promise<{
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

  const result = await revokePortalPasswordLogin(user.id);
  if (!result.ok) return { success: false, error: result.error };

  revalidatePath('/portal/security');
  revalidatePath('/portal');
  return { success: true };
}
