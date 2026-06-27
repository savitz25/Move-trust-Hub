import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'rhode-island-ri-cost-infographic.svg',
    title: 'Moving to Rhode Island',
    subtitle: 'Capital · East Bay · Newport · Northern Suburbs',
    studio: '$3,000 – $6,600',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,400',
    lines: ['10 live city guides · compact coastal state', 'Boston & NYC proximity · elite schools', 'movetrusthub.com/moving-to/rhode-island'],
  },
  {
    file: 'warwick-ri-cost-infographic.svg',
    title: 'Moving to Warwick, RI',
    subtitle: 'Kent County · Airport Corridor',
    studio: '$3,200 – $6,800',
    two: '$5,800 – $10,200',
    three: '$8,400 – $13,600',
    four: '$12,000 – $18,800',
    lines: ['T.F. Green airport · MBTA commuter rail', 'Coastal-suburban value leader', 'ZIP 02886'],
  },
  {
    file: 'cranston-ri-cost-infographic.svg',
    title: 'Moving to Cranston, RI',
    subtitle: 'Providence County · Urban Suburb',
    studio: '$3,200 – $6,800',
    two: '$5,800 – $10,200',
    three: '$8,400 – $13,600',
    four: '$12,000 – $18,800',
    lines: ['Pawtuxet Village walkable charm', 'Diverse bustling Providence-border suburb', 'ZIP 02910'],
  },
  {
    file: 'barrington-ri-cost-infographic.svg',
    title: 'Moving to Barrington, RI',
    subtitle: 'Bristol County · East Bay',
    studio: '$3,600 – $7,400',
    two: '$6,400 – $11,200',
    three: '$9,400 – $15,200',
    four: '$13,600 – $21,200',
    lines: ['Prestigious coastal · top-rated schools', 'Luxury East Bay waterfront', 'ZIP 02806'],
  },
  {
    file: 'east-greenwich-ri-cost-infographic.svg',
    title: 'Moving to East Greenwich, RI',
    subtitle: 'Kent County · Historic Main Street',
    studio: '$3,200 – $6,800',
    two: '$5,800 – $10,200',
    three: '$8,400 – $13,600',
    four: '$12,000 – $18,800',
    lines: ['Upscale historic town · vibrant Main Street', 'Strong schools · Kent County', 'ZIP 02818'],
  },
  {
    file: 'providence-ri-cost-infographic.svg',
    title: 'Moving to Providence, RI',
    subtitle: 'Providence County · Capital',
    studio: '$3,200 – $6,800',
    two: '$5,800 – $10,200',
    three: '$8,400 – $13,600',
    four: '$12,000 – $18,800',
    lines: ['Brown & RISD · arts & food scene', 'Cultural & intellectual capital', 'ZIP 02903'],
  },
  {
    file: 'cumberland-ri-cost-infographic.svg',
    title: 'Moving to Cumberland, RI',
    subtitle: 'Providence County · MA Border',
    studio: '$2,900 – $6,200',
    two: '$5,400 – $9,400',
    three: '$7,800 – $12,800',
    four: '$11,200 – $17,400',
    lines: ['High-growth MA-border suburb', 'Blackstone Valley commuter value', 'ZIP 02864'],
  },
  {
    file: 'north-kingstown-ri-cost-infographic.svg',
    title: 'Moving to North Kingstown, RI',
    subtitle: 'Washington County · South County',
    studio: '$3,200 – $6,800',
    two: '$5,800 – $10,200',
    three: '$8,400 – $13,600',
    four: '$12,000 – $18,800',
    lines: ['Wickford Village harbor charm', 'Scenic coastal · excellent schools', 'ZIP 02852'],
  },
  {
    file: 'bristol-ri-cost-infographic.svg',
    title: 'Moving to Bristol, RI',
    subtitle: 'Bristol County · Historic Waterfront',
    studio: '$3,200 – $6,800',
    two: '$5,800 – $10,200',
    three: '$8,400 – $13,600',
    four: '$12,000 – $18,800',
    lines: ['Historic patriotic waterfront town', 'Roger Williams University', 'ZIP 02809'],
  },
  {
    file: 'newport-ri-cost-infographic.svg',
    title: 'Moving to Newport, RI',
    subtitle: 'Newport County · Luxury Coast',
    studio: '$3,600 – $7,400',
    two: '$6,400 – $11,200',
    three: '$9,400 – $15,200',
    four: '$13,600 – $21,200',
    lines: ['Gilded Age mansions · yachting culture', 'World-famous luxury resort city', 'ZIP 02840'],
  },
  {
    file: 'lincoln-ri-cost-infographic.svg',
    title: 'Moving to Lincoln, RI',
    subtitle: 'Providence County · Northern Suburb',
    studio: '$2,900 – $6,200',
    two: '$5,400 – $9,400',
    three: '$7,800 – $12,800',
    four: '$11,200 – $17,400',
    lines: ['Peaceful historic town · parks', 'Good value near Providence', 'ZIP 02865'],
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