/** Stash “email me my move report” intent across My Move sign-in. */

const KEY = 'mth-pending-email-move-report';

export function stashPendingEmailMoveReport(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    // private mode
  }
}

export function consumePendingEmailMoveReport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const v = sessionStorage.getItem(KEY);
    if (v) sessionStorage.removeItem(KEY);
    return v === '1';
  } catch {
    return false;
  }
}

export function peekPendingEmailMoveReport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}
