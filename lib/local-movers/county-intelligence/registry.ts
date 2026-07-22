import { alamedaCountyIntelligence } from '@/lib/local-movers/county-intelligence/alameda-ca';
import { contraCostaCountyIntelligence } from '@/lib/local-movers/county-intelligence/contra-costa-ca';
import { essexCountyIntelligence } from '@/lib/local-movers/county-intelligence/essex-nj';
import { fresnoCountyIntelligence } from '@/lib/local-movers/county-intelligence/fresno-ca';
import { losAngelesCountyIntelligence } from '@/lib/local-movers/county-intelligence/los-angeles-ca';
import { orangeCountyIntelligence } from '@/lib/local-movers/county-intelligence/orange-ca';
import { riversideCountyIntelligence } from '@/lib/local-movers/county-intelligence/riverside-ca';
import { sacramentoCountyIntelligence } from '@/lib/local-movers/county-intelligence/sacramento-ca';
import { sanBernardinoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-bernardino-ca';
import { sanDiegoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-diego-ca';
import { santaClaraCountyIntelligence } from '@/lib/local-movers/county-intelligence/santa-clara-ca';
import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

const PACKS: CountyIntelligencePack[] = [
  alamedaCountyIntelligence,
  contraCostaCountyIntelligence,
  essexCountyIntelligence,
  fresnoCountyIntelligence,
  losAngelesCountyIntelligence,
  orangeCountyIntelligence,
  riversideCountyIntelligence,
  sacramentoCountyIntelligence,
  sanBernardinoCountyIntelligence,
  sanDiegoCountyIntelligence,
  santaClaraCountyIntelligence,
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
