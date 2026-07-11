'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, Scale, MapPinned, BookOpen } from 'lucide-react';
import { TrustBadges } from '@/components/trust/trust-badges';
import { cn } from '@/lib/utils';
import { HERO_TRUST_EYEBROW } from '@/lib/trust/site-messaging';

type PageHeroCtaProps = {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tertiaryLabel?: string;
  tertiaryHref?: string;
  trustTagline?: string;
  showTrustBadges?: boolean;
  className?: string;
};

const iconForHref = (href: string) => {
  if (href.includes('moving-calculator')) return Calculator;
  if (href.includes('compare')) return Scale;
  if (href.includes('local-movers')) return MapPinned;
  if (href.includes('companies')) return Scale;
  return BookOpen;
};

export function PageHeroCta({
  primaryLabel = 'Find Movers',
  primaryHref = '/companies',
  secondaryLabel = 'Open Calculator',
  secondaryHref = '/moving-calculator',
  tertiaryLabel,
  tertiaryHref,
  trustTagline = HERO_TRUST_EYEBROW,
  showTrustBadges = true,
  className,
}: PageHeroCtaProps) {
  const PrimaryIcon = iconForHref(primaryHref);
  const SecondaryIcon = iconForHref(secondaryHref);

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Link
          href={primaryHref}
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors min-h-[48px] w-full sm:w-auto"
        >
          <PrimaryIcon className="h-4 w-4" aria-hidden="true" />
          {primaryLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href={secondaryHref}
          prefetch={false}
          className="inline-flex items-center justify-center gap-2 rounded-md border bg-card px-6 py-3 text-sm font-medium hover:border-primary/40 transition-colors min-h-[48px] w-full sm:w-auto"
        >
          <SecondaryIcon className="h-4 w-4" aria-hidden="true" />
          {secondaryLabel}
        </Link>
        {tertiaryLabel && tertiaryHref ? (
          <Link
            href={tertiaryHref}
            prefetch={false}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-dashed bg-background px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors min-h-[48px] w-full sm:w-auto"
          >
            <MapPinned className="h-4 w-4" aria-hidden="true" />
            {tertiaryLabel}
          </Link>
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground mt-3 font-medium tracking-wide">
        {trustTagline}
      </p>
      {showTrustBadges ? (
        <TrustBadges variant="compact" className="mt-6" />
      ) : null}
    </div>
  );
}