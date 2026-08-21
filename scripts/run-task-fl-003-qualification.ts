/**
 * Task FL-003 — Florida state-only qualification + publication design.
 * Read-only against companies / canonical contacts. Writes JSON + docs only.
 * Google Places requests: 0.
 *
 * npx tsx scripts/run-task-fl-003-qualification.ts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { FloridaStateMoverAdapter, parseFdacsCsv } from '../lib/state-hhg/fl/adapter';
import { fdacsRegistrationKind, fdacsRegulatoryId, parseFdacsRegulatoryId } from '../lib/state-hhg/fl/regulatory-id';
import { loadFdacsLegacyXls } from '../lib/state-hhg/fl/legacy-xls';
import { buildStateOnlyCompanyId } from '../lib/state-hhg/canonicalization/ids';
import {
  matchStateRegistryIdentity,
  resolveVerificationState,
  type CanonicalProviderIdentity,
} from '../lib/state-hhg/identity';
import {
  classifyEmail,
  classifyStateCandidate,
  isPoBox,
  parsePhoneParts,
} from '../lib/state-hhg/contact-quality';
import {
  normalizeEmail,
  normalizeLegalName,
  normalizePhone,
  parseCityStateZipFromLocation,
} from '../lib/state-hhg/normalize';
import { floridaCounties } from '../lib/local-movers/geography/florida';
import {
  FL_003_SAFETY,
  FL_PUBLICATION_RULESET_VERSION,
  detectFdacsDuplicateGroups,
  qualifyFloridaPublicationCandidate,
  selectPublicationReadySample,
  type PublicationCohort,
  type QualificationInput,
} from '../lib/state-hhg/fl/publication-v1';
import {
  buildFloridaZipCountyIndex,
  resolveFloridaCounty,
} from '../lib/state-hhg/fl/zip-county';

const GOOGLE_PLACES_REQUESTS = 0 as const;
const RUN_NOTE = 'task-fl-003-florida-state-only-qualification';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres(ql)?:\/\//i.test(value)) {
        process.env.DATABASE_URL = value;
      }
    }
  }
}

function resolveDatabaseUrl(): string {
  const direct =
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim();
  if (direct) return direct;
  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const ref = publicUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  if (!password || !ref) {
    throw new Error('BLOCKED — DATABASE ACCESS');
  }
  return `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-1-us-west-2.pooler.supabase.com:5432/postgres`;
}

function floridaZipState(zip: string | null): string | null {
  if (!zip || zip.length < 5) return null;
  const n = Number(zip.slice(0, 5));
  if (n >= 32000 && n <= 34999) return 'FL';
  return null;
}

function isFloridaCompany(row: {
  id: string;
  headquarters: string | null;
  physical_address: string | null;
}): boolean {
  if (String(row.id).toLowerCase().startsWith('fl-im-')) return true;
  const hq = String(row.headquarters ?? '');
  if (/(^|,\s*)FL\s*$/i.test(hq) || /,\s*FL\b/i.test(hq)) return true;
  if (/\bFL\s+\d{5}\b/i.test(String(row.physical_address ?? ''))) return true;
  return false;
}

async function main() {
  loadEnvFiles();
  const url = resolveDatabaseUrl();
  const retrievedAt = new Date().toISOString();
  console.log(JSON.stringify({ google_places_requests: GOOGLE_PLACES_REQUESTS, phase: 'start' }));

  const adapter = new FloridaStateMoverAdapter({ retrievedAt });
  const rawRows = await adapter.fetchOrLoadRegistry();
  const normalized = rawRows.map((row) => adapter.normalizeRecord(row));
  const legacyIm = loadFdacsLegacyXls(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-im-active.xls'));
  const legacyMb = loadFdacsLegacyXls(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-mb-active.xls'));
  const csvMovers = parseFdacsCsv(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv'), 'utf8')
  );
  const csvBrokers = parseFdacsCsv(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-moving-brokers-newdb.csv'), 'utf8')
  );
  const officialByLicense = new Map<string, { name: string; status: string; address: string; city: string; state: string; phone: string; email: string; licenseType: string }>();
  for (const row of [...legacyIm, ...legacyMb]) {
    officialByLicense.set(row.licenseNumber.toUpperCase(), {
      name: row.name,
      status: row.licenseStatus,
      address: row.address,
      city: row.city,
      state: row.state,
      phone: row.phone,
      email: row.email,
      licenseType: row.licenseType,
    });
  }
  for (const row of [...csvMovers, ...csvBrokers]) {
    const key = row.licenseNumber.toUpperCase();
    if (!officialByLicense.has(key)) {
      const loc = parseCityStateZipFromLocation(row.location);
      officialByLicense.set(key, {
        name: row.businessName,
        status: row.status,
        address: loc.addressLine ?? row.location,
        city: loc.city ?? '',
        state: loc.state ?? '',
        phone: row.phone,
        email: row.email,
        licenseType: row.licenseType,
      });
    }
  }

  const seenKeys = new Set<string>();
  const records: Array<{
    rec: (typeof normalized)[number];
    kind: 'IM' | 'MB';
    regulatoryId: string;
  }> = [];
  let duplicateSourceRows = 0;
  let malformed = 0;
  for (const rec of normalized) {
    const lic = rec.authorityNumber?.trim() ?? '';
    const kind = fdacsRegistrationKind(lic, String(rec.raw.licenseType ?? rec.raw.roleClass));
    const regulatoryId = fdacsRegulatoryId(lic, String(rec.raw.licenseType ?? ''));
    if (!regulatoryId || kind === 'XX') {
      malformed += 1;
      continue;
    }
    if (seenKeys.has(regulatoryId)) {
      duplicateSourceRows += 1;
      continue;
    }
    seenKeys.add(regulatoryId);
    records.push({ rec, kind, regulatoryId });
  }

  const zipIndex = buildFloridaZipCountyIndex();
  console.log(
    JSON.stringify({
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      phase: 'zip_index',
      uniqueZips: zipIndex.uniqueZips,
      uniqueCountyZips: zipIndex.uniqueCountyZips,
      multiCountyZips: zipIndex.multiCountyZips,
    })
  );

  const client = new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await client.connect();
  const freezeBefore = await client.query(
    `SELECT count(*)::int AS companies, count(*) FILTER (WHERE indexable)::int AS indexable FROM companies`
  );
  const companies = await client.query(
    `SELECT id, name, slug, fmcsa_legal_name, usdot_number, phone, email, physical_address,
            headquarters, publication_state, indexable
       FROM companies`
  );
  const prior = await client.query(
    `SELECT authority_number, matched_company_id, company_id, verification_state
       FROM provider_state_authority
      WHERE state_code='FL' AND authority_number IS NOT NULL`
  );
  const staging = await client.query(
    `SELECT regulatory_id, authority_number, candidate_class, matched_company_id, match_method,
            disposition, review_reason, status_normalized, role_class, legal_name_raw, dba_raw,
            phone_raw, email_raw, physical_address_raw, city_norm, postal_code_norm, usdot_norm
       FROM state_hhg_registry_staging WHERE state_code='FL'`
  );
  const observations = await client.query(
    `SELECT regulatory_id, observation_type, raw_value, normalized_value, quality_class
       FROM provider_contact_observation WHERE regulator='FDACS'`
  );
  const freezeBeforeRow = freezeBefore.rows[0] as { companies: number; indexable: number };
  await client.end();
  console.log(
    JSON.stringify({
      google_places_requests: GOOGLE_PLACES_REQUESTS,
      phase: 'db_released',
      freeze: freezeBeforeRow,
      companies: companies.rows.length,
      staging: staging.rows.length,
      observations: observations.rows.length,
    })
  );

  const companyRows = companies.rows as Array<{
    id: string;
    name: string;
    slug: string | null;
    fmcsa_legal_name: string | null;
    usdot_number: string | null;
    phone: string | null;
    email: string | null;
    physical_address: string | null;
    headquarters: string | null;
    publication_state: string | null;
    indexable: boolean;
  }>;
  const companyById = new Map(companyRows.map((r) => [r.id, r]));
  const floridaCompanies = companyRows.filter((r) => isFloridaCompany(r));
  const flImAll = companyRows.filter((r) => r.id.toLowerCase().startsWith('fl-im-'));
  const flImIngested = flImAll.filter((r) => r.publication_state === 'INGESTED');
  const flImPublishable = flImAll.filter((r) => r.publication_state === 'PUBLISHABLE');
  const publicFlorida = floridaCompanies.filter((r) => r.indexable);
  const psaByAuth = new Map<string, { companyId: string | null; verificationState: string | null }>();
  for (const row of prior.rows as Array<{
    authority_number: string;
    matched_company_id: string | null;
    company_id: string | null;
    verification_state: string | null;
  }>) {
    const cid = row.matched_company_id || row.company_id;
    psaByAuth.set(row.authority_number.toUpperCase(), {
      companyId: cid,
      verificationState: row.verification_state,
    });
  }
  const stagingByReg = new Map(
    (staging.rows as Array<{ regulatory_id: string | null }>).map((r) => [String(r.regulatory_id ?? ''), r])
  );
  const obsByReg = new Map<string, { email?: string; phone?: string; address?: string }>();
  for (const row of observations.rows as Array<{
    regulatory_id: string;
    observation_type: string;
    raw_value: string;
  }>) {
    const cur = obsByReg.get(row.regulatory_id) ?? {};
    if (row.observation_type === 'business_email') cur.email = row.raw_value;
    if (row.observation_type === 'business_phone') cur.phone = row.raw_value;
    if (row.observation_type === 'physical_address') cur.address = row.raw_value;
    obsByReg.set(row.regulatory_id, cur);
  }

  const candidates: CanonicalProviderIdentity[] = companyRows.map((row) => {
    const hq = row.headquarters ? String(row.headquarters) : '';
    const parts = hq.split(',').map((p) => p.trim());
    return {
      companyId: row.id,
      legalName: row.fmcsa_legal_name,
      dbaName: null,
      publicName: row.name,
      usdot: row.usdot_number,
      phone: row.phone,
      email: row.email,
      address: row.physical_address,
      city: parts[0] || null,
      state: parts.length >= 2 ? parts[parts.length - 1]?.slice(0, 2)?.toUpperCase() ?? null : null,
      postalCode: null,
      publicationState: row.publication_state,
      indexable: row.indexable,
    };
  });

  type Prepared = QualificationInput & {
    authorityNumber: string;
    statusRaw: string;
    expiration: string | null;
    sourceKind: string;
    fl002CandidateClass: string | null;
    fl002Disposition: string | null;
    officialStatus: string | null;
  };

  const prepared: Prepared[] = [];
  let processed = 0;
  const rematchCounts = { VERIFIED: 0, REVIEW_REQUIRED: 0, NOT_FOUND: 0, NOT_APPLICABLE: 0 };
  const rematchMethods: Record<string, number> = {};

  for (const item of records) {
    processed += 1;
    if (processed === 1 || processed % 200 === 0) {
      console.log(JSON.stringify({ google_places_requests: GOOGLE_PLACES_REQUESTS, phase: 'match_progress', processed }));
    }
    const rec = item.rec;
    const loc = parseCityStateZipFromLocation(String(rec.raw.location ?? rec.physicalAddress ?? ''));
    const stateRaw = String(rec.raw.stateRaw ?? loc.state ?? '').toUpperCase();
    const zip = rec.postalCode ?? loc.postalCode;
    const physicalState = stateRaw === 'FL' ? 'FL' : floridaZipState(zip);
    const street = loc.addressLine ?? (String(rec.raw.location ?? rec.physicalAddress ?? '').split(',')[0] ?? null);
    const city = rec.city ?? loc.city ?? (rec.raw.cityRaw ? String(rec.raw.cityRaw) : null);
    const parsed = parseFdacsRegulatoryId(item.regulatoryId);
    const authorityNumber = rec.authorityNumber ?? (parsed ? `${parsed.kind}${parsed.number}` : '');
    const psa = psaByAuth.get(authorityNumber.toUpperCase());
    const expectedId =
      parsed?.kind === 'IM' ? buildStateOnlyCompanyId('FL', `IM${parsed.number}`) : null;
    const ingestedHit = expectedId && companyById.has(expectedId) ? expectedId : null;
    const alreadyLinked = Boolean(psa?.companyId);
    const priorCompanyId = psa?.companyId ?? ingestedHit ?? null;
    const roleClass = rec.raw.roleClass === 'broker' ? 'broker' : 'mover';
    const match = matchStateRegistryIdentity(
      {
        legalName: rec.legalName,
        dba: rec.dba,
        usdot: rec.usdot,
        phone: rec.phone,
        email: rec.email,
        physicalAddress: rec.physicalAddress,
        city,
        postalCode: zip,
        statusNormalized: rec.status,
        roleClass,
        authorityNumber,
        priorAuthorityCompanyId: priorCompanyId,
      },
      candidates
    );
    const verificationState = resolveVerificationState({
      disposition: match.disposition,
      statusNormalized: rec.status,
      roleClass,
      matchMethod: match.matchMethod,
      franchiseSafetyHold: match.franchiseSafetyHold,
    });
    let matchDecision: QualificationInput['matchDecision'] = 'NOT_FOUND';
    if (match.disposition === 'HISTORICAL' || match.disposition === 'OUT_OF_SCOPE') {
      matchDecision = 'NOT_APPLICABLE';
    } else if (verificationState === 'VERIFIED' || (alreadyLinked && psa?.verificationState === 'VERIFIED')) {
      matchDecision = 'VERIFIED';
    } else if (match.disposition === 'REVIEW_REQUIRED' || verificationState === 'REVIEW_REQUIRED') {
      matchDecision = 'REVIEW_REQUIRED';
    } else if (match.disposition === 'MATCHED_EXISTING') {
      matchDecision = 'REVIEW_REQUIRED';
    }
    rematchCounts[matchDecision as keyof typeof rematchCounts] += 1;
    rematchMethods[match.matchMethod] = (rematchMethods[match.matchMethod] ?? 0) + 1;
    const matchedCompanyId = match.matchedCompanyId ?? priorCompanyId;
    const existing = matchedCompanyId ? companyById.get(matchedCompanyId) : undefined;
    const st = stagingByReg.get(item.regulatoryId) as
      | { candidate_class?: string; disposition?: string; review_reason?: string }
      | undefined;
    const obs = obsByReg.get(item.regulatoryId);
    prepared.push({
      regulatoryId: item.regulatoryId,
      licenseType: item.kind,
      status: rec.status,
      statusRaw: String(rec.raw.statusRaw ?? rec.raw.status ?? rec.status),
      legalName: rec.legalName,
      dbaName: rec.dba,
      physicalStreet: street,
      physicalCity: city,
      physicalState,
      physicalPostalCode: zip,
      physicalAddress: rec.physicalAddress ?? loc.addressLine ?? obs?.address ?? null,
      phone: rec.phone ?? obs?.phone ?? null,
      email: rec.email ?? obs?.email ?? null,
      website: rec.website,
      usdotNumber: rec.usdot ?? existing?.usdot_number ?? null,
      existingCompanyId: matchedCompanyId,
      existingPublicationState: existing?.publication_state ?? null,
      existingIndexable: existing?.indexable ?? null,
      alreadyLinkedViaAuthority: alreadyLinked,
      matchDecision,
      matchMethod: match.matchMethod,
      matchReviewReason: match.reviewReason ?? st?.review_reason ?? null,
      authorityNumber,
      expiration: rec.expirationDate,
      sourceKind: String(rec.raw._sourceKind ?? 'fdacs'),
      fl002CandidateClass: st?.candidate_class ?? classifyStateCandidate({
        matchedCompanyId: matchedCompanyId,
        statusNormalized: rec.status,
      }),
      fl002Disposition: st?.disposition ?? match.disposition,
      officialStatus: officialByLicense.get(authorityNumber.toUpperCase())?.status ?? null,
    });
  }

  const activeImInputs = prepared.filter((p) => p.licenseType === 'IM' && p.status === 'active');
  const dupGroups = detectFdacsDuplicateGroups(activeImInputs);
  const dupById = new Map<string, { groupId: string; kind: 'definite' | 'probable'; survivor: string | null }>();
  for (const g of dupGroups) {
    for (const id of g.regulatoryIds) {
      const prev = dupById.get(id);
      if (!prev || (g.kind === 'definite' && prev.kind !== 'definite')) {
        dupById.set(id, { groupId: g.id, kind: g.kind, survivor: g.survivorRegulatoryId });
      }
    }
  }

  const cohortCounts: Record<PublicationCohort, number> = {
    PUBLICATION_READY: 0,
    REVIEW_REQUIRED: 0,
    DUPLICATE_OR_OVERLAP: 0,
    INSUFFICIENT_IDENTITY: 0,
    INSUFFICIENT_GEOGRAPHY: 0,
    STATUS_BLOCKED: 0,
    BROKER_ONLY: 0,
    HISTORICAL: 0,
    OUT_OF_SCOPE: 0,
    EXISTING_PROVIDER_LINK_CANDIDATE: 0,
  };
  const reviewBuckets: Record<string, number> = {};
  const eligibilityRows = [];
  const countyReady: Record<string, number> = {};
  const countyReview: Record<string, number> = {};
  let countyVerified = 0;
  let countyReviewRequired = 0;
  let countyUnresolved = 0;
  let streetResolved = 0;
  let cityResolved = 0;
  let zipResolved = 0;
  let floridaValid = 0;
  let emailAvailable = 0;
  let phoneAvailable = 0;
  let addressAvailable = 0;
  let noEmail = 0;
  let noWebsite = 0;
  let newExactLinks = 0;
  let alreadyLinkedCount = 0;

  for (const row of prepared) {
    const dup = dupById.get(row.regulatoryId);
    const input: QualificationInput = {
      ...row,
      duplicateGroupId: dup?.groupId ?? null,
      duplicateKind: dup?.kind ?? null,
      duplicateSurvivor: dup ? dup.survivor === row.regulatoryId : undefined,
    };
    const county = resolveFloridaCounty({
      zip: row.physicalPostalCode,
      city: row.physicalCity,
      street: row.physicalStreet,
      fullAddress: row.physicalAddress,
      index: zipIndex,
    });
    if (county.confidence === 'COUNTY_VERIFIED') countyVerified += 1;
    else if (county.confidence === 'COUNTY_REVIEW_REQUIRED') countyReviewRequired += 1;
    else countyUnresolved += 1;
    if (row.physicalStreet && /\d/.test(row.physicalStreet)) streetResolved += 1;
    if (row.physicalCity) cityResolved += 1;
    if (row.physicalPostalCode && String(row.physicalPostalCode).replace(/\D/g, '').length >= 5) zipResolved += 1;
    if (row.physicalState === 'FL') floridaValid += 1;
    if (normalizeEmail(row.email)) emailAvailable += 1;
    else noEmail += 1;
    if (normalizePhone(row.phone)) phoneAvailable += 1;
    if (row.physicalAddress) addressAvailable += 1;
    if (!row.website) noWebsite += 1;

    const result = qualifyFloridaPublicationCandidate(input, { county });
    cohortCounts[result.cohort] += 1;
    if (result.cohort === 'REVIEW_REQUIRED') {
      const bucket = result.reviewBucket ?? 'other';
      reviewBuckets[bucket] = (reviewBuckets[bucket] ?? 0) + 1;
    }
    if (result.cohort === 'EXISTING_PROVIDER_LINK_CANDIDATE') newExactLinks += 1;
    if (result.collision === 'ALREADY_LINKED_EXISTING_PROVIDER') alreadyLinkedCount += 1;
    if (result.cohort === 'PUBLICATION_READY' && result.county.county) {
      countyReady[result.county.county] = (countyReady[result.county.county] ?? 0) + 1;
    }
    if (result.cohort === 'REVIEW_REQUIRED' && result.county.county) {
      countyReview[result.county.county] = (countyReview[result.county.county] ?? 0) + 1;
    }
    const parsed = parseFdacsRegulatoryId(row.regulatoryId);
    eligibilityRows.push({
      regulatory_id: row.regulatoryId,
      candidate_company_key:
        result.existingCompanyId ??
        (parsed?.kind === 'IM' ? buildStateOnlyCompanyId('FL', `IM${parsed.number}`) : row.regulatoryId),
      publication_status: result.cohort,
      eligibility_reason: result.reasons.join(' | '),
      legal_name: row.legalName,
      dba: row.dbaName,
      registration_type: row.licenseType,
      registration_status: row.status,
      status_raw: row.statusRaw,
      expiration: row.expiration,
      phone: row.phone,
      email: row.email,
      physical_address: row.physicalAddress,
      city: row.physicalCity,
      zip: row.physicalPostalCode,
      county: result.county.county,
      county_fips: result.county.countyFips,
      county_resolution_status: result.county.confidence,
      existing_company_id: result.existingCompanyId,
      existing_publication_state: row.existingPublicationState,
      duplicate_group_id: dup?.groupId ?? null,
      review_reason: row.matchReviewReason,
      review_bucket: result.reviewBucket,
      match_decision: row.matchDecision,
      match_method: row.matchMethod,
      identity_strength: result.identityStrength,
      collision: result.collision,
      federal_id_label: result.federalIdLabel,
      source_provenance: row.sourceKind,
      qualified_at: retrievedAt,
      ruleset_version: result.rulesetVersion,
      google_places_requests: GOOGLE_PLACES_REQUESTS,
    });
  }

  const publicationReady = eligibilityRows.filter((r) => r.publication_status === 'PUBLICATION_READY');
  const sample = selectPublicationReadySample(
    publicationReady.map((r) => ({
      regulatoryId: r.regulatory_id,
      county: r.county,
      email: r.email,
      legalName: r.legal_name,
      row: r,
    })),
    50
  );

  const sampleQa = sample.map((s) => {
    const row = s.row;
    const parsed = parseFdacsRegulatoryId(row.regulatory_id);
    const lic = parsed ? `${parsed.kind}${parsed.number}` : '';
    const official = officialByLicense.get(lic.toUpperCase());
    const issues: string[] = [];
    if (!official) issues.push('missing_from_official_snapshot');
    if (official && !/registered|active|current/i.test(official.status) && row.registration_status === 'active') {
      issues.push(`official_status_${official.status}`);
    }
    if (official && normalizeLegalName(official.name) !== normalizeLegalName(row.legal_name)) {
      issues.push('legal_name_mismatch');
    }
    if (row.county_resolution_status !== 'COUNTY_VERIFIED') issues.push('county_not_verified');
    if (row.county && !floridaCounties.some((c) => c.name.toLowerCase() === row.county!.toLowerCase())) {
      issues.push('county_not_in_florida_list');
    }
    return {
      regulatory_id: row.regulatory_id,
      legal_name: row.legal_name,
      official_status: official?.status ?? null,
      official_city: official?.city ?? null,
      county: row.county,
      email: row.email,
      phone: row.phone,
      issues,
      pass: issues.length === 0,
    };
  });
  const samplePass = sampleQa.filter((s) => s.pass).length;
  const samplePrecision = sampleQa.length ? samplePass / sampleQa.length : 0;

  const statusCounts: Record<string, number> = {};
  for (const r of prepared) statusCounts[r.status] = (statusCounts[r.status] ?? 0) + 1;
  const fl002Class: Record<string, number> = {};
  for (const r of prepared) {
    const k = r.fl002CandidateClass ?? 'unknown';
    fl002Class[k] = (fl002Class[k] ?? 0) + 1;
  }

  const activeStateOnlyImFl002 = prepared.filter(
    (p) => p.licenseType === 'IM' && p.status === 'active' && p.fl002CandidateClass === 'ACTIVE_STATE_ONLY_CANDIDATE'
  ).length;
  const activeMb = prepared.filter((p) => p.licenseType === 'MB' && p.status === 'active').length;
  const dualGroups = (() => {
    const byLegalPhone = new Map<string, Prepared[]>();
    for (const r of prepared) {
      const legal = normalizeLegalName(r.legalName);
      const phone = normalizePhone(r.phone);
      const key = legal && phone ? `${legal}|${phone}` : legal ? `${legal}|${r.regulatoryId}` : r.regulatoryId;
      byLegalPhone.set(key, [...(byLegalPhone.get(key) ?? []), r]);
    }
    return [...byLegalPhone.values()].filter(
      (g) => g.some((x) => x.licenseType === 'IM') && g.some((x) => x.licenseType === 'MB')
    );
  })();

  const existingVerified = prepared.filter(
    (p) => p.alreadyLinkedViaAuthority && p.matchDecision === 'VERIFIED'
  ).length;
  const franchiseGroups: Record<string, number> = {};
  for (const row of prepared) {
    const blob = `${row.legalName} ${row.dbaName ?? ''}`;
    if (/two\s*men/i.test(blob)) franchiseGroups['Two Men and a Truck'] = (franchiseGroups['Two Men and a Truck'] ?? 0) + 1;
    if (/college\s*hunks/i.test(blob)) franchiseGroups['College Hunks'] = (franchiseGroups['College Hunks'] ?? 0) + 1;
    if (/\ballied\b/i.test(blob)) franchiseGroups['Allied'] = (franchiseGroups['Allied'] ?? 0) + 1;
    if (/\bmayflower\b/i.test(blob)) franchiseGroups['Mayflower'] = (franchiseGroups['Mayflower'] ?? 0) + 1;
    if (/\bu[- ]?haul\b/i.test(blob)) franchiseGroups['U-Haul'] = (franchiseGroups['U-Haul'] ?? 0) + 1;
  }

  const existingPublicFl = publicFlorida.length;
  const existingAllFl = floridaCompanies.length;
  const newlyQualified = publicationReady.length;
  const overlapNewLinks = newExactLinks;
  const futureUniverse = existingAllFl + newlyQualified;

  const coverage = floridaCounties.map((c) => ({
    county: c.name,
    publication_ready: countyReady[c.name] ?? 0,
    review_required: countyReview[c.name] ?? 0,
    existing_public: publicFlorida.filter((r) => {
      const hq = String(r.headquarters ?? '').toLowerCase();
      return hq.includes(c.name.toLowerCase());
    }).length,
  }));
  const zeroCounties = coverage.filter((c) => c.publication_ready === 0).map((c) => c.county);

  const verify = new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  await verify.connect();
  const freezeAfter = await verify.query(
    `SELECT count(*)::int AS companies, count(*) FILTER (WHERE indexable)::int AS indexable FROM companies`
  );
  const freezeAfterRow = freezeAfter.rows[0] as { companies: number; indexable: number };
  await verify.end();

  if (freezeAfterRow.companies !== freezeBeforeRow.companies || freezeAfterRow.indexable !== freezeBeforeRow.indexable) {
    throw new Error(
      `REFUSAL — companies freeze changed ${JSON.stringify(freezeBeforeRow)} → ${JSON.stringify(freezeAfterRow)}`
    );
  }

  const audit = {
    google_places_requests: GOOGLE_PLACES_REQUESTS,
    live_publication: false,
    canonical_contacts_changed: false,
    trust_score_changed: false,
    ruleset_version: FL_PUBLICATION_RULESET_VERSION,
    safety: FL_003_SAFETY,
    freeze_before: freezeBeforeRow,
    freeze_after: freezeAfterRow,
    snapshots: {
      legacy_im: legacyIm.length,
      legacy_mb: legacyMb.length,
      new_portal_movers: csvMovers.length,
      new_portal_brokers: csvBrokers.length,
      combined_raw: rawRows.length,
      duplicate_source_rows: duplicateSourceRows,
      malformed,
      normalized: records.length,
    },
    baseline: {
      fdacs_registrations: records.length,
      IM: records.filter((r) => r.kind === 'IM').length,
      MB: records.filter((r) => r.kind === 'MB').length,
      statuses: statusCounts,
      fl002_candidate_class: fl002Class,
      existing_verified_fdacs_links: existingVerified,
      already_linked_via_psa: alreadyLinkedCount,
      rematch: { ...rematchCounts, methods: rematchMethods },
      active_state_only_im_fl002_class: activeStateOnlyImFl002,
      active_mb: activeMb,
      dual_im_mb_groups: dualGroups.length,
    },
    companies: {
      total: companyRows.length,
      indexable: freezeBeforeRow.indexable,
      florida_all: existingAllFl,
      florida_indexable: existingPublicFl,
      fl_im_all: flImAll.length,
      fl_im_ingested: flImIngested.length,
      fl_im_publishable: flImPublishable.length,
    },
    zip_index: {
      uniqueZips: zipIndex.uniqueZips,
      uniqueCountyZips: zipIndex.uniqueCountyZips,
      multiCountyZips: zipIndex.multiCountyZips,
      addressHits: zipIndex.addressHits,
    },
    geography: {
      street_resolved: streetResolved,
      city_resolved: cityResolved,
      zip_resolved: zipResolved,
      florida_valid: floridaValid,
      COUNTY_VERIFIED: countyVerified,
      COUNTY_REVIEW_REQUIRED: countyReviewRequired,
      COUNTY_UNRESOLVED: countyUnresolved,
    },
    contacts: {
      email_available: emailAvailable,
      phone_available: phoneAvailable,
      address_available: addressAvailable,
      no_email: noEmail,
      no_website: noWebsite,
    },
    duplicates: {
      definite: dupGroups.filter((g) => g.kind === 'definite').length,
      probable: dupGroups.filter((g) => g.kind === 'probable').length,
      groups: dupGroups,
    },
    franchise_groups: franchiseGroups,
    collision: {
      new_exact_links: newExactLinks,
      already_linked: alreadyLinkedCount,
      already_linked_public_indexable: prepared.filter(
        (p) => p.alreadyLinkedViaAuthority && p.existingIndexable
      ).length,
      already_linked_fl_im_ingested: prepared.filter(
        (p) =>
          p.alreadyLinkedViaAuthority &&
          String(p.existingCompanyId ?? '')
            .toLowerCase()
            .startsWith('fl-im-')
      ).length,
      fl002_verified_existing: prepared.filter((p) => p.fl002CandidateClass === 'MATCHED_EXISTING')
        .length,
    },
    cohorts: cohortCounts,
    review_buckets: reviewBuckets,
    fl002_review_required: prepared.filter((p) => p.fl002Disposition === 'REVIEW_REQUIRED').length,
    fl002_review_reasons: prepared
      .filter((p) => p.fl002Disposition === 'REVIEW_REQUIRED')
      .reduce((acc: Record<string, number>, p) => {
        const key = p.matchReviewReason ?? 'unspecified';
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      }, {}),
    publication_ready: newlyQualified,
    county_coverage: coverage,
    counties_with_zero_publication_ready: zeroCounties,
    sample_qa: {
      size: sampleQa.length,
      pass: samplePass,
      precision: Number(samplePrecision.toFixed(4)),
      fail_closed: samplePrecision < 0.95,
      rows: sampleQa,
    },
    projected_universe: {
      current_florida_companies: existingAllFl,
      current_florida_indexable: existingPublicFl,
      existing_providers_with_fdacs_link: existingVerified,
      fl_im_all: flImAll.length,
      fl_im_ingested_internal: flImIngested.length,
      fl_im_publishable_canary: flImPublishable.length,
      newly_qualified_state_only: newlyQualified,
      newly_discovered_overlap: overlapNewLinks,
      estimated_future_unique_florida_companies: futureUniverse,
    },
    note: RUN_NOTE,
    qualified_at: retrievedAt,
  };

  mkdirSync(resolve(process.cwd(), 'data/state-hhg/fl'), { recursive: true });
  mkdirSync(resolve(process.cwd(), 'docs'), { recursive: true });
  writeFileSync(
    resolve(process.cwd(), 'data/state-hhg/fl/publication-eligibility-v1.json'),
    JSON.stringify(
      {
        google_places_requests: GOOGLE_PLACES_REQUESTS,
        ruleset_version: FL_PUBLICATION_RULESET_VERSION,
        live_publication: false,
        qualified_at: retrievedAt,
        rows: eligibilityRows,
      },
      null,
      2
    ) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-003-audit.json'),
    JSON.stringify(audit, null, 2) + '\n'
  );
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-003-sample-qa.json'),
    JSON.stringify({ google_places_requests: 0, ...audit.sample_qa }, null, 2) + '\n'
  );

  const md = buildMarkdown(audit, adapter.getSourceMetadata().sourceUrl);
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-003-florida-state-only-qualification.md'), md);

  console.log(
    JSON.stringify(
      {
        google_places_requests: GOOGLE_PLACES_REQUESTS,
        freeze: { before: freezeBeforeRow, after: freezeAfterRow },
        cohorts: cohortCounts,
        publication_ready: newlyQualified,
        sample_precision: samplePrecision,
        projected_universe: audit.projected_universe,
      },
      null,
      2
    )
  );
}

function buildMarkdown(audit: Record<string, any>, sourceUrl: string | null): string {
  const c = audit.cohorts;
  const p = audit.projected_universe;
  const g = audit.geography;
  const b = audit.baseline;
  const sample = audit.sample_qa;
  return `# Task FL-003 — Florida State-Only Qualification & Publication Design

**Status:** Qualification + QA + publication design only. **No live publication.**

**Google Places / Maps / Geocoding API requests: 0.**

**Canonical company contacts overwritten: NO.**  
**Trust Score changed: NO.**  
**Companies freeze: ${audit.freeze_before.companies} → ${audit.freeze_after.companies} (unchanged).**  
**Indexable freeze: ${audit.freeze_before.indexable} → ${audit.freeze_after.indexable} (unchanged).**

Ruleset: \`${audit.ruleset_version}\`

---

## 1. Executive summary

FL-003 evaluated every normalized FDACS registration against a fail-closed publication ruleset. It does **not** publish companies, expose FDACS on public pages, or promote contact observations onto \`companies.*\`.

After 011D.2A, many previously “state-only” IM rows already exist as internal \`fl-im-*\` companies. 011D.3 later moved an exact 50 Florida manifest companies to \`PUBLISHABLE\` / \`indexable=false\` / noindex. Those remain existing companies, not new public profiles, and FL-003 does not republish, reindex, or duplicate them.

| Result | Count |
|--------|------:|
| Normalized FDACS registrations | **${b.fdacs_registrations}** |
| Active state-only IM (FL-002 class) | **${b.active_state_only_im_fl002_class}** |
| PUBLICATION_READY new state-only movers | **${audit.publication_ready}** |
| EXISTING_PROVIDER_LINK_CANDIDATE | ${c.EXISTING_PROVIDER_LINK_CANDIDATE} |
| REVIEW_REQUIRED | ${c.REVIEW_REQUIRED} |
| DUPLICATE_OR_OVERLAP | ${c.DUPLICATE_OR_OVERLAP} |
| INSUFFICIENT_IDENTITY | ${c.INSUFFICIENT_IDENTITY} |
| INSUFFICIENT_GEOGRAPHY | ${c.INSUFFICIENT_GEOGRAPHY} |
| BROKER_ONLY | ${c.BROKER_ONLY} |
| HISTORICAL | ${c.HISTORICAL} |
| STATUS_BLOCKED | ${c.STATUS_BLOCKED} |
| Sample QA precision | **${(sample.precision * 100).toFixed(1)}%** (${sample.pass}/${sample.size}) |

**Publication-ready new Florida state-only movers: ${audit.publication_ready}**

---

## 2. Git / worktree

Isolated worktree \`C:\\\\Users\\\\makei\\\\move-trust-hub-fl001\`, branch \`task-fl-003-florida-state-only-qualification\`, rebased onto current \`main\` (011D.2B/011D.3 canary + SHARE-003 preserved).

Official source: ${sourceUrl ?? 'FDACS legacy Business License Lookup'}. No new Google requests. Census geocode cache was **read only**.

011D.3 interaction: FL canary is 50 \`fl-im-*\` rows at \`PUBLISHABLE\` + \`indexable=false\`. They stay \`DUPLICATE_OR_OVERLAP\` / already-linked. FL-003 does not write \`publication_state\`, \`indexable\`, canary manifests, county pages, or sitemap rows. Zero overlap between the PUBLICATION_READY cohort and the FL canary manifest.

---

## 3. Candidate baseline

Recalculated; not copied from FL-002.

| Slice | Count |
|-------|------:|
| FDACS registrations | ${b.fdacs_registrations} |
| IM | ${b.IM} |
| MB | ${b.MB} |
| Active | ${b.statuses.active ?? 0} |
| Expired | ${b.statuses.expired ?? 0} |
| Unknown | ${b.statuses.unknown ?? 0} |
| Revoked | ${b.statuses.revoked ?? 0} |
| Existing VERIFIED FDACS PSA links | ${b.existing_verified_fdacs_links} |
| Rematch VERIFIED / REVIEW_REQUIRED / NOT_FOUND / NOT_APPLICABLE | ${b.rematch.VERIFIED} / ${b.rematch.REVIEW_REQUIRED} / ${b.rematch.NOT_FOUND} / ${b.rematch.NOT_APPLICABLE} |
| Active state-only IM (FL-002 candidate_class) | ${b.active_state_only_im_fl002_class} |
| Active MB | ${b.active_mb} |
| Dual IM+MB entity groups | ${b.dual_im_mb_groups} |
| Current companies / indexable | ${audit.companies.total} / ${audit.companies.indexable} |
| Florida companies (all / indexable / fl-im all / INGESTED / PUBLISHABLE canary) | ${audit.companies.florida_all} / ${audit.companies.florida_indexable} / ${audit.companies.fl_im_all} / ${audit.companies.fl_im_ingested} / ${audit.companies.fl_im_publishable} |

FL-002 class counts: ${JSON.stringify(b.fl002_candidate_class)}

---

## 4. Qualification rules (\`${audit.ruleset_version}\`)

A candidate is \`PUBLICATION_READY\` only when all of the following hold:

- Stable FDACS id \`FL-FDACS-IM-*\`
- License type IM (not MB)
- Normalized status \`active\` (raw FDACS status preserved)
- Usable legal name
- No franchise/network brand without USDOT
- No unresolved duplicate with another FDACS row (same legal name + address/phone/email)
- No exact match to an existing MoveTrustHub company
- Florida physical street + city
- Not a PO Box
- \`COUNTY_VERIFIED\` from Census geocode cache (address MATCH or unique ZIP)
- Website **not** required
- Email **not** required
- Phone preferred but **not** required
- FMCSA/USDOT **not** required; absence is \`NO_FEDERAL_ID_IN_CURRENT_MTH_DATA\`, never “no USDOT exists”

---

## 5. Existing-provider collision audit

Identity rematch used the same fail-closed matcher as 011B/FL-002, now against the post-011D.2A company universe (including internal \`fl-im-*\` ids derived from IM numbers).

| Outcome | Count |
|---------|------:|
| Already linked via \`provider_state_authority\` | ${audit.collision.already_linked} |
| of which FL-002 public/existing MATCHED_EXISTING | ${audit.collision.fl002_verified_existing} |
| of which public/indexable company | ${audit.collision.already_linked_public_indexable} |
| of which internal \`fl-im-*\` INGESTED (011D.2A) | ${audit.collision.already_linked_fl_im_ingested} |
| New exact existing-company matches (link candidates) | ${audit.collision.new_exact_links} |
| PUBLICATION_READY remaining (safe new companies) | ${audit.publication_ready} |

No merges were written. Link evidence is in \`data/state-hhg/fl/publication-eligibility-v1.json\`.

---

## 6. FDACS internal deduplication

Registration rows ≠ businesses. Groups were not auto-collapsed unless legal name plus address/phone/email corroborated a **definite** duplicate; survivors keep the lexicographically first regulatory id. Shared phone/email/address across **different** legal names are probable/review only.

| Kind | Groups |
|------|------:|
| Definite | ${audit.duplicates.definite} |
| Probable | ${audit.duplicates.probable} |

---

## 7. Franchise QA

Franchise/network tokens never count as unique identity without USDOT. Observed brand-token rows:

${Object.keys(audit.franchise_groups).length ? Object.entries(audit.franchise_groups).map(([k, v]) => `- ${k}: ${v}`).join('\n') : '- none matched'}

---

## 8. Geography resolution

Official FDACS physical address is the location observation. County uses existing Census geocode cache only.

| Field | Count |
|-------|------:|
| Street resolved | ${g.street_resolved} |
| City resolved | ${g.city_resolved} |
| ZIP resolved | ${g.zip_resolved} |
| Florida valid | ${g.florida_valid} |

ZIP index: ${audit.zip_index.uniqueZips} ZIPs, ${audit.zip_index.uniqueCountyZips} unique-county, ${audit.zip_index.multiCountyZips} multi-county.

---

## 9. County resolution

| Class | Count |
|-------|------:|
| COUNTY_VERIFIED | ${g.COUNTY_VERIFIED} |
| COUNTY_REVIEW_REQUIRED | ${g.COUNTY_REVIEW_REQUIRED} |
| COUNTY_UNRESOLVED | ${g.COUNTY_UNRESOLVED} |

City-only guesses are never verified. Multi-county ZIPs stay review-required.

---

## 10. County coverage

Internal statistics only. County pages were not changed.

Publication-ready by county (non-zero):

${audit.county_coverage.filter((x: { publication_ready: number }) => x.publication_ready > 0).map((x: { county: string; publication_ready: number; review_required: number }) => `- ${x.county}: ready ${x.publication_ready}, review ${x.review_required}`).join('\n') || '- none'}

Counties with zero publication-ready FDACS candidates: ${audit.counties_with_zero_publication_ready.length} (${audit.counties_with_zero_publication_ready.join(', ') || 'none'}).

---

## 11. Contact availability

Across all FDACS registrations:

| Contact | Count |
|---------|------:|
| Email | ${audit.contacts.email_available} |
| Phone | ${audit.contacts.phone_available} |
| Physical address | ${audit.contacts.address_available} |
| No email | ${audit.contacts.no_email} |
| No website (all; FDACS has none) | ${audit.contacts.no_website} |

Missing website or email does not block \`PUBLICATION_READY\`.

---

## 12. Broker separation

MB rows stay \`BROKER_ONLY\`. Dual IM+MB entity groups: ${b.dual_im_mb_groups}. Broker-only records are excluded from the mover publication cohort.

---

## 13. Status exclusions

| Status | Cohort | Count |
|--------|--------|------:|
| Expired | HISTORICAL | ${c.HISTORICAL} |
| Unknown / revoked / other non-active | STATUS_BLOCKED | ${c.STATUS_BLOCKED} |

History is retained in staging and eligibility JSON. Not counted as active movers.

---

## 14. Review-required categories

FL-003 \`REVIEW_REQUIRED\` cohort (${c.REVIEW_REQUIRED}), fail-closed buckets:

${Object.keys(audit.review_buckets).length ? Object.entries(audit.review_buckets).map(([k, v]) => `- ${k}: ${v}`).join('\n') : '- none'}

FL-002 original \`REVIEW_REQUIRED\` dispositions: ${audit.fl002_review_required}. Reasons: ${JSON.stringify(audit.fl002_review_reasons)}.

These records do not block qualification of the cleaner state-only cohort.

---

## 15. Publication-ready cohort

\`Publication-ready new Florida state-only movers: ${audit.publication_ready}\`

Exclusions from the full FDACS set:

${Object.entries(c).filter(([k]) => k !== 'PUBLICATION_READY').map(([k, v]) => `- ${k}: ${v}`).join('\n')}

---

## 16. Sample QA

Deterministic sample of ${sample.size} publication-ready rows, checked only against official FDACS snapshots (legacy XLS + new-portal CSV). No Google Places.

| Check | Result |
|-------|--------|
| Sample size | ${sample.size} |
| Pass | ${sample.pass} |
| Estimated precision | ${(sample.precision * 100).toFixed(1)}% |
| Fail-closed for later launch | ${sample.fail_closed ? 'YES' : 'NO'} |

---

## 17. Projected Florida universe

Do **not** use \`399 + 1,001\`. 011D.2A already created internal Florida companies.

| Slice | Count |
|-------|------:|
| Current Florida MoveTrustHub companies (public + internal) | ${p.current_florida_companies} |
| Current Florida indexable | ${p.current_florida_indexable} |
| Existing providers with FDACS PSA linkage | ${p.existing_providers_with_fdacs_link} |
| Internal \`fl-im-*\` (all) | ${p.fl_im_all} |
| Internal \`fl-im-*\` INGESTED | ${p.fl_im_ingested_internal} |
| Internal \`fl-im-*\` PUBLISHABLE (011D.3 canary, still noindex) | ${p.fl_im_publishable_canary} |
| Newly qualified state-only movers | ${p.newly_qualified_state_only} |
| Newly discovered overlap (link candidates) | ${p.newly_discovered_overlap} |
| **Estimated future unique Florida companies** | **${p.estimated_future_unique_florida_companies}** |

\`current Florida companies + PUBLICATION_READY\` (link candidates are already in the current company count).

---

## 18. Publication gate (later FL-004)

Do not launch until:

- valid active FDACS IM identity
- no unresolved duplicate or existing-company collision
- COUNTY_VERIFIED (or an explicit later exception)
- sample precision ≥ 95%
- no live sitemap / county-page / Trust Report changes without a dedicated task

This task did **not** open that gate.

---

## 19. Contact-promotion design (not executed)

### Email
Promote FDACS email to canonical only when tied to VERIFIED regulatory identity, syntactically usable, not shared across unrelated entities, and no higher-confidence conflicting source.

### Phone
Promote when tied to VERIFIED identity, valid normalized number, no unresolved conflict.

### Address
Promote as state-regulatory location when parseable and unambiguous. Do not overwrite a stronger canonical HQ without explicit resolution.

FL-003 did not modify \`companies.email\`, \`companies.phone\`, or \`companies.physical_address\`.

---

## 20. Deferred public-records datasets

Still deferred (absence does not block basic directory qualification):

- broker ↔ mover contracted-mover lists
- enforcement / disciplinary actions
- complaints
- owners / officers
- registered agents
- insurance / bond lapse history
- historical applications

Do not submit the Florida PRA from this task.

---

## 21. Files changed

- \`lib/state-hhg/fl/publication-v1.ts\`
- \`lib/state-hhg/fl/zip-county.ts\`
- \`lib/state-hhg/fl/fl-003-qualification.test.ts\`
- \`scripts/run-task-fl-003-qualification.ts\`
- \`data/state-hhg/fl/publication-eligibility-v1.json\`
- \`docs/task-fl-003-florida-state-only-qualification.md\`
- \`docs/task-fl-003-audit.json\`
- \`docs/task-fl-003-sample-qa.json\`

---

## 22. Tests

\`npm run test:state-hhg\` includes FL-003 qualification tests (active IM, MB exclusion, expired/unknown, duplicates, existing-provider collision, franchise, county unique vs ambiguous, missing website/email allowed, no federal id required, ruleset version, no live publication / Google / canonical mutation).

---

## 23. Recommended FL-004

**FL-004 — Controlled internal canonicalization of the PUBLICATION_READY Florida cohort (still non-public unless explicitly approved), plus optional \`provider_state_authority\` links for EXISTING_PROVIDER_LINK_CANDIDATE rows.** Do not start automatically. Do not expose FDACS on consumer pages in that task unless separately authorized.
`;
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
