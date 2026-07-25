import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * niagara — NY Tier 2 Wave 1
 */
export const niagaraCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'niagara',
  hubTitle: 'Niagara County Moving Intelligence Hub',
  eyebrow: 'Niagara · Niagara Falls / North Tonawanda · North Buffalo',
  h1: 'Moving in Niagara County: Niagara Falls, North Tonawanda & Buffalo North Collar',
  heroOpener:
    'Niagara County is Buffalo’s northern collar and tourism edge — Niagara Falls multi-story and tourism-adjacent stock, North Tonawanda and Wheatfield suburban belts, Lockport seat corridors, and I-190 / NY-104 freeflow that still peaks toward Erie County. It is not Erie County Buffalo core renamed: expect tourism calendars, older multi-story inventory, and north-county freeflow different from Delaware Avenue elevators or Southtowns HOA scripts. This guide is for people moving in Niagara as a north Buffalo collar market — not a recycled Erie Tier 1 pack.',
  heroCredibility:
    'Buffalo north collar · Tourism + multi-story · I-190 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-190 · I-290 · NY-104 · NY-31 · NY-265 · NY-62',
  parentCompare: {
    parentLabel: 'Erie County',
    parentHref: '/local-movers/new-york/erie',
    title: 'Compared with Erie County',
    intro:
      'Niagara is Buffalo north collar and tourism-edge product — not Erie downtown elevators or Southtowns planned suburbs alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Erie crews fight Buffalo core peaks and Southtowns freeflow. Niagara pairs ride I-190, NY-104, and NY-31 — freer mid-day north of the city, still peak-heavy toward Erie portals and Falls tourism windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Erie mixes towers, first-ring multi-family, and Southtowns SFH. Niagara mixes Falls multi-story, North Tonawanda SFH, and Lockport corridors — more tourism-adjacent older stock, less continuous Southtowns HOA density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Falls streets and multi-story buildings need curb plans; winter lake-effect ice is first-class across both counties but tourism parking pressure is Niagara-specific.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Niagara quotes often sit near or slightly below dense Buffalo urban rates for driveway SFH — multi-story access and tourism peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Niagara is north collar + tourism edge — not Erie Buffalo core product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Niagara County different',
    intro: 'Tourism calendars, multi-story stock, and north-collar freeflow — not interchangeable Erie boilerplate.',
    bullets: [
      {
        title: 'Tourism peaks rewrite Falls weekends',
        detail:
          'Staging near tourist cores needs early starts and temporary no-parking plans.',
      },
      {
        title: 'Multi-story stock is first-class product',
        detail:
          'Stairs and older buildings need inventories different from pure suburban playbooks.',
      },
      {
        title: 'I-190 freeflow is still billable',
        detail:
          'Niagara ↔ Erie pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Canada adjacency creates cross-border complexity',
        detail:
          'International moves need specialized authority and paperwork — not a pure local NY job.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Niagara zones: Falls core, North Tonawanda belt, Lockport corridor & east edges',
  zonesIntro: 'Two to four sharp products — tourism core, north suburbs, seat corridor, and east edges.',
  zones: [
    {
      id: 'falls-core',
      name: 'Niagara Falls core',
      shortName: 'Niagara Falls',
      neighborhoods: ["Niagara Falls","tourist corridor edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Tourism parking","Stairs","Tight streets"],
      moverTips: 'Avoid peak tourist windows; plan temporary no-parking.',
      cityKeywords: ["niagara falls"],
    },
    {
      id: 'north-tonawanda',
      name: 'North Tonawanda / Wheatfield belt',
      shortName: 'North Tonawanda',
      neighborhoods: ["North Tonawanda","Wheatfield","Sanborn edges"],
      housingTypes: 'Suburban SFH, some multi-family',
      challenges: ["I-190 peaks","Mixed stock"],
      moverTips: 'Build buffer for Erie-oriented commute peaks.',
      cityKeywords: ["north tonawanda","wheatfield","sanborn"],
    },
    {
      id: 'lockport',
      name: 'Lockport seat corridor',
      shortName: 'Lockport',
      neighborhoods: ["Lockport","South Lockport edges"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Mixed access","Arterial timing"],
      moverTips: 'Confirm street width on older blocks.',
      cityKeywords: ["lockport"],
    },
    {
      id: 'east-edges',
      name: 'Eastern edges & larger lots',
      shortName: 'East Niagara',
      neighborhoods: ["Newfane","Wilson","Somerset edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice"],
      moverTips: 'Photo approaches; lake-effect mornings need flexibility.',
      cityKeywords: ["newfane","wilson","somerset"],
    }
  ],
  specialized: [
    {
      id: 'tourism-access',
      title: 'Tourism-core access module',
      intro: 'Falls staging is not a quiet suburban curb.',
      bullets: ["Book around peak tourist windows when possible.","Temporary no-parking is often required near dense corridors."],
    },
    {
      id: 'north-collar-freeflow',
      title: 'Buffalo north-collar freeflow',
      intro: 'I-190 pairs to Erie still peak hard.',
      bullets: ["Price portal-to-portal time honestly for Niagara ↔ Buffalo pairs.","Clarify Erie County second addresses for drive-time assumptions."],
    },
    {
      id: 'winter-lake-effect',
      title: 'Lake-effect winter access',
      intro: 'Western New York ice rewrites curb plans.',
      bullets: ["Morning flexibility matters more than map freeflow after storms.","Discuss split-day options rather than pushing into unsafe ice windows."],
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
        intro: 'Niagara families compare Niagara Falls, North Tonawanda, Lockport, and other districts — verify boundaries.',
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
            detail: 'Niagara Falls Memorial, Mount St. Mary’s, and Buffalo specialty spillover serve the region; map peak I-190 times.',
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
    intro: 'Tourism peaks, multi-story access, and north-collar freeflow often matter more than raw miles.',
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
    intro: 'Tourism summers, school years, and lake-effect winters reshape demand by pocket.',
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
        label: 'Erie County movers (parent contrast)',
        href: '/local-movers/new-york/erie',
      },
      
    ],
  },
});
