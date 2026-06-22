import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

export const texasCountyResearch: Record<string, CuratedCountyResearch> = {
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