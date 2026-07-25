import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * monroe — PA Tier 2 Wave 1
 */
export const monroeCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'monroe',
  hubTitle: 'Monroe County Moving Intelligence Hub',
  eyebrow: 'Monroe · Stroudsburg — Poconos',
  h1: 'Moving in Monroe County: Stroudsburg, Poconos Residential & I-80/I-84 Access',
  heroOpener:
    'Monroe County is Poconos tourism-plus-residential product — Stroudsburg multi-story and seat stock, East Stroudsburg and university edges, Mount Pocono and Tannersville corridor density, and I-80 / I-84 freeflow that is not Lehigh Valley industrial multi-family with mountain labels. Expect second-home and rental turnover, lake and hill last-mile, and NY/NJ interstate risk under one county label. This guide is for people moving in Monroe as a Poconos market — not a recycled Northampton or Lehigh pack.',
  heroCredibility:
    'Poconos tourism + residential · Stroudsburg seat · I-80 / I-84 · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-80 · I-84 · PA-33 · PA-611 · PA-940 · US-209',
  parentCompare: {
    parentLabel: 'Northampton County',
    parentHref: '/local-movers/pennsylvania/northampton',
    title: 'Compared with Northampton County',
    intro:
      'Monroe is Poconos tourism-residential product on I-80 / I-84 — not Northampton Bethlehem/Easton Valley density and not pure Lehigh industrial multi-family.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Northampton crews fight Lehigh Valley peaks into Bethlehem/Easton. Monroe pairs ride I-80, I-84, and PA-33 — freer mid-day Poconos freeflow, still peak-heavy on Stroudsburg arterials and tourism weekends. Portal-to-portal time is real; it is not a Valley elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Northampton mixes city multi-unit and Valley townships. Monroe mixes Stroudsburg multi-story, mountain SFH, lake cottages, and rental clusters — more tourism/second-home product, less continuous Valley industrial density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Mountain and lake approaches often need smaller trucks; HOA and resort communities add packets uncommon on pure Valley SFH jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Monroe quotes often track secondary NEPA/Poconos rates — shuttles, tourism peaks, and long empty-mile hills can price above quiet Valley driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Monroe is Poconos tourism + residential — not Lehigh Valley product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Monroe County different',
    intro: 'Tourism calendars, mountain last-mile, and I-80 freeflow — not interchangeable Valley boilerplate.',
    bullets: [
      {
        title: 'Tourism and second-home peaks rewrite weekends',
        detail:
          'Seasonal rentals and holiday windows fill crews and parking near corridor towns.',
      },
      {
        title: 'Mountain and lake last-mile is the default failure mode',
        detail:
          'Narrow approaches and soft ground reject full trailers more often than map miles suggest.',
      },
      {
        title: 'I-80 / I-84 freeflow is still billable',
        detail:
          'Poconos pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'NY / NJ adjacency creates interstate legs',
        detail:
          'Out-of-state addresses require FMCSA authority even on short-looking hops.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Monroe zones: Stroudsburg seat, East Stroudsburg corridor, Mount Pocono belt & mountain edges',
  zonesIntro: 'Two to four sharp products — seat multi-story, university corridor, tourism belt, and mountain edges.',
  zones: [
    {
      id: 'stroudsburg-seat',
      name: 'Stroudsburg seat multi-story & older stock',
      shortName: 'Stroudsburg',
      neighborhoods: ["Stroudsburg","downtown","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Tourism peaks"],
      moverTips: 'Inventory stairs; avoid peak tourism weekends when possible.',
      cityKeywords: ["stroudsburg"],
    },
    {
      id: 'east-stroudsburg',
      name: 'East Stroudsburg / university corridor',
      shortName: 'East Stroudsburg',
      neighborhoods: ["East Stroudsburg","university edges","Analomink edges"],
      housingTypes: 'Multi-family, SFH, student stock',
      challenges: ["Lease clusters","Management packets","I-80 peaks"],
      moverTips: 'Book early around term calendars; collect building rules.',
      cityKeywords: ["east stroudsburg","analomink"],
    },
    {
      id: 'mount-pocono-belt',
      name: 'Mount Pocono / Tannersville corridor',
      shortName: 'Mount Pocono belt',
      neighborhoods: ["Mount Pocono","Tannersville","Tobyhanna edges"],
      housingTypes: 'SFH, rentals, multi-family',
      challenges: ["Tourism traffic","HOA/resort rules","Arterial timing"],
      moverTips: 'Build buffers for tourism weekends; confirm HOA rules.',
      cityKeywords: ["mount pocono","tannersville","tobyhanna"],
    },
    {
      id: 'mountain-edges',
      name: 'Mountain & lake last-mile edges',
      shortName: 'Mountain edges',
      neighborhoods: ["Lake communities","Barrett edges","Price Township edges"],
      housingTypes: 'Lake cottages, hillside SFH, rural approaches',
      challenges: ["Narrow roads","Soft shoulders","Long carries"],
      moverTips: 'Photo approaches; discuss shuttle trucks early.',
      cityKeywords: ["poconos lakes","barrett","price township"],
    }
  ],
  specialized: [
    {
      id: 'poconos-tourism',
      title: 'Poconos tourism & second-home module',
      intro: 'Seasonal rentals and holiday peaks dominate corridor access.',
      bullets: ["Book and stage around major tourism weekends.","Confirm HOA/resort packets before the estimate is final."],
    },
    {
      id: 'i80-i84',
      title: 'I-80 / I-84 freeflow',
      intro: 'Poconos pairs still peak hard; NY/NJ legs need FMCSA.',
      bullets: ["Price portal-to-portal time honestly.","Clarify out-of-state second addresses for interstate authority."],
    },
    {
      id: 'mountain-last-mile',
      title: 'Mountain & lake last-mile',
      intro: 'Narrow approaches reject full-trailer assumptions from Valley rates.',
      bullets: ["Photo the final approach before promising a 26-foot truck.","Soft ground after rain can block heavy equipment."],
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
        intro: 'Monroe families compare Stroudsburg, East Stroudsburg, Pleasant Valley, Pocono Mountain, and other districts — verify boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use PDE data and district maps; do not assume a borough name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university towns can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Lehigh Valley Hospital–Pocono and related campuses anchor acute care; map peak I-80 times for ER access.',
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
    intro: 'Tourism peaks, mountain shuttles, and I-80 freeflow often matter more than raw miles.',
    drivers: [
      {
        title: 'Corridor freeflow',
        detail: 'Peak windows inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Access soft costs',
        detail: 'Building packets, stairs, or last-mile shuttles add labor hours.',
      },
      {
        title: 'Long empty-mile edges',
        detail: 'Far pockets price differently from seat suburbs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$500–$1,200+' },
      {
        label: '3–4 BR home',
        value: '$1,800–$4,200+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$120–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Tourism summers, school years, term calendars, and winter ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, rural edges, and mountain approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Pennsylvania PUC household-goods authority for in-state Pennsylvania moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Northampton County movers (parent contrast)',
        href: '/local-movers/pennsylvania/northampton',
      },
      
    ],
  },
});
