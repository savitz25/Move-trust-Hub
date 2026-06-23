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
  carson: {
    marketNotes:
      'Carson County is one of Texas\'s least populous counties with Panhandle as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Panhandle and northern Texas Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for rural roads.',
      'Verify explicit regional service to Panhandle before booking.',
      'Storage is very limited locally; plan on Amarillo-area warehouses.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves in the northern Texas Panhandle.',
    ],
  },
  crosby: {
    marketNotes:
      'Crosby County is one of Texas\'s least populous counties with Crosbyton as its seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock regional providers typically cover Crosbyton; confirm travel fees for South Plains ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss driveway length and surface type.',
      'Verify explicit regional service to Crosbyton; no dedicated in-county movers exist.',
      'Storage is very limited locally; use Lubbock-area facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch moves across the South Plains.',
    ],
  },
  delta: {
    marketNotes:
      'Delta County is one of Texas\'s least populous counties with Cooper as its seat. Moves are rare and rely on regional service from Dallas or Paris.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Dallas and Paris regional providers may add travel fees for Cooper and Northeast Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm shuttle and parking needs.',
      'Verify explicit regional service to Cooper before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse Northeast Texas competition.',
      'Confirm credentials for ranch moves across remote Delta County farmland.',
    ],
  },
  floyd: {
    marketNotes:
      'Floyd County is one of Texas\'s least populous counties with Floydada as its seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Amarillo regional providers may add travel fees for Floydada and High Plains ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for rural roads.',
      'Verify explicit regional service to Floydada before booking.',
      'Storage is very limited locally; use Lubbock-area facilities.',
      'Obtain multiple written estimates before choosing a mover.',
      'Confirm credentials for ranch moves on the Texas High Plains.',
    ],
  },
  hansford: {
    marketNotes:
      'Hansford County is one of Texas\'s least populous counties with Spearman as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Spearman and northern Panhandle ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss truck size for rural roads.',
      'Verify explicit regional service to Spearman; dedicated local crews are unavailable.',
      'Storage is very limited; use Amarillo-area facilities.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch moves in the northern Texas Panhandle.',
    ],
  },
  hudspeth: {
    marketNotes:
      'Hudspeth County is remote with Sierra Blanca as its seat. Moves are rare and rely on regional service from El Paso.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'El Paso and Carlsbad, NM regional providers may add travel fees for Sierra Blanca desert ranch properties.',
    },
    tips: [
      'Extremely remote desert properties have severe access challenges — discuss terrain and road conditions early.',
      'Verify explicit regional service to Sierra Blanca before booking.',
      'Storage is very limited locally; plan on El Paso-area warehouses.',
      'Obtain multiple written estimates due to sparse West Texas competition.',
      'Confirm credentials for remote desert and ranch relocations.',
    ],
  },
  lynn: {
    marketNotes:
      'Lynn County is one of Texas\'s least populous counties with Tahoka as its seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Midland regional providers may add travel fees for Tahoka South Plains ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm access roads and truck size.',
      'Verify explicit regional service to Tahoka; no in-county full-service movers exist.',
      'Storage is very limited locally; use Lubbock-area warehouses.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves across the South Plains.',
    ],
  },
  martin: {
    marketNotes:
      'Martin County is one of Texas\'s least populous counties with Stanton as its seat. Moves are rare and rely on regional service from Midland/Odessa.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Midland/Odessa and Lubbock regional providers may add travel fees for Stanton oilfield and ranch properties.',
    },
    tips: [
      'Extremely remote oilfield/ranch properties have severe access challenges — discuss Permian Basin access roads.',
      'Verify explicit regional service to Stanton before booking.',
      'Storage is very limited in-county; plan on Midland or Lubbock facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for oilfield and ranch moves in remote West Texas.',
    ],
  },
  mills: {
    marketNotes:
      'Mills County is one of Texas\'s least populous counties with Goldthwaite as its seat. Moves are rare and rely on regional service from Waco or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco and Abilene regional providers may add travel fees for Goldthwaite Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm shuttle and parking needs.',
      'Verify explicit regional service to Goldthwaite before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse Central Texas competition.',
      'Confirm credentials for ranch moves across remote Hill Country fringe ranchland.',
    ],
  },
  wheeler: {
    marketNotes:
      'Wheeler County is one of Texas\'s least populous counties with Wheeler as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Wheeler and northeastern Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for rural roads.',
      'Verify explicit regional service to Wheeler before booking.',
      'Storage is very limited locally; plan on Amarillo-area warehouses.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves in the northeastern Texas Panhandle.',
    ],
  },
  bailey: {
    marketNotes:
      'Bailey County is one of Texas\'s least populous counties with Muleshoe as its seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Amarillo regional providers may add travel fees for Muleshoe South Plains ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for rural roads.',
      'Verify explicit regional service to Muleshoe before booking.',
      'Storage is very limited locally; use Lubbock-area facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch moves across the western South Plains.',
    ],
  },
  childress: {
    marketNotes:
      'Childress County is one of Texas\'s least populous counties with Childress as its seat. Moves are rare and rely on regional service from Amarillo or Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Wichita Falls regional providers may add travel fees for Childress and Red River Valley ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss driveway length and surface type.',
      'Verify explicit regional service to Childress; no dedicated in-county movers exist.',
      'Storage is very limited locally; plan on Amarillo or Wichita Falls facilities.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves along the Texas-Oklahoma border.',
    ],
  },
  garza: {
    marketNotes:
      'Garza County is one of Texas\'s least populous counties with Post as its seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Amarillo regional providers may add travel fees for Post South Plains ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm access roads and truck size.',
      'Verify explicit regional service to Post before booking.',
      'Storage is very limited locally; use Lubbock-area warehouses.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch moves across the Caprock Escarpment region.',
    ],
  },
  goliad: {
    marketNotes:
      'Goliad County is one of Texas\'s least populous counties with Goliad as its seat. Moves are rare and rely on regional service from Victoria or Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Victoria and Corpus Christi regional providers may add travel fees for Goliad ranch and historic-town properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm shuttle and parking needs.',
      'Verify explicit regional service to Goliad before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse South Texas competition.',
      'Confirm credentials for ranch moves across the Coastal Bend interior.',
    ],
  },
  hartley: {
    marketNotes:
      'Hartley County is one of Texas\'s least populous counties with Channing as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Channing and northwestern Panhandle ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for rural roads.',
      'Verify explicit regional service to Channing; dedicated local crews are unavailable.',
      'Storage is very limited; use Amarillo-area facilities.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch moves in the northwestern Texas Panhandle.',
    ],
  },
  haskell: {
    marketNotes:
      'Haskell County is one of Texas\'s least populous counties with Haskell as its seat. Moves are rare and rely on regional service from Abilene or Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and Wichita Falls regional providers may add travel fees for Haskell North Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm shuttle and parking needs.',
      'Verify explicit regional service to Haskell before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse North Texas competition.',
      'Confirm credentials for ranch moves across remote rolling plains.',
    ],
  },
  'la-salle': {
    marketNotes:
      'La Salle County is one of Texas\'s least populous counties with Cotulla as its seat. Moves are rare and rely on regional service from Laredo or San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Laredo and San Antonio regional providers may add travel fees for Cotulla South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss road width and parking for larger trucks.',
      'Verify explicit regional service to Cotulla before booking.',
      'Storage is very limited locally; coordinate Laredo or San Antonio facilities.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves across the South Texas brush country.',
    ],
  },
  presidio: {
    marketNotes:
      'Presidio County is remote with Marfa and the Big Bend area. Moves are rare and rely on regional service from El Paso or Alpine.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'El Paso and Alpine regional providers may add travel fees for Marfa desert and mountain ranch properties.',
    },
    tips: [
      'Extremely remote desert/mountain properties have severe access challenges — discuss terrain and elevation early.',
      'Verify explicit regional service to Marfa before booking.',
      'Storage is very limited locally; plan on El Paso or Alpine-area warehouses.',
      'Obtain multiple written estimates due to sparse Big Bend competition.',
      'Confirm credentials for remote desert and ranch relocations.',
    ],
  },
  refugio: {
    marketNotes:
      'Refugio County is one of Texas\'s least populous counties with Refugio as its seat. Moves are rare and rely on regional service from Corpus Christi or Victoria.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Corpus Christi and Victoria regional providers may add travel fees for Refugio coastal ranch properties.',
    },
    tips: [
      'Extremely remote coastal/ranch properties have severe access challenges — confirm hurricane-season scheduling flexibility.',
      'Verify explicit regional service to Refugio before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse Coastal Bend competition.',
      'Confirm credentials for coastal and ranch moves near the Gulf.',
    ],
  },
  'san-saba': {
    marketNotes:
      'San Saba County is rural with San Saba as its seat. Moves are rare and rely on regional service from Waco or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco and Abilene regional providers may add travel fees for San Saba Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm shuttle and parking needs.',
      'Verify explicit regional service to San Saba before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse Central Texas competition.',
      'Confirm credentials for ranch moves across the Colorado River Hill Country fringe.',
    ],
  },
  archer: {
    marketNotes:
      'Archer County is one of Texas\'s least populous counties with Archer City as its seat. Moves are rare and rely on regional service from Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wichita Falls and Abilene regional providers may add travel fees for Archer City North Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm shuttle and parking needs.',
      'Verify explicit regional service to Archer City before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse North Texas competition.',
      'Confirm credentials for ranch moves across remote rolling plains.',
    ],
  },
  brewster: {
    marketNotes:
      'Brewster County is one of Texas\'s largest but least populous counties with Alpine and Big Bend National Park. Moves are rare and rely on regional service from El Paso or Alpine.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Alpine and El Paso regional providers may add travel fees for Big Bend desert and mountain ranch properties.',
    },
    tips: [
      'Extremely remote desert/mountain properties have severe access challenges — discuss terrain and elevation early.',
      'Verify explicit regional service to Alpine before booking.',
      'Storage is very limited locally; plan on Alpine or El Paso-area warehouses.',
      'Obtain multiple written estimates due to sparse Big Bend competition.',
      'Confirm credentials for remote desert and ranch relocations.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is one of Texas\'s least populous counties with Jefferson as its seat. Moves are rare and rely on regional service from Marshall or Shreveport, LA.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Marshall and Shreveport, LA regional providers may add travel fees for Jefferson East Texas piney woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm truck size for rural roads and tree cover.',
      'Verify explicit regional service to Jefferson before booking.',
      'Storage is very limited locally; coordinate Marshall or Shreveport facilities.',
      'Obtain multiple written estimates due to sparse East Texas competition.',
      'Confirm credentials for rural moves across the Texas-Louisiana border region.',
    ],
  },
  mitchell: {
    marketNotes:
      'Mitchell County is one of Texas\'s least populous counties with Colorado City as its seat. Moves are rare and rely on regional service from Abilene or San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and San Angelo regional providers may add travel fees for Colorado City ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch/oilfield properties have severe access challenges — discuss Permian Basin fringe access roads.',
      'Verify explicit regional service to Colorado City before booking.',
      'Storage is very limited locally; use regional facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch and oilfield moves in West Texas.',
    ],
  },
  ochiltree: {
    marketNotes:
      'Ochiltree County is one of Texas\'s least populous counties with Perryton as its seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Perryton and northern Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for rural roads.',
      'Verify explicit regional service to Perryton before booking.',
      'Storage is very limited locally; plan on Amarillo-area warehouses.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves in the northern Texas Panhandle.',
    ],
  },
  parmer: {
    marketNotes:
      'Parmer County is one of Texas\'s least populous counties with Farwell as its seat. Moves are rare and rely on regional service from Amarillo or Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Farwell and northwestern Panhandle ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss driveway length and surface type.',
      'Verify explicit regional service to Farwell; dedicated local crews are unavailable.',
      'Storage is very limited; use Amarillo or Lubbock-area facilities.',
      'Obtain multiple written estimates before booking.',
      'Confirm credentials for ranch moves along the Texas-New Mexico border.',
    ],
  },
  runnels: {
    marketNotes:
      'Runnels County is one of Texas\'s least populous counties with Ballinger as its seat. Moves are rare and rely on regional service from San Angelo or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Abilene regional providers may add travel fees for Ballinger Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm shuttle and parking needs.',
      'Verify explicit regional service to Ballinger before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse Central Texas competition.',
      'Confirm credentials for ranch moves across the Colorado River region.',
    ],
  },
  somervell: {
    marketNotes:
      'Somervell County is one of Texas\'s least populous counties with Glen Rose as its seat. Moves are rare and rely on regional service from Waco or Fort Worth.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco and Fort Worth regional providers may add travel fees for Glen Rose Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss road width and parking for larger trucks.',
      'Verify explicit regional service to Glen Rose before booking.',
      'Storage is very limited locally; coordinate Waco or Fort Worth facilities.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves in the Paluxy River Hill Country fringe.',
    ],
  },
  stephens: {
    marketNotes:
      'Stephens County is one of Texas\'s least populous counties with Breckenridge as its seat. Moves are rare and rely on regional service from Abilene or Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and Wichita Falls regional providers may add travel fees for Breckenridge North Texas ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch/oilfield properties have severe access challenges — confirm access roads and truck size.',
      'Verify explicit regional service to Breckenridge before booking.',
      'Storage is very limited locally; use regional facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch and oilfield moves across North Texas.',
    ],
  },
  zavala: {
    marketNotes:
      'Zavala County is one of Texas\'s least populous counties with Crystal City as its seat. Moves are rare and rely on regional service from Laredo or San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Laredo and San Antonio regional providers may add travel fees for Crystal City South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss road width and parking for larger trucks.',
      'Verify explicit regional service to Crystal City before booking.',
      'Storage is very limited locally; coordinate Laredo or San Antonio facilities.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves across the South Texas Winter Garden region.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is one of Texas\'s least populous counties with Henrietta as its seat. Moves are rare and rely on regional service from Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wichita Falls and Fort Worth regional providers may add travel fees for Henrietta North Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm shuttle and parking needs.',
      'Verify explicit regional service to Henrietta before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse North Texas competition.',
      'Confirm credentials for ranch moves across remote rolling plains.',
    ],
  },
  dawson: {
    marketNotes:
      'Dawson County is one of Texas\'s least populous counties with Lamesa as its seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Midland regional providers may add travel fees for Lamesa South Plains ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch/oilfield properties have severe access challenges — discuss Permian Basin fringe access roads.',
      'Verify explicit regional service to Lamesa before booking.',
      'Storage is very limited locally; use Lubbock-area facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch and oilfield moves in West Texas.',
    ],
  },
  dimmit: {
    marketNotes:
      'Dimmit County is one of Texas\'s least populous counties with Carrizo Springs as its seat. Moves are rare and rely on regional service from Laredo or San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Laredo and San Antonio regional providers may add travel fees for Carrizo Springs South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss road width and parking for larger trucks.',
      'Verify explicit regional service to Carrizo Springs before booking.',
      'Storage is very limited locally; coordinate Laredo or San Antonio facilities.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for ranch moves across the South Texas Winter Garden region.',
    ],
  },
  duval: {
    marketNotes:
      'Duval County is one of Texas\'s least populous counties with San Diego as its seat. Moves are rare and rely on regional service from Laredo or Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Laredo and Corpus Christi regional providers may add travel fees for San Diego South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm access roads and truck size.',
      'Verify explicit regional service to San Diego before booking.',
      'Storage is very limited locally; coordinate regional warehouse options.',
      'Obtain multiple written estimates due to sparse South Texas competition.',
      'Confirm credentials for ranch moves across remote brush country.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is one of Texas\'s least populous counties with Mount Vernon as its seat. Moves are rare and rely on regional service from Dallas or Paris.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Dallas and Paris regional providers may add travel fees for Mount Vernon Northeast Texas ranch properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm truck size for rural roads and tree cover.',
      'Verify explicit regional service to Mount Vernon before booking.',
      'Storage is very limited locally; coordinate Dallas or Paris facilities.',
      'Obtain multiple written estimates due to sparse Northeast Texas competition.',
      'Confirm credentials for rural moves across the Sulphur River region.',
    ],
  },
  morris: {
    marketNotes:
      'Morris County is one of Texas\'s least populous counties with Daingerfield as its seat. Moves are rare and rely on regional service from Longview or Texarkana.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Longview and Texarkana regional providers may add travel fees for Daingerfield East Texas piney woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — discuss tree cover and narrow rural roads.',
      'Verify explicit regional service to Daingerfield before booking.',
      'Storage is very limited locally; coordinate Longview or Texarkana facilities.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for rural moves in the Texas-Arkansas border piney woods.',
    ],
  },
  newton: {
    marketNotes:
      'Newton County is one of Texas\'s least populous counties with Newton as its seat. Moves are rare and rely on regional service from Beaumont or Jasper.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Beaumont and Jasper regional providers may add travel fees for Newton Deep East Texas forest properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm truck size for forest roads.',
      'Verify explicit regional service to Newton before booking.',
      'Storage is very limited locally; coordinate Beaumont or Jasper facilities.',
      'Obtain multiple written estimates due to sparse Deep East Texas competition.',
      'Confirm credentials for rural moves in heavily wooded terrain.',
    ],
  },
  sabine: {
    marketNotes:
      'Sabine County is one of Texas\'s least populous counties with Hemphill as its seat. Moves are rare and rely on regional service from Nacogdoches or Lufkin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Nacogdoches and Lufkin regional providers may add travel fees for Hemphill Deep East Texas piney woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — discuss tree cover and narrow rural roads.',
      'Verify explicit regional service to Hemphill before booking.',
      'Storage is very limited locally; coordinate Nacogdoches or Lufkin facilities.',
      'Obtain multiple written estimates before committing.',
      'Confirm credentials for rural moves near Toledo Bend reservoir country.',
    ],
  },
  terry: {
    marketNotes:
      'Terry County is one of Texas\'s least populous counties with Brownfield as its seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Midland regional providers may add travel fees for Brownfield South Plains ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch/oilfield properties have severe access challenges — discuss Permian Basin fringe access roads.',
      'Verify explicit regional service to Brownfield before booking.',
      'Storage is very limited locally; use Lubbock-area warehouses.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for ranch and oilfield moves in West Texas.',
    ],
  },
  ward: {
    marketNotes:
      'Ward County is one of Texas\'s least populous counties with Monahans as its seat. Moves are rare and rely on regional service from Odessa or Midland.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Odessa and Midland regional providers may add travel fees for Monahans Permian Basin oilfield and desert properties.',
    },
    tips: [
      'Extremely remote oilfield/desert properties have severe access challenges — discuss terrain and road conditions early.',
      'Verify explicit regional service to Monahans before booking.',
      'Storage is very limited in-county; plan on Odessa or Midland facilities.',
      'Obtain multiple written estimates due to sparse competition.',
      'Confirm credentials for oilfield moves in remote West Texas desert country.',
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
  'red-river': {
    marketNotes:
      'Red River County is one of Texas\'s least populous counties with Clarksville as the seat. Moves are rare and rely on regional service from Paris or Texarkana.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Most full-service providers operate from Paris or Texarkana; confirm travel fees and explicit Clarksville coverage before booking.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — discuss driveway length, gates, and truck size upfront.',
      'Verify explicit regional service to Clarksville; many listings advertise broad Northeast Texas coverage without serving every county seat.',
      'Storage is very limited locally; coordinate with Paris or Texarkana-area facilities if you need short- or long-term warehousing.',
      'Obtain multiple written estimates — thin competition can mean wider price swings between regional crews.',
      'Confirm FMCSA credentials and Texas DMV registration for rural moves, even when the provider is based in a nearby hub city.',
    ],
  },
  rains: {
    marketNotes:
      'Rains County is one of Texas\'s least populous counties with Emory as the seat. Moves are rare and rely on regional service from Dallas or Tyler.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Dallas and Tyler regional crews may add travel fees for Emory and rural Rains County routes.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm shuttle or smaller-truck needs for long driveways.',
      'Verify explicit regional service to Emory before booking; Dallas and Tyler movers do not all cover thin rural counties.',
      'Storage is very limited in Rains County; plan ahead with Tyler or Dallas-area warehouse options if needed.',
      'Obtain multiple estimates — regional travel time can significantly affect hourly and flat-rate quotes.',
      'Confirm credentials for rural moves, including USDOT/MC numbers on FMCSA.gov, even for shorter intrastate relocations.',
    ],
  },
  wilbarger: {
    marketNotes:
      'Wilbarger County is one of Texas\'s least populous counties with Vernon as the seat. Moves are rare and rely on regional service from Wichita Falls or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wichita Falls and Abilene providers may add travel fees for Vernon and ranch properties in Wilbarger County.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss unpaved roads, cattle guards, and equipment needs early.',
      'Verify explicit regional service to Vernon; not every North Texas mover covers Wilbarger County despite broad marketing.',
      'Storage is very limited locally; Wichita Falls or Abilene facilities are the practical option for most households.',
      'Obtain multiple estimates — ranch and outbuilding moves often require supplemental labor not reflected in basic quotes.',
      'Confirm credentials for ranch moves, including insurance limits for farm equipment and detached structures.',
    ],
  },
  camp: {
    marketNotes:
      'Camp County is one of Texas\'s least populous counties with Pittsburg as the seat. Moves are rare and rely on regional service from Longview or Dallas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Longview and Dallas regional crews may add travel fees for Pittsburg and rural Camp County routes.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm truck access for lake and timber-country homes.',
      'Verify explicit regional service to Pittsburg before booking; Longview crews are often the closer practical option.',
      'Storage is very limited in Camp County; coordinate with Longview or Dallas-area facilities if timing does not align.',
      'Obtain multiple estimates — thin market competition can produce meaningfully different travel and minimum-hour charges.',
      'Confirm credentials for rural moves and ask whether the crew has experience with Piney Woods access roads.',
    ],
  },
  blanco: {
    marketNotes:
      'Blanco County is rural Hill Country with Johnson City as the seat. Moves are rare and rely on regional service from Austin or San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Austin and San Antonio Hill Country routes may include travel fees and higher demand around peak weekends.',
    },
    tips: [
      'Remote Hill Country properties have access challenges — discuss narrow ranch roads, low bridges, and gate codes in advance.',
      'Verify explicit regional service to Johnson City; Austin and San Antonio movers vary widely in rural Hill Country coverage.',
      'Storage is very limited locally; Austin or San Antonio warehouse options are typical for gap periods between closings.',
      'Obtain multiple estimates — winery-country and ranch moves may need extra packing time not shown in basic online quotes.',
      'Confirm credentials for ranch moves and ask about experience with limestone driveways and multi-structure properties.',
    ],
  },
  zapata: {
    marketNotes:
      'Zapata County is one of Texas\'s least populous counties with Zapata as the seat. Moves are rare and rely on regional service from Laredo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Laredo-based crews are the primary option for Zapata County; confirm travel fees for remote ranch parcels.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss border-region access roads and long driveways upfront.',
      'Verify explicit regional service to Zapata; confirm the mover serves the county seat and outlying ranch parcels.',
      'Storage is very limited in Zapata County; Laredo facilities are the practical choice for most households.',
      'Obtain multiple estimates — ranch equipment and outbuilding contents can change crew size and pricing quickly.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance for remote routes.',
    ],
  },
  callahan: {
    marketNotes:
      'Callahan County is one of Texas\'s least populous counties with Baird as the seat. Moves are rare and rely on regional service from Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene regional providers are the primary option for Baird and rural Callahan County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size and shuttle plans for long gravel driveways.',
      'Verify explicit regional service to Baird; Abilene movers should confirm Callahan County coverage in writing.',
      'Storage is very limited locally; Abilene warehouse or container options are typical for gap periods.',
      'Obtain multiple estimates from Abilene providers — ranch moves often need supplemental labor beyond standard household quotes.',
      'Confirm credentials for ranch moves and discuss handling for barn tools, feeders, and detached outbuildings.',
    ],
  },
  comanche: {
    marketNotes:
      'Comanche County is rural Central Texas with Comanche as the seat. Moves are rare and rely on regional service from Abilene or Waco.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and Waco regional crews may add travel fees for Comanche and surrounding ranch-country routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss equipment needs and access roads before move day.',
      'Verify explicit regional service to Comanche; Abilene is often closer, but Waco crews also cover parts of Central Texas.',
      'Storage is very limited in Comanche County; plan with Abilene or Waco facilities if closing dates do not align.',
      'Obtain multiple estimates — outbuilding and agricultural contents can change crew size and hourly totals.',
      'Confirm credentials for ranch moves, including insurance adequate for detached structures and equipment.',
    ],
  },
  trinity: {
    marketNotes:
      'Trinity County is one of Texas\'s least populous counties with Groveton as the seat. Moves are rare and rely on regional service from Lufkin or Huntsville.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lufkin and Huntsville regional providers may add travel fees for Groveton and deep Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and lake-country homes.',
      'Verify explicit regional service to Groveton; Lufkin and Huntsville crews are the practical regional options.',
      'Storage is very limited in Trinity County; coordinate with Lufkin or Huntsville-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  falls: {
    marketNotes:
      'Falls County is one of Texas\'s least populous counties with Marlin as the seat. Moves are rare and rely on regional service from Waco.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco regional providers are the primary option for Marlin and rural Falls County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss unpaved driveways and equipment needs early.',
      'Verify explicit regional service to Marlin; confirm Waco crews cover Falls County before booking.',
      'Storage is very limited locally; Waco warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates from Waco providers — ranch and outbuilding contents can change labor requirements.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is one of Texas\'s least populous counties with Madisonville as the seat. Moves are rare and rely on regional service from Huntsville or Bryan/College Station.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Huntsville and Bryan/College Station regional crews may add travel fees for Madisonville and rural Madison County routes.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm truck access for timber-country and lake properties.',
      'Verify explicit regional service to Madisonville before booking; not every Huntsville or Bryan crew covers thin rural counties.',
      'Storage is very limited in Madison County; coordinate with Huntsville or College Station-area facilities if needed.',
      'Obtain multiple estimates — regional travel time can materially affect hourly pricing in sparse markets.',
      'Confirm credentials for rural moves, including USDOT/MC verification on FMCSA.gov.',
    ],
  },
  nolan: {
    marketNotes:
      'Nolan County is one of Texas\'s least populous counties with Sweetwater as the seat. Moves are rare and rely on regional service from Abilene or San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and San Angelo providers may add travel fees for Sweetwater and West Texas ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss terrain, gates, and equipment needs early.',
      'Verify explicit regional service to Sweetwater; confirm coverage for outlying ranch parcels beyond the county seat.',
      'Storage is very limited locally; Abilene or San Angelo warehouse options are typical for gap periods.',
      'Obtain multiple estimates — ranch and oilfield moves often need supplemental labor beyond standard household quotes.',
      'Confirm credentials for ranch and oilfield moves, including insurance adequate for equipment and detached structures.',
    ],
  },
  reeves: {
    marketNotes:
      'Reeves County is one of Texas\'s least populous counties with Pecos as the seat. Moves are rare and rely on regional service from Odessa or El Paso.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Odessa and El Paso regional crews may add travel fees for Pecos and remote Permian Basin desert properties.',
    },
    tips: [
      'Extremely remote desert and oilfield properties have severe access challenges — discuss road conditions and scheduling flexibility.',
      'Verify explicit regional service to Pecos before booking; confirm the mover serves the county seat and outlying parcels.',
      'Storage is very limited in Reeves County; Odessa or El Paso facilities are the practical choice for most households.',
      'Obtain multiple estimates — desert-country travel and oilfield scheduling can affect pricing and availability.',
      'Confirm credentials for remote moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  karnes: {
    marketNotes:
      'Karnes County is one of Texas\'s least populous counties with Karnes City as the seat. Moves are rare and rely on regional service from San Antonio or Victoria.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Victoria regional providers may add travel fees for Karnes City and rural South Texas ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Karnes City; San Antonio and Victoria crews vary in rural county coverage.',
      'Storage is very limited locally; San Antonio or Victoria warehouse options are typical between closings.',
      'Obtain multiple estimates — ranch and outbuilding contents can change crew size and hourly totals.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached structures.',
    ],
  },
  pecos: {
    marketNotes:
      'Pecos County is one of Texas\'s least populous counties with Fort Stockton as the seat. Moves are rare and rely on regional service from Midland or San Angelo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Midland and San Angelo regional crews may add travel fees for Fort Stockton and remote desert ranch properties.',
    },
    tips: [
      'Extremely remote desert and oilfield properties have severe access challenges — confirm access roads and turnaround space early.',
      'Verify explicit regional service to Fort Stockton; Midland is often the closer practical hub for Pecos County.',
      'Storage is very limited in-county; plan with Midland or San Angelo facilities if timing does not align.',
      'Obtain multiple estimates — Permian Basin travel distance can materially affect final pricing.',
      'Confirm credentials for remote desert moves, including insurance limits for ranch equipment.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is one of Texas\'s least populous counties with Edna as the seat. Moves are rare and rely on regional service from Victoria or Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Victoria and Corpus Christi regional providers may add travel fees for Edna and rural Coastal Bend ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss coastal humidity protection and long rural driveways.',
      'Verify explicit regional service to Edna before booking; Victoria crews are often the closer regional option.',
      'Storage is very limited in Jackson County; coordinate with Victoria or Corpus Christi-area facilities if needed.',
      'Obtain multiple estimates — hurricane season may affect scheduling flexibility along the Coastal Bend.',
      'Confirm credentials for ranch moves and ask about experience with rural county access roads.',
    ],
  },
  leon: {
    marketNotes:
      'Leon County is one of Texas\'s least populous counties with Centerville as the seat. Moves are rare and rely on regional service from Huntsville or Bryan/College Station.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Huntsville and Bryan/College Station regional crews may add travel fees for Centerville and rural Leon County routes.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm truck access for timber and ranch-country homes.',
      'Verify explicit regional service to Centerville; not every regional listing covers thin rural counties between major hubs.',
      'Storage is very limited in Leon County; Huntsville or College Station warehouse options are typical.',
      'Obtain multiple estimates — sparse competition can produce meaningfully different travel and minimum-hour charges.',
      'Confirm credentials for rural moves and ask about experience with Piney Woods access roads.',
    ],
  },
  scurry: {
    marketNotes:
      'Scurry County is one of Texas\'s least populous counties with Snyder as the seat. Moves are rare and rely on regional service from Lubbock or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Abilene regional providers may add travel fees for Snyder and South Plains ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss caliche roads and equipment needs early.',
      'Verify explicit regional service to Snyder; Lubbock is often the closer practical hub for Scurry County.',
      'Storage is very limited locally; Lubbock or Abilene facilities are the typical option for gap periods.',
      'Obtain multiple estimates — ranch and outbuilding moves often require supplemental labor not in basic quotes.',
      'Confirm credentials for ranch and oilfield moves, including insurance for detached structures and equipment.',
    ],
  },
  robertson: {
    marketNotes:
      'Robertson County is one of Texas\'s least populous counties with Franklin as the seat. Moves are rare and rely on regional service from Waco or Bryan/College Station.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco and Bryan/College Station regional crews may add travel fees for Franklin and rural Robertson County ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size and shuttle plans for long gravel driveways.',
      'Verify explicit regional service to Franklin; Waco and College Station crews should confirm Robertson County coverage in writing.',
      'Storage is very limited locally; Waco or College Station warehouse options are typical between closings.',
      'Obtain multiple estimates from both hub cities — travel distance can vary significantly depending on crew origin.',
      'Confirm credentials for ranch moves and discuss handling for barn tools, feeders, and detached outbuildings.',
    ],
  },
  lee: {
    marketNotes:
      'Lee County is one of Texas\'s least populous counties with Giddings as the seat. Moves are rare and rely on regional service from Austin or Bryan/College Station.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Austin and Bryan/College Station regional providers may add travel fees for Giddings and rural Lee County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss narrow county roads and gate access in advance.',
      'Verify explicit regional service to Giddings; Austin and College Station movers vary in rural Central Texas coverage.',
      'Storage is very limited in Lee County; Austin or College Station facilities are typical for gap periods.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  young: {
    marketNotes:
      'Young County is one of Texas\'s least populous counties with Graham as the seat. Moves are rare and rely on regional service from Wichita Falls or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wichita Falls and Abilene regional providers may add travel fees for Graham and North Texas ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss driveway length, gates, and truck size upfront.',
      'Verify explicit regional service to Graham; not every North Texas mover covers Young County despite broad marketing.',
      'Storage is very limited locally; Wichita Falls or Abilene facilities are the practical option for most households.',
      'Obtain multiple estimates — ranch and outbuilding moves often require supplemental labor not reflected in basic quotes.',
      'Confirm credentials for ranch and oilfield moves, including insurance limits for farm equipment and detached structures.',
    ],
  },
  frio: {
    marketNotes:
      'Frio County is one of Texas\'s least populous counties with Pearsall as the seat. Moves are rare and rely on regional service from San Antonio or Laredo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Laredo regional crews may add travel fees for Pearsall and rural South Texas ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and equipment needs early.',
      'Verify explicit regional service to Pearsall; San Antonio and Laredo movers vary in rural county coverage.',
      'Storage is very limited in Frio County; San Antonio or Laredo warehouse options are typical for gap periods.',
      'Obtain multiple estimates — ranch and outbuilding contents can change crew size and hourly totals.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached structures.',
    ],
  },
  'deaf-smith': {
    marketNotes:
      'Deaf Smith County is one of Texas\'s least populous counties with Hereford as the seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Hereford and Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access for High Plains wind-exposed properties.',
      'Verify explicit regional service to Hereford; Amarillo crews are the primary practical option for Deaf Smith County.',
      'Storage is very limited locally; Amarillo or Lubbock warehouse options are typical between closings.',
      'Obtain multiple estimates — sparse Panhandle competition can mean wider price swings between regional crews.',
      'Confirm credentials for ranch moves, including insurance adequate for agricultural equipment and outbuildings.',
    ],
  },
  eastland: {
    marketNotes:
      'Eastland County is one of Texas\'s least populous counties with Eastland as the seat. Moves are rare and rely on regional service from Abilene or Fort Worth.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and Fort Worth regional crews may add travel fees for Eastland and rural ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss equipment needs and access roads before move day.',
      'Verify explicit regional service to Eastland; Abilene is often closer, but Fort Worth crews also cover parts of North Central Texas.',
      'Storage is very limited in Eastland County; plan with Abilene or DFW-area facilities if closing dates do not align.',
      'Obtain multiple estimates — outbuilding and agricultural contents can change crew size and pricing quickly.',
      'Confirm credentials for ranch and oilfield moves, including USDOT/MC verification on FMCSA.gov.',
    ],
  },
  andrews: {
    marketNotes:
      'Andrews County is one of Texas\'s least populous counties with Andrews as the seat. Moves are rare and rely on regional service from Odessa or Midland.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Odessa and Midland regional providers may add travel fees for Andrews and Permian Basin oilfield properties.',
    },
    tips: [
      'Extremely remote oilfield properties have severe access challenges — discuss field traffic, road conditions, and scheduling flexibility.',
      'Verify explicit regional service to Andrews; confirm the mover serves the county seat and outlying oilfield parcels.',
      'Storage is very limited in-county; Odessa or Midland facilities are the practical choice for most households.',
      'Obtain multiple estimates — Permian Basin travel and oilfield scheduling can affect pricing and availability.',
      'Confirm credentials for oilfield moves, including adequate cargo insurance for remote desert routes.',
    ],
  },
  bosque: {
    marketNotes:
      'Bosque County is rural Central Texas with Meridian as the seat. Moves are rare and rely on regional service from Waco.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco regional providers are the primary option for Meridian and rural Bosque County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss unpaved driveways and equipment needs early.',
      'Verify explicit regional service to Meridian; confirm Waco crews cover Bosque County before booking.',
      'Storage is very limited locally; Waco warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates from Waco providers — ranch and outbuilding contents can change labor requirements.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  burleson: {
    marketNotes:
      'Burleson County is one of Texas\'s least populous counties with Caldwell as the seat. Moves are rare and rely on regional service from Bryan/College Station or Waco.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Bryan/College Station and Waco regional crews may add travel fees for Caldwell and rural Burleson County ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size and shuttle plans for long gravel driveways.',
      'Verify explicit regional service to Caldwell; College Station and Waco movers should confirm Burleson County coverage in writing.',
      'Storage is very limited locally; College Station or Waco warehouse options are typical for gap periods.',
      'Obtain multiple estimates from both hub cities — travel distance can vary significantly depending on crew origin.',
      'Confirm credentials for ranch moves and discuss handling for barn tools, feeders, and detached outbuildings.',
    ],
  },
  freestone: {
    marketNotes:
      'Freestone County is one of Texas\'s least populous counties with Fairfield as the seat. Moves are rare and rely on regional service from Waco or Palestine.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco and Palestine regional providers may add travel fees for Fairfield and rural East Texas properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber-country and ranch homes.',
      'Verify explicit regional service to Fairfield; Waco and Palestine crews are the practical regional options.',
      'Storage is very limited in Freestone County; coordinate with Waco or Palestine-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with Piney Woods access roads.',
    ],
  },
  calhoun: {
    marketNotes:
      'Calhoun County is one of Texas\'s least populous counties with Port Lavaca as the seat. Moves are rare and rely on regional service from Victoria or Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Victoria and Corpus Christi regional providers may add travel fees for Port Lavaca and Coastal Bend properties.',
    },
    tips: [
      'Coastal properties require specialized planning — discuss humidity protection, flood-zone access, and hurricane-season scheduling.',
      'Verify explicit regional service to Port Lavaca before booking; confirm coverage for bayfront and rural coastal parcels.',
      'Storage is very limited in Calhoun County; Victoria or Corpus Christi facilities are the practical choice.',
      'Obtain multiple estimates — coastal moves may need extra floor protection and packing time not in basic quotes.',
      'Confirm credentials for coastal moves and ask about experience with bay-area access roads and lift-gate needs.',
    ],
  },
  gonzales: {
    marketNotes:
      'Gonzales County is one of Texas\'s least populous counties with Gonzales as the seat. Moves are rare and rely on regional service from San Antonio or Victoria.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Victoria regional crews may add travel fees for Gonzales and rural South Texas ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Gonzales; San Antonio and Victoria movers vary in rural county coverage.',
      'Storage is very limited locally; San Antonio or Victoria warehouse options are typical between closings.',
      'Obtain multiple estimates — historic-town and ranch moves may need extra packing care not reflected in online quotes.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached structures.',
    ],
  },
  jones: {
    marketNotes:
      'Jones County is one of Texas\'s least populous counties with Anson as the seat. Moves are rare and rely on regional service from Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene regional providers are the primary option for Anson and rural Jones County ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — confirm truck size and shuttle plans for long gravel driveways.',
      'Verify explicit regional service to Anson; Abilene movers should confirm Jones County coverage in writing.',
      'Storage is very limited locally; Abilene warehouse or container options are typical for gap periods.',
      'Obtain multiple estimates from Abilene providers — ranch moves often need supplemental labor beyond standard household quotes.',
      'Confirm credentials for ranch and oilfield moves and discuss handling for barn tools and detached outbuildings.',
    ],
  },
  dewitt: {
    marketNotes:
      'DeWitt County is one of Texas\'s least populous counties with Cuero as the seat. Moves are rare and rely on regional service from Victoria or San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Victoria and San Antonio regional crews may add travel fees for Cuero and rural South Texas ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and equipment needs early.',
      'Verify explicit regional service to Cuero; Victoria is often the closer practical hub for DeWitt County.',
      'Storage is very limited in DeWitt County; Victoria or San Antonio warehouse options are typical between closings.',
      'Obtain multiple estimates — ranch and outbuilding contents can change crew size and hourly totals.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  tyler: {
    marketNotes:
      'Tyler County is one of Texas\'s least populous counties with Woodville as the seat. Moves are rare and rely on regional service from Beaumont or Lufkin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Beaumont and Lufkin regional providers may add travel fees for Woodville and deep Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and lake-country homes.',
      'Verify explicit regional service to Woodville; Beaumont and Lufkin crews are the practical regional options.',
      'Storage is very limited in Tyler County; coordinate with Beaumont or Lufkin-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  willacy: {
    marketNotes:
      'Willacy County is one of Texas\'s least populous counties with Raymondville as the seat. Moves are rare and rely on regional service from Brownsville or Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Brownsville and Corpus Christi regional crews may add travel fees for Raymondville and Rio Grande Valley ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss border-region access roads and long driveways upfront.',
      'Verify explicit regional service to Raymondville; confirm the mover serves the county seat and outlying ranch parcels.',
      'Storage is very limited in Willacy County; Brownsville or Corpus Christi facilities are the practical choice.',
      'Obtain multiple estimates — Valley heat and ranch equipment can change crew size and scheduling needs.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  montague: {
    marketNotes:
      'Montague County is one of Texas\'s least populous counties with Montague as the seat. Moves are rare and rely on regional service from Wichita Falls or Gainesville.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wichita Falls and Gainesville regional providers may add travel fees for Montague and North Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss Red River country access roads and truck size upfront.',
      'Verify explicit regional service to Montague; Wichita Falls and Gainesville crews should confirm county coverage in writing.',
      'Storage is very limited locally; Wichita Falls or Gainesville warehouse options are typical for gap periods.',
      'Obtain multiple estimates — sparse North Texas competition can mean wider price swings between regional crews.',
      'Confirm credentials for ranch moves, including insurance adequate for agricultural equipment and outbuildings.',
    ],
  },
  hutchinson: {
    marketNotes:
      'Hutchinson County is one of Texas\'s least populous counties with Stinnett as the seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo regional providers are the primary option for Stinnett and Panhandle ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss terrain, wind exposure, and road conditions early.',
      'Verify explicit regional service to Stinnett; confirm Amarillo crews cover Hutchinson County before booking.',
      'Storage is very limited in-county; Amarillo facilities are the practical choice for most households.',
      'Obtain multiple estimates from Amarillo providers — oilfield scheduling can affect availability and pricing.',
      'Confirm credentials for ranch and oilfield moves, including adequate insurance for remote Panhandle routes.',
    ],
  },
  lavaca: {
    marketNotes:
      'Lavaca County is one of Texas\'s least populous counties with Hallettsville as the seat. Moves are rare and rely on regional service from Victoria or San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Victoria and San Antonio regional crews may add travel fees for Hallettsville and rural South Texas ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Hallettsville; Victoria is often the closer practical option for Lavaca County.',
      'Storage is very limited locally; Victoria or San Antonio warehouse options are typical between closings.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached structures.',
    ],
  },
  colorado: {
    marketNotes:
      'Colorado County is one of Texas\'s least populous counties with Columbus as the seat. Moves are rare and rely on regional service from Houston or Victoria.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston and Victoria regional crews may add travel fees for Columbus and rural South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access for Colorado River bottomland and ranch-country homes.',
      'Verify explicit regional service to Columbus; Houston and Victoria movers vary in rural county coverage.',
      'Storage is very limited in Colorado County; Houston or Victoria facilities are typical for gap periods.',
      'Obtain multiple estimates — travel distance from Houston or Victoria can materially affect final pricing.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  gray: {
    marketNotes:
      'Gray County is one of Texas\'s least populous counties with Pampa as the seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo regional providers are the primary option for Pampa and Panhandle ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss High Plains wind exposure and access roads early.',
      'Verify explicit regional service to Pampa; confirm Amarillo crews cover Gray County before booking.',
      'Storage is very limited locally; Amarillo warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates from Amarillo providers — ranch and oilfield moves often need supplemental labor.',
      'Confirm credentials for ranch and oilfield moves, including insurance adequate for agricultural equipment.',
    ],
  },
  moore: {
    marketNotes:
      'Moore County is one of Texas\'s least populous counties with Dumas as the seat. Moves are rare and rely on regional service from Amarillo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo regional providers are the primary option for Dumas and northern Panhandle ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss terrain and long Panhandle drive times upfront.',
      'Verify explicit regional service to Dumas; confirm Amarillo crews cover Moore County and outlying parcels.',
      'Storage is very limited in-county; Amarillo facilities are the practical choice for most households.',
      'Obtain multiple estimates — northern Panhandle travel can significantly affect hourly and flat-rate quotes.',
      'Confirm credentials for ranch and oilfield moves, including adequate cargo insurance for remote routes.',
    ],
  },
  hockley: {
    marketNotes:
      'Hockley County is one of Texas\'s least populous counties with Levelland as the seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock regional crews may add travel fees for Levelland and remote South Plains ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Levelland; confirm Lubbock crews cover Hockley County before booking.',
      'Storage is very limited locally; Lubbock warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — South Plains travel distance can materially affect final pricing in thin markets.',
      'Confirm credentials for ranch and oilfield moves, including adequate insurance for remote West Texas routes.',
    ],
  },
  lampasas: {
    marketNotes:
      'Lampasas County is one of Texas\'s least populous counties with Lampasas as the seat. Moves are rare and rely on regional service from Killeen or Austin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Killeen and Austin regional providers may add travel fees for Lampasas and remote Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access for Hill Country and ranch-country homes.',
      'Verify explicit regional service to Lampasas; Killeen is often the closer practical option for Lampasas County.',
      'Storage is very limited locally; Killeen or Austin warehouse options are typical between closings.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached structures.',
    ],
  },
  limestone: {
    marketNotes:
      'Limestone County is one of Texas\'s least populous counties with Groesbeck as the seat. Moves are rare and rely on regional service from Waco or Bryan/College Station.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco and Bryan–College Station regional crews may add travel fees for Groesbeck and rural Central Texas ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss limestone driveways and multi-structure properties upfront.',
      'Verify explicit regional service to Groesbeck; Waco and College Station movers vary in rural county coverage.',
      'Storage is very limited in Limestone County; Waco or Bryan facilities are typical for gap periods.',
      'Obtain multiple estimates — travel distance from Waco or Bryan can materially affect final pricing.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  houston: {
    marketNotes:
      'Houston County is one of Texas\'s least populous counties with Crockett as the seat. Moves are rare and rely on regional service from Lufkin or Palestine. (Not Harris County or the city of Houston.)',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lufkin and Palestine regional providers may add travel fees for Crockett and remote East Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Crockett; Lufkin and Palestine crews are the practical regional options for Houston County.',
      'Storage is very limited in Houston County; coordinate with Lufkin or Palestine-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  panola: {
    marketNotes:
      'Panola County is one of Texas\'s least populous counties with Carthage as the seat. Moves are rare and rely on regional service from Longview or Shreveport, LA.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Longview and Shreveport regional crews may add travel fees for Carthage and remote East Texas border properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — discuss timber roads and lake-country access upfront.',
      'Verify explicit regional service to Carthage; Longview is often the closer Texas option, with Shreveport crews covering some border routes.',
      'Storage is very limited in Panola County; Longview or Shreveport facilities are typical when closing dates do not align.',
      'Obtain multiple estimates — cross-state crews may have different licensing and travel-fee structures.',
      'Confirm credentials for rural moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  llano: {
    marketNotes:
      'Llano County is one of Texas\'s least populous counties with Llano and Lake LBJ. Moves are rare and rely on regional service from Austin or Fredericksburg.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Austin and Fredericksburg regional crews may add travel fees for Llano, Lake LBJ, and remote Hill Country properties.',
    },
    tips: [
      'Lake and Hill Country properties have access challenges — discuss steep driveways, lake docks, and limited turnaround space upfront.',
      'Verify explicit regional service to Llano; Austin and Fredericksburg movers vary in coverage for lake-country parcels.',
      'Storage is very limited locally; Austin or Fredericksburg warehouse options are typical between closings.',
      'Obtain multiple estimates — lake and ranch moves may need supplemental labor not reflected in basic quotes.',
      'Confirm credentials for lake and ranch moves, including experience with waterfront stairs and multi-level lake homes.',
    ],
  },
  bandera: {
    marketNotes:
      'Bandera County is rural Hill Country with Bandera as the seat. Moves are rare and rely on regional service from San Antonio or Kerrville.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Kerrville regional crews may add travel fees for Bandera and remote Hill Country ranch properties.',
    },
    tips: [
      'Extremely remote Hill Country properties have severe access challenges — discuss ranch roads, gates, and truck size upfront.',
      'Verify explicit regional service to Bandera; San Antonio is often the primary option with Kerrville covering western Hill Country routes.',
      'Storage is very limited in Bandera County; San Antonio or Kerrville facilities are typical for gap periods.',
      'Obtain multiple estimates — Hill Country terrain can change crew size and scheduling needs.',
      'Confirm credentials for ranch moves and verify insurance limits for detached structures and ranch equipment.',
    ],
  },
  shelby: {
    marketNotes:
      'Shelby County is one of Texas\'s least populous counties with Center as the seat. Moves are rare and rely on regional service from Lufkin or Nacogdoches.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lufkin and Nacogdoches regional providers may add travel fees for Center and remote East Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Center; Lufkin and Nacogdoches crews should confirm Shelby County coverage in writing.',
      'Storage is very limited in Shelby County; coordinate with Lufkin or Nacogdoches-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  brooks: {
    marketNotes:
      'Brooks County is one of Texas\'s least populous counties with Falfurrias as the seat. Moves are rare and rely on regional service from Laredo or Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Laredo and Corpus Christi regional crews may add travel fees for Falfurrias and remote South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Falfurrias; confirm the mover serves Brooks County and outlying ranch parcels.',
      'Storage is very limited in Brooks County; Laredo or Corpus Christi facilities are the practical choice.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County is one of Texas\'s least populous counties with La Grange as the seat. Moves are rare and rely on regional service from Austin or San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Austin and San Antonio regional crews may add travel fees for La Grange and remote South Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access for ranch-country and historic-town homes.',
      'Verify explicit regional service to La Grange; Austin and San Antonio movers vary in rural Fayette County coverage.',
      'Storage is very limited locally; Austin or San Antonio warehouse options are typical between closings.',
      'Obtain multiple estimates — travel distance from Austin or San Antonio can materially affect final pricing.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached structures.',
    ],
  },
  uvalde: {
    marketNotes:
      'Uvalde County is one of Texas\'s least populous counties with Uvalde as the seat. Moves are rare and rely on regional service from San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio regional crews may add travel fees for Uvalde and remote South Texas ranch and Hill Country fringe properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Uvalde; confirm San Antonio crews cover Uvalde County before booking.',
      'Storage is very limited locally; San Antonio warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  milam: {
    marketNotes:
      'Milam County is one of Texas\'s least populous counties with Cameron as the seat. Moves are rare and rely on regional service from Waco or Bryan/College Station.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco and Bryan–College Station regional crews may add travel fees for Cameron and rural Central Texas ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss multi-structure properties and ranch roads upfront.',
      'Verify explicit regional service to Cameron; Waco and College Station movers vary in rural Milam County coverage.',
      'Storage is very limited in Milam County; Waco or Bryan facilities are typical for gap periods.',
      'Obtain multiple estimates — travel distance from Waco or Bryan can materially affect final pricing.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  aransas: {
    marketNotes:
      'Aransas County is one of Texas\'s least populous counties with Rockport and coastal areas. Moves are rare and rely on regional service from Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Corpus Christi regional crews may add travel fees for Rockport, Fulton, and coastal Aransas County properties.',
    },
    tips: [
      'Coastal properties require specialized planning — discuss hurricane-season scheduling, salt-air exposure, and dock or pier access upfront.',
      'Verify explicit regional service to Rockport; confirm Corpus Christi crews cover Aransas County coastal routes.',
      'Storage is very limited locally; Corpus Christi warehouse or climate-controlled options are typical between closings.',
      'Obtain multiple estimates — coastal moves may need supplemental labor for elevated homes and tight island roads.',
      'Confirm credentials for coastal moves, including experience with waterfront stairs and flood-zone access constraints.',
    ],
  },
  gaines: {
    marketNotes:
      'Gaines County is one of Texas\'s least populous counties with Seminole as the seat. Moves are rare and rely on regional service from Lubbock or Midland.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Midland regional crews may add travel fees for Seminole and remote West Texas ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss terrain, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Seminole; Lubbock and Midland movers should confirm Gaines County coverage in writing.',
      'Storage is very limited in-county; Lubbock or Midland facilities are the practical choice for most households.',
      'Obtain multiple estimates — Permian Basin travel distance can significantly affect hourly and flat-rate quotes.',
      'Confirm credentials for ranch and oilfield moves, including adequate cargo insurance for remote West Texas routes.',
    ],
  },
  gillespie: {
    marketNotes:
      'Gillespie County is rural Hill Country with Fredericksburg as the seat. Moves are rare and rely on regional service from San Antonio or Austin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Austin regional crews may add travel fees for Fredericksburg and remote Hill Country ranch and winery properties.',
    },
    tips: [
      'Remote Hill Country properties have access challenges — discuss steep driveways, ranch gates, and limited turnaround space upfront.',
      'Verify explicit regional service to Fredericksburg; San Antonio is often the closer practical option for Gillespie County.',
      'Storage is very limited locally; San Antonio or Austin warehouse options are typical between closings.',
      'Obtain multiple estimates — Hill Country terrain can change crew size and scheduling needs.',
      'Confirm credentials for ranch moves and verify insurance limits for detached structures and vineyard equipment.',
    ],
  },
  'san-jacinto': {
    marketNotes:
      'San Jacinto County is one of Texas\'s least populous counties with Coldspring as the seat. Moves are rare and rely on regional service from Houston or Huntsville.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston and Huntsville regional providers may add travel fees for Coldspring and remote East Texas Piney Woods and lake properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads, lake homes, and rural homesteads.',
      'Verify explicit regional service to Coldspring; Houston and Huntsville crews are the practical regional options.',
      'Storage is very limited in San Jacinto County; coordinate with Houston or Huntsville-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  'palo-pinto': {
    marketNotes:
      'Palo Pinto County is one of Texas\'s least populous counties with Palo Pinto as the seat. Moves are rare and rely on regional service from Fort Worth or Wichita Falls.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Fort Worth and Wichita Falls regional crews may add travel fees for Palo Pinto, Mineral Wells, and rural North Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss ranch roads, gates, and truck size upfront.',
      'Verify explicit regional service to Palo Pinto; Fort Worth and Wichita Falls movers vary in rural county coverage.',
      'Storage is very limited locally; Fort Worth or Wichita Falls warehouse options are typical for gap periods.',
      'Obtain multiple estimates — sparse North Texas competition can mean wider price swings between regional crews.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  cass: {
    marketNotes:
      'Cass County is one of Texas\'s least populous counties with Linden as the seat. Moves are rare and rely on regional service from Texarkana or Longview.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Texarkana and Longview regional providers may add travel fees for Linden and remote Northeast Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Linden; Texarkana and Longview crews should confirm Cass County coverage in writing.',
      'Storage is very limited in Cass County; coordinate with Texarkana or Longview-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  kleberg: {
    marketNotes:
      'Kleberg County is one of Texas\'s least populous counties with Kingsville as the seat. Moves are rare and rely on regional service from Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Corpus Christi regional crews may add travel fees for Kingsville and remote South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Kingsville; confirm Corpus Christi crews cover Kleberg County before booking.',
      'Storage is very limited locally; Corpus Christi warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  titus: {
    marketNotes:
      'Titus County is one of Texas\'s least populous counties with Mount Pleasant as the seat. Moves are rare and rely on regional service from Texarkana or Longview.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Texarkana and Longview regional providers may add travel fees for Mount Pleasant and remote Northeast Texas properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Mount Pleasant; Texarkana and Longview crews are the practical regional options.',
      'Storage is very limited in Titus County; coordinate with Texarkana or Longview-area facilities if needed.',
      'Obtain multiple estimates — Northeast Texas travel distance can materially affect final pricing.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  hale: {
    marketNotes:
      'Hale County is one of Texas\'s least populous counties with Plainview as the seat. Moves are rare and rely on regional service from Lubbock.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock regional crews may add travel fees for Plainview and remote Texas Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss High Plains wind exposure, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Plainview; confirm Lubbock crews cover Hale County before booking.',
      'Storage is very limited locally; Lubbock warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — Panhandle travel distance can materially affect final pricing in thin markets.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  bee: {
    marketNotes:
      'Bee County is one of Texas\'s least populous counties with Beeville as the seat. Moves are rare and rely on regional service from Corpus Christi or San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Corpus Christi and San Antonio regional crews may add travel fees for Beeville and remote South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Beeville; Corpus Christi is often the closer practical option for Bee County.',
      'Storage is very limited locally; Corpus Christi or San Antonio warehouse options are typical between closings.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  jasper: {
    marketNotes:
      'Jasper County is one of Texas\'s least populous counties with Jasper as the seat. Moves are rare and rely on regional service from Beaumont or Lufkin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Beaumont and Lufkin regional providers may add travel fees for Jasper and remote East Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and lake-country homes.',
      'Verify explicit regional service to Jasper; Beaumont and Lufkin crews are the practical regional options.',
      'Storage is very limited in Jasper County; coordinate with Beaumont or Lufkin-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  austin: {
    marketNotes:
      'Austin County is one of Texas\'s least populous counties with Bellville as the seat. Moves are rare and rely on regional service from Houston or San Antonio. (Not Travis County or the city of Austin.)',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston and San Antonio regional crews may add travel fees for Bellville and remote South Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access for ranch-country and historic-town homes.',
      'Verify explicit regional service to Bellville; Houston and San Antonio movers vary in rural Austin County coverage.',
      'Storage is very limited locally; Houston or San Antonio warehouse options are typical between closings.',
      'Obtain multiple estimates — travel distance from Houston or San Antonio can materially affect final pricing.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached structures.',
    ],
  },
  howard: {
    marketNotes:
      'Howard County is one of Texas\'s least populous counties with Big Spring as the seat. Moves are rare and rely on regional service from Midland or Abilene.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Midland and Abilene regional crews may add travel fees for Big Spring and remote West Texas ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss terrain, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Big Spring; Midland and Abilene movers should confirm Howard County coverage in writing.',
      'Storage is very limited in-county; Midland or Abilene facilities are the practical choice for most households.',
      'Obtain multiple estimates — Permian Basin and West Texas travel can significantly affect hourly and flat-rate quotes.',
      'Confirm credentials for ranch and oilfield moves, including adequate cargo insurance for remote routes.',
    ],
  },
  grimes: {
    marketNotes:
      'Grimes County is one of Texas\'s least populous counties with Anderson as the seat. Moves are rare and rely on regional service from Houston or Bryan/College Station.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston and Bryan–College Station regional crews may add travel fees for Anderson and remote Southeast Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss multi-structure properties and ranch roads upfront.',
      'Verify explicit regional service to Anderson; Houston and College Station movers vary in rural Grimes County coverage.',
      'Storage is very limited in Grimes County; Houston or Bryan facilities are typical for gap periods.',
      'Obtain multiple estimates — travel distance from Houston or Bryan can materially affect final pricing.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  matagorda: {
    marketNotes:
      'Matagorda County is one of Texas\'s least populous counties with Bay City as the seat. Moves are rare and rely on regional service from Houston or Victoria.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston and Victoria regional crews may add travel fees for Bay City and coastal Matagorda County properties.',
    },
    tips: [
      'Coastal properties require specialized planning — discuss hurricane-season scheduling, flood-zone access, and marsh-country routes upfront.',
      'Verify explicit regional service to Bay City; Houston and Victoria movers vary in coastal county coverage.',
      'Storage is very limited locally; Houston or Victoria warehouse options are typical between closings.',
      'Obtain multiple estimates — coastal moves may need supplemental labor for elevated homes and rural bay routes.',
      'Confirm credentials for coastal moves, including experience with waterfront access and flood-zone constraints.',
    ],
  },
  brown: {
    marketNotes:
      'Brown County is one of Texas\'s least populous counties with Brownwood as the seat. Moves are rare and rely on regional service from Abilene or Waco.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and Waco regional crews may add travel fees for Brownwood and remote Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss ranch roads, gates, and truck size upfront.',
      'Verify explicit regional service to Brownwood; Abilene and Waco movers should confirm Brown County coverage in writing.',
      'Storage is very limited locally; Abilene or Waco warehouse options are typical for gap periods.',
      'Obtain multiple estimates — sparse Central Texas competition can mean wider price swings between regional crews.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  'jim-wells': {
    marketNotes:
      'Jim Wells County is one of Texas\'s least populous counties with Alice as the seat. Moves are rare and rely on regional service from Corpus Christi or Laredo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Corpus Christi and Laredo regional crews may add travel fees for Alice and remote South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Alice; Corpus Christi is often the closer practical option for Jim Wells County.',
      'Storage is very limited locally; Corpus Christi or Laredo warehouse options are typical between closings.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is one of Texas\'s least populous counties with Brenham as the seat. Moves are rare and rely on regional service from Houston or Austin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston and Austin regional crews may add travel fees for Brenham and remote South Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access for ranch-country and historic-town homes.',
      'Verify explicit regional service to Brenham; Houston and Austin movers vary in rural Washington County coverage.',
      'Storage is very limited locally; Houston or Austin warehouse options are typical between closings.',
      'Obtain multiple estimates — travel distance from Houston or Austin can materially affect final pricing.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached structures.',
    ],
  },
  hopkins: {
    marketNotes:
      'Hopkins County is one of Texas\'s least populous counties with Sulphur Springs as the seat. Moves are rare and rely on regional service from Dallas or Texarkana.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Dallas and Texarkana regional providers may add travel fees for Sulphur Springs and remote Northeast Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss ranch roads, gates, and truck size upfront.',
      'Verify explicit regional service to Sulphur Springs; Dallas and Texarkana crews should confirm Hopkins County coverage in writing.',
      'Storage is very limited locally; Dallas or Texarkana warehouse options are typical for gap periods.',
      'Obtain multiple estimates — Northeast Texas travel distance can materially affect final pricing.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  fannin: {
    marketNotes:
      'Fannin County is one of Texas\'s least populous counties with Bonham as the seat. Moves are rare and rely on regional service from Dallas or Sherman.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Dallas and Sherman–Denison regional crews may add travel fees for Bonham and remote Northeast Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss Red River country access roads and truck size upfront.',
      'Verify explicit regional service to Bonham; Dallas and Sherman crews vary in rural Fannin County coverage.',
      'Storage is very limited locally; Dallas or Sherman warehouse options are typical between closings.',
      'Obtain multiple estimates — sparse Northeast Texas competition can mean wider price swings between regional crews.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  hill: {
    marketNotes:
      'Hill County is one of Texas\'s least populous counties with Hillsboro as the seat. Moves are rare and rely on regional service from Waco or Dallas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco and Dallas regional crews may add travel fees for Hillsboro and remote Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss multi-structure properties and ranch roads upfront.',
      'Verify explicit regional service to Hillsboro; Waco is often the closer practical option for Hill County.',
      'Storage is very limited locally; Waco or Dallas warehouse options are typical for gap periods.',
      'Obtain multiple estimates — travel distance from Waco or Dallas can materially affect final pricing.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached structures.',
    ],
  },
  wharton: {
    marketNotes:
      'Wharton County is one of Texas\'s least populous counties with Wharton as the seat. Moves are rare and rely on regional service from Houston or Victoria.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston and Victoria regional crews may add travel fees for Wharton and remote South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access for ranch-country and river-bottom homes.',
      'Verify explicit regional service to Wharton; Houston and Victoria movers vary in rural county coverage.',
      'Storage is very limited locally; Houston or Victoria warehouse options are typical between closings.',
      'Obtain multiple estimates — travel distance from Houston or Victoria can materially affect final pricing.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  erath: {
    marketNotes:
      'Erath County is one of Texas\'s least populous counties with Stephenville as the seat. Moves are rare and rely on regional service from Fort Worth or Waco.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Fort Worth and Waco regional crews may add travel fees for Stephenville and remote Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss ranch roads, gates, and truck size upfront.',
      'Verify explicit regional service to Stephenville; Fort Worth and Waco movers should confirm Erath County coverage in writing.',
      'Storage is very limited locally; Fort Worth or Waco warehouse options are typical for gap periods.',
      'Obtain multiple estimates — Central Texas travel distance can materially affect hourly and flat-rate quotes.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  cooke: {
    marketNotes:
      'Cooke County is one of Texas\'s least populous counties with Gainesville as the seat. Moves are rare and rely on regional service from Dallas or Sherman.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Dallas and Sherman–Denison regional crews may add travel fees for Gainesville and rural North Texas ranch properties near the Red River.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss Red River country access roads and truck size upfront.',
      'Verify explicit regional service to Gainesville; Dallas and Sherman crews should confirm Cooke County coverage in writing.',
      'Storage is very limited locally; Dallas or Sherman warehouse options are typical between closings.',
      'Obtain multiple estimates — North Texas travel distance can materially affect final pricing in thin markets.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  upshur: {
    marketNotes:
      'Upshur County is one of Texas\'s least populous counties with Gilmer as the seat. Moves are rare and rely on regional service from Longview.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Longview regional providers may add travel fees for Gilmer and remote East Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Gilmer; confirm Longview crews cover Upshur County before booking.',
      'Storage is very limited in Upshur County; Longview warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — obtain multiple Longview quotes since the market is thin and travel fees vary.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  'val-verde': {
    marketNotes:
      'Val Verde County is one of Texas\'s least populous counties with Del Rio as the seat. Moves are rare and rely on regional service from San Antonio or Laredo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Laredo regional crews may add travel fees for Del Rio and remote South Texas ranch and border-region properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss border-region access roads and long driveways upfront.',
      'Verify explicit regional service to Del Rio; San Antonio and Laredo movers vary in Val Verde County coverage.',
      'Storage is very limited locally; San Antonio or Laredo warehouse options are typical between closings.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  wood: {
    marketNotes:
      'Wood County is one of Texas\'s least populous counties with Quitman as the seat. Moves are rare and rely on regional service from Tyler or Longview.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Tyler and Longview regional providers may add travel fees for Quitman and remote East Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and lake-country homes.',
      'Verify explicit regional service to Quitman; Tyler and Longview crews are the practical regional options.',
      'Storage is very limited in Wood County; coordinate with Tyler or Longview-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  lamar: {
    marketNotes:
      'Lamar County is one of Texas\'s least populous counties with Paris as the seat. Moves are rare and rely on regional service from Texarkana or Dallas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Texarkana and Dallas regional providers may add travel fees for Paris and remote Northeast Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss ranch roads, gates, and truck size upfront.',
      'Verify explicit regional service to Paris; Texarkana is often the closer practical option for Lamar County.',
      'Storage is very limited locally; Texarkana or Dallas warehouse options are typical for gap periods.',
      'Obtain multiple estimates — Northeast Texas travel distance can materially affect final pricing.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  medina: {
    marketNotes:
      'Medina County is one of Texas\'s least populous counties with Hondo as the seat. Moves are rare and rely on regional service from San Antonio.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio regional crews may add travel fees for Hondo and remote South Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Hondo; confirm San Antonio crews cover Medina County before booking.',
      'Storage is very limited locally; San Antonio warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  hardin: {
    marketNotes:
      'Hardin County is one of Texas\'s least populous counties with Kountze as the seat. Moves are rare and rely on regional service from Beaumont.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Beaumont regional providers may add travel fees for Kountze and remote Southeast Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Kountze; confirm Beaumont crews cover Hardin County before booking.',
      'Storage is very limited in Hardin County; Beaumont warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — obtain multiple Beaumont quotes since the market is thin and travel fees vary.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  maverick: {
    marketNotes:
      'Maverick County is one of Texas\'s least populous counties with Eagle Pass as the seat. Moves are rare and rely on regional service from San Antonio or Laredo.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Laredo regional crews may add travel fees for Eagle Pass and remote South Texas border-region ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss border-region access roads and long driveways upfront.',
      'Verify explicit regional service to Eagle Pass; San Antonio and Laredo movers vary in Maverick County coverage.',
      'Storage is very limited locally; San Antonio or Laredo warehouse options are typical between closings.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  chambers: {
    marketNotes:
      'Chambers County is one of Texas\'s least populous counties with Anahuac as the seat. Moves are rare and rely on regional service from Houston.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston regional crews may add travel fees for Anahuac and remote Southeast Texas coastal and ranch properties.',
    },
    tips: [
      'Extremely remote coastal and ranch properties have severe access challenges — discuss bay-country access, flood zones, and marsh routes upfront.',
      'Verify explicit regional service to Anahuac; confirm Houston crews cover Chambers County before booking.',
      'Storage is very limited locally; Houston warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — coastal moves may need supplemental labor for elevated homes and rural bay routes.',
      'Confirm credentials for coastal moves, including experience with waterfront access and flood-zone constraints.',
    ],
  },
  anderson: {
    marketNotes:
      'Anderson County is one of Texas\'s least populous counties with Palestine as the seat. Moves are rare and rely on regional service from Tyler or Lufkin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Tyler and Lufkin regional providers may add travel fees for Palestine and remote East Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Palestine; Tyler and Lufkin crews are the practical regional options.',
      'Storage is very limited in Anderson County; coordinate with Tyler or Lufkin-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  nacogdoches: {
    marketNotes:
      'Nacogdoches County is one of Texas\'s least populous counties with Nacogdoches as the seat. Moves are rare and rely on regional service from Lufkin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lufkin regional providers may add travel fees for Nacogdoches and remote East Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Nacogdoches; confirm Lufkin crews cover the county before booking.',
      'Storage is very limited locally; Lufkin warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — obtain multiple Lufkin quotes since the market is thin and travel fees vary.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  starr: {
    marketNotes:
      'Starr County is one of Texas\'s least populous counties with Rio Grande City as the seat. Moves are rare and rely on regional service from Laredo or McAllen.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Laredo and McAllen regional crews may add travel fees for Rio Grande City and remote South Texas border-region ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss border-region access roads and long driveways upfront.',
      'Verify explicit regional service to Rio Grande City; Laredo and McAllen movers vary in Starr County coverage.',
      'Storage is very limited locally; Laredo or McAllen warehouse options are typical between closings.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  'van-zandt': {
    marketNotes:
      'Van Zandt County is one of Texas\'s least populous counties with Canton as the seat. Moves are rare and rely on regional service from Tyler or Dallas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Tyler and Dallas regional crews may add travel fees for Canton and remote East Texas properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Canton; Tyler is often the closer practical option for Van Zandt County.',
      'Storage is very limited locally; Tyler or Dallas warehouse options are typical for gap periods.',
      'Obtain multiple estimates — travel distance from Tyler or Dallas can materially affect final pricing.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  hood: {
    marketNotes:
      'Hood County is one of Texas\'s least populous counties with Granbury as the seat. Moves are rare and rely on regional service from Fort Worth.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Fort Worth regional crews may add travel fees for Granbury and remote North Texas ranch and lake properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss lake-country access, ranch roads, and truck size upfront.',
      'Verify explicit regional service to Granbury; confirm Fort Worth crews cover Hood County before booking.',
      'Storage is very limited locally; Fort Worth warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — obtain multiple Fort Worth quotes since the market is thin and travel fees vary.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  harrison: {
    marketNotes:
      'Harrison County is one of Texas\'s least populous counties with Marshall as the seat. Moves are rare and rely on regional service from Longview or Shreveport, LA.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Longview and Shreveport regional crews may add travel fees for Marshall and remote East Texas border properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — discuss timber roads and lake-country access upfront.',
      'Verify explicit regional service to Marshall; Longview is often the closer Texas option, with Shreveport crews covering some border routes.',
      'Storage is very limited in Harrison County; Longview or Shreveport facilities are typical when closing dates do not align.',
      'Obtain multiple estimates — cross-state crews may have different licensing and travel-fee structures.',
      'Confirm credentials for rural moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  'san-patricio': {
    marketNotes:
      'San Patricio County is one of Texas\'s least populous counties with Sinton as the seat. Moves are rare and rely on regional service from Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Corpus Christi regional crews may add travel fees for Sinton and coastal San Patricio County properties.',
    },
    tips: [
      'Coastal properties require specialized planning — discuss hurricane-season scheduling, salt-air exposure, and bay-country access upfront.',
      'Verify explicit regional service to Sinton; confirm Corpus Christi crews cover San Patricio County before booking.',
      'Storage is very limited locally; Corpus Christi warehouse or climate-controlled options are typical between closings.',
      'Obtain multiple estimates — coastal moves may need supplemental labor for elevated homes and rural bay routes.',
      'Confirm credentials for coastal moves, including experience with waterfront access and flood-zone constraints.',
    ],
  },
  waller: {
    marketNotes:
      'Waller County is one of Texas\'s least populous counties with Hempstead as the seat. Moves are rare and rely on regional service from Houston.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston regional crews may add travel fees for Hempstead and remote Southeast Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Hempstead; confirm Houston crews cover Waller County before booking.',
      'Storage is very limited locally; Houston warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  walker: {
    marketNotes:
      'Walker County is one of Texas\'s least populous counties with Huntsville as the seat. Moves are rare and rely on regional service from Houston or Lufkin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston and Lufkin regional providers may add travel fees for Huntsville and remote East Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Huntsville; Houston and Lufkin crews are the practical regional options.',
      'Storage is very limited in Walker County; coordinate with Houston or Lufkin-area facilities if needed.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  coryell: {
    marketNotes:
      'Coryell County is one of Texas\'s least populous counties with Gatesville as the seat. Moves are rare and rely on regional service from Killeen or Waco.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Killeen and Waco regional crews may add travel fees for Gatesville and remote Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss multi-structure properties and ranch roads upfront.',
      'Verify explicit regional service to Gatesville; Killeen is often the closer practical option for Coryell County.',
      'Storage is very limited locally; Killeen or Waco warehouse options are typical for gap periods.',
      'Obtain multiple estimates — travel distance from Killeen or Waco can materially affect final pricing.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  wise: {
    marketNotes:
      'Wise County is one of Texas\'s least populous counties with Decatur as the seat. Moves are rare and rely on regional service from Fort Worth.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Fort Worth regional crews may add travel fees for Decatur and remote North Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss ranch roads, gates, and truck size upfront.',
      'Verify explicit regional service to Decatur; confirm Fort Worth crews cover Wise County before booking.',
      'Storage is very limited locally; Fort Worth warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — obtain multiple Fort Worth quotes since the market is thin and travel fees vary.',
      'Confirm credentials for ranch moves and verify insurance limits for farm equipment and detached structures.',
    ],
  },
  orange: {
    marketNotes:
      'Orange County is one of Texas\'s least populous counties with Orange as the seat. Moves are rare and rely on regional service from Beaumont.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Beaumont regional providers may add travel fees for Orange and remote Southeast Texas Piney Woods and coastal properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and Sabine River bottomland homes.',
      'Verify explicit regional service to Orange; confirm Beaumont crews cover Orange County before booking.',
      'Storage is very limited in Orange County; Beaumont warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — obtain multiple Beaumont quotes since the market is thin and travel fees vary.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  angelina: {
    marketNotes:
      'Angelina County is one of Texas\'s least populous counties with Lufkin as the seat. Moves are rare and rely on regional service from Lufkin.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lufkin regional providers may add travel fees for rural Angelina County Piney Woods properties outside the city.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Lufkin; confirm crews cover outlying Angelina County parcels beyond the city limits.',
      'Storage is very limited locally; Lufkin warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — obtain multiple Lufkin quotes since the market is thin and travel fees vary.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  henderson: {
    marketNotes:
      'Henderson County is one of Texas\'s least populous counties with Athens as the seat. Moves are rare and rely on regional service from Tyler or Dallas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Tyler and Dallas regional crews may add travel fees for Athens and remote East Texas lake and ranch properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — discuss lake-country access and timber roads upfront.',
      'Verify explicit regional service to Athens; Tyler is often the closer practical option for Henderson County.',
      'Storage is very limited locally; Tyler or Dallas warehouse options are typical for gap periods.',
      'Obtain multiple estimates — travel distance from Tyler or Dallas can materially affect final pricing.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  bowie: {
    marketNotes:
      'Bowie County is one of Texas\'s least populous counties with Boston as the seat. Moves are rare and rely on regional service from Texarkana.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Texarkana regional providers may add travel fees for Boston and remote Northeast Texas Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and rural homesteads.',
      'Verify explicit regional service to Boston; confirm Texarkana crews cover Bowie County before booking.',
      'Storage is very limited in Bowie County; Texarkana warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — obtain multiple Texarkana quotes since the market is thin and travel fees vary.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads and limited turnaround space.',
    ],
  },
  victoria: {
    marketNotes:
      'Victoria County is one of Texas\'s least populous counties with Victoria as the seat. Moves are rare and rely on regional service from Victoria or Corpus Christi.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Victoria and Corpus Christi regional crews may add travel fees for rural South Texas ranch properties in the county.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss long driveways, cattle guards, and truck size upfront.',
      'Verify explicit regional service to Victoria; local Victoria providers are often the primary option with Corpus Christi as backup.',
      'Storage is very limited locally; Victoria warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates — ranch moves may need extra packing time not reflected in basic online quotes.',
      'Confirm credentials for ranch moves, including Texas DMV registration and adequate cargo insurance.',
    ],
  },
  potter: {
    marketNotes:
      'Potter County includes part of Amarillo with residential and commercial moves across the Panhandle metro. Service often spans both Potter and Randall counties.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Amarillo metro crews typically cover Potter and Randall counties; confirm cross-county coverage for addresses on the metro fringe.',
    },
    tips: [
      'Amarillo traffic and High Plains wind conditions affect scheduling — discuss weather holds and loading timelines upfront.',
      'Verify coverage for both Potter and Randall counties if your move spans the Amarillo metro.',
      'Confirm insurance for high-value items and antiques common in established Amarillo neighborhoods.',
      'Book early for peak seasons — summer PCS and university turnover can tighten Amarillo crew availability.',
      'Obtain multiple estimates — flat-rate and hourly quotes can vary between established Amarillo providers.',
    ],
  },
  'tom-green': {
    marketNotes:
      'Tom Green County centers on San Angelo with residential and military-related moves tied to Goodfellow AFB and Concho Valley growth.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,800–$4,000',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'San Angelo local providers typically cover Tom Green County; confirm service for rural county parcels outside city limits.',
    },
    tips: [
      'Verify coverage across Tom Green County, including rural addresses beyond San Angelo city limits.',
      'Military moves require specific experience — confirm Goodfellow AFB scheduling familiarity and base access procedures.',
      'Heavy traffic on US-67 and Loop 306 can affect timing; plan around peak commute windows.',
      'Confirm insurance for high-value homes and specialty items before booking.',
      'Book early for peak seasons — summer PCS cycles can tighten San Angelo crew availability.',
    ],
  },
  bastrop: {
    marketNotes:
      'Bastrop County is part of the Austin–Round Rock metro with growing residential development in Bastrop, Elgin, and surrounding communities.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Austin and Bastrop-area crews may add travel fees for rural county properties; confirm metro coverage for your address.',
    },
    tips: [
      'Verify coverage for Bastrop, Elgin, and surrounding areas — some crews list Austin metro only.',
      'Austin-area traffic on US-290 and SH-71 impacts scheduling; plan around peak commute windows.',
      'Confirm insurance for high-value homes common in newer Bastrop County subdivisions.',
      'Book early for peak seasons — summer and university turnover can tighten Austin-area crew availability.',
      'Obtain multiple estimates — travel distance from Austin can affect final pricing for rural Bastrop parcels.',
    ],
  },
  gregg: {
    marketNotes:
      'Gregg County centers on Longview with industrial and residential moves across the East Texas metro.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Longview local providers typically cover Gregg County; confirm service for Kilgore and rural county addresses.',
    },
    tips: [
      'Verify coverage for Longview, Kilgore, and surrounding Gregg County communities.',
      'Industrial traffic on I-20 and US-259 can impact scheduling — discuss route timing with your crew.',
      'Confirm insurance for high-value items and business equipment if relocating a home office.',
      'Book early for peak seasons — summer moves can tighten Longview crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between established local providers.',
    ],
  },
  liberty: {
    marketNotes:
      'Liberty County is part of the Houston–The Woodlands–Sugar Land metro with growing residential areas in Liberty, Cleveland, and Dayton.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Houston regional crews may add travel fees for Liberty County addresses east of the metro core.',
    },
    tips: [
      'Verify coverage for Liberty, Cleveland, Dayton, and surrounding areas before booking.',
      'Houston-area traffic on US-59 and I-10 impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes and ranch properties common in Liberty County.',
      'Book early for peak seasons — summer and hurricane-season moves can tighten Houston crew availability.',
      'Obtain multiple estimates — travel distance from Houston can materially affect final pricing.',
    ],
  },
  hunt: {
    marketNotes:
      'Hunt County is part of the Dallas–Fort Worth metro with Greenville as the main hub for residential moves.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dallas regional crews may add travel fees for Greenville and rural Hunt County properties.',
    },
    tips: [
      'Verify coverage for Greenville, Commerce, and surrounding Hunt County communities.',
      'Dallas-area traffic on I-30 and US-380 impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes and ranch properties in Hunt County.',
      'Book early for peak seasons — summer moves can tighten Dallas-area crew availability.',
      'Obtain multiple estimates — travel distance from Dallas can affect final pricing for Greenville routes.',
    ],
  },
  wichita: {
    marketNotes:
      'Wichita County centers on Wichita Falls with military and residential moves tied to Sheppard AFB and the North Texas metro.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Wichita Falls local providers typically cover Wichita County; confirm service for rural county parcels and base housing.',
    },
    tips: [
      'Military (Sheppard AFB) moves require specific experience — confirm base access and PCS scheduling familiarity.',
      'Verify coverage for Wichita Falls, Iowa Park, and surrounding Wichita County communities.',
      'Heavy traffic on US-287 and Loop 11 can affect timing; plan around peak commute windows.',
      'Confirm insurance for high-value homes and specialty items before booking.',
      'Book early for peak seasons — summer PCS cycles can tighten Wichita Falls crew availability.',
    ],
  },
  rockwall: {
    marketNotes:
      'Rockwall County is part of the Dallas–Fort Worth metro with growing suburban residential development along Lake Ray Hubbard.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dallas and Fort Worth metro crews typically cover Rockwall County; confirm service for lakefront and suburban addresses.',
    },
    tips: [
      'Verify coverage for Rockwall, Fate, Heath, and surrounding Dallas metro communities.',
      'Heavy traffic on I-30 and local roads impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in Rockwall County lake communities.',
      'Book early for peak seasons — summer moves can tighten Dallas-area crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between metro providers.',
    ],
  },
  taylor: {
    marketNotes:
      'Taylor County centers on Abilene with residential and military-related moves tied to Dyess AFB. (Not Tyler County — seat Woodville.)',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,800–$4,000',
      avgHourly: '$90–$130/hr for a 2-person crew',
      note: 'Abilene local providers typically cover Taylor County; confirm service for rural county parcels outside city limits.',
    },
    tips: [
      'Verify coverage for Abilene, Tuscola, and surrounding Taylor County communities.',
      'Military (Dyess AFB) moves require specific experience — confirm base access and PCS scheduling familiarity.',
      'Heavy traffic on I-20 and US-83 can affect timing; plan around peak commute windows.',
      'Confirm insurance for high-value homes and specialty items before booking.',
      'Book early for peak seasons — summer PCS cycles can tighten Abilene crew availability.',
    ],
  },
  randall: {
    marketNotes:
      'Randall County includes Canyon and growing suburban areas west of Amarillo, with moves often spanning the Potter–Randall metro.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Amarillo metro crews typically cover Randall and Potter counties; confirm service for Canyon and WTAMU-area addresses.',
    },
    tips: [
      'Verify coverage for both Randall and Potter counties if your move spans the Amarillo metro.',
      'Amarillo traffic and High Plains wind conditions affect scheduling — discuss weather holds upfront.',
      'Confirm insurance for high-value items and student housing moves near West Texas A&M.',
      'Book early for peak seasons — summer and university turnover can tighten Amarillo crew availability.',
      'Obtain multiple estimates — flat-rate and hourly quotes can vary between established Amarillo providers.',
    ],
  },
  grayson: {
    marketNotes:
      'Grayson County includes Sherman and Denison with residential and commercial moves along the US-75 corridor.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Sherman–Denison and Dallas regional crews typically cover Grayson County; confirm service for your address.',
    },
    tips: [
      'Verify coverage for Sherman, Denison, and surrounding Grayson County communities.',
      'Traffic on US-75 impacts scheduling — plan around peak commute windows through the Texoma corridor.',
      'Confirm insurance for high-value homes and lake properties near Lake Texoma.',
      'Book early for peak seasons — summer moves can tighten North Texas crew availability.',
      'Obtain multiple estimates — travel distance from Dallas or Texarkana can affect final pricing.',
    ],
  },
  ector: {
    marketNotes:
      'Ector County centers on Odessa with significant oilfield-related residential and workforce housing moves.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Odessa and Midland Permian Basin crews typically cover Ector County; confirm service for rural county parcels.',
    },
    tips: [
      'Oilfield traffic and activity impact scheduling — discuss crew availability around shift changes and rig traffic.',
      'Verify coverage for Odessa, West Odessa, and surrounding Ector County communities.',
      'Confirm insurance for high-value items and oilfield equipment stored at home.',
      'Book early for peak seasons — Permian Basin workforce turnover can tighten crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Odessa and Midland providers.',
    ],
  },
  parker: {
    marketNotes:
      'Parker County is part of the Dallas–Fort Worth metro with Weatherford as the hub for growing suburban and ranch properties.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Fort Worth and Dallas metro crews typically cover Parker County; confirm service for Weatherford and rural ranch addresses.',
    },
    tips: [
      'Verify coverage for Weatherford, Willow Park, and surrounding Parker County communities.',
      'Dallas-area traffic on I-20 and FM roads impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes and ranch properties common in Parker County.',
      'Book early for peak seasons — summer moves can tighten Fort Worth-area crew availability.',
      'Obtain multiple estimates — travel distance from Fort Worth or Dallas can affect final pricing.',
    ],
  },
  midland: {
    marketNotes:
      'Midland County centers on Midland with significant oilfield-related activity and workforce housing moves.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Midland local providers typically cover Midland County; confirm service for rural county parcels and oilfield housing.',
    },
    tips: [
      'Oilfield traffic and activity impact scheduling — discuss crew availability around shift changes and industrial routes.',
      'Verify coverage for Midland and surrounding Midland County communities.',
      'Confirm insurance for high-value items and specialty equipment before booking.',
      'Book early for peak seasons — Permian Basin workforce turnover can tighten Midland crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Midland and Odessa providers.',
    ],
  },
  guadalupe: {
    marketNotes:
      'Guadalupe County is part of the San Antonio–New Braunfels metro with growing residential development in Seguin and Schertz-area communities.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'San Antonio metro crews typically cover Guadalupe County; confirm service for Seguin and I-35 corridor addresses.',
    },
    tips: [
      'Verify coverage for Seguin, Schertz, and surrounding Guadalupe County communities.',
      'San Antonio-area traffic on I-35 and US-90 impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in newer Guadalupe County subdivisions.',
      'Book early for peak seasons — summer moves can tighten San Antonio-area crew availability.',
      'Obtain multiple estimates — travel distance from San Antonio or Austin can affect final pricing.',
    ],
  },
  comal: {
    marketNotes:
      'Comal County includes New Braunfels with significant residential growth, tourism influence, and Guadalupe River lake communities.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'San Antonio and New Braunfels-area crews typically cover Comal County; confirm service for lakefront and hill-country addresses.',
    },
    tips: [
      'Verify coverage for New Braunfels, Bulverde, and surrounding Comal County communities.',
      'San Antonio-area traffic on I-35 and SH-46 impacts scheduling — plan around peak commute and tourism seasons.',
      'Confirm insurance for high-value homes common in Comal County lake and hill-country communities.',
      'Book early for peak seasons — summer tourism and river-season moves can tighten crew availability.',
      'Obtain multiple estimates — travel distance from San Antonio or Austin can affect final pricing.',
    ],
  },
  kaufman: {
    marketNotes:
      'Kaufman County is part of the Dallas–Fort Worth metro with growing suburban residential development east of Dallas.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dallas metro crews typically cover Kaufman County; confirm service for Forney, Terrell, and rural county addresses.',
    },
    tips: [
      'Verify coverage for Kaufman, Forney, Terrell, and surrounding Dallas metro communities.',
      'Heavy traffic on I-20 and local roads impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in newer Kaufman County subdivisions.',
      'Book early for peak seasons — summer moves can tighten Dallas-area crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between metro providers.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County includes Cleburne with suburban growth along the southern Dallas–Fort Worth metro corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Fort Worth and Dallas metro crews typically cover Johnson County; confirm service for Cleburne and rural ranch addresses.',
    },
    tips: [
      'Verify coverage for Cleburne, Burleson-area fringe communities, and surrounding Johnson County.',
      'Dallas-area traffic on US-67 and I-35W impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes and ranch properties common in Johnson County.',
      'Book early for peak seasons — summer moves can tighten Fort Worth-area crew availability.',
      'Obtain multiple estimates — travel distance from Fort Worth or Dallas can affect final pricing.',
    ],
  },
  ellis: {
    marketNotes:
      'Ellis County includes Waxahachie with suburban growth along the I-35E corridor south of Dallas.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dallas metro crews typically cover Ellis County; confirm service for Waxahachie, Midlothian, and rural county addresses.',
    },
    tips: [
      'Verify coverage for Waxahachie, Midlothian, and surrounding Ellis County communities.',
      'Dallas-area traffic on I-35E and US-287 impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in newer Ellis County subdivisions.',
      'Book early for peak seasons — summer moves can tighten Dallas-area crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between metro providers.',
    ],
  },
  brazos: {
    marketNotes:
      'Brazos County includes Bryan and College Station with university-related moves tied to Texas A&M and growing residential demand.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Bryan–College Station local providers typically cover Brazos County; confirm service for student housing and rural parcels.',
    },
    tips: [
      'Verify coverage for Bryan, College Station, and surrounding Brazos County communities.',
      'University traffic and semester turnover impact scheduling — plan around move-in/move-out peaks.',
      'Confirm insurance for high-value homes and student housing moves near campus.',
      'Book early for peak seasons — August and May turnover can tighten College Station crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between local providers.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County includes Beaumont with industrial and residential moves across the Beaumont–Port Arthur metro.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Beaumont local providers typically cover Jefferson County; confirm service for Port Arthur fringe and rural county addresses.',
    },
    tips: [
      'Verify coverage for Beaumont, Nederland, and surrounding Jefferson County communities.',
      'Industrial traffic on I-10 and US-69 impacts scheduling — plan around shift-change and refinery corridor congestion.',
      'Confirm insurance for high-value items and industrial-area relocations.',
      'Book early for peak seasons — summer moves can tighten Beaumont crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Beaumont and Houston providers.',
    ],
  },
  smith: {
    marketNotes:
      'Smith County centers on Tyler with residential and commercial moves across the East Texas metro. (Not Tyler County — seat Woodville.)',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Tyler local providers typically cover Smith County; confirm service for rural county parcels outside city limits.',
    },
    tips: [
      'Verify coverage for Tyler, Whitehouse, and surrounding Smith County communities.',
      'Local traffic on Loop 323 and US-69 impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes and lake properties near Tyler.',
      'Book early for peak seasons — summer moves can tighten Tyler crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Tyler and Dallas providers.',
    ],
  },
  mclennan: {
    marketNotes:
      'McLennan County centers on Waco with residential and university-related moves tied to Baylor and growing Central Texas demand.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Waco local providers typically cover McLennan County; confirm service for Hewitt, Woodway, and rural county addresses.',
    },
    tips: [
      'Verify coverage for Waco, Hewitt, and surrounding McLennan County communities.',
      'University traffic and semester turnover impact scheduling — plan around Baylor move-in/move-out peaks.',
      'Confirm insurance for high-value homes and student housing moves near campus.',
      'Book early for peak seasons — August and May turnover can tighten Waco crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between local providers.',
    ],
  },
  webb: {
    marketNotes:
      'Webb County centers on Laredo with border-related residential moves and cross-border logistics considerations.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Laredo local providers typically cover Webb County; confirm service for rural ranch addresses and border-adjacent communities.',
    },
    tips: [
      'Verify coverage for Laredo and surrounding Webb County communities.',
      'Border traffic on I-35 and international bridge corridors impacts scheduling — plan around peak crossing windows.',
      'Confirm insurance for high-value homes and cross-border relocation paperwork if applicable.',
      'Book early for peak seasons — summer moves can tighten Laredo crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between local providers.',
    ],
  },
  hays: {
    marketNotes:
      'Hays County includes San Marcos with university and suburban growth along the Austin–San Antonio I-35 corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Austin and San Antonio metro crews typically cover Hays County; confirm service for Kyle, Buda, and Dripping Springs addresses.',
    },
    tips: [
      'Verify coverage for San Marcos, Kyle, Buda, and surrounding Hays County communities.',
      'Austin-area traffic on I-35 and SH-45 impacts scheduling — plan around peak commute and university turnover.',
      'Confirm insurance for high-value homes common in newer Hays County subdivisions.',
      'Book early for peak seasons — Texas State semester turnover and summer growth can tighten crew availability.',
      'Obtain multiple estimates — travel distance from Austin or San Antonio can affect final pricing.',
    ],
  },
  lubbock: {
    marketNotes:
      'Lubbock County centers on Lubbock with university and residential moves tied to Texas Tech and South Plains growth.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Lubbock local providers typically cover Lubbock County; confirm service for rural county parcels and ranch properties.',
    },
    tips: [
      'Verify coverage for Lubbock, Slaton, and surrounding Lubbock County communities.',
      'University traffic and semester turnover impact scheduling — plan around Texas Tech move-in/move-out peaks.',
      'Confirm insurance for high-value homes and ranch properties common in Lubbock County.',
      'Book early for peak seasons — August turnover can tighten Lubbock crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between local providers.',
    ],
  },
  nueces: {
    marketNotes:
      'Nueces County centers on Corpus Christi with coastal and residential moves across the Coastal Bend metro.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Corpus Christi local providers typically cover Nueces County; confirm service for Padre Island, Portland, and coastal addresses.',
    },
    tips: [
      'Coastal properties require specialized planning — confirm bridge access, humidity protection, and parking for island moves.',
      'Verify coverage for Corpus Christi, Portland, and surrounding Nueces County communities.',
      'Confirm insurance for high-value homes and coastal property relocations.',
      'Book early for peak seasons — summer coastal moves can tighten Corpus Christi crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Coastal Bend providers.',
    ],
  },
  galveston: {
    marketNotes:
      'Galveston County includes Galveston Island with coastal residential moves and Houston metro spillover along the Gulf Coast.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Houston metro crews typically cover Galveston County; confirm service for island addresses, causeway timing, and mainland communities.',
    },
    tips: [
      'Coastal properties require specialized planning — confirm causeway access, flood-zone logistics, and humidity protection for island moves.',
      'Verify coverage for Galveston Island, League City, and mainland Galveston County communities.',
      'Confirm insurance for high-value homes and historic district relocations on the island.',
      'Book early for peak seasons — summer tourism and hurricane-season prep can tighten Gulf Coast crew availability.',
      'Obtain multiple estimates — Houston and coastal providers may price island routes differently.',
    ],
  },
  bell: {
    marketNotes:
      'Bell County includes Killeen with significant military-related moves tied to Fort Cavazos and Temple–Belton suburban growth.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Killeen–Temple local providers typically cover Bell County; confirm service for on-base access, PCS timelines, and rural addresses.',
    },
    tips: [
      'Military moves require specific experience — confirm PCS paperwork, base access, and tight timeline handling.',
      'Verify coverage for Killeen, Temple, Belton, and surrounding Bell County communities.',
      'Confirm insurance for high-value homes and military household goods coverage requirements.',
      'Book early for peak seasons — summer PCS season can tighten Killeen-area crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Killeen and Waco providers.',
    ],
  },
  brazoria: {
    marketNotes:
      'Brazoria County includes coastal and suburban areas with growing residential development south of Houston along the Gulf Coast.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Houston metro crews typically cover Brazoria County; confirm service for Pearland, Lake Jackson, and coastal fringe addresses.',
    },
    tips: [
      'Coastal properties require specialized planning — confirm flood-zone logistics and humidity protection for waterfront moves.',
      'Verify coverage for Angleton, Pearland, Lake Jackson, and surrounding Brazoria County communities.',
      'Confirm insurance for high-value homes common in newer Brazoria County subdivisions.',
      'Book early for peak seasons — summer moves and hurricane-season prep can tighten Houston-area crew availability.',
      'Obtain multiple estimates — Houston metro providers may price south-county routes differently.',
    ],
  },
  cameron: {
    marketNotes:
      'Cameron County includes Brownsville with border-related residential and commercial moves across the Rio Grande Valley metro.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'Brownsville local providers typically cover Cameron County; confirm service for Harlingen fringe and rural Rio Grande Valley addresses.',
    },
    tips: [
      'Border traffic on I-69E and international bridge corridors impacts scheduling — plan around peak crossing windows.',
      'Verify coverage for Brownsville, Harlingen fringe, and surrounding Cameron County communities.',
      'Confirm insurance for high-value homes and cross-border relocation paperwork if applicable.',
      'Book early for peak seasons — summer moves can tighten Rio Grande Valley crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Brownsville and McAllen providers.',
    ],
  },
  williamson: {
    marketNotes:
      'Williamson County includes Georgetown and Round Rock with strong suburban growth along the Austin–Round Rock metro corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Austin metro crews typically cover Williamson County; confirm service for Cedar Park, Leander, and rural county addresses.',
    },
    tips: [
      'Verify coverage for Georgetown, Round Rock, Cedar Park, and surrounding Williamson County communities.',
      'Austin-area traffic on I-35 and SH-130 impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in newer Williamson County subdivisions.',
      'Book early for peak seasons — summer growth and tech-corridor turnover can tighten Austin-area crew availability.',
      'Obtain multiple estimates — travel distance from Austin or San Antonio can affect final pricing.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County includes Conroe and The Woodlands with rapid suburban growth north of Houston along the I-45 corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Houston metro crews typically cover Montgomery County; confirm service for Conroe, The Woodlands, and lake-community addresses.',
    },
    tips: [
      'Verify coverage for Conroe, The Woodlands, Magnolia, and surrounding Montgomery County communities.',
      'Houston-area traffic on I-45 and the Grand Parkway impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in The Woodlands and newer Montgomery County subdivisions.',
      'Book early for peak seasons — summer moves can tighten north-Houston crew availability.',
      'Obtain multiple estimates — Houston metro providers may price north-county routes differently.',
    ],
  },
  'el-paso': {
    marketNotes:
      'El Paso County centers on El Paso with significant military moves tied to Fort Bliss and border-related residential relocations.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'El Paso local providers typically cover El Paso County; confirm service for on-base access, PCS timelines, and Upper Valley addresses.',
    },
    tips: [
      'Military moves require specific experience — confirm PCS paperwork, Fort Bliss base access, and tight timeline handling.',
      'Verify coverage for El Paso, Socorro, and surrounding El Paso County communities.',
      'Border traffic on I-10 and international bridge corridors impacts scheduling — plan around peak crossing windows.',
      'Confirm insurance for high-value homes and military household goods coverage requirements.',
      'Book early for peak seasons — summer PCS season can tighten El Paso crew availability.',
    ],
  },
  hidalgo: {
    marketNotes:
      'Hidalgo County is a major South Texas market centered on McAllen, Edinburg, and Mission with significant residential and cross-border activity.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,200',
      avgHourly: '$95–$135/hr for a 2-person crew',
      note: 'McAllen–Edinburg local providers typically cover Hidalgo County; confirm service for Mission, Weslaco, and rural Rio Grande Valley addresses.',
    },
    tips: [
      'Border traffic on US-83 and international bridge corridors frequently impacts scheduling — plan around peak crossing windows.',
      'Verify explicit service coverage across Hidalgo County including Edinburg, McAllen, and Mission.',
      'Confirm insurance for high-value homes and cross-border relocation paperwork if applicable.',
      'Book early for peak seasons — summer moves can tighten Rio Grande Valley crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between McAllen and Brownsville providers.',
    ],
  },
  'fort-bend': {
    marketNotes:
      'Fort Bend County is a fast-growing suburban county with significant residential development in Sugar Land, Richmond, and Missouri City.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Houston metro crews typically cover Fort Bend County; confirm service for Sugar Land, Katy fringe, and master-planned community addresses.',
    },
    tips: [
      'Verify coverage for Sugar Land, Richmond, Rosenberg, and surrounding Fort Bend County communities.',
      'Houston-area traffic on US-59 and the Grand Parkway impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in Fort Bend County subdivisions.',
      'Book early for peak seasons — summer moves can tighten southwest-Houston crew availability.',
      'Obtain multiple estimates — Houston metro providers may price Fort Bend routes differently.',
    ],
  },
  denton: {
    marketNotes:
      'Denton County includes Denton and Lewisville with strong suburban and university-related growth along the northern Dallas–Fort Worth corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dallas and Fort Worth metro crews typically cover Denton County; confirm service for UNT-area student housing and rural county parcels.',
    },
    tips: [
      'Verify coverage for Denton, Lewisville, Flower Mound, and surrounding Denton County communities.',
      'Dallas-area traffic on I-35E and the Sam Rayburn Tollway impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in newer Denton County subdivisions.',
      'Book early for peak seasons — university turnover and summer growth can tighten north-metro crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Dallas and Fort Worth providers.',
    ],
  },
  collin: {
    marketNotes:
      'Collin County is one of the fastest-growing counties in the U.S., with major suburban development in Plano, Frisco, and McKinney.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dallas metro crews typically cover Collin County; confirm service for Plano, Frisco, Allen, and high-growth master-planned communities.',
    },
    tips: [
      'Verify coverage for McKinney, Plano, Frisco, Allen, and surrounding Collin County communities.',
      'Dallas-area traffic on US-75 and the Dallas North Tollway impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in Collin County subdivisions.',
      'Book early for peak seasons — rapid growth can tighten north-Dallas crew availability year-round.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Dallas and Fort Worth providers.',
    ],
  },
  travis: {
    marketNotes:
      'Travis County centers on Austin with high residential growth, university influence, and tech-driven demand. (Not Austin County — seat Bellville.)',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Austin metro crews typically cover Travis County; confirm service for downtown high-rises, student housing, and Hill Country fringe addresses.',
    },
    tips: [
      'Verify coverage for Austin, Lakeway, Bee Cave, and surrounding Travis County communities.',
      'Heavy traffic on I-35, MoPac, and SH-130 impacts scheduling — plan around peak commute and event traffic.',
      'Confirm insurance for high-value homes common in Travis County tech-corridor neighborhoods.',
      'Book early for peak seasons — summer turnover and SXSW-era demand can tighten Austin crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary significantly between Austin providers.',
    ],
  },
  bexar: {
    marketNotes:
      'Bexar County centers on San Antonio with major military demand tied to Joint Base San Antonio and steady residential growth.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'San Antonio local providers typically cover Bexar County; confirm service for JBSA base access, PCS timelines, and suburban county addresses.',
    },
    tips: [
      'Military moves require specific experience — confirm PCS paperwork, JBSA base access, and tight timeline handling.',
      'Verify coverage for San Antonio, Alamo Heights, and surrounding Bexar County communities.',
      'Confirm insurance for high-value homes and military household goods coverage requirements.',
      'Book early for peak seasons — summer PCS season can tighten San Antonio crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between San Antonio and Austin providers.',
    ],
  },
  tarrant: {
    marketNotes:
      'Tarrant County centers on Fort Worth with major residential and commercial activity across Arlington, Mansfield, and the western Dallas–Fort Worth metro.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Fort Worth and Dallas metro crews typically cover Tarrant County; confirm service for Arlington, Keller, and suburban county addresses.',
    },
    tips: [
      'Verify coverage for Fort Worth, Arlington, Mansfield, and surrounding Tarrant County communities.',
      'Heavy traffic on I-30, I-20, and the Chisholm Trail Parkway impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes common in Tarrant County subdivisions.',
      'Book early for peak seasons — summer moves can tighten Fort Worth-area crew availability.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary between Fort Worth and Dallas providers.',
    ],
  },
  dallas: {
    marketNotes:
      'Dallas County is a major urban center with extensive residential, commercial, and high-volume moving demand across Dallas and inner-ring suburbs.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Dallas metro crews typically cover Dallas County; confirm service for high-rise condos, historic neighborhoods, and urban parking logistics.',
    },
    tips: [
      'Verify coverage for Dallas, Irving, Garland, and surrounding Dallas County communities.',
      'Heavy traffic on I-35E, I-30, and the Dallas North Tollway impacts scheduling — plan around peak commute windows.',
      'Confirm insurance for high-value homes and condo building move-in/move-out requirements.',
      'Book early for peak seasons — high-volume demand can tighten Dallas crew availability year-round.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary significantly between Dallas providers.',
    ],
  },
  harris: {
    marketNotes:
      'Harris County is the most populous county in Texas, centered on Houston with extensive residential, commercial, and industrial moving demand. (Not Houston County — seat Crockett.)',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Houston metro crews typically cover Harris County; confirm service for high-rises, townhomes, and flood-zone logistics across the county.',
    },
    tips: [
      'Verify coverage for Houston, Pasadena, Katy, and surrounding Harris County communities.',
      'Heavy traffic on I-10, I-45, and the 610 Loop impacts scheduling — plan around peak commute and port-industrial corridor congestion.',
      'Confirm insurance for high-value homes and high-rise building move requirements.',
      'Book early for peak seasons — Harris County\'s volume can tighten Houston crew availability year-round.',
      'Obtain multiple estimates — hourly and flat-rate quotes can vary significantly between Houston providers.',
    ],
  },
  atascosa: {
    marketNotes:
      'Atascosa County is rural south of San Antonio with ranch properties around Jourdanton and Pleasanton.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio regional providers may add travel fees for Jourdanton, Pleasanton, and remote Atascosa County ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size and shuttle plans for long gravel driveways.',
      'Verify explicit regional service to Jourdanton and Pleasanton before booking.',
      'Storage is very limited locally; San Antonio warehouse options are typical when closing dates do not align.',
      'Obtain multiple estimates from San Antonio providers — ranch moves often need supplemental labor.',
      'Confirm credentials for ranch moves and discuss handling for barn tools and detached outbuildings.',
    ],
  },
  wilson: {
    marketNotes:
      'Wilson County is rural south of San Antonio with Floresville as the hub.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio regional providers may add travel fees for Floresville and remote Wilson County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss unpaved driveways before move day.',
      'Verify explicit regional service to Floresville before booking.',
      'Storage is very limited in Wilson County; San Antonio facilities are the practical option.',
      'Obtain multiple estimates — ranch and outbuilding contents can change crew requirements.',
      'Confirm credentials for ranch moves and verify insurance for farm equipment.',
    ],
  },
  kendall: {
    marketNotes:
      'Kendall County is Hill Country with Boerne as the hub.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio regional crews may add travel fees for Boerne and remote Kendall County Hill Country properties.',
    },
    tips: [
      'Remote Hill Country properties have access challenges — confirm truck access on winding ranch roads.',
      'Verify explicit regional service to Boerne before booking.',
      'Storage is very limited locally; San Antonio warehouse options are typical.',
      'Obtain multiple estimates — Hill Country moves can require supplemental labor.',
      'Confirm credentials for ranch moves and discuss handling for lake and ranch properties.',
    ],
  },
  kerr: {
    marketNotes:
      'Kerr County is Hill Country with Kerrville as the hub.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Kerrville regional providers may add travel fees for remote Kerr County ranch and lake properties.',
    },
    tips: [
      'Remote Hill Country properties have access challenges — confirm access for Guadalupe River and ranch-country homes.',
      'Verify explicit regional service to Kerrville before booking.',
      'Storage is very limited in Kerr County; San Antonio or Kerrville-area facilities are typical.',
      'Obtain multiple estimates — regional travel time can affect hourly pricing.',
      'Confirm credentials for ranch moves and ask about experience with Hill Country access roads.',
    ],
  },
  burnet: {
    marketNotes:
      'Burnet County is Austin Hill Country with lakes and ranch properties.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Austin regional providers may add travel fees for Burnet and remote Highland Lakes ranch properties.',
    },
    tips: [
      'Lake and Hill Country properties have access challenges — confirm dock and lakefront logistics if applicable.',
      'Verify explicit regional service to Burnet before booking.',
      'Storage is very limited locally; Austin warehouse options are typical.',
      'Obtain multiple estimates — lake and ranch moves can require supplemental labor.',
      'Confirm credentials for lake and ranch moves and discuss humidity protection for waterfront homes.',
    ],
  },
  caldwell: {
    marketNotes:
      'Caldwell County lies on the Austin–San Antonio corridor with Lockhart as the seat.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Austin and San Antonio regional crews may add travel fees for Lockhart and rural Caldwell County ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss equipment needs early.',
      'Verify explicit regional service to Lockhart before booking.',
      'Storage is very limited in Caldwell County; Austin or San Antonio facilities are typical.',
      'Obtain multiple estimates from both Austin and San Antonio providers.',
      'Confirm credentials for ranch moves and verify insurance for detached structures.',
    ],
  },
  navarro: {
    marketNotes:
      'Navarro County is on the DFW fringe with Corsicana as the hub.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Dallas and Waco regional providers may add travel fees for Corsicana and rural Navarro County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access on county roads.',
      'Verify explicit regional service to Corsicana before booking.',
      'Storage is very limited locally; Dallas or Waco warehouse options are typical.',
      'Obtain multiple estimates — Dallas and Waco crews may price Navarro routes differently.',
      'Confirm credentials for ranch moves and discuss handling for agricultural outbuildings.',
    ],
  },
  cherokee: {
    marketNotes:
      'Cherokee County is rural East Texas with Jacksonville influence.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lufkin and Tyler regional providers may add travel fees for Rusk, Jacksonville, and deep Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads.',
      'Verify explicit regional service to Rusk and Jacksonville before booking.',
      'Storage is very limited in Cherokee County; Lufkin or Tyler facilities are typical.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing.',
      'Confirm credentials for rural moves and ask about Piney Woods access experience.',
    ],
  },
  rusk: {
    marketNotes:
      'Rusk County is rural East Texas with Henderson as the seat.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Longview and Tyler regional providers may add travel fees for Henderson and rural Rusk County properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm truck access for timber-country homes.',
      'Verify explicit regional service to Henderson before booking.',
      'Storage is very limited in Rusk County; Longview or Tyler facilities are typical.',
      'Obtain multiple estimates — regional travel time can affect hourly pricing in thin markets.',
      'Confirm credentials for rural moves and verify insurance limits for lake properties.',
    ],
  },
  polk: {
    marketNotes:
      'Polk County is rural East Texas with Livingston as the seat.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lufkin and Beaumont regional providers may add travel fees for Livingston and deep East Texas lake properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for lake-country homes.',
      'Verify explicit regional service to Livingston before booking.',
      'Storage is very limited in Polk County; Lufkin or Beaumont facilities are typical.',
      'Obtain multiple estimates — lake and ranch moves can require supplemental labor.',
      'Confirm credentials for rural moves and ask about experience with forest-access roads.',
    ],
  },
  'san-augustine': {
    marketNotes:
      'San Augustine County is one of Texas\'s least populous in Deep East Texas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lufkin and Nacogdoches regional providers may add travel fees for San Augustine and deep Piney Woods properties.',
    },
    tips: [
      'Extremely remote East Texas properties have severe access challenges — confirm access for timber roads and lake homes.',
      'Verify explicit regional service to San Augustine before booking.',
      'Storage is very limited in San Augustine County; Lufkin or Nacogdoches facilities are typical.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing.',
      'Confirm credentials for rural moves, including USDOT/MC verification on FMCSA.gov.',
    ],
  },
  castro: {
    marketNotes:
      'Castro County is rural Panhandle.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Dimmitt and remote Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for Panhandle wind and dust exposure.',
      'Verify explicit regional service to Dimmitt before booking.',
      'Storage is very limited in Castro County; Amarillo or Lubbock facilities are typical.',
      'Obtain multiple estimates — ranch moves often need supplemental labor beyond standard quotes.',
      'Confirm credentials for ranch moves and discuss handling for agricultural outbuildings.',
    ],
  },
  dallam: {
    marketNotes:
      'Dallam County is rural Panhandle with Dalhart as the hub.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo regional providers may add travel fees for Dalhart and remote northwest Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss wind, dust, and long gravel driveways.',
      'Verify explicit regional service to Dalhart before booking.',
      'Storage is very limited in Dallam County; Amarillo warehouse options are typical.',
      'Obtain multiple estimates from Amarillo providers — ranch moves can change crew size requirements.',
      'Confirm credentials for ranch moves and verify insurance for farm equipment.',
    ],
  },
  lamb: {
    marketNotes:
      'Lamb County is rural Panhandle.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Amarillo regional providers may add travel fees for Littlefield and remote Panhandle ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access on county roads.',
      'Verify explicit regional service to Littlefield before booking.',
      'Storage is very limited in Lamb County; Lubbock or Amarillo facilities are typical.',
      'Obtain multiple estimates — Lubbock and Amarillo crews may price Lamb County routes differently.',
      'Confirm credentials for ranch moves and discuss handling for agricultural outbuildings.',
    ],
  },
  motley: {
    marketNotes:
      'Motley County is one of Texas\'s least populous in the Panhandle.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Amarillo regional providers may add travel fees for Matador and remote Motley County ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss equipment needs for thin-market counties.',
      'Verify explicit regional service to Matador before booking.',
      'Storage is very limited in Motley County; Lubbock or Amarillo facilities are typical.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing.',
      'Confirm credentials for ranch moves, including USDOT/MC verification on FMCSA.gov.',
    ],
  },
  swisher: {
    marketNotes:
      'Swisher County is rural Panhandle with Tulia as the seat.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo and Lubbock regional providers may add travel fees for Tulia and remote Swisher County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size and shuttle plans.',
      'Verify explicit regional service to Tulia before booking.',
      'Storage is very limited in Swisher County; Amarillo or Lubbock facilities are typical.',
      'Obtain multiple estimates from Amarillo and Lubbock providers.',
      'Confirm credentials for ranch moves and verify insurance for detached structures.',
    ],
  },
  roberts: {
    marketNotes:
      'Roberts County is one of Texas\'s least populous in the Panhandle.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Amarillo regional providers may add travel fees for Miami and remote Roberts County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm access for one of Texas\'s least populous counties.',
      'Verify explicit regional service to Miami before booking.',
      'Storage is very limited in Roberts County; Amarillo warehouse options are typical.',
      'Obtain multiple estimates — thin-market travel time can materially affect hourly pricing.',
      'Confirm credentials for ranch moves, including USDOT/MC verification on FMCSA.gov.',
    ],
  },
  winkler: {
    marketNotes:
      'Winkler County is Permian Basin oilfield area.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Odessa and Midland regional providers may add travel fees for Kermit and remote Permian Basin ranch and oilfield properties.',
    },
    tips: [
      'Extremely remote ranch and oilfield properties have severe access challenges — discuss equipment and road conditions.',
      'Verify explicit regional service to Kermit before booking.',
      'Storage is very limited in Winkler County; Odessa or Midland facilities are typical.',
      'Obtain multiple estimates — Permian Basin crews may price Winkler routes differently.',
      'Confirm credentials for ranch moves and verify insurance for oilfield-area relocations.',
    ],
  },
  terrell: {
    marketNotes:
      'Terrell County is one of Texas\'s least populous in Far West Texas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Del Rio and Alpine regional providers may add travel fees for Sanderson and remote Big Bend fringe properties.',
    },
    tips: [
      'Extremely remote Far West Texas properties have severe access challenges — confirm truck access on desert ranch roads.',
      'Verify explicit regional service to Sanderson before booking.',
      'Storage is very limited in Terrell County; Del Rio or Alpine facilities are typical.',
      'Obtain multiple estimates — deep-county travel time can materially affect hourly pricing.',
      'Confirm credentials for ranch moves and discuss desert heat and access logistics.',
    ],
  },
  yoakum: {
    marketNotes:
      'Yoakum County is rural South Plains.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock regional providers may add travel fees for Plains and remote Yoakum County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck size for South Plains wind exposure.',
      'Verify explicit regional service to Plains before booking.',
      'Storage is very limited in Yoakum County; Lubbock warehouse options are typical.',
      'Obtain multiple estimates from Lubbock providers — ranch moves can change labor requirements.',
      'Confirm credentials for ranch moves and verify insurance for agricultural outbuildings.',
    ],
  },
  coleman: {
    marketNotes:
      'Coleman County is rural Central Texas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Abilene and San Angelo regional providers may add travel fees for Coleman and remote Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss unpaved driveways before move day.',
      'Verify explicit regional service to Coleman before booking.',
      'Storage is very limited in Coleman County; Abilene or San Angelo facilities are typical.',
      'Obtain multiple estimates — Abilene and San Angelo crews may price Coleman routes differently.',
      'Confirm credentials for ranch moves and verify insurance for farm equipment.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County is rural Central Texas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Waco and Abilene regional providers may add travel fees for Hamilton and remote Central Texas ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access on county roads.',
      'Verify explicit regional service to Hamilton before booking.',
      'Storage is very limited in Hamilton County; Waco or Abilene facilities are typical.',
      'Obtain multiple estimates — Waco and Abilene crews may price Hamilton routes differently.',
      'Confirm credentials for ranch moves and discuss handling for agricultural outbuildings.',
    ],
  },
  mcculloch: {
    marketNotes:
      'McCulloch County is rural Central Texas with Brady as the seat.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Angelo and Abilene regional providers may add travel fees for Brady and remote McCulloch County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss equipment needs for Heart of Texas ranch country.',
      'Verify explicit regional service to Brady before booking.',
      'Storage is very limited in McCulloch County; San Angelo or Abilene facilities are typical.',
      'Obtain multiple estimates — regional travel time can affect hourly pricing.',
      'Confirm credentials for ranch moves and verify insurance for detached structures.',
    ],
  },
  jack: {
    marketNotes:
      'Jack County is rural North Central Texas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Wichita Falls and Fort Worth regional providers may add travel fees for Jacksboro and remote Jack County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm truck access on county roads.',
      'Verify explicit regional service to Jacksboro before booking.',
      'Storage is very limited in Jack County; Wichita Falls or Fort Worth facilities are typical.',
      'Obtain multiple estimates — Wichita Falls and Fort Worth crews may price Jack routes differently.',
      'Confirm credentials for ranch moves and verify insurance for farm equipment.',
    ],
  },
  kent: {
    marketNotes:
      'Kent County is one of Texas\'s least populous in West Texas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Lubbock and Abilene regional providers may add travel fees for Jayton and remote Kent County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm access for one of Texas\'s least populous counties.',
      'Verify explicit regional service to Jayton before booking.',
      'Storage is very limited in Kent County; Lubbock or Abilene facilities are typical.',
      'Obtain multiple estimates — thin-market travel time can materially affect hourly pricing.',
      'Confirm credentials for ranch moves, including USDOT/MC verification on FMCSA.gov.',
    ],
  },
  'live-oak': {
    marketNotes:
      'Live Oak County is rural South Texas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Corpus Christi and San Antonio regional providers may add travel fees for George West and remote Live Oak County ranch properties.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — discuss unpaved driveways before move day.',
      'Verify explicit regional service to George West before booking.',
      'Storage is very limited in Live Oak County; Corpus Christi or San Antonio facilities are typical.',
      'Obtain multiple estimates — Coastal Bend and San Antonio crews may price Live Oak routes differently.',
      'Confirm credentials for ranch moves and verify insurance for detached structures.',
    ],
  },
  mcmullen: {
    marketNotes:
      'McMullen County is one of Texas\'s least populous in South Texas.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$5,000+',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'San Antonio and Corpus Christi regional providers may add travel fees for Tilden and remote McMullen County ranch routes.',
    },
    tips: [
      'Extremely remote ranch properties have severe access challenges — confirm access for one of Texas\'s least populous counties.',
      'Verify explicit regional service to Tilden before booking.',
      'Storage is very limited in McMullen County; San Antonio or Corpus Christi facilities are typical.',
      'Obtain multiple estimates — thin-market travel time can materially affect hourly pricing.',
      'Confirm credentials for ranch moves, including USDOT/MC verification on FMCSA.gov.',
    ],
  },
};

export function getTexasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return texasCountyResearch[countySlug];
}