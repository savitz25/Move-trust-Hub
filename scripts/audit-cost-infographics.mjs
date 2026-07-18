import fs from 'fs';
import path from 'path';

const root = process.cwd();
const dir = path.join(root, 'public/images/destinations');
const contentDir = path.join(root, 'lib/destinations/content');

const files = fs.readdirSync(dir).filter((f) => f.endsWith('-cost-infographic.svg'));
let bom = 0;
const bomFiles = [];
for (const f of files) {
  const buf = fs.readFileSync(path.join(dir, f));
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    bom++;
    bomFiles.push(f);
  }
}

const contentFiles = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith('.ts') && !f.startsWith('_'));

const missingImg = [];
const hasOg = [];
for (const f of contentFiles) {
  const text = fs.readFileSync(path.join(contentDir, f), 'utf8');
  const m = text.match(/ogImagePath:\s*['"]([^'"]+)['"]/);
  if (m) {
    hasOg.push(m[1]);
    const publicPath = path.join(root, 'public', m[1].replace(/^\//, ''));
    if (!fs.existsSync(publicPath)) {
      missingImg.push({ file: f, path: m[1] });
    }
  }
}

// images without content
const contentImageSet = new Set(hasOg.map((p) => path.basename(p)));
const orphanImages = files.filter((f) => !contentImageSet.has(f));

console.log(
  JSON.stringify(
    {
      svgTotal: files.length,
      withBom: bom,
      bomSample: bomFiles.slice(0, 8),
      contentWithOg: hasOg.length,
      missingImages: missingImg.length,
      missingSample: missingImg.slice(0, 15),
      orphanImages: orphanImages.length,
    },
    null,
    2
  )
);