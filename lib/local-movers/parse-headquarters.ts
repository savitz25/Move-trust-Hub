const US_STATE_CODES = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]);

export type ParsedHeadquarters = {
  city: string;
  stateCode?: string;
};

/**
 * Parse "City, ST" / "City, State" / street lines into city + state code.
 * Never invents a state when one is not present in the source string.
 */
export function parseHeadquarters(raw: string | null | undefined): ParsedHeadquarters {
  const text = (raw ?? '').trim();
  if (!text) return { city: '' };

  // "City, ST" or "City, ST 12345" or "123 Main St, City, ST"
  const commaParts = text.split(',').map((p) => p.trim()).filter(Boolean);
  if (commaParts.length >= 2) {
    const last = commaParts[commaParts.length - 1]!;
    const stateMatch = last.match(/^([A-Za-z]{2})(?:\s+\d{5}(?:-\d{4})?)?$/);
    if (stateMatch) {
      const code = stateMatch[1]!.toUpperCase();
      if (US_STATE_CODES.has(code)) {
        const cityPart =
          commaParts.length >= 3
            ? commaParts[commaParts.length - 2]!
            : commaParts[0]!;
        return { city: cityPart, stateCode: code };
      }
    }
    // "City, Florida"
    const stateName = last.replace(/\s+\d{5}(?:-\d{4})?$/, '').trim().toLowerCase();
    const fromName = STATE_NAME_TO_CODE[stateName];
    if (fromName) {
      const cityPart =
        commaParts.length >= 3
          ? commaParts[commaParts.length - 2]!
          : commaParts[0]!;
      return { city: cityPart, stateCode: fromName };
    }
  }

  // Trailing " ST" on a single token line
  const trailing = text.match(/^(.*?)\s+([A-Za-z]{2})$/);
  if (trailing) {
    const code = trailing[2]!.toUpperCase();
    if (US_STATE_CODES.has(code)) {
      return { city: trailing[1]!.trim(), stateCode: code };
    }
  }

  return { city: text };
}

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
