'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { pathAfterAuth } from '@/lib/auth/path-after-auth';
import {
  mergeUserMetadata,
  MY_MOVE_PASSWORD_ENABLED_KEY,
  MY_MOVE_PASSWORD_PROMPT_DISMISSED_KEY,
  revokeMyMovePasswordLogin,
  validateMyMovePassword,
} from '@/lib/save-my-move/password';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';

/** After client sign-in (password / Google GIS), resolve optional password offer. */
export async function resolveMyMoveContinuePathAction(nextPath?: string | null) {
  const next = sanitizePostLoginPath(nextPath ?? '/my-move');
  return { path: await pathAfterAuth(next) };
}

export async function setMyMovePasswordAction(input: {
  password: string;
  confirm: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const validation = validateMyMovePassword(input.password, input.confirm);
  if (validation) return { success: false, error: validation };

  const { error } = await supabase.auth.updateUser({
    password: input.password,
    data: {
      ...(user.user_metadata ?? {}),
      [MY_MOVE_PASSWORD_ENABLED_KEY]: true,
      [MY_MOVE_PASSWORD_PROMPT_DISMISSED_KEY]: true,
    },
  });

  if (error) {
    return { success: false, error: error.message || 'Could not save password' };
  }

  revalidatePath('/my-move');
  revalidatePath('/my-move/create-password');
  return { success: true };
}

export async function skipMyMovePasswordPromptAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const result = await mergeUserMetadata(user.id, {
    [MY_MOVE_PASSWORD_PROMPT_DISMISSED_KEY]: true,
  });
  if (!result.ok) return { success: false, error: result.error };

  revalidatePath('/my-move');
  revalidatePath('/my-move/create-password');
  return { success: true };
}

export async function changeMyMovePasswordAction(input: {
  password: string;
  confirm: string;
}): Promise<{ success: boolean; error?: string }> {
  return setMyMovePasswordAction(input);
}

export async function disableMyMovePasswordAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Sign in required' };

  const result = await revokeMyMovePasswordLogin(user.id);
  if (!result.ok) return { success: false, error: result.error };

  revalidatePath('/my-move');
  return { success: true };
}
