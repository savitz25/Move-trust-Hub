/**
 * Generic state rebuild from active Supabase companies.
 * Same process as TX / CA / AZ / NM.
 *
 * Active = not out_of_service AND authority_active !== false
 * Order: local (destination) → state-focused → national
 *
 * Usage:
 *   npx tsx scripts/rebuild-state-from-active-db.ts nevada
 *   npx tsx scripts/rebuild-state-from-active-db.ts oregon
 *   npx tsx scripts/rebuild-state-from-active-db.ts washington
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
} from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { assessLicense } from '../lib/trust/license-verification';
import { localStates } from '../lib/local-movers/states';

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

/** State slug → HQ detection helpers */
const STATE_HQ: Record<
  string,
  { code: string; name: string; cities: RegExp }
> = {
  nevada: {
    code: 'nv',
    name: 'nevada',
    cities:
      /^(las vegas|henderson|reno|north las vegas|sparks|carson city|fernley|elko|mesquite|boulder city|fallon|winnemucca|west wendover|ely|yerington|pahrump|incline village)\b/i,
  },
  oregon: {
    code: 'or',
    name: 'oregon',
    cities:
      /^(portland|salem|eugene|gresham|hillsboro|bend|beaverton|medford|springfield|corvallis|albany|tigard|lake oswego|keizer|grants pass|oregon city|mcminnville|redmond|tualatin|west linn|woodburn|forest grove|newberg|roseburg|klamath falls|ashland|milwaukie|wilsonville|happy valley|troutdale)\b/i,
  },
  washington: {
    code: 'wa',
    name: 'washington',
    cities:
      /^(seattle|spokane|tacoma|vancouver|bellevue|kent|everett|renton|spokane valley|federal way|yakima|kirkland|bellingham|kennewick|auburn|pasco|marysville|lakewood|redmond|shoreline|richland|sammamish|burien|olympia|lacey|edmonds|bothell|lynnwood|bremerton|puvallup|issaquah|longview|mount vernon|wenatchee|pullman)\b/i,
  },
};

const MAJOR_COUNTIES: Record<string, string[]> = {
  nevada: ['clark', 'washoe', 'carson-city', 'douglas', 'lyon', 'nye', 'elko'],
  oregon: [
    'multnomah',
    'washington',
    'clackamas',
    'lane',
    'marion',
    'deschutes',
    'jackson',
  ],
  washington: [
    'king',
    'pierce',
    'snohomish',
    'spokane',
    'clark',
    'thurston',
    'kitsap',
    'whatcom',
    'yakima',
  ],
};

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

function isStateHq(stateSlug: string, c: CompanyRow): boolean {
  const cfg = STATE_HQ[stateSlug];
  if (!cfg) return false;

  // City-specific franchise slugs only become state-focused via destination rows
  if (
    /^(two-men-and-a-truck|all-my-sons|college-hunks)-/.test(c.slug) &&
    !c.slug.endsWith(`-${cfg.code}`) &&
    !c.slug.includes(`-${stateSlug}`)
  ) {
    return false;
  }

  const hq = (c.headquarters || '').toLowerCase();
  const code = cfg.code;
  const name = cfg.name;

  // Prefer explicit state code / full state name in HQ
  if (new RegExp(`,\\s*${code}\\b`, 'i').test(hq)) return true;
  if (hq.endsWith(` ${name}`) || new RegExp(`\\b${name}\\b`).test(hq)) {
    return true;
  }

  // City-only HQ: only match if HQ string also contains state code/name,
  // or is a multi-token string that ends with known city AND contains state.
  // Bare city names like "Auburn" are too ambiguous across states.
  if (cfg.cities.test(hq) && (hq.includes(`, ${code}`) || hq.includes(name))) {
    return true;
  }

  return false;
}

function mapServices(services: unknown): string[] {
  if (!Array.isArray(services) || services.length === 0) return ['Long Distance'];
  return services.map((s) => {
    const v = String(s);
    if (v === 'Full Service' || v === 'Carrier') return 'Long Distance';
    return v;
  });
}

function slugToCamel(slug: string): string {
  return slug
    .split('-')
    .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join('');
}

function constName(stateSlug: string): string {
  return `CURATED_${stateSlug.replace(/-/g, '_').toUpperCase()}_COUNTIES`;
}

async function rebuildState(stateSlug: string) {
  const stateMeta = localStates.find((s) => s.slug === stateSlug);
  if (!stateMeta) throw new Error(`Unknown state: ${stateSlug}`);
  if (!STATE_HQ[stateSlug]) {
    throw new Error(`STATE_HQ config missing for ${stateSlug}`);
  }

  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase env');
  const sb = createClient(url, key);

  console.log(`\n========== ${stateMeta.name.toUpperCase()} ==========`);

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
    `Active (not OOS + authority not inactive): ${active.length}; excluded: ${excludedInactive.length}`
  );
  if (excludedInactive.length) {
    console.log('  excluded:', excludedInactive.map((c) => c.slug).join('; '));
  }

  const displayable: CompanyRow[] = [];
  for (const c of active) {
    const license = assessLicense(c.usdot_number || '', c.mc_number || '');
    if (!license.isDisplayable) continue;
    displayable.push(c);
  }
  console.log(`Displayable USDOT: ${displayable.length}`);

  const displayableBySlug = new Map(displayable.map((c) => [c.slug, c]));
  const displayableMoverIds = new Set(
    displayable.map((c) => moverIdForSlug(c.slug))
  );

  const { data: destRows, error: destErr } = await sb
    .from('company_destination_assignments')
    .select('company_slug, county_slug')
    .eq('state_slug', stateSlug);
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
    `Dest rows: ${(destRows ?? []).length}; dropped non-active: ${destDropped}; dest companies: ${stateWideSlugs.size}`
  );

  for (const c of displayable) {
    if (isStateHq(stateSlug, c)) stateWideSlugs.add(c.slug);
  }

  const nationalSlugs = new Set(
    displayable.filter(isNational).map((c) => c.slug)
  );
  console.log(
    `National: ${nationalSlugs.size}; state-focused: ${stateWideSlugs.size}`
  );

  // Refresh shared active catalog
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
 * Generated by: npx tsx scripts/rebuild-state-from-active-db.ts ${stateSlug}
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

  const counties = getCountiesForState(stateSlug);
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

  const camel = slugToCamel(stateSlug);
  const exportName = `${camel}CountyMoverAssignments`;
  const cn = constName(stateSlug);

  writeFileSync(
    `data/${stateSlug}-county-assignments.ts`,
    `import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/**
 * ${stateMeta.name} county → ACTIVE directory movers only.
 *
 * Source: Supabase companies with admin-active status
 * (not out_of_service, authority_active !== false) + destination assignments
 * + national carriers.
 * Generated by: npx tsx scripts/rebuild-state-from-active-db.ts ${stateSlug}
 *
 * Order on every county: local → ${stateMeta.name}-focused → national.
 */
const ${cn}: Record<string, string[]> = {
${assignmentLines}
};

export const ${exportName}: CountyMoverAssignment[] = Object.entries(
  ${cn}
).map(([countySlug, moverIds]) => ({
  stateSlug: '${stateSlug}',
  countySlug,
  moverIds,
}));
`
  );
  console.log(`Wrote data/${stateSlug}-county-assignments.ts`);

  // Badge counts block for later merge
  const counts: Record<string, number> = {};
  for (const [slug, ids] of Object.entries(assignments)) {
    counts[slug] = ids.length;
  }
  mkdirSync('scripts/output', { recursive: true });
  writeFileSync(
    `scripts/output/${stateSlug}-active-rebuild-summary.json`,
    JSON.stringify(
      {
        stateSlug,
        activeCompanies: active.length,
        displayable: displayable.length,
        stateWideCompanies: [...stateWideSlugs],
        nationalCompanies: [...nationalSlugs],
        counties: summary,
        counts,
        major: Object.fromEntries(
          (MAJOR_COUNTIES[stateSlug] ?? []).map((s) => [
            s,
            summary.find((x) => x.county === s),
          ])
        ),
      },
      null,
      2
    )
  );

  const totals = summary.map((s) => s.total);
  console.log(
    `Counties: ${summary.length}, min=${Math.min(...totals)}, max=${Math.max(...totals)}, avg=${(totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1)}`
  );
  for (const s of MAJOR_COUNTIES[stateSlug] ?? []) {
    const row = summary.find((x) => x.county === s);
    console.log(
      `  ${s}: total=${row?.total ?? 'MISSING'} (local=${row?.local ?? '-'}, state=${row?.state ?? '-'}, national=${row?.national ?? '-'})`
    );
  }

  let bad = 0;
  for (const ids of Object.values(assignments)) {
    for (const id of ids) {
      if (!displayableMoverIds.has(id)) bad++;
    }
  }
  console.log(bad === 0 ? 'Whitelist: PASS' : `Whitelist FAIL ${bad}`);

  return { stateSlug, counts, summary };
}

function exportNameForCounts(stateSlug: string): string {
  // arizonaMarketMoverCounts, newMexicoMarketMoverCounts
  const camel = slugToCamel(stateSlug);
  return `${camel}MarketMoverCounts`;
}

function patchBadgeCounts(
  stateSlug: string,
  counts: Record<string, number>
): void {
  const exportName = exportNameForCounts(stateSlug);
  const countLines = Object.keys(counts)
    .sort()
    .map((slug) => {
      const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
      return `  ${key}: ${counts[slug]},`;
    })
    .join('\n');

  const stateLabel =
    localStates.find((s) => s.slug === stateSlug)?.name ?? stateSlug;

  const block = `/** ${stateLabel} — exact listed (active directory only) movers per county page */
export const ${exportName}: Record<string, number> = {
${countLines}
};
`;

  const path = 'lib/local-movers/county-market-mover-counts.ts';
  let src = readFileSync(path, 'utf8');

  const blockRe = new RegExp(
    `\\/\\*\\* ${stateLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?export const ${exportName}: Record<string, number> = \\{[\\s\\S]*?\\n\\};\\n`
  );

  if (blockRe.test(src)) {
    src = src.replace(blockRe, block + '\n');
  } else if (/export const arizonaMarketMoverCounts/.test(src)) {
    src = src.replace(
      /(export const arizonaMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
      `$1\n${block}\n`
    );
  } else if (/export const newMexicoMarketMoverCounts/.test(src)) {
    src = src.replace(
      /(export const newMexicoMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
      `$1\n${block}\n`
    );
  } else if (/export const texasMarketMoverCounts/.test(src)) {
    src = src.replace(
      /(export const texasMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
      `$1\n${block}\n`
    );
  } else {
    src = src.replace(
      /(export const californiaMarketMoverCounts: Record<string, number> = \{[\s\S]*?\n\};\n)/,
      `$1\n${block}\n`
    );
  }

  // marketCountsByState key
  const mapKey = stateSlug.includes('-')
    ? `'${stateSlug}'`
    : stateSlug;
  const mapEntry = `${mapKey}: ${exportName}`;
  if (!src.includes(mapEntry)) {
    // insert into marketCountsByState
    if (/arizona: arizonaMarketMoverCounts/.test(src)) {
      src = src.replace(
        /arizona: arizonaMarketMoverCounts,?/,
        `arizona: arizonaMarketMoverCounts,\n  ${mapEntry},`
      );
    } else if (/'new-mexico': newMexicoMarketMoverCounts/.test(src)) {
      src = src.replace(
        /'new-mexico': newMexicoMarketMoverCounts,?/,
        `'new-mexico': newMexicoMarketMoverCounts,\n  ${mapEntry},`
      );
    } else if (/texas: texasMarketMoverCounts/.test(src)) {
      src = src.replace(
        /texas: texasMarketMoverCounts,?/,
        `texas: texasMarketMoverCounts,\n  ${mapEntry},`
      );
    } else {
      src = src.replace(
        /california: californiaMarketMoverCounts,?/,
        `california: californiaMarketMoverCounts,\n  ${mapEntry},`
      );
    }
  }

  writeFileSync(path, src);
  const vals = Object.values(counts);
  console.log(
    `Synced badges for ${stateSlug}: min=${Math.min(...vals)} max=${Math.max(...vals)}`
  );
}

async function verifyState(stateSlug: string) {
  // Dynamic import after files written
  const { getMoversForCounty } = await import('../lib/local-movers/index');
  const { getCountiesForState } = await import(
    '../lib/local-movers/geography/index'
  );
  const { ACTIVE_MOVER_ID_WHITELIST } = await import(
    '../data/active-directory-movers'
  );

  const counties = getCountiesForState(stateSlug);
  let empty = 0;
  let leaks = 0;
  let notCurated = 0;
  const slugs = new Set<string>();

  for (const c of counties) {
    const r = getMoversForCounty(stateSlug, c.slug);
    if (!r?.movers.length) empty++;
    for (const m of r?.movers ?? []) {
      slugs.add(m.profileSlug || m.id.replace(/^directory-/, ''));
      if (!ACTIVE_MOVER_ID_WHITELIST.has(m.id)) {
        console.log('LEAK', stateSlug, c.slug, m.id);
        leaks++;
      }
    }
  }

  // authority check
  loadEnvLocal();
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await sb
    .from('companies')
    .select('slug, authority_active, out_of_service')
    .in('slug', [...slugs]);
  const inactive = (data ?? []).filter(
    (c) => c.out_of_service || c.authority_active === false
  );

  console.log(`Verify ${stateSlug}:`, {
    counties: counties.length,
    empty,
    leaks,
    notCurated,
    uniqueOnPages: slugs.size,
    inactiveOnPages: inactive.length,
    inactiveList: inactive.map((c) => c.slug),
  });

  for (const s of MAJOR_COUNTIES[stateSlug] ?? []) {
    const r = getMoversForCounty(stateSlug, s);
    console.log(
      `  ${s}: listed=${r?.movers.length ?? 0} top=${(r?.movers ?? [])
        .slice(0, 3)
        .map((m) => m.name)
        .join(' | ')}`
    );
  }
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const states = args.length ? args : ['nevada', 'oregon', 'washington'];

  for (const stateSlug of states) {
    const { counts } = await rebuildState(stateSlug);
    patchBadgeCounts(stateSlug, counts);
  }

  // Re-verify after all writes (need fresh module cache — run via separate process ideally)
  // Clear require cache by dynamic import of re-built files is flaky in same process;
  // spawn verification inline after rebuild by re-importing getMoversForCounty
  // which was already loaded... Force re-verify using assignment files only.
  for (const stateSlug of states) {
    await verifyState(stateSlug);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
