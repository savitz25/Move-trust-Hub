import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Wisconsin counties (batch 1 — 10 counties) */
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
};

export function applyWisconsinCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'wisconsin') return county;
  const override = wisconsinCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
