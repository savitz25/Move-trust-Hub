import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Indiana county research — grows incrementally per batch */
export const indianaCountyResearch: Record<string, CuratedCountyResearch> = {
  marion: {
    marketNotes:
      'Marion County is the core of the Indianapolis metropolitan area with strong urban, corporate, and residential demand across Indianapolis, Speedway, and Lawrence.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Marion County pricing reflects Indianapolis metro urban demand, I-65/I-70 corridor traffic, corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Indianapolis and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lake: {
    marketNotes:
      'Lake County is a major suburban county in Northwest Indiana with strong industrial and residential demand across Gary, Hammond, Merrillville, and Crown Point near the Chicago metro.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Lake County pricing reflects Chicago-metro spillover demand, I-80/I-94 corridor traffic, industrial relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Gary, Hammond, Merrillville, and Crown Point areas before booking.',
      'Chicago-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  allen: {
    marketNotes:
      'Allen County is the core of the Fort Wayne metropolitan area with strong industrial, healthcare, and residential demand across Fort Wayne and New Haven.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Allen County pricing reflects Northeast Indiana industrial and residential demand, I-69/US-30 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Fort Wayne and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County is one of Indiana’s fastest-growing and most affluent suburban counties with strong residential demand across Carmel, Fishers, Noblesville, and Westfield.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Hamilton County pricing reflects affluent Indianapolis north-suburb demand, I-69/US-31 corridor traffic, corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Carmel, Fishers, Noblesville, and Westfield areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-joseph': {
    marketNotes:
      'St. Joseph County is the core of the South Bend metropolitan area with strong educational (University of Notre Dame), healthcare, and residential demand across South Bend and Mishawaka.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'St. Joseph County pricing reflects university-area and residential demand, US-31/US-20 corridor traffic, seasonal student move volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for South Bend and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  elkhart: {
    marketNotes:
      'Elkhart County is a key Northern Indiana county with strong manufacturing (RV industry) and residential demand across Elkhart, Goshen, and Nappanee.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Elkhart County pricing reflects RV-industry corridor demand, US-33/US-20 traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Elkhart, Goshen, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hendricks: {
    marketNotes:
      'Hendricks County is one of Indiana’s fastest-growing suburban counties west of Indianapolis with strong residential demand across Avon, Brownsburg, Plainfield, and Danville.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Hendricks County pricing reflects Indianapolis west-suburb growth, I-70/I-74 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Avon, Brownsburg, Plainfield, and Danville areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tippecanoe: {
    marketNotes:
      'Tippecanoe County is anchored by Purdue University with strong educational and residential demand across Lafayette and West Lafayette.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Tippecanoe County pricing reflects university-area demand, I-65/US-52 corridor traffic, seasonal student move volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Lafayette and West Lafayette areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  vanderburgh: {
    marketNotes:
      'Vanderburgh County is the core of the Evansville metropolitan area with strong industrial, healthcare, and residential demand across Evansville and surrounding tri-state communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Vanderburgh County pricing reflects Southwest Indiana industrial and residential demand, I-64/US-41 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Evansville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County is a rapidly growing suburban county south of Indianapolis with strong residential demand across Franklin, Greenwood, and Whiteland.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Indianapolis south-suburb growth, I-65/US-31 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Franklin, Greenwood, and surrounding areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  porter: {
    marketNotes:
      'Porter County is a suburban county in Northwest Indiana with strong residential demand across Valparaiso, Portage, and Chesterton near the Chicago metro.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Porter County pricing reflects Chicago-metro spillover demand, I-80/I-94 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Valparaiso, Portage, and Chesterton areas before booking.',
      'Chicago-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is anchored by Indiana University with strong educational and residential demand across Bloomington and surrounding communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Monroe County pricing reflects university-area demand, I-69/IN-37 corridor traffic, seasonal student move volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Bloomington and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is a key East Central Indiana county with strong industrial and residential demand across Anderson, Pendleton, and Elwood.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Madison County pricing reflects East Central Indiana industrial and residential demand, I-69 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Anderson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County is a major suburban county in the Louisville metropolitan area with strong residential demand across Jeffersonville, Clarksville, and Sellersburg.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Clark County pricing reflects Louisville-metro spillover demand, I-65 bridge corridor traffic, Ohio River flood-zone considerations, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Jeffersonville, Clarksville, and New Albany areas before booking.',
      'Louisville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  delaware: {
    marketNotes:
      'Delaware County is anchored by Ball State University with strong educational and residential demand across Muncie and Yorktown.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Delaware County pricing reflects university-area demand, I-69/US-35 corridor traffic, seasonal student move volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Muncie and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  laporte: {
    marketNotes:
      'LaPorte County is a key Northwest Indiana county with strong industrial and residential demand across La Porte, Michigan City, and Wanatah.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'LaPorte County pricing reflects Northwest Indiana lakeshore demand, I-80/I-94 and US-20 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for La Porte, Michigan City, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  vigo: {
    marketNotes:
      'Vigo County is the core of the Terre Haute metropolitan area with strong educational, healthcare, and residential demand across Terre Haute and West Terre Haute.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Vigo County pricing reflects West Central Indiana residential demand, I-70/US-41 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Terre Haute and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hancock: {
    marketNotes:
      'Hancock County is a growing suburban county east of Indianapolis with strong residential demand across Greenfield, McCordsville, and Fortville.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Hancock County pricing reflects Indianapolis east-suburb growth, I-70 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Greenfield and surrounding areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bartholomew: {
    marketNotes:
      'Bartholomew County is anchored by the city of Columbus with strong industrial (Cummins corridor) and residential demand across Columbus and Hope.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Bartholomew County pricing reflects South Central Indiana industrial and residential demand, I-65 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Columbus and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  howard: {
    marketNotes:
      'Howard County is anchored by Kokomo with strong industrial, automotive, and residential demand across Kokomo and Greentown.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Howard County pricing reflects North Central Indiana industrial and residential demand, US-31 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Kokomo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County is a growing suburban county northwest of Indianapolis with strong residential demand across Lebanon, Whitestown, and Zionsville.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Boone County pricing reflects Indianapolis northwest-suburb growth, I-65 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Lebanon and surrounding areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  floyd: {
    marketNotes:
      'Floyd County is a suburban county in the Louisville metropolitan area with strong residential demand across New Albany, Georgetown, and Floyds Knobs.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Floyd County pricing reflects Louisville-metro spillover demand, I-64 and Ohio River corridor traffic, flood-zone considerations, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for New Albany and surrounding areas before booking.',
      'Louisville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kosciusko: {
    marketNotes:
      'Kosciusko County is a key Northern Indiana county with strong manufacturing and residential demand across Warsaw, Winona Lake, and Syracuse.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Kosciusko County pricing reflects Northern Indiana lakes country demand, US-30 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Warsaw and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County is a suburban county south of Indianapolis with strong residential demand across Martinsville, Mooresville, and Brooklyn.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Morgan County pricing reflects Indianapolis south-suburb spillover demand, I-70 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Martinsville and surrounding areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warrick: {
    marketNotes:
      'Warrick County is a growing suburban county in the Evansville metropolitan area with strong residential demand across Boonville, Newburgh, and Chandler.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Warrick County pricing reflects Evansville-metro suburban growth, I-64 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Boonville and surrounding areas before booking.',
      'Evansville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County is a key East Central Indiana county with strong industrial and residential demand across Marion, Gas City, and Upland.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Grant County pricing reflects East Central Indiana industrial and residential demand, US-35 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Marion and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County is a key East Central Indiana county with strong industrial and residential demand across Richmond, Centerville, and Cambridge City.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Indiana–Ohio border industrial and residential demand, I-70/US-27 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Richmond and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dearborn: {
    marketNotes:
      'Dearborn County is a suburban county in the Cincinnati metropolitan area with strong residential demand across Lawrenceburg, Aurora, and Greendale.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Dearborn County pricing reflects Cincinnati-metro spillover demand, I-74 and Ohio River corridor traffic, flood-zone considerations, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Lawrenceburg and surrounding areas before booking.',
      'Cincinnati-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henry: {
    marketNotes:
      'Henry County is a rural East Central Indiana county with residential demand centered on New Castle, Knightstown, and Middletown.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Henry County pricing reflects East Central Indiana rural and suburban demand, US-40 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for New Castle and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  noble: {
    marketNotes:
      'Noble County is a rural Northeast Indiana county with residential demand across Albion, Kendallville, and Ligonier.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Noble County pricing reflects Northeast Indiana rural and lakes country demand, US-6 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Albion and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a key South Central Indiana county with strong industrial and residential demand across Seymour, Crothersville, and Medora.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Jackson County pricing reflects I-65 South Central Indiana industrial and residential demand, corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Seymour and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County is a key Northern Indiana county with strong industrial and residential demand across Plymouth, Bourbon, and Culver.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Marshall County pricing reflects Northern Indiana industrial and agricultural demand, US-30 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Plymouth and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shelby: {
    marketNotes:
      'Shelby County is a suburban county southeast of Indianapolis with strong residential demand across Shelbyville, Fairland, and Morristown.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Shelby County pricing reflects Indianapolis southeast-suburb spillover demand, I-74 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Shelbyville and surrounding areas before booking.',
      'Indianapolis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getIndianaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return indianaCountyResearch[countySlug];
}