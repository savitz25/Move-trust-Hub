export type MapStateMeta = {
  slug: string;
  name: string;
  code: string;
  curated: boolean;
  countyCount: number;
  href: string;
};

export type MapStateGeo = {
  slug: string;
  name: string;
  code: string;
  path: string;
  cx: number;
  cy: number;
  bbox: [number, number, number, number];
  curated: boolean;
  href: string;
};

export type MapCountyGeo = {
  slug: string;
  name: string;
  path: string;
  href: string;
};

export type MapStateCountiesGeo = {
  stateSlug: string;
  stateName: string;
  viewBox: string;
  counties: MapCountyGeo[];
};

export type MapStatesFile = {
  viewBox: string;
  states: MapStateGeo[];
};

export type MapSearchResult = {
  type: 'state' | 'county';
  label: string;
  sublabel?: string;
  href: string;
  stateSlug?: string;
};