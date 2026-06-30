import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'nevada-nv-cost-infographic.svg',
    title: 'Moving to Nevada',
    subtitle: 'Silver State · no income tax · sunshine',
    studio: '$2,400 – $6,200',
    two: '$4,400 – $9,400',
    three: '$6,400 – $12,800',
    four: '$9,200 – $17,500',
    lines: ['10 live city guides · tax-friendly West', 'Vegas to Tahoe corridors', 'movetrusthub.com/moving-to/nevada'],
  },
  {
    file: 'henderson-nv-cost-infographic.svg',
    title: 'Moving to Henderson, NV',
    subtitle: 'Clark County · Green Valley',
    studio: '$2,800 – $6,400',
    two: '$5,200 – $9,800',
    three: '$7,600 – $13,200',
    four: '$11,000 – $18,500',
    lines: ['Gold standard safety & families', 'Green Valley · Anthem · Seven Hills', 'ZIP 89012'],
  },
  {
    file: 'summerlin-nv-cost-infographic.svg',
    title: 'Moving to Summerlin, NV',
    subtitle: 'Clark County · Red Rock Canyon',
    studio: '$2,800 – $6,400',
    two: '$5,200 – $9,800',
    three: '$7,600 – $13,200',
    four: '$11,000 – $18,500',
    lines: ['Elite master-plan · luxury living', 'The Trails · Downtown Summerlin', 'ZIP 89135'],
  },
  {
    file: 'reno-nv-cost-infographic.svg',
    title: 'Moving to Reno, NV',
    subtitle: 'Washoe County · Truckee River',
    studio: '$2,600 – $6,000',
    two: '$4,800 – $9,000',
    three: '$7,000 – $12,000',
    four: '$10,200 – $16,800',
    lines: ['Biggest Little City · tech hub', 'Midtown · Damonte Ranch', 'ZIP 89501'],
  },
  {
    file: 'sparks-nv-cost-infographic.svg',
    title: 'Moving to Sparks, NV',
    subtitle: 'Washoe County · East Reno',
    studio: '$2,500 – $5,800',
    two: '$4,600 – $8,800',
    three: '$6,800 – $11,600',
    four: '$9,800 – $16,200',
    lines: ['Sparks Marina · Victorian Square', 'Accessible East-Reno alternative', 'ZIP 89431'],
  },
  {
    file: 'north-las-vegas-nv-cost-infographic.svg',
    title: 'Moving to North Las Vegas, NV',
    subtitle: 'Clark County · First-Time Buyer Value',
    studio: '$2,500 – $5,800',
    two: '$4,600 – $8,800',
    three: '$6,800 – $11,600',
    four: '$9,800 – $16,200',
    lines: ['Master-planned growth · Aliante', 'Centennial Hills spillover', 'ZIP 89030'],
  },
  {
    file: 'carson-city-nv-cost-infographic.svg',
    title: 'Moving to Carson City, NV',
    subtitle: 'Capital Corridor · Eagle Valley',
    studio: '$2,600 – $6,000',
    two: '$4,800 – $9,000',
    three: '$7,000 – $12,000',
    four: '$10,200 – $16,800',
    lines: ['Historic capital value · state government', 'Kit Carson Trail · Eagle Valley', 'ZIP 89701'],
  },
  {
    file: 'boulder-city-nv-cost-infographic.svg',
    title: 'Moving to Boulder City, NV',
    subtitle: 'Clark County · Casino-Free Sanctuary',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,400',
    lines: ['Hoover Dam · historic downtown', 'No gaming ordinance · sanctuary charm', 'ZIP 89005'],
  },
  {
    file: 'incline-village-nv-cost-infographic.svg',
    title: 'Moving to Incline Village, NV',
    subtitle: 'Washoe County · Lake Tahoe Luxury',
    studio: '$3,000 – $6,800',
    two: '$5,600 – $10,400',
    three: '$8,200 – $14,000',
    four: '$12,000 – $19,500',
    lines: ['Ultra-luxury alpine paradise', 'Crystal Bay · Tahoe Rim Trail', 'ZIP 89451'],
  },
  {
    file: 'mesquite-nv-cost-infographic.svg',
    title: 'Moving to Mesquite, NV',
    subtitle: 'Clark County · Retirement Golf Hub',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,400',
    lines: ['Sun-drenched retirement · championship golf', 'CasaBlanca · Wolf Creek', 'ZIP 89027'],
  },
  {
    file: 'elko-nv-cost-infographic.svg',
    title: 'Moving to Elko, NV',
    subtitle: 'Elko County · Gold Mining Corridor',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,400',
    lines: ['Mountainous rural workhorse · mining', 'Northeastern Nevada · Jarbidge proximity', 'ZIP 89801'],
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