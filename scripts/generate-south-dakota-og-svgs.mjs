import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'south-dakota-sd-cost-infographic.svg',
    title: 'Moving to South Dakota',
    subtitle: 'Mount Rushmore State · no income tax · low taxes',
    studio: '$2,100 – $5,200',
    two: '$3,800 – $7,400',
    three: '$5,500 – $9,800',
    four: '$8,000 – $14,200',
    lines: ['10 live city guides · tax-friendly Upper Midwest', 'Sioux Falls to Black Hills corridors', 'movetrusthub.com/moving-to/south-dakota'],
  },
  {
    file: 'sioux-falls-sd-cost-infographic.svg',
    title: 'Moving to Sioux Falls, SD',
    subtitle: 'Minnehaha County · Big Sioux River',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,600',
    three: '$5,800 – $10,000',
    four: '$8,400 – $14,500',
    lines: ['Economic engine · healthcare & finance', 'Downtown Broadway · McKennan Park', 'ZIP 57104'],
  },
  {
    file: 'rapid-city-sd-cost-infographic.svg',
    title: 'Moving to Rapid City, SD',
    subtitle: 'Pennington County · Black Hills Gateway',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,600',
    three: '$5,800 – $10,000',
    four: '$8,400 – $14,500',
    lines: ['Gateway to Mount Rushmore', 'West Rapid · Black Hills adjacency', 'ZIP 57701'],
  },
  {
    file: 'harrisburg-sd-cost-infographic.svg',
    title: 'Moving to Harrisburg, SD',
    subtitle: 'Lincoln County · Master-Planned Growth',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,800',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,800',
    lines: ['Explosive growth winner', 'Liberty Elementary · new subdivisions', 'ZIP 57032'],
  },
  {
    file: 'brookings-sd-cost-infographic.svg',
    title: 'Moving to Brookings, SD',
    subtitle: 'Brookings County · SDSU College Town',
    studio: '$2,100 – $4,900',
    two: '$3,900 – $7,200',
    three: '$5,600 – $9,500',
    four: '$8,200 – $13,800',
    lines: ['Brainy college town · SDSU research', 'Downtown Brookings · university district', 'ZIP 57006'],
  },
  {
    file: 'spearfish-sd-cost-infographic.svg',
    title: 'Moving to Spearfish, SD',
    subtitle: 'Lawrence County · Alpine Black Hills',
    studio: '$2,100 – $4,900',
    two: '$3,900 – $7,200',
    three: '$5,600 – $9,500',
    four: '$8,200 – $13,800',
    lines: ['Alpine sanctuary · Spearfish Canyon', 'BHSU · northern Black Hills', 'ZIP 57783'],
  },
  {
    file: 'brandon-sd-cost-infographic.svg',
    title: 'Moving to Brandon, SD',
    subtitle: 'Minnehaha County · Brandon Valley Schools',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,800',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,800',
    lines: ['Premium school enclave', 'Cul-de-sac family inventory', 'ZIP 57005'],
  },
  {
    file: 'tea-sd-cost-infographic.svg',
    title: 'Moving to Tea, SD',
    subtitle: 'Lincoln County · Commuter Safe-Haven',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,800',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,800',
    lines: ['Neighborly commuter corridor', 'Legacy Parkway · Sioux Falls access', 'ZIP 57064'],
  },
  {
    file: 'watertown-sd-cost-infographic.svg',
    title: 'Moving to Watertown, SD',
    subtitle: 'Codington County · Lake Kampeska',
    studio: '$2,100 – $4,900',
    two: '$3,900 – $7,200',
    three: '$5,600 – $9,500',
    four: '$8,200 – $13,800',
    lines: ['Lakeside recreational retreat', 'Bramble Park Zoo · Glacial Lakes', 'ZIP 57201'],
  },
  {
    file: 'vermillion-sd-cost-infographic.svg',
    title: 'Moving to Vermillion, SD',
    subtitle: 'Clay County · University of South Dakota',
    studio: '$2,100 – $4,900',
    two: '$3,900 – $7,200',
    three: '$5,600 – $9,500',
    four: '$8,200 – $13,800',
    lines: ['Riverfront academic hub · USD', 'Missouri River · Prentis Park', 'ZIP 57069'],
  },
  {
    file: 'box-elder-sd-cost-infographic.svg',
    title: 'Moving to Box Elder, SD',
    subtitle: 'Pennington County · Ellsworth AFB',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,800',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,800',
    lines: ['Booming military corridor', 'Ellsworth Air Force Base · B-1 community', 'ZIP 57719'],
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