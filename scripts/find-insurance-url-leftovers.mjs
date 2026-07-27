import fs from 'fs';
import path from 'path';

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(ent.name)) out.push(p);
  }
  return out;
}

for (const root of ['app/insurance', 'components/insurance', 'components/hub', 'lib/insurance', 'lib/hub']) {
  if (!fs.existsSync(root)) continue;
  for (const f of walk(root)) {
    const lines = fs.readFileSync(f, 'utf8').split(/\n/);
    lines.forEach((l, i) => {
      if (/@\/(?:lib|components|types|app)\/insurance/.test(l)) return;
      if (/from ['"].*insurance/.test(l)) return;
      if (/\/insurance\/admin/.test(l)) return;
      if (/app\/insurance/.test(l)) return;
      // Match URL-like /insurance paths
      if (/['"`]\/insurance(?:\/|$)/.test(l) || /href=["']\/insurance/.test(l)) {
        console.log(`${f}:${i + 1}: ${l.trim().slice(0, 140)}`);
      }
    });
  }
}
