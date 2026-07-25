import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/**
 * Morris County — NJ Tier 2 Wave 1
 * Role: Morristown / western North Jersey suburbs
 * Parent: Essex (+ Bergen density contrast)
 */
export const morrisCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'morris',
  hubTitle: 'Morris County Moving Intelligence Hub',
  eyebrow: 'Morris · western North Jersey suburbs · vs Essex / Bergen',
  h1: 'Moving in Morris County: Morristown, Parsippany Corporate Corridors & Western Suburbs',
  heroOpener:
    'Morris County is the affluent western North Jersey suburb belt — Morristown’s historic core, the Parsippany–Troy Hills corporate corridor, high-value towns like Madison and Chatham, and larger-lot western edges toward Chester and Roxbury. Compared with Essex multi-family density or Bergen high-rise curb fights, Morris jobs skew driveway staging, HOA packets, and I-80 / I-287 / Route 10–24 portal-to-portal time. This guide is for people moving in Morris as its own market — not a Newark rename and not a Bergen high-rise script.',
  heroCredibility:
    'Historic towns · Corporate corridor · HOA + high-value · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-80 · I-287 · Route 10 · Route 24 · Route 46',
  parentCompare: {
    parentLabel: 'Essex County',
    parentHref: '/local-movers/new-jersey/essex',
    title: 'Compared with Essex County',
    intro:
      'Morris is western North Jersey suburbia with corporate and historic-town product — not Essex urban multi-family density. Use Essex (and denser Bergen) as the parent contrast for access, inventory, and crew matching.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Essex crews fight denser urban pairs and closer PATH/Newark-airport patterns. Morris pairs ride I-80, I-287, Route 10, Route 24, and Route 46 — freer mid-day than Newark cores, still peak-heavy around Parsippany and Morristown approaches. Portal-to-portal time is real; it is not a short urban dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Essex mixes multi-family, older urban SFH, and tight blocks under one county label. Morris skews larger single-family homes, planned HOA communities, historic multi-story town stock, and western larger lots — far less continuous high-density curb competition, far more driveway length and valuation coverage.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Essex often needs tight curb permits and multi-unit long carries. Morris defaults to HOA COIs, approved hours, and cul-de-sac staging in planned tracts, plus shuttle conversations in Morristown/Madison historic cores. Western hills add grades and winter ice rare in inner Essex.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Morris quotes often sit near or above dense Essex rates for comparable square footage when high-value packing and HOA soft costs apply — even when streets feel “easier.” Expect secondary-suburb labor with executive inventory premiums, not urban dock scarcity alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Morris is Morristown + Parsippany corporate/bedroom product with western space — not Essex’s job-center density. Match crews to HOA and high-value handling, not only elevator specialists.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Morris County different',
    intro:
      'Affluent SFH, corporate calendars, and freeway clocks — not interchangeable North Jersey boilerplate.',
    bullets: [
      {
        title: 'HOA + high-value inventories are the default failure mode',
        detail:
          'Many developments require Certificates of Insurance and approved hours. Valuation coverage for furniture and electronics matters as much as truck length.',
      },
      {
        title: 'Parsippany corporate corridor demand',
        detail:
          'Routes 10/46 office parks drive professional relocations on weekday calendars — not only school-year family Saturdays.',
      },
      {
        title: 'Historic-town geometry',
        detail:
          'Morristown, Madison, and Chatham can force smaller trucks, longer carries, and tree-canopy clearances.',
      },
      {
        title: 'I-80 / I-287 / Route 24 timing is a line item',
        detail:
          'Short-looking locals burn portal-to-portal time at peak. Ask whether quotes are portal-to-portal.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Morris zones: Morristown core, Parsippany corridor, Madison belt & western lots',
  zonesIntro:
    'Two to four sharp products — not a six-zone dump. Historic core, corporate corridor, high-value east/central towns, and western larger lots price differently.',
  zones: [
    {
      id: 'morristown-core',
      name: 'Morristown / Morris Township core',
      shortName: 'Morristown',
      neighborhoods: ['Morristown', 'Morris Township', 'downtown edges', 'medical corridor edge'],
      housingTypes: 'Historic multi-story, colonials, some multi-unit',
      challenges: ['Street width', 'Stairs', 'Event-day parking', 'Tree canopies'],
      moverTips:
        'Share stair and street photos. Avoid major downtown event weekends. Confirm building access for multi-unit.',
      cityKeywords: ['morristown', 'morris township'],
    },
    {
      id: 'parsippany-corridor',
      name: 'Parsippany corporate corridor',
      shortName: 'Parsippany',
      neighborhoods: ['Parsippany', 'Troy Hills', 'Routes 10/46 edges'],
      housingTypes: 'Townhomes, garden apartments, corporate-adjacent SFH',
      challenges: ['HOA elevators', 'Peak I-287/10 traffic', 'Lease-end clusters'],
      moverTips:
        'Align with management office hours. Ask about elevator overtime and COI naming requirements.',
      cityKeywords: ['parsippany', 'troy hills'],
    },
    {
      id: 'madison-chatham',
      name: 'Madison–Chatham–Florham Park belt',
      shortName: 'Madison belt',
      neighborhoods: ['Madison', 'Chatham', 'Florham Park'],
      housingTypes: 'High-value SFH, some multi-story older stock',
      challenges: ['High-value packing', 'HOA rules', 'Tree canopies'],
      moverTips: 'Discuss valuation coverage early. Confirm driveway staging on tree-lined streets.',
      cityKeywords: ['madison', 'chatham', 'florham park'],
    },
    {
      id: 'west-morris',
      name: 'Western Morris larger lots',
      shortName: 'West Morris',
      neighborhoods: ['Randolph', 'Denville', 'Chester', 'Roxbury', 'Mendham edge'],
      housingTypes: 'Larger lots, wooded approaches, hills',
      challenges: ['Driveway length', 'Low wires', 'Winter grades'],
      moverTips:
        'Photo the approach. Soft ground after rain can block heavy trucks. Winter ice needs morning flexibility.',
      cityKeywords: ['randolph', 'denville', 'chester', 'roxbury', 'mendham'],
    },
  ],
  specialized: [
    {
      id: 'hoa-high-value',
      title: 'HOA packets & high-value contents',
      intro: 'Association rules plus executive inventory is the Morris default friction.',
      bullets: [
        'Collect the COI template when you sign the lease or close.',
        'Line-item packing for fine furniture and electronics.',
        'Confirm weekday-only windows before booking a Saturday crew.',
      ],
    },
    {
      id: 'corporate-corridor',
      title: 'Corporate / pharma corridor timing',
      intro: 'Parsippany-area offices drive professional move calendars.',
      bullets: [
        'Weekday mid-morning often beats commute peaks on I-287 and Route 10.',
        'Corporate relos may reimburse only licensed interstate carriers for out-of-state legs.',
      ],
    },
    {
      id: 'historic-access',
      title: 'Historic-town access',
      intro: 'Morristown–Madison–Chatham streets can reject full trailers.',
      bullets: [
        'Ask about shuttle or smaller trucks for downtown blocks.',
        'Protect original floors and railings on multi-story homes.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Morris families often compare municipal and regional districts serving Morristown, Madison, Chatham, Randolph, and other towns — boundaries are address-specific.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NJ DOE performance reports and district maps; do not assume a town name equals one feeder pattern.',
          },
          {
            title: 'Competitive inventory',
            detail:
              'High-demand districts tighten housing supply near school calendars — build buffer before fall start.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Morristown Medical Center corridor',
            detail:
              'A major regional acute-care anchor for much of Morris; confirm specialties and insurer networks.',
          },
          {
            title: 'Corporate-area access',
            detail:
              'Parsippany / I-287 households should map ER drive times at peak commute, not off-hour maps alone.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Morris County',
    intro:
      'HOA soft costs, high-value packing, and freeway portal-to-portal time often matter more than raw miles.',
    drivers: [
      {
        title: 'HOA certificates & weekday windows',
        detail: 'Admin time and forced midweek loads raise effective cost.',
      },
      {
        title: 'Freeway portal-to-portal',
        detail: 'I-80 / I-287 peaks inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'High-value packing tiers',
        detail: 'Affluent inventories need explicit packing line items.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$500–$1,100+' },
      {
        label: '3–4 BR home',
        value: '$1,900–$4,200+',
        note: 'Higher with packing / HOA friction',
      },
      { label: '2-person crew', value: '$120–$180+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Corporate calendars and school years dominate more than shore tourism.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings + corporate transfers fill Saturday crews first.',
      },
      {
        title: 'Winter hills',
        detail: 'Western and ridge towns need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful Morris County resources',
    intro:
      'Official links first; directory listings are independent. Verify NJ household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Morris County',
        href: 'https://www.morriscountynj.gov/',
        external: true,
      },
      {
        label: 'NJ DOE school performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Essex County Tier 1 guide (parent contrast)',
        href: '/local-movers/new-jersey/essex',
      },
      {
        label: 'Directory: Morris County filter',
        href: '/companies?coverage=state&state=NJ&counties=morris',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA COI experience and high-value packing — not only urban elevator specialists.',
  lastReviewed: '2026-07-22',
});
