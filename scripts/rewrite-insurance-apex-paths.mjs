/**
 * Rewrite public `/insurance/...` hrefs to apex paths (except admin).
 * Does not touch `@/lib/insurance` import paths.
 */
import fs from 'fs';
import path from 'path';

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === '.next' || ent.name === '.git') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(ent.name)) out.push(p);
  }
  return out;
}

const roots = ['app/insurance', 'components/insurance', 'components/hub', 'lib/insurance', 'lib/hub'];
const files = roots.flatMap((r) => (fs.existsSync(r) ? walk(r) : []));
let changed = 0;

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  const orig = s;
  const masks = [];

  s = s.replace(/(@\/(?:lib|components|types|app)\/insurance\/[A-Za-z0-9_\/.-]+)/g, (m) => {
    masks.push(m);
    return `__MASK_${masks.length - 1}__`;
  });

  // Public URL paths in quotes/templates — keep /insurance/admin
  s = s.replace(/(["'`])\/insurance\/(?!admin)/g, '$1/');
  s = s.replace(/(["'`])\/insurance\/(["'`])/g, '$1/$2');
  s = s.replace(/(["'`])\/insurance(["'`])/g, '$1/$2');

  s = s.replace(/__MASK_(\d+)__/g, (_, i) => masks[Number(i)]);

  if (s !== orig) {
    fs.writeFileSync(file, s);
    changed++;
    console.log(path.relative(process.cwd(), file));
  }
}

console.log(`\nUpdated ${changed} files`);
