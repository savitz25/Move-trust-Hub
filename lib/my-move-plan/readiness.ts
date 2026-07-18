import type { MyMovePlanState } from '@/lib/my-move-plan/types';

/** Route locked +20 · shortlist +20 · inventory +40 · report generated +20 */
export function computeMoveReadiness(state: MyMovePlanState): number {
  let score = 0;
  if (state.fromPlace) score += 20;
  if (state.shortlist.length > 0) score += 20;
  const volume = state.inventory.reduce((s, i) => s + i.volume * i.quantity, 0);
  if (volume > 0) score += 40;
  if (state.step === 'report' && volume > 0) score += 20;
  return Math.min(100, score);
}

export type PhaseId = 'plan' | 'build' | 'book';

export function stepToPhase(step: MyMovePlanState['step']): PhaseId {
  if (step === 'route') return 'plan';
  if (step === 'shortlist' || step === 'inventory') return 'build';
  return 'book';
}

export function phaseProgress(step: MyMovePlanState['step']): number {
  switch (step) {
    case 'route':
      return 15;
    case 'shortlist':
      return 40;
    case 'inventory':
      return 70;
    case 'report':
      return 100;
  }
}