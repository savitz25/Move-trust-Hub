/**
 * Restore companies wrongly removed during authority cleanup (had authority_active=true).
 */
import { computeReputationScore } from '@/data/seed-companies';
import { extractEntityType } from '@/lib/fmcsa/carrier-fields';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import { fetchFmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/fetch-carrier-core';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import { insertCompanyWithFallback } from '@/lib/suggestions/insert-company';
import { createAdminClient } from '@/lib/supabase/admin';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const RESTORE = [
  {
    id: 'horne-moving-systems',
    slug: 'horne-moving-systems',
    name: 'Horne Moving Systems',
    usdot: '304797',
    headquarters: 'Goldsboro, NC',
  },
  {
    id: 'nilson-van-and-storage',
    slug: 'nilson-van-and-storage',
    name: 'Nilson Van and Storage',
    usdot: '122025',
    headquarters: 'Savannah, GA',
  },
  {
    id: 'two-men-and-a-truck-gainesville',
    slug: 'two-men-and-a-truck-gainesville',
    name: 'Two Men and a Truck Gainesville',
    usdot: '1669783',
    headquarters: 'Gainesville, FL',
  },
] as const;

async function main() {
  const admin = createAdminClient();

  for (const c of RESTORE) {
    const { data: existing } = await admin.from('companies').select('id').eq('slug', c.slug).maybeSingle();
    if (existing) {
      console.log(`skip (exists): ${c.slug}`);
      continue;
    }

    const snapshot = await fetchFmcsaCarrierSnapshot(c.usdot);
    if (!snapshot?.legalName) {
      console.error(`FMCSA lookup failed: ${c.slug}`);
      continue;
    }

    if (!snapshot.authorityActive) {
      console.error(`skip (not authorized): ${c.slug}`);
      continue;
    }

    const entityType = extractEntityType(snapshot.raw);
    const services = mergeServicesWithEntityType(['Full Service'], entityType);

    const row = {
      id: c.id,
      slug: c.slug,
      name: c.name,
      headquarters: c.headquarters,
      usdot_number: c.usdot,
      mc_number: snapshot.mcNumber?.replace(/\D/g, '') || null,
      fmcsa_safety_rating: snapshot.safetyRating,
      fmcsa_complaints: snapshot.complaintsLast12m,
      fmcsa_shipments: snapshot.shipments,
      complaints_last_12m: snapshot.complaintsLast12m,
      authority_active: snapshot.authorityActive,
      out_of_service: snapshot.outOfService,
      revocation_date: snapshot.revocationDate,
      data_hash: computeFmcsaDataHash(snapshot),
      fmcsa_last_checked: new Date().toISOString(),
      fmcsa_legal_name: snapshot.legalName,
      fmcsa_raw: snapshot.raw,
      services,
      specialties: [],
      reputation_score: computeReputationScore({
        overallRating: 0,
        reviewCount: 0,
        fmcsaComplaints: snapshot.complaintsLast12m,
        fmcsaShipments: snapshot.shipments,
        bbbRating: 'NR',
        bbbAccredited: false,
        isVerified: false,
        yearsInBusiness: 0,
      }),
      overall_rating: null,
      review_count: 0,
      bbb_rating: 'NR',
      bbb_accredited: false,
      is_verified: false,
      last_updated: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const result = await insertCompanyWithFallback(admin, row);
    console.log(c.slug, JSON.stringify(result));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});