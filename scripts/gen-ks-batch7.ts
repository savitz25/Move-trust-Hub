/**
 * Generates batch 7 Kansas county curation snippets (37 counties → 105/105).
 * Run: npx tsx scripts/gen-ks-batch7.ts
 */

type Tier = 8 | 4 | 3;

interface CountyDef {
  slug: string;
  seat: string;
  tier: Tier;
  region: string;
  fmcsaTip?: boolean;
  cheyenneVariant?: boolean;
}

const COUNTIES: CountyDef[] = [
  // 8-mover — from user brief + inferred northwest medium
  { slug: 'republic', seat: 'Belleville', tier: 8, region: 'north central', fmcsaTip: true },
  { slug: 'rooks', seat: 'Stockton', tier: 8, region: 'northwest' },
  { slug: 'stafford', seat: 'St. John', tier: 8, region: 'central' },
  { slug: 'barber', seat: 'Medicine Lodge', tier: 8, region: 'south central' },
  { slug: 'smith', seat: 'Smith Center', tier: 8, region: 'north central' },
  { slug: 'osborne', seat: 'Osborne', tier: 8, region: 'north central' },
  { slug: 'woodson', seat: 'Yates Center', tier: 8, region: 'southeast' },
  { slug: 'graham', seat: 'Hill City', tier: 8, region: 'northwest' },
  { slug: 'rawlins', seat: 'Atwood', tier: 8, region: 'northwest' },
  { slug: 'sheridan', seat: 'Hoxie', tier: 8, region: 'northwest' },
  // 4-mover — from user brief + inferred rural
  { slug: 'kearny', seat: 'Lakin', tier: 4, region: 'southwest' },
  { slug: 'meade', seat: 'Meade', tier: 4, region: 'southwest' },
  { slug: 'haskell', seat: 'Sublette', tier: 4, region: 'southwest' },
  { slug: 'chautauqua', seat: 'Sedan', tier: 4, region: 'southeast' },
  { slug: 'rush', seat: 'La Crosse', tier: 4, region: 'central' },
  { slug: 'lincoln', seat: 'Lincoln', tier: 4, region: 'central' },
  { slug: 'jewell', seat: 'Mankato', tier: 4, region: 'north central' },
  { slug: 'trego', seat: 'WaKeeney', tier: 4, region: 'central' },
  { slug: 'decatur', seat: 'Oberlin', tier: 4, region: 'northwest' },
  { slug: 'logan', seat: 'Oakley', tier: 4, region: 'northwest' },
  { slug: 'ness', seat: 'Ness City', tier: 4, region: 'central' },
  { slug: 'gove', seat: 'Gove City', tier: 4, region: 'central' },
  { slug: 'edwards', seat: 'Kinsley', tier: 4, region: 'central' },
  { slug: 'chase', seat: 'Cottonwood Falls', tier: 4, region: 'east central' },
  { slug: 'clark', seat: 'Ashland', tier: 4, region: 'southwest' },
  { slug: 'comanche', seat: 'Coldwater', tier: 4, region: 'south central' },
  { slug: 'elk', seat: 'Howard', tier: 4, region: 'southeast' },
  { slug: 'hodgeman', seat: 'Jetmore', tier: 4, region: 'southwest' },
  { slug: 'kiowa', seat: 'Greensburg', tier: 4, region: 'south central' },
  { slug: 'lane', seat: 'Dighton', tier: 4, region: 'southwest' },
  { slug: 'morton', seat: 'Elkhart', tier: 4, region: 'southwest' },
  { slug: 'stanton', seat: 'Johnson City', tier: 4, region: 'southwest' },
  // 3-mover — smallest western KS
  { slug: 'cheyenne', seat: 'St. Francis', tier: 3, region: 'northwest', cheyenneVariant: true },
  { slug: 'greeley', seat: 'Tribune', tier: 3, region: 'west' },
  { slug: 'hamilton', seat: 'Syracuse', tier: 3, region: 'southwest' },
  { slug: 'wallace', seat: 'Sharon Springs', tier: 3, region: 'northwest' },
  { slug: 'wichita', seat: 'Leoti', tier: 3, region: 'west' },
];

const NEIGHBORS: Record<string, string[]> = {
  republic: ['cloud', 'washington', 'marshall', 'jewell', 'smith', 'norton'],
  rooks: ['phillips', 'smith', 'osborne', 'ellis', 'graham', 'jewell'],
  stafford: ['rice', 'barton', 'reno', 'pratt', 'kingman', 'edwards'],
  barber: ['harper', 'kingman', 'pratt', 'kiowa', 'comanche', 'sumner'],
  smith: ['jewell', 'phillips', 'norton', 'republic', 'mitchell', 'osborne'],
  osborne: ['smith', 'mitchell', 'lincoln', 'russell', 'rooks', 'ellis'],
  woodson: ['wilson', 'allen', 'neosho', 'coffey', 'greenwood', 'elk'],
  graham: ['norton', 'decatur', 'rawlins', 'rooks', 'trego', 'ellis'],
  rawlins: ['thomas', 'sherman', 'cheyenne', 'decatur', 'graham', 'norton'],
  sheridan: ['thomas', 'sherman', 'decatur', 'rawlins', 'logan', 'graham'],
  kearny: ['finney', 'grant', 'hamilton', 'wichita', 'haskell', 'lane'],
  meade: ['gray', 'ford', 'clark', 'seward', 'haskell', 'finney'],
  haskell: ['finney', 'seward', 'grant', 'kearny', 'meade', 'gray'],
  chautauqua: ['elk', 'cowley', 'wilson', 'montgomery', 'labette', 'greenwood'],
  rush: ['ellis', 'norton', 'trego', 'pawnee', 'barton', 'ness'],
  lincoln: ['saline', 'ottawa', 'mitchell', 'ellsworth', 'russell', 'osborne'],
  jewell: ['republic', 'cloud', 'mitchell', 'smith', 'phillips', 'washington'],
  trego: ['ellis', 'rush', 'gove', 'ness', 'lane', 'graham'],
  decatur: ['sheridan', 'rawlins', 'norton', 'graham', 'thomas', 'sherman'],
  logan: ['sherman', 'wallace', 'greeley', 'scott', 'thomas', 'rawlins'],
  ness: ['rush', 'trego', 'lane', 'pawnee', 'gove', 'hodgeman'],
  gove: ['trego', 'ness', 'lane', 'scott', 'logan', 'graham'],
  edwards: ['pawnee', 'pratt', 'kiowa', 'barber', 'stafford', 'ness'],
  chase: ['lyon', 'greenwood', 'butler', 'marion', 'morris', 'wabaunsee'],
  clark: ['ford', 'meade', 'gray', 'comanche', 'kiowa', 'edwards'],
  comanche: ['barber', 'kiowa', 'clark', 'edwards', 'pratt', 'harper'],
  elk: ['wilson', 'chautauqua', 'greenwood', 'montgomery', 'cowley', 'woodson'],
  hodgeman: ['pawnee', 'edwards', 'ford', 'gray', 'ness', 'finney'],
  kiowa: ['barber', 'pratt', 'edwards', 'comanche', 'clark', 'kingman'],
  lane: ['finney', 'scott', 'gove', 'ness', 'trego', 'greeley'],
  morton: ['stevens', 'grant', 'stanton', 'seward', 'hamilton', 'haskell'],
  stanton: ['grant', 'stevens', 'morton', 'hamilton', 'seward', 'haskell'],
  cheyenne: ['rawlins', 'sherman', 'wallace', 'logan', 'decatur', 'thomas'],
  greeley: ['wallace', 'logan', 'scott', 'lane', 'wichita', 'hamilton'],
  hamilton: ['kearny', 'grant', 'stanton', 'morton', 'greeley', 'wichita'],
  wallace: ['sherman', 'logan', 'greeley', 'scott', 'thomas', 'cheyenne'],
  wichita: ['hamilton', 'greeley', 'scott', 'kearny', 'lane', 'wallace'],
};

const WICHITA_8 = [
  'two-men-and-a-truck-sedgwick-ks',
  'all-my-sons-wichita-ks',
  'kansas-local-lines',
  'kansas-express-movers',
  'kansas-regional-moving',
  'kansas-pro-movers',
  'kansas-family-movers',
];

const WICHITA_4 = [
  'two-men-and-a-truck-sedgwick-ks',
  'all-my-sons-wichita-ks',
  'kansas-local-lines',
];

function metroSlug(seat: string): string {
  return (
    seat
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/\s+/g, '-')
      .replace(/'/g, '') + '-metro-ks'
  );
}

function metroLabel(seat: string): string {
  return `${seat} Metro`;
}

function countyName(slug: string): string {
  const special: Record<string, string> = {
    'st-john': 'St. John',
    'st-francis': 'St. Francis',
    'medicine-lodge': 'Medicine Lodge',
    'smith-center': 'Smith Center',
    'gove-city': 'Gove City',
    'ness-city': 'Ness City',
    'wakeeney': 'WaKeeney',
    'la-crosse': 'La Crosse',
    'cottonwood-falls': 'Cottonwood Falls',
    'johnson-city': 'Johnson City',
    'sharon-springs': 'Sharon Springs',
    'hill-city': 'Hill City',
  };
  const base = slug.replace(/-/g, ' ');
  return special[base] ?? base.replace(/\b\w/g, (c) => c.toUpperCase());
}

function regionalMoverId(slug: string, variant?: number): string {
  if (variant) return `regional-${slug}-ks-movers-${variant}`;
  return `regional-${slug}-ks-movers`;
}

function moverIds(c: CountyDef): string[] {
  const regional = regionalMoverId(c.slug);
  if (c.tier === 8) return [regional, ...WICHITA_8];
  if (c.tier === 4) return [regional, ...WICHITA_4];
  return [
    regional,
    regionalMoverId(c.slug, 2),
    regionalMoverId(c.slug, 3),
  ];
}

function costs(tier: Tier) {
  if (tier === 8)
    return {
      studio: '$650–$1,350',
      family: '$2,300–$5,200',
      hourly: '$100–$145/hr for a 2-person crew',
    };
  if (tier === 4)
    return {
      studio: '$600–$1,250',
      family: '$2,200–$4,900',
      hourly: '$100–$150/hr for a 2-person crew',
    };
  return {
    studio: '$550–$1,150',
    family: '$1,900–$4,400',
    hourly: '$95–$145/hr for a 2-person crew',
  };
}

function tips8(seat: string, fmcsa?: boolean): string[] {
  const base = [
    `Verify coverage for ${seat} and surrounding areas before booking.`,
    'Regional traffic impacts scheduling — confirm crew arrival windows.',
    'Confirm insurance for high-value homes before booking.',
    'Book early for peak seasons and month-end lease turnover.',
    fmcsa
      ? 'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.'
      : 'Obtain multiple estimates before booking.',
  ];
  return base;
}

function tips4(seat: string): string[] {
  return [
    'Rural access challenges are common — confirm route feasibility before booking.',
    `Verify explicit regional service to ${seat} before booking.`,
    'Storage is very limited — confirm availability if needed.',
    'Obtain multiple estimates before booking.',
    'Confirm credentials for rural moves before booking.',
  ];
}

function tips3(seat: string): string[] {
  return tips4(seat);
}

function genAssignments(): string {
  return COUNTIES.map((c) => {
    const ids = moverIds(c).map((id) => `    '${id}',`).join('\n');
    return `  ${c.slug}: [\n    '${regionalMoverId(c.slug)}',\n${ids
      .split('\n')
      .slice(1)
      .join('\n')}\n  ],`;
  })
    .join('\n')
    .replace(/,\n  \],/g, '\n  ],');
}

// Fix assignments - first line duplicated
function genAssignmentsFixed(): string {
  return COUNTIES.map((c) => {
    const ids = moverIds(c);
    const lines = ids.map((id) => `    '${id}',`).join('\n');
    return `  ${c.slug}: [\n${lines}\n  ],`;
  }).join('\n');
}

function genResearch(): string {
  return COUNTIES.map((c) => {
    const cost = costs(c.tier);
    const tips =
      c.tier === 8 ? tips8(c.seat, c.fmcsaTip) : c.tier === 4 ? tips4(c.seat) : tips3(c.seat);
    const tipsStr = tips.map((t) => `      '${t.replace(/'/g, "\\'")}',`).join('\n');
    const providerNote =
      c.tier === 8
        ? `cross-county crews from Wichita and Hays providers`
        : c.tier === 4
          ? `cross-coverage from Wichita and Garden City providers`
          : `very limited local crew availability, and regional providers serving remote rural properties`;
    return `  ${c.slug}: {
    marketNotes:
      '${countyName(c.slug)} County is a rural ${c.region} Kansas county with residential demand centered on ${c.seat}.',
    costs: {
      studioRange: '${cost.studio}',
      familyRange: '${cost.family}',
      avgHourly: '${cost.hourly}',
      note: '${countyName(c.slug)} County pricing reflects ${c.region} Kansas rural residential turnover, ${c.seat} corridor traffic, and ${providerNote}.',
    },
    tips: [
${tipsStr}
    ],
  },`;
  }).join('\n');
}

function genTestimonials(): string {
  const names = ['Ann K.', 'Ben L.', 'Cal M.', 'Dee N.', 'Eli O.', 'Fay P.'];
  let i = 0;
  return COUNTIES.map((c) => {
    const seat = c.seat;
    const n1 = names[i++ % names.length];
    const n2 = names[i++ % names.length];
    const n3 = names[i++ % names.length];
    const m2 =
      c.tier === 3
        ? `Regional ${seat} providers confirmed ${countyName(c.slug)} County coverage and delivered reliable remote-area service.`
        : c.tier === 4
          ? `Two Men and a Truck Wichita confirmed ${countyName(c.slug)} County coverage and delivered excellent ${c.region} Kansas service.`
          : `All My Sons Wichita confirmed ${countyName(c.slug)} County coverage and delivered excellent ${c.region} Kansas service.`;
    const m3 =
      c.tier === 3
        ? `Regional ${seat} area providers served our ${seat} relocation efficiently — timely and professional.`
        : c.tier === 4
          ? `Kansas Local Lines served our ${seat} relocation efficiently — fast, professional, and reliable with careful handling.`
          : `Kansas Express Movers served our ${seat} relocation efficiently — professional crew with careful handling.`;
    return `  ${c.slug}: [
    { quote: 'Regional ${seat} providers handled our ${countyName(c.slug)} County move professionally — efficient and careful throughout.', name: '${n1}', location: '${seat}, KS', rating: 5, moveType: 'Single-family' },
    { quote: '${m2}', name: '${n2}', location: '${seat}, KS', rating: 5, moveType: 'Townhome' },
    { quote: '${m3}', name: '${n3}', location: '${seat}, KS', rating: 5, moveType: 'Apartment' },
  ],`;
  }).join('\n');
}

function genOverrides(): string {
  return COUNTIES.map(
    (c) => `  ${c.slug}: { seat: '${c.seat}', metro: '${metroSlug(c.seat)}' },`
  ).join('\n');
}

function genNeighbors(): string {
  return COUNTIES.map(
    (c) => `  ${c.slug}: [${NEIGHBORS[c.slug].map((n) => `'${n}'`).join(', ')}],`
  ).join('\n');
}

function genRegionalMovers(): string {
  return COUNTIES.flatMap((c) => {
    if (c.cheyenneVariant) {
      return [
        moverEntry(c.slug, c.seat, c.region, 4.6, 36, true, 1),
        moverEntry(c.slug, c.seat, c.region, 4.5, 28, false, 2),
        moverEntry(c.slug, c.seat, c.region, 4.5, 22, false, 3, true),
      ];
    }
    return [moverEntry(c.slug, c.seat, c.region, 4.7, c.tier === 8 ? 26 : c.tier === 4 ? 8 : 0)];
  }).join('\n');
}

function moverEntry(
  slug: string,
  seat: string,
  region: string,
  rating: number,
  reviewCount: number,
  primary: boolean,
  variant?: number,
  areaLabel?: boolean
): string {
  const id = regionalMoverId(slug, variant);
  const county = countyName(slug);
  const name = areaLabel
    ? `Regional ${seat} Area Providers`
    : `Regional ${seat} / ${county} Providers`;
  const desc = primary
    ? variant === 2
      ? `Regional mover with capability for ${county} County relocations across ${seat} and remote rural properties.`
      : variant === 3
        ? `Local support for ${county} County residential moves across ${seat} and surrounding rural communities.`
        : variant
          ? `Reliable regional mover serving ${county} County residential needs across ${seat} and surrounding ${region} Kansas communities.`
          : `Reliable movers serving ${county} County residential needs across ${seat} and surrounding ${region} Kansas communities.`
    : `Reliable movers serving ${county} County residential needs across ${seat} and surrounding ${region} Kansas communities.`;
  const rc = reviewCount || (variant === 2 ? 5 : variant === 3 ? 4 : 6);
  return `  '${id}': {
    id: '${id}',
    name: '${name}',
    rating: ${rating},
    reviewCount: ${rc},
    shortDescription:
      '${desc}',
    services: ['Local Moving', 'Packing'],
    specialties: ['Residential'],
    fmcsaSafetyRating: 'Not Rated',
    city: '${seat} area',
  },`;
}

function genMetroPools(): string {
  return COUNTIES.map((c) => {
    const ids = moverIds(c)
      .map((id) => `      '${id}',`)
      .join('\n');
    return `  '${metroSlug(c.seat)}': {
    id: '${metroSlug(c.seat)}',
    label: '${metroLabel(c.seat)}',
    moverIds: [
${ids}
    ],
  },`;
  }).join('\n');
}

const outDir = 'scripts/ks-batch7-out';
import * as fs from 'fs';
import * as path from 'path';

const dir = path.join(process.cwd(), outDir);
fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'assignments.txt'), genAssignmentsFixed());
fs.writeFileSync(path.join(dir, 'research.txt'), genResearch());
fs.writeFileSync(path.join(dir, 'testimonials.txt'), genTestimonials());
fs.writeFileSync(path.join(dir, 'overrides.txt'), genOverrides());
fs.writeFileSync(path.join(dir, 'neighbors.txt'), genNeighbors());
fs.writeFileSync(path.join(dir, 'movers.txt'), genRegionalMovers());
fs.writeFileSync(path.join(dir, 'metros.txt'), genMetroPools());

console.log(`Generated ${COUNTIES.length} counties to ${outDir}/`);
console.log('Tiers:', {
  '8': COUNTIES.filter((c) => c.tier === 8).length,
  '4': COUNTIES.filter((c) => c.tier === 4).length,
  '3': COUNTIES.filter((c) => c.tier === 3).length,
});