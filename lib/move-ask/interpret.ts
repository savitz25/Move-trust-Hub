import { parseMoveIdentifiers } from './identifier';
import { ASK_DEFINITIONS, type MoveRegulatoryRole, type MoveResearchQuery, type ParsedMoveAsk } from './contract';

const STATE_NAMES: Record<string, string> = {
  florida: 'FL',
  'new jersey': 'NJ',
  california: 'CA',
  texas: 'TX',
  washington: 'WA',
  colorado: 'CO',
  virginia: 'VA',
  fl: 'FL',
  nj: 'NJ',
  ca: 'CA',
  tx: 'TX',
  wa: 'WA',
  co: 'CO',
  va: 'VA',
};

function detectState(q: string): string | undefined {
  if (/\bnj\b/i.test(q)) return 'NJ';
  for (const [name, code] of Object.entries(STATE_NAMES)) {
    if (name.length === 2) {
      if (new RegExp(`\\bin ${name}\\b`, 'i').test(q)) return code;
    } else if (new RegExp(`\\b${name}\\b`, 'i').test(q)) return code;
  }
  return undefined;
}

function detectRole(q: string): MoveRegulatoryRole | undefined {
  const broker = /\bbrokers?\b/i.test(q);
  const carrier = /\bcarriers?\b|\bmotor carriers?\b|\bhousehold[- ]?goods carriers?\b/i.test(q);
  if (broker && carrier) return 'carrier_broker';
  if (broker) return 'broker';
  if (carrier || /\binterstate movers?\b|\bhhg\b|\bhousehold[- ]?goods\b/i.test(q)) return 'carrier';
  return undefined;
}

function fail(reason: string, alternatives: string[]): MoveResearchQuery {
  return { mode: 'fail_closed', includeDualRole: true, page: 1, failReason: reason, alternatives };
}

function isRanking(q: string): boolean {
  return (
    /\b(best|safest|most trustworthy|least risky|top[- ]?rated|highest[- ]?rated|most trusted|recommended)\b/i.test(q) &&
    /\b(mover|carrier|broker|moving compan)/i.test(q)
  );
}

function isQuote(q: string): boolean {
  return /\b(cheapest|lowest price|quote|how much to move|price from .+ to)\b/i.test(q) &&
    /\b(mover|moving|florida|new york|ny)\b/i.test(q);
}

function isScam(q: string): boolean {
  return /\b(scam|fraud|fraudulent|trust score)\b/i.test(q) && /\b(mover|carrier|broker|usdot|mc)\b/i.test(q);
}

export function interpretMoveAskQuery(raw: string, page = 1): ParsedMoveAsk {
  const q = raw.trim().slice(0, 180);
  const lines: ParsedMoveAsk['interpretation'] = [];
  const push = (label: string, value: string) => lines.push({ label, value });
  const safePage = Math.max(1, Math.min(200, page));

  if (!q) {
    return {
      raw: q,
      query: fail('Enter a research question. MoveTrustHub organizes FMCSA and state moving records; it does not recommend a mover.', [
        'Find USDOT 3244649.',
        'Show current interstate household-goods carriers headquartered in Florida.',
      ]),
      interpretation: [{ label: 'Status', value: 'No question yet' }],
    };
  }

  if (raw.trim().length > 180 || /<\/?[a-z][^>]*>|\b(select|drop|delete|insert)\b.*\b(from|table|into)\b|\bor\s+1\s*=\s*1/i.test(raw)) {
    const query = fail('The question is too long or contains unsupported syntax. Enter a short mover research question or labeled identifier.', ['Find USDOT 3244649.']);
    push('Status', 'Input rejected safely');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bhow many moving companies\b|\btotal movers\b/i.test(q)) {
    const query = fail(
      'Counts require a regulatory grain. Carrier, broker, dual-role, and Florida IM registrations are not added into one “moving companies” total.',
      [
        'How many current household-goods carriers are indexed?',
        'How many brokers are indexed?',
        'How many active Florida Intrastate Mover registrations are indexed?',
      ],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  if (/\blicensed in virginia\b|\bvirginia mover(s)? licensed\b/i.test(q) && !/\b(mile|interstate|household goods|property carrier)\b/i.test(q)) {
    const query = fail(
      'Virginia has two state authority types. A Household Goods Carrier certificate is not a Property Carrier permit, and neither is FMCSA interstate authority. Distance matters.',
      [
        'Can this company move me more than 30 miles inside Virginia?',
        'Can this company move household goods 15 miles in Virginia?',
        'Can this Virginia mover take me to North Carolina?',
      ],
    );
    push('Capability', 'Virginia authority is distance-sensitive');
    return { raw: q, query, interpretation: lines };
  }

  if (/\b(80|more than 30|over 30|further than 30)\s*miles?\b/i.test(q) && /\bvirginia\b/i.test(q)) {
    const query = fail(
      'A Virginia move further than 30 miles from pickup is Household Goods Carrier certificate research. Property Carrier authority is not the matching grain for that distance.',
      ['What is a Virginia Household Goods Carrier certificate?'],
    );
    push('Virginia grain', 'Household Goods Carrier certificate');
    return { raw: q, query, interpretation: lines };
  }

  if (/\b(15|short|local|30 miles or less|less than 31)\b/i.test(q) && /\bvirginia\b/i.test(q) && /\b(move|mover|miles)\b/i.test(q)) {
    const query = fail(
      'A short local Virginia household-goods move may involve a Household Goods Carrier certificate or qualifying Property Carrier authority under current DMV rules. Those credentials are not the same.',
      ['What is the difference between a Virginia Household Goods certificate and a Property Carrier permit?'],
    );
    push('Virginia grain', 'HHG certificate or qualifying Property Carrier permit');
    return { raw: q, query, interpretation: lines };
  }

  if (/\b(north carolina|out of state|across (a )?state line|interstate)\b/i.test(q) && /\bvirginia\b/i.test(q)) {
    const query = fail(
      'Virginia DMV authority is not a substitute for FMCSA interstate operating authority. A USDOT number alone is not proof of active interstate household-goods authority.',
      ['What is interstate operating authority?', 'Find USDOT 3244649.'],
    );
    push('Jurisdiction', 'FMCSA interstate — not Virginia DMV');
    return { raw: q, query, interpretation: lines };
  }

  if (isRanking(q) || /\bwhich state has better movers\b/i.test(q)) {
    const query = fail(
      'MoveTrustHub does not rank movers and does not publish a TrustHub mover score. Research identity, authority, and registration instead.',
      [
        'Show current interstate household-goods carriers headquartered in Florida.',
        'Find USDOT 3244649.',
      ],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  if (isQuote(q)) {
    const query = fail(
      'MoveTrustHub Ask is not a quote engine. Regulatory records do not establish the price a company would charge.',
      ['Find USDOT 3244649.', 'What is the difference between a carrier and a broker?'],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  if (isScam(q)) {
    const query = fail(
      'MoveTrustHub does not score fraud or declare a company a scam. Missing evidence is not a clean record. Use labeled USDOT/MC identity and indexed authority or complaint observations without a TrustHub conclusion.',
      ['Find USDOT 3244649.', 'What does USDOT status mean?'],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bverify (the )?(company|mover).*(quote|estimate)\b/i.test(q)) {
    const query = fail('A quote does not establish regulatory identity. Find the USDOT and MC numbers on the estimate, then research those labeled identifiers.', ['Find USDOT 3244649.', 'What is a USDOT number?']);
    push('Research path', 'Use the quote to locate a labeled USDOT or MC identifier');
    return { raw: q, query, interpretation: lines };
  }

  if (/\b(moving|move|mover)\b.*\b(from|between)\b|\bmoving from\b/i.test(q)) {
    const query = fail('Origin and destination do not establish which mover serves a route. Research a company identifier or the authority relevant to an interstate move; recorded headquarters is not service territory.', ['What is interstate operating authority?', 'I want to verify the company that gave me a quote.']);
    query.coverageState = 'UNSUPPORTED';
    push('Capability', 'Service territory — unsupported');
    return { raw: q, query, interpretation: lines };
  }

  if (/\b(no complaints|without complaints)\b/i.test(q)) {
    const query = fail('Complaint coverage is partial. MoveTrustHub cannot turn missing complaint observations into “no complaints” or a clean record.', ['Show complaint observations for USDOT 3244649.']);
    query.coverageState = 'PARTIAL';
    push('Evidence', 'Complaint observations — partial coverage');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bcomplaints?\b/i.test(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail('Complaint observations are only shown when safely attributable to a specific labeled mover identity. They are partial evidence and are not findings of wrongdoing.', ['Show complaint observations for USDOT 3244649.']);
    query.coverageState = 'PARTIAL';
    push('Evidence', 'Complaint observations — specific identity required');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bunknown authority\b/i.test(q)) {
    const query = fail('Missing authority text is unknown, not a source-native authority status and not proof of inactivity. Research a labeled USDOT or MC identifier for the available record.', ['What does USDOT status mean?', 'Find USDOT 3244649.']);
    query.coverageState = 'PARTIAL';
    push('Authority', 'Unknown is not inactive');
    return { raw: q, query, interpretation: lines };
  }

  if (/\b(fdacs mb|mb registration)\b/i.test(q)) {
    const query = fail('Florida Moving Broker (MB) records are a distinct state-registration grain and are not served by the current IM list executor.', ['Show Florida intrastate movers registered with FDACS.', 'What is a moving broker?']);
    query.coverageState = 'PARTIAL';
    push('Coverage', 'Florida FDACS MB — partial');
    return { raw: q, query, interpretation: lines };
  }

  if (/\b(?:compare )?(carriers?|movers?) (?:and|vs\.?|versus) brokers?\b/i.test(q)) return definition(q, 'carrier_vs_broker');
  if (/\bcompare (federal|fmcsa).*(florida|fdacs|intrastate)|\bcompare (florida|fdacs|intrastate).*(federal|fmcsa)/i.test(q)) {
    const query = fail('Federal profiles and Florida intrastate registrations have different grains. They can be shown side-by-side or linked through a VERIFIED company_id, but they cannot be summed or treated as one authority universe.', ['Show companies with both FMCSA interstate authority and Florida Intrastate Mover registration.']);
    query.coverageState = 'PARTIAL';
    push('Comparison', 'Different source grains — no combined population');
    return { raw: q, query, interpretation: lines };
  }

  if (/\b(allowed|authorized|legal|licensed)\b.*\b(cross state|interstate)|\bknow if .* authorized\b/i.test(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail('Interstate authority must be checked against a specific labeled USDOT or MC identity. A company name or route alone cannot establish authority.', ['What is interstate operating authority?', 'Find USDOT 3244649.']);
    query.coverageState = 'PARTIAL';
    push('Authority', 'Specific regulatory identity required');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bhow (do|can) i check.*(dot|usdot) number\b/i.test(q)) return definition(q, 'usdot');

  if (
    /\bwho will actually (move|haul|transport)\b/i.test(q) ||
    /\bwho (hauls|transports) my (belongings|stuff|shipment)\b/i.test(q) ||
    /\b(is this|will this) broker\b.*\b(actually )?(transport|haul|move)\b/i.test(q) ||
    /\bbroker the company that will actually transport\b/i.test(q)
  ) {
    const query = fail(
      'A broker can arrange transportation without physically hauling the shipment. MoveTrustHub does not infer the transporting carrier from broker identity, shared address, similar name, website, or phone.',
      ['What is the difference between a carrier and a broker?', 'Find USDOT 3244649.'],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  if (
    (/\bserv(e|es|ing)\b|\bservice (area|territory|coverage)\b/i.test(q) &&
      /\b(florida|palm beach|broward|miami|county|movers?)\b/i.test(q)) ||
    /\bmovers serving\b/i.test(q)
  ) {
    const query = fail(
      'Headquarters or Florida registration is not service territory. Ask does not infer “serves Palm Beach County” from a Florida address.',
      ['Show current interstate household-goods carriers headquartered in Florida.'],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  if (/^\d{3,8}$/.test(q)) {
    const query = fail(
      'Bare digits are ambiguous (USDOT, MC, or other network identifiers). Use a labeled identifier such as “Find USDOT 3244649” or “Find MC 1019808.”',
      ['Find USDOT 3244649.', 'Find MC 1019808.'],
    );
    push('Mode', 'fail_closed');
    push('Identifier', 'Unlabeled digits');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bwhat is (a |an )?usdot\b/i.test(q) || /\bwhat does usdot( number| status)? mean\b/i.test(q)) {
    if (/\bstatus\b/i.test(q)) return definition(q, 'usdot_status');
    return definition(q, 'usdot');
  }
  if (/\bwhat is (a |an )?mc( number)?\b/i.test(q)) return definition(q, 'mc');
  if (/\bwhat is a household[- ]?goods carrier\b/i.test(q)) return definition(q, 'hhg_carrier');
  if (/\bwhat is a moving broker\b|\bwhat is a broker\b/i.test(q)) return definition(q, 'broker');
  if (/\bwhat is (interstate )?operating authority\b/i.test(q)) return definition(q, 'interstate_authority');
  if (/\bwhat is a florida intrastate mover\b/i.test(q)) return definition(q, 'florida_im');
  if (/\bdifference between (a )?(carrier|mover) and (a )?broker\b/i.test(q)) return definition(q, 'carrier_vs_broker');

  const identity = parseMoveIdentifiers(q);
  if (identity.error) {
    const query = fail(identity.error, ['Find USDOT 3244649.', 'Find MC 1019808.']);
    push('Identifier', 'Clarification required');
    return { raw: q, query, interpretation: lines };
  }
  if (identity.identifiers.length) {
    const id = identity.identifiers[0]!;
    const evidence = /\bcomplaint/i.test(q) ? 'complaint'
      : /\b(authorit|operating authority|status|role|carrier or broker|is .+ active|household[- ]?goods)\b/i.test(q) ? 'authority' : undefined;
    const query: MoveResearchQuery = {
      mode: evidence ? 'evidence' : 'identifier', identifier: { type: id.type, value: id.value },
      identifiers: identity.identifiers, includeDualRole: true, evidenceFamily: evidence, page: 1,
    };
    push('Mode', query.mode);
    for (const item of identity.identifiers) {
      push('Identifier', `${item.type.toUpperCase()} ${item.value} (labeled)`);
      for (const operation of item.normalization) push('Normalization', `${item.rawSpan}: ${operation}`);
    }
    if (identity.identifiers.length === 2) push('Identity rule', 'Both identifiers must occur on the same published identity; no name-based merge.');
    if (evidence) push('Evidence family', evidence === 'authority' ? 'FMCSA operating authority (source-native Common / Contract / Broker)' : 'Partial complaint observations');
    return { raw: q, query, interpretation: lines };
  }

  const state = detectState(q);
  const role = detectRole(q);
  const floridaIm = /\b(fdacs|intrastate movers?|im registrations?)\b/i.test(q);
  const overlap = /\bboth\b/i.test(q) && /\b(fmcsa|interstate)\b/i.test(q) && /\b(fdacs|intrastate)\b/i.test(q);
  const serving = /\bserv(e|es|ing)\b/i.test(q);
  const hq = /\bheadquarter|recorded (company )?address|based in\b/i.test(q) || /\bcredentialed\b/i.test(q) === false;
  const geoMeaning = floridaIm
    ? 'florida_im_registration'
    : serving
      ? 'service_territory_unsupported'
      : 'recorded_headquarters_state';

  if (state === 'NJ' && /\b(licen[sc]ed?|intrastate|pm|pw|pc|pmw)\b/i.test(q)) {
    const query = fail("New Jersey's statewide PM/PW/PC mover roster is available through a request/search process rather than a complete acquired bulk universe. Acquired NOV observations are evidence rows, not the mover population.", ['What is interstate operating authority?', 'Find USDOT 3244649.']);
    query.coverageState = 'REQUEST_ONLY';
    push('Coverage', 'New Jersey statewide roster — REQUEST_ONLY');
    return { raw: q, query, interpretation: lines };
  }

  if (state === 'CA' && /\b(cal-?t|licensed|movers?)\b/i.test(q)) {
    const query = fail("California's complete CAL-T mover roster is not currently acquired as a bulk dataset. Citation observations are not a mover population count.", ['What is interstate operating authority?', 'Find USDOT 3244649.']);
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'California CAL-T roster — NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }

  if (geoMeaning === 'service_territory_unsupported' && state) {
    const query = fail(
      'An interstate carrier may serve many states. Recorded headquarters is not service coverage.',
      ['Show current interstate household-goods carriers headquartered in Florida.'],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bhow many\b|\bcount of\b/i.test(q)) {
    if (floridaIm) {
      const query: MoveResearchQuery = {
        mode: 'count',
        floridaIm: true,
        includeDualRole: false,
        aggregateMetric: 'florida_im_active',
        page: 1,
      };
      push('Mode', 'count');
      push('Grain', 'FDACS Intrastate Mover registration rows (not published profiles)');
      return { raw: q, query, interpretation: lines };
    }
    if (!role && !/\bbrokers?\b|\bcarriers?\b/i.test(q)) {
      const query = fail(
        'Counts require carrier, broker, or Florida IM registration grain. Those records overlap and are not one mover total.',
        ['How many current household-goods carriers are indexed?', 'How many brokers are indexed?'],
      );
      push('Mode', 'fail_closed');
      return { raw: q, query, interpretation: lines };
    }
    const query: MoveResearchQuery = {
      mode: 'count',
      role: role ?? 'carrier',
      includeDualRole: true,
      jurisdiction: state ? { state, meaning: 'recorded_headquarters_state' } : undefined,
      authorityCurrent: /\b(inactive|revoked|not current)\b/i.test(q) ? 'not_current' : /\b(current|active)\b/i.test(q) ? true : 'any',
      aggregateMetric: 'entity_count',
      page: 1,
    };
    push('Mode', 'count');
    push('Entity', roleLabel(query.role));
    push('Grain', 'directory profiles with that authority (dual-role rows disclosed, not double-summed into a mega-count)');
    return { raw: q, query, interpretation: lines };
  }

  if (state && /\bcompar/i.test(q) && /\btexas\b|\bflorida\b/i.test(q)) {
    const other = state === 'FL' ? 'TX' : 'FL';
    const query: MoveResearchQuery = {
      mode: 'comparison',
      role: role ?? 'carrier',
      includeDualRole: true,
      jurisdiction: { state, meaning: 'recorded_headquarters_state' },
      compareJurisdiction: { state: other, meaning: 'recorded_headquarters_state' },
      authorityCurrent: true,
      page: 1,
    };
    push('Mode', 'comparison');
    push('Metric', 'Headquartered interstate carrier directory profiles');
    push('Geography', 'Recorded company address / headquarters state — not service territory');
    return { raw: q, query, interpretation: lines };
  }

  if (overlap) {
    const query: MoveResearchQuery = {
      mode: 'entity',
      overlapFmcsaFdacs: true,
      includeDualRole: true,
      page: safePage,
    };
    push('Mode', 'entity');
    push('Identity method', 'VERIFIED company_id link only — not name match');
    push('Limitation', 'Unlinked FDACS rows stay registrations, not FMCSA companies.');
    return { raw: q, query, interpretation: lines };
  }

  if (floridaIm) {
    const query: MoveResearchQuery = {
      mode: 'entity',
      floridaIm: true,
      includeDualRole: false,
      jurisdiction: { state: 'FL', meaning: 'florida_im_registration' },
      page: safePage,
    };
    push('Mode', 'entity');
    push('Regulatory system', 'FDACS');
    push('Record grain', 'Intrastate Mover registration');
    push('Geography', 'Florida IM registration — not FMCSA interstate authority, not service territory');
    push('Sort', 'Registration identifier');
    return { raw: q, query, interpretation: lines };
  }

  if (/\b(carrier or (just )?(a )?broker|mover or broker|broker or (just )?(a )?carrier)\b/i.test(q) && !/\b(usdot|dot|mc)\s*#?\s*\d/i.test(q)) {
    const query = fail(
      'Role answers require a labeled USDOT or MC. Ask will not guess carrier vs broker from a trade name.',
      ['Find USDOT 3244649.', 'What is the difference between a carrier and a broker?'],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bwho is\b|\bnamed\b/i.test(q) || (/^\s*find\b/i.test(q) && !/\b(usdot|dot|mc|carrier|broker|mover)/i.test(q))) {
    const nameQuery = q.replace(/^\s*(find|who is|company named)\s+/i, '').trim();
    const query: MoveResearchQuery = { mode: 'entity', nameQuery, includeDualRole: true, page: safePage };
    push('Mode', 'company identity');
    push('Company name', nameQuery);
    push('Identity rule', 'Name similarity is a candidate match; USDOT/MC establishes exact regulatory identity.');
    return { raw: q, query, interpretation: lines };
  }

  if (/^[a-z0-9][a-z0-9 '&.,-]{2,100}$/i.test(q) && !role && !state && !/\b(current|active|inactive|authority|complaint|mover|moving|company)\b/i.test(q)) {
    const query: MoveResearchQuery = { mode: 'entity', nameQuery: q, includeDualRole: true, page: safePage };
    push('Mode', 'company identity');
    push('Company name', q);
    push('Identity rule', 'Name similarity is a candidate match; USDOT/MC establishes exact regulatory identity.');
    return { raw: q, query, interpretation: lines };
  }

  const query: MoveResearchQuery = {
    mode: 'entity',
    role: role ?? 'carrier',
    includeDualRole: true,
    jurisdiction: state ? { state, meaning: 'recorded_headquarters_state' } : undefined,
    authorityCurrent: /\b(inactive|revoked|not current)\b/i.test(q) ? 'not_current' : /\b(current|active)\b/i.test(q) ? true : 'any',
    page: safePage,
  };
  push('Mode', 'entity');
  push('Entity', roleLabel(query.role));
  push('Regulatory system', 'FMCSA');
  if (query.jurisdiction) {
    push('Geography', 'Recorded company address / headquarters state');
    push('State', query.jurisdiction.state);
  }
  push('Status', query.authorityCurrent === true ? 'Current (source-native stored flag)' : 'As stored');
  push('Sort', 'Company name, then USDOT');
  if (hq && state) {
    push('Does not mean', 'Serves only this state. Interstate carriers may operate in many states.');
  }
  void hq;
  return { raw: q, query, interpretation: lines };
}

function definition(raw: string, definitionId: string): ParsedMoveAsk {
  const def = ASK_DEFINITIONS[definitionId];
  return {
    raw,
    query: { mode: 'definition', definitionId, includeDualRole: true, page: 1 },
    interpretation: [
      { label: 'Mode', value: 'definition' },
      { label: 'Term', value: def?.title ?? definitionId },
    ],
  };
}

function roleLabel(role?: MoveRegulatoryRole): string {
  if (role === 'broker') return 'Household-goods broker';
  if (role === 'carrier_broker') return 'Carrier / broker (both roles)';
  return 'Household-goods motor carrier';
}

export type { ParsedMoveAsk };
