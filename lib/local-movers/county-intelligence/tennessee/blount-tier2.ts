import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** blount — TN Tier 2 Wave 1 */
export const blountCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'blount',
  hubTitle: 'Blount County Moving Intelligence Hub',
  eyebrow: 'Blount · Maryville / Alcoa · Knoxville south · vs Knox',
  h1: 'Moving in Blount County: Maryville, Alcoa & Smokies Foothill Collar',
  heroOpener: 'Blount County is the Maryville–Alcoa twin-city market south of Knoxville — airport-adjacent industry, foothill suburbs, and Great Smoky Mountains gateways that are not a Knox neighborhood rename. Expect city-vs-county school lines, foothill grades, and portal-to-portal time map miles understate. This guide is for people moving in Blount as Knoxville-south collar product — not downtown Knox and not Sevier tourism-cabin defaults.',
  heroCredibility: 'Maryville–Alcoa · Foothill collar · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-129 · US-321 · I-140 links · Alcoa Hwy · scenic foothill approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Knox County',
    parentHref: '/local-movers/tennessee/knox',
    title: 'Compared with Knox County',
    intro: 'Blount is Maryville/Alcoa foothill collar — not Knoxville core multi-unit density and not Sevier Parkway tourism product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Knox crews fight I-40/I-75 and Kingston Pike peaks. Blount pairs ride US-129/Alcoa Hwy south — freer mid-day off the core, still peak-heavy on Knox commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Knox mixes UT multi-family and west Knox HOAs. Blount mixes Maryville seat stock, Alcoa industrial-edge housing, and Townsend foothill approaches.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Foothill grades and airport-shift traffic matter more than downtown Knox curb rules.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Blount driveway SFH often sits at south-collar rates — empty miles into Knox and foothill shuttles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Blount is Maryville–Alcoa identity — not Knox renamed and not Sevier cabin default.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Blount County different',
    intro: 'Twin-city logistics, airport adjacency, and foothill grades — not a Knox clone.',
    bullets: [
      {
        title: 'US-129 freeflow is billable',
        detail: 'Blount ↔ Knox pairs freer mid-day still peak hard.',
      },
      {
        title: 'City school systems differ',
        detail: 'Maryville, Alcoa, and county systems are not interchangeable.',
      },
      {
        title: 'Foothill and park-edge access',
        detail: 'Townsend grades need photos and weather checks.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Blount zones: Maryville, Alcoa/airport, western towns & Townsend foothills',
  zonesIntro: 'Two to four sharp products under one foothill-collar label.',
  zones: [
    {
      id: 'maryville',
      name: 'Maryville seat & civic core',
      shortName: 'Maryville',
      neighborhoods: ["Maryville","downtown"],
      housingTypes: 'Mixed SFH, older stock',
      challenges: ["Street width","Seat staging"],
      moverTips: 'Confirm mixed street widths near core.',
      cityKeywords: ["maryville"],
    },
    {
      id: 'alcoa',
      name: 'Alcoa & airport corridor',
      shortName: 'Alcoa',
      neighborhoods: ["Alcoa","airport corridor"],
      housingTypes: 'Workforce housing, industrial-edge',
      challenges: ["Shift traffic","Commercial mix"],
      moverTips: 'Plan around shift changes near plants/airport.',
      cityKeywords: ["alcoa"],
    },
    {
      id: 'west-blount',
      name: 'Louisville, Friendsville & western Blount',
      shortName: 'West Blount',
      neighborhoods: ["Louisville","Friendsville"],
      housingTypes: 'Small towns, lake-adjacent pockets',
      challenges: ["Empty miles"],
      moverTips: 'Budget freeflow between pockets.',
      cityKeywords: ["louisville tn","friendsville"],
    },
    {
      id: 'townsend',
      name: 'Townsend & foothill / park edge',
      shortName: 'Townsend',
      neighborhoods: ["Townsend","foothill approaches"],
      housingTypes: 'Mountain-edge SFH, tourism edge',
      challenges: ["Grades","Tourist peaks"],
      moverTips: 'Photo grades; build tourist-season buffers.',
      cityKeywords: ["townsend"],
    }
  ],
  specialized: [
    {
      id: 'twin-city',
      title: 'Maryville–Alcoa identity',
      intro: 'Twin-city Blount is not “south Knoxville.”',
      bullets: ["Local logistics run through Maryville and Alcoa first.","Do not paste Knox downtown notes onto Blount inventories."],
    },
    {
      id: 'airport-industrial',
      title: 'Airport and industrial adjacency',
      intro: 'Workforce housing near airport and plants needs shift-timing awareness.',
      bullets: ["Ask about employer shift windows."],
    },
    {
      id: 'foothill',
      title: 'Smokies foothill access',
      intro: 'Townsend and mountain-edge jobs need grade and weather planning.',
      bullets: ["Photo last-mile; plan shuttles when grades are steep."],
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
        intro: 'Blount families compare Blount County, Maryville City, and Alcoa City schools — verify which system applies; do not assume Knox maps apply.',
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
            detail: 'Blount Memorial (Maryville) anchors local care; Knoxville tertiary (UT, Covenant, etc.) for complex cases; map US-129 peaks.',
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
    intro: 'Empty miles, foothill access, and US-129 peaks often matter more than raw miles.',
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
    intro: 'Tourist-season foothill traffic and school years reshape demand more than pure Knox office peaks alone.',
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
      { label: 'Knox County movers (parent contrast)', href: '/local-movers/tennessee/knox' },
    ],
  },
});
