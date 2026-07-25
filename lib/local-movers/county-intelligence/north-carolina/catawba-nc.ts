import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * catawba — NC Tier 2 Wave 1
 */
export const catawbaCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'catawba',
  hubTitle: 'Catawba County Moving Intelligence Hub',
  eyebrow: 'Catawba · Hickory — western Piedmont independent',
  h1: 'Moving in Catawba County: Hickory, Furniture Hub & I-40 Western Piedmont Access',
  heroOpener:
    'Catawba County is a western Piedmont independent market — Hickory multi-story and furniture/manufacturing hub density, Newton and Conover corridors, Lake Hickory edges, and I-40 freeflow that is not Charlotte Mecklenburg beltways with mountain labels. Expect manufacturing calendars, discontinuous town pairs, and longer empty miles under one county. This guide is for people moving in Catawba as Hickory independent secondary — not a distant Charlotte rename.',
  heroCredibility:
    'Western Piedmont independent · Hickory furniture hub · I-40 · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · US-321 · US-70 · NC-16 · NC-127 · NC-10',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent western Piedmont (nearest Charlotte hub: Mecklenburg)',
    parentHref: '/local-movers/north-carolina/mecklenburg',
    title: 'Compared with independent western Piedmont (nearest Charlotte hub: Mecklenburg)',
    intro:
      'Catawba is Hickory furniture/manufacturing independent product on I-40 — not Mecklenburg Uptown elevators and not pure Blue Ridge freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Mecklenburg crews fight I-77/I-85 beltway peaks. Catawba pairs ride I-40, US-321, and NC-16 — freer mid-day western Piedmont freeflow, still peak-heavy on Hickory arterials. Portal-to-portal time is real; it is not a Charlotte elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Mecklenburg mixes towers and south-ring HOAs. Catawba mixes Hickory multi-story, furniture-region multi-unit, Newton/Conover SFH, and lake edges — more manufacturing-hub product, less continuous Charlotte vertical density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; lake approaches can need smaller trucks; rural edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Catawba quotes often sit at western Piedmont secondary rates for driveway SFH — multi-story access and long empty-mile pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Catawba is Hickory western Piedmont independent — not Charlotte metro product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Catawba County different',
    intro: 'Furniture/manufacturing hub density, I-40 freeflow, and lake edges — not interchangeable Charlotte boilerplate.',
    bullets: [
      {
        title: 'Hickory multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure lake cul-de-sacs.',
      },
      {
        title: 'Manufacturing calendars reshape some corridors',
        detail:
          'Shift patterns rewrite pure Saturday residential assumptions.',
      },
      {
        title: 'I-40 freeflow is still billable',
        detail:
          'Western Piedmont pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Lake Hickory last-mile rewrites truck size',
        detail:
          'Some approaches need photo surveys and smaller trucks.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Catawba zones: Hickory seat, Newton/Conover corridor, Lake Hickory edges & rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, corridor towns, lake edges, and rural lots.',
  zones: [
    {
      id: 'hickory',
      name: 'Hickory multi-story & hub stock',
      shortName: 'Hickory',
      neighborhoods: ["Hickory","downtown edges","multi-family corridors"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-40 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["hickory"],
    },
    {
      id: 'newton-conover',
      name: 'Newton / Conover corridor',
      shortName: 'Newton / Conover',
      neighborhoods: ["Newton","Conover","US-70 corridor"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Arterial timing","Mixed access"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["newton","conover"],
    },
    {
      id: 'lake-hickory',
      name: 'Lake Hickory association & waterfront edges',
      shortName: 'Lake Hickory',
      neighborhoods: ["Lake Hickory edges","association communities"],
      housingTypes: 'SFH, lake homes',
      challenges: ["Narrow approaches","HOA rules","Seasonal staging"],
      moverTips: 'Photo last-mile; discuss shuttle trucks early.',
      cityKeywords: ["lake hickory"],
    },
    {
      id: 'rural-edge',
      name: 'Northern & southern rural edges',
      shortName: 'Rural edge',
      neighborhoods: ["Claremont edges","southern tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; prefer early starts for long pairs.',
      cityKeywords: ["claremont","rural catawba"],
    }
  ],
  specialized: [
    {
      id: 'hickory-hub',
      title: 'Hickory furniture/manufacturing hub module',
      intro: 'Hub multi-story and industrial-residential fabric dominate seat volume.',
      bullets: ["Inventory stairs and curb width.","Do not recycle Charlotte elevator day rates."],
    },
    {
      id: 'i40-west',
      title: 'I-40 western Piedmont freeflow',
      intro: 'Independent hub pairs still peak hard on arterials.',
      bullets: ["Price portal-to-portal honestly.","Clarify Charlotte second addresses for long empty-mile assumptions."],
    },
    {
      id: 'lake-edge',
      title: 'Lake Hickory last-mile',
      intro: 'Waterfront approaches reject full-trailer assumptions.',
      bullets: ["Photo the final approach before promising a 26-foot truck.","Confirm association truck limits early."],
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
        intro: 'Catawba families compare Catawba County Schools, Hickory Public Schools, and Newton-Conover City Schools feeders — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NCDPI data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Frye Regional, Catawba Valley Medical Center, and regional specialty spillover serve the county; map peak I-40 / US-321 times for ER access.',
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
    intro: 'Hub multi-story, I-40 freeflow, and lake last-mile often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, manufacturing shift patterns, and lake tourism weekends reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
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
      'Official links first; directory listings are independent. Verify NCUC household-goods certification for in-state North Carolina moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent western Piedmont (nearest Charlotte hub: Mecklenburg) movers (parent contrast)',
        href: '/local-movers/north-carolina/mecklenburg',
      },

    ],
  },
});
