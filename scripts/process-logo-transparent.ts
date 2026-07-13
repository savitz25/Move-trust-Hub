/**
 * Ensures logo PNG has true transparency (no white matte / halo pixels) and trims excess canvas.
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

function isNearWhite(r: number, g: number, b: number, a: number): boolean {
  if (a === 0) return false;
  // Opaque or semi-opaque matte from export tools.
  if (r >= 235 && g >= 235 && b >= 235) return true;
  // Low-alpha fringe that reads as a white box when scaled.
  if (a < 24 && r >= 200 && g >= 200 && b >= 200) return true;
  return false;
}

async function processLogo(input: string, output: string) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8ClampedArray(data);
  let cleaned = 0;
  let rgbZeroed = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    let a = pixels[i + 3];

    if (isNearWhite(r, g, b, a)) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      pixels[i + 3] = 0;
      cleaned++;
      continue;
    }

    // Critical: zero RGB on fully transparent pixels so browser scaling
    // does not bleed white halos (common PNG artifact).
    if (a === 0 && (r !== 0 || g !== 0 || b !== 0)) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      rgbZeroed++;
    }
  }

  const trimmed = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  await sharp(trimmed).toFile(output);

  console.log(
    `Wrote ${output} (${meta.width}x${meta.height}) — cleaned ${cleaned} matte pixels, zeroed ${rgbZeroed} transparent RGB`
  );
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