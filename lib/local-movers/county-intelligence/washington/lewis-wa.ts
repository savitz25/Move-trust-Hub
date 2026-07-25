import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * lewis â€” WA Tier 2 Wave 1
 */
export const lewisCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'lewis',
  hubTitle: 'Lewis County Moving Intelligence Hub',
  eyebrow: 'Lewis · Centralia / Chehalis — I-5 mid-south',
  h1: 'Moving in Lewis County: Centralia, Chehalis & I-5 Mid-South Access',
  heroOpener:
    'Lewis County is I-5 mid-south corridor product — Centralia multi-story and multi-family stock, Chehalis seat multi-unit, Napavine and rural edges, and freeflow that is not Thurston continuous Olympia capital multi-family with different labels. Expect rain staging, industrial-adjacent residential, and longer empty miles under one county. This guide is for people moving in Lewis as I-5 mid-south corridor — not an Olympia rename.',
  heroCredibility:
    'I-5 mid-south corridor · Centralia / Chehalis · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-5 · US-12 · SR-6 · SR-507 · Harrison Ave corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Thurston County',
    parentHref: '/local-movers/washington/thurston',
    title: 'Compared with Thurston County',
    intro:
      'Lewis is I-5 mid-south corridor multi-story product — not Thurston continuous Olympia capital multi-family density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Thurston crews fight I-5 peaks into Olympia/Lacey. Lewis pairs ride I-5 and US-12 — freer mid-day further south, still peak-heavy on Centralia arterials and Chehalis corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Thurston mixes capital multi-story and Lacey multi-family. Lewis mixes Centralia multi-unit, Chehalis multi-story, and rural lots — more discontinuous corridor-town product, less continuous capital suburb density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; multi-family elevators appear on growth edges; rural lots add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Lewis quotes often sit at mid-south secondary rates for driveway SFH — multi-story access and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Lewis is I-5 mid-south corridor — not Olympia product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Lewis County different',
    intro: 'Corridor multi-story, I-5 freeflow, and rain staging — not interchangeable Olympia boilerplate.',
    bullets: [
      {
        title: 'I-5 freeflow is still billable',
        detail:
          'Lewis ↔ Thurston pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Centralia multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'Empty miles from Olympia yards are real',
        detail:
          'Even “local” Lewis pairs can price as distance work for Thurston-based crews.',
      },
      {
        title: 'Rain staging rewrites open-carry plans',
        detail:
          'Protect cardboard and plan covered unload windows.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Lewis zones: Centralia multi-story, Chehalis multi-unit, Napavine edges & rural lots',
  zonesIntro: 'Two to four sharp products — multi-story seat, multi-unit twin town, corridor edges, and rural lots.',
  zones: [
    {
      id: 'centralia',
      name: 'Centralia multi-story & multi-unit',
      shortName: 'Centralia',
      neighborhoods: ["Centralia","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-5 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["centralia"],
    },
    {
      id: 'chehalis',
      name: 'Chehalis multi-unit & seat stock',
      shortName: 'Chehalis',
      neighborhoods: ["Chehalis","seat multi-family"],
      housingTypes: 'Multi-unit, multi-story, older SFH',
      challenges: ["Stairs","Street parking","Mixed curb"],
      moverTips: 'Inventory access type; prefer mid-week mornings.',
      cityKeywords: ["chehalis"],
    },
    {
      id: 'napavine',
      name: 'Napavine / I-5 corridor edges',
      shortName: 'Napavine',
      neighborhoods: ["Napavine","I-5 multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["I-5 freeflow","Empty miles"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["napavine"],
    },
    {
      id: 'rural-lots',
      name: 'Eastern rural lots',
      shortName: 'Rural lots',
      neighborhoods: ["rural tracts","eastern approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Rain staging"],
      moverTips: 'Survey approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["east lewis"],
    }
  ],
  specialized: [
    {
      id: 'i5-midsouth',
      title: 'I-5 mid-south freeflow',
      intro: 'South pairs still peak hard toward Thurston.',
      bullets: ["Price portal-to-portal honestly.","Clarify Olympia second addresses early."],
    },
    {
      id: 'centralia-seat',
      title: 'Centralia multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'rain-staging',
      title: 'Rain staging module',
      intro: 'Open carries need weather-aware plans.',
      bullets: ["Protect cardboard and electronics.","Prefer mid-week mornings over saturated weekends when possible."],
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
        intro: 'Lewis families compare Centralia, Chehalis, Napavine, and related district feeders — verify address boundaries; do not assume Thurston maps apply.',
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
            detail: 'Providence Centralia and regional specialty spillover serve the county; map peak I-5 times for ER access.',
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
    intro: 'Multi-story access, I-5 freeflow, and empty miles from Olympia yards often matter more than raw miles.',
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
    intro: 'School years, rain seasons, and winter ice reshape demand by pocket.',
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
        label: 'Thurston County movers (parent contrast)',
        href: '/local-movers/washington/thurston',
      },

    ],
  },
});
