import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'west-virginia-wv-cost-infographic.svg',
    title: 'Moving to West Virginia',
    subtitle: 'Eastern Panhandle · WVU · Kanawha · Mountains',
    studio: '$2,200 – $4,600',
    two: '$4,000 – $6,800',
    three: '$5,800 – $9,400',
    four: '$8,200 – $12,800',
    lines: ['9 live city guides · affordable growth state', 'DC commuters · Ascend WV · outdoor living', 'movetrusthub.com/moving-to/west-virginia'],
  },
  {
    file: 'martinsburg-wv-cost-infographic.svg',
    title: 'Moving to Martinsburg, WV',
    subtitle: 'Berkeley County · Eastern Panhandle',
    studio: '$2,300 – $4,700',
    two: '$4,200 – $6,900',
    three: '$6,100 – $9,600',
    four: '$8,800 – $13,200',
    lines: ['Fastest-growing county · D.C. commuter access', 'Affordable housing · I-81 corridor', 'ZIP 25401'],
  },
  {
    file: 'charles-town-ranson-wv-cost-infographic.svg',
    title: 'Moving to Charles Town & Ranson, WV',
    subtitle: 'Jefferson County · VA/MD border',
    studio: '$2,300 – $4,700',
    two: '$4,200 – $6,900',
    three: '$6,100 – $9,600',
    four: '$8,800 – $13,200',
    lines: ['Rapid border growth · new construction', 'Master-planned communities', 'ZIP 25414'],
  },
  {
    file: 'shepherdstown-wv-cost-infographic.svg',
    title: 'Moving to Shepherdstown, WV',
    subtitle: 'Jefferson County · Potomac River',
    studio: '$2,200 – $4,600',
    two: '$4,000 – $6,700',
    three: '$5,800 – $9,200',
    four: '$8,400 – $12,600',
    lines: ['Historic walkable college town', 'Vibrant arts & culture', 'ZIP 25443'],
  },
  {
    file: 'morgantown-wv-cost-infographic.svg',
    title: 'Moving to Morgantown, WV',
    subtitle: 'Monongalia County · WVU',
    studio: '$2,200 – $4,500',
    two: '$4,000 – $6,600',
    three: '$5,800 – $9,000',
    four: '$8,200 – $12,400',
    lines: ['West Virginia University · tech & research', 'Healthcare · youthful energy', 'ZIP 26505'],
  },
  {
    file: 'bridgeport-wv-cost-infographic.svg',
    title: 'Moving to Bridgeport, WV',
    subtitle: 'Harrison County · North Central WV',
    studio: '$2,100 – $4,300',
    two: '$3,900 – $6,400',
    three: '$5,600 – $8,800',
    four: '$8,000 – $12,000',
    lines: ['Top schools · safe suburban living', 'Aerospace & healthcare economy', 'ZIP 26330'],
  },
  {
    file: 'charleston-wv-cost-infographic.svg',
    title: 'Moving to Charleston, WV',
    subtitle: 'Kanawha County · State Capital',
    studio: '$2,100 – $4,300',
    two: '$3,900 – $6,400',
    three: '$5,600 – $8,800',
    four: '$8,000 – $12,000',
    lines: ['State capital · government & healthcare', 'Urban amenities · arts scene', 'ZIP 25301'],
  },
  {
    file: 'hurricane-teays-valley-wv-cost-infographic.svg',
    title: 'Moving to Hurricane & Teays Valley, WV',
    subtitle: 'Putnam County · I-64 corridor',
    studio: '$2,100 – $4,300',
    two: '$3,900 – $6,400',
    three: '$5,600 – $8,800',
    four: '$8,000 – $12,000',
    lines: ['Suburban I-64 growth · strong schools', 'Family-friendly master-plans', 'ZIP 25526'],
  },
  {
    file: 'lewisburg-wv-cost-infographic.svg',
    title: 'Moving to Lewisburg, WV',
    subtitle: 'Greenbrier County · Resort corridor',
    studio: '$2,000 – $4,200',
    two: '$3,700 – $6,200',
    three: '$5,400 – $8,600',
    four: '$7,800 – $11,800',
    lines: ['Arts scene · Greenbrier Resort area', 'Ascend WV remote workers', 'ZIP 24901'],
  },
  {
    file: 'elkins-wv-cost-infographic.svg',
    title: 'Moving to Elkins, WV',
    subtitle: 'Randolph County · Mountain WV',
    studio: '$1,900 – $4,000',
    two: '$3,500 – $5,900',
    three: '$5,100 – $8,200',
    four: '$7,400 – $11,200',
    lines: ['Affordable historic mountain homes', 'Outdoor lifestyle · community vibe', 'ZIP 26241'],
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