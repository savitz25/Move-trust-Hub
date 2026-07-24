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
      'Treat Honolulu County as Oʻahu density (condo elevators, military patterns, H-1 freeflow) — not Big Island Hilo–Kona product.',
      'Survey elevators, COIs, and scarce curb separately from Kapolei–Ewa growth product.',
      'Price H-1 · H-2 · H-3 · Kamehameha Hwy portal time honestly for island cross-zone pairs.',
      'Verify Hawaii PUC household goods motor carrier CPCN for pure in-state and inter-island jobs; FMCSA for mainland legs.',
      'Inter-island barge/air and mainland container logistics rewrite schedules — confirm scope on every estimate.',
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
      'Label every job Hawaii County / Big Island (Hilo–Kona) — never apply Honolulu/Oʻahu density or whole-state templates as defaults.',
      'Price Queen Kaʻahumanu Hwy · Hawaiʻi Belt Road portal time honestly for Hilo ↔ Kona pairs; long empty miles are real.',
      'Rural and lava-zone approaches where accurate need driveway and access surveys early.',
      'Verify Hawaii PUC household goods CPCN for pure in-state and inter-island jobs; FMCSA for mainland legs.',
      'Inter-island barge/air components dominate Neighbor Island pairs more than road miles alone.',
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
      'Treat Maui as Kahului–Wailuku core with resort/residential mix — not Oʻahu elevator defaults alone.',
      'Price Honoapiʻilani Hwy · Haleakalā Hwy portal time honestly; tourism freeflow rewrites coastal windows.',
      'Survey resort multi-unit elevators separately from Upcountry and rural-edge product.',
      'Verify Hawaii PUC household goods CPCN for pure in-state and inter-island jobs; FMCSA for mainland legs.',
      'Book around peak tourism calendars; pier and air schedules matter for inter-island and mainland moves.',
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
      'Treat Kauaʻi as Līhuʻe / North Shore constrained product — not Oʻahu density clones.',
      'Price Kaumualiʻi Hwy · Kuhio Hwy portal time honestly; limited staging and tourism freeflow dominate risk.',
      'North Shore access constraints need photo surveys early; protect older and coastal interiors.',
      'Verify Hawaii PUC household goods CPCN for pure in-state and inter-island jobs; FMCSA for mainland legs.',
      'Inter-island barge/air components dominate Neighbor Island pairs more than road miles alone.',
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