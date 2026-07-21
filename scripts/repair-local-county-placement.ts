/**
 * Repair Intrastate / Local county placement for a company (e.g. Otterly Elite Movers).
 *
 * Root cause (diagnosed): assignments existed but is_verified=false excluded them
 * from county page loaders; curated policy also excluded directory profiles without USDOT.
 *
 * Usage:
 *   npx tsx scripts/repair-local-county-placement.ts otterly-elite-movers-llc
 *   npx tsx scripts/repair-local-county-placement.ts otterly-elite-movers-llc oregon/lane,oregon/douglas,oregon/josephine,oregon/jackson
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
loadEnvLocal();

import { createClient } from '@supabase/supabase-js';

type SelectedCounty = {
  stateSlug: string;
  countySlug: string;
  name?: string;
};

const DEFAULT_COUNTIES: SelectedCounty[] = [
  { stateSlug: 'oregon', countySlug: 'lane', name: 'Lane' },
  { stateSlug: 'oregon', countySlug: 'douglas', name: 'Douglas' },
  { stateSlug: 'oregon', countySlug: 'josephine', name: 'Josephine' },
  { stateSlug: 'oregon', countySlug: 'jackson', name: 'Jackson' },
];

function parseCountiesArg(raw?: string): SelectedCounty[] {
  if (!raw?.trim()) return DEFAULT_COUNTIES;
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

async function main() {
  const slugArg = process.argv[2]?.trim();
  if (!slugArg) {
    console.error(
      'Usage: npx tsx scripts/repair-local-county-placement.ts <company-slug> [state/county,...]'
    );
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { persistSession: false } });
  let counties = parseCountiesArg(process.argv[3]);

  let { data: company } = await admin
    .from('companies')
    .select('id, slug, name, is_verified, usdot_number, headquarters')
    .eq('slug', slugArg)
    .maybeSingle();

  if (!company) {
    const byId = await admin
      .from('companies')
      .select('id, slug, name, is_verified, usdot_number, headquarters')
      .eq('id', slugArg)
      .maybeSingle();
    company = byId.data;
  }

  if (!company) {
    const { data: hits } = await admin
      .from('companies')
      .select('id, slug, name')
      .ilike('name', `%${slugArg.replace(/-/g, ' ')}%`)
      .limit(10);
    console.error('Company not found for', slugArg);
    if (hits?.length) {
      console.error('Similar:', hits.map((h) => `${h.slug} (${h.name})`).join(', '));
    }
    process.exit(1);
  }

  console.log('Found:', company);

  // Prefer public trade name without LLC for display
  const publicName = company.name.replace(/\s+LLC\.?$/i, '').trim() || company.name;

  const { error: updateError } = await admin
    .from('companies')
    .update({
      is_verified: true,
      name: publicName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', company.id);

  if (updateError) {
    console.error('Update failed:', updateError.message);
    process.exit(1);
  }
  console.log('Set is_verified=true, name=', publicName);

  // Keep existing assignments if present; otherwise create defaults
  const { data: existing } = await admin
    .from('company_destination_assignments')
    .select('state_slug, county_slug, destination_slug')
    .eq('company_id', company.id);

  if (existing?.length) {
    console.log('Existing assignments (keeping):', existing);
    // Ensure all requested counties exist
    const have = new Set(existing.map((e) => `${e.state_slug}/${e.county_slug}`));
    counties = counties.filter((c) => !have.has(`${c.stateSlug}/${c.countySlug}`));
    if (!counties.length) {
      console.log('All requested counties already assigned.');
      console.log('\nDone. is_verified fixed — county pages will list this mover after deploy/cache.');
      return;
    }
    console.log('Adding missing counties:', counties);
  }

  const now = new Date().toISOString();
  const rows = counties.map((c) => ({
    company_id: company!.id,
    company_slug: company!.slug,
    state_slug: c.stateSlug,
    county_slug: c.countySlug,
    destination_slug: c.countySlug === 'lane' ? 'eugene-or' : null,
    headquarters: company!.headquarters,
    source: 'local_intrastate_selection',
    updated_at: now,
  }));

  if (rows.length) {
    const { error: upsertError } = await admin
      .from('company_destination_assignments')
      .upsert(rows, { onConflict: 'company_id,state_slug,county_slug' });

    if (upsertError) {
      console.error('Assignment upsert failed:', upsertError.message);
      process.exit(1);
    }
  }

  // Tag Lane assignment with eugene-or hub destination if present
  await admin
    .from('company_destination_assignments')
    .update({ destination_slug: 'eugene-or', updated_at: now })
    .eq('company_id', company.id)
    .eq('state_slug', 'oregon')
    .eq('county_slug', 'lane');

  const { data: assigned } = await admin
    .from('company_destination_assignments')
    .select('state_slug, county_slug, destination_slug, source')
    .eq('company_id', company.id);

  console.log('DB assignments:', assigned);
  console.log('\nDone. After deploy (or ~5 min cache), check:');
  console.log('  /local-movers/oregon/lane');
  console.log('  /local-movers/oregon/douglas');
  console.log('  /local-movers/oregon/josephine');
  console.log('  /local-movers/oregon/jackson');
  console.log('  Hub: /moving-to/oregon/eugene-or');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
