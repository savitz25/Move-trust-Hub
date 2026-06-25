import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Utah county research — 29/29 complete */
export const utahCountyResearch: Record<string, CuratedCountyResearch> = {
  'salt-lake': {
    marketNotes:
      'Salt Lake County anchors Utah’s Wasatch Front — by far the state’s highest-value moving market. Tech and corporate growth spilling from Silicon Slopes, large family-oriented suburban relocations, rapid population growth, and I-15/I-80 corridor logistics distinguish Salt Lake from rural Utah counties.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Salt Lake County pricing reflects Salt Lake City metro demand, I-15 and I-80 corridor traffic, tech-sector corporate relocations, and competition among full-service agents serving urban and suburban communities.',
    },
    tips: [
      'Verify coverage for Salt Lake City, Sandy, West Valley City, and surrounding cities before booking.',
      'Corporate and tech-sector relocations may require building access coordination — confirm commercial move experience.',
      'Large family moves often need multi-crew scheduling — confirm capacity for 4+ bedroom suburban homes.',
      'Heavy urban traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  utah: {
    marketNotes:
      'Utah County anchors the Provo-Orem metro and Silicon Slopes tech corridor — Utah’s second-highest-value market. BYU and UVU student turnover, Lehi tech-campus growth, family suburban expansion, and Utah Valley I-15 traffic distinguish Utah County from Salt Lake’s urban core.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Utah County pricing reflects Provo-Orem metro demand, Silicon Slopes tech-corridor growth, BYU/UVU semester changeover, and competition among full-service agents serving Utah Valley communities.',
    },
    tips: [
      'Verify coverage for Provo, Orem, Lehi, and surrounding cities before booking.',
      'Tech-sector and startup relocations may require office equipment handling — confirm commercial move experience.',
      'University semester changeover (August and December) creates peak demand — book early.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  davis: {
    marketNotes:
      'Davis County is the northern Wasatch Front suburban corridor — Hill AFB military PCS moves, Layton and Clearfield suburban growth, and Salt Lake metro spillover distinguish Davis from Ogden’s Weber County market.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Davis County pricing reflects Layton and Bountiful suburban demand, Salt Lake metro spillover, and competition among full-service agents serving northern Wasatch Front communities.',
    },
    tips: [
      'Verify coverage for Layton, Bountiful, and surrounding cities before booking.',
      'Salt Lake metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  weber: {
    marketNotes:
      'Weber County is a northern Utah county with strong residential demand across the Ogden metro.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Weber County pricing reflects Ogden metro demand, I-15 corridor traffic, and competition among full-service agents serving northern Wasatch Front communities.',
    },
    tips: [
      'Verify coverage for Ogden and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County anchors southern Utah’s St. George metro — one of the nation’s fastest-growing retirement, tourism, and snowbird markets, not to be confused with Washington state. Color country recreation communities, seasonal second-home moves, and Las Vegas corridor long-distance hauls distinguish Washington from the Wasatch Front.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Washington County pricing reflects St. George metro growth, I-15 corridor traffic, retirement and snowbird seasonal demand, and competition among full-service agents serving color country communities.',
    },
    tips: [
      'Verify coverage for St. George, Hurricane, and surrounding areas before booking.',
      'Retirement and snowbird downsizing moves often need storage and seasonal scheduling — confirm flexible timing.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Long-distance hauls to Las Vegas (Clark County, NV) are common — confirm interstate FMCSA authority.',
      'Confirm parking permits and access for seasonal properties, resort condos, and short-term rentals before move day.',
      'Book early for peak seasons (October–April snowbird influx, May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cache: {
    marketNotes:
      'Cache County is a northern Utah county centered on Logan with strong university, agricultural, and residential demand across Cache Valley.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Cache County pricing reflects Logan metro and USU-area turnover, US-89 corridor traffic, and competition among full-service agents serving northern Utah valley communities.',
    },
    tips: [
      'Verify coverage for Logan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tooele: {
    marketNotes:
      'Tooele County is a large western Utah county with residential demand across Tooele, Grantsville, and Great Salt Lake west communities with Salt Lake metro spillover.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Tooele County pricing reflects Salt Lake metro spillover demand, I-80 corridor traffic, and competition among full-service agents serving western Wasatch Front communities.',
    },
    tips: [
      'Verify coverage for Tooele and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  iron: {
    marketNotes:
      'Iron County is a southern Utah county with residential and educational demand across Cedar City, SUU-area turnover, and I-15 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Iron County pricing reflects Cedar City-area demand, I-15 corridor traffic, and competition among regional agents serving southern Utah communities.',
    },
    tips: [
      'Verify coverage for Cedar City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'box-elder': {
    marketNotes:
      'Box Elder County is a northern Utah county with residential and agricultural demand across Brigham City and Bear River valley communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Box Elder County pricing reflects Brigham City-area demand, I-15 and US-89 corridor traffic, and competition among regional agents serving northern Wasatch Front communities.',
    },
    tips: [
      'Verify coverage for Brigham City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  summit: {
    marketNotes:
      'Summit County anchors Utah’s Wasatch Back resort market with luxury homes, vacation properties, and strong demand across Park City and Coalville.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,500–$10,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Summit County pricing reflects Park City resort demand, ski-season turnover, vacation-rental logistics, and competition among full-service agents serving Wasatch Back communities.',
    },
    tips: [
      'Verify coverage for Park City and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wasatch: {
    marketNotes:
      'Wasatch County is a mountain valley county with strong residential demand across Heber City, Midway, and Provo Canyon secondary-home communities.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Wasatch County pricing reflects Heber Valley and Provo Canyon demand, mountain-home access logistics, and competition among full-service agents serving Wasatch Back foothill communities.',
    },
    tips: [
      'Verify coverage for Heber City and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  uintah: {
    marketNotes:
      'Uintah County is an eastern Utah county with oil-and-gas, ranching, and residential demand centered on Vernal and Uinta Basin communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Uintah County pricing reflects Vernal-area demand, US-40 corridor traffic, and competition among regional agents serving eastern Utah basin communities.',
    },
    tips: [
      'Verify coverage for Vernal and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sanpete: {
    marketNotes:
      'Sanpete County is a central Utah valley county with agricultural and residential demand across Manti, Ephraim, and surrounding communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Sanpete County pricing reflects Manti-area demand, US-89 corridor traffic, and competition among regional agents serving central Utah valley communities.',
    },
    tips: [
      'Verify coverage for Manti and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sevier: {
    marketNotes:
      'Sevier County is a central Utah county with residential demand across Richfield and Sevier Valley I-70 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Sevier County pricing reflects Richfield-area demand, I-70 corridor traffic, and competition among regional agents serving central Utah communities.',
    },
    tips: [
      'Verify coverage for Richfield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  duchesne: {
    marketNotes:
      'Duchesne County is an eastern Utah county with residential and outdoor-recreation demand across Duchesne and Uinta Mountains communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Duchesne County pricing reflects Duchesne-area demand, US-40 corridor traffic, and competition among regional agents serving Uinta Mountains communities.',
    },
    tips: [
      'Verify coverage for Duchesne and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carbon: {
    marketNotes:
      'Carbon County is an eastern Utah county with residential demand across Price and US-6/US-191 coal-country corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Carbon County pricing reflects Price-area demand, US-6 corridor traffic, and competition among regional agents serving eastern Utah communities.',
    },
    tips: [
      'Verify coverage for Price and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'san-juan': {
    marketNotes:
      'San Juan County, UT is Utah’s largest county by area with vast rural demand across Monticello and southeastern four corners communities — not to be confused with San Juan County, New Mexico.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'San Juan County pricing reflects Monticello-area demand, long rural travel distances, and competition among regional agents serving southeastern Utah four corners communities.',
    },
    tips: [
      'Verify coverage for Monticello and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm parking permits and access for seasonal properties, resort condos, and short-term rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  millard: {
    marketNotes:
      'Millard County is a central Utah county with residential and agricultural demand across Fillmore and I-15 rural corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Millard County pricing reflects Fillmore-area demand, I-15 corridor traffic, and competition among regional agents serving central Utah communities.',
    },
    tips: [
      'Verify coverage for Fillmore and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  juab: {
    marketNotes:
      'Juab County is a central Utah county with residential demand across Nephi and I-15 corridor communities between Salt Lake and central Utah.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Juab County pricing reflects Nephi-area demand, I-15 corridor traffic, and competition among regional agents serving central Utah valley communities.',
    },
    tips: [
      'Verify coverage for Nephi and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County is a small northern Utah mountain valley county with residential demand across Morgan and Ogden Valley gateway communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Morgan County pricing reflects Morgan-area demand, canyon-road access logistics, and competition among regional agents serving northern Utah valley communities.',
    },
    tips: [
      'Verify coverage for Morgan and surrounding areas before booking.',
      'Mountain-access roads and secondary-home logistics require route planning — confirm crew vehicle size and driveway access.',
      'Confirm coverage for mountain cabins, ski-season properties, and steep-driveway homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  emery: {
    marketNotes:
      'Emery County is a central-eastern Utah county with residential demand across Castle Dale, Huntington, and rural canyon communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Emery County pricing reflects Castle Dale-area demand, US-6 corridor traffic, and competition among regional agents serving central Utah communities.',
    },
    tips: [
      'Verify coverage for Castle Dale and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grand: {
    marketNotes:
      'Grand County anchors Moab and Utah’s canyon country tourism market with strong vacation-home, outdoor-recreation, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Grand County pricing reflects Moab tourism demand, Arches and Canyonlands corridor traffic, vacation-rental turnover, and competition among full-service agents serving southeastern Utah communities.',
    },
    tips: [
      'Verify coverage for Moab and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm parking permits and access for seasonal properties, resort condos, and short-term rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kane: {
    marketNotes:
      'Kane County is a southern Utah county with tourism and residential demand across Kanab, Grand Staircase gateway communities, and Zion corridor spillover.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Kane County pricing reflects Kanab tourism demand, US-89 corridor traffic, and competition among regional agents serving southern Utah Grand Staircase communities.',
    },
    tips: [
      'Verify coverage for Kanab and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm parking permits and access for seasonal properties, resort condos, and short-term rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  beaver: {
    marketNotes:
      'Beaver County is a rural southwestern Utah county with residential demand across Beaver and I-15 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Beaver County pricing reflects Beaver-area demand, I-15 corridor traffic, and competition among regional agents serving southwestern Utah valley communities.',
    },
    tips: [
      'Verify coverage for Beaver and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garfield: {
    marketNotes:
      'Garfield County is a southern Utah county with tourism and residential demand across Panguitch and Bryce Canyon area communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Garfield County pricing reflects Panguitch-area demand, Bryce Canyon tourism-season traffic, and competition among regional agents serving southern Utah communities.',
    },
    tips: [
      'Verify coverage for Panguitch and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm parking permits and access for seasonal properties, resort condos, and short-term rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rich: {
    marketNotes:
      'Rich County is Utah’s least populous county with residential demand across Randolph and northern Bear Lake communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Rich County pricing reflects Randolph-area demand, remote rural travel distances, and competition among regional agents serving northern Utah Bear Lake communities.',
    },
    tips: [
      'Verify coverage for Randolph and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County is a remote central Utah county with residential and tourism demand across Loa and Capitol Reef area communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Loa-area demand, scenic byway corridor traffic, and competition among regional agents serving Capitol Reef area communities.',
    },
    tips: [
      'Verify coverage for Loa and surrounding areas before booking.',
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm parking permits and access for seasonal properties, resort condos, and short-term rentals before move day.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  piute: {
    marketNotes:
      'Piute County is a small central Utah county with residential demand across Junction and rural valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Piute County pricing reflects Junction-area demand, remote rural travel distances, and competition among regional agents serving central Utah valley communities.',
    },
    tips: [
      'Verify coverage for Junction and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  daggett: {
    marketNotes:
      'Daggett County is Utah’s northeastern corner county with residential and recreation demand across Manila and Flaming Gorge reservoir communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Daggett County pricing reflects Manila-area demand, Flaming Gorge recreation-season traffic, and competition among regional agents serving northeastern Utah communities.',
    },
    tips: [
      'Verify coverage for Manila and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getUtahCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return utahCountyResearch[countySlug];
}
