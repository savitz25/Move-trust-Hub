/**
 * Safeguard: shared State Resource Hub UI must not hard-code a state name
 * (e.g. "California") into progressive-disclosure labels or headings.
 *
 * Run: node scripts/check-state-hub-no-leakage.mjs
 * Exit 1 on failure.
 */
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SHARED = 'components/local-movers/state-hub/state-resource-hub.tsx';
const BANNED_IN_SHARED = [
  /Show more California/i,
  /California is many markets/i,
  /stateSlug === ['"]california['"]/i,
  /stateCode === ['"]CA['"]\s*\?\s*['"]California['"]/i,
  /`\$\{pack\.stateCode === ['"]CA['"]/i,
];

// Geographic proper nouns that must not appear as hard-coded UI chrome in the shared component.
// Pack-specific content files may (and should) mention their own state.
const src = readFileSync(SHARED, 'utf8');
const failures = [];

for (const re of BANNED_IN_SHARED) {
  if (re.test(src)) {
    failures.push(`Banned pattern in ${SHARED}: ${re}`);
  }
}

// Strip block + line comments before scanning for user-facing string literals.
const srcNoComments = src
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/(^|[^:])\/\/.*$/gm, '$1');

// User-facing string literals that hard-code California (exclude code identifiers).
const jsxStringHits = [
  ...srcNoComments.matchAll(/(['"`])([^'"`]*\bCalifornia\b[^'"`]*)\1/g),
].filter((m) => {
  const s = m[2];
  if (/never hard-code/i.test(s)) return false;
  if (/master template/i.test(s)) return false;
  return true;
});

for (const m of jsxStringHits) {
  failures.push(`Hard-coded California string in shared UI: ${m[0]}`);
}

// Pack files: ensure each pack's challenges.title mentions its own stateSlug mapping, not a foreign state
const PACK_DIR = 'lib/local-movers/state-resource-hub';
const packFiles = readdirSync(PACK_DIR).filter(
  (f) =>
    f.endsWith('.ts') &&
    !['types.ts', 'registry.ts'].includes(f)
);

const STATE_NAMES = {
  california: 'California',
  texas: 'Texas',
  florida: 'Florida',
  'new-york': 'New York',
  georgia: 'Georgia',
  arizona: 'Arizona',
  illinois: 'Illinois',
  pennsylvania: 'Pennsylvania',
  'north-carolina': 'North Carolina',
  washington: 'Washington',
  ohio: 'Ohio',
  colorado: 'Colorado',
  virginia: 'Virginia',
  michigan: 'Michigan',
  'new-jersey': 'New Jersey',
  tennessee: 'Tennessee',
  massachusetts: 'Massachusetts',
  maryland: 'Maryland',
  indiana: 'Indiana',
  missouri: 'Missouri',
  'south-carolina': 'South Carolina',
  minnesota: 'Minnesota',
  wisconsin: 'Wisconsin',
  alabama: 'Alabama',
  louisiana: 'Louisiana',
  kentucky: 'Kentucky',
  oregon: 'Oregon',
  oklahoma: 'Oklahoma',
  connecticut: 'Connecticut',
  iowa: 'Iowa',
  arkansas: 'Arkansas',
  utah: 'Utah',
  kansas: 'Kansas',
  mississippi: 'Mississippi',
  nevada: 'Nevada',
  'new-mexico': 'New Mexico',
  nebraska: 'Nebraska',
  idaho: 'Idaho',
  'west-virginia': 'West Virginia',
  hawaii: 'Hawaii',
  alaska: 'Alaska',
};

for (const file of packFiles) {
  const text = readFileSync(join(PACK_DIR, file), 'utf8');
  const slugMatch = text.match(/stateSlug:\s*['"]([^'"]+)['"]/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  const ownName = STATE_NAMES[slug];
  if (!ownName) continue;

  // If challenges title hardcodes a different famous state name, flag it
  const challengesTitle = text.match(
    /challenges:\s*\{[^}]*title:\s*['"]([^'"]+)['"]/s
  );
  if (challengesTitle) {
    const title = challengesTitle[1];
    for (const [otherSlug, otherName] of Object.entries(STATE_NAMES)) {
      if (otherSlug === slug) continue;
      if (title.includes(otherName)) {
        failures.push(
          `${file}: challenges.title "${title}" mentions foreign state ${otherName}`
        );
      }
    }
  }
}

if (failures.length) {
  console.error('State hub leakage check FAILED:\n' + failures.map((f) => ` - ${f}`).join('\n'));
  process.exit(1);
}

console.log('State hub leakage check passed.');
