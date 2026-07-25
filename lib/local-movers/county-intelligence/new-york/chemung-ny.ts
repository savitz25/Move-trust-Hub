import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * chemung — NY Tier 2 Wave 2
 */
export const chemungCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'chemung',
  hubTitle: 'Chemung County Moving Intelligence Hub',
  eyebrow: 'Chemung · Elmira Southern Tier · vs Broome',
  h1: 'Moving in Chemung County: Elmira Southern Tier, Horseheads Corridors & NY-17 Access',
  heroOpener:
    'Chemung County is Southern Tier product west of Broome — Elmira multi-story and river-city stock, Horseheads retail and suburban corridors, Big Flats approaches, and NY-17 / I-86 freeflow that is not a Binghamton University rename. Expect smaller city density than Broome’s Triple Cities stack, more continuous Horseheads growth product, and longer empty miles to rural Chemung edges. This guide is for people moving in Chemung as Elmira Southern Tier — not Broome with different labels.',
  heroCredibility:
    'Elmira Southern Tier · Horseheads corridors · NY-17 / I-86 · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-86 · NY-17 · NY-14 · NY-13 · NY-352 · US-220 approaches',
  parentCompare: {
    parentLabel: 'Broome County',
    parentHref: '/local-movers/new-york/broome',
    title: 'Compared with Broome County',
    intro:
      'Chemung is Elmira / Horseheads Southern Tier — not Binghamton university multi-story and not Vestal term-calendar density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Broome crews fight I-81 Binghamton peaks and university weekends. Chemung pairs ride I-86 / NY-17, NY-14, and Horseheads arterials — freer mid-day Southern Tier freeflow, still peak-heavy on Elmira city pairs and retail corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Broome mixes Binghamton multi-story, Vestal student multi-family, and Endicott corridors. Chemung mixes Elmira multi-story, Horseheads SFH/growth, and Big Flats edges — less continuous university product, more mid-size Southern Tier city + suburb ladder.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Elmira hills and older multi-story need stair inventories; Horseheads often means driveway staging — not a pure Vestal lease-cluster day.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Chemung quotes often sit near or slightly below Broome university-peak rates for simple SFH — city access friction and empty-mile edges still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Chemung is Elmira Southern Tier regional product — not Broome Binghamton University hub renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Chemung County different',
    intro: 'Elmira city stock, Horseheads freeflow, and Southern Tier empty miles — not a Broome clone.',
    bullets: [
      {
        title: 'Elmira multi-story is first-class product',
        detail:
          'Stairs, hills, and tight streets need inventories different from Horseheads cul-de-sacs.',
      },
      {
        title: 'Horseheads corridors still peak',
        detail:
          'Retail and commute windows inflate short-looking local pairs. Ask portal-to-portal.',
      },
      {
        title: 'I-86 / NY-17 freeflow is billable',
        detail:
          'Cross-county Southern Tier pairs freer mid-day still burn time at peaks.',
      },
      {
        title: 'PA adjacency creates interstate legs',
        detail:
          'Pennsylvania addresses require FMCSA authority even on short-looking hops.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Chemung zones: Elmira core, Horseheads belt, Big Flats edges & rural south/west',
  zonesIntro: 'Two to four sharp products — city, growth suburb, airport-edge corridors, and rural edges.',
  zones: [
    {
      id: 'elmira-core',
      name: 'Elmira city core',
      shortName: 'Elmira',
      neighborhoods: ["Elmira","downtown","southside edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Hills","Street parking"],
      moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
      cityKeywords: ["elmira"],
    },
    {
      id: 'horseheads',
      name: 'Horseheads suburban & retail corridors',
      shortName: 'Horseheads',
      neighborhoods: ["Horseheads","retail corridor edges"],
      housingTypes: 'SFH, townhomes, some multi-family',
      challenges: ["Arterial timing","Cul-de-sac staging"],
      moverTips: 'Avoid peak retail windows when possible; confirm driveway access.',
      cityKeywords: ["horseheads"],
    },
    {
      id: 'big-flats',
      name: 'Big Flats corridor edges',
      shortName: 'Big Flats',
      neighborhoods: ["Big Flats","airport approaches"],
      housingTypes: 'SFH, mixed commercial-adjacent',
      challenges: ["Corridor freeflow","Longer local pairs"],
      moverTips: 'Price portal-to-portal on Elmira ↔ Big Flats pairs.',
      cityKeywords: ["big flats"],
    },
    {
      id: 'rural-edges',
      name: 'Rural Chemung edges',
      shortName: 'Rural edges',
      neighborhoods: ["Southport edges","Erin","Van Etten edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["southport","erin","van etten"],
    }
  ],
  specialized: [
    {
      id: 'elmira-city',
      title: 'Elmira multi-story & hills',
      intro: 'City stairs and grades are first-class cost drivers.',
      bullets: ["Inventory floor counts and hill approaches.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'horseheads-corridors',
      title: 'Horseheads retail & suburban freeflow',
      intro: 'Growth corridors still peak hard.',
      bullets: ["Price portal-to-portal time honestly.","Confirm HOA hours on planned streets."],
    },
    {
      id: 'southern-tier-spine',
      title: 'I-86 / NY-17 Southern Tier spine',
      intro: 'Cross-valley pairs still peak hard.',
      bullets: ["Clarify PA second addresses for interstate authority.","Do not quote Broome university rates for Elmira driveway days."],
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
        intro: 'Chemung families compare Elmira City, Horseheads, Elmira Heights, and other districts — verify boundaries; do not assume Broome feeder patterns apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, college towns, and seasonal markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Arnot Health and regional campuses anchor acute care; map peak freeflow across Elmira–Horseheads, not only off-hour freeflow.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks and weather days, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'City access, corridor peaks, and empty-mile edges often matter more than raw miles.',
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
        detail: 'Far pockets price differently from seat cores.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,100+' },
      {
        label: '3–4 BR home',
        value: '$1,600–$4,000+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$115–$180+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, winter ice on city hills, and Southern Tier weather reshape demand more than university-term Broome spikes alone.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, lake edges, and rural approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NYSDOT household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Broome County movers (parent contrast)',
        href: '/local-movers/new-york/broome',
      },
    ],
  },
});
