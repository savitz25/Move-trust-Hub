import { furnitureItems, type FurnitureItem } from '@/data/furniture';

/** Common search synonyms → canonical catalog terms */
const SEARCH_SYNONYMS: Record<string, string[]> = {
  sofa: ['couch', 'sectional', 'loveseat', 'settee', 'divan'],
  refrigerator: ['fridge', 'refrig', 'freezer'],
  'exercise bike': ['peloton', 'spin bike', 'stationary bike', 'indoor bike'],
  treadmill: ['running machine'],
  dresser: ['chest of drawers', 'bureau'],
  'night stand': ['nightstand', 'bedside table'],
  'coffee table': ['cocktail table'],
  'dining table': ['kitchen table', 'dinner table'],
  'dining chair': ['kitchen chair'],
  'washing machine': ['washer'],
  'clothes dryer': ['dryer'],
  television: ['tv', 'flat screen'],
  mattress: ['bed'],
  piano: ['keyboard instrument'],
  safe: ['gun safe', 'vault'],
  'pool table': ['billiards', 'billiard table'],
  armoire: ['wardrobe closet'],
  desk: ['work desk', 'office desk'],
  bookshelf: ['bookcase', 'shelf'],
  microwave: ['micro'],
  dishwasher: ['dish washer'],
  grill: ['bbq', 'barbecue'],
  'lawn mower': ['mower', 'lawnmower'],
};

/** Popularity rank — lower = more common household item */
const POPULARITY_OVERRIDES: Record<string, number> = {
  'Bed, Queen (Mattress And Box Spring)': 1,
  'Bed, King (Mattress And Box Spring)': 2,
  'Sofa, 3 Cushion': 3,
  'Sofa, 2 Cushion Loveseat': 4,
  'Dining Table (Medium)': 5,
  'Chair, Dining': 6,
  'Dresser, Double': 7,
  'Night Stand': 8,
  'Refrigerator': 9,
  'Box, Med (3.0 Cf) 18X18X16': 10,
  'Box, Large (4.5 Cf) 18X18X24': 11,
  'Television, Large': 12,
  'Coffee Table': 13,
  'Desk': 14,
  'Washing Machine': 15,
};

/** Logical sub-groups within each room category */
export const ITEM_GROUPS: Record<string, { label: string; match: (name: string) => boolean }[]> = {
  Bedroom: [
    { label: 'Beds & Mattresses', match: (n) => /bed|mattress|box spring|headboard|footboard|platform|trundle|bunk/i.test(n) },
    { label: 'Dressers & Storage', match: (n) => /dresser|chest|armoire|wardrobe|vanity|lingerie|jewelry|trunk|hamper/i.test(n) },
    { label: 'Nightstands & Lamps', match: (n) => /night|lamp|mirror|quilt/i.test(n) },
    { label: 'Other Bedroom', match: () => true },
  ],
  'Living Room': [
    { label: 'Sofas & Seating', match: (n) => /sofa|loveseat|chair|recliner|ottoman|sectional|bench|stool/i.test(n) },
    { label: 'Tables & Storage', match: (n) => /table|cabinet|bookcase|shelf|entertainment|tv stand|credenza/i.test(n) },
    { label: 'Pianos & Special', match: (n) => /piano/i.test(n) },
    { label: 'Decor & Other', match: () => true },
  ],
  Kitchen: [
    { label: 'Major Appliances', match: (n) => /refrigerator|stove|oven|dishwasher|microwave|range/i.test(n) },
    { label: 'Small Appliances', match: (n) => /mixer|toaster|blender|coffee|air fryer/i.test(n) },
    { label: 'Tables & Chairs', match: (n) => /table|chair|stool/i.test(n) },
    { label: 'Other Kitchen', match: () => true },
  ],
  'Dining Room': [
    { label: 'Tables', match: (n) => /table|buffet|server|sideboard/i.test(n) },
    { label: 'Chairs & Seating', match: (n) => /chair/i.test(n) },
    { label: 'China & Display', match: (n) => /china|curio|hutch|credenza|wine/i.test(n) },
    { label: 'Other Dining', match: () => true },
  ],
  Office: [
    { label: 'Desks & Chairs', match: (n) => /desk|chair/i.test(n) },
    { label: 'Storage & Shelving', match: (n) => /bookcase|shelf|cabinet|file/i.test(n) },
    { label: 'Other Office', match: () => true },
  ],
  'Garage / Laundry': [
    { label: 'Laundry', match: (n) => /washer|dryer|laundry|iron/i.test(n) },
    { label: 'Garage & Tools', match: (n) => /tool|workbench|shelf|cabinet|ladder/i.test(n) },
    { label: 'Bikes & Sports', match: (n) => /bike|golf|kayak/i.test(n) },
    { label: 'Other', match: () => true },
  ],
  Outdoor: [
    { label: 'Patio Furniture', match: (n) => /chair|table|umbrella|bench|sofa/i.test(n) },
    { label: 'Grills & Equipment', match: (n) => /grill|mower|trimmer|blower/i.test(n) },
    { label: 'Other Outdoor', match: () => true },
  ],
  'Boxes and Bins': [
    { label: 'Moving Boxes', match: (n) => /box/i.test(n) },
    { label: 'Bins & Specialty', match: () => true },
  ],
  Other: [
    { label: 'Exercise Equipment', match: (n) => /exercise|treadmill|weight|bike/i.test(n) },
    { label: 'Special Handling', match: (n) => /piano|safe|pool table|hot tub|gun/i.test(n) },
    { label: 'Everything Else', match: () => true },
  ],
};

/** Transform raw catalog names into natural language */
export function formatItemDisplayName(rawName: string): string {
  let name = rawName.trim();

  // Beds: "Bed, King (Mattress And Box Spring)" → "King Bed with Mattress & Box Spring"
  const bedMatch = name.match(/^Bed,\s*(.+?)(?:\s*\((.+)\))?$/i);
  if (bedMatch) {
    const size = bedMatch[1].replace(/\(.*\)/, '').trim();
    const detail = bedMatch[2]?.replace(/And/gi, '&').trim();
    return detail ? `${size} Bed with ${detail}` : `${size} Bed`;
  }

  // Mattresses: "Mattress Only, Queen" → "Queen Mattress"
  const mattressMatch = name.match(/^Mattress(?:\s+Only)?,\s*(.+)$/i);
  if (mattressMatch) return `${mattressMatch[1]} Mattress`;

  // Sofas: "Sofa, 3 Cushion" → "3-Seat Sofa"
  const sofaMatch = name.match(/^Sofa,\s*(\d+)\s+Cushion(?:\s+(.+))?$/i);
  if (sofaMatch) {
    const extra = sofaMatch[2] ? ` (${sofaMatch[2].replace(/'/g, '')})` : '';
    return `${sofaMatch[1]}-Seat Sofa${extra}`;
  }
  const loveseatMatch = name.match(/^Sofa,\s*2 Cushion Loveseat/i);
  if (loveseatMatch) return '2-Seat Loveseat Sofa';

  // Boxes: "Box, Med (3.0 Cf) 18X18X16" → "Medium Moving Box (3 cu ft)"
  const boxMatch = name.match(/^Box,\s*(.+)$/i);
  if (boxMatch) {
    const label = boxMatch[1]
      .replace(/Extra Large/i, 'Extra Large')
      .replace(/\bMed\b/i, 'Medium')
      .replace(/\bSm\b/i, 'Small')
      .replace(/\bLg\b/i, 'Large')
      .replace(/\(\d+\.?\d*\s*Cf\)/i, '')
      .replace(/\d+X\d+X\d+/i, '')
      .trim();
    const volMatch = rawName.match(/(\d+\.?\d*)\s*Cf/i);
    const vol = volMatch ? ` (${volMatch[1]} cu ft)` : '';
    return `${label} Moving Box${vol}`;
  }

  // Pianos
  const pianoMatch = name.match(/^Piano,\s*(.+)$/i);
  if (pianoMatch) return `${pianoMatch[1]} Piano`;

  // Safes
  const safeMatch = name.match(/^Safe,\s*(.+)$/i);
  if (safeMatch) return `${safeMatch[1]} Safe`;

  // Generic "Type, Detail" → "Detail Type"
  const commaMatch = name.match(/^([^,]+),\s*(.+)$/);
  if (commaMatch) {
    const type = commaMatch[1].trim();
    const detail = commaMatch[2].trim();
    if (detail.length < type.length) return `${detail} ${type}`;
    return `${type} — ${detail}`;
  }

  // Title case cleanup
  return name
    .replace(/\bCf\b/g, 'cu ft')
    .replace(/\bLg\b/g, 'Large')
    .replace(/\bMed\b/g, 'Medium')
    .replace(/\bSm\b/g, 'Small');
}

export function getItemPopularity(name: string): number {
  return POPULARITY_OVERRIDES[name] ?? 100;
}

function expandQueryWithSynonyms(query: string): string[] {
  const q = query.toLowerCase().trim();
  const terms = [q];
  for (const [canonical, synonyms] of Object.entries(SEARCH_SYNONYMS)) {
    if (q === canonical || synonyms.some((s) => q.includes(s) || s.includes(q))) {
      terms.push(canonical, ...synonyms);
    }
  }
  return [...new Set(terms)];
}

function itemMatchesQuery(item: FurnitureItem, terms: string[]): boolean {
  const display = formatItemDisplayName(item.name).toLowerCase();
  const raw = item.name.toLowerCase();
  const category = item.category.toLowerCase();
  return terms.some(
    (t) => display.includes(t) || raw.includes(t) || category.includes(t)
  );
}

export function fuzzySearchItems(query: string): FurnitureItem[] {
  const q = query.toLowerCase().trim();
  if (!q) {
    return [...furnitureItems].sort(
      (a, b) => getItemPopularity(a.name) - getItemPopularity(b.name)
    );
  }
  const terms = expandQueryWithSynonyms(q);
  const results = furnitureItems.filter((item) => itemMatchesQuery(item, terms));
  return results.sort((a, b) => {
    const aExact = a.name.toLowerCase().includes(q) || formatItemDisplayName(a.name).toLowerCase().includes(q);
    const bExact = b.name.toLowerCase().includes(q) || formatItemDisplayName(b.name).toLowerCase().includes(q);
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    return getItemPopularity(a.name) - getItemPopularity(b.name);
  });
}

export function groupItemsBySubgroup(
  items: FurnitureItem[],
  category: string
): { label: string; items: FurnitureItem[] }[] {
  const groups = ITEM_GROUPS[category] ?? [{ label: 'All Items', match: () => true }];
  const result: { label: string; items: FurnitureItem[] }[] = [];
  const assigned = new Set<string>();

  for (const group of groups) {
    const matched = items.filter((item) => !assigned.has(item.name) && group.match(item.name));
    matched.forEach((item) => assigned.add(item.name));
    if (matched.length > 0) {
      result.push({ label: group.label, items: matched });
    }
  }

  const remaining = items.filter((item) => !assigned.has(item.name));
  if (remaining.length > 0) {
    result.push({ label: 'Other', items: remaining });
  }

  return result;
}

/** Items requiring special mover handling */
export const SPECIAL_HANDLING_PATTERNS = [
  /piano/i,
  /safe/i,
  /pool table/i,
  /hot tub/i,
  /gun safe/i,
  /marble/i,
  /antique/i,
];

export function isSpecialHandlingItem(name: string): boolean {
  return SPECIAL_HANDLING_PATTERNS.some((p) => p.test(name));
}