import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Michigan county research — grows incrementally per batch */
export const michiganCountyResearch: Record<string, CuratedCountyResearch> = {
  wayne: {
    marketNotes:
      'Wayne County is Michigan’s most populous county and the core of the Detroit metropolitan area, with strong urban, corporate, and residential demand across Detroit, Dearborn, Livonia, and Westland.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Detroit metro urban demand, I-75/I-94 corridor traffic, corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Detroit, Dearborn, Livonia, Westland, and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban/suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  oakland: {
    marketNotes:
      'Oakland County is one of Michigan’s wealthiest and most populous suburban counties with strong corporate, healthcare, and residential demand across Troy, Rochester Hills, Pontiac, and Royal Oak.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Oakland County pricing reflects affluent suburban Detroit demand, I-75/I-696 corridor traffic, corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Troy, Rochester Hills, Pontiac, Royal Oak, and surrounding areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  macomb: {
    marketNotes:
      'Macomb County is a major suburban county northeast of Detroit with strong residential and industrial demand across Warren, Sterling Heights, Clinton Township, and Roseville.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Macomb County pricing reflects northeast Detroit suburban growth, I-94/I-696 corridor traffic, and competition among full-service local and regional agents serving Warren and Sterling Heights.',
    },
    tips: [
      'Verify coverage for Warren, Sterling Heights, Clinton Township, and Roseville areas before booking.',
      'Heavy suburban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kent: {
    marketNotes:
      'Kent County is the core of the Grand Rapids metropolitan area with strong corporate, healthcare, and residential demand across Grand Rapids, Wyoming, and Kentwood.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Kent County pricing reflects West Michigan corporate and healthcare demand, I-96/US-131 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Grand Rapids and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ottawa: {
    marketNotes:
      'Ottawa County is a growing suburban county west of Grand Rapids with strong residential demand across Holland, Grand Haven, and Zeeland.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Ottawa County pricing reflects West Michigan lakefront suburban growth, I-196 corridor traffic, and competition among full-service local and regional agents serving Holland and Grand Haven.',
    },
    tips: [
      'Verify coverage for Holland, Grand Haven, and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  genesee: {
    marketNotes:
      'Genesee County is the core of the Flint metropolitan area with strong industrial and residential demand across Flint, Grand Blanc, and Fenton.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Genesee County pricing reflects Flint metro industrial and residential demand, I-75/I-69 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Flint and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washtenaw: {
    marketNotes:
      'Washtenaw County is anchored by the University of Michigan with strong educational, corporate, and residential demand across Ann Arbor and Ypsilanti.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Washtenaw County pricing reflects university-driven demand, M-14/I-94 corridor traffic, student move-in/out seasons, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Ann Arbor and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ingham: {
    marketNotes:
      'Ingham County is the core of the Lansing metropolitan area with strong governmental and educational demand across Lansing and East Lansing.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Ingham County pricing reflects state government and university demand, I-96/US-127 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Lansing and East Lansing areas before booking.',
      'Governmental and university traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kalamazoo: {
    marketNotes:
      'Kalamazoo County is a key Southwest Michigan county anchored by Western Michigan University with strong educational, healthcare, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Kalamazoo County pricing reflects university-driven demand, I-94/US-131 corridor traffic, student move-in/out seasons, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Kalamazoo and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  livingston: {
    marketNotes:
      'Livingston County is a rapidly growing suburban county northwest of Detroit with strong residential demand across Howell, Brighton, and Hartland.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Livingston County pricing reflects northwest Detroit suburban growth, I-96/M-59 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Howell and surrounding areas before booking.',
      'Detroit-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  saginaw: {
    marketNotes:
      'Saginaw County is a major county in Central Michigan with strong industrial and residential demand across Saginaw, Bay City, and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Saginaw County pricing reflects Central Michigan industrial and residential demand, I-75/I-675 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Saginaw and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  muskegon: {
    marketNotes:
      'Muskegon County is a key West Michigan county with strong industrial and residential demand across Muskegon, Norton Shores, and Muskegon Heights.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Muskegon County pricing reflects West Michigan lakefront industrial and residential demand, US-31 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Muskegon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-clair': {
    marketNotes:
      'St. Clair County is a key county in Southeast Michigan along the St. Clair River with strong industrial and residential demand across Port Huron, Marysville, and St. Clair.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'St. Clair County pricing reflects Blue Water corridor industrial and residential demand, I-94/I-69 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Port Huron and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a key county in South Central Michigan with strong industrial and residential demand across Jackson and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Jackson County pricing reflects South Central Michigan industrial and residential demand, I-94/US-127 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Jackson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a suburban county south of Detroit with strong residential demand across Monroe, Temperance, and Lambertville along the Lake Erie corridor.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Monroe County pricing reflects south Detroit suburban growth, I-75/US-23 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Monroe and surrounding areas before booking.',
      'Detroit-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  berrien: {
    marketNotes:
      'Berrien County is a key Southwest Michigan county with strong tourism and residential demand across St. Joseph, Benton Harbor, and Niles.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Berrien County pricing reflects lakeshore tourism and residential demand, I-94/US-31 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for St. Joseph, Benton Harbor, and Niles areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  calhoun: {
    marketNotes:
      'Calhoun County is a key county in South Central Michigan with strong industrial and residential demand across Battle Creek and Marshall.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$160/hr for a 2-person crew',
      note: 'Calhoun County pricing reflects Battle Creek industrial and residential demand, I-94/I-69 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Battle Creek and Marshall areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMichiganCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return michiganCountyResearch[countySlug];
}