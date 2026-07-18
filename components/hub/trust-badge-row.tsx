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
    { label: 'Independent', detail: 'No paid placements or carrier affiliations', href: '/about#disclaimer' },
    {
      label: 'Transparent Scoring',
      detail: 'Reputation methodology published — no black-box rankings',
      href: methodologyHref('reputationScore'),
    },
  ],
  lender: [
    { label: 'NMLS Verified', detail: 'License checks via NMLS Consumer Access' },
    { label: 'FDIC BankFind Sourced', detail: 'Bank data verified against FDIC records' },
    { label: 'No Paid Placements', detail: 'Rankings are not sold to lenders or brokers' },
    { label: 'CFPB Data', detail: 'Complaint transparency from public CFPB records' },
  ],
  insurance: [
    { label: 'DOI Verified', detail: 'State Department of Insurance license checks' },
    { label: 'NAIC Standards', detail: 'Aligned with national insurance oversight' },
    { label: 'No Paid Placements', detail: 'Agent rankings are never pay-to-play' },
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
            ? 'We’re on your side — independent research, friendly guidance, zero lead fees.'
            : hub === 'lender'
              ? 'Transparent lender data you can actually trust — no pay-to-play listings.'
              : 'Licensed agents, plain-language guides, and comparisons without the sales pitch.'}
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