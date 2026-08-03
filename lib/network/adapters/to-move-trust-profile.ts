import type { Company } from '@/types';
import { hubCanonicalUrl } from '@/lib/hub/paths';
import {
  defaultMethodologyUrl,
  defaultStandardUrl,
  type TrustProfileShell,
  type TrustSourceRef,
} from '@/lib/network/trust-profile';
import { getCompanyVerificationStatus } from '@/lib/trust/verification-status';

/**
 * Map a Move Trust Hub company into the shared Trust Profile shell.
 */
export function toMoveTrustProfile(company: Company): TrustProfileShell {
  const verification = getCompanyVerificationStatus(company);
  const sources: TrustSourceRef[] = [];

  const fmcsaStatus = verification.fmcsa;
  if (fmcsaStatus === 'verified' || fmcsaStatus === 'warning' || fmcsaStatus === 'critical') {
    sources.push({
      id: 'fmcsa',
      label: 'FMCSA / SAFER',
      status:
        fmcsaStatus === 'critical' || company.outOfService
          ? 'error'
          : fmcsaStatus === 'warning'
            ? 'stale'
            : 'verified',
      lastChecked: company.fmcsaLastChecked ?? undefined,
      url: company.usdotNumber
        ? `https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=${encodeURIComponent(company.usdotNumber)}`
        : 'https://safer.fmcsa.dot.gov/',
      note:
        fmcsaStatus === 'critical' || company.outOfService
          ? 'Authority or OOS concern — re-check SAFER before booking'
          : fmcsaStatus === 'warning'
            ? 'Safety rating needs attention — re-check SAFER'
            : 'Authority and safety context from public FMCSA records',
    });
  } else if (company.usdotNumber) {
    sources.push({
      id: 'fmcsa',
      label: 'FMCSA / SAFER',
      status: 'unverified',
      url: `https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=${encodeURIComponent(company.usdotNumber)}`,
      note: 'USDOT on file — re-verify authority on SAFER',
    });
  }

  // BBB only when confirmed public listing (same policy as profile badges)
  if (verification.bbb === 'verified' && verification.bbbRating) {
    sources.push({
      id: 'bbb',
      label: `BBB ${verification.bbbRating}${verification.bbbAccredited ? ' Accredited' : ''}`,
      status: 'verified',
      lastChecked: company.bbbLastChecked ?? undefined,
      note: 'Public BBB listing confirmed — not an FMCSA endorsement',
    });
  }

  if (company.googleData?.status === 'ok' && company.googleData.rating != null) {
    sources.push({
      id: 'google',
      label: 'Google rating',
      status: 'verified',
      note: 'External rating reference — not mixed into schema as native reviews',
    });
  }

  const legalName = company.fmcsaLegalName?.trim();
  const displayName = company.name?.trim() || 'Unnamed company';
  const showLegal =
    legalName && legalName.toLowerCase() !== displayName.toLowerCase() ? legalName : undefined;

  const scope = company.serviceScope === 'interstate' || company.serviceScope === 'intrastate'
    ? company.serviceScope
    : 'unknown';

  const score =
    typeof company.reputationScore === 'number' && company.reputationScore > 0
      ? company.reputationScore
      : undefined;

  const address =
    company.physicalAddress?.trim() || company.headquarters?.trim() || undefined;

  const fmcsaOk = fmcsaStatus === 'verified' || fmcsaStatus === 'warning';

  return {
    hub: 'move',
    entityId: company.slug || company.id,
    displayName,
    legalName: showLegal,
    profileUrl: hubCanonicalUrl('move', `/companies/${company.slug}`),
    serviceScope: scope,
    verification: {
      primaryLabel:
        fmcsaStatus === 'critical'
          ? 'FMCSA record reviewed — check authority carefully'
          : fmcsaOk
            ? 'FMCSA authority checked'
            : verification.directoryVerified
              ? 'Directory listing verified'
              : 'Verify USDOT on FMCSA SAFER',
      isVerified: Boolean(verification.directoryVerified || fmcsaOk),
      sources,
    },
    reputation: score
      ? {
          score,
          scoreLabel: 'Reputation Score',
          scoreMax: 100,
          summary:
            'Editorial composite for research — not an FMCSA endorsement or booking guarantee.',
        }
      : undefined,
    contact: {
      phone: company.phone?.trim() || undefined,
      email: company.email?.trim() || undefined,
      website: company.website?.trim() || undefined,
      address,
    },
    updatedAt: company.fmcsaLastChecked || company.lastUpdated || undefined,
    methodologyUrl: defaultMethodologyUrl('move'),
    standardUrl: defaultStandardUrl(),
    extensions: {
      move: {
        usdot: company.usdotNumber || undefined,
        mcNumber: company.mcNumber || undefined,
        authorityStatus:
          company.usdotStatus ||
          (company.authorityActive === true
            ? 'ACTIVE'
            : company.authorityActive === false
              ? 'INACTIVE'
              : undefined),
        fmcsaSafetyRating: company.fmcsaSafetyRating,
        outOfService: company.outOfService,
      },
    },
  };
}
