import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** orange — VA Tier 2 Wave 2 */
export const orangeCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'orange',
  hubTitle: 'Orange County Moving Intelligence Hub',
  eyebrow: 'Orange County VA · Orange / Gordonsville · Piedmont · vs Culpeper',
  h1: 'Moving in Orange County, Virginia: Piedmont Crossroads of 15 and 20',
  heroOpener: 'Orange County, Virginia is a Piedmont crossroads — towns of Orange and Gordonsville, estate country, and routes toward Charlottesville and Culpeper that are not California/Florida Orange and not a Culpeper rename. Expect name-clash-safe ops notes on interstate BOLs, small-town staging, and long private drives. This guide is for people moving in Orange County, Virginia as Piedmont product.',
  heroCredibility: 'Orange County VA · Piedmont · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-15 · US-20 · SR-20 · SR-231 · US-33 regional',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Culpeper County',
    parentHref: '/local-movers/virginia/culpeper',
    title: 'Compared with Culpeper County',
    intro: 'Virginia’s Orange County is a small Piedmont jurisdiction — never confuse with other states’ Orange counties; related Culpeper gravity, different seat and density.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Culpeper pairs lean US-29 town core and northern growth. Orange pairs center on US-15/US-20 town cores with southern gravity toward Charlottesville.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Culpeper mixes downtown and northern HOA growth. Orange mixes Orange/Gordonsville town fabric, planned community edges, and farm estates.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Estate lanes and name-clash interstate confusion rewrite plans more often than pure NOVA condo defaults.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Piedmont SFH often sits below NOVA rates — Charlottesville and Culpeper destination legs still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Orange County VA is Piedmont crossroads identity — not Culpeper renamed and not any other state’s Orange.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Orange County different',
    intro: 'Name-clash-safe Virginia market and Piedmont town + estate mix — not a Culpeper clone.',
    bullets: [
      {
        title: 'Name-clash-safe Virginia market',
        detail: 'Always say Orange County, Virginia in ops notes when interstate carriers are involved.',
      },
      {
        title: 'Piedmont town + estate mix',
        detail: 'Same county invoice can hide totally different truck problems.',
      },
      {
        title: 'Charlottesville and Culpeper parents',
        detail: 'Employment and medical legs often leave the county.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Orange zones: town of Orange, Gordonsville, planned-community edges & rural estate',
  zonesIntro: 'Two to four sharp products under one Piedmont label.',
  zones: [
    {
      id: 'orange-town',
      name: 'Town of Orange',
      shortName: 'Orange town',
      neighborhoods: ["Orange","civic core"],
      housingTypes: 'County civic and small downtown',
      challenges: ["Limited staging"],
      moverTips: 'Label state as Virginia on every interstate BOL.',
      cityKeywords: ["orange va"],
    },
    {
      id: 'gordonsville',
      name: 'Gordonsville & southern approaches',
      shortName: 'Gordonsville',
      neighborhoods: ["Gordonsville"],
      housingTypes: 'Historic town and routes toward Louisa/Charlottesville',
      challenges: ["Multi-county legs"],
      moverTips: 'Confirm multi-county legs clearly.',
      cityKeywords: ["gordonsville"],
    },
    {
      id: 'low',
      name: 'Lake of the Woods edge communities',
      shortName: 'Lake of the Woods edge',
      neighborhoods: ["Lake of the Woods edge"],
      housingTypes: 'Planned community living (verify county lines)',
      challenges: ["HOA rules","Gate codes"],
      moverTips: 'Collect HOA packets; verify county lines.',
      cityKeywords: ["lake of the woods"],
    },
    {
      id: 'estate',
      name: 'Rural estate Orange',
      shortName: 'Rural estate',
      neighborhoods: ["farms","large parcels"],
      housingTypes: 'Farms and large parcels',
      challenges: ["Long private drives"],
      moverTips: 'Photograph estate lanes.',
      cityKeywords: ["orange rural"],
    }
  ],
  specialized: [
    {
      id: 'name-clash',
      title: 'Name-clash-safe Virginia market',
      intro: 'Always say Orange County, Virginia in ops notes when interstate carriers are involved.',
      bullets: ["Label state as Virginia on every interstate BOL."],
    },
    {
      id: 'town-estate',
      title: 'Piedmont town + estate mix',
      intro: 'Same county invoice can hide totally different truck problems.',
      bullets: ["Scope the address type explicitly."],
    },
    {
      id: 'parents',
      title: 'Charlottesville and Culpeper parents',
      intro: 'Employment and medical legs often leave the county.',
      bullets: ["Price destination legs separately."],
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
        intro: 'Orange families compare Orange County Public Schools feeders — verify boundaries; do not assume Culpeper or Albemarle maps apply.',
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
            detail: 'UVA and Culpeper medical access for most specialty care; local clinics in town centers; map freeflow by destination.',
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
    intro: 'Name-clash routing errors, estate last-mile, and destination legs often matter more than raw miles.',
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
    intro: 'School years and Piedmont closing seasons reshape demand more than pure NOVA office peaks alone.',
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
      { label: 'Culpeper County movers (parent contrast)', href: '/local-movers/virginia/culpeper' },
    ],
  },
});
