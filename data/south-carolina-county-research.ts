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
    florence: {
      marketNotes:
        'Florence County is a major hub in the Pee Dee region with strong residential, commercial, and medical-related moving demand.',
      costs: {
        studioRange: '$600–$1,200',
        familyRange: '$2,000–$4,600',
        avgHourly: '$105–$155/hr for a 2-person crew',
        note: 'Florence County pricing reflects Pee Dee hub demand, medical corridor access, and crew travel from Myrtle Beach and Columbia bases.',
      },
      tips: [
        'Verify explicit coverage for Florence, Timmonsville, Lake City, and surrounding Pee Dee addresses before booking.',
        'Local traffic and medical facility access impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value homes and medical equipment before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
      ],
    },
    lancaster: {
      marketNotes:
        'Lancaster County is a fast-growing suburban county in the Charlotte metro area with strong demand in Lancaster and Indian Land.',
      costs: {
        studioRange: '$650–$1,250',
        familyRange: '$2,200–$4,800',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: 'Lancaster County pricing reflects Charlotte-metro suburban growth, Indian Land new construction, and cross-border crew travel.',
      },
      tips: [
        'Verify explicit coverage for Lancaster, Indian Land, and surrounding Lancaster County addresses before booking.',
        'Charlotte-area traffic on I-77 and US-521 impacts scheduling — confirm crew arrival windows.',
        'Confirm insurance and valuation for high-value suburban homes before booking.',
        'Book early for peak seasons and month-end lease turnover.',
        'Obtain multiple written estimates and re-verify credentials before signing.',
      ],
    },
    sumter: {
      marketNotes:
        'Sumter County centers on Sumter with significant military influence from Shaw Air Force Base and steady residential turnover.',
      costs: {
        studioRange: '$550–$1,100',
        familyRange: '$1,900–$4,300',
        avgHourly: '$100–$150/hr for a 2-person crew',
        note: 'Sumter County pricing reflects military PCS seasonality, Shaw AFB corridor demand, and Midlands crew travel from Columbia.',
      },
      tips: [
        'Military moves require specific experience — confirm PCS documentation and government billing familiarity for Shaw AFB relocations.',
        'Verify explicit coverage for Sumter and surrounding Sumter County addresses before booking.',
        'Confirm insurance and valuation for high-value homes before booking.',
        'Book early for peak seasons and military PCS windows.',
        'Obtain multiple written estimates and compare hourly vs flat-rate quotes from Sumter and Columbia-area crews.',
      ],
    },
  };

export function getSouthCarolinaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return southCarolinaCountyResearch[countySlug];
}