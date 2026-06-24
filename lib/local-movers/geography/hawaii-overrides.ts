import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Hawaii counties */
export const hawaiiCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  honolulu: { seat: 'Honolulu', metro: 'honolulu-metro-hi' },
  hawaii: { seat: 'Hilo', metro: 'hawaii-metro-hi' },
  maui: { seat: 'Wailuku', metro: 'maui-metro-hi' },
  kauai: { seat: 'Lihue', metro: 'kauai-metro-hi' },
  kalawao: { seat: 'Kalaupapa', metro: 'kalawao-metro-hi' },
};

export function applyHawaiiCountyOverrides(county: LocalCounty): LocalCounty {
  const override = hawaiiCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}