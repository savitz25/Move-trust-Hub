import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** campbell — VA Tier 2 Wave 2 */
export const campbellCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'campbell',
  hubTitle: 'Campbell County Moving Intelligence Hub',
  eyebrow: 'Campbell · Rustburg / Altavista / Timberlake edge · vs Lynchburg city',
  h1: 'Moving in Campbell County: Lynchburg-Area County Product — Not the Independent City',
  heroOpener:
    'Campbell County is the Lynchburg-area county market — Rustburg seat fabric, Altavista and Brookneal small towns, Timberlake-edge growth that often looks continuous with Lynchburg city, and freeflow that is not the independent city’s hill-street defaults. Expect city/county line confusion, longer rural last-mile, and portal-to-portal time map miles understate. This guide is for people moving in Campbell County as county product — not a Lynchburg city rename.',
  heroCredibility:
    'Lynchburg-area county · City/county line risk · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-29 · US-460 · US-501 · SR-24 · SR-43 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Lynchburg',
    parentHref: '/local-movers/virginia/lynchburg',
    title: 'Compared with Lynchburg',
    intro:
      'Campbell is county government and schools around Lynchburg gravity — not the independent city’s hill multi-story and campus defaults alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lynchburg crews fight hill grades and downtown staging. Campbell pairs span Timberlake edges, Rustburg seat, and southern small towns — freer mid-day off city hills, still peak-heavy on US-29/US-460 metro windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lynchburg mixes hill multi-story and Liberty-area apartments. Campbell mixes Timberlake-edge SFH, Rustburg mixed stock, and Altavista/Brookneal small-town product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'County driveway and rural last-mile dominate over pure city elevators — but Timberlake-edge addresses often need city-line confirmation first.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Campbell SFH often sits at county-collar rates — empty miles into Lynchburg city multi-story still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Campbell is Lynchburg-area county identity — not Lynchburg independent city renamed.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Campbell County different',
    intro: 'City/county line risk and rural-suburban mix — not a Lynchburg city clone.',
    bullets: [
      {
        title: 'City vs county is the first question',
        detail: 'Timberlake and continuous-looking addresses fail quotes when jurisdiction is wrong.',
      },
      {
        title: 'County driveway product',
        detail: 'Expect more long last-mile and HOA growth than pure downtown hill stairs.',
      },
      {
        title: 'Southern small-town legs',
        detail: 'Altavista and Brookneal are not Timberlake — budget empty miles.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority even on short-looking hops.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Campbell zones: Timberlake edge, Rustburg seat, Altavista/Brookneal & rural south',
  zonesIntro: 'Two to four sharp products under one Lynchburg-area county label.',
  zones: [
    {
      id: 'timberlake-edge',
      name: 'Timberlake & northern growth toward Lynchburg',
      shortName: 'Timberlake edge',
      neighborhoods: ['Timberlake', 'northern Campbell'],
      housingTypes: 'Suburban SFH, multi-family pockets',
      challenges: ['City/county line confusion', 'HOA packets'],
      moverTips: 'Pin Campbell County vs Lynchburg city on every address before pack day.',
      cityKeywords: ['timberlake'],
    },
    {
      id: 'rustburg',
      name: 'Rustburg seat & central county',
      shortName: 'Rustburg',
      neighborhoods: ['Rustburg', 'seat area'],
      housingTypes: 'Small-town SFH, civic core',
      challenges: ['Quiet streets', 'Limited staging'],
      moverTips: 'Confirm small-town staging near the seat.',
      cityKeywords: ['rustburg'],
    },
    {
      id: 'altavista',
      name: 'Altavista & southern corridor towns',
      shortName: 'Altavista',
      neighborhoods: ['Altavista', 'southern corridors'],
      housingTypes: 'Small-city mixed stock',
      challenges: ['Empty miles', 'Through traffic'],
      moverTips: 'Budget freeflow from Lynchburg-edge to southern towns.',
      cityKeywords: ['altavista'],
    },
    {
      id: 'rural-south',
      name: 'Brookneal & rural southern Campbell',
      shortName: 'Rural south',
      neighborhoods: ['Brookneal', 'rural south'],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ['Long connectors', 'Driveway surveys'],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ['brookneal', 'campbell rural'],
    },
  ],
  specialized: [
    {
      id: 'city-county',
      title: 'County vs Lynchburg city distinction',
      intro: 'The most common quote failure is treating continuous addresses as one jurisdiction.',
      bullets: [
        'Confirm city vs county lines before estimating access.',
        'Do not paste Lynchburg hill notes onto Campbell driveway SFH blindly.',
      ],
    },
    {
      id: 'timberlake-collar',
      title: 'Timberlake collar growth',
      intro: 'Northern growth leans metro but loads under county rules.',
      bullets: [
        'Collect HOA packets on newer plats.',
        'Price Lynchburg city destination legs separately.',
      ],
    },
    {
      id: 'southern-towns',
      title: 'Southern small-town empty miles',
      intro: 'Altavista and Brookneal are not Timberlake freeflow.',
      bullets: [
        'Budget travel time across the county.',
        'Survey rural turnarounds early.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Campbell families compare Campbell County Public Schools feeders — verify boundaries; do not assume Lynchburg City Schools maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Virginia DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail:
              'Centra Lynchburg campuses serve much of the metro; map freeflow from Timberlake and southern towns at peaks.',
          },
          {
            title: 'Peak drive times',
            detail: 'Map ER access at commute peaks, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'City/county errors, empty miles, and access friction often matter more than raw miles.',
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
    intro: 'School years and Lynchburg university spillover reshape demand more than pure rural seasons alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Lynchburg movers (parent contrast)', href: '/local-movers/virginia/lynchburg' },
    ],
  },
});
