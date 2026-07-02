import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/lender/directory/categories';
import { lenders } from '@/lib/lender/mockData';
import { stateData } from '@/lib/lender/fdic/stateData';
import { getStateSlugsWithLenders } from '@/lib/lender/mortgage/stateLenders';
import { getStateSlugsWithAutoProviders } from '@/lib/lender/auto/stateProviders';

const CONTENT_CLUSTERS = [
  'south-florida', 'central-florida', 'tampa-bay', 'jacksonville', 'panhandle',
  'north-atlanta', 'metro-outer-ring', 'coastal-savannah', 'middle-georgia',
  'grand-strand', 'upstate', 'lowcountry', 'charlotte-metro', 'research-triangle',
  'piedmont-triad', 'greater-nashville-metro', 'knoxville-east-tennessee',
  'west-valley-boomtowns', 'southeast-valley-pinal-border', 'silicon-valley-spine',
  'inland-empire-affordability-magnets', 'central-valley-alternatives',
  'denver-metro-outer-rings-north-suburbs', 'colorado-springs-stability-volume',
  'foothills-turnkey-mountain-towns', 'dfw-suburbs-silicon-prairie',
  'greater-houston-metro', 'san-antonio-value-play', 'spacex-corridor-sleepy-town-booms',
  'snohomish-transit-corridor', 'south-sound-tacoma-puyallup',
  'southwest-washington-portland-border', 'high-velocity-mid-city-core',
  'upper-northwest-value-surge', 'first-time-buyer-waterfront-hubs',
  'high-demand-boston-neighborhoods', 'gateway-cities-suburban-alternatives',
  'metrowest-bread-and-butter-markets', 'transit-oriented-urban-hotspots-somerville-cambridge',
  'worcester-undisputed-growth-leader', 'nyc-boroughs-brooklyn-queens-manhattan',
  'nyc-suburbs-westchester-putnam', 'upstate-powerhouses-buffalo-albany',
  'philadelphia-metro-area-collar-counties', 'greater-pittsburgh-key-suburbs',
  'central-eastern-pa-affordability-havens', 'highly-competitive-chicago-suburbs',
  'chicago-proper-urban-resurgence', 'central-illinois-affordability-gems',
  'rockford-national-standout', 'ann-arbor-kalamazoo-college-town-demand',
  'grand-rapids-fast-moving-core', 'greater-detroits-value-pockets',
  'lansing-multi-family-investor-magnet', 'national-superstars-suburban-velocity',
  'sweet-spot-commuter-towns', 'hudson-river-gold-coast', 'south-jersey-shore-surge',
] as const;

const CLUSTER_STATE: Record<string, string> = {
  'south-florida': 'florida', 'central-florida': 'florida', 'tampa-bay': 'florida',
  'jacksonville': 'florida', 'panhandle': 'florida', 'north-atlanta': 'georgia',
  'metro-outer-ring': 'georgia', 'coastal-savannah': 'georgia', 'middle-georgia': 'georgia',
  'grand-strand': 'south-carolina', 'upstate': 'south-carolina', 'lowcountry': 'south-carolina',
  'charlotte-metro': 'north-carolina', 'research-triangle': 'north-carolina',
  'piedmont-triad': 'north-carolina', 'greater-nashville-metro': 'tennessee',
  'knoxville-east-tennessee': 'tennessee', 'west-valley-boomtowns': 'arizona',
  'southeast-valley-pinal-border': 'arizona', 'silicon-valley-spine': 'california',
  'inland-empire-affordability-magnets': 'california', 'central-valley-alternatives': 'california',
  'denver-metro-outer-rings-north-suburbs': 'colorado',
  'colorado-springs-stability-volume': 'colorado', 'foothills-turnkey-mountain-towns': 'colorado',
  'dfw-suburbs-silicon-prairie': 'texas', 'greater-houston-metro': 'texas',
  'san-antonio-value-play': 'texas', 'spacex-corridor-sleepy-town-booms': 'texas',
  'snohomish-transit-corridor': 'washington', 'south-sound-tacoma-puyallup': 'washington',
  'southwest-washington-portland-border': 'washington',
  'high-velocity-mid-city-core': 'district-of-columbia',
  'upper-northwest-value-surge': 'district-of-columbia',
  'first-time-buyer-waterfront-hubs': 'district-of-columbia',
  'high-demand-boston-neighborhoods': 'massachusetts',
  'gateway-cities-suburban-alternatives': 'massachusetts',
  'metrowest-bread-and-butter-markets': 'massachusetts',
  'transit-oriented-urban-hotspots-somerville-cambridge': 'massachusetts',
  'worcester-undisputed-growth-leader': 'massachusetts',
  'nyc-boroughs-brooklyn-queens-manhattan': 'new-york',
  'nyc-suburbs-westchester-putnam': 'new-york', 'upstate-powerhouses-buffalo-albany': 'new-york',
  'philadelphia-metro-area-collar-counties': 'pennsylvania',
  'greater-pittsburgh-key-suburbs': 'pennsylvania',
  'central-eastern-pa-affordability-havens': 'pennsylvania',
  'highly-competitive-chicago-suburbs': 'illinois', 'chicago-proper-urban-resurgence': 'illinois',
  'central-illinois-affordability-gems': 'illinois', 'rockford-national-standout': 'illinois',
  'ann-arbor-kalamazoo-college-town-demand': 'michigan', 'grand-rapids-fast-moving-core': 'michigan',
  'greater-detroits-value-pockets': 'michigan', 'lansing-multi-family-investor-magnet': 'michigan',
  'national-superstars-suburban-velocity': 'new-jersey', 'sweet-spot-commuter-towns': 'new-jersey',
  'hudson-river-gold-coast': 'new-jersey', 'south-jersey-shore-surge': 'new-jersey',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-07-02');

  const staticRoutes = [
    '', '/about', '/calculators', '/compare', '/local-lenders', '/fdic-insured-banks',
    '/auto-loan-companies',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 0.92 : path === '/local-lenders' ? 0.9 : 0.85,
  }));

  const fdicStates = Object.keys(stateData).map((state) => ({
    url: `${SITE_URL}/fdic-insured-banks/${state}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const mortgageStates = getStateSlugsWithLenders().map((state) => ({
    url: `${SITE_URL}/local-lenders/${state}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.88,
  }));

  const autoStates = getStateSlugsWithAutoProviders().map((state) => ({
    url: `${SITE_URL}/auto-loan-companies/${state}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const clusters = CONTENT_CLUSTERS.map((cluster) => ({
    url: `${SITE_URL}/local-lenders/${CLUSTER_STATE[cluster]}/${cluster}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.82,
  }));

  const profiles = lenders.map((l) => ({
    url: `${SITE_URL}/lenders/${l.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...fdicStates, ...mortgageStates, ...autoStates, ...clusters, ...profiles];
}