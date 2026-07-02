import Link from 'next/link';
import { Shield, ExternalLink } from 'lucide-react';
import { getHubConfig } from '@/lib/hub/config';
import type { HubId } from '@/lib/hub/types';

type TrustBadgeRowProps = {
  hub: HubId;
  className?: string;
};

const HUB_BADGES: Record<HubId, { label: string; detail: string }[]> = {
  move: [
    { label: 'FMCSA Licensed', detail: 'DOT/MC verification on every interstate carrier' },
    { label: 'Independent', detail: 'No paid placements or carrier affiliations' },
    { label: 'Attributed Reviews', detail: 'Customer feedback tied to verified moves' },
  ],
  lender: [
    { label: 'NMLS Verified', detail: 'License checks via NMLS Consumer Access' },
    { label: 'CFPB & BBB Data', detail: 'Complaint and accreditation transparency' },
    { label: 'County Insights', detail: 'Local loan performance by geography' },
  ],
  insurance: [
    { label: 'DOI Verified', detail: 'State Department of Insurance license checks' },
    { label: 'NAIC Standards', detail: 'Aligned with national insurance oversight' },
    { label: 'Health Focus', detail: 'ACA, Medicare, and employer plan specialists' },
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm"
                title={badge.detail}
              >
                <Shield className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
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