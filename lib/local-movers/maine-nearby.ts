import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Maine counties plus cross-border NH, MA, and VT metro guides */
const ME_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  cumberland: [
    { slug: 'york', name: 'York', seat: 'Alfred', href: '/local-movers/maine/york', displayLabel: 'York County, ME' },
    { slug: 'sagadahoc', name: 'Sagadahoc', seat: 'Bath', href: '/local-movers/maine/sagadahoc', displayLabel: 'Sagadahoc County, ME' },
    { slug: 'androscoggin', name: 'Androscoggin', seat: 'Auburn', href: '/local-movers/maine/androscoggin', displayLabel: 'Androscoggin County, ME' },
    { slug: 'oxford', name: 'Oxford', seat: 'South Paris', href: '/local-movers/maine/oxford', displayLabel: 'Oxford County, ME' },
    { slug: 'rockingham', name: 'Rockingham', seat: 'Brentwood', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Nashua', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
  ],
  york: [
    { slug: 'cumberland', name: 'Cumberland', seat: 'Portland', href: '/local-movers/maine/cumberland', displayLabel: 'Cumberland County, ME' },
    { slug: 'oxford', name: 'Oxford', seat: 'South Paris', href: '/local-movers/maine/oxford', displayLabel: 'Oxford County, ME' },
    { slug: 'rockingham', name: 'Rockingham', seat: 'Brentwood', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
    { slug: 'strafford', name: 'Strafford', seat: 'Dover', href: '/local-movers/new-hampshire/strafford', displayLabel: 'Strafford County, NH' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
    { slug: 'sagadahoc', name: 'Sagadahoc', seat: 'Bath', href: '/local-movers/maine/sagadahoc', displayLabel: 'Sagadahoc County, ME' },
  ],
  penobscot: [
    { slug: 'piscataquis', name: 'Piscataquis', seat: 'Dover-Foxcroft', href: '/local-movers/maine/piscataquis', displayLabel: 'Piscataquis County, ME' },
    { slug: 'somerset', name: 'Somerset', seat: 'Skowhegan', href: '/local-movers/maine/somerset', displayLabel: 'Somerset County, ME' },
    { slug: 'waldo', name: 'Waldo', seat: 'Belfast', href: '/local-movers/maine/waldo', displayLabel: 'Waldo County, ME' },
    { slug: 'hancock', name: 'Hancock', seat: 'Ellsworth', href: '/local-movers/maine/hancock', displayLabel: 'Hancock County, ME' },
    { slug: 'kennebec', name: 'Kennebec', seat: 'Augusta', href: '/local-movers/maine/kennebec', displayLabel: 'Kennebec County, ME' },
    { slug: 'aroostook', name: 'Aroostook', seat: 'Houlton', href: '/local-movers/maine/aroostook', displayLabel: 'Aroostook County, ME' },
  ],
  kennebec: [
    { slug: 'androscoggin', name: 'Androscoggin', seat: 'Auburn', href: '/local-movers/maine/androscoggin', displayLabel: 'Androscoggin County, ME' },
    { slug: 'somerset', name: 'Somerset', seat: 'Skowhegan', href: '/local-movers/maine/somerset', displayLabel: 'Somerset County, ME' },
    { slug: 'waldo', name: 'Waldo', seat: 'Belfast', href: '/local-movers/maine/waldo', displayLabel: 'Waldo County, ME' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Wiscasset', href: '/local-movers/maine/lincoln', displayLabel: 'Lincoln County, ME' },
    { slug: 'sagadahoc', name: 'Sagadahoc', seat: 'Bath', href: '/local-movers/maine/sagadahoc', displayLabel: 'Sagadahoc County, ME' },
    { slug: 'penobscot', name: 'Penobscot', seat: 'Bangor', href: '/local-movers/maine/penobscot', displayLabel: 'Penobscot County, ME' },
  ],
  androscoggin: [
    { slug: 'cumberland', name: 'Cumberland', seat: 'Portland', href: '/local-movers/maine/cumberland', displayLabel: 'Cumberland County, ME' },
    { slug: 'oxford', name: 'Oxford', seat: 'South Paris', href: '/local-movers/maine/oxford', displayLabel: 'Oxford County, ME' },
    { slug: 'kennebec', name: 'Kennebec', seat: 'Augusta', href: '/local-movers/maine/kennebec', displayLabel: 'Kennebec County, ME' },
    { slug: 'sagadahoc', name: 'Sagadahoc', seat: 'Bath', href: '/local-movers/maine/sagadahoc', displayLabel: 'Sagadahoc County, ME' },
    { slug: 'franklin', name: 'Franklin', seat: 'Farmington', href: '/local-movers/maine/franklin', displayLabel: 'Franklin County, ME' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
  ],
  aroostook: [
    { slug: 'washington', name: 'Washington', seat: 'Machias', href: '/local-movers/maine/washington', displayLabel: 'Washington County, ME' },
    { slug: 'piscataquis', name: 'Piscataquis', seat: 'Dover-Foxcroft', href: '/local-movers/maine/piscataquis', displayLabel: 'Piscataquis County, ME' },
    { slug: 'penobscot', name: 'Penobscot', seat: 'Bangor', href: '/local-movers/maine/penobscot', displayLabel: 'Penobscot County, ME' },
    { slug: 'somerset', name: 'Somerset', seat: 'Skowhegan', href: '/local-movers/maine/somerset', displayLabel: 'Somerset County, ME' },
    { slug: 'coos', name: 'Coos', seat: 'Lancaster', href: '/local-movers/new-hampshire/coos', displayLabel: 'Coos County, NH' },
    { slug: 'essex', name: 'Essex', seat: 'Guildhall', href: '/local-movers/vermont/essex', displayLabel: 'Essex County, VT' },
  ],
  oxford: [
    { slug: 'cumberland', name: 'Cumberland', seat: 'Portland', href: '/local-movers/maine/cumberland', displayLabel: 'Cumberland County, ME' },
    { slug: 'york', name: 'York', seat: 'Alfred', href: '/local-movers/maine/york', displayLabel: 'York County, ME' },
    { slug: 'androscoggin', name: 'Androscoggin', seat: 'Auburn', href: '/local-movers/maine/androscoggin', displayLabel: 'Androscoggin County, ME' },
    { slug: 'franklin', name: 'Franklin', seat: 'Farmington', href: '/local-movers/maine/franklin', displayLabel: 'Franklin County, ME' },
    { slug: 'carroll', name: 'Carroll', seat: 'Ossipee', href: '/local-movers/new-hampshire/carroll', displayLabel: 'Carroll County, NH' },
    { slug: 'coos', name: 'Coos', seat: 'Lancaster', href: '/local-movers/new-hampshire/coos', displayLabel: 'Coos County, NH' },
  ],
  hancock: [
    { slug: 'washington', name: 'Washington', seat: 'Machias', href: '/local-movers/maine/washington', displayLabel: 'Washington County, ME' },
    { slug: 'penobscot', name: 'Penobscot', seat: 'Bangor', href: '/local-movers/maine/penobscot', displayLabel: 'Penobscot County, ME' },
    { slug: 'waldo', name: 'Waldo', seat: 'Belfast', href: '/local-movers/maine/waldo', displayLabel: 'Waldo County, ME' },
    { slug: 'knox', name: 'Knox', seat: 'Rockland', href: '/local-movers/maine/knox', displayLabel: 'Knox County, ME' },
    { slug: 'aroostook', name: 'Aroostook', seat: 'Houlton', href: '/local-movers/maine/aroostook', displayLabel: 'Aroostook County, ME' },
    { slug: 'washington', name: 'Washington', seat: 'South Kingstown', href: '/local-movers/rhode-island/washington', displayLabel: 'Washington County, RI' },
  ],
  somerset: [
    { slug: 'piscataquis', name: 'Piscataquis', seat: 'Dover-Foxcroft', href: '/local-movers/maine/piscataquis', displayLabel: 'Piscataquis County, ME' },
    { slug: 'penobscot', name: 'Penobscot', seat: 'Bangor', href: '/local-movers/maine/penobscot', displayLabel: 'Penobscot County, ME' },
    { slug: 'kennebec', name: 'Kennebec', seat: 'Augusta', href: '/local-movers/maine/kennebec', displayLabel: 'Kennebec County, ME' },
    { slug: 'franklin', name: 'Franklin', seat: 'Farmington', href: '/local-movers/maine/franklin', displayLabel: 'Franklin County, ME' },
    { slug: 'androscoggin', name: 'Androscoggin', seat: 'Auburn', href: '/local-movers/maine/androscoggin', displayLabel: 'Androscoggin County, ME' },
    { slug: 'piscataquis', name: 'Piscataquis', seat: 'Dover-Foxcroft', href: '/local-movers/maine/piscataquis', displayLabel: 'Piscataquis County, ME' },
  ],
  knox: [
    { slug: 'lincoln', name: 'Lincoln', seat: 'Wiscasset', href: '/local-movers/maine/lincoln', displayLabel: 'Lincoln County, ME' },
    { slug: 'waldo', name: 'Waldo', seat: 'Belfast', href: '/local-movers/maine/waldo', displayLabel: 'Waldo County, ME' },
    { slug: 'kennebec', name: 'Kennebec', seat: 'Augusta', href: '/local-movers/maine/kennebec', displayLabel: 'Kennebec County, ME' },
    { slug: 'sagadahoc', name: 'Sagadahoc', seat: 'Bath', href: '/local-movers/maine/sagadahoc', displayLabel: 'Sagadahoc County, ME' },
    { slug: 'cumberland', name: 'Cumberland', seat: 'Portland', href: '/local-movers/maine/cumberland', displayLabel: 'Cumberland County, ME' },
    { slug: 'hancock', name: 'Hancock', seat: 'Ellsworth', href: '/local-movers/maine/hancock', displayLabel: 'Hancock County, ME' },
  ],
  waldo: [
    { slug: 'knox', name: 'Knox', seat: 'Rockland', href: '/local-movers/maine/knox', displayLabel: 'Knox County, ME' },
    { slug: 'hancock', name: 'Hancock', seat: 'Ellsworth', href: '/local-movers/maine/hancock', displayLabel: 'Hancock County, ME' },
    { slug: 'penobscot', name: 'Penobscot', seat: 'Bangor', href: '/local-movers/maine/penobscot', displayLabel: 'Penobscot County, ME' },
    { slug: 'kennebec', name: 'Kennebec', seat: 'Augusta', href: '/local-movers/maine/kennebec', displayLabel: 'Kennebec County, ME' },
    { slug: 'somerset', name: 'Somerset', seat: 'Skowhegan', href: '/local-movers/maine/somerset', displayLabel: 'Somerset County, ME' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Wiscasset', href: '/local-movers/maine/lincoln', displayLabel: 'Lincoln County, ME' },
  ],
  sagadahoc: [
    { slug: 'cumberland', name: 'Cumberland', seat: 'Portland', href: '/local-movers/maine/cumberland', displayLabel: 'Cumberland County, ME' },
    { slug: 'kennebec', name: 'Kennebec', seat: 'Augusta', href: '/local-movers/maine/kennebec', displayLabel: 'Kennebec County, ME' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Wiscasset', href: '/local-movers/maine/lincoln', displayLabel: 'Lincoln County, ME' },
    { slug: 'androscoggin', name: 'Androscoggin', seat: 'Auburn', href: '/local-movers/maine/androscoggin', displayLabel: 'Androscoggin County, ME' },
    { slug: 'york', name: 'York', seat: 'Alfred', href: '/local-movers/maine/york', displayLabel: 'York County, ME' },
    { slug: 'rockingham', name: 'Rockingham', seat: 'Brentwood', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
  ],
  lincoln: [
    { slug: 'knox', name: 'Knox', seat: 'Rockland', href: '/local-movers/maine/knox', displayLabel: 'Knox County, ME' },
    { slug: 'kennebec', name: 'Kennebec', seat: 'Augusta', href: '/local-movers/maine/kennebec', displayLabel: 'Kennebec County, ME' },
    { slug: 'sagadahoc', name: 'Sagadahoc', seat: 'Bath', href: '/local-movers/maine/sagadahoc', displayLabel: 'Sagadahoc County, ME' },
    { slug: 'cumberland', name: 'Cumberland', seat: 'Portland', href: '/local-movers/maine/cumberland', displayLabel: 'Cumberland County, ME' },
    { slug: 'waldo', name: 'Waldo', seat: 'Belfast', href: '/local-movers/maine/waldo', displayLabel: 'Waldo County, ME' },
    { slug: 'androscoggin', name: 'Androscoggin', seat: 'Auburn', href: '/local-movers/maine/androscoggin', displayLabel: 'Androscoggin County, ME' },
  ],
  washington: [
    { slug: 'hancock', name: 'Hancock', seat: 'Ellsworth', href: '/local-movers/maine/hancock', displayLabel: 'Hancock County, ME' },
    { slug: 'aroostook', name: 'Aroostook', seat: 'Houlton', href: '/local-movers/maine/aroostook', displayLabel: 'Aroostook County, ME' },
    { slug: 'penobscot', name: 'Penobscot', seat: 'Bangor', href: '/local-movers/maine/penobscot', displayLabel: 'Penobscot County, ME' },
    { slug: 'piscataquis', name: 'Piscataquis', seat: 'Dover-Foxcroft', href: '/local-movers/maine/piscataquis', displayLabel: 'Piscataquis County, ME' },
    { slug: 'washington', name: 'Washington', seat: 'Montpelier', href: '/local-movers/vermont/washington', displayLabel: 'Washington County, VT' },
    { slug: 'washington', name: 'Washington', seat: 'South Kingstown', href: '/local-movers/rhode-island/washington', displayLabel: 'Washington County, RI' },
  ],
  franklin: [
    { slug: 'oxford', name: 'Oxford', seat: 'South Paris', href: '/local-movers/maine/oxford', displayLabel: 'Oxford County, ME' },
    { slug: 'somerset', name: 'Somerset', seat: 'Skowhegan', href: '/local-movers/maine/somerset', displayLabel: 'Somerset County, ME' },
    { slug: 'androscoggin', name: 'Androscoggin', seat: 'Auburn', href: '/local-movers/maine/androscoggin', displayLabel: 'Androscoggin County, ME' },
    { slug: 'kennebec', name: 'Kennebec', seat: 'Augusta', href: '/local-movers/maine/kennebec', displayLabel: 'Kennebec County, ME' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
    { slug: 'franklin', name: 'Franklin', seat: 'St. Albans', href: '/local-movers/vermont/franklin', displayLabel: 'Franklin County, VT' },
  ],
  piscataquis: [
    { slug: 'somerset', name: 'Somerset', seat: 'Skowhegan', href: '/local-movers/maine/somerset', displayLabel: 'Somerset County, ME' },
    { slug: 'penobscot', name: 'Penobscot', seat: 'Bangor', href: '/local-movers/maine/penobscot', displayLabel: 'Penobscot County, ME' },
    { slug: 'aroostook', name: 'Aroostook', seat: 'Houlton', href: '/local-movers/maine/aroostook', displayLabel: 'Aroostook County, ME' },
    { slug: 'kennebec', name: 'Kennebec', seat: 'Augusta', href: '/local-movers/maine/kennebec', displayLabel: 'Kennebec County, ME' },
    { slug: 'franklin', name: 'Franklin', seat: 'Farmington', href: '/local-movers/maine/franklin', displayLabel: 'Franklin County, ME' },
    { slug: 'washington', name: 'Washington', seat: 'Machias', href: '/local-movers/maine/washington', displayLabel: 'Washington County, ME' },
  ],
};

export function getMaineNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return ME_COUNTY_NEIGHBORS[countySlug] ?? [];
}