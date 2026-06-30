import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'maine-me-cost-infographic.svg',
    title: 'Moving to Maine',
    subtitle: 'Pine Tree State · coastal · affordable New England',
    studio: '$2,400 – $6,800',
    two: '$4,400 – $10,200',
    three: '$6,400 – $14,000',
    four: '$9,200 – $19,500',
    lines: ['10 live city guides · Vacationland coastal lifestyle', 'Greater Portland to Bangor corridors', 'movetrusthub.com/moving-to/maine'],
  },
  {
    file: 'portland-me-cost-infographic.svg',
    title: 'Moving to Portland, ME',
    subtitle: 'Cumberland County · Old Port Epicenter',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['World-class food & culture · craft beer', 'Old Port · culinary scene', 'ZIP 04101'],
  },
  {
    file: 'south-portland-me-cost-infographic.svg',
    title: 'Moving to South Portland, ME',
    subtitle: 'Cumberland County · Family Coastal',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['Convenient family balance · Willard Beach', 'Waterfront parks · Portland-adjacent', 'ZIP 04106'],
  },
  {
    file: 'falmouth-me-cost-infographic.svg',
    title: 'Moving to Falmouth, ME',
    subtitle: 'Cumberland County · Elite Suburban',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['Top-tier suburban retreat · elite schools', 'Coastal trails · yachting access', 'ZIP 04105'],
  },
  {
    file: 'biddeford-me-cost-infographic.svg',
    title: 'Moving to Biddeford, ME',
    subtitle: 'York County · Mill Revival',
    studio: '$2,800 – $6,200',
    two: '$5,200 – $9,400',
    three: '$7,600 – $12,800',
    four: '$10,800 – $17,200',
    lines: ['Resurgent creative comeback · historic mills', 'Saco River · downtown revival', 'ZIP 04005'],
  },
  {
    file: 'kennebunk-me-cost-infographic.svg',
    title: 'Moving to Kennebunk, ME',
    subtitle: 'York County · Coastal Luxury',
    studio: '$3,100 – $6,800',
    two: '$5,800 – $10,200',
    three: '$8,400 – $14,000',
    four: '$12,000 – $19,500',
    lines: ['Historic coastal luxury · Kennebunkport', 'Gooch\'s Beach · summer estates', 'ZIP 04043'],
  },
  {
    file: 'brunswick-me-cost-infographic.svg',
    title: 'Moving to Brunswick, ME',
    subtitle: 'Cumberland County · Bowdoin College',
    studio: '$3,000 – $6,500',
    two: '$5,600 – $9,800',
    three: '$8,200 – $13,400',
    four: '$11,800 – $18,200',
    lines: ['Intellectual coastal town · Bowdoin', 'Walkable downtown · Amtrak Midcoast', 'ZIP 04011'],
  },
  {
    file: 'camden-me-cost-infographic.svg',
    title: 'Moving to Camden, ME',
    subtitle: 'Knox County · Jewel of the Coast',
    studio: '$3,100 – $6,800',
    two: '$5,800 – $10,200',
    three: '$8,400 – $14,000',
    four: '$12,000 – $19,500',
    lines: ['Scenic Jewel of the Coast', 'Mountains meet sea · harbor village', 'ZIP 04843'],
  },
  {
    file: 'augusta-me-cost-infographic.svg',
    title: 'Moving to Augusta, ME',
    subtitle: 'Kennebec County · State Capital',
    studio: '$2,400 – $5,200',
    two: '$4,400 – $7,800',
    three: '$6,400 – $10,800',
    four: '$9,200 – $14,800',
    lines: ['Affordable capital value · Kennebec River', 'State employment · Western Avenue', 'ZIP 04330'],
  },
  {
    file: 'lewiston-auburn-me-cost-infographic.svg',
    title: 'Moving to Lewiston / Auburn, ME',
    subtitle: 'Androscoggin County · Twin Cities',
    studio: '$2,400 – $5,200',
    two: '$4,400 – $7,800',
    three: '$6,400 – $10,800',
    four: '$9,200 – $14,800',
    lines: ['Twin Cities industrial value · Bates College', 'Androscoggin River · mill district', 'ZIP 04240'],
  },
  {
    file: 'bangor-me-cost-infographic.svg',
    title: 'Moving to Bangor, ME',
    subtitle: 'Penobscot County · Northern Hub',
    studio: '$2,500 – $5,200',
    two: '$4,600 – $8,000',
    three: '$6,800 – $11,200',
    four: '$9,800 – $15,400',
    lines: ['Practical hub of the north · Acadia gateway', 'Affordable stability · nature access', 'ZIP 04401'],
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