import { ASK_DEFINITIONS, type MoveRegulatoryRole, type MoveResearchQuery, type ParsedMoveAsk } from './contract';

const STATE_NAMES: Record<string, string> = {
  florida: 'FL',
  texas: 'TX',
  fl: 'FL',
  tx: 'TX',
};

function detectState(q: string): string | undefined {
  for (const [name, code] of Object.entries(STATE_NAMES)) {
    if (name.length === 2) {
      if (new RegExp(`\\bin ${name}\\b`, 'i').test(q)) return code;
    } else if (new RegExp(`\\b${name}\\b`, 'i').test(q)) return code;
  }
  return undefined;
}

function detectRole(q: string): MoveRegulatoryRole | undefined {
  const broker = /\bbrokers?\b/i.test(q);
  const carrier = /\bcarriers?\b|\bmotor carriers?\b|\bhousehold-?goods carriers?\b/i.test(q);
  if (broker && carrier) return 'carrier_broker';
  if (broker) return 'broker';
  if (carrier || /\binterstate movers?\b|\bhhg\b|\bhousehold-?goods\b/i.test(q)) return 'carrier';
  return undefined;
}

function fail(reason: string, alternatives: string[]): MoveResearchQuery {
  return { mode: 'fail_closed', includeDualRole: true, page: 1, failReason: reason, alternatives };
}

function isRanking(q: string): boolean {
  return (
    /\b(best|safest|most trustworthy|least risky|top[- ]?rated|most trusted|recommended)\b/i.test(q) &&
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
  const q = raw.trim().slice(0, 400);
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
  if (/\bwhat is a household-?goods carrier\b/i.test(q)) return definition(q, 'hhg_carrier');
  if (/\bwhat is a moving broker\b|\bwhat is a broker\b/i.test(q)) return definition(q, 'broker');
  if (/\bwhat is (interstate )?operating authority\b/i.test(q)) return definition(q, 'interstate_authority');
  if (/\bwhat is a florida intrastate mover\b/i.test(q)) return definition(q, 'florida_im');
  if (/\bdifference between (a )?(carrier|mover) and (a )?broker\b/i.test(q)) return definition(q, 'carrier_vs_broker');

  const usdot = q.match(/\b(?:usdot|dot)\s*#?\s*(\d{3,8})\b/i);
  if (usdot?.[1]) {
    const evidence = /\bcomplaint/i.test(q)
      ? 'complaint'
      : /\b(authorit|operating authority|status|role|carrier or broker|is .+ active|household-?goods)\b/i.test(q)
        ? 'authority'
        : undefined;
    const query: MoveResearchQuery = {
      mode: evidence ? 'evidence' : 'identifier',
      identifier: { type: 'usdot', value: usdot[1] },
      includeDualRole: true,
      evidenceFamily: evidence,
      page: 1,
    };
    push('Mode', query.mode);
    push('Identifier', `USDOT ${usdot[1]} (labeled)`);
    push('Identity rule', 'USDOT is a federal identity, not an endorsement.');
    if (evidence === 'authority') {
      push('Evidence family', 'FMCSA operating authority (source-native Common / Contract / Broker)');
    }
    return { raw: q, query, interpretation: lines };
  }

  const mc = q.match(/\bmc\s*#?-?\s*(\d{3,8})\b/i);
  if (mc?.[1]) {
    const evidence = /\b(authorit|operating authority|status|household-?goods|active)\b/i.test(q) ? 'authority' : undefined;
    const query: MoveResearchQuery = {
      mode: evidence ? 'evidence' : 'identifier',
      identifier: { type: 'mc', value: mc[1] },
      includeDualRole: true,
      evidenceFamily: evidence,
      page: 1,
    };
    push('Mode', query.mode);
    push('Identifier', `MC ${mc[1]} (labeled)`);
    if (evidence) push('Evidence family', 'FMCSA operating authority (source-native Common / Contract / Broker)');
    return { raw: q, query, interpretation: lines };
  }

  const state = detectState(q);
  const role = detectRole(q);
  const floridaIm = /\b(fdacs|intrastate mover|im registration)\b/i.test(q);
  const overlap = /\bboth\b/i.test(q) && /\b(fmcsa|interstate)\b/i.test(q) && /\b(fdacs|intrastate)\b/i.test(q);
  const serving = /\bserv(e|es|ing)\b/i.test(q);
  const hq = /\bheadquarter|recorded (company )?address|based in\b/i.test(q) || /\bcredentialed\b/i.test(q) === false;
  const geoMeaning = floridaIm
    ? 'florida_im_registration'
    : serving
      ? 'service_territory_unsupported'
      : 'recorded_headquarters_state';

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
      authorityCurrent: /\bcurrent|active\b/i.test(q) ? true : 'any',
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

  if (/\b(carrier or a broker|mover or broker|broker or (a )?carrier)\b/i.test(q) && !/\b(usdot|dot|mc)\s*#?\s*\d/i.test(q)) {
    const query = fail(
      'Role answers require a labeled USDOT or MC. Ask will not guess carrier vs broker from a trade name.',
      ['Find USDOT 3244649.', 'What is the difference between a carrier and a broker?'],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bwho is\b|\bnamed\b/i.test(q) || (/^\s*find\b/i.test(q) && !/\b(usdot|dot|mc|carrier|broker|mover)/i.test(q))) {
    const query = fail(
      'Name is not canonical identity. Prefer a labeled USDOT or MC number. Name appearance is not a merge key.',
      ['Find USDOT 3244649.', 'Find MC 1019808.'],
    );
    push('Mode', 'fail_closed');
    return { raw: q, query, interpretation: lines };
  }

  const query: MoveResearchQuery = {
    mode: 'entity',
    role: role ?? 'carrier',
    includeDualRole: true,
    jurisdiction: state ? { state, meaning: 'recorded_headquarters_state' } : undefined,
    authorityCurrent: /\bcurrent|active\b/i.test(q) ? true : /\binactive|revoked|not current\b/i.test(q) ? 'not_current' : 'any',
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
