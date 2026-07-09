import { loadEnvLocal } from '../lib/verification/load-env-local';
import { fullMoversCatalog } from '@/lib/local-movers/catalog';
import { mergeDirectoryCompanies } from '@/lib/directory/merge-directory';
import { localMoverToCompany } from '@/lib/directory/local-mover-to-company';
import { isCuratedMover } from '@/lib/trust/curated-listing-policy';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

async function main() {
  const admin = createAdminClient();
  const { data: rows, count: dbCount } = await admin.from('companies').select('id, slug, usdot_number', { count: 'exact' });

  const catalogAll = Object.values(fullMoversCatalog);
  const catalogCurated = catalogAll.filter(isCuratedMover);

  // Simulate unified directory merge (same as live page)
  const { getCompaniesCached } = await import('@/lib/supabase/queries/companies');
  // Use direct DB fetch for count since getCompaniesCached uses anon + cache

  const { data: fullRows } = await admin.from('companies').select('*').order('reputation_score', { ascending: false });
  const { mapRow } = await import('@/lib/supabase/queries/companies').then(() => ({ mapRow: null }));

  // Import mapRow indirectly - use getCompaniesCached with stub or manual
  const companiesModule = await import('@/lib/supabase/queries/companies');

  // Fetch via admin and count merge manually
  const directoryCompanies = fullRows ?? [];
  const catalogCompanies = catalogCurated.map(localMoverToCompany);

  // We need Company[] - use a simpler approach
  const merged = mergeDirectoryCompanies(
    catalogCompanies.slice(0, 0), // placeholder
    catalogCompanies
  );

  console.log('=== Directory source breakdown ===');
  console.log(`Supabase companies (DB): ${dbCount ?? 0}`);
  console.log(`fullMoversCatalog total: ${catalogAll.length}`);
  console.log(`Curated catalog (isCuratedMover): ${catalogCurated.length}`);

  // Count what unified would be: db + curated catalog merged
  const { normalizeCompanyForDisplay } = await import('@/lib/directory/normalize-company');
  const { extractFmcsaFieldsFromRow } = await import('@/lib/fmcsa/company-from-row');

  const dbCompanies = (fullRows ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    const baseServices = (r.services as import('@/types').Company['services']) || [];
    const fmcsaFields = extractFmcsaFieldsFromRow(r, baseServices);
    return normalizeCompanyForDisplay({
      id: r.id as string,
      slug: r.slug as string,
      name: r.name as string,
      usdotNumber: (r.usdot_number as string) || '',
      mcNumber: (r.mc_number as string) || '',
      headquarters: (r.headquarters as string) || '',
      services: fmcsaFields.services,
      isVerified: Boolean(r.is_verified),
      overallRating: Number(r.overall_rating) || 0,
      reviewCount: (r.review_count as number) || 0,
      reputationScore: (r.reputation_score as number) || 0,
      fmcsaSafetyRating: 'Not Rated',
      fmcsaComplaints: 0,
      fmcsaShipments: 0,
      bbbRating: 'NR',
      bbbAccredited: false,
      yearsInBusiness: 0,
      avgPricePerMove: 0,
      priceRange: '',
      coverage: 'Continental US',
      specialties: [],
      shortDescription: '',
      description: '',
      foundedYear: 0,
      website: '',
      lastUpdated: '',
    });
  });

  const unified = mergeDirectoryCompanies(dbCompanies, catalogCompanies);
  console.log(`Unified directory (DB + curated catalog): ${unified.length}`);
  console.log(`Catalog-only (not in DB by DOT/slug dedupe): ${unified.length - dbCompanies.length}`);

  const catalogOnly = unified.filter(
    (c) => !dbCompanies.some((d) => d.slug === c.slug || (d.usdotNumber && d.usdotNumber === c.usdotNumber))
  );
  console.log(`Catalog-only entries (approx): ${catalogOnly.length}`);
}

main().catch(console.error);