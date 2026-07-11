const US_STATE_ABBREVS = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]);

const STATE_NAME_TO_CODE: Record<string, string> = {
  alabama: 'AL',
  alaska: 'AK',
  arizona: 'AZ',
  arkansas: 'AR',
  california: 'CA',
  colorado: 'CO',
  connecticut: 'CT',
  delaware: 'DE',
  florida: 'FL',
  georgia: 'GA',
  hawaii: 'HI',
  idaho: 'ID',
  illinois: 'IL',
  indiana: 'IN',
  iowa: 'IA',
  kansas: 'KS',
  kentucky: 'KY',
  louisiana: 'LA',
  maine: 'ME',
  maryland: 'MD',
  massachusetts: 'MA',
  michigan: 'MI',
  minnesota: 'MN',
  mississippi: 'MS',
  missouri: 'MO',
  montana: 'MT',
  nebraska: 'NE',
  nevada: 'NV',
  'new hampshire': 'NH',
  'new jersey': 'NJ',
  'new mexico': 'NM',
  'new york': 'NY',
  'north carolina': 'NC',
  'north dakota': 'ND',
  ohio: 'OH',
  oklahoma: 'OK',
  oregon: 'OR',
  pennsylvania: 'PA',
  'rhode island': 'RI',
  'south carolina': 'SC',
  'south dakota': 'SD',
  tennessee: 'TN',
  texas: 'TX',
  utah: 'UT',
  vermont: 'VT',
  virginia: 'VA',
  washington: 'WA',
  'west virginia': 'WV',
  wisconsin: 'WI',
  wyoming: 'WY',
  'district of columbia': 'DC',
};

export type ParsedHeadquarters = {
  city: string | null;
  state: string | null;
};

function tokenToState(token: string): string | null {
  const upper = token.toUpperCase();
  if (US_STATE_ABBREVS.has(upper)) return upper;
  return STATE_NAME_TO_CODE[token.toLowerCase()] ?? null;
}

/** Parse city/state from "City, ST" or full street addresses like "123 Main St, Honolulu, HI, 96819". */
export function parseHeadquarters(headquarters: string | null | undefined): ParsedHeadquarters {
  if (!headquarters?.trim()) return { city: null, state: null };

  const parts = headquarters
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length < 2) {
    const maybeState = tokenToState(parts[0] ?? '');
    if (maybeState) return { city: null, state: maybeState };
    return { city: parts[0] ?? null, state: null };
  }

  for (let i = parts.length - 1; i >= 0; i--) {
    const segment = parts[i]!;
    const zipStripped = segment.replace(/\s+\d{5}(-\d{4})?$/, '').trim();
    const segmentTokens = zipStripped.split(/\s+/).filter(Boolean);

    for (const token of segmentTokens) {
      const state = tokenToState(token);
      if (!state) continue;
      const cityPart = i > 0 ? parts[i - 1]! : parts[0] ?? null;
      const city = cityPart?.replace(/\s+\d{5}(-\d{4})?$/, '').trim() || null;
      return { city, state };
    }

    const stateZipMatch = zipStripped.match(/^([A-Za-z]{2})$/);
    if (stateZipMatch) {
      const state = tokenToState(stateZipMatch[1]!);
      if (state) {
        const cityPart = i > 0 ? parts[i - 1]! : parts[0] ?? null;
        const city = cityPart?.replace(/\s+\d{5}(-\d{4})?$/, '').trim() || null;
        return { city, state };
      }
    }

    const wholeSegmentState = tokenToState(zipStripped);
    if (wholeSegmentState) {
      const cityPart = i > 0 ? parts[i - 1]! : parts[0] ?? null;
      const city = cityPart?.replace(/\s+\d{5}(-\d{4})?$/, '').trim() || null;
      return { city, state: wholeSegmentState };
    }
  }

  const last = parts[parts.length - 1]!;
  const stateToken = last.split(/\s+/).pop()?.toUpperCase() ?? '';
  const state = US_STATE_ABBREVS.has(stateToken) ? stateToken : null;
  const city = parts[parts.length - 2] ?? parts[0] ?? null;

  return {
    city: city || null,
    state,
  };
}

export function normalizePlace(value: string | null | undefined): string {
  return (value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}