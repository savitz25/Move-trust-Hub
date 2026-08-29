'use client';

import { MoverOmnibox } from '@/components/search/mover-omnibox';

/** Homepage research omnibox. Identity search only — no Places, no ranking. */
export function HomeMoverSearch({
  compact = false,
  profileCount = null,
}: {
  compact?: boolean;
  profileCount?: number | null;
}) {
  return <MoverOmnibox compact={compact} profileCount={profileCount} />;
}
