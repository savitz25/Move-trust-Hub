import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Nebraska counties (batch 1 — 21 counties) */
export const nebraskaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  douglas: { seat: 'Omaha', metro: 'douglas-metro-ne' },
  lancaster: { seat: 'Lincoln', metro: 'lancaster-metro-ne' },
  sarpy: { seat: 'Papillion', metro: 'sarpy-metro-ne' },
  hall: { seat: 'Grand Island', metro: 'hall-metro-ne' },
  buffalo: { seat: 'Kearney', metro: 'buffalo-metro-ne' },
  dodge: { seat: 'Fremont', metro: 'dodge-metro-ne' },
  madison: { seat: 'Norfolk', metro: 'madison-metro-ne' },
  platte: { seat: 'Columbus', metro: 'platte-metro-ne' },
  'scotts-bluff': { seat: 'Gering', metro: 'scotts-bluff-metro-ne' },
  lincoln: { seat: 'North Platte', metro: 'lincoln-metro-ne' },
  adams: { seat: 'Hastings', metro: 'adams-metro-ne' },
  cass: { seat: 'Plattsmouth', metro: 'cass-metro-ne' },
  dawson: { seat: 'Lexington', metro: 'dawson-metro-ne' },
  saunders: { seat: 'Wahoo', metro: 'saunders-metro-ne' },
  dakota: { seat: 'Dakota City', metro: 'dakota-metro-ne' },
  gage: { seat: 'Beatrice', metro: 'gage-metro-ne' },
  washington: { seat: 'Blair', metro: 'washington-metro-ne' },
  seward: { seat: 'Seward', metro: 'seward-metro-ne' },
  otoe: { seat: 'Nebraska City', metro: 'otoe-metro-ne' },
  saline: { seat: 'Wilber', metro: 'saline-metro-ne' },
  york: { seat: 'York', metro: 'york-metro-ne' },
};

export function applyNebraskaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = nebraskaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
