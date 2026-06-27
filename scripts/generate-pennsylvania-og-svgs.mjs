import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'pennsylvania-pa-cost-infographic.svg',
    title: 'Moving to Pennsylvania',
    subtitle: 'Western PA · Central PA · Lehigh · Northeast',
    studio: '$2,200 – $5,200',
    two: '$4,000 – $7,800',
    three: '$5,800 – $11,200',
    four: '$8,200 – $15,800',
    lines: ['10 live city guides · Eastern & Western PA split', 'Affordable vs NY/NJ/MD · strong job markets', 'movetrusthub.com/moving-to/pennsylvania'],
  },
  {
    file: 'pittsburgh-pa-cost-infographic.svg',
    title: 'Moving to Pittsburgh, PA',
    subtitle: 'Allegheny County · Tech & Healthcare',
    studio: '$2,400 – $4,900',
    two: '$4,400 – $7,300',
    three: '$6,500 – $10,200',
    four: '$9,200 – $14,400',
    lines: ['Robotics · UPMC · CMU · cultural revival', 'Affordable urban neighborhoods', 'ZIP 15222'],
  },
  {
    file: 'williamsport-pa-cost-infographic.svg',
    title: 'Moving to Williamsport, PA',
    subtitle: 'Lycoming County · North-Central PA',
    studio: '$2,200 – $4,600',
    two: '$4,000 – $6,800',
    three: '$5,800 – $9,200',
    four: '$8,200 – $12,800',
    lines: ['Low commute times · Little League heritage', 'Affordable Susquehanna corridor', 'ZIP 17701'],
  },
  {
    file: 'altoona-pa-cost-infographic.svg',
    title: 'Moving to Altoona, PA',
    subtitle: 'Blair County · Allegheny Mountains',
    studio: '$2,000 – $4,200',
    two: '$3,600 – $6,200',
    three: '$5,200 – $8,400',
    four: '$7,400 – $11,600',
    lines: ['Extremely budget-friendly · mountain setting', 'I-99 corridor outdoor access', 'ZIP 16601'],
  },
  {
    file: 'erie-pa-cost-infographic.svg',
    title: 'Moving to Erie, PA',
    subtitle: 'Erie County · Great Lakes',
    studio: '$2,100 – $4,400',
    two: '$3,800 – $6,500',
    three: '$5,600 – $8,800',
    four: '$8,000 – $12,400',
    lines: ['Lakeside maritime community · Presque Isle', 'Affordable waterfront living', 'ZIP 16501'],
  },
  {
    file: 'bethlehem-pa-cost-infographic.svg',
    title: 'Moving to Bethlehem, PA',
    subtitle: 'Northampton County · Lehigh Valley',
    studio: '$2,600 – $5,300',
    two: '$4,800 – $7,900',
    three: '$7,000 – $11,400',
    four: '$10,000 – $15,600',
    lines: ['Lehigh Valley innovation · SteelStacks arts', 'Historic downtown · job growth', 'ZIP 18015'],
  },
  {
    file: 'chambersburg-pa-cost-infographic.svg',
    title: 'Moving to Chambersburg, PA',
    subtitle: 'Franklin County · Cumberland Valley',
    studio: '$2,200 – $4,600',
    two: '$4,000 – $6,800',
    three: '$5,800 – $9,200',
    four: '$8,200 – $12,800',
    lines: ['Strong schools · I-81 logistics corridor', 'Maryland border proximity', 'ZIP 17201'],
  },
  {
    file: 'lancaster-pa-cost-infographic.svg',
    title: 'Moving to Lancaster, PA',
    subtitle: 'Lancaster County · Central PA',
    studio: '$2,400 – $4,900',
    two: '$4,400 – $7,300',
    three: '$6,400 – $10,200',
    four: '$9,200 – $14,400',
    lines: ['Arts-centric downtown · Amish farmland', 'Food scene · historic charm', 'ZIP 17602'],
  },
  {
    file: 'johnstown-pa-cost-infographic.svg',
    title: 'Moving to Johnstown, PA',
    subtitle: 'Cambria County · Laurel Highlands',
    studio: '$1,900 – $4,000',
    two: '$3,400 – $5,800',
    three: '$5,000 – $7,800',
    four: '$7,200 – $11,200',
    lines: ['Extremely affordable · riverfront living', 'Resilient community spirit', 'ZIP 15901'],
  },
  {
    file: 'state-college-pa-cost-infographic.svg',
    title: 'Moving to State College, PA',
    subtitle: 'Centre County · Penn State',
    studio: '$2,400 – $5,000',
    two: '$4,400 – $7,400',
    three: '$6,400 – $10,200',
    four: '$9,200 – $14,400',
    lines: ['Penn State University · Happy Valley', 'Educated population · robust economy', 'ZIP 16801'],
  },
  {
    file: 'scranton-pa-cost-infographic.svg',
    title: 'Moving to Scranton, PA',
    subtitle: 'Lackawanna County · Electric City',
    studio: '$2,200 – $4,600',
    two: '$4,000 – $6,800',
    three: '$5,800 – $9,200',
    four: '$8,200 – $12,800',
    lines: ['Historic Electric City · up-and-coming', 'Affordable · East Coast commutable', 'ZIP 18503'],
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