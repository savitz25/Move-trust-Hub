import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * putnam — NY Tier 2 Wave 1
 */
export const putnamCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'putnam',
  hubTitle: 'Putnam County Moving Intelligence Hub',
  eyebrow: 'Putnam · Carmel · outer North NYC collar',
  h1: 'Moving in Putnam County: Carmel, Lakes & Outer North NYC Collar Last-Mile',
  heroOpener:
    'Putnam County is the lower-density northern NYC collar — Carmel seat suburbs, lake and hill last-mile toward Lake Carmel and Putnam Valley, Brewster and Southeast corridor stock, and I-84 / Taconic freeflow that still peaks toward Westchester. It is not Westchester with freer freeways: expect longer empty miles, wooded approaches, and fewer elevator jobs than south-county co-ops. This guide is for people moving in Putnam as an outer collar market — not a recycled Westchester hill estate script.',
  heroCredibility:
    'Outer North NYC collar · Lakes & hills last-mile · Lower density · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-84 · Taconic State Parkway · US-6 · NY-22 · NY-301',
  parentCompare: {
    parentLabel: 'Westchester County',
    parentHref: '/local-movers/new-york/westchester',
    title: 'Compared with Westchester County',
    intro:
      'Putnam is lower-density northern collar product — lakes, hills, and longer empty miles — not Westchester south-county elevators or Sound Shore village density.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Westchester crews fight denser south-county peaks. Putnam pairs ride I-84, the Taconic, US-6, and NY-22 — freer mid-day, still peak-heavy toward Westchester portals and Carmel arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Westchester mixes elevators and large estates. Putnam skews SFH, lake cottages, and wooded lots — far less continuous multi-family product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Lake and hill approaches often need smaller trucks and long carries; soft shoulders after rain are a first-class failure mode.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Putnam quotes can look lower than south Westchester for simple driveways — empty miles, shuttles, and winter grades still erase “cheap suburban” assumptions.',
      },
      {
        title: 'Role difference',
        detail:
          'Putnam is outer northern collar last-mile — not Westchester dual north–south density product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Putnam County different',
    intro: 'Lakes, hills, and empty miles — not interchangeable Westchester boilerplate.',
    bullets: [
      {
        title: 'Lake and hill last-mile is the default failure mode',
        detail:
          'Narrow approaches and soft ground reject full trailers more often than map miles suggest.',
      },
      {
        title: 'I-84 / Taconic freeflow is still billable',
        detail:
          'Putnam ↔ Westchester pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Lower multi-family density than Rockland/Westchester south',
        detail:
          'Most jobs are SFH and long driveways — not elevator banks.',
      },
      {
        title: 'CT adjacency creates interstate legs',
        detail:
          'Connecticut addresses require FMCSA authority even on short-looking hops.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Putnam zones: Carmel seat, lake/hill edges, Brewster corridor & west ridges',
  zonesIntro: 'Two to four sharp products — seat suburbs, lakes, corridor stock, and ridges.',
  zones: [
    {
      id: 'carmel-seat',
      name: 'Carmel / Mahopac seat suburbs',
      shortName: 'Carmel',
      neighborhoods: ["Carmel","Mahopac","Mahopac Falls"],
      housingTypes: 'Suburban SFH, some multi-family',
      challenges: ["Cul-de-sac staging","Arterial timing"],
      moverTips: 'Confirm driveway length and HOA rules where applicable.',
      cityKeywords: ["carmel","mahopac"],
    },
    {
      id: 'lake-hill',
      name: 'Lake Carmel / Putnam Valley hills',
      shortName: 'Lakes & hills',
      neighborhoods: ["Lake Carmel","Putnam Valley","lake edges"],
      housingTypes: 'Lake cottages, hillside SFH',
      challenges: ["Narrow roads","Soft shoulders","Long carries"],
      moverTips: 'Photo approaches; discuss shuttle trucks early.',
      cityKeywords: ["lake carmel","putnam valley"],
    },
    {
      id: 'brewster-corridor',
      name: 'Brewster / Southeast corridor',
      shortName: 'Brewster corridor',
      neighborhoods: ["Brewster","Southeast","I-84 edges"],
      housingTypes: 'SFH, some multi-family',
      challenges: ["I-84 peaks","Mixed stock"],
      moverTips: 'Build buffer for I-84 commute peaks.',
      cityKeywords: ["brewster","southeast"],
    },
    {
      id: 'west-ridges',
      name: 'Western ridges & larger lots',
      shortName: 'West Putnam',
      neighborhoods: ["Kent","Patterson edges","wooded lots"],
      housingTypes: 'Larger lots, wooded approaches',
      challenges: ["Grades","Winter ice","Low wires"],
      moverTips: 'Winter mornings need flexibility; photo grades.',
      cityKeywords: ["kent","patterson"],
    }
  ],
  specialized: [
    {
      id: 'lake-last-mile',
      title: 'Lakes & hills last-mile module',
      intro: 'Putnam’s defining access risk is narrow lake and hill approaches.',
      bullets: ["Photo the final approach before promising a 26-foot truck.","Soft ground after rain can block heavy equipment.","Long carries are common even when the address looks driveway-accessible."],
    },
    {
      id: 'outer-collar-freeflow',
      title: 'Outer collar freeflow vs Westchester density',
      intro: 'I-84 and Taconic freeflow is freer mid-day — still a line item at peak.',
      bullets: ["Price portal-to-portal time for Putnam ↔ Westchester pairs.","Clarify CT second addresses for interstate authority."],
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
        intro: 'Putnam families compare Carmel, Mahopac, Brewster, and related districts — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and college towns can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Putnam Hospital and nearby Westchester specialty spillover serve the county; map peak I-84 times for ER access.',
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
    intro: 'Empty miles, shuttles, and winter grades often matter more than raw square footage.',
    drivers: [
      {
        title: 'Corridor freeflow',
        detail: 'Peak windows inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Access soft costs',
        detail: 'Building packets, stairs, or last-mile shuttles add labor hours.',
      },
      {
        title: 'Long empty-mile edges',
        detail: 'Far pockets price differently from seat suburbs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$500–$1,200+' },
      {
        label: '3–4 BR home',
        value: '$1,800–$4,200+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$120–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years and winter ice reshape demand more than tourism alone.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, lake edges, and rural approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NYSDOT household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Westchester County movers (parent contrast)',
        href: '/local-movers/new-york/westchester',
      },
      
    ],
  },
});
