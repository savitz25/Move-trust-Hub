import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'missouri-mo-cost-infographic.svg',
    title: 'Moving to Missouri',
    subtitle: 'Show-Me State · KC & STL metros · Ozark beauty',
    studio: '$2,100 – $5,400',
    two: '$3,800 – $7,800',
    three: '$5,500 – $10,400',
    four: '$8,000 – $14,800',
    lines: ['10 live city guides · low cost of living', 'Columbia to Republic/Nixa corridors', 'movetrusthub.com/moving-to/missouri'],
  },
  {
    file: 'columbia-mo-cost-infographic.svg',
    title: 'Moving to Columbia, MO',
    subtitle: 'Boone County · Mizzou · Farmers Market',
    studio: '$2,200 – $4,800',
    two: '$4,000 – $7,200',
    three: '$5,800 – $9,400',
    four: '$8,200 – $13,200',
    lines: ['High-value consensus king · Stephens Lake', 'East Campus · Old Southwest', 'ZIP 65201'],
  },
  {
    file: 'lees-summit-mo-cost-infographic.svg',
    title: "Moving to Lee's Summit, MO",
    subtitle: 'Jackson County · Premier KC Suburb',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,600',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,500',
    lines: ["Longview Lake · R-7 schools", 'Woodland Hills · Lakewood', 'ZIP 64063'],
  },
  {
    file: 'ofallon-mo-cost-infographic.svg',
    title: "Moving to O'Fallon, MO",
    subtitle: 'St. Charles County · Master-Planned',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,600',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,500',
    lines: ['St. Louis family powerhouse · Winghaven', 'Fort Zumwalt schools · Lake Saint Louis', 'ZIP 63366'],
  },
  {
    file: 'kansas-city-mo-cost-infographic.svg',
    title: 'Moving to Kansas City, MO',
    subtitle: 'Jackson County · Cultural Giant',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,600',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,500',
    lines: ['Northland · riverfront revival · BBQ', 'Crossroads Arts · River Market', 'ZIP 64108'],
  },
  {
    file: 'chesterfield-mo-cost-infographic.svg',
    title: 'Moving to Chesterfield, MO',
    subtitle: 'St. Louis County · West-County Luxury',
    studio: '$2,400 – $5,400',
    two: '$4,400 – $7,800',
    three: '$6,400 – $10,400',
    four: '$9,200 – $14,800',
    lines: ['Corporate HQ corridor · Chesterfield Valley', 'Faust Park · Monarch Chesterfield', 'ZIP 63017'],
  },
  {
    file: 'springfield-mo-cost-infographic.svg',
    title: 'Moving to Springfield, MO',
    subtitle: 'Greene County · Ozark Urban Value',
    studio: '$2,100 – $4,600',
    two: '$3,800 – $6,800',
    three: '$5,500 – $9,000',
    four: '$8,000 – $12,800',
    lines: ['Bass Pro heritage · Wonders of Wildlife', 'MSU · Phelps Grove · Rountree', 'ZIP 65807'],
  },
  {
    file: 'st-charles-mo-cost-infographic.svg',
    title: 'Moving to St. Charles, MO',
    subtitle: 'St. Charles County · Historic River City',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,600',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,500',
    lines: ['Katy Trail · Historic Main Street', 'French colonial heritage · riverfront', 'ZIP 63301'],
  },
  {
    file: 'liberty-mo-cost-infographic.svg',
    title: 'Moving to Liberty, MO',
    subtitle: 'Clay County · KC Northland Gem',
    studio: '$2,300 – $5,200',
    two: '$4,200 – $7,600',
    three: '$6,200 – $10,200',
    four: '$9,000 – $14,500',
    lines: ['Historic square · William Jewell College', 'Shoal Creek Living History Museum', 'ZIP 64068'],
  },
  {
    file: 'st-louis-mo-cost-infographic.svg',
    title: 'Moving to St. Louis, MO',
    subtitle: 'St. Louis City · Urban Value Play',
    studio: '$2,200 – $4,800',
    two: '$4,000 – $7,200',
    three: '$5,800 – $9,400',
    four: '$8,200 – $13,200',
    lines: ['Central West End · Forest Park', 'South City brick · Soulard · Tower Grove', 'ZIP 63108'],
  },
  {
    file: 'republic-nixa-mo-cost-infographic.svg',
    title: 'Moving to Republic & Nixa, MO',
    subtitle: 'Christian County · Southwest Sprawl',
    studio: '$2,100 – $4,600',
    two: '$3,800 – $6,800',
    three: '$5,500 – $9,000',
    four: '$8,000 – $12,800',
    lines: ['Explosive new-build growth · Springfield proximity', 'Ozark hillside inventory · Christian County', 'ZIP 65738'],
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