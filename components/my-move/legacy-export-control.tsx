import React from 'react';
import { myMoveRetirementPrepActive, type RetirementEnv } from '@/lib/my-move/retirement-prep';

/**
 * Prepared export control. Returns null while retirement prep is inactive.
 * No page imports this component.
 */
export function LegacyExportControl({ env }: { env?: RetirementEnv }) {
  if (!myMoveRetirementPrepActive(env)) return null;
  return (
    <button type="button" data-my-move-legacy-export="ready">
      Export my saved records
    </button>
  );
}
