import type { InventoryItem } from '@/store/calculator-store';

const PENDING_ACTION_KEY = 'save-my-move-pending-action';

export type PendingInventoryAction = {
  type: 'inventory';
  payload: {
    name: string;
    inventory: InventoryItem[];
    mode: string;
    movePreset: string | null;
  };
};

export type PendingMoverAction = {
  type: 'mover';
  payload: {
    companySlug: string;
    companyName: string;
    sendEmail?: boolean;
  };
};

export type PendingComparisonAction = {
  type: 'comparison';
  payload: {
    companySlugs: string[];
  };
};

export type PendingSaveAction =
  | PendingInventoryAction
  | PendingMoverAction
  | PendingComparisonAction;

/** Stash a save action to run automatically after sign-in. */
export function stashPendingSaveAction(action: PendingSaveAction): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(PENDING_ACTION_KEY, JSON.stringify(action));
}

/** Read and remove the stashed save action (one-time consume). */
export function consumePendingSaveAction(): PendingSaveAction | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(PENDING_ACTION_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(PENDING_ACTION_KEY);
  try {
    return JSON.parse(raw) as PendingSaveAction;
  } catch {
    return null;
  }
}