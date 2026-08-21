/**
 * Task FL-002 — normalize full FDACS snapshot, fail-closed match, contact observations.
 * Does NOT publish companies, overwrite canonical contacts, or call Google Places.
 *
 * npx tsx scripts/ingest-task-fl-002.ts --dry-run
 * npx tsx scripts/ingest-task-fl-002.ts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { FloridaStateMoverAdapter, parseFdacsCsv } from '../lib/state-hhg/fl/adapter';
import { fdacsRegistrationKind, fdacsRegulatoryId } from '../lib/state-hhg/fl/regulatory-id';
import { loadFdacsLegacyXls } from '../lib/state-hhg/fl/legacy-xls';
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


const GOOGLE_PLACES_REQUESTS = 0 as const;
const RUN_NOTE = 'task-fl-002-florida-registry-contact-enrichment';

function loadEnv() {
  for (const file of [
    resolve(process.cwd(), '.env.local'),
    resolve('C:/Users/makei/move-trust-hub-task004/.env.local'),
    resolve(process.cwd(), '.env.production.local'),
  ]) {
    if (!existsSync(file)) continue;
    for (const raw of readFileSync(file, 'utf8').split('\n')) {
      const match = raw.trim().match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres/.test(value)) process.env.DATABASE_URL = value;
    }
  }
}

async function ensureSchema(client: pg.Client) {
  await client.query(`
    ALTER TABLE public.state_hhg_registry_staging
      ADD COLUMN IF NOT EXISTS regulatory_id text,
      ADD COLUMN IF NOT EXISTS candidate_class text
  `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.provider_contact_observation (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      company_id text,
      state_code text,
      regulator text NOT NULL DEFAULT 'FDACS',
      regulatory_id text NOT NULL,
      observation_type text NOT NULL,
      raw_value text NOT NULL,
      normalized_value text,
      source text NOT NULL,
      source_record_id text,
      source_url text,
      retrieved_at timestamptz NOT NULL DEFAULT now(),
      verification_state text NOT NULL DEFAULT 'UNRESOLVED',
      match_status text,
      match_evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
      quality_class text,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  await client.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS provider_contact_observation_unique_idx
      ON public.provider_contact_observation (regulatory_id, observation_type)
  `);
  await client.query(`REVOKE ALL ON public.provider_contact_observation FROM anon, authenticated`);
}

async function main() {
  loadEnv();
  const dry = process.argv.includes('--dry-run');
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');

  console.log(JSON.stringify({ google_places_requests: 0, phase: 'start', dry }));
  const adapter = new FloridaStateMoverAdapter({ retrievedAt: new Date().toISOString() });
  const rawRows = await adapter.fetchOrLoadRegistry();
  console.log(JSON.stringify({ google_places_requests: 0, phase: 'registry_loaded', raw: rawRows.length }));
  const normalized = rawRows.map((row) => adapter.normalizeRecord(row));

  const legacyIm = loadFdacsLegacyXls(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-im-active.xls'));
  const legacyMb = loadFdacsLegacyXls(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-mb-active.xls'));
  const csvMovers = parseFdacsCsv(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv'), 'utf8')
  );
  const csvBrokers = parseFdacsCsv(
    readFileSync(resolve(process.cwd(), 'data/state-hhg/fl/fdacs-moving-brokers-newdb.csv'), 'utf8')
  );

  const seenKeys = new Set<string>();
  let duplicateSourceRows = 0;
  let missingIds = 0;
  const malformed: string[] = [];
  const records = [];
  for (const rec of normalized) {
    const lic = rec.authorityNumber?.trim() ?? '';
    if (!lic) {
      missingIds += 1;
      malformed.push(rec.legalName);
      continue;
    }
    const kind = fdacsRegistrationKind(lic, String(rec.raw.licenseType ?? rec.raw.roleClass));
    const regulatoryId = fdacsRegulatoryId(lic, String(rec.raw.licenseType ?? ''));
    if (!regulatoryId || kind === 'XX') {
      malformed.push(lic);
      continue;
    }
    if (seenKeys.has(regulatoryId)) {
      duplicateSourceRows += 1;
      continue;
    }
    seenKeys.add(regulatoryId);
    records.push({ rec, kind, regulatoryId });
  }

  const im = records.filter((r) => r.kind === 'IM');
  const mb = records.filter((r) => r.kind === 'MB');
  const statusCounts: Record<string, number> = {};
  for (const r of records) {
    statusCounts[r.rec.status] = (statusCounts[r.rec.status] ?? 0) + 1;
  }

  const byLegalPhone = new Map<string, typeof records>();
  for (const r of records) {
    const legal = normalizeLegalName(r.rec.legalName);
    const phone = normalizePhone(r.rec.phone);
    const key = legal && phone ? `${legal}|${phone}` : legal ? `${legal}|${r.regulatoryId}` : r.regulatoryId;
    byLegalPhone.set(key, [...(byLegalPhone.get(key) ?? []), r]);
  }
  const dualEntities = [...byLegalPhone.values()].filter(
    (group) => group.some((g) => g.kind === 'IM') && group.some((g) => g.kind === 'MB')
  );
  const multiReg = [...byLegalPhone.values()].filter((g) => g.length > 1);
  const uniqueBusinessEstimate = byLegalPhone.size;

  const client = new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  });
  console.log(JSON.stringify({ google_places_requests: 0, phase: 'db_connect' }));
  await client.connect();
  console.log(JSON.stringify({ google_places_requests: 0, phase: 'db_connected' }));
  const freezeBefore = await client.query(
    `SELECT count(*)::int AS companies, count(*) FILTER (WHERE indexable)::int AS indexable FROM companies`
  );
  console.log(JSON.stringify({ google_places_requests: 0, phase: 'freeze_before', ...freezeBefore.rows[0] }));
  const companies = await client.query(
    `SELECT id, name, fmcsa_legal_name, usdot_number, phone, email, physical_address, headquarters
       FROM companies`
  );
  console.log(JSON.stringify({ google_places_requests: 0, phase: 'companies_loaded', n: companies.rows.length }));
  const prior = await client.query(
    `SELECT authority_number, matched_company_id FROM provider_state_authority
      WHERE state_code='FL' AND matched_company_id IS NOT NULL AND authority_number IS NOT NULL`
  );
  console.log(JSON.stringify({ google_places_requests: 0, phase: 'prior_loaded', n: prior.rows.length }));
  const companyRows = companies.rows;
  const priorRows = prior.rows;
  const freezeBeforeRow = freezeBefore.rows[0];
  await client.end();
  console.log(JSON.stringify({ google_places_requests: 0, phase: 'db_released_for_match' }));
  const priorMap = new Map(
    (priorRows as Array<{ authority_number: string; matched_company_id: string }>).map((r) => [
      r.authority_number.toUpperCase(),
      r.matched_company_id,
    ])
  );

  const candidates: CanonicalProviderIdentity[] = (
    companyRows as Array<{
      id: string;
      name: string;
      fmcsa_legal_name: string | null;
      usdot_number: string | null;
      phone: string | null;
      email: string | null;
      physical_address: string | null;
      headquarters: string | null;
    }>
  ).map((row) => ({
    companyId: row.id,
    legalName: row.fmcsa_legal_name,
    dbaName: null,
    publicName: row.name,
    usdot: row.usdot_number,
    phone: row.phone,
    email: row.email,
    address: row.physical_address,
    city: (row.headquarters ?? '').split(',')[0] ?? null,
    state: null,
    postalCode: null,
  }));
  const companyById = new Map(candidates.map((c) => [c.companyId, c]));

  const matchCounts = {
    VERIFIED: 0,
    REVIEW_REQUIRED: 0,
    NOT_FOUND: 0,
    NOT_APPLICABLE: 0,
  };
  const methods: Record<string, number> = {};
  const candidateClassCounts: Record<string, number> = {};
  let emailObs = 0;
  let phoneObs = 0;
  let addressObs = 0;
  let emailAgree = 0;
  let emailConflict = 0;
  let phoneAgree = 0;
  let phoneConflict = 0;
  let addressAgree = 0;
  let addressConflict = 0;
  const matchedExistingIds = new Set<string>();
  const emailClasses: Record<string, number> = {};
  const emails = new Map<string, number>();
  const phones = new Map<string, number>();
  const addresses = new Map<string, number>();
  let malformedEmail = 0;
  let malformedPhone = 0;
  let poBoxes = 0;
  let completeStreet = 0;

  type RowOut = {
    regulatoryId: string;
    kind: string;
    status: string;
    legalName: string;
    matchedCompanyId: string | null;
    matchMethod: string;
    linkStatus: string;
    candidateClass: string;
    reviewReason: string | null;
  };
  const outs: RowOut[] = [];

  let write: pg.Client | null = null;
  if (!dry) {
    write = new pg.Client({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 20000,
    });
    await write.connect();
    await ensureSchema(write);
  }

  console.log(
    JSON.stringify({
      google_places_requests: 0,
      phase: 'matching',
      records: records.length,
      candidates: candidates.length,
    })
  );
  let processed = 0;
  for (const item of records) {
    processed += 1;
    if (processed === 1 || processed % 200 === 0) {
      console.log(JSON.stringify({ google_places_requests: 0, phase: 'match_progress', processed }));
    }
    const rec = item.rec;
    const roleClass = rec.raw.roleClass === 'broker' ? 'broker' : 'mover';
    const match = matchStateRegistryIdentity(
      {
        legalName: rec.legalName,
        dba: rec.dba,
        usdot: rec.usdot,
        phone: rec.phone,
        email: rec.email,
        physicalAddress: rec.physicalAddress,
        city: rec.city,
        postalCode: rec.postalCode,
        statusNormalized: rec.status,
        roleClass,
        authorityNumber: rec.authorityNumber,
        priorAuthorityCompanyId: rec.authorityNumber
          ? priorMap.get(rec.authorityNumber.toUpperCase()) ?? null
          : null,
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
    let linkStatus: 'VERIFIED' | 'REVIEW_REQUIRED' | 'NOT_FOUND' | 'NOT_APPLICABLE' = 'NOT_FOUND';
    if (match.disposition === 'HISTORICAL' || match.disposition === 'OUT_OF_SCOPE') {
      linkStatus = 'NOT_APPLICABLE';
    } else if (verificationState === 'VERIFIED') {
      linkStatus = 'VERIFIED';
    } else if (match.disposition === 'REVIEW_REQUIRED' || verificationState === 'REVIEW_REQUIRED') {
      linkStatus = 'REVIEW_REQUIRED';
    } else if (match.disposition === 'MATCHED_EXISTING') {
      linkStatus = 'REVIEW_REQUIRED';
    } else {
      linkStatus = 'NOT_FOUND';
    }
    matchCounts[linkStatus] += 1;
    methods[match.matchMethod] = (methods[match.matchMethod] ?? 0) + 1;
    const candidateClass = classifyStateCandidate({
      matchedCompanyId: match.matchedCompanyId,
      statusNormalized: rec.status,
    });
    candidateClassCounts[candidateClass] = (candidateClassCounts[candidateClass] ?? 0) + 1;
    if (match.matchedCompanyId) matchedExistingIds.add(match.matchedCompanyId);

    const phoneParts = parsePhoneParts(rec.phone);
    const emailParts = classifyEmail(rec.email);
    emailClasses[emailParts.class] = (emailClasses[emailParts.class] ?? 0) + 1;
    if (emailParts.class === 'malformed') malformedEmail += 1;
    if (phoneParts.malformed) malformedPhone += 1;
    if (emailParts.normalized) emails.set(emailParts.normalized, (emails.get(emailParts.normalized) ?? 0) + 1);
    if (phoneParts.normalized) phones.set(phoneParts.normalized, (phones.get(phoneParts.normalized) ?? 0) + 1);
    const parsedAddr = parseCityStateZipFromLocation(
      String(rec.raw.location ?? rec.physicalAddress ?? '')
    );
    if (parsedAddr.addressLine && parsedAddr.city && parsedAddr.postalCode) completeStreet += 1;
    if (isPoBox(rec.physicalAddress)) poBoxes += 1;
    const addrKey = (rec.physicalAddress ?? '').toUpperCase().replace(/\s+/g, ' ').trim();
    if (addrKey) addresses.set(addrKey, (addresses.get(addrKey) ?? 0) + 1);

    const canonical = match.matchedCompanyId ? companyById.get(match.matchedCompanyId) : null;
    if (canonical && emailParts.normalized) {
      const canEmail = normalizeEmail(canonical.email);
      if (!canEmail) {
        /* observation only */
      } else if (canEmail === emailParts.normalized) emailAgree += 1;
      else emailConflict += 1;
    }
    if (canonical && phoneParts.normalized) {
      const canPhone = normalizePhone(canonical.phone);
      if (!canPhone) {
        /* observation only */
      } else if (canPhone === phoneParts.normalized) phoneAgree += 1;
      else phoneConflict += 1;
    }
    if (canonical && rec.physicalAddress && canonical.address) {
      const a = rec.physicalAddress.toUpperCase().replace(/\s+/g, ' ').trim();
      const b = canonical.address.toUpperCase().replace(/\s+/g, ' ').trim();
      if (a && b && a === b) addressAgree += 1;
      else if (a && b) addressConflict += 1;
    }

    outs.push({
      regulatoryId: item.regulatoryId,
      kind: item.kind,
      status: rec.status,
      legalName: rec.legalName,
      matchedCompanyId: match.matchedCompanyId,
      matchMethod: match.matchMethod,
      linkStatus,
      candidateClass,
      reviewReason: match.reviewReason,
    });

    if (rec.email) emailObs += 1;
    if (rec.phone) phoneObs += 1;
    if (rec.physicalAddress) addressObs += 1;
    if (dry) continue;

    const obsVerification =
      linkStatus === 'VERIFIED' ? 'VERIFIED' : linkStatus === 'NOT_APPLICABLE' ? 'HISTORICAL' : 'UNRESOLVED';
    const insertObs = async (
      type: 'business_email' | 'business_phone' | 'physical_address',
      rawValue: string,
      normalized: string | null,
      quality: string | null
    ) => {
      await write!.query(
        `INSERT INTO public.provider_contact_observation (
           company_id, state_code, regulator, regulatory_id, observation_type,
           raw_value, normalized_value, source, source_record_id, source_url,
           retrieved_at, verification_state, match_status, match_evidence, quality_class
         ) VALUES ($1,'FL','FDACS',$2,$3,$4,$5,$6,$7,$8,now(),$9,$10,$11::jsonb,$12)
         ON CONFLICT (regulatory_id, observation_type)
         DO UPDATE SET
           company_id = EXCLUDED.company_id,
           verification_state = EXCLUDED.verification_state,
           match_status = EXCLUDED.match_status,
           match_evidence = EXCLUDED.match_evidence,
           quality_class = EXCLUDED.quality_class`,
        [
          match.matchedCompanyId,
          item.regulatoryId,
          type,
          rawValue,
          normalized,
          String(rec.raw._sourceKind ?? 'fdacs'),
          rec.authorityNumber,
          'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
          obsVerification,
          linkStatus,
          JSON.stringify({
            matchMethod: match.matchMethod,
            evidence: match.evidence,
            google_places_requests: 0,
          }),
          quality,
        ]
      );
    };
    if (rec.email) {
      await insertObs('business_email', rec.email, emailParts.normalized, emailParts.class);
    }
    if (rec.phone) {
      await insertObs('business_phone', rec.phone, phoneParts.normalized, phoneParts.malformed ? 'malformed' : 'ok');
    }
    if (rec.physicalAddress) {
      await insertObs('physical_address', rec.physicalAddress, parsedAddr.addressLine, isPoBox(rec.physicalAddress) ? 'po_box' : 'street');
    }

    await write!.query(
      `UPDATE public.state_hhg_registry_staging
          SET regulatory_id = $1,
              candidate_class = $2,
              matched_company_id = $3,
              match_method = $4,
              match_evidence = $5::jsonb,
              review_reason = $6,
              disposition = $7,
              updated_at = now()
        WHERE state_code='FL' AND (authority_number = $8 OR raw_source_key = $9)`,
      [
        item.regulatoryId,
        candidateClass,
        match.matchedCompanyId,
        match.matchMethod === 'none' ? null : match.matchMethod,
        JSON.stringify({ ...match.evidence, regulatoryId: item.regulatoryId, linkStatus }),
        match.reviewReason,
        match.disposition,
        rec.authorityNumber,
        String(rec.raw.rawSourceKey ?? rec.raw._rawSourceKey ?? ''),
      ]
    );
  }

  let freezeAfterRow = freezeBeforeRow;
  let obsCounts = { rows: [{ n: 0, emails: 0, phones: 0, addresses: 0 }] };
  if (!dry) {
    const freezeAfter = await write!.query(
      `SELECT count(*)::int AS companies, count(*) FILTER (WHERE indexable)::int AS indexable FROM companies`
    );
    freezeAfterRow = freezeAfter.rows[0];
    obsCounts = await write!.query(
      `SELECT count(*)::int AS n,
              count(*) FILTER (WHERE observation_type='business_email')::int AS emails,
              count(*) FILTER (WHERE observation_type='business_phone')::int AS phones,
              count(*) FILTER (WHERE observation_type='physical_address')::int AS addresses
         FROM provider_contact_observation WHERE regulator='FDACS'`
    );
    await write!.end();
  }

  const sharedEmails = [...emails.values()].filter((n) => n > 1).length;
  const sharedPhones = [...phones.values()].filter((n) => n > 1).length;
  const sharedAddresses = [...addresses.values()].filter((n) => n > 1).length;
  const pct = (n: number) => `${((100 * n) / Math.max(records.length, 1)).toFixed(1)}%`;

  const report = {
    google_places_requests: GOOGLE_PLACES_REQUESTS,
    dry,
    published: false,
    canonical_overwritten: false,
    freeze_before: freezeBeforeRow,
    freeze_after: freezeAfterRow,
    snapshots: {
      legacy_im: legacyIm.length,
      legacy_mb: legacyMb.length,
      new_portal_movers: csvMovers.length,
      new_portal_brokers: csvBrokers.length,
      combined_raw: rawRows.length,
    },
    registry: {
      normalized: records.length,
      duplicate_source_rows: duplicateSourceRows,
      missing_registration_ids: missingIds,
      malformed: malformed.length,
      IM: im.length,
      MB: mb.length,
      dual_license_entities: dualEntities.length,
      statuses: statusCounts,
    },
    unique_business: {
      registrations: records.length,
      estimated_unique_businesses: uniqueBusinessEstimate,
      multi_registration_groups: multiReg.length,
      dual_im_mb_groups: dualEntities.length,
    },
    match: {
      ...matchCounts,
      pct: {
        VERIFIED: pct(matchCounts.VERIFIED),
        REVIEW_REQUIRED: pct(matchCounts.REVIEW_REQUIRED),
        NOT_FOUND: pct(matchCounts.NOT_FOUND),
        NOT_APPLICABLE: pct(matchCounts.NOT_APPLICABLE),
      },
      methods,
      matched_existing_providers: matchedExistingIds.size,
    },
    candidate_class: candidateClassCounts,
    state_only: {
      active_movers: outs.filter((o) => o.candidateClass === 'ACTIVE_STATE_ONLY_CANDIDATE' && o.kind === 'IM').length,
      active_brokers: outs.filter((o) => o.candidateClass === 'ACTIVE_STATE_ONLY_CANDIDATE' && o.kind === 'MB').length,
      expired: outs.filter((o) => o.candidateClass === 'EXPIRED_STATE_RECORD').length,
      revoked: outs.filter((o) => o.candidateClass === 'REVOKED_STATE_RECORD').length,
      unknown: outs.filter((o) => o.candidateClass === 'UNKNOWN_STATE_RECORD').length,
    },
    contacts: {
      email: {
        raw: records.filter((r) => r.rec.email).length,
        unique_normalized: emails.size,
        usable: (emailClasses.named ?? 0) + (emailClasses.role ?? 0) + (emailClasses.generic ?? 0),
        classes: emailClasses,
        malformed: malformedEmail,
        shared_values: sharedEmails,
      },
      phone: {
        total: records.filter((r) => r.rec.phone).length,
        unique: phones.size,
        malformed: malformedPhone,
        shared_values: sharedPhones,
        canonical_agree: phoneAgree,
        canonical_conflict: phoneConflict,
      },
      address: {
        total: records.filter((r) => r.rec.physicalAddress).length,
        complete_street: completeStreet,
        po_box: poBoxes,
        shared_values: sharedAddresses,
        canonical_agree: addressAgree,
        canonical_conflict: addressConflict,
      },
      observations_written: obsCounts.rows[0],
      enrichment: {
        email_observations: emailObs,
        phone_observations: phoneObs,
        address_observations: addressObs,
        email_agree: emailAgree,
        email_conflict: emailConflict,
      },
    },
    note: RUN_NOTE,
    sample_rows: outs.filter((r) => r.linkStatus === 'VERIFIED').slice(0, 25),
  };

  mkdirSync(resolve(process.cwd(), 'docs'), { recursive: true });
  writeFileSync(resolve(process.cwd(), 'docs/task-fl-002-ingest.json'), JSON.stringify(report, null, 2) + '\n');
  writeFileSync(
    resolve(process.cwd(), 'docs/task-fl-002-match-rows.json'),
    JSON.stringify({ google_places_requests: 0, rows: outs }, null, 2) + '\n'
  );
  console.log(
    JSON.stringify(
      {
        google_places_requests: 0,
        dry,
        freeze: { before: freezeBeforeRow, after: freezeAfterRow },
        registry: report.registry,
        unique_business: report.unique_business,
        match: report.match,
        candidate_class: candidateClassCounts,
        contacts: report.contacts.email.classes,
      },
      null,
      2
    )
  );
  if (freezeAfterRow.companies !== freezeBeforeRow.companies) process.exit(1);
  if (freezeAfterRow.indexable !== freezeBeforeRow.indexable) process.exit(1);
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e).replace(/postgresql:\/\/[^@]+@/, 'postgresql://***@'));
  process.exit(1);
});
