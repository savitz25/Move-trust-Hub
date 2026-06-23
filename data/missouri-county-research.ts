import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Missouri county research — grows incrementally per batch */
export const missouriCountyResearch: Record<string, CuratedCountyResearch> = {
  'st-louis': {
    marketNotes:
      'St. Louis County is Missouri’s most populous county and forms the core of the St. Louis metropolitan area, with strong corporate, healthcare, and suburban residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'St. Louis County pricing reflects metro suburban growth, I-64/I-270 corridor traffic, corporate relocation demand, and competition among full-service local and regional agents serving Chesterfield, Kirkwood, and Florissant.',
    },
    tips: [
      'Verify coverage for Chesterfield, Creve Coeur, Kirkwood, Florissant, and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is Missouri’s most populous county and forms the core of the Kansas City metropolitan area, with strong urban, governmental, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Kansas City metro urban growth, I-70/I-435 corridor traffic, governmental relocation demand, and competition among full-service local and regional agents serving Independence, Lee’s Summit, and Blue Springs.',
    },
    tips: [
      'Verify coverage for Kansas City, Independence, Lee’s Summit, and Blue Springs areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-charles': {
    marketNotes:
      'St. Charles County is one of Missouri’s fastest-growing counties with strong suburban residential and corporate demand west of St. Louis.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'St. Charles County pricing reflects west St. Louis metro suburban growth, I-70 and Highway 364 corridor traffic, corporate relocation demand, and competition among full-service local and regional agents serving St. Charles, O’Fallon, and Wentzville.',
    },
    tips: [
      'Verify coverage for St. Charles, O’Fallon, St. Peters, and Wentzville areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is Missouri’s third-most populous county and the core of the Springfield metropolitan area, with strong educational, healthcare, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Greene County pricing reflects Springfield metro Ozarks regional demand, I-44 corridor traffic, and competition among full-service local and regional agents serving the greater Springfield area.',
    },
    tips: [
      'Verify coverage for Springfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-louis-city': {
    marketNotes:
      'St. Louis City is an independent city and the core of the St. Louis metropolitan area with strong urban, cultural, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'St. Louis City pricing reflects dense urban relocation demand, I-64/I-55 corridor traffic, historic neighborhood access challenges, and competition among full-service local and regional agents serving city neighborhoods.',
    },
    tips: [
      'Verify coverage for city neighborhoods and surrounding areas before booking.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a major suburban county north of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Clay County pricing reflects north Kansas City metro suburban growth, I-35 and Highway 152 corridor traffic, and competition among full-service local and regional agents serving Liberty, Gladstone, and Kearney.',
    },
    tips: [
      'Verify coverage for Liberty, Gladstone, Kearney, and surrounding areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a rapidly growing suburban county south of St. Louis with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects south St. Louis metro suburban growth, I-55 corridor traffic, and competition among full-service local and regional agents serving Arnold, Festus, and Crystal City.',
    },
    tips: [
      'Verify coverage for Arnold, Festus, Crystal City, and surrounding areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County is anchored by the University of Missouri with strong educational, healthcare, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Boone County pricing reflects Columbia university-town turnover, I-70 corridor traffic, student move seasons, and competition among full-service local and regional agents serving the greater Columbia area.',
    },
    tips: [
      'Verify coverage for Columbia and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jasper: {
    marketNotes:
      'Jasper County is the core of the Joplin metropolitan area with strong industrial, healthcare, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Jasper County pricing reflects Joplin metro Ozarks regional demand, I-44 corridor traffic, and competition among full-service local and regional agents serving Carthage and the greater Joplin area.',
    },
    tips: [
      'Verify coverage for Joplin and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cass: {
    marketNotes:
      'Cass County is a rapidly growing suburban county south of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Cass County pricing reflects south Kansas City metro suburban growth, I-49 corridor traffic, and competition among full-service local and regional agents serving Harrisonville, Raymore, and Belton.',
    },
    tips: [
      'Verify coverage for Harrisonville, Raymore, and Belton areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  platte: {
    marketNotes:
      'Platte County is a growing suburban county northwest of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Platte County pricing reflects northwest Kansas City metro suburban growth, I-29 and Highway 152 corridor traffic, and competition among full-service local and regional agents serving Platte City, Parkville, and Riverside.',
    },
    tips: [
      'Verify coverage for Platte City, Parkville, and Riverside areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a growing suburban county west of St. Louis with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Franklin County pricing reflects west St. Louis metro suburban growth, I-44 corridor traffic, and competition among full-service local and regional agents serving Union, Washington, and Pacific.',
    },
    tips: [
      'Verify coverage for Union, Washington, and Pacific areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  christian: {
    marketNotes:
      'Christian County is one of Missouri’s fastest-growing counties south of Springfield with strong suburban residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Christian County pricing reflects south Springfield metro suburban growth, Highway 65 corridor traffic, and competition among full-service local and regional agents serving Ozark, Nixa, and Clever.',
    },
    tips: [
      'Verify coverage for Ozark, Nixa, and Clever areas before booking.',
      'Springfield-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'cape-girardeau': {
    marketNotes:
      'Cape Girardeau County is the economic center of Southeast Missouri with strong healthcare, education, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Cape Girardeau County pricing reflects southeast Missouri regional demand, Mississippi River corridor access, and competition among full-service local and regional agents serving Cape Girardeau and Jackson.',
    },
    tips: [
      'Verify coverage for Cape Girardeau and Jackson areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  buchanan: {
    marketNotes:
      'Buchanan County is the core of the St. Joseph metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Buchanan County pricing reflects northwest Missouri regional demand, I-29 corridor traffic, and competition among full-service local and regional agents serving the greater St. Joseph area.',
    },
    tips: [
      'Verify coverage for St. Joseph and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cole: {
    marketNotes:
      'Cole County is the core of the Jefferson City metropolitan area with strong governmental and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Cole County pricing reflects state-government relocation cycles, Jefferson City urban traffic patterns, and competition among full-service local and regional agents serving the capital metro.',
    },
    tips: [
      'Verify coverage for Jefferson City and surrounding areas before booking.',
      'Governmental traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-francois': {
    marketNotes:
      'St. Francois County is a key Southeast Missouri county with strong healthcare and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'St. Francois County pricing reflects southeast Missouri regional demand, Farmington healthcare corridor traffic, and competition among local and regional agents serving the greater Farmington area.',
    },
    tips: [
      'Verify coverage for Farmington and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is one of Missouri’s fastest-growing counties north of St. Louis with strong suburban residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects north St. Louis metro suburban growth, Highway 61 corridor traffic, and competition among full-service local and regional agents serving Troy and Elsberry.',
    },
    tips: [
      'Verify coverage for Troy, Moscow Mills, and Elsberry areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  newton: {
    marketNotes:
      'Newton County is a growing county in Southwest Missouri with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Newton County pricing reflects Joplin metro spillover demand, Neosho regional traffic patterns, and competition among local and regional agents serving southwest Missouri.',
    },
    tips: [
      'Verify coverage for Neosho and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County is anchored by the University of Central Missouri with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Warrensburg university-town turnover, I-70 corridor access, student move seasons, and competition among local and regional agents serving central Missouri.',
    },
    tips: [
      'Verify coverage for Warrensburg and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  taney: {
    marketNotes:
      'Taney County is a major tourism hub centered on Branson with strong residential and seasonal demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Taney County pricing reflects Branson tourism-season demand, Highway 65 corridor traffic, and competition among local and regional agents serving the Ozarks entertainment corridor.',
    },
    tips: [
      'Verify coverage for Branson and Hollister areas before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pulaski: {
    marketNotes:
      'Pulaski County is anchored by Fort Leonard Wood with strong military and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Pulaski County pricing reflects Fort Leonard Wood military relocation cycles, Waynesville corridor traffic, and competition among local and regional agents serving St. Robert and surrounding communities.',
    },
    tips: [
      'Verify coverage for Waynesville, St. Robert, and surrounding areas before booking.',
      'Military base traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  callaway: {
    marketNotes:
      'Callaway County is a growing county near Jefferson City with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Callaway County pricing reflects Fulton educational corridor demand, capital-area commuter traffic, and competition among local and regional agents serving central Missouri.',
    },
    tips: [
      'Verify coverage for Fulton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  phelps: {
    marketNotes:
      'Phelps County is anchored by the Missouri University of Science and Technology with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Phelps County pricing reflects Rolla university-town turnover, I-44 corridor traffic, student move seasons, and competition among local and regional agents serving the greater Rolla area.',
    },
    tips: [
      'Verify coverage for Rolla and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pettis: {
    marketNotes:
      'Pettis County is a key Central Missouri county with strong industrial and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Pettis County pricing reflects Sedalia industrial corridor demand, I-70 and Highway 65 traffic, and competition among local and regional agents serving central Missouri.',
    },
    tips: [
      'Verify coverage for Sedalia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  webster: {
    marketNotes:
      'Webster County is a growing county east of Springfield with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Webster County pricing reflects east Springfield metro suburban growth, Highway 60 corridor traffic, and competition among local and regional agents serving Marshfield and surrounding communities.',
    },
    tips: [
      'Verify coverage for Marshfield and surrounding areas before booking.',
      'Springfield-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  camden: {
    marketNotes:
      'Camden County is a major tourism and lake-area county with strong seasonal and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Camden County pricing reflects Lake of the Ozarks seasonal demand, lake-area access challenges, tourist traffic patterns, and competition among local and regional agents serving Camdenton and Osage Beach.',
    },
    tips: [
      'Verify coverage for Camdenton, Osage Beach, and Lake of the Ozarks areas before booking.',
      'Lake and tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  butler: {
    marketNotes:
      'Butler County is a key Southeast Missouri county with strong healthcare and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Butler County pricing reflects Poplar Bluff healthcare corridor demand, southeast Missouri regional traffic patterns, and competition among local and regional agents serving the greater Poplar Bluff area.',
    },
    tips: [
      'Verify coverage for Poplar Bluff and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  howell: {
    marketNotes:
      'Howell County is a major hub in South Central Missouri with strong healthcare and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Howell County pricing reflects West Plains regional demand, south central Missouri traffic patterns, and competition among local and regional agents serving the greater West Plains area.',
    },
    tips: [
      'Verify coverage for West Plains and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lawrence: {
    marketNotes:
      'Lawrence County is a growing county in Southwest Missouri with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Lawrence County pricing reflects Mount Vernon regional demand, southwest Missouri traffic patterns, and competition among local and regional agents serving the greater Mount Vernon and Joplin spillover area.',
    },
    tips: [
      'Verify coverage for Mount Vernon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is a growing suburban county west of St. Louis with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Warren County pricing reflects west St. Louis metro suburban growth, Highway 47 corridor traffic, and competition among full-service local and regional agents serving Warrenton and surrounding communities.',
    },
    tips: [
      'Verify coverage for Warrenton and surrounding areas before booking.',
      'St. Louis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  scott: {
    marketNotes:
      'Scott County is a key Southeast Missouri county with strong logistics and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Scott County pricing reflects Sikeston logistics corridor demand, southeast Missouri regional traffic patterns, and competition among local and regional agents serving the greater Sikeston area.',
    },
    tips: [
      'Verify coverage for Sikeston and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  laclede: {
    marketNotes:
      'Laclede County is a growing county in South Central Missouri with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Laclede County pricing reflects Lebanon regional demand, south central Missouri traffic patterns, and competition among local and regional agents serving the greater Lebanon area.',
    },
    tips: [
      'Verify coverage for Lebanon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  barry: {
    marketNotes:
      'Barry County is a rural Southwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Barry County pricing reflects Cassville regional demand, southwest Missouri rural access patterns, and competition among local and regional agents serving the greater Cassville and Joplin spillover area.',
    },
    tips: [
      'Verify coverage for Cassville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  polk: {
    marketNotes:
      'Polk County is anchored by Southwest Baptist University with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Polk County pricing reflects Bolivar university-town turnover, south central Missouri traffic patterns, student move seasons, and competition among local and regional agents serving the greater Bolivar area.',
    },
    tips: [
      'Verify coverage for Bolivar and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lafayette: {
    marketNotes:
      'Lafayette County is a suburban county east of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lafayette County pricing reflects east Kansas City metro suburban growth, I-70 corridor traffic, and competition among full-service local and regional agents serving Lexington and surrounding communities.',
    },
    tips: [
      'Verify coverage for Lexington and surrounding areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stone: {
    marketNotes:
      'Stone County is a scenic county near Branson with strong tourism and lakeside residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Stone County pricing reflects Branson-area tourism-season demand, lake and tourist traffic patterns, and competition among local and regional agents serving Galena, Crane, and Kimberling City.',
    },
    tips: [
      'Verify coverage for Galena, Crane, and Kimberling City areas before booking.',
      'Lake and tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is a key Northeast Missouri county with strong historical and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Marion County pricing reflects Hannibal historical corridor demand, northeast Missouri regional traffic patterns, and competition among local and regional agents serving the greater Hannibal area.',
    },
    tips: [
      'Verify coverage for Hannibal and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stoddard: {
    marketNotes:
      'Stoddard County is a key Southeast Missouri county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Stoddard County pricing reflects Dexter agricultural corridor demand, southeast Missouri regional traffic patterns, and competition among local and regional agents serving the greater Dexter area.',
    },
    tips: [
      'Verify coverage for Dexter and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dunklin: {
    marketNotes:
      'Dunklin County is a key Southeast Missouri county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Dunklin County pricing reflects Kennett agricultural corridor demand, southeast Missouri regional traffic patterns, and competition among local and regional agents serving the greater Kennett area.',
    },
    tips: [
      'Verify coverage for Kennett and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  texas: {
    marketNotes:
      'Texas County is a large rural county in South Central Missouri with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Texas County pricing reflects Houston regional demand, rural south central Missouri access patterns, and competition among local and regional agents serving the greater Houston area.',
    },
    tips: [
      'Verify coverage for Houston and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  miller: {
    marketNotes:
      'Miller County is a scenic county with strong lake-area residential and tourism demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Miller County pricing reflects Lake of the Ozarks seasonal demand, lake-area access challenges, tourist traffic patterns, and competition among local and regional agents serving Tuscumbia and Eldon.',
    },
    tips: [
      'Verify coverage for Lake of the Ozarks areas before booking.',
      'Lake and tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adair: {
    marketNotes:
      'Adair County is anchored by Truman State University with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Adair County pricing reflects Kirksville university-town turnover, northeast Missouri regional traffic patterns, student move seasons, and competition among local and regional agents serving the greater Kirksville area.',
    },
    tips: [
      'Verify coverage for Kirksville and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  audrain: {
    marketNotes:
      'Audrain County is a key Central Missouri county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Audrain County pricing reflects Mexico regional demand, central Missouri agricultural corridor traffic, and competition among local and regional agents serving the greater Mexico area.',
    },
    tips: [
      'Verify coverage for Mexico and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  randolph: {
    marketNotes:
      'Randolph County is a rural Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Randolph County pricing reflects Huntsville regional demand, rural central Missouri access patterns, and competition among local and regional agents serving the greater Huntsville area.',
    },
    tips: [
      'Verify coverage for Huntsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcdonald: {
    marketNotes:
      'McDonald County is a rural Southwest Missouri county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McDonald County pricing reflects Pineville regional demand, rural southwest Missouri access patterns, and competition among local and regional agents serving the greater Pineville area.',
    },
    tips: [
      'Verify coverage for Pineville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a rural Southeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Washington County pricing reflects Potosi regional demand, southeast Missouri traffic patterns, and competition among local and regional agents serving the greater Potosi area.',
    },
    tips: [
      'Verify coverage for Potosi and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ray: {
    marketNotes:
      'Ray County is a suburban county east of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Ray County pricing reflects east Kansas City metro suburban growth, I-70 corridor traffic, and competition among full-service local and regional agents serving Richmond and surrounding communities.',
    },
    tips: [
      'Verify coverage for Richmond and surrounding areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  saline: {
    marketNotes:
      'Saline County is a key Central Missouri county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Saline County pricing reflects Marshall agricultural corridor demand, central Missouri regional traffic patterns, and competition among local and regional agents serving the greater Marshall area.',
    },
    tips: [
      'Verify coverage for Marshall and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crawford: {
    marketNotes:
      'Crawford County is a rural Southeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Crawford County pricing reflects Steelville regional demand, southeast Missouri traffic patterns, and competition among local and regional agents serving the greater Steelville area.',
    },
    tips: [
      'Verify coverage for Steelville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henry: {
    marketNotes:
      'Henry County is a rural West Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Henry County pricing reflects Clinton regional demand, west central Missouri traffic patterns, and competition among local and regional agents serving the greater Clinton area.',
    },
    tips: [
      'Verify coverage for Clinton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County is a scenic county with strong lake-area residential and tourism demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Morgan County pricing reflects Lake of the Ozarks seasonal demand, lake-area access challenges, tourist traffic patterns, and competition among local and regional agents serving Versailles and surrounding lake communities.',
    },
    tips: [
      'Verify coverage for Versailles and Lake of the Ozarks areas before booking.',
      'Lake and tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clinton: {
    marketNotes:
      'Clinton County is a suburban county north of Kansas City with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Clinton County pricing reflects north Kansas City metro suburban growth, Highway 169 corridor traffic, and competition among full-service local and regional agents serving Plattsburg and surrounding communities.',
    },
    tips: [
      'Verify coverage for Plattsburg and surrounding areas before booking.',
      'Kansas City-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  benton: {
    marketNotes:
      'Benton County is a scenic county with strong lake-area residential and tourism demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Benton County pricing reflects Lake of the Ozarks seasonal demand, Warsaw lake-area access challenges, tourist traffic patterns, and competition among local and regional agents serving Warsaw and surrounding communities.',
    },
    tips: [
      'Verify coverage for Warsaw and Lake of the Ozarks areas before booking.',
      'Lake and tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  vernon: {
    marketNotes:
      'Vernon County is a key West Central Missouri county with strong agricultural and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Vernon County pricing reflects Nevada agricultural corridor demand, west central Missouri regional traffic patterns, and competition among local and regional agents serving the greater Nevada area.',
    },
    tips: [
      'Verify coverage for Nevada and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nodaway: {
    marketNotes:
      'Nodaway County is anchored by Northwest Missouri State University with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Nodaway County pricing reflects Maryville university-town turnover, northwest Missouri regional traffic patterns, student move seasons, and competition among local and regional agents serving the greater Maryville area.',
    },
    tips: [
      'Verify coverage for Maryville and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wright: {
    marketNotes:
      'Wright County is a rural South Central Missouri county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Wright County pricing reflects Hartville regional demand, rural south central Missouri access patterns, and competition among local and regional agents serving the greater Hartville area.',
    },
    tips: [
      'Verify coverage for Hartville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  perry: {
    marketNotes:
      'Perry County is a key Southeast Missouri county with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Perry County pricing reflects Perryville regional demand, southeast Missouri traffic patterns, and competition among local and regional agents serving the greater Perryville area.',
    },
    tips: [
      'Verify coverage for Perryville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'ste-genevieve': {
    marketNotes:
      'Ste. Genevieve County is a historic county in Southeast Missouri with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Ste. Genevieve County pricing reflects historic corridor demand, southeast Missouri regional traffic patterns, and competition among local and regional agents serving the greater Ste. Genevieve area.',
    },
    tips: [
      'Verify coverage for Ste. Genevieve and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  andrew: {
    marketNotes:
      'Andrew County is a suburban county near St. Joseph with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Andrew County pricing reflects Savannah suburban demand, northwest Missouri regional traffic patterns, and competition among local and regional agents serving the greater St. Joseph area.',
    },
    tips: [
      'Verify coverage for Savannah and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dallas: {
    marketNotes:
      'Dallas County is a rural South Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Dallas County pricing reflects Buffalo regional demand, rural south central Missouri access patterns, and competition among local and regional agents serving the greater Buffalo area.',
    },
    tips: [
      'Verify coverage for Buffalo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pike: {
    marketNotes:
      'Pike County is a rural Northeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Pike County pricing reflects Bowling Green regional demand, northeast Missouri traffic patterns, and competition among local and regional agents serving the greater Bowling Green area.',
    },
    tips: [
      'Verify coverage for Bowling Green and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cooper: {
    marketNotes:
      'Cooper County is a rural Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Cooper County pricing reflects Boonville regional demand, central Missouri traffic patterns, and competition among local and regional agents serving the greater Boonville area.',
    },
    tips: [
      'Verify coverage for Boonville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bates: {
    marketNotes:
      'Bates County is a rural West Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Bates County pricing reflects Butler regional demand, west Missouri traffic patterns, and competition among local and regional agents serving the greater Butler area.',
    },
    tips: [
      'Verify coverage for Butler and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  moniteau: {
    marketNotes:
      'Moniteau County is a rural Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Moniteau County pricing reflects California regional demand, central Missouri traffic patterns, and competition among local and regional agents serving the greater California area.',
    },
    tips: [
      'Verify coverage for California and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  macon: {
    marketNotes:
      'Macon County is a rural North Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Macon County pricing reflects Macon regional demand, north central Missouri traffic patterns, and competition among local and regional agents serving the greater Macon area.',
    },
    tips: [
      'Verify coverage for Macon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'new-madrid': {
    marketNotes:
      'New Madrid County is a rural Southeast Missouri county along the Mississippi River with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'New Madrid County pricing reflects Mississippi River corridor demand, southeast Missouri regional traffic patterns, and competition among local and regional agents serving the greater New Madrid area.',
    },
    tips: [
      'Verify coverage for New Madrid and surrounding areas before booking.',
      'River access considerations apply — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gasconade: {
    marketNotes:
      'Gasconade County is a scenic county known for wine country and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Gasconade County pricing reflects Hermann wine country demand, Missouri River corridor traffic patterns, and competition among local and regional agents serving the greater Hermann area.',
    },
    tips: [
      'Verify coverage for Hermann and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cedar: {
    marketNotes:
      'Cedar County is a rural Southwest Missouri county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cedar County pricing reflects Stockton regional demand, rural southwest Missouri access patterns, and competition among local and regional agents serving the greater Stockton area.',
    },
    tips: [
      'Verify coverage for Stockton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  livingston: {
    marketNotes:
      'Livingston County is a key North Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Livingston County pricing reflects Chillicothe regional demand, north central Missouri traffic patterns, and competition among local and regional agents serving the greater Chillicothe area.',
    },
    tips: [
      'Verify coverage for Chillicothe and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dent: {
    marketNotes:
      'Dent County is a rural South Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Dent County pricing reflects Salem regional demand, rural south central Missouri access patterns, and competition among local and regional agents serving the greater Salem area.',
    },
    tips: [
      'Verify coverage for Salem and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pemiscot: {
    marketNotes:
      'Pemiscot County is a rural Southeast Missouri county along the Mississippi River with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Pemiscot County pricing reflects Mississippi River corridor demand, southeast Missouri regional traffic patterns, and competition among local and regional agents serving the greater Caruthersville area.',
    },
    tips: [
      'Verify coverage for Caruthersville and surrounding areas before booking.',
      'River access considerations apply — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  osage: {
    marketNotes:
      'Osage County is a rural Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Osage County pricing reflects Linn regional demand, central Missouri traffic patterns, and competition among local and regional agents serving the greater Linn area.',
    },
    tips: [
      'Verify coverage for Linn and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is a rural Southeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Madison County pricing reflects Fredericktown regional demand, southeast Missouri traffic patterns, and competition among local and regional agents serving the greater Fredericktown area.',
    },
    tips: [
      'Verify coverage for Fredericktown and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County is a rural South Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Douglas County pricing reflects Ava regional demand, rural south central Missouri access patterns, and competition among local and regional agents serving the greater Ava area.',
    },
    tips: [
      'Verify coverage for Ava and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mississippi: {
    marketNotes:
      'Mississippi County is a rural Southeast Missouri county along the Mississippi River with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Mississippi County pricing reflects Mississippi River corridor demand, southeast Missouri regional traffic patterns, and competition among local and regional agents serving the greater Charleston area.',
    },
    tips: [
      'Verify coverage for Charleston and surrounding areas before booking.',
      'River access considerations apply — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  barton: {
    marketNotes:
      'Barton County is a rural Southwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Barton County pricing reflects Lamar regional demand, southwest Missouri traffic patterns, and competition among local and regional agents serving the greater Lamar area.',
    },
    tips: [
      'Verify coverage for Lamar and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  linn: {
    marketNotes:
      'Linn County is a rural North Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Linn County pricing reflects Linneus regional demand, north central Missouri traffic patterns, and competition among local and regional agents serving the greater Linneus area.',
    },
    tips: [
      'Verify coverage for Linneus and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a rural East Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects Montgomery City regional demand, east central Missouri traffic patterns, and competition among local and regional agents serving the greater Montgomery City area.',
    },
    tips: [
      'Verify coverage for Montgomery City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bollinger: {
    marketNotes:
      'Bollinger County is a rural Southeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Bollinger County pricing reflects Marble Hill regional demand, southeast Missouri traffic patterns, and competition among local and regional agents serving the greater Marble Hill area.',
    },
    tips: [
      'Verify coverage for Marble Hill and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ripley: {
    marketNotes:
      'Ripley County is a rural Southeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Ripley County pricing reflects Doniphan regional demand, southeast Missouri traffic patterns, and competition among local and regional agents serving the greater Doniphan area.',
    },
    tips: [
      'Verify coverage for Doniphan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County is a rural Southeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Greenville regional demand, southeast Missouri traffic patterns, and competition among local and regional agents serving the greater Greenville area.',
    },
    tips: [
      'Verify coverage for Greenville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ralls: {
    marketNotes:
      'Ralls County is a rural Northeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Ralls County pricing reflects New London regional demand, northeast Missouri traffic patterns, and competition among local and regional agents serving the greater New London area.',
    },
    tips: [
      'Verify coverage for New London and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  howard: {
    marketNotes:
      'Howard County is a rural Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Howard County pricing reflects Fayette regional demand, central Missouri traffic patterns, and competition among local and regional agents serving the greater Fayette area.',
    },
    tips: [
      'Verify coverage for Fayette and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-clair': {
    marketNotes:
      'St. Clair County is a rural West Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'St. Clair County pricing reflects Osceola regional demand, west central Missouri traffic patterns, and competition among local and regional agents serving the greater Osceola area.',
    },
    tips: [
      'Verify coverage for Osceola and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lewis: {
    marketNotes:
      'Lewis County is a rural Northeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Lewis County pricing reflects Monticello regional demand, northeast Missouri traffic patterns, and competition among local and regional agents serving the greater Monticello area.',
    },
    tips: [
      'Verify coverage for Monticello and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grundy: {
    marketNotes:
      'Grundy County is a rural North Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Grundy County pricing reflects Trenton regional demand, north central Missouri traffic patterns, and competition among local and regional agents serving the greater Trenton area.',
    },
    tips: [
      'Verify coverage for Trenton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dekalb: {
    marketNotes:
      'DeKalb County is a rural Northwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'DeKalb County pricing reflects Maysville regional demand, northwest Missouri traffic patterns, and competition among local and regional agents serving the greater Maysville area.',
    },
    tips: [
      'Verify coverage for Maysville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ozark: {
    marketNotes:
      'Ozark County is a rural South Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Ozark County pricing reflects Gainesville regional demand, rural south central Missouri access patterns, and competition among local and regional agents serving the greater Gainesville area.',
    },
    tips: [
      'Verify coverage for Gainesville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  iron: {
    marketNotes:
      'Iron County is a rural Southeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Iron County pricing reflects Ironton regional demand, southeast Missouri traffic patterns, and competition among local and regional agents serving the greater Ironton area.',
    },
    tips: [
      'Verify coverage for Ironton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a rural Northeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Monroe County pricing reflects Paris regional demand, northeast Missouri traffic patterns, and competition among local and regional agents serving the greater Paris area.',
    },
    tips: [
      'Verify coverage for Paris and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  caldwell: {
    marketNotes:
      'Caldwell County is a rural Northwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Caldwell County pricing reflects Kingston regional demand, northwest Missouri traffic patterns, and competition among local and regional agents serving the greater Kingston area.',
    },
    tips: [
      'Verify coverage for Kingston and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  oregon: {
    marketNotes:
      'Oregon County is a rural South Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Oregon County pricing reflects Alton regional demand, south central Missouri traffic patterns, and competition among local and regional agents serving the greater Alton area.',
    },
    tips: [
      'Verify coverage for Alton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  daviess: {
    marketNotes:
      'Daviess County is a rural Northwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Daviess County pricing reflects Gallatin regional demand, northwest Missouri traffic patterns, and competition among local and regional agents serving the greater Gallatin area.',
    },
    tips: [
      'Verify coverage for Gallatin and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County is a rural North Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Carroll County pricing reflects Carrollton regional demand, north central Missouri traffic patterns, and competition among local and regional agents serving the greater Carrollton area.',
    },
    tips: [
      'Verify coverage for Carrollton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harrison: {
    marketNotes:
      'Harrison County is a rural Northwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Harrison County pricing reflects Bethany regional demand, northwest Missouri traffic patterns, and competition among local and regional agents serving the greater Bethany area.',
    },
    tips: [
      'Verify coverage for Bethany and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  maries: {
    marketNotes:
      'Maries County is a rural Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Maries County pricing reflects Vienna regional demand, central Missouri traffic patterns, and competition among local and regional agents serving the greater Vienna area.',
    },
    tips: [
      'Verify coverage for Vienna and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dade: {
    marketNotes:
      'Dade County is a rural Southwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Dade County pricing reflects Greenfield regional demand, southwest Missouri traffic patterns, and competition among local and regional agents serving the greater Greenfield area.',
    },
    tips: [
      'Verify coverage for Greenfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chariton: {
    marketNotes:
      'Chariton County is a rural North Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Chariton County pricing reflects Keytesville regional demand, north central Missouri traffic patterns, and competition among local and regional agents serving the greater Keytesville area.',
    },
    tips: [
      'Verify coverage for Keytesville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shannon: {
    marketNotes:
      'Shannon County is a scenic rural South Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Shannon County pricing reflects Eminence regional demand, south central Missouri traffic patterns, and competition among local and regional agents serving the greater Eminence area.',
    },
    tips: [
      'Verify coverage for Eminence and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gentry: {
    marketNotes:
      'Gentry County is a rural Northwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Gentry County pricing reflects Albany regional demand, northwest Missouri traffic patterns, and competition among local and regional agents serving the greater Albany area.',
    },
    tips: [
      'Verify coverage for Albany and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County is a rural Northeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Clark County pricing reflects Kahoka regional demand, northeast Missouri traffic patterns, and competition among local and regional agents serving the greater Kahoka area.',
    },
    tips: [
      'Verify coverage for Kahoka and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  reynolds: {
    marketNotes:
      'Reynolds County is a rural Southeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Reynolds County pricing reflects Centerville regional demand, southeast Missouri traffic patterns, and competition among local and regional agents serving the greater Centerville area.',
    },
    tips: [
      'Verify coverage for Centerville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shelby: {
    marketNotes:
      'Shelby County is a rural Northeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Shelby County pricing reflects Shelbyville regional demand, northeast Missouri traffic patterns, and competition among local and regional agents serving the greater Shelbyville area.',
    },
    tips: [
      'Verify coverage for Shelbyville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sullivan: {
    marketNotes:
      'Sullivan County is a rural North Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Sullivan County pricing reflects Milan regional demand, north central Missouri traffic patterns, and competition among local and regional agents serving the greater Milan area.',
    },
    tips: [
      'Verify coverage for Milan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carter: {
    marketNotes:
      'Carter County is a rural South Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Carter County pricing reflects Van Buren regional demand, south central Missouri traffic patterns, and competition among local and regional agents serving the greater Van Buren area.',
    },
    tips: [
      'Verify coverage for Van Buren and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  atchison: {
    marketNotes:
      'Atchison County is a rural Northwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Atchison County pricing reflects Rock Port regional demand, northwest Missouri traffic patterns, and competition among local and regional agents serving the greater Rock Port area.',
    },
    tips: [
      'Verify coverage for Rock Port and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  scotland: {
    marketNotes:
      'Scotland County is a rural Northeast Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Scotland County pricing reflects Memphis regional demand, northeast Missouri traffic patterns, and competition among local and regional agents serving the greater Memphis area.',
    },
    tips: [
      'Verify coverage for Memphis and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  putnam: {
    marketNotes:
      'Putnam County is a rural North Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Putnam County pricing reflects Unionville regional demand, north Missouri traffic patterns, and competition among local and regional agents serving the greater Unionville area.',
    },
    tips: [
      'Verify coverage for Unionville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  schuyler: {
    marketNotes:
      'Schuyler County is a rural North Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Schuyler County pricing reflects Lancaster regional demand, north Missouri traffic patterns, and competition among local and regional agents serving the greater Lancaster area.',
    },
    tips: [
      'Verify coverage for Lancaster and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mercer: {
    marketNotes:
      'Mercer County is a rural North Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Mercer County pricing reflects Princeton regional demand, north Missouri traffic patterns, and competition among local and regional agents serving the greater Princeton area.',
    },
    tips: [
      'Verify coverage for Princeton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  worth: {
    marketNotes:
      'Worth County is a rural Northwest Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Worth County pricing reflects Grant City regional demand, northwest Missouri traffic patterns, and competition among local and regional agents serving the greater Grant City area.',
    },
    tips: [
      'Verify coverage for Grant City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hickory: {
    marketNotes:
      'Hickory County is a rural Central Missouri county with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Hickory County pricing reflects Hermitage regional demand, central Missouri traffic patterns, and competition among local and regional agents serving the greater Hermitage area.',
    },
    tips: [
      'Verify coverage for Hermitage and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMissouriCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return missouriCountyResearch[countySlug];
}