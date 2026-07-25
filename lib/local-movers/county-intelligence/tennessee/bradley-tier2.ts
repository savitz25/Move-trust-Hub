import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** bradley — TN Tier 2 Wave 1 */
export const bradleyCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'bradley',
  hubTitle: 'Bradley County Moving Intelligence Hub',
  eyebrow: 'Bradley · Cleveland · Chattanooga north · vs Hamilton',
  h1: 'Moving in Bradley County: Cleveland & Chattanooga’s Northern Collar',
  heroOpener: 'Bradley County is the Cleveland, Tennessee market northeast of Chattanooga — manufacturing-adjacent housing, I-75 corridor growth, and Ocoee recreation edges that are not a Hamilton neighborhood rename. Expect city-vs-county school lines, plant-shift timing, and portal-to-portal time map miles understate. This guide is for people moving in Bradley as Cleveland product — not downtown Chattanooga.',
  heroCredibility: 'Cleveland TN · I-75 north collar · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-11 · US-64 · SR-60 · SR-312',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Hamilton County',
    parentHref: '/local-movers/tennessee/hamilton',
    title: 'Compared with Hamilton County',
    intro: 'Bradley is Cleveland-centered north-of-Chattanooga collar — not riverfront Hamilton density and not Lookout Mountain grade product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Hamilton crews fight river-core and I-24 peaks. Bradley pairs ride I-75 north — freer mid-day off Chattanooga, still peak-heavy on metro commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Hamilton mixes river-core elevators and eastern HOAs. Bradley mixes Cleveland seat stock, industrial-edge workforce housing, and Ocoee-edge lots.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Plant-shift traffic and small-city streets matter more than downtown Chattanooga curb rules.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Cleveland SFH often sits at north-collar rates — empty miles into Hamilton still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Bradley is Cleveland identity — not Hamilton renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Bradley County different',
    intro: 'Cleveland seat logistics and manufacturing-adjacent housing — not a Chattanooga clone.',
    bullets: [
      {
        title: 'I-75 freeflow is billable',
        detail: 'Bradley ↔ Hamilton pairs freer mid-day still peak hard.',
      },
      {
        title: 'Manufacturing-adjacent timing',
        detail: 'Shift changes affect neighborhood access near plants.',
      },
      {
        title: 'City vs county schools',
        detail: 'Cleveland City and Bradley County systems differ.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Georgia border hops flip authority quickly.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Bradley zones: Cleveland core, I-75 growth, satellite towns & Ocoee edge',
  zonesIntro: 'Two to four sharp products under one north-collar label.',
  zones: [
    {
      id: 'cleveland',
      name: 'Cleveland seat & county core',
      shortName: 'Cleveland',
      neighborhoods: ["Cleveland","downtown"],
      housingTypes: 'Mixed SFH, older stock',
      challenges: ["Street width","Seat staging"],
      moverTips: 'Confirm mixed housing age access notes.',
      cityKeywords: ["cleveland tn"],
    },
    {
      id: 'i75',
      name: 'I-75 corridor growth',
      shortName: 'I-75 growth',
      neighborhoods: ["I-75 commercial/residential"],
      housingTypes: 'Growth SFH, commercial edge',
      challenges: ["Commute peaks"],
      moverTips: 'Build buffers toward Chattanooga employment.',
      cityKeywords: ["bradley i-75"],
    },
    {
      id: 'satellites',
      name: 'Charleston, McDonald & smaller towns',
      shortName: 'Satellites',
      neighborhoods: ["Charleston","McDonald"],
      housingTypes: 'Satellite communities',
      challenges: ["Empty miles"],
      moverTips: 'Budget freeflow between pockets.',
      cityKeywords: ["charleston tn","mcdonald tn"],
    },
    {
      id: 'ocoee',
      name: 'Ocoee / recreation eastern edge',
      shortName: 'Ocoee edge',
      neighborhoods: ["Ocoee approaches"],
      housingTypes: 'Recreation access, foothill approaches',
      challenges: ["Seasonal traffic","Grades"],
      moverTips: 'Plan seasonal traffic and grade photos.',
      cityKeywords: ["ocoee"],
    }
  ],
  specialized: [
    {
      id: 'cleveland-id',
      title: 'Cleveland identity',
      intro: 'Bradley’s narrative is Cleveland first — not “north Chattanooga” branding on every street.',
      bullets: ["Do not paste Hamilton riverfront notes onto Cleveland inventories."],
    },
    {
      id: 'mfg-housing',
      title: 'Manufacturing-adjacent housing',
      intro: 'Workforce neighborhoods near plants need shift-timing awareness.',
      bullets: ["Ask about employer shift windows."],
    },
    {
      id: 'chatt-collar',
      title: 'Chattanooga employment collar',
      intro: 'Many households commute into Hamilton.',
      bullets: ["Price Hamilton destination legs separately."],
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
        intro: 'Bradley families compare Bradley County Schools and Cleveland City Schools — verify which system applies; do not assume Hamilton maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Tennessee DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, military, and tourism markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Tennova Healthcare — Cleveland anchors local care; Chattanooga tertiary (Erlanger and others) for complex cases; map I-75 peaks.',
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
    intro: 'Empty miles, plant-shift freeflow, and I-75 peaks often matter more than raw miles.',
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
    intro: 'School years and plant calendars reshape demand more than pure Chattanooga tourism peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Tennessee TDOR motor carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Hamilton County movers (parent contrast)', href: '/local-movers/tennessee/hamilton' },
    ],
  },
});
