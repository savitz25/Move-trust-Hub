import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * cayuga — NY Tier 2 Wave 2
 */
export const cayugaCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'cayuga',
  hubTitle: 'Cayuga County Moving Intelligence Hub',
  eyebrow: 'Cayuga · Auburn Finger Lakes · vs Onondaga / Monroe',
  h1: 'Moving in Cayuga County: Auburn Finger Lakes Seat, Lake Edge & Thruway Approaches',
  heroOpener:
    'Cayuga County is Finger Lakes mid-corridor product — Auburn multi-story and seat density, lake-edge villages, Thruway approaches, and freeflow between Onondaga and Monroe that is not a rename of either. Expect mid-size city stock, seasonal lake access, and longer empty miles than Syracuse or Rochester first-ring suburbs. This guide is for people moving in Cayuga as Auburn Finger Lakes — not Onondaga multi-family cores and not Monroe growth collars with different labels.',
  heroCredibility:
    'Auburn Finger Lakes · Lake edge · Thruway approaches · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · NY-5 · NY-20 · NY-34 · NY-38 · NY-90',
  parentCompare: {
    parentLabel: 'Onondaga County (and Monroe collar patterns)',
    parentHref: '/local-movers/new-york/onondaga',
    title: 'Compared with Onondaga County (and Monroe collar patterns)',
    intro:
      'Cayuga is Auburn / Finger Lakes mid-corridor product — not Syracuse university density and not Rochester south-collar HOAs alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Onondaga crews fight Syracuse peaks; Monroe crews fight Rochester collars. Cayuga pairs ride I-90, NY-5/20, and lake corridors — freer mid-day mid-state freeflow, still peak-heavy on Auburn arterials and Thruway approaches.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes university multi-family; Monroe mixes growth HOAs. Cayuga mixes Auburn multi-story, lake villages, and rural lots — more continuous mid-size seat product, less metro multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Auburn multi-story needs stair inventories; lake villages often need smaller trucks and seasonal curb plans uncommon on pure suburban jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cayuga quotes often sit at secondary Finger Lakes rates for driveway SFH — city access and seasonal lake peaks push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Cayuga is Auburn Finger Lakes mid-corridor — not Onondaga or Monroe renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Cayuga County different',
    intro: 'Auburn seat density, lake-edge access, and mid-state freeflow — not a Syracuse or Rochester clone.',
    bullets: [
      {
        title: 'Auburn multi-story is first-class product',
        detail:
          'Stairs and street parking need inventories different from pure lake cottages.',
      },
      {
        title: 'Finger Lakes seasonal access',
        detail:
          'Summer tourism and lake approaches rewrite curb plans on village jobs.',
      },
      {
        title: 'Thruway approaches are still billable',
        detail:
          'East–west pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Between-metro empty miles matter',
        detail:
          'Jobs bridging Syracuse and Rochester freeflow price differently from pure local Auburn days.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Cayuga zones: Auburn core, lake villages, Thruway edges & rural south',
  zonesIntro: 'Two to four sharp products — seat city, lake villages, Thruway approaches, and rural lots.',
  zones: [
    {
      id: 'auburn-core',
      name: 'Auburn city core',
      shortName: 'Auburn',
      neighborhoods: ["Auburn","downtown","city neighborhoods"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["auburn"],
    },
    {
      id: 'lake-villages',
      name: 'Cayuga Lake village edges',
      shortName: 'Lake villages',
      neighborhoods: ["Aurora edges","Union Springs","lake villages"],
      housingTypes: 'Village SFH, seasonal stock, some multi-unit',
      challenges: ["Narrow streets","Seasonal parking","Last-mile width"],
      moverTips: 'Photo approaches; plan summer curb carefully.',
      cityKeywords: ["aurora","union springs"],
    },
    {
      id: 'thruway-edges',
      name: 'Thruway approach corridors',
      shortName: 'Thruway edges',
      neighborhoods: ["Weedsport edges","corridor towns"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Corridor freeflow","Longer local pairs"],
      moverTips: 'Price portal-to-portal on east–west pairs.',
      cityKeywords: ["weedsport"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["Moravia edges","southern towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; winter flexibility required.',
      cityKeywords: ["moravia"],
    }
  ],
  specialized: [
    {
      id: 'auburn-city',
      title: 'Auburn multi-story & seat access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'lake-edge',
      title: 'Finger Lakes village & seasonal access',
      intro: 'Lake approaches rewrite truck size and curb plans.',
      bullets: ["Photo last-mile before surveys finalize.","Summer tourism changes staging windows."],
    },
    {
      id: 'mid-corridor',
      title: 'I-90 mid-state freeflow',
      intro: 'Between-metro pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote pure Syracuse or Rochester suburban rates for Auburn multi-story."],
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
        intro: 'Cayuga families compare Auburn, Southern Cayuga, Cato-Meridian, and other districts — verify boundaries; lake and rural feeders differ.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, college towns, and seasonal markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Auburn Community Hospital and regional clinics anchor acute care; map peak freeflow across Auburn–lake corridors.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks and weather days, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'City access, seasonal lake peaks, and mid-state freeflow often matter more than raw miles.',
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
        detail: 'Far pockets price differently from seat cores.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,100+' },
      {
        label: '3–4 BR home',
        value: '$1,600–$4,000+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$115–$180+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Summer lake tourism, school years, and winter ice reshape demand more than pure metro office calendars.',
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
        label: 'Onondaga County (and Monroe collar patterns) movers (parent contrast)',
        href: '/local-movers/new-york/onondaga',
      },
    ],
  },
});
