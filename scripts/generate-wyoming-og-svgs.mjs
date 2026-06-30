import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'wyoming-wy-cost-infographic.svg',
    title: 'Moving to Wyoming',
    subtitle: 'Equality State · no income tax · wide-open West',
    studio: '$2,400 – $6,800',
    two: '$4,400 – $10,200',
    three: '$6,400 – $14,000',
    four: '$9,200 – $18,500',
    lines: ['10 live city guides · four corridors', 'Cheyenne to Jackson Hole alpine', 'movetrusthub.com/moving-to/wyoming'],
  },
  {
    file: 'cheyenne-wy-cost-infographic.svg',
    title: 'Moving to Cheyenne, WY',
    subtitle: 'Laramie County · Capital Core',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $10,800',
    four: '$9,200 – $15,400',
    lines: ['Complete capital core · F.E. Warren', 'Capitol Ave · Saddleback Ridge', 'ZIP 82001'],
  },
  {
    file: 'laramie-wy-cost-infographic.svg',
    title: 'Moving to Laramie, WY',
    subtitle: 'Albany County · UW Mountain Valley',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $10,800',
    four: '$9,200 – $15,400',
    lines: ['Brainy mountain valley · UW', 'Downtown · Snowy Range', 'ZIP 82070'],
  },
  {
    file: 'casper-wy-cost-infographic.svg',
    title: 'Moving to Casper, WY',
    subtitle: 'Natrona County · North Platte Hub',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $10,800',
    four: '$9,200 – $15,400',
    lines: ['Practical affordable hub', 'Eastridge · Paradise Valley', 'ZIP 82601'],
  },
  {
    file: 'gillette-wy-cost-infographic.svg',
    title: 'Moving to Gillette, WY',
    subtitle: 'Campbell County · Powder River Basin',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $10,800',
    four: '$9,200 – $15,400',
    lines: ['Industrial workhorse · energy basin', 'Gillette Ave · Country Club', 'ZIP 82716'],
  },
  {
    file: 'sheridan-wy-cost-infographic.svg',
    title: 'Moving to Sheridan, WY',
    subtitle: 'Sheridan County · Bighorn Oasis',
    studio: '$2,500 – $5,800',
    two: '$4,600 – $8,600',
    three: '$6,800 – $11,400',
    four: '$9,600 – $16,000',
    lines: ['Refined Western oasis', 'Coffeen Ave · Kendrick Park', 'ZIP 82801'],
  },
  {
    file: 'cody-wy-cost-infographic.svg',
    title: 'Moving to Cody, WY',
    subtitle: 'Park County · Yellowstone Gateway',
    studio: '$2,500 – $5,800',
    two: '$4,600 – $8,600',
    three: '$6,800 – $11,400',
    four: '$9,600 – $16,200',
    lines: ['Historic frontier gate', 'Buffalo Bill Center · Wapiti', 'ZIP 82414'],
  },
  {
    file: 'buffalo-wy-cost-infographic.svg',
    title: 'Moving to Buffalo, WY',
    subtitle: 'Johnson County · Base of the Bighorns',
    studio: '$2,500 – $5,800',
    two: '$4,600 – $8,600',
    three: '$6,800 – $11,400',
    four: '$9,600 – $16,000',
    lines: ['Old West heritage value play', 'Main Street · Crazy Woman Canyon', 'ZIP 82834'],
  },
  {
    file: 'lander-wy-cost-infographic.svg',
    title: 'Moving to Lander, WY',
    subtitle: 'Fremont County · Wind River Sanctuary',
    studio: '$2,500 – $5,800',
    two: '$4,600 – $8,600',
    three: '$6,800 – $11,400',
    four: '$9,600 – $16,000',
    lines: ['Outdoor climber sanctuary', 'Sinks Canyon · City Park', 'ZIP 82520'],
  },
  {
    file: 'jackson-wy-cost-infographic.svg',
    title: 'Moving to Jackson, WY',
    subtitle: 'Teton County · Jackson Hole Alpine',
    studio: '$2,800 – $6,800',
    two: '$5,200 – $10,200',
    three: '$7,800 – $14,000',
    four: '$11,200 – $18,500',
    lines: ['High-end alpine paradise', 'Town Square · Grand Teton', 'ZIP 83001'],
  },
  {
    file: 'alpine-star-valley-wy-cost-infographic.svg',
    title: 'Moving to Alpine & Star Valley, WY',
    subtitle: 'Lincoln County · Palisades Escape',
    studio: '$2,600 – $6,200',
    two: '$4,800 – $9,400',
    three: '$7,200 – $12,600',
    four: '$10,400 – $17,200',
    lines: ['High-growth Idaho-border escape', 'Alpine · Afton · Star Valley', 'ZIP 83128'],
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