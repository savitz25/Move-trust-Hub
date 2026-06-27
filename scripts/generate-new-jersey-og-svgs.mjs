import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'new-jersey-nj-cost-infographic.svg',
    title: 'Moving to New Jersey',
    subtitle: 'Hudson Waterfront · Gateway · Suburbs · South Jersey',
    studio: '$2,800 – $5,800',
    two: '$5,200 – $8,800',
    three: '$7,600 – $12,200',
    four: '$10,800 – $17,500',
    lines: ['10 live city guides · NYC commuter state', 'PATH · NJ Transit · Midtown Direct', 'movetrusthub.com/moving-to/new-jersey'],
  },
  {
    file: 'jersey-city-nj-cost-infographic.svg',
    title: 'Moving to Jersey City, NJ',
    subtitle: 'Hudson Waterfront · Gold Coast',
    studio: '$3,000 – $6,200',
    two: '$5,600 – $9,200',
    three: '$8,200 – $13,200',
    four: '$11,800 – $18,400',
    lines: ['Manhattan skyline views · PATH/Ferry', 'Diverse dining · urban waterfront', 'ZIP 07302'],
  },
  {
    file: 'hoboken-nj-cost-infographic.svg',
    title: 'Moving to Hoboken, NJ',
    subtitle: 'Walkable Grid · Young Professionals',
    studio: '$3,100 – $6,400',
    two: '$5,800 – $9,500',
    three: '$8,400 – $13,600',
    four: '$12,000 – $18,800',
    lines: ['Lively nightlife · tight-knit community', 'PATH trains · waterfront parks', 'ZIP 07030'],
  },
  {
    file: 'clifton-nj-cost-infographic.svg',
    title: 'Moving to Clifton, NJ',
    subtitle: 'Passaic County · Suburban-Urban',
    studio: '$2,700 – $5,500',
    two: '$5,000 – $8,400',
    three: '$7,300 – $11,600',
    four: '$10,400 – $16,200',
    lines: ['Parks · strong schools · regional value', 'Route 3 & GSP corridor access', 'ZIP 07011'],
  },
  {
    file: 'morristown-nj-cost-infographic.svg',
    title: 'Moving to Morristown, NJ',
    subtitle: 'Morris County · #1 Desirable Suburb',
    studio: '$2,900 – $5,900',
    two: '$5,400 – $8,900',
    three: '$7,900 – $12,400',
    four: '$11,200 – $17,200',
    lines: ['Historic downtown · top schools', 'Direct Midtown train · Green corridor', 'ZIP 07960'],
  },
  {
    file: 'montclair-nj-cost-infographic.svg',
    title: 'Moving to Montclair, NJ',
    subtitle: 'Essex County · Arts & Culture',
    studio: '$3,000 – $6,100',
    two: '$5,600 – $9,200',
    three: '$8,200 – $13,000',
    four: '$11,800 – $18,000',
    lines: ['Walkable restaurant scene · Midtown Direct', 'Independent retail · arts hub', 'ZIP 07042'],
  },
  {
    file: 'princeton-nj-cost-infographic.svg',
    title: 'Moving to Princeton, NJ',
    subtitle: 'Mercer County · Ivy League',
    studio: '$2,900 – $6,000',
    two: '$5,400 – $8,900',
    three: '$7,900 – $12,400',
    four: '$11,200 – $17,400',
    lines: ['Ivy League prestige · top schools', 'Upscale walkable downtown', 'ZIP 08540'],
  },
  {
    file: 'bayonne-nj-cost-infographic.svg',
    title: 'Moving to Bayonne, NJ',
    subtitle: 'Hudson Peninsula · Waterfront',
    studio: '$2,600 – $5,400',
    two: '$4,800 – $8,000',
    three: '$7,000 – $11,200',
    four: '$10,000 – $15,600',
    lines: ['Peaceful peninsula · affordability', 'Waterfront living · NYC access', 'ZIP 07002'],
  },
  {
    file: 'vineland-nj-cost-infographic.svg',
    title: 'Moving to Vineland, NJ',
    subtitle: 'Cumberland County · South Jersey',
    studio: '$2,300 – $4,800',
    two: '$4,200 – $7,100',
    three: '$6,200 – $9,800',
    four: '$8,800 – $13,600',
    lines: ['Affordable South Jersey · space & acreage', 'Farm-to-table appeal · Philly corridor', 'ZIP 08360'],
  },
  {
    file: 'union-city-nj-cost-infographic.svg',
    title: 'Moving to Union City, NJ',
    subtitle: 'Hudson County · Bergenline',
    studio: '$2,800 – $5,700',
    two: '$5,200 – $8,600',
    three: '$7,600 – $12,000',
    four: '$10,800 – $16,800',
    lines: ['Spectacular Manhattan views · diversity', 'Fast commutes · high-energy corridor', 'ZIP 07087'],
  },
  {
    file: 'passaic-elizabeth-nj-cost-infographic.svg',
    title: 'Moving to Passaic & Elizabeth, NJ',
    subtitle: 'Gateway Cities · NJ Transit Hubs',
    studio: '$2,500 – $5,200',
    two: '$4,600 – $7,800',
    three: '$6,800 – $10,800',
    four: '$9,600 – $15,200',
    lines: ['Historic riverside · cultural diversity', 'Transportation hubs · gateway value', 'ZIP 07201'],
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