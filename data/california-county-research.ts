import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Grok Heavy–researched county content overrides templated SEO sections */
export const californiaCountyResearch: Record<string, CuratedCountyResearch> = {
  alameda: {
    marketNotes:
      'Alameda County is a major Bay Area county with dense urban (Oakland, Berkeley) and suburban areas. Moves often involve high-rises, apartments, and family homes with strong local options.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Oakland, Berkeley, and Fremont moves often reflect elevator reservations, Bay Bridge traffic, and high-value urban handling.',
    },
    tips: [
      'Many buildings require elevator reservations and certificates of insurance.',
      'Heavy traffic on I-880, I-580, and Bay Bridge approaches.',
      'Verify coverage for Oakland, Berkeley, Fremont, and Hayward.',
      'Confirm insurance for high-value urban items.',
      'Book early for peak seasons.',
    ],
  },
  alpine: {
    marketNotes:
      "Alpine County is California's least populous and most rural county in the Sierra Nevada. Moves are extremely limited and primarily residential/seasonal with regional support from Carson City, NV or South Lake Tahoe.",
    costs: {
      studioRange: '$500–$1,000+',
      familyRange: '$1,800–$4,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Markleeville and remote Alpine County moves often reflect mountain access roads, winter weather, and travel from Tahoe or Sacramento crews.',
    },
    tips: [
      'Mountain and remote properties have severe access challenges, especially in winter.',
      'Verify explicit regional service to Markleeville.',
      'Storage is extremely limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for high-altitude/rural moves.',
    ],
  },
  amador: {
    marketNotes:
      'Amador County is rural Gold Country with Jackson and Sutter Creek. Moves are primarily residential with regional support from Sacramento.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Jackson and Sutter Creek moves often reflect historic-property handling, foothill access, and travel from Sacramento metro crews.',
    },
    tips: [
      'Historic Gold Country properties require preservation-sensitive handling.',
      'Rural and foothill areas have access challenges.',
      'Verify regional service to Jackson.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  butte: {
    marketNotes:
      'Butte County includes Chico and Oroville with university (Chico State) and rural areas. Moves often involve residential and student properties with regional Northern California support.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Chico and Oroville moves often reflect university calendar peaks, rural foothill access, and travel from Sacramento regional crews.',
    },
    tips: [
      'University calendar affects seasonal demand in Chico.',
      'Rural and foothill properties have access challenges.',
      'Verify coverage for Chico and Oroville.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  calaveras: {
    marketNotes:
      'Calaveras County is rural Gold Country with Angels Camp. Moves are primarily residential with regional support from Stockton or Sacramento.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Angels Camp and San Andreas moves often reflect foothill access roads and travel from Stockton or Sacramento metro crews.',
    },
    tips: [
      'Rural and foothill properties have access challenges.',
      'Verify regional service to Angels Camp.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  colusa: {
    marketNotes:
      'Colusa County is one of California\'s most rural agricultural counties. Moves are limited and primarily residential with regional support from Sacramento or Chico.',
    costs: {
      studioRange: '$400–$800',
      familyRange: '$1,400–$3,000',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Colusa and rural agricultural moves often reflect equipment-handling needs, limited local crews, and travel from Sacramento or Chico.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify regional service to Colusa.',
      'Storage is limited locally.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  'contra-costa': {
    marketNotes:
      'Contra Costa County is a large suburban county with Walnut Creek, Concord, and Antioch. Moves often involve family homes and commuter properties.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$135–$200/hr for a 2-person crew',
      note: 'Walnut Creek, Concord, and Antioch moves often reflect HOA move-in rules, I-680 traffic, and high-value suburban home handling.',
    },
    tips: [
      'Many HOAs have strict move-in rules.',
      'Heavy traffic on I-680 and Highway 4.',
      'Verify coverage for Walnut Creek, Concord, and Antioch.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons.',
    ],
  },
  'del-norte': {
    marketNotes:
      'Del Norte County is remote coastal with Crescent City. Moves are limited and primarily residential with regional support from Eureka or Medford, OR.',
    costs: {
      studioRange: '$500–$1,000+',
      familyRange: '$1,800–$4,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Crescent City and coastal Del Norte moves often reflect remote access, limited local crews, and travel from Eureka or regional North Coast providers.',
    },
    tips: [
      'Coastal and remote properties have access challenges.',
      'Verify explicit regional service to Crescent City.',
      'Storage is limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for remote moves.',
    ],
  },
  'el-dorado': {
    marketNotes:
      'El Dorado County is suburban/rural in the Sierra foothills with Placerville and South Lake Tahoe influence. Moves often involve residential and lake properties with regional Sacramento support.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Placerville and Tahoe-area moves often reflect foothill access, lake-property handling, and travel from Sacramento or Tahoe regional crews.',
    },
    tips: [
      'Foothill and lake properties have access challenges.',
      'Verify regional service to Placerville and South Lake Tahoe areas.',
      'Obtain multiple estimates.',
      'Confirm credentials for rural moves.',
      'Book early for seasonal Tahoe demand.',
    ],
  },
  fresno: {
    marketNotes:
      'Fresno County is a major Central Valley county with urban Fresno and agricultural areas. Moves often involve residential, farm, and corporate relocations.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,800',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Fresno and Clovis moves often reflect agricultural-property handling, Highway 99 traffic, and strong local mover competition.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify coverage for Fresno, Clovis, and surrounding areas.',
      'Heavy traffic on Highway 99 and 41.',
      'Obtain multiple estimates.',
      'Confirm insurance for high-value items.',
    ],
  },
  glenn: {
    marketNotes:
      'Glenn County is one of California\'s most rural agricultural counties with Willows. Moves are limited and primarily residential with regional support from Chico or Sacramento.',
    costs: {
      studioRange: '$400–$800',
      familyRange: '$1,400–$3,000',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Willows and rural Glenn County moves often reflect agricultural access roads and travel from Chico or Sacramento crews.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify regional service to Willows.',
      'Storage is limited locally.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  kern: {
    marketNotes:
      'Kern County is a major Central Valley county with Bakersfield and significant oil/agricultural activity. Moves often involve residential, farm, and industrial properties.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,800',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Bakersfield, Delano, and Taft moves often reflect agricultural and oil-field property handling, Highway 99 traffic, and strong local mover competition.',
    },
    tips: [
      'Agricultural and oil-related properties may require specialized equipment handling.',
      'Verify coverage for Bakersfield, Delano, and Taft.',
      'Heavy traffic on Highway 99 and I-5.',
      'Obtain multiple estimates.',
      'Confirm insurance for high-value items.',
    ],
  },
  kings: {
    marketNotes:
      'Kings County is rural/agricultural with Hanford and Lemoore (Naval Air Station). Moves often involve residential and military properties with regional support from Fresno.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Hanford and Lemoore moves often reflect military PCS timing, agricultural-property access, and travel from Fresno metro crews.',
    },
    tips: [
      'Military (Lemoore) moves require PCS experience.',
      'Agricultural properties may require equipment handling.',
      'Verify regional service to Hanford.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County is rural with Clear Lake and Lakeport. Moves often involve residential and lakeside properties with regional support from Santa Rosa or Sacramento.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lakeport and Clear Lake moves often reflect lakeside access, seasonal tourism peaks, and travel from Santa Rosa or Sacramento crews.',
    },
    tips: [
      'Lakeside properties require water-adjacent planning.',
      'Verify regional service to Lakeport.',
      'Obtain multiple estimates.',
      'Confirm credentials for lake moves.',
      'Seasonal tourism affects demand.',
    ],
  },
  humboldt: {
    marketNotes:
      'Humboldt County is remote coastal with Eureka and Arcata. Moves often involve residential, university (Cal Poly Humboldt), and forested properties with regional support from the North Coast.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,800–$4,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Eureka and Arcata moves often reflect coastal access, university calendar peaks, and limited local crew availability on the North Coast.',
    },
    tips: [
      'Coastal and forested properties have access challenges.',
      'Verify regional service to Eureka and Arcata.',
      'Storage is limited locally.',
      'Obtain multiple estimates.',
      'Confirm credentials for remote moves.',
    ],
  },
  imperial: {
    marketNotes:
      'Imperial County is desert/agricultural with El Centro and Calexico. Moves are primarily residential with regional support from San Diego or Yuma, AZ.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,500',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'El Centro and Calexico moves often reflect desert heat planning, agricultural-property handling, and travel from San Diego regional crews.',
    },
    tips: [
      'Desert heat requires planning for crew safety and equipment.',
      'Verify regional service to El Centro.',
      'Obtain multiple estimates.',
      'Confirm credentials for agricultural moves.',
      'Border areas may have additional logistics.',
    ],
  },
  inyo: {
    marketNotes:
      'Inyo County is one of California\'s most remote counties in the Eastern Sierra with Bishop and Death Valley. Moves are extremely limited and primarily residential with regional support from Reno or Bishop.',
    costs: {
      studioRange: '$500–$1,100+',
      familyRange: '$1,800–$4,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Bishop and Independence moves often reflect extreme remote access, high-desert terrain, and travel from Bishop or Reno regional crews.',
    },
    tips: [
      'Extremely remote and high-desert/mountain properties have severe access challenges.',
      'Verify explicit regional service to Bishop and Independence.',
      'Storage is very limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for remote/high-altitude moves.',
    ],
  },
  lassen: {
    marketNotes:
      'Lassen County is very remote with Susanville and significant federal land (Lassen Volcanic National Park). Moves are limited and primarily residential with regional support from Reno or Redding.',
    costs: {
      studioRange: '$500–$1,000+',
      familyRange: '$1,800–$4,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Susanville moves often reflect high-desert access challenges, limited local crews, and travel from Chico, Redding, or Reno regional providers.',
    },
    tips: [
      'Extremely remote properties have severe access challenges.',
      'Verify explicit regional service to Susanville.',
      'Storage is very limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for high-desert/remote moves.',
    ],
  },
  'los-angeles': {
    marketNotes:
      'Los Angeles County is the most populous county in the U.S. with extreme urban density, diverse neighborhoods, and world-class logistics challenges. Moves often involve high-rises, apartments, and sprawling residential areas.',
    costs: {
      studioRange: '$650–$1,600+',
      familyRange: '$2,800–$7,000+',
      avgHourly: '$130–$200/hr for a 2-person crew',
      note: 'LA moves often reflect high-rise elevator fees, freeway traffic, and neighborhood-specific building requirements across Downtown, Santa Monica, Pasadena, and Long Beach.',
    },
    tips: [
      'Most buildings require elevator reservations, move-in fees, and certificates of insurance.',
      'Traffic is extreme on all freeways; plan for peak avoidance.',
      'Verify coverage for specific areas (Downtown LA, Santa Monica, Pasadena, Long Beach, etc.).',
      'Confirm high-value insurance and building-specific expertise.',
      'Book well in advance for peak seasons.',
    ],
  },
  madera: {
    marketNotes:
      'Madera County is rural/agricultural with Madera and Yosemite influence. Moves often involve residential and farm properties with regional support from Fresno.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,500',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Madera and Chowchilla moves often reflect agricultural-property handling, Highway 99 traffic, and travel from Fresno regional crews.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify regional service to Madera.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  marin: {
    marketNotes:
      'Marin County is affluent suburban with San Rafael, Mill Valley, and Sausalito. Moves often involve high-value homes and bridge/ferry logistics to San Francisco.',
    costs: {
      studioRange: '$600–$1,300',
      familyRange: '$2,500–$5,500+',
      avgHourly: '$140–$200/hr for a 2-person crew',
      note: 'San Rafael, Novato, and Mill Valley moves often reflect Golden Gate Bridge traffic, HOA parking restrictions, and high-value home handling.',
    },
    tips: [
      'Golden Gate Bridge and ferry access require coordination.',
      'Many communities have HOA and parking restrictions.',
      'Heavy traffic on US 101 and Sir Francis Drake Boulevard.',
      'Verify coverage for San Rafael, Novato, and Mill Valley.',
      'Confirm high-value insurance coverage.',
    ],
  },
  mariposa: {
    marketNotes:
      'Mariposa County is small and rural with Yosemite National Park influence. Moves are limited and primarily residential/seasonal with regional support from Merced or Fresno.',
    costs: {
      studioRange: '$500–$1,000+',
      familyRange: '$1,800–$4,000+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Mariposa and Yosemite-adjacent moves often reflect seasonal access challenges, limited local crews, and travel from Merced or Fresno regional providers.',
    },
    tips: [
      'Yosemite-adjacent properties have seasonal and access challenges.',
      'Verify explicit regional service to Mariposa.',
      'Storage is limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for park/rural moves.',
    ],
  },
  mendocino: {
    marketNotes:
      'Mendocino County is coastal/rural with Ukiah and the Mendocino coast. Moves often involve residential, winery, and coastal properties with regional support from Santa Rosa.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,800–$4,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Ukiah and Mendocino coast moves often reflect coastal access, winery-property handling, and travel from Santa Rosa or North Coast regional crews.',
    },
    tips: [
      'Coastal and winery properties require specialized planning.',
      'Verify regional service to Ukiah and Mendocino.',
      'Obtain multiple estimates.',
      'Confirm credentials for remote coastal moves.',
      'Seasonal tourism affects demand.',
    ],
  },
  merced: {
    marketNotes:
      'Merced County is Central Valley agricultural with Merced and University of California, Merced. Moves often involve residential, university, and farm properties.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,600',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Merced and Los Banos moves often reflect university calendar peaks, agricultural-property handling, and travel from Fresno or Merced regional crews.',
    },
    tips: [
      'University calendar affects seasonal demand.',
      'Agricultural properties may require equipment handling.',
      'Verify coverage for Merced and Los Banos.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  modoc: {
    marketNotes:
      'Modoc County is one of California\'s most remote and least populated counties. Moves are extremely limited with regional support from Klamath Falls, OR or Redding.',
    costs: {
      studioRange: '$500–$1,100+',
      familyRange: '$1,800–$4,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Alturas moves often reflect extreme remote access, high-desert terrain, and travel from Redding, Chico, or Klamath Falls regional providers.',
    },
    tips: [
      'Extremely remote properties have severe access challenges.',
      'Verify explicit regional service to Alturas.',
      'Storage is very limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for high-desert/remote moves.',
    ],
  },
  mono: {
    marketNotes:
      'Mono County is remote Eastern Sierra with Mammoth Lakes and Bridgeport. Moves are limited and primarily residential/seasonal with regional support from Bishop or Reno.',
    costs: {
      studioRange: '$500–$1,100+',
      familyRange: '$1,800–$4,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Mammoth Lakes and Bridgeport moves often reflect high-altitude ski-resort access, seasonal peaks, and travel from Bishop or Reno regional crews.',
    },
    tips: [
      'High-altitude and ski resort properties have seasonal and access challenges.',
      'Verify explicit regional service to Mammoth Lakes.',
      'Storage is very limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for high-altitude moves.',
    ],
  },
  monterey: {
    marketNotes:
      'Monterey County includes Monterey, Carmel, and Salinas with tourism, agriculture, and military influence. Moves often involve coastal, residential, and seasonal properties.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Monterey, Carmel, and Salinas moves often reflect coastal sand protection, tourism-season peaks, and Presidio military relocation timing.',
    },
    tips: [
      'Coastal and Carmel properties require sand protection and access planning.',
      'Tourism season increases demand; book early.',
      'Verify coverage for Monterey, Salinas, and Carmel.',
      'Confirm insurance for high-value coastal homes.',
      'Military (Presidio) experience is beneficial.',
    ],
  },
  napa: {
    marketNotes:
      'Napa County is famous for wine country with Napa and Calistoga. Moves often involve residential, winery, and high-value properties with regional support from the Bay Area.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Napa and Calistoga moves often reflect winery-property handling, HOA restrictions, and travel from North Bay or Marin regional crews.',
    },
    tips: [
      'Winery and vineyard properties require specialized handling.',
      'Many areas have HOA and tourism-related rules.',
      'Verify coverage for Napa and Calistoga.',
      'Obtain multiple estimates.',
      'Confirm credentials for high-value homes.',
    ],
  },
  nevada: {
    marketNotes:
      'Nevada County is rural with Nevada City and Grass Valley. Moves often involve residential and historic properties with regional support from Sacramento.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Nevada City and Grass Valley moves often reflect Gold Country historic-property handling, foothill terrain access, and travel from Sacramento regional crews.',
    },
    tips: [
      'Historic Gold Country properties require preservation-sensitive handling.',
      'Foothill terrain creates access challenges.',
      'Verify coverage for Nevada City and Grass Valley.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
};

export function getCaliforniaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return californiaCountyResearch[countySlug];
}