/**
 * Recompute verified FL/WA calibration cohort from live DB.
 * Broker-only / REVIEW / HISTORICAL / inactive excluded.
 */
import type pg from 'pg';
import type {
  CalibrationCohortMember,
  CalibrationStateCode,
} from '@/lib/state-hhg/calibration/types';
import { normalizeUsdot } from '@/lib/state-hhg/normalize';

const MOVER_AUTHORITY_TYPES = [
  'intrastate_hhg_carrier',
  'intrastate_mover_registration',
  'intrastate_certificate',
  'local_mover_license',
] as const;

export async function loadVerifiedCalibrationCohort(
  client: pg.Client
): Promise<CalibrationCohortMember[]> {
  const res = await client.query(
    `
    SELECT
      psa.company_id,
      psa.state_code,
      psa.authority_number,
      psa.authority_type,
      psa.status,
      psa.verification_state,
      psa.legal_name,
      psa.dba_name,
      psa.matched_company_id,
      s.physical_address_raw,
      s.city_norm,
      s.postal_code_norm,
      s.usdot_norm,
      s.role_class,
      c.name AS company_name,
      c.physical_address AS company_physical_address,
      c.usdot_number AS company_usdot
    FROM public.provider_state_authority psa
    LEFT JOIN public.state_hhg_registry_staging s
      ON s.id = psa.staging_id
    INNER JOIN public.companies c
      ON c.id = COALESCE(psa.company_id, psa.matched_company_id)
    WHERE psa.state_code IN ('FL', 'WA')
      AND psa.verification_state = 'VERIFIED'
      AND psa.status = 'active'
      AND psa.authority_type = ANY($1::text[])
      AND COALESCE(psa.company_id, psa.matched_company_id) IS NOT NULL
      AND COALESCE(s.role_class, 'mover') = 'mover'
    ORDER BY psa.state_code, COALESCE(psa.company_id, psa.matched_company_id)
    `,
    [MOVER_AUTHORITY_TYPES as unknown as string[]]
  );

  const byProvider = new Map<string, CalibrationCohortMember>();
  for (const row of res.rows) {
    const providerId = String(row.company_id || row.matched_company_id);
    const stateCode = String(row.state_code).toUpperCase() as CalibrationStateCode;
    const key = `${stateCode}:${providerId}`;
    if (byProvider.has(key)) continue;
    byProvider.set(key, {
      providerId,
      stateCode,
      authorityNumber: row.authority_number ? String(row.authority_number) : null,
      authorityType: String(row.authority_type),
      authorityStatus: String(row.status),
      verificationState: 'VERIFIED',
      legalName: row.legal_name ? String(row.legal_name) : null,
      dbaName: row.dba_name ? String(row.dba_name) : null,
      usdot:
        normalizeUsdot(row.usdot_norm) ||
        normalizeUsdot(row.company_usdot) ||
        null,
      stagingPhysicalAddress: row.physical_address_raw
        ? String(row.physical_address_raw)
        : null,
      stagingCity: row.city_norm ? String(row.city_norm) : null,
      stagingPostalCode: row.postal_code_norm ? String(row.postal_code_norm) : null,
      canonicalPhysicalAddress: row.company_physical_address
        ? String(row.company_physical_address)
        : null,
      canonicalName: row.company_name ? String(row.company_name) : null,
      roleClass: 'mover',
    });
  }
  return [...byProvider.values()];
}

export function summarizeCohort(members: readonly CalibrationCohortMember[]) {
  const fl = members.filter((m) => m.stateCode === 'FL').length;
  const wa = members.filter((m) => m.stateCode === 'WA').length;
  return { fl, wa, total: members.length };
}
