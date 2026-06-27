import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const cities = [
  {
    file: 'ohio-oh',
    title: 'Moving to Ohio',
    subtitle: 'Lake Erie · Columbus · Cincinnati · Western Value · North Coast',
    costs: ['$2,400 – $6,200', '$4,400 – $9,400', '$6,400 – $12,800', '$9,200 – $17,800'],
    lines: [
      '10 live city guides · Silicon Heartland growth',
      'Affordability · manufacturing & healthcare jobs',
      'movetrusthub.com/moving-to/ohio',
    ],
  },
  {
    file: 'mentor-oh',
    title: 'Moving to Mentor, OH',
    subtitle: 'Lake County · #1 ranked Ohio city',
    costs: ['$2,800 – $6,200', '$5,200 – $9,400', '$7,600 – $12,800', '$11,200 – $17,800'],
    lines: ['Lake Erie shoreline · excellent value', 'Job stability · family-friendly', 'ZIP 44060'],
  },
  {
    file: 'parma-oh',
    title: 'Moving to Parma, OH',
    subtitle: 'Cuyahoga County · Safe Cleveland suburb',
    costs: ['$2,800 – $6,200', '$5,200 – $9,400', '$7,600 – $12,800', '$11,200 – $17,800'],
    lines: ['Community-centric suburban living', 'Strong family metrics', 'ZIP 44129'],
  },
  {
    file: 'columbus-oh',
    title: 'Moving to Columbus, OH',
    subtitle: 'Franklin County · Silicon Heartland capital',
    costs: ['$3,200 – $6,800', '$5,800 – $10,200', '$8,400 – $14,000', '$12,400 – $19,500'],
    lines: ['Intel · Google · Amazon corridor', 'Fast-growing state capital', 'ZIP 43215'],
  },
  {
    file: 'cincinnati-oh',
    title: 'Moving to Cincinnati, OH',
    subtitle: 'Hamilton County · Ohio River metro',
    costs: ['$3,000 – $6,500', '$5,500 – $9,800', '$8,000 – $13,500', '$11,800 – $18,800'],
    lines: ['Corporate powerhouse riverfront', 'Arts & food scene', 'ZIP 45202'],
  },
  {
    file: 'cleveland-oh',
    title: 'Moving to Cleveland, OH',
    subtitle: 'Cuyahoga County · Revitalizing metro',
    costs: ['$2,800 – $6,200', '$5,200 – $9,400', '$7,600 – $12,800', '$11,200 – $17,800'],
    lines: ['Healthcare hub · historic architecture', 'Lake Erie affordability', 'ZIP 44114'],
  },
  {
    file: 'hamilton-oh',
    title: 'Moving to Hamilton, OH',
    subtitle: 'Butler County · Creative river city',
    costs: ['$2,400 – $5,200', '$4,500 – $7,800', '$6,500 – $10,500', '$9,400 – $14,800'],
    lines: ['Artistic revival · sports complex', 'Cincinnati metro value', 'ZIP 45011'],
  },
  {
    file: 'springfield-oh',
    title: 'Moving to Springfield, OH',
    subtitle: 'Clark County · Logistics hub',
    costs: ['$2,200 – $4,800', '$4,100 – $7,200', '$5,900 – $9,400', '$8,600 – $13,200'],
    lines: ['Affordable manufacturing corridor', 'Historic neighborhoods', 'ZIP 45503'],
  },
  {
    file: 'lima-oh',
    title: 'Moving to Lima, OH',
    subtitle: 'Allen County · Budget-friendly anchor',
    costs: ['$2,000 – $4,400', '$3,800 – $6,800', '$5,500 – $8,800', '$8,000 – $12,400'],
    lines: ['Extremely budget-friendly housing', 'Manufacturing employment base', 'ZIP 45801'],
  },
  {
    file: 'lorain-oh',
    title: 'Moving to Lorain, OH',
    subtitle: 'Lorain County · Lake Erie port',
    costs: ['$2,300 – $5,000', '$4,200 – $7,400', '$6,200 – $9,800', '$9,000 – $13,800'],
    lines: ['Scenic waterfront parks', 'Short Cleveland commutes', 'ZIP 44052'],
  },
  {
    file: 'sandusky-oh',
    title: 'Moving to Sandusky, OH',
    subtitle: 'Erie County · North Coast gateway',
    costs: ['$2,300 – $5,100', '$4,300 – $7,500', '$6,300 – $10,100', '$9,200 – $14,200'],
    lines: ['Cedar Point corridor · maritime city', 'Revitalized lakefront downtown', 'ZIP 44870'],
  },
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

for (const c of cities) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${esc(c.title)}">
  <rect width="1200" height="630" fill="#0b1629"/>
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="#132337" stroke="#1e4a6e"/>
  <text x="80" y="110" fill="#ffffff" font-family="system-ui,sans-serif" font-size="36" font-weight="600">${esc(c.title)}</text>
  <text x="80" y="155" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="20">${esc(c.subtitle)}</text>
  <rect x="80" y="200" width="250" height="120" rx="12" fill="#1a3a52"/>
  <text x="100" y="240" fill="#7dd3fc" font-family="system-ui,sans-serif" font-size="16">Studio / 1BR</text>
  <text x="100" y="285" fill="#ffffff" font-family="system-ui,sans-serif" font-size="28" font-weight="600">${esc(c.costs[0])}</text>
  <rect x="360" y="200" width="250" height="120" rx="12" fill="#1a3a52"/>
  <text x="380" y="240" fill="#7dd3fc" font-family="system-ui,sans-serif" font-size="16">2 Bedroom</text>
  <text x="380" y="285" fill="#ffffff" font-family="system-ui,sans-serif" font-size="28" font-weight="600">${esc(c.costs[1])}</text>
  <rect x="640" y="200" width="250" height="120" rx="12" fill="#1a3a52"/>
  <text x="660" y="240" fill="#7dd3fc" font-family="system-ui,sans-serif" font-size="16">3 Bedroom</text>
  <text x="660" y="285" fill="#ffffff" font-family="system-ui,sans-serif" font-size="28" font-weight="600">${esc(c.costs[2])}</text>
  <rect x="920" y="200" width="240" height="120" rx="12" fill="#1a3a52"/>
  <text x="940" y="240" fill="#7dd3fc" font-family="system-ui,sans-serif" font-size="16">4BR+</text>
  <text x="940" y="285" fill="#ffffff" font-family="system-ui,sans-serif" font-size="28" font-weight="600">${esc(c.costs[3])}</text>
  <text x="80" y="400" fill="#cbd5e1" font-family="system-ui,sans-serif" font-size="18">${esc(c.lines[0])}</text>
  <text x="80" y="440" fill="#cbd5e1" font-family="system-ui,sans-serif" font-size="18">${esc(c.lines[1])}</text>
  <text x="80" y="480" fill="#cbd5e1" font-family="system-ui,sans-serif" font-size="18">${esc(c.lines[2])}</text>
  <text x="80" y="540" fill="#64748b" font-family="system-ui,sans-serif" font-size="14">Independent directory · FMCSA-verified movers · movetrusthub.com</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${c.file}-cost-infographic.svg`), svg);
}

console.log(`Wrote ${cities.length} Ohio OG SVGs`);