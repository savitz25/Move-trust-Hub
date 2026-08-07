/**
 * Process ITH final transport logo into production brand assets.
 * Usage: node scripts/process-insurance-final-logo.mjs [source.png]
 */
import sharp from 'sharp';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BRAND = join(ROOT, 'public', 'insurance', 'brand');
const SOURCE_DIR = join(BRAND, 'source');
const DEFAULT_SRC = join(
  'C:',
  'Users',
  'Michael.Savitsky',
  'moch up design',
  'ITH final transport logo.png'
);
const SRC = process.argv[2] || DEFAULT_SRC;
const VERSION_NOTE = '20260807final';

function isMatte(r, g, b, a) {
  if (a === 0) return false;
  // Near-black plate from preview exports (not part of mark)
  if (r <= 18 && g <= 18 && b <= 28 && a > 200) return true;
  // Near-white matte
  if (r >= 240 && g >= 240 && b >= 240) return true;
  return false;
}

async function cleanAndTrim(inputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const px = new Uint8ClampedArray(data);
  let cleaned = 0;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const a = px[i + 3];
    if (isMatte(r, g, b, a)) {
      px[i] = 0;
      px[i + 1] = 0;
      px[i + 2] = 0;
      px[i + 3] = 0;
      cleaned++;
      continue;
    }
    if (a === 0 && (r || g || b)) {
      px[i] = 0;
      px[i + 1] = 0;
      px[i + 2] = 0;
    }
  }
  const trimmed = await sharp(Buffer.from(px), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 8 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  const meta = await sharp(trimmed).metadata();
  console.log(
    `trim: ${meta.width}x${meta.height} (cleaned ${cleaned} matte pixels)`
  );
  return { buffer: trimmed, width: meta.width, height: meta.height };
}

async function writePng(buffer, outPath, { width, height } = {}) {
  let pipeline = sharp(buffer).ensureAlpha();
  if (width || height) {
    pipeline = pipeline.resize({
      width,
      height,
      fit: 'inside',
      withoutEnlargement: false,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  }
  await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(outPath);
  const m = await sharp(outPath).metadata();
  console.log(`  → ${outPath.replace(ROOT, '')} ${m.width}x${m.height}`);
}

/** Icon mark: left square of lockup (bracket + nodes + glow). */
async function extractMark(lockupBuffer, lockupW, lockupH) {
  // Mark is roughly square; take left portion with padding for glow
  const side = Math.min(lockupH, Math.round(lockupW * 0.32));
  const mark = await sharp(lockupBuffer)
    .extract({ left: 0, top: 0, width: Math.min(side, lockupW), height: lockupH })
    .trim({ threshold: 8 })
    .png()
    .toBuffer();
  // Pad to square transparent canvas
  const m = await sharp(mark).metadata();
  const size = Math.max(m.width, m.height);
  const square = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: mark,
        left: Math.floor((size - m.width) / 2),
        top: Math.floor((size - m.height) / 2),
      },
    ])
    .png()
    .toBuffer();
  return square;
}

async function resizeSquare(markBuffer, size, { padRatio = 0.08 } = {}) {
  const pad = Math.round(size * padRatio);
  const inner = size - pad * 2;
  const resized = await sharp(markBuffer)
    .resize(inner, inner, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, left: pad, top: pad }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function writeIco(png16, png32, png48, outPath) {
  // Minimal multi-size ICO: prefer sharp → single 32 if ico not available via toFormat
  // Write 32x32 as .ico container using PNG-in-ICO format
  const images = [
    { size: 16, buf: png16 },
    { size: 32, buf: png32 },
    { size: 48, buf: png48 },
  ];
  const count = images.length;
  let offset = 6 + count * 16;
  const entries = [];
  const payloads = [];
  for (const img of images) {
    payloads.push(img.buf);
    entries.push({ size: img.size, offset, bytes: img.buf.length });
    offset += img.buf.length;
  }
  const header = Buffer.alloc(6 + count * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  for (let i = 0; i < count; i++) {
    const e = entries[i];
    const o = 6 + i * 16;
    header[o] = e.size >= 256 ? 0 : e.size;
    header[o + 1] = e.size >= 256 ? 0 : e.size;
    header[o + 2] = 0;
    header[o + 3] = 0;
    header.writeUInt16LE(1, o + 4);
    header.writeUInt16LE(32, o + 6);
    header.writeUInt32LE(e.bytes, o + 8);
    header.writeUInt32LE(e.offset, o + 12);
  }
  const { writeFileSync } = await import('fs');
  writeFileSync(outPath, Buffer.concat([header, ...payloads]));
  console.log(`  → ${outPath.replace(ROOT, '')} (ico ${count} sizes)`);
}

async function main() {
  if (!existsSync(SRC)) {
    console.error('Source not found:', SRC);
    process.exit(1);
  }
  mkdirSync(SOURCE_DIR, { recursive: true });
  const archived = join(SOURCE_DIR, 'ITH-final-transport-logo.png');
  copyFileSync(SRC, archived);
  console.log('Archived source →', archived.replace(ROOT, ''));

  const { buffer: lockup, width: lw, height: lh } = await cleanAndTrim(SRC);

  // Full production lockups (transparent)
  await writePng(lockup, join(BRAND, 'insurance-trust-hub-logo.png'), {
    width: 960,
  });
  await writePng(lockup, join(BRAND, 'insurance-trust-hub-logo@2x.png'), {
    width: 1440,
  });
  await writePng(lockup, join(BRAND, 'insurance-trust-hub-logo-header.png'), {
    width: 560,
  });
  await writePng(lockup, join(BRAND, 'insurance-trust-hub-logo-header@2x.png'), {
    width: 960,
  });
  // Footer: same art (glow designed for navy) — slightly smaller
  await writePng(lockup, join(BRAND, 'insurance-trust-hub-logo-footer.png'), {
    width: 480,
  });
  await writePng(lockup, join(BRAND, 'insurance-trust-hub-logo-stacked.png'), {
    width: 640,
  });
  await writePng(lockup, join(BRAND, 'insurance-trust-hub-logo-stacked@2x.png'), {
    width: 960,
  });
  await writePng(lockup, join(BRAND, 'insurance-trust-hub-logo-stacked-sm.png'), {
    width: 360,
  });

  // Mark / favicons
  const mark = await extractMark(lockup, lw, lh);
  await writePng(mark, join(BRAND, 'insurance-trust-hub-icon-mark.png'), {
    width: 512,
  });

  const sizes = [
    [16, 'insurance-trust-hub-favicon-16.png'],
    [32, 'insurance-trust-hub-favicon-32.png'],
    [48, 'insurance-trust-hub-favicon-48.png'],
    [180, 'apple-touch-icon.png'],
    [192, 'insurance-trust-hub-icon-192.png'],
    [512, 'insurance-trust-hub-icon.png'],
  ];
  const icoBufs = {};
  for (const [size, name] of sizes) {
    const buf = await resizeSquare(mark, size, {
      padRatio: size <= 48 ? 0.06 : 0.1,
    });
    await sharp(buf).png({ compressionLevel: 9 }).toFile(join(BRAND, name));
    console.log(`  → /public/insurance/brand/${name} ${size}x${size}`);
    if (size === 16 || size === 32 || size === 48) icoBufs[size] = buf;
  }

  await writeIco(
    icoBufs[16],
    icoBufs[32],
    icoBufs[48],
    join(BRAND, 'favicon.ico')
  );

  // OG share card: navy plate + centered lockup (social needs opaque bg)
  const ogW = 1200;
  const ogH = 630;
  const logoForOg = await sharp(lockup)
    .resize({ width: 900, fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logoForOg).metadata();
  await sharp({
    create: {
      width: ogW,
      height: ogH,
      channels: 4,
      background: { r: 10, g: 37, b: 64, alpha: 1 }, // #0A2540 Shield navy
    },
  })
    .composite([
      {
        input: logoForOg,
        left: Math.floor((ogW - logoMeta.width) / 2),
        top: Math.floor((ogH - logoMeta.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(BRAND, 'insurance-trust-hub-og.png'));
  console.log('  → /public/insurance/brand/insurance-trust-hub-og.png 1200x630');

  console.log('\nDone. Bump INSURANCE_LOGO_VERSION to', VERSION_NOTE);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
