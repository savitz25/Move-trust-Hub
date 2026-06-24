import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Pennsylvania county research — batches 1–3 */
export const pennsylvaniaCountyResearch: Record<string, CuratedCountyResearch> = {
  philadelphia: {
    marketNotes:
      'Philadelphia County is coterminous with the City of Philadelphia, with dense urban, historic, and residential demand across Center City, University City, and neighborhood corridors throughout the metro.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Philadelphia pricing reflects dense urban rowhome demand, parking permit requirements, historic-property handling, and competition among city-focused full-service agents.',
    },
    tips: [
      'Verify coverage for all Philadelphia neighborhoods before booking.',
      'Heavy urban traffic, narrow streets, and parking restrictions significantly impact scheduling — confirm permits and loading zones.',
      'Historic rowhomes and walk-up buildings may require tight stairwell coordination — confirm crew equipment fit.',
      'Confirm insurance for high-value urban and historic properties, condos, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  allegheny: {
    marketNotes:
      'Allegheny County is coterminous with the Pittsburgh metropolitan core, with strong urban, suburban, and industrial demand across Pittsburgh, Mount Lebanon, and the three-rivers corridor.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Allegheny County pricing reflects Pittsburgh urban hillside access, bridge crossings, university corridor volume, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Pittsburgh and surrounding areas before booking.',
      'Urban traffic and bridge crossings on the Fort Pitt and Liberty tunnels significantly impacts scheduling — confirm crew arrival windows.',
      'Hillside neighborhoods and tight street parking may require shuttle truck coordination — confirm building access.',
      'Confirm insurance for high-value urban and suburban homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a large and affluent suburban county north of Philadelphia with strong residential demand across Norristown, King of Prussia, and the Main Line corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects affluent Main Line demand, King of Prussia corporate corridor volume, I-76 and Route 202 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Norristown, King of Prussia, and surrounding areas before booking.',
      'Heavy Philadelphia metro traffic on I-76, Route 202, and the Schuylkill Expressway significantly impacts scheduling — confirm crew arrival windows.',
      'Main Line townhome and estate communities may require HOA or loading-zone coordination — confirm building access.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bucks: {
    marketNotes:
      'Bucks County is a large and affluent suburban county northeast of Philadelphia with strong residential demand across Doylestown, Levittown, and the Delaware River corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Bucks County pricing reflects affluent suburban demand, I-95 and Route 1 corridor traffic, and competition among Philadelphia-metro full-service agents.',
    },
    tips: [
      'Verify coverage for Doylestown, Levittown, and surrounding areas before booking.',
      'Heavy Philadelphia metro traffic on I-95 and Route 1 significantly impacts scheduling — confirm crew arrival windows.',
      'Delaware River waterfront and historic townhome communities may require loading-zone coordination — confirm building access.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  delaware: {
    marketNotes:
      'Delaware County is a large suburban county southwest of Philadelphia with strong residential demand across Media, Chester, and the I-95 corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Delaware County pricing reflects Philadelphia-metro suburban demand, I-95 and Blue Route traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Media, Chester, and surrounding areas before booking.',
      'Heavy Philadelphia metro traffic on I-95 and the Blue Route significantly impacts scheduling — confirm crew arrival windows.',
      'Rowhome and townhome communities near the city line may require tight stairwell coordination — confirm crew equipment fit.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lancaster: {
    marketNotes:
      'Lancaster County is a large and growing county with strong agricultural, Amish, and residential demand across Lancaster City and surrounding townships.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lancaster County pricing reflects growing residential demand, Route 30 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lancaster and surrounding areas before booking.',
      'Regional traffic on Route 30 and US-222 impacts scheduling — confirm crew arrival windows.',
      'Rural and farmhouse properties may require longer drive times and equipment coordination — confirm access roads.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chester: {
    marketNotes:
      'Chester County is an affluent suburban county west of Philadelphia with strong residential demand across West Chester, Exton, and the Main Line western corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Chester County pricing reflects affluent Main Line demand, Route 202 and US-30 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for West Chester and surrounding areas before booking.',
      'Philadelphia metro traffic on Route 202 and US-30 impacts scheduling — confirm crew arrival windows.',
      'Estate and townhome communities may require HOA or loading-zone coordination — confirm building access.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  york: {
    marketNotes:
      'York County is a large and growing county with strong residential and industrial demand across York City and the Susquehanna River corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'York County pricing reflects growing residential demand, I-83 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for York and surrounding areas before booking.',
      'Regional traffic on I-83 and US-30 impacts scheduling — confirm crew arrival windows.',
      'Industrial and suburban communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  berks: {
    marketNotes:
      'Berks County is a large county with strong residential and industrial demand centered around Reading and the I-78 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Berks County pricing reflects Reading metro demand, I-78 and Route 422 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Reading and surrounding areas before booking.',
      'Regional traffic on I-78 and Route 422 impacts scheduling — confirm crew arrival windows.',
      'Industrial and suburban communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lehigh: {
    marketNotes:
      'Lehigh County is a key county in the Lehigh Valley with strong residential and industrial demand across Allentown, Bethlehem, and the I-78 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Lehigh County pricing reflects Lehigh Valley metro demand, I-78 and Route 22 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Allentown and surrounding areas before booking.',
      'Regional traffic on I-78 and Route 22 impacts scheduling — confirm crew arrival windows.',
      'Industrial and suburban communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  westmoreland: {
    marketNotes:
      'Westmoreland County is a large suburban county east of Pittsburgh with strong residential demand across Greensburg, Murrysville, and the Laurel Highlands corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Westmoreland County pricing reflects Pittsburgh-metro suburban demand, Route 30 and Turnpike corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Greensburg and surrounding areas before booking.',
      'Pittsburgh-area traffic on Route 30 and the Turnpike impacts scheduling — confirm crew arrival windows.',
      'Hillside and suburban communities may require shuttle truck coordination — confirm building access.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  luzerne: {
    marketNotes:
      'Luzerne County is a key Northeastern Pennsylvania county with strong residential and industrial demand across Wilkes-Barre and the Wyoming Valley corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Luzerne County pricing reflects Wyoming Valley metro demand, I-81 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Wilkes-Barre and surrounding areas before booking.',
      'Regional traffic on I-81 and Route 309 impacts scheduling — confirm crew arrival windows.',
      'Industrial and suburban communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  northampton: {
    marketNotes:
      'Northampton County is a key Lehigh Valley county with strong residential and industrial demand across Easton, Bethlehem, and the Delaware River corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Northampton County pricing reflects Lehigh Valley metro demand, Route 22 and I-78 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Easton and surrounding areas before booking.',
      'Regional traffic on Route 22 and I-78 impacts scheduling — confirm crew arrival windows.',
      'Delaware River communities may require bridge crossing coordination — confirm crew routing.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dauphin: {
    marketNotes:
      'Dauphin County is the core of the Harrisburg metropolitan area with strong governmental and residential demand across Harrisburg and the Susquehanna River corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Dauphin County pricing reflects state capital demand, I-83 and I-81 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Harrisburg and surrounding areas before booking.',
      'Regional traffic on I-83 and I-81 impacts scheduling — confirm crew arrival windows.',
      'Government and suburban communities may require parking permit coordination — confirm building access.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cumberland: {
    marketNotes:
      'Cumberland County is a suburban county west of Harrisburg with strong residential demand across Carlisle, Camp Hill, and the I-81 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Cumberland County pricing reflects Harrisburg-metro suburban demand, I-81 and Route 11 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Carlisle and surrounding areas before booking.',
      'Harrisburg-area traffic on I-81 and Route 11 impacts scheduling — confirm crew arrival windows.',
      'Suburban and military-adjacent communities may require access coordination — confirm building access.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  erie: {
    marketNotes:
      'Erie County is Pennsylvania\'s northwesternmost county with strong residential and industrial demand across Erie and the Lake Erie shoreline.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Erie County pricing reflects northwestern PA demand, I-90 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Erie and surrounding areas before booking.',
      'Regional traffic on I-90 and Peach Street impacts scheduling — confirm crew arrival windows.',
      'Lakefront and industrial communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lackawanna: {
    marketNotes:
      'Lackawanna County is a key Northeastern Pennsylvania county with strong residential demand across Scranton and the Wyoming Valley border corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lackawanna County pricing reflects Scranton metro demand, I-81 and I-476 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Scranton and surrounding areas before booking.',
      'Regional traffic on I-81 and I-476 impacts scheduling — confirm crew arrival windows.',
      'Hillside and suburban communities may require shuttle truck coordination — confirm building access.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a suburban county south of Pittsburgh with strong residential demand across Washington, Canonsburg, and the Monongahela River corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Washington County pricing reflects Pittsburgh-metro suburban demand, I-70 and Route 19 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Washington and surrounding areas before booking.',
      'Pittsburgh-area traffic on I-70 and Route 19 impacts scheduling — confirm crew arrival windows.',
      'Hillside and suburban communities may require shuttle truck coordination — confirm building access.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  butler: {
    marketNotes:
      'Butler County is a suburban county north of Pittsburgh with strong residential demand across Butler, Cranberry Township, and the I-79 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Butler County pricing reflects Pittsburgh-metro suburban demand, I-79 and Route 8 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Butler and surrounding areas before booking.',
      'Pittsburgh-area traffic on I-79 and Route 8 impacts scheduling — confirm crew arrival windows.',
      'Suburban and rural communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a key Pocono Mountains county with strong tourism and residential demand across Stroudsburg, East Stroudsburg, and the I-80 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Monroe County pricing reflects Pocono tourism demand, I-80 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Stroudsburg and surrounding areas before booking.',
      'Tourist traffic on I-80 and Route 611 significantly impacts scheduling — confirm crew arrival windows.',
      'Vacation home and mountain communities may require seasonal access coordination — confirm building access.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak tourist seasons (June–August) and holiday weekends.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  beaver: {
    marketNotes:
      'Beaver County is a suburban county northwest of Pittsburgh with strong residential demand across Beaver, Aliquippa, and the Ohio River corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Beaver County pricing reflects Pittsburgh-metro suburban demand, Route 18 and Ohio River bridge traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Beaver and surrounding areas before booking.',
      'Pittsburgh-area traffic on Route 18 and bridge crossings impacts scheduling — confirm crew arrival windows.',
      'Ohio River communities may require bridge crossing coordination — confirm crew routing.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a growing county in South Central Pennsylvania with residential demand across Chambersburg and the I-81 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Franklin County pricing reflects South Central PA demand, I-81 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Chambersburg and surrounding areas before booking.',
      'Regional traffic on I-81 and US-30 impacts scheduling — confirm crew arrival windows.',
      'Rural and suburban communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  centre: {
    marketNotes:
      'Centre County is anchored by Penn State University with strong educational and residential demand across State College, Bellefonte, and the Happy Valley corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Centre County pricing reflects university corridor demand, Route 322 and I-99 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for State College and surrounding areas before booking.',
      'University traffic on Route 322 and I-99 significantly impacts scheduling — confirm crew arrival windows.',
      'Student housing and off-campus moves may require tight stairwell coordination — confirm crew equipment fit.',
      'Confirm insurance for high-value homes and student-related moves.',
      'Book early for peak seasons (May–August) around semester changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lebanon: {
    marketNotes:
      'Lebanon County is a growing county in South Central Pennsylvania with residential demand across Lebanon and the I-81 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lebanon County pricing reflects South Central PA demand, I-81 and Route 422 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lebanon and surrounding areas before booking.',
      'Regional traffic on I-81 and Route 422 impacts scheduling — confirm crew arrival windows.',
      'Suburban and rural communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  schuylkill: {
    marketNotes:
      'Schuylkill County is a rural county in Northeastern Pennsylvania with residential demand across Pottsville and the coal region corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Schuylkill County pricing reflects rural northeastern PA demand, I-81 and Route 61 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Pottsville and surrounding areas before booking.',
      'Regional traffic on I-81 and Route 61 impacts scheduling — confirm crew arrival windows.',
      'Rural and hillside communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getPennsylvaniaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return pennsylvaniaCountyResearch[countySlug];
}