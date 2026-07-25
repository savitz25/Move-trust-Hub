/**
 * Generate WA Tier 2 Wave 1 packs (12 counties).
 * Run: npx tsx scripts/generate-wa-tier2-wave1.ts
 */
import { writePack } from './wa-tier2-render';
import { packsA } from './wa-tier2-wave1-packs-a';
import { packsB } from './wa-tier2-wave1-packs-b';

const packs = [...packsA, ...packsB];
for (const p of packs) writePack(p);
console.log('Generated', packs.length, 'WA Tier 2 Wave 1 packs');
