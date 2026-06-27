import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'virginia-va-cost-infographic.svg',
    title: 'Moving to Virginia',
    subtitle: 'NoVA · I-95 · Hampton Roads · Mountains',
    studio: '$2,800 – $5,800',
    two: '$5,200 – $8,900',
    three: '$7,600 – $12,400',
    four: '$10,800 – $17,200',
    lines: ['8 live city guides · East Coast growth state', 'Federal contractors · suburban overflow', 'movetrusthub.com/moving-to/virginia'],
  },
  {
    file: 'arlington-alexandria-va-cost-infographic.svg',
    title: 'Moving to Arlington & Alexandria, VA',
    subtitle: 'Northern Virginia · DC Metro',
    studio: '$3,200 – $6,400',
    two: '$5,900 – $9,600',
    three: '$8,600 – $13,800',
    four: '$12,200 – $19,000',
    lines: ['Pentagon corridor · Metro transit', 'Amazon HQ2 · federal contractors', 'ZIP 22201'],
  },
  {
    file: 'leesburg-fairfax-va-cost-infographic.svg',
    title: 'Moving to Leesburg & Fairfax, VA',
    subtitle: 'Loudoun & Fairfax Counties · NoVA',
    studio: '$3,000 – $6,100',
    two: '$5,600 – $9,200',
    three: '$8,200 – $13,200',
    four: '$11,800 – $18,200',
    lines: ['Dulles tech corridor · top schools', 'Defense contractors · low crime suburbs', 'ZIP 20175'],
  },
  {
    file: 'winchester-va-cost-infographic.svg',
    title: 'Moving to Winchester, VA',
    subtitle: 'Shenandoah Valley · Frederick County',
    studio: '$2,600 – $5,200',
    two: '$4,800 – $7,900',
    three: '$7,000 – $11,200',
    four: '$10,000 – $15,600',
    lines: ['Fastest-growing % metro · NoVA spillover', 'I-81 corridor · valley living', 'ZIP 22601'],
  },
  {
    file: 'fredericksburg-culpeper-va-cost-infographic.svg',
    title: 'Moving to Fredericksburg & Culpeper, VA',
    subtitle: 'I-95 Central Corridor',
    studio: '$2,700 – $5,400',
    two: '$5,000 – $8,200',
    three: '$7,300 – $11,600',
    four: '$10,400 – $16,200',
    lines: ['D.C. commute belt · historic districts', 'Families priced out of closer NoVA', 'ZIP 22401'],
  },
  {
    file: 'richmond-va-cost-infographic.svg',
    title: 'Moving to Richmond, VA',
    subtitle: 'Virginia Capital · Central VA',
    studio: '$2,500 – $5,000',
    two: '$4,600 – $7,600',
    three: '$6,800 – $10,800',
    four: '$9,600 – $15,000',
    lines: ['State capital · arts & food scene', 'Healthcare & finance jobs', 'ZIP 23219'],
  },
  {
    file: 'suffolk-chesapeake-va-cost-infographic.svg',
    title: 'Moving to Suffolk & Chesapeake, VA',
    subtitle: 'Hampton Roads · Coastal VA',
    studio: '$2,400 – $4,900',
    two: '$4,400 – $7,300',
    three: '$6,400 – $10,200',
    four: '$9,200 – $14,400',
    lines: ['Fastest-growing Hampton Roads', 'Newer housing · coastal jobs', 'ZIP 23434'],
  },
  {
    file: 'charlottesville-va-cost-infographic.svg',
    title: 'Moving to Charlottesville, VA',
    subtitle: 'UVA · Albemarle County',
    studio: '$2,500 – $5,100',
    two: '$4,600 – $7,700',
    three: '$6,800 – $10,800',
    four: '$9,600 – $15,000',
    lines: ['University of Virginia · Blue Ridge', 'Culture · healthcare · retirees', 'ZIP 22902'],
  },
  {
    file: 'roanoke-va-cost-infographic.svg',
    title: 'Moving to Roanoke, VA',
    subtitle: 'Blue Ridge Valley · Southwest VA',
    studio: '$2,300 – $4,700',
    two: '$4,200 – $7,000',
    three: '$6,200 – $9,800',
    four: '$8,800 – $13,600',
    lines: ['Outdoor recreation · mountain trails', 'Affordable valley living', 'ZIP 24011'],
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