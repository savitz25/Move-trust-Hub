import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'hawaii-cluster-cost-infographic.svg',
    title: 'Moving to Hawaii',
    subtitle: 'Oʻahu · Maui · Big Island · Kauaʻi',
    studio: '$4,500 – $10,500',
    two: '$7,500 – $15,500',
    three: '$11,000 – $20,500',
    four: '$15,500 – $28,000',
    lines: ['10 live city guides · Honolulu urban hub', 'Container shipping · island lifestyle', 'movetrusthub.com/moving-to/hawaii'],
  },
  {
    file: 'honolulu-hi-cost-infographic.svg',
    title: 'Moving to Honolulu, HI',
    subtitle: 'Honolulu County · Oʻahu Capital',
    studio: '$4,500 – $9,500',
    two: '$7,500 – $14,500',
    three: '$11,000 – $19,500',
    four: '$15,500 – $26,500',
    lines: ['Dynamic urban capital · Kakaʻako growth', 'Cultural hub · container shipping', 'ZIP 96813'],
  },
  {
    file: 'kapolei-hi-cost-infographic.svg',
    title: 'Moving to Kapolei, HI',
    subtitle: 'Honolulu County · Second City',
    studio: '$4,500 – $9,500',
    two: '$7,500 – $14,500',
    three: '$11,000 – $19,500',
    four: '$15,500 – $26,500',
    lines: ['Oʻahu Second City · master-planned', 'New housing & retail growth', 'ZIP 96707'],
  },
  {
    file: 'kailua-hi-cost-infographic.svg',
    title: 'Moving to Kailua, HI',
    subtitle: 'Honolulu County · Windward Coast',
    studio: '$4,200 – $9,000',
    two: '$7,000 – $13,500',
    three: '$10,500 – $18,500',
    four: '$14,500 – $25,000',
    lines: ['Windward beach lifestyle', 'Walkable town center', 'ZIP 96734'],
  },
  {
    file: 'pearl-city-hi-cost-infographic.svg',
    title: 'Moving to Pearl City, HI',
    subtitle: 'Honolulu County · Central Oʻahu',
    studio: '$4,200 – $9,000',
    two: '$7,000 – $13,500',
    three: '$10,500 – $18,500',
    four: '$14,500 – $25,000',
    lines: ['Central transit convenience', 'Strong job market', 'ZIP 96782'],
  },
  {
    file: 'waipahu-hi-cost-infographic.svg',
    title: 'Moving to Waipahu, HI',
    subtitle: 'Honolulu County · West Oʻahu',
    studio: '$4,200 – $9,000',
    two: '$7,000 – $13,500',
    three: '$10,500 – $18,500',
    four: '$14,500 – $25,000',
    lines: ['Affordable Oʻahu entry', 'Diverse cuisine · suburban value', 'ZIP 96797'],
  },
  {
    file: 'kihei-hi-cost-infographic.svg',
    title: 'Moving to Kihei, HI',
    subtitle: 'Maui County · South Shore',
    studio: '$4,800 – $10,500',
    two: '$8,000 – $15,500',
    three: '$11,500 – $20,500',
    four: '$16,000 – $28,000',
    lines: ['Sun-drenched beaches', 'Snorkeling & dining corridor', 'ZIP 96753'],
  },
  {
    file: 'wailuku-hi-cost-infographic.svg',
    title: 'Moving to Wailuku, HI',
    subtitle: 'Maui County · County Seat',
    studio: '$4,800 – $10,500',
    two: '$8,000 – $15,500',
    three: '$11,500 – $20,500',
    four: '$16,000 – $28,000',
    lines: ['Historic creative charm', 'West Maui mountain base', 'ZIP 96793'],
  },
  {
    file: 'hilo-hi-cost-infographic.svg',
    title: 'Moving to Hilo, HI',
    subtitle: 'Hawaiʻi County · Windward Big Island',
    studio: '$4,500 – $9,800',
    two: '$7,500 – $14,500',
    three: '$10,800 – $19,000',
    four: '$15,000 – $26,000',
    lines: ['Lush rainforest · affordable', 'Nature lovers gateway', 'ZIP 96720'],
  },
  {
    file: 'kailua-kona-hi-cost-infographic.svg',
    title: 'Moving to Kailua-Kona, HI',
    subtitle: 'Hawaiʻi County · Leeward Coast',
    studio: '$4,800 – $10,500',
    two: '$8,000 – $15,500',
    three: '$11,500 – $20,500',
    four: '$16,000 – $28,000',
    lines: ['Sunny leeward weather', 'Fishing · volcanic landscapes', 'ZIP 96740'],
  },
  {
    file: 'lihue-hi-cost-infographic.svg',
    title: 'Moving to Lihue, HI',
    subtitle: 'Kauaʻi County · Garden Isle',
    studio: '$4,800 – $10,500',
    two: '$8,000 – $15,500',
    three: '$11,500 – $20,500',
    four: '$16,000 – $28,000',
    lines: ['Quiet commercial capital', 'Dramatic natural beauty', 'ZIP 96766'],
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