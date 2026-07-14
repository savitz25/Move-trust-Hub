import { floridaCountyResearch } from '@/data/florida-county-research';
import { promoteStateResearchMap } from '@/data/deep-county-research/enrichment';
import type { DeepCountyResearch } from '@/data/deep-county-research/types';

/** Florida Phase 3 wave — all Grok-heavy FL county research promoted to deep guides. */
const FL_METRO_SLUGS = new Set([
  'miami-dade',
  'broward',
  'palm-beach',
  'hillsborough',
  'orange',
  'pinellas',
  'duval',
  'lee',
  'seminole',
  'brevard',
  'sarasota',
  'collier',
  'volusia',
  'polk',
  'manatee',
  'alachua',
  'escambia',
  'leon',
  'st-johns',
  'okaloosa',
]);

const FL_LABELS: Record<string, string> = {
  'miami-dade': 'Miami-Dade County',
  broward: 'Broward County',
  'palm-beach': 'Palm Beach County',
  hillsborough: 'Hillsborough County',
  orange: 'Orange County',
  pinellas: 'Pinellas County',
  duval: 'Duval County',
  lee: 'Lee County',
  seminole: 'Seminole County',
  brevard: 'Brevard County',
  sarasota: 'Sarasota County',
  collier: 'Collier County',
  volusia: 'Volusia County',
  polk: 'Polk County',
  manatee: 'Manatee County',
};

export const floridaDeepCountyResearch: Record<string, DeepCountyResearch> =
  promoteStateResearchMap('florida', floridaCountyResearch, FL_METRO_SLUGS, FL_LABELS);