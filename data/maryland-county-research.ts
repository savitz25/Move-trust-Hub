import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Maryland county research — batch 1 (Montgomery, Prince George's, Baltimore) */
export const marylandCountyResearch: Record<string, CuratedCountyResearch> = {
  montgomery: {
    marketNotes:
      "Montgomery County is one of Maryland's largest and most affluent counties with strong suburban, corporate, and residential demand across Rockville, Bethesda, Silver Spring, and the Washington DC metro spillover.",
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects affluent DC-suburb demand, federal contractor relocations, I-270 and Beltway traffic, and competition among full-service Maryland agents.',
    },
    tips: [
      'Verify coverage for Rockville, Bethesda, Silver Spring, and surrounding areas before booking.',
      'Federal and corporate relocations along the I-270 corridor may require flexible scheduling — confirm crew availability.',
      'Heavy DC metro traffic on I-495, I-270, and Route 355 significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September), federal transfer windows, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'prince-georges': {
    marketNotes:
      "Prince George's County is a large and diverse suburban county bordering Washington DC with strong residential and commercial demand across Upper Marlboro, Bowie, Laurel, and the Capital Beltway corridor.",
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: "Prince George's County pricing reflects diverse DC-border suburban demand, Metro-accessible communities, Beltway traffic, and competition among regional full-service agents.",
    },
    tips: [
      'Verify coverage for Upper Marlboro, Bowie, Laurel, and surrounding areas before booking.',
      'Moves near Metro stations and mixed-use developments may require elevator or loading-zone coordination — confirm building access.',
      'Heavy DC metro traffic on I-495, Route 50, and Baltimore-Washington Parkway significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  baltimore: {
    marketNotes:
      'Baltimore County surrounds the independent city of Baltimore with strong suburban, residential, and commercial demand across Towson, Catonsville, Dundalk, and the I-695 Beltway communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Baltimore County pricing reflects suburban Baltimore metro demand, university and hospital corridor relocations, I-695 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Towson, Catonsville, Dundalk, and surrounding areas before booking.',
      'Towson university and hospital corridor moves may require parking permits or tight loading windows — confirm access in advance.',
      'Baltimore-area traffic on I-695, I-83, and I-95 significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, rowhome-adjacent communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMarylandCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return marylandCountyResearch[countySlug];
}