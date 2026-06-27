import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'mississippi-cluster-cost-infographic.svg',
    title: 'Moving to Mississippi',
    subtitle: 'Gulf Coast · Jackson Metro · Hub Cities',
    studio: '$2,200 – $5,800',
    two: '$4,000 – $8,200',
    three: '$6,000 – $11,000',
    four: '$8,800 – $15,800',
    lines: ['10 live city guides · Gulfport #1 inbound', 'Affordable Gulf Coast & safe suburbs', 'movetrusthub.com/moving-to/mississippi'],
  },
  {
    file: 'gulfport-ms-cost-infographic.svg',
    title: 'Moving to Gulfport, MS',
    subtitle: 'Harrison County · #1 in Mississippi',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,800',
    lines: ['Sunny coastal city · port sector', 'Public beaches · I-10 corridor', 'ZIP 39501'],
  },
  {
    file: 'madison-ms-cost-infographic.svg',
    title: 'Moving to Madison, MS',
    subtitle: 'Madison County · Jackson Metro',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,800',
    lines: ['Affluent · A+ schools', 'Premier Jackson bedroom community', 'ZIP 39110'],
  },
  {
    file: 'hattiesburg-ms-cost-infographic.svg',
    title: 'Moving to Hattiesburg, MS',
    subtitle: 'Forrest County · Hub City',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,600',
    three: '$6,000 – $10,400',
    four: '$8,800 – $15,000',
    lines: ['University of Southern Mississippi', 'Diverse economy · I-59 corridor', 'ZIP 39401'],
  },
  {
    file: 'ocean-springs-ms-cost-infographic.svg',
    title: 'Moving to Ocean Springs, MS',
    subtitle: 'Jackson County · Gulf Coast',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,800',
    lines: ['Artistic coastal community', 'Walkable downtown · beaches', 'ZIP 39564'],
  },
  {
    file: 'olive-branch-ms-cost-infographic.svg',
    title: 'Moving to Olive Branch, MS',
    subtitle: 'DeSoto County · Memphis Border',
    studio: '$2,200 – $5,200',
    two: '$4,000 – $7,400',
    three: '$5,800 – $10,000',
    four: '$8,600 – $14,600',
    lines: ['Fastest-growing boomtown', 'Low taxes · Memphis employment', 'ZIP 38654'],
  },
  {
    file: 'oxford-ms-cost-infographic.svg',
    title: 'Moving to Oxford, MS',
    subtitle: 'Lafayette County · Ole Miss',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,800',
    lines: ['Sophisticated college town', 'Culinary scene · outdoor recreation', 'ZIP 38655'],
  },
  {
    file: 'flowood-ms-cost-infographic.svg',
    title: 'Moving to Flowood, MS',
    subtitle: 'Rankin County · Jackson Metro',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,600',
    three: '$6,000 – $10,400',
    four: '$8,800 – $15,000',
    lines: ['Healthcare & commercial suburb', 'Convenient to Jackson', 'ZIP 39232'],
  },
  {
    file: 'brandon-ms-cost-infographic.svg',
    title: 'Moving to Brandon, MS',
    subtitle: 'Rankin County · Lakeside Family',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,600',
    three: '$6,000 – $10,400',
    four: '$8,800 – $15,000',
    lines: ['Peaceful lakeside community', 'Strong infrastructure', 'ZIP 39042'],
  },
  {
    file: 'ridgeland-ms-cost-infographic.svg',
    title: 'Moving to Ridgeland, MS',
    subtitle: 'Madison County · Reservoir Suburb',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,800',
    lines: ['Upscale reservoir living', 'Luxury developments · shopping', 'ZIP 39157'],
  },
  {
    file: 'jackson-ms-cost-infographic.svg',
    title: 'Moving to Jackson, MS',
    subtitle: 'Hinds County · State Capital',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,600',
    three: '$6,000 – $10,400',
    four: '$8,800 – $15,000',
    lines: ['Historic cultural heart', 'Government & healthcare jobs', 'ZIP 39201'],
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