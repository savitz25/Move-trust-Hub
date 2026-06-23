import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Alabama county research — grows incrementally per batch */
export const alabamaCountyResearch: Record<string, CuratedCountyResearch> = {
  jefferson: {
    marketNotes:
      "Jefferson County is Alabama's most populous county and the economic core of the Birmingham metropolitan area, with high demand for residential, corporate, and healthcare-related moves.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Birmingham metro urban and suburban demand, I-20/I-65 corridor traffic, and strong competition among full-service local providers.',
    },
    tips: [
      'Verify coverage for Birmingham, Hoover, Vestavia Hills, and Bessemer areas before booking.',
      'Major urban and highway traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban, suburban, and commercial properties before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  baldwin: {
    marketNotes:
      "Baldwin County is Alabama's fastest-growing county with strong coastal, retirement, and tourism-driven residential demand along the Eastern Shore and Gulf Coast.",
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Baldwin County pricing reflects coastal access constraints, peak tourist-season volume, and higher demand for waterfront and retirement relocations.',
    },
    tips: [
      'Verify coverage for Daphne, Fairhope, Foley, Gulf Shores, and Orange Beach areas before booking.',
      'Coastal access and hurricane-season considerations are critical — confirm scheduling buffers.',
      'Confirm insurance for high-value waterfront and retirement properties before booking.',
      'Book early for peak tourist seasons and snowbird turnover windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tuscaloosa: {
    marketNotes:
      'Tuscaloosa County is a major West Alabama hub with strong educational (University of Alabama), industrial, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Tuscaloosa County pricing reflects university-season demand, Northport suburban growth, and regional crews traveling from Birmingham metro providers.',
    },
    tips: [
      'Verify coverage for Tuscaloosa and Northport areas before booking.',
      'University and urban traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and semester turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shelby: {
    marketNotes:
      "Shelby County is one of Alabama's fastest-growing and most affluent suburban counties with high residential demand south of Birmingham.",
    costs: {
      studioRange: '$750–$1,550',
      familyRange: '$2,700–$6,000',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Shelby County pricing reflects affluent suburban demand in Alabaster, Pelham, Helena, and Calera, plus I-65 corridor traffic from Birmingham metro crews.',
    },
    tips: [
      'Verify coverage for Alabaster, Pelham, Helena, and Calera areas before booking.',
      'Birmingham-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      "Montgomery County is Alabama's capital county with strong government, military, and residential moving demand.",
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects capital-city government relocations, Maxwell-Gunter military corridor demand, and competition among established local full-service providers.',
    },
    tips: [
      'Verify coverage for Montgomery and surrounding areas before booking.',
      'Government and urban traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military relocations before booking.',
      'Book early for peak seasons and PCS windows.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getAlabamaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return alabamaCountyResearch[countySlug];
}