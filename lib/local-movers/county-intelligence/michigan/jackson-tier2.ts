import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** jackson — MI Tier 2 Wave 1 */
export const jacksonCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'jackson',
  hubTitle: 'Jackson County Moving Intelligence Hub',
  eyebrow: 'Jackson · south-central independent · I-94 · vs Washtenaw',
  h1: 'Moving in Jackson County: Jackson Hub, I-94 Mid-Corridor & South-Central Access',
  heroOpener: 'Jackson County is south-central Michigan’s independent mid-corridor hub — Jackson multi-story and seat stock, township SFH, I-94 freeflow between Ann Arbor and Battle Creek, and product that is not Washtenaw’s continuous campus multi-unit density. Expect longer empty miles into university markets, industrial freeflow timing, and freeflow that still peaks hard on I-94. This guide is for people moving in Jackson as I-94 mid-corridor product — not an Ann Arbor rename.',
  heroCredibility: 'I-94 mid-corridor · Independent hub · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-94 · US-127 · M-50 · M-60 · Michigan Ave corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Washtenaw County (and independent south-central patterns)',
    parentHref: '/local-movers/michigan/washtenaw',
    title: 'Compared with Washtenaw County (and independent south-central patterns)',
    intro: 'Jackson is I-94 mid-corridor independent hub product — not Ann Arbor campus multi-unit density and not Detroit collar defaults.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Washtenaw crews fight US-23/I-94 campus peaks. Jackson pairs ride I-94 further west, US-127, and Jackson arterials — freer mid-day mid-corridor freeflow, still peak-heavy on school and industrial windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Washtenaw mixes campus multi-family and township HOAs. Jackson mixes city multi-story, township SFH, and industrial-edge homes — more continuous secondary hub product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; township approaches add empty miles uncommon on pure Pittsfield cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Jackson quotes often sit at secondary mid-corridor rates for driveway SFH — city access and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Jackson is independent I-94 mid-corridor hub — not Washtenaw renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Jackson County different',
    intro: 'I-94 freeflow, Jackson multi-story, and mid-corridor empty miles — not an Ann Arbor clone.',
    bullets: [
      {
        title: 'I-94 freeflow is billable',
        detail: 'Jackson ↔ Ann Arbor pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Jackson multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Distinct from Washtenaw university density',
        detail: 'Do not recycle campus multi-family-only playbooks for township SFH days.',
      },
      {
        title: 'Industrial freeflow can rewrite timing',
        detail: 'Shift windows choke some residential pairs near industrial edges.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Jackson zones: city core, township growth, I-94 corridors & rural edges',
  zonesIntro: 'Two to four sharp products under one mid-corridor hub label.',
  zones: [
    {
      id: 'jackson-city',
      name: 'Jackson multi-story & seat',
      shortName: 'Jackson city',
      neighborhoods: ["Jackson","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["jackson mi"],
    },
    {
      id: 'townships',
      name: 'Township SFH growth',
      shortName: 'Township growth',
      neighborhoods: ["growth townships"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Empty miles"],
      moverTips: 'Collect COI early; photo last-mile on new streets.',
      cityKeywords: ["jackson townships"],
    },
    {
      id: 'i94',
      name: 'I-94 corridor residential',
      shortName: 'I-94 corridors',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, multi-family pockets',
      challenges: ["I-94 peaks"],
      moverTips: 'Price portal-to-portal toward Ann Arbor and Battle Creek.',
      cityKeywords: ["jackson i-94"],
    },
    {
      id: 'rural',
      name: 'Rural edges & larger lots',
      shortName: 'Rural edges',
      neighborhoods: ["outer townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["jackson rural"],
    }
  ],
  specialized: [
    {
      id: 'i94-mid',
      title: 'I-94 mid-corridor freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Ann Arbor multi-family rates for rural township lots."],
    },
    {
      id: 'jackson-city',
      title: 'Jackson multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'vs-washtenaw',
      title: 'Distinct from Washtenaw university product',
      intro: 'Mid-corridor hub differs from campus density.',
      bullets: ["Do not recycle U-M lease-wave-only playbooks.","City multi-story + township SFH mix is the differentiator."],
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
        intro: 'Jackson families compare Jackson Public and township districts — verify boundaries; do not assume Ann Arbor maps apply.',
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
            detail: 'Henry Ford Jackson and regional systems serve the hub; map peak freeflow on I-94 corridors.',
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
    intro: 'Empty miles, city access, and I-94 peaks often matter more than raw miles.',
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
    intro: 'School years and industrial calendars reshape demand more than pure university term peaks alone.',
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
      { label: 'Washtenaw County (and independent south-central patterns) movers (parent contrast)', href: '/local-movers/michigan/washtenaw' },
    ],
  },
});
