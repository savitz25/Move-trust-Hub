import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Louisiana parishes */
export const louisianaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  'east-baton-rouge': { seat: 'Baton Rouge', metro: 'baton-rouge-metro-la' },
  jefferson: { seat: 'Gretna', metro: 'new-orleans-metro-la' },
  orleans: { seat: 'New Orleans', metro: 'new-orleans-metro-la' },
  'st-tammany': { seat: 'Covington', metro: 'north-shore-metro-la' },
  lafayette: { seat: 'Lafayette', metro: 'lafayette-metro-la' },
  caddo: { seat: 'Shreveport', metro: 'shreveport-bossier-metro-la' },
  calcasieu: { seat: 'Lake Charles', metro: 'lake-charles-metro-la' },
  ouachita: { seat: 'Monroe', metro: 'monroe-metro-la' },
  livingston: { seat: 'Livingston', metro: 'baton-rouge-metro-la' },
  tangipahoa: { seat: 'Amite City', metro: 'hammond-metro-la' },
  ascension: { seat: 'Donaldsonville', metro: 'baton-rouge-metro-la' },
  bossier: { seat: 'Benton', metro: 'shreveport-bossier-metro-la' },
  rapides: { seat: 'Alexandria', metro: 'alexandria-metro-la' },
  terrebonne: { seat: 'Houma', metro: 'houma-bayou-metro-la' },
  lafourche: { seat: 'Thibodaux', metro: 'houma-bayou-metro-la' },
  'st-landry': { seat: 'Opelousas', metro: 'lafayette-metro-la' },
  iberia: { seat: 'New Iberia', metro: 'lafayette-metro-la' },
  vermilion: { seat: 'Abbeville', metro: 'lafayette-metro-la' },
  acadia: { seat: 'Crowley', metro: 'lafayette-metro-la' },
  'st-martin': { seat: 'St. Martinville', metro: 'lafayette-metro-la' },
  'st-charles': { seat: 'Hahnville', metro: 'new-orleans-metro-la' },
  lincoln: { seat: 'Ruston', metro: 'ruston-metro-la' },
  'st-mary': { seat: 'Franklin', metro: 'morgan-city-metro-la' },
  'st-bernard': { seat: 'Chalmette', metro: 'new-orleans-metro-la' },
  washington: { seat: 'Franklinton', metro: 'bogalusa-franklinton-metro-la' },
  vernon: { seat: 'Leesville', metro: 'leesville-metro-la' },
  'st-john-the-baptist': { seat: 'Edgard', metro: 'new-orleans-metro-la' },
  avoyelles: { seat: 'Marksville', metro: 'alexandria-metro-la' },
  beauregard: { seat: 'DeRidder', metro: 'leesville-metro-la' },
  natchitoches: { seat: 'Natchitoches', metro: 'natchitoches-metro-la' },
  webster: { seat: 'Minden', metro: 'shreveport-bossier-metro-la' },
  evangeline: { seat: 'Ville Platte', metro: 'lafayette-metro-la' },
  'jefferson-davis': { seat: 'Jennings', metro: 'lafayette-metro-la' },
  iberville: { seat: 'Plaquemine', metro: 'baton-rouge-metro-la' },
  'west-baton-rouge': { seat: 'Port Allen', metro: 'baton-rouge-metro-la' },
  'de-soto': { seat: 'Mansfield', metro: 'shreveport-bossier-metro-la' },
  'west-feliciana': { seat: 'St. Francisville', metro: 'baton-rouge-metro-la' },
  claiborne: { seat: 'Homer', metro: 'shreveport-bossier-metro-la' },
  bienville: { seat: 'Arcadia', metro: 'shreveport-bossier-metro-la' },
  'st-helena': { seat: 'Greensburg', metro: 'hammond-metro-la' },
  caldwell: { seat: 'Columbia', metro: 'monroe-metro-la' },
  'west-carroll': { seat: 'Oak Grove', metro: 'monroe-metro-la' },
  madison: { seat: 'Tallulah', metro: 'monroe-metro-la' },
  catahoula: { seat: 'Harrisonburg', metro: 'alexandria-metro-la' },
  'red-river': { seat: 'Coushatta', metro: 'shreveport-bossier-metro-la' },
  'east-carroll': { seat: 'Lake Providence', metro: 'monroe-metro-la' },
  cameron: { seat: 'Cameron', metro: 'lake-charles-metro-la' },
  tensas: { seat: 'St. Joseph', metro: 'monroe-metro-la' },
};

export function applyLouisianaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'louisiana') return county;
  const override = louisianaCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}