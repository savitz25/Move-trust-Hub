import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
import { CLAIM_CTA_LABEL, CLAIM_CTA_SHORT } from '@/lib/portal/messaging';
import { cn } from '@/lib/utils';

type Props = {
  companySlug: string;
  companyName?: string;
  variant?: 'profile' | 'card' | 'inline';
  className?: string;
};

export function ClaimProfileCta({
  companySlug,
  companyName,
  variant = 'profile',
  className,
}: Props) {
  const href = `/portal/claim/${encodeURIComponent(companySlug)}`;

  if (variant === 'card') {
    return (
      <Link
        href={href}
        className={cn(
          'text-[11px] text-muted-foreground hover:text-primary underline-offset-2 hover:underline',
          className
        )}
      >
        {CLAIM_CTA_SHORT}
      </Link>
    );
  }

  if (variant === 'inline') {
    return (
      <Link
        href={href}
        className={cn(
          'inline-flex items-center gap-1.5 text-sm text-primary hover:underline',
          className
        )}
      >
        <BadgeCheck className="h-4 w-4" aria-hidden />
        {CLAIM_CTA_LABEL}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3',
        className
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-primary shrink-0" aria-hidden />
          {CLAIM_CTA_LABEL}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Free forever. No lead fees. No paid placements.
          {companyName ? ` Manage ${companyName} as a verified owner.` : ' Respond to reviews and keep your listing accurate.'}
        </p>
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Claim this profile
      </Link>
    </div>
  );
}
