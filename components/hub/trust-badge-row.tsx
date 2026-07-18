import Link from 'next/link';
import { Shield, ExternalLink } from 'lucide-react';
import { getHubConfig } from '@/lib/hub/config';
import type { HubId } from '@/lib/hub/types';
import { methodologyHref } from '@/lib/trust/site-stats';

type TrustBadgeRowProps = {
  hub: HubId;
  className?: string;
};

const HUB_BADGES: Record<HubId, { label: string; detail: string; href?: string }[]> = {
  move: [
    { label: 'FMCSA Licensed', detail: 'DOT/MC verification on every interstate carrier', href: '/resources/fmcsa' },
    {
      label: 'Transparent Scoring',
      detail: 'Reputation methodology published — no black-box rankings',
      href: methodologyHref('reputationScore'),
    },
    { label: 'Verify Yourself', detail: 'Confirm licensing on FMCSA.gov before booking', href: '/verify-dot' },
  ],
  lender: [
    { label: 'NMLS Verified', detail: 'License checks via NMLS Consumer Access' },
    { label: 'FDIC BankFind Sourced', detail: 'Bank data verified against FDIC records' },
    { label: 'CFPB Data', detail: 'Complaint transparency from public CFPB records' },
  ],
  insurance: [
    { label: 'DOI Verified', detail: 'State Department of Insurance license checks' },
    { label: 'NAIC Standards', detail: 'Aligned with national insurance oversight' },
  ],
};

export function TrustBadgeRow({ hub, className }: TrustBadgeRowProps) {
  const config = getHubConfig(hub);
  const badges = HUB_BADGES[hub];

  return (
    <section
      className={className ?? 'border-y bg-muted/20 py-6'}
      aria-label={`${config.siteName} trust signals`}
    >
      <div className="container mx-auto px-4">
        <p className="mb-3 text-center text-xs text-muted-foreground md:text-left">
          {hub === 'move'
            ? 'Research tools and FMCSA context for interstate movers.'
            : hub === 'lender'
              ? 'Transparent lender data you can actually trust.'
              : 'Licensed agents, plain-language guides, and clear comparisons.'}
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {badges.map((badge) => {
              const inner = (
                <>
                  <Shield className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span className="font-medium">{badge.label}</span>
                </>
              );
              return badge.href ? (
                <Link
                  key={badge.label}
                  href={badge.href}
                  className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm hover:border-primary/40 transition-colors"
                  title={badge.detail}
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm"
                  title={badge.detail}
                >
                  {inner}
                </div>
              );
            })}
          </div>
          {config.verifyAuthority && (
            <Link
              href={config.verifyAuthority.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Verify via {config.verifyAuthority.label}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}