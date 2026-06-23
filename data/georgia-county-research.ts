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
      'Fayette County is an affluent suburban county south of Atlanta with Fayetteville as the seat, plus Peachtree City golf-cart communities and executive-home demand.',
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
      'Rockdale County is a suburban county east of Atlanta with Conyers as the seat and steady I-20 corridor family relocations.',
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
      'Coweta County is a growing suburban county south of Atlanta with Newnan as the seat and steady family relocations in Senoia and Sharpsburg.',
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
      'Barrow County is a suburban county northeast of Atlanta with Winder as the seat and commuter demand from Gwinnett and Athens corridors.',
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
      'Walton County is a suburban and rural county east of Atlanta with Monroe as the seat and growing family demand in Loganville and Social Circle.',
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
  columbia: {
    marketNotes:
      'Columbia County is one of the fastest-growing counties in the Augusta metro with strong suburban residential demand in Evans, Grovetown, and Appling.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,100–$4,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Columbia County pricing reflects CSRA suburban growth, new-construction HOA communities, and Augusta-metro traffic on I-20 and Washington Road.',
    },
    tips: [
      'Verify explicit coverage for Appling, Evans, Grovetown, and surrounding Columbia County addresses before booking.',
      'Augusta-area traffic on I-20 and Washington Road impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance and valuation for high-value suburban homes in newer Evans subdivisions.',
      'Book early for peak seasons and month-end lease turnover in fast-growing CSRA communities.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Augusta-area crews.',
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
      'Bartow County includes Cartersville with industrial and suburban growth along the I-75 northwest corridor between Atlanta and Chattanooga.',
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
      'Spalding County includes Griffin south of Atlanta with steady residential and commuter demand along the I-75 corridor.',
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
      'Butts County is rural with Jackson as the seat and limited on-the-ground mover presence south of the Atlanta metro.',
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
      'Morgan County is rural with Madison as the seat and historic-home relocation demand between Athens and Atlanta.',
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
      'Jackson County is a rural and suburban county northeast of Atlanta with Jefferson as the seat and I-85 corridor growth.',
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
      'Haralson County is rural west of Atlanta with Buchanan as the seat and limited dedicated local mover presence.',
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
      'Meriwether County is rural West Georgia with Greenville as the seat along the LaGrange and Columbus corridor.',
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
      'Gordon County includes Calhoun in Northwest Georgia with steady residential demand along the Rome–Dalton corridor.',
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
      'Whitfield County centers on Dalton, known as the Carpet Capital of the World, with significant industrial and residential activity.',
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
      'Bibb County centers on Macon with historic districts and strong residential and commercial activity across Central Georgia.',
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
  lowndes: {
    marketNotes:
      'Lowndes County centers on Valdosta in South Georgia with university, Moody AFB, and steady residential turnover across the I-75 corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Lowndes County pricing reflects Valdosta suburban demand, VSU move-in seasonality, and South Georgia crew travel from Albany bases.',
    },
    tips: [
      'Verify explicit coverage for Valdosta, Lake Park, and surrounding Lowndes County addresses before booking.',
      'Local traffic on I-75 and Bemiss Road impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance and valuation for high-value homes before booking.',
      'Book early for peak seasons, university move-in windows, and month-end lease turnover.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Valdosta and Albany-area crews.',
    ],
  },
  bulloch: {
    marketNotes:
      'Bulloch County includes Statesboro with strong university (Georgia Southern) influence and residential demand across the Savannah metro fringe.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Bulloch County pricing reflects Georgia Southern move-in seasonality, Statesboro suburban growth, and travel from Savannah-area crews.',
    },
    tips: [
      'University-related moves are common — confirm experience with Georgia Southern housing timelines and dormitory access rules.',
      'Verify explicit coverage for Statesboro, Brooklet, Portal, and surrounding Bulloch County addresses before booking.',
      'Confirm insurance and valuation for high-value homes before booking.',
      'Book early for peak seasons, university move-in windows, and month-end lease turnover.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Statesboro and Savannah-area crews.',
    ],
  },
  effingham: {
    marketNotes:
      'Effingham County is a suburban/rural county north of Savannah with Springfield as the seat and steady commuter residential demand.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Effingham County pricing reflects Savannah-metro traffic windows, rural driveway access, and travel from Pooler and Savannah bases.',
    },
    tips: [
      'Verify explicit coverage for Springfield, Rincon, Guyton, and surrounding Effingham County addresses before booking.',
      'Savannah-area traffic on I-16 and Highway 21 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance and valuation for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Savannah-metro crews.',
    ],
  },
  glynn: {
    marketNotes:
      'Glynn County centers on Brunswick with significant coastal, port, and tourist-related residential activity along Georgia\'s Golden Isles.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Glynn County pricing reflects coastal property access, St. Simons and Jekyll Island logistics, and peak tourist-season demand.',
    },
    tips: [
      'Coastal properties require specialized planning — confirm experience with marsh-side homes, island bridges, and humidity-sensitive packing.',
      'Verify explicit coverage for Brunswick, St. Simons Island, and surrounding Glynn County addresses before booking.',
      'Confirm insurance and valuation for high-value coastal homes before booking.',
      'Book early for peak tourist seasons, snowbird turnover, and month-end closings.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Brunswick and Savannah coastal crews.',
    ],
  },
  dougherty: {
    marketNotes:
      'Dougherty County centers on Albany in Southwest Georgia with steady residential turnover across the Flint River corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dougherty County pricing reflects Albany suburban demand, rural South Georgia travel, and limited on-the-ground mover competition.',
    },
    tips: [
      'Verify explicit coverage for Albany, Putney, and surrounding Dougherty County addresses before booking.',
      'Local traffic on Slappey Boulevard and Dawson Road impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance and valuation for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Albany and South Georgia crews.',
    ],
  },
  troup: {
    marketNotes:
      'Troup County centers on LaGrange in West Georgia with industrial and residential activity along the I-85 corridor between Atlanta and Columbus.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Troup County pricing reflects LaGrange industrial growth, I-85 corridor traffic, and travel from Columbus and Atlanta metro bases.',
    },
    tips: [
      'Verify explicit coverage for LaGrange, Hogansville, and surrounding Troup County addresses before booking.',
      'Local traffic on I-85 and Lafayette Parkway impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance and valuation for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from LaGrange, Columbus, and Atlanta-area crews.',
    ],
  },
  liberty: {
    marketNotes:
      'Liberty County includes Hinesville with strong military (Fort Stewart) influence and steady PCS and residential turnover along the Savannah coast.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Liberty County pricing reflects Fort Stewart PCS seasonality, on-base housing rules, and travel from Pooler and Savannah-area crews.',
    },
    tips: [
      'Military moves require specific experience — confirm familiarity with Fort Stewart timelines, base housing access, and PCS documentation.',
      'Verify explicit coverage for Hinesville, Walthourville, and surrounding Liberty County addresses before booking.',
      'Confirm insurance and valuation for high-value homes before booking.',
      'Book early for peak PCS seasons and month-end lease turnover near Fort Stewart.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Savannah and coastal Georgia crews.',
    ],
  },
  camden: {
    marketNotes:
      'Camden County is coastal Southeast Georgia with Woodbine as the seat and Kings Bay submarine base driving military and residential demand.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Camden County pricing reflects coastal property access, Kings Bay PCS seasonality, and travel from Brunswick and Savannah bases.',
    },
    tips: [
      'Coastal properties require specialized planning — confirm experience with marsh-side homes, St. Marys access, and humidity-sensitive packing.',
      'Verify explicit regional service to Woodbine, Kingsland, and St. Marys before booking.',
      'Storage is very limited locally — coordinate with Brunswick or Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees from coastal crews.',
      'Confirm FMCSA credentials and military-move experience for Kings Bay relocations.',
    ],
  },
  bryan: {
    marketNotes:
      'Bryan County is coastal and rural near Savannah with Pembroke as the seat and growing suburban demand around Richmond Hill.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Bryan County pricing reflects coastal rural access, I-95 corridor traffic, and travel from Pooler and Savannah-area crews.',
    },
    tips: [
      'Coastal properties require specialized planning — confirm truck routes for Pembroke and outer Bryan County addresses.',
      'Verify explicit regional service to Pembroke and Richmond Hill before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for coastal and rural Southeast Georgia relocations.',
    ],
  },
  laurens: {
    marketNotes:
      'Laurens County includes Dublin in Central Georgia with rural residential demand between Macon and the South Carolina border.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Laurens County pricing reflects rural driveway access, limited storage, and travel from Macon and Middle Georgia bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes and property access for Dublin and outer Laurens addresses.',
      'Verify explicit regional service to Dublin before booking.',
      'Storage is very limited locally — plan with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  habersham: {
    marketNotes:
      'Habersham County is rural Northeast Georgia with Clarkesville as the seat and mountain-access residential demand near Lake Burton.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Habersham County pricing reflects mountainous rural access, limited storage, and travel from Gainesville or Atlanta north-metro bases.',
    },
    tips: [
      'Mountainous rural access challenges are common — confirm truck size and route feasibility before booking.',
      'Verify explicit regional service to Clarkesville, Cornelia, and surrounding Habersham addresses.',
      'Storage is very limited locally — coordinate with Gainesville or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural mountain relocations.',
    ],
  },
  colquitt: {
    marketNotes:
      'Colquitt County includes Moultrie in South Georgia with agricultural and rural residential demand across the I-75 southwest corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Colquitt County pricing reflects rural South Georgia access, limited mover competition, and travel from Albany or Valdosta bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Moultrie and outer Colquitt properties.',
      'Verify explicit regional service to Moultrie before booking.',
      'Storage is very limited locally — plan with Albany or Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  thomas: {
    marketNotes:
      'Thomas County includes Thomasville in South Georgia with historic-home and rural residential demand near the Florida border.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Thomas County pricing reflects Thomasville suburban demand, rural property access, and travel from Valdosta and Tallahassee-area crews.',
    },
    tips: [
      'Verify explicit coverage for Thomasville and surrounding Thomas County addresses before booking.',
      'Local traffic on US-319 and the Florida border corridor impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance and valuation for high-value historic homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Thomasville and Valdosta-area crews.',
    ],
  },
  lee: {
    marketNotes:
      'Lee County is suburban and rural near Albany with Leesburg as the seat and steady residential growth along the I-75 southwest corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Lee County pricing reflects Albany-metro crew travel, suburban Leesburg growth, and rural property access south of Dougherty County.',
    },
    tips: [
      'Verify explicit coverage for Leesburg and surrounding Lee County addresses before booking.',
      'Local traffic on US-19 and the I-75 corridor impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance and valuation for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Albany-area crews.',
    ],
  },
  gilmer: {
    marketNotes:
      'Gilmer County is rural and mountainous in North Georgia with Ellijay as the seat and apple-country residential demand.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Gilmer moves reflect mountain-road access, limited storage, and travel from Atlanta or Dalton north-metro bases.',
    },
    tips: [
      'Mountain roads and access challenges are common — confirm truck size and route feasibility before booking.',
      'Verify explicit regional service to Ellijay and outer Gilmer addresses.',
      'Storage is very limited locally — plan interim storage with Atlanta or Gainesville providers if needed.',
      'Obtain multiple written estimates and compare travel fees from north-metro bases.',
      'Confirm credentials and insurance for rural and mountain relocations.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is rural Northeast Georgia with Danielsville as the seat between Athens and the South Carolina border.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Madison County pricing reflects rural driveway access, limited storage, and travel from Athens or Atlanta northeast-ring crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Danielsville and outer Madison properties.',
      'Verify explicit regional service to Danielsville before booking.',
      'Storage is very limited locally — coordinate with Athens or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Northeast Georgia relocations.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County includes Jesup in Southeast Georgia with rural residential and industrial corridor demand along US-301.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Wayne County pricing reflects rural coastal-plain access and travel from Savannah or Brunswick bases.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Jesup and outer Wayne properties.',
      'Verify explicit regional service to Jesup before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is rural Central Georgia with Forsyth as the seat between Macon and the Fall Line communities.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Monroe County pricing reflects rural property access, limited storage, and travel from Macon and Middle Georgia bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Forsyth and outer Monroe addresses.',
      'Verify explicit regional service to Forsyth before booking.',
      'Storage is very limited locally — plan with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  peach: {
    marketNotes:
      'Peach County includes Fort Valley in Central Georgia with rural residential demand and Fort Valley State University influence.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Peach County pricing reflects Fort Valley suburban demand, university turnover, and travel from Macon-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm property access for Fort Valley and outer Peach addresses.',
      'Verify explicit regional service to Fort Valley before booking.',
      'Storage is very limited locally — coordinate with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  white: {
    marketNotes:
      'White County is rural and mountainous in Northeast Georgia with Cleveland as the seat near Helen and the North Georgia mountains.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'White County pricing reflects mountain-road access, tourist-season demand, and travel from Gainesville or Atlanta north-metro bases.',
    },
    tips: [
      'Mountain roads and access challenges are common — confirm truck size and route feasibility before booking.',
      'Verify explicit regional service to Cleveland and outer White County addresses.',
      'Storage is very limited locally — plan with Gainesville or Atlanta providers if needed.',
      'Obtain multiple written estimates and compare travel fees.',
      'Confirm credentials and insurance for rural and mountain relocations.',
    ],
  },
  decatur: {
    marketNotes:
      'Decatur County includes Bainbridge in Southwest Georgia with rural residential demand along the Florida border and Lake Seminole corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Decatur County pricing reflects rural South Georgia access, limited mover competition, and travel from Albany or Tallahassee-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Bainbridge and outer Decatur properties.',
      'Verify explicit regional service to Bainbridge before booking.',
      'Storage is very limited locally — plan with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  jones: {
    marketNotes:
      'Jones County is rural Central Georgia with Gray as the seat between Macon and the northeast metro fringe.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Jones County pricing reflects rural property access, I-75 corridor traffic, and travel from Macon-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Gray and outer Jones addresses.',
      'Verify explicit regional service to Gray before booking.',
      'Storage is very limited locally — coordinate with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  hart: {
    marketNotes:
      'Hart County is rural Northeast Georgia with Hartwell as the seat and lake-influenced residential demand along Lake Hartwell.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Hart County pricing reflects lake-property access, rural driveways, and travel from Athens or Atlanta northeast-ring crews.',
    },
    tips: [
      'Lake properties have access challenges — confirm dock, driveway, and steep-grade feasibility before booking.',
      'Verify explicit regional service to Hartwell and surrounding Hart County addresses.',
      'Storage is very limited locally — plan with Athens or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural and lake-area relocations.',
    ],
  },
  upson: {
    marketNotes:
      'Upson County is rural Central Georgia with Thomaston as the seat between Macon and the west-metro fringe.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Upson County pricing reflects rural property access, limited storage, and travel from Macon and Middle Georgia bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Thomaston and outer Upson addresses.',
      'Verify explicit regional service to Thomaston before booking.',
      'Storage is very limited locally — coordinate with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  sumter: {
    marketNotes:
      'Sumter County includes Americus in Southwest Georgia with rural residential demand and Georgia Southwestern State University influence.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Sumter County pricing reflects Americus suburban demand, university turnover, and travel from Albany-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm property access for Americus and outer Sumter addresses.',
      'Verify explicit regional service to Americus before booking.',
      'Storage is very limited locally — plan with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  stephens: {
    marketNotes:
      'Stephens County includes Toccoa in Northeast Georgia with rural residential demand near Lake Hartwell and the South Carolina border.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Stephens County pricing reflects rural driveway access, limited storage, and travel from Athens or Atlanta northeast-ring crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Toccoa and outer Stephens properties.',
      'Verify explicit regional service to Toccoa before booking.',
      'Storage is very limited locally — coordinate with Athens or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Northeast Georgia relocations.',
    ],
  },
  union: {
    marketNotes:
      'Union County is rural and mountainous in Northeast Georgia with Blairsville as the seat near Vogel State Park and the North Georgia mountains.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Union County pricing reflects mountain-road access, tourist-season demand, and travel from Gainesville or Atlanta north-metro bases.',
    },
    tips: [
      'Mountain roads and access challenges are common — confirm truck size and route feasibility before booking.',
      'Verify explicit regional service to Blairsville and outer Union addresses.',
      'Storage is very limited locally — plan with Gainesville or Atlanta providers if needed.',
      'Obtain multiple written estimates and compare travel fees.',
      'Confirm credentials and insurance for rural and mountain relocations.',
    ],
  },
  toombs: {
    marketNotes:
      'Toombs County is rural Southeast Georgia with Lyons as the seat and Vidalia onion-country residential demand along US-1.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Toombs County pricing reflects rural coastal-plain access and travel from Savannah or Statesboro bases.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Lyons and outer Toombs properties.',
      'Verify explicit regional service to Lyons and Vidalia before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  grady: {
    marketNotes:
      'Grady County is rural South Georgia with Cairo as the seat along the Florida border and agricultural corridor demand.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Grady County pricing reflects rural South Georgia access, limited mover competition, and travel from Valdosta or Thomasville bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Cairo and outer Grady properties.',
      'Verify explicit regional service to Cairo before booking.',
      'Storage is very limited locally — plan with Valdosta or Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is rural Northeast Georgia with Carnesville as the seat between Athens and the South Carolina border.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Franklin County pricing reflects rural driveway access, limited storage, and travel from Athens or Atlanta northeast-ring crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Carnesville and outer Franklin addresses.',
      'Verify explicit regional service to Carnesville before booking.',
      'Storage is very limited locally — coordinate with Athens or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Northeast Georgia relocations.',
    ],
  },
  fannin: {
    marketNotes:
      'Fannin County is rural and mountainous in Northeast Georgia with Blue Ridge as the seat and strong tourist and lake-home demand.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Fannin County pricing reflects mountain-road access, seasonal cabin turnover, and travel from Chattanooga or Atlanta north-metro bases.',
    },
    tips: [
      'Mountain roads and access challenges are common — confirm truck size and route feasibility before booking.',
      'Verify explicit regional service to Blue Ridge and outer Fannin addresses.',
      'Storage is very limited locally — plan with Gainesville, Dalton, or Atlanta providers if needed.',
      'Obtain multiple written estimates and compare travel fees from north Georgia bases.',
      'Confirm credentials and insurance for rural and mountain relocations.',
    ],
  },
  burke: {
    marketNotes:
      'Burke County is rural east Georgia with Waynesboro as the seat between Augusta and the coastal plain.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Burke County pricing reflects rural property access, limited storage, and travel from Augusta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Waynesboro and outer Burke properties.',
      'Verify explicit regional service to Waynesboro before booking.',
      'Storage is very limited locally — coordinate with Augusta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural east Georgia relocations.',
    ],
  },
  tattnall: {
    marketNotes:
      'Tattnall County is rural Southeast Georgia with Reidsville as the seat and agricultural corridor demand along US-280.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Tattnall County pricing reflects rural coastal-plain access and travel from Savannah or Statesboro bases.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Reidsville and outer Tattnall properties.',
      'Verify explicit regional service to Reidsville before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  putnam: {
    marketNotes:
      'Putnam County is rural Central Georgia with Eatonton as the seat and lake-influenced residential demand along Lake Oconee.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Putnam County pricing reflects lake-property access, rural driveways, and travel from Macon and Middle Georgia bases.',
    },
    tips: [
      'Lake properties have access challenges — confirm dock, driveway, and steep-grade feasibility before booking.',
      'Verify explicit regional service to Eatonton and Lake Oconee communities before booking.',
      'Storage is very limited locally — coordinate with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural and lake-area relocations.',
    ],
  },
  emanuel: {
    marketNotes:
      'Emanuel County is rural Southeast Georgia with Swainsboro as the seat and East Georgia State College influence.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Emanuel County pricing reflects rural coastal-plain access and travel from Savannah or Statesboro bases.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Swainsboro and outer Emanuel properties.',
      'Verify explicit regional service to Swainsboro before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  long: {
    marketNotes:
      'Long County is rural coastal Southeast Georgia with Ludowici as the seat between Savannah and Fort Stewart.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Long County pricing reflects coastal rural access, I-95 corridor traffic, and travel from Pooler and Savannah bases.',
    },
    tips: [
      'Coastal properties require specialized planning — confirm experience with rural coastal driveways and marsh-adjacent access.',
      'Verify explicit regional service to Ludowici before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for coastal and rural Southeast Georgia relocations.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is rural Central Georgia with Greensboro as the seat between Macon and the Lake Oconee corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Greene County pricing reflects rural property access, limited storage, and travel from Macon or Athens-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Greensboro and outer Greene addresses.',
      'Verify explicit regional service to Greensboro before booking.',
      'Storage is very limited locally — plan with Macon or Athens providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  mcduffie: {
    marketNotes:
      'McDuffie County is rural in the CSRA with Thomson as the seat between Augusta and the Central Savannah River corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'McDuffie County pricing reflects rural property access, limited storage, and travel from Augusta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Thomson and outer McDuffie properties.',
      'Verify explicit regional service to Thomson before booking.',
      'Storage is very limited locally — coordinate with Augusta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural CSRA relocations.',
    ],
  },
  lamar: {
    marketNotes:
      'Lamar County is rural south of Atlanta with Barnesville as the seat along the Griffin and Macon corridor.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lamar County pricing reflects rural driveway access, limited storage, and travel from Atlanta or Griffin south-metro bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Barnesville and outer Lamar addresses.',
      'Verify explicit regional service to Barnesville before booking.',
      'Storage is very limited locally — plan with Atlanta or Griffin providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural south-metro relocations.',
    ],
  },
  pike: {
    marketNotes:
      'Pike County is rural south of Atlanta with Zebulon as the seat between Griffin and the west-metro fringe.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Pike County pricing reflects rural property access, I-75 south corridor traffic, and travel from Atlanta metro bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Zebulon and outer Pike properties.',
      'Verify explicit regional service to Zebulon before booking.',
      'Storage is very limited locally — coordinate with Atlanta or Griffin providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural south-metro relocations.',
    ],
  },
  pierce: {
    marketNotes:
      'Pierce County is rural Southeast Georgia with Blackshear as the seat between Waycross and the coastal plain.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Pierce County pricing reflects rural coastal-plain access and travel from Savannah or Waycross-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Blackshear and outer Pierce properties.',
      'Verify explicit regional service to Blackshear before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  mitchell: {
    marketNotes:
      'Mitchell County is rural Southwest Georgia with Camilla as the seat along the Albany and Moultrie corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Mitchell County pricing reflects rural property access and travel from Albany or Moultrie-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Camilla and outer Mitchell properties.',
      'Verify explicit regional service to Camilla before booking.',
      'Storage is very limited locally — coordinate with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  elbert: {
    marketNotes:
      'Elbert County is rural Northeast Georgia with Elberton as the seat in the granite-belt corridor between Athens and South Carolina.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Elbert County pricing reflects rural northeast-metro access and travel from Athens or Atlanta crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Elberton and outer Elbert addresses.',
      'Verify explicit regional service to Elberton before booking.',
      'Storage is very limited locally — plan with Athens or Atlanta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Northeast Georgia relocations.',
    ],
  },
  worth: {
    marketNotes:
      'Worth County is rural Southwest Georgia with Sylvester as the seat along the Albany and Tifton corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Worth County pricing reflects rural property access and travel from Albany or Tifton-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Sylvester and outer Worth properties.',
      'Verify explicit regional service to Sylvester before booking.',
      'Storage is very limited locally — coordinate with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  dodge: {
    marketNotes:
      'Dodge County is rural Central Georgia with Eastman as the seat along the Macon and I-16 corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dodge County pricing reflects rural property access and travel from Macon or Middle Georgia crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Eastman and outer Dodge addresses.',
      'Verify explicit regional service to Eastman before booking.',
      'Storage is very limited locally — plan with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is rural Central Georgia with Sandersville as the seat between Macon and Augusta.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Washington County pricing reflects rural property access and travel from Macon or Augusta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Sandersville and outer Washington properties.',
      'Verify explicit regional service to Sandersville before booking.',
      'Storage is very limited locally — coordinate with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  crisp: {
    marketNotes:
      'Crisp County includes Cordele in South Georgia along the I-75 corridor between Macon and Albany.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Crisp County pricing reflects rural I-75 corridor access and travel from Valdosta or Albany-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Cordele and outer Crisp properties.',
      'Verify explicit regional service to Cordele before booking.',
      'Storage is very limited locally — coordinate with Valdosta or Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  cook: {
    marketNotes:
      'Cook County is rural South Georgia with Adel as the seat along the Valdosta and Tifton corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Cook County pricing reflects rural property access and travel from Valdosta or Tifton-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Adel and outer Cook properties.',
      'Verify explicit regional service to Adel before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  jasper: {
    marketNotes:
      'Jasper County is rural southeast of Atlanta with Monticello as the seat between Newton and the Macon corridor.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Jasper County pricing reflects rural driveway access, limited storage, and travel from Atlanta south-metro bases.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Monticello and outer Jasper addresses.',
      'Verify explicit regional service to Monticello before booking.',
      'Storage is very limited locally — plan with Atlanta or Griffin providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural south-metro relocations.',
    ],
  },
  rabun: {
    marketNotes:
      'Rabun County is rural and mountainous in Northeast Georgia with Clayton as the seat near the North Carolina border.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Rabun County pricing reflects mountain-road access, limited storage, and travel from Atlanta northeast-metro crews.',
    },
    tips: [
      'Mountain roads and access challenges are common — confirm truck size and route feasibility for Clayton.',
      'Verify explicit regional service to Clayton before booking.',
      'Storage is very limited locally — plan with Atlanta northeast-metro providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural and mountain relocations.',
    ],
  },
  'ben-hill': {
    marketNotes:
      'Ben Hill County is rural South Georgia with Fitzgerald as the seat along the I-75 corridor between Valdosta and Macon.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Ben Hill County pricing reflects rural property access and travel from Valdosta or Tifton-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Fitzgerald and outer Ben Hill properties.',
      'Verify explicit regional service to Fitzgerald before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  oglethorpe: {
    marketNotes:
      'Oglethorpe County is rural with Lexington as the seat between Athens and the Madison historic corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Oglethorpe County pricing reflects rural property access and travel from Athens or Atlanta crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Lexington and outer Oglethorpe addresses.',
      'Verify explicit regional service to Lexington before booking.',
      'Storage is very limited locally — plan with Athens providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Northeast Georgia relocations.',
    ],
  },
  brooks: {
    marketNotes:
      'Brooks County is rural South Georgia with Quitman as the seat along the Florida border and Valdosta corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Brooks County pricing reflects rural property access and travel from Valdosta or Thomasville-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Quitman and outer Brooks properties.',
      'Verify explicit regional service to Quitman before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  'jeff-davis': {
    marketNotes:
      'Jeff Davis County is rural Southeast Georgia with Hazlehurst as the seat between Savannah and Statesboro.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Jeff Davis County pricing reflects rural coastal-plain access and travel from Savannah or Statesboro crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Hazlehurst and outer Jeff Davis properties.',
      'Verify explicit regional service to Hazlehurst before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is rural in the CSRA with Louisville as the seat between Augusta and Sandersville.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects rural property access and travel from Augusta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Louisville and outer Jefferson properties.',
      'Verify explicit regional service to Louisville before booking.',
      'Storage is very limited locally — coordinate with Augusta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural CSRA relocations.',
    ],
  },
  screven: {
    marketNotes:
      'Screven County is rural with Sylvania as the seat between Savannah and the CSRA inland corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Screven County pricing reflects rural property access and travel from Savannah-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Sylvania and outer Screven properties.',
      'Verify explicit regional service to Sylvania before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  towns: {
    marketNotes:
      'Towns County is rural and mountainous in Northeast Georgia with Hiawassee as the seat and Lake Chatuge influence.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Towns County pricing reflects mountain-road and lake-property access and travel from Atlanta northeast-metro crews.',
    },
    tips: [
      'Mountain roads and lake access challenges are common — confirm truck size and route feasibility for Hiawassee.',
      'Verify explicit regional service to Hiawassee before booking.',
      'Storage is very limited locally — plan with Atlanta northeast-metro providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural and mountain relocations.',
    ],
  },
  charlton: {
    marketNotes:
      'Charlton County is rural Southeast Georgia with Folkston as the seat along the Florida border and Okefenokee corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Charlton County pricing reflects rural coastal-plain access and travel from Brunswick or Savannah crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Folkston and outer Charlton properties.',
      'Verify explicit regional service to Folkston before booking.',
      'Storage is very limited locally — coordinate with Brunswick or Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  mcintosh: {
    marketNotes:
      'McIntosh County is coastal with Darien as the seat between Savannah and the Golden Isles.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'McIntosh County pricing reflects coastal marsh access, limited storage, and travel from Brunswick or Savannah crews.',
    },
    tips: [
      'Coastal properties require specialized planning — confirm experience with marsh-adjacent and rural coastal driveways.',
      'Verify explicit regional service to Darien before booking.',
      'Storage is very limited locally — coordinate with Brunswick or Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for coastal and rural Southeast Georgia relocations.',
    ],
  },
  crawford: {
    marketNotes:
      'Crawford County is rural Central Georgia with Knoxville as the seat southwest of Macon.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Crawford County pricing reflects rural property access and travel from Macon-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Knoxville and outer Crawford addresses.',
      'Verify explicit regional service to Knoxville before booking.',
      'Storage is very limited locally — plan with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  macon: {
    marketNotes:
      'Macon County is rural Central Georgia with Oglethorpe as the seat — distinct from Bibb County and the city of Macon.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Macon County pricing reflects rural southwest Georgia access and travel from Macon or Americus-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Oglethorpe and outer Macon County properties.',
      'Verify explicit regional service to Oglethorpe before booking — do not assume Bibb County Macon city coverage.',
      'Storage is very limited locally — coordinate with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  candler: {
    marketNotes:
      'Candler County is rural Southeast Georgia with Metter as the seat between Statesboro and Savannah.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Candler County pricing reflects rural coastal-plain access and travel from Savannah or Statesboro crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Metter and outer Candler properties.',
      'Verify explicit regional service to Metter before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  telfair: {
    marketNotes:
      'Telfair County is rural Southeast Georgia with McRae-Helena as the seat along the Vidalia and Macon corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Telfair County pricing reflects rural property access and travel from Savannah or Statesboro crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for McRae-Helena and outer Telfair properties.',
      'Verify explicit regional service to McRae-Helena before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  dooly: {
    marketNotes:
      'Dooly County is rural Central Georgia with Vienna as the seat along the I-75 and Americus corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Dooly County pricing reflects rural property access and travel from Macon or Albany-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Vienna and outer Dooly addresses.',
      'Verify explicit regional service to Vienna before booking.',
      'Storage is very limited locally — plan with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  evans: {
    marketNotes:
      'Evans County is rural Southeast Georgia with Claxton as the seat and fruit-belt agricultural influence.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Evans County pricing reflects rural coastal-plain access and travel from Savannah or Statesboro crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Claxton and outer Evans properties.',
      'Verify explicit regional service to Claxton before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  lanier: {
    marketNotes:
      'Lanier County is rural South Georgia with Lakeland as the seat along the Valdosta and Moody Air Force corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Lanier County pricing reflects rural property access and travel from Valdosta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Lakeland and outer Lanier properties.',
      'Verify explicit regional service to Lakeland before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  early: {
    marketNotes:
      'Early County is rural Southwest Georgia with Blakely as the seat along the Alabama border and Albany corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Early County pricing reflects remote rural access and travel from Albany or Dothan-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Blakely and outer Early properties.',
      'Verify explicit regional service to Blakely before booking.',
      'Storage is very limited locally — coordinate with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  pulaski: {
    marketNotes:
      'Pulaski County is rural Central Georgia with Hawkinsville as the seat along the Macon and Perry corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Pulaski County pricing reflects rural property access and travel from Macon-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Hawkinsville and outer Pulaski addresses.',
      'Verify explicit regional service to Hawkinsville before booking.',
      'Storage is very limited locally — plan with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  wilkes: {
    marketNotes:
      'Wilkes County is rural Northeast Georgia with Washington as the seat and historic downtown significance along the Athens and CSRA corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Wilkes County pricing reflects rural property access and travel from Athens or Augusta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Washington and outer Wilkes addresses.',
      'Verify explicit regional service to Washington before booking — not Washington County (Sandersville).',
      'Storage is very limited locally — plan with Athens or Augusta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Northeast Georgia relocations.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County is rural Central Georgia with Wrightsville as the seat between Macon and the CSRA inland corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Johnson County pricing reflects rural property access and travel from Macon-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Wrightsville and outer Johnson properties.',
      'Verify explicit regional service to Wrightsville before booking.',
      'Storage is very limited locally — coordinate with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  seminole: {
    marketNotes:
      'Seminole County is rural Southwest Georgia with Donalsonville as the seat along the Alabama border and Chattahoochee River corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Seminole County pricing reflects remote rural access and travel from Albany or Dothan-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Donalsonville and outer Seminole properties.',
      'Verify explicit regional service to Donalsonville before booking.',
      'Storage is very limited locally — coordinate with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  turner: {
    marketNotes:
      'Turner County is rural South Georgia with Ashburn as the seat along the I-75 corridor between Cordele and Tifton.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Turner County pricing reflects rural property access and travel from Valdosta or Tifton-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Ashburn and outer Turner properties.',
      'Verify explicit regional service to Ashburn before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  irwin: {
    marketNotes:
      'Irwin County is rural South Georgia with Ocilla as the seat along the Tifton and Valdosta corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Irwin County pricing reflects rural property access and travel from Valdosta or Tifton-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Ocilla and outer Irwin properties.',
      'Verify explicit regional service to Ocilla before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  jenkins: {
    marketNotes:
      'Jenkins County is rural Southeast Georgia with Millen as the seat between Augusta and Savannah.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Jenkins County pricing reflects rural property access and travel from Savannah-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Millen and outer Jenkins properties.',
      'Verify explicit regional service to Millen before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  wilcox: {
    marketNotes:
      'Wilcox County is rural South Georgia with Abbeville as the seat along the I-75 and Hawkinsville corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Wilcox County pricing reflects rural property access and travel from Valdosta or Macon-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Abbeville and outer Wilcox properties.',
      'Verify explicit regional service to Abbeville before booking.',
      'Storage is very limited locally — coordinate with Valdosta or Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural South Georgia relocations.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is rural Southeast Georgia with Mount Vernon as the seat — distinct from Montgomery County, Alabama.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects rural coastal-plain access and travel from Savannah or Statesboro crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Mount Vernon and outer Montgomery properties.',
      'Verify explicit regional service to Mount Vernon before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  hancock: {
    marketNotes:
      'Hancock County is rural Central Georgia with Sparta as the seat between Milledgeville and the CSRA corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Hancock County pricing reflects rural property access and travel from Macon or Augusta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Sparta and outer Hancock addresses.',
      'Verify explicit regional service to Sparta before booking.',
      'Storage is very limited locally — plan with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  wilkinson: {
    marketNotes:
      'Wilkinson County is rural Central Georgia with Irwinton as the seat between Macon and Sandersville.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Wilkinson County pricing reflects rural property access and travel from Macon-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Irwinton and outer Wilkinson addresses.',
      'Verify explicit regional service to Irwinton before booking.',
      'Storage is very limited locally — coordinate with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  wheeler: {
    marketNotes:
      'Wheeler County is rural Southeast Georgia with Alamo as the seat along the Vidalia and Soperton corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Wheeler County pricing reflects rural property access and travel from Savannah or Statesboro crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Alamo and outer Wheeler properties.',
      'Verify explicit regional service to Alamo before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is rural in the Columbus area with Buena Vista as the seat southwest of Fort Moore.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Marion County pricing reflects rural property access and travel from Columbus-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Buena Vista and outer Marion properties.',
      'Verify explicit regional service to Buena Vista before booking.',
      'Storage is very limited locally — coordinate with Columbus providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural West Georgia relocations.',
    ],
  },
  twiggs: {
    marketNotes:
      'Twiggs County is rural Central Georgia with Jeffersonville as the seat between Macon and Sandersville.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Twiggs County pricing reflects rural property access and travel from Macon-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Jeffersonville and outer Twiggs addresses.',
      'Verify explicit regional service to Jeffersonville before booking.',
      'Storage is very limited locally — plan with Macon providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Central Georgia relocations.',
    ],
  },
  clinch: {
    marketNotes:
      'Clinch County is rural Southeast Georgia with Homerville as the seat along the Valdosta and Waycross corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Clinch County pricing reflects rural property access and travel from Valdosta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Homerville and outer Clinch properties.',
      'Verify explicit regional service to Homerville before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  treutlen: {
    marketNotes:
      'Treutlen County is rural Southeast Georgia with Soperton as the seat between Dublin and Vidalia.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Treutlen County pricing reflects rural property access and travel from Savannah or Statesboro crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Soperton and outer Treutlen properties.',
      'Verify explicit regional service to Soperton before booking.',
      'Storage is very limited locally — coordinate with Savannah providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southeast Georgia relocations.',
    ],
  },
  randolph: {
    marketNotes:
      'Randolph County is rural Southwest Georgia with Cuthbert as the seat along the Alabama border corridor.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Randolph County pricing reflects remote rural access and travel from Albany-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Cuthbert and outer Randolph properties.',
      'Verify explicit regional service to Cuthbert before booking.',
      'Storage is very limited locally — coordinate with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  miller: {
    marketNotes:
      'Miller County is rural Southwest Georgia with Colquitt as the seat — distinct from Colquitt County (Moultrie).',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Miller County pricing reflects rural property access and travel from Albany or Dothan-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Colquitt and outer Miller properties.',
      'Verify explicit regional service to Colquitt before booking — not Colquitt County (Moultrie).',
      'Storage is very limited locally — coordinate with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  talbot: {
    marketNotes:
      'Talbot County is rural in the Columbus area with Talbotton as the seat between Columbus and Macon.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Talbot County pricing reflects rural property access and travel from Columbus-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Talbotton and outer Talbot properties.',
      'Verify explicit regional service to Talbotton before booking.',
      'Storage is very limited locally — coordinate with Columbus providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural West Georgia relocations.',
    ],
  },
  calhoun: {
    marketNotes:
      'Calhoun County is rural Southwest Georgia with Morgan as the seat — distinct from Morgan County (Madison).',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Calhoun County pricing reflects remote rural access and travel from Albany-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Morgan and outer Calhoun properties.',
      'Verify explicit regional service to Morgan before booking — not Morgan County (Madison).',
      'Storage is very limited locally — coordinate with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is rural in the CSRA with Warrenton as the seat between Augusta and Sandersville.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Warren County pricing reflects rural property access and travel from Augusta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Warrenton and outer Warren addresses.',
      'Verify explicit regional service to Warrenton before booking.',
      'Storage is very limited locally — coordinate with Augusta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural CSRA relocations.',
    ],
  },
  chattahoochee: {
    marketNotes:
      'Chattahoochee County is rural with Cusseta as the seat and strong military influence from Fort Moore.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Chattahoochee County pricing reflects military PCS seasonality, rural property access, and travel from Columbus-area crews.',
    },
    tips: [
      'Military moves require specific experience — confirm PCS and government billing familiarity for Fort Moore relocations.',
      'Verify explicit regional service to Cusseta before booking.',
      'Storage is very limited locally — coordinate with Columbus providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural and military relocations.',
    ],
  },
  clarke: {
    marketNotes:
      'Clarke County centers on Athens with significant University of Georgia influence and steady student and faculty turnover.',
    costs: {
      studioRange: '$600–$1,200',
      familyRange: '$2,000–$4,500',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Clarke County pricing reflects university-area apartment demand, historic neighborhoods, and Athens corridor traffic.',
    },
    tips: [
      'University-related moves are common — confirm experience with UGA dorms, apartments, and August move-in windows.',
      'Verify coverage for Athens and surrounding Clarke County addresses before booking.',
      'Confirm insurance and valuation for high-value homes and antiques in historic districts.',
      'Book early for peak seasons and UGA academic-calendar move windows.',
      'Obtain multiple written estimates and compare flat-rate vs. hourly pricing.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is rural Southwest Georgia with Fort Gaines as the seat along the Alabama border — distinct from Clayton County (Atlanta metro).',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Clay County pricing reflects remote rural access and travel from Albany or Dothan-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Fort Gaines and outer Clay properties.',
      'Verify explicit regional service to Fort Gaines before booking.',
      'Storage is very limited locally — coordinate with Albany providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural Southwest Georgia relocations.',
    ],
  },
  echols: {
    marketNotes:
      'Echols County is very rural in South Georgia with Statenville as the seat along the Florida border.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Echols County pricing reflects extremely remote rural access and travel from Valdosta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm routes for Statenville and outer Echols properties.',
      'Verify explicit regional service to Statenville before booking.',
      'Storage is very limited locally — coordinate with Valdosta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for remote rural South Georgia relocations.',
    ],
  },
  glascock: {
    marketNotes:
      'Glascock County is one of the smallest and most rural counties in the CSRA with Gibson as the seat.',
    costs: {
      studioRange: '$550–$1,100',
      familyRange: '$1,900–$4,200',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Glascock County pricing reflects extremely remote rural access and travel from Augusta-area crews.',
    },
    tips: [
      'Rural access challenges are common — confirm truck routes for Gibson and outer Glascock addresses.',
      'Verify explicit regional service to Gibson before booking.',
      'Storage is very limited locally — coordinate with Augusta providers if needed.',
      'Obtain multiple written estimates and confirm travel fees.',
      'Confirm FMCSA credentials for rural CSRA relocations.',
    ],
  },
};

export function getGeorgiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return georgiaCountyResearch[countySlug];
}