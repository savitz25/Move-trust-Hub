import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * alamance — NC Tier 2 Wave 1
 */
export const alamanceCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'alamance',
  hubTitle: 'Alamance County Moving Intelligence Hub',
  eyebrow: 'Alamance · Burlington / Mebane — between Triangle and Triad',
  h1: 'Moving in Alamance County: Burlington, Mebane & I-40/I-85 Mid-Corridor Access',
  heroOpener:
    'Alamance County is the I-40/I-85 mid-corridor between Triangle and Triad — Burlington multi-story and industrial-residential stock, Mebane growth HOAs, Graham and Elon edges, and freeflow that is not Greensboro core or Chapel Hill campus product with different labels. Expect manufacturing-adjacent residential, mid-corridor empty miles, and mixed mill-town fabric under one county. This guide is for people moving in Alamance as mid-corridor secondary — not a Guilford or Orange rename.',
  heroCredibility:
    'Triangle–Triad mid-corridor · Burlington / Mebane · I-40/I-85 · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · I-85 · US-70 · NC-49 · NC-54 · NC-87',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Guilford County',
    parentHref: '/local-movers/north-carolina/guilford',
    title: 'Compared with Guilford County',
    intro:
      'Alamance is I-40/I-85 mid-corridor manufacturing + residential — not Guilford Greensboro core and not Orange university-town density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Guilford crews fight Greensboro arterials and I-40 peaks. Alamance pairs ride I-40/I-85, US-70, and NC-49 — freer mid-day between metros, still peak-heavy on Burlington arterials and Mebane commute windows toward Triangle or Triad.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Guilford mixes Greensboro multi-story and High Point edges. Alamance mixes Burlington multi-unit, Mebane HOA growth, and mill-era stock — more mid-corridor secondary product, less continuous Triad core density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; growth HOAs add packets; industrial-adjacent streets rewrite truck type.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Alamance quotes often sit at mid-corridor secondary rates for driveway SFH — multi-story access and long empty-mile pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Alamance is Triangle–Triad mid-corridor — not Guilford or Orange product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Alamance County different',
    intro: 'Mid-corridor freeflow, mill-town multi-story, and Mebane growth — not interchangeable Triad or Triangle boilerplate.',
    bullets: [
      {
        title: 'I-40/I-85 freeflow is still billable',
        detail:
          'Alamance pairs freer mid-day still peak hard toward either metro. Ask portal-to-portal.',
      },
      {
        title: 'Burlington multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from Mebane cul-de-sacs.',
      },
      {
        title: 'Mebane HOA growth is the east-edge product',
        detail:
          'Gate lists and approved hours are standard survey inputs.',
      },
      {
        title: 'Manufacturing calendars reshape some corridors',
        detail:
          'Shift patterns and industrial arterials rewrite pure Saturday residential assumptions.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Alamance zones: Burlington seat, Mebane growth, Graham/Elon corridor & rural edges',
  zonesIntro: 'Two to four sharp products — seat multi-story, growth HOAs, corridor towns, and rural edges.',
  zones: [
    {
      id: 'burlington',
      name: 'Burlington multi-story & industrial-residential',
      shortName: 'Burlington',
      neighborhoods: ["Burlington","downtown edges","mill-adjacent stock"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-40 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["burlington"],
    },
    {
      id: 'mebane',
      name: 'Mebane HOA & multi-family growth',
      shortName: 'Mebane',
      neighborhoods: ["Mebane","growth villages","east edges"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","I-40/I-85 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build corridor buffers.',
      cityKeywords: ["mebane"],
    },
    {
      id: 'graham-elon',
      name: 'Graham / Elon corridor',
      shortName: 'Graham / Elon',
      neighborhoods: ["Graham","Elon","university edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Arterial timing","Term calendars"],
      moverTips: 'Prefer early starts; book around term windows when near campus.',
      cityKeywords: ["graham","elon"],
    },
    {
      id: 'rural-edge',
      name: 'Southern & western rural edges',
      shortName: 'Rural edge',
      neighborhoods: ["southern tracts","western lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; prefer early starts for long pairs.',
      cityKeywords: ["south alamance","west alamance"],
    }
  ],
  specialized: [
    {
      id: 'i40-mid',
      title: 'I-40/I-85 mid-corridor freeflow',
      intro: 'Between-metro pairs still peak hard toward Triangle or Triad.',
      bullets: ["Price portal-to-portal honestly.","Clarify Guilford or Orange second addresses early."],
    },
    {
      id: 'mebane-growth',
      title: 'Mebane growth HOA module',
      intro: 'East-edge planned density is the growth product.',
      bullets: ["Collect COI and gate lists early.","Do not quote Greensboro elevator rates for driveway SFH."],
    },
    {
      id: 'burlington-seat',
      title: 'Burlington multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
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
        intro: 'Alamance families compare Alamance-Burlington School System and related feeders across Burlington, Mebane, Graham, and Elon — verify address boundaries.',
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
            detail: 'Cone Health Alamance Regional and regional specialty spillover serve the county; map peak I-40/I-85 times for ER access.',
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
    intro: 'Mid-corridor freeflow, multi-story access, and HOA soft costs often matter more than raw miles.',
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
    intro: 'School years, manufacturing shift patterns, and university-adjacent calendars reshape demand by pocket.',
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
        label: 'Guilford County movers (parent contrast)',
        href: '/local-movers/north-carolina/guilford',
      },
      {
        label: 'Orange County movers',
        href: '/local-movers/north-carolina/orange',
      },
    ],
  },
});
