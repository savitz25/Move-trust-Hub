import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** douglas — GA Tier 2 Wave 1 */
export const douglasCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'douglas',
  hubTitle: 'Douglas County Moving Intelligence Hub',
  eyebrow: 'Douglas · West Atlanta · Douglasville · vs Cobb',
  h1: 'Moving in Douglas County: Douglasville, I-20 West Corridor & West-Metro Suburbs',
  heroOpener: 'Douglas County is west Atlanta’s I-20 corridor market — Douglasville seat density, west-metro HOA and SFH growth, and freeflow that is not Cobb’s I-75/Cumberland multi-family core. Expect longer empty miles from intown staging, I-20 peak clocks, and residential product that sits west of the Perimeter without Cobb’s continuous northwest density. This guide is for people moving in Douglas as west-metro I-20 product — not a Cobb rename.',
  heroCredibility: 'I-20 west corridor · West-metro suburbs · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · GA-5 · GA-92 · US-78 · Chapel Hill Road corridors',
  parentCompare: {
    parentLabel: 'Cobb County (and Fulton west patterns)',
    parentHref: '/local-movers/georgia/cobb',
    title: 'Compared with Cobb County (and Fulton west patterns)',
    intro: 'Douglas is I-20 west Douglasville product — not Cobb Marietta/Cumberland multi-family density and not Fulton intown elevators alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Cobb crews fight I-75 and East-West Connector peaks. Douglas pairs ride I-20 west, GA-5, and west arterials — freer mid-day further west, still peak-heavy on Douglasville commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Cobb mixes East Cobb estates and Smyrna multi-family. Douglas mixes Douglasville SFH, west HOA villages, and longer-lot edges — more continuous west-corridor suburban product, less continuous Cumberland multi-unit density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets appear on growth villages; older Douglasville stock can add street-width constraints uncommon on pure cul-de-sac East Cobb days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Douglas quotes often sit at west-collar suburban rates for driveway SFH — empty miles from intown staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Douglas is west-metro I-20 Douglasville product — not Cobb northwest rename.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Douglas County different',
    intro: 'I-20 west freeflow, west-metro HOAs, and empty miles — not a Cobb clone.',
    bullets: [
      {
        title: 'I-20 west freeflow is billable',
        detail: 'Douglasville ↔ intown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'West-metro HOA growth is first-class',
        detail: 'COI and gate lists on new villages are standard.',
      },
      {
        title: 'Distinct from Paulding US-278 growth',
        detail: 'Douglas is I-20 west seat density — not Hiram/Dallas northwest growth alone.',
      },
      {
        title: 'Empty miles from Perimeter staging matter',
        detail: 'Do not quote pure Cobb local rates for west-corridor deadhead.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Douglas zones: Douglasville seat, I-20 growth villages, west edges & rural pockets',
  zonesIntro: 'Two to four sharp products under one I-20 west-collar label.',
  zones: [
    {
      id: 'douglasville',
      name: 'Douglasville seat & core',
      shortName: 'Douglasville',
      neighborhoods: ["Douglasville","seat neighborhoods"],
      housingTypes: 'SFH, multi-story older stock, townhomes',
      challenges: ["Street width","Arterial timing"],
      moverTips: 'Inventory older multi-story; plan temporary no-parking where needed.',
      cityKeywords: ["douglasville"],
    },
    {
      id: 'i20-growth',
      name: 'I-20 corridor growth villages',
      shortName: 'I-20 growth',
      neighborhoods: ["growth HOAs","corridor villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","I-20 peaks"],
      moverTips: 'Collect COI early; avoid peak I-20 windows when possible.',
      cityKeywords: ["douglas growth"],
    },
    {
      id: 'west-edges',
      name: 'West Douglas edges',
      shortName: 'West edges',
      neighborhoods: ["western neighborhoods","larger lots"],
      housingTypes: 'SFH, longer approaches',
      challenges: ["Empty miles"],
      moverTips: 'Photo last-mile; price empty miles honestly.',
      cityKeywords: ["douglas west"],
    },
    {
      id: 'rural',
      name: 'Rural-edge pockets',
      shortName: 'Rural edge',
      neighborhoods: ["southern/western rural towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Soft shoulders","Empty miles"],
      moverTips: 'Photo approaches after rain.',
      cityKeywords: ["douglas rural"],
    }
  ],
  specialized: [
    {
      id: 'i20-west',
      title: 'I-20 west corridor freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Cobb Cumberland rates for Douglasville driveways."],
    },
    {
      id: 'west-hoa',
      title: 'West-metro HOA growth',
      intro: 'Planned villages treat COI as default.',
      bullets: ["Gate lists early.","Weekday windows often beat Saturdays."],
    },
    {
      id: 'seat-access',
      title: 'Douglasville seat access',
      intro: 'Older stock needs stair inventories.',
      bullets: ["Confirm street width.","Temporary no-parking often beats long carries."],
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
        intro: 'Douglas families compare Douglas County Schools feeders across Douglasville and growth villages — verify boundaries; do not assume Cobb maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university/military markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Wellstar Douglas Hospital and regional clinics anchor acute care; map peak freeflow on I-20 west corridors.',
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
    intro: 'I-20 peaks, empty miles, and HOA soft costs often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than northwest Cobb corporate peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, PCS, or school windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Cobb County (and Fulton west patterns) movers (parent contrast)', href: '/local-movers/georgia/cobb' },
    ],
  },
});
