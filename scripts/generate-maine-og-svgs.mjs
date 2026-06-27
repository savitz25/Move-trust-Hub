import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'maine-me-cost-infographic.svg',
    title: 'Moving to Maine',
    subtitle: 'Greater Portland · Cumberland · Coastal · Inland',
    studio: '$2,800 – $6,500',
    two: '$5,200 – $9,800',
    three: '$7,600 – $13,400',
    four: '$11,000 – $18,200',
    lines: ['10 live city guides · Vacationland coastal lifestyle', 'Southern Maine growth · outdoor recreation', 'movetrusthub.com/moving-to/maine'],
  },
  {
    file: 'portland-me-cost-infographic.svg',
    title: 'Moving to Portland, ME',
    subtitle: 'Cumberland County · Greater Portland',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['Coastal cultural capital · Old Port', 'Culinary scene · healthcare · walkability', 'ZIP 04101'],
  },
  {
    file: 'south-portland-me-cost-infographic.svg',
    title: 'Moving to South Portland, ME',
    subtitle: 'Cumberland County · Coastal Commercial',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['Waterfront parks · retail corridors', 'Portland-adjacent coastal convenience', 'ZIP 04106'],
  },
  {
    file: 'gorham-me-cost-infographic.svg',
    title: 'Moving to Gorham, ME',
    subtitle: 'Cumberland County · Suburban Growth',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['Suburban boom · strong schools', 'University of Southern Maine corridor', 'ZIP 04038'],
  },
  {
    file: 'falmouth-me-cost-infographic.svg',
    title: 'Moving to Falmouth, ME',
    subtitle: 'Cumberland County · Affluent Coastal',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['Affluent coastal suburb · top schools', 'Yachting & nature trails', 'ZIP 04105'],
  },
  {
    file: 'standish-me-cost-infographic.svg',
    title: 'Moving to Standish, ME',
    subtitle: 'Cumberland County · Sebago Lake',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['Hyper-growth lakeside town · Sebago Lake', 'Portland corridor proximity', 'ZIP 04084'],
  },
  {
    file: 'brunswick-me-cost-infographic.svg',
    title: 'Moving to Brunswick, ME',
    subtitle: 'Cumberland County · Bowdoin College',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['Historic college town · Bowdoin', 'Walkable downtown · Amtrak access', 'ZIP 04011'],
  },
  {
    file: 'kittery-me-cost-infographic.svg',
    title: 'Moving to Kittery, ME',
    subtitle: 'York County · Border Town',
    studio: '$2,800 – $5,800',
    two: '$5,200 – $8,800',
    three: '$7,400 – $12,000',
    four: '$10,800 – $16,400',
    lines: ['Naval shipyard · outlet shopping', 'Coastal border-town access', 'ZIP 03904'],
  },
  {
    file: 'auburn-me-cost-infographic.svg',
    title: 'Moving to Auburn, ME',
    subtitle: 'Androscoggin County · Inland Growth',
    studio: '$2,500 – $5,200',
    two: '$4,600 – $8,000',
    three: '$6,800 – $11,200',
    four: '$9,800 – $15,400',
    lines: ['Manufacturing corridor · outdoor trails', 'Twin-city inland value', 'ZIP 04210'],
  },
  {
    file: 'lewiston-me-cost-infographic.svg',
    title: 'Moving to Lewiston, ME',
    subtitle: 'Androscoggin County · Twin Cities',
    studio: '$2,500 – $5,200',
    two: '$4,600 – $8,000',
    three: '$6,800 – $11,200',
    four: '$9,800 – $15,400',
    lines: ['Diverse historic city · Bates College', 'Affordable housing · mill district charm', 'ZIP 04240'],
  },
  {
    file: 'bangor-me-cost-infographic.svg',
    title: 'Moving to Bangor, ME',
    subtitle: 'Penobscot County · Central Maine',
    studio: '$2,500 – $5,200',
    two: '$4,600 – $8,000',
    three: '$6,800 – $11,200',
    four: '$9,800 – $15,400',
    lines: ['Central Maine hub · nature access', 'Affordable · stable economy', 'ZIP 04401'],
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