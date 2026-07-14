/**
 * Texas-only cleanup + rebuild using the 129 active companies from Supabase.
 *
 * Step 1: Strip ALL non-active IDs from Texas county assignments.
 * Step 2: Rebuild each county with only active companies that:
 *   - have a destination assignment for that county (local), OR
 *   - serve Texas (any TX destination / TX HQ) (state), OR
 *   - operate nationally (coverage or national brand) (national)
 * Ordered: local → state → national
 *
 * Also generates data/active-directory-movers.ts so these companies
 * exist in the local-movers catalog as displayable directory-* entries.
 *
 * Run: npx tsx scripts/rebuild-texas-from-active-db.ts
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
} from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { assessLicense } from '../lib/trust/license-verification';

function loadEnvLocal() {
  try {
    const raw = readFileSync('.env.local', 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i < 0) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {
    /* ignore */
  }
}

/** Known catalog IDs that map 1:1 to company slug (no directory- prefix) */
const SLUG_AS_MOVER_ID = new Set([
  'amerisafe-van-lines',
  'international-van-lines',
  'american-van-lines',
  'colonial-van-lines',
  'moving-apt',
]);

const NATIONAL_COVERAGE_RE =
  /continental|all 50|all 48|nationwide|national|48 states|50 states/i;

/** Corporate / multi-state brands (slug allowlist) — not city franchisees */
const NATIONAL_SLUGS = new Set([
  'allied-van-lines',
  'united-van-lines',
  'north-american-van-lines',
  'mayflower-transit',
  'atlas-van-lines',
  'bekins-van-lines',
  'wheaton-world-wide',
  'graebel-van-lines',
  'arpin-van-lines',
  'national-van-lines',
  'jk-moving-services',
  'pensey-moving',
  'safeway-moving',
  'gentle-giant-moving',
  'stevens-worldwide',
  'we-move-u',
  'two-men-and-a-truck', // corporate brand only, not city franchises
  'american-van-lines',
  'amerisafe-van-lines',
  'colonial-van-lines',
  'moving-apt',
  'international-van-lines',
  'bellhop',
  'u-pack',
]);

type CompanyRow = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  usdot_number: string | null;
  mc_number: string | null;
  is_verified: boolean;
  out_of_service: boolean | null;
  authority_active: boolean | null;
  coverage: string | null;
  services: string[] | null;
  specialties: string[] | null;
  overall_rating: number | null;
  review_count: number | null;
  short_description?: string | null;
  fmcsa_safety_rating?: string | null;
  bbb_rating?: string | null;
};

function moverIdForSlug(slug: string): string {
  return SLUG_AS_MOVER_ID.has(slug) ? slug : `directory-${slug}`;
}

function isNational(c: CompanyRow): boolean {
  // City/region franchise slugs are never national (e.g. two-men-and-a-truck-chico)
  if (/^two-men-and-a-truck-/.test(c.slug) && c.slug !== 'two-men-and-a-truck') {
    return false;
  }
  if (NATIONAL_SLUGS.has(c.slug)) return true;
  // Explicit multi-state coverage on the company record
  if (c.coverage && NATIONAL_COVERAGE_RE.test(c.coverage)) return true;
  // Van-line style brand names with national coverage wording only (handled above)
  return false;
}

function isTexasHq(c: CompanyRow): boolean {
  const hq = (c.headquarters || '').toLowerCase();
  return (
    /,\s*tx\b/.test(hq) ||
    hq.endsWith(' texas') ||
    /\btexas\b/.test(hq) ||
    // city-only HQs that are clearly TX cities
    /^(houston|dallas|austin|san antonio|fort worth|el paso|arlington|plano|irving|lubbock|amarillo|corpus christi|laredo|midland|odessa|beaumont|waco|tyler|lufkin|galveston|mckinney|frisco|denton|round rock|killeen|college station|brownsville|mcallen|pasadena|mesquite|carrollton|garland|grand prairie|abilene|wichita falls|san angelo|sugar land|the woodlands|conroe|pearland|league city)\b/i.test(
      hq
    )
  );
}

function mapServices(services: unknown): string[] {
  if (!Array.isArray(services) || services.length === 0) return ['Long Distance'];
  return services.map((s) => {
    const v = String(s);
    if (v === 'Full Service' || v === 'Carrier') return 'Long Distance';
    return v;
  });
}

async function main() {
  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase env');

  const sb = createClient(url, key);

  // --- Load active companies (full companies table = 129 active directory) ---
  const { data: companies, error } = await sb
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, mc_number, is_verified, out_of_service, authority_active, coverage, services, specialties, overall_rating, review_count, short_description, fmcsa_safety_rating, bbb_rating'
    )
    .order('name');
  if (error) throw error;
  if (!companies?.length) throw new Error('No companies returned');

  // Match admin deriveCompanyStatus: active only if NOT out_of_service AND
  // authority_active is not false (inactive FMCSA authority must not list).
  const active = (companies as CompanyRow[]).filter(
    (c) => !c.out_of_service && c.authority_active !== false
  );
  const excludedInactive = (companies as CompanyRow[]).filter(
    (c) => c.out_of_service || c.authority_active === false
  );
  console.log(
    `Active companies (not OOS + authority not inactive): ${active.length}`
  );
  if (excludedInactive.length) {
    console.log(
      `Excluded inactive/OOS (${excludedInactive.length}):`,
      excludedInactive
        .map(
          (c) =>
            `${c.slug} (oos=${c.out_of_service}, authority_active=${c.authority_active})`
        )
        .join('; ')
    );
  }

  const activeBySlug = new Map(active.map((c) => [c.slug, c]));
  const activeMoverIds = new Set(active.map((c) => moverIdForSlug(c.slug)));

  // License gate — only keep companies with displayable USDOT
  const displayable: CompanyRow[] = [];
  const skippedLicense: string[] = [];
  for (const c of active) {
    const license = assessLicense(c.usdot_number || '', c.mc_number || '');
    if (!license.isDisplayable) {
      skippedLicense.push(`${c.slug} (${license.issues.join(',') || 'invalid'})`);
      continue;
    }
    displayable.push(c);
  }
  console.log(
    `Displayable (valid USDOT): ${displayable.length}; skipped ${skippedLicense.length}`
  );
  if (skippedLicense.length) {
    console.log('  skipped:', skippedLicense.slice(0, 10).join('; '));
  }

  const displayableBySlug = new Map(displayable.map((c) => [c.slug, c]));
  const displayableMoverIds = new Set(
    displayable.map((c) => moverIdForSlug(c.slug))
  );

  // --- TX destination assignments (local/state service evidence) ---
  const { data: destRows, error: destErr } = await sb
    .from('company_destination_assignments')
    .select('company_slug, county_slug')
    .eq('state_slug', 'texas');
  if (destErr) throw destErr;

  const localByCounty = new Map<string, Set<string>>();
  const stateWideSlugs = new Set<string>();
  let destDropped = 0;
  for (const row of destRows ?? []) {
    if (!displayableBySlug.has(row.company_slug)) {
      destDropped++;
      continue; // cleanup: ignore deactivated/non-displayable
    }
    stateWideSlugs.add(row.company_slug);
    if (!localByCounty.has(row.county_slug)) {
      localByCounty.set(row.county_slug, new Set());
    }
    localByCounty.get(row.county_slug)!.add(row.company_slug);
  }
  console.log(
    `TX destination rows kept for displayable companies; dropped non-active dest links: ${destDropped}`
  );
  console.log(
    `Companies with TX destinations (state-focused): ${stateWideSlugs.size}`
  );

  // Also treat TX HQ companies as state-focused
  for (const c of displayable) {
    if (isTexasHq(c)) stateWideSlugs.add(c.slug);
  }

  // National set
  const nationalSlugs = new Set(
    displayable.filter(isNational).map((c) => c.slug)
  );
  console.log(`National carriers: ${nationalSlugs.size}`);

  // --- Generate active directory movers catalog ---
  const moverEntries: string[] = [];
  for (const c of displayable) {
    const id = moverIdForSlug(c.slug);
    if (SLUG_AS_MOVER_ID.has(c.slug)) {
      // Already in seed catalog under bare slug — skip redefining
      continue;
    }
    const city =
      c.headquarters?.split(',')[0]?.trim() || c.headquarters || '';
    const rating = Number(c.overall_rating) || 0;
    const reviews = c.review_count || 0;
    const desc = (c.short_description || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    const services = JSON.stringify(mapServices(c.services));
    const specialties = JSON.stringify(
      Array.isArray(c.specialties) ? c.specialties : []
    );
    moverEntries.push(`  '${id}': {
    id: '${id}',
    name: ${JSON.stringify(c.name)},
    profileSlug: ${JSON.stringify(c.slug)},
    rating: ${rating},
    reviewCount: ${reviews},
    shortDescription: ${JSON.stringify(c.short_description || '')},
    services: ${services},
    specialties: ${specialties},
    usdotNumber: ${JSON.stringify(c.usdot_number || '')},
    mcNumber: ${JSON.stringify(c.mc_number || '')},
    fmcsaSafetyRating: ${(JSON.stringify(c.fmcsa_safety_rating || 'Not Rated')) as string},
    bbbRating: ${JSON.stringify(c.bbb_rating || undefined)},
    city: ${JSON.stringify(city)},
  },`);
  }

  const catalogFile = `import type { LocalMover } from '@/lib/local-movers/types';

/**
 * Active directory companies from Supabase.
 * Criteria: not out_of_service AND authority_active !== false
 * (matches admin deriveCompanyStatus === 'active').
 * Generated by: npx tsx scripts/rebuild-texas-from-active-db.ts
 * Count: ${displayable.length} displayable of ${active.length} active.
 *
 * Merged into fullMoversCatalog so Texas county pages list only active
 * authority carriers — never OOS, inactive authority, or seed templates.
 */
export const activeDirectoryMovers: Record<string, LocalMover> = {
${moverEntries.join('\n')}
};

/** Active company slug → local mover id */
export const activeCompanySlugToMoverId: Record<string, string> = {
${displayable
  .map((c) => `  '${c.slug}': '${moverIdForSlug(c.slug)}',`)
  .join('\n')}
};

/** Whitelist of mover IDs allowed on county pages (active directory only) */
export const ACTIVE_MOVER_ID_WHITELIST = new Set<string>([
${displayable.map((c) => `  '${moverIdForSlug(c.slug)}',`).join('\n')}
]);
`;

  writeFileSync('data/active-directory-movers.ts', catalogFile);
  console.log('Wrote data/active-directory-movers.ts');

  // --- Rebuild Texas assignments ---
  const counties = getCountiesForState('texas');
  const assignments: Record<string, string[]> = {};
  const summary: Array<{
    county: string;
    local: number;
    state: number;
    national: number;
    total: number;
  }> = [];

  for (const county of counties) {
    const localSlugs = [...(localByCounty.get(county.slug) ?? [])];
    const localIds = localSlugs
      .map(moverIdForSlug)
      .filter((id) => displayableMoverIds.has(id));

    const stateIds = [...stateWideSlugs]
      .filter((slug) => !localSlugs.includes(slug))
      .map(moverIdForSlug)
      .filter((id) => displayableMoverIds.has(id));

    const nationalIds = [...nationalSlugs]
      .filter((slug) => !localSlugs.includes(slug) && !stateWideSlugs.has(slug))
      .map(moverIdForSlug)
      .filter((id) => displayableMoverIds.has(id));

    // Strict order: local → state → national; de-dupe
    const ordered: string[] = [];
    const seen = new Set<string>();
    for (const id of [...localIds, ...stateIds, ...nationalIds]) {
      if (seen.has(id)) continue;
      // Final safety: only active whitelist
      if (!displayableMoverIds.has(id)) continue;
      seen.add(id);
      ordered.push(id);
    }

    assignments[county.slug] = ordered;
    summary.push({
      county: county.slug,
      local: localIds.length,
      state: stateIds.length,
      national: nationalIds.length,
      total: ordered.length,
    });
  }

  // Write texas-county-assignments.ts — CLEAN, no legacy IDs
  const assignmentLines = Object.keys(assignments)
    .sort()
    .map((slug) => {
      const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
      const ids = assignments[slug];
      if (!ids.length) {
        return `  ${key}: [],`;
      }
      const body = ids.map((id) => `    '${id}',`).join('\n');
      return `  ${key}: [\n${body}\n  ],`;
    })
    .join('\n');

  const assignmentFile = `import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/**
 * Texas county → ACTIVE directory movers only.
 *
 * Source of truth: Supabase \`companies\` with admin-active status
 * (not out_of_service, authority_active !== false) + destination assignments
 * for local/state placement + national carriers.
 * Generated by: npx tsx scripts/rebuild-texas-from-active-db.ts
 *
 * CLEANUP: No seed templates, no inactive FMCSA authority, no OOS, no removed movers.
 * Order on every county: local → Texas-focused → national.
 */
const CURATED_TX_COUNTIES: Record<string, string[]> = {
${assignmentLines}
};

export const texasCountyMoverAssignments: CountyMoverAssignment[] = Object.entries(
  CURATED_TX_COUNTIES
).map(([countySlug, moverIds]) => ({
  stateSlug: 'texas',
  countySlug,
  moverIds,
}));
`;

  writeFileSync('data/texas-county-assignments.ts', assignmentFile);
  console.log('Wrote data/texas-county-assignments.ts');

  // Badge counts
  const countLines = Object.keys(assignments)
    .sort()
    .map((slug) => {
      const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
      return `  ${key}: ${assignments[slug].length},`;
    })
    .join('\n');

  mkdirSync('scripts/output', { recursive: true });
  writeFileSync(
    'scripts/output/tx-active-rebuild-summary.json',
    JSON.stringify(
      {
        activeCompanies: active.length,
        displayable: displayable.length,
        skippedLicense,
        stateWideCompanies: [...stateWideSlugs],
        nationalCompanies: [...nationalSlugs],
        counties: summary,
        major: Object.fromEntries(
          [
            'harris',
            'dallas',
            'tarrant',
            'bexar',
            'travis',
            'collin',
            'denton',
            'fort-bend',
            'el-paso',
            'hidalgo',
            'williamson',
            'montgomery',
          ].map((s) => {
            const row = summary.find((x) => x.county === s);
            return [s, row];
          })
        ),
      },
      null,
      2
    )
  );

  // Stats
  const totals = summary.map((s) => s.total);
  console.log('\n=== TEXAS REBUILD SUMMARY ===');
  console.log(
    `Counties: ${summary.length}, min=${Math.min(...totals)}, max=${Math.max(...totals)}, avg=${(totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1)}`
  );
  for (const s of [
    'harris',
    'dallas',
    'tarrant',
    'bexar',
    'travis',
    'collin',
    'el-paso',
  ]) {
    const row = summary.find((x) => x.county === s);
    console.log(
      `  ${s}: total=${row?.total} (local=${row?.local}, state=${row?.state}, national=${row?.national})`
    );
  }

  // Verify zero non-whitelist IDs
  let bad = 0;
  for (const [slug, ids] of Object.entries(assignments)) {
    for (const id of ids) {
      if (!displayableMoverIds.has(id)) {
        console.error(`LEAK non-active id ${id} on ${slug}`);
        bad++;
      }
    }
  }
  console.log(bad === 0 ? 'Whitelist check: PASS' : `Whitelist check: FAIL ${bad}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
