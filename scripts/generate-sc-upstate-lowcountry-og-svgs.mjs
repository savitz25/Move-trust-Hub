import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'greenville-sc-cost-infographic.svg',
    title: 'Moving to Greenville, SC',
    subtitle: 'Upstate SC · Greenville County · Move Trust Hub',
    studio: '$2,500 – $4,900',
    two: '$4,600 – $7,500',
    three: '$6,800 – $10,600',
    four: '$9,600 – $14,500',
    lines: ['Falls Park · BMW/Michelin corridor', 'Revitalized downtown · Blue Ridge access', 'ZIP 29601'],
  },
  {
    file: 'spartanburg-sc-cost-infographic.svg',
    title: 'Moving to Spartanburg, SC',
    subtitle: 'Upstate SC · Spartanburg County',
    studio: '$2,400 – $4,700',
    two: '$4,400 – $7,200',
    three: '$6,400 – $10,200',
    four: '$9,200 – $13,800',
    lines: ['BMW · Michelin · automotive hub', 'Affordable family living · I-85 corridor', 'ZIP 29301'],
  },
  {
    file: 'hilton-head-sc-cost-infographic.svg',
    title: 'Moving to Hilton Head, SC',
    subtitle: 'Lowcountry · Beaufort County',
    studio: '$3,000 – $5,800',
    two: '$5,600 – $9,000',
    three: '$8,200 – $12,600',
    four: '$11,600 – $17,500',
    lines: ['Premier resort island · world-class golf', 'Luxury retirement & second homes', 'ZIP 29928'],
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