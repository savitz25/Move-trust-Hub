/**
 * Backfill destination/county assignments for already-approved companies.
 * Run: npx tsx scripts/backfill-company-destinations.ts
 * Optional: npx tsx scripts/backfill-company-destinations.ts --usdot=227698
 */
import { readFileSync, existsSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { resolveDestinationsFromHeadquarters } from '../lib/destinations/resolve-from-headquarters';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1]!.trim()]) {
      process.env[match[1]!.trim()] = match[2]!.trim().replace(/^["']|["']$/g, '');
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const usdotFilter = process.argv.find((arg) => arg.startsWith('--usdot='))?.split('=')[1];

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  let query = admin
    .from('companies')
    .select('id, slug, headquarters, usdot_number, name')
    .eq('is_verified', true);

  if (usdotFilter) {
    query = query.eq('usdot_number', usdotFilter.replace(/\D/g, ''));
  }

  const { data: companies, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  if (!companies?.length) {
    console.log('No matching companies.');
    return;
  }

  const now = new Date().toISOString();

  for (const company of companies) {
    const resolved = resolveDestinationsFromHeadquarters(company.headquarters);
    if (!resolved.length) {
      console.log(`SKIP (no destination match): ${company.name} — ${company.headquarters}`);
      continue;
    }

    for (const entry of resolved) {
      const { error: upsertError } = await admin.from('company_destination_assignments').upsert(
        {
          company_id: company.id,
          company_slug: company.slug,
          state_slug: entry.stateSlug,
          county_slug: entry.countySlug,
          destination_slug: entry.marketSlugs[0] ?? null,
          headquarters: company.headquarters,
          source: 'onboarding_approval',
          updated_at: now,
        },
        { onConflict: 'company_id,state_slug,county_slug' }
      );

      if (upsertError) {
        console.error(`FAIL ${company.slug} ${entry.stateSlug}/${entry.countySlug}:`, upsertError.message);
      }
    }

    console.log(
      `${company.name} (${company.usdot_number ?? 'no-dot'}) ->`,
      resolved.map((entry) => ({
        county: `${entry.stateSlug}/${entry.countySlug}`,
        destinations: entry.marketSlugs,
      }))
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});