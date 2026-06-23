import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated South Carolina county research — grows incrementally per batch */
export const southCarolinaCountyResearch: Record<string, CuratedCountyResearch> =
  {
    aiken: {
      marketNotes:
        'Aiken County is a growing area with strong residential demand near Augusta and equestrian/rural properties across the Horse Country corridor.',
      costs: {
        studioRange: '$600–$1,150',
        familyRange: '$2,000–$4,400',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Aiken County pricing reflects equestrian-property access, rural driveways, Fort Eisenhower corridor seasonality, and cross-border Augusta-Aiken crew travel.',
      },
      tips: [
        'Verify explicit local service to Aiken and North Augusta before booking.',
        'Confirm experience with rural and equestrian property access — long driveways and gate logistics are common.',
        'Obtain multiple written estimates and confirm insurance and valuation coverage.',
        'Book early for peak moving seasons and military PCS windows near Fort Eisenhower.',
        'Re-verify FMCSA authority, BBB rating, and current reviews before signing.',
      ],
    },
    dorchester: {
      marketNotes:
        'Dorchester County is a growing suburban county in the Charleston metro area with steady demand in Summerville and St. George.',
      costs: {
        studioRange: '$650–$1,250',
        familyRange: '$2,200–$4,800',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Dorchester County pricing reflects Charleston-metro suburban demand, I-26 corridor traffic, and Summerville new-construction turnover.',
      },
      tips: [
        'Verify explicit coverage for Summerville, St. George, and surrounding Dorchester County addresses before booking.',
        'Charleston-area traffic on I-26 and Ashley Phosphate Road impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Charleston-area crews.',
      ],
    },
    pickens: {
      marketNotes:
        'Pickens County is a growing area in the Upstate near Greenville with foothill residential demand around Pickens and Easley.',
      costs: {
        studioRange: '$600–$1,200',
        familyRange: '$2,000–$4,500',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Pickens County pricing reflects Upstate suburban growth, foothill driveway access, and Greenville-metro crew travel.',
      },
      tips: [
        'Verify explicit coverage for Pickens, Easley, and surrounding Pickens County addresses before booking.',
        'Greenville-area traffic on I-85 and Hwy 123 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates; compare hourly vs flat-rate quotes from Greenville-area crews.',
      ],
    },
  };

export function getSouthCarolinaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return southCarolinaCountyResearch[countySlug];
}