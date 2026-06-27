import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'arkansas-cluster-cost-infographic.svg',
    title: 'Moving to Arkansas',
    subtitle: 'NWA · Central AR · Fort Smith · Jonesboro',
    studio: '$2,000 – $4,400',
    two: '$3,700 – $6,700',
    three: '$5,400 – $9,400',
    four: '$7,700 – $12,600',
    lines: ['10 live city guides · Rogers #1 inbound', 'Walmart & Tyson corporate boom · Ozark recreation', 'movetrusthub.com/moving-to/arkansas'],
  },
  {
    file: 'centerton-ar-cost-infographic.svg',
    title: 'Moving to Centerton, AR',
    subtitle: 'Benton County · Fastest-Growing NWA',
    studio: '$2,100 – $4,200',
    two: '$3,900 – $6,400',
    three: '$5,700 – $8,900',
    four: '$8,100 – $12,000',
    lines: ['Affordable new construction near Bentonville', 'NWA spillover · family subdivisions', 'ZIP 72719'],
  },
  {
    file: 'bella-vista-ar-cost-infographic.svg',
    title: 'Moving to Bella Vista, AR',
    subtitle: 'Benton County · Master-Planned Recreation',
    studio: '$2,100 – $4,200',
    two: '$3,900 – $6,400',
    three: '$5,700 – $8,900',
    four: '$8,100 – $12,000',
    lines: ['Golf courses · lakes · Ozark foothills', 'Retiree & family recreation community', 'ZIP 72714'],
  },
  {
    file: 'little-rock-ar-cost-infographic.svg',
    title: 'Moving to Little Rock, AR',
    subtitle: 'Pulaski County · State Capital',
    studio: '$2,000 – $3,900',
    two: '$3,700 – $5,900',
    three: '$5,400 – $8,200',
    four: '$7,700 – $11,200',
    lines: ['Riverfront · government · banking · healthcare', 'Central Arkansas employment hub', 'ZIP 72201'],
  },
  {
    file: 'fort-smith-ar-cost-infographic.svg',
    title: 'Moving to Fort Smith, AR',
    subtitle: 'Sebastian County · Western Border',
    studio: '$1,900 – $3,800',
    two: '$3,500 – $5,700',
    three: '$5,100 – $7,900',
    four: '$7,300 – $10,800',
    lines: ['Industrial & logistics hub · Oklahoma border', 'Historic downtown revival', 'ZIP 72901'],
  },
  {
    file: 'jonesboro-ar-cost-infographic.svg',
    title: 'Moving to Jonesboro, AR',
    subtitle: 'Craighead County · Northeast Arkansas',
    studio: '$1,900 – $3,800',
    two: '$3,500 – $5,700',
    three: '$5,100 – $7,900',
    four: '$7,300 – $10,800',
    lines: ['Arkansas State University · healthcare growth', 'Agriculture & regional hub', 'ZIP 72401'],
  },
  {
    file: 'rogers-ar-cost-infographic.svg',
    title: 'Moving to Rogers, AR',
    subtitle: 'Benton County · #1 in Arkansas',
    studio: '$2,100 – $4,200',
    two: '$3,900 – $6,400',
    three: '$5,700 – $8,900',
    four: '$8,100 – $12,000',
    lines: ['Beaver Lake · Walmart AMP · downtown shopping', 'High incomes · NWA family living', 'ZIP 72756'],
  },
  {
    file: 'bentonville-ar-cost-infographic.svg',
    title: 'Moving to Bentonville, AR',
    subtitle: 'Benton County · Walmart HQ',
    studio: '$2,200 – $4,400',
    two: '$4,100 – $6,700',
    three: '$6,000 – $9,400',
    four: '$8,500 – $12,600',
    lines: ['Crystal Bridges · Mountain Biking Capital', 'Corporate corridor · Oz Trails', 'ZIP 72712'],
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