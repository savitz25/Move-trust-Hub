import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'nebraska-ne-cost-infographic.svg',
    title: 'Moving to Nebraska',
    subtitle: 'Cornhusker State · affordability · strong education',
    studio: '$2,100 – $5,200',
    two: '$3,800 – $7,600',
    three: '$5,500 – $10,200',
    four: '$8,000 – $14,500',
    lines: ['10 live city guides · Midwestern stability', 'Omaha to Fremont corridors', 'movetrusthub.com/moving-to/nebraska'],
  },
  {
    file: 'papillion-ne-cost-infographic.svg',
    title: 'Moving to Papillion, NE',
    subtitle: 'Sarpy County · Top-Ranked Suburb',
    studio: '$2,300 – $5,400',
    two: '$4,200 – $7,800',
    three: '$6,200 – $10,400',
    four: '$9,000 – $14,800',
    lines: ['Historic downtown · elite schools', 'Walnut Creek · Tara Hills', 'ZIP 68046'],
  },
  {
    file: 'omaha-ne-cost-infographic.svg',
    title: 'Moving to Omaha, NE',
    subtitle: 'Douglas County · Economic Powerhouse',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,400',
    three: '$5,800 – $9,800',
    four: '$8,400 – $14,200',
    lines: ['Henry Doorly Zoo · College World Series', 'Old Market · Dundee · Aksarben', 'ZIP 68102'],
  },
  {
    file: 'lincoln-ne-cost-infographic.svg',
    title: 'Moving to Lincoln, NE',
    subtitle: 'Lancaster County · Brainy Capital',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,400',
    three: '$5,800 – $9,800',
    four: '$8,400 – $14,200',
    lines: ['University of Nebraska · Haymarket', 'Near South · Irvingdale · Bethany', 'ZIP 68508'],
  },
  {
    file: 'kearney-ne-cost-infographic.svg',
    title: 'Moving to Kearney, NE',
    subtitle: 'Buffalo County · Central Hub',
    studio: '$2,100 – $4,800',
    two: '$3,800 – $7,000',
    three: '$5,500 – $9,200',
    four: '$8,000 – $13,200',
    lines: ['Central hub king · UNK', 'I-80 corridor · Archway', 'ZIP 68847'],
  },
  {
    file: 'gretna-ne-cost-infographic.svg',
    title: 'Moving to Gretna, NE',
    subtitle: 'Sarpy County · Growth Gateway',
    studio: '$2,300 – $5,400',
    two: '$4,200 – $7,800',
    three: '$6,200 – $10,400',
    four: '$9,000 – $14,800',
    lines: ['Explosive growth · Omaha–Lincoln corridor', 'Schramm Park · Arbor Hills', 'ZIP 68028'],
  },
  {
    file: 'la-vista-ne-cost-infographic.svg',
    title: 'Moving to La Vista, NE',
    subtitle: 'Sarpy County · Civic Innovation',
    studio: '$2,200 – $5,000',
    two: '$4,000 – $7,400',
    three: '$5,800 – $9,800',
    four: '$8,400 – $14,200',
    lines: ['City Centre · sports complex', 'Portal Village · civic innovation', 'ZIP 68128'],
  },
  {
    file: 'elkhorn-ne-cost-infographic.svg',
    title: 'Moving to Elkhorn, NE',
    subtitle: 'Douglas County · West Omaha Premium',
    studio: '$2,300 – $5,400',
    two: '$4,200 – $7,800',
    three: '$6,200 – $10,400',
    four: '$9,000 – $14,800',
    lines: ['Elite school enclave · West Omaha', 'Elkhorn Ridge · Fire Ridge', 'ZIP 68022'],
  },
  {
    file: 'columbus-ne-cost-infographic.svg',
    title: 'Moving to Columbus, NE',
    subtitle: 'Platte County · Industrial Hub',
    studio: '$2,100 – $4,800',
    two: '$3,800 – $7,000',
    three: '$5,500 – $9,200',
    four: '$8,000 – $13,200',
    lines: ['Industrial workhorse · agribusiness', 'Behlen corridor · Pawnee Park', 'ZIP 68601'],
  },
  {
    file: 'hastings-ne-cost-infographic.svg',
    title: 'Moving to Hastings, NE',
    subtitle: 'Adams County · College-Town Value',
    studio: '$2,100 – $4,800',
    two: '$3,800 – $7,000',
    three: '$5,500 – $9,200',
    four: '$8,000 – $13,200',
    lines: ['Birthplace of Kool-Aid · Hastings College', 'Brickyard district · college-town value', 'ZIP 68901'],
  },
  {
    file: 'fremont-ne-cost-infographic.svg',
    title: 'Moving to Fremont, NE',
    subtitle: 'Dodge County · Recreation Escape',
    studio: '$2,100 – $4,800',
    two: '$3,800 – $7,000',
    three: '$5,500 – $9,200',
    four: '$8,000 – $13,200',
    lines: ['Fremont Lakes · antique district', 'Recreation escape · John C. Fremont legacy', 'ZIP 68025'],
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