import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * cowlitz â€” WA Tier 2 Wave 1
 */
export const cowlitzCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'cowlitz',
  hubTitle: 'Cowlitz County Moving Intelligence Hub',
  eyebrow: 'Cowlitz · Longview / Kelso — I-5 south industrial river towns',
  h1: 'Moving in Cowlitz County: Longview, Kelso & I-5 Industrial River Access',
  heroOpener:
    'Cowlitz County is I-5 southwest industrial river-town product — Longview multi-story and industrial-residential mix, Kelso multi-family and seat stock, Woodland edges, and freeflow that is not Clark County Vancouver multi-family with different labels. Expect mill/industrial calendars, rain staging, and longer empty miles under one county. This guide is for people moving in Cowlitz as industrial I-5 corridor — not a Vancouver WA rename.',
  heroCredibility:
    'I-5 industrial river towns · Longview / Kelso · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-5 · SR-4 · SR-411 · SR-432 · Ocean Beach Hwy corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Clark County',
    parentHref: '/local-movers/washington/clark',
    title: 'Compared with Clark County',
    intro:
      'Cowlitz is I-5 industrial river-town product — not Clark continuous Vancouver multi-family and Portland-bridge density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Clark crews fight I-5/I-205 peaks into Vancouver and Portland bridges. Cowlitz pairs ride I-5 and SR-4 — freer mid-day further north, still peak-heavy on Longview arterials and industrial shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Clark mixes Vancouver multi-family and Camas HOAs. Cowlitz mixes Longview multi-story, industrial-edge SFH, and Kelso multi-unit — more mill-town product, less continuous Portland-adjacent density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; industrial streets rewrite truck type; soft shoulders appear on rural edges.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cowlitz quotes often sit at southwest secondary rates for driveway SFH — multi-story access and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Cowlitz is industrial I-5 river-town corridor — not Vancouver WA product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Cowlitz County different',
    intro: 'Industrial calendars, Longview multi-story, and I-5 freeflow — not interchangeable Vancouver boilerplate.',
    bullets: [
      {
        title: 'I-5 freeflow is still billable',
        detail:
          'Cowlitz ↔ Clark pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Longview multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure Woodland cul-de-sacs.',
      },
      {
        title: 'Industrial calendars reshape mid-week demand',
        detail:
          'Shift patterns rewrite pure Saturday residential assumptions.',
      },
      {
        title: 'Oregon adjacency creates interstate legs on some pairs',
        detail:
          'OR addresses require FMCSA authority even on short-looking hops.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Cowlitz zones: Longview multi-story, Kelso multi-unit, Woodland edges & rural lots',
  zonesIntro: 'Two to four sharp products — industrial multi-story, multi-unit seat, corridor edges, and rural lots.',
  zones: [
    {
      id: 'longview',
      name: 'Longview multi-story & industrial-residential',
      shortName: 'Longview',
      neighborhoods: ["Longview","downtown edges","mill-adjacent stock"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-5 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["longview"],
    },
    {
      id: 'kelso',
      name: 'Kelso multi-unit & seat stock',
      shortName: 'Kelso',
      neighborhoods: ["Kelso","seat multi-family"],
      housingTypes: 'Multi-unit, multi-story, older SFH',
      challenges: ["Stairs","Street parking","Mixed curb"],
      moverTips: 'Inventory access type; prefer mid-week mornings.',
      cityKeywords: ["kelso"],
    },
    {
      id: 'woodland',
      name: 'Woodland / I-5 corridor edges',
      shortName: 'Woodland',
      neighborhoods: ["Woodland","I-5 multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["I-5 freeflow","Empty miles"],
      moverTips: 'Prefer early starts; clarify Clark second addresses.',
      cityKeywords: ["woodland wa"],
    },
    {
      id: 'rural-lots',
      name: 'Eastern rural lots',
      shortName: 'Rural lots',
      neighborhoods: ["rural tracts","eastern approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Rain staging"],
      moverTips: 'Survey approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["east cowlitz"],
    }
  ],
  specialized: [
    {
      id: 'industrial-i5',
      title: 'I-5 industrial river-town freeflow',
      intro: 'Southwest pairs still peak hard toward Clark.',
      bullets: ["Price portal-to-portal honestly.","Clarify Vancouver second addresses early."],
    },
    {
      id: 'longview-seat',
      title: 'Longview multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'mill-calendars',
      title: 'Mill / industrial calendar module',
      intro: 'Shift windows reshape mid-week demand.',
      bullets: ["Clarify hard report dates early.","Do not quote pure Camas HOA Saturday rates for industrial-edge jobs."],
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
        intro: 'Cowlitz families compare Longview, Kelso, Woodland, and related district feeders — verify address boundaries; do not assume Clark maps apply.',
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
            detail: 'PeaceHealth St. John and regional specialty spillover serve the county; map peak I-5 times for ER access.',
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
    intro: 'Multi-story access, I-5 freeflow, and industrial empty miles often matter more than raw miles.',
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
    intro: 'School years, industrial calendars, and rain staging reshape demand by pocket.',
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
        label: 'Clark County movers (parent contrast)',
        href: '/local-movers/washington/clark',
      },

    ],
  },
});
