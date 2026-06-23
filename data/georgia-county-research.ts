import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Georgia county research — grows incrementally per batch */
export const georgiaCountyResearch: Record<string, CuratedCountyResearch> = {
  fulton: {
    marketNotes:
      'Fulton County is the core of the Atlanta metro with high residential, commercial, and urban moving demand across Atlanta, Sandy Springs, Roswell, and Alpharetta. Dense high-rises, Buckhead estates, and I-285 corridor traffic create complex scheduling, parking, and building-access logistics for local crews.',
    costs: {
      studioRange: '$650–$1,300',
      familyRange: '$2,500–$5,500+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Fulton County pricing reflects Atlanta traffic windows, elevator reservations, concierge move rules, and premium labor demand in core urban neighborhoods.',
    },
    tips: [
      'Heavy Atlanta traffic on I-75, I-85, and I-285 significantly impacts scheduling — book morning slots and confirm crew arrival windows.',
      'Verify coverage for all parts of Fulton County including South Fulton, Buckhead, Midtown, and perimeter suburbs.',
      'Confirm insurance and valuation options for high-value urban homes and condo high-rises.',
      'Book early for peak seasons (May–September) and month-end lease turnover in Atlanta.',
      'Obtain multiple written estimates and compare hourly vs. flat-rate pricing before signing.',
      'Consider parking restrictions and loading-zone permits in dense Atlanta neighborhoods and downtown high-rises.',
      'Check HOA rules, elevator reservations, and move-in/out windows in newer Fulton County developments.',
    ],
  },
  gwinnett: {
    marketNotes:
      'Gwinnett County is one of the fastest-growing counties in the Atlanta metro, anchored by Lawrenceville, Duluth, Suwanee, and Buford. Suburban single-family homes, townhome communities, and school-district-driven relocations create steady demand for full-service local movers with strong highway corridor coverage.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Gwinnett moves often reflect suburban driveway access, HOA communities, and Atlanta metro traffic on I-85 and GA-316.',
    },
    tips: [
      'Heavy Atlanta metro traffic on I-85 and GA-316 impacts scheduling — confirm crew routes and arrival windows.',
      'Verify coverage for Lawrenceville, Duluth, Suwanee, Buford, and surrounding Gwinnett communities.',
      'Confirm insurance for high-value homes and ask about specialty handling for large suburban furniture.',
      'Book early for peak seasons and end-of-month apartment and home closings.',
      'Obtain multiple written estimates and ask about travel fees for outer Gwinnett addresses.',
      'Check HOA move rules, parking, and gate access in newer Lawrenceville-area subdivisions.',
      'Ask whether a smaller truck is needed for townhome courts or narrow community streets.',
    ],
  },
  cobb: {
    marketNotes:
      'Cobb County is a major suburban Atlanta market anchored by Marietta, Smyrna, Kennesaw, and Acworth with strong residential and commercial moving demand along I-75 and I-285.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Cobb County pricing reflects Marietta corridor traffic, suburban HOA communities, and mixed apartment and single-family demand.',
    },
    tips: [
      'Heavy Atlanta metro traffic on I-75 and I-285 impacts scheduling — confirm crew arrival windows for Marietta and Kennesaw routes.',
      'Verify coverage for Marietta, Smyrna, Mableton, Kennesaw, and Acworth before booking.',
      'Confirm insurance and valuation for high-value homes in East Cobb and Vinings-adjacent neighborhoods.',
      'Book early for peak seasons and Cobb County school-calendar move windows.',
      'Obtain multiple written estimates and compare flat-rate vs. hourly pricing.',
      'Check HOA move rules and gate access in newer Cobb subdivisions.',
    ],
  },
  dekalb: {
    marketNotes:
      'DeKalb County includes Decatur, Brookhaven, Dunwoody, Stone Mountain, and portions of Atlanta with diverse urban apartments, historic bungalows, and suburban single-family moves.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'DeKalb moves often involve Decatur historic streets, MARTA-adjacent apartments, and I-285/I-20 traffic congestion.',
    },
    tips: [
      'Heavy Atlanta metro traffic on I-285, I-20, and surface arterials impacts scheduling — book morning slots when possible.',
      'Verify coverage for Decatur, Tucker, Chamblee, Brookhaven, and Stone Mountain addresses.',
      'Confirm insurance for high-value homes and ask about specialty handling for antiques in older Decatur neighborhoods.',
      'Book early for peak seasons and Emory/CDC-adjacent apartment turnover periods.',
      'Obtain multiple written estimates before signing.',
      'Check building elevator reservations and street-parking rules for in-town DeKalb moves.',
    ],
  },
  clayton: {
    marketNotes:
      'Clayton County is part of the south Atlanta metro with Jonesboro as the county seat, serving growing suburban communities and Hartsfield-Jackson airport-adjacent relocations.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Clayton County pricing reflects I-75 south corridor traffic and suburban Jonesboro and Riverdale communities.',
    },
    tips: [
      'Heavy Atlanta metro traffic on I-75 impacts scheduling — confirm routes for Jonesboro and Forest Park.',
      'Verify coverage for Jonesboro, Riverdale, Morrow, and Lake City before booking.',
      'Confirm insurance for high-value homes and multi-bedroom suburban properties.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple written estimates and ask about travel fees for outer Clayton addresses.',
    ],
  },
  cherokee: {
    marketNotes:
      'Cherokee County is a fast-growing suburban market north of Atlanta with Canton, Woodstock, and Holly Springs driving steady residential moving demand along I-575.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Cherokee moves often reflect I-575 commuter traffic and new-construction HOA communities around Canton and Woodstock.',
    },
    tips: [
      'Verify coverage for Canton, Woodstock, Holly Springs, and Ball Ground before booking.',
      'Atlanta metro traffic on I-575 and GA-400 connectors impacts crew scheduling.',
      'Confirm insurance for high-value homes in newer Cherokee subdivisions.',
      'Book early for peak seasons and school-district move windows.',
      'Obtain multiple written estimates and confirm gate/HOA move paperwork.',
    ],
  },
  forsyth: {
    marketNotes:
      'Forsyth County is one of the fastest-growing counties in the Atlanta metro, centered on Cumming with high demand in Alpharetta-adjacent suburbs and GA-400 corridor communities.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Forsyth pricing reflects GA-400 traffic, affluent suburban homes, and strong new-construction move volume around Cumming.',
    },
    tips: [
      'Verify coverage for Cumming, Suwanee-adjacent areas, and south Forsyth communities.',
      'Atlanta metro traffic on GA-400 significantly impacts scheduling — confirm arrival windows.',
      'Confirm insurance for high-value homes and large suburban estates.',
      'Book early for peak seasons and end-of-month closings.',
      'Obtain multiple written estimates and check HOA move-day requirements.',
    ],
  },
  henry: {
    marketNotes:
      'Henry County is a growing south-metro market with McDonough, Stockbridge, and Locust Grove serving family-oriented suburban relocations along I-75 south of Atlanta.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Henry County moves reflect I-75 south corridor congestion and expanding McDonough suburban developments.',
    },
    tips: [
      'Verify coverage for McDonough, Stockbridge, Hampton, and Locust Grove.',
      'Atlanta metro traffic on I-75 south impacts scheduling — book off-peak when possible.',
      'Confirm insurance for high-value homes in newer Henry subdivisions.',
      'Book early for peak seasons and school-calendar relocations.',
      'Obtain multiple written estimates before booking.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County is an affluent south-metro suburb centered on Fayetteville and Peachtree City with golf-cart communities, executive homes, and steady residential moving demand.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Fayette moves often involve Peachtree City path-system access limits and premium homes in Tyrone and Fayetteville.',
    },
    tips: [
      'Verify coverage for Fayetteville, Peachtree City, Tyrone, and Brooks.',
      'Atlanta metro traffic on I-85 and GA-74 impacts scheduling for south-metro crews.',
      'Confirm insurance for high-value homes and specialty items.',
      'Book early for peak seasons — Fayette County has limited local mover density.',
      'Obtain multiple written estimates and ask about Peachtree City access logistics.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County sits west of Atlanta with Douglasville as the seat, blending suburban growth along I-20 with commercial corridor demand near the Fulton County line.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Douglas County pricing reflects I-20 west corridor traffic and suburban Douglasville and Lithia Springs communities.',
    },
    tips: [
      'Verify coverage for Douglasville, Lithia Springs, and Villa Rica before booking.',
      'Atlanta metro traffic on I-20 impacts scheduling for west-metro routes.',
      'Confirm insurance for high-value homes and multi-bedroom suburban properties.',
      'Book early for peak seasons and month-end apartment turnover.',
      'Obtain multiple written estimates and compare travel-time fees.',
    ],
  },
  rockdale: {
    marketNotes:
      'Rockdale County is an east-metro suburb with Conyers serving I-20 corridor families and commuters between Atlanta and Covington.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Rockdale moves reflect I-20 east corridor traffic and Conyers suburban HOA communities.',
    },
    tips: [
      'Verify coverage for Conyers, Olde Town, and north Rockdale communities.',
      'Atlanta metro traffic on I-20 east impacts crew scheduling.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and school-district move periods.',
      'Obtain multiple written estimates and confirm HOA paperwork.',
    ],
  },
  paulding: {
    marketNotes:
      'Paulding County is a fast-growing northwest Atlanta suburb with Dallas, Hiram, and Braswell communities driving residential demand along the Cobb and Douglas county lines.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Paulding pricing reflects west-northwest metro growth, rural-leaning lots, and I-20/GA-278 corridor access.',
    },
    tips: [
      'Verify coverage for Dallas, Hiram, and Paulding County rural addresses.',
      'Atlanta metro traffic impacts scheduling for crews coming from Cobb or Fulton bases.',
      'Confirm insurance for high-value homes and properties with long driveways.',
      'Book early for peak seasons — fewer dedicated local movers serve outer Paulding.',
      'Obtain multiple written estimates and ask about truck size for narrow rural roads.',
    ],
  },
  coweta: {
    marketNotes:
      'Coweta County is a growing south-metro suburb centered on Newnan with Senoia and Sharpsburg communities driving family relocations along the Fayette and Fulton county lines.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Coweta moves reflect I-85 south corridor access, Newnan historic downtown streets, and expanding suburban developments.',
    },
    tips: [
      'Verify coverage for Newnan, Senoia, Sharpsburg, and rural Coweta addresses before booking.',
      'Atlanta metro traffic on I-85 and US-27 impacts crew scheduling from metro bases.',
      'Confirm insurance for high-value homes in newer Coweta subdivisions.',
      'Book early for peak seasons and school-calendar move windows.',
      'Obtain multiple written estimates and ask about travel fees for outer Coweta properties.',
    ],
  },
  barrow: {
    marketNotes:
      'Barrow County is a northeast Atlanta suburb with Winder and Auburn serving commuters between Gwinnett and Athens with steady residential moving demand.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Barrow pricing reflects GA-316 corridor traffic and suburban Winder communities east of Gwinnett.',
    },
    tips: [
      'Verify coverage for Winder, Auburn, and Bethlehem before booking.',
      'Atlanta metro traffic on GA-316 and I-85 impacts scheduling for northeast-metro crews.',
      'Confirm insurance for high-value homes and multi-bedroom suburban properties.',
      'Book early for peak seasons — limited dedicated local movers serve Barrow County.',
      'Obtain multiple written estimates and confirm travel-time fees from Atlanta bases.',
    ],
  },
  newton: {
    marketNotes:
      'Newton County is an east-metro market centered on Covington with Oxford and Porterdale communities along the I-20 corridor between Atlanta and Madison.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Newton moves reflect I-20 east corridor congestion and film-industry-adjacent Covington neighborhoods.',
    },
    tips: [
      'Verify coverage for Covington, Oxford, and Porterdale before booking.',
      'Atlanta metro traffic on I-20 east impacts crew arrival windows.',
      'Confirm insurance for high-value homes and historic Covington properties.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple written estimates and compare flat-rate vs. hourly pricing.',
    ],
  },
  hall: {
    marketNotes:
      'Hall County centers on Gainesville with Lake Lanier waterfront homes, suburban growth along I-985, and Atlanta-metro spillover demand in Flowery Branch and Oakwood.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Hall County pricing reflects I-985/GA-400 connector traffic, lake-access properties, and Gainesville medical-corridor relocations.',
    },
    tips: [
      'Verify coverage for Gainesville, Flowery Branch, Oakwood, and lake-area addresses.',
      'Atlanta metro traffic on I-985 and GA-400 impacts scheduling for north-metro crews.',
      'Confirm insurance for high-value homes and waterfront properties near Lake Lanier.',
      'Book early for peak seasons and summer lake-home turnover.',
      'Obtain multiple written estimates and ask about narrow lake-road access.',
    ],
  },
  walton: {
    marketNotes:
      'Walton County is an east-metro suburb with Monroe and Loganville serving growing families between Gwinnett, Rockdale, and Oconee counties.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Walton moves reflect GA-11 corridor traffic and Monroe historic-square-area access constraints.',
    },
    tips: [
      'Verify coverage for Monroe, Loganville, and Social Circle before booking.',
      'Atlanta metro traffic impacts scheduling for crews traveling from Gwinnett or DeKalb bases.',
      'Confirm insurance for high-value homes in newer Walton subdivisions.',
      'Book early for peak seasons and school-district relocations.',
      'Obtain multiple written estimates and confirm HOA move paperwork.',
    ],
  },
  chatham: {
    marketNotes:
      'Chatham County centers on Savannah with historic districts, port activity, and coastal residential moves across Pooler, Richmond Hill, and Tybee-adjacent communities.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,200–$5,000+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Chatham County pricing reflects historic-district access limits, tourist-season demand, and coastal humidity considerations for sensitive items.',
    },
    tips: [
      'Historic district parking and access restrictions apply — confirm truck routes and loading zones before move day.',
      'Verify coverage for Savannah, Pooler, Port Wentworth, and surrounding Chatham communities.',
      'Confirm insurance and valuation for high-value historic homes and antiques.',
      'Book early for peak tourist seasons (spring and fall) and SCAD move-in windows.',
      'Obtain multiple written estimates and compare flat-rate vs. hourly pricing.',
      'Consider coastal humidity when packing artwork, documents, and wood furniture.',
      'Check flood zone requirements and ground-floor moisture risks for storage and loading.',
    ],
  },
  richmond: {
    marketNotes:
      'Richmond County centers on Augusta with significant military (Fort Eisenhower) presence and historic residential activity across the CSRA.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Augusta metro pricing reflects military PCS seasonality, historic-district access, and CSRA suburban demand.',
    },
    tips: [
      'Military moves require specific experience and documentation — confirm PCS and government billing familiarity.',
      'Verify explicit coverage for Augusta, Evans, Grovetown, and surrounding CSRA areas before booking.',
      'Confirm insurance and valuation for high-value homes in historic districts.',
      'Book early for peak summer PCS and Masters Tournament season demand.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes for Fort Eisenhower-area relocations.',
    ],
  },
  muscogee: {
    marketNotes:
      'Muscogee County centers on Columbus with significant military presence at Fort Moore and strong residential demand along the I-185 corridor.',
    costs: {
      studioRange: '$550–$1,050',
      familyRange: '$1,900–$4,100',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Columbus metro pricing reflects military PCS seasonality, Uptown access limits, and I-185 suburban growth.',
    },
    tips: [
      'Military moves require specific experience and documentation — confirm PCS and government billing familiarity.',
      'Verify explicit coverage for Columbus, Fort Moore-adjacent housing, and surrounding Muscogee communities.',
      'Confirm insurance and valuation for high-value homes before booking.',
      'Book early for peak summer PCS and month-end lease turnover.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes for Fort Moore-area relocations.',
    ],
  },
  pickens: {
    marketNotes:
      'Pickens County is a rural mountainous county north of Atlanta with Jasper as the seat and limited dedicated local mover presence.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Pickens moves reflect mountain-road access, limited storage options, and travel time from Atlanta or Canton-area crews.',
    },
    tips: [
      'Mountain roads and access challenges are common — confirm truck size and route feasibility before booking.',
      'Verify explicit regional service to Jasper and outer Pickens addresses.',
      'Storage is very limited locally — plan interim storage with Atlanta or Canton providers if needed.',
      'Obtain multiple written estimates and compare travel fees from north-metro bases.',
      'Confirm credentials and insurance for rural and mountain relocations.',
    ],
  },
  bartow: {
    marketNotes:
      'Bartow County includes Cartersville with industrial and residential growth along the I-75 northwest corridor between Atlanta and Chattanooga.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Bartow County pricing reflects I-75 corridor traffic, Lake Allatoona-area properties, and suburban growth in Cartersville.',
    },
    tips: [
      'Verify coverage for Cartersville, Emerson, Euharlee, and surrounding Bartow communities.',
      'Atlanta metro traffic on I-75 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and lake-area properties.',
      'Book early for peak seasons and month-end closings.',
      'Obtain multiple written estimates and compare flat-rate vs. hourly pricing.',
    ],
  },
  spalding: {
    marketNotes:
      'Spalding County centers on Griffin south of Atlanta along the I-75 corridor with steady residential and commuter demand.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Spalding moves often involve Griffin historic neighborhoods and I-75 south-metro traffic windows.',
    },
    tips: [
      'Verify coverage for Griffin and surrounding Spalding County addresses.',
      'Atlanta metro traffic on I-75 impacts scheduling for crews traveling from the core metro.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and school-calendar move windows.',
      'Obtain multiple written estimates and ask about travel-time fees.',
    ],
  },
  butts: {
    marketNotes:
      'Butts County is a rural south-metro county with Jackson as the seat and limited on-the-ground mover presence.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$4,800',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Butts County pricing reflects rural driveway access, limited storage, and travel from Atlanta or Griffin bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes and property access in advance.',
      'Verify explicit regional service to Jackson and outer Butts addresses.',
      'Storage is very limited locally — plan with Atlanta or Griffin providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural relocations.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County includes Carrollton west of Atlanta with university-town and suburban residential demand along the I-20 west corridor.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Carroll moves reflect I-20 west corridor traffic and mixed suburban and rural property access west of the metro.',
    },
    tips: [
      'Verify coverage for Carrollton, Villa Rica, and surrounding Carroll County communities.',
      'Atlanta metro traffic on I-20 west impacts scheduling — confirm crew routes.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and university-area turnover.',
      'Obtain multiple written estimates and compare pricing models.',
    ],
  },
  dawson: {
    marketNotes:
      'Dawson County is a rural and mountainous north-metro county with Dawsonville as the seat and growing spillover from Forsyth and Hall.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Dawson moves reflect mountain-road access, GA-400 north spillover traffic, and limited local storage.',
    },
    tips: [
      'Mountain roads and access challenges are common — confirm truck feasibility for rural Dawsonville-area properties.',
      'Verify explicit regional service to Dawsonville and outer Dawson addresses.',
      'Storage is very limited locally — coordinate with Gainesville or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees from north-metro crews.',
      'Confirm credentials for rural and mountain relocations.',
    ],
  },
  lumpkin: {
    marketNotes:
      'Lumpkin County is mountainous with Dahlonega as the seat, gold-country tourism, and steady north-metro spillover demand.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lumpkin moves reflect mountain-road access, tourist-season demand, and travel from Gainesville or Atlanta bases.',
    },
    tips: [
      'Mountain roads and access challenges are common — confirm routes for Dahlonega and outer Lumpkin addresses.',
      'Verify explicit regional service to Dahlonega before booking.',
      'Storage is very limited locally — plan interim storage with Gainesville or Atlanta providers.',
      'Obtain multiple written estimates and compare travel fees.',
      'Confirm credentials for rural and mountain relocations.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County is a rural east-metro county with Madison as the seat and historic-home relocation demand between Athens and Atlanta.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$4,800',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Morgan moves reflect rural access constraints, Madison historic-square logistics, and travel from Athens or Atlanta crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck access for Madison and outer Morgan properties.',
      'Verify explicit regional service to Madison before booking.',
      'Storage is very limited locally — coordinate with Athens or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural and historic-home moves.',
    ],
  },
  oconee: {
    marketNotes:
      'Oconee County is an affluent suburban and rural county near Athens with Watkinsville serving UGA-adjacent and east-metro relocations.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Oconee pricing reflects Athens-adjacent suburban demand, high-value homes, and GA-316/US-78 corridor traffic.',
    },
    tips: [
      'Verify coverage for Watkinsville, Bishop, and surrounding Oconee communities.',
      'Athens and Atlanta traffic impacts scheduling — confirm crew routes and arrival windows.',
      'Confirm insurance for high-value homes and specialty items.',
      'Book early for peak seasons and university-adjacent turnover.',
      'Obtain multiple written estimates and compare flat-rate vs. hourly pricing.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a rural and suburban northeast-metro county with Jefferson as the seat and I-85 corridor growth.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$4,800',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Jackson moves reflect I-85 northeast corridor traffic and mixed suburban-rural property access near Jefferson.',
    },
    tips: [
      'Rural access challenges are common in outer Jackson County — confirm property access in advance.',
      'Verify explicit regional service to Jefferson, Commerce, and Braselton-adjacent addresses.',
      'Storage is very limited locally — plan with Gainesville or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural relocations.',
    ],
  },
  haralson: {
    marketNotes:
      'Haralson County is a rural west-metro county with Buchanan as the seat and limited dedicated local mover presence.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$4,800',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Haralson moves reflect rural west-metro access, limited storage, and travel from Carrollton or Atlanta bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Buchanan and outer Haralson addresses.',
      'Verify explicit regional service to Buchanan before booking.',
      'Storage is very limited locally — coordinate with Carrollton or Atlanta providers.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural relocations.',
    ],
  },
  polk: {
    marketNotes:
      'Polk County is a rural west-metro county with Cedartown as the seat between Paulding, Bartow, and Floyd counties.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$4,800',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Polk moves reflect rural I-20 west access constraints and travel from Rome or Atlanta west-metro crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck feasibility for Cedartown and outer Polk properties.',
      'Verify explicit regional service to Cedartown and Rockmart-adjacent addresses.',
      'Storage is very limited locally — plan with Rome or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural relocations.',
    ],
  },
  heard: {
    marketNotes:
      'Heard County is a very rural west-metro county with Franklin as the seat and extremely limited on-the-ground mover presence.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$4,800',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Heard moves reflect remote rural access, long travel times from Carrollton or Atlanta, and limited storage.',
    },
    tips: [
      'Extremely remote rural access challenges — confirm truck size, route, and property access before booking.',
      'Verify explicit regional service to Franklin and outer Heard addresses.',
      'Storage is very limited locally — coordinate with Carrollton or Atlanta providers.',
      'Obtain multiple written estimates and expect higher travel fees.',
      'Confirm credentials for remote rural relocations.',
    ],
  },
  meriwether: {
    marketNotes:
      'Meriwether County is a rural southwest-metro county with Greenville as the seat between Atlanta and Columbus corridors.',
    costs: {
      studioRange: '$600–$1,200+',
      familyRange: '$2,000–$4,800',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Meriwether moves reflect remote rural access and travel from Atlanta, Newnan, or Columbus bases.',
    },
    tips: [
      'Extremely remote rural access challenges — confirm routes and property access for Greenville-area moves.',
      'Verify explicit regional service to Greenville before booking.',
      'Storage is very limited locally — plan with Atlanta or Columbus providers if needed.',
      'Obtain multiple written estimates and compare Atlanta vs. Columbus crew travel fees.',
      'Confirm credentials for remote rural relocations.',
    ],
  },
  floyd: {
    marketNotes:
      'Floyd County centers on Rome, a regional hub in Northwest Georgia with industrial and residential moves along the I-75 corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Floyd County pricing reflects Rome industrial traffic, suburban growth, and travel from Atlanta northwest-ring crews.',
    },
    tips: [
      'Verify coverage for Rome and surrounding Floyd County communities before booking.',
      'Local traffic on I-75 and major Rome routes impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance and valuation for high-value homes and historic downtown properties.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple written estimates and compare hourly vs. flat-rate pricing.',
    ],
  },
  gordon: {
    marketNotes:
      'Gordon County includes Calhoun in Northwest Georgia with steady residential demand between Rome and Dalton corridors.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Gordon moves reflect I-75 corridor traffic between Rome and Dalton and suburban Calhoun communities.',
    },
    tips: [
      'Verify coverage for Calhoun and surrounding Gordon County addresses.',
      'Local traffic on I-75 impacts scheduling — confirm crew routes and arrival windows.',
      'Confirm insurance for high-value homes in newer subdivisions.',
      'Book early for peak seasons and industrial-corridor move windows.',
      'Obtain multiple written estimates and ask about travel fees from Rome or Atlanta bases.',
    ],
  },
  chattooga: {
    marketNotes:
      'Chattooga County is rural Northwest Georgia with Summerville as the seat and limited dedicated local mover presence.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Chattooga moves reflect rural access constraints and travel from Rome or Atlanta northwest-ring crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Summerville and outer Chattooga properties.',
      'Verify explicit regional service to Summerville before booking.',
      'Storage is very limited locally — coordinate with Rome or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural relocations.',
    ],
  },
  walker: {
    marketNotes:
      'Walker County is in Northwest Georgia near the Tennessee border with LaFayette as the seat and Chattanooga-area crew coverage.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Walker moves reflect I-24/US-27 corridor traffic and cross-border Chattanooga crew scheduling.',
    },
    tips: [
      'Verify coverage for LaFayette and surrounding Walker County communities.',
      'Local traffic on major routes impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and mountain-access properties.',
      'Book early for peak seasons and Chattanooga-metro crew availability.',
      'Obtain multiple written estimates from Chattanooga and Rome-area providers.',
    ],
  },
  whitfield: {
    marketNotes:
      'Whitfield County centers on Dalton, known as the Carpet Capital of the World, with industrial and residential moving demand.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Whitfield pricing reflects industrial corridor traffic, carpet-mill shift schedules, and Chattanooga-area crew demand.',
    },
    tips: [
      'Verify coverage for Dalton and surrounding Whitfield communities.',
      'Industrial traffic on I-75 impacts scheduling — book morning slots when possible.',
      'Confirm insurance for high-value homes and specialty flooring or mill equipment moves.',
      'Book early for peak seasons and month-end apartment turnover.',
      'Obtain multiple written estimates and compare Dalton vs. Chattanooga crew travel fees.',
    ],
  },
  murray: {
    marketNotes:
      'Murray County is rural Northwest Georgia with Chatsworth as the seat between Dalton and the North Georgia mountains.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Murray moves reflect rural mountain-road access and travel from Dalton or Chattanooga bases.',
    },
    tips: [
      'Rural access challenges are common — confirm property access for Chatsworth and outer Murray addresses.',
      'Verify explicit regional service to Chatsworth before booking.',
      'Storage is very limited locally — plan with Dalton or Rome providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural mountain relocations.',
    ],
  },
  catoosa: {
    marketNotes:
      'Catoosa County is in Northwest Georgia near the Tennessee border with Ringgold as the seat along the I-75 Chattanooga corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Catoosa moves reflect I-75 border traffic and Chattanooga-metro crew scheduling for Ringgold communities.',
    },
    tips: [
      'Verify coverage for Ringgold and surrounding Catoosa County addresses.',
      'Local traffic on I-75 and US-41 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes in newer Ringgold subdivisions.',
      'Book early for peak seasons and cross-border crew availability.',
      'Obtain multiple written estimates from Chattanooga-area providers.',
    ],
  },
  dade: {
    marketNotes:
      'Dade County is rural in the extreme northwest corner of Georgia with Trenton as the seat and mountainous terrain.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dade moves reflect mountainous rural access, limited storage, and travel from Chattanooga bases.',
    },
    tips: [
      'Mountainous rural access challenges are common — confirm truck size and route feasibility for Trenton.',
      'Verify explicit regional service to Trenton before booking.',
      'Storage is very limited locally — coordinate with Chattanooga providers if needed.',
      'Obtain multiple written estimates and expect higher travel fees.',
      'Confirm FMCSA credentials for remote mountain relocations.',
    ],
  },
  appling: {
    marketNotes:
      'Appling County is rural Southeast Georgia with Baxley as the seat and Savannah-metro regional crew coverage.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Appling moves reflect long travel from Savannah bases and limited rural storage options.',
    },
    tips: [
      'Rural access challenges are common — confirm property access for Baxley and outer Appling addresses.',
      'Verify explicit regional service to Baxley before booking.',
      'Storage is very limited locally — plan with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural Southeast Georgia relocations.',
    ],
  },
  atkinson: {
    marketNotes:
      'Atkinson County is rural South Georgia with Pearson as the seat and Valdosta-metro regional crew coverage.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Atkinson moves reflect rural South Georgia access and travel from Valdosta or Albany bases.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Pearson and outer Atkinson properties.',
      'Verify explicit regional service to Pearson before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural relocations.',
    ],
  },
  bacon: {
    marketNotes:
      'Bacon County is rural Southeast Georgia with Alma as the seat and Savannah-metro regional crew coverage.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Bacon moves reflect rural access constraints and travel from Savannah or Waycross-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm property access for Alma and outer Bacon addresses.',
      'Verify explicit regional service to Alma before booking.',
      'Storage is very limited locally — plan with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural Southeast Georgia relocations.',
    ],
  },
  baker: {
    marketNotes:
      'Baker County is very rural Southwest Georgia with Newton as the seat and extremely limited on-the-ground mover presence.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Baker moves reflect extremely remote rural access and long travel from Albany bases.',
    },
    tips: [
      'Extremely remote rural access challenges — confirm truck routes and property access for Newton.',
      'Verify explicit regional service to Newton before booking.',
      'Storage is very limited locally — coordinate with Albany providers if needed.',
      'Obtain multiple written estimates and expect higher travel fees.',
      'Confirm FMCSA credentials for remote rural relocations.',
    ],
  },
  baldwin: {
    marketNotes:
      'Baldwin County centers on Milledgeville with historic homes, college-community turnover, and Macon-metro crew coverage.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Baldwin moves reflect historic-home handling needs and Macon corridor traffic on US-441.',
    },
    tips: [
      'Verify coverage for Milledgeville and surrounding Baldwin County communities.',
      'Local traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value historic homes and antiques.',
      'Book early for peak seasons and college-calendar move windows.',
      'Obtain multiple written estimates from Macon-area providers.',
    ],
  },
  banks: {
    marketNotes:
      'Banks County is rural Northeast Georgia with Homer as the seat between Gainesville and Athens corridors.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Banks moves reflect rural northeast-metro access and travel from Gainesville or Atlanta bases.',
    },
    tips: [
      'Rural access challenges are common — confirm property access for Homer and outer Banks addresses.',
      'Verify explicit regional service to Homer before booking.',
      'Storage is very limited locally — plan with Gainesville or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural relocations.',
    ],
  },
  berrien: {
    marketNotes:
      'Berrien County is rural South Georgia with Nashville as the seat and Valdosta-metro regional crew coverage.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Berrien moves reflect rural access and travel from Valdosta or Tifton-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Nashville and outer Berrien properties.',
      'Verify explicit regional service to Nashville before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural relocations.',
    ],
  },
  bibb: {
    marketNotes:
      'Bibb County centers on Macon, a major Central Georgia hub with historic neighborhoods, apartments, and steady residential demand.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,300',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Bibb County pricing reflects Macon urban traffic, historic-home handling, and strong local mover competition.',
    },
    tips: [
      'Verify coverage for Macon and surrounding Bibb County communities.',
      'Local traffic on I-75 and I-16 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value historic homes and specialty items.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple written estimates and compare hourly vs. flat-rate pricing.',
    ],
  },
  bleckley: {
    marketNotes:
      'Bleckley County is rural Central Georgia with Cochran as the seat and Macon-metro regional crew coverage.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Bleckley moves reflect rural access and travel from Macon or Dublin-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm property access for Cochran and outer Bleckley addresses.',
      'Verify explicit regional service to Cochran before booking.',
      'Storage is very limited locally — plan with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm credentials for rural Central Georgia relocations.',
    ],
  },
  brantley: {
    marketNotes:
      'Brantley County is rural Southeast Georgia with Nahunta as the seat and Savannah-metro regional crew coverage.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Brantley moves reflect rural coastal-plain access and travel from Savannah bases.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Nahunta and outer Brantley properties.',
      'Verify explicit regional service to Nahunta before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  houston: {
    marketNotes:
      'Houston County is a growing Central Georgia market anchored by Warner Robins with Perry as the county seat and strong military influence from Robins Air Force Base.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Houston County pricing reflects Robins AFB PCS seasonality, Warner Robins suburban demand, and Macon-metro crew travel.',
    },
    tips: [
      'Military moves require specific experience and documentation — confirm familiarity with Robins AFB timelines and base housing rules.',
      'Verify explicit coverage for Warner Robins, Perry, and surrounding Houston County communities before booking.',
      'Confirm insurance and valuation for high-value homes in newer Warner Robins subdivisions.',
      'Book early for peak summer PCS and month-end lease turnover near Robins AFB.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Macon and Middle Georgia crews.',
    ],
  },
};

export function getGeorgiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return georgiaCountyResearch[countySlug];
}