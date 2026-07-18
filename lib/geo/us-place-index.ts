import { listCityCountyAliases } from '@/lib/home/city-county-aliases';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';

export type IndexedPlace = {
  city: string;
  cityNorm: string;
  stateCode: string;
  stateSlug: string;
  stateName: string;
  countySlug: string | null;
  countyName: string | null;
  /** Base rank for ranking ambiguous cities (higher = preferred). */
  priority: number;
};

function titleCaseCity(normCity: string): string {
  return normCity
    .split(' ')
    .map((w) => {
      if (!w) return w;
      if (w === 'st') return 'St.';
      return w[0]!.toUpperCase() + w.slice(1);
    })
    .join(' ');
}

export function normalizePlaceQuery(value: string): string {
  return value
    .toLowerCase()
    .replace(/\bst\.\b/g, 'st')
    .replace(/\bsaint\b/g, 'st')
    .replace(/[^a-z0-9\s,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Major metros get a population-style boost when the same city name exists in multiple states. */
const PRIORITY_BOOST: Record<string, number> = {
  'new york|ny': 1000,
  'los angeles|ca': 980,
  'chicago|il': 960,
  'houston|tx': 940,
  'phoenix|az': 920,
  'philadelphia|pa': 900,
  'san antonio|tx': 880,
  'san diego|ca': 860,
  'dallas|tx': 850,
  'san jose|ca': 840,
  'austin|tx': 830,
  'jacksonville|fl': 820,
  'fort worth|tx': 810,
  'columbus|oh': 800,
  'charlotte|nc': 790,
  'indianapolis|in': 780,
  'san francisco|ca': 770,
  'seattle|wa': 760,
  'denver|co': 750,
  'oklahoma city|ok': 740,
  'nashville|tn': 730,
  'el paso|tx': 720,
  'washington|dc': 710,
  'boston|ma': 700,
  'las vegas|nv': 690,
  'portland|or': 680,
  'detroit|mi': 670,
  'memphis|tn': 660,
  'louisville|ky': 650,
  'baltimore|md': 640,
  'milwaukee|wi': 630,
  'albuquerque|nm': 620,
  'tucson|az': 610,
  'fresno|ca': 600,
  'sacramento|ca': 590,
  'mesa|az': 580,
  'atlanta|ga': 570,
  'kansas city|mo': 560,
  'colorado springs|co': 550,
  'omaha|ne': 540,
  'raleigh|nc': 530,
  'miami|fl': 520,
  'long beach|ca': 510,
  'virginia beach|va': 500,
  'oakland|ca': 490,
  'minneapolis|mn': 480,
  'tulsa|ok': 470,
  'tampa|fl': 460,
  'arlington|tx': 450,
  'new orleans|la': 440,
  'wichita|ks': 430,
  'cleveland|oh': 420,
  'bakersfield|ca': 410,
  'aurora|co': 400,
  'anaheim|ca': 390,
  'honolulu|hi': 380,
  'santa ana|ca': 370,
  'riverside|ca': 360,
  'corpus christi|tx': 350,
  'lexington|ky': 340,
  'henderson|nv': 330,
  'stockton|ca': 320,
  'st paul|mn': 310,
  'saint paul|mn': 310,
  'cincinnati|oh': 300,
  'st louis|mo': 290,
  'saint louis|mo': 290,
  'pittsburgh|pa': 280,
  'greensboro|nc': 270,
  'lincoln|ne': 260,
  'plano|tx': 250,
  'anchorage|ak': 240,
  'orlando|fl': 230,
  'irvine|ca': 220,
  'newark|nj': 210,
  'durham|nc': 200,
  'chula vista|ca': 190,
  'toledo|oh': 180,
  'fort wayne|in': 170,
  'st petersburg|fl': 160,
  'saint petersburg|fl': 160,
  'laredo|tx': 150,
  'jersey city|nj': 140,
  'chandler|az': 130,
  'madison|wi': 120,
  'lubbock|tx': 110,
  'scottsdale|az': 100,
  'reno|nv': 95,
  'buffalo|ny': 90,
  'gilbert|az': 85,
  'glendale|az': 80,
  'north las vegas|nv': 75,
  'winston salem|nc': 70,
  'chesapeake|va': 65,
  'norfolk|va': 60,
  'fremont|ca': 55,
  'garland|tx': 50,
  'irving|tx': 48,
  'hialeah|fl': 46,
  'richmond|va': 45,
  'boise|id': 44,
  'spokane|wa': 43,
  'baton rouge|la': 42,
  // South FL cities that are not county seats
  'springfield|il': 200,
  'springfield|ma': 120,
  'springfield|mo': 110,
  'boca raton|fl': 200,
  'delray beach|fl': 150,
  'boynton beach|fl': 140,
  'west palm beach|fl': 180,
  'fort lauderdale|fl': 190,
  'hollywood beach|fl': 160,
  'coral springs|fl': 140,
  'pembroke pines|fl': 145,
  'miramar|fl': 135,
  'pompano beach|fl': 130,
  'miami beach|fl': 170,
  'clearwater|fl': 155,
  'cape coral|fl': 150,
  'port st lucie|fl': 148,
  'port saint lucie|fl': 148,
  'lakeland|fl': 120,
  'tallahassee|fl': 140,
  'gainesville|fl': 110,
  'pensacola|fl': 100,
  'daytona beach|fl': 95,
  'sarasota|fl': 115,
  'naples|fl': 100,
  'fort myers|fl': 125,
  'kissimmee|fl': 105,
  'winter park|fl': 90,
};

let cachedIndex: IndexedPlace[] | null = null;

/**
 * Build searchable city index from county seats + city→county aliases.
 * Fast offline search; no network required.
 */
export function getUsPlaceIndex(): IndexedPlace[] {
  if (cachedIndex) return cachedIndex;

  const byKey = new Map<string, IndexedPlace>();

  const upsert = (
    entry: Omit<IndexedPlace, 'cityNorm' | 'priority'> & {
      priority?: number;
      /** When true, replace county mapping (aliases / seats beat bare county-name rows). */
      preferCounty?: boolean;
    }
  ) => {
    const cityNorm = normalizePlaceQuery(entry.city);
    if (!cityNorm) return;
    const key = `${cityNorm}|${entry.stateCode.toLowerCase()}`;
    const priority =
      entry.priority ??
      PRIORITY_BOOST[key] ??
      (entry.countySlug ? 40 : 10);
    const existing = byKey.get(key);
    if (existing) {
      if (priority > existing.priority) existing.priority = priority;
      // Seats + aliases overwrite bare county-name rows (Austin → Travis, not Austin County).
      if (entry.countySlug && (entry.preferCounty || !existing.countySlug)) {
        existing.countySlug = entry.countySlug;
        existing.countyName = entry.countyName;
      }
      return;
    }
    byKey.set(key, {
      city: titleCaseCity(cityNorm),
      cityNorm,
      stateCode: entry.stateCode.toUpperCase(),
      stateSlug: entry.stateSlug,
      stateName: entry.stateName,
      countySlug: entry.countySlug,
      countyName: entry.countyName,
      priority,
    });
  };

  for (const state of localStates) {
    const counties = getCountiesForState(state.slug);
    for (const county of counties) {
      // County name itself is searchable (e.g. "Palm Beach") — lowest precedence.
      upsert({
        city: county.name,
        stateCode: state.code,
        stateSlug: state.slug,
        stateName: state.name,
        countySlug: county.slug,
        countyName: county.name,
        priority: 30,
      });
      // Seat wins over same-named county (Austin → Travis, not Austin County).
      if (county.seat) {
        upsert({
          city: county.seat,
          stateCode: state.code,
          stateSlug: state.slug,
          stateName: state.name,
          countySlug: county.slug,
          countyName: county.name,
          priority:
            PRIORITY_BOOST[
              `${normalizePlaceQuery(county.seat)}|${state.code.toLowerCase()}`
            ] ?? 50,
          preferCounty: true,
        });
      }
    }
  }

  // Explicit city→county aliases are authoritative for routing.
  for (const alias of listCityCountyAliases()) {
    const state = localStates.find(
      (s) => s.code.toUpperCase() === alias.stateCode.toUpperCase()
    );
    if (!state) continue;
    const county = getCountiesForState(state.slug).find(
      (c) => c.slug === alias.countySlug
    );
    upsert({
      city: alias.city,
      stateCode: state.code,
      stateSlug: state.slug,
      stateName: state.name,
      countySlug: alias.countySlug,
      countyName: county?.name ?? null,
      priority:
        PRIORITY_BOOST[
          `${normalizePlaceQuery(alias.city)}|${state.code.toLowerCase()}`
        ] ?? 80,
      preferCounty: true,
    });
  }

  cachedIndex = Array.from(byKey.values());
  return cachedIndex;
}
