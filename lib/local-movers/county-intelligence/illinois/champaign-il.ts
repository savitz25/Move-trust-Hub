import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * champaign â€” IL Tier 2 Wave 1
 */
export const champaignCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'champaign',
  hubTitle: 'Champaign County Moving Intelligence Hub',
  eyebrow: 'Champaign · Champaign–Urbana — UIUC university independent',
  h1: 'Moving in Champaign County: Champaign–Urbana, UIUC Cycles & I-57 / I-74 Access',
  heroOpener:
    'Champaign County is central Illinois’s UIUC university twin-city market — Champaign multi-family and research-edge stock, Urbana multi-story and faculty housing, Savoy and Mahomet growth, and freeflow on I-57 / I-74 that is not Bloomington insurance twin-city product or Springfield capital density with different labels. Expect August lease spikes, campus walk-ups, and discontinuous outer towns under one county. This guide is for people moving in Champaign as independent UIUC market — not a McLean rename.',
  heroCredibility:
    'UIUC university market · Term calendars · I-57 / I-74 · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-57 · I-74 · US-45 · University Ave · Neil Street · Prospect Avenue',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent UIUC market (nearest hubs: McLean / Sangamon)',
    parentHref: '/local-movers/illinois/mclean',
    title: 'Compared with independent UIUC market (nearest hubs: McLean / Sangamon)',
    intro:
      'Champaign is UIUC university twin-city product — not Bloomington–Normal insurance density and not Springfield capital calendars alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'McLean crews fight twin-city professional peaks. Champaign pairs ride I-57, I-74, and university arterials — freer mid-day between twin cities, still peak-heavy on August lease weekends and Campus Town windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'McLean mixes Bloomington professional multi-unit and Normal ISU multi-family. Champaign mixes Campus Town walk-ups, Urbana faculty stock, and Savoy HOA — more continuous UIUC product, less continuous insurance-hub density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Campus walk-ups need stair inventories and parking permits; multi-family elevators appear on research edges; outer towns add empty miles.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Champaign quotes often track university secondary-premium rates for multi-story access — August spikes push prices above quiet Mahomet driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Champaign is independent UIUC university market — not McLean or capital product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Champaign County different',
    intro: 'UIUC lease cycles, Campus Town walk-ups, and I-57/I-74 freeflow — not interchangeable Bloomington or Springfield boilerplate.',
    bullets: [
      {
        title: 'UIUC lease cycles dominate summer and mid-year demand',
        detail:
          'August move-in and May move-out fill campus-adjacent crews first. Book early.',
      },
      {
        title: 'Campus Town multi-story is first-class product',
        detail:
          'Stairs, parking permits, and COIs need inventories different from pure SFH lots.',
      },
      {
        title: 'I-57 / I-74 freeflow is still billable',
        detail:
          'Twin-city and long central IL pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Savoy / Mahomet growth differs from pure campus product',
        detail:
          'HOA packets rewrite Campus Town day-rate assumptions.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Champaign zones: Campus Town multi-story, Urbana multi-unit, Savoy/Mahomet growth & outer towns',
  zonesIntro: 'Two to four sharp products — campus multi-story, Urbana multi-unit, growth HOAs, and outer towns.',
  zones: [
    {
      id: 'campus-town',
      name: 'Campus Town / Champaign multi-story',
      shortName: 'Campus Town',
      neighborhoods: ["Campus Town","student multi-family","research-edge apartments"],
      housingTypes: 'Multi-story, multi-unit, elevators',
      challenges: ["Term parking","Stairs/elevators","COI packets"],
      moverTips: 'Book around term calendars; collect building rules.',
      cityKeywords: ["champaign campus","uiuc"],
    },
    {
      id: 'urbana',
      name: 'Urbana multi-unit & faculty stock',
      shortName: 'Urbana',
      neighborhoods: ["Urbana","faculty bungalows","multi-family"],
      housingTypes: 'Multi-unit, older SFH, townhomes',
      challenges: ["Stairs","Street parking","Mixed curb"],
      moverTips: 'Inventory stairs; prefer mid-week mornings when possible.',
      cityKeywords: ["urbana"],
    },
    {
      id: 'savoy-mahomet',
      name: 'Savoy / Mahomet growth HOA',
      shortName: 'Savoy / Mahomet',
      neighborhoods: ["Savoy","Mahomet","growth villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","I-57 freeflow"],
      moverTips: 'Collect HOA COIs; prefer early starts.',
      cityKeywords: ["savoy","mahomet"],
    },
    {
      id: 'outer-towns',
      name: 'Rantoul / outer towns & rural lots',
      shortName: 'Outer towns',
      neighborhoods: ["Rantoul","outer tracts"],
      housingTypes: 'SFH, multi-family, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; prefer early starts for long pairs.',
      cityKeywords: ["rantoul"],
    }
  ],
  specialized: [
    {
      id: 'uiuc-cycles',
      title: 'UIUC university move-cycle module',
      intro: 'Term calendars drive demand spikes.',
      bullets: ["Book early around August and May windows.","Price campus-edge curb time honestly."],
    },
    {
      id: 'campus-walkups',
      title: 'Campus Town multi-story access',
      intro: 'Stairs and parking permits are first-class cost drivers.',
      bullets: ["Collect COI and elevator/stair inventories early.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i57-i74',
      title: 'I-57 / I-74 freeflow',
      intro: 'Twin-city and long pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Clarify McLean or Sangamon second addresses for long empty-mile assumptions."],
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
        intro: 'Champaign families compare Unit 4, Urbana, Mahomet-Seymour, and related district feeders — verify address boundaries.',
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
            detail: 'Carle Foundation Hospital, OSF Heart of Mary, and related campuses anchor acute care; map peak campus and I-74 times for ER access.',
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
    intro: 'Term peaks, multi-story access, and twin-city freeflow often matter more than raw miles.',
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
    intro: 'University calendars, school years, and winter ice reshape demand more than pure corporate central IL patterns.',
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
        label: 'independent UIUC market (nearest hubs: McLean / Sangamon) movers (parent contrast)',
        href: '/local-movers/illinois/mclean',
      },
      {
        label: 'Sangamon County movers',
        href: '/local-movers/illinois/sangamon',
      },
    ],
  },
});
