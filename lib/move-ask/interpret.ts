import { parseNameRequest, distinctiveTokens } from './name';
import { parseMoveIdentifiers } from './identifier';
import { lookupOregonCertificate } from '../oregon-intelligence/lookup';
import { lookupPaPucIdentity } from '../pennsylvania-intelligence/lookup';
import { PENNSYLVANIA_MOVE_SNAPSHOT } from '../pennsylvania-intelligence/snapshot';
import { lookupNcNcucIdentity } from '../north-carolina-intelligence/lookup';
import { NORTH_CAROLINA_MOVE_SNAPSHOT } from '../north-carolina-intelligence/snapshot';
import { ASK_DEFINITIONS, type MoveRegulatoryRole, type MoveResearchQuery, type ParsedMoveAsk } from './contract';

const STATE_NAMES: Record<string, string> = {
  florida: 'FL',
  'new jersey': 'NJ',
  california: 'CA',
  texas: 'TX',
  washington: 'WA',
  colorado: 'CO',
  virginia: 'VA',
  'new york': 'NY',
  illinois: 'IL',
  oregon: 'OR',
  pennsylvania: 'PA',
  'north carolina': 'NC',
  ohio: 'OH',
  ny: 'NY',
  fl: 'FL',
  nj: 'NJ',
  ca: 'CA',
  tx: 'TX',
  wa: 'WA',
  co: 'CO',
  va: 'VA',
  il: 'IL',
};

function detectState(q: string): string | undefined {
  if (/\bnj\b/i.test(q)) return 'NJ';
  if (/\bpennsylvania\b/i.test(q)) return 'PA';
  if (/\bnorth carolina\b/i.test(q) || /\bin nc\b/i.test(q)) return 'NC';
  if (/\bohio\b/i.test(q) || /\bin oh\b/i.test(q) || /\bpuco\b/i.test(q)) return 'OH';
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

function mentionsNewYork(q: string): boolean {
  return /\bnew york\b|\bnysdot\b|\bnydot\b/i.test(q) || detectState(q) === 'NY';
}

function mentionsIllinois(q: string): boolean {
  return /\billinois\b|\bicc\b|\bilcc\b/i.test(q) || detectState(q) === 'IL';
}

function mentionsChicago(q: string): boolean {
  return /\bchicago\b|\bcook county\b/i.test(q);
}

function mentionsOregon(q: string): boolean {
  return /\boregon\b|\bodot\b/i.test(q) || detectState(q) === 'OR';
}

function mentionsPennsylvania(q: string): boolean {
  return (
    /\bpennsylvania\b|\bpuc\b|\bpa puc\b|\bhousehold goods operators list\b/i.test(q) ||
    detectState(q) === 'PA'
  );
}

function mentionsNorthCarolina(q: string): boolean {
  return (
    /\bnorth carolina\b|\bncuc\b|\bin nc\b/i.test(q) ||
    detectState(q) === 'NC'
  );
}

function mentionsNcCity(q: string): boolean {
  return /\bcharlotte\b|\braleigh\b|\bdurham\b|\bgreensboro\b|\basheville\b|\bwilmington\b|\bfayetteville\b/i.test(q);
}

function mentionsOhio(q: string): boolean {
  return /\bohio\b|\bpuco\b|\bin oh\b/i.test(q);
}

function mentionsOhioCity(q: string): boolean {
  return /\bcolumbus\b|\bcleveland\b|\bcincinnati\b|\btoledo\b|\bdayton\b|\bakron\b/i.test(q);
}

function parseOhPucoIdentity(q: string): string | null {
  if (/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) return null;
  const labeled =
    q.match(/\bpuco\s*(?:no\.?|number|#)?\s*([0-9]{3,7}(?:-HG)?)\b/i) ||
    q.match(/\b([0-9]{3,7}-HG)\b/i);
  if (!labeled?.[1]) return null;
  if (!(mentionsOhio(q) || /\bpuco\b/i.test(q) || /-HG\b/i.test(labeled[1]))) return null;
  return labeled[1].toUpperCase().replace(/-HG$/i, '-HG');
}

function isOhRateAsk(q: string): boolean {
  return (
    (/\bmoving rates?\b|\btariff\b|\bbinding estimate\b|\bhow much can a mover charge\b/i.test(q)) &&
    (mentionsOhio(q) || /\bpuco\b/i.test(q))
  );
}

function isOhInsuranceAsk(q: string): boolean {
  return /\binsured\b|\binsurance\b/i.test(q) && (mentionsOhio(q) || mentionsOhioCity(q));
}

function isOhComplaintAsk(q: string): boolean {
  return /\bcomplaint|\benforcement\b/i.test(q) && (mentionsOhio(q) || mentionsOhioCity(q) || /\bpuco\b/i.test(q));
}

function isOhIntrastateAuthorityAsk(q: string): boolean {
  if (/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) return false;
  if (!(mentionsOhio(q) || mentionsOhioCity(q))) return false;
  if (/\bheadquarter/i.test(q) && /\binterstate\b/i.test(q)) return false;
  if (/\binterstate mover\b/i.test(q) && !/\blicen|\bintrastate|\bhousehold[- ]?goods|\bpuco\b|\bcertificate\b/i.test(q)) {
    return false;
  }
  return (
    /\bintrastate\b|\bpuco\b|\bhousehold[- ]?goods\b|\blicensed movers?\b|\bcertified movers?\b/i.test(q) ||
    /\bohio movers?\b|\bmovers in ohio\b|\bmoving companies\b/i.test(q) ||
    (/\bmovers?\b/i.test(q) && (mentionsOhio(q) || mentionsOhioCity(q)))
  );
}

function mentionsPhiladelphiaOrPittsburgh(q: string): boolean {
  return /\bphiladelphia\b|\bpittsburgh\b|\ballegheny\b|\bmontgomery\b/i.test(q);
}

function mentionsPortland(q: string): boolean {
  return /\bportland\b|\bmultnomah\b/i.test(q);
}

function parseOregonCertificateNumber(q: string): string | null {
  if (/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) return null;
  const labeled =
    q.match(/\boregon(?:\s+household[- ]?goods)?(?:\s+mover)?\s+certificate(?:\s+(?:no\.?|number))?\s*#?\s*(\d{4,8})\b/i) ||
    q.match(/\bcertificate(?:\s+(?:no\.?|number))?\s*#?\s*(\d{4,8})\b.*\boregon\b/i) ||
    q.match(/\bodot\s+certificate(?:\s+(?:no\.?|number))?\s*#?\s*(\d{4,8})\b/i);
  return labeled?.[1] ?? null;
}

function isOrComplaintAsk(q: string): boolean {
  return /\bcomplaint/i.test(q) && (mentionsOregon(q) || /\bodot\b/i.test(q));
}

function isOrEnforcementAsk(q: string): boolean {
  return /\b(enforcement|final order|civil (monetary )?penalt|unauthorized mover|unlicensed mover)\b/i.test(q) && mentionsOregon(q);
}

function parseNcNcucIdentity(q: string): { kind: 'C' | 'T'; value: string } | null {
  if (/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) return null;
  const cLabeled =
    q.match(/\b(?:ncuc\s+)?c(?:-|\s*#\s*|\s+number\s+)?(\d{3,5})\b/i) ||
    q.match(/\bnorth carolina mover certificate\s*#?\s*(?:c-)?(\d{3,5})\b/i);
  if (cLabeled && (mentionsNorthCarolina(q) || /\bc-\d{3,5}\b/i.test(q) || /\bncuc\b/i.test(q))) {
    return { kind: 'C', value: `C-${cLabeled[1]}` };
  }
  const tLabeled =
    q.match(/\b(?:ncuc\s+)?t(?:-|\s*#\s*|\s+number\s+)?(\d{3,5})\b/i);
  if (tLabeled && (mentionsNorthCarolina(q) || /\bt-\d{3,5}\b/i.test(q) || /\bncuc\b/i.test(q))) {
    return { kind: 'T', value: `T-${tLabeled[1]}` };
  }
  return null;
}

function isNcComplaintAsk(q: string): boolean {
  return /\bcomplaint|\bsuspension\b/i.test(q) && (mentionsNorthCarolina(q) || mentionsNcCity(q));
}

function isNcInsuranceAsk(q: string): boolean {
  return /\binsured\b|\binsurance\b/i.test(q) && (mentionsNorthCarolina(q) || mentionsNcCity(q));
}

function isNcRateAsk(q: string): boolean {
  return (
    (/\bmaximum (?:moving )?rates?\b|\bhow much can a mover charge\b|\bmoving rates?\b/i.test(q) ||
      /\btariff\b/i.test(q)) &&
    (mentionsNorthCarolina(q) || /\bncuc\b/i.test(q))
  );
}

function isNcIntrastateAuthorityAsk(q: string): boolean {
  if (/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) return false;
  if (!(mentionsNorthCarolina(q) || mentionsNcCity(q))) return false;
  if (/\bheadquarter/i.test(q) && /\binterstate\b/i.test(q)) return false;
  if (/\binterstate mover\b/i.test(q) && !/\blicen|\bintrastate|\bhousehold[- ]?goods|\bncuc\b|\bc-number|\bcertificate\b/i.test(q)) {
    return false;
  }
  return (
    /\bintrastate\b|\bncuc\b|\bc-number|\bcertificate of exemption|\bhousehold[- ]?goods\b/i.test(q) ||
    /\blicensed movers?\b|\bcertified movers?\b|\bnorth carolina movers?\b|\bmovers in north carolina\b|\bmoving companies\b/i.test(q) ||
    /\bmovers charlotte\b|\bmovers raleigh\b|\bmovers durham\b|\bmovers greensboro\b|\bmovers asheville\b/i.test(q) ||
    (/\bmovers?\b/i.test(q) && (mentionsNorthCarolina(q) || mentionsNcCity(q)))
  );
}

function parsePaPucIdentity(q: string): string | null {
  if (/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) return null;
  const aNumber =
    q.match(/\b(?:pa\s+)?(?:puc\s+)?(?:carrier(?:\s+id)?|a[- ]?number|application(?:\s+number)?)\s*#?\s*(A-?\d{6,9})\b/i) ||
    q.match(/\b(A-\d{6,9})\b/) ||
    q.match(/\bPA\s+carrier\s+(A-?\d{6,9})\b/i);
  if (aNumber) return aNumber[1]!;
  const utility =
    q.match(/\b(?:pa\s+)?(?:puc\s+)?(?:utility(?:\s+code)?|puc(?:\s+mover)?)\s*#?\s*(\d{6,8})\b/i) ||
    q.match(/\bPA\s+PUC\s+(\d{6,8})\b/i);
  if (utility && (mentionsPennsylvania(q) || /\bpuc\b|\butility code\b/i.test(q))) return utility[1]!;
  return null;
}

function isPaComplaintAsk(q: string): boolean {
  return /\bcomplaint|\bdocket\b/i.test(q) && (mentionsPennsylvania(q) || mentionsPhiladelphiaOrPittsburgh(q));
}

function isPaInsuranceAsk(q: string): boolean {
  return /\binsurance\b|\bform e\b|\bform h\b/i.test(q) && mentionsPennsylvania(q);
}

function isPaBrokerAsk(q: string): boolean {
  return /\bbroker/i.test(q) && (mentionsPennsylvania(q) || /\bhousehold goods broker\b/i.test(q));
}

function isPaIntrastateAuthorityAsk(q: string): boolean {
  if (/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) return false;
  if (!(mentionsPennsylvania(q) || mentionsPhiladelphiaOrPittsburgh(q))) return false;
  if (/\bheadquarter/i.test(q) && /\binterstate\b/i.test(q)) return false;
  if (/\binterstate mover\b/i.test(q) && !/\blicen|\bintrastate|\bhousehold[- ]?goods|\bpuc\b|\butility code\b/i.test(q)) {
    return false;
  }
  return (
    /\bintrastate\b|\bpuc\b|\butility code\b|\bhousehold[- ]?goods\b/i.test(q) ||
    /\blicensed movers?\b|\bmovers in pennsylvania\b|\bpennsylvania movers\b|\bpennsylvania puc moving/i.test(q) ||
    /\bmovers philadelphia\b|\bmovers pittsburgh\b/i.test(q) ||
    (/\bmovers?\b/i.test(q) && mentionsPennsylvania(q))
  );
}

function isOrIntrastateAuthorityAsk(q: string): boolean {
  if (!mentionsOregon(q)) return false;
  if (/\bheadquarter/i.test(q) && /\binterstate\b/i.test(q)) return false;
  if (/\binterstate mover\b/i.test(q) && !/\blicen|\bintrastate|\bhousehold[- ]?goods|\bodot\b|\bcertificate\b/i.test(q)) {
    return false;
  }
  return (
    /\bintrastate\b/i.test(q) ||
    /\bodot\b|\bcommerce and compliance\b|\bhousehold[- ]?goods certificate\b/i.test(q) ||
    (/\blicensed movers?\b|\blicensed household[- ]?goods|\bhousehold[- ]?goods movers?\b/i.test(q) && !/\binterstate\b/i.test(q)) ||
    /\bis this mover licensed in oregon\b/i.test(q) ||
    /\blicensed in oregon\b/i.test(q) ||
    /\boregon movers\b/i.test(q) ||
    /\boregon household goods mover\b/i.test(q)
  );
}

function isIccComplaintAsk(q: string): boolean {
  return /\bcomplaint/i.test(q) && (/\b(icc|illinois commerce)\b/i.test(q) || (mentionsIllinois(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)));
}

function isIlIntrastateAuthorityAsk(q: string): boolean {
  if (!mentionsIllinois(q)) return false;
  if (/\bheadquarter/i.test(q) && /\binterstate\b/i.test(q)) return false;
  if (/\binterstate mover\b/i.test(q) && !/\blicen|\bintrastate|\bhousehold[- ]?goods|\bicc\b|\bilcc\b/i.test(q)) {
    return false;
  }
  return (
    /\bintrastate\b/i.test(q) ||
    /\bicc\b|\bilcc\b|\billinois commerce\b/i.test(q) ||
    (/\blicensed movers?\b|\blicensed household[- ]?goods|\bhousehold[- ]?goods movers?\b/i.test(q) && !/\binterstate\b/i.test(q)) ||
    /\bis this mover licensed in illinois\b/i.test(q) ||
    /\blicensed in illinois\b/i.test(q) ||
    /\bhow many movers are licensed in illinois\b/i.test(q) ||
    /\bmoving companies in illinois\b/i.test(q)
  );
}

function isNysdotComplaintAsk(q: string): boolean {
  return /\bcomplaint/i.test(q) && /\b(nysdot|nysd?ot|new york (state )?dot)\b/i.test(q);
}

function isNyIntrastateAuthorityAsk(q: string): boolean {
  if (!mentionsNewYork(q)) return false;
  if (/\bheadquarter/i.test(q) && /\binterstate\b/i.test(q)) return false;
  return (
    /\bintrastate\b/i.test(q) ||
    /\bnydot\b|\bnysdot\b|\bnew york dot mover\b/i.test(q) ||
    (/\blicensed movers?\b/i.test(q) && !/\binterstate\b/i.test(q)) ||
    /\bis this mover licensed in new york\b/i.test(q)
  );
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

  // TH-DISCOVERY-RESET-001 (production certification fix): disclose the no-ranking policy exactly
  // once, up front, regardless of which path below the query ultimately takes. A ranking word
  // with no resolvable geography still has nothing to fall back to and correctly stays fail-closed
  // (see the two isRanking gates below); one with a resolvable state/city now falls through to
  // real results instead of an unconditional dead end -- this line is what discloses that no
  // ranking was computed for that real result.
  if (isRanking(q)) push('Ranking', 'Not established; MoveTrustHub does not rank movers. Source order only.');

  if (isRanking(q) && mentionsChicago(q)) {
    const query = fail(
      'MoveTrustHub does not rank movers and does not publish a Chicago or Cook County mover route. Illinois household-goods authority is statewide ICC research.',
      ['Open Illinois household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Mode', 'fail_closed');
    push('Coverage', 'No Chicago intelligence page');
    return { raw: q, query, interpretation: lines };
  }

  if (isRanking(q) && mentionsPhiladelphiaOrPittsburgh(q)) {
    const query = fail(
      'MoveTrustHub does not rank movers and does not publish a Philadelphia or Pittsburgh mover route. Pennsylvania household-goods authority is statewide PA PUC research.',
      ['Open Pennsylvania household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Mode', 'fail_closed');
    push('Coverage', 'No Pennsylvania city intelligence page');
    return { raw: q, query, interpretation: lines };
  }

  if (isRanking(q) && (mentionsNorthCarolina(q) || mentionsNcCity(q))) {
    const query = fail(
      'MoveTrustHub does not rank movers and does not publish a Trust Score. North Carolina household-goods research uses NCUC C-number certificates on the monthly carrier-list snapshot, not a winner or cheapest ranking.',
      ['Open North Carolina household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Mode', 'fail_closed');
    push('Coverage', 'No North Carolina city intelligence page');
    return { raw: q, query, interpretation: lines };
  }

  if (isRanking(q) && (mentionsOhio(q) || mentionsOhioCity(q))) {
    const query = fail(
      'MoveTrustHub does not rank movers and does not publish a Trust Score. Ohio household-goods research uses PUCO certificates on statewide /ohio, not a winner or cheapest ranking. Columbus and Cleveland are not city intelligence pages.',
      ['Open Ohio household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Mode', 'fail_closed');
    push('Coverage', 'No Ohio city intelligence page');
    return { raw: q, query, interpretation: lines };
  }

  if (isRanking(q) && mentionsPortland(q) && mentionsOregon(q)) {
    const query = fail(
      'MoveTrustHub does not rank movers and does not publish a Portland or Multnomah County mover route. Oregon household-goods authority is statewide ODOT CCD research.',
      ['Open Oregon household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Mode', 'fail_closed');
    push('Coverage', 'No Portland intelligence page');
    return { raw: q, query, interpretation: lines };
  }

  if ((isRanking(q) || /\bwhich state has better movers\b/i.test(q)) && !detectState(q)) {
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

  const oregonCertificate = parseOregonCertificateNumber(q);
  if (oregonCertificate) {
    const found = lookupOregonCertificate(oregonCertificate);
    if (isOrComplaintAsk(q)) {
      const query = fail(
        `Oregon intrastate household-goods complaints are filed on form 9976. No public mover-level complaint universe was acquired. Missing bulk complaints is not zero complaints. Federal complaints are not a substitute. Confirm certificate ${oregonCertificate} on the official ODOT authorized list.`,
        ['Open Oregon household-goods research.', 'Show complaint observations for USDOT 3244649.'],
      );
      query.coverageState = 'NOT_ACQUIRED';
      push('Coverage', 'ODOT CCD complaints — REQUEST_ONLY / NOT_ACQUIRED');
      return { raw: q, query, interpretation: lines };
    }
    if (found.hits.length) {
      const hit = found.hits[0]!;
      const query = fail(
        `${hit.title} appears on the accepted ODOT CCD authorized household-goods list as certificate ${hit.certificateNumber}. An Oregon certificate is not a USDOT number and not an MC number. Authorized service may be local cartage, other-than-local, or restricted; it is not automatically statewide. Confirm on the official list.`,
        ['Open Oregon household-goods research.', 'Find USDOT 3244649.'],
      );
      push('Oregon certificate', hit.certificateNumber);
      push('Authorized-list identity', hit.title);
      push('Limitation', 'Certificate is not FMCSA interstate authority');
      return { raw: q, query, interpretation: lines };
    }
    const query = fail(
      `Certificate ${oregonCertificate} is not on the accepted ODOT CCD authorized household-goods snapshot. Absence from this snapshot is not FMCSA interstate status and is not a Trust Score. Confirm on the official authorized-movers list.`,
      ['Open Oregon household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Oregon certificate', oregonCertificate);
    push('Coverage', 'Accepted authorized list — no match');
    return { raw: q, query, interpretation: lines };
  }

  if (isOrComplaintAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      'Oregon ODOT CCD household-goods complaints are official filing (form 9976), not an acquired bulk table. Federal complaint observations are not a substitute. Missing bulk complaints is not zero complaints.',
      ['Open Oregon household-goods research.', 'Show complaint observations for USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'ODOT CCD complaints — REQUEST_ONLY');
    return { raw: q, query, interpretation: lines };
  }

  if (isOrEnforcementAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      'Oregon’s 2026 unauthorized-mover rules (SB 839 / OAR 740-300-0035) are an enforcement framework, not a disciplinary record. No bounded official Final Order table was acquired. Name-only press citations are not attached.',
      ['Open Oregon household-goods research.', 'Find USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'ODOT CCD enforcement matters — NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }

  const ncIdentity = parseNcNcucIdentity(q);
  if (ncIdentity) {
    const found = lookupNcNcucIdentity(ncIdentity.value);
    if (isNcComplaintAsk(q)) {
      const query = fail(
        `NCUC/Public Staff complaint intake is official help, not an acquired household-goods complaint census. A docket is not an adverse finding. Missing bulk complaints is not zero complaints. Confirm ${ncIdentity.value} on the official NCUC carrier list.`,
        ['Open North Carolina household-goods research.', 'Show complaint observations for USDOT 3244649.'],
      );
      query.coverageState = 'NOT_ACQUIRED';
      push('Coverage', 'NCUC HHG complaints — INTAKE_AVAILABLE / BULK_NOT_PUBLIC');
      return { raw: q, query, interpretation: lines };
    }
    if (found.hits.length) {
      const hit = found.hits[0]!;
      const query = fail(
        `${hit.name || 'This carrier'} appears on the accepted September 8, 2026 NCUC household-goods carrier-list snapshot as C-number ${hit.cNumber}${hit.tNumber ? ` / T-number ${hit.tNumber}` : ''}. C-number is the Certificate of Exemption. T-number is the company/docket identity. They are not a USDOT number and not an MC number. Monthly list status is not a live census. Confirm on the official list.`,
        ['Open North Carolina household-goods research.', 'Find USDOT 3244649.'],
      );
      push('NCUC C-number', hit.cNumber);
      if (hit.tNumber) push('NCUC T-number', hit.tNumber);
      push('Limitation', 'NCUC certificate is not FMCSA interstate authority');
      return { raw: q, query, interpretation: lines };
    }
    const query = fail(
      `NCUC identity ${ncIdentity.value} is not on the accepted September 8, 2026 household-goods carrier-list snapshot. Absence from this snapshot is not FMCSA interstate status and is not a Trust Score. Confirm on the official list.`,
      ['Open North Carolina household-goods research.', 'Find USDOT 3244649.'],
    );
    push('NCUC identity', ncIdentity.value);
    return { raw: q, query, interpretation: lines };
  }

  if (isNcRateAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      `NCUC Maximum Rate Tariff ${NORTH_CAROLINA_MOVE_SNAPSHOT.tariff.NC_NCUC_MRT_VERSION} (issued ${NORTH_CAROLINA_MOVE_SNAPSHOT.tariff.NC_NCUC_MRT_ISSUED_DATE}, effective ${NORTH_CAROLINA_MOVE_SNAPSHOT.tariff.NC_NCUC_MRT_EFFECTIVE_DATE}) sets maximum rates and rules for regulated intrastate household-goods moves. The tariff is not a quote. Actual price depends on move facts. MoveTrustHub does not rank movers on price.`,
      ['Open North Carolina household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Coverage', 'NCUC HHG NO. 2 — ACQUIRED_CURRENT_TARIFF');
    return { raw: q, query, interpretation: lines };
  }

  if (isNcInsuranceAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      `NCUC requires applicable insurance (General Liability ${NORTH_CAROLINA_MOVE_SNAPSHOT.insurance.NC_NCUC_GENERAL_LIABILITY_REQUIREMENT}; Cargo ${NORTH_CAROLINA_MOVE_SNAPSHOT.insurance.NC_NCUC_CARGO_INSURANCE_REQUIREMENT}; Vehicle Liability as stated on the January 2026 annual-report form). Current carrier-specific bulk proof was not acquired. Requirement is not actual current coverage. Verify current official carrier status/evidence.`,
      ['Open North Carolina household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Coverage', 'NCUC insurance — REQUIREMENT_KNOWN / CURRENT_BULK_NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }

  if (isNcComplaintAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      'NCUC/Public Staff provides consumer complaint/help intake (919-733-7766). No public bulk household-goods complaint census was acquired. Complaint intake is not a complaint census. Missing bulk is not zero complaints. A docket or Consumer Statement is not automatically a complaint.',
      ['Open North Carolina household-goods research.', 'Show complaint observations for USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'NCUC HHG complaints — INTAKE_AVAILABLE / BULK_NOT_PUBLIC');
    return { raw: q, query, interpretation: lines };
  }

  if (isNcIntrastateAuthorityAsk(q)) {
    const query = fail(
      `North Carolina intrastate household-goods movers are NCUC-certificated carriers on the official monthly Certificate of Exemption list (${NORTH_CAROLINA_MOVE_SNAPSHOT.current_hhg_roster.NC_NCUC_DISTINCT_C_NUMBERS} distinct C-numbers on the September 8, 2026 snapshot; header announces ${NORTH_CAROLINA_MOVE_SNAPSHOT.current_hhg_roster.NC_NCUC_HHG_SOURCE_ANNOUNCED_TOTAL}). C-number is not T-number. NCUC authority is not FMCSA interstate authority. Charlotte and Raleigh names are not city intelligence pages. The monthly list is not a live authority census.`,
      ['Open North Carolina household-goods research.', 'Show current interstate household-goods carriers headquartered in North Carolina.'],
    );
    push('Coverage', 'NCUC HHG carrier list — MONTHLY_LIST_SNAPSHOT');
    return { raw: q, query, interpretation: lines };
  }

  const ohIdentity = parseOhPucoIdentity(q);
  if (ohIdentity) {
    const query = fail(
      `${ohIdentity} is a PUCO household-goods certificate display. Exact certificate outranks geography. A PUCO number is not a USDOT number and not an MC number. Current PUCO HHG roster coverage is OPEN_SEARCH_ONLY — search-only is not zero. Confirm on official PUCO search. Columbus and Cleveland are not city intelligence pages.`,
      ['Open Ohio household-goods research.', 'Find USDOT 3244649.'],
    );
    push('PUCO certificate', ohIdentity);
    push('Limitation', 'PUCO certificate is not FMCSA interstate authority');
    return { raw: q, query, interpretation: lines };
  }

  if (isOhRateAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      'Ohio household-goods carriers each file their own tariff with PUCO. Ohio does not have one statewide Maximum Rate Tariff. A tariff is not a quote. Tariff existence is not current authority. Binding, nonbinding, and guaranteed-not-to-exceed estimates are statewide rules, not proof a named carrier offers a binding estimate.',
      ['Open Ohio household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Coverage', 'PUCO carrier-specific tariffs — COMPLETE_INDEX_NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }

  if (isOhInsuranceAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      'PUCO requires insurance filings (Form E liability / Form H household-goods cargo) into Motor Carrier Registration. Current carrier-specific bulk proof was not acquired. Requirement is not actual current coverage.',
      ['Open Ohio household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Coverage', 'PUCO insurance — REQUIREMENT_OR_VERIFICATION_PATH_KNOWN / CURRENT_BULK_NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }

  if (isOhComplaintAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      'PUCO provides consumer assistance at 1-800-686-7826. No public bulk household-goods complaint census was acquired. Complaint intake is not a complaint census. Missing bulk is not zero complaints. A docket is not a complaint and not an enforcement finding.',
      ['Open Ohio household-goods research.', 'Show complaint observations for USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'PUCO HHG complaints — INTAKE_AVAILABLE / BULK_NOT_PUBLIC');
    return { raw: q, query, interpretation: lines };
  }

  if (isOhIntrastateAuthorityAsk(q)) {
    const query = fail(
      'Ohio intrastate household-goods movers are PUCO-certificated carriers. The current complete certificate roster is OPEN_SEARCH_ONLY — search-only is not zero. A PUCO certificate is not a USDOT or MC number. Columbus and Cleveland names are not city intelligence pages.',
      ['Open Ohio household-goods research.', 'Show current interstate household-goods carriers headquartered in Ohio.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'PUCO HHG certificate roster — OPEN_SEARCH_ONLY');
    return { raw: q, query, interpretation: lines };
  }

  const paIdentity = parsePaPucIdentity(q);
  if (paIdentity) {
    const found = lookupPaPucIdentity(paIdentity);
    if (isPaComplaintAsk(q)) {
      const query = fail(
        `PA PUC complaint intake is official filing/search, not an acquired household-goods complaint universe. A docket number is not an adverse finding. Missing bulk complaints is not zero complaints. Confirm Utility Code / Carrier ID ${paIdentity} on the official PUC utility detail.`,
        ['Open Pennsylvania household-goods research.', 'Show complaint observations for USDOT 3244649.'],
      );
      query.coverageState = 'NOT_ACQUIRED';
      push('Coverage', 'PA PUC complaints — OPEN_SEARCH_ONLY');
      return { raw: q, query, interpretation: lines };
    }
    if (found.hits.length) {
      const hit = found.hits[0]!;
      const query = fail(
        `${hit.name || 'This utility'} appears on the accepted PA PUC active Household Goods Operators snapshot as Utility Code ${hit.utilityCode}${hit.carrierId ? ` / Carrier ID ${hit.carrierId}` : ''}. Utility Code is not automatically Carrier ID. PA PUC authority is not a USDOT number and not an MC number. Confirm on the official list.`,
        ['Open Pennsylvania household-goods research.', 'Find USDOT 3244649.'],
      );
      push('PA PUC Utility Code', hit.utilityCode);
      if (hit.carrierId) push('PA PUC Carrier ID', hit.carrierId);
      push('Limitation', 'State PUC authority is not FMCSA interstate authority');
      return { raw: q, query, interpretation: lines };
    }
    const query = fail(
      `PA PUC identity ${paIdentity} is not on the accepted active Household Goods Operators snapshot. Absence from this snapshot is not FMCSA interstate status and is not a Trust Score. Confirm on the official PUC list.`,
      ['Open Pennsylvania household-goods research.', 'Find USDOT 3244649.'],
    );
    push('PA PUC identity', paIdentity);
    return { raw: q, query, interpretation: lines };
  }

  if (isPaBrokerAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      'Pennsylvania Household Goods brokers are a separate PUC authority (Broker of Household Goods in Use). No official current broker universe was acquired. OPEN_SEARCH_ONLY is not zero brokers and is not the active carrier list.',
      ['Open Pennsylvania household-goods research.', 'Find USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'PA PUC HHG brokers — OPEN_SEARCH_ONLY');
    return { raw: q, query, interpretation: lines };
  }

  if (isPaInsuranceAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      `PA PUC utility-detail insurance tables in this snapshot: ${PENNSYLVANIA_MOVE_SNAPSHOT.insurance.PA_PUC_INSURANCE_ROWS} rows. Current cargo observations ${PENNSYLVANIA_MOVE_SNAPSHOT.insurance.PA_PUC_CURRENT_CARGO_OBSERVATIONS}; current liability observations ${PENNSYLVANIA_MOVE_SNAPSHOT.insurance.PA_PUC_CURRENT_LIABILITY_OBSERVATIONS}. Form E is liability; Form H is cargo; Form K is cancellation. Insurance is not authority.`,
      ['Open Pennsylvania household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Coverage', 'PA PUC insurance — ACQUIRED_CURRENT_SNAPSHOT');
    return { raw: q, query, interpretation: lines };
  }

  if (isPaComplaintAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      `PA PUC household-goods complaints are official filing/search, not a complete complaint census. Bounded docket metadata on active HHG utilities: ${PENNSYLVANIA_MOVE_SNAPSHOT.dockets.PA_PUC_DISTINCT_DOCKET_NUMBERS} distinct docket numbers. A docketed case is not an adverse finding. Missing bulk complaints is not zero complaints.`,
      ['Open Pennsylvania household-goods research.', 'Show complaint observations for USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'PA PUC complaints — OPEN_SEARCH_ONLY; dockets bounded on HHG utilities');
    return { raw: q, query, interpretation: lines };
  }

  if (isPaIntrastateAuthorityAsk(q)) {
    const query = fail(
      `Pennsylvania intrastate Household Goods carriers are listed on the official PA PUC active operators list (${PENNSYLVANIA_MOVE_SNAPSHOT.current_hhg_roster.PA_PUC_HHG_CARRIER_ROWS} list rows / ${PENNSYLVANIA_MOVE_SNAPSHOT.current_hhg_roster.PA_PUC_HHG_DISTINCT_UTILITY_CODES} distinct Utility Codes). Carriers are not brokers. Utility Code is not automatically Carrier ID. PA PUC authority is not FMCSA interstate authority. Philadelphia and Pittsburgh licensing are not statewide city pages.`,
      ['Open Pennsylvania household-goods research.', 'Show current interstate household-goods carriers headquartered in Pennsylvania.'],
    );
    push('Coverage', 'PA PUC active HHG operators — ACQUIRED_CURRENT_SNAPSHOT');
    return { raw: q, query, interpretation: lines };
  }

  if (isOrIntrastateAuthorityAsk(q)) {
    const query = fail(
      'Oregon intrastate household-goods authority is an ODOT CCD certificate of authority on the official authorized-movers list (113 current list rows / 113 distinct certificate numbers). Local cartage and other-than-local service overlap and are not extra movers. A USDOT or MC number is not an Oregon certificate. Search the official list or ask with an Oregon certificate number.',
      ['Open Oregon household-goods research.', 'Show current interstate household-goods carriers headquartered in Oregon.'],
    );
    push('Coverage', 'ODOT CCD authorized HHG list — ACQUIRED_CURRENT_SNAPSHOT');
    return { raw: q, query, interpretation: lines };
  }

  if (isIccComplaintAsk(q) && !/\b(?:usdot|dot|mc)\s*#?-?\s*\d{3,8}\b/i.test(q)) {
    const query = fail(
      'Illinois Commerce Commission household-goods complaints are official search / filing, not an acquired bulk table. Federal complaint observations are not a substitute for ICC complaints. Missing bulk complaints is not zero complaints.',
      ['Open Illinois household-goods research.', 'Show complaint observations for USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'ICC complaints — OPEN_SEARCH_ONLY');
    return { raw: q, query, interpretation: lines };
  }

  if (isIlIntrastateAuthorityAsk(q)) {
    const query = fail(
      'Illinois intrastate household-goods authority is an Illinois Commerce Commission Household Goods License, verified in Motor Carrier Information System Entity Search. No complete current roster was acquired. Search-only is not zero. A USDOT or MC number is not ICC authority, and a Public Carrier Certificate is not a household-goods license.',
      ['Open Illinois household-goods research.', 'Show current interstate household-goods carriers headquartered in Illinois.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'ICC current HHG roster — OPEN_SEARCH_ONLY');
    return { raw: q, query, interpretation: lines };
  }

  if (/\bverify (the )?(company|mover).*(quote|estimate)\b/i.test(q)) {
    const query = fail('A quote does not establish regulatory identity. Find the USDOT and MC numbers on the estimate, then research those labeled identifiers.', ['Find USDOT 3244649.', 'What is a USDOT number?']);
    push('Research path', 'Use the quote to locate a labeled USDOT or MC identifier');
    return { raw: q, query, interpretation: lines };
  }

  const named = !isRanking(q) && !isQuote(q) && !isScam(q) && !/\b(?:complaints?|usdot|dot|mc)\b/i.test(q) && !/\bserv(e|es|ing)\b|\bservice (area|territory|coverage)\b/i.test(q) && !/\binterstate movers?\b/i.test(q) ? parseNameRequest(q) : null;
  if (named) {
    if (!named.name || !distinctiveTokens(named.name).length || named.name.length > 80 || /[\x00-\x1f\x7f]/.test(raw)) {
      const query = fail('Enter a distinctive company name (up to 80 characters), or a labeled USDOT/MC identifier. Generic industry words alone do not identify a company.', ['USDOT lookup', 'MC lookup']);
      return { raw: q, query, interpretation: [{ label: 'Name research', value: 'Identity required' }] };
    }
    return { raw: q, query: { mode: 'entity', includeDualRole: true, page: safePage, nameQuery: named.name, nameRequest: named, evidenceFamily: named.task === 'authority' ? 'authority' : undefined },
      interpretation: [{ label: 'Company name', value: named.name }, { label: 'Research task', value: named.task }, { label: 'Match policy', value: 'Source-backed name candidate match; confirm the intended public identity' }] };
  }
  if (/^who owns (?:this|that|the) (?:moving )?company|^how (?:do|can) i check whether (?:a|the) mover is licensed/i.test(q)) {
    return { raw: q, query: fail('Provide the company name or a labeled USDOT/MC identifier to research its stored public evidence. Ownership and license approval are not inferred.', ['USDOT lookup', 'MC lookup']), interpretation: [{label:'Identity',value:'Required'}] };
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

  if ((isRanking(q) || /\bwhich state has better movers\b/i.test(q)) && !detectState(q)) {
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
  if (identity.identifiers.length && isIccComplaintAsk(q)) {
    const query = fail(
      'Illinois Commerce Commission household-goods complaint records are not acquired as a bulk corpus. A labeled USDOT does not substitute ICC complaint evidence with federal complaint observations.',
      ['Open Illinois household-goods research.', 'Show complaint observations for USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'ICC complaints — NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }
  if (identity.identifiers.length && isIlIntrastateAuthorityAsk(q)) {
    const query = fail(
      'A USDOT or MC number does not prove Illinois Commerce Commission household-goods authority. Current ICC Motor Carrier Information System search is the official verification path. Federal authority is a different grain.',
      ['Open Illinois household-goods research.', 'Find USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'ICC current authority — OPEN_SEARCH_ONLY');
    return { raw: q, query, interpretation: lines };
  }
  if (identity.identifiers.length && isNysdotComplaintAsk(q)) {
    const query = fail(
      'NYSDOT household-mover complaint records are not acquired as a bulk corpus. A labeled USDOT does not substitute NYSDOT complaint evidence with federal complaint observations.',
      ['Open New York household-goods research.', 'Show complaint observations for USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'NYSDOT complaints — NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }
  if (identity.identifiers.length && isNyIntrastateAuthorityAsk(q)) {
    const query = fail(
      'A USDOT or MC number does not prove New York intrastate household-goods authority. Current NYSDOT CarCert search is under development. Federal authority is a different grain.',
      ['Open New York household-goods research.', 'Find USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'NYSDOT current authority — NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }
  if (identity.identifiers.length && isOrComplaintAsk(q)) {
    const query = fail(
      'Oregon ODOT CCD household-goods complaint records are not acquired as a bulk corpus. A labeled USDOT does not substitute Oregon complaint evidence with federal complaint observations.',
      ['Open Oregon household-goods research.', 'Show complaint observations for USDOT 3244649.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'ODOT CCD complaints — NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }
  if (
    identity.identifiers.length &&
    mentionsOregon(q) &&
    !/\bheadquarter/i.test(q) &&
    !(/\binterstate\b/i.test(q) && !/\blicen|\bcertificate|\bodot\b/i.test(q))
  ) {
    const query = fail(
      'A USDOT or MC number is not an Oregon household-goods certificate and does not prove ODOT CCD intrastate authority. Confirm the Oregon certificate on the official authorized-movers list. Federal authority is a different grain.',
      ['Open Oregon household-goods research.', 'Find USDOT 3244649.'],
    );
    push('Coverage', 'ODOT CCD certificate is not USDOT/MC');
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
  const floridaIm = /\b(fdacs|intrastate movers?|im registrations?)\b/i.test(q) && !mentionsNewYork(q) && !mentionsIllinois(q) && !mentionsOregon(q);

  if (isIlIntrastateAuthorityAsk(q) || (mentionsIllinois(q) && /\bintrastate movers?\b/i.test(q) && !/\binterstate\b/i.test(q))) {
    const query = fail(
      "Illinois intrastate household-goods authority is ICC. Current Motor Carrier Information System search is official. Search-only is not zero, and another state's registration grain is not a substitute.",
      ['Open Illinois household-goods research.', 'Show current interstate household-goods carriers headquartered in Illinois.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'ICC current roster — OPEN_SEARCH_ONLY');
    return { raw: q, query, interpretation: lines };
  }

  if (isNyIntrastateAuthorityAsk(q) || (mentionsNewYork(q) && /\bintrastate movers?\b/i.test(q))) {
    const query = fail(
      "New York intrastate household-goods authority is NYSDOT. Current CarCert search is under development. A Weekly Bulletin application is not current authority. Search-only is not zero, and another state's registration grain is not a substitute.",
      ['Open New York household-goods research.', 'Show current interstate household-goods carriers headquartered in New York.'],
    );
    query.coverageState = 'NOT_ACQUIRED';
    push('Coverage', 'NYSDOT current roster — NOT_ACQUIRED');
    return { raw: q, query, interpretation: lines };
  }

  if (isOrIntrastateAuthorityAsk(q) || (mentionsOregon(q) && /\bintrastate movers?\b/i.test(q) && !/\binterstate\b/i.test(q))) {
    const query = fail(
      'Oregon intrastate household-goods authority is an ODOT CCD certificate of authority. The accepted authorized list has 113 current rows and 113 distinct certificate numbers. A USDOT or MC number is not that certificate, and local cartage is not other-than-local authority.',
      ['Open Oregon household-goods research.', 'Show current interstate household-goods carriers headquartered in Oregon.'],
    );
    push('Coverage', 'ODOT CCD authorized HHG list — ACQUIRED_CURRENT_SNAPSHOT');
    return { raw: q, query, interpretation: lines };
  }
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
