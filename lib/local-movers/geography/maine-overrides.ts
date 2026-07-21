import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Maine counties */
export const maineCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  cumberland: { seat: 'Portland', metro: 'cumberland-metro-me' },
  york: { seat: 'Alfred', metro: 'york-metro-me' },
  penobscot: { seat: 'Bangor', metro: 'penobscot-metro-me' },
  kennebec: { seat: 'Augusta', metro: 'kennebec-metro-me' },
  androscoggin: { seat: 'Auburn', metro: 'androscoggin-metro-me' },
  aroostook: { seat: 'Houlton', metro: 'aroostook-metro-me' },
  oxford: { seat: 'South Paris', metro: 'oxford-metro-me' },
  hancock: { seat: 'Ellsworth', metro: 'hancock-metro-me' },
  somerset: { seat: 'Skowhegan', metro: 'somerset-metro-me' },
  knox: { seat: 'Rockland', metro: 'knox-metro-me' },
  waldo: { seat: 'Belfast', metro: 'waldo-metro-me' },
  sagadahoc: { seat: 'Bath', metro: 'sagadahoc-metro-me' },
  lincoln: { seat: 'Wiscasset', metro: 'lincoln-metro-me' },
  washington: { seat: 'Machias', metro: 'washington-metro-me' },
  franklin: { seat: 'Farmington', metro: 'franklin-metro-me' },
  piscataquis: { seat: 'Dover-Foxcroft', metro: 'piscataquis-metro-me' },
};

export function applyMaineCountyOverrides(county: LocalCounty): LocalCounty {
  
if (county.stateSlug !== 'maine') return county;
  const override = maineCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}