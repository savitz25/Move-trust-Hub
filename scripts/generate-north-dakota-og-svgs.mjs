import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'north-dakota-nd-cost-infographic.svg',
    title: 'Moving to North Dakota',
    subtitle: 'Peace Garden State · low unemployment · open spaces',
    studio: '$2,100 – $5,200',
    two: '$3,800 – $7,400',
    three: '$5,500 – $9,800',
    four: '$8,000 – $14,200',
    lines: ['10 live city guides · Northern Plains', 'Red River Valley to Bakken corridors', 'movetrusthub.com/moving-to/north-dakota'],
  },
  {
    file: 'fargo-nd-cost-infographic.svg',
    title: 'Moving to Fargo, ND',
    subtitle: 'Cass County · NDSU · Silicon Prairie',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,600',
    three: '$5,800 – $10,000',
    four: '$8,400 – $14,500',
    lines: ['Economic & cultural pioneer', 'Broadway · Island Park · Osgood', 'ZIP 58102'],
  },
  {
    file: 'bismarck-nd-cost-infographic.svg',
    title: 'Moving to Bismarck, ND',
    subtitle: 'Burleigh County · Missouri River Capital',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,600',
    three: '$5,800 – $10,000',
    four: '$8,400 – $14,500',
    lines: ['Polished capital core · state government', 'Cathedral District · North Hills', 'ZIP 58501'],
  },
  {
    file: 'west-fargo-nd-cost-infographic.svg',
    title: 'Moving to West Fargo, ND',
    subtitle: 'Cass County · Family Growth Suburb',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,800',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,800',
    lines: ['Rapidly growing family hub', 'Deer Creek · Aurora · safe neighborhoods', 'ZIP 58078'],
  },
  {
    file: 'grand-forks-nd-cost-infographic.svg',
    title: 'Moving to Grand Forks, ND',
    subtitle: 'Grand Forks County · UND · Grand Sky',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,600',
    three: '$5,800 – $10,000',
    four: '$8,400 – $14,500',
    lines: ['Academic & aerospace oasis', 'Riverside · South End · University Park', 'ZIP 58201'],
  },
  {
    file: 'horace-nd-cost-infographic.svg',
    title: 'Moving to Horace, ND',
    subtitle: 'Cass County · Luxury-Lot Growth',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,800',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,800',
    lines: ['Explosive growth phenomenon', 'Custom homes · acreage subdivisions', 'ZIP 58047'],
  },
  {
    file: 'williston-nd-cost-infographic.svg',
    title: 'Moving to Williston, ND',
    subtitle: 'Williams County · Bakken Energy',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,400',
    three: '$5,800 – $10,000',
    four: '$8,400 – $14,500',
    lines: ['Resilient energy king · Bakken formation', 'Eastside · Westside · oil sector', 'ZIP 58801'],
  },
  {
    file: 'mandan-nd-cost-infographic.svg',
    title: 'Moving to Mandan, ND',
    subtitle: 'Morton County · Historic Western',
    studio: '$2,100 – $4,800',
    two: '$3,800 – $7,000',
    three: '$5,500 – $9,200',
    four: '$8,000 – $13,200',
    lines: ['Historic western alternative', 'Fort Abraham Lincoln · Missouri River', 'ZIP 58554'],
  },
  {
    file: 'dickinson-nd-cost-infographic.svg',
    title: 'Moving to Dickinson, ND',
    subtitle: 'Stark County · Badlands Gateway',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,400',
    three: '$5,800 – $10,000',
    four: '$8,400 – $14,500',
    lines: ['Gateway to Theodore Roosevelt NP', 'Energy sector · West Dickinson', 'ZIP 58601'],
  },
  {
    file: 'wahpeton-nd-cost-infographic.svg',
    title: 'Moving to Wahpeton, ND',
    subtitle: 'Richland County · Red River Valley',
    studio: '$2,100 – $4,800',
    two: '$3,800 – $7,000',
    three: '$5,500 – $9,200',
    four: '$8,000 – $13,200',
    lines: ['Affordable tech-ed capital · NDSCS', 'Breckenridge MN twin city', 'ZIP 58075'],
  },
  {
    file: 'minot-nd-cost-infographic.svg',
    title: 'Moving to Minot, ND',
    subtitle: 'Ward County · Magic City · Minot AFB',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,400',
    three: '$5,800 – $10,000',
    four: '$8,400 – $14,500',
    lines: ['Resilient Magic City', 'North Hill · South Hill · Roosevelt Park Zoo', 'ZIP 58701'],
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