const US_STATE_ABBREVS = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]);

export type ParsedHeadquarters = {
  city: string | null;
  state: string | null;
};

/** Parse "City, ST" or "City, State" from directory headquarters. */
export function parseHeadquarters(headquarters: string | null | undefined): ParsedHeadquarters {
  if (!headquarters?.trim()) return { city: null, state: null };

  const parts = headquarters
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length < 2) {
    const maybeState = parts[0]?.toUpperCase();
    if (maybeState && US_STATE_ABBREVS.has(maybeState)) {
      return { city: null, state: maybeState };
    }
    return { city: parts[0] ?? null, state: null };
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