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
  city: string;
  website?: string;
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