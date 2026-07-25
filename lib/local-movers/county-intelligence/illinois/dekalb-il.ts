import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * dekalb â€” IL Tier 2 Wave 1
 */
export const dekalbCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'dekalb',
  hubTitle: 'DeKalb County Moving Intelligence Hub',
  eyebrow: 'DeKalb · DeKalb / Sycamore — NIU university',
  h1: 'Moving in DeKalb County: DeKalb, NIU Cycles & I-88 West University Access',
  heroOpener:
    'DeKalb County is an I-88 west university market — DeKalb multi-story and near-NIU density, Sycamore seat multi-family, Genoa and Sandwich edges, and freeflow that is not Kane County Aurora HOA product with different labels. Expect term calendars, student multi-family COIs, and longer empty miles under one county. This guide is for people moving in DeKalb as NIU university secondary — not a Chicago-suburb rename.',
  heroCredibility:
    'NIU university market · Term calendars · I-88 west · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-88 · IL-23 · IL-38 · IL-64 · Peace Road corridor',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Kane County',
    parentHref: '/local-movers/illinois/kane',
    title: 'Compared with Kane County',
    intro:
      'DeKalb is NIU university-town product on I-88 west — not Kane Aurora/Elgin multi-family growth alone and not pure rural prairie freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Kane crews fight Randall Road and I-88 peaks into Aurora/Elgin. DeKalb pairs ride I-88, IL-23, and IL-38 — freer mid-day further west, still peak-heavy on DeKalb arterials and term weekends. Portal-to-portal time is real; it is not a pure Kane HOA day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Kane mixes Aurora multi-family and west-collar HOAs. DeKalb mixes near-campus multi-story, Sycamore multi-unit, and rural-edge lots — more university-town product, less continuous Kane growth density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Campus-adjacent streets need curb plans and temporary no-parking; term weekends rewrite staging; rural edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local DeKalb quotes often track secondary west-corridor rates for multi-story access — term peaks push prices above quiet Sycamore driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'DeKalb is NIU university independent secondary — not Kane collar product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Dekalb County different',
    intro: 'University term calendars, near-campus multi-story, and I-88 freeflow — not interchangeable Kane boilerplate.',
    bullets: [
      {
        title: 'NIU term calendars drive demand spikes',
        detail:
          'Move-in/out weekends fill crews and parking near campus. Book early.',
      },
      {
        title: 'Near-campus multi-story is first-class product',
        detail:
          'Stairs, elevators, and COIs need inventories different from pure SFH lots.',
      },
      {
        title: 'Sycamore seat density differs from pure growth HOAs',
        detail:
          'Mixed curb plans rewrite truck type assumptions.',
      },
      {
        title: 'I-88 freeflow is still billable',
        detail:
          'DeKalb ↔ Kane pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'DeKalb zones: NIU campus edge, DeKalb multi-unit, Sycamore seat & rural edges',
  zonesIntro: 'Two to four sharp products — campus multi-story, city multi-unit, seat stock, and rural edges.',
  zones: [
    {
      id: 'niu-edge',
      name: 'NIU campus-edge multi-story',
      shortName: 'NIU edge',
      neighborhoods: ["DeKalb near campus","student multi-family"],
      housingTypes: 'Multi-story, multi-unit',
      challenges: ["Term parking","Stairs/elevators","COI packets"],
      moverTips: 'Book around term calendars; collect building rules.',
      cityKeywords: ["dekalb niu","northern illinois"],
    },
    {
      id: 'dekalb-core',
      name: 'DeKalb multi-unit & older stock',
      shortName: 'DeKalb core',
      neighborhoods: ["DeKalb","downtown edges","mixed multi-family"],
      housingTypes: 'Multi-unit, older SFH, townhomes',
      challenges: ["Stairs","Street parking","I-88 freeflow"],
      moverTips: 'Inventory access type; prefer mid-week mornings when possible.',
      cityKeywords: ["dekalb"],
    },
    {
      id: 'sycamore',
      name: 'Sycamore seat multi-family & SFH',
      shortName: 'Sycamore',
      neighborhoods: ["Sycamore","seat multi-family","growth edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Prefer early starts; collect HOA docs where applicable.',
      cityKeywords: ["sycamore"],
    },
    {
      id: 'rural-edge',
      name: 'Genoa / Sandwich / rural edges',
      shortName: 'Rural edge',
      neighborhoods: ["Genoa","Sandwich edges","rural tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; prefer early starts for long pairs.',
      cityKeywords: ["genoa","sandwich"],
    }
  ],
  specialized: [
    {
      id: 'niu-terms',
      title: 'NIU university move-cycle module',
      intro: 'Term calendars drive demand spikes.',
      bullets: ["Book early around move-in/out weekends.","Price campus-edge curb time honestly."],
    },
    {
      id: 'campus-multi',
      title: 'Near-campus multi-story access',
      intro: 'Elevators and stairs are first-class cost drivers.',
      bullets: ["Collect COI and elevator reservations early.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i88-west',
      title: 'I-88 west freeflow',
      intro: 'West-corridor pairs still peak hard toward Kane.',
      bullets: ["Price portal-to-portal honestly.","Clarify Kane second addresses early."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes â€” primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'DeKalb families compare DeKalb, Sycamore, Genoa-Kingston, and related district feeders — verify address boundaries; do not assume Kane maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use ISBE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Northwestern Medicine Kishwaukee Hospital and regional specialty spillover serve the county; map peak term and I-88 times for ER access.',
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
    intro: 'Term peaks, multi-story access, and I-88 freeflow often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450â€“$1,200+' },
      { label: '3â€“4 BR home', value: '$1,600â€“$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115â€“$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'University calendars, school years, and winter ice reshape demand more than pure collar HOA patterns.',
    items: [
      {
        title: 'Late spring â€“ early fall',
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
      'Official links first; directory listings are independent. Verify Illinois Commerce Commission (ICC) household goods authority for in-state Illinois moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Kane County movers (parent contrast)',
        href: '/local-movers/illinois/kane',
      },

    ],
  },
});
