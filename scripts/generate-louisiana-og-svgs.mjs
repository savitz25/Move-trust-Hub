import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'louisiana-cluster-cost-infographic.svg',
    title: 'Moving to Louisiana',
    subtitle: 'Gulf Coast · Cajun Culture · Industrial Growth',
    studio: '$2,000 – $4,800',
    two: '$3,700 – $7,500',
    three: '$5,400 – $10,800',
    four: '$7,800 – $15,200',
    lines: ['10 live city guides · Metairie #1 inbound', 'Affordable Gulf Coast living · Cajun heritage', 'movetrusthub.com/moving-to/louisiana'],
  },
  {
    file: 'metairie-la-cost-infographic.svg',
    title: 'Moving to Metairie, LA',
    subtitle: 'Jefferson Parish · #1 in Louisiana',
    studio: '$2,200 – $4,800',
    two: '$4,000 – $7,500',
    three: '$5,800 – $10,800',
    four: '$8,400 – $15,200',
    lines: ['Family-first NOLA suburb · strong value', 'Transit access · Jefferson Parish schools', 'ZIP 70002'],
  },
  {
    file: 'kenner-la-cost-infographic.svg',
    title: 'Moving to Kenner, LA',
    subtitle: 'Jefferson Parish · Airport Corridor',
    studio: '$2,200 – $4,800',
    two: '$4,000 – $7,500',
    three: '$5,800 – $10,800',
    four: '$8,400 – $15,200',
    lines: ['Louis Armstrong airport access', 'Affordable · retirement-friendly', 'ZIP 70062'],
  },
  {
    file: 'slidell-la-cost-infographic.svg',
    title: 'Moving to Slidell, LA',
    subtitle: 'St. Tammany Parish · Northshore',
    studio: '$2,200 – $4,800',
    two: '$4,000 – $7,500',
    three: '$5,800 – $10,800',
    four: '$8,400 – $15,200',
    lines: ['Peaceful nature community', 'Lake Pontchartrain access', 'ZIP 70458'],
  },
  {
    file: 'mandeville-la-cost-infographic.svg',
    title: 'Moving to Mandeville, LA',
    subtitle: 'St. Tammany Parish · Waterfront',
    studio: '$2,200 – $4,800',
    two: '$4,000 – $7,500',
    three: '$5,800 – $10,800',
    four: '$8,400 – $15,200',
    lines: ['Affluent lakefront living · top schools', 'Low crime · Causeway commute', 'ZIP 70448'],
  },
  {
    file: 'lafayette-la-cost-infographic.svg',
    title: 'Moving to Lafayette, LA',
    subtitle: 'Lafayette Parish · Cajun Country',
    studio: '$2,000 – $4,400',
    two: '$3,700 – $7,000',
    three: '$5,400 – $9,800',
    four: '$7,800 – $14,000',
    lines: ['Cultural capital · tech & education', 'UL Lafayette corridor · Acadiana hub', 'ZIP 70501'],
  },
  {
    file: 'lake-charles-la-cost-infographic.svg',
    title: 'Moving to Lake Charles, LA',
    subtitle: 'Calcasieu Parish · Energy Corridor',
    studio: '$2,000 – $4,400',
    two: '$3,700 – $7,000',
    three: '$5,400 – $9,800',
    four: '$7,800 – $14,000',
    lines: ['Industrial & energy boom', 'Manufacturing growth · SW Louisiana', 'ZIP 70601'],
  },
  {
    file: 'houma-la-cost-infographic.svg',
    title: 'Moving to Houma, LA',
    subtitle: 'Terrebonne Parish · Bayou Country',
    studio: '$2,000 – $4,400',
    two: '$3,700 – $7,000',
    three: '$5,400 – $9,800',
    four: '$7,800 – $14,000',
    lines: ['Authentic bayou lifestyle', 'Affordable deep Louisiana living', 'ZIP 70360'],
  },
  {
    file: 'baton-rouge-la-cost-infographic.svg',
    title: 'Moving to Baton Rouge, LA',
    subtitle: 'East Baton Rouge · State Capital',
    studio: '$2,000 – $4,400',
    two: '$3,700 – $7,000',
    three: '$5,400 – $9,800',
    four: '$7,800 – $14,000',
    lines: ['LSU · government · port & industrial', 'Mississippi River capital region', 'ZIP 70801'],
  },
  {
    file: 'prairieville-la-cost-infographic.svg',
    title: 'Moving to Prairieville, LA',
    subtitle: 'Ascension Parish · Capital Suburb',
    studio: '$2,000 – $4,400',
    two: '$3,700 – $7,000',
    three: '$5,400 – $9,800',
    four: '$7,800 – $14,000',
    lines: ['Fastest-growing BR suburb · top schools', 'Ascension Parish family communities', 'ZIP 70769'],
  },
  {
    file: 'bossier-city-la-cost-infographic.svg',
    title: 'Moving to Bossier City, LA',
    subtitle: 'Bossier Parish · North Louisiana',
    studio: '$1,900 – $4,200',
    two: '$3,500 – $6,800',
    three: '$5,100 – $9,400',
    four: '$7,400 – $13,600',
    lines: ['Tech-forward · Shreveport spillover', 'Military & healthcare corridor', 'ZIP 71111'],
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