import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'massachusetts-ma-cost-infographic.svg',
    title: 'Moving to Massachusetts',
    subtitle: 'Greater Boston · Elite Suburbs · MetroWest · Central MA',
    studio: '$3,200 – $6,800',
    two: '$5,800 – $10,200',
    three: '$8,400 – $14,200',
    four: '$12,200 – $19,800',
    lines: ['10 live city guides · elite schools · MBTA transit', 'Tech · healthcare · education economy', 'movetrusthub.com/moving-to/massachusetts'],
  },
  {
    file: 'newton-ma-cost-infographic.svg',
    title: 'Moving to Newton, MA',
    subtitle: 'Middlesex County · Garden City',
    studio: '$3,400 – $7,200',
    two: '$6,200 – $10,800',
    three: '$9,000 – $14,800',
    four: '$13,000 – $20,500',
    lines: ['Elite schools · Green Line · interconnected villages', 'Garden City suburban excellence', 'ZIP 02458'],
  },
  {
    file: 'waltham-ma-cost-infographic.svg',
    title: 'Moving to Waltham, MA',
    subtitle: 'Middlesex County · Watch City',
    studio: '$3,400 – $7,200',
    two: '$6,200 – $10,800',
    three: '$9,000 – $14,800',
    four: '$13,000 – $20,500',
    lines: ['Moody Street scene · Route 128 life sciences', 'Tech & biotech employment corridor', 'ZIP 02451'],
  },
  {
    file: 'somerville-ma-cost-infographic.svg',
    title: 'Moving to Somerville, MA',
    subtitle: 'Middlesex County · Arts Hub',
    studio: '$3,400 – $7,200',
    two: '$6,200 – $10,800',
    three: '$9,000 – $14,800',
    four: '$13,000 – $20,500',
    lines: ['Progressive walkable arts · Green Line Extension', 'Union & Davis Squares', 'ZIP 02144'],
  },
  {
    file: 'brookline-ma-cost-infographic.svg',
    title: 'Moving to Brookline, MA',
    subtitle: 'Norfolk County · Urban-Suburban',
    studio: '$3,400 – $7,200',
    two: '$6,200 – $10,800',
    three: '$9,000 – $14,800',
    four: '$13,000 – $20,500',
    lines: ['Prestigious density · top schools', 'Longwood Medical Area adjacency', 'ZIP 02446'],
  },
  {
    file: 'lexington-ma-cost-infographic.svg',
    title: 'Moving to Lexington, MA',
    subtitle: 'Middlesex County · Historic Suburb',
    studio: '$3,400 – $7,200',
    two: '$6,200 – $10,800',
    three: '$9,000 – $14,800',
    four: '$13,000 – $20,500',
    lines: ['Academic excellence · Battle Green heritage', 'Peaceful tree-lined suburbs', 'ZIP 02420'],
  },
  {
    file: 'cambridge-ma-cost-infographic.svg',
    title: 'Moving to Cambridge, MA',
    subtitle: 'Middlesex County · Innovation Hub',
    studio: '$3,400 – $7,200',
    two: '$6,200 – $10,800',
    three: '$9,000 – $14,800',
    four: '$13,000 – $20,500',
    lines: ['Harvard · MIT · Kendall Square biotech', 'Vibrant squares · global innovation', 'ZIP 02139'],
  },
  {
    file: 'worcester-ma-cost-infographic.svg',
    title: 'Moving to Worcester, MA',
    subtitle: 'Worcester County · Central MA',
    studio: '$2,800 – $5,800',
    two: '$5,200 – $8,800',
    three: '$7,600 – $12,200',
    four: '$11,000 – $17,200',
    lines: ['Revitalizing downtown · colleges · healthcare', 'Affordable Boston alternative', 'ZIP 01608'],
  },
  {
    file: 'malden-ma-cost-infographic.svg',
    title: 'Moving to Malden, MA',
    subtitle: 'Middlesex County · Orange Line',
    studio: '$3,400 – $7,200',
    two: '$6,200 – $10,800',
    three: '$9,000 – $14,800',
    four: '$13,000 – $20,500',
    lines: ['Diverse culinary scene · Orange Line access', 'Transit-oriented urban living', 'ZIP 02148'],
  },
  {
    file: 'framingham-ma-cost-infographic.svg',
    title: 'Moving to Framingham, MA',
    subtitle: 'Middlesex County · MetroWest',
    studio: '$3,400 – $7,200',
    two: '$6,200 – $10,800',
    three: '$9,000 – $14,800',
    four: '$13,000 – $20,500',
    lines: ['MetroWest commercial hub · commuter rail', 'Convenient Boston access', 'ZIP 01702'],
  },
  {
    file: 'quincy-ma-cost-infographic.svg',
    title: 'Moving to Quincy, MA',
    subtitle: 'Norfolk County · City of Presidents',
    studio: '$3,400 – $7,200',
    two: '$6,200 – $10,800',
    three: '$9,000 – $14,800',
    four: '$13,000 – $20,500',
    lines: ['Red Line transit · revitalized downtown', 'Coastal ocean access', 'ZIP 02169'],
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