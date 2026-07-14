/**
 * New Mexico-only cleanup + rebuild using active Supabase companies.
 * Same process as Texas / California / Arizona.
 *
 * Active = not out_of_service AND authority_active !== false
 * Per county order: local (destination) → NM-focused → national
 *
 * Run: npx tsx scripts/rebuild-new-mexico-from-active-db.ts
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

const SLUG_AS_MOVER_ID = new Set([
  'amerisafe-van-lines',
  'international-van-lines',
  'american-van-lines',
  'colonial-van-lines',
  'moving-apt',
]);

const NATIONAL_COVERAGE_RE =
  /continental|all 50|all 48|nationwide|national|48 states|50 states/i;

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
  'two-men-and-a-truck',
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
  if (/^two-men-and-a-truck-/.test(c.slug) && c.slug !== 'two-men-and-a-truck') {
    return false;
  }
  if (NATIONAL_SLUGS.has(c.slug)) return true;
  if (c.coverage && NATIONAL_COVERAGE_RE.test(c.coverage)) return true;
  return false;
}

function isNewMexicoHq(c: CompanyRow): boolean {
  const hq = (c.headquarters || '').toLowerCase();
  return (
    /,\s*nm\b/.test(hq) ||
    hq.endsWith(' new mexico') ||
    /\bnew mexico\b/.test(hq) ||
    /^(albuquerque|santa fe|las cruces|rio rancho|roswell|farmington|clovis|hobbs|alamogordo|carlsbad|gallup|los lunas|deming|los alamos|chaparral|sunland park|las vegas|portales|artesias|lovington|silver city|espanola|grants|socorro|ruidoso|truth or consequences|taos|aztec|bloomfield|belen|corrales)\b/i.test(
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

  const { data: companies, error } = await sb
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, mc_number, is_verified, out_of_service, authority_active, coverage, services, specialties, overall_rating, review_count, short_description, fmcsa_safety_rating, bbb_rating'
    )
    .order('name');
  if (error) throw error;
  if (!companies?.length) throw new Error('No companies returned');

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
      excludedInactive.map((c) => c.slug).join('; ')
    );
  }

  const displayable: CompanyRow[] = [];
  const skippedLicense: string[] = [];
  for (const c of active) {
    const license = assessLicense(c.usdot_number || '', c.mc_number || '');
    if (!license.isDisplayable) {
      skippedLicense.push(c.slug);
      continue;
    }
    displayable.push(c);
  }
  console.log(
    `Displayable (valid USDOT): ${displayable.length}; skipped ${skippedLicense.length}`
  );

  const displayableBySlug = new Map(displayable.map((c) => [c.slug, c]));
  const displayableMoverIds = new Set(
    displayable.map((c) => moverIdForSlug(c.slug))
  );

  const { data: destRows, error: destErr } = await sb
    .from('company_destination_assignments')
    .select('company_slug, county_slug')
    .eq('state_slug', 'new-mexico');
  if (destErr) throw destErr;

  const localByCounty = new Map<string, Set<string>>();
  const stateWideSlugs = new Set<string>();
  let destDropped = 0;
  for (const row of destRows ?? []) {
    if (!displayableBySlug.has(row.company_slug)) {
      destDropped++;
      continue;
    }
    stateWideSlugs.add(row.company_slug);
    if (!localByCounty.has(row.county_slug)) {
      localByCounty.set(row.county_slug, new Set());
    }
    localByCounty.get(row.county_slug)!.add(row.company_slug);
  }
  console.log(
    `NM dest dropped (non-active): ${destDropped}; NM-dest companies: ${stateWideSlugs.size}; dest rows: ${(destRows ?? []).length}`
  );

  for (const c of displayable) {
    if (isNewMexicoHq(c)) stateWideSlugs.add(c.slug);
  }

  const nationalSlugs = new Set(
    displayable.filter(isNational).map((c) => c.slug)
  );
  console.log(
    `National: ${nationalSlugs.size}; NM-focused: ${stateWideSlugs.size}`
  );

  // Refresh shared active directory catalog
  const moverEntries: string[] = [];
  for (const c of displayable) {
    if (SLUG_AS_MOVER_ID.has(c.slug)) continue;
    const id = moverIdForSlug(c.slug);
    const city =
      c.headquarters?.split(',')[0]?.trim() || c.headquarters || '';
    moverEntries.push(`  '${id}': {
    id: '${id}',
    name: ${JSON.stringify(c.name)},
    profileSlug: ${JSON.stringify(c.slug)},
    rating: ${Number(c.overall_rating) || 0},
    reviewCount: ${c.review_count || 0},
    shortDescription: ${JSON.stringify(c.short_description || '')},
    services: ${JSON.stringify(mapServices(c.services))},
    specialties: ${JSON.stringify(Array.isArray(c.specialties) ? c.specialties : [])},
    usdotNumber: ${JSON.stringify(c.usdot_number || '')},
    mcNumber: ${JSON.stringify(c.mc_number || '')},
    fmcsaSafetyRating: ${JSON.stringify(c.fmcsa_safety_rating || 'Not Rated')},
    bbbRating: ${JSON.stringify(c.bbb_rating || undefined)},
    city: ${JSON.stringify(city)},
  },`);
  }

  writeFileSync(
    'data/active-directory-movers.ts',
    `import type { LocalMover } from '@/lib/local-movers/types';

/**
 * Active directory companies from Supabase.
 * Criteria: not out_of_service AND authority_active !== false
 * Generated by: npx tsx scripts/rebuild-new-mexico-from-active-db.ts
 * Count: ${displayable.length} displayable of ${active.length} active.
 */
export const activeDirectoryMovers: Record<string, LocalMover> = {
${moverEntries.join('\n')}
};

export const activeCompanySlugToMoverId: Record<string, string> = {
${displayable.map((c) => `  '${c.slug}': '${moverIdForSlug(c.slug)}',`).join('\n')}
};

export const ACTIVE_MOVER_ID_WHITELIST = new Set<string>([
${displayable.map((c) => `  '${moverIdForSlug(c.slug)}',`).join('\n')}
]);
`
  );
  console.log('Wrote data/active-directory-movers.ts');

  const counties = getCountiesForState('new-mexico');
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

    const ordered: string[] = [];
    const seen = new Set<string>();
    for (const id of [...localIds, ...stateIds, ...nationalIds]) {
      if (seen.has(id) || !displayableMoverIds.has(id)) continue;
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

  const assignmentLines = Object.keys(assignments)
    .sort()
    .map((slug) => {
      const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
      const ids = assignments[slug];
      if (!ids.length) return `  ${key}: [],`;
      return `  ${key}: [\n${ids.map((id) => `    '${id}',`).join('\n')}\n  ],`;
    })
    .join('\n');

  writeFileSync(
    'data/new-mexico-county-assignments.ts',
    `import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/**
 * New Mexico county → ACTIVE directory movers only.
 *
 * Source: Supabase companies with admin-active status
 * (not out_of_service, authority_active !== false) + destination assignments
 * + national carriers.
 * Generated by: npx tsx scripts/rebuild-new-mexico-from-active-db.ts
 *
 * Order on every county: local → New Mexico-focused → national.
 */
const CURATED_NM_COUNTIES: Record<string, string[]> = {
${assignmentLines}
};

export const newMexicoCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_NM_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'new-mexico',
    countySlug,
    moverIds,
  }));
`
  );
  console.log('Wrote data/new-mexico-county-assignments.ts');

  mkdirSync('scripts/output', { recursive: true });
  writeFileSync(
    'scripts/output/nm-active-rebuild-summary.json',
    JSON.stringify(
      {
        activeCompanies: active.length,
        displayable: displayable.length,
        stateWideCompanies: [...stateWideSlugs],
        nationalCompanies: [...nationalSlugs],
        counties: summary,
        major: Object.fromEntries(
          [
            'bernalillo',
            'dona-ana',
            'santa-fe',
            'sandoval',
            'san-juan',
            'valencia',
            'mckinley',
            'eddy',
            'lea',
            'chaves',
          ].map((s) => [s, summary.find((x) => x.county === s)])
        ),
      },
      null,
      2
    )
  );

  const totals = summary.map((s) => s.total);
  console.log('\n=== NEW MEXICO REBUILD SUMMARY ===');
  console.log(
    `Counties: ${summary.length}, min=${Math.min(...totals)}, max=${Math.max(...totals)}, avg=${(totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1)}`
  );
  for (const s of [
    'bernalillo',
    'dona-ana',
    'santa-fe',
    'sandoval',
    'san-juan',
    'valencia',
    'eddy',
    'lea',
  ]) {
    const row = summary.find((x) => x.county === s);
    console.log(
      `  ${s}: total=${row?.total ?? 'MISSING'} (local=${row?.local ?? '-'}, state=${row?.state ?? '-'}, national=${row?.national ?? '-'})`
    );
  }

  let bad = 0;
  for (const [slug, ids] of Object.entries(assignments)) {
    for (const id of ids) {
      if (!displayableMoverIds.has(id)) {
        console.error(`LEAK ${id} on ${slug}`);
        bad++;
      }
    }
  }
  console.log(bad === 0 ? 'Whitelist check: PASS' : `Whitelist FAIL ${bad}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
