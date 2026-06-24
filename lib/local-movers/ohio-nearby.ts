import { generatedCounties } from '@/data/generated/index';
import { applyOhioCountyOverrides } from '@/lib/local-movers/geography/ohio-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const ohioCounties = generatedCounties
  .filter((c) => c.stateSlug === 'ohio')
  .map(applyOhioCountyOverrides);
const countyNameBySlug = new Map(ohioCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated OH county pages — expands as counties are researched */
const OH_COUNTY_NEIGHBORS: Record<string, string[]> = {
  franklin: ['delaware', 'licking', 'fairfield', 'pickaway', 'madison', 'union'],
  cuyahoga: ['lake', 'geauga', 'portage', 'summit', 'medina', 'lorain'],
  hamilton: ['butler', 'warren', 'clermont', 'brown', 'clinton', 'highland'],
  montgomery: ['greene', 'warren', 'miami', 'darke', 'preble', 'hamilton'],
  summit: ['cuyahoga', 'portage', 'stark', 'medina', 'wayne', 'geauga'],
  lucas: ['wood', 'fulton', 'henry', 'ottawa', 'monroe', 'sandusky'],
  butler: ['hamilton', 'warren', 'preble', 'montgomery', 'clermont', 'brown'],
  stark: ['summit', 'portage', 'carroll', 'tuscarawas', 'holmes', 'wayne'],
  lorain: ['cuyahoga', 'erie', 'huron', 'medina', 'ashland', 'lake'],
  warren: ['butler', 'clermont', 'hamilton', 'montgomery', 'greene', 'clinton'],
  delaware: ['franklin', 'morrow', 'knox', 'licking', 'union', 'marion'],
  lake: ['cuyahoga', 'geauga', 'ashtabula', 'trumbull', 'lorain', 'medina'],
  mahoning: ['trumbull', 'columbiana', 'stark', 'portage', 'mercer', 'lawrence'],
  clermont: ['hamilton', 'warren', 'brown', 'clinton', 'highland', 'butler'],
  trumbull: ['mahoning', 'geauga', 'portage', 'ashtabula', 'columbiana', 'lake'],
  licking: ['franklin', 'delaware', 'knox', 'muskingum', 'perry', 'fairfield'],
  medina: ['summit', 'lorain', 'wayne', 'ashland', 'cuyahoga', 'lake'],
  greene: ['montgomery', 'warren', 'clark', 'fayette', 'clinton', 'madison'],
  fairfield: ['franklin', 'licking', 'perry', 'hocking', 'pickaway', 'ross'],
  portage: ['summit', 'stark', 'cuyahoga', 'geauga', 'trumbull', 'mahoning'],
  wood: ['lucas', 'henry', 'fulton', 'sandusky', 'ottawa', 'hancock'],
  clark: ['greene', 'montgomery', 'miami', 'champaign', 'madison', 'fairfield'],
  richland: ['ashland', 'knox', 'morrow', 'crawford', 'huron', 'wayne'],
  wayne: ['medina', 'summit', 'stark', 'holmes', 'ashland', 'knox'],
  miami: ['montgomery', 'darke', 'shelby', 'champaign', 'clark', 'greene'],
  allen: ['auglaize', 'putnam', 'hancock', 'hardin', 'van-wert', 'logan'],
  columbiana: ['mahoning', 'stark', 'carroll', 'jefferson', 'harrison', 'trumbull'],
  ashtabula: ['lake', 'geauga', 'trumbull', 'crawford', 'erie', 'cuyahoga'],
  geauga: ['cuyahoga', 'lake', 'portage', 'trumbull', 'ashtabula', 'summit'],
  tuscarawas: ['stark', 'carroll', 'holmes', 'coshocton', 'guernsey', 'harrison'],
  muskingum: ['licking', 'coshocton', 'guernsey', 'noble', 'morgan', 'perry'],
  ross: ['pickaway', 'pike', 'scioto', 'hocking', 'vinton', 'fairfield'],
  hancock: ['allen', 'hardin', 'wyandot', 'seneca', 'wood', 'putnam'],
  union: ['delaware', 'marion', 'logan', 'champaign', 'madison', 'franklin'],
  erie: ['lorain', 'huron', 'ottawa', 'sandusky', 'crawford', 'hancock'],
  scioto: ['pike', 'lawrence', 'adams', 'jackson', 'ross', 'gallia'],
  marion: ['delaware', 'union', 'morrow', 'crawford', 'richland', 'knox'],
  knox: ['licking', 'delaware', 'morrow', 'richland', 'coshocton', 'holmes'],
  belmont: ['harrison', 'jefferson', 'monroe', 'noble', 'guernsey', 'columbiana'],
  pickaway: ['franklin', 'fairfield', 'ross', 'hocking', 'fayette', 'madison'],
  highland: ['clinton', 'ross', 'fayette', 'brown', 'clermont', 'hamilton'],
  mercer: ['darke', 'shelby', 'auglaize', 'van-wert', 'allen', 'jay'],
  clinton: ['highland', 'greene', 'warren', 'fayette', 'clermont', 'hamilton'],
  crawford: ['richland', 'marion', 'morrow', 'seneca', 'huron', 'erie'],
  fulton: ['lucas', 'henry', 'williams', 'defiance', 'wood', 'ottawa'],
  preble: ['montgomery', 'butler', 'darke', 'wayne', 'union', 'fayette'],
  ottawa: ['erie', 'sandusky', 'lucas', 'wood', 'huron', 'cuyahoga'],
  champaign: ['clark', 'union', 'madison', 'logan', 'shelby', 'miami'],
  guernsey: ['belmont', 'noble', 'muskingum', 'coshocton', 'tuscarawas', 'harrison'],
  defiance: ['fulton', 'henry', 'williams', 'paulding', 'putnam', 'hancock'],
  coshocton: ['knox', 'muskingum', 'guernsey', 'tuscarawas', 'holmes', 'licking'],
  morrow: ['delaware', 'marion', 'knox', 'richland', 'crawford', 'union'],
  williams: ['fulton', 'defiance', 'henry', 'paulding', 'steuben', 'dekalb'],
  perry: ['licking', 'fairfield', 'hocking', 'muskingum', 'morgan', 'athens'],
  putnam: ['allen', 'hancock', 'henry', 'defiance', 'wood', 'van-wert'],
};

export function getOhioNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = OH_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  const seen = new Set<string>();
  return neighbors
    .filter((slug) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return countyNameBySlug.has(slug);
    })
    .map((slug) => ({
      slug,
      name: countyNameBySlug.get(slug)!,
      href: `/local-movers/ohio/${slug}`,
    }));
}