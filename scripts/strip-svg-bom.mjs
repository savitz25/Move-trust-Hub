/**
 * Strip UTF-8 BOM from destination cost SVG assets.
 * BOM breaks <img src="*.svg"> rendering in Chrome/Safari (empty white box, alt only).
 */
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public/images/destinations');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svg'));
let stripped = 0;

for (const f of files) {
  const full = path.join(dir, f);
  const buf = fs.readFileSync(full);
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    fs.writeFileSync(full, buf.subarray(3));
    stripped++;
  }
}

console.log(`Stripped BOM from ${stripped} of ${files.length} SVG files in ${dir}`);