import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** culpeper — VA Tier 2 Wave 2 */
export const culpeperCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'culpeper',
  hubTitle: 'Culpeper County Moving Intelligence Hub',
  eyebrow: 'Culpeper · town core / DC-outer growth · vs Fauquier',
  h1: 'Moving in Culpeper County: Piedmont Town and DC-Outer Growth',
  heroOpener: 'Culpeper County is Piedmont Virginia — historic downtown Culpeper, farm estates, and growing DC-outer commuting that is not a Fauquier rename and not Fairfax-density NOVA. Expect small-town staging, long private lanes, and portal-to-portal time map miles understate. This guide is for people moving in Culpeper as Piedmont outer product.',
  heroCredibility: 'Piedmont · DC-outer growth · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-29 · US-15 · US-522 · SR-3 · SR-229',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Fauquier County',
    parentHref: '/local-movers/virginia/fauquier',
    title: 'Compared with Fauquier County',
    intro: 'Culpeper has its own county seat town fabric — related outer-NOVA commuting to Fauquier, different density and day-to-day access than Warrenton/hunt-country alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Fauquier pairs lean Warrenton and hunt-country last-mile. Culpeper pairs center on US-29 town core and northern growth toward Fauquier — related outer freeflow, different choke points.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Fauquier mixes seat multi-story and estate lots. Culpeper mixes historic downtown, northern commuter subdivisions, and farm estates.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Downtown Culpeper staging and farm lanes rewrite plans more often than pure NOVA condo defaults.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Piedmont SFH often sits below Fairfax rates — empty miles into NOVA still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Culpeper is Piedmont outer identity — not Fauquier renamed and not Fairfax-density NOVA.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Culpeper County different',
    intro: 'Piedmont small-city core and DC-outer commute growth — not a Fauquier or Fairfax clone.',
    bullets: [
      {
        title: 'Piedmont small-city core',
        detail: 'Downtown Culpeper needs honest truck width notes.',
      },
      {
        title: 'DC-outer commute growth',
        detail: 'Households may work far north/east; inventory is still Culpeper-scale.',
      },
      {
        title: 'Estate and farm access',
        detail: 'Long private lanes are common outside town.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Culpeper zones: town core, northern growth, rural south/west & US-29 commercial',
  zonesIntro: 'Two to four sharp products under one Piedmont label.',
  zones: [
    {
      id: 'town',
      name: 'Town of Culpeper core',
      shortName: 'Culpeper town',
      neighborhoods: ["downtown Culpeper"],
      housingTypes: 'Historic downtown and close-in neighborhoods',
      challenges: ["Tighter streets","Event peaks"],
      moverTips: 'Photo street widths near core.',
      cityKeywords: ["culpeper"],
    },
    {
      id: 'north-growth',
      name: 'Northern growth toward Fauquier',
      shortName: 'Northern growth',
      neighborhoods: ["northern subdivisions"],
      housingTypes: 'Commuter subdivisions and new plats',
      challenges: ["HOA gates","School boundaries"],
      moverTips: 'Collect HOA packets early.',
      cityKeywords: ["culpeper north"],
    },
    {
      id: 'rural',
      name: 'Southern and western rural Culpeper',
      shortName: 'Rural',
      neighborhoods: ["farms","large lots"],
      housingTypes: 'Farms and large lots',
      challenges: ["Lane surveys"],
      moverTips: 'Photograph estate lanes.',
      cityKeywords: ["culpeper rural"],
    },
    {
      id: 'us29',
      name: 'US-29 corridor commercial',
      shortName: 'US-29 corridor',
      neighborhoods: ["US-29 commercial"],
      housingTypes: 'Retail and through traffic',
      challenges: ["Peak congestion"],
      moverTips: 'Build US-29 delay buffers.',
      cityKeywords: ["us-29 culpeper"],
    }
  ],
  specialized: [
    {
      id: 'piedmont-core',
      title: 'Piedmont small-city core',
      intro: 'Downtown Culpeper needs honest truck width notes.',
      bullets: ["Do not paste NOVA alley language onto Culpeper inventories."],
    },
    {
      id: 'dc-outer',
      title: 'DC-outer commute growth',
      intro: 'Households may work far north/east; inventory is still Culpeper-scale.',
      bullets: ["Price NOVA destination legs separately."],
    },
    {
      id: 'estate',
      title: 'Estate and farm access',
      intro: 'Long private lanes are common outside town.',
      bullets: ["Photo before pack day."],
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
        intro: 'Culpeper families compare Culpeper County Public Schools feeders — verify boundaries; do not assume Fauquier or Fairfax maps apply.',
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
            detail: 'UVA Culpeper Medical Center anchors local care; NOVA and Charlottesville tertiary as needed; map US-29 peaks.',
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
    intro: 'Empty miles into NOVA, farm last-mile, and US-29 peaks often matter more than raw miles.',
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
    intro: 'School years and DC-commute peaks reshape demand more than pure Fairfax office peaks alone.',
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
      { label: 'Fauquier County movers (parent contrast)', href: '/local-movers/virginia/fauquier' },
    ],
  },
});
