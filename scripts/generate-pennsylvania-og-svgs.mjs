import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'pennsylvania-pa-cost-infographic.svg',
    title: 'Moving to Pennsylvania',
    subtitle: 'Lehigh Valley · Central PA · Philly · Pittsburgh',
    studio: '$2,500 – $5,200',
    two: '$4,600 – $7,800',
    three: '$6,800 – $11,200',
    four: '$9,600 – $15,800',
    lines: ['9 live city guides · Northeast growth state', 'NY/NJ spillover · affordable suburbs', 'movetrusthub.com/moving-to/pennsylvania'],
  },
  {
    file: 'bethlehem-pa-cost-infographic.svg',
    title: 'Moving to Bethlehem, PA',
    subtitle: 'Lehigh Valley · Northampton County',
    studio: '$2,600 – $5,300',
    two: '$4,800 – $7,900',
    three: '$7,000 – $11,400',
    four: '$10,000 – $15,600',
    lines: ['SteelStacks arts · Lehigh University', 'NY/NJ inbound growth corridor', 'ZIP 18015'],
  },
  {
    file: 'allentown-pa-cost-infographic.svg',
    title: 'Moving to Allentown, PA',
    subtitle: 'Lehigh County · Third-largest PA city',
    studio: '$2,500 – $5,200',
    two: '$4,600 – $7,700',
    three: '$6,800 – $11,000',
    four: '$9,600 – $15,200',
    lines: ['Revitalization · logistics & healthcare', 'New housing · strong growth', 'ZIP 18101'],
  },
  {
    file: 'easton-pa-cost-infographic.svg',
    title: 'Moving to Easton, PA',
    subtitle: 'Northampton County · NJ border',
    studio: '$2,500 – $5,100',
    two: '$4,600 – $7,600',
    three: '$6,800 – $10,800',
    four: '$9,600 – $15,000',
    lines: ['Vibrant culinary scene · historic charm', 'Walkable downtown · NJ proximity', 'ZIP 18042'],
  },
  {
    file: 'lancaster-pa-cost-infographic.svg',
    title: 'Moving to Lancaster, PA',
    subtitle: 'Lancaster County · Central PA',
    studio: '$2,400 – $4,900',
    two: '$4,400 – $7,300',
    three: '$6,400 – $10,200',
    four: '$9,200 – $14,400',
    lines: ['Top livability · food & arts culture', 'Amish Country proximity', 'ZIP 17602'],
  },
  {
    file: 'carlisle-mechanicsburg-pa-cost-infographic.svg',
    title: 'Moving to Carlisle & Mechanicsburg, PA',
    subtitle: 'Cumberland County · Central PA',
    studio: '$2,300 – $4,800',
    two: '$4,200 – $7,100',
    three: '$6,200 – $9,800',
    four: '$8,800 – $13,800',
    lines: ['Fast-growing · top schools · affordable', 'Government & healthcare jobs', 'ZIP 17013'],
  },
  {
    file: 'phoenixville-pa-cost-infographic.svg',
    title: 'Moving to Phoenixville, PA',
    subtitle: 'Chester County · Philly suburbs',
    studio: '$2,700 – $5,500',
    two: '$5,000 – $8,200',
    three: '$7,300 – $11,600',
    four: '$10,400 – $16,200',
    lines: ['Brewery & arts reinvention hub', 'Colonial Theatre corridor', 'ZIP 19460'],
  },
  {
    file: 'hatfield-spring-city-pa-cost-infographic.svg',
    title: 'Moving to Hatfield & Spring City, PA',
    subtitle: 'Montgomery & Chester Counties',
    studio: '$2,600 – $5,400',
    two: '$4,800 – $8,000',
    three: '$7,000 – $11,200',
    four: '$10,000 – $15,600',
    lines: ['Affordable Philly-orbit suburbs', 'Route 309 corridor growth', 'ZIP 19440'],
  },
  {
    file: 'pittsburgh-pa-cost-infographic.svg',
    title: 'Moving to Pittsburgh, PA',
    subtitle: 'Allegheny County · Steel City',
    studio: '$2,400 – $4,900',
    two: '$4,400 – $7,300',
    three: '$6,500 – $10,200',
    four: '$9,200 – $14,400',
    lines: ['Tech · robotics · UPMC healthcare', 'Affordable housing · cultural revival', 'ZIP 15222'],
  },
  {
    file: 'philadelphia-pa-cost-infographic.svg',
    title: 'Moving to Philadelphia, PA',
    subtitle: 'Philadelphia County · East Coast metro',
    studio: '$2,800 – $5,800',
    two: '$5,200 – $8,600',
    three: '$7,600 – $11,800',
    four: '$10,800 – $16,800',
    lines: ['Walkable city · young professionals', 'Cheaper than NY/Boston', 'ZIP 19103'],
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