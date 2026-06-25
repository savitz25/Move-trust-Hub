import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Wisconsin county research — batch 1 (10 counties) */
export const wisconsinCountyResearch: Record<string, CuratedCountyResearch> = {
  milwaukee: {
    marketNotes:
      "Milwaukee County, WI is Wisconsin’s most populous county centered on Milwaukee with strong urban, suburban, and residential demand across the Milwaukee metro and Lake Michigan corridor.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Milwaukee County pricing reflects Milwaukee metro demand, I-43 and I-94 corridor traffic, high-value urban and suburban homes, and competition among full-service agents serving Milwaukee County communities.",
    },
    tips: [
      "Verify coverage for Milwaukee and surrounding Milwaukee metro communities before booking.",
      "I-43, I-94, and I-41 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  dane: {
    marketNotes:
      "Dane County, WI is a major urban county centered on Madison with strong governmental, university, and residential demand across Wisconsin’s capital corridor — not to be confused with Dane County in other states.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Dane County pricing reflects Madison metro demand, capitol-city and university-area logistics, and competition among regional agents serving Dane County communities.",
    },
    tips: [
      "Verify coverage for Madison and surrounding areas before booking.",
      "University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.",
      "Confirm coverage for student housing, off-campus apartments, and family homes before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  waukesha: {
    marketNotes:
      "Waukesha County, WI is a major suburban county in the Milwaukee metro west corridor with strong residential demand across Waukesha, Lake Country, and west suburban communities.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Waukesha County pricing reflects west Milwaukee suburban demand, I-94 corridor traffic, high-value Lake Country homes, and competition among regional agents serving Waukesha County communities.",
    },
    tips: [
      "Verify coverage for Waukesha and surrounding Milwaukee metro communities before booking.",
      "I-43, I-94, and I-41 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  brown: {
    marketNotes:
      "Brown County, WI is a northeastern Wisconsin county centered on Green Bay with strong urban, port, and residential demand along the Fox River corridor — not to be confused with Brown County, MN or other Brown counties nationwide.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Brown County pricing reflects Green Bay-area demand, Fox River corridor travel distances, and competition among regional agents serving Brown County, WI communities.",
    },
    tips: [
      "Verify coverage for Green Bay and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  racine: {
    marketNotes:
      "Racine County, WI is a southeastern Wisconsin county centered on Racine with strong urban, suburban, and residential demand along the Root River and Lake Michigan corridor.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Racine County pricing reflects Racine-area demand, Lake Michigan shoreline logistics, and competition among regional agents serving Racine County communities.",
    },
    tips: [
      "Verify coverage for Racine and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  outagamie: {
    marketNotes:
      "Outagamie County, WI is a Fox Valley county centered on Appleton with strong urban, suburban, and residential demand across Fox Cities corridor communities.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Outagamie County pricing reflects Appleton-area demand, Fox Cities corridor travel distances, and competition among regional agents serving Outagamie County communities.",
    },
    tips: [
      "Verify coverage for Appleton and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  winnebago: {
    marketNotes:
      "Winnebago County, WI is a Fox Valley county centered on Oshkosh with strong urban, suburban, and residential demand along Lake Winnebago — not to be confused with Winnebago County, IA or Winnebago County, IL.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Winnebago County pricing reflects Oshkosh-area demand, Lake Winnebago corridor travel distances, and competition among regional agents serving Winnebago County, WI communities.",
    },
    tips: [
      "Verify coverage for Oshkosh and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  kenosha: {
    marketNotes:
      "Kenosha County, WI is a southeastern Wisconsin county centered on Kenosha with strong urban, suburban, and residential demand along the Chicago–Milwaukee I-94 corridor — not to be confused with Kenosha County in other states.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Kenosha County pricing reflects Chicago–Milwaukee I-94 corridor demand, cross-border Illinois logistics, Lake Michigan shoreline communities, and competition among regional agents serving Kenosha County communities.",
    },
    tips: [
      "Verify coverage for Kenosha and surrounding Milwaukee metro communities before booking.",
      "I-43, I-94, and I-41 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  rock: {
    marketNotes:
      "Rock County, WI is a southern Wisconsin county centered on Janesville with strong urban, suburban, and residential demand along the Rock River corridor — not to be confused with Rock County, MN or Rock County in other states.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Rock County pricing reflects Janesville-area demand, Rock River corridor travel distances, cross-border Illinois logistics, and competition among regional agents serving Rock County, WI communities.",
    },
    tips: [
      "Verify coverage for Janesville and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  marathon: {
    marketNotes:
      "Marathon County, WI is a north-central Wisconsin county centered on Wausau with strong urban, suburban, and residential demand along the Wisconsin River corridor.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Marathon County pricing reflects Wausau-area demand, Wisconsin River corridor travel distances, and competition among regional agents serving Marathon County communities.",
    },
    tips: [
      "Verify coverage for Wausau and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
};

export function getWisconsinCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return wisconsinCountyResearch[countySlug];
}
