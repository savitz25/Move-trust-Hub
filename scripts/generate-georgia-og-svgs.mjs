import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'georgia-ga-cost-infographic.svg',
    title: 'Moving to Georgia',
    subtitle: 'North Fulton · Metro Atlanta · Coastal · Heartland',
    studio: '$2,600 – $6,500',
    two: '$4,800 – $9,800',
    three: '$7,000 – $13,200',
    four: '$10,400 – $18,500',
    lines: ['10 live city guides · Southeast growth state', 'Tech expansions · elite schools · coastal ports', 'movetrusthub.com/moving-to/georgia'],
  },
  {
    file: 'johns-creek-ga-cost-infographic.svg',
    title: 'Moving to Johns Creek, GA',
    subtitle: 'Fulton County · #1 in Georgia',
    studio: '$2,800 – $6,500',
    two: '$5,200 – $9,800',
    three: '$7,600 – $13,200',
    four: '$11,200 – $18,500',
    lines: ['Elite schools · high incomes · medical facilities', 'Safe neighborhoods · North Fulton prestige', 'ZIP 30097'],
  },
  {
    file: 'alpharetta-ga-cost-infographic.svg',
    title: 'Moving to Alpharetta, GA',
    subtitle: 'Fulton County · Technology City',
    studio: '$2,800 – $6,500',
    two: '$5,200 – $9,800',
    three: '$7,600 – $13,200',
    four: '$11,200 – $18,500',
    lines: ['Technology City of the South · Avalon', 'Tech jobs · corporate corridors', 'ZIP 30009'],
  },
  {
    file: 'roswell-ga-cost-infographic.svg',
    title: 'Moving to Roswell, GA',
    subtitle: 'Fulton County · Historic River Town',
    studio: '$2,800 – $6,500',
    two: '$5,200 – $9,800',
    three: '$7,600 – $13,200',
    four: '$11,200 – $18,500',
    lines: ['Walkable Canton Street · Chattahoochee access', 'Historic river community charm', 'ZIP 30075'],
  },
  {
    file: 'atlanta-ga-cost-infographic.svg',
    title: 'Moving to Atlanta, GA',
    subtitle: 'Fulton County · State Capital',
    studio: '$2,800 – $6,500',
    two: '$5,200 – $9,800',
    three: '$7,600 – $13,200',
    four: '$11,200 – $18,500',
    lines: ['BeltLine · airline hub · entertainment', 'Cultural & economic heart of the South', 'ZIP 30303'],
  },
  {
    file: 'decatur-ga-cost-infographic.svg',
    title: 'Moving to Decatur, GA',
    subtitle: 'DeKalb County · Progressive Metro',
    studio: '$2,600 – $6,000',
    two: '$4,800 – $9,200',
    three: '$7,000 – $12,400',
    four: '$10,400 – $17,200',
    lines: ['MARTA access · tight-knit community', 'Progressive college-town feel', 'ZIP 30030'],
  },
  {
    file: 'smyrna-ga-cost-infographic.svg',
    title: 'Moving to Smyrna, GA',
    subtitle: 'Cobb County · Jonquil City',
    studio: '$2,600 – $6,000',
    two: '$4,800 – $9,200',
    three: '$7,000 – $12,400',
    four: '$10,400 – $17,200',
    lines: ['Truist Park convenience · retail growth', 'Jonquil City family character', 'ZIP 30080'],
  },
  {
    file: 'cumming-ga-cost-infographic.svg',
    title: 'Moving to Cumming, GA',
    subtitle: 'Forsyth County · Lake Lanier',
    studio: '$2,600 – $6,000',
    two: '$4,800 – $9,200',
    three: '$7,000 – $12,400',
    four: '$10,400 – $17,200',
    lines: ['Fast-growing exurban · low taxes', 'Lake Lanier lifestyle access', 'ZIP 30040'],
  },
  {
    file: 'savannah-ga-cost-infographic.svg',
    title: 'Moving to Savannah, GA',
    subtitle: 'Chatham County · Historic Coast',
    studio: '$2,600 – $6,000',
    two: '$4,800 – $9,200',
    three: '$7,000 – $12,400',
    four: '$10,400 – $17,200',
    lines: ['Historic coastal jewel · port growth', 'Tourism economy · Forsyth Park charm', 'ZIP 31401'],
  },
  {
    file: 'warner-robins-ga-cost-infographic.svg',
    title: 'Moving to Warner Robins, GA',
    subtitle: 'Houston County · Robins AFB',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,400',
    three: '$6,400 – $11,200',
    four: '$9,400 – $16,200',
    lines: ['Defense & aerospace hub · affordability', 'Robins Air Force Base stability', 'ZIP 31088'],
  },
  {
    file: 'pooler-ga-cost-infographic.svg',
    title: 'Moving to Pooler, GA',
    subtitle: 'Chatham County · Coastal Boomtown',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,400',
    three: '$6,400 – $11,200',
    four: '$9,400 – $16,200',
    lines: ['Hyundai EV plant influence · rapid growth', 'I-95 coastal expansion corridor', 'ZIP 31322'],
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