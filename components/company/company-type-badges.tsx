import { Badge } from '@/components/ui/badge';
import {
  resolveCompanyTypeBadges,
  resolveCompanyTypeBadgesFromCompany,
  type CompanyTypeBadge,
  type TypeBadgeInput,
} from '@/lib/companies/type-badges';
import type { Company } from '@/types';
import { cn } from '@/lib/utils';

const VARIANT_CLASS: Record<CompanyTypeBadge['variant'], string> = {
  local:
    'border-emerald-400/80 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-100',
  carrier:
    'border-sky-400/80 bg-sky-50 text-sky-950 dark:border-sky-700 dark:bg-sky-950/50 dark:text-sky-100',
  broker:
    'border-violet-400/80 bg-violet-50 text-violet-950 dark:border-violet-700 dark:bg-violet-950/50 dark:text-violet-100',
  mixed:
    'border-indigo-400/80 bg-indigo-50 text-indigo-950 dark:border-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-100',
};

type Size = 'compact' | 'default';

type CompanyLike = Pick<
  Company,
  'serviceScope' | 'entityType' | 'services' | 'usdotNumber' | 'mcNumber'
> & {
  fmcsaRaw?: Record<string, unknown> | null;
};

type Props = {
  company?: CompanyLike | null;
  /** When company is not available (e.g. LocalMover catalog) */
  input?: TypeBadgeInput | null;
  size?: Size;
  className?: string;
};

/**
 * Type badges: Local Mover | Carrier | Broker | Carrier/Broker.
 * Always resolves from the centralized helper so directory + profile stay in sync.
 */
export function CompanyTypeBadges({
  company,
  input,
  size = 'default',
  className,
}: Props) {
  const badges = company
    ? resolveCompanyTypeBadgesFromCompany(company)
    : input
      ? resolveCompanyTypeBadges(input)
      : [];

  if (!badges.length) return null;

  const sizeClass =
    size === 'compact' ? 'text-[10px] px-1.5 py-0 font-semibold' : 'text-xs font-semibold';

  return (
    <div
      className={cn('flex flex-wrap items-center gap-1', className)}
      aria-label="Company type"
    >
      {badges.map((badge) => (
        <Badge
          key={badge.id}
          variant="outline"
          title={badge.description}
          className={cn(sizeClass, VARIANT_CLASS[badge.variant])}
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
}
