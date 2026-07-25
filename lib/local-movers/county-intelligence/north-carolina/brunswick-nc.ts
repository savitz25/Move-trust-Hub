import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * brunswick — NC Tier 2 Wave 1
 */
export const brunswickCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'brunswick',
  hubTitle: 'Brunswick County Moving Intelligence Hub',
  eyebrow: 'Brunswick · Leland / Southport / Oak Island — Wilmington south collar',
  h1: 'Moving in Brunswick County: Leland, Southport & Wilmington-South Coastal Growth',
  heroOpener:
    'Brunswick County is Wilmington’s southern coastal collar — Leland multi-family and HOA growth, Southport multi-story and harbor edges, Oak Island and beach-community associations, and freeflow that is not downtown Wilmington historic streets with different labels. Expect coastal humidity, association truck limits, bridge timing, and tourism-plus-residential product under one county. This guide is for people moving in Brunswick as Wilmington south coastal collar — not a New Hanover rename.',
  heroCredibility:
    'Wilmington south coastal collar · Leland growth · Beach associations · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-17 · US-74/76 · NC-211 · NC-133 · NC-87 · beach-access roads',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'New Hanover County',
    parentHref: '/local-movers/north-carolina/new-hanover',
    title: 'Compared with New Hanover County',
    intro:
      'Brunswick is Wilmington south coastal growth collar — not New Hanover downtown historic density alone and not pure rural Coastal Plain freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'New Hanover crews fight I-40 terminus peaks and downtown curb friction. Brunswick pairs ride US-17, NC-211, and beach-access roads — freer mid-day south of Wilmington, still peak-heavy on Leland commute windows and bridge/tourism weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'New Hanover mixes historic multi-story and midtown multi-family. Brunswick mixes Leland HOA growth, Southport multi-story, and island association stock — more coastal collar and tourism-residential product, less continuous downtown Wilmington density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Beach associations often limit truck size; humidity protection matters; soft sand and bridge timing rewrite staging.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Brunswick quotes often track coastal secondary-premium rates when associations require shuttles — clean Leland driveway SFH can price lower than island last-mile jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Brunswick is Wilmington south coastal collar — not New Hanover core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Brunswick County different',
    intro: 'Coastal growth HOAs, beach association last-mile, and US-17 freeflow — not interchangeable Wilmington downtown boilerplate.',
    bullets: [
      {
        title: 'Beach association access is first-class product',
        detail:
          'Truck limits, elevators, and humidity protection rewrite pure driveway rates.',
      },
      {
        title: 'Leland multi-family and HOA growth dominate inland volume',
        detail:
          'Gate lists and elevators need inventories different from island cottages.',
      },
      {
        title: 'Bridge and tourism peaks rewrite weekends',
        detail:
          'Southport and island approaches burn clock at peak season.',
      },
      {
        title: 'US-17 freeflow toward Wilmington is still billable',
        detail:
          'Brunswick ↔ New Hanover pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Brunswick zones: Leland growth, Southport harbor, Oak Island/beach edges & western lots',
  zonesIntro: 'Two to four sharp products — inland growth, harbor multi-story, beach associations, and western lots.',
  zones: [
    {
      id: 'leland-growth',
      name: 'Leland multi-family & HOA growth',
      shortName: 'Leland',
      neighborhoods: ["Leland","growth villages","US-17 multi-family"],
      housingTypes: 'HOA SFH, multi-family, townhomes',
      challenges: ["HOA packets","US-17 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build US-17 buffer for New Hanover pairs.',
      cityKeywords: ["leland"],
    },
    {
      id: 'southport',
      name: 'Southport multi-story & harbor edges',
      shortName: 'Southport',
      neighborhoods: ["Southport","harbor edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Tourism parking","Narrow streets"],
      moverTips: 'Inventory stairs; avoid peak tourism weekends when possible.',
      cityKeywords: ["southport"],
    },
    {
      id: 'oak-island',
      name: 'Oak Island / beach association edges',
      shortName: 'Beach edges',
      neighborhoods: ["Oak Island","Holden Beach edges","association communities"],
      housingTypes: 'Association SFH, elevators, cottages',
      challenges: ["Truck limits","Humidity","Bridge timing"],
      moverTips: 'Confirm association truck rules; protect loads from humidity.',
      cityKeywords: ["oak island","holden beach"],
    },
    {
      id: 'west-lots',
      name: 'Western Brunswick larger lots',
      shortName: 'West lots',
      neighborhoods: ["Supply edges","Bolivia edges","western tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["supply","bolivia"],
    }
  ],
  specialized: [
    {
      id: 'coastal-collar',
      title: 'Wilmington-south coastal growth module',
      intro: 'Leland densification is the inland collar product.',
      bullets: ["Collect HOA packets before the estimate is final.","Price US-17 portal-to-portal time to New Hanover honestly."],
    },
    {
      id: 'beach-assoc',
      title: 'Beach association last-mile',
      intro: 'Island truck limits rewrite full-trailer assumptions.',
      bullets: ["Confirm size limits and elevator rules early.","Build bridge and tourism peak buffers."],
    },
    {
      id: 'humidity-storm',
      title: 'Coastal humidity & storm staging',
      intro: 'Weather is a first-class logistics input.',
      bullets: ["Protect cardboard and electronics.","Confirm contingency language for storm windows."],
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
        intro: 'Brunswick families compare Brunswick County Schools feeders across Leland, Southport, and beach communities — verify address boundaries; do not assume New Hanover maps apply.',
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
            detail: 'Novant Health Brunswick Medical Center and Wilmington specialty spillover serve the county; map peak US-17 and bridge times for ER access.',
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
    intro: 'Association last-mile, HOA soft costs, and US-17 freeflow often matter more than raw miles.',
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
    intro: 'Tourism summers, school years, hurricane season, and humidity reshape demand by pocket.',
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
        label: 'New Hanover County movers (parent contrast)',
        href: '/local-movers/north-carolina/new-hanover',
      },

    ],
  },
});
