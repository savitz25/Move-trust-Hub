/**
 * Publish approved suggestions that never received a companies row.
 * Run: npx tsx scripts/repair-approved-suggestions.ts
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL in env
 * (load from .env.local via dotenv if present).
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { approveSuggestionToCompany } from '../lib/suggestions/approve';
import { buildCompanySlugBase } from '../lib/utils/company-slug';

config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data: approved, error } = await admin
    .from('company_suggestions')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to load suggestions:', error.message);
    process.exit(1);
  }

  if (!approved?.length) {
    console.log('No approved suggestions found.');
    return;
  }

  let repaired = 0;
  let skipped = 0;

  for (const suggestion of approved) {
    const predicted = buildCompanySlugBase({
      name: suggestion.legal_name || suggestion.name,
      usdot: suggestion.usdot,
    });

    const { data: existing } = await admin
      .from('companies')
      .select('id, slug')
      .or(
        [
          suggestion.company_id ? `id.eq.${suggestion.company_id}` : null,
          `slug.eq.${predicted}`,
          suggestion.usdot ? `usdot_number.eq.${suggestion.usdot.replace(/\D/g, '')}` : null,
        ]
          .filter(Boolean)
          .join(',')
      )
      .maybeSingle();

    if (existing?.slug) {
      console.log(`SKIP: ${suggestion.name} already published as ${existing.slug}`);
      if (!suggestion.company_id) {
        await admin
          .from('company_suggestions')
          .update({ company_id: existing.id })
          .eq('id', suggestion.id);
        console.log(`  linked company_id -> ${existing.id}`);
      }
      skipped++;
      continue;
    }

    try {
      const published = await approveSuggestionToCompany(suggestion);
      if (!published) {
        console.error(`FAIL: ${suggestion.name} — publish returned null`);
        continue;
      }

      await admin
        .from('company_suggestions')
        .update({ company_id: published.companyId })
        .eq('id', suggestion.id);

      console.log(`OK: ${suggestion.name} -> /companies/${published.slug}`);
      repaired++;
    } catch (err) {
      console.error(
        `FAIL: ${suggestion.name} — ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  console.log(`\nDone. Repaired ${repaired}, skipped ${skipped}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});