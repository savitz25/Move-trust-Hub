import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * island â€” WA Tier 2 Wave 1
 */
export const islandCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'island',
  hubTitle: 'Island County Moving Intelligence Hub',
  eyebrow: 'Island · Oak Harbor / Coupeville / Camano — island logistics',
  h1: 'Moving in Island County: Oak Harbor, Camano & Ferry/Bridge Access',
  heroOpener:
    'Island County is ferry- and bridge-constrained island product — Oak Harbor multi-family and NAS Whidbey–adjacent stock, Coupeville multi-story edges, Camano Island approaches, and freeflow that is not mainland Snohomish multi-family with different labels. Expect sailing windows, military calendars, rain staging, and last-mile constraints under one county. This guide is for people moving in Island as island logistics market — not a Snohomish rename.',
  heroCredibility:
    'Island ferry/bridge logistics · NAS Whidbey edge · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'SR-20 · SR-525 · Camano approaches · ferry terminals · NAS access roads',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Snohomish County',
    parentHref: '/local-movers/washington/snohomish',
    title: 'Compared with Snohomish County',
    intro:
      'Island is ferry/bridge-constrained island product — not Snohomish continuous Everett multi-family density and not pure Kitsap peninsula product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Snohomish crews fight I-5 peaks into Everett. Island pairs ride SR-20, SR-525, and ferry/bridge approaches — freer mid-day on-island freeflow, still peak-heavy around sailings, NAS windows, and Camano approaches.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Snohomish mixes Everett multi-family and Lynnwood HOAs. Island mixes Oak Harbor multi-unit, Coupeville multi-story, and Camano SFH — more island last-mile product, less continuous mainland multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Ferry size limits and sailing windows are first-class; multi-family elevators appear on Oak Harbor growth; rural island lots add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Island quotes often track island secondary-premium rates when ferries constrain truck size — clean Camano driveway SFH can price lower than peak sailing multi-family jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Island is ferry/bridge-constrained island logistics — not mainland Snohomish product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Island County different',
    intro: 'Ferry/bridge constraints, NAS calendars, and island multi-family — not interchangeable Everett boilerplate.',
    bullets: [
      {
        title: 'Ferry and bridge windows rewrite schedules',
        detail:
          'Sailing times and truck size limits are first-class survey inputs.',
      },
      {
        title: 'NAS Whidbey PCS calendars compress demand',
        detail:
          'Report dates drive surveys more than preferred Saturdays.',
      },
      {
        title: 'Oak Harbor multi-family is first-class product',
        detail:
          'Elevators and parking need inventories different from pure Camano lots.',
      },
      {
        title: 'Distinct from mainland Snohomish day-rate assumptions',
        detail:
          'Do not recycle Everett multi-family rates alone.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Island zones: Oak Harbor multi-family, Coupeville multi-story, Camano approaches & rural island lots',
  zonesIntro: 'Two to four sharp products — base multi-family, seat multi-story, Camano approaches, and rural lots.',
  zones: [
    {
      id: 'oak-harbor',
      name: 'Oak Harbor multi-family & NAS-adjacent stock',
      shortName: 'Oak Harbor',
      neighborhoods: ["Oak Harbor","NAS-adjacent multi-family","growth apartments"],
      housingTypes: 'Multi-family, apartments, townhomes',
      challenges: ["PCS clusters","Elevators","COI packets"],
      moverTips: 'Book around report dates; collect building rules.',
      cityKeywords: ["oak harbor"],
    },
    {
      id: 'coupeville',
      name: 'Coupeville multi-story & older stock',
      shortName: 'Coupeville',
      neighborhoods: ["Coupeville","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Ferry freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["coupeville"],
    },
    {
      id: 'camano',
      name: 'Camano Island approaches',
      shortName: 'Camano',
      neighborhoods: ["Camano Island","bridge approaches","island SFH"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Bridge freeflow","Empty miles","Rain staging"],
      moverTips: 'Photo last-mile; build bridge-peak buffers.',
      cityKeywords: ["camano"],
    },
    {
      id: 'rural-island',
      name: 'Rural island lots',
      shortName: 'Rural island',
      neighborhoods: ["rural tracts","island approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Soft shoulders","Ferry timing","Empty miles"],
      moverTips: 'Survey approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["rural island"],
    }
  ],
  specialized: [
    {
      id: 'ferry-bridge',
      title: 'Ferry / bridge constraint module',
      intro: 'Sailing windows and truck limits are first-class cost drivers.',
      bullets: ["Confirm ferry truck size limits early.","Build sailing buffers into portal-to-portal quotes."],
    },
    {
      id: 'nas-pcs',
      title: 'NAS Whidbey PCS cycle module',
      intro: 'Order-driven calendars dominate Oak Harbor volume.',
      bullets: ["Align surveys with report dates.","Document inventories carefully for military claims processes."],
    },
    {
      id: 'island-multi',
      title: 'Oak Harbor multi-family access',
      intro: 'Elevators and parking are first-class cost drivers.',
      bullets: ["Collect COI and elevator reservations early.","Do not recycle Everett mainland day rates alone."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes Ã¢â‚¬â€ primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Island families compare Oak Harbor, Coupeville, South Whidbey, and related district feeders — verify address boundaries; do not assume Snohomish maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use OSPI data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university towns, and military markets can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'WhidbeyHealth and mainland specialty spillover serve the county; map peak ferry/bridge times for ER access.',
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
    intro: 'Ferry constraints, multi-family access, and PCS peaks often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450Ã¢â‚¬â€œ$1,200+' },
      { label: '3Ã¢â‚¬â€œ4 BR home', value: '$1,600Ã¢â‚¬â€œ$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115Ã¢â‚¬â€œ$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'PCS cycles, school years, ferry peak seasons, and rain staging reshape demand by pocket.',
    items: [
      {
        title: 'Late spring Ã¢â‚¬â€œ early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Institutional & weather windows',
        detail:
          'School, university, PCS, tourism, or storm seasons can outrank pure weekend preference.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Washington UTC household goods permit for in-state Washington moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Snohomish County movers (parent contrast)',
        href: '/local-movers/washington/snohomish',
      },
      {
        label: 'Kitsap County movers',
        href: '/local-movers/washington/kitsap',
      },
    ],
  },
});
