import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Massachusetts county research — batch 1 (3/14 counties) */
export const massachusettsCountyResearch: Record<string, CuratedCountyResearch> = {
  middlesex: {
    marketNotes:
      'Middlesex County is one of Massachusetts’ largest and most populous counties with strong urban, suburban, educational, and high-tech residential demand.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$145–$210/hr for a 2-person crew',
      note: 'Middlesex County pricing reflects Boston metro corridor demand, Route 128 tech-corridor volume, and competition among full-service agents serving Cambridge, Lowell, and Framingham.',
    },
    tips: [
      'Verify coverage for Cambridge, Lowell, Framingham, and surrounding towns before booking.',
      'Heavy Boston metro traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and urban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  worcester: {
    marketNotes:
      'Worcester County is a large central Massachusetts county with strong urban, suburban, and industrial demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Worcester County pricing reflects central Massachusetts demand, I-290 and I-495 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Worcester and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  essex: {
    marketNotes:
      'Essex County is a large coastal county north of Boston with strong suburban, historic, and waterfront residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Essex County pricing reflects North Shore coastal demand, Route 1 and I-95 corridor traffic, and competition among regional full-service agents serving Salem, Lynn, and Lawrence.',
    },
    tips: [
      'Verify coverage for Salem, Lynn, Lawrence, and surrounding towns before booking.',
      'Boston metro and coastal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront and historic homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMassachusettsCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return massachusettsCountyResearch[countySlug];
}