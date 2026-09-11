/** R1-005: deterministic name spans and source-field relevance; never identity merging. */
export type NameTask = 'research' | 'authority' | 'classification';
export type NameRequest = { name: string; task: NameTask; condition?: string };
const GENERIC = new Set('moving mover movers move services service company companies corporation corp incorporated inc llc ltd limited storage transportation transport logistics van lines line and the a an of'.split(' '));
export function normalizeName(value: string): string {
  return value.normalize('NFKC').toLowerCase().replace(/&/g, ' and ').replace(/[\u2019']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\s+/g, ' ');
}
export function distinctiveTokens(value: string): string[] { return normalizeName(value).split(' ').filter(t => t && !GENERIC.has(t)); }

/** Name words retain their meaning. Only syntactic task prefixes/suffixes are removed. */
export function parseNameRequest(raw: string): NameRequest | null {
  if (/^who (?!is\b)/i.test(raw.trim())) return null;
  let text = raw.trim().replace(/[?!.]+$/, '').trim();
  if (/\b(?:usdot|dot|mc)\s*(?:#|-|\d)|^(?:how|what|where|why|can|does|show|list|compare)\b|\b(?:vs|versus)\b|^moving from\b/i.test(text)) return null;
  if (/^[\d\s.,+-]+$/.test(text) || /^(?:FL|NJ|NY|CA|TX|WA|CO|VA|Florida|New Jersey|New York|California|Texas|Washington|Colorado|Virginia) (?:intrastate|interstate|licensed|registered|household[- ]goods|movers?\b)/i.test(text)) return null;
  let task: NameTask = 'research', explicit = false, condition: string | undefined;
  const authority = text.match(/^(?:check|verify)(?: the)? (?:authority|licen[cs]e|status) (?:for|of) (.+)$/i);
  if (authority) { text = authority[1]!; task = 'authority'; explicit = true; }
  else if (/^(?:find|check|verify|research|company named|who is)\s+/i.test(text)) { text = text.replace(/^(?:find|check|verify|research|company named|who is)\s+/i, ''); explicit = true; }
  const classification = text.match(/^(?:is\s+)?(.+?)\s+(?:a\s+)?(?:carrier or broker|broker or carrier)$/i);
  const license = text.match(/^(?:is\s+)?(.+?)\s+(?:licen[cs]ed|registered|authorized)(.*)$/i);
  if (classification) { text = classification[1]!; task = 'classification'; explicit = true; }
  else if (license) { text = license[1]!; task = 'authority'; condition = license[2]?.trim() || undefined; explicit = true; }
  const quoted = text.match(/^["\u201c]([^"\u201d]+)["\u201d](.*)$/);
  if (quoted) { text = quoted[1]!; condition = [quoted[2]?.trim(), condition].filter(Boolean).join(' ') || undefined; explicit = true; }
  // A trailing relational clause is a condition, not part of the name. Quoting disambiguates names containing one.
  if (!quoted) { const clause = text.match(/^(.+?)\s+((?:headquartered|based) in .+|(?:in|near|within|with) .+)$/i); if (clause) { text = clause[1]!; condition = [clause[2], condition].filter(Boolean).join(' '); } }
  text = text.trim();
  if (!text || /^(?:is |a |an |the )?(?:this|that|my|your)\b/i.test(text) && !explicit) return null;
  if (!explicit && /^(?:mover|movers|carrier|carriers|broker|brokers|moving compan(?:y|ies))$/i.test(text)) return null;
  if (/^(?:(?:a|an|the|this|that|my)\s+)*(?:mover|moving company|company|carrier|broker)$/i.test(text)) return { name: '', task, condition };
  // Discovery uses plural/common category syntax. Names such as "Florida Active Carrier 7" survive.
  if (/^(?:(?:current|active|licensed|interstate|intrastate|household[- ]goods)\s+)*(?:movers?|carriers?|brokers?)$/i.test(text) || /\b(?:registered with FDACS|headquartered profiles|indexed)\b/i.test(text)) return null;
  if (!explicit && (!/^[\p{L}\p{N} '\u2019&.,()_%-]+$/u.test(text) || text.split(/\s+/).length > 12)) return null;
  if (!explicit && /\b(?:how|whether|from|between|total|many|count|authority|licensed)\b/i.test(text)) return null;
  return { name: text, task, condition };
}
export type NameEvidence = { method: 'source_name'; requested: string; field: 'fmcsa_legal_name' | 'fmcsa_raw.dbaName' | 'name'; returned: string; matchType: 'exact_source_name' | 'normalized_exact_name' | 'distinctive_token_candidate'; normalization: string[]; entityId: string; source: string; rank: number };
export function matchSourceName(requested: string, row: {id: string; name: string; fmcsa_legal_name?: string | null; sourceDba?: string | null}): NameEvidence | null {
  const normalized = normalizeName(requested), tokens = distinctiveTokens(requested);
  if (!tokens.length) return null;
  const fields = [['fmcsa_legal_name', row.fmcsa_legal_name], ['fmcsa_raw.dbaName', row.sourceDba], ['name', row.name]] as const;
  const evidence: NameEvidence[] = [];
  for (const [field, value] of fields) {
    if (!value || typeof value !== 'string') continue;
    const actual = normalizeName(value), words = actual.split(' ');
    const exact = value.trim().toLowerCase() === requested.trim().toLowerCase();
    const normalizedExact = actual === normalized;
    if (!normalizedExact && !tokens.every(t => words.includes(t))) continue;
    evidence.push({ method: 'source_name', requested, field, returned: value, entityId: row.id,
      matchType: exact ? 'exact_source_name' : normalizedExact ? 'normalized_exact_name' : 'distinctive_token_candidate',
      normalization: exact ? ['case and outer whitespace'] : ['case, repeated whitespace, punctuation and ampersand presentation; no location, role, number or legal suffix removed'],
      source: field === 'name' ? 'Published directory display name' : 'Stored FMCSA identity evidence',
      rank: (normalizedExact ? 0 : 10) + (field === 'fmcsa_legal_name' ? 0 : field === 'fmcsa_raw.dbaName' ? 1 : 2) });
  }
  return evidence.sort((a,b) => a.rank-b.rank)[0] ?? null;
}
export const NAME_CANDIDATE_LIMIT = 10;
export const NAME_RETRIEVAL_LIMIT = 100; // Existing RPC hard maximum; no unbounded corpus download.
