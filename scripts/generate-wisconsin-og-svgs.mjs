import fs from 'fs';
import path from 'path';

const dir = 'public/images/destinations';

const svgs = [
  {
    file: 'wisconsin-wi-cost-infographic.svg',
    title: 'Moving to Wisconsin',
    subtitle: 'Badger State · quality of life · diverse regions',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,800',
    three: '$5,800 – $10,400',
    four: '$8,400 – $14,800',
    lines: ['10 live city guides · four corridors', 'Madison to Mississippi bluff living', 'movetrusthub.com/moving-to/wisconsin'],
  },
  {
    file: 'madison-wi-cost-infographic.svg',
    title: 'Moving to Madison, WI',
    subtitle: 'Dane County · UW-Madison Isthmus',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,800',
    three: '$6,000 – $10,400',
    four: '$8,800 – $14,600',
    lines: ['Vibrant consensus king · Capitol', 'Near East · Monroe Street · lakes', 'ZIP 53703'],
  },
  {
    file: 'verona-wi-cost-infographic.svg',
    title: 'Moving to Verona, WI',
    subtitle: 'Dane County · Epic Systems Campus',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,800',
    three: '$6,000 – $10,400',
    four: '$8,800 – $14,600',
    lines: ['Epic tech sandbox · campus corridor', 'Subdivision HOA move-day planning', 'ZIP 53593'],
  },
  {
    file: 'sun-prairie-wi-cost-infographic.svg',
    title: 'Moving to Sun Prairie, WI',
    subtitle: 'Dane County · Northeast Madison Commuter',
    studio: '$2,200 – $5,400',
    two: '$4,000 – $7,800',
    three: '$6,000 – $10,400',
    four: '$8,800 – $14,600',
    lines: ['Fast-growing commuter magnet', 'Builder pipeline · Main Street', 'ZIP 53590'],
  },
  {
    file: 'brookfield-wi-cost-infographic.svg',
    title: 'Moving to Brookfield, WI',
    subtitle: 'Waukesha County · Premium West Suburb',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,800',
    lines: ['Premium Milwaukee standard', 'Brookfield Square · Elmbrook schools', 'ZIP 53045'],
  },
  {
    file: 'oconomowoc-wi-cost-infographic.svg',
    title: 'Moving to Oconomowoc, WI',
    subtitle: 'Waukesha County · Lake Country',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,800',
    lines: ['Lake Country haven · Lac La Belle', 'Waterfront · downtown lakefront', 'ZIP 53066'],
  },
  {
    file: 'whitefish-bay-wi-cost-infographic.svg',
    title: 'Moving to Whitefish Bay, WI',
    subtitle: 'Milwaukee County · North Shore Elite',
    studio: '$2,400 – $5,600',
    two: '$4,400 – $8,200',
    three: '$6,400 – $11,000',
    four: '$9,200 – $15,800',
    lines: ['Elite lakeside enclave', 'Lake Michigan · Klode Park', 'ZIP 53217'],
  },
  {
    file: 'appleton-wi-cost-infographic.svg',
    title: 'Moving to Appleton, WI',
    subtitle: 'Outagamie County · Fox Valley',
    studio: '$2,100 – $5,000',
    two: '$3,900 – $7,400',
    three: '$5,600 – $9,800',
    four: '$8,200 – $14,200',
    lines: ['Fox Valley powerhouse', 'Lawrence University · College Ave', 'ZIP 54911'],
  },
  {
    file: 'green-bay-wi-cost-infographic.svg',
    title: 'Moving to Green Bay, WI',
    subtitle: 'Brown County · Titletown Classic',
    studio: '$2,100 – $5,000',
    two: '$3,900 – $7,400',
    three: '$5,600 – $9,800',
    four: '$8,200 – $14,200',
    lines: ['Affordable community classic', 'Packers · Titletown District', 'ZIP 54301'],
  },
  {
    file: 'eau-claire-wi-cost-infographic.svg',
    title: 'Moving to Eau Claire, WI',
    subtitle: 'Eau Claire County · Creative Renaissance',
    studio: '$2,100 – $5,000',
    two: '$3,900 – $7,400',
    three: '$5,600 – $9,800',
    four: '$8,200 – $14,200',
    lines: ['Creative & indie renaissance', 'UW-Eau Claire · Phoenix Park', 'ZIP 54701'],
  },
  {
    file: 'la-crosse-wi-cost-infographic.svg',
    title: 'Moving to La Crosse, WI',
    subtitle: 'La Crosse County · Mississippi Bluffs',
    studio: '$2,100 – $5,000',
    two: '$3,900 – $7,400',
    three: '$5,600 – $9,800',
    four: '$8,200 – $14,200',
    lines: ['Scenic Mississippi jewel', 'Grandad Bluff · UW-La Crosse', 'ZIP 54601'],
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