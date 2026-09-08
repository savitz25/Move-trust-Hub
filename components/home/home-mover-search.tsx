import { SpecialistSearchShell } from '@/components/specialist-search/SpecialistSearchShell';

/** Homepage research omnibox. Identity search only — no Places, no ranking. */
export function HomeMoverSearch({
  compact = false,
  profileCount = null,
}: {
  compact?: boolean;
  profileCount?: number | null;
}) {
  void profileCount;
  return <SpecialistSearchShell compact={compact} />;
}
