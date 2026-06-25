import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Minnesota county research — 87 counties */
export const minnesotaCountyResearch: Record<string, CuratedCountyResearch> = {
  hennepin: {
    marketNotes:
      "Hennepin County, MN is Minnesota’s most populous county centered on Minneapolis with strong urban, suburban, and residential demand across the Twin Cities metro west corridor.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Hennepin County pricing reflects Minneapolis metro demand, I-94 and I-494 corridor traffic, high-value suburban homes, and competition among full-service agents serving Hennepin County communities.",
    },
    tips: [
      "Verify coverage for Minneapolis and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  ramsey: {
    marketNotes:
      "Ramsey County, MN is a major urban county centered on Saint Paul with strong governmental, university, and residential demand along the Mississippi River capital corridor.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Ramsey County pricing reflects Saint Paul metro demand, capital-city and riverfront logistics, and competition among regional agents serving Ramsey County communities.",
    },
    tips: [
      "Verify coverage for Saint Paul and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  dakota: {
    marketNotes:
      "Dakota County, MN is a rapidly growing suburban county south of the Twin Cities with strong residential demand across Lakeville, Hastings, and Minnesota River corridor communities.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Dakota County pricing reflects south metro suburban growth, Minnesota River corridor travel distances, and competition among regional agents serving Dakota County communities.",
    },
    tips: [
      "Verify coverage for Lakeville and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  anoka: {
    marketNotes:
      "Anoka County, MN is a northern suburban county in the Twin Cities metro with strong residential demand across Anoka and Rum River north metro corridor communities.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Anoka County pricing reflects north metro suburban demand, I-35W corridor traffic, and competition among regional agents serving Anoka County communities.",
    },
    tips: [
      "Verify coverage for Anoka and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  washington: {
    marketNotes:
      "Washington County, MN is an eastern suburban county in the Twin Cities metro with strong residential demand across Stillwater, Woodbury, and St. Croix River corridor communities — not to be confused with Washington State or other Washington counties.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Washington County pricing reflects east metro suburban demand, St. Croix River bridge corridor traffic, and competition among regional agents serving Washington County, MN communities.",
    },
    tips: [
      "Verify coverage for Stillwater and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'st-louis': {
    marketNotes:
      "St. Louis County, MN is a major northern Minnesota county centered on Duluth with strong urban, port, and residential demand along the Lake Superior north shore — not to be confused with St. Louis, Missouri.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "St. Louis County pricing reflects Duluth-area demand, Lake Superior corridor travel distances, harsh winters, and competition among regional agents serving St. Louis County communities.",
    },
    tips: [
      "Verify coverage for Duluth and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  olmsted: {
    marketNotes:
      "Olmsted County, MN is a southeastern Minnesota county centered on Rochester with strong Mayo Clinic medical-sector and residential demand across Zumbro River corridor communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Olmsted County pricing reflects Rochester medical-sector relocations, Zumbro River corridor travel distances, and competition among regional agents serving Olmsted County communities.",
    },
    tips: [
      "Verify coverage for Rochester and surrounding Olmsted County communities before booking.",
      "Mayo Clinic medical-sector relocations and housing turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value homes and professional relocations before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  stearns: {
    marketNotes:
      "Stearns County, MN is a central Minnesota county centered on St. Cloud with residential and university demand across Mississippi River corridor communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Stearns County pricing reflects St. Cloud-area demand, Mississippi River corridor travel distances, and competition among regional agents serving Stearns County communities.",
    },
    tips: [
      "Verify coverage for St. Cloud and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  scott: {
    marketNotes:
      "Scott County, MN is a southern suburban county in the Twin Cities metro with strong residential demand across Shakopee and Minnesota River southwest corridor communities — not to be confused with Scott County, Iowa.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Scott County pricing reflects southwest metro suburban demand, Minnesota River corridor traffic, and competition among regional agents serving Scott County, MN communities.",
    },
    tips: [
      "Verify coverage for Shakopee and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  wright: {
    marketNotes:
      "Wright County, MN is a western suburban county in the Twin Cities metro with strong residential demand across Buffalo and Crow River west metro corridor communities — not to be confused with Wright County, Iowa.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Wright County pricing reflects west metro suburban demand, Crow River corridor travel distances, and competition among regional agents serving Wright County, MN communities.",
    },
    tips: [
      "Verify coverage for Buffalo and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  carver: {
    marketNotes:
      "Carver County, MN is a southwestern suburban county in the Twin Cities metro with strong residential demand across Chaska and Minnesota River southwest corridor communities.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Carver County pricing reflects southwest metro suburban demand, Minnesota River corridor traffic, and competition among regional agents serving Carver County communities.",
    },
    tips: [
      "Verify coverage for Chaska and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  sherburne: {
    marketNotes:
      "Sherburne County, MN is a north metro suburban county centered on Elk River with strong residential demand across Rum River and I-94 northwest corridor communities.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Sherburne County pricing reflects northwest metro suburban growth, Rum River corridor traffic, and competition among regional agents serving Sherburne County communities.",
    },
    tips: [
      "Verify coverage for Elk River and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'blue-earth': {
    marketNotes:
      "Blue Earth County, MN is a south-central Minnesota county centered on Mankato with strong Minnesota State University, student-housing, and Minnesota River valley residential demand.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Blue Earth County pricing reflects Mankato regional-hub demand, university and healthcare relocations, Minnesota River valley corridor traffic, and competition among regional agents serving Blue Earth County communities.",
    },
    tips: [
      "Verify coverage for Mankato and surrounding areas before booking.",
      "University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.",
      "Confirm coverage for student housing, off-campus apartments, and family homes before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  rice: {
    marketNotes:
      "Rice County, MN is a south-central Minnesota county centered on Faribault with residential and manufacturing demand across Cannon River corridor communities — not to be confused with Rice County in other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Rice County pricing reflects Faribault-area demand, Cannon River corridor travel distances, and competition among regional agents serving Rice County, MN communities.",
    },
    tips: [
      "Verify coverage for Faribault and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'crow-wing': {
    marketNotes:
      "Crow Wing County, MN is a central lakes-country county centered on Brainerd with strong resort, vacation-rental, seasonal-property, and Gull Lake corridor residential demand.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Crow Wing County pricing reflects Brainerd lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Crow Wing County communities.",
    },
    tips: [
      "Verify coverage for Brainerd and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  clay: {
    marketNotes:
      "Clay County, MN is a Red River Valley county centered on Moorhead with strong cross-border Fargo–Moorhead metro, university, and residential demand — not to be confused with Clay County in Iowa or Nebraska.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Clay County pricing reflects Moorhead secondary-metro demand, Red River border-corridor traffic, cross-border North Dakota logistics, and competition among regional agents serving Clay County, MN communities.",
    },
    tips: [
      "Verify coverage for Moorhead and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'otter-tail': {
    marketNotes:
      "Otter Tail County, MN is a west-central lakes-country county centered on Fergus Falls with strong resort, vacation-rental, and seasonal-property demand across Otter Tail lake chain corridor communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Otter Tail County pricing reflects Fergus Falls regional-hub demand, lakes-country resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Otter Tail County communities.",
    },
    tips: [
      "Verify coverage for Fergus Falls and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  chisago: {
    marketNotes:
      "Chisago County, MN is an east metro county centered on Center City with strong residential demand across St. Croix River and north metro fringe corridor communities.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Chisago County pricing reflects east metro suburban demand, St. Croix River corridor travel distances, and competition among regional agents serving Chisago County communities.",
    },
    tips: [
      "Verify coverage for Center City and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  winona: {
    marketNotes:
      "Winona County, MN is a southeastern bluff-country county centered on Winona with strong Winona State University, student-housing, and Mississippi River corridor residential demand.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Winona County pricing reflects Winona regional-hub demand, university and bluff-country relocations, Mississippi River corridor traffic, and competition among regional agents serving Winona County communities.",
    },
    tips: [
      "Verify coverage for Winona and surrounding areas before booking.",
      "University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.",
      "Confirm coverage for student housing, off-campus apartments, and family homes before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  goodhue: {
    marketNotes:
      "Goodhue County, MN is a southeastern Minnesota county centered on Red Wing with residential and Mississippi River bluff corridor demand across Cannon River gateway communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Goodhue County pricing reflects Red Wing-area demand, Cannon River and Mississippi bluff corridor travel distances, and competition among regional agents serving Goodhue County communities.",
    },
    tips: [
      "Verify coverage for Red Wing and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  beltrami: {
    marketNotes:
      "Beltrami County, MN is a north-central Minnesota county centered on Bemidji with residential, tribal-nation gateway, and lake-country demand across upper Mississippi headwaters corridor communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Beltrami County pricing reflects Bemidji regional-hub demand, remote northwoods travel distances, and competition among regional agents serving Beltrami County communities.",
    },
    tips: [
      "Verify coverage for Bemidji and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  itasca: {
    marketNotes:
      "Itasca County, MN is a north-central Minnesota county centered on Grand Rapids with residential, forestry, and Mississippi headwaters corridor demand across lake-country gateway communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Itasca County pricing reflects Grand Rapids regional-hub demand, remote northwoods travel distances, and competition among regional agents serving Itasca County communities.",
    },
    tips: [
      "Verify coverage for Grand Rapids and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  isanti: {
    marketNotes:
      "Isanti County, MN is a north metro county centered on Cambridge with strong residential demand across Rum River and I-35 north corridor communities.",
    costs: {
      studioRange: "$900–$1,900",
      familyRange: "$3,500–$8,500+",
      avgHourly: "$125–$195/hr for a 2-person crew",
      note: "Isanti County pricing reflects north metro suburban demand, Rum River corridor travel distances, and competition among regional agents serving Isanti County communities.",
    },
    tips: [
      "Verify coverage for Cambridge and surrounding Twin Cities metro communities before booking.",
      "I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value suburban homes, condos, and townhomes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  kandiyohi: {
    marketNotes:
      "Kandiyohi County, MN is a west-central Minnesota county centered on Willmar with residential, agricultural, and glacial-lakes corridor demand across regional hub communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Kandiyohi County pricing reflects Willmar-area demand, glacial-lakes corridor travel distances, and competition among regional agents serving Kandiyohi County communities.",
    },
    tips: [
      "Verify coverage for Willmar and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  benton: {
    marketNotes:
      "Benton County, MN is a central Minnesota county centered on Foley with residential demand across Sauk River and St. Cloud fringe corridor communities — not to be confused with Benton County in other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Benton County pricing reflects Foley-area demand, Sauk River corridor travel distances, and competition among regional agents serving Benton County, MN communities.",
    },
    tips: [
      "Verify coverage for Foley and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  mower: {
    marketNotes:
      "Mower County, MN is a southeastern Minnesota county centered on Austin with rural residential, food-processing, and Cedar River corridor agricultural demand across regional hub communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Mower County pricing reflects Austin-area rural demand, Cedar River corridor travel distances, agricultural property logistics, and competition among regional agents serving Mower County communities.",
    },
    tips: [
      "Verify coverage for Austin and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  douglas: {
    marketNotes:
      "Douglas County, MN is a west-central lakes-country county centered on Alexandria with strong resort, vacation-rental, and chain-of-lakes corridor residential demand — not to be confused with Douglas County, Wisconsin.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Douglas County pricing reflects Alexandria lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Douglas County, MN communities.",
    },
    tips: [
      "Verify coverage for Alexandria and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  steele: {
    marketNotes:
      "Steele County, MN is a south-central Minnesota county centered on Owatonna with residential and manufacturing demand across Straight River corridor communities — not to be confused with Steele County in North Dakota.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Steele County pricing reflects Owatonna-area demand, Straight River corridor travel distances, and competition among regional agents serving Steele County, MN communities.",
    },
    tips: [
      "Verify coverage for Owatonna and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  carlton: {
    marketNotes:
      "Carlton County, MN is a northeastern Minnesota county centered on Cloquet with residential and St. Louis River corridor demand across Duluth-adjacent northwoods gateway communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Carlton County pricing reflects Cloquet-area demand, St. Louis River corridor travel distances, and competition among regional agents serving Carlton County communities.",
    },
    tips: [
      "Verify coverage for Cloquet and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  mcleod: {
    marketNotes:
      "McLeod County, MN is a west-metro fringe county centered on Hutchinson with residential and manufacturing demand across Crow River corridor communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "McLeod County pricing reflects Hutchinson-area demand, Crow River corridor travel distances, and competition among regional agents serving McLeod County communities.",
    },
    tips: [
      "Verify coverage for Hutchinson and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  becker: {
    marketNotes:
      "Becker County, MN is a northwest lakes-country county centered on Detroit Lakes with strong resort, vacation-rental, and seasonal-property demand across glacier-lakes corridor communities.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Becker County pricing reflects Detroit Lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Becker County communities.",
    },
    tips: [
      "Verify coverage for Detroit Lakes and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  morrison: {
    marketNotes:
      "Morrison County, MN is a central Minnesota county centered on Little Falls with residential demand across Mississippi River and central lakes gateway corridor communities — not to be confused with Morrison County in other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Morrison County pricing reflects Little Falls-area demand, Mississippi River corridor travel distances, and competition among regional agents serving Morrison County, MN communities.",
    },
    tips: [
      "Verify coverage for Little Falls and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  nicollet: {
    marketNotes:
      "Nicollet County, MN is a south-central Minnesota county centered on St. Peter with residential and Gustavus Adolphus College corridor demand across Minnesota River valley communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Nicollet County pricing reflects St. Peter-area demand, Minnesota River valley corridor travel distances, and competition among regional agents serving Nicollet County communities.",
    },
    tips: [
      "Verify coverage for St. Peter and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  cass: {
    marketNotes:
      "Cass County, MN is a central lakes-country county centered on Walker with strong Leech Lake resort, vacation-rental, and seasonal-property demand — not to be confused with Cass County in North Dakota.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Cass County pricing reflects Walker lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Cass County, MN communities.",
    },
    tips: [
      "Verify coverage for Walker and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  pine: {
    marketNotes:
      "Pine County, MN is an east-central Minnesota county centered on Pine City with residential demand across Snake River and north metro fringe corridor communities.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Pine County pricing reflects Pine City-area demand, Snake River corridor travel distances, and competition among regional agents serving Pine County communities.",
    },
    tips: [
      "Verify coverage for Pine City and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  freeborn: {
    marketNotes:
      "Freeborn County, MN is a southern Minnesota county centered on Albert Lea with rural residential, lake-country, and I-35 corridor agricultural demand across regional hub communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Freeborn County pricing reflects Albert Lea-area rural demand, southern Minnesota corridor travel distances, agricultural property logistics, and competition among regional agents serving Freeborn County communities.",
    },
    tips: [
      "Verify coverage for Albert Lea and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  polk: {
    marketNotes:
      "Polk County, MN is a northwest Red River Valley county centered on Crookston with agricultural, university, and cross-border North Dakota corridor residential demand — not to be confused with Polk County in Iowa, Nebraska, or other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Polk County pricing reflects Crookston regional-hub demand, Red River Valley corridor travel distances, cross-border North Dakota logistics, and competition among regional agents serving Polk County, MN communities.",
    },
    tips: [
      "Verify coverage for Crookston and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'le-sueur': {
    marketNotes:
      "Le Sueur County, MN is a south-central Minnesota county centered on Le Center with residential and Minnesota River valley corridor demand across regional hub communities — not to be confused with Le Sueur County in other states.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Le Sueur County pricing reflects Le Center regional-hub demand, Minnesota River valley corridor travel distances, and competition among regional agents serving Le Sueur County communities.",
    },
    tips: [
      "Verify coverage for Le Center and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'mille-lacs': {
    marketNotes:
      "Mille Lacs County, MN is a central lakes-country county centered on Milaca with strong Mille Lacs Lake resort, vacation-rental, and seasonal-property demand across north metro fringe corridor communities.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Mille Lacs County pricing reflects Milaca lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Mille Lacs County communities.",
    },
    tips: [
      "Verify coverage for Milaca and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  todd: {
    marketNotes:
      "Todd County, MN is a central Minnesota county centered on Long Prairie with rural residential and Sauk River corridor agricultural demand across regional gateway communities — not to be confused with Todd County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Todd County pricing reflects Long Prairie-area rural demand, Sauk River corridor travel distances, agricultural property logistics, and competition among regional agents serving Todd County, MN communities.",
    },
    tips: [
      "Verify coverage for Long Prairie and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  lyon: {
    marketNotes:
      "Lyon County, MN is a southwestern Minnesota county centered on Marshall with rural residential, agricultural, and Minnesota River fringe corridor demand — not to be confused with Lyon County in Iowa, Kentucky, or Nevada.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Lyon County pricing reflects Marshall-area rural demand, southwestern Minnesota corridor travel distances, agricultural property logistics, and competition among regional agents serving Lyon County, MN communities.",
    },
    tips: [
      "Verify coverage for Marshall and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  brown: {
    marketNotes:
      "Brown County, MN is a south-central Minnesota county centered on New Ulm with rural residential, heritage-tourism, and Minnesota River valley corridor agricultural demand — not to be confused with Brown County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Brown County pricing reflects New Ulm-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Brown County, MN communities.",
    },
    tips: [
      "Verify coverage for New Ulm and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  meeker: {
    marketNotes:
      "Meeker County, MN is a west-metro fringe county centered on Litchfield with rural residential and Crow River corridor agricultural demand across regional gateway communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Meeker County pricing reflects Litchfield-area rural demand, Crow River corridor travel distances, agricultural property logistics, and competition among regional agents serving Meeker County communities.",
    },
    tips: [
      "Verify coverage for Litchfield and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  hubbard: {
    marketNotes:
      "Hubbard County, MN is a north-central lakes-country county centered on Park Rapids with strong resort, vacation-rental, and Heartland corridor seasonal-property demand — not to be confused with Hubbard County in other states.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Hubbard County pricing reflects Park Rapids lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Hubbard County communities.",
    },
    tips: [
      "Verify coverage for Park Rapids and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  nobles: {
    marketNotes:
      "Nobles County, MN is a southwestern Minnesota county centered on Worthington with rural residential, food-processing, and Okabena Lake corridor agricultural demand across prairie gateway communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Nobles County pricing reflects Worthington-area rural demand, southwestern Minnesota corridor travel distances, agricultural property logistics, and competition among regional agents serving Nobles County communities.",
    },
    tips: [
      "Verify coverage for Worthington and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  fillmore: {
    marketNotes:
      "Fillmore County, MN is a southeastern Minnesota county centered on Preston with rural residential and Root River bluff-country corridor demand across driftless gateway communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Fillmore County pricing reflects Preston-area rural demand, Root River bluff corridor travel distances, agricultural property logistics, and competition among regional agents serving Fillmore County communities.",
    },
    tips: [
      "Verify coverage for Preston and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  wabasha: {
    marketNotes:
      "Wabasha County, MN is a southeastern Mississippi River bluff-country county centered on Wabasha with rural residential and cross-border Wisconsin corridor demand along the Great River Road gateway.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Wabasha County pricing reflects Wabasha-area rural demand, Mississippi River bluff corridor travel distances, cross-border Wisconsin logistics, and competition among regional agents serving Wabasha County communities.",
    },
    tips: [
      "Verify coverage for Wabasha and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  dodge: {
    marketNotes:
      "Dodge County, MN is a southeastern Minnesota county centered on Mantorville with rural residential and Zumbro River corridor agricultural demand — not to be confused with Dodge County in Wisconsin or other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Dodge County pricing reflects Mantorville-area rural demand, Zumbro River corridor travel distances, agricultural property logistics, and competition among regional agents serving Dodge County, MN communities.",
    },
    tips: [
      "Verify coverage for Mantorville and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  martin: {
    marketNotes:
      "Martin County, MN is a southern Minnesota county centered on Fairmont with rural residential, lake-country, and East Chain of Lakes corridor agricultural demand — not to be confused with Martin County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Martin County pricing reflects Fairmont-area rural demand, southern Minnesota lakes corridor travel distances, agricultural property logistics, and competition among regional agents serving Martin County, MN communities.",
    },
    tips: [
      "Verify coverage for Fairmont and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  waseca: {
    marketNotes:
      "Waseca County, MN is a south-central Minnesota county centered on Waseca with rural residential and Straight River corridor agricultural demand across regional gateway communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Waseca County pricing reflects Waseca-area rural demand, Straight River corridor travel distances, agricultural property logistics, and competition among regional agents serving Waseca County communities.",
    },
    tips: [
      "Verify coverage for Waseca and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  houston: {
    marketNotes:
      "Houston County, MN is a southeastern Minnesota county centered on Caledonia with rural residential and Root River bluff-country corridor demand along the Mississippi River gateway — not to be confused with Houston, Texas.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Houston County pricing reflects Caledonia-area rural demand, Root River bluff corridor travel distances, cross-border Wisconsin logistics, and competition among regional agents serving Houston County, MN communities.",
    },
    tips: [
      "Verify coverage for Caledonia and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  kanabec: {
    marketNotes:
      "Kanabec County, MN is an east-central Minnesota county centered on Mora with rural residential and Snake River northwoods corridor demand across regional gateway communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Kanabec County pricing reflects Mora-area rural demand, Snake River corridor travel distances, limited crew availability, and competition among regional agents serving Kanabec County communities.",
    },
    tips: [
      "Verify coverage for Mora and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  aitkin: {
    marketNotes:
      "Aitkin County, MN is a north-central lakes-country county centered on Aitkin with strong Mississippi River resort, vacation-rental, and seasonal-property demand across northwoods gateway corridor communities.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Aitkin County pricing reflects Aitkin lakes secondary-metro demand, resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Aitkin County communities.",
    },
    tips: [
      "Verify coverage for Aitkin and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  sibley: {
    marketNotes:
      "Sibley County, MN is a south-central Minnesota county centered on Gaylord with rural residential and Minnesota River valley corridor agricultural demand — not to be confused with Sibley County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Sibley County pricing reflects Gaylord-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Sibley County, MN communities.",
    },
    tips: [
      "Verify coverage for Gaylord and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  redwood: {
    marketNotes:
      "Redwood County, MN is a southwestern Minnesota county centered on Redwood Falls with rural residential and Minnesota River valley corridor agricultural demand across prairie gateway communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Redwood County pricing reflects Redwood Falls-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Redwood County communities.",
    },
    tips: [
      "Verify coverage for Redwood Falls and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  roseau: {
    marketNotes:
      "Roseau County, MN is a far-northwestern Minnesota county centered on Roseau with rural residential, snowmobile-country, and Roseau River valley corridor agricultural demand along the Manitoba border gateway.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Roseau County pricing reflects Roseau-area rural demand, remote northwest corridor travel distances, harsh winters, and competition among regional agents serving Roseau County communities.",
    },
    tips: [
      "Verify coverage for Roseau and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  wadena: {
    marketNotes:
      "Wadena County, MN is a central Minnesota county centered on Wadena with rural residential and Crow Wing lakes gateway corridor demand across northwoods fringe communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Wadena County pricing reflects Wadena-area rural demand, central lakes gateway corridor travel distances, limited crew availability, and competition among regional agents serving Wadena County communities.",
    },
    tips: [
      "Verify coverage for Wadena and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  renville: {
    marketNotes:
      "Renville County, MN is a southwestern Minnesota county centered on Olivia with rural residential and Hawk Creek Minnesota River fringe corridor agricultural demand — not to be confused with Renville County in North Dakota.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Renville County pricing reflects Olivia-area rural demand, Hawk Creek corridor travel distances, agricultural property logistics, and competition among regional agents serving Renville County, MN communities.",
    },
    tips: [
      "Verify coverage for Olivia and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  faribault: {
    marketNotes:
      "Faribault County, MN is a southern Minnesota county centered on Blue Earth with rural residential and East Chain of Lakes corridor agricultural demand — not to be confused with Rice County’s Faribault city or Faribault County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Faribault County pricing reflects Blue Earth-area rural demand, southern Minnesota lakes corridor travel distances, agricultural property logistics, and competition among regional agents serving Faribault County, MN communities.",
    },
    tips: [
      "Verify coverage for Blue Earth and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  pennington: {
    marketNotes:
      "Pennington County, MN is a northwest Minnesota county centered on Thief River Falls with rural residential, agribusiness, and Red Lake River valley corridor demand along the North Dakota border gateway.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Pennington County pricing reflects Thief River Falls-area rural demand, northwest corridor travel distances, cross-border North Dakota logistics, and competition among regional agents serving Pennington County communities.",
    },
    tips: [
      "Verify coverage for Thief River Falls and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  chippewa: {
    marketNotes:
      "Chippewa County, MN is a southwestern Minnesota county centered on Montevideo with rural residential and Minnesota River valley corridor agricultural demand — not to be confused with Chippewa County in Michigan or Wisconsin.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Chippewa County pricing reflects Montevideo-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Chippewa County, MN communities.",
    },
    tips: [
      "Verify coverage for Montevideo and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  koochiching: {
    marketNotes:
      "Koochiching County, MN is a far-northern Minnesota county centered on International Falls with residential, border-gateway, and Rainy River corridor demand along the Ontario and Lake of the Woods gateway.",
    costs: {
      studioRange: "$800–$1,600",
      familyRange: "$2,900–$6,500+",
      avgHourly: "$115–$175/hr for a 2-person crew",
      note: "Koochiching County pricing reflects International Falls regional-hub demand, remote northwoods travel distances, harsh winters, border-corridor logistics, and competition among regional agents serving Koochiching County communities.",
    },
    tips: [
      "Verify coverage for International Falls and surrounding areas before booking.",
      "Regional traffic impacts scheduling — confirm crew arrival windows.",
      "Confirm insurance for high-value homes before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  watonwan: {
    marketNotes:
      "Watonwan County, MN is a south-central Minnesota county centered on St. James with rural residential and Watonwan River valley corridor agricultural demand across prairie gateway communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Watonwan County pricing reflects St. James-area rural demand, Watonwan River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Watonwan County communities.",
    },
    tips: [
      "Verify coverage for St. James and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  cottonwood: {
    marketNotes:
      "Cottonwood County, MN is a southwestern Minnesota county centered on Windom with rural residential and Des Moines River valley corridor agricultural demand across prairie gateway communities — not to be confused with Cottonwood County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Cottonwood County pricing reflects Windom-area rural demand, Des Moines River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Cottonwood County, MN communities.",
    },
    tips: [
      "Verify coverage for Windom and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  pope: {
    marketNotes:
      "Pope County, MN is a west-central lakes-country county centered on Glenwood with strong Minnewaska Lake resort, vacation-rental, and seasonal-property demand across Alexandria-adjacent corridor communities — not to be confused with Pope County in other states.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Pope County pricing reflects Glenwood lakes secondary-metro demand, Minnewaska resort-season corridor traffic, vacation-rental turnover logistics, and competition among regional agents serving Pope County communities.",
    },
    tips: [
      "Verify coverage for Glenwood and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  lake: {
    marketNotes:
      "Lake County, MN is a northeastern Minnesota county centered on Two Harbors with strong North Shore resort, vacation-rental, and seasonal-property demand along the Lake Superior gateway — not to be confused with Lake County in California, Florida, Illinois, or other states.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Lake County pricing reflects Two Harbors lakes secondary-metro demand, North Shore resort-season corridor traffic, vacation-rental turnover logistics, harsh winters, and competition among regional agents serving Lake County, MN communities.",
    },
    tips: [
      "Verify coverage for Two Harbors and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  jackson: {
    marketNotes:
      "Jackson County, MN is a southwestern Minnesota county centered on Jackson with rural residential and Des Moines River valley corridor agricultural demand across prairie gateway communities — not to be confused with Jackson County in Mississippi or other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Jackson County pricing reflects Jackson-area rural demand, Des Moines River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Jackson County, MN communities.",
    },
    tips: [
      "Verify coverage for Jackson and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  swift: {
    marketNotes:
      "Swift County, MN is a west-central Minnesota county centered on Benson with rural residential and Chippewa River valley corridor agricultural demand across prairie gateway communities — not to be confused with Swift County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Swift County pricing reflects Benson-area rural demand, Chippewa River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Swift County, MN communities.",
    },
    tips: [
      "Verify coverage for Benson and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  stevens: {
    marketNotes:
      "Stevens County, MN is a west-central Minnesota county centered on Morris with rural residential, University of Minnesota Morris corridor, and Stevens River valley agricultural demand — not to be confused with Stevens County in Kansas or Washington.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Stevens County pricing reflects Morris-area rural demand, Stevens River valley corridor travel distances, university and agricultural property logistics, and competition among regional agents serving Stevens County, MN communities.",
    },
    tips: [
      "Verify coverage for Morris and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  rock: {
    marketNotes:
      "Rock County, MN is Minnesota’s southwesternmost county centered on Luverne with rural residential and Rock River valley corridor agricultural demand along the Iowa border gateway — not to be confused with Rock County in Nebraska or Wisconsin.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Rock County pricing reflects Luverne-area rural demand, Rock River valley corridor travel distances, cross-border Iowa logistics, agricultural property logistics, and competition among regional agents serving Rock County, MN communities.",
    },
    tips: [
      "Verify coverage for Luverne and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'yellow-medicine': {
    marketNotes:
      "Yellow Medicine County, MN is a southwestern Minnesota county centered on Granite Falls with rural residential and Minnesota River valley corridor agricultural demand across prairie gateway communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Yellow Medicine County pricing reflects Granite Falls-area rural demand, Minnesota River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Yellow Medicine County communities.",
    },
    tips: [
      "Verify coverage for Granite Falls and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  pipestone: {
    marketNotes:
      "Pipestone County, MN is a southwestern Minnesota county centered on Pipestone with rural residential, heritage-tourism, and quarry-valley corridor agricultural demand — not to be confused with Pipestone in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Pipestone County pricing reflects Pipestone-area rural demand, quarry-valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Pipestone County, MN communities.",
    },
    tips: [
      "Verify coverage for Pipestone and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  marshall: {
    marketNotes:
      "Marshall County, MN is a northwest Red River Valley county centered on Warren with rural residential and Red River border-corridor agricultural demand — not to be confused with Lyon County’s Marshall city or Marshall County in North Dakota or other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Marshall County pricing reflects Warren-area rural demand, Red River Valley corridor travel distances, cross-border North Dakota logistics, agricultural property logistics, and competition among regional agents serving Marshall County, MN communities.",
    },
    tips: [
      "Verify coverage for Warren and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  clearwater: {
    marketNotes:
      "Clearwater County, MN is a northwest Minnesota county centered on Bagley with rural residential and Clearwater River valley corridor agricultural demand across northwoods fringe gateway communities — not to be confused with Clearwater County in Idaho.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Clearwater County pricing reflects Bagley-area rural demand, Clearwater River valley corridor travel distances, limited crew availability, and competition among regional agents serving Clearwater County, MN communities.",
    },
    tips: [
      "Verify coverage for Bagley and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  murray: {
    marketNotes:
      "Murray County, MN is a southwestern Minnesota county centered on Slayton with rural residential and Des Moines River valley corridor agricultural demand across prairie gateway communities — not to be confused with Murray County in Georgia, Oklahoma, or other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Murray County pricing reflects Slayton-area rural demand, Des Moines River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Murray County, MN communities.",
    },
    tips: [
      "Verify coverage for Slayton and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'lac-qui-parle': {
    marketNotes:
      "Lac qui Parle County, MN is a southwestern Minnesota county centered on Madison with rural residential and Lac qui Parle River valley corridor agricultural demand across prairie gateway communities — not to be confused with Madison in Dane County, Wisconsin.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Lac qui Parle County pricing reflects Madison-area rural demand, Lac qui Parle River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Lac qui Parle County communities.",
    },
    tips: [
      "Verify coverage for Madison and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  norman: {
    marketNotes:
      "Norman County, MN is a northwest Red River Valley county centered on Ada with rural residential and Wild Rice River valley corridor agricultural demand — not to be confused with Norman, Oklahoma or Norman County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Norman County pricing reflects Ada-area rural demand, Wild Rice River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Norman County, MN communities.",
    },
    tips: [
      "Verify coverage for Ada and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  wilkin: {
    marketNotes:
      "Wilkin County, MN is a Red River Valley county centered on Breckenridge with rural residential and cross-border Wahpeton–Breckenridge metro corridor agricultural demand along the North Dakota border gateway.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Wilkin County pricing reflects Breckenridge-area rural demand, Red River border-corridor traffic, cross-border North Dakota logistics, agricultural property logistics, and competition among regional agents serving Wilkin County communities.",
    },
    tips: [
      "Verify coverage for Breckenridge and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  grant: {
    marketNotes:
      "Grant County, MN is a west-central Minnesota county centered on Elbow Lake with rural residential and Pelican Lake corridor agricultural demand across prairie gateway communities — not to be confused with Grant County in North Dakota, Wisconsin, or other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Grant County pricing reflects Elbow Lake-area rural demand, Pelican Lake corridor travel distances, agricultural property logistics, and competition among regional agents serving Grant County, MN communities.",
    },
    tips: [
      "Verify coverage for Elbow Lake and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  lincoln: {
    marketNotes:
      "Lincoln County, MN is a southwestern Minnesota county centered on Ivanhoe with rural residential and Des Moines River valley corridor agricultural demand across prairie gateway communities — not to be confused with Lincoln County in Nebraska or other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Lincoln County pricing reflects Ivanhoe-area rural demand, Des Moines River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Lincoln County, MN communities.",
    },
    tips: [
      "Verify coverage for Ivanhoe and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  cook: {
    marketNotes:
      "Cook County, MN is Minnesota’s northeasternmost county centered on Grand Marais with strong Gunflint Trail resort, vacation-rental, and seasonal-property demand along the Lake Superior and Boundary Waters gateway — not to be confused with Cook County in Illinois.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Cook County pricing reflects Grand Marais lakes secondary-metro demand, Gunflint Trail resort-season corridor traffic, vacation-rental turnover logistics, remote northwoods travel distances, harsh winters, and competition among regional agents serving Cook County, MN communities.",
    },
    tips: [
      "Verify coverage for Grand Marais and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  mahnomen: {
    marketNotes:
      "Mahnomen County, MN is a northwest Minnesota county centered on Mahnomen with rural residential, tribal-nation gateway, and Wild Rice River valley corridor agricultural demand across northwoods fringe communities.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Mahnomen County pricing reflects Mahnomen-area rural demand, Wild Rice River valley corridor travel distances, limited crew availability, and competition among regional agents serving Mahnomen County communities.",
    },
    tips: [
      "Verify coverage for Mahnomen and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'big-stone': {
    marketNotes:
      "Big Stone County, MN is a west-central Minnesota county centered on Ortonville with rural residential and Big Stone Lake corridor agricultural demand along the South Dakota border gateway — not to be confused with Big Stone in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Big Stone County pricing reflects Ortonville-area rural demand, Big Stone Lake corridor travel distances, cross-border South Dakota logistics, agricultural property logistics, and competition among regional agents serving Big Stone County communities.",
    },
    tips: [
      "Verify coverage for Ortonville and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  kittson: {
    marketNotes:
      "Kittson County, MN is Minnesota’s northwesternmost county centered on Hallock with rural residential and Red River valley corridor agricultural demand along the North Dakota and Manitoba border gateway.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Kittson County pricing reflects Hallock-area rural demand, remote northwest corridor travel distances, cross-border North Dakota logistics, harsh winters, and competition among regional agents serving Kittson County communities.",
    },
    tips: [
      "Verify coverage for Hallock and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'red-lake': {
    marketNotes:
      "Red Lake County, MN is a northwest Minnesota county centered on Red Lake Falls with rural residential and Red Lake River valley corridor agricultural demand — not to be confused with the Red Lake Nation reservation geography in Beltrami County.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Red Lake County pricing reflects Red Lake Falls-area rural demand, Red Lake River valley corridor travel distances, agricultural property logistics, and competition among regional agents serving Red Lake County, MN communities.",
    },
    tips: [
      "Verify coverage for Red Lake Falls and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  'lake-of-the-woods': {
    marketNotes:
      "Lake of the Woods County, MN is a far-northern Minnesota county centered on Baudette with strong Rainy Lake resort, vacation-rental, and seasonal-property demand along the Ontario and Manitoba border gateway.",
    costs: {
      studioRange: "$850–$1,700",
      familyRange: "$3,000–$7,000+",
      avgHourly: "$120–$185/hr for a 2-person crew",
      note: "Lake of the Woods County pricing reflects Baudette lakes secondary-metro demand, Rainy Lake resort-season corridor traffic, vacation-rental turnover logistics, remote northwoods travel distances, harsh winters, and competition among regional agents serving Lake of the Woods County communities.",
    },
    tips: [
      "Verify coverage for Baudette and surrounding areas before booking.",
      "Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.",
      "Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
  traverse: {
    marketNotes:
      "Traverse County, MN is a west-central Minnesota county centered on Wheaton with rural residential and Bois de Sioux River valley corridor agricultural demand along the South Dakota border gateway — not to be confused with Traverse County in other states.",
    costs: {
      studioRange: "$750–$1,500",
      familyRange: "$2,600–$5,800+",
      avgHourly: "$100–$155/hr for a 2-person crew",
      note: "Traverse County pricing reflects Wheaton-area rural demand, Bois de Sioux River valley corridor travel distances, cross-border South Dakota logistics, agricultural property logistics, and competition among regional agents serving Traverse County, MN communities.",
    },
    tips: [
      "Verify coverage for Wheaton and surrounding areas before booking.",
      "Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.",
      "Confirm coverage for ranch properties, long driveways, and outbuildings before booking.",
      "Book early for peak seasons (May–September) and month-end lease changeover.",
      "Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.",
    ],
  },
};

export function getMinnesotaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return minnesotaCountyResearch[countySlug];
}
