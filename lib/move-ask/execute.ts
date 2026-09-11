import { distinctiveTokens, matchSourceName, NAME_CANDIDATE_LIMIT, NAME_RETRIEVAL_LIMIT, type NameEvidence } from './name';
import 'server-only';
import { createClient } from '@supabase/supabase-js';
import {
  ASK_DEFINITIONS,
  MOVE_ASK_CONTRACT,
  MOVE_ASK_PAGE_SIZE,
} from './contract';
import type { ParsedMoveAsk } from './interpret';
import { planMoveRequest, MoveRequestError, type MoveRequestInput } from './plan';
import { identifierVariants, normalizeStoredIdentifier } from './identifier';
import { buildSaferLookupUrl } from '../verify-dot/fmcsa';
import { extractStateCodeFromHeadquarters } from '../directory/coverage-filter';
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
import { authorityLabel, researchRole } from '@/lib/company/research-profile';
import { formatAuthorityStatus } from '@/lib/fmcsa/carrier-fields';

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
  operatingAuthority: string | null;
  href: string | null;
  publicationNote: string | null;
  whyMatched: string;
  complaintsNote: string | null;
  sourceLastChecked?: string | null;
  officialAsOf?: string | null;
  officialVerificationUrl?: string;
  nameMatchEvidence?: NameEvidence;
  selectionHref?: string;
  matchEvidence?: { method: 'exact_identifier'; fields: Array<{ field: 'usdot_number' | 'mc_number'; requested: string; returned: string }>; normalization: string[] };
};

export type AskCountRow = { label: string; value: number; grain: string };

export type MoveAskResult = {
  nameSearch?: { requested: string; candidateLimit: number; retrievalLimit: number; truncated: boolean; selected: boolean; countMeaning: string };
  contract: typeof MOVE_ASK_CONTRACT;
  queryText: string;
  parsed: ParsedMoveAsk;
  resultType: string;
  terminalState?: 'FOUND' | 'NO_MATCH' | 'NEEDS_CLARIFICATION' | 'INVALID_INPUT' | 'UNAVAILABLE' | 'UNSUPPORTED';
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
  coverageState: 'KNOWN' | 'UNKNOWN' | 'PARTIAL' | 'NOT_ACQUIRED' | 'REQUEST_ONLY' | 'UNSUPPORTED';
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

function admin() {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();
  if (!url || !key) throw new Error('Supabase admin client requires SUPABASE_SERVICE_ROLE_KEY (server-only).');
  const client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(12_000) }) },
  });
  return client;
}

function db(): AdminDb {
  const client = admin();
  return { from: (table: string) => ({ select: (columns: string, opts?: { count?: 'exact'; head?: boolean }) =>
    client.from(table).select(columns, opts).throwOnError() as unknown as Chain }) };

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
  sourceDba?: string | null;
  authority_status?: string | null;
  fmcsa_complaints?: number | null;
  complaints_last_12m?: number | null;
  fmcsa_raw?: Record<string, unknown> | null;
};

const COMPANY_COLS =
  'id, name, slug, usdot_number, mc_number, entity_type, headquarters, authority_active, fmcsa_last_checked, publication_state, fmcsa_legal_name';

function roleTypes(role?: string, includeDual = true): string[] {
  if (role === 'carrier_broker') return [...DIRECTORY_DUAL_ENTITY_TYPES];
  if (role === 'broker') {
    return includeDual
      ? [...DIRECTORY_BROKER_ENTITY_TYPES, ...DIRECTORY_DUAL_ENTITY_TYPES]
      : [...DIRECTORY_BROKER_ENTITY_TYPES];
  }
  return includeDual
    ? [...DIRECTORY_CARRIER_ENTITY_TYPES, ...DIRECTORY_DUAL_ENTITY_TYPES]
    : [...DIRECTORY_CARRIER_ENTITY_TYPES];
}

function hqPattern(state: string): string { return `%, ${state}%`; }

function operatingAuthorityFromRow(row: CompanyRow): string | null {
  if (row.fmcsa_raw && typeof row.fmcsa_raw === 'object') {
    const nested =
      (row.fmcsa_raw.carrier as Record<string, unknown> | undefined) ??
      ((row.fmcsa_raw.content as Record<string, unknown> | undefined)?.carrier as Record<string, unknown> | undefined) ??
      row.fmcsa_raw;
    const formatted = formatAuthorityStatus(nested) ?? formatAuthorityStatus(row.fmcsa_raw);
    if (formatted) return formatted;
  }
  if (row.authority_active === true) return 'Current authority recorded (boolean flag only; Common/Contract/Broker text not stored on this row)';
  if (row.authority_active === false) return 'Authority not current in stored evidence';
  return null;
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
    dba: row.sourceDba ?? null,
    usdot: row.usdot_number,
    mc: row.mc_number,
    role,
    fmcsaStatus: authorityLabel(company),
    headquarters: row.headquarters,
    floridaIm: null,
    operatingAuthority: operatingAuthorityFromRow(row),
    href: indexable && row.slug ? `/companies/${row.slug}` : null,
    publicationNote: indexable
      ? null
      : 'Research identity — this row is not currently an indexable public profile.',
    whyMatched: why,
    complaintsNote: null,
    sourceLastChecked: row.fmcsa_last_checked ?? null,
    officialAsOf: null,
    ...extra,
  };
}

export async function executeMoveAsk(raw: string, page = 1): Promise<MoveAskResult> {
  return executeMoveRequest({ q: raw, page });
}

export async function executeMoveRequest(input: MoveRequestInput, options?: { directory?: typeof import('../specialist-execution/execute').executeMoveSpecialist }): Promise<MoveAskResult> {
  const started = Date.now();
  let parsed: ParsedMoveAsk;
  try { parsed = planMoveRequest(input); }
  catch (error) {
    if (!(error instanceof MoveRequestError)) throw error;
    parsed = { raw: typeof input.q === 'string' ? input.q : '', query: { mode: 'fail_closed', includeDualRole: true, page: 1, failReason: error.message }, interpretation: [{ label: 'Request', value: 'Input needs correction' }] };
    return { ...emptyBase(parsed, started), terminalState: 'INVALID_INPUT' };
  }
  const q = parsed.query;
  if (q.mode === 'fail_closed' || q.mode === 'definition') return emptyBase(parsed, started);
  try {
    if (q.executor === 'directory' && q.directoryRequest) {
      const executor = options?.directory ?? (await import('../specialist-execution/execute')).executeMoveSpecialist;
      const result = await executor(q.directoryRequest);
      if (['BACKEND_UNAVAILABLE', 'TIMEOUT'].includes(result.resultType)) throw new Error('Source unavailable');
      const { moveAskResultFromSpecialist } = await import('./specialist-adapter');
      return moveAskResultFromSpecialist(result, parsed);
    }
    if (!isSupabaseAdminConfigured()) throw new Error('Source unavailable');
    if ((q.mode === 'identifier' || q.mode === 'evidence') && q.identifier) return await lookupIdentifier(parsed, started);
    if (q.mode === 'count' || q.mode === 'aggregate' || q.mode === 'comparison') return await counts(parsed, started);
    if (q.floridaIm) return await listFloridaIm(parsed, started);
    if (q.overlapFmcsaFdacs) return await listOverlap(parsed, started);
    if (q.nameQuery) return await lookupName(parsed, started);
    return await listCompanies(parsed, started);
  } catch {
    // Never log the request, raw source response or credentials.
    console.warn('move_research_source_unavailable', { executor: q.executor, mode: q.mode });
    return { ...emptyBase(parsed, started), terminalState: 'UNAVAILABLE', coverageState: 'UNKNOWN', limitations: ['The research source could not be checked. Try again; no zero-result conclusion was made.', ...LIMITATIONS] };
  }
}

async function lookupName(parsed: ParsedMoveAsk, started: number): Promise<MoveAskResult> {
  const q = parsed.query, name = q.nameQuery!;
  let ids: string[], capped = false;
  if (q.selectedCompany) ids = [q.selectedCompany];
  else {
    // Existing read-only, publication-filtered RPC. Names are JSON values, never filter grammar.
    // Its 80-character bound is checked before execution; no silent truncation.
    const terms = [...new Set([name, distinctiveTokens(name).join(' ')])];
    const batches = await Promise.all(terms.map(async term => {
      const { data, error } = await admin().rpc('directory_search_suggestions', { p_query: term, p_limit: NAME_RETRIEVAL_LIMIT });
      if (error || !Array.isArray(data)) throw new Error('Name candidate source unavailable');
      return data;
    }));
    capped = batches[batches.length - 1]!.length >= NAME_RETRIEVAL_LIMIT;
    ids = [...new Set(batches.flat().map((r: {company_id?: unknown}) => {
      if (typeof r.company_id !== 'string' || !r.company_id) throw new Error('Invalid candidate reference');
      return r.company_id;
    }))];
  }
  let rows: CompanyRow[] = [];
  if (ids.length) {
    const response = await db().from('companies').select(`${COMPANY_COLS},sourceDba:fmcsa_raw->>dbaName`).or(VISIBLE_OR).in('id', ids).limit(NAME_RETRIEVAL_LIMIT * 2);
    if (!Array.isArray(response.data)) throw new Error('Name identity source unavailable');
    rows = response.data as CompanyRow[];
  }
  const candidates = new Map<string, {row: CompanyRow; evidence: NameEvidence}>();
  for (const row of rows) {
    if (!ids.includes(row.id) || !row.name || ['REVIEW_REQUIRED','INACTIVE','INGESTED','CLASSIFIED'].includes(row.publication_state ?? '')) throw new Error('Name publication invariant failed');
    const evidence = matchSourceName(name, row);
    if (!evidence) continue; // RPC recall is deliberately broader than a justified name match.
    const prior = candidates.get(row.id);
    if (prior && JSON.stringify(prior.row) !== JSON.stringify(row)) throw new Error('Conflicting identity observations');
    candidates.set(row.id, {row, evidence});
  }
  const ordered = [...candidates.values()].sort((a,b) => a.evidence.rank-b.evidence.rank || a.row.name.localeCompare(b.row.name) || a.row.id.localeCompare(b.row.id));
  const truncated = capped || ordered.length > NAME_CANDIDATE_LIMIT;
  const cards = ordered.slice(0,NAME_CANDIDATE_LIMIT).map(({row,evidence}) => {
    const params = new URLSearchParams({q: parsed.raw, company: row.id});
    for (const [key,value] of Object.entries(q.overrides ?? {})) if (value) params.set(key,value);
    const fieldLabel = evidence.field === 'name' ? 'directory display name' : evidence.field === 'fmcsa_legal_name' ? 'stored FMCSA legal name' : 'stored FMCSA DBA';
    const why = `${evidence.matchType === 'distinctive_token_candidate' ? 'Distinctive name-token candidate' : evidence.matchType === 'normalized_exact_name' ? 'Normalized source-name match' : 'Source-name match'}: ${fieldLabel} records "${evidence.returned}" for this identity. Requested name: "${name}". Name relevance is not identifier equality, proof of affiliation, license approval or a live regulator check.`;
    const dot = normalizeStoredIdentifier(row.usdot_number, 'usdot'), mc = normalizeStoredIdentifier(row.mc_number, 'mc');
    const id = dot ? {type:'DOT' as const,value:dot,display:`USDOT ${dot}`} : mc ? {type:'MC' as const,value:mc,display:`MC ${mc}`} : null;
    return cardFromCompany(row, why, {nameMatchEvidence:evidence, selectionHref:q.selectedCompany ? undefined : `/ask?${params}`, officialVerificationUrl:id ? buildSaferLookupUrl(id) : undefined});
  });
  if (cards.length === 1 && !truncated) {
    const row = ordered[0]!.row;
    for (const c of q.constraints ?? []) {
      if (!['state','role','authority'].includes(c.field)) continue;
      const known = c.field === 'state' ? Boolean(extractStateCodeFromHeadquarters(row.headquarters ?? '')) : c.field === 'authority' ? typeof row.authority_active === 'boolean' : researchRole({entityType:row.entity_type,services:[]}) !== 'Unknown';
      const matches = c.field === 'state' ? extractStateCodeFromHeadquarters(row.headquarters ?? '') === c.value : c.field === 'authority' ? row.authority_active === (c.value === 'current') : roleTypes(c.value,true).some(type => type.toLowerCase() === (row.entity_type ?? '').toLowerCase());
      c.outcome = !known ? 'NEEDS_CLARIFICATION' : matches ? 'APPLIED' : 'CONFLICT';
      c.detail = !known ? 'The stored identity has no evidence for this condition.' : matches ? 'The stored public identity supports this condition; no service territory or license approval is inferred.' : 'The name identity remains visible, but its stored evidence does not agree with this filter.';
    }
  }
  for (const c of q.constraints ?? []) { const line = parsed.interpretation.find(v => v.label === c.field); if (line) line.value = `${c.value} - ${c.outcome.replaceAll('_', ' ').toLowerCase()}`; }
  const result = finish(parsed,cards,cards.length,started,'Source-backed name candidate identities; distinct public record keys, not a national directory count');
  result.nameSearch = {requested:name,candidateLimit:NAME_CANDIDATE_LIMIT,retrievalLimit:NAME_RETRIEVAL_LIMIT * 2,truncated,selected:Boolean(q.selectedCompany),countMeaning:'Displayed source-backed candidate identities; not an exhaustive population estimate'};
  result.terminalState = truncated || cards.length > 1 || (q.selectedCompany && !cards.length) ? 'NEEDS_CLARIFICATION' : cards.length ? 'FOUND' : 'NO_MATCH';
  result.counts = cards.length ? [{label:'Displayed name candidates',value:cards.length,grain:result.provenance.grain}] : [];
  result.pagination = {page:1,pageSize:NAME_CANDIDATE_LIMIT,total:cards.length,hasMore:false};
  result.provenance.geographyMeaning = 'Name identity research; requested location conditions are evaluated separately, never service territory.';
  result.limitations = [
    ...(truncated ? ['Candidate retrieval reached its bound. Refine the company name or enter a labeled USDOT/MC; uniqueness and exhaustive totals are not established.'] : []),
    ...(q.selectedCompany && !cards.length ? ['The selected public record no longer establishes this name match. Refine the name or choose a current candidate.'] : []),
    'Search uses the existing published legal/display-name index. A stored FMCSA DBA can corroborate a retrieved candidate; an alias absent from those searchable names may not be discoverable. No independent alias directory is claimed.',
    'Case, whitespace, punctuation and ampersand presentation may normalize. Distinctive-token matches are relaxed candidates; legal suffixes and names are not identity merges.',
    ...result.limitations];
  return result;
}

async function lookupIdentifier(parsed: ParsedMoveAsk, started: number): Promise<MoveAskResult> {
  const ids = parsed.query.identifiers ?? [{ ...parsed.query.identifier!, normalization: [] }];
  let query = db().from('companies').select(`${COMPANY_COLS}, fmcsa_raw${parsed.query.evidenceFamily === 'complaint' ? ', fmcsa_complaints, complaints_last_12m' : ''}`, { count: 'exact' }).or(VISIBLE_OR);
  for (const id of ids) query = query.in(id.type === 'usdot' ? 'usdot_number' : 'mc_number', identifierVariants(id));
  const { data, count } = await query.order('name', { ascending: true }).order('id', { ascending: true }).range((parsed.query.page - 1) * MOVE_ASK_PAGE_SIZE, parsed.query.page * MOVE_ASK_PAGE_SIZE);
  const rows = [...new Map(((data ?? []) as CompanyRow[]).map((row) => [row.id, row])).values()];
  const results = rows.slice(0, MOVE_ASK_PAGE_SIZE).map((row) => {
    const fields = ids.map((id) => {
      const field = id.type === 'usdot' ? 'usdot_number' as const : 'mc_number' as const;
      const returned = normalizeStoredIdentifier(row[field], id.type);
      if (returned !== id.value) throw new Error('Exact identity invariant failed');
      return { field, requested: id.value, returned };
    });
    const labels = fields.map((f) => `${f.field === 'usdot_number' ? 'USDOT' : 'MC'} ${f.returned}`).join(' and ');
    const id = ids[0]!;
    const why = `Exact identifier match: the published directory identity records ${labels}. ${ids.length > 1 ? 'Both identifiers are recorded on this same identity. ' : ''}Identifier equality does not establish service territory, authority eligibility or a recommendation.`;
    const complaint = row.fmcsa_complaints ?? row.complaints_last_12m;
    return cardFromCompany(row, why, {
      matchEvidence: { method: 'exact_identifier', fields, normalization: ids.flatMap((v) => v.normalization) },
      officialVerificationUrl: buildSaferLookupUrl({ type: id.type === 'usdot' ? 'DOT' : 'MC', value: id.value, display: labels }),
      complaintsNote: parsed.query.evidenceFamily === 'complaint' ? complaint == null ? 'No stored complaint observation is available. Missing is not no complaints or a clean record.' : `Stored complaint observations: ${complaint}. These are not findings of wrongdoing.` : null,
    });
  });
  for (const constraint of parsed.query.constraints ?? []) {
    if (!['role', 'authority', 'recorded headquarters state'].includes(constraint.field) || !results.length) continue;
    const satisfied = rows.every((row) => constraint.field === 'authority' ? row.authority_active === (constraint.value === 'current') : constraint.field === 'recorded headquarters state' ? extractStateCodeFromHeadquarters(row.headquarters ?? '') === constraint.value : roleTypes(constraint.value, true).includes(row.entity_type ?? ''));
    constraint.outcome = satisfied ? 'APPLIED' : 'CONFLICT';
    constraint.detail = satisfied ? 'The stored identity evidence satisfies this criterion.' : 'The exact identity was resolved, but its stored evidence does not establish this criterion.';
  }
  for (const c of parsed.query.constraints ?? []) { const line = parsed.interpretation.find((v) => v.label === c.field); if (line) line.value = `${c.value}: ${c.outcome.replaceAll('_', ' ').toLowerCase()}`; }
  const result = finish(parsed, results, parsed.query.page > 1 || (count ?? 0) > MOVE_ASK_PAGE_SIZE + 1 ? count ?? rows.length : rows.length, started, 'Exact published identity (additional context is not a service-area match)');
  if (!results.length && ids.length === 2) {
    result.terminalState = 'NEEDS_CLARIFICATION';
    result.limitations = ['No published identity confirms this USDOT/MC pair. Check each number; they were not merged.', ...result.limitations];
  } else result.terminalState = rows.length > 1 ? 'NEEDS_CLARIFICATION' : rows.length ? 'FOUND' : 'NO_MATCH';
  return result;
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
  const carrierOnly = await countTypes([...DIRECTORY_CARRIER_ENTITY_TYPES], q.jurisdiction?.state, q.authorityCurrent === true ? true : q.authorityCurrent === 'not_current' ? false : undefined);
  const brokerOnly = await countTypes([...DIRECTORY_BROKER_ENTITY_TYPES], q.jurisdiction?.state, q.authorityCurrent === true ? true : q.authorityCurrent === 'not_current' ? false : undefined);
  const dual = await countTypes([...DIRECTORY_DUAL_ENTITY_TYPES], q.jurisdiction?.state, q.authorityCurrent === true ? true : q.authorityCurrent === 'not_current' ? false : undefined);
  if (q.role === 'carrier_broker') return finish(parsed, [], dual, started, 'dual-role published profiles', [{ label: 'Carrier/Broker profiles', value: dual, grain: 'one profile with both source roles' }]);
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
  let query = db().from('companies').select(state ? 'id, headquarters' : 'id', { count: 'exact', head: !state }).or(VISIBLE_OR).in('entity_type', types);
  if (state) query = query.ilike('headquarters', hqPattern(state)).order('id', { ascending: true }).limit(1000);
  if (current !== undefined) query = query.eq('authority_active', current);
  const { data, count } = await query;
  if (!state) return count ?? 0;
  const rows = await collectHeadquartersRows(query, data, count);
  return new Set(rows.filter((row) => extractStateCodeFromHeadquarters(row.headquarters ?? '') === state).map((row) => row.id)).size;
}

/** Supabase caps one response at 1,000 rows. Preserve larger supported state
 * cohorts with bounded stable pages, then apply the exact recorded-state rule. */
async function collectHeadquartersRows(query: Chain, data: unknown[] | null, count: number | null): Promise<CompanyRow[]> {
  if (count === null || count > 10_000) throw new Error('Recorded-headquarters candidate bound exceeded');
  const rows = [...(data ?? [])] as CompanyRow[];
  for (let offset = 1000; offset < count; offset += 1000) {
    const page = await query.range(offset, Math.min(offset + 999, count - 1));
    rows.push(...((page.data ?? []) as CompanyRow[]));
  }
  if (rows.length !== count) throw new Error('Incomplete recorded-headquarters source response');
  return [...new Map(rows.map((row) => [row.id, row])).values()];
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
    .order('name', { ascending: true })
    .order('usdot_number', { ascending: true })
    .order('id', { ascending: true })
    .range(from, to);
  if (q.role) query = query.in('entity_type', types);
  if (q.jurisdiction?.state) query = query.ilike('headquarters', hqPattern(q.jurisdiction.state)).range(0, 999);
  if (q.authorityCurrent === true) query = query.eq('authority_active', true);
  if (q.authorityCurrent === 'not_current') query = query.eq('authority_active', false);
  const { data, count } = await query;
  const sourceRows = q.jurisdiction?.state ? await collectHeadquartersRows(query, data, count) : (data ?? []) as CompanyRow[];
  const candidates = sourceRows.filter((row) => !q.jurisdiction?.state || extractStateCodeFromHeadquarters(row.headquarters ?? '') === q.jurisdiction.state);
  const rows = q.jurisdiction?.state ? candidates.slice(from, to + 1) : candidates;
  const geo = q.jurisdiction
    ? `lists ${q.jurisdiction.state} as its recorded company address / headquarters state (not service territory)`
    : 'is in the current indexed FMCSA directory extract';
  const results = rows.map((row) => {
    const role = researchRole({ entityType: row.entity_type, services: [] });
    return cardFromCompany(
      row,
      `This company matches because the published directory record classifies it as a ${role.toLowerCase()} and ${geo}. This is not a recommendation.`,
    );
  });
  return finish(
    parsed,
    results,
    q.jurisdiction?.state ? candidates.length : count ?? results.length,
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
    operatingAuthority: null,
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
    terminalState: parsed.query.mode === 'fail_closed'
      ? parsed.query.constraints?.some((c) => c.outcome === 'UNSUPPORTED') ? 'UNSUPPORTED' : 'NEEDS_CLARIFICATION'
      : parsed.query.mode === 'definition' ? 'FOUND' : 'NO_MATCH',
    results: [],
    counts: [],
    pagination: { page: parsed.query.page, pageSize: MOVE_ASK_PAGE_SIZE, total: 0, hasMore: false },
    provenance: {
      sourceFamily: 'FMCSA directory + FDACS IM where used',
      geographyMeaning: parsed.query.jurisdiction
        ? `${parsed.query.jurisdiction.meaning} = ${parsed.query.jurisdiction.state}`
        : 'Not geography-filtered',
      officialAsOf: 'Official effective time is not supplied by this extract.',
      grain: parsed.query.role ?? parsed.query.mode,
      exclusions: LIMITATIONS,
    },
    limitations: LIMITATIONS,
    elapsedMs: Date.now() - started,
    coverageState: parsed.query.coverageState ?? (parsed.query.mode === 'fail_closed' ? 'UNSUPPORTED' : 'KNOWN'),
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
    terminalState: results.length || total ? 'FOUND' : 'NO_MATCH',
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
        : 'Published MoveTrustHub directory identities and stored FMCSA evidence',
      geographyMeaning: parsed.query.jurisdiction
        ? `${parsed.query.jurisdiction.meaning} = ${parsed.query.jurisdiction.state}`
        : 'Not geography-filtered',
      officialAsOf: 'Official effective time is not supplied by this extract. Stored source check times are shown separately.',
      grain,
      exclusions: LIMITATIONS,
    },
    limitations: LIMITATIONS,
    elapsedMs: Date.now() - started,
    coverageState: parsed.query.coverageState ?? (parsed.query.evidenceFamily === 'complaint' ? 'PARTIAL' : 'KNOWN'),
  };
}

export function publicAskPayload(result: MoveAskResult) {
  return {
    contract: result.contract,
    terminalState: result.terminalState,
    nameSearch: result.nameSearch,
    coverageState: result.coverageState,
    capability: { federatedExecution: 'execute', askStatus: 'live' },
    interpretation: result.parsed.interpretation,
    query: {
      ...(result.parsed.query.directoryRequest ? { specialistContract: result.parsed.query.directoryRequest.contract } : {}),
      mode: result.parsed.query.mode,
      nameQuery: result.parsed.query.nameQuery,
      nameRequest: result.parsed.query.nameRequest,
      selectedCompany: result.parsed.query.selectedCompany,
      role: result.parsed.query.role,
      authorityCurrent: result.parsed.query.authorityCurrent,
      constraints: result.parsed.query.constraints,
      identifiers: result.parsed.query.identifiers,
      executor: result.parsed.query.executor,
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
      entityId: row.entityId,
      legalName: row.legalName,
      dba: row.dba,
      nameMatchEvidence: row.nameMatchEvidence,
      selectionHref: row.selectionHref,
      usdot: row.usdot,
      mc: row.mc,
      role: row.role,
      fmcsaStatus: row.fmcsaStatus,
      headquarters: row.headquarters,
      floridaIm: row.floridaIm,
      operatingAuthority: row.operatingAuthority,
      href: row.href,
      publicationNote: row.publicationNote,
      whyMatched: row.whyMatched,
      complaintsNote: row.complaintsNote,
      sourceLastChecked: row.sourceLastChecked,
      officialAsOf: row.officialAsOf,
      officialVerificationUrl: row.officialVerificationUrl,
      matchEvidence: row.matchEvidence,
    })),
    counts: result.counts,
    pagination: result.pagination,
    provenance: result.provenance,
    limitations: result.limitations,
    elapsedMs: result.elapsedMs,
    definition: result.parsed.query.definitionId ? ASK_DEFINITIONS[result.parsed.query.definitionId] : undefined,
  };
}
