import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'new-york-ny-cost-infographic.svg',
    title: 'Moving to New York',
    subtitle: 'Long Island · Westchester · Upstate · Adirondacks',
    studio: '$2,600 – $5,600',
    two: '$4,800 – $8,400',
    three: '$7,000 – $11,600',
    four: '$10,000 – $16,400',
    lines: ['10 live city guides · Downstate & Upstate split', 'LIRR · Metro-North · affordable Upstate', 'movetrusthub.com/moving-to/new-york'],
  },
  {
    file: 'massapequa-park-ny-cost-infographic.svg',
    title: 'Moving to Massapequa Park, NY',
    subtitle: 'Nassau County · Long Island',
    studio: '$3,200 – $6,500',
    two: '$5,800 – $9,600',
    three: '$8,400 – $13,400',
    four: '$12,000 – $18,600',
    lines: ['Quiet high-earning village · top schools', 'Quick LIRR to Manhattan', 'ZIP 11762'],
  },
  {
    file: 'greece-ny-cost-infographic.svg',
    title: 'Moving to Greece, NY',
    subtitle: 'Monroe County · Rochester Area',
    studio: '$2,200 – $4,600',
    two: '$4,000 – $6,800',
    three: '$5,800 – $9,200',
    four: '$8,200 – $12,800',
    lines: ['Affordable Rochester suburb · spacious homes', 'Lake Ontario proximity', 'ZIP 14626'],
  },
  {
    file: 'hicksville-ny-cost-infographic.svg',
    title: 'Moving to Hicksville, NY',
    subtitle: 'Nassau County · LI Transit Hub',
    studio: '$3,100 – $6,400',
    two: '$5,600 – $9,400',
    three: '$8,200 – $13,200',
    four: '$11,800 – $18,200',
    lines: ['LIRR junction · robust economy', 'Excellent shopping corridors', 'ZIP 11801'],
  },
  {
    file: 'cheektowaga-ny-cost-infographic.svg',
    title: 'Moving to Cheektowaga, NY',
    subtitle: 'Erie County · Buffalo Metro',
    studio: '$2,100 – $4,400',
    two: '$3,800 – $6,500',
    three: '$5,600 – $8,800',
    four: '$8,000 – $12,400',
    lines: ['Budget-friendly Buffalo suburb', 'Low cost of living · family-friendly', 'ZIP 14225'],
  },
  {
    file: 'white-plains-ny-cost-infographic.svg',
    title: 'Moving to White Plains, NY',
    subtitle: 'Westchester · Corporate Center',
    studio: '$3,200 – $6,600',
    two: '$5,900 – $9,800',
    three: '$8,600 – $13,600',
    four: '$12,200 – $19,000',
    lines: ['Upscale mini-metropolis · corporate jobs', 'Fast Metro-North to NYC', 'ZIP 10601'],
  },
  {
    file: 'tonawanda-ny-cost-infographic.svg',
    title: 'Moving to Tonawanda, NY',
    subtitle: 'Erie County · Niagara Waterfront',
    studio: '$2,100 – $4,400',
    two: '$3,800 – $6,500',
    three: '$5,600 – $8,800',
    four: '$8,000 – $12,400',
    lines: ['Scenic waterfront near Buffalo', 'Affordable · parks and trails', 'ZIP 14150'],
  },
  {
    file: 'glens-falls-ny-cost-infographic.svg',
    title: 'Moving to Glens Falls, NY',
    subtitle: 'Warren County · Adirondacks Gateway',
    studio: '$2,200 – $4,600',
    two: '$4,000 – $6,800',
    three: '$5,800 – $9,200',
    four: '$8,200 – $12,800',
    lines: ['Adirondacks gateway · arts scene', 'Outdoor recreation · quaint downtown', 'ZIP 12801'],
  },
  {
    file: 'new-rochelle-ny-cost-infographic.svg',
    title: 'Moving to New Rochelle, NY',
    subtitle: 'Westchester · Coastal City',
    studio: '$3,000 – $6,200',
    two: '$5,600 – $9,200',
    three: '$8,200 – $13,000',
    four: '$11,800 – $18,200',
    lines: ['Diverse coastal revitalization', 'Quick Manhattan access', 'ZIP 10801'],
  },
  {
    file: 'elmira-ny-cost-infographic.svg',
    title: 'Moving to Elmira, NY',
    subtitle: 'Chemung County · Southern Tier',
    studio: '$1,900 – $4,000',
    two: '$3,400 – $5,800',
    three: '$5,000 – $7,800',
    four: '$7,200 – $11,200',
    lines: ['Highly affordable Southern Tier', 'Among NY\'s lowest home prices', 'ZIP 14901'],
  },
  {
    file: 'lindenhurst-ny-cost-infographic.svg',
    title: 'Moving to Lindenhurst, NY',
    subtitle: 'Suffolk County · South Shore',
    studio: '$3,000 – $6,200',
    two: '$5,600 – $9,400',
    three: '$8,200 – $13,200',
    four: '$11,800 – $18,200',
    lines: ['Maritime village · beaches · breweries', 'Downtown revival · LIRR access', 'ZIP 11757'],
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