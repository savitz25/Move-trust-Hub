import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'washington-wa-cost-infographic.svg',
    title: 'Moving to Washington',
    subtitle: 'Evergreen State · tech economy · Pacific Northwest',
    studio: '$2,800 – $6,500',
    two: '$5,400 – $9,800',
    three: '$8,200 – $14,200',
    four: '$12,000 – $19,500',
    lines: ['10 live city guides · diverse regions', 'Puget Sound to Tri-Cities corridors', 'movetrusthub.com/moving-to/washington'],
  },
  {
    file: 'seattle-wa-cost-infographic.svg',
    title: 'Moving to Seattle, WA',
    subtitle: 'King County · Urban Basecamp',
    studio: '$2,800 – $6,500',
    two: '$5,400 – $9,800',
    three: '$8,200 – $14,200',
    four: '$12,000 – $19,500',
    lines: ['Resurgent urban core · South Lake Union', 'Capitol Hill · Puget Sound trails', 'ZIP 98101'],
  },
  {
    file: 'bellevue-wa-cost-infographic.svg',
    title: 'Moving to Bellevue, WA',
    subtitle: 'King County · Eastside Tech & Luxury',
    studio: '$2,800 – $6,500',
    two: '$5,400 – $9,800',
    three: '$8,200 – $14,200',
    four: '$12,000 – $19,500',
    lines: ['Tech & luxury elite · Bellevue Square', 'Eastside employment gravity', 'ZIP 98004'],
  },
  {
    file: 'redmond-wa-cost-infographic.svg',
    title: 'Moving to Redmond, WA',
    subtitle: 'King County · Microsoft Innovation Hub',
    studio: '$2,800 – $6,500',
    two: '$5,400 – $9,800',
    three: '$8,200 – $14,200',
    four: '$12,000 – $19,500',
    lines: ['Innovation hub · Microsoft campus', 'Overlake · Education Hill', 'ZIP 98052'],
  },
  {
    file: 'tacoma-wa-cost-infographic.svg',
    title: 'Moving to Tacoma, WA',
    subtitle: 'Pierce County · Maritime South Sound',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,800',
    three: '$6,400 – $11,600',
    four: '$9,200 – $16,200',
    lines: ['Gritty-chic maritime choice', 'Stadium District · Ruston Way', 'ZIP 98402'],
  },
  {
    file: 'vancouver-wa-cost-infographic.svg',
    title: 'Moving to Vancouver, WA',
    subtitle: 'Clark County · Columbia River',
    studio: '$2,600 – $6,200',
    two: '$5,000 – $9,400',
    three: '$7,600 – $13,600',
    four: '$11,000 – $18,200',
    lines: ['Tax-straddling sanctuary', 'Fisher\'s Landing · Portland spillover', 'ZIP 98660'],
  },
  {
    file: 'sammamish-wa-cost-infographic.svg',
    title: 'Moving to Sammamish, WA',
    subtitle: 'King County · Lake Sammamish Family King',
    studio: '$2,800 – $6,500',
    two: '$5,400 – $9,800',
    three: '$8,200 – $14,200',
    four: '$12,000 – $19,500',
    lines: ['Safe family king · top schools', 'Lake Sammamish plateau living', 'ZIP 98074'],
  },
  {
    file: 'spokane-valley-wa-cost-infographic.svg',
    title: 'Moving to Spokane Valley, WA',
    subtitle: 'Spokane County · Inland Northwest',
    studio: '$2,400 – $5,800',
    two: '$4,400 – $8,800',
    three: '$6,400 – $11,600',
    four: '$9,200 – $16,200',
    lines: ['Inland Northwest bargain', 'Spokane River · Valley Mall corridor', 'ZIP 99206'],
  },
  {
    file: 'pasco-wa-cost-infographic.svg',
    title: 'Moving to Pasco (Tri-Cities), WA',
    subtitle: 'Franklin County · Tri-Cities Growth',
    studio: '$2,500 – $6,000',
    two: '$4,600 – $9,200',
    three: '$6,800 – $12,400',
    four: '$9,800 – $17,200',
    lines: ['Sun-drenched growth engine', 'Tri-Cities energy & agriculture', 'ZIP 99301'],
  },
  {
    file: 'shoreline-wa-cost-infographic.svg',
    title: 'Moving to Shoreline, WA',
    subtitle: 'King County · Sound Transit Gateway',
    studio: '$2,600 – $6,200',
    two: '$5,000 – $9,400',
    three: '$7,600 – $13,600',
    four: '$11,000 – $18,200',
    lines: ['Transit-oriented gateway', 'Sound Transit · Richmond Beach', 'ZIP 98133'],
  },
  {
    file: 'marysville-wa-cost-infographic.svg',
    title: 'Moving to Marysville, WA',
    subtitle: 'Snohomish County · North Sound Growth',
    studio: '$2,600 – $6,200',
    two: '$5,000 – $9,400',
    three: '$7,600 – $13,600',
    four: '$11,000 – $18,200',
    lines: ['North-Sound expansion outlet', 'Smokey Point · Getchell', 'ZIP 98270'],
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