import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * gila — AZ Tier 2 Wave 1
 */
export const gilaCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'gila',
  hubTitle: 'Gila County Moving Intelligence Hub',
  eyebrow: 'Gila · Payson / Globe — rim country',
  h1: 'Moving in Gila County: Payson, Globe & Rim-Country Access',
  heroOpener:
    'Gila County is Arizona rim-country product — Payson multi-family and recreation stock, Globe multi-story and mining-town fabric, Miami and rural edges, and freeflow on AZ-87 / US-60 that is not Phoenix desert HOA sprawl with elevation labels. Expect grades, tourism peaks, and long empty miles under one county. This guide is for people moving in Gila as independent rim country — not a Maricopa rename.',
  heroCredibility:
    'Rim country independent · Payson / Globe · Elevation recreation · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'AZ-87 · US-60 · AZ-188 · AZ-260 · AZ-77',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent rim country (nearest desert hub: Maricopa)',
    parentHref: '/local-movers/arizona/maricopa',
    title: 'Compared with independent rim country (nearest desert hub: Maricopa)',
    intro:
      'Gila is independent rim-country recreation and mining-town product — not Maricopa desert Loop density and not pure rural forest freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Maricopa crews fight Loop peaks in extreme heat. Gila pairs ride AZ-87, US-60, and AZ-188 — freer mid-day rim freeflow, still peak-heavy on Payson tourism weekends and Globe arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Maricopa mixes towers and master plans. Gila mixes Payson multi-family, Globe multi-story, and rural lots — more elevation and mining-town product, less continuous desert HOA density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Grades rewrite truck size; tourism multi-family needs packets; mining-town streets need curb plans.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Gila quotes often track rim secondary rates for multi-story access — grades and tourism peaks can price above quiet off-season lots.',
      },
      {
        title: 'Role difference',
        detail:
          'Gila is independent rim country — not Phoenix product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Gila County different',
    intro: 'Rim elevation, Payson recreation peaks, and Globe multi-story — not interchangeable Valley boilerplate.',
    bullets: [
      {
        title: 'Rim grades rewrite truck size assumptions',
        detail:
          'Approaches reject full-trailer Valley day rates more often than map miles suggest.',
      },
      {
        title: 'Payson tourism peaks rewrite weekends',
        detail:
          'Recreation seasons fill crews and parking first.',
      },
      {
        title: 'Globe multi-story is first-class product',
        detail:
          'Mining-town stairs and curb plans need inventories different from pure cabin lots.',
      },
      {
        title: 'Long empty miles between towns are real',
        detail:
          'Payson ↔ Globe pairs fail when crews assume continuous density.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Gila zones: Payson multi-family, Globe multi-story, Miami edges & rural rim lots',
  zonesIntro: 'Two to four sharp products — recreation multi-family, mining multi-story, corridor edges, and rural lots.',
  zones: [
    {
      id: 'payson',
      name: 'Payson multi-family & recreation stock',
      shortName: 'Payson',
      neighborhoods: ["Payson","recreation multi-family","growth edges"],
      housingTypes: 'Multi-family, SFH, tourism stock',
      challenges: ["Tourism peaks","Grades","HOA packets"],
      moverTips: 'Book around tourism peaks; survey driveway grades.',
      cityKeywords: ["payson"],
    },
    {
      id: 'globe',
      name: 'Globe multi-story & mining-town stock',
      shortName: 'Globe',
      neighborhoods: ["Globe","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","US-60 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["globe"],
    },
    {
      id: 'miami',
      name: 'Miami / US-60 corridor edges',
      shortName: 'Miami',
      neighborhoods: ["Miami","corridor multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts for long pairs.',
      cityKeywords: ["miami az"],
    },
    {
      id: 'rural-rim',
      name: 'Rural rim & forest-edge lots',
      shortName: 'Rural rim',
      neighborhoods: ["forest-edge tracts","rural approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["rural gila"],
    }
  ],
  specialized: [
    {
      id: 'rim-grades',
      title: 'Rim-country grade module',
      intro: 'Elevation approaches rewrite desert truck assumptions.',
      bullets: ["Photo the final approach before promising a 26-foot truck.","Do not recycle Phoenix flat-cul-de-sac day rates."],
    },
    {
      id: 'payson-tourism',
      title: 'Payson recreation peak module',
      intro: 'Tourism weekends dominate volume.',
      bullets: ["Book capacity early for peak seasons.","Confirm multi-family packets early."],
    },
    {
      id: 'globe-seat',
      title: 'Globe multi-story access',
      intro: 'Mining-town stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes â€” primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Gila families compare Payson, Globe, Miami, and related district feeders — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Arizona DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university towns, and military markets can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Banner Payson and Cobre Valley Regional (Globe) anchor acute care; map peak AZ-87 / US-60 times for ER access.',
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
    intro: 'Grades, multi-story access, tourism peaks, and town-to-town empty miles often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450â€“$1,200+' },
      { label: '3â€“4 BR home', value: '$1,600â€“$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115â€“$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Tourism summers, school years, monsoon weather, and winter ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring â€“ early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Institutional & weather windows',
        detail:
          'School, university, PCS, tourism, or storm seasons can outrank pure weekend preference.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Arizona Corporation Commission (ACC) entity status for in-state Arizona moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent rim country (nearest desert hub: Maricopa) movers (parent contrast)',
        href: '/local-movers/arizona/maricopa',
      },

    ],
  },
});
