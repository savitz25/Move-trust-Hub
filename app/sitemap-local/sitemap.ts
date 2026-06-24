import type { MetadataRoute } from 'next';
import {
  CALIFORNIA_COUNTY_CONTENT_UPDATED,
  FLORIDA_COUNTY_CONTENT_UPDATED,
  GEORGIA_COUNTY_CONTENT_UPDATED,
  SOUTH_CAROLINA_COUNTY_CONTENT_UPDATED,
  NORTH_CAROLINA_COUNTY_CONTENT_UPDATED,
  TENNESSEE_COUNTY_CONTENT_UPDATED,
  ALABAMA_COUNTY_CONTENT_UPDATED,
  MISSISSIPPI_COUNTY_CONTENT_UPDATED,
  LOUISIANA_COUNTY_CONTENT_UPDATED,
  OKLAHOMA_COUNTY_CONTENT_UPDATED,
  ARKANSAS_COUNTY_CONTENT_UPDATED,
  KANSAS_COUNTY_CONTENT_UPDATED,
  MISSOURI_COUNTY_CONTENT_UPDATED,
  ILLINOIS_COUNTY_CONTENT_UPDATED,
  NEW_JERSEY_COUNTY_CONTENT_UPDATED,
  NEW_YORK_COUNTY_CONTENT_UPDATED,
  TEXAS_COUNTY_CONTENT_UPDATED,
} from '@/components/local-movers/county-editorial-trust';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';

const SITE_URL = 'https://www.movetrusthub.com';

/** Canonical URL pattern: /sitemap-local/sitemap/{stateSlug}.xml (not /sitemap-local/{stateSlug}.xml) */

/** High-traffic CA counties — sitemap priority 0.85 */
const CA_HIGH_TRAFFIC_COUNTIES = new Set([
  'alameda',
  'contra-costa',
  'fresno',
  'kern',
  'los-angeles',
  'marin',
  'orange',
  'riverside',
  'sacramento',
  'san-bernardino',
  'san-diego',
  'san-francisco',
  'san-mateo',
  'santa-clara',
  'ventura',
]);

/** High-traffic TX counties — sitemap priority 0.85 */
const TX_HIGH_TRAFFIC_COUNTIES = new Set([
  'bexar',
  'brazoria',
  'cameron',
  'collin',
  'dallas',
  'denton',
  'el-paso',
  'fort-bend',
  'harris',
  'hidalgo',
  'lubbock',
  'montgomery',
  'nueces',
  'tarrant',
  'travis',
  'williamson',
]);

/** High-traffic GA counties — sitemap priority 0.85 */
const GA_HIGH_TRAFFIC_COUNTIES = new Set([
  'bibb',
  'carroll',
  'chatham',
  'cherokee',
  'clayton',
  'cobb',
  'columbia',
  'coweta',
  'dekalb',
  'douglas',
  'forsyth',
  'fulton',
  'gwinnett',
  'hall',
  'henry',
  'houston',
  'muscogee',
  'paulding',
  'richmond',
]);

/** High-traffic SC counties — sitemap priority 0.85 */
/** High-traffic NC counties — sitemap priority 0.85 */
const NC_HIGH_TRAFFIC_COUNTIES = new Set([
  'alamance',
  'brunswick',
  'buncombe',
  'cabarrus',
  'catawba',
  'chatham',
  'craven',
  'cumberland',
  'davidson',
  'durham',
  'forsyth',
  'gaston',
  'guilford',
  'harnett',
  'henderson',
  'iredell',
  'johnston',
  'mecklenburg',
  'moore',
  'new-hanover',
  'onslow',
  'orange',
  'pitt',
  'randolph',
  'rowan',
  'union',
  'wake',
  'wayne',
]);

/** High-traffic OK counties — sitemap priority 0.85 */
const OK_HIGH_TRAFFIC_COUNTIES = new Set([
  'oklahoma',
  'tulsa',
  'cleveland',
  'canadian',
  'rogers',
  'comanche',
  'payne',
  'pottawatomie',
  'muskogee',
  'garfield',
  'grady',
  'wagoner',
]);

/** High-traffic MO counties — sitemap priority 0.85 */
/** High-traffic IL counties — sitemap priority 0.85 */
const IL_HIGH_TRAFFIC_COUNTIES = new Set([
  'cook',
  'dupage',
  'lake',
  'will',
  'kane',
  'mchenry',
  'winnebago',
  'madison',
  'st-clair',
  'champaign',
  'sangamon',
  'peoria',
  'mclean',
  'kendall',
  'rock-island',
  'tazewell',
  'lasalle',
  'kankakee',
  'dekalb',
  'macon',
  'vermilion',
  'williamson',
  'adams',
  'grundy',
  'whiteside',
  'boone',
  'jackson',
  'ogle',
  'henry',
  'knox',
  'coles',
  'macoupin',
  'stephenson',
  'woodford',
  'clinton',
  'fayette',
  'shelby',
  'perry',
  'washington',
  'massac',
  'johnson',
  'ford',
  'white',
  'clay',
  'cass',
  'mason',
  'menard',
  'marshall',
  'greene',
  'wabash',
  'cumberland',
  'jasper',
  'hamilton',
  'schuyler',
  'brown',
  'henderson',
  'edwards',
  'putnam',
  'stark',
  'scott',
  'pulaski',
  'gallatin',
  'alexander',
  'calhoun',
  'pope',
  'hardin',
  'bureau',
  'carroll',
  'jo-daviess',
  'lee',
  'mercer',
  'warren',
  'christian',
  'de-witt',
  'douglas',
  'edgar',
  'effingham',
  'fulton',
  'livingston',
  'logan',
  'moultrie',
  'piatt',
]);

const MO_HIGH_TRAFFIC_COUNTIES = new Set([
  'st-louis',
  'st-louis-city',
  'jackson',
  'st-charles',
  'greene',
  'clay',
  'jefferson',
  'boone',
  'platte',
  'cass',
  'franklin',
  'jasper',
  'buchanan',
  'cole',
]);

/** High-traffic KS counties — sitemap priority 0.85 */
const KS_HIGH_TRAFFIC_COUNTIES = new Set([
  'johnson',
  'sedgwick',
  'shawnee',
  'wyandotte',
  'douglas',
  'leavenworth',
  'riley',
  'butler',
  'reno',
  'saline',
  'crawford',
  'finney',
  'ford',
  'ellis',
]);

/** High-traffic AR counties — sitemap priority 0.85 */
const AR_HIGH_TRAFFIC_COUNTIES = new Set([
  'pulaski',
  'benton',
  'washington',
  'faulkner',
  'saline',
  'sebastian',
  'craighead',
  'garland',
  'lonoke',
  'pope',
  'white',
  'jefferson',
  'crittenden',
  'crawford',
]);

/** High-traffic LA parishes — sitemap priority 0.85 */
const LA_HIGH_TRAFFIC_PARISHES = new Set([
  'east-baton-rouge',
  'orleans',
  'jefferson',
  'st-tammany',
  'lafayette',
  'caddo',
  'calcasieu',
  'bossier',
  'livingston',
  'tangipahoa',
  'ascension',
  'terrebonne',
  'rapides',
  'ouachita',
  'st-landry',
]);

/** High-traffic MS counties — sitemap priority 0.85 */
const MS_HIGH_TRAFFIC_COUNTIES = new Set([
  'hinds',
  'harrison',
  'desoto',
  'rankin',
  'madison',
  'jackson',
  'lee',
  'forrest',
  'lauderdale',
  'lafayette',
  'lowndes',
  'oktibbeha',
  'jones',
  'lamar',
  'pearl-river',
]);

/** High-traffic AL counties — sitemap priority 0.85 */
const AL_HIGH_TRAFFIC_COUNTIES = new Set([
  'jefferson',
  'madison',
  'mobile',
  'baldwin',
  'tuscaloosa',
  'shelby',
  'montgomery',
  'lee',
  'limestone',
  'morgan',
  'calhoun',
  'houston',
  'etowah',
  'marshall',
  'st-clair',
]);

/** High-traffic TN counties — sitemap priority 0.85 */
const TN_HIGH_TRAFFIC_COUNTIES = new Set([
  'shelby',
  'davidson',
  'knox',
  'hamilton',
  'rutherford',
  'williamson',
  'montgomery',
  'sumner',
  'wilson',
  'sullivan',
  'blount',
  'washington',
  'maury',
  'bradley',
  'sevier',
  'madison',
  'putnam',
  'anderson',
  'robertson',
  'greene',
]);

const SC_HIGH_TRAFFIC_COUNTIES = new Set([
  'aiken',
  'anderson',
  'beaufort',
  'berkeley',
  'charleston',
  'dorchester',
  'greenville',
  'horry',
  'lexington',
  'pickens',
  'richland',
  'spartanburg',
  'sumter',
  'york',
]);

/** High-traffic NY counties — sitemap priority 0.85 */
const NY_HIGH_TRAFFIC_COUNTIES = new Set([
  'albany',
  'bronx',
  'dutchess',
  'erie',
  'kings',
  'monroe',
  'nassau',
  'new-york',
  'niagara',
  'onondaga',
  'orange',
  'queens',
  'richmond',
  'rockland',
  'suffolk',
  'westchester',
]);

export async function generateSitemaps() {
  return localStates.map((state) => ({ id: state.slug }));
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const counties = getCountiesForState(id);
  const lastModified =
    id === 'california'
      ? new Date(CALIFORNIA_COUNTY_CONTENT_UPDATED)
      : id === 'florida'
        ? new Date(FLORIDA_COUNTY_CONTENT_UPDATED)
        : id === 'new-jersey'
          ? new Date(NEW_JERSEY_COUNTY_CONTENT_UPDATED)
          : id === 'new-york'
            ? new Date(NEW_YORK_COUNTY_CONTENT_UPDATED)
            : id === 'texas'
              ? new Date(TEXAS_COUNTY_CONTENT_UPDATED)
              : id === 'georgia'
                ? new Date(GEORGIA_COUNTY_CONTENT_UPDATED)
                : id === 'south-carolina'
                  ? new Date(SOUTH_CAROLINA_COUNTY_CONTENT_UPDATED)
                  : id === 'north-carolina'
                    ? new Date(NORTH_CAROLINA_COUNTY_CONTENT_UPDATED)
                    : id === 'tennessee'
                      ? new Date(TENNESSEE_COUNTY_CONTENT_UPDATED)
                      : id === 'alabama'
                        ? new Date(ALABAMA_COUNTY_CONTENT_UPDATED)
                        : id === 'mississippi'
                          ? new Date(MISSISSIPPI_COUNTY_CONTENT_UPDATED)
                          : id === 'louisiana'
                            ? new Date(LOUISIANA_COUNTY_CONTENT_UPDATED)
                            : id === 'oklahoma'
                              ? new Date(OKLAHOMA_COUNTY_CONTENT_UPDATED)
                              : id === 'arkansas'
                                ? new Date(ARKANSAS_COUNTY_CONTENT_UPDATED)
                                : id === 'kansas'
                                  ? new Date(KANSAS_COUNTY_CONTENT_UPDATED)
                                  : id === 'missouri'
                                    ? new Date(MISSOURI_COUNTY_CONTENT_UPDATED)
                                    : id === 'illinois'
                                      ? new Date(ILLINOIS_COUNTY_CONTENT_UPDATED)
                                      : new Date();

  return [
    {
      url: `${SITE_URL}/local-movers/${id}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...counties.map((county) => ({
      url: `${SITE_URL}/local-movers/${id}/${county.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority:
        county.slug === 'miami-dade' ||
        county.slug === 'broward' ||
        county.slug === 'bergen' ||
        county.slug === 'hudson' ||
        county.slug === 'essex' ||
        county.slug === 'middlesex' ||
        county.slug === 'monmouth' ||
        county.slug === 'ocean' ||
        county.slug === 'union' ||
        county.slug === 'passaic' ||
        (id === 'california' && CA_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'new-york' && NY_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'texas' && TX_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'georgia' && GA_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'south-carolina' && SC_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'north-carolina' && NC_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'tennessee' && TN_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'alabama' && AL_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'mississippi' && MS_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'louisiana' && LA_HIGH_TRAFFIC_PARISHES.has(county.slug)) ||
        (id === 'oklahoma' && OK_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'arkansas' && AR_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'kansas' && KS_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'missouri' && MO_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'illinois' && IL_HIGH_TRAFFIC_COUNTIES.has(county.slug))
          ? 0.85
          : 0.8,
    })),
  ];
}