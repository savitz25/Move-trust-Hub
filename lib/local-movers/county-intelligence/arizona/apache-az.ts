import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * apache — AZ Tier 2 Wave 1
 */
export const apacheCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'apache',
  hubTitle: 'Apache County Moving Intelligence Hub',
  eyebrow: 'Apache · St. Johns / Window Rock edge — far NE AZ',
  h1: 'Moving in Apache County: St. Johns, Eagar & Far NE Rural Access',
  heroOpener:
    'Apache County is far northeast Arizona long-distance rural product — St. Johns multi-story and seat stock, Eagar/Springerville multi-family edges, Window Rock–adjacent approaches, and freeflow that still means very long empty miles between discontinuous communities. Expect elevation weather, tribal-adjacent logistics sensitivity, and sparse staging under one large county. This guide is for people moving in Apache as independent far NE AZ — not Phoenix or Flagstaff defaults.',
  heroCredibility:
    'Far NE AZ independent · Long rural empty miles · Elevation weather · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-191 · US-180 · AZ-61 · AZ-260 · I-40 northern approaches',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent far NE Arizona (vs Navajo / Coconino defaults)',
    parentHref: '/local-movers/arizona/navajo',
    title: 'Compared with independent far NE Arizona (vs Navajo / Coconino defaults)',
    intro:
      'Apache is independent far NE AZ long-distance rural product — not Navajo Show Low recreation density alone and not Flagstaff university product.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Navajo crews still fight multi-town empty miles on I-40. Apache pairs ride US-191, US-180, and AZ-260 across even sparser seats — freer mid-day between towns, still peak-heavy on rare arterial windows and long staging from metro yards.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Navajo mixes Show Low multi-family and Winslow multi-story. Apache mixes St. Johns multi-unit, Eagar edges, and rural lots — more sparse long-distance rural product, less continuous recreation multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Long empty miles dominate; elevation weather rewrites staging; soft shoulders appear on rural approaches.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Apache quotes often sit at far-NE secondary rates for driveway SFH — long empty-mile pairs and weather windows still push prices up vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Apache is independent far NE AZ rural market — not Show Low or Flagstaff product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Apache County different',
    intro: 'Very long empty miles, elevation weather, and sparse multi-story seats — not interchangeable Show Low or Valley boilerplate.',
    bullets: [
      {
        title: 'Long empty miles are the default pricing risk',
        detail:
          'Town pairs fail when crews assume continuous density or metro day rates.',
      },
      {
        title: 'Elevation weather rewrites winter and monsoon staging',
        detail:
          'Ice, snow, and storms reshape morning curb plans.',
      },
      {
        title: 'St. Johns multi-story is first-class product where present',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'Tribal-adjacent logistics require careful address clarity',
        detail:
          'Confirm jurisdiction and access rules early; do not assume metro playbooks.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Apache zones: St. Johns multi-story, Eagar/Springerville edges, northern approaches & rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, mountain edges, northern approaches, and rural lots.',
  zones: [
    {
      id: 'st-johns',
      name: 'St. Johns multi-story & seat stock',
      shortName: 'St. Johns',
      neighborhoods: ["St. Johns","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Empty miles"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["st johns"],
    },
    {
      id: 'eagar',
      name: 'Eagar / Springerville multi-family edges',
      shortName: 'Eagar / Springerville',
      neighborhoods: ["Eagar","Springerville","multi-family edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Elevation weather","Arterial timing","Empty miles"],
      moverTips: 'Prefer early starts; survey driveway grades.',
      cityKeywords: ["eagar","springerville"],
    },
    {
      id: 'north-approaches',
      name: 'Northern / Window Rock–adjacent approaches',
      shortName: 'North approaches',
      neighborhoods: ["northern corridors","Window Rock edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Long empty miles","Access clarity","Weather staging"],
      moverTips: 'Clarify jurisdiction and access early; photo last-mile.',
      cityKeywords: ["window rock edges","north apache"],
    },
    {
      id: 'rural-lots',
      name: 'Rural far-NE lots',
      shortName: 'Rural lots',
      neighborhoods: ["rural tracts","forest-edge lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Very long empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; price empty miles honestly.',
      cityKeywords: ["rural apache"],
    }
  ],
  specialized: [
    {
      id: 'far-ne-empty',
      title: 'Far NE long empty-mile module',
      intro: 'Sparse towns dominate pricing.',
      bullets: ["Price portal-to-portal between seats honestly.","Do not recycle Show Low or Flagstaff day rates alone."],
    },
    {
      id: 'elevation-weather',
      title: 'Elevation weather module',
      intro: 'Ice and storms rewrite desert staging assumptions.',
      bullets: ["Build winter morning flexibility into plans.","Monsoon and snow windows both matter."],
    },
    {
      id: 'access-clarity',
      title: 'Tribal-adjacent access clarity',
      intro: 'Jurisdiction and approach rules are first-class survey inputs.',
      bullets: ["Confirm access and address jurisdiction early.","Photo last-mile before promising truck size."],
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
        intro: 'Apache families compare St. Johns, Round Valley, and related district feeders — verify address boundaries; do not assume Navajo or Coconino maps apply.',
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
            detail: 'Summit Healthcare spillover and regional clinics serve the county; map peak freeflow across discontinuous towns for ER access.',
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
    intro: 'Very long empty miles, multi-story access where present, and elevation weather often matter more than raw miles.',
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
    intro: 'School years, tourism edges, monsoon weather, and winter ice reshape demand by pocket.',
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
        label: 'independent far NE Arizona (vs Navajo / Coconino defaults) movers (parent contrast)',
        href: '/local-movers/arizona/navajo',
      },

    ],
  },
});
