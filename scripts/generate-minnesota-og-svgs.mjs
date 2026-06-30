import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'minnesota-mn-cost-infographic.svg',
    title: 'Moving to Minnesota',
    subtitle: 'Land of 10,000 Lakes · Twin Cities · outdoor lifestyle',
    studio: '$2,400 – $6,400',
    two: '$4,400 – $9,800',
    three: '$6,400 – $13,200',
    four: '$9,200 – $18,500',
    lines: ['10 live city guides · top education · economic stability', 'West metro to Duluth corridors', 'movetrusthub.com/moving-to/minnesota'],
  },
  {
    file: 'plymouth-mn-cost-infographic.svg',
    title: 'Moving to Plymouth, MN',
    subtitle: 'Hennepin County · Medicine Lake',
    studio: '$2,700 – $6,000',
    two: '$5,000 – $9,200',
    three: '$7,400 – $12,400',
    four: '$10,600 – $17,200',
    lines: ['Premium balanced standard · Wayzata schools', 'Medicine Lake · Plymouth Creek', 'ZIP 55447'],
  },
  {
    file: 'eden-prairie-mn-cost-infographic.svg',
    title: 'Moving to Eden Prairie, MN',
    subtitle: 'Hennepin County · Corporate Suburb',
    studio: '$2,700 – $6,000',
    two: '$5,000 – $9,200',
    three: '$7,400 – $12,400',
    four: '$10,600 – $17,200',
    lines: ['Polished corporate suburb · Purgatory Creek', 'DTC equivalent · Eden Prairie Center', 'ZIP 55344'],
  },
  {
    file: 'woodbury-mn-cost-infographic.svg',
    title: 'Moving to Woodbury, MN',
    subtitle: 'Washington County · East Metro',
    studio: '$2,700 – $6,000',
    two: '$5,000 – $9,200',
    three: '$7,400 – $12,400',
    four: '$10,600 – $17,200',
    lines: ['East-metro powerhouse · Viking Lakes', 'Master-planned · Tamarack Village', 'ZIP 55125'],
  },
  {
    file: 'rochester-mn-cost-infographic.svg',
    title: 'Moving to Rochester, MN',
    subtitle: 'Olmsted County · Mayo Clinic',
    studio: '$2,600 – $5,800',
    two: '$4,800 – $8,800',
    three: '$7,000 – $11,800',
    four: '$10,200 – $16,200',
    lines: ['Global med-tech beacon · Mayo Clinic', 'Destination Medical Center', 'ZIP 55901'],
  },
  {
    file: 'maple-grove-mn-cost-infographic.svg',
    title: 'Moving to Maple Grove, MN',
    subtitle: 'Hennepin County · Arbor Lakes',
    studio: '$2,700 – $6,000',
    two: '$5,000 – $9,200',
    three: '$7,400 – $12,400',
    four: '$10,600 – $17,200',
    lines: ['Family & retail favorite · Arbor Lakes', 'Central Park · Elm Creek', 'ZIP 55369'],
  },
  {
    file: 'edina-mn-cost-infographic.svg',
    title: 'Moving to Edina, MN',
    subtitle: 'Hennepin County · Prestige Enclave',
    studio: '$2,900 – $6,400',
    two: '$5,400 – $9,800',
    three: '$7,800 – $13,200',
    four: '$11,200 – $18,500',
    lines: ['Historic prestige · Galleria', 'Centennial Lakes · 50th & France', 'ZIP 55424'],
  },
  {
    file: 'stillwater-mn-cost-infographic.svg',
    title: 'Moving to Stillwater, MN',
    subtitle: 'Washington County · St. Croix River',
    studio: '$2,700 – $6,000',
    two: '$5,000 – $9,200',
    three: '$7,400 – $12,400',
    four: '$10,600 – $17,200',
    lines: ['Historic St. Croix escape · river bluffs', 'Lift bridge charm · downtown', 'ZIP 55082'],
  },
  {
    file: 'eagan-mn-cost-infographic.svg',
    title: 'Moving to Eagan, MN',
    subtitle: 'Dakota County · South Metro',
    studio: '$2,700 – $6,000',
    two: '$5,000 – $9,200',
    three: '$7,400 – $12,400',
    four: '$10,600 – $17,200',
    lines: ['South-metro hub · MSP airport', 'Premium outlets · Lebanon Hills', 'ZIP 55122'],
  },
  {
    file: 'duluth-mn-cost-infographic.svg',
    title: 'Moving to Duluth, MN',
    subtitle: 'St. Louis County · Lake Superior',
    studio: '$2,400 – $5,400',
    two: '$4,400 – $8,000',
    three: '$6,400 – $10,800',
    four: '$9,200 – $15,200',
    lines: ['Rugged outdoor sanctuary · Lake Superior', 'Aerial Lift Bridge · Canal Park', 'ZIP 55802'],
  },
  {
    file: 'wayzata-mn-cost-infographic.svg',
    title: 'Moving to Wayzata, MN',
    subtitle: 'Hennepin County · Lake Minnetonka',
    studio: '$2,900 – $6,400',
    two: '$5,400 – $9,800',
    three: '$7,800 – $13,200',
    four: '$11,200 – $18,500',
    lines: ['Lake Minnetonka luxury · yacht clubs', 'Upscale boutiques · Lafayette Bay', 'ZIP 55391'],
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