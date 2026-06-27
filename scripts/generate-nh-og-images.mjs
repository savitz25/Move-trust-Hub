import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const cities = [
  {
    file: 'new-hampshire-nh',
    title: 'Moving to New Hampshire',
    subtitle: 'Southern Border · Manchester · Seacoast · Capital · Upper Valley',
    costs: ['$2,800 – $6,500', '$5,200 – $10,400', '$7,600 – $13,800', '$11,000 – $19,200'],
    lines: [
      '10 live city guides · No income or sales tax',
      'Boston proximity · strong schools · coastal to mountain',
      'movetrusthub.com/moving-to/new-hampshire',
    ],
  },
  {
    file: 'nashua-nh',
    title: 'Moving to Nashua, NH',
    subtitle: 'Hillsborough County · #1 ranked border city',
    costs: ['$3,000 – $6,500', '$5,500 – $9,800', '$8,000 – $13,200', '$11,800 – $18,500'],
    lines: ['MA border · Boston commuter access', 'Historic downtown · manufacturing hub', 'ZIP 03060'],
  },
  {
    file: 'manchester-nh',
    title: 'Moving to Manchester, NH',
    subtitle: 'Hillsborough County · Largest NH city',
    costs: ['$2,900 – $6,200', '$5,400 – $9,400', '$7,800 – $12,800', '$11,400 – $17,800'],
    lines: ['Millyard revitalization · tech & healthcare', 'Vibrant downtown · airport connectivity', 'ZIP 03101'],
  },
  {
    file: 'portsmouth-nh',
    title: 'Moving to Portsmouth, NH',
    subtitle: 'Rockingham County · Upscale Seacoast',
    costs: ['$3,400 – $7,200', '$6,200 – $10,800', '$9,000 – $14,800', '$13,000 – $20,500'],
    lines: ['Historic Market Square seaport', 'Premium coastal dining & culture', 'ZIP 03801'],
  },
  {
    file: 'bedford-nh',
    title: 'Moving to Bedford, NH',
    subtitle: 'Hillsborough County · Affluent suburb',
    costs: ['$3,200 – $6,800', '$5,800 – $10,400', '$8,400 – $13,800', '$12,400 – $19,200'],
    lines: ['Top-rated schools · high incomes', 'Manchester–Boston corridor value', 'ZIP 03110'],
  },
  {
    file: 'concord-nh',
    title: 'Moving to Concord, NH',
    subtitle: 'Merrimack County · State capital',
    costs: ['$2,800 – $6,000', '$5,200 – $9,200', '$7,600 – $12,400', '$11,000 – $17,400'],
    lines: ['Walkable downtown · government jobs', 'Arts scene · capital-region stability', 'ZIP 03301'],
  },
  {
    file: 'dover-nh',
    title: 'Moving to Dover, NH',
    subtitle: 'Strafford County · Seacoast growth',
    costs: ['$3,000 – $6,400', '$5,400 – $9,600', '$7,800 – $12,800', '$11,200 – $17,600'],
    lines: ['Fast-growing riverside downtown', 'Amtrak access · UNH corridor', 'ZIP 03820'],
  },
  {
    file: 'hanover-nh',
    title: 'Moving to Hanover, NH',
    subtitle: 'Grafton County · Upper Valley',
    costs: ['$3,100 – $6,600', '$5,600 – $9,900', '$8,100 – $13,200', '$11,600 – $18,200'],
    lines: ['Dartmouth College intellectual enclave', 'Scenic I-89 corridor living', 'ZIP 03755'],
  },
  {
    file: 'lebanon-nh',
    title: 'Moving to Lebanon, NH',
    subtitle: 'Grafton County · Medical hub',
    costs: ['$3,100 – $6,600', '$5,600 – $9,900', '$8,100 – $13,200', '$11,600 – $18,200'],
    lines: ['Dartmouth-Hitchcock Medical Center', 'Tech & healthcare employment', 'ZIP 03766'],
  },
  {
    file: 'amherst-nh',
    title: 'Moving to Amherst, NH',
    subtitle: 'Hillsborough County · Classic New England',
    costs: ['$3,000 – $6,500', '$5,500 – $9,800', '$8,000 – $13,000', '$11,500 – $18,000'],
    lines: ['Historic tree-lined town character', 'Excellent schools · rural-suburban prestige', 'ZIP 03031'],
  },
  {
    file: 'merrimack-nh',
    title: 'Moving to Merrimack, NH',
    subtitle: 'Hillsborough County · Suburban hub',
    costs: ['$2,900 – $6,300', '$5,300 – $9,500', '$7,700 – $12,600', '$11,000 – $17,400'],
    lines: ['Between Nashua and Manchester', 'Everett Turnpike corridor growth', 'ZIP 03054'],
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

console.log(`Wrote ${cities.length} NH OG SVGs`);