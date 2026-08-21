/**
 * Deterministic geographically diverse canary selection.
 * No ratings / commercial bias. Google Places: 0.
 */
import {
  CANARY_TARGETS,
  FUTURE_CANARY_COPY,
  FUTURE_PUBLICATION_PLAN,
  LOCAL_CANARY_WAVE_ID,
  type CanaryManifestRecord,
  type PublicationReadyProvider,
} from '@/lib/state-hhg/canary/types';

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function copyPreview(p: PublicationReadyProvider): CanaryManifestRecord['copyPreview'] {
  const county = p.homeCountyName
    ? `${p.homeCountyName} County`
    : 'the registered county';
  if (p.stateCode === 'FL') {
    return {
      roleLine: FUTURE_CANARY_COPY.homeCounty.roleFl,
      authorityLine: FUTURE_CANARY_COPY.homeCounty.authorityFl,
      locationLine: FUTURE_CANARY_COPY.homeCounty.locationLine.replace(
        '{countyName}',
        county
      ),
      cta: FUTURE_CANARY_COPY.homeCounty.cta,
    };
  }
  return {
    roleLine: FUTURE_CANARY_COPY.homeCounty.roleWa,
    authorityLine: FUTURE_CANARY_COPY.homeCounty.authorityWa,
    locationLine: FUTURE_CANARY_COPY.homeCounty.locationLine.replace(
      '{countyName}',
      county
    ),
    cta: FUTURE_CANARY_COPY.homeCounty.cta,
  };
}

function toManifest(
  p: PublicationReadyProvider,
  rank: number,
  reason: string
): CanaryManifestRecord {
  return {
    ...p,
    selectionRank: rank,
    selectionReason: reason,
    currentPublicationState: 'INGESTED',
    targetPublicationState: 'PUBLISHABLE',
    currentIndexable: false,
    targetIndexable: false,
    waveId: LOCAL_CANARY_WAVE_ID,
    publish: false,
    futureTask: '011D.3',
    futureInitialPublicationState: 'PUBLISHABLE',
    futureInitialIndexable: false,
    profileRole: p.usdot ? 'dual_state_and_federal' : 'state_only_local_mover',
    // USDOT alone ≠ federal HHG; mark dual only when we know federal HHG.
    // For canary prep: state-only unless federal HHG capability verified separately.
    copyPreview: copyPreview(p),
  };
}

/**
 * Greedy county-diversity selection with deterministic tie-breaks.
 * Prefer new counties until target, then fill by stable hash strata
 * (DBA / no-DBA, USDOT / no-USDOT, name length bands).
 */
export function selectCanaryManifest(
  pool: readonly PublicationReadyProvider[],
  targets: { FL: number; WA: number } = {
    FL: CANARY_TARGETS.FL,
    WA: CANARY_TARGETS.WA,
  }
): {
  FL: CanaryManifestRecord[];
  WA: CanaryManifestRecord[];
  geography: {
    FL: { countiesRepresented: number; byCounty: Record<string, number> };
    WA: { countiesRepresented: number; byCounty: Record<string, number> };
  };
} {
  const selectState = (
    state: 'FL' | 'WA',
    target: number
  ): CanaryManifestRecord[] => {
    const candidates = pool.filter((p) => p.stateCode === state);
    if (candidates.length <= target) {
      return candidates.map((p, i) =>
        toManifest(p, i + 1, 'full_eligible_pool')
      );
    }

    const selected: PublicationReadyProvider[] = [];
    const selectedIds = new Set<string>();
    const countyCounts = new Map<string, number>();

    // Pass 1: one provider per county (lowest companyId — already sorted)
    for (const p of candidates) {
      if (selected.length >= target) break;
      if (countyCounts.has(p.homeCountyFips)) continue;
      selected.push(p);
      selectedIds.add(p.companyId);
      countyCounts.set(p.homeCountyFips, 1);
    }

    // Pass 2: prefer underrepresented counties, then strata balance
    const remaining = candidates.filter((p) => !selectedIds.has(p.companyId));
    remaining.sort((a, b) => {
      const ca = countyCounts.get(a.homeCountyFips) ?? 0;
      const cb = countyCounts.get(b.homeCountyFips) ?? 0;
      if (ca !== cb) return ca - cb;
      // strata: prefer mix of dba/usdot via hash of id
      const ha = fnv1a(`${a.companyId}|canary`);
      const hb = fnv1a(`${b.companyId}|canary`);
      if (ha !== hb) return ha - hb;
      return a.companyId.localeCompare(b.companyId);
    });

    for (const p of remaining) {
      if (selected.length >= target) break;
      selected.push(p);
      selectedIds.add(p.companyId);
      countyCounts.set(
        p.homeCountyFips,
        (countyCounts.get(p.homeCountyFips) ?? 0) + 1
      );
    }

    // Final stable order by companyId for rank assignment determinism
    selected.sort((a, b) => a.companyId.localeCompare(b.companyId));

    return selected.map((p, i) => {
      const reasons = [
        'publication_ready',
        'verified_home_county',
        'active_verified_authority',
        'mover_role',
        'non_franchise',
        countyCounts.get(p.homeCountyFips) === 1
          ? 'county_diversity_seed'
          : 'county_fill_strata',
        p.hasDba ? 'has_dba' : 'no_dba',
        p.hasUsdot ? 'has_usdot' : 'no_usdot',
      ];
      return toManifest(p, i + 1, reasons.join('+'));
    });
  };

  // Fix dual role: state-only canary profiles are state_only unless federal HHG verified.
  const fixRole = (rows: CanaryManifestRecord[]) =>
    rows.map((r) => ({
      ...r,
      profileRole: 'state_only_local_mover' as const,
    }));

  const FL = fixRole(selectState('FL', targets.FL));
  const WA = fixRole(selectState('WA', targets.WA));

  const geo = (rows: CanaryManifestRecord[]) => {
    const byCounty: Record<string, number> = {};
    for (const r of rows) {
      const key = r.homeCountyName
        ? `${r.homeCountyName} (${r.homeCountyFips})`
        : r.homeCountyFips;
      byCounty[key] = (byCounty[key] ?? 0) + 1;
    }
    return {
      countiesRepresented: Object.keys(byCounty).length,
      byCounty,
    };
  };

  return {
    FL,
    WA,
    geography: { FL: geo(FL), WA: geo(WA) },
  };
}

export function manifestSha(rows: readonly CanaryManifestRecord[]): string {
  const payload = rows
    .map((r) => `${r.selectionRank}|${r.companyId}|${r.slug}|${r.homeCountyFips}`)
    .join('\n');
  // FNV-1a hex
  let h = 0x811c9dc5;
  for (let i = 0; i < payload.length; i++) {
    h ^= payload.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (`00000000` + (h >>> 0).toString(16)).slice(-8);
}

export { FUTURE_PUBLICATION_PLAN };
