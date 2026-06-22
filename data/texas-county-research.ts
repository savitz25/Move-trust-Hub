import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

export const texasCountyResearch: Record<string, CuratedCountyResearch> = {
  baylor: {
    marketNotes:
      'Baylor County is one of Texas\'s least populous counties with Seymour as its seat. Moves are rare and rely on regional service from Wichita Falls or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wichita Falls and Abilene regional providers may add travel fees for Seymour and North Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size and shuttle needs.',
      'Verify explicit regional service to Seymour before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch moves across North Texas rolling plains.',
    ],
  },
  armstrong: {
    marketNotes:
      'Armstrong County is one of Texas\'s least populous counties with Claude as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Most full-service providers dispatch from Amarillo or Lubbock; confirm travel fees for Claude ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss driveway length and surface type.',
      'Verify explicit regional service to Claude; no dedicated in-county movers exist.',
      'Storage is very limited locally; plan on Amarillo-area facilities.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch moves, including outbuildings and livestock-area equipment.',
    ],
  },
  borden: {
    marketNotes:
      'Borden County is one of Texas\'s least populous counties with Gail as its seat. Moves are rare and rely on regional service from Lubbock or Midland.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Most full-service providers operate from Lubbock or Midland; confirm travel fees and service-area coverage for Gail before booking.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss truck size and shuttle needs upfront.',
      'Verify explicit regional service to Gail; dedicated local crews are essentially nonexistent.',
      'Storage is very limited locally; plan on regional facilities in Lubbock or Midland.',
      'Obtain multiple written estimates — thin competition can mean wide price swings.',
      'Confirm credentials and insurance for ranch moves, including outbuildings and equipment.',
    ],
  },
  cochran: {
    marketNotes:
      'Cochran County is one of Texas\'s least populous counties with Morton as its seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Midland regional providers typically serve Morton; confirm travel fees for ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch/oilfield properties have severe access challenges — confirm truck size and terrain.',
      'Verify explicit regional service to Morton before booking.',
      'Storage is very limited locally; use Lubbock or Midland facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch and oilfield moves in remote West Texas.',
    ],
  },
  concho: {
    marketNotes:
      'Concho County is one of Texas\'s least populous counties with Paint Rock as its seat. Moves are rare and rely on regional service from San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Abilene regional crews typically serve Paint Rock; confirm travel fees for ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss access roads and parking.',
      'Verify explicit regional service to Paint Rock; no in-county movers exist.',
      'Storage is very limited; plan on San Angelo-area facilities.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves in West Texas brush country.',
    ],
  },
  crane: {
    marketNotes:
      'Crane County is one of Texas\'s least populous counties with Crane as its seat. Moves are rare and rely on regional service from Midland/Odessa.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Midland/Odessa and San Angelo regional providers may add travel fees for Crane oilfield and ranch properties.',
    },
    tips: [
      'Extremely remote oilfield/ranch properties have severe access challenges — confirm terrain and equipment needs.',
      'Verify explicit regional service to Crane before booking.',
      'Storage is very limited in-county; use Midland or Odessa facilities.',
      'Obtain multiple written estimates due to sparse Permian Basin competition.',
      'Confirm credentials for oilfield and ranch relocations.',
    ],
  },
  coke: {
    marketNotes:
      'Coke County is one of Texas\'s least populous counties with Robert Lee as its seat. Moves are rare and rely on regional service from San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Abilene regional providers typically serve Robert Lee; confirm travel fees for ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size and shuttle needs.',
      'Verify explicit regional service to Robert Lee before booking.',
      'Storage is very limited locally; use San Angelo-area facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch moves across West Texas brush country.',
    ],
  },
  collingsworth: {
    marketNotes:
      'Collingsworth County is one of Texas\'s least populous counties with Wellington as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Panhandle providers from Amarillo or Lubbock may add travel fees for Wellington ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss driveway and gate access.',
      'Verify explicit regional service to Wellington; no in-county movers exist.',
      'Storage is very limited; plan on Amarillo-area warehouses.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves across the eastern Panhandle.',
    ],
  },
  crockett: {
    marketNotes:
      'Crockett County is one of Texas\'s least populous counties with Ozona as its seat. Moves are rare and rely on regional service from San Angelo or Midland.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Midland regional crews may add travel fees for Ozona ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch/oilfield properties have severe access challenges — discuss terrain and road conditions.',
      'Verify explicit regional service to Ozona before committing.',
      'Storage is very limited in-county; plan on San Angelo or Midland facilities.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch and oilfield moves in remote West Texas.',
    ],
  },
  culberson: {
    marketNotes:
      'Culberson County is remote with Van Horn as its seat. Moves are rare and rely on regional service from El Paso or Carlsbad, NM.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'El Paso and Carlsbad regional crews may add travel fees for Van Horn desert properties; confirm cross-border licensing.',
    },
    tips: [
      'Extremely remote desert properties have severe access challenges — discuss road conditions early.',
      'Verify explicit regional service to Van Horn before booking.',
      'Storage is very limited in-county; use El Paso or Carlsbad facilities.',
      'Obtain multiple written estimates — sparse market increases price variability.',
      'Confirm credentials for remote desert relocations along I-10 corridor.',
    ],
  },
  briscoe: {
    marketNotes:
      'Briscoe County is one of Texas\'s least populous counties with Silverton as its seat. Moves are rare and rely on regional service from Amarillo or Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Panhandle regional providers from Amarillo or Lubbock may add travel fees for Silverton and remote ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — request photos or a virtual walkthrough.',
      'Verify explicit regional service to Silverton before committing.',
      'Storage is very limited in-county; coordinate with Amarillo or Lubbock warehouses.',
      'Obtain multiple written estimates due to sparse local competition.',
      'Confirm credentials for ranch moves and long Panhandle drive times.',
    ],
  },
  cottle: {
    marketNotes:
      'Cottle County is one of Texas\'s least populous counties with Paducah as its seat. Moves are rare and rely on regional service from Wichita Falls or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Regional crews from Wichita Falls or Abilene typically serve Paducah; confirm travel fees upfront.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck and shuttle needs.',
      'Verify explicit regional service to Paducah; dedicated local movers are unavailable.',
      'Storage is very limited locally; use regional facilities.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch moves across North Texas rolling plains.',
    ],
  },
  donley: {
    marketNotes:
      'Donley County is one of Texas\'s least populous counties with Clarendon as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Clarendon and eastern Panhandle ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways upfront.',
      'Verify explicit regional service to Clarendon; no in-county movers exist.',
      'Storage is very limited locally; use Amarillo-area warehouses.',
      'Obtain multiple written estimates due to thin Panhandle competition.',
      'Confirm credentials for ranch moves along the eastern Panhandle.',
    ],
  },
  dickens: {
    marketNotes:
      'Dickens County is one of Texas\'s least populous counties with Dickens as its seat. Moves are rare and rely on regional service from Lubbock or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Abilene regional providers typically cover Dickens; confirm travel fees for ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — request photos or a virtual survey.',
      'Verify explicit regional service to Dickens before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates before choosing a provider.',
      'Confirm credentials for ranch moves across North Texas rolling plains.',
    ],
  },
  edwards: {
    marketNotes:
      'Edwards County is one of Texas\'s least populous counties with Rocksprings as its seat. Moves are rare and rely on regional service from San Angelo or Del Rio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Providers from San Angelo or Del Rio may add travel fees for Rocksprings and Hill Country ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss terrain and gate access.',
      'Verify explicit regional service to Rocksprings before booking.',
      'Storage is very limited in-county; plan on San Angelo or Del Rio facilities.',
      'Obtain multiple written estimates — thin market means variable pricing.',
      'Confirm credentials for ranch moves in rugged South Texas terrain.',
    ],
  },
  fisher: {
    marketNotes:
      'Fisher County is one of Texas\'s least populous counties with Roby as its seat. Moves are rare and rely on regional service from Abilene or San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and San Angelo regional providers may add travel fees for Roby and West Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — request photos or a virtual survey.',
      'Verify explicit regional service to Roby before booking.',
      'Storage is very limited locally; use Abilene or San Angelo warehouses.',
      'Obtain multiple written estimates before choosing a provider.',
      'Confirm credentials for ranch moves across rolling West Texas plains.',
    ],
  },
  foard: {
    marketNotes:
      'Foard County is one of Texas\'s least populous counties with Crowell as its seat. Moves are rare and rely on regional service from Wichita Falls or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Most reputable providers operate from Wichita Falls or Abilene; confirm service-area coverage for Crowell.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss road conditions early.',
      'Verify explicit regional service to Crowell; in-county crews do not exist.',
      'Storage is very limited locally; use regional warehouse options.',
      'Obtain multiple written estimates before choosing a provider.',
      'Confirm credentials for ranch moves and travel surcharges.',
    ],
  },
  hall: {
    marketNotes:
      'Hall County is one of Texas\'s least populous counties with Memphis as its seat. Moves are rare and rely on regional service from Amarillo or Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers typically serve Memphis; confirm travel fees for ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — request photos or a virtual survey.',
      'Verify explicit regional service to Memphis before booking.',
      'Storage is very limited in-county; coordinate regional warehouse options.',
      'Obtain multiple written estimates before choosing a provider.',
      'Confirm credentials for ranch moves across the eastern Panhandle.',
    ],
  },
  hardeman: {
    marketNotes:
      'Hardeman County is one of Texas\'s least populous counties with Quanah as its seat. Moves are rare and rely on regional service from Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wichita Falls and Abilene regional providers typically serve Quanah; confirm travel fees for ranch routes along the Red River corridor.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways upfront.',
      'Verify explicit regional service to Quanah; dedicated local crews are unavailable.',
      'Storage is very limited in-county; coordinate regional facilities.',
      'Obtain multiple written estimates due to thin local competition.',
      'Confirm credentials for ranch moves in North Texas border country.',
    ],
  },
  hemphill: {
    marketNotes:
      'Hemphill County is one of Texas\'s least populous counties with Canadian as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Canadian and northeastern Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for rural roads.',
      'Verify explicit regional service to Canadian before booking.',
      'Storage is very limited locally; plan on Amarillo-area warehouses.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves in the northeastern Panhandle.',
    ],
  },
  glasscock: {
    marketNotes:
      'Glasscock County is one of Texas\'s least populous counties with Garden City as its seat. Moves are rare and rely on regional service from Midland/Odessa.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Permian Basin providers from Midland or Odessa may add travel fees for Garden City oilfield and ranch properties.',
    },
    tips: [
      'Extremely remote oilfield/ranch properties have severe access challenges — confirm truck size and terrain.',
      'Verify explicit regional service to Garden City before booking.',
      'Storage is very limited; use regional facilities in Midland or Odessa.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for remote oilfield and ranch relocations.',
    ],
  },
  'jeff-davis': {
    marketNotes:
      'Jeff Davis County is remote with Fort Davis and the Davis Mountains. Moves are rare and rely on regional service from Alpine or El Paso.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Alpine and El Paso regional providers may add travel fees for Fort Davis mountain and ranch properties.',
    },
    tips: [
      'Extremely remote mountain properties have severe access challenges — discuss elevation, grades, and road width.',
      'Verify explicit regional service to Fort Davis before booking.',
      'Storage is very limited in-county; plan on Alpine or El Paso facilities.',
      'Obtain multiple written estimates due to thin local competition.',
      'Confirm credentials for ranch and mountain relocations in the Davis Mountains.',
    ],
  },
  irion: {
    marketNotes:
      'Irion County is one of Texas\'s least populous counties with Mertzon as its seat. Moves are rare and rely on regional service from San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Midland regional providers typically serve Mertzon; confirm travel fees for ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss driveway and gate details.',
      'Verify explicit regional service to Mertzon; no local full-service movers exist.',
      'Storage is very limited in-county; plan on San Angelo-area facilities.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch moves across West Texas brush country.',
    ],
  },
  'jim-hogg': {
    marketNotes:
      'Jim Hogg County is one of Texas\'s least populous counties with Hebbronville as its seat. Moves are rare and rely on regional service from Laredo or Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Laredo and Corpus Christi regional providers may add travel fees for Hebbronville ranch and South Texas brush country properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm gate access and road surface.',
      'Verify explicit regional service to Hebbronville before booking.',
      'Storage is very limited in-county; use Laredo or Corpus Christi facilities.',
      'Obtain multiple written estimates due to sparse South Texas competition.',
      'Confirm credentials for ranch moves in remote brush country.',
    ],
  },
  kimble: {
    marketNotes:
      'Kimble County is rural Hill Country with Junction as its seat. Moves are rare and rely on regional service from San Angelo or Kerrville.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Kerrville regional providers may add travel fees for Junction and Hill Country ranch properties.',
    },
    tips: [
      'Remote Hill Country properties have access challenges — discuss steep grades and narrow ranch roads.',
      'Verify explicit regional service to Junction before booking.',
      'Storage is very limited locally; plan on San Angelo or Kerrville warehouses.',
      'Obtain multiple written estimates before choosing a mover.',
      'Confirm credentials for ranch moves in rugged Hill Country terrain.',
    ],
  },
  kinney: {
    marketNotes:
      'Kinney County is one of Texas\'s least populous counties with Brackettville as its seat. Moves are rare and rely on regional service from Del Rio or San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Del Rio and San Antonio regional providers may add travel fees for Brackettville ranch and border-country properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm gate access and road surface.',
      'Verify explicit regional service to Brackettville before booking.',
      'Storage is very limited locally; plan on Del Rio or San Antonio facilities.',
      'Obtain multiple written estimates due to sparse South Texas competition.',
      'Confirm credentials for ranch moves near the Rio Grande corridor.',
    ],
  },
  kenedy: {
    marketNotes:
      'Kenedy County is one of Texas\'s least populous counties with Sarita as its seat. Moves are rare and rely on regional service from Corpus Christi or Kingsville.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Regional providers from Corpus Christi or Kingsville may add travel fees for Sarita and remote South Texas ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm driveway length and surface type.',
      'Verify explicit regional service to Sarita before booking; local dedicated movers are unavailable.',
      'Storage is very limited in-county; coordinate with Corpus Christi or Kingsville-area facilities.',
      'Obtain multiple written estimates due to the sparse local market.',
      'Confirm credentials for ranch moves, including livestock-area equipment and gate access.',
    ],
  },
  king: {
    marketNotes:
      'King County is one of Texas\'s least populous counties with Guthrie as its seat. Moves are rare and rely on regional service from Lubbock or Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Most reputable full-service providers are Lubbock- or Wichita Falls–based; confirm travel fees for Guthrie ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — request a site survey or detailed photos.',
      'Verify explicit regional service to Guthrie; do not assume metro crews cover the county.',
      'Storage is very limited locally; plan on regional warehouse options.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves, including long driveways and heavy furniture.',
    ],
  },
  sterling: {
    marketNotes:
      'Sterling County is one of Texas\'s least populous counties with Sterling City as its seat. Moves are rare and rely on regional service from San Angelo or Midland.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Regional providers from San Angelo or Midland may add travel fees for Sterling City ranch and oilfield routes.',
    },
    tips: [
      'Extremely remote ranch/oilfield properties have severe access challenges — confirm equipment needs.',
      'Verify explicit regional service to Sterling City before booking.',
      'Storage is very limited locally; use San Angelo or Midland facilities.',
      'Obtain multiple written estimates — sparse market increases price variability.',
      'Confirm credentials for ranch and oilfield moves in remote West Texas.',
    ],
  },
  stonewall: {
    marketNotes:
      'Stonewall County is one of Texas\'s least populous counties with Aspermont as its seat. Moves are rare and rely on regional service from Abilene or Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and Wichita Falls regional crews typically cover Aspermont; confirm travel fees upfront.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss shuttle and truck size.',
      'Verify explicit regional service to Aspermont; dedicated local movers are unavailable.',
      'Storage is very limited in-county; coordinate regional warehouse holds.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves across North Texas ranchland.',
    ],
  },
  throckmorton: {
    marketNotes:
      'Throckmorton County is one of Texas\'s least populous counties with Throckmorton as its seat. Moves are rare and rely on regional service from Abilene or Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Providers from Abilene or Wichita Falls may add travel fees for Throckmorton and surrounding ranch country.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm access roads and parking.',
      'Verify explicit regional service to Throckmorton before booking.',
      'Storage is very limited locally; use regional facilities.',
      'Obtain multiple written estimates due to thin local competition.',
      'Confirm credentials for ranch moves and long rural drive times.',
    ],
  },
  menard: {
    marketNotes:
      'Menard County is one of Texas\'s least populous counties with Menard as its seat. Moves are rare and rely on regional service from San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Abilene regional crews typically serve Menard; confirm travel fees for ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck and shuttle needs.',
      'Verify explicit regional service to Menard; dedicated local movers are unavailable.',
      'Storage is very limited locally; use San Angelo-area facilities.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch moves across West Texas Hill Country fringe.',
    ],
  },
  oldham: {
    marketNotes:
      'Oldham County is one of Texas\'s least populous counties with Vega as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Vega and Route 66 corridor ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways upfront.',
      'Verify explicit regional service to Vega before committing.',
      'Storage is very limited in-county; plan on Amarillo warehouses.',
      'Obtain multiple written estimates due to sparse Panhandle competition.',
      'Confirm credentials for ranch moves along the western Panhandle.',
    ],
  },
  real: {
    marketNotes:
      'Real County is one of Texas\'s least populous counties with Leakey as its seat. Moves are rare and rely on regional service from San Antonio or Kerrville.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Kerrville regional providers may add travel fees for Leakey Hill Country and Frio River ranch properties.',
    },
    tips: [
      'Extremely remote Hill Country/ranch properties have severe access challenges — confirm access roads and parking.',
      'Verify explicit regional service to Leakey before booking.',
      'Storage is very limited locally; use San Antonio or Kerrville facilities.',
      'Obtain multiple written estimates — thin market means variable pricing.',
      'Confirm credentials for ranch moves in rugged Hill Country terrain.',
    ],
  },
  schleicher: {
    marketNotes:
      'Schleicher County is one of Texas\'s least populous counties with Eldorado as its seat. Moves are rare and rely on regional service from San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Midland regional crews typically cover Eldorado; confirm travel fees for ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss shuttle and equipment needs.',
      'Verify explicit regional service to Eldorado; no in-county full-service movers exist.',
      'Storage is very limited; plan on San Angelo-area warehouses.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch moves across West Texas brush country.',
    ],
  },
  sherman: {
    marketNotes:
      'Sherman County is one of Texas\'s least populous counties with Stratford as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Stratford and northern Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for rural roads.',
      'Verify explicit regional service to Stratford before booking.',
      'Storage is very limited locally; use Amarillo facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch moves in the northern Texas Panhandle.',
    ],
  },
  knox: {
    marketNotes:
      'Knox County is one of Texas\'s least populous counties with Benjamin as its seat. Moves are rare and rely on regional service from Wichita Falls or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wichita Falls and Abilene regional crews typically cover Benjamin; confirm travel fees for ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm shuttle and parking needs.',
      'Verify explicit regional service to Benjamin; no in-county full-service movers exist.',
      'Storage is very limited; use regional facilities.',
      'Obtain multiple written estimates due to sparse North Texas competition.',
      'Confirm credentials for ranch moves across remote ranchland.',
    ],
  },
  mason: {
    marketNotes:
      'Mason County is rural Hill Country with Mason as its seat. Moves are rare and rely on regional service from San Angelo or Fredericksburg.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Fredericksburg regional providers may add travel fees for Mason Hill Country ranch and historic-town properties.',
    },
    tips: [
      'Remote Hill Country properties have access challenges — discuss road width and parking for larger trucks.',
      'Verify explicit regional service to Mason before booking.',
      'Storage is very limited locally; coordinate San Angelo or Fredericksburg facilities.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves in the Llano River Hill Country.',
    ],
  },
  lipscomb: {
    marketNotes:
      'Lipscomb County is one of Texas\'s least populous counties with Lipscomb as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Lipscomb and northeastern Panhandle ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss truck size for rural roads.',
      'Verify explicit regional service to Lipscomb; dedicated local crews are unavailable.',
      'Storage is very limited; use Amarillo-area facilities.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch moves in the northeastern Panhandle.',
    ],
  },
  reagan: {
    marketNotes:
      'Reagan County is one of Texas\'s least populous counties with Big Lake as its seat. Moves are rare and rely on regional service from San Angelo or Midland.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Midland regional crews typically cover Big Lake; confirm travel fees for oilfield and ranch properties.',
    },
    tips: [
      'Extremely remote oilfield/ranch properties have severe access challenges — confirm equipment and terrain needs.',
      'Verify explicit regional service to Big Lake before committing.',
      'Storage is very limited locally; plan on San Angelo or Midland warehouses.',
      'Obtain multiple written estimates due to sparse Permian Basin fringe competition.',
      'Confirm credentials for oilfield and ranch relocations.',
    ],
  },
  shackelford: {
    marketNotes:
      'Shackelford County is one of Texas\'s least populous counties with Albany as its seat. Moves are rare and rely on regional service from Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and Wichita Falls regional providers may add travel fees for Albany and North Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss shuttle and parking upfront.',
      'Verify explicit regional service to Albany before booking.',
      'Storage is very limited in-county; coordinate regional facilities.',
      'Obtain multiple written estimates before choosing a mover.',
      'Confirm credentials for ranch moves across North Texas rolling plains.',
    ],
  },
  sutton: {
    marketNotes:
      'Sutton County is one of Texas\'s least populous counties with Sonora as its seat. Moves are rare and rely on regional service from San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Midland regional providers typically serve Sonora; confirm travel fees for ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm access roads and truck size.',
      'Verify explicit regional service to Sonora; no in-county full-service movers exist.',
      'Storage is very limited locally; use San Angelo-area warehouses.',
      'Obtain multiple written estimates due to thin local competition.',
      'Confirm credentials for ranch moves in West Texas Hill Country fringe.',
    ],
  },
  upton: {
    marketNotes:
      'Upton County is one of Texas\'s least populous counties with Rankin as its seat. Moves are rare and rely on regional service from Midland/Odessa.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Midland/Odessa and San Angelo regional crews may add travel fees for Rankin oilfield and ranch properties.',
    },
    tips: [
      'Extremely remote oilfield/ranch properties have severe access challenges — discuss Permian Basin access roads.',
      'Verify explicit regional service to Rankin before booking.',
      'Storage is very limited in-county; plan on Midland or Odessa facilities.',
      'Obtain multiple written estimates — sparse competition increases price variability.',
      'Confirm credentials for oilfield and ranch moves in remote West Texas.',
    ],
  },
  loving: {
    marketNotes:
      'Loving County is the least populous county in Texas with Mentone as its seat. Moves are extremely rare and rely on regional service from Odessa or Hobbs, NM.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Providers typically dispatch from Odessa or Hobbs, NM; confirm cross-border licensing and travel fees for Mentone.',
    },
    tips: [
      'Extremely remote desert properties have severe access challenges — discuss terrain and road conditions early.',
      'Verify explicit regional service to Mentone; no in-county full-service movers exist.',
      'Storage is very limited; use regional facilities in Odessa or Hobbs.',
      'Obtain multiple estimates — sparse competition makes price comparison essential.',
      'Confirm credentials for remote oilfield-area moves, including equipment and scheduling flexibility.',
    ],
  },
};

export function getTexasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return texasCountyResearch[countySlug];
}