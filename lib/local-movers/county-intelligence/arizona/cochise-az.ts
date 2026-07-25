import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * cochise — AZ Tier 2 Wave 1
 */
export const cochiseCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'cochise',
  hubTitle: 'Cochise County Moving Intelligence Hub',
  eyebrow: 'Cochise · Sierra Vista / Bisbee / Douglas — SE AZ',
  h1: 'Moving in Cochise County: Sierra Vista, Fort Huachuca & SE Border Access',
  heroOpener:
    'Cochise County is southeast Arizona military and border-town product — Sierra Vista multi-family and Fort Huachuca PCS calendars, Bisbee multi-story and hill stock, Douglas border-edge density, and freeflow that is not Tucson basin product with different labels. Expect order-driven report dates, long empty miles between discontinuous towns, and MX-adjacent logistics under one county. This guide is for people moving in Cochise as independent SE AZ — not a Tucson rename.',
  heroCredibility:
    'SE AZ independent · Fort Huachuca PCS · Border towns · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-10 · AZ-90 · AZ-80 · AZ-92 · US-191',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent SE Arizona (vs Pima / Tucson defaults)',
    parentHref: '/local-movers/arizona/pima',
    title: 'Compared with independent SE Arizona (vs Pima / Tucson defaults)',
    intro:
      'Cochise is independent SE AZ military/border-town product — not Pima Tucson basin density and not pure rural desert freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Pima crews fight Tucson arterials and I-10 peaks. Cochise pairs ride AZ-90, AZ-80, and I-10 links — freer mid-day SE freeflow, still peak-heavy on Sierra Vista arterials and PCS lease-end clusters.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Pima mixes Tucson multi-story and foothill HOAs. Cochise mixes Sierra Vista multi-family, Bisbee hills, and Douglas border stock — more military and discontinuous town product, less continuous Tucson metro density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Base-adjacent apartments need COIs; Bisbee hills need grade surveys; long empty miles dominate town-to-town pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cochise quotes often track SE secondary rates for multi-family access — PCS peaks and hill last-mile can price above quiet rural lots.',
      },
      {
        title: 'Role difference',
        detail:
          'Cochise is independent SE AZ Fort Huachuca / border market — not Tucson product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Cochise County different',
    intro: 'PCS report dates, Sierra Vista multi-family, and SE empty miles — not interchangeable Tucson boilerplate.',
    bullets: [
      {
        title: 'Fort Huachuca PCS orders compress calendars',
        detail:
          'Report dates drive surveys more than preferred Saturdays.',
      },
      {
        title: 'Sierra Vista multi-family is first-class product',
        detail:
          'Elevators and parking need inventories different from pure SFH lots.',
      },
      {
        title: 'Bisbee hill last-mile rewrites truck size',
        detail:
          'Grades and narrow streets reject full-trailer assumptions.',
      },
      {
        title: 'Discontinuous towns add empty miles',
        detail:
          'Douglas and rural pairs fail when crews assume continuous Tucson density.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Cochise zones: Sierra Vista multi-family, Fort Huachuca edge, Bisbee hills & Douglas border',
  zonesIntro: 'Two to four sharp products — multi-family seat, base edge, hill multi-story, and border stock.',
  zones: [
    {
      id: 'sierra-vista',
      name: 'Sierra Vista multi-family & seat stock',
      shortName: 'Sierra Vista',
      neighborhoods: ["Sierra Vista","multi-family corridors"],
      housingTypes: 'Multi-family, SFH, townhomes',
      challenges: ["Elevators","PCS clusters","Arterial freeflow"],
      moverTips: 'Book around report dates; collect building rules.',
      cityKeywords: ["sierra vista"],
    },
    {
      id: 'huachuca',
      name: 'Fort Huachuca–adjacent multi-family',
      shortName: 'Base edge',
      neighborhoods: ["base-adjacent apartments","Huachuca City edges"],
      housingTypes: 'Multi-family, apartments',
      challenges: ["PCS peaks","Parking limits","COI packets"],
      moverTips: 'Align surveys with report dates; document inventories carefully.',
      cityKeywords: ["fort huachuca","huachuca city"],
    },
    {
      id: 'bisbee',
      name: 'Bisbee multi-story & hill stock',
      shortName: 'Bisbee',
      neighborhoods: ["Bisbee","hill multi-story","historic edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Grades","Narrow streets","Stairs"],
      moverTips: 'Photo last-mile; discuss smaller trucks early.',
      cityKeywords: ["bisbee"],
    },
    {
      id: 'douglas',
      name: 'Douglas border-edge & rural SE lots',
      shortName: 'Douglas / rural',
      neighborhoods: ["Douglas","southern rural tracts"],
      housingTypes: 'SFH, multi-family, rural approaches',
      challenges: ["Empty miles","Border freeflow"],
      moverTips: 'Prefer early starts for long pairs; survey approaches.',
      cityKeywords: ["douglas"],
    }
  ],
  specialized: [
    {
      id: 'pcs-cycles',
      title: 'Fort Huachuca PCS cycle module',
      intro: 'Order-driven calendars dominate volume.',
      bullets: ["Align surveys with report dates.","Document inventory carefully for military claims processes."],
    },
    {
      id: 'sv-multi',
      title: 'Sierra Vista multi-family access',
      intro: 'Elevators and parking are first-class cost drivers.',
      bullets: ["Collect COI and elevator reservations early.","Month-end clusters stack; book capacity early."],
    },
    {
      id: 'bisbee-hills',
      title: 'Bisbee hill last-mile',
      intro: 'Grades reject full-trailer assumptions from Tucson rates.',
      bullets: ["Photo the final approach before promising a 26-foot truck.","Long carries often beat forced full-trailer staging."],
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
        intro: 'Cochise families compare Sierra Vista, Bisbee, Douglas, and related district feeders — verify address boundaries; do not assume Tucson maps apply.',
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
            detail: 'Canyon Vista Medical Center and regional specialty spillover serve the county; map peak AZ-90 times for ER access.',
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
    intro: 'PCS peaks, multi-family access, hill last-mile, and town-to-town empty miles often matter more than raw miles.',
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
    intro: 'PCS cycles, school years, monsoon weather, and extreme heat reshape demand by pocket.',
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
        label: 'independent SE Arizona (vs Pima / Tucson defaults) movers (parent contrast)',
        href: '/local-movers/arizona/pima',
      },

    ],
  },
});
