import { alamedaCountyIntelligence } from '@/lib/local-movers/county-intelligence/alameda-ca';
import { bergenCountyIntelligence } from '@/lib/local-movers/county-intelligence/bergen-nj';
import { contraCostaCountyIntelligence } from '@/lib/local-movers/county-intelligence/contra-costa-ca';
import { essexCountyIntelligence } from '@/lib/local-movers/county-intelligence/essex-nj';
import { fresnoCountyIntelligence } from '@/lib/local-movers/county-intelligence/fresno-ca';
import { losAngelesCountyIntelligence } from '@/lib/local-movers/county-intelligence/los-angeles-ca';
import { middlesexCountyIntelligence } from '@/lib/local-movers/county-intelligence/middlesex-nj';
import { monmouthCountyIntelligence } from '@/lib/local-movers/county-intelligence/monmouth-nj';
import { morrisCountyIntelligence } from '@/lib/local-movers/county-intelligence/morris-nj';
import { oceanCountyIntelligence } from '@/lib/local-movers/county-intelligence/ocean-nj';
import { orangeCountyIntelligence } from '@/lib/local-movers/county-intelligence/orange-ca';
import { riversideCountyIntelligence } from '@/lib/local-movers/county-intelligence/riverside-ca';
import { sacramentoCountyIntelligence } from '@/lib/local-movers/county-intelligence/sacramento-ca';
import { sanBernardinoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-bernardino-ca';
import { sanDiegoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-diego-ca';
import { santaClaraCountyIntelligence } from '@/lib/local-movers/county-intelligence/santa-clara-ca';
import { warrenCountyIntelligence } from '@/lib/local-movers/county-intelligence/warren-nj';
import { atlanticCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/atlantic-nj';
import { gloucesterCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/gloucester-nj';
import { hunterdonCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/hunterdon-nj';
import { mercerCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/mercer-nj';
import { somersetCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/somerset-nj';
import { sussexCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/sussex-nj';
import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Prefer root-level flagship packs (richer logistics drafts on main).
 * Subfolder packs fill Mercer / Somerset / Atlantic / Gloucester / Hunterdon / Sussex.
 * Ocean + Warren root packs stay primary (also enhanced with relocation below via patch).
 */
const PACKS: CountyIntelligencePack[] = [
  alamedaCountyIntelligence,
  bergenCountyIntelligence,
  contraCostaCountyIntelligence,
  essexCountyIntelligence,
  fresnoCountyIntelligence,
  losAngelesCountyIntelligence,
  middlesexCountyIntelligence,
  monmouthCountyIntelligence,
  morrisCountyIntelligence,
  oceanCountyIntelligence,
  orangeCountyIntelligence,
  riversideCountyIntelligence,
  sacramentoCountyIntelligence,
  sanBernardinoCountyIntelligence,
  sanDiegoCountyIntelligence,
  santaClaraCountyIntelligence,
  warrenCountyIntelligence,
  // NJ Tier-1 wave (unique packs)
  mercerCountyNjIntelligence,
  somersetCountyNjIntelligence,
  atlanticCountyNjIntelligence,
  gloucesterCountyNjIntelligence,
  hunterdonCountyNjIntelligence,
  sussexCountyNjIntelligence,
];

const byKey = new Map(
  PACKS.map((p) => [`${p.stateSlug}/${p.countySlug}`, p] as const)
);

/** Hyper-local intelligence pack when curated for this county. */
export function getCountyIntelligencePack(
  stateSlug: string,
  countySlug: string
): CountyIntelligencePack | null {
  return byKey.get(`${stateSlug}/${countySlug}`) ?? null;
}

export function hasCountyIntelligencePack(
  stateSlug: string,
  countySlug: string
): boolean {
  return byKey.has(`${stateSlug}/${countySlug}`);
}

export function listCountyIntelligencePacks(): CountyIntelligencePack[] {
  return [...PACKS];
}
