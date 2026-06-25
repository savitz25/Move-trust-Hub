import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Wisconsin county research — batches 1–3 (50 counties) */
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
  washington: {
    marketNotes:
      "Washington County, WI is a northern suburban county in the Milwaukee metro centered on West Bend with strong residential demand — not to be confused with Washington County, MN or Washington State.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Washington County pricing reflects north Milwaukee suburban demand, I-41 and US-45 corridor traffic, high-value suburban homes, and competition among regional agents serving Washington County, WI communities.",
    },
    tips: [
      "Verify coverage for West Bend and surrounding Milwaukee metro communities before booking.",
      "I-43, I-94, and I-41 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'la-crosse': {
    marketNotes:
      "La Crosse County, WI is a western Wisconsin county centered on La Crosse with strong urban and residential demand along the Mississippi River bluff corridor.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "La Crosse County pricing reflects La Crosse-area demand, Mississippi River corridor travel distances, cross-border Minnesota logistics, and competition among regional agents serving La Crosse County communities.",
    },
    tips: [
      "Verify coverage for La Crosse and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  sheboygan: {
    marketNotes:
      "Sheboygan County, WI is an eastern Wisconsin county centered on Sheboygan with strong residential demand along the Lake Michigan shoreline.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Sheboygan County pricing reflects Sheboygan-area demand, Lake Michigan corridor travel distances, and competition among regional agents serving Sheboygan County communities.",
    },
    tips: [
      "Verify coverage for Sheboygan and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'eau-claire': {
    marketNotes:
      "Eau Claire County, WI is a northwestern Wisconsin county centered on Eau Claire with strong urban and residential demand across the Chippewa Valley corridor.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Eau Claire County pricing reflects Chippewa Valley demand, regional corridor travel distances, and competition among regional agents serving Eau Claire County communities.",
    },
    tips: [
      "Verify coverage for Eau Claire and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  walworth: {
    marketNotes:
      "Walworth County, WI is a southeastern Wisconsin county centered on Elkhorn with strong residential demand across Geneva Lake and resort-lake communities — not to be confused with Walworth County in other states.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Walworth County pricing reflects Geneva Lake-area demand, seasonal resort-home logistics, and competition among regional agents serving Walworth County, WI communities.",
    },
    tips: [
      "Verify coverage for Elkhorn and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'fond-du-lac': {
    marketNotes:
      "Fond du Lac County, WI is an east-central Wisconsin county centered on Fond du Lac with residential demand along Lake Winnebago.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Fond du Lac County pricing reflects Lake Winnebago-area demand, regional corridor travel distances, and competition among regional agents serving Fond du Lac County communities.",
    },
    tips: [
      "Verify coverage for Fond du Lac and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'st-croix': {
    marketNotes:
      "St. Croix County, WI is a western Wisconsin county centered on Hudson with strong suburban and residential demand along the Twin Cities west-metro St. Croix River corridor.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "St. Croix County pricing reflects Twin Cities corridor demand, I-94 and St. Croix River bridge traffic, high-value suburban homes, and competition among regional agents serving St. Croix County communities.",
    },
    tips: [
      "Verify coverage for Hudson and surrounding Twin Cities corridor communities before booking.",
      "I-94 and St. Croix River bridge corridor congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  ozaukee: {
    marketNotes:
      "Ozaukee County, WI is a northern suburban county in the Milwaukee metro centered on Port Washington with strong lakeshore residential demand.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Ozaukee County pricing reflects north Milwaukee lakeshore suburban demand, I-43 corridor traffic, high-value suburban homes, and competition among regional agents serving Ozaukee County communities.",
    },
    tips: [
      "Verify coverage for Port Washington and surrounding Milwaukee metro communities before booking.",
      "I-43, I-94, and I-41 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  dodge: {
    marketNotes:
      "Dodge County, WI is an east-central Wisconsin county centered on Juneau with rural residential demand — not to be confused with Dodge County, MN or Dodge County in other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Dodge County pricing reflects rural east-central Wisconsin demand, longer travel distances between communities, and competition among regional agents serving Dodge County, WI communities.",
    },
    tips: [
      "Verify coverage for Juneau and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  jefferson: {
    marketNotes:
      "Jefferson County, WI is a southeastern Wisconsin county centered on Jefferson with residential demand along the Rock River corridor — not to be confused with Jefferson County in other states.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Jefferson County pricing reflects Rock River corridor demand, regional travel distances, and competition among regional agents serving Jefferson County, WI communities.",
    },
    tips: [
      "Verify coverage for Jefferson and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  manitowoc: {
    marketNotes:
      "Manitowoc County, WI is an eastern Wisconsin county centered on Manitowoc with residential demand along the Lake Michigan shoreline.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Manitowoc County pricing reflects Lake Michigan shoreline demand, regional corridor travel distances, and competition among regional agents serving Manitowoc County communities.",
    },
    tips: [
      "Verify coverage for Manitowoc and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  wood: {
    marketNotes:
      "Wood County, WI is a central Wisconsin county centered on Wisconsin Rapids with residential demand along the Wisconsin River corridor.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Wood County pricing reflects Wisconsin River corridor demand, regional travel distances, and competition among regional agents serving Wood County communities.",
    },
    tips: [
      "Verify coverage for Wisconsin Rapids and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  portage: {
    marketNotes:
      "Portage County, WI is a central Wisconsin county centered on Stevens Point with educational and residential demand — not to be confused with Portage County in other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Portage County pricing reflects Stevens Point-area demand, UW–Stevens Point campus turnover, and competition among regional agents serving Portage County, WI communities.",
    },
    tips: [
      "Verify coverage for Stevens Point and surrounding areas before booking.",
      "University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.",
      "Confirm coverage for student housing, off-campus apartments, and family homes before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  chippewa: {
    marketNotes:
      "Chippewa County, WI is a northwestern Wisconsin county centered on Chippewa Falls with residential demand across the Chippewa Valley corridor.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Chippewa County pricing reflects Chippewa Valley demand, regional corridor travel distances, and competition among regional agents serving Chippewa County communities.",
    },
    tips: [
      "Verify coverage for Chippewa Falls and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  sauk: {
    marketNotes:
      "Sauk County, WI is a south-central Wisconsin county centered on Baraboo with residential demand across Devil's Lake and Wisconsin Dells gateway communities.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Sauk County pricing reflects tourism-gateway demand, seasonal vacation-home logistics, and competition among regional agents serving Sauk County communities.",
    },
    tips: [
      "Verify coverage for Baraboo and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  columbia: {
    marketNotes:
      "Columbia County, WI is a south-central Wisconsin county centered on Portage with residential demand along the Wisconsin River corridor — not to be confused with Columbia County in other states.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Columbia County pricing reflects Wisconsin River corridor demand, regional travel distances, and competition among regional agents serving Columbia County, WI communities.",
    },
    tips: [
      "Verify coverage for Portage and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  calumet: {
    marketNotes:
      "Calumet County, WI is an east-central Wisconsin county centered on Chilton with residential demand across the Fox River corridor.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Calumet County pricing reflects Fox River corridor demand, regional travel distances, and competition among regional agents serving Calumet County communities.",
    },
    tips: [
      "Verify coverage for Chilton and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  grant: {
    marketNotes:
      "Grant County, WI is a southwestern Wisconsin county centered on Lancaster with rural residential demand across the Driftless Area — not to be confused with Grant County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Grant County pricing reflects Driftless Area rural demand, longer travel distances, and competition among regional agents serving Grant County, WI communities.",
    },
    tips: [
      "Verify coverage for Lancaster and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  waupaca: {
    marketNotes:
      "Waupaca County, WI is a central Wisconsin county centered on Waupaca with lakes-country and residential demand across the Chain of Lakes corridor.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Waupaca County pricing reflects lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Waupaca County communities.",
    },
    tips: [
      "Verify coverage for Waupaca and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  monroe: {
    marketNotes:
      "Monroe County, WI is a western Wisconsin county centered on Sparta with rural residential demand across the Driftless Area — not to be confused with Monroe County in other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Monroe County pricing reflects Driftless Area rural demand, regional travel distances, and competition among regional agents serving Monroe County, WI communities.",
    },
    tips: [
      "Verify coverage for Sparta and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  dunn: {
    marketNotes:
      "Dunn County, WI is a western Wisconsin county centered on Menomonie with residential demand across the Red Cedar and Chippewa Valley fringe corridor — not to be confused with Dunn County in other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Dunn County pricing reflects Menomonie-area demand, UW–Stout campus turnover, and competition among regional agents serving Dunn County, WI communities.",
    },
    tips: [
      "Verify coverage for Menomonie and surrounding areas before booking.",
      "University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.",
      "Confirm coverage for student housing, off-campus apartments, and family homes before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  barron: {
    marketNotes:
      "Barron County, WI is a northwestern Wisconsin county centered on Barron with rural residential demand — not to be confused with Barron County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Barron County pricing reflects northwest Wisconsin rural demand, longer travel distances, and competition among regional agents serving Barron County, WI communities.",
    },
    tips: [
      "Verify coverage for Barron and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  polk: {
    marketNotes:
      "Polk County, WI is a northwestern Wisconsin county centered on Balsam Lake with rural residential demand along the St. Croix River corridor — not to be confused with Polk County, MN or other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Polk County pricing reflects northwest Wisconsin rural demand, St. Croix River corridor travel distances, cross-border Minnesota logistics, and competition among regional agents serving Polk County, WI communities.",
    },
    tips: [
      "Verify coverage for Balsam Lake and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  douglas: {
    marketNotes:
      "Douglas County, WI is a northwestern Wisconsin county centered on Superior with strong urban and residential demand across the Duluth–Superior Twin Ports corridor — not to be confused with Douglas County in other states.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Douglas County pricing reflects Twin Ports cross-border demand, Lake Superior shoreline logistics, and competition among regional agents serving Douglas County, WI communities.",
    },
    tips: [
      "Verify coverage for Superior and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  pierce: {
    marketNotes:
      "Pierce County, WI is a western Wisconsin county centered on Ellsworth with suburban and residential demand along the Twin Cities west-metro St. Croix River corridor — not to be confused with Pierce County in other states.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Pierce County pricing reflects Twin Cities corridor demand, I-94 and St. Croix River bridge traffic, high-value suburban homes, and competition among regional agents serving Pierce County, WI communities.",
    },
    tips: [
      "Verify coverage for Ellsworth and surrounding Twin Cities corridor communities before booking.",
      "I-94 and St. Croix River bridge corridor congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  marinette: {
    marketNotes:
      "Marinette County, WI is a northeastern Wisconsin county centered on Marinette with residential demand along the Menominee River and Green Bay fringe corridor.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Marinette County pricing reflects northeast Wisconsin regional demand, Menominee River corridor travel distances, and competition among regional agents serving Marinette County communities.",
    },
    tips: [
      "Verify coverage for Marinette and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  shawano: {
    marketNotes:
      "Shawano County, WI is a northeastern Wisconsin county centered on Shawano with rural residential demand along the Wolf River corridor.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Shawano County pricing reflects rural northeast Wisconsin demand, longer travel distances, and competition among regional agents serving Shawano County communities.",
    },
    tips: [
      "Verify coverage for Shawano and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  oconto: {
    marketNotes:
      "Oconto County, WI is a northeastern Wisconsin county centered on Oconto with rural residential demand along the Bay of Green Bay fringe corridor.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Oconto County pricing reflects rural northeast Wisconsin demand, Bay of Green Bay corridor travel distances, and competition among regional agents serving Oconto County communities.",
    },
    tips: [
      "Verify coverage for Oconto and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  oneida: {
    marketNotes:
      "Oneida County, WI is a north-central Wisconsin county centered on Rhinelander with lakes-country and residential demand — not to be confused with Oneida County in other states.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Oneida County pricing reflects northwoods lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Oneida County, WI communities.",
    },
    tips: [
      "Verify coverage for Rhinelander and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  green: {
    marketNotes:
      "Green County, WI is a southern Wisconsin county centered on Monroe with rural residential demand across the Driftless Area — not to be confused with Green County in other states or Monroe County, WI (Sparta).",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Green County pricing reflects Driftless Area rural demand, longer travel distances, and competition among regional agents serving Green County, WI communities.",
    },
    tips: [
      "Verify coverage for Monroe and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  trempealeau: {
    marketNotes:
      "Trempealeau County, WI is a western Wisconsin county centered on Whitehall with rural residential demand along the Mississippi River bluff corridor.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Trempealeau County pricing reflects rural western Wisconsin demand, Mississippi River bluff corridor travel distances, and competition among regional agents serving Trempealeau County communities.",
    },
    tips: [
      "Verify coverage for Whitehall and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  door: {
    marketNotes:
      "Door County, WI is a northeastern Wisconsin county centered on Sturgeon Bay with strong tourism, vacation-home, and residential demand across the Door Peninsula.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Door County pricing reflects Door Peninsula tourism demand, seasonal vacation-home and second-home logistics, high-value lakeshore properties, and competition among regional agents serving Door County communities.",
    },
    tips: [
      "Verify coverage for Sturgeon Bay and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  lincoln: {
    marketNotes:
      "Lincoln County, WI is a north-central Wisconsin county centered on Merrill with rural residential demand along the Wisconsin River corridor — not to be confused with Lincoln County in other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Lincoln County pricing reflects north-central Wisconsin regional demand, Wisconsin River corridor travel distances, and competition among regional agents serving Lincoln County, WI communities.",
    },
    tips: [
      "Verify coverage for Merrill and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  juneau: {
    marketNotes:
      "Juneau County, WI is a central Wisconsin county centered on Mauston with rural residential demand across the Wisconsin Dells gateway corridor — not to be confused with Juneau County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Juneau County pricing reflects Wisconsin Dells tourism-gateway demand, seasonal turnover, and competition among regional agents serving Juneau County, WI communities.",
    },
    tips: [
      "Verify coverage for Mauston and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  waushara: {
    marketNotes:
      "Waushara County, WI is a central Wisconsin county centered on Wautoma with rural residential demand across central Wisconsin plains communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Waushara County pricing reflects rural central Wisconsin demand, longer travel distances, and competition among regional agents serving Waushara County communities.",
    },
    tips: [
      "Verify coverage for Wautoma and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  iowa: {
    marketNotes:
      "Iowa County, WI is a southwestern Wisconsin county centered on Dodgeville with rural residential demand across the Driftless Area — not to be confused with the state of Iowa or Iowa County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Iowa County pricing reflects Driftless Area rural demand, longer travel distances, and competition among regional agents serving Iowa County, WI communities.",
    },
    tips: [
      "Verify coverage for Dodgeville and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  vilas: {
    marketNotes:
      "Vilas County, WI is a north-central Wisconsin county centered on Eagle River with lakes-country and residential demand across the northwoods corridor.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Vilas County pricing reflects northwoods lakes-country demand, seasonal vacation-home logistics, and competition among regional agents serving Vilas County communities.",
    },
    tips: [
      "Verify coverage for Eagle River and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  adams: {
    marketNotes:
      "Adams County, WI is a central Wisconsin county centered on Friendship with rural residential demand across central sands corridor communities — not to be confused with Adams County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Adams County pricing reflects rural central Wisconsin demand, Wisconsin Dells fringe tourism logistics, and competition among regional agents serving Adams County, WI communities.",
    },
    tips: [
      "Verify coverage for Friendship and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  jackson: {
    marketNotes:
      "Jackson County, WI is a western Wisconsin county centered on Black River Falls with rural residential demand — not to be confused with Jackson County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Jackson County pricing reflects rural western Wisconsin demand, Black River corridor travel distances, and competition among regional agents serving Jackson County, WI communities.",
    },
    tips: [
      "Verify coverage for Black River Falls and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  kewaunee: {
    marketNotes:
      "Kewaunee County, WI is an eastern Wisconsin county centered on Kewaunee with rural residential demand along the Lake Michigan shoreline.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Kewaunee County pricing reflects rural eastern Wisconsin demand, Lake Michigan shoreline corridor travel distances, and competition among regional agents serving Kewaunee County communities.",
    },
    tips: [
      "Verify coverage for Kewaunee and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
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
