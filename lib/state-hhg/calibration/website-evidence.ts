/**
 * Provider-owned website service-area extraction — no Google.
 */
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';

const UA =
  'MoveTrustHub-Task011C1A/1.0 (service-area-research; no Google Places)';

const SERVICE_PATHS = [
  '',
  '/service-area',
  '/service-areas',
  '/areas-we-serve',
  '/areas-served',
  '/locations',
  '/local-moving',
  '/services',
  '/about',
  '/contact',
  '/faq',
];

export type WebsiteFetchResult = {
  url: string;
  ok: boolean;
  text: string;
  status: number | null;
};

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function fetchProviderPage(
  baseUrl: string,
  path = ''
): Promise<WebsiteFetchResult> {
  let url = baseUrl.trim();
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  try {
    const u = new URL(url);
    if (path) u.pathname = path.startsWith('/') ? path : `/${path}`;
    const res = await fetch(u.toString(), {
      headers: { 'User-Agent': UA, Accept: 'text/html' },
      redirect: 'follow',
    });
    const html = await res.text();
    return {
      url: u.toString(),
      ok: res.ok,
      text: stripHtml(html).slice(0, 50000),
      status: res.status,
    };
  } catch {
    return { url, ok: false, text: '', status: null };
  }
}

export async function collectProviderWebsiteText(
  website: string,
  options?: { delayMs?: number; maxPages?: number }
): Promise<{ pages: WebsiteFetchResult[]; combined: string }> {
  const delayMs = options?.delayMs ?? 200;
  const maxPages = options?.maxPages ?? 5;
  const pages: WebsiteFetchResult[] = [];
  for (const path of SERVICE_PATHS) {
    if (pages.length >= maxPages) break;
    const page = await fetchProviderPage(website, path);
    if (page.ok && page.text.length > 200) pages.push(page);
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return {
    pages,
    combined: pages.map((p) => p.text).join('\n'),
  };
}

export type ParsedServiceAreaClaim = {
  completeness:
    | 'EXHAUSTIVE'
    | 'PARTIAL'
    | 'RADIUS_EXPLICIT'
    | 'REGION_EXPLICIT'
    | 'UNKNOWN_COMPLETENESS';
  explicitRadiusMiles: number | null;
  regionText: string | null;
  placeMentions: string[];
  quality: 'HIGH' | 'MEDIUM' | 'LOW';
  notes: string[];
};

const FL_COUNTY_NAMES = [
  'Alachua','Baker','Bay','Bradford','Brevard','Broward','Calhoun','Charlotte','Citrus','Clay','Collier','Columbia','DeSoto','Desoto','Dixie','Duval','Escambia','Flagler','Franklin','Gadsden','Gilchrist','Glades','Gulf','Hamilton','Hardee','Hendry','Hernando','Highlands','Hillsborough','Holmes','Indian River','Jackson','Jefferson','Lafayette','Lake','Lee','Leon','Levy','Liberty','Madison','Manatee','Marion','Martin','Miami-Dade','Miami Dade','Monroe','Nassau','Okaloosa','Okeechobee','Orange','Osceola','Palm Beach','Pasco','Pinellas','Polk','Putnam','Saint Johns','St. Johns','St Johns','Saint Lucie','St. Lucie','St Lucie','Santa Rosa','Sarasota','Seminole','Sumter','Suwannee','Taylor','Union','Volusia','Wakulla','Walton','Washington',
];

const WA_COUNTY_NAMES = [
  'Adams','Asotin','Benton','Chelan','Clallam','Clark','Columbia','Cowlitz','Douglas','Ferry','Franklin','Garfield','Grant','Grays Harbor','Island','Jefferson','King','Kitsap','Kittitas','Klickitat','Lewis','Lincoln','Mason','Okanogan','Pacific','Pend Oreille','Pierce','San Juan','Skagit','Skamania','Snohomish','Spokane','Stevens','Thurston','Wahkiakum','Walla Walla','Whatcom','Whitman','Yakima',
];

const FL_CITIES: Record<string, string> = {
  'fort lauderdale': 'Broward',
  miami: 'Miami-Dade',
  'miami beach': 'Miami-Dade',
  'west palm beach': 'Palm Beach',
  boca: 'Palm Beach',
  'boca raton': 'Palm Beach',
  orlando: 'Orange',
  tampa: 'Hillsborough',
  'st petersburg': 'Pinellas',
  'saint petersburg': 'Pinellas',
  clearwater: 'Pinellas',
  jacksonville: 'Duval',
  naples: 'Collier',
  'fort myers': 'Lee',
  sarasota: 'Sarasota',
  tallahassee: 'Leon',
  gainesville: 'Alachua',
  daytona: 'Volusia',
  'daytona beach': 'Volusia',
  lakeland: 'Polk',
  ocala: 'Marion',
  pensacola: 'Escambia',
  melbourne: 'Brevard',
  bradenton: 'Manatee',
  'cape coral': 'Lee',
  hollywood: 'Broward',
  pembroke: 'Broward',
  miramar: 'Broward',
  coral: 'Miami-Dade',
  doral: 'Miami-Dade',
  hialeah: 'Miami-Dade',
  kissimmee: 'Osceola',
  'winter park': 'Orange',
  'port st lucie': 'Saint Lucie',
};

const WA_CITIES: Record<string, string> = {
  seattle: 'King',
  bellevue: 'King',
  redmond: 'King',
  kirkland: 'King',
  renton: 'King',
  tacoma: 'Pierce',
  everett: 'Snohomish',
  olympia: 'Thurston',
  vancouver: 'Clark',
  spokane: 'Spokane',
  bellingham: 'Whatcom',
  bremerton: 'Kitsap',
  'port orchard': 'Kitsap',
  kennewick: 'Benton',
  richland: 'Benton',
  yakima: 'Yakima',
  auburn: 'King',
  kent: 'King',
  federal: 'King',
  lynnwood: 'Snohomish',
  marysville: 'Snohomish',
  puyallup: 'Pierce',
  lakewood: 'Pierce',
};

export function parseServiceAreaClaims(
  text: string,
  stateCode: 'FL' | 'WA'
): ParsedServiceAreaClaim {
  const notes: string[] = [];
  const lower = text.toLowerCase();
  const countyNames = stateCode === 'FL' ? FL_COUNTY_NAMES : WA_COUNTY_NAMES;
  const cityMap = stateCode === 'FL' ? FL_CITIES : WA_CITIES;

  const placeMentions: string[] = [];
  for (const name of countyNames) {
    // Prefer "X County" form to avoid street-name false positives (e.g. Glades Rd).
    const reCounty = new RegExp(
      `\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+County\\b`,
      'i'
    );
    const reBare = new RegExp(
      `\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
      'i'
    );
    if (reCounty.test(text)) {
      placeMentions.push(`${name} County`);
    } else if (
      reBare.test(text) &&
      !new RegExp(
        `\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+(?:rd|road|st|street|ave|avenue|blvd|dr|drive|ln|lane|hwy|highway)\\b`,
        'i'
      ).test(text)
    ) {
      // Bare county/place name without road suffix
      placeMentions.push(`${name} County`);
    }
  }
  for (const [city, county] of Object.entries(cityMap)) {
    if (lower.includes(city)) {
      const label = `${county} County`;
      if (!placeMentions.includes(label)) placeMentions.push(label);
    }
  }

  let explicitRadiusMiles: number | null = null;
  const radiusPatterns = [
    /within\s+(\d{1,3})\s*miles?\b/i,
    /up\s+to\s+(\d{1,3})\s*miles?\b/i,
    /radius\s+of\s+(\d{1,3})\s*miles?\b/i,
    /(\d{1,3})\s*[-–]?\s*mile\s+radius/i,
    /(?:serve|serving|serves)\s+(?:customers\s+)?within\s+(\d{1,3})\s*miles?\b/i,
    /local\s+moves?\s+(?:within|up to)\s+(\d{1,3})\s*miles?\b/i,
    /(\d{1,3})\s*mi(?:le)?s?\s+of\s+(?:our|the)\s+(?:office|warehouse|location)/i,
  ];
  for (const re of radiusPatterns) {
    const m = text.match(re);
    if (m) {
      const n = Number(m[1]);
      if (n >= 5 && n <= 250) {
        explicitRadiusMiles = n;
        break;
      }
    }
  }

  const exhaustiveHints =
    /\bonly\s+serv(?:e|es|ing)\b|\bexclusive(?:ly)?\s+serv|\blimited\s+to\b|\bwe\s+do\s+not\s+serve\b|\bservice\s+area\s+is\s+limited\b|\bpickup\s+(?:only\s+)?within\b|\bdoes\s+not\s+travel\s+beyond\b/i.test(
      text
    );
  const regionHints =
    /\b(?:greater|metro)\s+[a-z]+\b|\btri-?county\b|\bsouth\s+florida\b|\btampa\s+bay\b|\bpuget\s+sound\b|\binland\s+empire\b|\bking\s+and\s+pierce\b/i.test(
      text
    );
  const statewideTransport =
    /\bstatewide\b|\banywhere\s+in\s+(florida|washington)\b|\bintrastate\b/i.test(
      text
    );
  if (statewideTransport) {
    notes.push(
      'Mentions statewide/intrastate transport — not treated as statewide pickup territory'
    );
  }

  let completeness: ParsedServiceAreaClaim['completeness'] =
    'UNKNOWN_COMPLETENESS';
  // Radius explicit wins even when place mentions also exist.
  if (explicitRadiusMiles != null) {
    completeness = 'RADIUS_EXPLICIT';
  } else if (exhaustiveHints && placeMentions.length > 0) {
    completeness = 'EXHAUSTIVE';
  } else if (regionHints && placeMentions.length > 0) {
    completeness = 'REGION_EXPLICIT';
  } else if (placeMentions.length > 0) {
    completeness = 'PARTIAL';
  }

  let quality: ParsedServiceAreaClaim['quality'] = 'LOW';
  if (completeness === 'RADIUS_EXPLICIT' || completeness === 'EXHAUSTIVE') {
    quality = 'HIGH';
  } else if (placeMentions.length >= 2) {
    quality = 'MEDIUM';
  } else if (placeMentions.length === 1) {
    quality = 'MEDIUM';
  }

  let regionText: string | null = null;
  const regionMatch = text.match(
    /(?:serving|service area[:\s]+|areas? we serve[:\s]+)(.{20,160})/i
  );
  if (regionMatch) regionText = regionMatch[1].trim().slice(0, 200);

  return {
    completeness,
    explicitRadiusMiles,
    regionText,
    placeMentions: [...new Set(placeMentions)],
    quality,
    notes,
  };
}

export function websiteIdentityOk(input: {
  website: string;
  legalName: string | null;
  canonicalName: string | null;
  phone: string | null;
  pageText: string;
}): { confidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNRESOLVED'; notes: string[] } {
  const notes: string[] = [];
  const text = input.pageText.toLowerCase();
  const names = [input.legalName, input.canonicalName]
    .filter(Boolean)
    .map((n) => String(n).toLowerCase());

  if (
    isFranchiseOrNetworkBrandName(input.legalName) ||
    isFranchiseOrNetworkBrandName(input.canonicalName)
  ) {
    notes.push('franchise_or_network_brand');
  }

  let hits = 0;
  for (const n of names) {
    const token = n.replace(/[^a-z0-9\s]/g, ' ').trim().split(/\s+/).slice(0, 3).join(' ');
    if (token.length >= 4 && text.includes(token)) hits++;
  }
  if (input.phone) {
    const digits = input.phone.replace(/\D/g, '');
    if (digits.length >= 10 && text.replace(/\D/g, '').includes(digits.slice(-10))) {
      hits += 2;
    }
  }

  if (hits >= 2) return { confidence: 'HIGH', notes };
  if (hits === 1) return { confidence: 'MEDIUM', notes };
  if (names.length && hits === 0) {
    return { confidence: 'UNRESOLVED', notes: [...notes, 'WEBSITE_IDENTITY_UNRESOLVED'] };
  }
  return { confidence: 'LOW', notes };
}
