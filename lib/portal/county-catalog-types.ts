/** Client-safe county catalog types (no geography imports). */

export type CatalogCounty = {
  slug: string;
  name: string;
};

/** State code (e.g. HI) → slim county list. */
export type CountyCatalog = Record<string, CatalogCounty[]>;
