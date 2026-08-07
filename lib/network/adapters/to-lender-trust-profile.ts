import type { EnrichedLender } from '@/lib/lender/enrichment/merge';
import type { Lender } from '@/lib/lender/mockData';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import {
  cleanDisplayPhone,
  cleanNmlsId,
  resolveNmlsVerification,
} from '@/lib/lender/verification';
import {
  defaultMethodologyUrl,
  defaultStandardUrl,
  type TrustProfileShell,
  type TrustSourceRef,
} from '@/lib/network/trust-profile';

type LenderLike = Lender | EnrichedLender;

/**
 * Map a Lender Trust Hub lender into the shared Trust Profile shell.
 * Phase 0: no invented NMLS badges, placeholder phones, or seed close metrics.
 */
export function toLenderTrustProfile(lender: LenderLike): TrustProfileShell {
  const sources: TrustSourceRef[] = [];
  const enriched = 'isEnriched' in lender ? lender : null;
  const nmls = resolveNmlsVerification({
    nmlsId: lender.nmlsId,
    nmlsVerified: lender.nmlsVerified,
  });

  if (nmls.nmlsId) {
    sources.push({
      id: 'nmls',
      label: `NMLS #${nmls.nmlsId}`,
      status: nmls.showNmlsVerifiedBadge ? 'verified' : 'unverified',
      url: 'https://www.nmlsconsumeraccess.org/',
      note: nmls.summary,
      lastChecked: enriched?.enrichedAt,
    });
  }

  if (typeof lender.cfpbComplaints === 'number' && enriched?.isEnriched) {
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
  if (enriched?.isEnriched && bbbAccredited && lender.bbbRating) {
    sources.push({
      id: 'bbb',
      label: `BBB ${lender.bbbRating}`,
      status: 'verified',
      note: 'Only when a public BBB profile exists',
    });
  }

  if (enriched?.isEnriched && lender.googleRating != null && lender.googleRating > 0) {
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
  const phone = cleanDisplayPhone(lender.phone);

  return {
    hub: 'lender',
    entityId: cleanNmlsId(lender.nmlsId) || lender.slug || lender.id,
    displayName: lender.name?.trim() || 'Unnamed lender',
    profileUrl: hubCanonicalUrl('lender', `/lenders/${lender.slug}`),
    serviceScope: 'unknown',
    verification: {
      primaryLabel: nmls.showNmlsVerifiedBadge
        ? 'NMLS ID verified'
        : nmls.nmlsId
          ? 'NMLS ID on file — recheck required'
          : 'NMLS incomplete — recheck required',
      isVerified: nmls.showNmlsVerifiedBadge,
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
      phone: phone || undefined,
      website: lender.website?.trim() || undefined,
      address,
    },
    updatedAt: enriched?.enrichedAt,
    methodologyUrl: defaultMethodologyUrl('lender'),
    standardUrl: defaultStandardUrl(),
    extensions: {
      lender: {
        nmlsId: nmls.nmlsId ?? '',
        companyType: lender.type,
        state: lender.state,
        county: lender.county,
        // Closing performance omitted until observed provenance exists
      },
    },
  };
}
