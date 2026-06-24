/**
 * Regenerates transparent PNG logos from SVG wordmarks.
 * Run: npx tsx scripts/process-logo-transparency.ts
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

async function svgToTransparentPng(
  svgPath: string,
  pngPath: string,
  width: number
) {
  const svg = fs.readFileSync(svgPath);
  await sharp(svg, { density: 300 })
    .resize(width)
    .png({ compressionLevel: 9 })
    .toFile(pngPath);

  const meta = await sharp(pngPath).metadata();
  console.log(`Wrote ${path.basename(pngPath)} (${meta.width}x${meta.height}, ${meta.channels} channels)`);
}

async function main() {
  await svgToTransparentPng(
    path.join(PUBLIC, 'logo-wordmark.svg'),
    path.join(PUBLIC, 'logo.png'),
    1024
  );
  await svgToTransparentPng(
    path.join(PUBLIC, 'logo-wordmark-dark.svg'),
    path.join(PUBLIC, 'logo-dark.png'),
    1024
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});