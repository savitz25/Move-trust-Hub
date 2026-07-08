import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const admin = createAdminClient();

  // Probe which enrichment columns exist on companies
  const probeCols = [
    'google_data',
    'public_scrape_data',
    'verification_sources',
    'verification_last_synced_at',
    'overall_rating',
    'review_count',
  ];

  console.log('=== COLUMN PROBE (companies) ===');
  for (const col of probeCols) {
    const { error } = await admin.from('companies').select(col).limit(1);
    console.log(col, error ? `MISSING: ${error.message}` : 'OK');
  }

  const { data: companies, error: cErr } = await admin
    .from('companies')
    .select('id, slug, name, usdot_number, overall_rating, review_count, bbb_rating, headquarters, verification_sources')
    .or('name.ilike.%stanford van%,slug.ilike.%stanford%van%');

  if (cErr) {
    console.log('company query error:', cErr.message);
    const { data: fallback } = await admin
      .from('companies')
      .select('id, slug, name, usdot_number, overall_rating, review_count, bbb_rating, headquarters')
      .or('name.ilike.%stanford van%,slug.ilike.%stanford%van%');
    console.log('=== COMPANIES (core cols) ===', fallback);
  } else {
    console.log('\n=== COMPANIES ===');
    for (const c of companies ?? []) {
      console.log(c);
      if (c.verification_sources) {
        const vs = c.verification_sources as Record<string, unknown>;
        console.log('verification_sources keys:', Object.keys(vs));
        if (vs.google) console.log('vs.google:', JSON.stringify(vs.google).slice(0, 500));
        if (vs.public_scrape) console.log('vs.public_scrape:', JSON.stringify(vs.public_scrape).slice(0, 500));
      }
    }
  }

  const sugCols = 'id, name, legal_name, status, company_id, usdot, headquarters, created_at, moderated_at';
  const { data: suggestionsCore, error: sCoreErr } = await admin
    .from('company_suggestions')
    .select(sugCols)
    .or('name.ilike.%stanford van%,legal_name.ilike.%stanford van%');

  console.log('\n=== SUGGESTIONS (core) ===', suggestionsCore, sCoreErr?.message);

  const { data: suggestionsFull, error: sFullErr } = await admin
    .from('company_suggestions')
    .select(`${sugCols}, google_data, public_scrape_data, fmcsa_raw`)
    .or('name.ilike.%stanford van%,legal_name.ilike.%stanford van%');

  if (!sFullErr && suggestionsFull) {
    console.log('\n=== SUGGESTIONS (with enrichment) ===');
    for (const s of suggestionsFull) {
      console.log({
        id: s.id,
        name: s.name,
        status: s.status,
        company_id: s.company_id,
        usdot: s.usdot,
        hasGoogle: (s as { google_data?: unknown }).google_data != null,
        googleStatus: ((s as { google_data?: { status?: string } }).google_data)?.status,
        hasScrape: (s as { public_scrape_data?: unknown }).public_scrape_data != null,
      });
      const g = (s as { google_data?: unknown }).google_data;
      if (g) console.log('suggestion google:', JSON.stringify(g).slice(0, 600));
      const p = (s as { public_scrape_data?: unknown }).public_scrape_data;
      if (p) console.log('suggestion scrape:', JSON.stringify(p).slice(0, 600));
    }
  } else {
    console.log('suggestions enrichment cols:', sFullErr?.message);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});