import { alamedaCountyIntelligence } from '@/lib/local-movers/county-intelligence/alameda-ca';
import { bergenCountyIntelligence } from '@/lib/local-movers/county-intelligence/bergen-nj';
import { contraCostaCountyIntelligence } from '@/lib/local-movers/county-intelligence/contra-costa-ca';
import { essexCountyIntelligence } from '@/lib/local-movers/county-intelligence/essex-nj';
import { fresnoCountyIntelligence } from '@/lib/local-movers/county-intelligence/fresno-ca';
import { kernCountyIntelligence } from '@/lib/local-movers/county-intelligence/kern-ca';
import { losAngelesCountyIntelligence } from '@/lib/local-movers/county-intelligence/los-angeles-ca';
import { middlesexCountyIntelligence } from '@/lib/local-movers/county-intelligence/middlesex-nj';
import { monmouthCountyIntelligence } from '@/lib/local-movers/county-intelligence/monmouth-nj';
import { montereyCountyIntelligence } from '@/lib/local-movers/county-intelligence/monterey-ca';
import { morrisCountyIntelligence } from '@/lib/local-movers/county-intelligence/morris-nj';
import { oceanCountyIntelligence } from '@/lib/local-movers/county-intelligence/ocean-nj';
import { orangeCountyIntelligence } from '@/lib/local-movers/county-intelligence/orange-ca';
import { placerCountyIntelligence } from '@/lib/local-movers/county-intelligence/placer-ca';
import { riversideCountyIntelligence } from '@/lib/local-movers/county-intelligence/riverside-ca';
import { sacramentoCountyIntelligence } from '@/lib/local-movers/county-intelligence/sacramento-ca';
import { sanBernardinoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-bernardino-ca';
import { sanDiegoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-diego-ca';
import { sanFranciscoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-francisco-ca';
import { sanJoaquinCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-joaquin-ca';
import { sanMateoCountyIntelligence } from '@/lib/local-movers/county-intelligence/san-mateo-ca';
import { santaBarbaraCountyIntelligence } from '@/lib/local-movers/county-intelligence/santa-barbara-ca';
import { santaClaraCountyIntelligence } from '@/lib/local-movers/county-intelligence/santa-clara-ca';
import { sonomaCountyIntelligence } from '@/lib/local-movers/county-intelligence/sonoma-ca';
import { venturaCountyIntelligence } from '@/lib/local-movers/county-intelligence/ventura-ca';
import { warrenCountyIntelligence } from '@/lib/local-movers/county-intelligence/warren-nj';
import { atlanticCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/atlantic-nj';
import { gloucesterCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/gloucester-nj';
import { hunterdonCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/hunterdon-nj';
import { mercerCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/mercer-nj';
import { somersetCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/somerset-nj';
import { sussexCountyNjIntelligence } from '@/lib/local-movers/county-intelligence/new-jersey/sussex-nj';
// Florida Core 12
import { miamiDadeCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/miami-dade-fl';
import { browardCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/broward-fl';
import { palmBeachCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/palm-beach-fl';
import { hillsboroughCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/hillsborough-fl';
import { orangeCountyFlIntelligence } from '@/lib/local-movers/county-intelligence/florida/orange-fl';
import { pinellasCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/pinellas-fl';
import { duvalCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/duval-fl';
import { leeCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/lee-fl';
import { polkCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/polk-fl';
import { brevardCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/brevard-fl';
import { pascoCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/pasco-fl';
import { volusiaCountyIntelligence } from '@/lib/local-movers/county-intelligence/florida/volusia-fl';
// Texas Core 12
import { harrisCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/harris-tx';
import { dallasCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/dallas-tx';
import { tarrantCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/tarrant-tx';
import { bexarCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/bexar-tx';
import { travisCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/travis-tx';
import { collinCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/collin-tx';
import { dentonCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/denton-tx';
import { fortBendCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/fort-bend-tx';
import { montgomeryCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/montgomery-tx';
import { williamsonCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/williamson-tx';
import { elPasoCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/el-paso-tx';
import { hidalgoCountyIntelligence } from '@/lib/local-movers/county-intelligence/texas/hidalgo-tx';
// Georgia Core 6 (metro) + Wave 2
import { fultonCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/fulton-ga';
import { gwinnettCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/gwinnett-ga';
import { cobbCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/cobb-ga';
import { dekalbCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/dekalb-ga';
import { cherokeeCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/cherokee-ga';
import { forsythCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/forsyth-ga';
import { claytonCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/clayton-ga';
import { henryCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/henry-ga';
import { hallCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/hall-ga';
import { chathamCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/chatham-ga';
import { richmondCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/richmond-ga';
import { muscogeeCountyIntelligence } from '@/lib/local-movers/county-intelligence/georgia/muscogee-ga';
// New York Core 12
import { kingsCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/kings-ny';
import { queensCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/queens-ny';
import { newYorkCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/new-york-ny';
import { bronxCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/bronx-ny';
import { richmondCountyIntelligence as richmondCountyNyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/richmond-ny';
import { nassauCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/nassau-ny';
import { suffolkCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/suffolk-ny';
import { westchesterCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/westchester-ny';
import { erieCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/erie-ny';
import { monroeCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/monroe-ny';
import { onondagaCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/onondaga-ny';
import { albanyCountyIntelligence } from '@/lib/local-movers/county-intelligence/new-york/albany-ny';
// Arizona Core 7
import { maricopaCountyIntelligence } from '@/lib/local-movers/county-intelligence/arizona/maricopa-az';
import { pimaCountyIntelligence } from '@/lib/local-movers/county-intelligence/arizona/pima-az';
import { pinalCountyIntelligence } from '@/lib/local-movers/county-intelligence/arizona/pinal-az';
import { yavapaiCountyIntelligence } from '@/lib/local-movers/county-intelligence/arizona/yavapai-az';
import { mohaveCountyIntelligence } from '@/lib/local-movers/county-intelligence/arizona/mohave-az';
import { yumaCountyIntelligence } from '@/lib/local-movers/county-intelligence/arizona/yuma-az';
import { coconinoCountyIntelligence } from '@/lib/local-movers/county-intelligence/arizona/coconino-az';
// North Carolina Core 12
import { mecklenburgCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/mecklenburg-nc';
import { wakeCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/wake-nc';
import { guilfordCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/guilford-nc';
import { forsythCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/forsyth-nc';
import { durhamCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/durham-nc';
import { cumberlandCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/cumberland-nc';
import { buncombeCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/buncombe-nc';
import { newHanoverCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/new-hanover-nc';
import { unionCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/union-nc';
import { cabarrusCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/cabarrus-nc';
import { gastonCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/gaston-nc';
import { onslowCountyNcIntelligence } from '@/lib/local-movers/county-intelligence/north-carolina/onslow-nc';
// South Carolina Core 12 — intentionally NOT registered until packs are committed
// (broken imports here prevent production deploys and leave VA/TN pages on stale builds).
// Virginia Core 12
import { fairfaxCountyVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/fairfax-va';
import { princeWilliamCountyVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/prince-william-va';
import { loudounCountyVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/loudoun-va';
import { chesterfieldCountyVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/chesterfield-va';
import { henricoCountyVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/henrico-va';
import { virginiaBeachCityVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/virginia-beach-va';
import { arlingtonCountyVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/arlington-va';
import { richmondCityVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/richmond-va';
import { chesapeakeCityVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/chesapeake-va';
import { norfolkCityVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/norfolk-va';
import { staffordCountyVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/stafford-va';
import { spotsylvaniaCountyVaIntelligence } from '@/lib/local-movers/county-intelligence/virginia/spotsylvania-va';
// Tennessee Core 12
import { shelbyCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/shelby-tn';
import { davidsonCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/davidson-tn';
import { knoxCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/knox-tn';
import { hamiltonCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/hamilton-tn';
import { rutherfordCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/rutherford-tn';
import { williamsonCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/williamson-tn';
import { montgomeryCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/montgomery-tn';
import { sumnerCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/sumner-tn';
import { wilsonCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/wilson-tn';
import { blountCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/blount-tn';
import { sevierCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/sevier-tn';
import { sullivanCountyTnIntelligence } from '@/lib/local-movers/county-intelligence/tennessee/sullivan-tn';
// Pennsylvania Core 12
import { philadelphiaCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/philadelphia-pa';
import { alleghenyCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/allegheny-pa';
import { montgomeryCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/montgomery-pa';
import { bucksCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/bucks-pa';
import { delawareCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/delaware-pa';
import { chesterCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/chester-pa';
import { lancasterCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/lancaster-pa';
import { yorkCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/york-pa';
import { berksCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/berks-pa';
import { lehighCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/lehigh-pa';
import { northamptonCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/northampton-pa';
import { westmorelandCountyPaIntelligence } from '@/lib/local-movers/county-intelligence/pennsylvania/westmoreland-pa';
// Illinois Core 12
import { cookCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/cook-il';
import { duPageCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/dupage-il';
import { lakeCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/lake-il';
import { willCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/will-il';
import { kaneCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/kane-il';
import { mcHenryCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/mchenry-il';
import { winnebagoCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/winnebago-il';
import { madisonCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/madison-il';
import { stClairCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/st-clair-il';
import { sangamonCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/sangamon-il';
import { champaignCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/champaign-il';
import { peoriaCountyIlIntelligence } from '@/lib/local-movers/county-intelligence/illinois/peoria-il';
// Ohio Core 12
import { franklinCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/franklin-oh';
import { cuyahogaCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/cuyahoga-oh';
import { hamiltonCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/hamilton-oh';
import { summitCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/summit-oh';
import { montgomeryCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/montgomery-oh';
import { lucasCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/lucas-oh';
import { butlerCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/butler-oh';
import { starkCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/stark-oh';
import { lorainCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/lorain-oh';
import { mahoningCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/mahoning-oh';
import { warrenCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/warren-oh';
import { lakeCountyOhIntelligence } from '@/lib/local-movers/county-intelligence/ohio/lake-oh';
// Colorado Core 10
import { denverCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/denver-co';
import { elPasoCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/el-paso-co';
import { arapahoeCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/arapahoe-co';
import { jeffersonCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/jefferson-co';
import { adamsCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/adams-co';
import { douglasCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/douglas-co';
import { larimerCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/larimer-co';
import { boulderCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/boulder-co';
import { weldCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/weld-co';
import { puebloCountyCoIntelligence } from '@/lib/local-movers/county-intelligence/colorado/pueblo-co';
// Washington Core 10
import { kingCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/king-wa';
import { pierceCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/pierce-wa';
import { snohomishCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/snohomish-wa';
import { spokaneCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/spokane-wa';
import { clarkCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/clark-wa';
import { thurstonCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/thurston-wa';
import { kitsapCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/kitsap-wa';
import { whatcomCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/whatcom-wa';
import { bentonCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/benton-wa';
import { yakimaCountyWaIntelligence } from '@/lib/local-movers/county-intelligence/washington/yakima-wa';
// Michigan Core 10
import { wayneCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/wayne-mi';
import { oaklandCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/oakland-mi';
import { macombCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/macomb-mi';
import { kentCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/kent-mi';
import { washtenawCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/washtenaw-mi';
import { geneseeCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/genesee-mi';
import { ottawaCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/ottawa-mi';
import { inghamCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/ingham-mi';
import { kalamazooCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/kalamazoo-mi';
import { saginawCountyMiIntelligence } from '@/lib/local-movers/county-intelligence/michigan/saginaw-mi';
// Oregon Core 8
import { multnomahCountyOrIntelligence } from '@/lib/local-movers/county-intelligence/oregon/multnomah-or';
import { washingtonCountyOrIntelligence } from '@/lib/local-movers/county-intelligence/oregon/washington-or';
import { clackamasCountyOrIntelligence } from '@/lib/local-movers/county-intelligence/oregon/clackamas-or';
import { laneCountyOrIntelligence } from '@/lib/local-movers/county-intelligence/oregon/lane-or';
import { marionCountyOrIntelligence } from '@/lib/local-movers/county-intelligence/oregon/marion-or';
import { deschutesCountyOrIntelligence } from '@/lib/local-movers/county-intelligence/oregon/deschutes-or';
import { jacksonCountyOrIntelligence } from '@/lib/local-movers/county-intelligence/oregon/jackson-or';
import { linnCountyOrIntelligence } from '@/lib/local-movers/county-intelligence/oregon/linn-or';
// Maryland Core 8
import { montgomeryCountyMdIntelligence } from '@/lib/local-movers/county-intelligence/maryland/montgomery-md';
import { princeGeorgesCountyMdIntelligence } from '@/lib/local-movers/county-intelligence/maryland/prince-georges-md';
import { baltimoreCountyMdIntelligence } from '@/lib/local-movers/county-intelligence/maryland/baltimore-md';
import { anneArundelCountyMdIntelligence } from '@/lib/local-movers/county-intelligence/maryland/anne-arundel-md';
import { howardCountyMdIntelligence } from '@/lib/local-movers/county-intelligence/maryland/howard-md';
import { frederickCountyMdIntelligence } from '@/lib/local-movers/county-intelligence/maryland/frederick-md';
import { harfordCountyMdIntelligence } from '@/lib/local-movers/county-intelligence/maryland/harford-md';
import { baltimoreCityMdIntelligence } from '@/lib/local-movers/county-intelligence/maryland/baltimore-city-md';
// Massachusetts Core 10
import { middlesexCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/middlesex-ma';
import { worcesterCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/worcester-ma';
import { essexCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/essex-ma';
import { suffolkCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/suffolk-ma';
import { norfolkCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/norfolk-ma';
import { bristolCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/bristol-ma';
import { plymouthCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/plymouth-ma';
import { hampdenCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/hampden-ma';
import { barnstableCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/barnstable-ma';
import { hampshireCountyMaIntelligence } from '@/lib/local-movers/county-intelligence/massachusetts/hampshire-ma';
// Minnesota Core 8
import { hennepinCountyMnIntelligence } from '@/lib/local-movers/county-intelligence/minnesota/hennepin-mn';
import { ramseyCountyMnIntelligence } from '@/lib/local-movers/county-intelligence/minnesota/ramsey-mn';
import { dakotaCountyMnIntelligence } from '@/lib/local-movers/county-intelligence/minnesota/dakota-mn';
import { anokaCountyMnIntelligence } from '@/lib/local-movers/county-intelligence/minnesota/anoka-mn';
import { washingtonCountyMnIntelligence } from '@/lib/local-movers/county-intelligence/minnesota/washington-mn';
import { olmstedCountyMnIntelligence } from '@/lib/local-movers/county-intelligence/minnesota/olmsted-mn';
import { stLouisCountyMnIntelligence } from '@/lib/local-movers/county-intelligence/minnesota/st-louis-mn';
import { stearnsCountyMnIntelligence } from '@/lib/local-movers/county-intelligence/minnesota/stearns-mn';
// Wisconsin Core 8
import { milwaukeeCountyWiIntelligence } from '@/lib/local-movers/county-intelligence/wisconsin/milwaukee-wi';
import { daneCountyWiIntelligence } from '@/lib/local-movers/county-intelligence/wisconsin/dane-wi';
import { waukeshaCountyWiIntelligence } from '@/lib/local-movers/county-intelligence/wisconsin/waukesha-wi';
import { brownCountyWiIntelligence } from '@/lib/local-movers/county-intelligence/wisconsin/brown-wi';
import { racineCountyWiIntelligence } from '@/lib/local-movers/county-intelligence/wisconsin/racine-wi';
import { kenoshaCountyWiIntelligence } from '@/lib/local-movers/county-intelligence/wisconsin/kenosha-wi';
import { outagamieCountyWiIntelligence } from '@/lib/local-movers/county-intelligence/wisconsin/outagamie-wi';
import { winnebagoCountyWiIntelligence } from '@/lib/local-movers/county-intelligence/wisconsin/winnebago-wi';
// Indiana Core 8
import { marionCountyInIntelligence } from '@/lib/local-movers/county-intelligence/indiana/marion-in';
import { hamiltonCountyInIntelligence } from '@/lib/local-movers/county-intelligence/indiana/hamilton-in';
import { lakeCountyInIntelligence } from '@/lib/local-movers/county-intelligence/indiana/lake-in';
import { allenCountyInIntelligence } from '@/lib/local-movers/county-intelligence/indiana/allen-in';
import { stJosephCountyInIntelligence } from '@/lib/local-movers/county-intelligence/indiana/st-joseph-in';
import { elkhartCountyInIntelligence } from '@/lib/local-movers/county-intelligence/indiana/elkhart-in';
import { tippecanoeCountyInIntelligence } from '@/lib/local-movers/county-intelligence/indiana/tippecanoe-in';
import { vanderburghCountyInIntelligence } from '@/lib/local-movers/county-intelligence/indiana/vanderburgh-in';
// Missouri Core 6
import { stLouisCountyMoIntelligence } from '@/lib/local-movers/county-intelligence/missouri/st-louis-mo';
import { jacksonCountyMoIntelligence } from '@/lib/local-movers/county-intelligence/missouri/jackson-mo';
import { stCharlesCountyMoIntelligence } from '@/lib/local-movers/county-intelligence/missouri/st-charles-mo';
import { greeneCountyMoIntelligence } from '@/lib/local-movers/county-intelligence/missouri/greene-mo';
import { clayCountyMoIntelligence } from '@/lib/local-movers/county-intelligence/missouri/clay-mo';
import { jeffersonCountyMoIntelligence } from '@/lib/local-movers/county-intelligence/missouri/jefferson-mo';
// South Carolina Core 6
import { greenvilleCountyScIntelligence } from '@/lib/local-movers/county-intelligence/south-carolina/greenville-sc';
import { charlestonCountyScIntelligence } from '@/lib/local-movers/county-intelligence/south-carolina/charleston-sc';
import { richlandCountyScIntelligence } from '@/lib/local-movers/county-intelligence/south-carolina/richland-sc';
import { horryCountyScIntelligence } from '@/lib/local-movers/county-intelligence/south-carolina/horry-sc';
import { spartanburgCountyScIntelligence } from '@/lib/local-movers/county-intelligence/south-carolina/spartanburg-sc';
import { lexingtonCountyScIntelligence } from '@/lib/local-movers/county-intelligence/south-carolina/lexington-sc';
// Connecticut Core 6
import { fairfieldCountyCtIntelligence } from '@/lib/local-movers/county-intelligence/connecticut/fairfield-ct';
import { hartfordCountyCtIntelligence } from '@/lib/local-movers/county-intelligence/connecticut/hartford-ct';
import { newHavenCountyCtIntelligence } from '@/lib/local-movers/county-intelligence/connecticut/new-haven-ct';
import { newLondonCountyCtIntelligence } from '@/lib/local-movers/county-intelligence/connecticut/new-london-ct';
import { litchfieldCountyCtIntelligence } from '@/lib/local-movers/county-intelligence/connecticut/litchfield-ct';
import { middlesexCountyCtIntelligence } from '@/lib/local-movers/county-intelligence/connecticut/middlesex-ct';
// Utah Core 6
import { saltLakeCountyUtIntelligence } from '@/lib/local-movers/county-intelligence/utah/salt-lake-ut';
import { utahCountyUtIntelligence } from '@/lib/local-movers/county-intelligence/utah/utah-ut';
import { davisCountyUtIntelligence } from '@/lib/local-movers/county-intelligence/utah/davis-ut';
import { weberCountyUtIntelligence } from '@/lib/local-movers/county-intelligence/utah/weber-ut';
import { washingtonCountyUtIntelligence } from '@/lib/local-movers/county-intelligence/utah/washington-ut';
import { cacheCountyUtIntelligence } from '@/lib/local-movers/county-intelligence/utah/cache-ut';
// Alabama Core 6
import { jeffersonCountyAlIntelligence } from '@/lib/local-movers/county-intelligence/alabama/jefferson-al';
import { mobileCountyAlIntelligence } from '@/lib/local-movers/county-intelligence/alabama/mobile-al';
import { madisonCountyAlIntelligence } from '@/lib/local-movers/county-intelligence/alabama/madison-al';
import { montgomeryCountyAlIntelligence } from '@/lib/local-movers/county-intelligence/alabama/montgomery-al';
import { shelbyCountyAlIntelligence } from '@/lib/local-movers/county-intelligence/alabama/shelby-al';
import { baldwinCountyAlIntelligence } from '@/lib/local-movers/county-intelligence/alabama/baldwin-al';
// Louisiana Core 6 (parishes)
import { orleansParishLaIntelligence } from '@/lib/local-movers/county-intelligence/louisiana/orleans-la';
import { eastBatonRougeParishLaIntelligence } from '@/lib/local-movers/county-intelligence/louisiana/east-baton-rouge-la';
import { jeffersonParishLaIntelligence } from '@/lib/local-movers/county-intelligence/louisiana/jefferson-la';
import { stTammanyParishLaIntelligence } from '@/lib/local-movers/county-intelligence/louisiana/st-tammany-la';
import { caddoParishLaIntelligence } from '@/lib/local-movers/county-intelligence/louisiana/caddo-la';
import { lafayetteParishLaIntelligence } from '@/lib/local-movers/county-intelligence/louisiana/lafayette-la';
// Arkansas Core 6
import { pulaskiCountyArIntelligence } from '@/lib/local-movers/county-intelligence/arkansas/pulaski-ar';
import { bentonCountyArIntelligence } from '@/lib/local-movers/county-intelligence/arkansas/benton-ar';
import { washingtonCountyArIntelligence } from '@/lib/local-movers/county-intelligence/arkansas/washington-ar';
import { sebastianCountyArIntelligence } from '@/lib/local-movers/county-intelligence/arkansas/sebastian-ar';
import { faulknerCountyArIntelligence } from '@/lib/local-movers/county-intelligence/arkansas/faulkner-ar';
import { salineCountyArIntelligence } from '@/lib/local-movers/county-intelligence/arkansas/saline-ar';
// New Mexico Core 5
import { bernalilloCountyNmIntelligence } from '@/lib/local-movers/county-intelligence/new-mexico/bernalillo-nm';
import { santaFeCountyNmIntelligence } from '@/lib/local-movers/county-intelligence/new-mexico/santa-fe-nm';
import { doaAnaCountyNmIntelligence } from '@/lib/local-movers/county-intelligence/new-mexico/doa-ana-nm';
import { sandovalCountyNmIntelligence } from '@/lib/local-movers/county-intelligence/new-mexico/sandoval-nm';
import { sanJuanCountyNmIntelligence } from '@/lib/local-movers/county-intelligence/new-mexico/san-juan-nm';
// Nebraska Core 6
import { douglasCountyNeIntelligence } from '@/lib/local-movers/county-intelligence/nebraska/douglas-ne';
import { lancasterCountyNeIntelligence } from '@/lib/local-movers/county-intelligence/nebraska/lancaster-ne';
import { sarpyCountyNeIntelligence } from '@/lib/local-movers/county-intelligence/nebraska/sarpy-ne';
import { hallCountyNeIntelligence } from '@/lib/local-movers/county-intelligence/nebraska/hall-ne';
import { buffaloCountyNeIntelligence } from '@/lib/local-movers/county-intelligence/nebraska/buffalo-ne';
import { dodgeCountyNeIntelligence } from '@/lib/local-movers/county-intelligence/nebraska/dodge-ne';
// Idaho Core 5
import { adaCountyIdIntelligence } from '@/lib/local-movers/county-intelligence/idaho/ada-id';
import { canyonCountyIdIntelligence } from '@/lib/local-movers/county-intelligence/idaho/canyon-id';
import { kootenaiCountyIdIntelligence } from '@/lib/local-movers/county-intelligence/idaho/kootenai-id';
import { bonnevilleCountyIdIntelligence } from '@/lib/local-movers/county-intelligence/idaho/bonneville-id';
import { twinFallsCountyIdIntelligence } from '@/lib/local-movers/county-intelligence/idaho/twin-falls-id';
// Kentucky Core 6
import { jeffersonCountyKyIntelligence } from '@/lib/local-movers/county-intelligence/kentucky/jefferson-ky';
import { fayetteCountyKyIntelligence } from '@/lib/local-movers/county-intelligence/kentucky/fayette-ky';
import { kentonCountyKyIntelligence } from '@/lib/local-movers/county-intelligence/kentucky/kenton-ky';
import { booneCountyKyIntelligence } from '@/lib/local-movers/county-intelligence/kentucky/boone-ky';
import { warrenCountyKyIntelligence } from '@/lib/local-movers/county-intelligence/kentucky/warren-ky';
import { hardinCountyKyIntelligence } from '@/lib/local-movers/county-intelligence/kentucky/hardin-ky';
// Nevada Core 5
import { clarkCountyNvIntelligence } from '@/lib/local-movers/county-intelligence/nevada/clark-nv';
import { washoeCountyNvIntelligence } from '@/lib/local-movers/county-intelligence/nevada/washoe-nv';
import { carsonCityNvIntelligence } from '@/lib/local-movers/county-intelligence/nevada/carson-city-nv';
import { douglasCountyNvIntelligence } from '@/lib/local-movers/county-intelligence/nevada/douglas-nv';
import { nyeCountyNvIntelligence } from '@/lib/local-movers/county-intelligence/nevada/nye-nv';
// Oklahoma Core 6
import { oklahomaCountyOkIntelligence } from '@/lib/local-movers/county-intelligence/oklahoma/oklahoma-ok';
import { tulsaCountyOkIntelligence } from '@/lib/local-movers/county-intelligence/oklahoma/tulsa-ok';
import { clevelandCountyOkIntelligence } from '@/lib/local-movers/county-intelligence/oklahoma/cleveland-ok';
import { canadianCountyOkIntelligence } from '@/lib/local-movers/county-intelligence/oklahoma/canadian-ok';
import { comancheCountyOkIntelligence } from '@/lib/local-movers/county-intelligence/oklahoma/comanche-ok';
import { rogersCountyOkIntelligence } from '@/lib/local-movers/county-intelligence/oklahoma/rogers-ok';
// Iowa Core 6
import { polkCountyIaIntelligence } from '@/lib/local-movers/county-intelligence/iowa/polk-ia';
import { linnCountyIaIntelligence } from '@/lib/local-movers/county-intelligence/iowa/linn-ia';
import { scottCountyIaIntelligence } from '@/lib/local-movers/county-intelligence/iowa/scott-ia';
import { johnsonCountyIaIntelligence } from '@/lib/local-movers/county-intelligence/iowa/johnson-ia';
import { blackHawkCountyIaIntelligence } from '@/lib/local-movers/county-intelligence/iowa/black-hawk-ia';
import { woodburyCountyIaIntelligence } from '@/lib/local-movers/county-intelligence/iowa/woodbury-ia';
// Kansas Core 6
import { johnsonCountyKsIntelligence } from '@/lib/local-movers/county-intelligence/kansas/johnson-ks';
import { sedgwickCountyKsIntelligence } from '@/lib/local-movers/county-intelligence/kansas/sedgwick-ks';
import { shawneeCountyKsIntelligence } from '@/lib/local-movers/county-intelligence/kansas/shawnee-ks';
import { wyandotteCountyKsIntelligence } from '@/lib/local-movers/county-intelligence/kansas/wyandotte-ks';
import { douglasCountyKsIntelligence } from '@/lib/local-movers/county-intelligence/kansas/douglas-ks';
import { leavenworthCountyKsIntelligence } from '@/lib/local-movers/county-intelligence/kansas/leavenworth-ks';
// Mississippi Core 6
import { hindsCountyMsIntelligence } from '@/lib/local-movers/county-intelligence/mississippi/hinds-ms';
import { harrisonCountyMsIntelligence } from '@/lib/local-movers/county-intelligence/mississippi/harrison-ms';
import { desotoCountyMsIntelligence } from '@/lib/local-movers/county-intelligence/mississippi/desoto-ms';
import { rankinCountyMsIntelligence } from '@/lib/local-movers/county-intelligence/mississippi/rankin-ms';
import { madisonCountyMsIntelligence } from '@/lib/local-movers/county-intelligence/mississippi/madison-ms';
import { jacksonCountyMsIntelligence } from '@/lib/local-movers/county-intelligence/mississippi/jackson-ms';
// New Hampshire Core 5
import { hillsboroughCountyNhIntelligence } from '@/lib/local-movers/county-intelligence/new-hampshire/hillsborough-nh';
import { rockinghamCountyNhIntelligence } from '@/lib/local-movers/county-intelligence/new-hampshire/rockingham-nh';
import { merrimackCountyNhIntelligence } from '@/lib/local-movers/county-intelligence/new-hampshire/merrimack-nh';
import { straffordCountyNhIntelligence } from '@/lib/local-movers/county-intelligence/new-hampshire/strafford-nh';
import { graftonCountyNhIntelligence } from '@/lib/local-movers/county-intelligence/new-hampshire/grafton-nh';
// Maine Core 5
import { cumberlandCountyMeIntelligence } from '@/lib/local-movers/county-intelligence/maine/cumberland-me';
import { yorkCountyMeIntelligence } from '@/lib/local-movers/county-intelligence/maine/york-me';
import { penobscotCountyMeIntelligence } from '@/lib/local-movers/county-intelligence/maine/penobscot-me';
import { kennebecCountyMeIntelligence } from '@/lib/local-movers/county-intelligence/maine/kennebec-me';
import { androscogginCountyMeIntelligence } from '@/lib/local-movers/county-intelligence/maine/androscoggin-me';
// West Virginia Core 5
import { kanawhaCountyWvIntelligence } from '@/lib/local-movers/county-intelligence/west-virginia/kanawha-wv';
import { berkeleyCountyWvIntelligence } from '@/lib/local-movers/county-intelligence/west-virginia/berkeley-wv';
import { monongaliaCountyWvIntelligence } from '@/lib/local-movers/county-intelligence/west-virginia/monongalia-wv';
import { cabellCountyWvIntelligence } from '@/lib/local-movers/county-intelligence/west-virginia/cabell-wv';
import { woodCountyWvIntelligence } from '@/lib/local-movers/county-intelligence/west-virginia/wood-wv';
// Rhode Island Core 5
import { providenceCountyRiIntelligence } from '@/lib/local-movers/county-intelligence/rhode-island/providence-ri';
import { kentCountyRiIntelligence } from '@/lib/local-movers/county-intelligence/rhode-island/kent-ri';
import { washingtonCountyRiIntelligence } from '@/lib/local-movers/county-intelligence/rhode-island/washington-ri';
import { newportCountyRiIntelligence } from '@/lib/local-movers/county-intelligence/rhode-island/newport-ri';
import { bristolCountyRiIntelligence } from '@/lib/local-movers/county-intelligence/rhode-island/bristol-ri';
// Vermont Core 5
import { chittendenCountyVtIntelligence } from '@/lib/local-movers/county-intelligence/vermont/chittenden-vt';
import { washingtonCountyVtIntelligence } from '@/lib/local-movers/county-intelligence/vermont/washington-vt';
import { rutlandCountyVtIntelligence } from '@/lib/local-movers/county-intelligence/vermont/rutland-vt';
import { windsorCountyVtIntelligence } from '@/lib/local-movers/county-intelligence/vermont/windsor-vt';
import { franklinCountyVtIntelligence } from '@/lib/local-movers/county-intelligence/vermont/franklin-vt';
// Delaware Core 3 (full state)
import { newCastleCountyDeIntelligence } from '@/lib/local-movers/county-intelligence/delaware/new-castle-de';
import { kentCountyDeIntelligence } from '@/lib/local-movers/county-intelligence/delaware/kent-de';
import { sussexCountyDeIntelligence } from '@/lib/local-movers/county-intelligence/delaware/sussex-de';
// Alaska Core 4
import { anchorageCountyAkIntelligence } from '@/lib/local-movers/county-intelligence/alaska/anchorage-ak';
import { fairbanksNorthStarCountyAkIntelligence } from '@/lib/local-movers/county-intelligence/alaska/fairbanks-north-star-ak';
import { matanuskaSusitnaCountyAkIntelligence } from '@/lib/local-movers/county-intelligence/alaska/matanuska-susitna-ak';
import { juneauCountyAkIntelligence } from '@/lib/local-movers/county-intelligence/alaska/juneau-ak';
// Hawaii Core 4
import { honoluluCountyHiIntelligence } from '@/lib/local-movers/county-intelligence/hawaii/honolulu-hi';
import { hawaiiCountyHiIntelligence } from '@/lib/local-movers/county-intelligence/hawaii/hawaii-hi';
import { mauiCountyHiIntelligence } from '@/lib/local-movers/county-intelligence/hawaii/maui-hi';
import { kauaiCountyHiIntelligence } from '@/lib/local-movers/county-intelligence/hawaii/kauai-hi';
// Montana Core 5
import { yellowstoneCountyMtIntelligence } from '@/lib/local-movers/county-intelligence/montana/yellowstone-mt';
import { missoulaCountyMtIntelligence } from '@/lib/local-movers/county-intelligence/montana/missoula-mt';
import { gallatinCountyMtIntelligence } from '@/lib/local-movers/county-intelligence/montana/gallatin-mt';
import { cascadeCountyMtIntelligence } from '@/lib/local-movers/county-intelligence/montana/cascade-mt';
import { lewisAndClarkCountyMtIntelligence } from '@/lib/local-movers/county-intelligence/montana/lewis-and-clark-mt';
import { enhanceCaliforniaIntelligencePack } from '@/lib/local-movers/county-intelligence/california-relocation';
import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Flagship CA / FL / TX / GA / NY / AZ / NC / VA / TN / PA / IL / OH / CO / WA / MI / OR / MD / MA / MN / WI / IN / MO / SC / CT / UT / KY / NV / OK / IA / AR / NM / KS / MS / NH / ME / WV / RI / VT / DE / AK / HI / MT / NJ Tier-1 intelligence packs.
 * California packs are post-processed for relocation, specialized modules, and collapsible deep content.
 * Only register packs whose source files are committed together (orphan registry imports break production builds).
 */
const RAW_PACKS: CountyIntelligencePack[] = [
  // California
  alamedaCountyIntelligence,
  contraCostaCountyIntelligence,
  fresnoCountyIntelligence,
  kernCountyIntelligence,
  losAngelesCountyIntelligence,
  montereyCountyIntelligence,
  orangeCountyIntelligence,
  placerCountyIntelligence,
  riversideCountyIntelligence,
  sacramentoCountyIntelligence,
  sanBernardinoCountyIntelligence,
  sanDiegoCountyIntelligence,
  sanFranciscoCountyIntelligence,
  sanJoaquinCountyIntelligence,
  sanMateoCountyIntelligence,
  santaBarbaraCountyIntelligence,
  santaClaraCountyIntelligence,
  sonomaCountyIntelligence,
  venturaCountyIntelligence,
  // Florida Core 12
  miamiDadeCountyIntelligence,
  browardCountyIntelligence,
  palmBeachCountyIntelligence,
  hillsboroughCountyIntelligence,
  orangeCountyFlIntelligence,
  pinellasCountyIntelligence,
  duvalCountyIntelligence,
  leeCountyIntelligence,
  polkCountyIntelligence,
  brevardCountyIntelligence,
  pascoCountyIntelligence,
  volusiaCountyIntelligence,
  // Texas Core 12
  harrisCountyIntelligence,
  dallasCountyIntelligence,
  tarrantCountyIntelligence,
  bexarCountyIntelligence,
  travisCountyIntelligence,
  collinCountyIntelligence,
  dentonCountyIntelligence,
  fortBendCountyIntelligence,
  montgomeryCountyIntelligence,
  williamsonCountyIntelligence,
  elPasoCountyIntelligence,
  hidalgoCountyIntelligence,
  // Georgia Core 6 (metro)
  fultonCountyIntelligence,
  gwinnettCountyIntelligence,
  cobbCountyIntelligence,
  dekalbCountyIntelligence,
  cherokeeCountyIntelligence,
  forsythCountyIntelligence,
  // Georgia Wave 2
  claytonCountyIntelligence,
  henryCountyIntelligence,
  hallCountyIntelligence,
  chathamCountyIntelligence,
  richmondCountyIntelligence,
  muscogeeCountyIntelligence,
  // New York Core 12
  kingsCountyIntelligence,
  queensCountyIntelligence,
  newYorkCountyIntelligence,
  bronxCountyIntelligence,
  richmondCountyNyIntelligence,
  nassauCountyIntelligence,
  suffolkCountyIntelligence,
  westchesterCountyIntelligence,
  erieCountyIntelligence,
  monroeCountyIntelligence,
  onondagaCountyIntelligence,
  albanyCountyIntelligence,
  // Arizona Core 7
  maricopaCountyIntelligence,
  pimaCountyIntelligence,
  pinalCountyIntelligence,
  yavapaiCountyIntelligence,
  mohaveCountyIntelligence,
  yumaCountyIntelligence,
  coconinoCountyIntelligence,
  // North Carolina Core 12
  mecklenburgCountyNcIntelligence,
  wakeCountyNcIntelligence,
  guilfordCountyNcIntelligence,
  forsythCountyNcIntelligence,
  durhamCountyNcIntelligence,
  cumberlandCountyNcIntelligence,
  buncombeCountyNcIntelligence,
  newHanoverCountyNcIntelligence,
  unionCountyNcIntelligence,
  cabarrusCountyNcIntelligence,
  gastonCountyNcIntelligence,
  onslowCountyNcIntelligence,
  // Tennessee Core 12
  shelbyCountyTnIntelligence,
  davidsonCountyTnIntelligence,
  knoxCountyTnIntelligence,
  hamiltonCountyTnIntelligence,
  rutherfordCountyTnIntelligence,
  williamsonCountyTnIntelligence,
  montgomeryCountyTnIntelligence,
  sumnerCountyTnIntelligence,
  wilsonCountyTnIntelligence,
  blountCountyTnIntelligence,
  sevierCountyTnIntelligence,
  sullivanCountyTnIntelligence,
  // Pennsylvania Core 12
  philadelphiaCountyPaIntelligence,
  alleghenyCountyPaIntelligence,
  montgomeryCountyPaIntelligence,
  bucksCountyPaIntelligence,
  delawareCountyPaIntelligence,
  chesterCountyPaIntelligence,
  lancasterCountyPaIntelligence,
  yorkCountyPaIntelligence,
  berksCountyPaIntelligence,
  lehighCountyPaIntelligence,
  northamptonCountyPaIntelligence,
  westmorelandCountyPaIntelligence,
  // Virginia Core 12
  fairfaxCountyVaIntelligence,
  princeWilliamCountyVaIntelligence,
  loudounCountyVaIntelligence,
  chesterfieldCountyVaIntelligence,
  henricoCountyVaIntelligence,
  virginiaBeachCityVaIntelligence,
  arlingtonCountyVaIntelligence,
  richmondCityVaIntelligence,
  chesapeakeCityVaIntelligence,
  norfolkCityVaIntelligence,
  staffordCountyVaIntelligence,
  spotsylvaniaCountyVaIntelligence,
  // Illinois Core 12
  cookCountyIlIntelligence,
  duPageCountyIlIntelligence,
  lakeCountyIlIntelligence,
  willCountyIlIntelligence,
  kaneCountyIlIntelligence,
  mcHenryCountyIlIntelligence,
  winnebagoCountyIlIntelligence,
  madisonCountyIlIntelligence,
  stClairCountyIlIntelligence,
  sangamonCountyIlIntelligence,
  champaignCountyIlIntelligence,
  peoriaCountyIlIntelligence,
  // Ohio Core 12
  franklinCountyOhIntelligence,
  cuyahogaCountyOhIntelligence,
  hamiltonCountyOhIntelligence,
  summitCountyOhIntelligence,
  montgomeryCountyOhIntelligence,
  lucasCountyOhIntelligence,
  butlerCountyOhIntelligence,
  starkCountyOhIntelligence,
  lorainCountyOhIntelligence,
  mahoningCountyOhIntelligence,
  warrenCountyOhIntelligence,
  lakeCountyOhIntelligence,
  // Colorado Core 10
  denverCountyCoIntelligence,
  elPasoCountyCoIntelligence,
  arapahoeCountyCoIntelligence,
  jeffersonCountyCoIntelligence,
  adamsCountyCoIntelligence,
  douglasCountyCoIntelligence,
  larimerCountyCoIntelligence,
  boulderCountyCoIntelligence,
  weldCountyCoIntelligence,
  puebloCountyCoIntelligence,
  // Washington Core 10
  kingCountyWaIntelligence,
  pierceCountyWaIntelligence,
  snohomishCountyWaIntelligence,
  spokaneCountyWaIntelligence,
  clarkCountyWaIntelligence,
  thurstonCountyWaIntelligence,
  kitsapCountyWaIntelligence,
  whatcomCountyWaIntelligence,
  bentonCountyWaIntelligence,
  yakimaCountyWaIntelligence,
  // Michigan Core 10
  wayneCountyMiIntelligence,
  oaklandCountyMiIntelligence,
  macombCountyMiIntelligence,
  kentCountyMiIntelligence,
  washtenawCountyMiIntelligence,
  geneseeCountyMiIntelligence,
  ottawaCountyMiIntelligence,
  inghamCountyMiIntelligence,
  kalamazooCountyMiIntelligence,
  saginawCountyMiIntelligence,
  // Oregon Core 8
  multnomahCountyOrIntelligence,
  washingtonCountyOrIntelligence,
  clackamasCountyOrIntelligence,
  laneCountyOrIntelligence,
  marionCountyOrIntelligence,
  deschutesCountyOrIntelligence,
  jacksonCountyOrIntelligence,
  linnCountyOrIntelligence,
  // Maryland Core 8
  montgomeryCountyMdIntelligence,
  princeGeorgesCountyMdIntelligence,
  baltimoreCountyMdIntelligence,
  anneArundelCountyMdIntelligence,
  howardCountyMdIntelligence,
  frederickCountyMdIntelligence,
  harfordCountyMdIntelligence,
  baltimoreCityMdIntelligence,
  // Massachusetts Core 10
  middlesexCountyMaIntelligence,
  worcesterCountyMaIntelligence,
  essexCountyMaIntelligence,
  suffolkCountyMaIntelligence,
  norfolkCountyMaIntelligence,
  bristolCountyMaIntelligence,
  plymouthCountyMaIntelligence,
  hampdenCountyMaIntelligence,
  barnstableCountyMaIntelligence,
  hampshireCountyMaIntelligence,
  // Minnesota Core 8
  hennepinCountyMnIntelligence,
  ramseyCountyMnIntelligence,
  dakotaCountyMnIntelligence,
  anokaCountyMnIntelligence,
  washingtonCountyMnIntelligence,
  olmstedCountyMnIntelligence,
  stLouisCountyMnIntelligence,
  stearnsCountyMnIntelligence,
  // Wisconsin Core 8
  milwaukeeCountyWiIntelligence,
  daneCountyWiIntelligence,
  waukeshaCountyWiIntelligence,
  brownCountyWiIntelligence,
  racineCountyWiIntelligence,
  kenoshaCountyWiIntelligence,
  outagamieCountyWiIntelligence,
  winnebagoCountyWiIntelligence,
  // Indiana Core 8
  marionCountyInIntelligence,
  hamiltonCountyInIntelligence,
  lakeCountyInIntelligence,
  allenCountyInIntelligence,
  stJosephCountyInIntelligence,
  elkhartCountyInIntelligence,
  tippecanoeCountyInIntelligence,
  vanderburghCountyInIntelligence,
  // Missouri Core 6
  stLouisCountyMoIntelligence,
  jacksonCountyMoIntelligence,
  stCharlesCountyMoIntelligence,
  greeneCountyMoIntelligence,
  clayCountyMoIntelligence,
  jeffersonCountyMoIntelligence,
  // South Carolina Core 6
  greenvilleCountyScIntelligence,
  charlestonCountyScIntelligence,
  richlandCountyScIntelligence,
  horryCountyScIntelligence,
  spartanburgCountyScIntelligence,
  lexingtonCountyScIntelligence,
  // Connecticut Core 6
  fairfieldCountyCtIntelligence,
  hartfordCountyCtIntelligence,
  newHavenCountyCtIntelligence,
  newLondonCountyCtIntelligence,
  litchfieldCountyCtIntelligence,
  middlesexCountyCtIntelligence,
  // Utah Core 6
  saltLakeCountyUtIntelligence,
  utahCountyUtIntelligence,
  davisCountyUtIntelligence,
  weberCountyUtIntelligence,
  washingtonCountyUtIntelligence,
  cacheCountyUtIntelligence,
  // Alabama Core 6
  jeffersonCountyAlIntelligence,
  mobileCountyAlIntelligence,
  madisonCountyAlIntelligence,
  montgomeryCountyAlIntelligence,
  shelbyCountyAlIntelligence,
  baldwinCountyAlIntelligence,
  // Louisiana Core 6 (parishes)
  orleansParishLaIntelligence,
  eastBatonRougeParishLaIntelligence,
  jeffersonParishLaIntelligence,
  stTammanyParishLaIntelligence,
  caddoParishLaIntelligence,
  lafayetteParishLaIntelligence,
  // Arkansas Core 6
  pulaskiCountyArIntelligence,
  bentonCountyArIntelligence,
  washingtonCountyArIntelligence,
  sebastianCountyArIntelligence,
  faulknerCountyArIntelligence,
  salineCountyArIntelligence,
  // New Mexico Core 5
  bernalilloCountyNmIntelligence,
  santaFeCountyNmIntelligence,
  doaAnaCountyNmIntelligence,
  sandovalCountyNmIntelligence,
  sanJuanCountyNmIntelligence,
  // Nebraska Core 6
  douglasCountyNeIntelligence,
  lancasterCountyNeIntelligence,
  sarpyCountyNeIntelligence,
  hallCountyNeIntelligence,
  buffaloCountyNeIntelligence,
  dodgeCountyNeIntelligence,
  // Idaho Core 5
  adaCountyIdIntelligence,
  canyonCountyIdIntelligence,
  kootenaiCountyIdIntelligence,
  bonnevilleCountyIdIntelligence,
  twinFallsCountyIdIntelligence,
  // Kentucky Core 6
  jeffersonCountyKyIntelligence,
  fayetteCountyKyIntelligence,
  kentonCountyKyIntelligence,
  booneCountyKyIntelligence,
  warrenCountyKyIntelligence,
  hardinCountyKyIntelligence,
  // Nevada Core 5
  clarkCountyNvIntelligence,
  washoeCountyNvIntelligence,
  carsonCityNvIntelligence,
  douglasCountyNvIntelligence,
  nyeCountyNvIntelligence,
  // Oklahoma Core 6
  oklahomaCountyOkIntelligence,
  tulsaCountyOkIntelligence,
  clevelandCountyOkIntelligence,
  canadianCountyOkIntelligence,
  comancheCountyOkIntelligence,
  rogersCountyOkIntelligence,
  // Iowa Core 6
  polkCountyIaIntelligence,
  linnCountyIaIntelligence,
  scottCountyIaIntelligence,
  johnsonCountyIaIntelligence,
  blackHawkCountyIaIntelligence,
  woodburyCountyIaIntelligence,
  // Kansas Core 6
  johnsonCountyKsIntelligence,
  sedgwickCountyKsIntelligence,
  shawneeCountyKsIntelligence,
  wyandotteCountyKsIntelligence,
  douglasCountyKsIntelligence,
  leavenworthCountyKsIntelligence,
  // Mississippi Core 6
  hindsCountyMsIntelligence,
  harrisonCountyMsIntelligence,
  desotoCountyMsIntelligence,
  rankinCountyMsIntelligence,
  madisonCountyMsIntelligence,
  jacksonCountyMsIntelligence,
  // New Hampshire Core 5
  hillsboroughCountyNhIntelligence,
  rockinghamCountyNhIntelligence,
  merrimackCountyNhIntelligence,
  straffordCountyNhIntelligence,
  graftonCountyNhIntelligence,
  // Maine Core 5
  cumberlandCountyMeIntelligence,
  yorkCountyMeIntelligence,
  penobscotCountyMeIntelligence,
  kennebecCountyMeIntelligence,
  androscogginCountyMeIntelligence,
  // West Virginia Core 5
  kanawhaCountyWvIntelligence,
  berkeleyCountyWvIntelligence,
  monongaliaCountyWvIntelligence,
  cabellCountyWvIntelligence,
  woodCountyWvIntelligence,
  // Rhode Island Core 5
  providenceCountyRiIntelligence,
  kentCountyRiIntelligence,
  washingtonCountyRiIntelligence,
  newportCountyRiIntelligence,
  bristolCountyRiIntelligence,
  // Vermont Core 5
  chittendenCountyVtIntelligence,
  washingtonCountyVtIntelligence,
  rutlandCountyVtIntelligence,
  windsorCountyVtIntelligence,
  franklinCountyVtIntelligence,
  // Delaware Core 3 (full state)
  newCastleCountyDeIntelligence,
  kentCountyDeIntelligence,
  sussexCountyDeIntelligence,
  // Alaska Core 4
  anchorageCountyAkIntelligence,
  fairbanksNorthStarCountyAkIntelligence,
  matanuskaSusitnaCountyAkIntelligence,
  juneauCountyAkIntelligence,
  // Hawaii Core 4
  honoluluCountyHiIntelligence,
  hawaiiCountyHiIntelligence,
  mauiCountyHiIntelligence,
  kauaiCountyHiIntelligence,
  // Montana Core 5
  yellowstoneCountyMtIntelligence,
  missoulaCountyMtIntelligence,
  gallatinCountyMtIntelligence,
  cascadeCountyMtIntelligence,
  lewisAndClarkCountyMtIntelligence,
  // New Jersey
  bergenCountyIntelligence,
  essexCountyIntelligence,
  middlesexCountyIntelligence,
  monmouthCountyIntelligence,
  morrisCountyIntelligence,
  oceanCountyIntelligence,
  warrenCountyIntelligence,
  mercerCountyNjIntelligence,
  somersetCountyNjIntelligence,
  atlanticCountyNjIntelligence,
  gloucesterCountyNjIntelligence,
  hunterdonCountyNjIntelligence,
  sussexCountyNjIntelligence,
];

const PACKS: CountyIntelligencePack[] = RAW_PACKS.map((pack) =>
  pack.stateSlug === 'california' ? enhanceCaliforniaIntelligencePack(pack) : pack
);

const byKey = new Map(
  PACKS.map((p) => [`${p.stateSlug}/${p.countySlug}`, p] as const)
);

/** Hyper-local intelligence pack when curated for this county. */
export function getCountyIntelligencePack(
  stateSlug: string,
  countySlug: string
): CountyIntelligencePack | null {
  return byKey.get(`${stateSlug}/${countySlug}`) ?? null;
}

export function hasCountyIntelligencePack(
  stateSlug: string,
  countySlug: string
): boolean {
  return byKey.has(`${stateSlug}/${countySlug}`);
}

export function listCountyIntelligencePacks(): CountyIntelligencePack[] {
  return [...PACKS];
}

export const CA_TIER1_CORE12 = [
  'los-angeles',
  'orange',
  'san-diego',
  'santa-clara',
  'alameda',
  'riverside',
  'san-bernardino',
  'sacramento',
  'contra-costa',
  'san-francisco',
  'san-mateo',
  'ventura',
] as const;

export const CA_TIER1_WAVE2 = [
  'fresno',
  'kern',
  'san-joaquin',
  'sonoma',
  'placer',
  'santa-barbara',
  'monterey',
] as const;

export const CA_TIER1_ALL = [...CA_TIER1_CORE12, ...CA_TIER1_WAVE2] as const;

/** Florida Tier-1 Core 12. */
export const FL_TIER1_CORE12 = [
  'miami-dade',
  'broward',
  'palm-beach',
  'hillsborough',
  'orange',
  'pinellas',
  'duval',
  'lee',
  'polk',
  'brevard',
  'pasco',
  'volusia',
] as const;

/** Texas Tier-1 Core 12. */
export const TX_TIER1_CORE12 = [
  'harris',
  'dallas',
  'tarrant',
  'bexar',
  'travis',
  'collin',
  'denton',
  'fort-bend',
  'montgomery',
  'williamson',
  'el-paso',
  'hidalgo',
] as const;

/** Georgia Tier-1 Core 12 (metro + coastal/regional). */
export const GA_TIER1_CORE12 = [
  'fulton',
  'gwinnett',
  'cobb',
  'dekalb',
  'chatham',
  'cherokee',
  'clayton',
  'forsyth',
  'henry',
  'hall',
  'richmond',
  'muscogee',
] as const;

/** @deprecated Use GA_TIER1_CORE12 */
export const GA_TIER1_CORE6 = [
  'fulton',
  'gwinnett',
  'cobb',
  'dekalb',
  'cherokee',
  'forsyth',
] as const;

/** @deprecated Use GA_TIER1_CORE12 */
export const GA_TIER1_WAVE2 = [
  'clayton',
  'henry',
  'hall',
  'chatham',
  'richmond',
  'muscogee',
] as const;

export const GA_TIER1_ALL = [...GA_TIER1_CORE12] as const;

/** New York Tier-1 Core 12 (NYC boroughs + LI + Westchester + upstate). */
export const NY_TIER1_CORE12 = [
  'kings',
  'queens',
  'new-york',
  'bronx',
  'richmond',
  'nassau',
  'suffolk',
  'westchester',
  'erie',
  'monroe',
  'onondaga',
  'albany',
] as const;

/** Arizona Tier-1 Core 7. */
export const AZ_TIER1_CORE7 = [
  'maricopa',
  'pima',
  'pinal',
  'yavapai',
  'mohave',
  'yuma',
  'coconino',
] as const;

/** Virginia Tier-1 Core 12 (NoVA + Richmond region + Hampton Roads). */
export const VA_TIER1_CORE12 = [
  'fairfax',
  'prince-william',
  'loudoun',
  'chesterfield',
  'henrico',
  'virginia-beach',
  'arlington',
  'richmond',
  'chesapeake',
  'norfolk',
  'stafford',
  'spotsylvania',
] as const;

/** North Carolina Tier-1 Core 12. */
export const NC_TIER1_CORE12 = [
  'mecklenburg',
  'wake',
  'guilford',
  'forsyth',
  'durham',
  'cumberland',
  'buncombe',
  'new-hanover',
  'union',
  'cabarrus',
  'gaston',
  'onslow',
] as const;

/** Tennessee Tier-1 Core 12. */
export const TN_TIER1_CORE12 = [
  'shelby',
  'davidson',
  'knox',
  'hamilton',
  'rutherford',
  'williamson',
  'montgomery',
  'sumner',
  'wilson',
  'blount',
  'sevier',
  'sullivan',
] as const;

/** Illinois Tier-1 Core 12 (Chicago metro + collar + Metro East + downstate hubs). */
export const IL_TIER1_CORE12 = [
  'cook',
  'dupage',
  'lake',
  'will',
  'kane',
  'mchenry',
  'winnebago',
  'madison',
  'st-clair',
  'sangamon',
  'champaign',
  'peoria',
] as const;

/** Colorado Tier-1 Core 10 (Denver metro + Front Range + southern hub). */
export const CO_TIER1_CORE10 = [
  'denver',
  'el-paso',
  'arapahoe',
  'jefferson',
  'adams',
  'douglas',
  'larimer',
  'boulder',
  'weld',
  'pueblo',
] as const;

/** Washington Tier-1 Core 10 (Puget Sound + eastern + inland + border markets). */
export const WA_TIER1_CORE10 = [
  'king',
  'pierce',
  'snohomish',
  'spokane',
  'clark',
  'thurston',
  'kitsap',
  'whatcom',
  'benton',
  'yakima',
] as const;

/** Pennsylvania Tier-1 Core 12. */
export const PA_TIER1_CORE12 = [
  'philadelphia',
  'allegheny',
  'montgomery',
  'bucks',
  'delaware',
  'chester',
  'lancaster',
  'york',
  'berks',
  'lehigh',
  'northampton',
  'westmoreland',
] as const;

/** Ohio Tier-1 Core 12. */
export const OH_TIER1_CORE12 = [
  'franklin',
  'cuyahoga',
  'hamilton',
  'summit',
  'montgomery',
  'lucas',
  'butler',
  'stark',
  'lorain',
  'mahoning',
  'warren',
  'lake',
] as const;

/** Michigan Tier-1 Core 10. */
export const MI_TIER1_CORE10 = [
  'wayne',
  'oakland',
  'macomb',
  'kent',
  'washtenaw',
  'genesee',
  'ottawa',
  'ingham',
  'kalamazoo',
  'saginaw',
] as const;

/** Oregon Tier-1 Core 8. */
export const OR_TIER1_CORE8 = [
  'multnomah',
  'washington',
  'clackamas',
  'lane',
  'marion',
  'deschutes',
  'jackson',
  'linn',
] as const;

/** Maryland Tier-1 Core 8 (includes Baltimore City independent-city slug). */
export const MD_TIER1_CORE8 = [
  'montgomery',
  'prince-georges',
  'baltimore',
  'anne-arundel',
  'howard',
  'frederick',
  'harford',
  'baltimore-city',
] as const;

/** Massachusetts Tier-1 Core 10 (Boston core + collar + central + South Shore/Cape + Pioneer Valley). */
export const MA_TIER1_CORE10 = [
  'middlesex',
  'worcester',
  'essex',
  'suffolk',
  'norfolk',
  'bristol',
  'plymouth',
  'hampden',
  'barnstable',
  'hampshire',
] as const;

/** Minnesota Tier-1 Core 8 (Twin Cities core + collars + Rochester/Mayo + Duluth + St. Cloud). */
export const MN_TIER1_CORE8 = [
  'hennepin',
  'ramsey',
  'dakota',
  'anoka',
  'washington',
  'olmsted',
  'st-louis',
  'stearns',
] as const;

/** Wisconsin Tier-1 Core 8 (Milwaukee + Madison + collars + Green Bay + Fox Cities + Oshkosh). */
export const WI_TIER1_CORE8 = [
  'milwaukee',
  'dane',
  'waukesha',
  'brown',
  'racine',
  'kenosha',
  'outagamie',
  'winnebago',
] as const;

/** Indiana Tier-1 Core 8. */
export const IN_TIER1_CORE8 = [
  'marion',
  'hamilton',
  'lake',
  'allen',
  'st-joseph',
  'elkhart',
  'tippecanoe',
  'vanderburgh',
] as const;

/** Connecticut Tier-1 Core 6. */
export const CT_TIER1_CORE6 = [
  'fairfield',
  'hartford',
  'new-haven',
  'new-london',
  'litchfield',
  'middlesex',
] as const;

/** Utah Tier-1 Core 6. */
export const UT_TIER1_CORE6 = [
  'salt-lake',
  'utah',
  'davis',
  'weber',
  'washington',
  'cache',
] as const;

/** Alabama Tier-1 Core 6. */
export const AL_TIER1_CORE6 = [
  'jefferson',
  'mobile',
  'madison',
  'montgomery',
  'shelby',
  'baldwin',
] as const;

/** Louisiana Tier-1 Core 6 (parishes). */
export const LA_TIER1_CORE6 = [
  'orleans',
  'east-baton-rouge',
  'jefferson',
  'st-tammany',
  'caddo',
  'lafayette',
] as const;

/** Arkansas Tier-1 Core 6 (Little Rock + NWA + Fort Smith + Conway + Saline). */
export const AR_TIER1_CORE6 = [
  'pulaski',
  'benton',
  'washington',
  'sebastian',
  'faulkner',
  'saline',
] as const;

/** New Mexico Tier-1 Core 5 (Albuquerque + Santa Fe + Las Cruces + Rio Rancho + Farmington). */
export const NM_TIER1_CORE5 = [
  'bernalillo',
  'santa-fe',
  'doa-ana',
  'sandoval',
  'san-juan',
] as const;

/** Nebraska Tier-1 Core 6 (Omaha + Lincoln + Sarpy + Grand Island + Kearney + Fremont). */
export const NE_TIER1_CORE6 = [
  'douglas',
  'lancaster',
  'sarpy',
  'hall',
  'buffalo',
  'dodge',
] as const;

/** Idaho Tier-1 Core 5 (Boise + Canyon TV + CdA + Idaho Falls + Twin Falls). */
export const ID_TIER1_CORE5 = [
  'ada',
  'canyon',
  'kootenai',
  'bonneville',
  'twin-falls',
] as const;

/** Oklahoma Tier-1 Core 6 (OKC + Tulsa + Norman + west OKC + Lawton + NE Tulsa). */
export const OK_TIER1_CORE6 = [
  'oklahoma',
  'tulsa',
  'cleveland',
  'canadian',
  'comanche',
  'rogers',
] as const;

/** Iowa Tier-1 Core 6 (Des Moines + CR + Quad Cities + Iowa City + Waterloo–CF + Sioux City). */
export const IA_TIER1_CORE6 = [
  'polk',
  'linn',
  'scott',
  'johnson',
  'black-hawk',
  'woodbury',
] as const;

/** Kansas Tier-1 Core 6 (JOCO + Wichita + Topeka + KCK + Lawrence + Leavenworth). */
export const KS_TIER1_CORE6 = [
  'johnson',
  'sedgwick',
  'shawnee',
  'wyandotte',
  'douglas',
  'leavenworth',
] as const;

/** Mississippi Tier-1 Core 6 (Jackson metro + Gulf Coast + Memphis collar). */
export const MS_TIER1_CORE6 = [
  'hinds',
  'harrison',
  'desoto',
  'rankin',
  'madison',
  'jackson',
] as const;

/** Missouri Tier-1 Core 6 (St. Louis County + KC/Jackson + collars + Springfield). */
export const MO_TIER1_CORE6 = [
  'st-louis',
  'jackson',
  'st-charles',
  'greene',
  'clay',
  'jefferson',
] as const;

/** South Carolina Tier-1 Core 6 (Upstate + Lowcountry + Midlands + Grand Strand). */
export const SC_TIER1_CORE6 = [
  'greenville',
  'charleston',
  'richland',
  'horry',
  'spartanburg',
  'lexington',
] as const;

/** Kentucky Tier-1 Core 6 (Louisville + Lexington + NKY + Bowling Green + Elizabethtown). */
export const KY_TIER1_CORE6 = [
  'jefferson',
  'fayette',
  'kenton',
  'boone',
  'warren',
  'hardin',
] as const;

/** Nevada Tier-1 Core 5 (Las Vegas Valley + Reno + Carson + Douglas + Nye). */
export const NV_TIER1_CORE5 = [
  'clark',
  'washoe',
  'carson-city',
  'douglas',
  'nye',
] as const;

/** New Hampshire Tier-1 Core 5 (Manchester–Nashua + Seacoast + Concord + Dover–Rochester + Upper Valley). */
export const NH_TIER1_CORE5 = [
  'hillsborough',
  'rockingham',
  'merrimack',
  'strafford',
  'grafton',
] as const;

/** Maine Tier-1 Core 5 (Portland + York seacoast + Bangor + Augusta + Lewiston–Auburn). */
export const ME_TIER1_CORE5 = [
  'cumberland',
  'york',
  'penobscot',
  'kennebec',
  'androscoggin',
] as const;

/** West Virginia Tier-1 Core 5 (Charleston + Eastern Panhandle + Morgantown + Huntington + Parkersburg). */
export const WV_TIER1_CORE5 = [
  'kanawha',
  'berkeley',
  'monongalia',
  'cabell',
  'wood',
] as const;

/** Rhode Island Tier-1 Core 5 (Providence + Kent/Warwick + South County + Newport + East Bay Bristol). */
export const RI_TIER1_CORE5 = [
  'providence',
  'kent',
  'washington',
  'newport',
  'bristol',
] as const;

/** Vermont Tier-1 Core 5 (Burlington + Montpelier + Rutland + Upper Valley + St. Albans). */
export const VT_TIER1_CORE5 = [
  'chittenden',
  'washington',
  'rutland',
  'windsor',
  'franklin',
] as const;

/** Delaware Tier-1 Core 3 (full state: New Castle + Kent + Sussex). */
export const DE_TIER1_CORE3 = ['new-castle', 'kent', 'sussex'] as const;

/** Alaska Tier-1 Core 4 (Anchorage + Fairbanks + Mat-Su + Juneau). */
export const AK_TIER1_CORE4 = [
  'anchorage',
  'fairbanks-north-star',
  'matanuska-susitna',
  'juneau',
] as const;

/** Hawaii Tier-1 Core 4 (Oʻahu + Big Island + Maui + Kauaʻi). */
export const HI_TIER1_CORE4 = ['honolulu', 'hawaii', 'maui', 'kauai'] as const;

/** Montana Tier-1 Core 5 (Billings + Missoula + Bozeman + Great Falls + Helena). */
export const MT_TIER1_CORE5 = [
  'yellowstone',
  'missoula',
  'gallatin',
  'cascade',
  'lewis-and-clark',
] as const;


