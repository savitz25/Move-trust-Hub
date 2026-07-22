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
import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

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
