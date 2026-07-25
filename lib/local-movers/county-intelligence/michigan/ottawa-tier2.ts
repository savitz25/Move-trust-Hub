import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** ottawa — MI Tier 2 Wave 1 */
export const ottawaCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'ottawa',
  hubTitle: 'Ottawa County Moving Intelligence Hub',
  eyebrow: 'Ottawa · Holland / Hudsonville / Zeeland · GR west lakeshore · vs Kent',
  h1: 'Moving in Ottawa County: Holland, Hudsonville & US-31 West Lakeshore Collar',
  heroOpener: 'Ottawa County is Grand Rapids’ west lakeshore collar — Holland multi-story and tourism stock, Hudsonville and Zeeland growth HOAs, Grand Haven shore approaches, and freeflow that is not Kent’s downtown elevators or Heritage Hill stairs. Expect lakeshore staging, furniture/manufacturing calendars, and portal-to-portal time that map miles understate. This guide is for people moving in Ottawa as west-lakeshore collar product — not a Grand Rapids rename and not a Muskegon port clone.',
  heroCredibility: 'West lakeshore · Furniture/manufacturing collar · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-96 · US-31 · M-6 links · M-45 · lakeshore corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Kent County',
    parentHref: '/local-movers/michigan/kent',
    title: 'Compared with Kent County',
    intro: 'Ottawa is Holland / Hudsonville lakeshore and west-collar growth — not Grand Rapids core multi-unit density and not Muskegon port product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Kent crews fight downtown GR and US-131 peaks. Ottawa pairs ride US-31, I-196/I-96 links, and lakeshore arterials — freer mid-day west of the core, still peak-heavy on tourism weekends and commute windows into GR.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Kent mixes Heritage Hill multi-story and south-belt multi-family. Ottawa mixes Holland multi-story, Zeeland/Hudsonville planned SFH, and shore cottages — more continuous lakeshore and furniture-town product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets dominate growth villages; shore streets can tighten truck size more often than pure Cascade cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Ottawa quotes often sit at west-collar rates for driveway SFH — tourism peaks and empty miles into GR still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Ottawa is GR west lakeshore collar — not Kent core renamed and not Muskegon north-port product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Ottawa County different',
    intro: 'US-31 freeflow, lakeshore staging, and furniture-town calendars — not a GR core clone.',
    bullets: [
      {
        title: 'US-31 / lakeshore freeflow is billable',
        detail: 'Holland ↔ GR pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Tourism weekends rewrite shore access',
        detail: 'Summer and festival windows tighten curb plans on lakeshore stock.',
      },
      {
        title: 'Distinct from Muskegon north lakeshore',
        detail: 'Holland/Zeeland furniture-collar product is not Muskegon port multi-story alone.',
      },
      {
        title: 'HOA growth dominates Hudsonville/Zeeland volume',
        detail: 'COI and gate lists are standard on planned villages.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Ottawa zones: Holland core, Hudsonville–Zeeland growth, Grand Haven shore & rural east',
  zonesIntro: 'Two to four sharp products under one west-lakeshore collar label.',
  zones: [
    {
      id: 'holland',
      name: 'Holland multi-story & tourism stock',
      shortName: 'Holland',
      neighborhoods: ["Holland","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, SFH',
      challenges: ["Stairs","Tourism parking","Street width"],
      moverTips: 'Inventory stairs; book around festival peaks when flexible.',
      cityKeywords: ["holland"],
    },
    {
      id: 'hudsonville-zeeland',
      name: 'Hudsonville / Zeeland HOA growth',
      shortName: 'Hudsonville–Zeeland',
      neighborhoods: ["Hudsonville","Zeeland","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Cul-de-sac staging"],
      moverTips: 'Collect COI early; weekday windows often beat Saturdays.',
      cityKeywords: ["hudsonville","zeeland"],
    },
    {
      id: 'grand-haven',
      name: 'Grand Haven lakeshore edge',
      shortName: 'Grand Haven',
      neighborhoods: ["Grand Haven","shore approaches"],
      housingTypes: 'SFH, seasonal stock',
      challenges: ["Last-mile width","Tourism peaks"],
      moverTips: 'Photo approaches; plan smaller trucks near shore streets.',
      cityKeywords: ["grand haven"],
    },
    {
      id: 'east-collar',
      name: 'East collar toward GR',
      shortName: 'East collar',
      neighborhoods: ["Jenison edges","eastern townships"],
      housingTypes: 'SFH, multi-family pockets',
      challenges: ["Commute peaks","HOA packets"],
      moverTips: 'Price portal-to-portal toward Kent destinations.',
      cityKeywords: ["jenison"],
    }
  ],
  specialized: [
    {
      id: 'lakeshore',
      title: 'Lakeshore tourism & staging logistics',
      intro: 'Seasonal peaks rewrite curb plans.',
      bullets: ["Book early for summer weekends.","Photo shore last-mile before final quote."],
    },
    {
      id: 'hoa-growth',
      title: 'Hudsonville / Zeeland HOA growth',
      intro: 'Master-plan rules are first-class cost drivers.',
      bullets: ["Gate lists early.","Mud weeks on new streets need flexibility."],
    },
    {
      id: 'vs-kent-muskegon',
      title: 'Distinct from Kent core and Muskegon port',
      intro: 'West collar differs from GR elevators and north-port product.',
      bullets: ["Do not recycle downtown GR or Muskegon-only playbooks.","Holland/Zeeland lakeshore mix is the differentiator."],
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
        intro: 'Ottawa families compare Holland, Zeeland, Hudsonville, Grand Haven, and other districts — verify boundaries; do not assume Grand Rapids Public maps apply.',
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
            detail: 'Holland Hospital and west-Michigan regional systems serve the collar; map peak freeflow on US-31 corridors.',
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
    intro: 'Tourism peaks, HOA soft costs, and empty miles into GR often matter more than raw miles.',
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
    intro: 'Summer lakeshore demand and school years reshape calendars more than pure GR office peaks alone.',
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
      { label: 'Kent County movers (parent contrast)', href: '/local-movers/michigan/kent' },
    ],
  },
});
