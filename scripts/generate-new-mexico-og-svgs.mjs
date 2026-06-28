import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const metroCosts = {
  studio: '$2,400 – $5,800',
  two: '$4,200 – $8,800',
  three: '$6,200 – $12,200',
  four: '$9,200 – $17,500',
};

const culturalCosts = {
  studio: '$2,600 – $6,400',
  two: '$4,600 – $9,500',
  three: '$6,800 – $13,200',
  four: '$10,200 – $18,800',
};

const southernCosts = {
  studio: '$2,400 – $4,700',
  two: '$4,500 – $7,200',
  three: '$6,500 – $10,100',
  four: '$9,200 – $13,800',
};

const svgs = [
  {
    file: 'new-mexico-cluster-cost-infographic.svg',
    title: 'Moving to New Mexico',
    subtitle: 'Rio Grande Metro · Santa Fe Arts · Southern Border · Mountain Resort',
    ...metroCosts,
    lines: ['10 live city guides · Rio Rancho #1 inbound', 'High-desert living · arts heritage · competitive costs', 'movetrusthub.com/moving-to/new-mexico'],
  },
  {
    file: 'rio-rancho-nm-cost-infographic.svg',
    title: 'Moving to Rio Rancho, NM',
    subtitle: 'Sandoval County · #1 in New Mexico',
    ...metroCosts,
    lines: ['Intel expansion · master-planned communities', 'Affordable Rio Grande corridor living', 'ZIP 87144'],
  },
  {
    file: 'albuquerque-nm-cost-infographic.svg',
    title: 'Moving to Albuquerque, NM',
    subtitle: 'Bernalillo County · Major Metro',
    ...metroCosts,
    lines: ['Universities · film production · diverse neighborhoods', 'Rio Grande corridor employment hub', 'ZIP 87102'],
  },
  {
    file: 'corrales-nm-cost-infographic.svg',
    title: 'Moving to Corrales, NM',
    subtitle: 'Bernalillo County · Bosque Village',
    ...southernCosts,
    lines: ['Rio Grande Bosque · equestrian lifestyle', 'Historic rural-urban balance', 'ZIP 87048'],
  },
  {
    file: 'santa-fe-nm-cost-infographic.svg',
    title: 'Moving to Santa Fe, NM',
    subtitle: 'Santa Fe County · Arts Capital',
    ...culturalCosts,
    lines: ['World-renowned arts & culture', 'Historic adobe Plaza charm', 'ZIP 87501'],
  },
  {
    file: 'los-alamos-nm-cost-infographic.svg',
    title: 'Moving to Los Alamos, NM',
    subtitle: 'Los Alamos County · Mesa Community',
    ...southernCosts,
    lines: ['National laboratory · high-income quality of life', 'Sangre de Cristo mesa living', 'ZIP 87544'],
  },
  {
    file: 'taos-nm-cost-infographic.svg',
    title: 'Moving to Taos, NM',
    subtitle: 'Taos County · Artistic Mountain Town',
    ...southernCosts,
    lines: ['Historic adobe · skiing & hiking', 'Creative mountain-town culture', 'ZIP 87571'],
  },
  {
    file: 'las-cruces-nm-cost-infographic.svg',
    title: 'Moving to Las Cruces, NM',
    subtitle: 'Doña Ana County · Southern College Town',
    ...metroCosts,
    lines: ['Organ Mountains views · NMSU culture', 'Southern affordability corridor', 'ZIP 88001'],
  },
  {
    file: 'alamogordo-nm-cost-infographic.svg',
    title: 'Moving to Alamogordo, NM',
    subtitle: 'Otero County · White Sands Corridor',
    ...southernCosts,
    lines: ['Military families · Holloman AFB', 'White Sands National Park desert living', 'ZIP 88310'],
  },
  {
    file: 'farmington-nm-cost-infographic.svg',
    title: 'Moving to Farmington, NM',
    subtitle: 'San Juan County · Four Corners Hub',
    ...metroCosts,
    lines: ['Outdoor recreation · energy sector', 'Affordable northwest New Mexico', 'ZIP 87401'],
  },
  {
    file: 'ruidoso-nm-cost-infographic.svg',
    title: 'Moving to Ruidoso, NM',
    subtitle: 'Lincoln County · Sierra Blanca Resort',
    ...southernCosts,
    lines: ['Mountain resort · skiing · cabin retirement', 'Sierra Blanca recreation corridor', 'ZIP 88345'],
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