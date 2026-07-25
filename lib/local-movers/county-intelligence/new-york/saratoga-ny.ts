import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * saratoga — NY Tier 2 Wave 1
 */
export const saratogaCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'saratoga',
  hubTitle: 'Saratoga County Moving Intelligence Hub',
  eyebrow: 'Saratoga · Saratoga Springs · Capital Region north',
  h1: 'Moving in Saratoga County: Saratoga Springs, Clifton Park Growth & I-87 North',
  heroOpener:
    'Saratoga County is Capital Region north growth — Saratoga Springs tourism and village density, Clifton Park suburban corridors, Ballston Spa seat edges, and I-87 Northway freeflow that still peaks toward Albany. It is not Albany County government-core brownstones with freer freeways: expect tourism calendars, planned-suburb HOAs, and spa-town streets that reject full trailers. This guide is for people moving in Saratoga as a north capital-collar market — not a recycled Albany Tier 1 script.',
  heroCredibility:
    'Capital Region north · Tourism + suburban growth · I-87 Northway · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-87 · NY-50 · NY-9 · NY-29 · NY-67 · NY-146',
  parentCompare: {
    parentLabel: 'Albany County',
    parentHref: '/local-movers/new-york/albany',
    title: 'Compared with Albany County',
    intro:
      'Saratoga is Capital Region north growth and tourism product — not Albany city brownstones or pure government-session calendars alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Albany crews fight downtown one-ways and I-90 city approaches. Saratoga pairs ride I-87, NY-50, and NY-9 — freer mid-day north of the capital, still peak-heavy on Clifton Park ↔ Albany commutes and track-season weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Albany mixes city multi-story and first-ring suburbs. Saratoga mixes Saratoga Springs village multi-story, Clifton Park planned SFH, and northern larger lots — more tourism-driven village product, less capital-core brownstone density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Spa-town streets and HOA villages need curb plans and packets; track season changes staging more than Albany legislative calendars alone.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Saratoga quotes often sit near capital-suburb rates for driveway SFH — tourism peaks and village access can price above quiet Albany suburbs.',
      },
      {
        title: 'Role difference',
        detail:
          'Saratoga is tourism + north growth collar — not Albany government/education core product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Saratoga County different',
    intro: 'Tourism calendars, Northway freeflow, and planned suburbs — not interchangeable Albany boilerplate.',
    bullets: [
      {
        title: 'Track and tourism peaks rewrite weekends',
        detail:
          'Saratoga Springs summers fill crews and parking; book early around major events.',
      },
      {
        title: 'Clifton Park HOA is first-class product',
        detail:
          'Planned suburbs treat COI and approved hours as standard survey inputs.',
      },
      {
        title: 'I-87 Northway freeflow is still billable',
        detail:
          'Saratoga ↔ Albany pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Village geometry rejects full trailers',
        detail:
          'Downtown Saratoga Springs often needs smaller trucks and temporary no-parking.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Saratoga zones: Springs core, Clifton Park growth, Ballston corridor & north lots',
  zonesIntro: 'Two to four sharp products — tourism core, growth suburbs, seat corridor, and north lots.',
  zones: [
    {
      id: 'springs-core',
      name: 'Saratoga Springs core',
      shortName: 'Saratoga Springs',
      neighborhoods: ["Saratoga Springs","downtown","track edges"],
      housingTypes: 'Village multi-story, SFH, some multi-unit',
      challenges: ["Tourism parking","Tight streets","Event weekends"],
      moverTips: 'Avoid major event weekends; measure streets; plan no-parking signs.',
      cityKeywords: ["saratoga springs","saratoga"],
    },
    {
      id: 'clifton-park',
      name: 'Clifton Park / Halfmoon growth',
      shortName: 'Clifton Park',
      neighborhoods: ["Clifton Park","Halfmoon","NY-146 corridors"],
      housingTypes: 'Planned SFH, townhomes, apartments',
      challenges: ["HOA packets","I-87 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build buffer for Northway commute peaks.',
      cityKeywords: ["clifton park","halfmoon"],
    },
    {
      id: 'ballston-corridor',
      name: 'Ballston Spa / central corridor',
      shortName: 'Ballston',
      neighborhoods: ["Ballston Spa","Ballston Lake","Malta edges"],
      housingTypes: 'SFH, some multi-story older stock',
      challenges: ["Mixed access","Arterial timing"],
      moverTips: 'Confirm driveway and street width on older blocks.',
      cityKeywords: ["ballston spa","ballston","malta"],
    },
    {
      id: 'north-lots',
      name: 'Northern larger lots',
      shortName: 'North Saratoga',
      neighborhoods: ["Wilton","Greenfield","Corinth edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice","Long driveways"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["wilton","greenfield","corinth"],
    }
  ],
  specialized: [
    {
      id: 'tourism-calendar',
      title: 'Tourism & track-season module',
      intro: 'Saratoga Springs event calendars dominate summer access.',
      bullets: ["Book and stage around major track and festival weekends.","Temporary no-parking is often required downtown."],
    },
    {
      id: 'northway-growth',
      title: 'I-87 Northway growth suburbs',
      intro: 'Clifton Park HOA density is the north-collar product.',
      bullets: ["Collect HOA packets before the estimate is final.","Price Northway portal-to-portal time to Albany honestly."],
    },
    {
      id: 'winter-access',
      title: 'Winter & northern last-mile',
      intro: 'Northern lots and hills rewrite January curb plans.',
      bullets: ["Ice-aware morning starts matter more than map freeflow.","Soft shoulders after thaw can block heavy trucks."],
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
        intro: 'Saratoga families compare Saratoga Springs, Shenendehowa, Ballston Spa, and other districts — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and college towns can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Saratoga Hospital and Capital Region specialty spillover serve the county; map peak I-87 times for ER access.',
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
    intro: 'Tourism peaks, HOA soft costs, and Northway freeflow often matter more than raw miles.',
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
    intro: 'Track season, school years, and winter ice reshape demand more than pure capital-session calendars.',
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
        label: 'Albany County movers (parent contrast)',
        href: '/local-movers/new-york/albany',
      },
      
    ],
  },
});
