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
  lawrence: {
    marketNotes:
      'Lawrence County is a key South Central Indiana county with strong industrial and residential demand across Bedford, Mitchell, and the limestone corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Lawrence County pricing reflects South Central Indiana industrial and residential demand, I-69/IN-37 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Bedford and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dekalb: {
    marketNotes:
      'DeKalb County is a key Northeast Indiana county with strong industrial and residential demand across Auburn, Garrett, and Waterloo.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'DeKalb County pricing reflects Northeast Indiana industrial and automotive heritage demand, I-69 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Auburn and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dubois: {
    marketNotes:
      'Dubois County is a key Southern Indiana county with strong manufacturing and residential demand across Jasper, Huntingburg, and Ferdinand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Dubois County pricing reflects Southern Indiana manufacturing corridor demand, I-64 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Jasper and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lagrange: {
    marketNotes:
      'LaGrange County is a rural Northeast Indiana county with residential demand across LaGrange, Shipshewana, and Topeka.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'LaGrange County pricing reflects rural Northeast Indiana and Amish country demand, US-20 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for LaGrange and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harrison: {
    marketNotes:
      'Harrison County is a suburban county in the Louisville metropolitan area with strong residential demand across Corydon, Lanesville, and Elizabeth.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Harrison County pricing reflects Louisville-metro spillover demand, I-64 and Ohio River corridor traffic, flood-zone considerations, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Corydon and surrounding areas before booking.',
      'Louisville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a key West Central Indiana county with strong educational (Wabash College) and residential demand across Crawfordsville and Ladoga.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects West Central Indiana university-area demand, I-74/US-231 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Crawfordsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  putnam: {
    marketNotes:
      'Putnam County is a rural West Central Indiana county with educational (DePauw University) and residential demand across Greencastle and Roachdale.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Putnam County pricing reflects West Central Indiana university-area and rural demand, I-70 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Greencastle and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cass: {
    marketNotes:
      'Cass County is a rural North Central Indiana county with residential demand centered on Logansport and Walton.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Cass County pricing reflects North Central Indiana rural and twin-cities demand, US-24/US-35 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Logansport and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  huntington: {
    marketNotes:
      'Huntington County is a rural Northeast Indiana county with residential demand across Huntington, Roanoke, and Warren.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Huntington County pricing reflects Northeast Indiana rural demand, US-24 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Huntington and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County is a rural Northeast Indiana county with residential demand across Decatur, Berne, and Geneva.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Adams County pricing reflects Northeast Indiana rural and Swiss-heritage community demand, US-27/US-33 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Decatur and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  knox: {
    marketNotes:
      'Knox County is a key Southwest Indiana county with strong educational (Vincennes University) and residential demand across Vincennes and Bicknell.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Knox County pricing reflects Southwest Indiana Wabash River corridor demand, historic Vincennes community relocations, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Vincennes and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  whitley: {
    marketNotes:
      'Whitley County is a rural Northeast Indiana county with residential demand across Columbia City, South Whitley, and Churubusco.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Whitley County pricing reflects Northeast Indiana rural demand, US-30 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Columbia City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  steuben: {
    marketNotes:
      'Steuben County is a rural Northeast Indiana county with strong tourism and residential demand across Angola, Fremont, and Lake James communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Steuben County pricing reflects Northeast Indiana lakes tourism demand, seasonal traffic near Pokagon State Park, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Angola and surrounding areas before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak tourist seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  miami: {
    marketNotes:
      'Miami County is a rural North Central Indiana county with residential demand centered on Peru, Grissom Air Reserve Base communities, and Denver.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Miami County pricing reflects North Central Indiana rural demand, US-24/US-31 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Peru and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  daviess: {
    marketNotes:
      'Daviess County is a rural Southwest Indiana county with residential demand centered on Washington and Odon.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Daviess County pricing reflects Southwest Indiana rural demand, US-50 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Washington and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jasper: {
    marketNotes:
      'Jasper County is a rural Northwest Indiana county with residential demand across Rensselaer, DeMotte, and Wheatfield.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Jasper County pricing reflects Northwest Indiana rural demand, US-41 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Rensselaer and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a key Southeast Indiana county with strong residential demand across historic Madison and Hanover along the Ohio River.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Ohio River corridor demand, historic-home relocation considerations, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Madison and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clinton: {
    marketNotes:
      'Clinton County is a rural Central Indiana county with residential demand centered on Frankfort and Rossville.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Clinton County pricing reflects Central Indiana rural demand, I-65 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Frankfort and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gibson: {
    marketNotes:
      'Gibson County is a rural Southwest Indiana county with residential demand centered on Princeton and Oakland City.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Gibson County pricing reflects Southwest Indiana rural demand, Patoka River corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Princeton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is a rural Southwest Indiana county with residential demand across Bloomfield, Linton, and Jasonville.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Greene County pricing reflects Southwest Indiana rural demand, US-231 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Bloomfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wabash: {
    marketNotes:
      'Wabash County is a rural North Central Indiana county with residential demand across Wabash, North Manchester, and La Fontaine.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Wabash County pricing reflects North Central Indiana rural demand, US-24 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Wabash and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ripley: {
    marketNotes:
      'Ripley County is a rural Southeast Indiana county with residential demand across Versailles, Batesville, and Osgood.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Ripley County pricing reflects Southeast Indiana rural demand, Cincinnati-metro spillover, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Versailles and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wells: {
    marketNotes:
      'Wells County is a rural Northeast Indiana county with residential demand centered on Bluffton and Ossian.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Wells County pricing reflects Northeast Indiana rural demand, US-224 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Bluffton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a rural South Central Indiana county with residential demand centered on Salem and Campbellsburg.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Washington County pricing reflects South Central Indiana rural demand, I-64 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Salem and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jennings: {
    marketNotes:
      'Jennings County is a rural Southeast Indiana county with residential demand across Vernon, North Vernon, and Butlerville.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Jennings County pricing reflects Southeast Indiana rural demand, I-65 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Vernon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  decatur: {
    marketNotes:
      'Decatur County is a rural Southeast Indiana county with residential demand centered on Greensburg and Westport.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Decatur County pricing reflects Southeast Indiana rural demand, I-74 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Greensburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a rural West Central Indiana county with residential demand centered on Brazil and Clay City.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Clay County pricing reflects West Central Indiana rural demand, US-40 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Brazil and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  scott: {
    marketNotes:
      'Scott County is a rural Southeast Indiana county with residential demand centered on Scottsburg and Austin.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Scott County pricing reflects Southeast Indiana rural demand, I-65 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Scottsburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  white: {
    marketNotes:
      'White County is a rural North Central Indiana county with residential demand across Monticello, Brookston, and lakes country near Lake Freeman and Lake Shafer.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'White County pricing reflects North Central Indiana lakes country demand, seasonal tourism traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Monticello and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  posey: {
    marketNotes:
      'Posey County is a suburban/rural county in the Evansville metropolitan area with residential demand centered on Mount Vernon and New Harmony along the Ohio River.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Posey County pricing reflects Evansville-metro suburban demand, Ohio River corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Mount Vernon and surrounding areas before booking.',
      'Evansville-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and Ohio River flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  randolph: {
    marketNotes:
      'Randolph County is a rural East Central Indiana county with residential demand centered on Winchester and Union City.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Randolph County pricing reflects East Central Indiana rural demand, US-27 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Winchester and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County is a rural East Central Indiana county with residential demand centered on Connersville along the Whitewater River valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Fayette County pricing reflects East Central Indiana rural demand, Whitewater Valley corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Connersville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  starke: {
    marketNotes:
      'Starke County is a rural Northwest Indiana county with residential demand centered on Knox and North Judson.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Starke County pricing reflects Northwest Indiana rural demand, US-35 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Knox and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a rural Southeast Indiana county with residential demand centered on Brookville and Metamora along the Whitewater River.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Southeast Indiana rural demand, historic canal corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Brookville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  owen: {
    marketNotes:
      'Owen County is a rural South Central Indiana county with residential demand centered on Spencer near McCormicks Creek State Park.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Owen County pricing reflects South Central Indiana rural demand, state park corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Spencer and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sullivan: {
    marketNotes:
      'Sullivan County is a rural Southwest Indiana county with residential demand centered on Sullivan and Carlisle in the Wabash Valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Sullivan County pricing reflects Southwest Indiana rural demand, Wabash Valley corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Sullivan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County is a rural North Central Indiana county with residential demand centered on Delphi and Flora along the Wabash River.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Carroll County pricing reflects North Central Indiana rural demand, Wabash River corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Delphi and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fulton: {
    marketNotes:
      'Fulton County is a rural North Central Indiana county with residential demand centered on Rochester and Akron.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Fulton County pricing reflects North Central Indiana rural demand, US-31 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Rochester and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jay: {
    marketNotes:
      'Jay County is a rural East Central Indiana county with residential demand centered on Portland and Dunkirk.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Jay County pricing reflects East Central Indiana rural demand, US-27 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Portland and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  spencer: {
    marketNotes:
      'Spencer County is a rural Southwest Indiana county with residential demand centered on Rockport and Chrisney along the Ohio River.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Spencer County pricing reflects Southwest Indiana rural demand, Ohio River corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Rockport and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  orange: {
    marketNotes:
      'Orange County is a rural South Central Indiana county with residential demand centered on Paoli and Orleans near the Hoosier National Forest.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Orange County pricing reflects South Central Indiana rural demand, southern hills corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Paoli and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  perry: {
    marketNotes:
      'Perry County is a rural Southern Indiana county with residential demand centered on Tell City and Cannelton along the Ohio River hills.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Perry County pricing reflects Southern Indiana rural demand, Ohio River hills corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Tell City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fountain: {
    marketNotes:
      'Fountain County is a rural West Central Indiana county with residential demand centered on Covington and Attica.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Fountain County pricing reflects West Central Indiana rural demand, Wabash River valley traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Covington and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
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