/** Shared place-search types (safe for client + server). */

export type PlaceSearchHit = {
  /** Display city name, e.g. "Boca Raton" */
  city: string;
  stateCode: string;
  stateSlug: string;
  stateName: string;
  /** "Boca Raton, FL" */
  label: string;
  /** Known county slug when indexed with one; may be refined on resolve. */
  countySlug: string | null;
  countyName: string | null;
  /** Higher = more likely (population / coverage / alias priority). */
  priority: number;
  /** Match quality for this query (0–100+). */
  score: number;
};

export type PlaceResolveResult = {
  city: string;
  stateCode: string;
  stateSlug: string;
  stateName: string;
  label: string;
  countySlug: string | null;
  countyName: string | null;
  /** County page when known, else state page. */
  moversHref: string;
  /** Representative ZIP when available (Zippopotam or ZIP input). */
  zip: string | null;
  lat: number | null;
  lng: number | null;
  method: string;
};
