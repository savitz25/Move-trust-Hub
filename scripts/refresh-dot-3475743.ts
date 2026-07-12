/**
 * Diagnose and refresh FMCSA data for USDOT 3475743.
 *
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/refresh-dot-3475743.ts
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/refresh-dot-3475743.ts --confirm
 */
import { computeReputationScore } from '@/data/seed-companies';
import {
  deriveEntityTypeFromAuthority,
  extractEntityType,
} from '@/lib/fmcsa/carrier-fields';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import { resolveEntityTypeForDisplay } from '@/lib/fmcsa/entity-type-display';
import {
  extractDisplayFieldsFromSnapshot,
} from '@/lib/fmcsa/refresh/batch-fields';
import { fetchFmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/fetch-carrier-core';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import { createAdminClient } from '@/lib/supabase/admin';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import type { ServiceType } from '@/types';

loadEnvLocal();

const TARGET_DOT = '3475743';
const CONFIRM = process.argv.includes('--confirm');

const COMPANY_SELECT =
  'id, slug, name, headquarters, usdot_number, mc_number, fmcsa_safety_rating, fmcsa_complaints, fmcsa_shipments, authority_active, out_of_service, complaints_last_12m, revocation_date, data_hash, fmcsa_last_checked, fmcsa_raw, services, reputation_score, overall_rating, review_count, bbb_rating, bbb_accredited, is_verified, years_in_business';

async function main() {
  const admin = createAdminClient();

  const { data: companies, error } = await admin
    .from('companies')
    .select(COMPANY_SELECT)
    .or(
      `usdot_number.eq.${TARGET_DOT},usdot_number.ilike.%${TARGET_DOT}%`
    );

  if (error) throw error;

  console.log(`Found ${companies?.length ?? 0} company row(s) for DOT ${TARGET_DOT}`);
  for (const row of companies ?? []) {
    const raw = row.fmcsa_raw as Record<string, unknown> | null;
    console.log('\n--- Current DB ---');
    console.log({
      slug: row.slug,
      name: row.name,
      usdot: row.usdot_number,
      mc: row.mc_number,
      fmcsa_last_checked: row.fmcsa_last_checked,
      services: row.services,
      authority_active: row.authority_active,
      storedEntityType: raw ? extractEntityType(raw) : null,
      storedAuthorityDerived: raw ? deriveEntityTypeFromAuthority(raw) : null,
    });
    if (raw) {
      console.log('fmcsa_raw authority fields:', {
        censusTypeId: raw.censusTypeId,
        brokerAuthorityStatus: raw.brokerAuthorityStatus,
        commonAuthorityStatus: raw.commonAuthorityStatus,
        contractAuthorityStatus: raw.contractAuthorityStatus,
        entityType: raw.entityType,
      });
    }
  }

  console.log('\n--- Live FMCSA fetch ---');
  const snapshot = await fetchFmcsaCarrierSnapshot(TARGET_DOT);
  if (!snapshot?.legalName) {
    console.error('FMCSA lookup failed for DOT', TARGET_DOT);
    process.exit(1);
  }

  const display = extractDisplayFieldsFromSnapshot(snapshot);
  const raw = snapshot.raw;
  console.log({
    legalName: snapshot.legalName,
    displayFields: display,
    extractEntityType: extractEntityType(raw),
    deriveEntityTypeFromAuthority: deriveEntityTypeFromAuthority(raw),
    resolveEntityTypeForDisplay: resolveEntityTypeForDisplay({ fmcsaRaw: raw }),
    brokerAuthorityStatus: raw.brokerAuthorityStatus,
    commonAuthorityStatus: raw.commonAuthorityStatus,
    censusTypeId: raw.censusTypeId,
  });

  if (!companies?.length) {
    console.log('\nNo matching company in DB — nothing to update.');
    return;
  }

  const company = companies[0]!;
  const dataHash = computeFmcsaDataHash(snapshot);
  const existingServices = (company.services ?? []) as ServiceType[];
  const services = mergeServicesWithEntityType(existingServices, display.entityType);

  const reputationScore = computeReputationScore({
    overallRating: company.overall_rating ?? 0,
    reviewCount: company.review_count,
    fmcsaComplaints: snapshot.complaintsLast12m,
    fmcsaShipments: snapshot.shipments,
    bbbRating: (company.bbb_rating as any) ?? 'NR',
    bbbAccredited: company.bbb_accredited,
    isVerified: company.is_verified,
    yearsInBusiness: company.years_in_business ?? 0,
  });

  const updatePayload: Record<string, unknown> = {
    fmcsa_safety_rating: snapshot.safetyRating,
    fmcsa_complaints: snapshot.complaintsLast12m,
    fmcsa_shipments: snapshot.shipments,
    complaints_last_12m: snapshot.complaintsLast12m,
    authority_active: snapshot.authorityActive,
    out_of_service: snapshot.outOfService,
    revocation_date: snapshot.revocationDate,
    data_hash: dataHash,
    fmcsa_last_checked: new Date().toISOString(),
    fmcsa_legal_name: snapshot.legalName ?? null,
    fmcsa_raw: snapshot.raw,
    services,
    reputation_score: reputationScore,
    last_updated: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  console.log('\n--- Planned update ---');
  console.log({
    slug: company.slug,
    entityType: display.entityType,
    services,
    authority_active: snapshot.authorityActive,
    dryRun: !CONFIRM,
  });

  if (!CONFIRM) {
    console.log('\nDry run only. Re-run with --confirm to write to database.');
    return;
  }

  const { error: updateError } = await admin
    .from('companies')
    .update(updatePayload)
    .eq('id', company.id);

  if (updateError) throw updateError;
  console.log('\nUpdated company', company.slug, 'with fresh FMCSA data.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});