import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * berks — PA Tier 2 Wave 1
 */
export const berksCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'berks',
  hubTitle: 'Berks County Moving Intelligence Hub',
  eyebrow: 'Berks · Reading mid-state independent secondary',
  h1: 'Moving in Berks County: Reading, US-222 Corridor & Mid-State Independent Access',
  heroOpener:
    'Berks County is a Reading-centered mid-state independent secondary market — city multi-unit and older stock, US-222 and I-78 corridor freeflow toward Lehigh Valley, western township HOAs, and longer empty miles to rural edges. It is not an Allentown rename and not Philly collar freeways with different labels: expect Reading hills and stairs, Route 222 portal time, and mid-state patterns that stage differently from Lehigh Valley industrial multi-family. This guide is for people moving in Berks as a Reading / US-222 independent market — not recycled Lehigh or Lancaster scripts.',
  heroCredibility:
    'Reading mid-state independent · I-78 / US-222 freeflow · Mixed city & township stock · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-222 · I-78 links · US-422 · PA-61 · PA-12 · PA-183',
  parentCompare: {
    parentLabel: 'Lehigh County',
    parentHref: '/local-movers/pennsylvania/lehigh',
    title: 'Compared with Lehigh County',
    intro:
      'Berks is Reading mid-state independent product on US-222 / I-78 — not Lehigh Valley Allentown industrial multi-family and not Lancaster Amish-edge tourism alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lehigh crews fight I-78 / PA-22 Valley peaks into Allentown. Berks pairs ride US-222, US-422, and I-78 links — freer mid-day west of the Valley, still peak-heavy on Reading arterials and 222 toward Lehigh. Portal-to-portal time is real; it is not an Allentown elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lehigh mixes Allentown multi-unit and western township growth. Berks mixes Reading multi-story hills, Wyomissing HOA, Exeter twins, and rural-edge lots — more Reading city stairs, less continuous Valley industrial multi-family.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Reading hills need stair inventories and curb plans; western townships add HOA packets uncommon on pure rural jobs. Soft shoulders on rural edges reject full trailers more often than map miles suggest.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Berks quotes often sit near secondary mid-state rates for driveway SFH — city stairs, 222 peaks, and long empty-mile edges still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Berks is Reading mid-state independent secondary — not Lehigh Valley Allentown product renamed and not Philly collar spillover.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Berks County different',
    intro: 'Reading hills, US-222 freeflow, and township empty miles — not interchangeable Allentown boilerplate.',
    bullets: [
      {
        title: 'US-222 / I-78 peaks rewrite short locals',
        detail:
          'Reading ↔ Lehigh pairs freer mid-day still burn billable time at commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Reading multi-story hills are first-class product',
        detail:
          'City stairs and grades need inventories different from Wyomissing cul-de-sacs.',
      },
      {
        title: 'Western township HOA is real soft cost',
        detail:
          'Gate lists and approved hours push demand into peak windows more than map miles suggest.',
      },
      {
        title: 'Rural-edge empty miles price as distance work',
        detail:
          'Northern and southern lots fail when crews assume Reading-city day rates.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Berks zones: Reading city, western suburbs, eastern corridors & rural edges',
  zonesIntro: 'Two to four sharp products — city hills, HOA suburbs, eastern arterials, and rural edges price differently.',
  zones: [
    {
      id: 'reading-city',
      name: 'Reading city multi-unit & older stock',
      shortName: 'Reading city',
      neighborhoods: ["Downtown Reading","City multi-family","Older SFH pockets"],
      housingTypes: 'Multi-family, twins, older SFH',
      challenges: ["Hills and stairs","Tight streets","Arterial congestion"],
      moverTips: 'Photo curb and stairs. Prefer mid-week mornings.',
      cityKeywords: ["reading","downtown reading"],
    },
    {
      id: 'west-suburbs',
      name: 'Western suburban multi-family & HOA',
      shortName: 'West suburbs',
      neighborhoods: ["Wyomissing","Sinking Spring edges","US-422 multi-family","HOA villages"],
      housingTypes: 'HOA SFH, multi-family, townhomes',
      challenges: ["HOA rules","US-422 congestion","Long portal time to Reading core"],
      moverTips: 'Collect HOA packets. Build arterial buffer.',
      cityKeywords: ["wyomissing","sinking spring","west reading"],
    },
    {
      id: 'east-corridors',
      name: 'Eastern corridors & small towns',
      shortName: 'East corridors',
      neighborhoods: ["Exeter","Birdsboro edges","US-422 east multi-family"],
      housingTypes: 'SFH, multi-family, twins',
      challenges: ["Arterial congestion","Mixed access types","Longer empty miles"],
      moverTips: 'Prefer early starts. Survey driveway depth.',
      cityKeywords: ["exeter","birdsboro","st. lawrence"],
    },
    {
      id: 'rural-edges',
      name: 'Northern & southern rural edges',
      shortName: 'Rural edges',
      neighborhoods: ["Kutztown edges","Southern tracts","Rural driveway lots"],
      housingTypes: 'SFH, rural-edge lots',
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: 'Survey truck access. Prefer early starts for long pairs.',
      cityKeywords: ["kutztown","rural berks"],
    }
  ],
  specialized: [
    {
      id: 'us222-i78',
      title: 'US-222 / I-78 freeflow module',
      intro: 'Mid-state pairs burn portal-to-portal time even when map miles look short.',
      bullets: ["Price 222 and I-78 peaks honestly for Reading ↔ Lehigh pairs.","Build buffer for US-422 retail corridors on weekends.","Clarify Lehigh or Lancaster second addresses for drive-time and authority."],
    },
    {
      id: 'reading-hills',
      title: 'Reading city hills & multi-story access',
      intro: 'City stairs and grades need inventories different from township playbooks.',
      bullets: ["Measure streets and floor counts before promising full trailers.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'township-hoa',
      title: 'Western township HOA & soft costs',
      intro: 'HOA packets and gate lists are standard survey inputs west of Reading.',
      bullets: ["Collect COI and approved-hour rules before the estimate is final.","Saturday HOA windows push demand into peak crew slots."],
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
        intro: 'Berks families often compare Reading, Wilson, Governor Mifflin, Exeter, and other districts — boundaries are address-specific.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use PDE data and district maps; do not assume a borough name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university towns can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Reading Hospital (Tower Health) and related campuses anchor acute care; map ER times at US-222 / US-422 peak.',
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
    intro: 'City hills/stairs, US-222 freeflow, and township empty miles often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter grades reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, rural edges, and mountain approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Pennsylvania PUC household-goods authority for in-state Pennsylvania moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Lehigh County movers (parent contrast)',
        href: '/local-movers/pennsylvania/lehigh',
      },
      {
        label: 'Lancaster County movers',
        href: '/local-movers/pennsylvania/lancaster',
      },
    ],
  },
});
