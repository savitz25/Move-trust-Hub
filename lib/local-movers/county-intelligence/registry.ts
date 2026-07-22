import { losAngelesCountyIntelligence } from '@/lib/local-movers/county-intelligence/los-angeles-ca';
import { orangeCountyIntelligence } from '@/lib/local-movers/county-intelligence/orange-ca';
import { riversideCountyIntelligence } from '@/lib/local-movers/county-intelligence/riverside-ca';
import { sanBernardinoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-bernardino-ca';
import { sanDiegoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-diego-ca';
import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

const PACKS: CountyIntelligencePack[] = [
  losAngelesCountyIntelligence,
  orangeCountyIntelligence,
  riversideCountyIntelligence,
  sanBernardinoCountyIntelligence,
  sanDiegoCountyIntelligence,
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
