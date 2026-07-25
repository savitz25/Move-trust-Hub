import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * luzerne — PA Tier 2 Wave 1
 */
export const luzerneCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'luzerne',
  hubTitle: 'Luzerne County Moving Intelligence Hub',
  eyebrow: 'Luzerne · Wilkes-Barre — NEPA pair with Scranton',
  h1: 'Moving in Luzerne County: Wilkes-Barre, Valley Cities & I-81 NEPA Pair Access',
  heroOpener:
    'Luzerne County is the Wilkes-Barre half of the NEPA pair — city multi-story and valley-city stock, Kingston and Plains corridors, Mountain Top and Back Mountain suburban belts, and I-81 freeflow distinct from Scranton’s medical-hub calendars. It is not Lackawanna with freer freeways: expect separate valley-city cores, Wyoming Valley multi-unit patterns, and empty miles to Hazleton and rural edges that do not map to Scranton day rates alone. This guide is for people moving in Luzerne as Wilkes-Barre / valley-city product — not a recycled Scranton pack.',
  heroCredibility:
    'Wilkes-Barre NEPA pair · Valley cities · I-81 freeflow · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · PA-309 · US-11 · PA-115 · I-80 links · PA-29',
  parentCompare: {
    parentLabel: 'Lackawanna County',
    parentHref: '/local-movers/pennsylvania/lackawanna',
    title: 'Compared with Lackawanna County',
    intro:
      'Luzerne is Wilkes-Barre valley-city NEPA product — not Scranton medical-hub density alone and not interchangeable Lackawanna freeflow with different labels.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lackawanna crews fight Scranton arterials and I-81 north peaks. Luzerne pairs ride I-81, PA-309, and US-11 — freer mid-day between valley cities, still peak-heavy on Wilkes-Barre cores and Mountain Top freeflow. Portal-to-portal time between Scranton and Wilkes-Barre is real.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lackawanna mixes Scranton multi-story and Abingtons SFH. Luzerne mixes Wilkes-Barre multi-unit, Kingston corridors, Back Mountain lots, and Hazleton edges — more multi-valley-city product under one county label.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Valley-city cores need curb plans and stair inventories; Back Mountain lots trade that for driveway length and winter grades.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Luzerne quotes often track NEPA secondary rates for driveway SFH — multi-story access and long empty-mile south pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Luzerne is Wilkes-Barre / valley-city NEPA pair — not Scranton medical hub renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Luzerne County different',
    intro: 'Valley-city multi-unit, I-81 freeflow, and Back Mountain last-mile — not interchangeable Scranton boilerplate.',
    bullets: [
      {
        title: 'Wilkes-Barre multi-story is first-class product',
        detail:
          'City stairs need inventories different from Mountain Top cul-de-sacs.',
      },
      {
        title: 'Distinct from Scranton day-rate assumptions',
        detail:
          'Valley-city pairs and Hazleton edges fail when crews recycle Lackawanna-only logistics.',
      },
      {
        title: 'I-81 freeflow is still billable',
        detail:
          'Wilkes-Barre ↔ Scranton pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Hazleton and rural edges add empty miles',
        detail:
          'South-county pockets price differently from Kingston corridor rates.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Luzerne zones: Wilkes-Barre core, Kingston corridor, Back Mountain belt & Hazleton edges',
  zonesIntro: 'Two to four sharp products — city multi-story, valley corridor, suburban belt, and south edges.',
  zones: [
    {
      id: 'wilkes-barre-core',
      name: 'Wilkes-Barre city multi-story & older stock',
      shortName: 'Wilkes-Barre',
      neighborhoods: ["Wilkes-Barre","downtown","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Arterial congestion"],
      moverTips: 'Inventory stairs; plan temporary no-parking; prefer mid-week mornings.',
      cityKeywords: ["wilkes-barre","wilkes barre"],
    },
    {
      id: 'kingston-corridor',
      name: 'Kingston / Plains / Wyoming Valley corridor',
      shortName: 'Kingston corridor',
      neighborhoods: ["Kingston","Plains","Edwardsville edges","Wyoming edges"],
      housingTypes: 'Multi-unit, SFH, mixed stock',
      challenges: ["Arterial timing","Mixed access","I-81 peaks"],
      moverTips: 'Build I-81 buffers; confirm street width on older blocks.',
      cityKeywords: ["kingston","plains","edwardsville","wyoming"],
    },
    {
      id: 'back-mountain',
      name: 'Mountain Top / Back Mountain belt',
      shortName: 'Back Mountain',
      neighborhoods: ["Mountain Top","Dallas","Trucksville edges","Shavertown edges"],
      housingTypes: 'Suburban SFH, larger lots',
      challenges: ["Grades","Winter ice","Empty miles to valley floor"],
      moverTips: 'Photo grades; winter mornings need flexibility.',
      cityKeywords: ["mountain top","dallas","trucksville","shavertown"],
    },
    {
      id: 'hazleton-edges',
      name: 'Hazleton & southern edges',
      shortName: 'Hazleton edges',
      neighborhoods: ["Hazleton","West Hazleton edges","southern townships"],
      housingTypes: 'Multi-unit, SFH, mixed stock',
      challenges: ["Long empty miles","Mixed access","I-81 south freeflow"],
      moverTips: 'Prefer early starts for long pairs; survey driveway access.',
      cityKeywords: ["hazleton","west hazleton","rural luzerne"],
    }
  ],
  specialized: [
    {
      id: 'valley-city-distinct',
      title: 'Wilkes-Barre valley-city vs Scranton',
      intro: 'Luzerne is a distinct NEPA pair market — not a Scranton rename.',
      bullets: ["Do not recycle Lackawanna-only day rates for Wilkes-Barre multi-story.","Price Scranton ↔ Wilkes-Barre portal-to-portal time honestly."],
    },
    {
      id: 'i81-valley',
      title: 'I-81 valley freeflow',
      intro: 'Valley pairs still peak hard across NEPA cores.',
      bullets: ["Build corridor buffers for morning and evening peaks.","Clarify Lackawanna second addresses for drive-time assumptions."],
    },
    {
      id: 'back-mountain-last-mile',
      title: 'Back Mountain last-mile & grades',
      intro: 'Mountain Top and Dallas lots punish valley-floor rate assumptions.',
      bullets: ["Photo grades and soft shoulders.","Winter ice needs morning flexibility."],
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
        intro: 'Luzerne families compare Wilkes-Barre Area, Wyoming Valley West, Dallas, Hazleton, and other districts — verify boundaries.',
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
            detail: 'Geisinger Wyoming Valley, Wilkes-Barre General, and related campuses anchor acute care; map peak freeflow across the valley.',
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
    intro: 'Valley-city stairs, I-81 freeflow, and Back Mountain empty miles often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter grades reshape demand by pocket.',
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
        label: 'Lackawanna County movers (parent contrast)',
        href: '/local-movers/pennsylvania/lackawanna',
      },
      
    ],
  },
});
