import { listCountyIntelligencePacks, getCountyIntelligencePack } from '../lib/local-movers/county-intelligence/registry';
import { hasDeepCountyResearch } from '../data/deep-county-research/index';
import { getCountyResearch } from '../lib/local-movers/county-research';
import { classifyCountyContentTier } from '../lib/local-movers/county-content-quality';

const packs = listCountyIntelligencePacks().filter((p) => p.stateSlug === 'new-jersey');
console.log(
  'NJ packs',
  packs.map((p) => p.countySlug)
);

const slugs = [
  'ocean',
  'mercer',
  'somerset',
  'atlantic',
  'gloucester',
  'hunterdon',
  'sussex',
  'warren',
];

const orders = new Set<string>();
for (const s of slugs) {
  const pack = getCountyIntelligencePack('new-jersey', s);
  const deep = hasDeepCountyResearch('new-jersey', s);
  const research = getCountyResearch('new-jersey', s);
  const tier = classifyCountyContentTier('new-jersey', s, Boolean(research));
  const order = pack?.sectionOrder?.join('>') ?? 'default';
  orders.add(order);
  console.log({
    s,
    pack: Boolean(pack),
    deep,
    contentTier: tier,
    sections: order,
    reloc: pack?.relocation?.modules.length,
    specs: pack?.specialized?.length,
    collapsible: pack?.collapsibleDeepContent,
  });
  if (!pack) throw new Error(`missing pack ${s}`);
  if (!deep) throw new Error(`missing deep research ${s}`);
  if (!pack.relocation || pack.relocation.modules.length < 6) {
    throw new Error(`thin relocation ${s}`);
  }
}

console.log('unique section orders', orders.size);
if (orders.size < 6) {
  console.warn('WARNING: section orders may be too similar');
}
console.log('OK');
