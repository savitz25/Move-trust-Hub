import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Nevada county research — 17/17 complete */
export const nevadaCountyResearch: Record<string, CuratedCountyResearch> = {
  clark: {
    marketNotes:
      'Clark County anchors Nevada’s Las Vegas metro — by far the state’s highest-value moving market. Tourism and hospitality relocations, corporate growth, high-density condos and high-rises, Nellis AFB military PCS moves, and elevated labor costs distinguish Clark from Reno and rural Nevada — not to be confused with Clark County, Washington.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Clark County, NV pricing reflects Las Vegas metro demand, I-15 and US-95 corridor traffic, Strip and tourist-season congestion, and competition among full-service agents serving urban and suburban communities.',
    },
    tips: [
      'Plan extreme heat into outdoor carries and crew pacing — summer Las Vegas Valley logistics fail flat-rate optimism.',
      'Survey Strip-adjacent elevators and HOA/gated multi-family separately from Henderson and North Las Vegas SFH.',
      'Price I-15 / I-215 / US-95 / US-93 portal time honestly for valley cross-zone pairs.',
      'Verify NTA household goods CPCN for pure in-state jobs; FMCSA for CA/AZ or other interstate legs.',
      'Prefer early morning starts; tourism and heat windows pack fleets first May–September.',
    ],
  },
  washoe: {
    marketNotes:
      'Washoe County anchors northern Nevada’s Reno–Sparks metro — a tech, manufacturing, logistics, and university market distinct from Las Vegas tourism density. Tesla Gigafactory spillover, suburban Truckee Meadows growth, and I-80 corridor logistics distinguish Washoe from Clark County’s hospitality-driven demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Washoe County pricing reflects Reno metro growth, I-80 and US-395 corridor traffic, and competition among full-service agents serving Reno, Sparks, and Truckee Meadows communities.',
    },
    tips: [
      'Treat Washoe as Reno/Sparks product with CA-border adjacency — not a Las Vegas Valley clone.',
      'Price I-80 / US-395 / I-580 portal time honestly; California destinations flip jobs to FMCSA.',
      'Survey industrial multi-unit and warehouse-adjacent housing separately from foothill SFH.',
      'Verify NTA household goods CPCN for pure in-state jobs; FMCSA for CA or other interstate legs.',
      'Prefer mid-week mornings; winter Sierra weather and summer heat both reshape outdoor carries.',
    ],
  },
  lyon: {
    marketNotes:
      'Lyon County is a western Nevada county with residential and agricultural demand across Yerington and Mason Valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Lyon County pricing reflects Yerington-area demand, US-95A corridor traffic, and competition among regional agents serving western Nevada communities.',
    },
    tips: [
      'Verify coverage for Yerington and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'carson-city': {
    marketNotes:
      'Carson City is Nevada’s independent capital municipality with strong governmental and residential demand across the capital region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Carson City pricing reflects capital-region demand, US-50 and US-395 corridor traffic, and competition among regional agents serving Carson City and nearby valley communities.',
    },
    tips: [
      'Treat Carson City as capital-scale smaller urban grid — not a Reno south suburb clone.',
      'Price US-50 / US-395 / I-580-link portal time honestly for capital ↔ Reno or valley pairs.',
      'Survey multi-unit and older stock separately from valley edges toward Douglas.',
      'Verify NTA household goods CPCN for pure in-state jobs; FMCSA for interstate legs.',
      'Prefer mid-week starts; capital calendars can cluster mid-month demand.',
    ],
  },
  nye: {
    marketNotes:
      'Nye County is a large central and southern Nevada county with residential demand across Tonopah, Pahrump, and remote desert communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Nye County pricing reflects Tonopah and Pahrump-area demand, US-95 corridor traffic, and competition among regional agents serving central Nevada desert communities.',
    },
    tips: [
      'Treat Nye/Pahrump as desert exurban to Las Vegas — long NV-160 approaches, not a Clark County rename.',
      'Price NV-160 / US-95 portal time and empty miles honestly for Pahrump ↔ Las Vegas pairs.',
      'Plan extreme heat and long outdoor walks into estimates; HOA multi-family still appears in growth tracts.',
      'Verify NTA household goods CPCN for pure in-state jobs; FMCSA for interstate legs.',
      'Prefer early morning starts; heat pacing is a real labor factor May–September.',
    ],
  },
  elko: {
    marketNotes:
      'Elko County is a northeastern Nevada county with mining, ranching, and residential demand centered on Elko.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Elko County pricing reflects Elko metro and I-80 corridor demand, mining-community turnover, and competition among regional agents serving northeastern Nevada.',
    },
    tips: [
      'Verify coverage for Elko and surrounding areas before booking.',
      'I-80 corridor and long regional travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and ranch properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  douglas: {
    marketNotes:
      'Douglas County, NV is a western Nevada county with strong residential and retirement demand across Minden, Gardnerville, and Carson Valley — not to be confused with Douglas County in Oregon or other states.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Douglas County, NV pricing reflects Carson Valley and Reno metro spillover demand, US-395 corridor traffic, and competition among regional agents serving Minden and Gardnerville communities.',
    },
    tips: [
      'Treat Douglas as Minden–Gardnerville / Tahoe NV access — not Las Vegas and not Carson City core.',
      'Price US-395 / US-50 / NV-207 Tahoe approach portal time honestly; seasonal freeflow matters.',
      'Survey mountain and valley driveway access carefully; winter contingency is required.',
      'Verify NTA household goods CPCN for pure in-state jobs; FMCSA for CA Tahoe or other interstate legs.',
      'Prefer mid-week shoulder-season starts; summer tourism and winter weather reshape outdoor carries.',
    ],
  },
  churchill: {
    marketNotes:
      'Churchill County is a western Nevada county with agricultural, military, and residential demand centered on Fallon and the Lahontan Valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Churchill County pricing reflects Fallon and Lahontan Valley demand, US-50 corridor traffic, and competition among regional agents serving western Nevada agricultural communities.',
    },
    tips: [
      'Verify coverage for Fallon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and agricultural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  humboldt: {
    marketNotes:
      'Humboldt County, NV is a northern Nevada county with mining, ranching, and residential demand across Winnemucca — not to be confused with Humboldt County in California.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Humboldt County, NV pricing reflects Winnemucca and I-80 corridor demand with extended travel distances affecting regional mover scheduling.',
    },
    tips: [
      'Verify coverage for Winnemucca and surrounding areas before booking.',
      'I-80 corridor and long regional travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and ranch properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about cross-border scheduling if your move involves Harney or Malheur County, OR.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'white-pine': {
    marketNotes:
      'White Pine County is an eastern Nevada county with mining and residential demand centered on Ely and Great Basin communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'White Pine County pricing reflects Ely and US-6/US-50 corridor demand with extended travel distances affecting regional mover availability.',
    },
    tips: [
      'Verify coverage for Ely and surrounding areas before booking.',
      'Mountain-road and long regional travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and remote properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pershing: {
    marketNotes:
      'Pershing County is a northwestern Nevada county with agricultural and residential demand centered on Lovelock and the Humboldt Sink region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Pershing County pricing reflects Lovelock-area demand, I-80 corridor traffic, and competition among regional agents serving northwestern Nevada communities.',
    },
    tips: [
      'Verify coverage for Lovelock and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and agricultural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lander: {
    marketNotes:
      'Lander County is a central Nevada county with mining and residential demand centered on Battle Mountain.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Lander County pricing reflects Battle Mountain and I-80 corridor demand with extended travel distances affecting regional mover scheduling.',
    },
    tips: [
      'Verify coverage for Battle Mountain and surrounding areas before booking.',
      'I-80 corridor and long regional travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and mining-community properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  storey: {
    marketNotes:
      'Storey County is a small western Nevada county with tourism and residential demand across Virginia City and the historic Comstock region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Storey County pricing reflects Virginia City tourism demand, US-50 corridor traffic, and competition among regional agents serving Reno metro fringe and Comstock communities.',
    },
    tips: [
      'Verify coverage for Virginia City and surrounding areas before booking.',
      'Tourist and mountain-road traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value hillside and historic properties.',
      'Book early for peak tourist seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mineral: {
    marketNotes:
      'Mineral County is a western Nevada county with military and residential demand centered on Hawthorne and Walker Lake communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Mineral County pricing reflects Hawthorne-area demand, US-95 corridor traffic, and competition among regional agents serving remote western Nevada communities.',
    },
    tips: [
      'Verify coverage for Hawthorne and surrounding areas before booking.',
      'Long desert-road travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and lakefront properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County, NV is a southeastern Nevada county with ranching and residential demand across Pioche and remote valley communities — not to be confused with Lincoln County in Oregon or other states.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Lincoln County, NV pricing reflects Pioche and US-93 corridor demand with very long travel distances affecting regional mover availability.',
    },
    tips: [
      'Verify coverage for Pioche and surrounding areas before booking.',
      'Remote highway travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and ranch properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about cross-border scheduling if your move involves Clark County, NV or Washington County, UT.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  eureka: {
    marketNotes:
      'Eureka County is a small central Nevada county with mining and residential demand centered on Eureka and the Diamond Range region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Eureka County pricing reflects Eureka-area demand with extended travel distances affecting regional mover scheduling across central Nevada.',
    },
    tips: [
      'Verify coverage for Eureka and surrounding areas before booking.',
      'Remote highway travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and mining-community properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  esmeralda: {
    marketNotes:
      'Esmeralda County is Nevada’s least populous county with remote desert residential demand centered on Goldfield and southern Nevada communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Esmeralda County pricing reflects Goldfield-area high-desert demand with very long travel distances affecting regional mover availability.',
    },
    tips: [
      'Verify coverage for Goldfield and surrounding areas before booking.',
      'Remote desert-road travel impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and remote properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Ask about cross-border scheduling if your move involves Inyo County, CA.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getNevadaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return nevadaCountyResearch[countySlug];
}