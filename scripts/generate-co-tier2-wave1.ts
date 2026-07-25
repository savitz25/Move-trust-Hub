/**
 * Generate CO Tier 2 Wave 1 packs (12 counties).
 * Run: npx tsx scripts/generate-co-tier2-wave1.ts
 */
import { writePack } from './co-tier2-render';
import { packsA } from './co-tier2-wave1-packs-a';
import { packsB } from './co-tier2-wave1-packs-b';

const packs = [...packsA, ...packsB];
for (const p of packs) writePack(p);
console.log('Generated', packs.length, 'CO Tier 2 Wave 1 packs');
