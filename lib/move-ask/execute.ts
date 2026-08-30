import { createClient } from '@supabase/supabase-js';
import {
  ASK_DEFINITIONS,
  MOVE_ASK_CONTRACT,
  MOVE_ASK_PAGE_SIZE,
} from './contract';
import { interpretMoveAskQuery, type ParsedMoveAsk } from './interpret';
import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseAdminConfigured,
} from '@/lib/supabase/config';
import { isIndexablePublication } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';
import {
  DIRECTORY_BROKER_ENTITY_TYPES,
  DIRECTORY_CARRIER_ENTITY_TYPES,
  DIRECTORY_DUAL_ENTITY_TYPES,
} from '@/lib/intelligence/home-classify';
import { authorityLabel, researchRole, roleExplanation } from '@/lib/company/research-profile';

const INTERNAL_PUBLICATION_STATES = 'REVIEW_REQUIRED,INACTIVE,INGESTED,CLASSIFIED';
const VISIBLE_OR = `publication_state.is.null,publication_state.not.in.(${INTERNAL_PUBLICATION_STATES})`;

export type AskCard = {
  entityId: string;
  displayName: string;
  legalName: string | null;
  dba: string | null;
  usdot: string | null;
  mc: string | null;
  role: string;
  fmcsaStatus: string | null;
  headquarters: string | null;
  floridaIm: string | null;
  href: string | null;
  publicationNote: string | null;
  whyMatched: string;
  complaintsNote: string | null;
};

export type AskCountRow = { label: string; value: number; grain: string };

export type MoveAskResult = {
  contract: typeof MOVE_ASK_CONTRACT;
  queryText: string;
  parsed: ParsedMoveAsk;
  resultType: string;
  results: AskCard[];
  counts: AskCountRow[];
  pagination: { page: number; pageSize: number; total: number; hasMore: boolean };
  provenance: {
    sourceFamily: string;
    geographyMeaning: string;
    officialAsOf: string;
    grain: string;
    exclusions: string[];
  };
  limitations: string[];
  elapsedMs: number;
};

const LIMITATIONS = [
  'A broker is not the carrier that necessarily transports household goods.',
  'Florida IM registration is not federal interstate household-goods authority.',
  'Headquarters is not service territory.',
  'Current authority is not a recommendation.',
  'Complaint observations are not confirmed wrongdoing.',
  'Missing evidence is not inactive, unauthorized, fraudulent, or clean.',
];

type AdminDb = {
  from: (table: string) => {
    select: (columns: string, opts?: { count?: 'exact'; head?: boolean }) => Chain;
  };
};
type Chain = {
  eq: (col: string, val: string | boolean) => Chain;
  in: (col: string, val: readonly string[]) => Chain;
  or: (expr: string) => Chain;
  ilike: (col: string, val: string) => Chain;
  not: (col: string, op: string, val: unknown) => Chain;
  order: (col: string, opts?: { ascending?: boolean }) => Chain;
  range: (from: number, to: number) => Chain;
  limit: (n: number) => Chain;
  then: Promise<{ data: unknown[] | null; count: number | null; error: { message: string } | null }>['then'];
};

function db(): AdminDb {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();
  if (!url || !key) throw new Error('Supabase admin client requires SUPABASE_SERVICE_ROLE_KEY (server-only).');
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  }) as unknown as AdminDb;
}

type CompanyRow = {
  id: string;
  name: string;
  slug: string | null;
  usdot_number: string | null;
  mc_number: string | null;
  entity_type: string | null;
  headquarters: string | null;
  authority_active: boolean | null;
  fmcsa_last_checked: string | null;
  publication_state: string | null;
  fmcsa_legal_name: string | null;
  fmcsa_complaints?: number | null;
  complaints_last_12m?: number | null;
};

const COMPANY_COLS =
  'id, name, slug, usdot_number, mc_number, entity_type, headquarters, authority_active, fmcsa_last_checked, publication_state, fmcsa_legal_name';

function roleTypes(role?: string, includeDual = true): string[] {
  if (role === 'broker') {
    return includeDual
      ? [...DIRECTORY_BROKER_ENTITY_TYPES, ...DIRECTORY_DUAL_ENTITY_TYPES]
      : [...DIRECTORY_BROKER_ENTITY_TYPES];
  }
  return includeDual
    ? [...DIRECTORY_CARRIER_ENTITY_TYPES, ...DIRECTORY_DUAL_ENTITY_TYPES]
    : [...DIRECTORY_CARRIER_ENTITY_TYPES];
}

function hqPattern(state: string): string {
  return state === 'FL' ? '% FL%' : `% ${state}%`;
}

function cardFromCompany(row: CompanyRow, why: string, extra?: Partial<AskCard>): AskCard {
  const company = {
    entityType: row.entity_type ?? '',
    services: [] as import('@/types').ServiceType[],
    authorityActive: row.authority_active,
    name: row.name,
    fmcsaLegalName: row.fmcsa_legal_name,
  };
  const role = researchRole(company);
  const pub = (row.publication_state ?? 'PUBLISHABLE') as PublicationState;
  const indexable = !row.publication_state || isIndexablePublication(pub);
  return {
    entityId: row.id,
    displayName: row.name,
    legalName: row.fmcsa_legal_name,
    dba: row.fmcsa_legal_name && row.fmcsa_legal_name !== row.name ? row.name : null,
    usdot: row.usdot_number,
    mc: row.mc_number,
    role,
    fmcsaStatus: authorityLabel(company),
    headquarters: row.headquarters,
    floridaIm: null,
    href: indexable && row.slug ? `/companies/${row.slug}` : null,
    publicationNote: indexable
      ? null
      : 'Research identity — this row is not currently an indexable public profile.',
    whyMatched: why,
    complaintsNote: null,
    ...extra,
  };
}

export async function executeMoveAsk(raw: string, page = 1): Promise<MoveAskResult> {
  const started = Date.now();
  const parsed = interpretMoveAskQuery(raw, page);
  const q = parsed.query;
  const empty = emptyBase(parsed, started);
  if (q.mode === 'fail_closed' || q.mode === 'definition') {
    empty.elapsedMs = Date.now() - started;
    return empty;
  }
  if (!isSupabaseAdminConfigured()) {
    empty.limitations = ['Research database is not configured in this environment.', ...LIMITATIONS];
    empty.elapsedMs = Date.now() - started;
    return empty;
  }
  if (q.mode === 'identifier' && q.identifier) return lookupIdentifier(parsed, started);
  if (q.mode === 'evidence' && q.identifier) return lookupEvidence(parsed, started);
  if (q.mode === 'count' || q.mode === 'aggregate' || q.mode === 'comparison') return counts(parsed, started);
  if (q.floridaIm) return listFloridaIm(parsed, started);
  if (q.overlapFmcsaFdacs) return listOverlap(parsed, started);
  return listCompanies(parsed, started);
}

async function lookupIdentifier(parsed: ParsedMoveAsk, started: number): Promise<MoveAskResult> {
  const id = parsed.query.identifier!;
  const col = id.type === 'usdot' ? 'usdot_number' : 'mc_number';
  const variants = id.type === 'usdot' ? [id.value, id.value.replace(/^0+/, '')] : [id.value, `MC-${id.value}`, `MC${id.value}`];
  const { data } = await db()
    .from('companies')
    .select(COMPANY_COLS)
    .in(col, variants)
    .limit(5);
  let rows = (data ?? []) as CompanyRow[];
  if (!rows.length) {
    const { data: fuzzy } = await db()
      .from('companies')
      .select(COMPANY_COLS)
      .ilike(col, `%${id.value}%`)
      .limit(5);
    rows = (fuzzy ?? []) as CompanyRow[];
  }
  const results = rows.map((row) =>
    cardFromCompany(
      row,
      id.type === 'usdot'
        ? `This company matches because the indexed FMCSA identity lists USDOT ${id.value}. USDOT is an identifier, not an endorsement.`
        : `This company matches because the indexed FMCSA record lists MC ${id.value}. An MC docket is not a quality ranking.`,
    ),
  );
  return finish(parsed, results, results.length, started, `Labeled ${id.type.toUpperCase()} lookup`);
}

async function lookupEvidence(parsed: ParsedMoveAsk, started: number): Promise<MoveAskResult> {
  const base = await lookupIdentifier(parsed, started);
  if (!base.results.length) return base;
  if (parsed.query.evidenceFamily === 'complaint') {
    const id = parsed.query.identifier!.value;
    const { data } = await db()
      .from('companies')
      .select(`${COMPANY_COLS}, fmcsa_complaints, complaints_last_12m`)
      .eq('usdot_number', id)
      .limit(5);
    const rows = (data ?? []) as CompanyRow[];
    const results = (rows.length ? rows : []).map((row) => {
      const n = row.fmcsa_complaints ?? row.complaints_last_12m;
      return cardFromCompany(
        row,
        `Complaint observations are attached to USDOT ${id} as stored counts, not as a finding of wrongdoing.`,
        {
          complaintsNote:
            n == null
              ? 'No complaint count is available in the current indexed source. Missing is not “no complaints” and not a clean record.'
              : `Indexed complaint observation count: ${n}. A complaint is not confirmed wrongdoing and is not a fraud score.`,
        },
      );
    });
    const result = finish(parsed, results.length ? results : base.results, results.length || base.results.length, started, 'Complaint observations (not wrongdoing)');
    result.limitations = [
      'Complaint observations are not confirmed wrongdoing and are not a scam or safety score.',
      ...LIMITATIONS,
    ];
    return result;
  }
  const row = base.results[0]!;
  row.whyMatched = `${row.whyMatched} Regulatory role: ${row.role}. ${roleExplanation(row.role as 'Carrier' | 'Broker' | 'Carrier / Broker' | 'Unknown')}`;
  return finish(parsed, base.results, base.results.length, started, 'Authority / role evidence');
}

async function counts(parsed: ParsedMoveAsk, started: number): Promise<MoveAskResult> {
  const q = parsed.query;
  if (q.aggregateMetric === 'florida_im_active' || q.floridaIm) {
    const n = await countIm();
    return finish(parsed, [], n, started, 'FDACS IM registration rows', [
      {
        label: 'Active Florida Intrastate Mover registrations',
        value: n,
        grain: 'registration row — not unique published profiles',
      },
    ]);
  }
  if (q.mode === 'comparison' && q.jurisdiction && q.compareJurisdiction) {
    const a = await countRole(q.role ?? 'carrier', q.jurisdiction.state, true);
    const b = await countRole(q.role ?? 'carrier', q.compareJurisdiction.state, true);
    return finish(parsed, [], 0, started, 'same-grain headquarters comparison', [
      { label: `${q.jurisdiction.state} headquartered profiles with carrier authority`, value: a, grain: 'directory profile; headquarters ≠ service territory' },
      { label: `${q.compareJurisdiction.state} headquartered profiles with carrier authority`, value: b, grain: 'directory profile; headquarters ≠ service territory' },
    ]);
  }
  const carrierOnly = await countTypes([...DIRECTORY_CARRIER_ENTITY_TYPES], q.jurisdiction?.state, q.authorityCurrent === true);
  const brokerOnly = await countTypes([...DIRECTORY_BROKER_ENTITY_TYPES], q.jurisdiction?.state, q.authorityCurrent === true);
  const dual = await countTypes([...DIRECTORY_DUAL_ENTITY_TYPES], q.jurisdiction?.state, q.authorityCurrent === true);
  if (q.role === 'broker') {
    return finish(parsed, [], brokerOnly + dual, started, 'broker authority profiles', [
      { label: 'Broker-only directory profiles', value: brokerOnly, grain: 'directory profile' },
      { label: 'Carrier/Broker dual-role directory profiles', value: dual, grain: 'directory profile — not added into a mega “movers” total' },
    ]);
  }
  return finish(parsed, [], carrierOnly + dual, started, 'carrier authority profiles', [
    { label: 'Carrier-only directory profiles', value: carrierOnly, grain: 'directory profile' },
    { label: 'Carrier/Broker dual-role directory profiles', value: dual, grain: 'directory profile — dual role is disclosed, not double-counted as two companies' },
  ]);
}

async function countIm(): Promise<number> {
  const { count } = await db()
    .from('provider_state_authority')
    .select('id', { count: 'exact', head: true })
    .eq('state_code', 'FL')
    .eq('authority_type', 'intrastate_mover_registration')
    .eq('status', 'active');
  return count ?? 0;
}

async function countTypes(types: string[], state?: string, current?: boolean): Promise<number> {
  let query = db()
    .from('companies')
    .select('id', { count: 'exact', head: true })
    .or(VISIBLE_OR)
    .in('entity_type', types);
  if (state) query = query.ilike('headquarters', hqPattern(state));
  if (current) query = query.eq('authority_active', true);
  const { count } = await query;
  return count ?? 0;
}

async function countRole(role: string, state?: string, current?: boolean): Promise<number> {
  return countTypes(roleTypes(role, true), state, current);
}

async function listCompanies(parsed: ParsedMoveAsk, started: number): Promise<MoveAskResult> {
  const q = parsed.query;
  const page = q.page;
  const from = (page - 1) * MOVE_ASK_PAGE_SIZE;
  const to = from + MOVE_ASK_PAGE_SIZE - 1;
  const types = roleTypes(q.role, q.includeDualRole);
  let query = db()
    .from('companies')
    .select(COMPANY_COLS, { count: 'exact' })
    .or(VISIBLE_OR)
    .in('entity_type', types)
    .order('name', { ascending: true })
    .order('usdot_number', { ascending: true })
    .range(from, to);
  if (q.jurisdiction?.state) query = query.ilike('headquarters', hqPattern(q.jurisdiction.state));
  if (q.authorityCurrent === true) query = query.eq('authority_active', true);
  if (q.authorityCurrent === 'not_current') query = query.eq('authority_active', false);
  const { data, count } = await query;
  const rows = (data ?? []) as CompanyRow[];
  const geo = q.jurisdiction
    ? `lists ${q.jurisdiction.state} as its recorded company address / headquarters state (not service territory)`
    : 'is in the current indexed FMCSA directory extract';
  const results = rows.map((row) => {
    const role = researchRole({ entityType: row.entity_type, services: [] });
    return cardFromCompany(
      row,
      `This company matches because the indexed FMCSA record classifies it as a ${role.toLowerCase()} and ${geo}. This is not a recommendation.`,
    );
  });
  return finish(
    parsed,
    results,
    count ?? results.length,
    started,
    q.jurisdiction
      ? `recorded headquarters state = ${q.jurisdiction.state}`
      : 'FMCSA directory profiles',
  );
}

async function listFloridaIm(parsed: ParsedMoveAsk, started: number): Promise<MoveAskResult> {
  const page = parsed.query.page;
  const from = (page - 1) * MOVE_ASK_PAGE_SIZE;
  const to = from + MOVE_ASK_PAGE_SIZE - 1;
  const { data, count } = await db()
    .from('provider_state_authority')
    .select('id, authority_number, status, company_id, verification_state, retrieved_at, legal_name, source', { count: 'exact' })
    .eq('state_code', 'FL')
    .eq('authority_type', 'intrastate_mover_registration')
    .eq('status', 'active')
    .order('authority_number', { ascending: true })
    .range(from, to);
  const rows = (data ?? []) as Array<{
    id: string;
    authority_number: string | null;
    status: string | null;
    company_id: string | null;
    verification_state: string | null;
    retrieved_at: string | null;
    legal_name: string | null;
    source: string | null;
  }>;
  const results: AskCard[] = rows.map((row) => ({
    entityId: row.id,
    displayName: row.legal_name || row.authority_number || 'Florida IM registration',
    legalName: row.legal_name,
    dba: null,
    usdot: null,
    mc: null,
    role: 'Florida Intrastate Mover registration',
    fmcsaStatus: row.status,
    headquarters: null,
    floridaIm: row.authority_number,
    href: null,
    publicationNote:
      row.verification_state === 'VERIFIED' && row.company_id
        ? 'Linked to a company via VERIFIED company_id — not a name merge.'
        : 'Registration grain. Not a published FMCSA interstate profile. Unlinked rows are not federal identities.',
    whyMatched:
      'This row matches because FDACS stores it as an active Intrastate Mover registration. That is not federal interstate household-goods authority and not service territory.',
    complaintsNote: null,
  }));
  return finish(parsed, results, count ?? results.length, started, 'FDACS Intrastate Mover registration rows');
}

async function listOverlap(parsed: ParsedMoveAsk, started: number): Promise<MoveAskResult> {
  const { data } = await db()
    .from('provider_state_authority')
    .select('id, authority_number, company_id, legal_name, retrieved_at')
    .eq('state_code', 'FL')
    .eq('authority_type', 'intrastate_mover_registration')
    .eq('status', 'active')
    .eq('verification_state', 'VERIFIED')
    .not('company_id', 'is', null)
    .limit(200);
  const links = (data ?? []) as Array<{ company_id: string; authority_number: string | null; legal_name: string | null }>;
  const ids = [...new Set(links.map((r) => r.company_id).filter(Boolean))];
  if (!ids.length) {
    return finish(parsed, [], 0, started, 'VERIFIED FMCSA + FDACS overlap (none in current extract)');
  }
  const page = parsed.query.page;
  const from = (page - 1) * MOVE_ASK_PAGE_SIZE;
  const slice = ids.slice(from, from + MOVE_ASK_PAGE_SIZE);
  const { data: companies } = await db()
    .from('companies')
    .select(COMPANY_COLS)
    .in('id', slice)
    .or(VISIBLE_OR)
    .order('name', { ascending: true });
  const imByCompany = new Map(links.map((l) => [l.company_id, l.authority_number]));
  const results = ((companies ?? []) as CompanyRow[]).map((row) =>
    cardFromCompany(
      row,
      `This company matches because a VERIFIED company_id link connects an active FDACS Intrastate Mover registration (${imByCompany.get(row.id) ?? 'IM'}) to this FMCSA identity. The link is not a name merge and does not mean the company only serves Florida.`,
      { floridaIm: imByCompany.get(row.id) ?? null },
    ),
  );
  return finish(parsed, results, ids.length, started, 'VERIFIED company_id overlap only');
}

function emptyBase(parsed: ParsedMoveAsk, started: number): MoveAskResult {
  return {
    contract: MOVE_ASK_CONTRACT,
    queryText: parsed.raw,
    parsed,
    resultType: parsed.query.mode,
    results: [],
    counts: [],
    pagination: { page: parsed.query.page, pageSize: MOVE_ASK_PAGE_SIZE, total: 0, hasMore: false },
    provenance: {
      sourceFamily: 'FMCSA directory + FDACS IM where used',
      geographyMeaning: parsed.query.jurisdiction
        ? `${parsed.query.jurisdiction.meaning} = ${parsed.query.jurisdiction.state}`
        : 'Not geography-filtered',
      officialAsOf: 'See fmcsa_last_checked / retrieved_at',
      grain: parsed.query.role ?? parsed.query.mode,
      exclusions: LIMITATIONS,
    },
    limitations: LIMITATIONS,
    elapsedMs: Date.now() - started,
  };
}

function finish(
  parsed: ParsedMoveAsk,
  results: AskCard[],
  total: number,
  started: number,
  grain: string,
  counts: AskCountRow[] = [],
): MoveAskResult {
  const page = parsed.query.page;
  return {
    contract: MOVE_ASK_CONTRACT,
    queryText: parsed.raw,
    parsed,
    resultType: parsed.query.mode,
    results,
    counts: counts.length ? counts : total ? [{ label: 'Matching research identities', value: total, grain }] : [],
    pagination: {
      page,
      pageSize: MOVE_ASK_PAGE_SIZE,
      total,
      hasMore: page * MOVE_ASK_PAGE_SIZE < total,
    },
    provenance: {
      sourceFamily: parsed.query.floridaIm
        ? 'provider_state_authority (FDACS IM)'
        : 'companies (FMCSA directory extract; service-role; not a client-side dump)',
      geographyMeaning: parsed.query.jurisdiction
        ? `${parsed.query.jurisdiction.meaning} = ${parsed.query.jurisdiction.state}`
        : 'Not geography-filtered',
      officialAsOf: results[0] ? 'See FMCSA last-checked / FDACS retrieved_at' : 'See source clocks',
      grain,
      exclusions: LIMITATIONS,
    },
    limitations: LIMITATIONS,
    elapsedMs: Date.now() - started,
  };
}

export function publicAskPayload(result: MoveAskResult) {
  return {
    contract: result.contract,
    capability: { federatedExecution: 'execute', askStatus: 'live' },
    interpretation: result.parsed.interpretation,
    query: {
      mode: result.parsed.query.mode,
      role: result.parsed.query.role,
      identifier: result.parsed.query.identifier,
      jurisdiction: result.parsed.query.jurisdiction,
      failReason: result.parsed.query.failReason,
      alternatives: result.parsed.query.alternatives,
      definitionId: result.parsed.query.definitionId,
      page: result.parsed.query.page,
    },
    resultType: result.resultType,
    results: result.results.map((row) => ({
      name: row.displayName,
      usdot: row.usdot,
      mc: row.mc,
      role: row.role,
      fmcsaStatus: row.fmcsaStatus,
      headquarters: row.headquarters,
      floridaIm: row.floridaIm,
      href: row.href,
      publicationNote: row.publicationNote,
      whyMatched: row.whyMatched,
      complaintsNote: row.complaintsNote,
    })),
    counts: result.counts,
    pagination: result.pagination,
    provenance: result.provenance,
    limitations: result.limitations,
    elapsedMs: result.elapsedMs,
    definition: result.parsed.query.definitionId ? ASK_DEFINITIONS[result.parsed.query.definitionId] : undefined,
  };
}
