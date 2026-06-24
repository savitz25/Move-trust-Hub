/** Shared type for adjacent-county internal links on state county pages */
export type NearbyCountyLink = {
  slug: string;
  name: string;
  seat?: string;
  /** Full path when linking outside the current state */
  href?: string;
  /** Override link label (e.g. cross-state metro guides) */
  displayLabel?: string;
};