import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const roadCosts = {
  studio: '$3,200 – $8,000',
  two: '$6,000 – $12,000',
  three: '$9,000 – $17,500',
  four: '$13,500 – $25,000',
};

const hubCosts = {
  studio: '$3,500 – $8,500',
  two: '$6,500 – $12,500',
  three: '$9,500 – $18,000',
  four: '$14,000 – $26,000',
};

const islandCosts = {
  studio: '$3,800 – $9,200',
  two: '$6,800 – $13,500',
  three: '$10,500 – $20,000',
  four: '$15,500 – $29,000',
};

const svgs = [
  {
    file: 'alaska-cluster-cost-infographic.svg',
    title: 'Moving to Alaska',
    subtitle: 'Frontier · Road System · Island Communities',
    ...hubCosts,
    lines: ['10 live city guides · Anchorage hub', 'Outdoor lifestyle · energy & defense jobs', 'movetrusthub.com/moving-to/alaska'],
  },
  {
    file: 'anchorage-ak-cost-infographic.svg',
    title: 'Moving to Anchorage, AK',
    subtitle: 'Anchorage Borough · Largest City',
    ...hubCosts,
    lines: ['Economic · medical · defense hub', 'Short commutes · urban amenities', 'ZIP 99501'],
  },
  {
    file: 'wasilla-ak-cost-infographic.svg',
    title: 'Moving to Wasilla, AK',
    subtitle: 'Mat-Su Valley · Fastest Growing',
    ...roadCosts,
    lines: ['Affordable land · family-focused', 'Mat-Su Road System corridor', 'ZIP 99654'],
  },
  {
    file: 'palmer-ak-cost-infographic.svg',
    title: 'Moving to Palmer, AK',
    subtitle: 'Mat-Su Valley · Agricultural Heritage',
    ...roadCosts,
    lines: ['Historic charm · mountain views', 'Safe suburban community', 'ZIP 99645'],
  },
  {
    file: 'fairbanks-ak-cost-infographic.svg',
    title: 'Moving to Fairbanks, AK',
    subtitle: 'Interior Alaska · University Hub',
    ...roadCosts,
    lines: ['Northern Lights · UAF culture', 'Interior affordability', 'ZIP 99701'],
  },
  {
    file: 'juneau-ak-cost-infographic.svg',
    title: 'Moving to Juneau, AK',
    subtitle: 'State Capital · Island Community',
    ...islandCosts,
    lines: ['Government jobs · Tongass Forest', 'Barge/ferry final-mile required', 'ZIP 99801'],
  },
  {
    file: 'sitka-ak-cost-infographic.svg',
    title: 'Moving to Sitka, AK',
    subtitle: 'Sitka Borough · #1 Safest',
    ...islandCosts,
    lines: ['Maritime heritage · oceanfront', 'Island barge logistics', 'ZIP 99835'],
  },
  {
    file: 'ketchikan-ak-cost-infographic.svg',
    title: 'Moving to Ketchikan, AK',
    subtitle: 'Inside Passage · Rainforest Coast',
    ...islandCosts,
    lines: ['Tourism & maritime jobs', 'Rainforest coastal lifestyle', 'ZIP 99901'],
  },
  {
    file: 'soldotna-ak-cost-infographic.svg',
    title: 'Moving to Soldotna, AK',
    subtitle: 'Kenai Peninsula · River Hub',
    ...roadCosts,
    lines: ['Kenai River recreation', 'Healthcare & logistics anchor', 'ZIP 99669'],
  },
  {
    file: 'kenai-ak-cost-infographic.svg',
    title: 'Moving to Kenai, AK',
    subtitle: 'Kenai Peninsula · Coastal Living',
    ...roadCosts,
    lines: ['Petrochemical & fishing economy', 'Coastal river lifestyle', 'ZIP 99611'],
  },
  {
    file: 'homer-ak-cost-infographic.svg',
    title: 'Moving to Homer, AK',
    subtitle: 'Kenai Peninsula · End of the Road',
    ...roadCosts,
    lines: ['Artsy Spit community', 'Halibut fishing capital', 'ZIP 99603'],
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