/**
 * provider_contact_observation is the **current official source observation** table.
 *
 * For FDACS / FL-002 there is one current row per (regulatory_id, observation_type).
 * A later source value replaces raw_value / normalized_value / retrieved_at in place.
 * Historical contact versions are not stored here; that can be modeled later.
 *
 * Observation refresh MUST NOT write companies.email / phone / physical_address.
 * Google Places requests: 0.
 */

export const CONTACT_OBSERVATION_TYPES = [
  'business_email',
  'business_phone',
  'physical_address',
] as const;

export type ContactObservationType = (typeof CONTACT_OBSERVATION_TYPES)[number];

export const CONTACT_OBSERVATION_REFRESH_FIELDS = [
  'company_id',
  'raw_value',
  'normalized_value',
  'source',
  'source_record_id',
  'source_url',
  'retrieved_at',
  'verification_state',
  'match_status',
  'match_evidence',
  'quality_class',
] as const;

export const CANONICAL_CONTACT_FIELDS_NEVER_TOUCHED = [
  'companies.email',
  'companies.phone',
  'companies.physical_address',
] as const;

export type ContactObservationRow = {
  company_id: string | null;
  regulatory_id: string;
  observation_type: ContactObservationType;
  raw_value: string;
  normalized_value: string | null;
  source: string;
  source_record_id: string | null;
  source_url: string | null;
  retrieved_at: string;
  verification_state: string;
  match_status: string | null;
  match_evidence: Record<string, unknown>;
  quality_class: string | null;
};

/** In-memory model of ON CONFLICT (regulatory_id, observation_type) DO UPDATE. */
export function refreshCurrentObservation(
  existing: ContactObservationRow | null,
  incoming: ContactObservationRow
): ContactObservationRow {
  if (!existing) return { ...incoming };
  return {
    ...existing,
    company_id: incoming.company_id,
    raw_value: incoming.raw_value,
    normalized_value: incoming.normalized_value,
    source: incoming.source,
    source_record_id: incoming.source_record_id,
    source_url: incoming.source_url,
    retrieved_at: incoming.retrieved_at,
    verification_state: incoming.verification_state,
    match_status: incoming.match_status,
    match_evidence: incoming.match_evidence,
    quality_class: incoming.quality_class,
  };
}

export const CONTACT_OBSERVATION_UPSERT_SQL = `
INSERT INTO public.provider_contact_observation (
  company_id, state_code, regulator, regulatory_id, observation_type,
  raw_value, normalized_value, source, source_record_id, source_url,
  retrieved_at, verification_state, match_status, match_evidence, quality_class
) VALUES ($1,'FL','FDACS',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13)
ON CONFLICT (regulatory_id, observation_type)
DO UPDATE SET
  company_id = EXCLUDED.company_id,
  raw_value = EXCLUDED.raw_value,
  normalized_value = EXCLUDED.normalized_value,
  source = EXCLUDED.source,
  source_record_id = EXCLUDED.source_record_id,
  source_url = EXCLUDED.source_url,
  retrieved_at = EXCLUDED.retrieved_at,
  verification_state = EXCLUDED.verification_state,
  match_status = EXCLUDED.match_status,
  match_evidence = EXCLUDED.match_evidence,
  quality_class = EXCLUDED.quality_class
`.trim();
