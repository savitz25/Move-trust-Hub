import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Delaware county research — complete state (3 counties) */
export const delawareCountyResearch: Record<string, CuratedCountyResearch> = {
  'new-castle': {
    marketNotes:
      "New Castle County is Delaware's most populous county with strong urban, suburban, corporate, and residential demand across Wilmington, Newark, and the Philadelphia metro spillover.",
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'New Castle County pricing reflects Wilmington metro urban-suburban demand, I-95 corridor traffic, and competition among full-service Delaware agents.',
    },
    tips: [
      'Verify coverage for Wilmington, Newark, and surrounding areas before booking.',
      'Regional I-95 and Route 1 traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sussex: {
    marketNotes:
      "Sussex County is Delaware's southernmost county with strong coastal, tourism, and residential demand across Georgetown, Rehoboth Beach, and Lewes.",
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Sussex County pricing reflects coastal tourism demand, seasonal beach-community volume, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Georgetown, Rehoboth Beach, and surrounding areas before booking.',
      'Tourist traffic and seasonal beach-town congestion significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and vacation properties.',
      'Book early for peak tourist seasons (May–September) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kent: {
    marketNotes:
      "Kent County is Central Delaware's core county anchored by Dover with strong residential and governmental demand.",
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Kent County pricing reflects state capital suburban demand, Dover metro relocation volume, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Dover and surrounding areas before booking.',
      'Regional Route 1 and Dover metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and state-government corridor relocations.',
      'Book early for peak seasons (May–September) and legislative session turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getDelawareCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return delawareCountyResearch[countySlug];
}