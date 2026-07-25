import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** muskegon — MI Tier 2 Wave 1 */
export const muskegonCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'muskegon',
  hubTitle: 'Muskegon County Moving Intelligence Hub',
  eyebrow: 'Muskegon · west lakeshore north of Ottawa · vs Ottawa',
  h1: 'Moving in Muskegon County: Muskegon Port, Lakeshore Stock & US-31 North Access',
  heroOpener: 'Muskegon County is west Michigan’s port and lakeshore market north of Ottawa — Muskegon multi-story and industrial-edge stock, Norton Shores and lakeshore approaches, US-31 freeflow, and product that is not Holland/Zeeland furniture-collar growth alone and not Grand Rapids core elevators. Expect port freeflow timing, shore last-mile, and longer empty miles into Ottawa and Kent. This guide is for people moving in Muskegon as north-lakeshore / port product — not an Ottawa or Kent rename.',
  heroCredibility: 'Port / lakeshore · US-31 north · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-31 · I-96 links · M-46 · M-120 · lakeshore corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Ottawa County (and Kent west-MI patterns)',
    parentHref: '/local-movers/michigan/ottawa',
    title: 'Compared with Ottawa County (and Kent west-MI patterns)',
    intro: 'Muskegon is port/lakeshore north product — not Holland/Zeeland furniture-collar growth and not Grand Rapids core multi-unit density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Ottawa crews fight US-31 Holland tourism peaks. Muskegon pairs ride US-31 further north, M-46, and port arterials — freer mid-day off Holland festival choke points, still peak-heavy on industrial and shore windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Ottawa mixes continuous Hudsonville HOAs. Muskegon mixes port multi-story, Norton Shores SFH, and shore stock — more continuous port/industrial-edge product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; shore streets tighten truck size more often than pure Zeeland cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Muskegon quotes often sit at secondary lakeshore rates for driveway SFH — port freeflow and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Muskegon is north lakeshore port product — not Ottawa renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Muskegon County different',
    intro: 'Port freeflow, lakeshore last-mile, and US-31 north peaks — not a Holland clone.',
    bullets: [
      {
        title: 'US-31 freeflow is billable',
        detail: 'Muskegon ↔ Holland pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Ottawa furniture-collar product',
        detail: 'Port multi-story is not Hudsonville HOA growth alone.',
      },
      {
        title: 'Shore last-mile rewrites truck size',
        detail: 'Photo approaches; many streets reject full trailers.',
      },
      {
        title: 'Industrial freeflow can rewrite timing',
        detail: 'Shift windows choke some residential pairs near port edges.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Muskegon zones: city/port core, Norton Shores, lakeshore edges & inland townships',
  zonesIntro: 'Two to four sharp products under one north-lakeshore label.',
  zones: [
    {
      id: 'muskegon-city',
      name: 'Muskegon multi-story & port edge',
      shortName: 'Muskegon city',
      neighborhoods: ["Muskegon","port approaches"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Shift timing"],
      moverTips: 'Inventory stairs; avoid peak industrial windows when possible.',
      cityKeywords: ["muskegon"],
    },
    {
      id: 'norton-shores',
      name: 'Norton Shores SFH belts',
      shortName: 'Norton Shores',
      neighborhoods: ["Norton Shores"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Arterial timing"],
      moverTips: 'Confirm driveway and HOA hours.',
      cityKeywords: ["norton shores"],
    },
    {
      id: 'lakeshore',
      name: 'Lakeshore edges',
      shortName: 'Lakeshore',
      neighborhoods: ["shore towns","beach approaches"],
      housingTypes: 'SFH, seasonal stock',
      challenges: ["Last-mile width","Tourism peaks"],
      moverTips: 'Photo approaches; plan smaller trucks near shore streets.',
      cityKeywords: ["muskegon lakeshore"],
    },
    {
      id: 'inland',
      name: 'Inland townships',
      shortName: 'Inland townships',
      neighborhoods: ["eastern townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["muskegon inland"],
    }
  ],
  specialized: [
    {
      id: 'port',
      title: 'Port / industrial freeflow logistics',
      intro: 'Shift windows rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Avoid peak industrial windows when possible."],
    },
    {
      id: 'lakeshore',
      title: 'Lakeshore last-mile access',
      intro: 'Street width rewrites truck size.',
      bullets: ["Photo approaches before final quote.","Tourism peaks tighten curb plans."],
    },
    {
      id: 'vs-ottawa',
      title: 'Distinct from Ottawa Holland/Zeeland product',
      intro: 'North port lakeshore differs from furniture-collar growth.',
      bullets: ["Do not recycle Hudsonville HOA-only playbooks.","Port multi-story + shore mix is the differentiator."],
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
        intro: 'Muskegon families compare Muskegon Public, Norton Shores, and other districts — verify boundaries; do not assume Ottawa or Kent maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Michigan DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, tourism, and manufacturing markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Trinity Health and regional west-Michigan systems serve the market; map peak freeflow on US-31 corridors.',
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
    intro: 'Port freeflow, shore last-mile, and empty miles often matter more than raw miles.',
    drivers: [
      { title: 'Corridor freeflow', detail: 'Peak windows inflate hourly bills on short-looking pairs.' },
      { title: 'Access soft costs', detail: 'HOA packets, stairs, or last-mile shuttles add labor hours.' },
      { title: 'Long empty-mile edges', detail: 'Far pockets price differently from seat cores.' },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$120–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Tourism summers and industrial calendars reshape demand more than pure GR office peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Winter access', detail: 'Ice and lake-effect windows rewrite morning plans on many collars.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Ottawa County (and Kent west-MI patterns) movers (parent contrast)', href: '/local-movers/michigan/ottawa' },
    ],
  },
});
