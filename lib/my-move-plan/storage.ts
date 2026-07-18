import {
  EMPTY_PLAN_STATE,
  MY_MOVE_PLAN_STORAGE_KEY,
  type MyMovePlanState,
} from '@/lib/my-move-plan/types';

export function loadMyMovePlan(): MyMovePlanState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(MY_MOVE_PLAN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MyMovePlanState;
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      ...EMPTY_PLAN_STATE,
      ...parsed,
      shortlist: Array.isArray(parsed.shortlist)
        ? parsed.shortlist.filter((m) => m && typeof m === 'object')
        : [],
      inventory: Array.isArray(parsed.inventory)
        ? parsed.inventory.filter((i) => i && typeof i === 'object')
        : [],
    };
  } catch {
    return null;
  }
}

export function saveMyMovePlan(state: MyMovePlanState): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(
      MY_MOVE_PLAN_STORAGE_KEY,
      JSON.stringify({ ...state, updatedAt: new Date().toISOString() })
    );
  } catch {
    // quota / private mode
  }
}

export function clearMyMovePlan(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(MY_MOVE_PLAN_STORAGE_KEY);
  } catch {
    // ignore
  }
}