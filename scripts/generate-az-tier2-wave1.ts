/**
 * Generate AZ Tier 2 Wave 1 packs (11 counties; Pima skipped — Tier-1 depth preserved).
 * Run: npx tsx scripts/generate-az-tier2-wave1.ts
 */
import { writePack } from './az-tier2-render';
import { packsA } from './az-tier2-wave1-packs-a';
import { packsB } from './az-tier2-wave1-packs-b';

const packs = [...packsA, ...packsB];
for (const p of packs) writePack(p);
console.log('Generated', packs.length, 'AZ Tier 2 Wave 1 packs (Pima skipped)');
