/**
 * Stash an estimate-request email action to run after My Move sign-in.
 * Wizard rebuilds the mailto body from session plan state after auth.
 */

const PENDING_OUTREACH_KEY = 'mth-my-move-plan-pending-outreach';

export type PendingWizardOutreach = {
  companySlug: string;
  companyName: string;
};

export function stashPendingWizardOutreach(action: PendingWizardOutreach): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(PENDING_OUTREACH_KEY, JSON.stringify(action));
  } catch {
    // private mode / quota
  }
}

export function peekPendingWizardOutreach(): PendingWizardOutreach | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(PENDING_OUTREACH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingWizardOutreach;
    if (!parsed?.companySlug) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function consumePendingWizardOutreach(): PendingWizardOutreach | null {
  const pending = peekPendingWizardOutreach();
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem(PENDING_OUTREACH_KEY);
    } catch {
      // ignore
    }
  }
  return pending;
}
