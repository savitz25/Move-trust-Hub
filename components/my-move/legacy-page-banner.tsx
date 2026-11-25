import React from 'react';
import { myMoveRetirementPrepActive, type RetirementEnv } from '@/lib/my-move/retirement-prep';

/**
 * Legacy-page notice. Returns null while retirement prep is inactive.
 * No page imports this component in this commit.
 */
export function LegacyPageBanner({ env }: { env?: RetirementEnv }) {
  if (!myMoveRetirementPrepActive(env)) return null;
  return (
    <p role="status" data-my-move-legacy-banner="on">
      My Move is preparing to retire. Your saved records stay in place until you choose to export them.
    </p>
  );
}
