import type { EnrichedLender } from '@/lib/lender/enrichment/merge';
import type { Lender } from '@/lib/lender/mockData';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import {
  defaultMethodologyUrl,
  defaultStandardUrl,
  type TrustProfileShell,
  type TrustSourceRef,
} from '@/lib/network/trust-profile';

type LenderLike = Lender | EnrichedLender;

/**
 * Map a Lender Trust Hub lender into the shared Trust Profile shell.
 * Close-time metrics stay in extensions as estimates only — not in core reputation.
 */
export function toLenderTrustProfile(lender: LenderLike): TrustProfileShell {
  const sources: TrustSourceRef[] = [];
  const enriched = 'isEnriched' in lender ? lender : null;

  if (lender.nmlsVerified || lender.nmlsId) {
    sources.push({
      id: 'nmls',
      label: lender.nmlsId ? `NMLS #${lender.nmlsId}` : 'NMLS',
      status: lender.nmlsVerified ? 'verified' : 'unverified',
      url: 'https://www.nmlsconsumeraccess.org/',
      note: 'Re-confirm company and individual IDs on NMLS Consumer Access',
      lastChecked: enriched?.enrichedAt,
    });
  }

  if (typeof lender.cfpbComplaints === 'number') {
    sources.push({
      id: 'cfpb',
      label: 'CFPB complaints',
      status: 'verified',
      url: 'https://www.consumerfinance.gov/',
      note: 'Public complaint pattern signal — not proof on any single file',
    });
  }

  const bbbAccredited =
    enriched?.bbbAccredited ||
    (lender.bbbRating && lender.bbbRating.startsWith('A'));
  if (bbbAccredited && lender.bbbRating) {
    sources.push({
      id: 'bbb',
      label: `BBB ${lender.bbbRating}`,
      status: 'verified',
      note: 'Only when a public BBB profile exists',
    });
  }

  if (lender.googleRating != null && lender.googleRating > 0) {
    sources.push({
      id: 'google',
      label: 'Google rating',
      status: 'verified',
      note: 'External reputation reference — not an NMLS field',
    });
  }

  const score =
    typeof lender.trustScore === 'number' && lender.trustScore > 0
      ? lender.trustScore
      : undefined;

  const address = [lender.city, lender.state].filter(Boolean).join(', ') || undefined;

  return {
    hub: 'lender',
    entityId: lender.slug || lender.id,
    displayName: lender.name?.trim() || 'Unnamed lender',
    profileUrl: hubCanonicalUrl('lender', `/lenders/${lender.slug}`),
    serviceScope: 'unknown',
    verification: {
      primaryLabel: lender.nmlsVerified
        ? 'NMLS licensing context checked'
        : 'Verify on NMLS Consumer Access',
      isVerified: Boolean(lender.nmlsVerified),
      sources,
    },
    reputation: score
      ? {
          score,
          scoreLabel: 'Trust Score',
          scoreMax: 100,
          summary:
            'Research composite — not a credit decision, rate quote, or approval. Near-identical high scores are not meaningful differentiation.',
        }
      : undefined,
    contact: {
      phone: lender.phone?.trim() || undefined,
      website: lender.website?.trim() || undefined,
      address,
    },
    updatedAt: enriched?.enrichedAt,
    methodologyUrl: defaultMethodologyUrl('lender'),
    standardUrl: defaultStandardUrl(),
    extensions: {
      lender: {
        nmlsId: lender.nmlsId,
        companyType: lender.type,
        state: lender.state,
        county: lender.county,
        avgCloseDaysEstimate: lender.avgCloseDays,
        onTimeCloseRateEstimate: lender.onTimeCloseRate,
      },
    },
  };
}
