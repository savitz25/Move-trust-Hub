import type { InsuranceHub } from '@/types/insurance/agent';

export type LifeIntent =
  | 'moving'
  | 'turning-65'
  | 'health'
  | 'buying-home'
  | 'self-employed'
  | 'researching';

export type CoverageFilter =
  | 'health'
  | 'medicare'
  | 'auto'
  | 'home'
  | 'renters'
  | 'life'
  | 'flood'
  | 'umbrella';

export const LIFE_INTENTS: {
  id: LifeIntent;
  label: string;
  description: string;
  keywords: string[];
  defaultCoverage: CoverageFilter[];
  ctaLabel: string;
}[] = [
  {
    id: 'moving',
    label: "I'm Moving",
    description: 'New state, new ZIP, new coverage rules',
    keywords: ['relocation', 'relocating', 'move', 'corporate', 'transfer', 'inbound'],
    defaultCoverage: ['health', 'auto', 'home', 'renters'],
    ctaLabel: 'Relocation path',
  },
  {
    id: 'turning-65',
    label: 'Turning 65',
    description: 'Medicare Advantage, Medigap, Part D',
    keywords: ['medicare', 'retiree', 'senior', 'part d', 'advantage', 'medigap'],
    defaultCoverage: ['medicare', 'health'],
    ctaLabel: 'Medicare specialists',
  },
  {
    id: 'health',
    label: 'Shopping for Health',
    description: 'ACA, employer transitions, individual plans',
    keywords: ['aca', 'marketplace', 'employer', 'subsidy', 'individual', 'group'],
    defaultCoverage: ['health'],
    ctaLabel: 'Health hubs',
  },
  {
    id: 'buying-home',
    label: 'Buying a Home',
    description: 'Home, flood, umbrella, and binders',
    keywords: ['property', 'home', 'flood', 'wind', 'hail', 'bundle', 'wildfire'],
    defaultCoverage: ['home', 'flood', 'umbrella', 'auto'],
    ctaLabel: 'Home coverage path',
  },
  {
    id: 'self-employed',
    label: 'Self-Employed / 1099',
    description: 'Individual marketplace & small group',
    keywords: ['gig', 'small business', 'self', '1099', 'freelance', 'entertainment'],
    defaultCoverage: ['health', 'life'],
    ctaLabel: 'Independent path',
  },
  {
    id: 'researching',
    label: 'Just Researching',
    description: 'Compare markets and learn first',
    keywords: [],
    defaultCoverage: ['health', 'medicare'],
    ctaLabel: 'Explore markets',
  },
];

export const COVERAGE_OPTIONS: { id: CoverageFilter; label: string }[] = [
  { id: 'health', label: 'Health' },
  { id: 'medicare', label: 'Medicare' },
  { id: 'auto', label: 'Auto' },
  { id: 'home', label: 'Home' },
  { id: 'renters', label: 'Renters' },
  { id: 'life', label: 'Life' },
  { id: 'flood', label: 'Flood' },
  { id: 'umbrella', label: 'Umbrella' },
];

export type MarketTag =
  | 'High Medicare Penetration'
  | 'Health Dense'
  | 'Fast Growing'
  | 'Strong Flood Risk'
  | 'Relocation Hotspot'
  | 'ACA High Volume'
  | 'Multilingual';

export function deriveMarketTags(hub: InsuranceHub): MarketTag[] {
  const tags: MarketTag[] = [];
  const blob = `${hub.enrollmentHighlight} ${hub.marketSnapshot} ${hub.healthNeeds.join(' ')}`.toLowerCase();

  if (hub.healthInsuranceDensity === 'very-high') tags.push('Health Dense');
  if (blob.includes('medicare')) tags.push('High Medicare Penetration');
  if (blob.includes('fastest-growing') || blob.includes('fast-growing') || blob.includes('growth')) {
    tags.push('Fast Growing');
  }
  if (blob.includes('flood') || blob.includes('wind') || blob.includes('hurricane') || blob.includes('wildfire')) {
    tags.push('Strong Flood Risk');
  }
  if (blob.includes('relocation') || blob.includes('corporate') || blob.includes('transfer')) {
    tags.push('Relocation Hotspot');
  }
  if (blob.includes('aca') || blob.includes('marketplace') || blob.includes('covered california')) {
    tags.push('ACA High Volume');
  }
  if (blob.includes('bilingual') || blob.includes('multilingual') || blob.includes('spanish')) {
    tags.push('Multilingual');
  }

  return tags.slice(0, 4);
}

export function coverageRelevance(hub: InsuranceHub): CoverageFilter[] {
  const blob = `${hub.healthNeeds.join(' ')} ${hub.marketSnapshot}`.toLowerCase();
  const out: CoverageFilter[] = ['health'];
  if (blob.includes('medicare')) out.push('medicare');
  if (blob.includes('auto') || blob.includes('property')) out.push('auto');
  if (blob.includes('home') || blob.includes('property') || blob.includes('bundle')) out.push('home');
  if (blob.includes('flood') || blob.includes('wind') || blob.includes('hurricane')) out.push('flood');
  if (blob.includes('life') || blob.includes('annuit')) out.push('life');
  if (blob.includes('umbrella')) out.push('umbrella');
  if (blob.includes('renter')) out.push('renters');
  return [...new Set(out)];
}

export function hubMatchesIntent(hub: InsuranceHub, intent: LifeIntent | null): boolean {
  if (!intent || intent === 'researching') return true;
  const def = LIFE_INTENTS.find((i) => i.id === intent);
  if (!def || def.keywords.length === 0) return true;
  const blob = `${hub.enrollmentHighlight} ${hub.marketSnapshot} ${hub.healthNeeds.join(' ')} ${hub.localDescriptor}`.toLowerCase();
  return def.keywords.some((k) => blob.includes(k));
}

export function hubMatchesCoverage(hub: InsuranceHub, coverage: CoverageFilter[]): boolean {
  if (coverage.length === 0) return true;
  const relevant = coverageRelevance(hub);
  return coverage.some((c) => relevant.includes(c) || c === 'health');
}

export function hubMatchesQuery(hub: InsuranceHub, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  if (/^\d{5}$/.test(q)) {
    return hub.zipCodes.some((z) => z === q || z.startsWith(q.slice(0, 3)));
  }

  return (
    hub.shortName.toLowerCase().includes(q) ||
    hub.msaName.toLowerCase().includes(q) ||
    hub.stateName.toLowerCase().includes(q) ||
    hub.stateCode.toLowerCase() === q ||
    hub.localDescriptor.toLowerCase().includes(q) ||
    hub.slug.includes(q.replace(/\s+/g, '-'))
  );
}

export type HubCardData = {
  slug: string;
  stateSlug: string;
  stateCode: string;
  stateName: string;
  msaName: string;
  shortName: string;
  population: number;
  enrollmentHighlight: string;
  marketSnapshot: string;
  healthInsuranceDensity: InsuranceHub['healthInsuranceDensity'];
  priority: number;
  tags: MarketTag[];
  coverage: CoverageFilter[];
  href: string;
  /** Rough agent capacity signal from density (display only) */
  agentBand: string;
  zipCodes: string[];
  /** Lowercase blob for intent keyword matching on the client */
  searchBlob: string;
};

export function toHubCardData(hub: InsuranceHub): HubCardData {
  const densityLabel =
    hub.healthInsuranceDensity === 'very-high'
      ? '40+ verified specialists'
      : hub.healthInsuranceDensity === 'high'
        ? '20+ verified specialists'
        : '12+ verified specialists';

  return {
    slug: hub.slug,
    stateSlug: hub.stateSlug,
    stateCode: hub.stateCode,
    stateName: hub.stateName,
    msaName: hub.msaName,
    shortName: hub.shortName,
    population: hub.population,
    enrollmentHighlight: hub.enrollmentHighlight,
    marketSnapshot: hub.marketSnapshot,
    healthInsuranceDensity: hub.healthInsuranceDensity,
    priority: hub.priority,
    tags: deriveMarketTags(hub),
    coverage: coverageRelevance(hub),
    href: `/hubs/${hub.stateSlug}/${hub.slug}`,
    agentBand: densityLabel,
    zipCodes: hub.zipCodes,
    searchBlob:
      `${hub.enrollmentHighlight} ${hub.marketSnapshot} ${hub.healthNeeds.join(' ')} ${hub.localDescriptor}`.toLowerCase(),
  };
}

export function cardMatchesIntent(card: HubCardData, intent: LifeIntent | null): boolean {
  if (!intent || intent === 'researching') return true;
  const def = LIFE_INTENTS.find((i) => i.id === intent);
  if (!def || def.keywords.length === 0) return true;
  return def.keywords.some((k) => card.searchBlob.includes(k));
}

export function cardMatchesQuery(card: HubCardData, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  if (/^\d{1,5}$/.test(q)) {
    return card.zipCodes.some((z) => z.startsWith(q) || z === q);
  }

  return (
    card.shortName.toLowerCase().includes(q) ||
    card.msaName.toLowerCase().includes(q) ||
    card.stateName.toLowerCase().includes(q) ||
    card.stateCode.toLowerCase() === q ||
    card.slug.includes(q.replace(/\s+/g, '-')) ||
    card.searchBlob.includes(q)
  );
}

export function resolveLocationLabel(hubs: HubCardData[], query: string): string | null {
  const q = query.trim();
  if (!q) return null;
  if (hubs.length === 1) {
    return `${hubs[0].shortName}, ${hubs[0].stateCode}`;
  }
  if (hubs.length > 1) {
    const states = [...new Set(hubs.map((h) => h.stateName))];
    if (states.length === 1) return `${states[0]} · ${hubs.length} markets`;
    return `${hubs.length} matching markets`;
  }
  if (/^\d{5}$/.test(q)) return `ZIP ${q}`;
  return q;
}
