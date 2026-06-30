import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'utah-ut-cost-infographic.svg',
    title: 'Moving to Utah',
    subtitle: 'Beehive State · Wasatch Range · Silicon Slopes',
    studio: '$2,400 – $6,200',
    two: '$4,400 – $9,400',
    three: '$6,400 – $12,800',
    four: '$9,200 – $17,500',
    lines: ['10 live city guides · Mountain West growth', 'Salt Lake to Black Hills corridors', 'movetrusthub.com/moving-to/utah'],
  },
  {
    file: 'salt-lake-city-ut-cost-infographic.svg',
    title: 'Moving to Salt Lake City, UT',
    subtitle: 'Salt Lake County · Urban Basecamp',
    studio: '$2,600 – $6,400',
    two: '$4,800 – $9,800',
    three: '$7,000 – $13,200',
    four: '$10,200 – $18,500',
    lines: ['Sugar House · The Avenues · Wasatch trails', 'Downtown · 9th & 9th', 'ZIP 84101'],
  },
  {
    file: 'lehi-ut-cost-infographic.svg',
    title: 'Moving to Lehi, UT',
    subtitle: 'Utah County · Silicon Slopes Epicenter',
    studio: '$2,600 – $6,400',
    two: '$4,800 – $9,800',
    three: '$7,000 – $13,200',
    four: '$10,200 – $18,500',
    lines: ['Thanksgiving Point · tech corridor', 'Silicon Slopes employment', 'ZIP 84043'],
  },
  {
    file: 'saratoga-springs-eagle-mountain-ut-cost-infographic.svg',
    title: 'Moving to Saratoga Springs & Eagle Mountain, UT',
    subtitle: 'Utah County · New-Construction Growth',
    studio: '$2,500 – $6,000',
    two: '$4,600 – $9,200',
    three: '$6,800 – $12,400',
    four: '$9,800 – $17,200',
    lines: ['Utah Lake views · master-planned', 'New-construction giants', 'ZIP 84045'],
  },
  {
    file: 'st-george-ut-cost-infographic.svg',
    title: 'Moving to St. George, UT',
    subtitle: 'Washington County · Desert Oasis',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,800',
    three: '$6,400 – $11,600',
    four: '$9,200 – $16,200',
    lines: ['Snow Canyon · Zion gateway', 'Sun-drenched retirement corridor', 'ZIP 84770'],
  },
  {
    file: 'provo-orem-ut-cost-infographic.svg',
    title: 'Moving to Provo & Orem, UT',
    subtitle: 'Utah County · BYU · UVU Valley',
    studio: '$2,600 – $6,400',
    two: '$4,800 – $9,800',
    three: '$7,000 – $13,200',
    four: '$10,200 – $18,500',
    lines: ['Brainy valley anchors · Mount Timpanogos', 'University district · downtown Provo', 'ZIP 84601'],
  },
  {
    file: 'park-city-ut-cost-infographic.svg',
    title: 'Moving to Park City, UT',
    subtitle: 'Summit County · Alpine Luxury Resort',
    studio: '$3,000 – $7,000',
    two: '$5,600 – $10,800',
    three: '$8,200 – $15,000',
    four: '$12,000 – $20,500',
    lines: ['Sundance · Deer Valley · Old Town', 'Ultra-luxury alpine living', 'ZIP 84060'],
  },
  {
    file: 'ogden-ut-cost-infographic.svg',
    title: 'Moving to Ogden, UT',
    subtitle: 'Weber County · Northern Wasatch Value',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,800',
    three: '$6,400 – $11,600',
    four: '$9,200 – $16,200',
    lines: ['Historic 25th Street · Snowbasin', 'Powder Mountain · budget-friendly', 'ZIP 84401'],
  },
  {
    file: 'draper-ut-cost-infographic.svg',
    title: 'Moving to Draper, UT',
    subtitle: 'Salt Lake County · Foothill Haven',
    studio: '$2,600 – $6,400',
    two: '$4,800 – $9,800',
    three: '$7,000 – $13,200',
    four: '$10,200 – $18,500',
    lines: ['Flight Park · SunCrest · Corner Canyon', 'Upscale Silicon Slopes spillover', 'ZIP 84020'],
  },
  {
    file: 'farmington-ut-cost-infographic.svg',
    title: 'Moving to Farmington, UT',
    subtitle: 'Davis County · Station Park Jewel',
    studio: '$2,600 – $6,400',
    two: '$4,800 – $9,800',
    three: '$7,000 – $13,200',
    four: '$10,200 – $18,500',
    lines: ['Station Park · FrontRunner rail', 'Lagoon adjacency · Davis County', 'ZIP 84025'],
  },
  {
    file: 'american-fork-ut-cost-infographic.svg',
    title: 'Moving to American Fork, UT',
    subtitle: 'Utah County · Walkable Hybrid',
    studio: '$2,600 – $6,400',
    two: '$4,800 – $9,800',
    three: '$7,000 – $13,200',
    four: '$10,200 – $18,500',
    lines: ['American Fork Canyon · Main Street', 'Balanced walkable hybrid living', 'ZIP 84003'],
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