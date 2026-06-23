import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Oklahoma county research — grows incrementally per batch */
export const oklahomaCountyResearch: Record<string, CuratedCountyResearch> = {
  oklahoma: {
    marketNotes:
      'Oklahoma County is the most populous county in Oklahoma and the core of the Oklahoma City metropolitan area, with strong governmental, educational, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Oklahoma County pricing reflects Oklahoma City metro traffic, state-government and university relocation demand, and competition among full-service local and regional van-line agents.',
    },
    tips: [
      'Verify coverage for Oklahoma City, Edmond, Midwest City, and surrounding areas before booking.',
      'Major urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tulsa: {
    marketNotes:
      'Tulsa County is Oklahoma’s second-most populous county and the economic core of the Tulsa metropolitan area, with strong corporate, healthcare, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Tulsa County pricing reflects Tulsa metro traffic, corporate and healthcare relocation demand, and competition among full-service local and regional van-line agents.',
    },
    tips: [
      'Verify coverage for Tulsa, Broken Arrow, Jenks, Bixby, and Owasso areas before booking.',
      'Major urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cleveland: {
    marketNotes:
      'Cleveland County is one of Oklahoma’s fastest-growing counties, anchored by the University of Oklahoma and suburban residential demand south of Oklahoma City.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Cleveland County pricing reflects Norman and Moore suburban demand, OU student relocation volume, and cross-metro crews from Oklahoma City providers.',
    },
    tips: [
      'Verify coverage for Norman, Moore, and surrounding areas before booking.',
      'Oklahoma City-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  canadian: {
    marketNotes:
      'Canadian County is one of Oklahoma’s fastest-growing counties with strong suburban residential demand west of Oklahoma City.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Canadian County pricing reflects Yukon and Mustang suburban demand, cross-metro crews from Oklahoma City providers, and competition among full-service local agents.',
    },
    tips: [
      'Verify coverage for Yukon, Mustang, Piedmont, and El Reno areas before booking.',
      'Oklahoma City-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  comanche: {
    marketNotes:
      'Comanche County is anchored by Fort Sill with strong military, healthcare, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Comanche County pricing reflects Lawton military PCS volume, Fort Sill access constraints, and regional van-line agents serving Southwest Oklahoma.',
    },
    tips: [
      'Verify coverage for Lawton and surrounding areas before booking.',
      'Military base traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons and PCS windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rogers: {
    marketNotes:
      'Rogers County is a growing suburban county northeast of Tulsa with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Rogers County pricing reflects Claremore and Catoosa suburban demand, Tulsa metro cross-county crews, and competition among northeast Tulsa providers.',
    },
    tips: [
      'Verify coverage for Claremore, Catoosa, and Owasso areas before booking.',
      'Tulsa-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wagoner: {
    marketNotes:
      'Wagoner County is a rapidly growing suburban county southeast of Tulsa with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Wagoner County pricing reflects Coweta and Broken Arrow spillover demand, Tulsa metro traffic, and southeast suburban relocation volume.',
    },
    tips: [
      'Verify coverage for Wagoner, Coweta, and Broken Arrow areas before booking.',
      'Tulsa-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  payne: {
    marketNotes:
      'Payne County is anchored by Oklahoma State University with strong educational and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Payne County pricing reflects Stillwater university relocation demand, student move-in volume, and regional crews from Oklahoma City and Tulsa providers.',
    },
    tips: [
      'Verify coverage for Stillwater and surrounding areas before booking.',
      'University traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  creek: {
    marketNotes:
      'Creek County is a growing suburban county southwest of Tulsa with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Creek County pricing reflects Sapulpa and Bristow suburban demand, southwest Tulsa metro traffic, and cross-county crews from Tulsa providers.',
    },
    tips: [
      'Verify coverage for Sapulpa, Bristow, and Drumright areas before booking.',
      'Tulsa-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pottawatomie: {
    marketNotes:
      'Pottawatomie County is a growing county east of Oklahoma City with strong residential and tribal economic demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Pottawatomie County pricing reflects Shawnee residential demand, east-metro Oklahoma City traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Shawnee and surrounding areas before booking.',
      'Oklahoma City-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  muskogee: {
    marketNotes:
      'Muskogee County is a key East Oklahoma county with strong industrial, port, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Muskogee County pricing reflects port and industrial relocation demand, regional traffic constraints, and Tulsa metro cross-county providers.',
    },
    tips: [
      'Verify coverage for Muskogee and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garfield: {
    marketNotes:
      'Garfield County is the economic center of Northwest Oklahoma with strong agricultural and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Garfield County pricing reflects Enid regional demand, agricultural community relocations, and Oklahoma City van-line agents serving Northwest Oklahoma.',
    },
    tips: [
      'Verify coverage for Enid and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and harvest-season windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grady: {
    marketNotes:
      'Grady County is a growing county southwest of Oklahoma City with strong suburban residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Grady County pricing reflects Chickasha suburban demand, southwest Oklahoma City metro traffic, and cross-county crews from Norman and OKC providers.',
    },
    tips: [
      'Verify coverage for Chickasha and surrounding areas before booking.',
      'Oklahoma City-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  logan: {
    marketNotes:
      'Logan County is a growing suburban county north of Oklahoma City with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Logan County pricing reflects Guthrie suburban growth, north-metro Oklahoma City traffic, and competition among full-service local agents.',
    },
    tips: [
      'Verify coverage for Guthrie and surrounding areas before booking.',
      'Oklahoma City-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getOklahomaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return oklahomaCountyResearch[countySlug];
}