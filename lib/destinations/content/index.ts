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
import { greenvilleScContent } from '@/lib/destinations/content/greenville-sc';
import { spartanburgScContent } from '@/lib/destinations/content/spartanburg-sc';
import { hiltonHeadScContent } from '@/lib/destinations/content/hilton-head-sc';
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
import { centertonArContent } from '@/lib/destinations/content/centerton-ar';
import { bellaVistaArContent } from '@/lib/destinations/content/bella-vista-ar';
import { littleRockArContent } from '@/lib/destinations/content/little-rock-ar';
import { conwayArContent } from '@/lib/destinations/content/conway-ar';
import { springdaleArContent } from '@/lib/destinations/content/springdale-ar';
import { fortSmithArContent } from '@/lib/destinations/content/fort-smith-ar';
import { jonesboroArContent } from '@/lib/destinations/content/jonesboro-ar';
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
import { suffolkChesapeakeVaContent } from '@/lib/destinations/content/suffolk-chesapeake-va';
import { winchesterVaContent } from '@/lib/destinations/content/winchester-va';
import { fredericksburgCulpeperVaContent } from '@/lib/destinations/content/fredericksburg-culpeper-va';
import { richmondVaContent } from '@/lib/destinations/content/richmond-va';
import { arlingtonAlexandriaVaContent } from '@/lib/destinations/content/arlington-alexandria-va';
import { leesburgFairfaxVaContent } from '@/lib/destinations/content/leesburg-fairfax-va';
import { charlottesvilleVaContent } from '@/lib/destinations/content/charlottesville-va';
import { roanokeVaContent } from '@/lib/destinations/content/roanoke-va';
import { martinsburgWvContent } from '@/lib/destinations/content/martinsburg-wv';
import { charlesTownRansonWvContent } from '@/lib/destinations/content/charles-town-ranson-wv';
import { shepherdstownWvContent } from '@/lib/destinations/content/shepherdstown-wv';
import { morgantownWvContent } from '@/lib/destinations/content/morgantown-wv';
import { bridgeportWvContent } from '@/lib/destinations/content/bridgeport-wv';
import { charlestonWvContent } from '@/lib/destinations/content/charleston-wv';
import { hurricaneTeaysValleyWvContent } from '@/lib/destinations/content/hurricane-teays-valley-wv';
import { lewisburgWvContent } from '@/lib/destinations/content/lewisburg-wv';
import { elkinsWvContent } from '@/lib/destinations/content/elkins-wv';
import { pittsburghPaContent } from '@/lib/destinations/content/pittsburgh-pa';
import { williamsportPaContent } from '@/lib/destinations/content/williamsport-pa';
import { altoonaPaContent } from '@/lib/destinations/content/altoona-pa';
import { eriePaContent } from '@/lib/destinations/content/erie-pa';
import { bethlehemPaContent } from '@/lib/destinations/content/bethlehem-pa';
import { chambersburgPaContent } from '@/lib/destinations/content/chambersburg-pa';
import { lancasterPaContent } from '@/lib/destinations/content/lancaster-pa';
import { johnstownPaContent } from '@/lib/destinations/content/johnstown-pa';
import { stateCollegePaContent } from '@/lib/destinations/content/state-college-pa';
import { scrantonPaContent } from '@/lib/destinations/content/scranton-pa';
import { jerseyCityNjContent } from '@/lib/destinations/content/jersey-city-nj';
import { hobokenNjContent } from '@/lib/destinations/content/hoboken-nj';
import { cliftonNjContent } from '@/lib/destinations/content/clifton-nj';
import { morristownNjContent } from '@/lib/destinations/content/morristown-nj';
import { montclairNjContent } from '@/lib/destinations/content/montclair-nj';
import { princetonNjContent } from '@/lib/destinations/content/princeton-nj';
import { bayonneNjContent } from '@/lib/destinations/content/bayonne-nj';
import { vinelandNjContent } from '@/lib/destinations/content/vineland-nj';
import { unionCityNjContent } from '@/lib/destinations/content/union-city-nj';
import { passaicElizabethNjContent } from '@/lib/destinations/content/passaic-elizabeth-nj';
import { massapequaParkNyContent } from '@/lib/destinations/content/massapequa-park-ny';
import { greeceNyContent } from '@/lib/destinations/content/greece-ny';
import { hicksvilleNyContent } from '@/lib/destinations/content/hicksville-ny';
import { cheektowagaNyContent } from '@/lib/destinations/content/cheektowaga-ny';
import { whitePlainsNyContent } from '@/lib/destinations/content/white-plains-ny';
import { tonawandaNyContent } from '@/lib/destinations/content/tonawanda-ny';
import { glensFallsNyContent } from '@/lib/destinations/content/glens-falls-ny';
import { newRochelleNyContent } from '@/lib/destinations/content/new-rochelle-ny';
import { elmiraNyContent } from '@/lib/destinations/content/elmira-ny';
import { lindenhurstNyContent } from '@/lib/destinations/content/lindenhurst-ny';
import { newtonMaContent } from '@/lib/destinations/content/newton-ma';
import { walthamMaContent } from '@/lib/destinations/content/waltham-ma';
import { somervilleMaContent } from '@/lib/destinations/content/somerville-ma';
import { brooklineMaContent } from '@/lib/destinations/content/brookline-ma';
import { lexingtonMaContent } from '@/lib/destinations/content/lexington-ma';
import { cambridgeMaContent } from '@/lib/destinations/content/cambridge-ma';
import { worcesterMaContent } from '@/lib/destinations/content/worcester-ma';
import { maldenMaContent } from '@/lib/destinations/content/malden-ma';
import { framinghamMaContent } from '@/lib/destinations/content/framingham-ma';
import { quincyMaContent } from '@/lib/destinations/content/quincy-ma';
import { warwickRiContent } from '@/lib/destinations/content/warwick-ri';
import { cranstonRiContent } from '@/lib/destinations/content/cranston-ri';
import { barringtonRiContent } from '@/lib/destinations/content/barrington-ri';
import { eastGreenwichRiContent } from '@/lib/destinations/content/east-greenwich-ri';
import { providenceRiContent } from '@/lib/destinations/content/providence-ri';
import { cumberlandRiContent } from '@/lib/destinations/content/cumberland-ri';
import { northKingstownRiContent } from '@/lib/destinations/content/north-kingstown-ri';
import { bristolRiContent } from '@/lib/destinations/content/bristol-ri';
import { newportRiContent } from '@/lib/destinations/content/newport-ri';
import { lincolnRiContent } from '@/lib/destinations/content/lincoln-ri';
import { southBurlingtonVtContent } from '@/lib/destinations/content/south-burlington-vt';
import { burlingtonVtContent } from '@/lib/destinations/content/burlington-vt';
import { essexVtContent } from '@/lib/destinations/content/essex-vt';
import { colchesterVtContent } from '@/lib/destinations/content/colchester-vt';
import { willistonVtContent } from '@/lib/destinations/content/williston-vt';
import { montpelierVtContent } from '@/lib/destinations/content/montpelier-vt';
import { rutlandVtContent } from '@/lib/destinations/content/rutland-vt';
import { stJohnsburyVtContent } from '@/lib/destinations/content/st-johnsbury-vt';
import { middleburyVtContent } from '@/lib/destinations/content/middlebury-vt';
import { brattleboroVtContent } from '@/lib/destinations/content/brattleboro-vt';
import { nashuaNhContent } from '@/lib/destinations/content/nashua-nh';
import { manchesterNhContent } from '@/lib/destinations/content/manchester-nh';
import { portsmouthNhContent } from '@/lib/destinations/content/portsmouth-nh';
import { bedfordNhContent } from '@/lib/destinations/content/bedford-nh';
import { concordNhContent } from '@/lib/destinations/content/concord-nh';
import { doverNhContent } from '@/lib/destinations/content/dover-nh';
import { hanoverNhContent } from '@/lib/destinations/content/hanover-nh';
import { lebanonNhContent } from '@/lib/destinations/content/lebanon-nh';
import { amherstNhContent } from '@/lib/destinations/content/amherst-nh';
import { merrimackNhContent } from '@/lib/destinations/content/merrimack-nh';
import { mentorOhContent } from '@/lib/destinations/content/mentor-oh';
import { parmaOhContent } from '@/lib/destinations/content/parma-oh';
import { columbusOhContent } from '@/lib/destinations/content/columbus-oh';
import { cincinnatiOhContent } from '@/lib/destinations/content/cincinnati-oh';
import { clevelandOhContent } from '@/lib/destinations/content/cleveland-oh';
import { hamiltonOhContent } from '@/lib/destinations/content/hamilton-oh';
import { springfieldOhContent } from '@/lib/destinations/content/springfield-oh';
import { limaOhContent } from '@/lib/destinations/content/lima-oh';
import { lorainOhContent } from '@/lib/destinations/content/lorain-oh';
import { sanduskyOhContent } from '@/lib/destinations/content/sandusky-oh';
import { portlandMeContent } from '@/lib/destinations/content/portland-me';
import { bangorMeContent } from '@/lib/destinations/content/bangor-me';
import { southPortlandMeContent } from '@/lib/destinations/content/south-portland-me';
import { brunswickMeContent } from '@/lib/destinations/content/brunswick-me';
import { falmouthMeContent } from '@/lib/destinations/content/falmouth-me';
import { biddefordMeContent } from '@/lib/destinations/content/biddeford-me';
import { camdenMeContent } from '@/lib/destinations/content/camden-me';
import { kennebunkMeContent } from '@/lib/destinations/content/kennebunk-me';
import { augustaMeContent } from '@/lib/destinations/content/augusta-me';
import { lewistonAuburnMeContent } from '@/lib/destinations/content/lewiston-auburn-me';
import { carmelInContent } from '@/lib/destinations/content/carmel-in';
import { fishersInContent } from '@/lib/destinations/content/fishers-in';
import { indianapolisInContent } from '@/lib/destinations/content/indianapolis-in';
import { noblesvilleInContent } from '@/lib/destinations/content/noblesville-in';
import { greenwoodInContent } from '@/lib/destinations/content/greenwood-in';
import { columbusInContent } from '@/lib/destinations/content/columbus-in';
import { fortWayneInContent } from '@/lib/destinations/content/fort-wayne-in';
import { bloomingtonInContent } from '@/lib/destinations/content/bloomington-in';
import { muncieInContent } from '@/lib/destinations/content/muncie-in';
import { evansvilleInContent } from '@/lib/destinations/content/evansville-in';
import { buffaloGroveIlContent } from '@/lib/destinations/content/buffalo-grove-il';
import { napervilleIlContent } from '@/lib/destinations/content/naperville-il';
import { arlingtonHeightsIlContent } from '@/lib/destinations/content/arlington-heights-il';
import { palatineIlContent } from '@/lib/destinations/content/palatine-il';
import { bolingbrookIlContent } from '@/lib/destinations/content/bolingbrook-il';
import { elginIlContent } from '@/lib/destinations/content/elgin-il';
import { bloomingtonIlContent } from '@/lib/destinations/content/bloomington-il';
import { schaumburgIlContent } from '@/lib/destinations/content/schaumburg-il';
import { desPlainesIlContent } from '@/lib/destinations/content/des-plaines-il';
import { skokieIlContent } from '@/lib/destinations/content/skokie-il';
import { chicagoIlContent } from '@/lib/destinations/content/chicago-il';
import { seattleWaContent } from '@/lib/destinations/content/seattle-wa';
import { johnsCreekGaContent } from '@/lib/destinations/content/johns-creek-ga';
import { alpharettaGaContent } from '@/lib/destinations/content/alpharetta-ga';
import { roswellGaContent } from '@/lib/destinations/content/roswell-ga';
import { atlantaGaContent } from '@/lib/destinations/content/atlanta-ga';
import { decaturGaContent } from '@/lib/destinations/content/decatur-ga';
import { smyrnaGaContent } from '@/lib/destinations/content/smyrna-ga';
import { cummingGaContent } from '@/lib/destinations/content/cumming-ga';
import { savannahGaContent } from '@/lib/destinations/content/savannah-ga';
import { warnerRobinsGaContent } from '@/lib/destinations/content/warner-robins-ga';
import { poolerGaContent } from '@/lib/destinations/content/pooler-ga';
import { metairieLaContent } from '@/lib/destinations/content/metairie-la';
import { kennerLaContent } from '@/lib/destinations/content/kenner-la';
import { slidellLaContent } from '@/lib/destinations/content/slidell-la';
import { mandevilleLaContent } from '@/lib/destinations/content/mandeville-la';
import { lafayetteLaContent } from '@/lib/destinations/content/lafayette-la';
import { lakeCharlesLaContent } from '@/lib/destinations/content/lake-charles-la';
import { bossierCityLaContent } from '@/lib/destinations/content/bossier-city-la';
import { houmaLaContent } from '@/lib/destinations/content/houma-la';
import { prairievilleLaContent } from '@/lib/destinations/content/prairieville-la';
import { batonRougeLaContent } from '@/lib/destinations/content/baton-rouge-la';
import { gulfportMsContent } from '@/lib/destinations/content/gulfport-ms';
import { madisonMsContent } from '@/lib/destinations/content/madison-ms';
import { hattiesburgMsContent } from '@/lib/destinations/content/hattiesburg-ms';
import { oceanSpringsMsContent } from '@/lib/destinations/content/ocean-springs-ms';
import { oliveBranchMsContent } from '@/lib/destinations/content/olive-branch-ms';
import { oxfordMsContent } from '@/lib/destinations/content/oxford-ms';
import { flowoodMsContent } from '@/lib/destinations/content/flowood-ms';
import { brandonMsContent } from '@/lib/destinations/content/brandon-ms';
import { ridgelandMsContent } from '@/lib/destinations/content/ridgeland-ms';
import { jacksonMsContent } from '@/lib/destinations/content/jackson-ms';
import { anchorageAkContent } from '@/lib/destinations/content/anchorage-ak';
import { wasillaAkContent } from '@/lib/destinations/content/wasilla-ak';
import { palmerAkContent } from '@/lib/destinations/content/palmer-ak';
import { fairbanksAkContent } from '@/lib/destinations/content/fairbanks-ak';
import { juneauAkContent } from '@/lib/destinations/content/juneau-ak';
import { sitkaAkContent } from '@/lib/destinations/content/sitka-ak';
import { soldotnaAkContent } from '@/lib/destinations/content/soldotna-ak';
import { kenaiAkContent } from '@/lib/destinations/content/kenai-ak';
import { homerAkContent } from '@/lib/destinations/content/homer-ak';
import { ketchikanAkContent } from '@/lib/destinations/content/ketchikan-ak';
import { honoluluHiContent } from '@/lib/destinations/content/honolulu-hi';
import { kapoleiHiContent } from '@/lib/destinations/content/kapolei-hi';
import { kailuaHiContent } from '@/lib/destinations/content/kailua-hi';
import { pearlCityHiContent } from '@/lib/destinations/content/pearl-city-hi';
import { waipahuHiContent } from '@/lib/destinations/content/waipahu-hi';
import { kiheiHiContent } from '@/lib/destinations/content/kihei-hi';
import { wailukuHiContent } from '@/lib/destinations/content/wailuku-hi';
import { hiloHiContent } from '@/lib/destinations/content/hilo-hi';
import { kailuaKonaHiContent } from '@/lib/destinations/content/kailua-kona-hi';
import { lihueHiContent } from '@/lib/destinations/content/lihue-hi';
import { rioRanchoNmContent } from '@/lib/destinations/content/rio-rancho-nm';
import { albuquerqueNmContent } from '@/lib/destinations/content/albuquerque-nm';
import { farmingtonNmContent } from '@/lib/destinations/content/farmington-nm';
import { santaFeNmContent } from '@/lib/destinations/content/santa-fe-nm';
import { lasCrucesNmContent } from '@/lib/destinations/content/las-cruces-nm';
import { losAlamosNmContent } from '@/lib/destinations/content/los-alamos-nm';
import { alamogordoNmContent } from '@/lib/destinations/content/alamogordo-nm';
import { corralesNmContent } from '@/lib/destinations/content/corrales-nm';
import { taosNmContent } from '@/lib/destinations/content/taos-nm';
import { ruidosoNmContent } from '@/lib/destinations/content/ruidoso-nm';
import { danburyCtContent } from '@/lib/destinations/content/danbury-ct';
import { denverCoContent } from '@/lib/destinations/content/denver-co';
import { glastonburyCtContent } from '@/lib/destinations/content/glastonbury-ct';
import { milfordCtContent } from '@/lib/destinations/content/milford-ct';
import { mysticCtContent } from '@/lib/destinations/content/mystic-ct';
import { norwalkCtContent } from '@/lib/destinations/content/norwalk-ct';
import { coloradoSpringsCoContent } from '@/lib/destinations/content/colorado-springs-co';
import { fortCollinsCoContent } from '@/lib/destinations/content/fort-collins-co';
import { boulderCoContent } from '@/lib/destinations/content/boulder-co';
import { castleRockCoContent } from '@/lib/destinations/content/castle-rock-co';
import { centennialCoContent } from '@/lib/destinations/content/centennial-co';
import { parkerCoContent } from '@/lib/destinations/content/parker-co';
import { arvadaCoContent } from '@/lib/destinations/content/arvada-co';
import { longmontCoContent } from '@/lib/destinations/content/longmont-co';
import { puebloCoContent } from '@/lib/destinations/content/pueblo-co';
import { fairfieldCtContent } from '@/lib/destinations/content/fairfield-ct';
import { greenwichCtContent } from '@/lib/destinations/content/greenwich-ct';
import { stamfordCtContent } from '@/lib/destinations/content/stamford-ct';
import { westHartfordCtContent } from '@/lib/destinations/content/west-hartford-ct';
import { westportCtContent } from '@/lib/destinations/content/westport-ct';
import { wilmingtonDeContent } from '@/lib/destinations/content/wilmington-de';
import { newarkDeContent } from '@/lib/destinations/content/newark-de';
import { hockessinDeContent } from '@/lib/destinations/content/hockessin-de';
import { middletownDeContent } from '@/lib/destinations/content/middletown-de';
import { smyrnaDeContent } from '@/lib/destinations/content/smyrna-de';
import { doverDeContent } from '@/lib/destinations/content/dover-de';
import { lewesDeContent } from '@/lib/destinations/content/lewes-de';
import { milfordDeContent } from '@/lib/destinations/content/milford-de';
import { miltonDeContent } from '@/lib/destinations/content/milton-de';
import { rehobothBeachDeContent } from '@/lib/destinations/content/rehoboth-beach-de';
import { ankenyIaContent } from '@/lib/destinations/content/ankeny-ia';
import { westDesMoinesIaContent } from '@/lib/destinations/content/west-des-moines-ia';
import { desMoinesIaContent } from '@/lib/destinations/content/des-moines-ia';
import { waukeeIaContent } from '@/lib/destinations/content/waukee-ia';
import { iowaCityIaContent } from '@/lib/destinations/content/iowa-city-ia';
import { amesIaContent } from '@/lib/destinations/content/ames-ia';
import { cedarRapidsIaContent } from '@/lib/destinations/content/cedar-rapids-ia';
import { dubuqueIaContent } from '@/lib/destinations/content/dubuque-ia';
import { decorahIaContent } from '@/lib/destinations/content/decorah-ia';
import { pellaIaContent } from '@/lib/destinations/content/pella-ia';
import { overlandParkKsContent } from '@/lib/destinations/content/overland-park-ks';
import { olatheKsContent } from '@/lib/destinations/content/olathe-ks';
import { lenexaKsContent } from '@/lib/destinations/content/lenexa-ks';
import { leawoodKsContent } from '@/lib/destinations/content/leawood-ks';
import { shawneeKsContent } from '@/lib/destinations/content/shawnee-ks';
import { lawrenceKsContent } from '@/lib/destinations/content/lawrence-ks';
import { manhattanKsContent } from '@/lib/destinations/content/manhattan-ks';
import { wichitaKsContent } from '@/lib/destinations/content/wichita-ks';
import { topekaKsContent } from '@/lib/destinations/content/topeka-ks';
import { andoverKsContent } from '@/lib/destinations/content/andover-ks';
import { lexingtonKyContent } from '@/lib/destinations/content/lexington-ky';
import { louisvilleKyContent } from '@/lib/destinations/content/louisville-ky';
import { bowlingGreenKyContent } from '@/lib/destinations/content/bowling-green-ky';
import { elizabethtownKyContent } from '@/lib/destinations/content/elizabethtown-ky';
import { covingtonKyContent } from '@/lib/destinations/content/covington-ky';
import { georgetownKyContent } from '@/lib/destinations/content/georgetown-ky';
import { richmondKyContent } from '@/lib/destinations/content/richmond-ky';
import { florenceKyContent } from '@/lib/destinations/content/florence-ky';
import { owensboroKyContent } from '@/lib/destinations/content/owensboro-ky';
import { paducahKyContent } from '@/lib/destinations/content/paducah-ky';
import { bethesdaMdContent } from '@/lib/destinations/content/bethesda-md';
import { columbiaMdContent } from '@/lib/destinations/content/columbia-md';
import { rockvilleMdContent } from '@/lib/destinations/content/rockville-md';
import { silverSpringMdContent } from '@/lib/destinations/content/silver-spring-md';
import { ellicottCityMdContent } from '@/lib/destinations/content/ellicott-city-md';
import { frederickMdContent } from '@/lib/destinations/content/frederick-md';
import { annapolisMdContent } from '@/lib/destinations/content/annapolis-md';
import { severnaParkMdContent } from '@/lib/destinations/content/severna-park-md';
import { eastonMdContent } from '@/lib/destinations/content/easton-md';
import { baltimoreMdContent } from '@/lib/destinations/content/baltimore-md';
import { duluthMnContent } from '@/lib/destinations/content/duluth-mn';
import { edenPrairieMnContent } from '@/lib/destinations/content/eden-prairie-mn';
import { edinaMnContent } from '@/lib/destinations/content/edina-mn';
import { eaganMnContent } from '@/lib/destinations/content/eagan-mn';
import { mapleGroveMnContent } from '@/lib/destinations/content/maple-grove-mn';
import { plymouthMnContent } from '@/lib/destinations/content/plymouth-mn';
import { rochesterMnContent } from '@/lib/destinations/content/rochester-mn';
import { stillwaterMnContent } from '@/lib/destinations/content/stillwater-mn';
import { wayzataMnContent } from '@/lib/destinations/content/wayzata-mn';
import { woodburyMnContent } from '@/lib/destinations/content/woodbury-mn';
import { columbiaMoContent } from '@/lib/destinations/content/columbia-mo';
import { leesSummitMoContent } from '@/lib/destinations/content/lees-summit-mo';
import { ofallonMoContent } from '@/lib/destinations/content/ofallon-mo';
import { kansasCityMoContent } from '@/lib/destinations/content/kansas-city-mo';
import { chesterfieldMoContent } from '@/lib/destinations/content/chesterfield-mo';
import { springfieldMoContent } from '@/lib/destinations/content/springfield-mo';
import { stCharlesMoContent } from '@/lib/destinations/content/st-charles-mo';
import { libertyMoContent } from '@/lib/destinations/content/liberty-mo';
import { stLouisMoContent } from '@/lib/destinations/content/st-louis-mo';
import { republicNixaMoContent } from '@/lib/destinations/content/republic-nixa-mo';

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
  'greenville-sc': greenvilleScContent,
  'spartanburg-sc': spartanburgScContent,
  'hilton-head-sc': hiltonHeadScContent,
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
  'centerton-ar': centertonArContent,
  'bella-vista-ar': bellaVistaArContent,
  'little-rock-ar': littleRockArContent,
  'conway-ar': conwayArContent,
  'springdale-ar': springdaleArContent,
  'fort-smith-ar': fortSmithArContent,
  'jonesboro-ar': jonesboroArContent,
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
  'suffolk-chesapeake-va': suffolkChesapeakeVaContent,
  'winchester-va': winchesterVaContent,
  'fredericksburg-culpeper-va': fredericksburgCulpeperVaContent,
  'richmond-va': richmondVaContent,
  'arlington-alexandria-va': arlingtonAlexandriaVaContent,
  'leesburg-fairfax-va': leesburgFairfaxVaContent,
  'charlottesville-va': charlottesvilleVaContent,
  'roanoke-va': roanokeVaContent,
  'martinsburg-wv': martinsburgWvContent,
  'charles-town-ranson-wv': charlesTownRansonWvContent,
  'shepherdstown-wv': shepherdstownWvContent,
  'morgantown-wv': morgantownWvContent,
  'bridgeport-wv': bridgeportWvContent,
  'charleston-wv': charlestonWvContent,
  'hurricane-teays-valley-wv': hurricaneTeaysValleyWvContent,
  'lewisburg-wv': lewisburgWvContent,
  'elkins-wv': elkinsWvContent,
  'pittsburgh-pa': pittsburghPaContent,
  'williamsport-pa': williamsportPaContent,
  'altoona-pa': altoonaPaContent,
  'erie-pa': eriePaContent,
  'bethlehem-pa': bethlehemPaContent,
  'chambersburg-pa': chambersburgPaContent,
  'lancaster-pa': lancasterPaContent,
  'johnstown-pa': johnstownPaContent,
  'state-college-pa': stateCollegePaContent,
  'scranton-pa': scrantonPaContent,
  'jersey-city-nj': jerseyCityNjContent,
  'hoboken-nj': hobokenNjContent,
  'clifton-nj': cliftonNjContent,
  'morristown-nj': morristownNjContent,
  'montclair-nj': montclairNjContent,
  'princeton-nj': princetonNjContent,
  'bayonne-nj': bayonneNjContent,
  'vineland-nj': vinelandNjContent,
  'union-city-nj': unionCityNjContent,
  'passaic-elizabeth-nj': passaicElizabethNjContent,
  'massapequa-park-ny': massapequaParkNyContent,
  'greece-ny': greeceNyContent,
  'hicksville-ny': hicksvilleNyContent,
  'cheektowaga-ny': cheektowagaNyContent,
  'white-plains-ny': whitePlainsNyContent,
  'tonawanda-ny': tonawandaNyContent,
  'glens-falls-ny': glensFallsNyContent,
  'new-rochelle-ny': newRochelleNyContent,
  'elmira-ny': elmiraNyContent,
  'lindenhurst-ny': lindenhurstNyContent,
  'newton-ma': newtonMaContent,
  'waltham-ma': walthamMaContent,
  'somerville-ma': somervilleMaContent,
  'brookline-ma': brooklineMaContent,
  'lexington-ma': lexingtonMaContent,
  'cambridge-ma': cambridgeMaContent,
  'worcester-ma': worcesterMaContent,
  'malden-ma': maldenMaContent,
  'framingham-ma': framinghamMaContent,
  'quincy-ma': quincyMaContent,
  'warwick-ri': warwickRiContent,
  'cranston-ri': cranstonRiContent,
  'barrington-ri': barringtonRiContent,
  'east-greenwich-ri': eastGreenwichRiContent,
  'providence-ri': providenceRiContent,
  'cumberland-ri': cumberlandRiContent,
  'north-kingstown-ri': northKingstownRiContent,
  'bristol-ri': bristolRiContent,
  'newport-ri': newportRiContent,
  'lincoln-ri': lincolnRiContent,
  'south-burlington-vt': southBurlingtonVtContent,
  'burlington-vt': burlingtonVtContent,
  'essex-vt': essexVtContent,
  'colchester-vt': colchesterVtContent,
  'williston-vt': willistonVtContent,
  'montpelier-vt': montpelierVtContent,
  'rutland-vt': rutlandVtContent,
  'st-johnsbury-vt': stJohnsburyVtContent,
  'middlebury-vt': middleburyVtContent,
  'brattleboro-vt': brattleboroVtContent,
  'nashua-nh': nashuaNhContent,
  'manchester-nh': manchesterNhContent,
  'portsmouth-nh': portsmouthNhContent,
  'bedford-nh': bedfordNhContent,
  'concord-nh': concordNhContent,
  'dover-nh': doverNhContent,
  'hanover-nh': hanoverNhContent,
  'lebanon-nh': lebanonNhContent,
  'amherst-nh': amherstNhContent,
  'merrimack-nh': merrimackNhContent,
  'mentor-oh': mentorOhContent,
  'parma-oh': parmaOhContent,
  'columbus-oh': columbusOhContent,
  'cincinnati-oh': cincinnatiOhContent,
  'cleveland-oh': clevelandOhContent,
  'hamilton-oh': hamiltonOhContent,
  'springfield-oh': springfieldOhContent,
  'lima-oh': limaOhContent,
  'lorain-oh': lorainOhContent,
  'sandusky-oh': sanduskyOhContent,
  'portland-me': portlandMeContent,
  'bangor-me': bangorMeContent,
  'south-portland-me': southPortlandMeContent,
  'brunswick-me': brunswickMeContent,
  'falmouth-me': falmouthMeContent,
  'biddeford-me': biddefordMeContent,
  'camden-me': camdenMeContent,
  'kennebunk-me': kennebunkMeContent,
  'augusta-me': augustaMeContent,
  'lewiston-auburn-me': lewistonAuburnMeContent,
  'carmel-in': carmelInContent,
  'fishers-in': fishersInContent,
  'indianapolis-in': indianapolisInContent,
  'noblesville-in': noblesvilleInContent,
  'greenwood-in': greenwoodInContent,
  'columbus-in': columbusInContent,
  'fort-wayne-in': fortWayneInContent,
  'bloomington-in': bloomingtonInContent,
  'muncie-in': muncieInContent,
  'evansville-in': evansvilleInContent,
  'buffalo-grove-il': buffaloGroveIlContent,
  'naperville-il': napervilleIlContent,
  'arlington-heights-il': arlingtonHeightsIlContent,
  'palatine-il': palatineIlContent,
  'bolingbrook-il': bolingbrookIlContent,
  'elgin-il': elginIlContent,
  'bloomington-il': bloomingtonIlContent,
  'schaumburg-il': schaumburgIlContent,
  'des-plaines-il': desPlainesIlContent,
  'skokie-il': skokieIlContent,
  'chicago-il': chicagoIlContent,
  'seattle-wa': seattleWaContent,
  'johns-creek-ga': johnsCreekGaContent,
  'alpharetta-ga': alpharettaGaContent,
  'roswell-ga': roswellGaContent,
  'atlanta-ga': atlantaGaContent,
  'decatur-ga': decaturGaContent,
  'smyrna-ga': smyrnaGaContent,
  'cumming-ga': cummingGaContent,
  'savannah-ga': savannahGaContent,
  'warner-robins-ga': warnerRobinsGaContent,
  'pooler-ga': poolerGaContent,
  'metairie-la': metairieLaContent,
  'kenner-la': kennerLaContent,
  'slidell-la': slidellLaContent,
  'mandeville-la': mandevilleLaContent,
  'lafayette-la': lafayetteLaContent,
  'lake-charles-la': lakeCharlesLaContent,
  'bossier-city-la': bossierCityLaContent,
  'houma-la': houmaLaContent,
  'prairieville-la': prairievilleLaContent,
  'baton-rouge-la': batonRougeLaContent,
  'gulfport-ms': gulfportMsContent,
  'madison-ms': madisonMsContent,
  'hattiesburg-ms': hattiesburgMsContent,
  'ocean-springs-ms': oceanSpringsMsContent,
  'olive-branch-ms': oliveBranchMsContent,
  'oxford-ms': oxfordMsContent,
  'flowood-ms': flowoodMsContent,
  'brandon-ms': brandonMsContent,
  'ridgeland-ms': ridgelandMsContent,
  'jackson-ms': jacksonMsContent,
  'anchorage-ak': anchorageAkContent,
  'wasilla-ak': wasillaAkContent,
  'palmer-ak': palmerAkContent,
  'fairbanks-ak': fairbanksAkContent,
  'juneau-ak': juneauAkContent,
  'sitka-ak': sitkaAkContent,
  'soldotna-ak': soldotnaAkContent,
  'kenai-ak': kenaiAkContent,
  'homer-ak': homerAkContent,
  'ketchikan-ak': ketchikanAkContent,
  'honolulu-hi': honoluluHiContent,
  'kapolei-hi': kapoleiHiContent,
  'kailua-hi': kailuaHiContent,
  'pearl-city-hi': pearlCityHiContent,
  'waipahu-hi': waipahuHiContent,
  'kihei-hi': kiheiHiContent,
  'wailuku-hi': wailukuHiContent,
  'hilo-hi': hiloHiContent,
  'kailua-kona-hi': kailuaKonaHiContent,
  'lihue-hi': lihueHiContent,
  'rio-rancho-nm': rioRanchoNmContent,
  'albuquerque-nm': albuquerqueNmContent,
  'farmington-nm': farmingtonNmContent,
  'santa-fe-nm': santaFeNmContent,
  'las-cruces-nm': lasCrucesNmContent,
  'los-alamos-nm': losAlamosNmContent,
  'alamogordo-nm': alamogordoNmContent,
  'corrales-nm': corralesNmContent,
  'taos-nm': taosNmContent,
  'ruidoso-nm': ruidosoNmContent,
  'danbury-ct': danburyCtContent,
  'denver-co': denverCoContent,
  'glastonbury-ct': glastonburyCtContent,
  'milford-ct': milfordCtContent,
  'mystic-ct': mysticCtContent,
  'norwalk-ct': norwalkCtContent,
  'colorado-springs-co': coloradoSpringsCoContent,
  'fort-collins-co': fortCollinsCoContent,
  'boulder-co': boulderCoContent,
  'castle-rock-co': castleRockCoContent,
  'centennial-co': centennialCoContent,
  'parker-co': parkerCoContent,
  'arvada-co': arvadaCoContent,
  'longmont-co': longmontCoContent,
  'pueblo-co': puebloCoContent,
  'fairfield-ct': fairfieldCtContent,
  'greenwich-ct': greenwichCtContent,
  'stamford-ct': stamfordCtContent,
  'west-hartford-ct': westHartfordCtContent,
  'westport-ct': westportCtContent,
  'wilmington-de': wilmingtonDeContent,
  'newark-de': newarkDeContent,
  'hockessin-de': hockessinDeContent,
  'middletown-de': middletownDeContent,
  'smyrna-de': smyrnaDeContent,
  'dover-de': doverDeContent,
  'lewes-de': lewesDeContent,
  'milford-de': milfordDeContent,
  'milton-de': miltonDeContent,
  'rehoboth-beach-de': rehobothBeachDeContent,
  'ankeny-ia': ankenyIaContent,
  'west-des-moines-ia': westDesMoinesIaContent,
  'des-moines-ia': desMoinesIaContent,
  'waukee-ia': waukeeIaContent,
  'iowa-city-ia': iowaCityIaContent,
  'ames-ia': amesIaContent,
  'cedar-rapids-ia': cedarRapidsIaContent,
  'dubuque-ia': dubuqueIaContent,
  'decorah-ia': decorahIaContent,
  'pella-ia': pellaIaContent,
  'overland-park-ks': overlandParkKsContent,
  'olathe-ks': olatheKsContent,
  'lenexa-ks': lenexaKsContent,
  'leawood-ks': leawoodKsContent,
  'shawnee-ks': shawneeKsContent,
  'lawrence-ks': lawrenceKsContent,
  'manhattan-ks': manhattanKsContent,
  'wichita-ks': wichitaKsContent,
  'topeka-ks': topekaKsContent,
  'andover-ks': andoverKsContent,
  'lexington-ky': lexingtonKyContent,
  'louisville-ky': louisvilleKyContent,
  'bowling-green-ky': bowlingGreenKyContent,
  'elizabethtown-ky': elizabethtownKyContent,
  'covington-ky': covingtonKyContent,
  'georgetown-ky': georgetownKyContent,
  'richmond-ky': richmondKyContent,
  'florence-ky': florenceKyContent,
  'owensboro-ky': owensboroKyContent,
  'paducah-ky': paducahKyContent,
  'bethesda-md': bethesdaMdContent,
  'columbia-md': columbiaMdContent,
  'rockville-md': rockvilleMdContent,
  'silver-spring-md': silverSpringMdContent,
  'ellicott-city-md': ellicottCityMdContent,
  'frederick-md': frederickMdContent,
  'annapolis-md': annapolisMdContent,
  'severna-park-md': severnaParkMdContent,
  'easton-md': eastonMdContent,
  'baltimore-md': baltimoreMdContent,
  'duluth-mn': duluthMnContent,
  'eagan-mn': eaganMnContent,
  'eden-prairie-mn': edenPrairieMnContent,
  'edina-mn': edinaMnContent,
  'maple-grove-mn': mapleGroveMnContent,
  'plymouth-mn': plymouthMnContent,
  'rochester-mn': rochesterMnContent,
  'stillwater-mn': stillwaterMnContent,
  'wayzata-mn': wayzataMnContent,
  'woodbury-mn': woodburyMnContent,
  'columbia-mo': columbiaMoContent,
  'lees-summit-mo': leesSummitMoContent,
  'ofallon-mo': ofallonMoContent,
  'kansas-city-mo': kansasCityMoContent,
  'chesterfield-mo': chesterfieldMoContent,
  'springfield-mo': springfieldMoContent,
  'st-charles-mo': stCharlesMoContent,
  'liberty-mo': libertyMoContent,
  'st-louis-mo': stLouisMoContent,
  'republic-nixa-mo': republicNixaMoContent,
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

export function getPublishedVirginiaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'virginia'
  );
}

export function getPublishedWestVirginiaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'west-virginia'
  );
}

export function getPublishedPennsylvaniaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'pennsylvania'
  );
}

export function getPublishedNewJerseyHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'new-jersey'
  );
}

export function getPublishedNewYorkHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'new-york'
  );
}

export function getPublishedMassachusettsHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'massachusetts'
  );
}

export function getPublishedRhodeIslandHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'rhode-island'
  );
}

export function getPublishedVermontHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'vermont'
  );
}

export function getPublishedNewHampshireHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'new-hampshire'
  );
}

export function getPublishedMaineHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'maine'
  );
}

export function getPublishedIndianaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'indiana'
  );
}

export function getPublishedOhioHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'ohio'
  );
}

export function getPublishedIllinoisHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'illinois'
  );
}

export function getPublishedWashingtonHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'washington'
  );
}

export function getPublishedGeorgiaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'georgia'
  );
}

export function getPublishedLouisianaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'louisiana'
  );
}

export function getPublishedMississippiHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'mississippi'
  );
}

export function getPublishedAlaskaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'alaska'
  );
}

export function getPublishedNewMexicoHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'new-mexico'
  );
}

export function getPublishedHawaiiHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'hawaii'
  );
}

export function getPublishedColoradoHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'colorado'
  );
}

export function getPublishedConnecticutHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'connecticut'
  );
}

export function getPublishedDelawareHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'delaware'
  );
}

export function getPublishedIowaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'iowa'
  );
}

export function getPublishedKansasHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'kansas'
  );
}

export function getPublishedKentuckyHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'kentucky'
  );
}

export function getPublishedMarylandHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'maryland'
  );
}

export function getPublishedMinnesotaHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'minnesota'
  );
}

export function getPublishedMissouriHubSlugs(): string[] {
  return getPublishedCityHubSlugs().filter(
    (slug) => getMarketBySlug(slug)?.clusterParent === 'missouri'
  );
}