import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Wisconsin counties (batches 1–2 — 30 counties) */
export const wisconsinCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  milwaukee: { seat: "Milwaukee", metro: "milwaukee-metro-wi" },
  dane: { seat: "Madison", metro: "dane-metro-wi" },
  waukesha: { seat: "Waukesha", metro: "waukesha-metro-wi" },
  brown: { seat: "Green Bay", metro: "brown-metro-wi" },
  racine: { seat: "Racine", metro: "racine-metro-wi" },
  outagamie: { seat: "Appleton", metro: "outagamie-metro-wi" },
  winnebago: { seat: "Oshkosh", metro: "winnebago-metro-wi" },
  kenosha: { seat: "Kenosha", metro: "kenosha-metro-wi" },
  rock: { seat: "Janesville", metro: "rock-metro-wi" },
  marathon: { seat: "Wausau", metro: "marathon-metro-wi" },
  washington: { seat: "West Bend", metro: "washington-metro-wi" },
  'la-crosse': { seat: "La Crosse", metro: "la-crosse-metro-wi" },
  sheboygan: { seat: "Sheboygan", metro: "sheboygan-metro-wi" },
  'eau-claire': { seat: "Eau Claire", metro: "eau-claire-metro-wi" },
  walworth: { seat: "Elkhorn", metro: "walworth-metro-wi" },
  'fond-du-lac': { seat: "Fond du Lac", metro: "fond-du-lac-metro-wi" },
  'st-croix': { seat: "Hudson", metro: "st-croix-metro-wi" },
  ozaukee: { seat: "Port Washington", metro: "ozaukee-metro-wi" },
  dodge: { seat: "Juneau", metro: "dodge-metro-wi" },
  jefferson: { seat: "Jefferson", metro: "jefferson-metro-wi" },
  manitowoc: { seat: "Manitowoc", metro: "manitowoc-metro-wi" },
  wood: { seat: "Wisconsin Rapids", metro: "wood-metro-wi" },
  portage: { seat: "Stevens Point", metro: "portage-metro-wi" },
  chippewa: { seat: "Chippewa Falls", metro: "chippewa-metro-wi" },
  sauk: { seat: "Baraboo", metro: "sauk-metro-wi" },
  columbia: { seat: "Portage", metro: "columbia-metro-wi" },
  calumet: { seat: "Chilton", metro: "calumet-metro-wi" },
  grant: { seat: "Lancaster", metro: "grant-metro-wi" },
  waupaca: { seat: "Waupaca", metro: "waupaca-metro-wi" },
  monroe: { seat: "Sparta", metro: "monroe-metro-wi" },
};

export function applyWisconsinCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'wisconsin') return county;
  const override = wisconsinCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
