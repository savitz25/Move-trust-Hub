import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'vermont-vt-cost-infographic.svg',
    title: 'Moving to Vermont',
    subtitle: 'Champlain Valley · Central VT · Kingdom · Southern Gateway',
    studio: '$2,800 – $6,200',
    two: '$5,200 – $9,200',
    three: '$7,400 – $12,400',
    four: '$10,800 – $17,200',
    lines: ['10 live city guides · Lake Champlain & Green Mountains', 'Quality of life · excellent schools · safe communities', 'movetrusthub.com/moving-to/vermont'],
  },
  {
    file: 'south-burlington-vt-cost-infographic.svg',
    title: 'Moving to South Burlington, VT',
    subtitle: 'Chittenden County · Champlain Valley',
    studio: '$3,000 – $6,400',
    two: '$5,600 – $9,600',
    three: '$8,000 – $13,200',
    four: '$11,600 – $17,800',
    lines: ['Top-ranked schools · Lake Champlain access', 'Modern suburban convenience', 'ZIP 05403'],
  },
  {
    file: 'burlington-vt-cost-infographic.svg',
    title: 'Moving to Burlington, VT',
    subtitle: 'Chittenden County · UVM College Town',
    studio: '$3,000 – $6,400',
    two: '$5,600 – $9,600',
    three: '$8,000 – $13,200',
    four: '$11,600 – $17,800',
    lines: ['Vibrant downtown · UVM · cultural hub', 'Church Street Marketplace walkability', 'ZIP 05401'],
  },
  {
    file: 'essex-vt-cost-infographic.svg',
    title: 'Moving to Essex, VT',
    subtitle: 'Chittenden County · Family Suburb',
    studio: '$3,000 – $6,400',
    two: '$5,600 – $9,600',
    three: '$8,000 – $13,200',
    four: '$11,600 – $17,800',
    lines: ['Family-friendly · strong schools', 'Growing employment corridor', 'ZIP 05452'],
  },
  {
    file: 'colchester-vt-cost-infographic.svg',
    title: 'Moving to Colchester, VT',
    subtitle: 'Chittenden County · Lakeside',
    studio: '$3,000 – $6,400',
    two: '$5,600 – $9,600',
    three: '$8,000 – $13,200',
    four: '$11,600 – $17,800',
    lines: ['Lakeside suburban · outdoor recreation', 'Good Champlain Valley value', 'ZIP 05446'],
  },
  {
    file: 'williston-vt-cost-infographic.svg',
    title: 'Moving to Williston, VT',
    subtitle: 'Chittenden County · Upscale Suburb',
    studio: '$3,000 – $6,400',
    two: '$5,600 – $9,600',
    three: '$8,000 – $13,200',
    four: '$11,600 – $17,800',
    lines: ['Upscale suburb · top schools', 'Retail and employment growth', 'ZIP 05495'],
  },
  {
    file: 'montpelier-vt-cost-infographic.svg',
    title: 'Moving to Montpelier, VT',
    subtitle: 'Washington County · State Capital',
    studio: '$2,800 – $5,800',
    two: '$5,200 – $8,800',
    three: '$7,400 – $12,000',
    four: '$10,800 – $16,400',
    lines: ['Historic state capital · government jobs', 'Arts scene · walkable downtown', 'ZIP 05602'],
  },
  {
    file: 'rutland-vt-cost-infographic.svg',
    title: 'Moving to Rutland, VT',
    subtitle: 'Rutland County · Central VT',
    studio: '$2,600 – $5,400',
    two: '$4,800 – $8,200',
    three: '$7,000 – $11,400',
    four: '$10,200 – $15,800',
    lines: ['Affordable central hub · mountain access', 'Revitalizing downtown', 'ZIP 05701'],
  },
  {
    file: 'st-johnsbury-vt-cost-infographic.svg',
    title: 'Moving to St. Johnsbury, VT',
    subtitle: 'Caledonia County · Northeast Kingdom',
    studio: '$2,600 – $5,400',
    two: '$4,800 – $8,200',
    three: '$7,000 – $11,400',
    four: '$10,200 – $15,800',
    lines: ['Affordable kingdom gateway · scenic beauty', 'Small-town charm', 'ZIP 05819'],
  },
  {
    file: 'middlebury-vt-cost-infographic.svg',
    title: 'Moving to Middlebury, VT',
    subtitle: 'Addison County · College Town',
    studio: '$2,800 – $5,800',
    two: '$5,200 – $8,800',
    three: '$7,400 – $12,000',
    four: '$10,800 – $16,400',
    lines: ['Charming college town · farmland surroundings', 'Middlebury College culture', 'ZIP 05753'],
  },
  {
    file: 'brattleboro-vt-cost-infographic.svg',
    title: 'Moving to Brattleboro, VT',
    subtitle: 'Windham County · Southern Gateway',
    studio: '$2,800 – $5,800',
    two: '$5,200 – $8,800',
    three: '$7,400 – $12,000',
    four: '$10,800 – $16,400',
    lines: ['Artsy southern gateway · progressive vibe', 'Connecticut River access', 'ZIP 05301'],
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