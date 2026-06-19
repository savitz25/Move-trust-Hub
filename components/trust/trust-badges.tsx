import Link from 'next/link';
import { BadgeCheck, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import { trustBadges } from '@/lib/trust/trust-data';
import { cn } from '@/lib/utils';

const iconMap = {
  fmcsa: ShieldCheck,
  licensed: BadgeCheck,
  reviews: Star,
  rating: Star,
  independent: ShieldCheck,
} as const;

type TrustBadgesProps = {
  variant?: 'bar' | 'grid' | 'compact';
  className?: string;
};

export function TrustBadges({ variant = 'bar', className }: TrustBadgesProps) {
  if (variant === 'grid') {
    return (
      <div
        className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3', className)}
        role="list"
        aria-label="Trust and verification badges"
      >
        {trustBadges.map((badge) => {
          const Icon = iconMap[badge.id as keyof typeof iconMap] ?? ShieldCheck;
          return (
            <Link
              key={badge.id}
              href={badge.href}
              role="listitem"
              className="group rounded-xl border bg-card p-4 shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                  {badge.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{badge.description}</p>
              {'externalHref' in badge && badge.externalHref && (
                <span className="inline-flex items-center gap-1 text-[10px] text-primary mt-2">
                  Verify on FMCSA.gov <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </span>
              )}
            </Link>
          );
        })}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={cn('flex flex-wrap gap-2', className)}
        role="list"
        aria-label="Trust and verification badges"
      >
        {trustBadges.map((badge) => (
          <Link
            key={badge.id}
            href={badge.href}
            role="listitem"
            className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <ShieldCheck className="h-3 w-3 text-emerald-600" aria-hidden="true" />
            {badge.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn('trust-proof py-4 border-y bg-muted/20', className)}
      role="list"
      aria-label="Trust and verification badges"
    >
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium">
        {trustBadges.map((badge) => {
          const Icon = iconMap[badge.id as keyof typeof iconMap] ?? ShieldCheck;
          return (
            <Link
              key={badge.id}
              href={badge.href}
              role="listitem"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              title={badge.description}
            >
              <Icon className="h-4 w-4 text-emerald-600 group-hover:text-emerald-500" aria-hidden="true" />
              <span>{badge.label}</span>
            </Link>
          );
        })}
        <a
          href="https://www.fmcsa.dot.gov/"
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Verify on FMCSA.gov</span>
        </a>
      </div>
    </div>
  );
}