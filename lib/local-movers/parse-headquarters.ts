import {
  looksLikeStreetAddress,
  sanitizeCityLocality,
} from '@/lib/data-quality/location';

export function isUsStateCode(code: string | null | undefined): boolean {
  return Boolean(code && US_STATE_CODES.has(code.trim().toUpperCase()));
}

const US_STATE_CODES = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]);

/**
 * A ZIP counts only when it sits immediately after a real state code.
 * "FL 33413", "FL, 33413", and "MI 48066-1296" count. A street number,
 * suite number, or bare 5-digit token does not.
 */
export function zipAfterStateCode(raw: string | null | undefined): string | null {
  const text = String(raw ?? '');
  const pattern = /\b([A-Za-z]{2})\b\s*,?\s*(\d{5})(?:-\d{4})?\b/g;
  let zip: string | null = null;
  for (const match of text.matchAll(pattern)) {
    if (!isUsStateCode(match[1])) continue;
    zip = match[2]!;
  }
  return zip;
}

export type ParsedHeadquarters = {
  city: string;
  stateCode?: string;
  /** City field rejected as street/suite fragment */
  cityQuarantined?: boolean;
};

/**
 * Parse "City, ST" / "City, State" / street lines into city + state code.
 * Never invents a state when one is not present in the source string.
 * City is locality-only — street numbers / suite tokens are quarantined.
 */
export function parseHeadquarters(raw: string | null | undefined): ParsedHeadquarters {
  const text = (raw ?? '').trim();
  if (!text) return { city: '' };

  let city = '';
  let stateCode: string | undefined;

  // "City, ST", "City, ST 12345", "City, ST 12345-6789", or "City, ST, 12345".
  // A trailing bare ZIP is not a state. Drop it and read the state from the
  // previous part. Unknown or missing pieces stay unknown — never guess a state.
  let commaParts = text.split(',').map((p) => p.trim()).filter(Boolean);
  if (commaParts.length >= 2 && /^\d{5}(?:-\d{4})?$/.test(commaParts[commaParts.length - 1]!)) {
    commaParts = commaParts.slice(0, -1);
  }
  if (commaParts.length >= 2) {
    const last = commaParts[commaParts.length - 1]!;
    const stateMatch = last.match(/^([A-Za-z]{2})(?:\s+\d{5}(?:-\d{4})?)?$/);
    if (stateMatch) {
      const code = stateMatch[1]!.toUpperCase();
      if (US_STATE_CODES.has(code)) {
        stateCode = code;
        city =
          commaParts.length >= 3
            ? commaParts[commaParts.length - 2]!
            : commaParts[0]!;
      }
    }
    if (!stateCode) {
      // "City, Florida"
      const stateName = last.replace(/\s+\d{5}(?:-\d{4})?$/, '').trim().toLowerCase();
      const fromName = STATE_NAME_TO_CODE[stateName];
      if (fromName) {
        stateCode = fromName;
        city =
          commaParts.length >= 3
            ? commaParts[commaParts.length - 2]!
            : commaParts[0]!;
      }
    }
  }

  if (!stateCode) {
    // Trailing " ST" on a single token line
    const trailing = text.match(/^(.*?)\s+([A-Za-z]{2})$/);
    if (trailing) {
      const code = trailing[2]!.toUpperCase();
      if (US_STATE_CODES.has(code)) {
        city = trailing[1]!.trim();
        stateCode = code;
      }
    }
  }

  if (!city && !stateCode && commaParts.length > 0) {
    const last = commaParts[commaParts.length - 1]!;
    const unknownStateToken = /^[A-Za-z]{2}$/.test(last) && !US_STATE_CODES.has(last.toUpperCase());
    if (commaParts.length === 1) {
      city = commaParts[0]!;
    } else if (unknownStateToken) {
      city = commaParts[commaParts.length - 2]!;
    }
  }

  if (!city && !stateCode) {
    city = text;
  }

  // If multi-part address, prefer non-street segment for city
  if (commaParts.length >= 3 && city && looksLikeStreetAddress(city)) {
    // Try other segments for a clean city
    for (let i = commaParts.length - 2; i >= 0; i--) {
      const candidate = commaParts[i]!;
      if (!looksLikeStreetAddress(candidate) && !US_STATE_CODES.has(candidate.toUpperCase())) {
        city = candidate;
        break;
      }
    }
  }

  const sanitized = sanitizeCityLocality(city);
  return {
    city: sanitized.city,
    stateCode,
    cityQuarantined: sanitized.quarantined,
  };
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
