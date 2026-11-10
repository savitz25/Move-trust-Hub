export type UsdotRegistrationStatus = 'ACTIVE' | 'INACTIVE' | 'UNKNOWN';
export type ForHireAuthorityStatus = 'ACTIVE' | 'INACTIVE' | 'NONE';
export type RegulatoryBasis = 'federal' | 'state_only' | 'unknown';

export type RegulatoryStanding = {
  usdotRegistration: UsdotRegistrationStatus;
  operatingAuthority: ForHireAuthorityStatus;
  outOfServiceOrder: boolean;
  basis: RegulatoryBasis;
};

export type LocalMover = {
  id: string;
  name: string;
  profileSlug?: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  services: string[];
  specialties?: string[];
  usdotNumber?: string;
  mcNumber?: string;
  fmcsaSafetyRating?: 'Satisfactory' | 'Conditional' | 'Unsatisfactory' | 'Not Rated';
  bbbRating?: string;
  /** HQ city only — never the page county's city. */
  city: string;
  /**
   * True HQ state code (e.g. FL, IN) when known from headquarters.
   * Must never be overwritten with the county page's state.
   */
  headquartersState?: string;
  website?: string;
  /** Onboarded directory company (vs seed/catalog). */
  listingSource?: 'directory' | 'catalog';
  /** Profile slug is a consumer-visible company row. Unset means do not link. */
  profilePublished?: boolean;
  /** Intrastate / local-only (county pages, not main interstate directory). */
  isLocalOnly?: boolean;
  /** FMCSA entity type when known (for Carrier/Broker badges on county lists). */
  entityType?: string | null;
  /** ISO timestamp when company row was last updated (directory listings). */
  lastUpdated?: string;
  /** Highlight newly published local movers on county pages. */
  recentlyAdded?: boolean;
  /** FMCSA out-of-service flag when known from directory sync. */
  outOfService?: boolean;
  /** Stored for-hire authority flag. Not a USDOT registration status. */
  authorityActive?: boolean | null;
  /**
   * USDOT registration label from census evidence: ACTIVE, INACTIVE, or null.
   * Null means unknown or state-only. It is not an operating-authority label.
   */
  usdotStatus?: string | null;
  /** Registration, for-hire authority, out-of-service, and state-only kept apart. */
  regulatoryStanding?: RegulatoryStanding;
};

export type LocalCounty = {
  slug: string;
  name: string;
  stateCode: string;
  stateSlug: string;
  metro?: string;
  seat?: string;
};

export type LocalState = {
  slug: string;
  name: string;
  code: string;
};

/** Precomputed on the server — keeps geography data out of client bundles. */
export type StateSelectorItem = LocalState & {
  hasCounties: boolean;
  countyCount: number;
};

export type CountyMoverAssignment = {
  stateSlug: string;
  countySlug: string;
  moverIds: string[];
};

export type MetroMoverPool = {
  id: string;
  label: string;
  moverIds: string[];
};