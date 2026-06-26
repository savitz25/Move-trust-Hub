import type { CityHubContent } from '@/lib/destinations/types';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { myrtleBeachScContent } from '@/lib/destinations/content/myrtle-beach-sc';
import { northMyrtleBeachScContent } from '@/lib/destinations/content/north-myrtle-beach-sc';
import { surfsideBeachScContent } from '@/lib/destinations/content/surfside-beach-sc';
import { atlanticBeachScContent } from '@/lib/destinations/content/atlantic-beach-sc';
import { gardenCityBeachScContent } from '@/lib/destinations/content/garden-city-beach-sc';
import { littleRiverScContent } from '@/lib/destinations/content/little-river-sc';
import { murrellsInletScContent } from '@/lib/destinations/content/murrells-inlet-sc';
import { socasteeScContent } from '@/lib/destinations/content/socastee-sc';
import { carolinaForestScContent } from '@/lib/destinations/content/carolina-forest-sc';
import { bocaRatonFlContent } from '@/lib/destinations/content/boca-raton-fl';
import { deerfieldBeachFlContent } from '@/lib/destinations/content/deerfield-beach-fl';
import { boyntonBeachFlContent } from '@/lib/destinations/content/boynton-beach-fl';
import { delrayBeachFlContent } from '@/lib/destinations/content/delray-beach-fl';
import { miamiFlContent } from '@/lib/destinations/content/miami-fl';
import { fortLauderdaleFlContent } from '@/lib/destinations/content/fort-lauderdale-fl';
import { hollywoodFlContent } from '@/lib/destinations/content/hollywood-fl';
import { pompanoBeachFlContent } from '@/lib/destinations/content/pompano-beach-fl';
import { jacksonvilleFlContent } from '@/lib/destinations/content/jacksonville-fl';
import { naplesFlContent } from '@/lib/destinations/content/naples-fl';
import { ocalaFlContent } from '@/lib/destinations/content/ocala-fl';
import { sarasotaFlContent } from '@/lib/destinations/content/sarasota-fl';
import { stAugustineFlContent } from '@/lib/destinations/content/st-augustine-fl';
import { wildwoodFlContent } from '@/lib/destinations/content/wildwood-fl';
import { nashvilleTnContent } from '@/lib/destinations/content/nashville-tn';
import { clarksvilleTnContent } from '@/lib/destinations/content/clarksville-tn';
import { murfreesboroTnContent } from '@/lib/destinations/content/murfreesboro-tn';
import { knoxvilleTnContent } from '@/lib/destinations/content/knoxville-tn';
import { chattanoogaTnContent } from '@/lib/destinations/content/chattanooga-tn';
import { lebanonTnContent } from '@/lib/destinations/content/lebanon-tn';
import { franklinBrentwoodTnContent } from '@/lib/destinations/content/franklin-brentwood-tn';
import { mountJulietTnContent } from '@/lib/destinations/content/mount-juliet-tn';
import { columbiaTnContent } from '@/lib/destinations/content/columbia-tn';
import { triCitiesTnContent } from '@/lib/destinations/content/tri-cities-tn';
import { lubbockTxContent } from '@/lib/destinations/content/lubbock-tx';
import { midlandOdessaTxContent } from '@/lib/destinations/content/midland-odessa-tx';
import { elPasoTxContent } from '@/lib/destinations/content/el-paso-tx';
import { arlingtonTxContent } from '@/lib/destinations/content/arlington-tx';
import { irvingTxContent } from '@/lib/destinations/content/irving-tx';
import { grandPrairieTxContent } from '@/lib/destinations/content/grand-prairie-tx';
import { dallasFortWorthTxContent } from '@/lib/destinations/content/dallas-fort-worth-tx';
import { austinTxContent } from '@/lib/destinations/content/austin-tx';
import { houstonTxContent } from '@/lib/destinations/content/houston-tx';
import { sanAntonioTxContent } from '@/lib/destinations/content/san-antonio-tx';
import { hickoryNcContent } from '@/lib/destinations/content/hickory-nc';
import { wendellZebulonNcContent } from '@/lib/destinations/content/wendell-zebulon-nc';
import { apexFuquayVarinaNcContent } from '@/lib/destinations/content/apex-fuquay-varina-nc';
import { wilmingtonLelandNcContent } from '@/lib/destinations/content/wilmington-leland-nc';
import { charlotteNcContent } from '@/lib/destinations/content/charlotte-nc';
import { raleighDurhamNcContent } from '@/lib/destinations/content/raleigh-durham-nc';
import { mooresvilleNcContent } from '@/lib/destinations/content/mooresville-nc';
import { boiseIdContent } from '@/lib/destinations/content/boise-id';
import { meridianIdContent } from '@/lib/destinations/content/meridian-id';
import { eagleIdContent } from '@/lib/destinations/content/eagle-id';
import { nampaCaldwellIdContent } from '@/lib/destinations/content/nampa-caldwell-id';
import { coeurDaleneIdContent } from '@/lib/destinations/content/coeur-dalene-id';
import { sandpointIdContent } from '@/lib/destinations/content/sandpoint-id';
import { idahoFallsIdContent } from '@/lib/destinations/content/idaho-falls-id';
import { twinFallsIdContent } from '@/lib/destinations/content/twin-falls-id';
import { eugeneOrContent } from '@/lib/destinations/content/eugene-or';
import { corvallisOrContent } from '@/lib/destinations/content/corvallis-or';
import { salemOrContent } from '@/lib/destinations/content/salem-or';
import { portlandOrContent } from '@/lib/destinations/content/portland-or';
import { bendOrContent } from '@/lib/destinations/content/bend-or';
import { hillsboroBeavertonOrContent } from '@/lib/destinations/content/hillsboro-beaverton-or';
import { oklahomaCityOkContent } from '@/lib/destinations/content/oklahoma-city-ok';
import { tulsaOkContent } from '@/lib/destinations/content/tulsa-ok';
import { edmondOkContent } from '@/lib/destinations/content/edmond-ok';
import { normanOkContent } from '@/lib/destinations/content/norman-ok';
import { brokenArrowOkContent } from '@/lib/destinations/content/broken-arrow-ok';
import { jenksOkContent } from '@/lib/destinations/content/jenks-ok';
import { stillwaterOkContent } from '@/lib/destinations/content/stillwater-ok';
import { phoenixAzContent } from '@/lib/destinations/content/phoenix-az';
import { scottsdaleAzContent } from '@/lib/destinations/content/scottsdale-az';
import { tempeAzContent } from '@/lib/destinations/content/tempe-az';
import { gilbertAzContent } from '@/lib/destinations/content/gilbert-az';
import { chandlerAzContent } from '@/lib/destinations/content/chandler-az';
import { queenCreekAzContent } from '@/lib/destinations/content/queen-creek-az';
import { buckeyeAzContent } from '@/lib/destinations/content/buckeye-az';
import { goodyearSurpriseAzContent } from '@/lib/destinations/content/goodyear-surprise-az';
import { maricopaCasaGrandeAzContent } from '@/lib/destinations/content/maricopa-casa-grande-az';
import { tucsonMaranaAzContent } from '@/lib/destinations/content/tucson-marana-az';
import { bentonvilleArContent } from '@/lib/destinations/content/bentonville-ar';
import { fayettevilleArContent } from '@/lib/destinations/content/fayetteville-ar';
import { rogersArContent } from '@/lib/destinations/content/rogers-ar';
import { conwayArContent } from '@/lib/destinations/content/conway-ar';
import { springdaleArContent } from '@/lib/destinations/content/springdale-ar';
import { bentonBryantArContent } from '@/lib/destinations/content/benton-bryant-ar';
import { sanDiegoCaContent } from '@/lib/destinations/content/san-diego-ca';
import { venturaOxnardCaContent } from '@/lib/destinations/content/ventura-oxnard-ca';
import { palmdaleLancasterCaContent } from '@/lib/destinations/content/palmdale-lancaster-ca';
import { reddingCaContent } from '@/lib/destinations/content/redding-ca';
import { fresnoCaContent } from '@/lib/destinations/content/fresno-ca';
import { stocktonCaContent } from '@/lib/destinations/content/stockton-ca';
import { modestoCaContent } from '@/lib/destinations/content/modesto-ca';
import { sacramentoCaContent } from '@/lib/destinations/content/sacramento-ca';
import { riversideSanBernardinoCaContent } from '@/lib/destinations/content/riverside-san-bernardino-ca';
import { bakersfieldCaContent } from '@/lib/destinations/content/bakersfield-ca';
import { huntsvilleAlContent } from '@/lib/destinations/content/huntsville-al';
import { madisonAlContent } from '@/lib/destinations/content/madison-al';
import { athensAlContent } from '@/lib/destinations/content/athens-al';
import { foleyAlContent } from '@/lib/destinations/content/foley-al';
import { daphneAlContent } from '@/lib/destinations/content/daphne-al';
import { fairhopeGulfShoresAlContent } from '@/lib/destinations/content/fairhope-gulf-shores-al';
import { hooverAlContent } from '@/lib/destinations/content/hoover-al';
import { auburnOpelikaAlContent } from '@/lib/destinations/content/auburn-opelika-al';

const cityHubContentBySlug: Record<string, CityHubContent> = {
  'myrtle-beach-sc': myrtleBeachScContent,
  'north-myrtle-beach': northMyrtleBeachScContent,
  'surfside-beach': surfsideBeachScContent,
  'atlantic-beach': atlanticBeachScContent,
  'garden-city-beach': gardenCityBeachScContent,
  'little-river': littleRiverScContent,
  'murrells-inlet': murrellsInletScContent,
  'socastee': socasteeScContent,
  'carolina-forest': carolinaForestScContent,
  'boca-raton': bocaRatonFlContent,
  'deerfield-beach': deerfieldBeachFlContent,
  'boynton-beach': boyntonBeachFlContent,
  'delray-beach': delrayBeachFlContent,
  'miami': miamiFlContent,
  'fort-lauderdale': fortLauderdaleFlContent,
  'hollywood': hollywoodFlContent,
  'pompano-beach': pompanoBeachFlContent,
  'jacksonville': jacksonvilleFlContent,
  'naples': naplesFlContent,
  'ocala': ocalaFlContent,
  'sarasota': sarasotaFlContent,
  'st-augustine': stAugustineFlContent,
  'wildwood': wildwoodFlContent,
  'nashville-tn': nashvilleTnContent,
  'clarksville-tn': clarksvilleTnContent,
  'murfreesboro-tn': murfreesboroTnContent,
  'knoxville-tn': knoxvilleTnContent,
  'chattanooga-tn': chattanoogaTnContent,
  'lebanon-tn': lebanonTnContent,
  'franklin-brentwood-tn': franklinBrentwoodTnContent,
  'mount-juliet-tn': mountJulietTnContent,
  'columbia-tn': columbiaTnContent,
  'tri-cities-tn': triCitiesTnContent,
  'lubbock-tx': lubbockTxContent,
  'midland-odessa-tx': midlandOdessaTxContent,
  'el-paso-tx': elPasoTxContent,
  'arlington-tx': arlingtonTxContent,
  'irving-tx': irvingTxContent,
  'grand-prairie-tx': grandPrairieTxContent,
  'dallas-fort-worth-tx': dallasFortWorthTxContent,
  'austin-tx': austinTxContent,
  'houston-tx': houstonTxContent,
  'san-antonio-tx': sanAntonioTxContent,
  'hickory-nc': hickoryNcContent,
  'wendell-zebulon-nc': wendellZebulonNcContent,
  'apex-fuquay-varina-nc': apexFuquayVarinaNcContent,
  'wilmington-leland-nc': wilmingtonLelandNcContent,
  'charlotte-nc': charlotteNcContent,
  'raleigh-durham-nc': raleighDurhamNcContent,
  'mooresville-nc': mooresvilleNcContent,
  'boise-id': boiseIdContent,
  'meridian-id': meridianIdContent,
  'eagle-id': eagleIdContent,
  'nampa-caldwell-id': nampaCaldwellIdContent,
  'coeur-dalene-id': coeurDaleneIdContent,
  'sandpoint-id': sandpointIdContent,
  'idaho-falls-id': idahoFallsIdContent,
  'twin-falls-id': twinFallsIdContent,
  'eugene-or': eugeneOrContent,
  'corvallis-or': corvallisOrContent,
  'salem-or': salemOrContent,
  'portland-or': portlandOrContent,
  'bend-or': bendOrContent,
  'hillsboro-beaverton-or': hillsboroBeavertonOrContent,
  'oklahoma-city-ok': oklahomaCityOkContent,
  'tulsa-ok': tulsaOkContent,
  'edmond-ok': edmondOkContent,
  'norman-ok': normanOkContent,
  'broken-arrow-ok': brokenArrowOkContent,
  'jenks-ok': jenksOkContent,
  'stillwater-ok': stillwaterOkContent,
  'phoenix-az': phoenixAzContent,
  'scottsdale-az': scottsdaleAzContent,
  'tempe-az': tempeAzContent,
  'gilbert-az': gilbertAzContent,
  'chandler-az': chandlerAzContent,
  'queen-creek-az': queenCreekAzContent,
  'buckeye-az': buckeyeAzContent,
  'goodyear-surprise-az': goodyearSurpriseAzContent,
  'maricopa-casa-grande-az': maricopaCasaGrandeAzContent,
  'tucson-marana-az': tucsonMaranaAzContent,
  'bentonville-ar': bentonvilleArContent,
  'fayetteville-ar': fayettevilleArContent,
  'rogers-ar': rogersArContent,
  'conway-ar': conwayArContent,
  'springdale-ar': springdaleArContent,
  'benton-bryant-ar': bentonBryantArContent,
  'san-diego-ca': sanDiegoCaContent,
  'ventura-oxnard-ca': venturaOxnardCaContent,
  'palmdale-lancaster-ca': palmdaleLancasterCaContent,
  'redding-ca': reddingCaContent,
  'fresno-ca': fresnoCaContent,
  'stockton-ca': stocktonCaContent,
  'modesto-ca': modestoCaContent,
  'sacramento-ca': sacramentoCaContent,
  'riverside-san-bernardino-ca': riversideSanBernardinoCaContent,
  'bakersfield-ca': bakersfieldCaContent,
  'huntsville-al': huntsvilleAlContent,
  'madison-al': madisonAlContent,
  'athens-al': athensAlContent,
  'foley-al': foleyAlContent,
  'daphne-al': daphneAlContent,
  'fairhope-gulf-shores-al': fairhopeGulfShoresAlContent,
  'hoover-al': hooverAlContent,
  'auburn-opelika-al': auburnOpelikaAlContent,
};

export function getCityHubContent(slug: string): CityHubContent | undefined {
  return cityHubContentBySlug[slug];
}

export function getPublishedCityHubSlugs(): string[] {
  return Object.keys(cityHubContentBySlug);
}

export function getPublishedFloridaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'florida'
  );
}

export function getPublishedSouthCarolinaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'south-carolina'
  );
}

/** @deprecated Use getPublishedSouthCarolinaHubSlugs */
export function getPublishedGrandStrandHubSlugs(): string[] {
  return getPublishedSouthCarolinaHubSlugs();
}

export function getPublishedTennesseeHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'tennessee'
  );
}

export function getPublishedTexasHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'texas'
  );
}

export function getPublishedNorthCarolinaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'north-carolina'
  );
}

export function getPublishedIdahoHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'idaho'
  );
}

export function getPublishedOregonHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'oregon'
  );
}

export function getPublishedOklahomaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'oklahoma'
  );
}

export function getPublishedArizonaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'arizona'
  );
}

export function getPublishedArkansasHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'arkansas'
  );
}

export function getPublishedCaliforniaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'california'
  );
}

export function getPublishedAlabamaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'alabama'
  );
}