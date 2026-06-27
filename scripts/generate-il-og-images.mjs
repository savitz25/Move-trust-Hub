import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const cities = [
  {
    file: 'illinois-il',
    title: 'Moving to Illinois',
    subtitle: 'Premier NW · Corporate Transit · Fox Valley · Downstate',
    costs: ['$2,800 – $6,800', '$5,200 – $10,200', '$7,600 – $13,600', '$11,200 – $18,400'],
    lines: [
      '10 live city guides · Chicagoland suburbs',
      'Excellent schools & transit · Downstate value',
      'movetrusthub.com/moving-to/illinois',
    ],
  },
  {
    file: 'buffalo-grove-il',
    title: 'Moving to Buffalo Grove, IL',
    subtitle: 'Lake County · #1 ranked Illinois city',
    costs: ['$3,200 – $6,800', '$5,800 – $10,200', '$8,400 – $13,800', '$12,200 – $19,200'],
    lines: ['A+ safety & schools', 'Affluent family suburb', 'ZIP 60089'],
  },
  {
    file: 'naperville-il',
    title: 'Moving to Naperville, IL',
    subtitle: 'DuPage County · #26 nationally',
    costs: ['$3,400 – $7,000', '$6,000 – $10,600', '$8,800 – $14,400', '$12,800 – $19,800'],
    lines: ['Renowned riverwalk downtown', 'Top schools · thriving downtown', 'ZIP 60540'],
  },
  {
    file: 'arlington-heights-il',
    title: 'Moving to Arlington Heights, IL',
    subtitle: 'Cook County · Walkable Metra hub',
    costs: ['$3,200 – $6,900', '$5,900 – $10,400', '$8,600 – $14,100', '$12,500 – $19,500'],
    lines: ['Walkable downtown', 'Metra transit · vibrant community', 'ZIP 60004'],
  },
  {
    file: 'palatine-il',
    title: 'Moving to Palatine, IL',
    subtitle: 'Cook County · Balanced suburban',
    costs: ['$3,100 – $6,700', '$5,700 – $10,100', '$8,300 – $13,600', '$12,100 – $18,900'],
    lines: ['Green space & parks', 'Reliable Chicago access', 'ZIP 60067'],
  },
  {
    file: 'bolingbrook-il',
    title: 'Moving to Bolingbrook, IL',
    subtitle: 'Will County · Logistics hub',
    costs: ['$3,000 – $6,500', '$5,500 – $9,800', '$8,000 – $13,200', '$11,800 – $18,400'],
    lines: ['Master-planned communities', 'Logistics & retail employment', 'ZIP 60440'],
  },
  {
    file: 'elgin-il',
    title: 'Moving to Elgin, IL',
    subtitle: 'Kane County · Fox River city',
    costs: ['$2,900 – $6,400', '$5,400 – $9,600', '$7,800 – $12,900', '$11,400 – $17,600'],
    lines: ['Historic riverfront', 'Affordable entry · Fox River trails', 'ZIP 60120'],
  },
  {
    file: 'bloomington-il',
    title: 'Moving to Bloomington, IL',
    subtitle: 'McLean County · Downstate hub',
    costs: ['$2,800 – $6,200', '$5,200 – $9,400', '$7,500 – $12,400', '$11,000 – $17,200'],
    lines: ['State Farm headquarters', 'Illinois State University', 'ZIP 61701'],
  },
  {
    file: 'schaumburg-il',
    title: 'Moving to Schaumburg, IL',
    subtitle: 'Cook County · Corporate powerhouse',
    costs: ['$3,100 – $6,700', '$5,700 – $10,100', '$8,200 – $13,500', '$11,900 – $18,200'],
    lines: ['Woodfield Mall corridor', 'Corporate & healthcare hub', 'ZIP 60193'],
  },
  {
    file: 'des-plaines-il',
    title: 'Moving to Des Plaines, IL',
    subtitle: 'Cook County · O\'Hare proximity',
    costs: ['$3,000 – $6,600', '$5,600 – $9,900', '$8,000 – $13,300', '$11,700 – $18,000'],
    lines: ['O\'Hare-adjacent transit center', 'Diverse community', 'ZIP 60016'],
  },
  {
    file: 'skokie-il',
    title: 'Moving to Skokie, IL',
    subtitle: 'Cook County · Near-north suburb',
    costs: ['$3,100 – $6,800', '$5,800 – $10,200', '$8,300 – $13,600', '$12,000 – $18,400'],
    lines: ['Culturally rich community', 'CTA access · Old Orchard', 'ZIP 60076'],
  },
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '&apos;');
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

console.log(`Wrote ${cities.length} Illinois OG SVGs`);