import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { VERIFICATION_BADGE_LEGEND } from '@/lib/trust/site-messaging';
import { badgeLegendHref } from '@/lib/trust/site-stats';
import { cn } from '@/lib/utils';

const DIRECTORY_LEGEND = VERIFICATION_BADGE_LEGEND.find((item) => item.id === 'directory')!;

type DirectoryVerifiedBadgeProps = {
  className?: string;
  compact?: boolean;
  /** When true, links to in-page #badge-legend anchor on profiles. */
  linkToLegend?: boolean;
};

export function DirectoryVerifiedBadge({
  className,
  compact = false,
  linkToLegend = true,
}: DirectoryVerifiedBadgeProps) {
  const badge = (
    <Badge
      variant="success"
      className={cn(
        compact && 'text-[10px] h-fit',
        linkToLegend && 'hover:ring-2 hover:ring-emerald-500/30 transition-shadow',
        className
      )}
      title={DIRECTORY_LEGEND.description}
    >
      <BadgeCheck className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
      {DIRECTORY_LEGEND.label}
    </Badge>
  );

  if (!linkToLegend) return badge;

  return (
    <Link
      href={badgeLegendHref('directory', true)}
      className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
      title={`${DIRECTORY_LEGEND.description} — see badge legend`}
      aria-label={`${DIRECTORY_LEGEND.label}: ${DIRECTORY_LEGEND.description}. View badge legend.`}
    >
      {badge}
    </Link>
  );
}