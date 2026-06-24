import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated West Virginia county research — batch 1 large markets */
export const westVirginiaCountyResearch: Record<string, CuratedCountyResearch> = {
  kanawha: {
    marketNotes:
      'Kanawha County is the core of the Charleston metropolitan area with strong governmental, industrial, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Kanawha County pricing reflects Charleston metro state-capital demand, I-64/I-77 corridor traffic, Kanawha River valley relocation volume, and competition among full-service local agents.',
    },
    tips: [
      'Verify coverage for Charleston and surrounding areas before booking.',
      'Regional traffic on I-64 and I-77 significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood coverage along the Kanawha River before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  berkeley: {
    marketNotes:
      'Berkeley County is a growing suburban county in the Eastern Panhandle with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Berkeley County pricing reflects Eastern Panhandle suburban growth, I-81 corridor traffic, DC–Baltimore commuter spillover, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Martinsburg and surrounding areas before booking.',
      'I-81 corridor traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monongalia: {
    marketNotes:
      'Monongalia County is anchored by West Virginia University with strong educational and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Monongalia County pricing reflects Morgantown university demand, WVU semester turnover, Monongahela River valley traffic, and competition among student-focused and full-service local agents.',
    },
    tips: [
      'Verify coverage for Morgantown and surrounding areas before booking.',
      'University and game-day traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and WVU semester changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cabell: {
    marketNotes:
      'Cabell County is the core of the Huntington metropolitan area with strong educational and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Cabell County pricing reflects Huntington tri-state metro demand, Ohio River corridor traffic, Marshall University area volume, and competition among local full-service agents.',
    },
    tips: [
      'Verify coverage for Huntington and surrounding areas before booking.',
      'Regional traffic on I-64 significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wood: {
    marketNotes:
      'Wood County is the core of the Parkersburg metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Wood County pricing reflects Parkersburg mid-Ohio Valley demand, Ohio River industrial corridor traffic, and competition among regional full-service local agents.',
    },
    tips: [
      'Verify coverage for Parkersburg and surrounding areas before booking.',
      'Regional traffic on I-77 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  raleigh: {
    marketNotes:
      'Raleigh County is a key Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Raleigh County pricing reflects Beckley regional demand, I-64/I-77 mountain corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Beckley and surrounding areas before booking.',
      'Mountain corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a suburban county in the Eastern Panhandle with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Charles Town Eastern Panhandle suburban demand, Shenandoah Valley commuter spillover, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Charles Town and surrounding areas before booking.',
      'Regional traffic on US-340 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harrison: {
    marketNotes:
      'Harrison County is a key North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Harrison County pricing reflects Clarksburg regional demand, I-79 corridor traffic, and competition among North Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Clarksburg and surrounding areas before booking.',
      'Regional traffic on I-79 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mercer: {
    marketNotes:
      'Mercer County is a key Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Mercer County pricing reflects Princeton regional demand, I-77 coalfields corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Princeton and surrounding areas before booking.',
      'Regional traffic on I-77 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getWestVirginiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return westVirginiaCountyResearch[countySlug];
}