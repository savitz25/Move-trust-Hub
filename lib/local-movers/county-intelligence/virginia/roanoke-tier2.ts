import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** roanoke — VA Tier 2 Wave 1 */
export const roanokeCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'roanoke',
  hubTitle: 'Roanoke County Moving Intelligence Hub',
  eyebrow: 'Roanoke County · Roanoke Valley · western VA hub edge · independent',
  h1: 'Moving in Roanoke County: Valley Suburbs, I-81 Access & Western Virginia Hub Edge',
  heroOpener: 'Roanoke County is the western Virginia valley hub edge around the Roanoke urban core — suburban SFH belts, mountain approaches, I-81 freeflow, and product that does not answer to NoVA I-95 collars. Expect longer empty miles into the city, grades that rewrite truck size, and freeflow that is not Richmond belt defaults. This guide is for people moving in Roanoke County as valley hub-edge product — not a NoVA rename. (Independent-city Roanoke product differs; survey the actual address.)',
  heroCredibility: 'Roanoke Valley · I-81 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · I-581 links · US-220 · US-460 · VA-419 · Electric Road corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent western VA valley hub (vs NoVA / Richmond defaults)',
    parentHref: '/local-movers/virginia/fairfax',
    title: 'Compared with independent western VA valley hub (vs NoVA / Richmond defaults)',
    intro: 'Roanoke County is valley suburban and mountain-edge product — not NoVA multi-family density and not Richmond I-95 collars alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'NoVA crews fight Beltway peaks. Roanoke County pairs ride I-81, VA-419, and valley arterials — freer mid-day western freeflow, still peak-heavy on school and I-81 windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'NoVA mixes continuous tower and HOA collars. Roanoke County mixes suburban SFH, mountain-edge lots, and city-line multi-family — more continuous valley product, less continuous Beltway density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Mountain approaches often need smaller trucks; city-line multi-family needs building packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Roanoke County quotes often sit at secondary valley rates for driveway SFH — grades and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Roanoke County is independent western VA valley hub edge — not NoVA renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Roanoke County different',
    intro: 'I-81 freeflow, valley suburbs, and mountain grades — not a NoVA clone.',
    bullets: [
      {
        title: 'I-81 freeflow is billable',
        detail: 'County ↔ city pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Mountain grades rewrite truck size',
        detail: 'Photo approaches; many lots reject full trailers.',
      },
      {
        title: 'Independent-city vs county line matters',
        detail: 'Confirm the exact locality before quoting “Roanoke” generically.',
      },
      {
        title: 'Distinct from NoVA and Richmond defaults',
        detail: 'Do not recycle I-95 collar playbooks for valley grades.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Roanoke County zones: south/west suburbs, Electric Road corridors, mountain edges & rural north',
  zonesIntro: 'Two to four sharp products under one valley hub-edge label.',
  zones: [
    {
      id: 'south-suburbs',
      name: 'South / west suburban SFH belts',
      shortName: 'South/west suburbs',
      neighborhoods: ["Cave Spring edges","suburban belts"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Arterial timing"],
      moverTips: 'Confirm driveway and HOA hours.',
      cityKeywords: ["cave spring"],
    },
    {
      id: 'electric',
      name: 'Electric Road / VA-419 corridors',
      shortName: 'Electric Road',
      neighborhoods: ["VA-419 corridors","retail edges"],
      housingTypes: 'SFH, multi-family pockets',
      challenges: ["Arterial timing","Building COIs"],
      moverTips: 'Price portal-to-portal; collect multi-family packets.',
      cityKeywords: ["electric road"],
    },
    {
      id: 'mountain',
      name: 'Mountain-edge lots',
      shortName: 'Mountain edge',
      neighborhoods: ["mountain approaches"],
      housingTypes: 'Larger lots, grades',
      challenges: ["Last-mile width","Grades"],
      moverTips: 'Photo approaches; confirm truck size early.',
      cityKeywords: ["roanoke mountain"],
    },
    {
      id: 'rural',
      name: 'Rural north & larger lots',
      shortName: 'Rural north',
      neighborhoods: ["northern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["roanoke county rural"],
    }
  ],
  specialized: [
    {
      id: 'i81',
      title: 'I-81 valley freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote NoVA multi-family rates for mountain lots."],
    },
    {
      id: 'grades',
      title: 'Mountain-edge grade logistics',
      intro: 'Grades rewrite truck size.',
      bullets: ["Photo approaches before final quote.","Shuttle conversations beat stuck trailers."],
    },
    {
      id: 'city-line',
      title: 'County vs independent-city access',
      intro: 'Locality lines change curb rules.',
      bullets: ["Confirm the exact address locality early.","City multi-story packets differ from county SFH."],
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
        intro: 'Roanoke County families compare Roanoke County Schools feeders — verify boundaries; independent-city schools differ.',
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
            detail: 'Carilion and regional valley systems serve the market; map peak freeflow on I-81/VA-419 corridors.',
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
    intro: 'Grades, empty miles, and I-81 peaks often matter more than raw miles.',
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
    intro: 'School years and winter ice on grades reshape demand more than NoVA office peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, or tourism windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'independent western VA valley hub (vs NoVA / Richmond defaults) movers (parent contrast)', href: '/local-movers/virginia/fairfax' },
    ],
  },
});
