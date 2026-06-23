import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Louisiana parish research — grows incrementally per batch */
export const louisianaCountyResearch: Record<string, CuratedCountyResearch> = {
  'east-baton-rouge': {
    marketNotes:
      'East Baton Rouge Parish is Louisiana’s most populous parish and the core of the Baton Rouge metropolitan area, with strong governmental, educational (LSU), petrochemical, and residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'East Baton Rouge Parish pricing reflects Baton Rouge metro traffic, LSU and state-government relocation demand, and competition among full-service local and regional van-line agents.',
    },
    tips: [
      'Verify coverage for Baton Rouge, Zachary, Central, and surrounding areas before booking.',
      'Major highway and industrial traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/hurricane-related coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson Parish is Louisiana’s most populous parish and forms the core of the Greater New Orleans metropolitan area with strong suburban, commercial, and port-related demand.',
    costs: {
      studioRange: '$800–$1,650',
      familyRange: '$2,900–$6,500',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Jefferson Parish pricing reflects Greater New Orleans suburban demand in Metairie and Kenner, bridge and port traffic, and competition among full-service local and regional van-line agents.',
    },
    tips: [
      'Verify coverage for Metairie, Kenner, Gretna, Harvey, and Westwego areas before booking.',
      'Heavy urban, bridge, and port traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/hurricane-related coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  orleans: {
    marketNotes:
      'Orleans Parish is the historic and cultural heart of New Orleans with intense urban, tourism, and residential relocation demand.',
    costs: {
      studioRange: '$850–$1,800',
      familyRange: '$3,100–$7,000',
      avgHourly: '$125–$180/hr for a 2-person crew',
      note: 'Orleans Parish pricing reflects dense urban New Orleans access constraints, historic-property handling, festival-season volume, and premium local crew demand.',
    },
    tips: [
      'Verify coverage for all neighborhoods in New Orleans proper before booking.',
      'Dense urban streets, parades, and festival traffic require advance planning — confirm crew arrival windows.',
      'Confirm insurance for high-value historic properties and flood/hurricane coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-tammany': {
    marketNotes:
      'St. Tammany Parish is one of Louisiana’s fastest-growing parishes, known for affluent suburban living, excellent schools, and strong demand from New Orleans commuters.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,300',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'St. Tammany Parish pricing reflects North Shore suburban demand in Mandeville and Covington, Causeway bridge traffic, and cross-lake crews from Jefferson and Orleans providers.',
    },
    tips: [
      'Verify coverage for Mandeville, Covington, Slidell, and Madisonville areas before booking.',
      'Lake Pontchartrain bridge and I-12 traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/hurricane coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lafayette: {
    marketNotes:
      'Lafayette Parish is the economic and cultural hub of Acadiana with strong oil & gas, technology, and university-driven residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Lafayette Parish pricing reflects Acadiana metro demand, UL Lafayette relocation volume, and competition among local and Baton Rouge regional providers.',
    },
    tips: [
      'Verify coverage for Lafayette, Broussard, and Youngsville areas before booking.',
      'Heavy industrial and university traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  caddo: {
    marketNotes:
      'Caddo Parish is the economic center of Northwest Louisiana with strong military, healthcare, and port-related demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Caddo Parish pricing reflects Shreveport metro demand, Barksdale AFB relocation volume, and regional van-line agents serving Northwest Louisiana.',
    },
    tips: [
      'Verify coverage for Shreveport, Bossier City, and surrounding areas before booking.',
      'Regional and interstate traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  calcasieu: {
    marketNotes:
      'Calcasieu Parish is a major industrial and port hub in Southwest Louisiana with significant residential and energy-sector demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,100',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Calcasieu Parish pricing reflects Lake Charles industrial and port demand, hurricane-season scheduling constraints, and regional crews from Lafayette and Baton Rouge providers.',
    },
    tips: [
      'Verify coverage for Lake Charles, Sulphur, and Westlake areas before booking.',
      'Industrial and port traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ouachita: {
    marketNotes:
      'Ouachita Parish is the economic center of Northeast Louisiana with strong healthcare, education, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Ouachita Parish pricing reflects Monroe metro demand, university and healthcare relocation volume, and regional crews from Shreveport providers.',
    },
    tips: [
      'Verify coverage for Monroe, West Monroe, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  livingston: {
    marketNotes:
      'Livingston Parish is one of Louisiana’s fastest-growing parishes with strong suburban residential demand east of Baton Rouge.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Livingston Parish pricing reflects Denham Springs and Walker suburban growth, Baton Rouge metro traffic, and regional crews from East Baton Rouge providers.',
    },
    tips: [
      'Verify coverage for Denham Springs, Walker, and Livingston areas before booking.',
      'Baton Rouge-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/hurricane coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tangipahoa: {
    marketNotes:
      'Tangipahoa Parish is a rapidly growing parish on the I-12 corridor with strong residential, educational, and commuter demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$165/hr for a 2-person crew',
      note: 'Tangipahoa Parish pricing reflects Hammond and Ponchatoula commuter demand, I-12 and I-55 corridor traffic, and regional crews from Baton Rouge and New Orleans providers.',
    },
    tips: [
      'Verify coverage for Hammond, Ponchatoula, and surrounding areas before booking.',
      'I-12 and I-55 traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and hurricane/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ascension: {
    marketNotes:
      'Ascension Parish is one of Louisiana’s fastest-growing parishes with strong petrochemical, suburban, and family residential demand.',
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Ascension Parish pricing reflects Gonzales and Prairieville suburban growth, Baton Rouge metro traffic, and regional crews from East Baton Rouge providers.',
    },
    tips: [
      'Verify coverage for Gonzales, Prairieville, and Donaldsonville areas before booking.',
      'Baton Rouge-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood/hurricane coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bossier: {
    marketNotes:
      'Bossier Parish is a rapidly growing parish with strong military (Barksdale AFB), suburban, and residential demand adjacent to Shreveport.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$160/hr for a 2-person crew',
      note: 'Bossier Parish pricing reflects Bossier City suburban demand, Barksdale AFB relocation volume, and shared Shreveport–Bossier metro crews.',
    },
    tips: [
      'Verify coverage for Bossier City, Benton, and Haughton areas before booking.',
      'Regional and base-related traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getLouisianaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return louisianaCountyResearch[countySlug];
}