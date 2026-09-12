import { MOVE_ASK_MAX_QUERY, MOVE_ASK_PAGE_SIZE, type MoveConstraint, type ParsedMoveAsk } from './contract';
import { interpretMoveAskQuery } from './interpret';
import { directoryStateName, parseDirectoryResearchQuery } from '../directory/parse-directory-research-query';
import { MOVE_SPECIALIST_EXECUTION_CONTRACT } from '../specialist-execution/contract';
import { completeJourney, journeyConsent, parseJourney, resolveMovePlace } from './journey';
import { parseMoveIdentifiers } from './identifier';

export type MoveRequestInput = { q?: unknown; page?: unknown; role?: unknown; state?: unknown; authority?: unknown; company?: unknown; originState?: unknown; destinationState?: unknown; location?: unknown; mover?: unknown; research?: unknown; consent?: unknown };
export class MoveRequestError extends Error {}

export function validateMoveRequest(input: MoveRequestInput) {
  if (typeof input.q !== 'string' || !input.q.trim()) throw new MoveRequestError('Enter a mover research question or a labelled USDOT/MC number.');
  const q = input.q.trim();
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(q)) throw new MoveRequestError('Remove unsupported control characters from the request.');
  if (q.length > MOVE_ASK_MAX_QUERY) throw new MoveRequestError(`Use no more than ${MOVE_ASK_MAX_QUERY} characters. The request was not shortened or executed.`);
  if (input.company !== undefined && (typeof input.company !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}$/.test(input.company))) throw new MoveRequestError('Choose a valid public company reference.');
  const value = input.page ?? '1';
  if (!/^\d+$/.test(String(value)) || !Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 200) throw new MoveRequestError('Page must be a whole number from 1 to 200.');
  for (const [field, allowed] of Object.entries({ role: ['carrier', 'broker', 'carrier_broker'], authority: ['current', 'not_current'] })) {
    const item = input[field as 'role' | 'authority'];
    if (item !== undefined && item !== '' && (typeof item !== 'string' || !allowed.includes(item))) throw new MoveRequestError(`Choose a supported ${field} filter.`);
  }
  if (input.state !== undefined && input.state !== '' && (typeof input.state !== 'string' || !/^[A-Z]{2}$/.test(input.state) || !directoryStateName(input.state))) throw new MoveRequestError('Choose a supported recorded state filter.');
  return { q, company: input.company as string | undefined, page: Number(value), role: input.role as string | undefined, state: input.state as string | undefined, authority: input.authority as string | undefined };
}

export function inputFromSearchParams(params: URLSearchParams): MoveRequestInput {
  const input: MoveRequestInput = {};
  for (const key of ['q', 'page', 'role', 'state', 'authority', 'company', 'originState', 'destinationState', 'location', 'mover', 'research', 'consent'] as const) {
    const values = params.getAll(key);
    input[key] = values.length > 1 ? values : values[0];
  }
  return input;
}

/** The only selection policy for homepage submissions, native /ask and /api/ask. */
export function planMoveRequest(raw: MoveRequestInput): ParsedMoveAsk {
  const input = validateMoveRequest(raw);
  const j = parseJourney(input.q);
  const choices: Record<string, string | undefined> = {};
  for (const key of ['originState', 'destinationState', 'location', 'mover', 'research', 'consent'] as const) {
    const value = raw[key];
    if (value === undefined || value === '') continue;
    if (typeof value !== 'string' || value.length > 80 || /[\x00-\x1f\x7f<>]/.test(value)) throw new MoveRequestError('Choose a valid, bounded journey refinement.');
    choices[key] = value.trim();
  }
  if (!j) {
    if (Object.keys(choices).length) throw new MoveRequestError('Journey choices do not apply to this question. Submit the edited question again.');
    return planLegacyMoveRequest(raw);
  }
  const statedAuthority = /\b(?:not current|inactive)\s+(?:operating\s+)?authority\b/i.test(input.q) ? 'not_current'
    : /\b(?:current|active)\s+(?:(?:operating\s+)?authority|(?:interstate\s+)?(?:household[- ]goods\s+)?(?:carriers?|brokers?|movers?))\b/i.test(input.q) ? 'current' : undefined;
  if (statedAuthority && input.authority && statedAuthority !== input.authority) throw new MoveRequestError('The authority filter conflicts with the original research condition.');
  input.authority = input.authority || statedAuthority;
  for (const key of ['origin', 'destination'] as const) {
    const state = choices[`${key}State`];
    if (!state) continue;
    if (!/^[A-Z]{2}$/.test(state) || !directoryStateName(state) || !j[key] || j[key]!.state && j[key]!.state !== state) throw new MoveRequestError(`The ${key} state choice conflicts with this request.`);
    if (!j[key]!.state) j[key] = resolveMovePlace(`${j[key]!.raw} ${state}`);
    if (j[key]!.resolution !== 'EXACT') throw new MoveRequestError(`Edit the ${key} place; this state choice does not resolve the complete endpoint.`);
  }
  if (choices.location) {
    if (j.origin || j.destination || j.locality?.state) throw new MoveRequestError('Edit the existing place rather than replacing it with a location choice.');
    j.locality = resolveMovePlace(choices.location);
  }
  if (input.role) {
    if (j.role && j.role !== input.role) throw new MoveRequestError('The role filter conflicts with the requested journey role.');
    j.role = input.role as typeof j.role;
  }
  completeJourney(j);
  const constraints: MoveConstraint[] = [];
  if (/\b(?:how many|count|best|cheapest|quote|price)\b/i.test(input.q)) {
    constraints.push({field:'Requested route count, ranking or price',value:'Not established',outcome:'UNSUPPORTED',detail:'This research plan does not establish route-specific populations, rankings, prices or availability.'});
    j.summary += ' A route-specific count, ranking or price cannot be established from these records.';
  }
  for (const [key, place] of Object.entries({ origin: j.origin, destination: j.destination, locality: j.locality })) if (place) constraints.push({ field: key, value: place.raw, outcome: place.resolution !== 'EXACT' ? 'NEEDS_CLARIFICATION' : key === 'locality' ? 'UNSUPPORTED' : 'APPLIED', detail: 'Preserved as a journey endpoint or requested locality, not a headquarters predicate or proof of service.' });
  constraints.push({ field: 'route service / availability', value: 'Not established', outcome: 'UNSUPPORTED', detail: 'Company identity, headquarters and authority do not prove this route is served or available.' });
  if (j.role) constraints.push({ field: 'requested role', value: j.role, outcome: 'APPLIED', detail: 'Preserved for identity/authority research; a broker is not the transporting carrier.' });
  if (input.state || input.authority) constraints.push({ field: 'additional filters', value: [input.state, input.authority].filter(Boolean).join(', '), outcome: 'NEEDS_CLARIFICATION', detail: 'Recorded-state/current-authority filters do not establish journey availability. They are applied only to an explicitly selected identity or recorded-state cohort.' });
  const ids = parseMoveIdentifiers(input.q);
  const name = choices.mover || j.companyName;
  let parsed: ParsedMoveAsk;
  if (ids.identifiers.length || ids.error || /\b(?:USDOT|MC)\b/i.test(input.q)) {
    // Original full text is retained for exact parser validation, including malformed IDs.
    parsed = planLegacyMoveRequest(ids.error ? raw : { ...raw, role: input.role ?? j.role, q: ids.identifiers.map(id=>`${id.type.toUpperCase()} ${id.value}`).join(' ') || input.q });
    if (!input.state) {
      delete parsed.query.jurisdiction; // Endpoints must not become HQ filters.
      parsed.query.constraints = parsed.query.constraints?.filter(c => c.field !== 'recorded headquarters state');
    }
    constraints.push({field:'Original research context',value:input.q,outcome:'NEEDS_CLARIFICATION',detail:'Exact identifiers establish identity only. Additional name, route and service conditions are not independently confirmed.'});
  } else if (name) {
    if (/["\u201c\u201d]/.test(name)) throw new MoveRequestError('Enter the company name without enclosing quotes.');
    parsed = planLegacyMoveRequest({ ...input, role: input.role ?? j.role, q: `Research "${name}"` });
    if (!parsed.query.nameQuery) throw new MoveRequestError('Enter a distinctive company name or labeled identifier.');
    parsed.query.nameRequest!.condition = 'Requested route service and availability remain unestablished.';
  } else {
    if (input.company) throw new MoveRequestError('Company selection requires a name candidate from this request.');
    parsed = { raw: input.q, query: { mode: j.task === 'UNSUPPORTED_LOCALITY' ? 'fail_closed' : 'definition', failReason: j.task === 'UNSUPPORTED_LOCALITY' ? j.summary : undefined, definitionId: 'journey_research', includeDualRole: true, page: 1, executor: 'records' }, interpretation: [] };
  }
  if (choices.research || choices.consent) {
    if (choices.research !== 'recorded_state' || choices.consent !== journeyConsent(input.q) || j.task !== 'UNSUPPORTED_LOCALITY' || !j.locality?.state || ids.identifiers.length || name || input.state && input.state !== j.locality.state) throw new MoveRequestError('This broadening choice does not match the current locality request.');
    j.outcome = 'USER_APPROVED_RELAXATION';
    j.executionGeography = { state: j.locality.state, meaning: 'recorded_headquarters_state' };
    j.summary = 'You selected broader recorded-state identity research. The original locality is retained; these records do not establish local service or availability.';
    parsed = planLegacyMoveRequest({ ...input, q: `Show ${j.moveType === 'auto_transport' ? 'auto transport companies' : j.role === 'broker' ? 'brokers' : j.role === 'carrier' ? 'carriers' : 'movers'} headquartered in ${directoryStateName(j.locality.state)}`, company: undefined });
    if (parsed.query.mode === 'fail_closed') {
      j.outcome = 'UNSUPPORTED'; j.executionGeography = undefined;
      j.summary = parsed.query.failReason ?? 'The broader operation cannot apply all requested filters. No cohort was executed.';
    }
    constraints.push({ field: 'execution geography', value: j.locality.state, outcome: 'USER_APPROVED_RELAXATION', detail: 'User selected broader recorded-headquarters state research. No local service predicate was applied.' });
  }
  parsed.raw = input.q;
  parsed.query.journey = j;
  parsed.query.journeyChoices = choices;
  parsed.query.role = j.role ?? parsed.query.role;
  parsed.query.constraints = [...(parsed.query.constraints ?? []), ...constraints];
  parsed.query.overrides = { role: input.role, state: input.state, authority: input.authority };
  parsed.interpretation = [
    ...(parsed.query.nameQuery ? [{ label: 'Company name', value: parsed.query.nameQuery }] : []),
    { label: 'Task', value: j.task.replaceAll('_', ' ') },
    ...Object.entries({ Origin: j.origin, Destination: j.destination, 'Requested locality': j.locality }).filter(([, p]) => p).map(([label, p]) => ({ label, value: `${p!.raw} (${p!.resolution.replaceAll('_', ' ').toLowerCase()})` })),
    { label: 'Move type', value: j.moveType.replaceAll('_', ' ') },
    { label: 'Role', value: j.role ?? 'Not specified; carrier and broker remain distinct' },
    { label: 'Research scope', value: j.authorityGrain.replaceAll('_', ' ') },
    { label: 'Availability', value: 'Not established' },
  ];
  return parsed;
}

function planLegacyMoveRequest(raw: MoveRequestInput): ParsedMoveAsk {
  const input = validateMoveRequest(raw);
  const parsed = interpretMoveAskQuery(input.q, input.page);
  const q = parsed.query;
  q.executor = 'records';
  const constraints: MoveConstraint[] = [];
  q.constraints = constraints;
  q.overrides = { role: input.role || undefined, state: input.state || undefined, authority: input.authority || undefined };
  if (input.company && !q.nameQuery) throw new MoveRequestError('Company selection requires the original name research question.');
  if (q.nameRequest) {
    q.selectedCompany = input.company;
    q.page = 1;
    const condition = q.nameRequest.condition;
    if (condition) constraints.push({ field: 'additional condition', value: condition, outcome: 'NEEDS_CLARIFICATION', detail: 'The name identity is researched independently. This location, licensing or other condition is not established by the name match.' });
    if (q.nameRequest.task === 'authority') constraints.push({ field: 'licensing / authority question', value: 'stored evidence', outcome: 'NEEDS_CLARIFICATION', detail: 'Stored federal role and authority evidence is shown for each identity. It does not establish current license approval or state intrastate authorization; verify the sourced identifier with the regulator.' });
    for (const [field, value] of Object.entries(q.overrides)) if (value) constraints.push({ field, value, outcome: 'NEEDS_CLARIFICATION', detail: 'Compared with the selected public identity where supported. The company name is never replaced by a cohort filter.' });
    parsed.interpretation.push(...constraints.map(c => ({label:c.field, value:c.value + ' - not established'})));
    return parsed;
  }
  const directory = parseDirectoryResearchQuery(input.q);
  if (/^[\d\s.,+-]+$/.test(input.q) && !q.identifier) {
    q.mode = 'fail_closed'; q.failReason = 'Numbers without a label are ambiguous. Specify USDOT or MC before searching.';
  }
  if (q.identifier) {
    if (!/\bcarrier or broker\b/i.test(input.q)) {
      const carrier = /\bcarriers?\b/i.test(input.q), broker = /\bbrokers?\b/i.test(input.q);
      if (carrier || broker) q.role = carrier && broker ? 'carrier_broker' : carrier ? 'carrier' : 'broker';
    }
    if (directory.geography) q.jurisdiction = { state: directory.geography.stateCode, meaning: 'recorded_headquarters_state' };
    const hq = input.q.match(/\b(?:headquartered|based|recorded address)\s+in\s+([a-z ]+?)[?.]?$/i)?.[1]?.trim();
    if (hq) { for (let n = 0; n < 26 * 26; n++) { const code = String.fromCharCode(65 + Math.floor(n / 26), 65 + n % 26); if (hq.toUpperCase() === code || directoryStateName(code)?.toLowerCase() === hq.toLowerCase()) q.jurisdiction = { state: code, meaning: 'recorded_headquarters_state' }; } }
    if (/\bwith (?:current|active) authority\b/i.test(input.q)) q.authorityCurrent = true;
    if (/\bwith (?:not current|inactive) authority\b/i.test(input.q)) q.authorityCurrent = 'not_current';
  }
  const explicitRole = /\b(carriers?|brokers?|hhg|household[- ]goods|interstate)\b/i.test(input.q);
  // Generic "mover" discovery has no implicit carrier-only requirement.
  if (directory.researchMode && !explicitRole && q.mode === 'entity') q.role = undefined;
  if (!q.jurisdiction && directory.geography && !q.identifier) q.jurisdiction = { state: directory.geography.stateCode, meaning: 'recorded_headquarters_state' };

  const stop = (reason: string, field: string, value: string, outcome: MoveConstraint['outcome']) => {
    constraints.push({ field, value, outcome, detail: reason });
    q.mode = 'fail_closed'; q.failReason = reason;
    q.alternatives = ['Find USDOT 3244649.', ...(q.jurisdiction ? [`Show movers headquartered in ${directoryStateName(q.jurisdiction.state) ?? q.jurisdiction.state}.`] : [])];
  };
  for (const [field, value] of Object.entries(q.overrides)) {
    if (!value) continue;
    if (q.mode === 'definition' || q.floridaIm || q.overlapFmcsaFdacs || q.mode === 'comparison' || q.nameQuery) {
      stop('These filters do not apply to this research operation. Remove the filters or ask a recorded-location cohort question.', field, value, 'UNSUPPORTED');
      continue;
    }
    const previous = field === 'role' ? (explicitRole ? q.role : undefined) : field === 'state' ? q.jurisdiction?.state : q.authorityCurrent === true ? 'current' : q.authorityCurrent === 'not_current' ? 'not_current' : undefined;
    if (previous && previous !== value) { stop(`The ${field} filter conflicts with the question. Choose one value before searching.`, field, value, 'CONFLICT'); continue; }
    if (field === 'role') q.role = value as 'carrier' | 'broker' | 'carrier_broker';
    if (field === 'state') q.jurisdiction = { state: value, meaning: 'recorded_headquarters_state' };
    if (field === 'authority') q.authorityCurrent = value === 'current' ? true : 'not_current';
  }

  if (q.jurisdiction?.state === 'NJ' && /\b(licen[sc]ed?|intrastate|pm|pw|pc|pmw)\b/i.test(input.q) && !q.identifier) {
    stop('New Jersey PM/PW/PC intrastate licensing requires its separate roster/search process. A headquarters cohort does not satisfy this condition.', 'NJ licensing', 'PM/PW/PC', 'UNSUPPORTED'); q.coverageState = 'REQUEST_ONLY';
  }
  if (new Set(directory.routeStates).size > 1 && q.mode !== 'comparison' && !q.identifier) stop('Multiple geographic restrictions need clarification. No single state was chosen on your behalf.', 'geography', directory.routeStates.join(', '), 'CONFLICT');
  const local = input.q.match(/\b(?:in|near|within)\s+([^?.]+)[?.]?$/i)?.[1]?.trim();
  const stateOnly = local && (local.length === 2 ? directoryStateName(local) : Array.from({ length: 26 * 26 }, (_, n) => directoryStateName(String.fromCharCode(65 + Math.floor(n / 26), 65 + n % 26))).find((s) => s?.toLowerCase() === local.toLowerCase()));
  if (local && !stateOnly && !q.floridaIm && !q.identifier && q.mode !== 'definition' && q.mode !== 'fail_closed') {
    stop(`The requested local geography (${local}) cannot be applied by this search. Choose an explicit recorded-headquarters state search instead; this request was not broadened.`, 'geography', local, 'UNSUPPORTED');
  }
  if (directory.geography?.city && !q.identifier && q.mode !== 'fail_closed') stop('City filtering is not supported by this research path. Choose a state search explicitly.', 'city', directory.geography.city, 'UNSUPPORTED');

  if (q.identifier) {
    q.page = input.page;
    let context = input.q;
    for (const id of [...(q.identifiers ?? [])].reverse()) context = context.slice(0, id.start) + ' ' + context.slice(id.end);
    context = context.replace(/\b(find|lookup|look up|show|verify|research|for|and|does|have|what|is|the|a|an|number|status|operating|authority|currently|active|regulatory|evidence|complaint|complaints|observations|role|carrier|or|broker|household-goods)\b/gi, ' ').replace(/[.,?!#]/g, '').replace(/\s+/g, ' ').trim();
    if (context) constraints.push({ field: 'additional context', value: context, outcome: 'NEEDS_CLARIFICATION', detail: 'Only the exact identity is resolved. This text is not verified as name, location, service territory or authority criteria.' });
    for (const id of q.identifiers ?? []) constraints.push({ field: id.type, value: id.value, outcome: 'APPLIED', detail: 'Exact stored identifier equality; no prefix or approximate fallback.' });
  }
  if (q.role) constraints.push({ field: 'role', value: q.role, outcome: q.identifier ? 'NEEDS_CLARIFICATION' : 'APPLIED', detail: q.identifier ? 'Compared with returned identity evidence; identity resolution does not establish role eligibility.' : 'Applied to source role classes; dual-role treatment is explicit.' });
  if (q.jurisdiction) constraints.push({ field: 'recorded headquarters state', value: q.jurisdiction.state, outcome: q.identifier ? 'NEEDS_CLARIFICATION' : 'APPLIED', detail: 'Recorded address only; does not establish service territory or NJ state licensing.' });
  if (q.authorityCurrent !== undefined && q.authorityCurrent !== 'any') constraints.push({ field: 'authority', value: q.authorityCurrent === true ? 'current' : 'not_current', outcome: q.identifier ? 'NEEDS_CLARIFICATION' : 'APPLIED', detail: 'Source authority_active must equal the requested boolean; unknown is excluded.' });
  if (q.mode === 'count') constraints.push({ field: 'operation', value: 'count', outcome: 'APPLIED', detail: 'Count the published role-specific cohort; do not return a general directory instead.' });

  // Directory cohorts preserve supported auto-transport/public recorded-location
  // discovery. Counts/authority, definitions, registrations and identities use
  // their specific record executors, with no response-dependent fallback.
  if (q.mode === 'entity' && directory.researchMode && !q.identifier && !q.floridaIm && !q.overlapFmcsaFdacs && !q.nameQuery && (!q.authorityCurrent || q.authorityCurrent === 'any')) {
    q.executor = 'directory';
    q.directoryRequest = { contract: MOVE_SPECIALIST_EXECUTION_CONTRACT, queryType: 'cohort', entityClass: directory.entityClass ?? 'mover',
      role: q.role === 'carrier_broker' ? 'Carrier/Broker' : q.role === 'carrier' ? 'Carrier' : q.role === 'broker' ? 'Broker' : undefined,
      geography: { intent: directory.locationIntent === 'SERVICE_TERRITORY' ? 'SERVICE_TERRITORY' : directory.locationIntent === 'ROUTE_OR_AVAILABILITY' ? 'ROUTE_AVAILABILITY' : 'RECORDED_HQ', stateCode: q.jurisdiction?.state }, page: input.page, limit: MOVE_ASK_PAGE_SIZE };
  }
  if (directory.entityClass === 'auto_transport' && (q.mode === 'count' || q.authorityCurrent === true || q.authorityCurrent === 'not_current')) stop('This auto-transport operation is not available with all requested filters. No household-goods cohort was substituted.', 'entity class', 'auto_transport', 'UNSUPPORTED');
  parsed.interpretation = parsed.interpretation.filter((line) => !['Entity', 'State', 'Status'].includes(line.label));
  for (const constraint of constraints) parsed.interpretation.push({ label: constraint.field, value: `${constraint.value} — ${constraint.outcome.replaceAll('_', ' ').toLowerCase()}` });
  if (q.executor === 'directory') parsed.interpretation.push({ label: 'Discovery', value: 'Published identities by recorded headquarters/address. Includes available directory and regulatory identities; not an NJ licensing roster.' });
  return parsed;
}
