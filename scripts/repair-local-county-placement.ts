/**
 * Repair Intrastate / Local county placement for funnel-onboarded movers.
 *
 * Root causes addressed:
 * 1. service_scope / coverage_counties columns missing in production (run migration)
 * 2. is_verified=false excluded locals from county loaders (historically)
 * 3. Assignments exist but companies not marked intrastate
 *
 * Usage:
 *   # Single company (optional explicit counties)
 *   npx tsx scripts/repair-local-county-placement.ts otterly-elite-movers-llc
 *   npx tsx scripts/repair-local-county-placement.ts otterly-elite-movers-llc oregon/lane,oregon/douglas
 *
 *   # Bulk: all companies with local_intrastate_selection assignments
 *   npx tsx scripts/repair-local-county-placement.ts --all
 *   npx tsx scripts/repair-local-county-placement.ts --all --dry-run
 *
 *   # From approved suggestions with selected_counties
 *   npx tsx scripts/repair-local-county-placement.ts --from-suggestions --dry-run
 *   npx tsx scripts/repair-local-county-placement.ts --from-suggestions
 *
 * Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * After data repair, apply migration if columns missing:
 *   supabase/migrations/20260718160000_interstate_intrastate_scope.sql
 * Then: NOTIFY pgrst, 'reload schema';
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
loadEnvLocal();

import { createClient } from '@supabase/supabase-js';
// Do not import revalidate-county-pages at top level (server-only). Use stub when running via CLI:
//   npx tsx --require ./scripts/stub-server-only.cjs scripts/repair-local-county-placement.ts --all

type SelectedCounty = {
  stateSlug: string;
  countySlug: string;
  name?: string;
};

const DEFAULT_OTTERLY_COUNTIES: SelectedCounty[] = [
  { stateSlug: 'oregon', countySlug: 'lane', name: 'Lane' },
  { stateSlug: 'oregon', countySlug: 'douglas', name: 'Douglas' },
  { stateSlug: 'oregon', countySlug: 'josephine', name: 'Josephine' },
  { stateSlug: 'oregon', countySlug: 'jackson', name: 'Jackson' },
];

function parseCountiesArg(raw?: string): SelectedCounty[] {
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((part) => {
      const [stateSlug, countySlug] = part.trim().split('/');
      return {
        stateSlug: (stateSlug ?? '').toLowerCase(),
        countySlug: (countySlug ?? '').toLowerCase(),
      };
    })
    .filter((c) => c.stateSlug && c.countySlug);
}

function argFlag(name: string): boolean {
  return process.argv.includes(name);
}

async function main() {
  const dryRun = argFlag('--dry-run');
  const allMode = argFlag('--all');
  const fromSuggestions = argFlag('--from-suggestions');
  const positionals = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const companySlugPos = positionals[0];
  const countiesArg = positionals[1];

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { persistSession: false } });

  // Detect scope columns
  const probe = await admin.from('companies').select('service_scope, coverage_counties').limit(1);
  const hasScopeCols = !probe.error;
  if (!hasScopeCols) {
    console.warn(
      'WARNING: companies.service_scope / coverage_counties missing.\n' +
        '  Apply: supabase/migrations/20260718160000_interstate_intrastate_scope.sql\n' +
        '  Then:  NOTIFY pgrst, \'reload schema\';\n' +
        '  Continuing with is_verified + assignments only.'
    );
  } else {
    console.log('service_scope + coverage_counties columns: OK');
  }

  type WorkItem = {
    companyId: string;
    slug: string;
    name: string;
    counties: SelectedCounty[];
  };

  const work: WorkItem[] = [];

  if (fromSuggestions) {
    const { data: suggestions, error } = await admin
      .from('company_suggestions')
      .select('id, name, slug, company_id, service_scope, selected_counties, status')
      .eq('status', 'approved')
      .eq('service_scope', 'intrastate')
      .limit(2000);
    if (error) {
      console.error('Suggestions query failed (column may be missing):', error.message);
      process.exit(1);
    }
    for (const s of suggestions || []) {
      const counties = Array.isArray(s.selected_counties)
        ? (s.selected_counties as SelectedCounty[]).filter((c) => c?.stateSlug && c?.countySlug)
        : [];
      if (!counties.length) continue;
      const companyId = s.company_id || s.slug;
      if (!companyId) continue;
      work.push({
        companyId: String(companyId),
        slug: String(s.slug || companyId),
        name: String(s.name || companyId),
        counties,
      });
    }
    console.log(`From suggestions: ${work.length} approved intrastate with counties`);
  } else if (allMode) {
    const { data: assigns, error } = await admin
      .from('company_destination_assignments')
      .select('company_id, company_slug, state_slug, county_slug, source')
      .eq('source', 'local_intrastate_selection')
      .limit(10000);
    if (error) {
      console.error('Assignments query failed:', error.message);
      process.exit(1);
    }
    const byCompany = new Map<string, WorkItem>();
    for (const a of assigns || []) {
      const id = a.company_id || a.company_slug;
      if (!id) continue;
      if (!byCompany.has(id)) {
        byCompany.set(id, {
          companyId: id,
          slug: a.company_slug || id,
          name: a.company_slug || id,
          counties: [],
        });
      }
      byCompany.get(id)!.counties.push({
        stateSlug: a.state_slug,
        countySlug: a.county_slug,
      });
    }
    work.push(...byCompany.values());
    console.log(`From local_intrastate_selection assignments: ${work.length} companies`);
  } else if (companySlugPos) {
    let counties = parseCountiesArg(countiesArg);
    if (!counties.length && companySlugPos.includes('otterly')) {
      counties = DEFAULT_OTTERLY_COUNTIES;
    }
    let { data: company } = await admin
      .from('companies')
      .select('id, slug, name, is_verified, usdot_number, headquarters')
      .or(`slug.eq.${companySlugPos},id.eq.${companySlugPos}`)
      .maybeSingle();
    if (!company) {
      console.error('Company not found:', companySlugPos);
      process.exit(1);
    }
    // Load existing assignments if no counties provided
    if (!counties.length) {
      const { data: existing } = await admin
        .from('company_destination_assignments')
        .select('state_slug, county_slug')
        .eq('company_id', company.id);
      counties = (existing || []).map((e) => ({
        stateSlug: e.state_slug,
        countySlug: e.county_slug,
      }));
    }
    work.push({
      companyId: company.id,
      slug: company.slug,
      name: company.name,
      counties,
    });
  } else {
    console.error(`Usage:
  npx tsx scripts/repair-local-county-placement.ts <slug> [state/county,...]
  npx tsx scripts/repair-local-county-placement.ts --all [--dry-run]
  npx tsx scripts/repair-local-county-placement.ts --from-suggestions [--dry-run]`);
    process.exit(1);
  }

  let updated = 0;
  let assignmentWrites = 0;
  let skipped = 0;
  const allCounties: SelectedCounty[] = [];

  for (const item of work) {
    const { data: company } = await admin
      .from('companies')
      .select('id, slug, name, is_verified, usdot_number, headquarters')
      .or(`id.eq.${item.companyId},slug.eq.${item.companyId},slug.eq.${item.slug}`)
      .maybeSingle();

    if (!company) {
      console.warn('SKIP missing company', item.companyId, item.slug);
      skipped++;
      continue;
    }

    const publicName = company.name.replace(/\s+LLC\.?$/i, '').trim() || company.name;
    const update: Record<string, unknown> = {
      is_verified: true,
      name: publicName,
      updated_at: new Date().toISOString(),
    };
    if (hasScopeCols) {
      update.service_scope = 'intrastate';
      if (item.counties.length) {
        update.coverage_counties = item.counties;
      }
      // Locals: clear USDOT only if empty already — don't wipe real DOT if present
    }

    if (dryRun) {
      console.log('[dry-run] would update', company.slug, update, 'counties', item.counties.length);
      updated++;
      allCounties.push(...item.counties);
      continue;
    }

    const { error: updateError } = await admin
      .from('companies')
      .update(update)
      .eq('id', company.id);

    if (updateError) {
      // Retry without scope cols
      const { error: e2 } = await admin
        .from('companies')
        .update({
          is_verified: true,
          name: publicName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', company.id);
      if (e2) {
        console.error('Update failed', company.slug, e2.message);
        skipped++;
        continue;
      }
    }
    updated++;

    // Ensure assignments exist
    const now = new Date().toISOString();
    for (const c of item.counties) {
      const row = {
        company_id: company.id,
        company_slug: company.slug,
        state_slug: c.stateSlug,
        county_slug: c.countySlug,
        destination_slug: null as string | null,
        headquarters: company.headquarters,
        source: 'local_intrastate_selection',
        updated_at: now,
      };
      const { error: upErr } = await admin
        .from('company_destination_assignments')
        .upsert([row], { onConflict: 'company_id,state_slug,county_slug' });
      if (upErr) {
        console.warn('assignment fail', company.slug, c, upErr.message);
      } else {
        assignmentWrites++;
        allCounties.push(c);
      }
    }

    console.log('OK', company.slug, 'counties', item.counties.length);
  }

  if (!dryRun && allCounties.length) {
    try {
      const { revalidateLocalMoverCountyPages } = await import(
        '../lib/local-movers/revalidate-county-pages'
      );
      revalidateLocalMoverCountyPages(allCounties, {
        reason: 'repair_local_county_placement',
      });
      console.log('Revalidated county pages for', allCounties.length, 'county refs');
    } catch (e) {
      console.warn(
        'Revalidate skipped (CLI without Next cache is OK):',
        e instanceof Error ? e.message : e
      );
      console.warn(
        'Deploy or wait for ISR (~60s). Optionally revalidate paths in Vercel after deploy.'
      );
    }
  }

  console.log(
    JSON.stringify(
      {
        dryRun,
        companiesUpdated: updated,
        skipped,
        assignmentWrites,
        countyRefs: allCounties.length,
        hasScopeCols,
      },
      null,
      2
    )
  );
  console.log('\nAfter deploy / cache (~60s), check e.g.:');
  console.log('  /local-movers/florida/broward');
  console.log('  /local-movers/oregon/lane');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
