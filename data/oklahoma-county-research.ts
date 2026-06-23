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
  washington: {
    marketNotes:
      'Washington County is a key Northeast Oklahoma county with strong energy-industry and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Washington County pricing reflects Bartlesville energy-sector relocation demand, northeast Tulsa metro cross-county crews, and regional full-service agents.',
    },
    tips: [
      'Verify coverage for Bartlesville and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bryan: {
    marketNotes:
      'Bryan County is a growing county in Southeast Oklahoma with strong educational (Southeastern Oklahoma State University) and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Bryan County pricing reflects Durant university relocation volume, southeast Oklahoma regional traffic, and cross-state crews from Oklahoma City and Tulsa providers.',
    },
    tips: [
      'Verify coverage for Durant and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcclain: {
    marketNotes:
      'McClain County is a rapidly growing suburban county south of Oklahoma City with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'McClain County pricing reflects Purcell and Newcastle suburban demand, south Oklahoma City metro traffic, and cross-county crews from Norman and OKC providers.',
    },
    tips: [
      'Verify coverage for Purcell, Newcastle, and Blanchard areas before booking.',
      'Oklahoma City-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'le-flore': {
    marketNotes:
      'Le Flore County is a growing county in Southeast Oklahoma with strong residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Le Flore County pricing reflects Poteau regional demand, southeast Oklahoma access constraints, and Tulsa metro cross-county providers.',
    },
    tips: [
      'Verify coverage for Poteau and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cherokee: {
    marketNotes:
      'Cherokee County is anchored by Northeastern State University with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Cherokee County pricing reflects Tahlequah university relocation demand, northeast Oklahoma regional traffic, and Tulsa metro cross-county crews.',
    },
    tips: [
      'Verify coverage for Tahlequah and surrounding areas before booking.',
      'University traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carter: {
    marketNotes:
      'Carter County is a key South Oklahoma county with strong energy and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Carter County pricing reflects Ardmore energy-sector relocation demand, south Oklahoma regional traffic, and cross-county crews from Lawton and OKC providers.',
    },
    tips: [
      'Verify coverage for Ardmore and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  osage: {
    marketNotes:
      'Osage County is the largest county in Oklahoma with strong residential and tribal economic demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Osage County pricing reflects Pawhuska and Skiatook regional demand, north Tulsa metro traffic, and cross-county crews from Tulsa providers.',
    },
    tips: [
      'Verify coverage for Pawhuska, Skiatook, and Hominy areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stephens: {
    marketNotes:
      'Stephens County is a key South Oklahoma county with strong energy-industry and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Stephens County pricing reflects Duncan energy-sector relocation demand, south Oklahoma regional traffic, and cross-county crews from Lawton and Chickasha providers.',
    },
    tips: [
      'Verify coverage for Duncan and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kay: {
    marketNotes:
      'Kay County is a key North Oklahoma county with strong energy and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Kay County pricing reflects Ponca City and Newkirk energy-sector demand, northwest Oklahoma regional traffic, and Enid and OKC van-line agents.',
    },
    tips: [
      'Verify coverage for Ponca City and Newkirk areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pittsburg: {
    marketNotes:
      'Pittsburg County is a key Southeast Oklahoma county with strong energy and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Pittsburg County pricing reflects McAlester energy-sector relocation demand, southeast Oklahoma regional traffic, and cross-county crews from OKC and Tulsa providers.',
    },
    tips: [
      'Verify coverage for McAlester and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  delaware: {
    marketNotes:
      'Delaware County is a scenic county in Northeast Oklahoma with strong tourism and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Delaware County pricing reflects Grove and Jay lakeside relocation demand, northeast Oklahoma tourism-season volume, and Tulsa metro cross-county crews.',
    },
    tips: [
      'Verify coverage for Grove, Jay, and surrounding areas before booking.',
      'Lake access and seasonal tourism traffic require advance planning — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak tourist seasons and summer relocation windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sequoyah: {
    marketNotes:
      'Sequoyah County is a growing county in East Oklahoma with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Sequoyah County pricing reflects Sallisaw regional demand, east Oklahoma traffic constraints, and Tulsa metro cross-county providers.',
    },
    tips: [
      'Verify coverage for Sallisaw and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mayes: {
    marketNotes:
      'Mayes County is a growing county in Northeast Oklahoma with strong industrial and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Mayes County pricing reflects Pryor industrial relocation demand, northeast Oklahoma regional traffic, and Tulsa metro cross-county crews.',
    },
    tips: [
      'Verify coverage for Pryor and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pontotoc: {
    marketNotes:
      'Pontotoc County is anchored by East Central University with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Pontotoc County pricing reflects Ada university relocation demand, south-central Oklahoma regional traffic, and cross-county crews from Shawnee and OKC providers.',
    },
    tips: [
      'Verify coverage for Ada and surrounding areas before booking.',
      'University traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  okmulgee: {
    marketNotes:
      'Okmulgee County is a key East Oklahoma county with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Okmulgee County pricing reflects east Oklahoma regional demand, Tulsa metro cross-county traffic, and competition among Tulsa and Muskogee-area providers.',
    },
    tips: [
      'Verify coverage for Okmulgee and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is a growing county east of Oklahoma City with strong suburban residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Chandler and Prague suburban demand, east Oklahoma City metro traffic, and cross-county crews from Shawnee and OKC providers.',
    },
    tips: [
      'Verify coverage for Chandler, Prague, and Stroud areas before booking.',
      'Oklahoma City-area traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mccurtain: {
    marketNotes:
      'McCurtain County is a large rural county in Southeast Oklahoma with strong timber, tourism, and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'McCurtain County pricing reflects Idabel and Broken Bow lake-area demand, rural access constraints, and cross-county crews from Tulsa and Durant providers.',
    },
    tips: [
      'Verify coverage for Idabel, Broken Bow, and Hochatown areas before booking.',
      'Rural and lake access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes and flood/tornado coverage before booking.',
      'Book early for peak tourist seasons and summer relocation windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ottawa: {
    marketNotes:
      'Ottawa County is a key Northeast Oklahoma county with strong industrial and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Ottawa County pricing reflects Miami industrial relocation demand, northeast Oklahoma regional traffic, and Tulsa metro cross-county crews.',
    },
    tips: [
      'Verify coverage for Miami and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  custer: {
    marketNotes:
      'Custer County is a growing county in Western Oklahoma with strong educational (Southwestern Oklahoma State University) and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Custer County pricing reflects Weatherford university relocation demand, western Oklahoma regional traffic, and OKC van-line agents serving the area.',
    },
    tips: [
      'Verify coverage for Weatherford and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garvin: {
    marketNotes:
      'Garvin County is a rural Central Oklahoma county with strong residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Garvin County pricing reflects Pauls Valley regional demand, central Oklahoma rural access, and cross-county crews from Norman and Chickasha providers.',
    },
    tips: [
      'Verify coverage for Pauls Valley and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  caddo: {
    marketNotes:
      'Caddo County is a rural Southwest Oklahoma county with strong tribal and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Caddo County pricing reflects Anadarko regional demand, southwest Oklahoma rural access, and cross-county crews from Lawton and OKC providers.',
    },
    tips: [
      'Verify coverage for Anadarko and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is anchored by Altus Air Force Base with strong military and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Altus military PCS volume, southwest Oklahoma regional traffic, and van-line agents serving military relocations.',
    },
    tips: [
      'Verify coverage for Altus and surrounding areas before booking.',
      'Military base traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons and PCS windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  seminole: {
    marketNotes:
      'Seminole County is a rural Central Oklahoma county with strong energy and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Seminole County pricing reflects Wewoka regional demand, central Oklahoma energy-sector relocations, and cross-county crews from Shawnee and Ada providers.',
    },
    tips: [
      'Verify coverage for Seminole and Wewoka areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  beckham: {
    marketNotes:
      'Beckham County is a key Western Oklahoma county with strong energy and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Beckham County pricing reflects Sayre and Elk City energy-sector demand, western Oklahoma regional traffic, and OKC van-line agents.',
    },
    tips: [
      'Verify coverage for Sayre and Elk City areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  texas: {
    marketNotes:
      'Texas County is the westernmost county in the Oklahoma Panhandle with strong agricultural and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Texas County pricing reflects Guymon panhandle regional demand, rural access constraints, and long-distance crews from Enid and OKC van-line agents.',
    },
    tips: [
      'Verify coverage for Guymon and surrounding areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and harvest-season windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adair: {
    marketNotes:
      'Adair County is a rural Northeast Oklahoma county with strong residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Adair County pricing reflects Stilwell regional demand, rural northeast Oklahoma access, and Tulsa metro cross-county crews.',
    },
    tips: [
      'Verify coverage for Stilwell and surrounding areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcintosh: {
    marketNotes:
      'McIntosh County is a rural East Oklahoma county with lake-area residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'McIntosh County pricing reflects Eufaula lake-area demand, east Oklahoma regional traffic, and Tulsa metro cross-county providers.',
    },
    tips: [
      'Verify coverage for Eufaula and surrounding areas before booking.',
      'Lake access and seasonal tourism traffic require advance planning — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons and summer relocation windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  woodward: {
    marketNotes:
      'Woodward County is a key Western Oklahoma county with strong energy and residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Woodward County pricing reflects northwest Oklahoma energy-sector demand, regional traffic constraints, and Enid and OKC van-line agents.',
    },
    tips: [
      'Verify coverage for Woodward and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County is a growing county in South Oklahoma with strong lake-area residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Marshall County pricing reflects Madill lake-area demand, south Oklahoma regional traffic, and cross-county crews from Durant and Ardmore providers.',
    },
    tips: [
      'Verify coverage for Madill and surrounding areas before booking.',
      'Lake access considerations apply — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak seasons and summer relocation windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pawnee: {
    marketNotes:
      'Pawnee County is a rural North Oklahoma county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Pawnee County pricing reflects north Oklahoma regional demand, rural access constraints, and cross-county crews from Stillwater and Enid providers.',
    },
    tips: [
      'Verify coverage for Pawnee and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
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