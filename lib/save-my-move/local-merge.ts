import type { InventoryItem, InputMode } from '@/store/calculator-store';
import type { LocalMergePayload, SavedInventoryPayload } from '@/lib/save-my-move/types';

const CALCULATOR_KEY = 'move-calculator-inventory';
const COMPARE_KEY = 'im-compare-storage';

function readCalculatorState(): SavedInventoryPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CALCULATOR_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      state?: {
        inventory?: InventoryItem[];
        mode?: InputMode;
        movePreset?: string | null;
      };
    };
    const inventory = parsed.state?.inventory ?? [];
    if (inventory.length === 0) return null;
    const totalVolume = inventory.reduce((s, i) => s + i.volume * i.quantity, 0);
    const totalItems = inventory.reduce((s, i) => s + i.quantity, 0);
    return {
      inventory,
      mode: parsed.state?.mode ?? 'room',
      movePreset: parsed.state?.movePreset ?? null,
      totalVolume,
      totalItems,
    };
  } catch {
    return null;
  }
}

function readCompareSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { state?: { selectedSlugs?: string[] } };
    return parsed.state?.selectedSlugs ?? [];
  } catch {
    return [];
  }
}

export function getLocalMergePayload(): LocalMergePayload {
  const inventory = readCalculatorState();
  const compareSlugs = readCompareSlugs();
  return {
    inventory,
    compareSlugs: compareSlugs.length > 0 ? compareSlugs : undefined,
  };
}

export function hasLocalDataToMerge(): boolean {
  const payload = getLocalMergePayload();
  return Boolean(payload.inventory || (payload.compareSlugs && payload.compareSlugs.length > 0));
}

export const LOCAL_MERGE_DISMISSED_KEY = 'save-my-move-merge-dismissed';

export function isMergeDismissedForSession(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(LOCAL_MERGE_DISMISSED_KEY) === '1';
}

export function dismissMergeForSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(LOCAL_MERGE_DISMISSED_KEY, '1');
}