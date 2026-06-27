import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'indiana-in-cost-infographic.svg',
    title: 'Moving to Indiana',
    subtitle: 'Hamilton County · Indianapolis · Heartland · College Towns',
    studio: '$2,400 – $6,200',
    two: '$4,400 – $9,000',
    three: '$6,400 – $12,000',
    four: '$9,200 – $17,200',
    lines: ['10 live city guides · Silicon Heartland growth', 'Exceptional affordability · top-ranked suburbs', 'movetrusthub.com/moving-to/indiana'],
  },
  {
    file: 'carmel-in-cost-infographic.svg',
    title: 'Moving to Carmel, IN',
    subtitle: 'Hamilton County · #1 in America',
    studio: '$2,600 – $6,200',
    two: '$4,800 – $9,000',
    three: '$7,000 – $12,000',
    four: '$10,200 – $17,200',
    lines: ['Master-planned · elite schools · arts district', 'Corporate corridors · top-ranked suburb', 'ZIP 46032'],
  },
  {
    file: 'fishers-in-cost-infographic.svg',
    title: 'Moving to Fishers, IN',
    subtitle: 'Hamilton County · #2 in America',
    studio: '$2,600 – $6,200',
    two: '$4,800 – $9,000',
    three: '$7,000 – $12,000',
    four: '$10,200 – $17,200',
    lines: ['Tech & entrepreneurial growth', 'Geist Reservoir · family-friendly', 'ZIP 46038'],
  },
  {
    file: 'indianapolis-in-cost-infographic.svg',
    title: 'Moving to Indianapolis, IN',
    subtitle: 'Marion County · State Capital',
    studio: '$2,600 – $6,200',
    two: '$4,800 – $9,000',
    three: '$7,000 – $12,000',
    four: '$10,200 – $17,200',
    lines: ['Thriving capital · tech boom', 'Sports & convention culture', 'ZIP 46204'],
  },
  {
    file: 'noblesville-in-cost-infographic.svg',
    title: 'Moving to Noblesville, IN',
    subtitle: 'Hamilton County · County Seat',
    studio: '$2,600 – $6,200',
    two: '$4,800 – $9,000',
    three: '$7,000 – $12,000',
    four: '$10,200 – $17,200',
    lines: ['Historic county seat · suburban acreage', 'Ruoff Music Center access', 'ZIP 46060'],
  },
  {
    file: 'greenwood-in-cost-infographic.svg',
    title: 'Moving to Greenwood, IN',
    subtitle: 'Johnson County · Southside Indy',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,400',
    three: '$6,400 – $11,200',
    four: '$9,200 – $16,400',
    lines: ['Southside commercial hub · parks', 'Short commute to Indianapolis', 'ZIP 46142'],
  },
  {
    file: 'columbus-in-cost-infographic.svg',
    title: 'Moving to Columbus, IN',
    subtitle: 'Bartholomew County · Architectural Gem',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,400',
    three: '$6,400 – $11,200',
    four: '$9,200 – $16,400',
    lines: ['Cummins-powered economy · strong schools', 'Nationally recognized design heritage', 'ZIP 47201'],
  },
  {
    file: 'fort-wayne-in-cost-infographic.svg',
    title: 'Moving to Fort Wayne, IN',
    subtitle: 'Allen County · Second-Largest City',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,400',
    three: '$6,400 – $11,200',
    four: '$9,200 – $16,400',
    lines: ['Riverfront redevelopment · inbound growth', 'Strong value-to-amenity ratio', 'ZIP 46802'],
  },
  {
    file: 'bloomington-in-cost-infographic.svg',
    title: 'Moving to Bloomington, IN',
    subtitle: 'Monroe County · Indiana University',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,400',
    three: '$6,400 – $11,200',
    four: '$9,200 – $16,400',
    lines: ['Vibrant IU college town · arts', 'Outdoor recreation · walkability', 'ZIP 47401'],
  },
  {
    file: 'muncie-in-cost-infographic.svg',
    title: 'Moving to Muncie, IN',
    subtitle: 'Delaware County · Ball State',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,800',
    three: '$6,000 – $10,400',
    four: '$8,800 – $15,200',
    lines: ['Affordable university town · healthcare', 'Ball State corridor value', 'ZIP 47302'],
  },
  {
    file: 'evansville-in-cost-infographic.svg',
    title: 'Moving to Evansville, IN',
    subtitle: 'Vanderburgh County · Tri-State River',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,800',
    three: '$6,000 – $10,400',
    four: '$8,800 – $15,200',
    lines: ['Manufacturing & healthcare hub', 'Low cost of living · Ohio River access', 'ZIP 47708'],
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