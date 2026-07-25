import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** fayette — GA Tier 2 Wave 1 */
export const fayetteCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'fayette',
  hubTitle: 'Fayette County Moving Intelligence Hub',
  eyebrow: 'Fayette · South Atlanta · Peachtree City / Fayetteville · vs Fulton',
  h1: 'Moving in Fayette County: Peachtree City Paths, Fayetteville Seat & South-Metro Planned Living',
  heroOpener: 'Fayette County is south-metro planned-community product — Peachtree City golf-cart path geometry and master-plan rules, Fayetteville seat density, and freeflow that is not Henry’s I-75 logistics mix and not Fulton intown elevators. Expect HOA packets, path-adjacent staging quirks, and longer empty miles from inside the Perimeter. This guide is for people moving in Fayette as distinct south-metro planned living — not a Henry rename and not a Clayton airport script.',
  heroCredibility: 'Peachtree City planned logistics · South-metro HOAs · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'GA-54 · GA-74 · GA-85 · I-85 (west approaches) · US-29 approaches',
  parentCompare: {
    parentLabel: 'Fulton County (and Clayton south patterns)',
    parentHref: '/local-movers/georgia/fulton',
    title: 'Compared with Fulton County (and Clayton south patterns)',
    intro: 'Fayette is Peachtree City / Fayetteville planned south-metro product — not Fulton towers and not Henry I-75 logistics collar alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Fulton crews fight intown peaks; Henry rides I-75 south. Fayette pairs ride GA-54, GA-74, and south-metro arterials — freer mid-day off the I-75 warehouse spine, still peak-heavy on school and Peachtree City internal freeflow.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Henry mixes logistics-edge SFH and Stockbridge multi-family. Fayette mixes Peachtree City planned SFH, path-network geometry, and Fayetteville seat stock — more continuous master-plan product, less warehouse-adjacent residential.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Planned-community COIs dominate; path-city streets and cul-de-sacs can reject full trailers more often than open I-75 corridor lots.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Fayette quotes often sit at premium south-metro planned rates for clean driveway SFH — HOA soft costs and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Fayette is planned south-metro Peachtree City / Fayetteville product — not Henry I-75 growth renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Fayette County different',
    intro: 'Golf-cart path city logistics, planned HOAs, and south-metro freeflow — not a Henry clone.',
    bullets: [
      {
        title: 'Peachtree City path geometry is first-class product',
        detail: 'Street width, path adjacency, and HOA rules rewrite truck size more than map miles suggest.',
      },
      {
        title: 'Planned-community COIs dominate',
        detail: 'Gate lists and weekday windows are standard.',
      },
      {
        title: 'Distinct from Henry logistics mix',
        detail: 'Do not recycle warehouse-corridor timing playbooks for path-city days.',
      },
      {
        title: 'Empty miles from intown staging are billable',
        detail: 'Perimeter-origin crews understate portal time if they quote Fulton rates.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Fayette zones: Peachtree City paths, Fayetteville seat, Tyrone edge & south rural pockets',
  zonesIntro: 'Two to four sharp products under one planned south-metro label.',
  zones: [
    {
      id: 'ptc',
      name: 'Peachtree City path & master-plan core',
      shortName: 'Peachtree City',
      neighborhoods: ["Peachtree City","path villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Path geometry","Truck limits"],
      moverTips: 'Collect HOA rules; photo street width; confirm truck size early.',
      cityKeywords: ["peachtree city"],
    },
    {
      id: 'fayetteville',
      name: 'Fayetteville seat & core',
      shortName: 'Fayetteville',
      neighborhoods: ["Fayetteville","seat neighborhoods"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Arterial timing"],
      moverTips: 'Confirm driveway staging; price school peaks.',
      cityKeywords: ["fayetteville"],
    },
    {
      id: 'tyrone',
      name: 'Tyrone edge corridors',
      shortName: 'Tyrone',
      neighborhoods: ["Tyrone","west edges"],
      housingTypes: 'SFH, planned pockets',
      challenges: ["Empty miles","HOA packets"],
      moverTips: 'Photo last-mile; confirm gate codes.',
      cityKeywords: ["tyrone"],
    },
    {
      id: 'south-rural',
      name: 'South rural-edge pockets',
      shortName: 'South edge',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, longer approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches after rain; allow empty-mile buffer.',
      cityKeywords: ["fayette south"],
    }
  ],
  specialized: [
    {
      id: 'ptc-paths',
      title: 'Peachtree City path-city logistics',
      intro: 'Master-plan geometry rewrites truck type.',
      bullets: ["Photo street width before final quote.","HOA truck limits early."],
    },
    {
      id: 'planned-hoa',
      title: 'South-metro planned HOA packets',
      intro: 'COI and gate lists are default.',
      bullets: ["Weekday windows often beat Saturdays.","Collect rules before survey final."],
    },
    {
      id: 'vs-henry',
      title: 'Distinct from I-75 logistics collars',
      intro: 'Fayette is not warehouse-edge residential.',
      bullets: ["Do not price like McDonough industrial freeflow.","Path-city last-mile is the differentiator."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Fayette families compare Fayette County Schools feeders across Peachtree City and Fayetteville — verify boundaries; planned-community reputation does not replace district maps.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university/military markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Piedmont Fayette Hospital and regional clinics anchor acute care; map peak freeflow on GA-54/GA-74 corridors.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'HOA soft costs, path-city access, and empty miles often matter more than raw miles.',
    drivers: [
      { title: 'Corridor freeflow', detail: 'Peak windows inflate hourly bills on short-looking pairs.' },
      { title: 'Access soft costs', detail: 'HOA packets, stairs, or last-mile shuttles add labor hours.' },
      { title: 'Long empty-mile edges', detail: 'Far pockets price differently from seat cores.' },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$120–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years and summer family closings reshape demand more than logistics-shift calendars alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, PCS, or school windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Fulton County (and Clayton south patterns) movers (parent contrast)', href: '/local-movers/georgia/fulton' },
    ],
  },
});
