/**
 * Export static 1200×630 OG PNGs to public/og/ for manual meta-tag use.
 *
 *   npx tsx scripts/export-og-images.tsx
 */
import React from 'react';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { ImageResponse } from 'next/og';
import {
  INSURANCE_OG_CONFIG,
  LENDER_OG_CONFIG,
  MOVE_OG_CONFIG,
  type TrustHubOgConfig,
} from '../lib/og/trust-hub-og-config';
import { TrustHubOgImage } from '../lib/og/trust-hub-og-image';

const SIZE = { width: 1200, height: 630 };

const EXPORTS: Array<{ filename: string; config: TrustHubOgConfig }> = [
  { filename: 'moving-og.png', config: MOVE_OG_CONFIG },
  { filename: 'lender-og.png', config: LENDER_OG_CONFIG },
  { filename: 'insurance-og.png', config: INSURANCE_OG_CONFIG },
];

async function exportOne(filename: string, config: TrustHubOgConfig): Promise<void> {
  const response = new ImageResponse(<TrustHubOgImage config={config} />, SIZE);
  const buffer = Buffer.from(await response.arrayBuffer());
  const outDir = resolve(process.cwd(), 'public/og');
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, filename);
  writeFileSync(outPath, buffer);
  console.log(`✓ ${outPath} (${buffer.length} bytes)`);
}

async function main() {
  for (const item of EXPORTS) {
    await exportOne(item.filename, item.config);
  }
  console.log('\nDone — three OG images exported to public/og/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});