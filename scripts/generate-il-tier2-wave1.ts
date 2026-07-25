/**
 * Generate IL Tier 2 Wave 1 county intelligence packs (12 counties).
 * Run: npx tsx scripts/generate-il-tier2-wave1.ts
 */
import { writePack } from './il-tier2-render';
import { packsA } from './il-tier2-wave1-packs-a';
import { packsB } from './il-tier2-wave1-packs-b';

const packs = [...packsA, ...packsB];
for (const p of packs) writePack(p);
console.log('Generated', packs.length, 'IL Tier 2 Wave 1 packs');
