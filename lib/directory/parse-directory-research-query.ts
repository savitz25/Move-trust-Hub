export type DirectoryResearchRole = 'Carrier' | 'Broker' | 'Carrier / Broker';
export type DirectoryLocationIntent =
  | 'RECORDED_HQ'
  | 'SERVICE_TERRITORY'
  | 'ROUTE_OR_AVAILABILITY'
  | 'UNSPECIFIED_GEOGRAPHY';

export type DirectoryResearchQueryPlan = {
  originalQuery: string;
  identityQuery: string;
  identifierQuery?: string;
  evidenceClass?: 'Auto Transport';
  role?: DirectoryResearchRole;
  geography?: { stateCode: string; stateName: string; interpretation: 'recorded headquarters' };
  routeStates: string[];
  locationIntent: DirectoryLocationIntent;
  coverageIntent: 'national' | 'regional' | 'state' | 'local' | 'unspecified';
  rankingIntent: boolean;
  priceIntent: boolean;
  researchMode: boolean;
};

const STATES: Record<string, string> = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',DC:'District of Columbia',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'
};

const AUTO_PATTERNS = [
  /\bauto\s+transport(?:er|ers|ation)?(?:\s+compan(?:y|ies))?\b/i,
  /\bvehicle\s+(?:transport(?:er|ers|ation)?|shipping)\b/i,
  /\bcar\s+(?:transport(?:er|ers|ation)?|shipping|carrier|carriers)\b/i,
  /\bship\s+(?:my|a)\s+car\b/i,
  /\btransport\s+my\s+(?:car|vehicle)\b/i,
];

const LEGAL_SUFFIX = /\b(?:llc|inc\.?|corp\.?|corporation|ltd\.?)\s*$/i;
const RANKING = /\b(?:best|top|safest|recommended|most trusted|top[- ]?rated)\b/i;
const PRICE = /\b(?:cheap(?:est)?|lowest\s+price|quote|cost|how\s+much)\b/i;

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractStates(query: string): Array<{ code: string; name: string; match: string }> {
  const matches: Array<{ code: string; name: string; match: string; index: number }> = [];
  for (const [code, name] of Object.entries(STATES)) {
    for (const candidate of [name, code]) {
      const re = new RegExp(`\\b${escapeRegex(candidate).replace(/\\ /g, '\\s+')}\\b`, 'ig');
      for (const match of query.matchAll(re)) {
        matches.push({ code, name, match: match[0], index: match.index ?? 0 });
      }
    }
  }
  return matches.sort((a, b) => a.index - b.index || b.match.length - a.match.length)
    .filter((row, index, all) => !all.slice(0, index).some((prior) => prior.index === row.index));
}

export function parseDirectoryResearchQuery(raw: string): DirectoryResearchQueryPlan {
  const originalQuery = raw.trim();
  const base: DirectoryResearchQueryPlan = {
    originalQuery,
    identityQuery: originalQuery,
    routeStates: [],
    locationIntent: 'UNSPECIFIED_GEOGRAPHY',
    coverageIntent: 'unspecified',
    rankingIntent: RANKING.test(originalQuery),
    priceIntent: PRICE.test(originalQuery),
    researchMode: false,
  };
  if (!originalQuery) return { ...base, identityQuery: '' };
  if (/\b(?:USDOT|DOT|MC)\s*#?\s*\d{3,}\b/i.test(originalQuery)) {
    return { ...base, identifierQuery: originalQuery };
  }
  // Legal-name signals win over structural parsing. This protects names such as
  // “Florida Auto Transport LLC” and “Carrier Moving Inc.”.
  if (LEGAL_SUFFIX.test(originalQuery)) return base;

  const autoPattern = AUTO_PATTERNS.find((pattern) => pattern.test(originalQuery));
  if (!autoPattern) return base;

  let remainder = originalQuery.replace(autoPattern, ' ');
  const routeOrAvailability = /\b(?:to|from|near\s+me|available|availability|ship(?:s|ping)?\s+to)\b/i.test(originalQuery);
  const serving = /\b(?:serve|serves|serving|coverage)\b/i.test(originalQuery);
  const explicitHq = /\b(?:headquartered|headquarters|based)\s+in\b/i.test(originalQuery);
  const states = extractStates(remainder);
  for (const state of states) remainder = remainder.replace(new RegExp(`\\b${escapeRegex(state.match)}\\b`, 'i'), ' ');

  let role: DirectoryResearchRole | undefined = /\bcar\s+carriers?\b/i.test(originalQuery)
    ? 'Carrier'
    : undefined;
  if (/\bcarrier\s*(?:\/|and|\+)?\s*broker\b|\bbroker\s*(?:\/|and|\+)?\s*carrier\b/i.test(remainder)) {
    role = 'Carrier / Broker';
    remainder = remainder.replace(/\bcarrier\s*(?:\/|and|\+)?\s*broker\b|\bbroker\s*(?:\/|and|\+)?\s*carrier\b/ig, ' ');
  } else if (/\bbrokers?\b/i.test(remainder)) {
    role = 'Broker';
    remainder = remainder.replace(/\bbrokers?\b/ig, ' ');
  } else if (/\bcarriers?\b/i.test(remainder)) {
    role = 'Carrier';
    remainder = remainder.replace(/\bcarriers?\b/ig, ' ');
  }

  remainder = remainder
    .replace(/\b(?:headquartered|headquarters|based)\s+in\b/ig, ' ')
    .replace(/\b(?:serve|serves|serving|coverage|to|from|near\s+me|available|availability)\b/ig, ' ')
    .replace(RANKING, ' ').replace(PRICE, ' ')
    .replace(/\b(?:company|companies|provider|providers|research|find|show|me|that)\b/ig, ' ')
    .replace(/\s+/g, ' ').trim();

  const locationIntent: DirectoryLocationIntent = routeOrAvailability
    ? 'ROUTE_OR_AVAILABILITY'
    : serving
      ? 'SERVICE_TERRITORY'
      : states.length || explicitHq
        ? 'RECORDED_HQ'
        : 'UNSPECIFIED_GEOGRAPHY';
  const hqState = locationIntent === 'RECORDED_HQ' ? states.at(-1) : undefined;

  return {
    ...base,
    identityQuery: remainder,
    evidenceClass: 'Auto Transport',
    role,
    geography: hqState
      ? { stateCode: hqState.code, stateName: hqState.name, interpretation: 'recorded headquarters' }
      : undefined,
    routeStates: states.map((state) => state.code),
    locationIntent,
    coverageIntent: states.length ? 'state' : 'unspecified',
    researchMode: true,
  };
}

export function queryPlanServices(plan: DirectoryResearchQueryPlan): string[] {
  const services: string[] = [];
  if (plan.evidenceClass) services.push(plan.evidenceClass);
  if (plan.role) services.push(plan.role);
  return services;
}
