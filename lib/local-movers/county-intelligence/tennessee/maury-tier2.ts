import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** maury — TN Tier 2 Wave 1 */
export const mauryCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'maury',
  hubTitle: 'Maury County Moving Intelligence Hub',
  eyebrow: 'Maury · Columbia / Spring Hill edge · Nashville south · vs Williamson',
  h1: 'Moving in Maury County: Columbia & South-Middle Tennessee Growth',
  heroOpener: 'Maury County is south-middle Tennessee around Columbia — Spring Hill’s southern reach, manufacturing-linked housing, and US-31 / I-65 freeflow that is not a Franklin or Brentwood rename. Expect county-line confusion on Spring Hill addresses, small-city staging in Columbia, and portal-to-portal time map miles understate. This guide is for people moving in Maury as south-collar growth — not Williamson premium stock alone.',
  heroCredibility: 'South-middle TN · Columbia seat · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-65 · US-31 · US-412 · SR-50 · SR-99',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Williamson County',
    parentHref: '/local-movers/tennessee/williamson',
    title: 'Compared with Williamson County',
    intro: 'Maury is Columbia-centered south growth — not Franklin/Cool Springs premium product and not a Davidson ZIP overlay.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Williamson crews fight Cool Springs and I-65 peaks closer to Nashville. Maury pairs ride further south on I-65/US-31 — freer mid-day off Franklin, still peak-heavy on metro commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Williamson mixes Franklin luxury and Brentwood estates. Maury mixes Columbia seat stock, Spring Hill-edge growth, and workforce housing near plants.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Spring Hill county lines confuse crews; Columbia historic streets differ from pure Cool Springs cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Maury SFH often sits below Williamson premium rates — empty miles into Franklin/Nashville still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Maury is south-middle TN with Columbia identity — not Williamson renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Maury County different',
    intro: 'Columbia seat logistics and Spring Hill line complexity — not a Franklin clone.',
    bullets: [
      {
        title: 'Spring Hill county-line risk',
        detail: 'Pin Maury vs Williamson before the crew rolls.',
      },
      {
        title: 'Columbia historic access',
        detail: 'Square-adjacent streets need honest staging notes.',
      },
      {
        title: 'Plant-adjacent workforce housing',
        detail: 'Shift timing can affect neighborhood access.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Alabama and other cross-state destinations flip authority.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Maury zones: Columbia, Spring Hill edge, Mount Pleasant & industrial edges',
  zonesIntro: 'Two to four sharp products under one south-middle label.',
  zones: [
    {
      id: 'columbia',
      name: 'Columbia seat & downtown Maury',
      shortName: 'Columbia',
      neighborhoods: ["Columbia","downtown"],
      housingTypes: 'Mixed SFH, older stock',
      challenges: ["Street width","Historic staging"],
      moverTips: 'Confirm square-adjacent truck plans.',
      cityKeywords: ["columbia"],
    },
    {
      id: 'spring-hill',
      name: 'Spring Hill edge & northern Maury',
      shortName: 'Spring Hill edge',
      neighborhoods: ["Spring Hill Maury side"],
      housingTypes: 'Growth SFH, HOA product',
      challenges: ["County-line confusion","HOA packets"],
      moverTips: 'Verify county and school system on every address.',
      cityKeywords: ["spring hill"],
    },
    {
      id: 'mount-pleasant',
      name: 'Mount Pleasant & southern Maury',
      shortName: 'Mount Pleasant',
      neighborhoods: ["Mount Pleasant","south county"],
      housingTypes: 'Small-city and rural stock',
      challenges: ["Empty miles"],
      moverTips: 'Budget freeflow between pockets.',
      cityKeywords: ["mount pleasant"],
    },
    {
      id: 'industrial',
      name: 'Industrial & plant-adjacent housing',
      shortName: 'Plant edge',
      neighborhoods: ["plant-adjacent neighborhoods"],
      housingTypes: 'Workforce housing',
      challenges: ["Shift traffic"],
      moverTips: 'Ask about shift windows near major employers.',
      cityKeywords: ["maury industrial"],
    }
  ],
  specialized: [
    {
      id: 'south-middle',
      title: 'South-middle TN growth (not Franklin)',
      intro: 'Maury absorbs growth south of Williamson’s premium core.',
      bullets: ["Do not paste Franklin luxury access notes onto Columbia inventories.","Price Williamson destination legs separately."],
    },
    {
      id: 'spring-hill-line',
      title: 'Spring Hill county-line complexity',
      intro: 'Split-jurisdiction addresses are a common quote failure.',
      bullets: ["Pin Maury vs Williamson early.","Confirm school system with the client."],
    },
    {
      id: 'columbia-core',
      title: 'Columbia historic and civic core',
      intro: 'Downtown and older neighborhoods need honest street-width notes.',
      bullets: ["Photo approaches near the square."],
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
        intro: 'Maury families compare Maury County Public Schools feeders — verify Spring Hill edges; do not assume Williamson maps apply.',
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
            detail: 'Maury Regional Medical Center (Columbia) anchors local care; Williamson and Nashville tertiary for complex cases; map I-65 peaks.',
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
    intro: 'County-line errors, empty miles, and access friction often matter more than raw miles.',
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
    intro: 'School years and plant calendars reshape demand more than Franklin event peaks alone.',
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
      { label: 'Williamson County movers (parent contrast)', href: '/local-movers/tennessee/williamson' },
    ],
  },
});
