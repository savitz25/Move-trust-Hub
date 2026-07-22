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
      'Alameda County (~1.64M) is the East Bay’s core contrast: dense Oakland/Berkeley urban stock and hills, I-880 southern corridor (Hayward–Fremont), City of Alameda island access, and Tri-Valley suburbs (Livermore, Pleasanton, Dublin). COI/elevators, steep driveways, Port of Oakland freight, UC Berkeley calendars, and 880/580/80/680/24 timing define many “local” jobs.',
    costs: {
      studioRange: '$650–$1,700+',
      familyRange: '$2,800–$7,500+',
      avgHourly: '$140–$215/hr for a 2-person crew',
      note: 'Hillside shuttles, elevator/COI soft costs, and Oakland ↔ Tri-Valley multi-freeway hauls push many quotes above base ranges.',
    },
    tips: [
      'Send building COI and elevator rules with the estimate for Oakland, Berkeley, and Emeryville multi-unit.',
      'Share driveway/approach photos for Oakland and Berkeley hills — full-size trucks often cannot reach the door.',
      'Treat Oakland/Berkeley ↔ Livermore/Pleasanton as a long East Bay local with honest portal-to-portal time.',
      'Avoid peak UC Berkeley move-in/out weeks when flexible; reserve elevator windows early.',
      'Build buffer near I-880 industrial corridors and Bay Bridge–influenced approaches.',
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
      'Contra Costa County (~1.17M) has a sharp West→Lamorinda→East County gradient: denser West/Central communities, affluent hillside Lamorinda towns, Walnut Creek/San Ramon cores, and fast-growing East County (Antioch, Brentwood). Strong inbound migration from SF/Oakland/Silicon Valley; canyon access, HOA tracts, BART-adjacent multi-unit stock, and I-680/SR-4/SR-24 timing define many “local” jobs.',
    costs: {
      studioRange: '$600–$1,600+',
      familyRange: '$2,800–$7,500+',
      avgHourly: '$135–$210/hr for a 2-person crew',
      note: 'Lamorinda hillside shuttles, HOA soft costs in San Ramon/East County, and West↔East multi-freeway hauls push many quotes above base ranges.',
    },
    tips: [
      'Share driveway/approach photos for Lafayette, Orinda, and Moraga — full-size trucks often cannot reach the door.',
      'Send HOA/COI packets for San Ramon Dougherty Valley and East County planned communities with the estimate.',
      'Treat West County ↔ East County as a long local with honest portal-to-portal time on I-680/SR-4.',
      'Confirm elevator rules for multi-unit near BART and Walnut Creek cores.',
      'Book peak spring/summer Saturdays early for inbound Bay Area transplants.',
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
      'Los Angeles County is the most populous U.S. county and a patchwork of micro-markets: Westside condos, San Fernando Valley heat, DTLA high-rises, South Bay port traffic, Pasadena Craftsman homes, Hollywood Hills shuttles, and Antelope Valley long-hauls. Freeway time (405/10/101/710) often drives hourly billing more than map miles. For zone-by-zone access tips, COI/elevator rules, BHGS vs FMCSA notes, and seasonal timing, see the LA County Moving Intelligence sections on this page.',
    costs: {
      studioRange: '$650–$1,600+',
      familyRange: '$2,800–$7,000+',
      avgHourly: '$130–$200+/hr for a 2-person crew',
      note: 'Cross-zone and high-rise moves trend higher — elevator COIs, shuttle trucks in the hills, parking permits, and peak freeway windows (Westside, DTLA, Long Beach, Pasadena, Antelope Valley) can add more than square footage alone.',
    },
    tips: [
      'Get building COI language and elevator windows before you compare hourly quotes.',
      'Ask if the estimate is portal-to-portal and how peak 405/10/101 time is billed.',
      'Hillside and canyon streets often need shuttle trucks — budget $150–$400+ when access is tight.',
      'Confirm city parking / temporary no-parking responsibility (LA City, Santa Monica, Pasadena, Long Beach differ).',
      'Intrastate CA moves: check BHGS licensing; interstate legs need FMCSA authority.',
      'Prefer mid-month Tue–Thu starts; avoid end-of-month summer Saturdays when possible.',
      'For Antelope Valley ↔ basin moves, treat drive time as a long local haul in the written estimate.',
      'Share driveway photos and building rules with the estimator — not just the address.',
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
  orange: {
    marketNotes:
      'Orange County is one of the most HOA- and master-planned-dense U.S. counties (Irvine, Mission Viejo, RSM, Ladera Ranch, and peers). Moves often hinge on COI, elevator/gate rules, higher shipment values, coastal staging limits, and Anaheim Resort traffic on I-5 / I-405 / SR-55 / SR-91 — not generic SoCal “suburb” advice.',
    costs: {
      studioRange: '$650–$1,600+',
      familyRange: '$2,800–$7,000+',
      avgHourly: '$130–$200/hr for a 2-person crew',
      note: 'Irvine planned communities, coastal shuttles, HOA soft costs, and multi-freeway hauls (e.g. North OC ↔ South County) push many jobs above base ranges.',
    },
    tips: [
      'Send the HOA/management move packet and COI requirements with the estimate — especially Irvine and South County.',
      'Pre-clear gated community vendor passes 24–48 hours ahead to avoid billable gate wait.',
      'Expect shuttle or long-carry on many Huntington / Newport / Laguna beach streets.',
      'Avoid Anaheim Resort open/close surges and major convention changeovers near Harbor / Katella.',
      'Ask for adequate valuation coverage on higher-value OC inventories; released-value rates are often too low.',
    ],
  },
  placer: {
    marketNotes:
      'Placer County is growing suburban/rural with Roseville and Lake Tahoe influence. Moves often involve family homes and commuter properties.',
    costs: {
      studioRange: '$500–$1,000',
      familyRange: '$1,900–$4,000',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Roseville, Rocklin, and Auburn moves often reflect I-80 commuter traffic, Tahoe-seasonal access, and travel from Sacramento regional crews.',
    },
    tips: [
      'Tahoe-area properties require seasonal planning.',
      'Verify coverage for Roseville, Rocklin, and Auburn.',
      'I-80 traffic can impact timing.',
      'Obtain multiple estimates.',
      'Confirm insurance for high-value homes.',
    ],
  },
  plumas: {
    marketNotes:
      'Plumas County is remote Sierra with Quincy. Moves are limited and primarily residential with regional support from Reno or Chico.',
    costs: {
      studioRange: '$500–$1,000+',
      familyRange: '$1,800–$4,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Quincy moves often reflect mountain remote access, limited local crews, and travel from Chico or Reno regional providers.',
    },
    tips: [
      'Mountain and remote properties have severe access challenges.',
      'Verify explicit regional service to Quincy.',
      'Storage is very limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for high-altitude moves.',
    ],
  },
  riverside: {
    marketNotes:
      'Riverside County (~2.5M residents) is a major Inland Empire growth market: more affordable than coastal LA/OC, extreme summer heat (especially Coachella Valley), long inter-zone distances, warehouse freeway traffic on I-15/I-10/I-215/SR-60/SR-91, and a mix of western suburbs, Temecula Valley planned communities, and desert resort cities.',
    costs: {
      studioRange: '$550–$1,400+',
      familyRange: '$2,400–$6,500+',
      avgHourly: '$115–$185/hr for a 2-person crew',
      note: 'Western core ↔ Coachella Valley distance, summer heat windows, HOAs in Temecula/Eastvale/desert communities, and IE logistics traffic push many jobs above base ranges.',
    },
    tips: [
      'Schedule summer loads early morning — especially Palm Springs–area and eastern desert addresses.',
      'Get city-to-city drive assumptions in writing for long IE pairs (e.g. Corona ↔ Indio).',
      'Send HOA/gate rules for Temecula Valley, Eastvale, and Coachella Valley planned communities.',
      'Budget portal-to-portal time around warehouse traffic on I-15, I-10, and I-215.',
      'Protect electronics and finished goods from extreme heat in sealed trucks.',
    ],
  },
  sacramento: {
    marketNotes:
      'Sacramento County (~1.62M) is the capital region: government/agency workforce turnover, strong Bay Area inbound migration, extreme summer heat (95–105°F+), Midtown/Downtown multi-unit stock, and large master-planned suburbs (Elk Grove, Natomas, Folsom). I-5, I-80, US-50, SR-99, and Business 80 define cross-town “local” timing.',
    costs: {
      studioRange: '$550–$1,400+',
      familyRange: '$2,400–$6,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Heat windows, HOA soft costs in Elk Grove/Natomas/Folsom, Midtown elevators, and multi-freeway suburb-to-core hauls push many jobs above base ranges.',
    },
    tips: [
      'Schedule summer loads early morning — peak afternoon heat is an operational risk.',
      'Send HOA/COI packets for Elk Grove, Natomas, and Folsom planned communities with the estimate.',
      'Confirm elevator windows for Downtown/Midtown multi-unit buildings.',
      'Build I-5 / US-50 / SR-99 peak time into suburb-to-core quotes.',
      'Share hard government or Bay Area transfer dates early for crew availability.',
    ],
  },
  'san-benito': {
    marketNotes:
      'San Benito County is rural with Hollister and Pinnacles National Park influence. Moves are primarily residential with regional support from San Jose or Salinas.',
    costs: {
      studioRange: '$500–$950',
      familyRange: '$1,800–$3,800',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Hollister moves often reflect rural property access, Pinnacles-adjacent logistics, and travel from San Jose or Salinas regional crews.',
    },
    tips: [
      'Rural properties have access challenges.',
      'Verify regional service to Hollister.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  'san-bernardino': {
    marketNotes:
      'San Bernardino County (~2.22M residents) is one of the largest U.S. counties by area: West Valley urban/suburban corridors, High Desert cities, mountain communities (Big Bear / Lake Arrowhead), and Morongo Basin remote desert — plus military logistics (Fort Irwin, Twentynine Palms, MCLB Barstow). More affordable than coastal LA/OC; heat, elevation, and 1–2+ hour cross-zone distances define many “local” jobs.',
    costs: {
      studioRange: '$550–$1,400+',
      familyRange: '$2,500–$7,000+',
      avgHourly: '$115–$185/hr for a 2-person crew',
      note: 'Valley ↔ high desert/mountains distance, summer heat windows, cabin access/shuttles, warehouse traffic on I-10/I-15/I-215/SR-210, and remote base-adjacent jobs push many quotes above base ranges.',
    },
    tips: [
      'Schedule summer valley and high-desert loads early morning; protect against heat and dust.',
      'For Big Bear / Lake Arrowhead, share driveway photos, truck limits, and weather-flexible dates.',
      'Get city-to-city drive assumptions in writing for long pairs (e.g. Ontario ↔ Victorville).',
      'Send HOA/gate rules for newer West Valley and High Desert planned communities.',
      'Military remote destinations (Fort Irwin, 29 Palms, Barstow) need explicit travel and access planning.',
    ],
  },
  'san-diego': {
    marketNotes:
      'San Diego County is a military-heavy coastal market (Navy + Marine Corps bases, Camp Pendleton influence in North County) with dense condo/HOA cores, beach neighborhoods with limited truck staging, and long “local” hauls on I-5, I-15, I-8, and I-805. PCS peaks and building COI rules drive calendars as much as square footage.',
    costs: {
      studioRange: '$600–$1,500+',
      familyRange: '$2,600–$6,500+',
      avgHourly: '$125–$195/hr for a 2-person crew',
      note: 'Downtown/Mission Valley towers, beach shuttles, PCS peak weeks, and cross-zone freeway time (e.g. Oceanside ↔ Chula Vista) push many jobs above base ranges.',
    },
    tips: [
      'Share base housing or gate-adjacent addresses early — access and wait time can be billable.',
      'Send HOA/building COI and elevator rules with the estimate (downtown, coastal, Mission Valley).',
      'Expect shuttle or long-carry on many PB, Mission Beach, OB, and Coronado streets.',
      'Book around PCS peaks (late spring–summer, end-of-month) 3–6 weeks ahead for Saturdays.',
      'Protect against salt air and sand; schedule inland East County starts early in summer heat.',
    ],
  },
  'san-francisco': {
    marketNotes:
      'San Francisco County is the dense urban core with iconic hills and high-rises. Moves are highly complex due to steep streets, building regulations, and limited parking.',
    costs: {
      studioRange: '$700–$1,700+',
      familyRange: '$3,000–$7,500+',
      avgHourly: '$150–$220/hr for a 2-person crew',
      note: 'Mission, Marina, and Nob Hill moves often reflect steep-hill logistics, elevator reservations, and certificate-of-insurance requirements.',
    },
    tips: [
      'Almost all buildings require elevator reservations, move-in fees, and certificates of insurance.',
      'Steep hills and narrow streets create significant logistical challenges.',
      'Heavy traffic on all major arteries.',
      'Verify coverage for specific neighborhoods (Mission, Marina, Nob Hill, etc.).',
      'Confirm high-value insurance and building expertise.',
    ],
  },
  'san-joaquin': {
    marketNotes:
      'San Joaquin County is Central Valley with Stockton and Lodi. Moves often involve residential, port, and agricultural properties.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,800',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Stockton and Lodi moves often reflect port-adjacent logistics, agricultural-property handling, and I-5/Highway 99 traffic.',
    },
    tips: [
      'Port and agricultural properties may require specialized handling.',
      'Verify coverage for Stockton and Lodi.',
      'Heavy traffic on I-5 and Highway 99.',
      'Obtain multiple estimates.',
      'Confirm insurance for high-value items.',
    ],
  },
  'san-luis-obispo': {
    marketNotes:
      'San Luis Obispo County is coastal/Central Coast with San Luis Obispo, Paso Robles, and Pismo Beach. Moves often involve residential, winery, and beach properties.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'San Luis Obispo and Paso Robles moves often reflect coastal sand protection, winery-property handling, and seasonal tourism peaks.',
    },
    tips: [
      'Coastal and winery properties require specialized planning.',
      'Verify coverage for San Luis Obispo and Paso Robles.',
      'Obtain multiple estimates.',
      'Confirm credentials for coastal moves.',
      'Seasonal tourism affects demand.',
    ],
  },
  'san-mateo': {
    marketNotes:
      'San Mateo County is affluent Peninsula suburban with Redwood City, Palo Alto influence, and coastal areas. Moves often involve high-value homes and tech commuter properties.',
    costs: {
      studioRange: '$650–$1,400',
      familyRange: '$2,800–$6,000+',
      avgHourly: '$140–$200/hr for a 2-person crew',
      note: 'Redwood City, San Mateo, and Daly City moves often reflect HOA move-in rules, I-280/101 Peninsula traffic, and high-value tech-commuter home handling.',
    },
    tips: [
      'Many HOAs and gated communities have strict rules.',
      'Coastal and Peninsula traffic on I-280 and Highway 101 is heavy.',
      'Verify coverage for Redwood City, San Mateo, and Daly City.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons.',
    ],
  },
  'santa-barbara': {
    marketNotes:
      'Santa Barbara County is coastal with Santa Barbara, Santa Maria, and wine country. Moves often involve residential, beach, and winery properties.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Santa Barbara and Santa Maria moves often reflect coastal beach-property handling, wine-country access, and seasonal tourism peaks.',
    },
    tips: [
      'Coastal and wine country properties require specialized planning.',
      'Verify coverage for Santa Barbara and Santa Maria.',
      'Obtain multiple estimates.',
      'Confirm credentials for beach moves.',
      'Seasonal tourism affects demand.',
    ],
  },
  'santa-clara': {
    marketNotes:
      'Santa Clara County (~1.91–1.92M) is Silicon Valley’s core: extreme housing costs and high shipment values, tech/corporate relocation waves, dense HOA-condo paperwork, and freeway timing on US-101, I-280, I-880, SR-85, SR-87, and SR-237. North County tech corridor moves differ sharply from West Valley SFH and South County (Morgan Hill/Gilroy) long locals.',
    costs: {
      studioRange: '$700–$1,800+',
      familyRange: '$3,200–$8,500+',
      avgHourly: '$145–$220/hr for a 2-person crew',
      note: 'North County elevator/COI soft costs, high-value electronics packing, West Valley hillside access, and multi-freeway hauls (e.g. Palo Alto ↔ South County) push many jobs above base ranges.',
    },
    tips: [
      'Send HOA/building COI and elevator rules with the estimate — especially Sunnyvale, Santa Clara, Mountain View, and San Jose multi-unit.',
      'Inventory multi-monitor and specialty tech gear; request adequate valuation coverage.',
      'Schedule around 101/280/237 commute peaks and campus shift changes when possible.',
      'Treat South County ↔ North County as a long local haul with honest portal-to-portal time.',
      'Share driveway photos for Los Gatos / Saratoga foothill properties.',
    ],
  },
  'santa-cruz': {
    marketNotes:
      'Santa Cruz County is coastal with Santa Cruz and Watsonville. Moves often involve beach, university (UC Santa Cruz), and residential properties.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Santa Cruz and Watsonville moves often reflect beach sand protection, UC Santa Cruz calendar peaks, and coastal access challenges.',
    },
    tips: [
      'Beach properties require sand protection.',
      'University calendar affects seasonal demand.',
      'Verify coverage for Santa Cruz and Watsonville.',
      'Obtain multiple estimates.',
      'Confirm credentials for coastal moves.',
    ],
  },
  shasta: {
    marketNotes:
      'Shasta County is rural/northern with Redding and Mount Shasta. Moves often involve residential and recreational properties with regional support from Chico or Redding.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Redding moves often reflect mountain and lake-property access, winter weather scheduling, and travel from Chico or Sacramento regional crews.',
    },
    tips: [
      'Mountain and lake properties have access challenges.',
      'Verify coverage for Redding.',
      'Obtain multiple estimates.',
      'Confirm credentials for northern moves.',
      'Winter weather affects scheduling.',
    ],
  },
  sierra: {
    marketNotes:
      'Sierra County is one of California\'s smallest and most remote counties in the Sierra Nevada. Moves are extremely limited with regional support from Reno or Truckee.',
    costs: {
      studioRange: '$500–$1,100+',
      familyRange: '$1,800–$4,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Downieville moves often reflect extreme remote mountain access, limited local crews, and travel from Tahoe or Reno regional providers.',
    },
    tips: [
      'Extremely remote mountain properties have severe access challenges.',
      'Verify explicit regional service to Downieville.',
      'Storage is very limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for high-altitude moves.',
    ],
  },
  siskiyou: {
    marketNotes:
      'Siskiyou County is remote with Yreka and Mount Shasta. Moves are limited and primarily residential with regional support from Redding or Medford, OR.',
    costs: {
      studioRange: '$500–$1,000+',
      familyRange: '$1,800–$4,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Yreka moves often reflect remote mountain access, limited local crews, and travel from Redding, Chico, or Medford regional providers.',
    },
    tips: [
      'Remote mountain properties have severe access challenges.',
      'Verify explicit regional service to Yreka.',
      'Storage is very limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for remote moves.',
    ],
  },
  solano: {
    marketNotes:
      'Solano County is Bay Area suburban with Fairfield, Vallejo, and Travis Air Force Base. Moves often involve residential, military, and commuter properties.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$2,000–$4,500',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Fairfield, Vallejo, and Vacaville moves often reflect Travis AFB military PCS timing, I-80/I-680 traffic, and Bay Area commuter-property handling.',
    },
    tips: [
      'Military (Travis AFB) moves require PCS experience.',
      'Verify coverage for Fairfield, Vallejo, and Vacaville.',
      'Heavy traffic on I-80 and I-680.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons.',
    ],
  },
  sonoma: {
    marketNotes:
      'Sonoma County is famous for wine country with Santa Rosa, Sonoma, and Healdsburg. Moves often involve residential, winery, and high-value properties with regional Bay Area support.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Santa Rosa, Sonoma, and Healdsburg moves often reflect winery-property handling, seasonal tourism peaks, and travel from North Bay or Marin regional crews.',
    },
    tips: [
      'Winery and vineyard properties require specialized handling.',
      'Verify coverage for Santa Rosa, Sonoma, and Healdsburg.',
      'Obtain multiple estimates.',
      'Confirm credentials for high-value homes.',
      'Seasonal tourism affects demand.',
    ],
  },
  stanislaus: {
    marketNotes:
      'Stanislaus County is Central Valley with Modesto and agricultural focus. Moves often involve residential and farm properties with regional support from the Valley.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,800',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Modesto and Turlock moves often reflect agricultural-property handling, Highway 99 traffic, and travel from Fresno or Sacramento regional crews.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify coverage for Modesto and Turlock.',
      'Heavy traffic on Highway 99.',
      'Obtain multiple estimates.',
      'Confirm insurance for high-value items.',
    ],
  },
  sutter: {
    marketNotes:
      'Sutter County is rural/agricultural with Yuba City. Moves are primarily residential with regional support from Sacramento.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Yuba City moves often reflect agricultural-property handling, Marysville-Yuba City metro access, and travel from Sacramento regional crews.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify regional service to Yuba City.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  tehama: {
    marketNotes:
      'Tehama County is rural with Red Bluff and Corning. Moves are primarily residential and agricultural with regional support from Redding or Chico.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Red Bluff and Corning moves often reflect agricultural-property handling and travel from Chico or Redding regional crews.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify regional service to Red Bluff.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  trinity: {
    marketNotes:
      'Trinity County is very remote in the Trinity Alps. Moves are extremely limited with regional support from Redding.',
    costs: {
      studioRange: '$500–$1,100+',
      familyRange: '$1,800–$4,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Weaverville moves often reflect extreme remote mountain access, limited local crews, and travel from Redding or Chico regional providers.',
    },
    tips: [
      'Extremely remote mountain properties have severe access challenges.',
      'Verify explicit regional service to Weaverville.',
      'Storage is very limited; use regional facilities.',
      'Book well in advance.',
      'Confirm credentials for remote moves.',
    ],
  },
  tulare: {
    marketNotes:
      'Tulare County is agricultural with Visalia and Porterville. Moves often involve residential and farm properties with regional support from Fresno.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,700–$3,600',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Visalia and Porterville moves often reflect agricultural-property handling and travel from Fresno or Bakersfield regional crews.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify coverage for Visalia and Porterville.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  tuolumne: {
    marketNotes:
      'Tuolumne County is rural Gold Country with Sonora and Yosemite influence. Moves are primarily residential with regional support from Modesto or Fresno.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Sonora moves often reflect Gold Country historic-property handling, Yosemite-adjacent access, and travel from Modesto or Fresno regional crews.',
    },
    tips: [
      'Historic Gold Country properties require preservation-sensitive handling.',
      'Verify regional service to Sonora.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  ventura: {
    marketNotes:
      'Ventura County is coastal with Ventura, Oxnard, and Thousand Oaks. Moves often involve beach properties, suburban homes, and commuter communities between Los Angeles and Santa Barbara.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Ventura, Oxnard, and Thousand Oaks moves often reflect coastal sand protection, US 101 traffic, and travel from Greater Los Angeles regional crews.',
    },
    tips: [
      'Coastal and beach properties require sand protection and access planning.',
      'Heavy traffic on US 101 and Highway 118.',
      'Verify coverage for Ventura, Oxnard, and Thousand Oaks.',
      'Confirm insurance for high-value suburban and coastal homes.',
      'Book early for peak seasons.',
    ],
  },
  yolo: {
    marketNotes:
      'Yolo County is agricultural with Woodland, Davis, and UC Davis. Moves often involve residential, university, and farm properties with regional support from Sacramento.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Davis and Woodland moves often reflect university calendar peaks, agricultural-property handling, and travel from Sacramento regional crews.',
    },
    tips: [
      'University (UC Davis) calendar affects seasonal demand.',
      'Agricultural properties may require equipment handling.',
      'Verify coverage for Davis and Woodland.',
      'Obtain multiple estimates.',
      'Confirm credentials.',
    ],
  },
  yuba: {
    marketNotes:
      'Yuba County is rural/agricultural with Marysville and Wheatland. Moves are primarily residential with regional support from Sacramento or Yuba City area providers.',
    costs: {
      studioRange: '$450–$900',
      familyRange: '$1,600–$3,400',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Marysville and Wheatland moves often reflect agricultural-property handling and travel from Sacramento or Marysville-Yuba City regional crews.',
    },
    tips: [
      'Agricultural properties may require equipment handling.',
      'Verify regional service to Marysville.',
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