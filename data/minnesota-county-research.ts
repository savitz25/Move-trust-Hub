import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Minnesota county research — 37 counties */
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
};

export function getMinnesotaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return minnesotaCountyResearch[countySlug];
}
