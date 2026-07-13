/**
 * Backfill FDIC bank JSON — restore leading zeros stripped from ZIP codes.
 * Usage: npx tsx scripts/fix-fdic-zip-codes.ts
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { normalizeHeadquartersAddress } from '../lib/lender/fdic/utils';

const dataDir = join(process.cwd(), 'lib/lender/fdic/data');
let filesChanged = 0;
let addressesFixed = 0;

for (const file of readdirSync(dataDir).filter((f) => f.endsWith('.json'))) {
  const filePath = join(dataDir, file);
  const raw = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw) as { banks: { headquarters_address: string }[] };
  let changed = false;

  for (const bank of data.banks) {
    const fixed = normalizeHeadquartersAddress(bank.headquarters_address);
    if (fixed !== bank.headquarters_address) {
      bank.headquarters_address = fixed;
      changed = true;
      addressesFixed++;
    }
  }

  if (changed) {
    writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    filesChanged++;
    console.log(`Fixed ${file}`);
  }
}

console.log(`Done. ${addressesFixed} addresses in ${filesChanged} files updated.`);