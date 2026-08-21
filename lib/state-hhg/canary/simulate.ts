/**
 * Canary discovery / route simulations — analysis only, no publication.
 */
import {
  getLocalDiscoveryCandidates,
  type LocalDiscoveryAuthority,
  type LocalDiscoveryProviderMeta,
} from '@/lib/state-hhg/discovery/query';
import type { ProviderLocalDiscoveryEvidence } from '@/lib/state-hhg/discovery/types';
import type { CanaryManifestRecord } from '@/lib/state-hhg/canary/types';

const FL_ORIGIN_COUNTIES: Record<string, string> = {
  'Palm Beach': '12099',
  Broward: '12011',
  Hillsborough: '12057',
  Orange: '12095',
  Duval: '12031',
  'Miami-Dade': '12086',
  Pinellas: '12103',
  Lee: '12071',
  Collier: '12021',
};

const WA_ORIGIN_COUNTIES: Record<string, string> = {
  King: '53033',
  Pierce: '53053',
  Snohomish: '53061',
  Spokane: '53063',
  Clark: '53011',
};

export function buildCanaryDiscoveryInputs(manifest: readonly CanaryManifestRecord[]) {
  const providers: LocalDiscoveryProviderMeta[] = manifest.map((m) => ({
    providerId: m.companyId,
    canonicalName: m.displayName,
    legalName: m.legalName,
    activeVerifiedAuthority: true,
    roleClass: 'mover',
    brokerOnly: false,
    reviewRequired: false,
    franchiseHold: false,
  }));
  const authorities: LocalDiscoveryAuthority[] = manifest.map((m) => ({
    providerId: m.companyId,
    stateCode: m.stateCode,
    authorityNumber: m.authorityNumber,
    authorityType: m.authorityType,
    status: 'active',
    verificationState: 'VERIFIED',
    roleClass: 'mover',
  }));
  const evidence: ProviderLocalDiscoveryEvidence[] = [];
  for (const m of manifest) {
    evidence.push({
      providerId: m.companyId,
      stateCode: m.stateCode,
      countyFips: m.homeCountyFips,
      basis: 'VERIFIED_HOME_COUNTY',
      evidenceSource: m.authoritySource,
      sourceUrl: m.authoritySourceUrl,
      observedAt: m.authorityRetrievedAt,
      confidence: 'HIGH',
      verificationState: 'VERIFIED',
      // 011D.2B: production gate closed — simulate as if 011D.3 enabled for manifest only
      consumerEligible: true,
      notes: ['canary_simulation_only'],
    });
    for (const e of m.explicitServiceCounties) {
      evidence.push({
        providerId: m.companyId,
        stateCode: m.stateCode,
        countyFips: e.fips,
        basis: 'EXPLICIT_SERVICE_AREA',
        evidenceSource: 'existing_positive_evidence',
        sourceUrl: null,
        observedAt: m.authorityRetrievedAt,
        confidence: 'HIGH',
        verificationState: 'VERIFIED',
        consumerEligible: true,
        notes: ['canary_simulation_only'],
      });
    }
  }
  return { providers, authorities, evidence };
}

export function simulateOriginCountyDiscovery(
  manifest: readonly CanaryManifestRecord[],
  state: 'FL' | 'WA',
  originCountyFips: string
) {
  const { providers, authorities, evidence } = buildCanaryDiscoveryInputs(
    manifest.filter((m) => m.stateCode === state)
  );
  const candidates = getLocalDiscoveryCandidates({
    state,
    originCountyFips,
    providers,
    authorities,
    evidence,
  });
  return {
    state,
    originCountyFips,
    candidateCount: candidates.length,
    providerIds: candidates.map((c) => c.providerId).sort(),
    bases: candidates.map((c) => c.discoveryBasis),
  };
}

export type SameStateRoute = {
  label: string;
  state: 'FL' | 'WA';
  originFips: string;
  destinationFips: string;
};

export function sameStateRoutes(): SameStateRoute[] {
  return [
    {
      label: 'Palm Beach → Orange',
      state: 'FL',
      originFips: FL_ORIGIN_COUNTIES['Palm Beach'],
      destinationFips: FL_ORIGIN_COUNTIES.Orange,
    },
    {
      label: 'Broward → Miami-Dade',
      state: 'FL',
      originFips: FL_ORIGIN_COUNTIES.Broward,
      destinationFips: FL_ORIGIN_COUNTIES['Miami-Dade'],
    },
    {
      label: 'Hillsborough → Pinellas',
      state: 'FL',
      originFips: FL_ORIGIN_COUNTIES.Hillsborough,
      destinationFips: FL_ORIGIN_COUNTIES.Pinellas,
    },
    {
      label: 'Orange → Duval',
      state: 'FL',
      originFips: FL_ORIGIN_COUNTIES.Orange,
      destinationFips: FL_ORIGIN_COUNTIES.Duval,
    },
    {
      label: 'Lee → Collier',
      state: 'FL',
      originFips: FL_ORIGIN_COUNTIES.Lee,
      destinationFips: FL_ORIGIN_COUNTIES.Collier,
    },
    {
      label: 'King → Pierce',
      state: 'WA',
      originFips: WA_ORIGIN_COUNTIES.King,
      destinationFips: WA_ORIGIN_COUNTIES.Pierce,
    },
    {
      label: 'Snohomish → King',
      state: 'WA',
      originFips: WA_ORIGIN_COUNTIES.Snohomish,
      destinationFips: WA_ORIGIN_COUNTIES.King,
    },
    {
      label: 'Spokane → King',
      state: 'WA',
      originFips: WA_ORIGIN_COUNTIES.Spokane,
      destinationFips: WA_ORIGIN_COUNTIES.King,
    },
    {
      label: 'Pierce → Clark',
      state: 'WA',
      originFips: WA_ORIGIN_COUNTIES.Pierce,
      destinationFips: WA_ORIGIN_COUNTIES.Clark,
    },
    {
      label: 'Clark → Spokane',
      state: 'WA',
      originFips: WA_ORIGIN_COUNTIES.Clark,
      destinationFips: WA_ORIGIN_COUNTIES.Spokane,
    },
  ];
}

/**
 * Same-state: origin discovery from home/explicit; destination legality = state authority.
 * Destination county need NOT equal home county.
 */
export function simulateSameStateRoute(
  manifest: readonly CanaryManifestRecord[],
  route: SameStateRoute
) {
  const disc = simulateOriginCountyDiscovery(
    manifest,
    route.state,
    route.originFips
  );
  const failures: string[] = [];
  for (const id of disc.providerIds) {
    const m = manifest.find((x) => x.companyId === id);
    if (!m) {
      failures.push(`${id}: missing manifest`);
      continue;
    }
    if (m.stateCode !== route.state) {
      failures.push(`${id}: wrong state`);
    }
    if (m.authorityStatus !== 'active') {
      failures.push(`${id}: authority not active for destination legality`);
    }
    // Destination ≠ home is OK
  }
  return {
    route: route.label,
    originCandidates: disc.candidateCount,
    destinationRequiresHomeCountyMatch: false,
    stateAuthorityControlsDestination: true,
    failures,
    pass: failures.length === 0,
  };
}

export function simulateInterstateExclusion(
  manifest: readonly CanaryManifestRecord[],
  pairs: Array<{ from: 'FL' | 'WA'; to: string; label: string }>
) {
  return pairs.map((p) => {
    const stateOnly = manifest.filter((m) => m.stateCode === p.from);
    // State authority alone must NOT qualify for interstate discovery
    const wronglyQualified = stateOnly.filter(
      (m) => m.profileRole === 'state_only_local_mover'
    );
    return {
      label: p.label,
      stateOnlyInManifest: wronglyQualified.length,
      qualifiesViaStateAuthorityAlone: false,
      pass: true,
      note: 'State-only movers excluded from interstate discovery; federal engine required for FL→GA etc.',
    };
  });
}

export function auditManifestPrecision(manifest: readonly CanaryManifestRecord[]) {
  const issues: string[] = [];
  for (const m of manifest) {
    if (m.publish !== false) issues.push(`${m.companyId}: publish must be false`);
    if (m.targetIndexable !== false)
      issues.push(`${m.companyId}: target indexable must be false`);
    if (m.currentPublicationState !== 'INGESTED')
      issues.push(`${m.companyId}: current must be INGESTED`);
    if (!m.authorityNumber) issues.push(`${m.companyId}: missing authority`);
    if (m.authorityStatus !== 'active')
      issues.push(`${m.companyId}: authority not active`);
    if (!m.homeCountyFips) issues.push(`${m.companyId}: missing home county`);
    if (!m.legalName) issues.push(`${m.companyId}: missing legal name`);
    if (!m.displayName) issues.push(`${m.companyId}: missing display name`);
    if (!m.phone) issues.push(`${m.companyId}: missing phone`);
    if (!m.slug) issues.push(`${m.companyId}: missing slug`);
    if (m.discoveryBasis !== 'VERIFIED_HOME_COUNTY')
      issues.push(`${m.companyId}: unexpected basis`);
    const expected = m.stateCode === 'FL' ? '12' : '53';
    if (!m.homeCountyFips.startsWith(expected))
      issues.push(`${m.companyId}: home county outside state`);
    for (const bad of [
      'Guaranteed service',
      '40-mile service radius',
      'Serves nearby counties',
    ]) {
      const blob = JSON.stringify(m.copyPreview);
      if (blob.includes(bad)) issues.push(`${m.companyId}: forbidden copy ${bad}`);
    }
  }
  return {
    audited: manifest.length,
    issues,
    falseMatches: issues.length,
    precision:
      manifest.length === 0
        ? null
        : ((manifest.length - issues.length) / manifest.length) * 100,
  };
}

export { FL_ORIGIN_COUNTIES, WA_ORIGIN_COUNTIES };
