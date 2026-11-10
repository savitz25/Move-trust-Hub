import type { MetadataRoute } from 'next';
import { latestRowLastModified } from '@/lib/seo/sitemap-lastmod';

import { evaluateCountyIndexabilityFromResult } from '@/lib/local-movers/county-indexability';
import { applyPremiumCapToDecision } from '@/lib/local-movers/premium-index-cap';
import { loadPremiumAllowance } from '@/lib/local-movers/runtime-premium-cap';
import { sitemapPriorityForCountyTier } from '@/lib/local-movers/county-quality-score';
import { getMoversForCountyAsync } from '@/lib/local-movers/get-movers-for-county-async';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { isPremiumMetroCounty } from '@/lib/local-movers/premium-metro-counties';
import { localStates } from '@/lib/local-movers/states';

const SITE_URL = 'https://www.movetrusthub.com';

/** Child sitemaps: /sitemap-local/sitemap/{stateSlug}.xml — index at /sitemap-local/sitemap.xml */

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

/** High-traffic IN counties — sitemap priority 0.85 (top 15 by population / metro hubs) */
const IN_HIGH_TRAFFIC_COUNTIES = new Set([
  'marion',
  'lake',
  'allen',
  'hamilton',
  'st-joseph',
  'elkhart',
  'vanderburgh',
  'porter',
  'hendricks',
  'madison',
  'tippecanoe',
  'monroe',
  'delaware',
  'bartholomew',
  'clark',
]);

/** High-traffic OH counties — sitemap priority 0.85 (top 15 by population / metro hubs) */
const OH_HIGH_TRAFFIC_COUNTIES = new Set([
  'franklin',
  'cuyahoga',
  'hamilton',
  'summit',
  'montgomery',
  'lucas',
  'butler',
  'stark',
  'lorain',
  'warren',
  'lake',
  'clermont',
  'medina',
  'delaware',
  'mahoning',
]);

/** High-traffic VA counties — sitemap priority 0.85 (batch 1 large markets) */
const VA_HIGH_TRAFFIC_COUNTIES = new Set([
  'fairfax',
  'prince-william',
  'loudoun',
  'virginia-beach',
  'chesterfield',
  'henrico',
  'chesapeake',
  'arlington',
  'richmond',
  'norfolk',
  'newport-news',
  'stafford',
  'alexandria',
  'spotsylvania',
  'hampton',
  'albemarle',
  'hanover',
  'suffolk',
]);

/** High-traffic DE counties — sitemap priority 0.85 (Wilmington metro) */
const DE_HIGH_TRAFFIC_COUNTIES = new Set(['new-castle']);

/** High-traffic CT counties — sitemap priority 0.85 (Fairfield premium metro) */
const CT_HIGH_TRAFFIC_COUNTIES = new Set(['fairfield']);

/** High-traffic MA counties — sitemap priority 0.85 (Greater Boston core) */
/** High-traffic RI counties — sitemap priority 0.85 */
const RI_HIGH_TRAFFIC_COUNTIES = new Set(['providence']);

/** High-traffic VT counties — sitemap priority 0.85 */
const VT_HIGH_TRAFFIC_COUNTIES = new Set(['chittenden']);

/** High-traffic NH counties — sitemap priority 0.85 */
const NH_HIGH_TRAFFIC_COUNTIES = new Set(['hillsborough', 'rockingham']);

/** High-traffic ME counties — sitemap priority 0.85 */
const ME_HIGH_TRAFFIC_COUNTIES = new Set(['cumberland']);

/** High-traffic HI counties — sitemap priority 0.85 */
const HI_HIGH_TRAFFIC_COUNTIES = new Set(['honolulu', 'maui']);

const AK_HIGH_TRAFFIC_COUNTIES = new Set(['anchorage']);

const WA_HIGH_TRAFFIC_COUNTIES = new Set(['king', 'pierce', 'snohomish', 'spokane']);

const OR_HIGH_TRAFFIC_COUNTIES = new Set(['multnomah', 'washington', 'clackamas']);

const NV_HIGH_TRAFFIC_COUNTIES = new Set(['clark', 'washoe']);

const AZ_HIGH_TRAFFIC_COUNTIES = new Set(['maricopa', 'pima']);

const NM_HIGH_TRAFFIC_COUNTIES = new Set(['bernalillo']);

const UT_HIGH_TRAFFIC_COUNTIES = new Set(['salt-lake', 'utah']);

const CO_HIGH_TRAFFIC_COUNTIES = new Set(['denver', 'arapahoe', 'jefferson', 'adams', 'douglas']);

const ID_HIGH_TRAFFIC_COUNTIES = new Set(['ada', 'canyon']);

const MT_HIGH_TRAFFIC_COUNTIES = new Set(['yellowstone', 'missoula', 'gallatin', 'cascade']);

const WY_HIGH_TRAFFIC_COUNTIES = new Set(['laramie', 'natrona', 'teton']);

const ND_HIGH_TRAFFIC_COUNTIES = new Set(['cass', 'burleigh', 'williams', 'grand-forks']);

const SD_HIGH_TRAFFIC_COUNTIES = new Set(['minnehaha', 'pennington']);

const NE_HIGH_TRAFFIC_COUNTIES = new Set(['douglas', 'sarpy', 'lancaster']);

const IA_HIGH_TRAFFIC_COUNTIES = new Set(['polk', 'linn', 'scott', 'johnson']);

const MN_HIGH_TRAFFIC_COUNTIES = new Set([
  'hennepin',
  'ramsey',
  'dakota',
  'anoka',
  'washington',
  'scott',
  'carver',
]);

const WI_HIGH_TRAFFIC_COUNTIES = new Set([
  'milwaukee',
  'waukesha',
]);

const MA_HIGH_TRAFFIC_COUNTIES = new Set([
  'suffolk',
  'middlesex',
  'norfolk',
  'essex',
]);

/** High-traffic PA counties — sitemap priority 0.85 (batches 1–5 large markets) */
const PA_HIGH_TRAFFIC_COUNTIES = new Set([
  'philadelphia',
  'allegheny',
  'montgomery',
  'bucks',
  'delaware',
  'lancaster',
  'chester',
  'york',
  'berks',
  'lehigh',
  'westmoreland',
  'luzerne',
  'northampton',
  'dauphin',
  'cumberland',
  'erie',
  'lackawanna',
  'washington',
  'butler',
  'monroe',
  'beaver',
  'franklin',
  'centre',
  'lebanon',
  'schuylkill',
  'cambria',
  'fayette',
  'blair',
  'lycoming',
  'adams',
  'mercer',
  'northumberland',
  'lawrence',
  'indiana',
  'crawford',
  'clearfield',
  'somerset',
  'columbia',
  'carbon',
  'armstrong',
  'pike',
  'bradford',
  'wayne',
  'venango',
  'bedford',
  'perry',
  'mifflin',
  'jefferson',
  'huntingdon',
  'union',
  'tioga',
  'snyder',
  'mckean',
  'susquehanna',
  'clinton',
  'warren',
  'cameron',
  'clarion',
  'elk',
  'forest',
  'fulton',
  'greene',
  'juniata',
  'montour',
  'potter',
  'sullivan',
  'wyoming',
]);

/** High-traffic MD counties — sitemap priority 0.85 (batch 1 large markets) */
const MD_HIGH_TRAFFIC_COUNTIES = new Set([
  'montgomery',
  'prince-georges',
  'baltimore',
  'anne-arundel',
  'baltimore-city',
  'howard',
  'frederick',
  'harford',
  'charles',
  'carroll',
  'washington',
  'wicomico',
  'st-marys',
  'calvert',
  'cecil',
  'worcester',
]);

/** High-traffic WV counties — sitemap priority 0.85 (batch 1 large markets) */
const WV_HIGH_TRAFFIC_COUNTIES = new Set([
  'kanawha',
  'berkeley',
  'monongalia',
  'cabell',
  'wood',
  'raleigh',
  'jefferson',
  'harrison',
  'mercer',
  'putnam',
  'marion',
  'ohio',
  'fayette',
  'wayne',
  'preston',
]);

/** High-traffic KY counties — sitemap priority 0.85 (top 15 population / metro hubs) */
const KY_HIGH_TRAFFIC_COUNTIES = new Set([
  'jefferson',
  'fayette',
  'kenton',
  'boone',
  'warren',
  'hardin',
  'daviess',
  'madison',
  'campbell',
  'mccracken',
  'bullitt',
  'oldham',
  'scott',
  'shelby',
  'christian',
]);

const MI_HIGH_TRAFFIC_COUNTIES = new Set([
  'wayne',
  'oakland',
  'macomb',
  'kent',
  'ottawa',
  'washtenaw',
  'ingham',
  'genesee',
  'kalamazoo',
  'livingston',
  'saginaw',
  'muskegon',
  'monroe',
  'grand-traverse',
  'marquette',
]);

/** High-traffic IL counties — sitemap priority 0.85 (Chicago collar + downstate hubs) */
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
  'rock-island',
  'kendall',
]);

/** High-traffic MO counties — sitemap priority 0.85 */

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

// Build-time rendering calls this once per state. That fan-out times out
// Supabase and the error pages exceed Vercel's build log limit.
export const dynamic = 'force-dynamic';

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  // Same mover source and evaluator as resolveCountyPageSeo.
  // The Premium cap is applied to that decision before a county can enter the sitemap.
  const premiumAllowance = await loadPremiumAllowance();
  const evaluated = await Promise.all(
    getCountiesForState(id).map(async (county) => {
      const result = await getMoversForCountyAsync(id, county.slug);
      const decision = applyPremiumCapToDecision(
        evaluateCountyIndexabilityFromResult(id, county.slug, result),
        id,
        county.slug,
        premiumAllowance.keys,
        premiumAllowance.premiumCount
      );
      return { county, result, decision };
    })
  );
  const countyEntries = evaluated.filter((entry) => entry.decision.tier === 'index');
  const stateLastModified = latestRowLastModified(
    countyEntries.flatMap(({ result }) => (result?.movers ?? []).map((mover) => mover.lastUpdated))
  );

  return [
    {
      url: `${SITE_URL}/local-movers/${id}`,
      ...(stateLastModified ? { lastModified: stateLastModified } : {}),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    ...countyEntries.map(({ county, result, decision }) => {
      const seoTier = decision.seoTier ?? 2;
      const lastModified = latestRowLastModified((result?.movers ?? []).map((mover) => mover.lastUpdated));
      const highTraffic =
        county.slug === 'miami-dade' ||
        county.slug === 'broward' ||
        county.slug === 'bergen' ||
        (id === 'california' && CA_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'new-york' && NY_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'texas' && TX_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'georgia' && GA_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'florida' &&
          (county.slug === 'miami-dade' ||
            county.slug === 'broward' ||
            county.slug === 'orange' ||
            county.slug === 'hillsborough')) ||
        (id === 'illinois' && IL_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'washington' && WA_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'pennsylvania' && PA_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'ohio' && OH_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'arizona' && AZ_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        (id === 'colorado' && CO_HIGH_TRAFFIC_COUNTIES.has(county.slug)) ||
        isPremiumMetroCounty(id, county.slug);

      return {
        url: `${SITE_URL}/local-movers/${id}/${county.slug}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: 'weekly' as const,
        // Tier 3 never appears here (filtered by indexable). Priority reflects Premium vs Standard.
        priority: sitemapPriorityForCountyTier(seoTier === 3 ? 2 : seoTier, highTraffic),
      };
    }),
  ];
}