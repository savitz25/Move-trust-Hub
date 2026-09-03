import { mkdir, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { renderMoveShareImage } from '../lib/og/move-share-card';
import { moveEntityShareModel, moveFallbackShareModel, moveStateShareModel, type MoveShareCardModel } from '../lib/seo/share-card-model';

const outputDirectory = 'artifacts/share-004a';
const cases: Record<string, MoveShareCardModel> = {
  homepage: moveFallbackShareModel(),
  florida: moveStateShareModel({ stateName: 'Florida' }),
  entity: moveEntityShareModel({ name: 'International Van Lines', headquarters: 'Coral Springs, Florida', usdotLabel: 'USDOT 1865578', profileLabel: 'Mover research' }),
  'long-context': { kind: 'content', eyebrow: 'INTERSTATE MOVING INTELLIGENCE', title: 'Consumer Moving Research Across a Complex Multi-State Market', fact: 'Registration · authority · public-source research' },
  'long-entity': moveEntityShareModel({ name: 'International Household Goods Transportation and Relocation Services LLC', headquarters: 'Fort Lauderdale, Florida', usdotLabel: 'USDOT 1234567', profileLabel: 'Mover research' }),
};

async function writeImage(name: string, model: MoveShareCardModel) {
  const started = performance.now();
  const response = renderMoveShareImage(model);
  await writeFile(`${outputDirectory}/move-${name}.png`, Buffer.from(await response.arrayBuffer()));
  console.log(`${name}: ${Math.round(performance.now() - started)} ms`);
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  const selected = process.argv[2];
  if (selected) {
    const model = cases[selected];
    if (!model) throw new Error(`Unknown card case: ${selected}`);
    await writeImage(selected, model);
    return;
  }
  for (const [name, model] of Object.entries(cases)) await writeImage(name, model);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
