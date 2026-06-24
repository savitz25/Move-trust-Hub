import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Illinois county research — grows incrementally per batch */
export const illinoisCountyResearch: Record<string, CuratedCountyResearch> = {
  cook: {
    marketNotes:
      'Cook County is Illinois’s most populous county and the core of the Chicago metropolitan area, with strong urban, corporate, and residential demand across Chicago, Evanston, Schaumburg, and surrounding suburbs.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Cook County pricing reflects Chicago traffic windows, elevator reservations, high-rise move rules, lakefront flood zones, and premium labor demand in core urban neighborhoods.',
    },
    tips: [
      'Verify coverage for Chicago, Evanston, Schaumburg, and surrounding suburbs before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban/suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Reserve loading zones, freight elevators, and building move-in/out windows early in dense Chicago neighborhoods.',
    ],
  },
  dupage: {
    marketNotes:
      'DuPage County is one of Illinois’s wealthiest and fastest-growing suburban counties with strong corporate, educational, and residential demand across Naperville, Aurora, Downers Grove, Wheaton, and surrounding western suburbs.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'DuPage County pricing reflects I-88/I-355 corridor traffic, HOA suburban communities, high-value homes, and strong demand near corporate campuses and Metra commuter towns.',
    },
    tips: [
      'Verify coverage for Naperville, Aurora, Downers Grove, Wheaton, and surrounding suburbs before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Check HOA move rules, gate access, and parking in newer DuPage subdivisions and townhome communities.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County is a major affluent suburban county north of Chicago with strong corporate, residential, and lakeshore demand across Waukegan, Libertyville, Gurnee, Highland Park, and surrounding communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Lake County pricing reflects I-94/I-294 corridor traffic, lakeshore properties, high-value suburban homes, and strong demand near Gurnee retail corridors and North Shore commuter towns.',
    },
    tips: [
      'Verify coverage for Waukegan, Libertyville, Gurnee, Highland Park, and surrounding areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Ask about specialty handling for lakeshore homes, long driveways, and narrow North Shore streets.',
    ],
  },
  will: {
    marketNotes:
      'Will County is one of Illinois’s fastest-growing counties with strong suburban residential and logistics demand across Joliet, Bolingbrook, Plainfield, and New Lenox.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Will County pricing reflects I-55/I-80 corridor growth, new-construction subdivisions, logistics-adjacent traffic, and rising demand in Plainfield and New Lenox.',
    },
    tips: [
      'Verify coverage for Joliet, Bolingbrook, Plainfield, and New Lenox areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Check HOA move rules and gate access in fast-growing Plainfield and New Lenox subdivisions.',
    ],
  },
  kane: {
    marketNotes:
      'Kane County is a rapidly growing suburban county west of Chicago with strong residential and corporate demand across Aurora, Elgin, Geneva, and St. Charles.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Kane County pricing reflects I-88/I-90 corridor traffic, Fox River valley communities, corporate campus relocations, and competition among western suburban full-service movers.',
    },
    tips: [
      'Verify coverage for Aurora, Elgin, Geneva, and St. Charles areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      'Confirm travel fees and crew routing for moves between Aurora, Elgin, and Geneva corridor towns.',
    ],
  },
  mchenry: {
    marketNotes:
      'McHenry County is a growing suburban county northwest of Chicago with strong residential demand across Crystal Lake, McHenry, Woodstock, and surrounding communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'McHenry County pricing reflects I-90/I-94 northwest corridor traffic, lake-adjacent properties, and demand in Crystal Lake and Woodstock commuter towns.',
    },
    tips: [
      'Verify coverage for Crystal Lake, McHenry, Woodstock, and surrounding areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  winnebago: {
    marketNotes:
      'Winnebago County is the core of the Rockford metropolitan area with strong manufacturing and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Winnebago County pricing reflects Rockford regional traffic, manufacturing-corridor relocations, and competition among north-central Illinois full-service movers.',
    },
    tips: [
      'Verify coverage for Rockford and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is a major county on the Illinois side of the St. Louis metropolitan area with strong industrial and residential demand across Edwardsville, Alton, Granite City, and Collinsville.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Madison County pricing reflects bi-state St. Louis metro traffic, Mississippi River corridor communities, and competition among Illinois-side and cross-border full-service movers.',
    },
    tips: [
      'Verify coverage for Edwardsville, Alton, Granite City, and Collinsville areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-clair': {
    marketNotes:
      'St. Clair County is a major county on the Illinois side of the St. Louis metropolitan area with strong industrial and residential demand across Belleville, O’Fallon, East St. Louis, and Shiloh.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'St. Clair County pricing reflects bi-state St. Louis metro traffic, Scott Air Force Base-adjacent relocations, and competition among Illinois-side full-service movers.',
    },
    tips: [
      'Verify coverage for Belleville, O’Fallon, East St. Louis, and Shiloh areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  champaign: {
    marketNotes:
      'Champaign County is anchored by the University of Illinois with strong educational and residential demand across Champaign, Urbana, and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Champaign County pricing reflects university move-in/out windows, student housing turnover, and regional I-57/I-74 corridor traffic.',
    },
    tips: [
      'Verify coverage for Champaign, Urbana, and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows around campus move periods.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and August student move-in.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sangamon: {
    marketNotes:
      'Sangamon County is the core of the Springfield metropolitan area with strong governmental and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Sangamon County pricing reflects state-government relocation cycles, I-55 corridor traffic, and central Illinois regional mover competition.',
    },
    tips: [
      'Verify coverage for Springfield and surrounding areas before booking.',
      'Governmental and legislative session traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  peoria: {
    marketNotes:
      'Peoria County is the core of the Peoria metropolitan area with strong healthcare, manufacturing, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Peoria County pricing reflects I-74 corridor traffic, healthcare-sector relocations, and central Illinois regional mover competition.',
    },
    tips: [
      'Verify coverage for Peoria and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mclean: {
    marketNotes:
      'McLean County is a key Central Illinois county anchored by Illinois State University and State Farm Insurance with strong educational, corporate, and residential demand across Bloomington and Normal.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'McLean County pricing reflects corporate relocation demand, university move windows, and I-55/I-74 corridor traffic in Bloomington-Normal.',
    },
    tips: [
      'Verify coverage for Bloomington, Normal, and surrounding areas before booking.',
      'University and corporate traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kendall: {
    marketNotes:
      'Kendall County is one of Illinois’s fastest-growing suburban counties with strong residential demand across Yorkville, Oswego, and Plano.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Kendall County pricing reflects Chicago southwest suburban growth, I-88 corridor traffic, and demand in fast-growing Yorkville and Oswego communities.',
    },
    tips: [
      'Verify coverage for Yorkville, Oswego, and Plano areas before booking.',
      'Chicago-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'rock-island': {
    marketNotes:
      'Rock Island County is part of the Quad Cities metropolitan area with strong industrial and residential demand across Rock Island, Moline, and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Rock Island County pricing reflects Quad Cities bi-state traffic, Mississippi River corridor communities, and regional industrial relocation demand.',
    },
    tips: [
      'Verify coverage for Rock Island, Moline, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tazewell: {
    marketNotes:
      'Tazewell County is a key county in the Peoria metropolitan area with strong residential and industrial demand across Pekin, Morton, and East Peoria.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Tazewell County pricing reflects Peoria metro spillover demand, I-74 corridor traffic, and industrial-adjacent residential relocations.',
    },
    tips: [
      'Verify coverage for Pekin, Morton, and East Peoria areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lasalle: {
    marketNotes:
      'LaSalle County is a significant county in North Central Illinois with strong industrial and residential demand across Ottawa, Peru, and LaSalle.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'LaSalle County pricing reflects Illinois River valley communities, industrial corridor relocations, and regional north-central Illinois mover competition.',
    },
    tips: [
      'Verify coverage for Ottawa, Peru, and LaSalle areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kankakee: {
    marketNotes:
      'Kankakee County is a key county south of Chicago with strong residential and agricultural demand across Kankakee and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Kankakee County pricing reflects south Chicago suburban spillover, I-57 corridor traffic, and regional agricultural-community relocations.',
    },
    tips: [
      'Verify coverage for Kankakee and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dekalb: {
    marketNotes:
      'DeKalb County is anchored by Northern Illinois University with strong educational and residential demand across DeKalb and Sycamore.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'DeKalb County pricing reflects university move-in/out windows, student housing turnover, and I-88 corridor traffic west of Chicago.',
    },
    tips: [
      'Verify coverage for DeKalb and Sycamore areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows around campus move periods.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and August student move-in.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  macon: {
    marketNotes:
      'Macon County is a key Central Illinois county anchored by Decatur with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Macon County pricing reflects Decatur industrial corridor relocations, Lake Decatur-adjacent properties, and central Illinois regional mover competition.',
    },
    tips: [
      'Verify coverage for Decatur and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  vermilion: {
    marketNotes:
      'Vermilion County is a key East Central Illinois county with strong industrial and residential demand across Danville and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Vermilion County pricing reflects east-central Illinois industrial demand, I-74 corridor traffic, and regional mover competition from Champaign-Urbana.',
    },
    tips: [
      'Verify coverage for Danville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  williamson: {
    marketNotes:
      'Williamson County is a key Southern Illinois county with strong healthcare and residential demand across Marion and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Williamson County pricing reflects southern Illinois healthcare-sector relocations and regional traffic on I-57.',
    },
    tips: [
      'Verify coverage for Marion and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County is a major hub in Western Illinois with strong industrial and residential demand across Quincy and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Adams County pricing reflects western Illinois tri-state corridor communities and Mississippi River-adjacent relocations.',
    },
    tips: [
      'Verify coverage for Quincy and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grundy: {
    marketNotes:
      'Grundy County is a growing suburban county southwest of Chicago with strong residential and logistics demand across Morris and surrounding communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,200–$7,200+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Grundy County pricing reflects Chicago southwest suburban spillover, I-80 corridor logistics traffic, and demand near Morris and Minooka growth corridors.',
    },
    tips: [
      'Verify coverage for Morris and surrounding areas before booking.',
      'Chicago-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  whiteside: {
    marketNotes:
      'Whiteside County is a key county in Northwest Illinois with strong industrial and residential demand across Sterling, Rock Falls, and Morrison.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Whiteside County pricing reflects Quad Cities spillover demand, Rock River valley communities, and northwest Illinois industrial relocations.',
    },
    tips: [
      'Verify coverage for Sterling, Rock Falls, and Morrison areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County is a suburban county in Northern Illinois with strong residential demand across Belvidere and surrounding Rockford-metro communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Boone County pricing reflects Rockford metro suburban growth, I-90 corridor traffic, and demand in Belvidere commuter communities.',
    },
    tips: [
      'Verify coverage for Belvidere and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a key Southern Illinois county anchored by Southern Illinois University with strong educational and residential demand across Carbondale and Murphysboro.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Jackson County pricing reflects SIU student move windows, southern Illinois rural routes, and regional healthcare-adjacent relocations.',
    },
    tips: [
      'Verify coverage for Carbondale, Murphysboro, and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows around campus move periods.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and August student move-in.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ogle: {
    marketNotes:
      'Ogle County is a rural Northern Illinois county with residential demand across Oregon and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Ogle County pricing reflects rural northern Illinois drive times, farm-property access, and spillover demand from Rockford and DeKalb metros.',
    },
    tips: [
      'Verify coverage for Oregon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henry: {
    marketNotes:
      'Henry County is a key county in Northwest Illinois with strong agricultural and residential demand across Cambridge and Quad Cities-influenced communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Henry County pricing reflects Quad Cities metro spillover, Mississippi River valley traffic, and northwest Illinois agricultural-property relocations.',
    },
    tips: [
      'Verify coverage for Cambridge and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  knox: {
    marketNotes:
      'Knox County is a key county in West Central Illinois with strong educational and residential demand across Galesburg.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Knox County pricing reflects Galesburg regional traffic, rail-corridor communities, and spillover demand from Quad Cities and Peoria metros.',
    },
    tips: [
      'Verify coverage for Galesburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  coles: {
    marketNotes:
      'Coles County is anchored by Eastern Illinois University with strong educational and residential demand across Charleston and Mattoon.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Coles County pricing reflects EIU student move windows, east-central Illinois rural routes, and Champaign-Urbana metro spillover.',
    },
    tips: [
      'Verify coverage for Charleston and Mattoon areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows around campus move periods.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and August student move-in.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  macoupin: {
    marketNotes:
      'Macoupin County is a rural county in Southwest Illinois with residential demand across Carlinville and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Macoupin County pricing reflects southwest Illinois rural drive times, farm-property access, and spillover demand from St. Louis and Springfield metros.',
    },
    tips: [
      'Verify coverage for Carlinville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stephenson: {
    marketNotes:
      'Stephenson County is a key county in Northwest Illinois with strong industrial and residential demand across Freeport.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Stephenson County pricing reflects Rockford metro spillover, I-90 corridor traffic, and northwest Illinois industrial relocations.',
    },
    tips: [
      'Verify coverage for Freeport and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  woodford: {
    marketNotes:
      'Woodford County is a suburban county in Central Illinois with strong residential demand across Eureka and Peoria-metro communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Woodford County pricing reflects Peoria metro suburban growth, I-74 corridor traffic, and central Illinois residential relocations.',
    },
    tips: [
      'Verify coverage for Eureka and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clinton: {
    marketNotes:
      'Clinton County is a rural county in South Central Illinois with residential demand across Carlyle and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Clinton County pricing reflects south-central Illinois rural routes, Carlyle Lake-area properties, and spillover demand from St. Louis metro.',
    },
    tips: [
      'Verify coverage for Carlyle and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County is a rural South Central Illinois county with residential demand across Vandalia and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Fayette County pricing reflects rural south-central Illinois drive times, historic-town properties, and spillover demand from Springfield metro.',
    },
    tips: [
      'Verify coverage for Vandalia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shelby: {
    marketNotes:
      'Shelby County is a rural Central Illinois county with residential demand across Shelbyville and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Shelby County pricing reflects central Illinois rural routes, farm-property access, and spillover demand from Decatur and Bloomington metros.',
    },
    tips: [
      'Verify coverage for Shelbyville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  perry: {
    marketNotes:
      'Perry County is a rural Southern Illinois county with residential demand across Pinckneyville and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Perry County pricing reflects southern Illinois rural drive times and spillover demand from Marion and Carbondale metros.',
    },
    tips: [
      'Verify coverage for Pinckneyville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a rural South Central Illinois county with residential demand across Nashville and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Washington County pricing reflects south-central Illinois rural routes and spillover demand from St. Louis and Marion metros.',
    },
    tips: [
      'Verify coverage for Nashville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  massac: {
    marketNotes:
      'Massac County is a Southern Illinois county with residential demand across Metropolis and Ohio River communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Massac County pricing reflects far-southern Illinois rural routes, Ohio River valley communities, and spillover demand from Carbondale metro.',
    },
    tips: [
      'Verify coverage for Metropolis and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County is a rural Southern Illinois county with residential demand across Vienna and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Johnson County pricing reflects southern Illinois rural drive times and spillover demand from Carbondale and Marion metros.',
    },
    tips: [
      'Verify coverage for Vienna and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ford: {
    marketNotes:
      'Ford County is a rural East Central Illinois county with residential demand across Paxton and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Ford County pricing reflects east-central Illinois rural routes, agricultural communities, and spillover demand from Champaign and Kankakee metros.',
    },
    tips: [
      'Verify coverage for Paxton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  white: {
    marketNotes:
      'White County is a rural Southeast Illinois county with residential demand across Carmi and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'White County pricing reflects southeast Illinois rural drive times and spillover demand from Marion and Carbondale metros.',
    },
    tips: [
      'Verify coverage for Carmi and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a rural South Central Illinois county with residential demand across Louisville and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Clay County pricing reflects south-central Illinois rural routes and spillover demand from Springfield and Marion metros.',
    },
    tips: [
      'Verify coverage for Louisville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cass: {
    marketNotes:
      'Cass County is a rural West Central Illinois county with residential demand across Virginia and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Cass County pricing reflects west-central Illinois rural drive times and spillover demand from Springfield and Quincy metros.',
    },
    tips: [
      'Verify coverage for Virginia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mason: {
    marketNotes:
      'Mason County is a rural Central Illinois county with residential demand across Havana and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Mason County pricing reflects central Illinois rural routes, Illinois River valley communities, and spillover demand from Peoria and Springfield metros.',
    },
    tips: [
      'Verify coverage for Havana and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  menard: {
    marketNotes:
      'Menard County is a rural Central Illinois county with residential demand across Petersburg and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Menard County pricing reflects Springfield metro spillover and central Illinois rural residential relocations.',
    },
    tips: [
      'Verify coverage for Petersburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County is a rural Central Illinois county with residential demand across Lacon and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Marshall County pricing reflects central Illinois rural drive times and spillover demand from Peoria and Bloomington metros.',
    },
    tips: [
      'Verify coverage for Lacon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is a rural West Central Illinois county with residential demand across Carrollton and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Greene County pricing reflects west-central Illinois rural routes and spillover demand from Springfield and St. Louis metros.',
    },
    tips: [
      'Verify coverage for Carrollton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wabash: {
    marketNotes:
      'Wabash County is a rural Southeast Illinois county with residential demand across Mount Carmel and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Wabash County pricing reflects southeast Illinois rural drive times and spillover demand from Marion and Carbondale metros.',
    },
    tips: [
      'Verify coverage for Mount Carmel and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cumberland: {
    marketNotes:
      'Cumberland County is a rural East Central Illinois county with residential demand across Toledo and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Cumberland County pricing reflects east-central Illinois rural routes and spillover demand from Champaign and Decatur metros.',
    },
    tips: [
      'Verify coverage for Toledo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jasper: {
    marketNotes:
      'Jasper County is a rural Southeast Illinois county with residential demand across Newton and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Jasper County pricing reflects southeast Illinois rural drive times and spillover demand from Decatur, Champaign, and Marion metros.',
    },
    tips: [
      'Verify coverage for Newton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County is a rural Southern Illinois county with residential demand across McLeansboro and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Hamilton County pricing reflects southern Illinois rural routes and spillover demand from Marion and Carbondale metros.',
    },
    tips: [
      'Verify coverage for McLeansboro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  schuyler: {
    marketNotes:
      'Schuyler County is a rural West Central Illinois county with residential demand across Rushville and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Schuyler County pricing reflects west-central Illinois rural drive times and spillover demand from Quincy and Springfield metros.',
    },
    tips: [
      'Verify coverage for Rushville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  brown: {
    marketNotes:
      'Brown County is a rural West Central Illinois county with residential demand across Mount Sterling and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Brown County pricing reflects west-central Illinois rural routes and spillover demand from Quincy and Springfield metros.',
    },
    tips: [
      'Verify coverage for Mount Sterling and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henderson: {
    marketNotes:
      'Henderson County is a rural West Central Illinois county with residential demand across Oquawka and Mississippi River communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Henderson County pricing reflects Mississippi River valley communities and spillover demand from Quad Cities and Quincy metros.',
    },
    tips: [
      'Verify coverage for Oquawka and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  edwards: {
    marketNotes:
      'Edwards County is a rural Southeast Illinois county with residential demand across Albion and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Edwards County pricing reflects southeast Illinois rural drive times and spillover demand from Marion and Carbondale metros.',
    },
    tips: [
      'Verify coverage for Albion and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  putnam: {
    marketNotes:
      'Putnam County is a small rural county in North Central Illinois with residential demand across Hennepin and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Putnam County pricing reflects north-central Illinois rural routes and spillover demand from Ottawa and Peoria metros.',
    },
    tips: [
      'Verify coverage for Hennepin and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stark: {
    marketNotes:
      'Stark County is a small rural county in North Central Illinois with residential demand across Toulon and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Stark County pricing reflects north-central Illinois rural drive times and spillover demand from Peoria and Marshall County metros.',
    },
    tips: [
      'Verify coverage for Toulon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  scott: {
    marketNotes:
      'Scott County is a rural West Central Illinois county with residential demand across Winchester and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Scott County pricing reflects west-central Illinois rural routes and spillover demand from Springfield and Quincy metros.',
    },
    tips: [
      'Verify coverage for Winchester and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pulaski: {
    marketNotes:
      'Pulaski County is a rural Southern Illinois county with residential demand across Mound City and Ohio River communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Pulaski County pricing reflects far-southern Illinois rural routes and spillover demand from Carbondale and Marion metros.',
    },
    tips: [
      'Verify coverage for Mound City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gallatin: {
    marketNotes:
      'Gallatin County is a rural Southern Illinois county with residential demand across Shawneetown and Ohio River communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Gallatin County pricing reflects southern Illinois rural drive times and spillover demand from Marion and Carbondale metros.',
    },
    tips: [
      'Verify coverage for Shawneetown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  alexander: {
    marketNotes:
      'Alexander County is a rural Southern Illinois county with residential demand across Cairo and Mississippi-Ohio River confluence communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Alexander County pricing reflects far-southern Illinois rural routes, river-valley properties, and spillover demand from Carbondale metro.',
    },
    tips: [
      'Verify coverage for Cairo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  calhoun: {
    marketNotes:
      'Calhoun County is a small rural county in West Central Illinois with residential demand across Hardin and Mississippi River communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Calhoun County pricing reflects Mississippi River peninsula communities and spillover demand from St. Louis and Quincy metros.',
    },
    tips: [
      'Verify coverage for Hardin and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pope: {
    marketNotes:
      'Pope County is a small rural Southern Illinois county with residential demand across Golconda and Ohio River communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Pope County pricing reflects southern Illinois rural drive times and spillover demand from Carbondale and Marion metros.',
    },
    tips: [
      'Verify coverage for Golconda and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hardin: {
    marketNotes:
      'Hardin County is a small rural Southern Illinois county with residential demand across Elizabethtown and Shawnee National Forest communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$140/hr for a 2-person crew',
      note: 'Hardin County pricing reflects southern Illinois rural routes, forest-adjacent properties, and spillover demand from Carbondale metro.',
    },
    tips: [
      'Verify coverage for Elizabethtown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bureau: {
    marketNotes:
      'Bureau County is a rural North Central Illinois county with residential demand across Princeton and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Bureau County pricing reflects north-central Illinois rural routes, I-80 corridor traffic, and spillover demand from Ottawa and Quad Cities metros.',
    },
    tips: [
      'Verify coverage for Princeton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County is a rural Northwest Illinois county with residential demand across Mount Carroll and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Carroll County pricing reflects northwest Illinois rural drive times and spillover demand from Rockford and Quad Cities metros.',
    },
    tips: [
      'Verify coverage for Mount Carroll and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'jo-daviess': {
    marketNotes:
      'Jo Daviess County is a scenic rural Northwest Illinois county with tourism and residential demand across Galena and Mississippi River bluff communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Jo Daviess County pricing reflects Galena tourism-season demand, historic-property relocations, and spillover from Quad Cities metro.',
    },
    tips: [
      'Verify coverage for Galena and surrounding areas before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows around peak visitor seasons.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak tourist seasons (May–October) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lee: {
    marketNotes:
      'Lee County is a rural North Central Illinois county with residential demand across Dixon and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Lee County pricing reflects north-central Illinois rural routes, Reagan Parkway corridor traffic, and spillover demand from Rockford and Quad Cities metros.',
    },
    tips: [
      'Verify coverage for Dixon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mercer: {
    marketNotes:
      'Mercer County is a rural Northwest Illinois county with residential demand across Aledo and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Mercer County pricing reflects northwest Illinois rural drive times and spillover demand from Quad Cities and Henry County metros.',
    },
    tips: [
      'Verify coverage for Aledo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is a rural West Central Illinois county with residential demand across Monmouth and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Warren County pricing reflects west-central Illinois rural routes and spillover demand from Galesburg, Peoria, and Quad Cities metros.',
    },
    tips: [
      'Verify coverage for Monmouth and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  christian: {
    marketNotes:
      'Christian County is a rural Central Illinois county with residential demand across Taylorville and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Christian County pricing reflects central Illinois rural routes and spillover demand from Springfield and Decatur metros.',
    },
    tips: [
      'Verify coverage for Taylorville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'de-witt': {
    marketNotes:
      'De Witt County is a rural Central Illinois county with residential demand across Clinton and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'De Witt County pricing reflects central Illinois rural drive times and spillover demand from Bloomington and Springfield metros.',
    },
    tips: [
      'Verify coverage for Clinton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County is a rural East Central Illinois county with residential demand across Tuscola and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Douglas County pricing reflects east-central Illinois rural routes and spillover demand from Champaign-Urbana and Danville metros.',
    },
    tips: [
      'Verify coverage for Tuscola and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  edgar: {
    marketNotes:
      'Edgar County is a rural East Central Illinois county with residential demand across Paris and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Edgar County pricing reflects east-central Illinois rural drive times and spillover demand from Champaign and Danville metros.',
    },
    tips: [
      'Verify coverage for Paris and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  effingham: {
    marketNotes:
      'Effingham County is a key county in South Central Illinois with strong transportation and residential demand across Effingham and I-57/I-70 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Effingham County pricing reflects south-central Illinois logistics corridor traffic, regional interstate access, and spillover demand from Decatur and Champaign metros.',
    },
    tips: [
      'Verify coverage for Effingham and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fulton: {
    marketNotes:
      'Fulton County is a rural West Central Illinois county with residential demand across Lewistown and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Fulton County pricing reflects west-central Illinois rural routes and spillover demand from Peoria and Galesburg metros.',
    },
    tips: [
      'Verify coverage for Lewistown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  livingston: {
    marketNotes:
      'Livingston County is a rural Central Illinois county with residential demand across Pontiac and I-55 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Livingston County pricing reflects central Illinois interstate corridor traffic and spillover demand from Bloomington and Kankakee metros.',
    },
    tips: [
      'Verify coverage for Pontiac and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  logan: {
    marketNotes:
      'Logan County is a rural Central Illinois county with residential demand across Lincoln and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Logan County pricing reflects central Illinois rural routes, historic-town properties, and spillover demand from Springfield and Bloomington metros.',
    },
    tips: [
      'Verify coverage for Lincoln and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  moultrie: {
    marketNotes:
      'Moultrie County is a rural Central Illinois county with residential demand across Sullivan and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Moultrie County pricing reflects central Illinois rural drive times and spillover demand from Decatur and Champaign metros.',
    },
    tips: [
      'Verify coverage for Sullivan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  piatt: {
    marketNotes:
      'Piatt County is a rural Central Illinois county with residential demand across Monticello and Champaign-metro-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Piatt County pricing reflects Champaign-Urbana metro spillover and central Illinois rural residential relocations.',
    },
    tips: [
      'Verify coverage for Monticello and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hancock: {
    marketNotes:
      'Hancock County is a rural West Central Illinois county with residential demand across Carthage and Mississippi River-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Hancock County pricing reflects west-central Illinois rural routes and spillover demand from Quincy and Galesburg metros.',
    },
    tips: [
      'Verify coverage for Carthage and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcdonough: {
    marketNotes:
      'McDonough County is anchored by Western Illinois University with strong educational and residential demand across Macomb.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'McDonough County pricing reflects university-season demand, west-central Illinois rural routes, and spillover from Galesburg and Peoria metros.',
    },
    tips: [
      'Verify coverage for Macomb and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows and student-move timing.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County is a key West Central Illinois county with strong educational and residential demand across Jacksonville.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Morgan County pricing reflects west-central Illinois rural routes, historic-town properties, and spillover demand from Springfield and Decatur metros.',
    },
    tips: [
      'Verify coverage for Jacksonville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pike: {
    marketNotes:
      'Pike County is a rural West Central Illinois county with residential demand across Pittsfield and surrounding communities.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600+',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Pike County pricing reflects rural west-central Illinois market rates and spillover demand from Quincy and Springfield metros.',
    },
    tips: [
      'Verify coverage for Pittsfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County is a rural East Central Illinois county near the Indiana border with residential demand across Marshall and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Clark County pricing reflects east-central Illinois rural drive times and spillover demand from Danville and Champaign metros.',
    },
    tips: [
      'Verify coverage for Marshall and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  iroquois: {
    marketNotes:
      'Iroquois County is a rural East Central Illinois county with residential demand across Watseka and Kankakee-metro-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Iroquois County pricing reflects Kankakee metro spillover, east-central Illinois rural routes, and cross-coverage from Champaign and Danville providers.',
    },
    tips: [
      'Verify coverage for Watseka and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bond: {
    marketNotes:
      'Bond County is a rural South Central Illinois county with residential demand across Greenville and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Bond County pricing reflects south-central Illinois rural routes and spillover demand from St. Louis and Springfield metros.',
    },
    tips: [
      'Verify coverage for Greenville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jersey: {
    marketNotes:
      'Jersey County is a suburban/rural county in Southwest Illinois with residential demand across Jerseyville and Mississippi River-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Jersey County pricing reflects southwest Illinois rural drive times and spillover demand from St. Louis metro providers.',
    },
    tips: [
      'Verify coverage for Jerseyville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a suburban county on the Illinois side of the St. Louis metropolitan area with strong residential demand across Waterloo and river-bluff communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Monroe County pricing reflects St. Louis-metro suburban demand, river-bluff access, and higher competition among regional full-service providers.',
    },
    tips: [
      'Verify coverage for Waterloo and surrounding areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a rural South Central Illinois county with residential demand across Hillsboro and I-55 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects south-central Illinois rural routes and spillover demand from Springfield and Decatur metros.',
    },
    tips: [
      'Verify coverage for Hillsboro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  randolph: {
    marketNotes:
      'Randolph County is a rural Southwest Illinois county with residential demand across Chester and Mississippi River communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Randolph County pricing reflects southwest Illinois rural drive times and spillover demand from St. Louis and Carbondale metros.',
    },
    tips: [
      'Verify coverage for Chester and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crawford: {
    marketNotes:
      'Crawford County is a rural East Central Illinois county with residential demand across Robinson and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Crawford County pricing reflects east-central Illinois rural routes and spillover demand from Danville and Champaign metros.',
    },
    tips: [
      'Verify coverage for Robinson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a key Southern Illinois county with residential demand across Benton and Williamson-metro-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Franklin County pricing reflects southern Illinois rural market rates and spillover demand from Marion and Carbondale metros.',
    },
    tips: [
      'Verify coverage for Benton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a key Southern Illinois county with residential demand across Mount Vernon and crossroads corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects southern Illinois hub demand at I-57/I-64 and spillover from Marion and St. Louis metros.',
    },
    tips: [
      'Verify coverage for Mount Vernon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lawrence: {
    marketNotes:
      'Lawrence County is a rural East Central Illinois county with residential demand across Lawrenceville and Wabash River-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Lawrence County pricing reflects east-central Illinois rural drive times and spillover demand from Danville and Vincennes-area regional providers.',
    },
    tips: [
      'Verify coverage for Lawrenceville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is a key South Central Illinois county with residential demand across Salem and surrounding communities — distinct from Williamson County’s city of Marion.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Marion County pricing reflects south-central Illinois rural routes and spillover demand from Springfield and Williamson-metro providers.',
    },
    tips: [
      'Verify coverage for Salem and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  richland: {
    marketNotes:
      'Richland County is a rural Southeast Illinois county with residential demand across Olney and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Richland County pricing reflects southeast Illinois rural market rates and spillover demand from Marion and Danville metros.',
    },
    tips: [
      'Verify coverage for Olney and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  saline: {
    marketNotes:
      'Saline County is a key Southern Illinois county with residential demand across Harrisburg and Shawnee National Forest-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Saline County pricing reflects southern Illinois rural routes and spillover demand from Marion and Carbondale metros.',
    },
    tips: [
      'Verify coverage for Harrisburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  union: {
    marketNotes:
      'Union County is a rural Southern Illinois county with residential demand across Jonesboro and Mississippi River-adjacent communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Union County pricing reflects southern Illinois rural drive times and spillover demand from Carbondale and St. Louis metros.',
    },
    tips: [
      'Verify coverage for Jonesboro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County is a rural Southeast Illinois county with residential demand across Fairfield and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Wayne County pricing reflects southeast Illinois rural market rates and spillover demand from Marion and White County regional providers.',
    },
    tips: [
      'Verify coverage for Fairfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getIllinoisCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return illinoisCountyResearch[countySlug];
}