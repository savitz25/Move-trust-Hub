import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'montana-mt-cost-infographic.svg',
    title: 'Moving to Montana',
    subtitle: 'Treasure State · mountain lifestyle · Glacier gateway',
    studio: '$2,400 – $6,200',
    two: '$4,400 – $9,400',
    three: '$6,400 – $12,400',
    four: '$9,200 – $17,500',
    lines: ['10 live city guides · outdoor mecca', 'Bozeman to Hamilton corridors', 'movetrusthub.com/moving-to/montana'],
  },
  {
    file: 'bozeman-mt-cost-infographic.svg',
    title: 'Moving to Bozeman, MT',
    subtitle: 'Gallatin County · Bridger Bowl · MSU',
    studio: '$2,800 – $6,200',
    two: '$5,200 – $9,400',
    three: '$7,600 – $12,400',
    four: '$11,000 – $17,500',
    lines: ['Tech & outdoor mecca · Kirkwood', 'Bridger Canyon · Four Corners', 'ZIP 59715'],
  },
  {
    file: 'missoula-mt-cost-infographic.svg',
    title: 'Moving to Missoula, MT',
    subtitle: 'Missoula County · Clark Fork River',
    studio: '$2,600 – $5,800',
    two: '$4,800 – $8,800',
    three: '$7,000 – $11,600',
    four: '$10,200 – $16,200',
    lines: ['Cultural capital · University of Montana', 'Rattlesnake · Hip Strip', 'ZIP 59801'],
  },
  {
    file: 'billings-mt-cost-infographic.svg',
    title: 'Moving to Billings, MT',
    subtitle: 'Yellowstone County · Largest City',
    studio: '$2,600 – $5,800',
    two: '$4,800 – $8,800',
    three: '$7,000 – $11,600',
    four: '$10,200 – $16,200',
    lines: ['Economic powerhouse · energy sector', 'West End · Heights · Rimrock', 'ZIP 59101'],
  },
  {
    file: 'kalispell-mt-cost-infographic.svg',
    title: 'Moving to Kalispell, MT',
    subtitle: 'Flathead County · Glacier Gateway',
    studio: '$2,500 – $5,600',
    two: '$4,600 – $8,400',
    three: '$6,800 – $11,200',
    four: '$9,800 – $15,400',
    lines: ['Flathead Valley · Glacier National Park', 'Downtown Kalispell · Evergreen', 'ZIP 59901'],
  },
  {
    file: 'helena-mt-cost-infographic.svg',
    title: 'Moving to Helena, MT',
    subtitle: 'Lewis and Clark County · State Capital',
    studio: '$2,500 – $5,600',
    two: '$4,600 – $8,400',
    three: '$6,800 – $11,200',
    four: '$9,800 – $15,400',
    lines: ['Historic & stable core · Last Chance Gulch', 'Carroll College · government employment', 'ZIP 59601'],
  },
  {
    file: 'whitefish-mt-cost-infographic.svg',
    title: 'Moving to Whitefish, MT',
    subtitle: 'Flathead County · Big Mountain Ski',
    studio: '$2,800 – $6,200',
    two: '$5,200 – $9,400',
    three: '$7,600 – $12,400',
    four: '$11,000 – $17,500',
    lines: ['Luxury ski enclave · Whitefish Lake', 'Big Mountain Resort · downtown charm', 'ZIP 59937'],
  },
  {
    file: 'belgrade-mt-cost-infographic.svg',
    title: 'Moving to Belgrade, MT',
    subtitle: 'Gallatin County · Airport Corridor',
    studio: '$2,500 – $5,600',
    two: '$4,600 – $8,400',
    three: '$6,800 – $11,200',
    four: '$9,800 – $15,400',
    lines: ['Bozeman affordability valve · suburban growth', 'Gallatin Airport corridor · Amsterdam', 'ZIP 59714'],
  },
  {
    file: 'great-falls-mt-cost-infographic.svg',
    title: 'Moving to Great Falls, MT',
    subtitle: 'Cascade County · Missouri River',
    studio: '$2,500 – $5,600',
    two: '$4,600 – $8,400',
    three: '$6,800 – $11,200',
    four: '$9,800 – $15,400',
    lines: ['Best budget play · Gibson Park', 'River Drive · Malmstrom corridor', 'ZIP 59405'],
  },
  {
    file: 'livingston-mt-cost-infographic.svg',
    title: 'Moving to Livingston, MT',
    subtitle: 'Park County · Yellowstone River',
    studio: '$2,400 – $5,400',
    two: '$4,400 – $8,000',
    three: '$6,400 – $10,600',
    four: '$9,200 – $14,800',
    lines: ['Wind-swept creative haven · Paradise Valley', 'Yellowstone River gateway · film heritage', 'ZIP 59047'],
  },
  {
    file: 'hamilton-mt-cost-infographic.svg',
    title: 'Moving to Hamilton, MT',
    subtitle: 'Ravalli County · Bitterroot Valley',
    studio: '$2,400 – $5,400',
    two: '$4,400 – $8,000',
    three: '$6,400 – $10,600',
    four: '$9,200 – $14,800',
    lines: ['Peaceful Bitterroot sanctuary · farm-and-ranch', 'Daly Mansion area · downtown Hamilton', 'ZIP 59840'],
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