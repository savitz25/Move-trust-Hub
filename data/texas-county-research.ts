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
};

export function getTexasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return texasCountyResearch[countySlug];
}