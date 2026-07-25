import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** paulding — GA Tier 2 Wave 1 */
export const pauldingCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'paulding',
  hubTitle: 'Paulding County Moving Intelligence Hub',
  eyebrow: 'Paulding · West Atlanta · Hiram / Dallas · vs Cobb',
  h1: 'Moving in Paulding County: Hiram, Dallas & US-278 West-Northwest Growth',
  heroOpener: 'Paulding County is west-northwest Atlanta’s outer growth collar — Hiram retail corridors, Dallas seat density, US-278 freeflow, and longer empty miles that are not Cobb’s continuous Marietta multi-family core. Expect HOA growth villages, school-calendar SFH volume, and portal times that map miles understate. This guide is for people moving in Paulding as west-northwest growth — not a Cobb rename.',
  heroCredibility: 'US-278 west-northwest growth · Outer collar HOAs · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-278 · GA-61 · GA-92 · GA-120 approaches · I-20 (south approaches)',
  parentCompare: {
    parentLabel: 'Cobb County',
    parentHref: '/local-movers/georgia/cobb',
    title: 'Compared with Cobb County',
    intro: 'Paulding is Hiram / Dallas west-northwest outer growth — not Cobb East Cobb estates or Cumberland multi-family alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Cobb crews fight I-75 and East-West Connector peaks. Paulding pairs ride US-278, GA-61, and outer arterials — freer mid-day further west-northwest, still peak-heavy on Hiram ↔ Dallas and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Cobb mixes dense northwest multi-family and East Cobb lots. Paulding mixes Hiram growth SFH, Dallas seat stock, and larger-lot edges — more continuous outer-collar HOA product, less continuous Cumberland elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Growth HOAs need COI packets; rural-edge approaches add empty miles uncommon on pure Marietta multi-family days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Paulding quotes often sit at outer west-collar rates for driveway SFH — empty miles from Cobb staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Paulding is west-northwest outer growth on US-278 — not Cobb renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Paulding County different',
    intro: 'US-278 freeflow, outer HOA growth, and empty miles — not a Cobb clone.',
    bullets: [
      {
        title: 'US-278 freeflow is billable',
        detail: 'Hiram ↔ Dallas pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Outer-collar HOA growth is first-class',
        detail: 'COI and gate lists on new villages are standard.',
      },
      {
        title: 'Distinct from Douglas I-20 west',
        detail: 'Paulding is US-278 northwest growth — not Douglasville I-20 seat alone.',
      },
      {
        title: 'Empty miles from Cobb staging matter',
        detail: 'Do not quote pure Cobb local rates for Paulding deadhead.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Paulding zones: Dallas seat, Hiram corridors, growth villages & rural west',
  zonesIntro: 'Two to four sharp products under one west-northwest growth label.',
  zones: [
    {
      id: 'dallas',
      name: 'Dallas seat & core',
      shortName: 'Dallas',
      neighborhoods: ["Dallas","seat neighborhoods"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Arterial timing"],
      moverTips: 'Confirm driveway staging; price school peaks.',
      cityKeywords: ["dallas ga"],
    },
    {
      id: 'hiram',
      name: 'Hiram retail & growth corridors',
      shortName: 'Hiram',
      neighborhoods: ["Hiram","corridor villages"],
      housingTypes: 'SFH, townhomes, retail-adjacent',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Avoid peak retail windows; collect HOA rules on growth streets.',
      cityKeywords: ["hiram"],
    },
    {
      id: 'growth',
      name: 'West-northwest growth villages',
      shortName: 'Growth villages',
      neighborhoods: ["planned HOAs","new villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["Gate lists","Mud weeks"],
      moverTips: 'Photo last-mile on new streets; COI early.',
      cityKeywords: ["paulding growth"],
    },
    {
      id: 'rural-west',
      name: 'Rural west & larger lots',
      shortName: 'Rural west',
      neighborhoods: ["western towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches after rain.',
      cityKeywords: ["paulding west"],
    }
  ],
  specialized: [
    {
      id: 'us278',
      title: 'US-278 west-northwest freeflow',
      intro: 'Outer pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Cobb Cumberland rates for Hiram driveways."],
    },
    {
      id: 'growth-hoa',
      title: 'Outer HOA growth logistics',
      intro: 'Planned villages treat COI as default.',
      bullets: ["Gate lists early.","Mud weeks need flexibility."],
    },
    {
      id: 'empty-miles',
      title: 'Outer-collar empty miles',
      intro: 'Deadhead rewrites hourly math.',
      bullets: ["Clarify staging location before deposit.","Photo rural last-mile."],
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
        intro: 'Paulding families compare Paulding County Schools feeders across Dallas and Hiram — verify boundaries; do not assume Cobb maps apply.',
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
            detail: 'Wellstar Paulding Hospital and regional clinics anchor acute care; map peak freeflow on US-278 corridors.',
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
    intro: 'Empty miles, HOA soft costs, and corridor peaks often matter more than raw miles.',
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
      { label: 'Cobb County movers (parent contrast)', href: '/local-movers/georgia/cobb' },
    ],
  },
});
