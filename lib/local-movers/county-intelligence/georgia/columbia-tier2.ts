import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** columbia — GA Tier 2 Wave 1 */
export const columbiaCountyGaTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'columbia',
  hubTitle: 'Columbia County Moving Intelligence Hub',
  eyebrow: 'Columbia · Augusta north collar · Evans / Martinez · vs Richmond',
  h1: 'Moving in Columbia County: Evans, Martinez & CSRA North-Collar Suburbs',
  heroOpener: 'Columbia County is Augusta’s north CSRA collar — Evans and Martinez planned suburbs, HOA growth villages, and freeflow that is not Richmond’s Augusta core multi-story and medical corridors alone. Expect longer empty miles into downtown Augusta peaks, school-focused SFH volume, and north-collar product that should not recycle Augusta intown playbooks. This guide is for people moving in Columbia as CSRA north suburbs — not a Richmond rename.',
  heroCredibility: 'CSRA north collar · Evans / Martinez HOAs · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · Washington Road · Belair Road · Furys Ferry Road · Columbia Road corridors',
  parentCompare: {
    parentLabel: 'Richmond County',
    parentHref: '/local-movers/georgia/richmond',
    title: 'Compared with Richmond County',
    intro: 'Columbia is Evans / Martinez CSRA north-collar suburbs — not Augusta core multi-story and medical freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Richmond crews fight Augusta intown peaks and I-520 approaches. Columbia pairs ride Washington/Belair-style north arterials and I-20 approaches — freer mid-day in planned suburbs, still peak-heavy on Evans ↔ Augusta commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Richmond mixes Augusta multi-story and older corridors. Columbia mixes Evans/Martinez planned SFH, HOA villages, and growth edges — more continuous north-collar suburban product, less continuous downtown multi-unit density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA COIs and cul-de-sac staging dominate more often than Augusta historic street permits.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Columbia quotes often sit at CSRA suburban rates for driveway SFH — empty miles into Augusta core still push premiums on cross-county pairs.',
      },
      {
        title: 'Role difference',
        detail: 'Columbia is Augusta north-collar suburbs — not Richmond Augusta core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Columbia County different',
    intro: 'North-collar HOAs, Evans/Martinez freeflow, and CSRA commute clocks — not an Augusta core clone.',
    bullets: [
      {
        title: 'HOA growth villages dominate family volume',
        detail: 'COI and gate lists are standard on Evans/Martinez product.',
      },
      {
        title: 'Augusta-core pairs still peak hard',
        detail: 'Cross-county medical and job pairs need portal-to-portal pricing.',
      },
      {
        title: 'Distinct from Richmond intown access',
        detail: 'Do not recycle historic Augusta street playbooks for cul-de-sac days.',
      },
      {
        title: 'SC adjacency creates interstate legs',
        detail: 'Aiken and border addresses need FMCSA authority.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Columbia zones: Evans core, Martinez corridors, growth villages & lake/rural edges',
  zonesIntro: 'Two to four sharp products under one CSRA north-collar label.',
  zones: [
    {
      id: 'evans',
      name: 'Evans planned core',
      shortName: 'Evans',
      neighborhoods: ["Evans","planned villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Cul-de-sac staging"],
      moverTips: 'Collect COI early; confirm gate lists.',
      cityKeywords: ["evans"],
    },
    {
      id: 'martinez',
      name: 'Martinez corridor suburbs',
      shortName: 'Martinez',
      neighborhoods: ["Martinez","corridor neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Price school and commute peaks; driveway surveys first.',
      cityKeywords: ["martinez"],
    },
    {
      id: 'growth',
      name: 'North growth villages',
      shortName: 'Growth villages',
      neighborhoods: ["new HOAs","north edges"],
      housingTypes: 'Planned SFH',
      challenges: ["Gate lists","Mud weeks"],
      moverTips: 'Photo last-mile on new streets.',
      cityKeywords: ["columbia ga growth"],
    },
    {
      id: 'edges',
      name: 'Lake / rural edges',
      shortName: 'Edges',
      neighborhoods: ["lake approaches","rural lots"],
      housingTypes: 'Larger lots, some lake access',
      challenges: ["Last-mile width","Empty miles"],
      moverTips: 'Photo approaches; confirm truck size.',
      cityKeywords: ["columbia edges"],
    }
  ],
  specialized: [
    {
      id: 'north-collar-hoa',
      title: 'CSRA north-collar HOA logistics',
      intro: 'Planned villages treat COI as default.',
      bullets: ["Gate lists early.","Weekday windows often beat Saturdays."],
    },
    {
      id: 'augusta-pairs',
      title: 'Evans/Martinez ↔ Augusta core pairs',
      intro: 'Cross-county freeflow still peaks hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Richmond intown rates for Evans driveways."],
    },
    {
      id: 'sc-border',
      title: 'SC border interstate legs',
      intro: 'Short-looking hops still need FMCSA.',
      bullets: ["Clarify destination state before deposit.","Verify USDOT/MC on interstate quotes."],
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
        intro: 'Columbia families compare Columbia County Schools feeders across Evans and Martinez — verify boundaries; do not assume Richmond City maps apply.',
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
            detail: 'Acute care often routes into Augusta medical campuses plus regional clinics; map peak freeflow on north-collar arterials into Richmond.',
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
    intro: 'HOA soft costs, cross-county peaks, and empty miles often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than Augusta medical-session peaks alone.',
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
      { label: 'Richmond County movers (parent contrast)', href: '/local-movers/georgia/richmond' },
    ],
  },
});
