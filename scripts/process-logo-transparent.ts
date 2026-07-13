/**
 * Ensures logo PNG has true transparency (no white matte pixels) and trims excess canvas.
 * Run: npx tsx scripts/process-logo-transparent.ts
 */
import sharp from 'sharp';
import { join } from 'path';

import { fileURLToPath } from 'url';
const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SOURCE = join(ROOT, 'MoveTrustHub-recreated-transparent.png');
const OUTPUTS = [
  join(ROOT, 'public', 'logo.png'),
  join(ROOT, 'public', 'logo-dark.png'),
];

async function processLogo(input: string, output: string) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8ClampedArray(data);
  let cleaned = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];

    // Remove near-white matte pixels (common export artifact).
    if (a > 0 && r >= 235 && g >= 235 && b >= 235) {
      pixels[i + 3] = 0;
      cleaned++;
      continue;
    }

    // Premultiply fringe: very low alpha with light gray → fully transparent.
    if (a < 12 && r > 200 && g > 200 && b > 200) {
      pixels[i + 3] = 0;
      cleaned++;
    }
  }

  await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);

  console.log(`Wrote ${output} (cleaned ${cleaned} pixels)`);
}

async function main() {
  for (const out of OUTPUTS) {
    await processLogo(SOURCE, out);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});