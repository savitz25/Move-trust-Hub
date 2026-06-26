import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'alabama-cluster-cost-infographic.svg',
    title: 'Moving to Alabama — 2026 Cluster Overview',
    subtitle: 'Rocket City · Coastal South · Birmingham Metro',
    studio: '$2,200 – $4,800',
    two: '$4,100 – $7,200',
    three: '$6,000 – $10,200',
    four: '$8,500 – $13,800',
    lines: ['Aerospace & coastal growth corridors', '8 live city guides: Huntsville to Auburn', 'Default ZIP 35801 · Huntsville'],
  },
  {
    file: 'huntsville-al-cost-infographic.svg',
    title: 'Moving to Huntsville, AL',
    subtitle: 'Rocket City · Madison County · Move Trust Hub',
    studio: '$2,400 – $4,800',
    two: '$4,400 – $7,200',
    three: '$6,400 – $10,000',
    four: '$9,200 – $13,500',
    lines: ['NASA · Redstone Arsenal · defense/aerospace', 'High-earning engineer inbound corridor', 'ZIP 35801'],
  },
  {
    file: 'madison-al-cost-infographic.svg',
    title: 'Moving to Madison, AL',
    subtitle: 'Huntsville Suburb · Madison County',
    studio: '$2,300 – $4,600',
    two: '$4,200 – $6,900',
    three: '$6,200 – $9,600',
    four: '$8,800 – $13,000',
    lines: ['Top-rated schools · family safety', 'Affluent master-planned suburbs', 'ZIP 35758'],
  },
  {
    file: 'athens-al-cost-infographic.svg',
    title: 'Moving to Athens, AL',
    subtitle: 'Limestone County · Move Trust Hub',
    studio: '$2,200 – $4,400',
    two: '$4,000 – $6,600',
    three: '$5,800 – $9,000',
    four: '$8,200 – $12,200',
    lines: ['Historic charm · Huntsville spillover', 'Affordable new subdivisions', 'ZIP 35611'],
  },
  {
    file: 'foley-al-cost-infographic.svg',
    title: 'Moving to Foley, AL',
    subtitle: 'Baldwin County · Coastal South',
    studio: '$2,200 – $4,500',
    two: '$4,100 – $6,800',
    three: '$6,000 – $9,400',
    four: '$8,500 – $12,600',
    lines: ['Fastest-growing % · retail hub', 'Gulf beach proximity', 'ZIP 36535'],
  },
  {
    file: 'daphne-al-cost-infographic.svg',
    title: 'Moving to Daphne, AL',
    subtitle: 'Eastern Mobile Bay · Baldwin County',
    studio: '$2,300 – $4,600',
    two: '$4,200 – $7,000',
    three: '$6,200 – $9,600',
    four: '$8,800 – $12,800',
    lines: ['Jubilee City · bay living', 'Safety · high quality of life', 'ZIP 36526'],
  },
  {
    file: 'fairhope-gulf-shores-al-cost-infographic.svg',
    title: 'Moving to Fairhope & Gulf Shores, AL',
    subtitle: 'Baldwin County · Gulf Coast',
    studio: '$2,400 – $4,800',
    two: '$4,500 – $7,400',
    three: '$6,600 – $10,200',
    four: '$9,400 – $13,800',
    lines: ['Fairhope arts · Gulf Shores resort', 'Retirees & remote workers', 'ZIP 36532'],
  },
  {
    file: 'hoover-al-cost-infographic.svg',
    title: 'Moving to Hoover, AL',
    subtitle: 'Birmingham Metro · Jefferson County',
    studio: '$2,300 – $4,600',
    two: '$4,200 – $7,000',
    three: '$6,200 – $9,800',
    four: '$8,800 – $13,200',
    lines: ['Riverchase Galleria · top safety', 'Master-planned upscale living', 'ZIP 35244'],
  },
  {
    file: 'auburn-opelika-al-cost-infographic.svg',
    title: 'Moving to Auburn & Opelika, AL',
    subtitle: 'Lee County · Move Trust Hub',
    studio: '$2,200 – $4,400',
    two: '$4,000 – $6,600',
    three: '$5,800 – $9,000',
    four: '$8,200 – $12,000',
    lines: ['Auburn University · SEC campus', 'Manufacturing · strong schools', 'ZIP 36830'],
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