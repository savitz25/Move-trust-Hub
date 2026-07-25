/**
 * Locked Tier 2 contract checks for GA Wave 2.
 * Run: npx tsx scripts/verify-ga-tier2-wave2.ts
 */
import {
  getCountyIntelligencePack,
  GA_TIER1_CORE,
  GA_TIER2_WAVE1,
  GA_TIER2_WAVE2,
} from '../lib/local-movers/county-intelligence/registry';
import { getCountyPopularRoutes } from '../lib/local-movers/county-popular-routes';
import { isFactualCorridorList } from '../lib/local-movers/county-major-corridors';

const FORBIDDEN =
  /\b(FDACS|Chapter 507|BHGS|TxDMV|NYSDOT|NJ BPU|Board of Public Utilities|PA PUC|UTC household goods permit|NCUC)\b/i;

const failures: string[] = [];

for (const slug of GA_TIER2_WAVE2) {
  if ((GA_TIER1_CORE as readonly string[]).includes(slug)) {
    failures.push(`${slug}: listed in GA_TIER1_CORE — skip Tier 2 rebuild`);
  }
  if ((GA_TIER2_WAVE1 as readonly string[]).includes(slug)) {
    failures.push(`${slug}: listed in GA_TIER2_WAVE1 — do not rebuild Wave 1`);
  }

  const pack = getCountyIntelligencePack('georgia', slug);
  if (!pack) {
    failures.push(`${slug}: missing pack`);
    continue;
  }

  const h1 = pack.h1 ?? '';
  const blob = JSON.stringify(pack);
  const routes = getCountyPopularRoutes('georgia', slug);

  if (pack.contentTier !== 'tier2') failures.push(`${slug}: contentTier !== tier2`);
  if (!pack.parentCompare || pack.parentCompare.bullets.length < 3) {
    failures.push(`${slug}: parentCompare needs ≥3 bullets`);
  }
  if (
    !pack.parentCompare?.title ||
    !/^Compared with/i.test(pack.parentCompare.title)
  ) {
    failures.push(`${slug}: parentCompare title must start with Compared with`);
  }
  if (!h1 || /^Movers Serving/i.test(h1) || !/^Moving in /i.test(h1)) {
    failures.push(`${slug}: narrative H1 must start with "Moving in " (got ${h1})`);
  }
  if (pack.zones.length < 2 || pack.zones.length > 4) {
    failures.push(`${slug}: zones must be 2–4 (got ${pack.zones.length})`);
  }
  const specs = pack.specialized?.length ?? 0;
  if (specs < 2 || specs > 3) {
    failures.push(`${slug}: specialized must be 2–3 (got ${specs})`);
  }
  const reloc = pack.relocation?.modules ?? [];
  if (
    !reloc.length ||
    reloc.length > 2 ||
    !reloc.every(
      (m) =>
        /school|education/i.test(m.title) || /hospital|health/i.test(m.title)
    )
  ) {
    failures.push(`${slug}: relocation must be schools+hospitals only`);
  }
  if (!isFactualCorridorList(pack.majorCorridors ?? '')) {
    failures.push(`${slug}: majorCorridors missing/not factual (${pack.majorCorridors})`);
  }
  if (routes.length < 4) {
    failures.push(`${slug}: popular routes < 4 (got ${routes.length})`);
  }
  if (!/DPS|MCCD|household-goods|household goods/i.test(blob)) {
    failures.push(`${slug}: missing GA DPS/MCCD / household-goods language`);
  }
  if (!/FMCSA/i.test(blob)) failures.push(`${slug}: missing FMCSA`);
  if (FORBIDDEN.test(blob)) failures.push(`${slug}: foreign regulator bleed`);
  if (pack.stateSlug !== 'georgia') failures.push(`${slug}: wrong stateSlug`);

  // No Invalid Date: lastReviewed must parse
  if (!pack.lastReviewed || Number.isNaN(Date.parse(pack.lastReviewed))) {
    failures.push(`${slug}: lastReviewed missing or invalid (${pack.lastReviewed})`);
  }

  console.log('ok', {
    slug,
    h1,
    parent: pack.parentCompare?.parentLabel,
    zones: pack.zones.length,
    specs,
    reloc: reloc.length,
    routes: routes.length,
    lastReviewed: pack.lastReviewed,
  });
}

if (failures.length) {
  console.error('\nGA TIER 2 WAVE 2 CONTRACT FAILURES:');
  for (const f of failures) console.error(' -', f);
  process.exit(1);
}

console.log('\nGA Tier 2 Wave 2 contract checks passed.');
