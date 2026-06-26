import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'california-cluster-cost-infographic.svg',
    title: 'Moving to California — 2026 Cluster Overview',
    subtitle: 'Sacramento · Central Valley · Inland Empire · Affordable SoCal',
    studio: '$1,400 – $5,200',
    two: '$2,800 – $8,500',
    three: '$4,500 – $11,800',
    four: '$6,800 – $15,500',
    lines: [
      'Inland affordability vs coastal premiums',
      '10 live city guides: Sacramento to Redding',
      'Default ZIP 95814 · Sacramento',
    ],
  },
  {
    file: 'sacramento-ca-cost-infographic.svg',
    title: 'Moving to Sacramento, CA',
    subtitle: 'State Capital · Sacramento County · Move Trust Hub',
    studio: '$1,400 – $4,600',
    two: '$2,800 – $7,200',
    three: '$4,500 – $9,800',
    four: '$6,800 – $13,200',
    lines: [
      'Bay Area spillover · tech & government jobs',
      'American River lifestyle · Elk Grove & Roseville',
      'ZIP 95814',
    ],
  },
  {
    file: 'riverside-san-bernardino-ca-cost-infographic.svg',
    title: 'Moving to Inland Empire, CA',
    subtitle: 'Riverside & San Bernardino · Move Trust Hub',
    studio: '$1,200 – $4,200',
    two: '$2,400 – $6,800',
    three: '$3,800 – $9,200',
    four: '$5,600 – $12,400',
    lines: [
      'Affordable SoCal housing · logistics jobs',
      'Riverside · San Bernardino · Moreno Valley',
      'ZIP 92501',
    ],
  },
  {
    file: 'bakersfield-ca-cost-infographic.svg',
    title: 'Moving to Bakersfield, CA',
    subtitle: 'Kern County · Central Valley · Move Trust Hub',
    studio: '$1,200 – $4,000',
    two: '$2,200 – $6,400',
    three: '$3,600 – $8,800',
    four: '$5,200 – $11,800',
    lines: [
      'Energy & agriculture economy',
      'Central Valley affordability · country music culture',
      'ZIP 93301',
    ],
  },
  {
    file: 'fresno-ca-cost-infographic.svg',
    title: 'Moving to Fresno, CA',
    subtitle: 'Fresno County · Central Valley · Move Trust Hub',
    studio: '$1,200 – $3,900',
    two: '$2,200 – $6,200',
    three: '$3,500 – $8,400',
    four: '$5,100 – $11,200',
    lines: [
      'Agriculture hub · growing metro',
      'Clovis suburbs · family-friendly living',
      'ZIP 93721',
    ],
  },
  {
    file: 'stockton-ca-cost-infographic.svg',
    title: 'Moving to Stockton, CA',
    subtitle: 'San Joaquin County · Move Trust Hub',
    studio: '$1,200 – $3,800',
    two: '$2,100 – $6,000',
    three: '$3,400 – $8,200',
    four: '$5,000 – $11,000',
    lines: [
      'Port logistics · Delta waterways',
      'Bay Area spillover affordability',
      'ZIP 95202',
    ],
  },
  {
    file: 'modesto-ca-cost-infographic.svg',
    title: 'Moving to Modesto, CA',
    subtitle: 'Stanislaus County · Move Trust Hub',
    studio: '$1,200 – $3,700',
    two: '$2,000 – $5,800',
    three: '$3,300 – $8,000',
    four: '$4,800 – $10,800',
    lines: [
      'Agribusiness hub · Yosemite gateway',
      'Bay Area commute corridor value',
      'ZIP 95354',
    ],
  },
  {
    file: 'san-diego-ca-cost-infographic.svg',
    title: 'Moving to San Diego, CA',
    subtitle: 'San Diego County · Move Trust Hub',
    studio: '$1,600 – $5,400',
    two: '$3,200 – $8,200',
    three: '$5,200 – $11,500',
    four: '$7,600 – $15,200',
    lines: [
      'Biotech & defense · beaches',
      'North County: Carlsbad · Oceanside · Escondido',
      'ZIP 92101',
    ],
  },
  {
    file: 'ventura-oxnard-ca-cost-infographic.svg',
    title: 'Moving to Ventura & Oxnard, CA',
    subtitle: 'Ventura County · Move Trust Hub',
    studio: '$1,400 – $4,800',
    two: '$2,800 – $7,400',
    three: '$4,400 – $9,600',
    four: '$6,400 – $12,800',
    lines: [
      'Coastal Ventura County lifestyle',
      'Agriculture & aerospace corridor',
      'ZIP 93030',
    ],
  },
  {
    file: 'palmdale-lancaster-ca-cost-infographic.svg',
    title: 'Moving to Palmdale & Lancaster, CA',
    subtitle: 'Antelope Valley · Los Angeles County',
    studio: '$1,200 – $4,200',
    two: '$2,400 – $6,600',
    three: '$3,800 – $8,900',
    four: '$5,600 – $11,800',
    lines: [
      'High-desert affordability · aerospace',
      'Master-planned AV communities',
      'ZIP 93550',
    ],
  },
  {
    file: 'redding-ca-cost-infographic.svg',
    title: 'Moving to Redding, CA',
    subtitle: 'Shasta County · Northern California',
    studio: '$1,600 – $4,400',
    two: '$3,000 – $6,800',
    three: '$4,600 – $9,400',
    four: '$6,800 – $12,600',
    lines: [
      'Outdoor gateway · Shasta Lake access',
      'Healthcare hub · lower cost than Bay Area',
      'ZIP 96001',
    ],
  },
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

for (const s of svgs) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${esc(s.title)}">
  <rect width="1200" height="630" fill="#0b1629"/>
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="#132337" stroke="#1e4a6e"/>
  <text x="80" y="110" fill="#ffffff" font-family="system-ui,sans-serif" font-size="36" font-weight="600">${esc(s.title)}</text>
  <text x="80" y="155" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="20">${esc(s.subtitle)}</text>
  <rect x="80" y="200" width="250" height="120" rx="12" fill="#1a3a52"/>
  <text x="100" y="240" fill="#7dd3fc" font-family="system-ui,sans-serif" font-size="16">Studio / 1BR</text>
  <text x="100" y="285" fill="#ffffff" font-family="system-ui,sans-serif" font-size="28" font-weight="600">${s.studio}</text>
  <rect x="360" y="200" width="250" height="120" rx="12" fill="#1a3a52"/>
  <text x="380" y="240" fill="#7dd3fc" font-family="system-ui,sans-serif" font-size="16">2 Bedroom</text>
  <text x="380" y="285" fill="#ffffff" font-family="system-ui,sans-serif" font-size="28" font-weight="600">${s.two}</text>
  <rect x="640" y="200" width="250" height="120" rx="12" fill="#1a3a52"/>
  <text x="660" y="240" fill="#7dd3fc" font-family="system-ui,sans-serif" font-size="16">3 Bedroom</text>
  <text x="660" y="285" fill="#ffffff" font-family="system-ui,sans-serif" font-size="28" font-weight="600">${s.three}</text>
  <rect x="920" y="200" width="240" height="120" rx="12" fill="#1a3a52"/>
  <text x="940" y="240" fill="#7dd3fc" font-family="system-ui,sans-serif" font-size="16">4BR+</text>
  <text x="940" y="285" fill="#ffffff" font-family="system-ui,sans-serif" font-size="28" font-weight="600">${s.four}</text>
  <text x="80" y="400" fill="#cbd5e1" font-family="system-ui,sans-serif" font-size="18">${esc(s.lines[0])}</text>
  <text x="80" y="440" fill="#cbd5e1" font-family="system-ui,sans-serif" font-size="18">${esc(s.lines[1])}</text>
  <text x="80" y="480" fill="#cbd5e1" font-family="system-ui,sans-serif" font-size="18">${esc(s.lines[2])}</text>
  <text x="80" y="540" fill="#64748b" font-family="system-ui,sans-serif" font-size="14">Independent directory · FMCSA-verified movers · movetrusthub.com</text>
</svg>`;
  fs.writeFileSync(path.join(dir, s.file), svg);
  console.log('wrote', s.file);
}