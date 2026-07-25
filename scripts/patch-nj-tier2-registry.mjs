import fs from 'node:fs';

const path = 'lib/local-movers/county-intelligence/registry.ts';
let c = fs.readFileSync(path, 'utf8');

const replacements = [
  [
    "import { morrisCountyIntelligence } from '@/lib/local-movers/county-intelligence/morris-nj';",
    "import { morrisCountyTier2Intelligence } from '@/lib/local-movers/county-intelligence/new-jersey/morris-tier2';",
  ],
  [
    "import { mercerCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/mercer-nj';",
    [
      "import { mercerCountyTier2Intelligence } from '@/lib/local-movers/county-intelligence/new-jersey/mercer-tier2';",
      "import { camdenCountyTier2Intelligence } from '@/lib/local-movers/county-intelligence/new-jersey/camden-tier2';",
      "import { burlingtonCountyTier2Intelligence } from '@/lib/local-movers/county-intelligence/new-jersey/burlington-tier2';",
    ].join('\n'),
  ],
  [
    "import { somersetCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/somerset-nj';",
    "import { somersetCountyTier2Intelligence } from '@/lib/local-movers/county-intelligence/new-jersey/somerset-tier2';",
  ],
  ['morrisCountyIntelligence,', 'morrisCountyTier2Intelligence,'],
  [
    'mercerCountyNjIntelligence,',
    'mercerCountyTier2Intelligence,\n  camdenCountyTier2Intelligence,\n  burlingtonCountyTier2Intelligence,',
  ],
  ['somersetCountyNjIntelligence,', 'somersetCountyTier2Intelligence,'],
];

for (const [from, to] of replacements) {
  if (!c.includes(from)) {
    console.warn('missing pattern:', from.slice(0, 80));
  } else {
    c = c.replace(from, to);
  }
}

if (!c.includes('NJ_TIER2_WAVE1')) {
  c = c.replace(
    'export const FL_TIER2_WAVE1 =',
    `export const NJ_TIER2_WAVE1 = [
  'morris',
  'somerset',
  'mercer',
  'camden',
  'burlington',
] as const;

/** NJ Tier 1 core counties — do not rebuild in Tier 2 waves. */
export const NJ_TIER1_CORE = [
  'bergen',
  'essex',
  'hudson',
  'middlesex',
  'union',
  'passaic',
  'monmouth',
  'ocean',
] as const;

export const FL_TIER2_WAVE1 =`
  );
}

fs.writeFileSync(path, c);
console.log('registry patched');
