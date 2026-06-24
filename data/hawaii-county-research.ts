import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Hawaii county research — complete state (5/5 counties) */
export const hawaiiCountyResearch: Record<string, CuratedCountyResearch> = {
  honolulu: {
    marketNotes:
      'Honolulu County (Oahu) is Hawaii’s most populous county with dense urban, suburban, military, and tourism-driven residential demand.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,500–$11,000+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Honolulu County pricing reflects Oahu metro demand, H-1 corridor traffic, military housing turnover, and competition among full-service agents serving urban and suburban island communities.',
    },
    tips: [
      'Verify coverage for Honolulu, Pearl City, and surrounding areas before booking.',
      'Inter-island moves require barge or air freight coordination — confirm whether your mover handles Oahu-only or multi-island logistics.',
      'Mainland-to-Hawaii relocations involve port scheduling and container shipping — distinguish local Oahu movers from interstate van-line agents.',
      'Military PCS and government housing moves near Joint Base Pearl Harbor–Hickam may require base access coordination — confirm credentials.',
      'Heavy urban and tourist traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value island properties and multi-floor loading zones.',
      'Book early for peak tourist seasons (December–April) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hawaii: {
    marketNotes:
      'Hawaii County (Big Island) is the largest island county with diverse residential, volcanic, and tourism demand.',
    costs: {
      studioRange: '$850–$1,800',
      familyRange: '$3,200–$8,500+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Hawaii County pricing reflects Big Island geographic spread, Saddle Road and coastal corridor traffic, and competition among regional full-service agents serving Hilo and Kailua-Kona.',
    },
    tips: [
      'Verify coverage for Hilo, Kailua-Kona, and surrounding areas before booking.',
      'Island traffic and volcanic activity considerations impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value island properties and rural homes.',
      'Book early for peak tourist seasons (December–April) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  maui: {
    marketNotes:
      'Maui County includes Maui, Molokai, and Lanai with strong tourism and residential demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Maui County pricing reflects Valley Isle tourism demand, Hana Highway and Kahului corridor traffic, and competition among regional full-service agents serving Wailuku and Lahaina-area communities.',
    },
    tips: [
      'Verify coverage for Kahului, Wailuku, and island towns before booking.',
      'Inter-island moves to Molokai and Lanai require ferry or barge logistics — confirm multi-island capability before booking.',
      'Second-home and vacation-property moves often involve seasonal access windows — confirm peak and off-season availability.',
      'Tourist traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value island properties and vacation homes.',
      'Book early for peak tourist seasons (December–April) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kauai: {
    marketNotes:
      'Kauai County (Garden Island) has strong tourism and residential demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Kauai County pricing reflects Garden Isle tourism demand, Kuhio Highway corridor traffic, and competition among regional full-service agents serving Lihue and North Shore communities.',
    },
    tips: [
      'Verify coverage for Lihue and surrounding towns before booking.',
      'Inter-island shipping from Kauai adds significant cost and lead time — confirm barge or air-freight options for multi-island relocations.',
      'Retirement and second-home moves are common on the Garden Isle — confirm experience with coastal and hillside properties.',
      'Tourist traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value island properties and coastal homes.',
      'Book early for peak tourist seasons (December–April) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kalawao: {
    marketNotes:
      'Kalawao County is Hawaii’s smallest county on Molokai, primarily a settlement with very limited moving services.',
    costs: {
      studioRange: 'Varies significantly (island logistics)',
      familyRange: 'Varies significantly (island logistics)',
      avgHourly: '$120–$180/hr for a 2-person crew (limited availability)',
      note: 'Kalawao County pricing reflects extreme remote-access logistics, air and sea transport constraints, and very limited mover availability serving the Kalaupapa settlement.',
    },
    tips: [
      'Verify coverage for Kalaupapa settlement before booking.',
      'Limited access via air or sea significantly impacts logistics — coordinate well in advance.',
      'Confirm insurance for remote island properties and restricted-access relocations.',
      'Book as early as possible due to restricted access and limited provider availability.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getHawaiiCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return hawaiiCountyResearch[countySlug];
}