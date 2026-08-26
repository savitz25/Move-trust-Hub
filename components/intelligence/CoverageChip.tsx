import { COVERAGE_LABEL, type ResearchCoverageLevel } from '@/lib/intelligence/coverage';

export function CoverageChip({
  level,
  href,
}: {
  level: ResearchCoverageLevel;
  href?: string;
}) {
  const label = COVERAGE_LABEL[level];
  const chip = (
    <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {label}
    </span>
  );
  if (!href) return chip;
  return (
    <a href={href} className="inline-flex no-underline hover:border-primary/40">
      {chip}
    </a>
  );
}
