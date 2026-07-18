/**
 * Strip consumer-facing "Live" / "production-ready" / internal hub-status language.
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (/\.(tsx|ts)$/.test(name)) acc.push(full);
  }
  return acc;
}

const replacements = [
  // Section intros
  [
    /Four production-ready hubs covering/g,
    'City guides covering',
  ],
  [
    /Three production-ready hubs covering/g,
    'City guides covering',
  ],
  [
    /Six production-ready hubs covering/g,
    'City guides covering',
  ],
  [
    /Nine production-ready hubs covering/g,
    'City guides covering',
  ],
  [
    /(\d+) production-ready hubs covering/g,
    'City guides covering',
  ],
  [
    /production-ready hubs covering/gi,
    'City guides covering',
  ],
  [
    /— Live City Guides/g,
    '— City Guides',
  ],
  [
    /Live City Guides/g,
    'City Guides',
  ],
  // Florida cluster intro
  [
    /Fourteen live Florida hubs now span three corridors:/g,
    'Florida city guides span three corridors:',
  ],
  [
    /(\d+) live Florida hubs now span/g,
    'Florida city guides span',
  ],
  [
    /live hubs now span/gi,
    'city guides span',
  ],
];

// CorridorCityGrid Live/Soon badge block — common pattern across state pages
const liveBadgeBlock = new RegExp(
  String.raw`\{isLive \? \(\s*<span className="text-\[10px\] font-semibold uppercase tracking-wider text-emerald-600 shrink-0">\s*Live\s*</span>\s*\) : \(\s*<span className="text-\[10px\] font-semibold uppercase tracking-wider text-muted-foreground shrink-0">\s*Soon\s*</span>\s*\)\}`,
  'gs'
);

const ariaLive = /aria-label=\{`\$\{sub\.displayName\}, \$\{sub\.stateCode\} — live city guide`\}/g;
const soonSpan = /\s*<span className="text-\[10px\] uppercase tracking-wide ml-1\.5 text-muted-foreground\/70">\s*\(soon\)\s*<\/span>/g;
const ariaSoon = /aria-label=\{`\$\{sub\.displayName\}, \$\{sub\.stateCode\} — city guide coming soon`\}/g;

let filesChanged = 0;
const files = [
  ...walk(path.join(root, 'app')),
  ...walk(path.join(root, 'lib', 'destinations')),
  ...walk(path.join(root, 'components', 'destinations')),
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const original = text;

  for (const [from, to] of replacements) {
    text = text.replace(from, to);
  }

  text = text.replace(liveBadgeBlock, '');
  text = text.replace(ariaLive, 'aria-label={`${sub.displayName}, ${sub.stateCode} city guide`}');
  text = text.replace(soonSpan, '');
  text = text.replace(ariaSoon, 'aria-label={`${sub.displayName}, ${sub.stateCode} city guide`}');

  // Grand strand / cluster card Live/Soon labels as standalone strings in JSX
  // handled in dedicated component rewrites

  if (text !== original) {
    fs.writeFileSync(file, text);
    filesChanged++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`\nChanged ${filesChanged} files`);