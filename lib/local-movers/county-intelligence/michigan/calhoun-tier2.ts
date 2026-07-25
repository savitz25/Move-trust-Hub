import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** calhoun — MI Tier 2 Wave 1 */
export const calhounCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'calhoun',
  hubTitle: 'Calhoun County Moving Intelligence Hub',
  eyebrow: 'Calhoun · Battle Creek · cereal city / I-94 · vs Kalamazoo',
  h1: 'Moving in Calhoun County: Battle Creek Hub, I-94 Industrial Corridors & South-Central Access',
  heroOpener: 'Calhoun County is the I-94 industrial/residential hub around Battle Creek — multi-story and seat stock, township SFH, manufacturing freeflow, and product that is not Kalamazoo’s continuous campus multi-unit density. Expect longer empty miles into Kalamazoo and Jackson, industrial-shift timing, and freeflow that still peaks hard on I-94. This guide is for people moving in Calhoun as Battle Creek / I-94 product — not a Kalamazoo rename.',
  heroCredibility: 'I-94 industrial/residential · Battle Creek hub · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-94 · I-69 · M-66 · M-37 · Capital Ave corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Kalamazoo County (and independent I-94 mid-corridor patterns)',
    parentHref: '/local-movers/michigan/kalamazoo',
    title: 'Compared with Kalamazoo County (and independent I-94 mid-corridor patterns)',
    intro: 'Calhoun is Battle Creek I-94 industrial/residential product — not Kalamazoo campus multi-unit density and not Detroit collar defaults.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Kalamazoo crews fight US-131/I-94 campus peaks. Calhoun pairs ride I-94 further east, I-69, and Battle Creek arterials — freer mid-day mid-corridor freeflow, still peak-heavy on industrial and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Kalamazoo mixes campus multi-family and Portage HOAs. Calhoun mixes Battle Creek multi-story, township SFH, and industrial-edge homes — more continuous secondary hub product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; industrial freeflow timing rewrites some residential pairs more often than pure Portage cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Calhoun quotes often sit at secondary I-94 rates for driveway SFH — city access and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Calhoun is Battle Creek I-94 hub — not Kalamazoo renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Calhoun County different',
    intro: 'I-94 freeflow, Battle Creek multi-story, and industrial timing — not a Kalamazoo clone.',
    bullets: [
      {
        title: 'I-94 freeflow is billable',
        detail: 'Battle Creek ↔ Kalamazoo pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Industrial freeflow rewrites timing',
        detail: 'Shift windows choke some residential pairs near industrial edges.',
      },
      {
        title: 'Distinct from Kalamazoo university product',
        detail: 'Do not recycle WMU multi-family-only playbooks for industrial-edge days.',
      },
      {
        title: 'City multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure township SFH playbooks.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Calhoun zones: Battle Creek core, township growth, I-94 corridors & rural edges',
  zonesIntro: 'Two to four sharp products under one I-94 hub label.',
  zones: [
    {
      id: 'battle-creek',
      name: 'Battle Creek multi-story & seat',
      shortName: 'Battle Creek',
      neighborhoods: ["Battle Creek","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["battle creek"],
    },
    {
      id: 'townships',
      name: 'Township SFH growth',
      shortName: 'Township growth',
      neighborhoods: ["growth townships"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Empty miles"],
      moverTips: 'Collect COI early; photo last-mile on new streets.',
      cityKeywords: ["calhoun townships"],
    },
    {
      id: 'i94',
      name: 'I-94 corridor residential',
      shortName: 'I-94 corridors',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, multi-family pockets',
      challenges: ["I-94 peaks","Shift timing"],
      moverTips: 'Price portal-to-portal; avoid peak industrial windows when possible.',
      cityKeywords: ["calhoun i-94"],
    },
    {
      id: 'rural',
      name: 'Rural edges & larger lots',
      shortName: 'Rural edges',
      neighborhoods: ["outer townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["calhoun rural"],
    }
  ],
  specialized: [
    {
      id: 'i94-hub',
      title: 'I-94 industrial freeflow',
      intro: 'Shift and commute peaks rewrite pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Kalamazoo multi-family rates for rural township lots."],
    },
    {
      id: 'bc-city',
      title: 'Battle Creek multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'vs-kzoo',
      title: 'Distinct from Kalamazoo university product',
      intro: 'Industrial hub differs from campus density.',
      bullets: ["Do not recycle WMU lease-wave-only playbooks.","City multi-story + industrial freeflow is the differentiator."],
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
        intro: 'Calhoun families compare Battle Creek and township districts — verify boundaries; do not assume Kalamazoo maps apply.',
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
            detail: 'Bronson Battle Creek and regional systems serve the hub; map peak freeflow on I-94 corridors.',
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
    intro: 'Empty miles, city access, and industrial peaks often matter more than raw miles.',
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
    intro: 'School years and manufacturing calendars reshape demand more than pure campus term peaks alone.',
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
      { label: 'Kalamazoo County (and independent I-94 mid-corridor patterns) movers (parent contrast)', href: '/local-movers/michigan/kalamazoo' },
    ],
  },
});
