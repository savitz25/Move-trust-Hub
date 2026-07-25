import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * schenectady — NY Tier 2 Wave 1
 */
export const schenectadyCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'schenectady',
  hubTitle: 'Schenectady County Moving Intelligence Hub',
  eyebrow: 'Schenectady · Capital Region west collar',
  h1: 'Moving in Schenectady County: Schenectady City Stock & Capital West Collar',
  heroOpener:
    'Schenectady County is the Capital Region west collar — Schenectady city multi-story stock, Niskayuna and Rotterdam suburban belts, Scotia village edges, and I-890 / NY-5 / NY-7 freeflow into Albany. It is not Albany County government-core product renamed: expect denser city stairs west of the capital, GE-corridor multi-family patterns, and suburban belts that stage differently from Colonie or Guilderland defaults. This guide is for people moving in Schenectady as capital-metro west collar — not a recycled Albany Tier 1 script.',
  heroCredibility:
    'Capital Region west collar · City multi-story · Suburban belts · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-890 · I-90 · NY-5 · NY-7 · NY-50 · NY-146',
  parentCompare: {
    parentLabel: 'Albany County',
    parentHref: '/local-movers/new-york/albany',
    title: 'Compared with Albany County',
    intro:
      'Schenectady is capital-metro west collar with city multi-story density — not Albany Plaza brownstones alone and not pure suburban Colonie defaults.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Albany crews fight downtown one-ways and government peaks. Schenectady pairs ride I-890, NY-5, NY-7, and I-90 — freer mid-day than Plaza cores, still peak-heavy on capital-oriented commutes.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Albany mixes brownstones and first-ring suburbs. Schenectady mixes denser city multi-story, Niskayuna higher-value SFH, and Rotterdam/Scotia mixed product — more continuous city stairs west of the capital.',
      },
      {
        title: 'Truck access & density',
        detail:
          'City blocks need curb plans and stair inventories; Niskayuna lots trade that for driveway staging uncommon in downtown Albany multi-unit jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Schenectady quotes often track capital-suburb rates — city multi-story soft costs can exceed simple Rotterdam driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Schenectady is capital west collar city + suburb mix — not Albany government/education core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Schenectady County different',
    intro: 'City stairs, west-collar freeflow, and suburban contrast — not interchangeable Albany boilerplate.',
    bullets: [
      {
        title: 'Schenectady city multi-story is first-class product',
        detail:
          'Stairs and street parking define more jobs than capital brownstone packets alone.',
      },
      {
        title: 'Niskayuna high-value SFH needs valuation coverage',
        detail:
          'Affluent inventories fail when packing tiers are missing from estimates.',
      },
      {
        title: 'I-890 / NY-5 freeflow is still billable',
        detail:
          'Capital-oriented pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Cross-county Capital Region legs are routine',
        detail:
          'Albany and Saratoga addresses are common; keep drive-time language honest.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Schenectady zones: city core, Niskayuna belt, Rotterdam/Scotia & corridor edges',
  zonesIntro: 'Two to four sharp products — city, high-value suburbs, west towns, and corridor edges.',
  zones: [
    {
      id: 'city-core',
      name: 'Schenectady city core',
      shortName: 'City',
      neighborhoods: ["Schenectady","GE corridor edges","Stockade edges"],
      housingTypes: 'Multi-story, multi-unit, some elevators',
      challenges: ["Stairs","Street parking","Older stock"],
      moverTips: 'Inventory stairs and long carries; plan temporary no-parking.',
      cityKeywords: ["schenectady"],
    },
    {
      id: 'niskayuna',
      name: 'Niskayuna high-value belt',
      shortName: 'Niskayuna',
      neighborhoods: ["Niskayuna","River Road edges"],
      housingTypes: 'High-value SFH, some multi-story',
      challenges: ["Valuation packing","Tree canopies","Driveway staging"],
      moverTips: 'Discuss valuation coverage early; protect floors and landscaping.',
      cityKeywords: ["niskayuna"],
    },
    {
      id: 'rotterdam-scotia',
      name: 'Rotterdam / Scotia towns',
      shortName: 'Rotterdam / Scotia',
      neighborhoods: ["Rotterdam","Scotia","Glenville edges"],
      housingTypes: 'Suburban SFH, some multi-family',
      challenges: ["Mixed access","Arterial timing"],
      moverTips: 'Confirm HOA rules where applicable; build arterial buffers.',
      cityKeywords: ["rotterdam","scotia","glenville"],
    }
  ],
  specialized: [
    {
      id: 'city-stairs',
      title: 'City multi-story access',
      intro: 'Schenectady city stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'capital-west-collar',
      title: 'Capital west-collar freeflow',
      intro: 'I-890 / NY-5 pairs to Albany still peak hard.',
      bullets: ["Price portal-to-portal time honestly for capital-oriented legs.","Clarify Albany County second addresses for drive-time assumptions."],
    },
    {
      id: 'high-value-sfh',
      title: 'Niskayuna high-value SFH',
      intro: 'Affluent inventories need explicit packing tiers.',
      bullets: ["Line-item packing for fine furniture and electronics.","Confirm driveway staging on tree-lined streets."],
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
        intro: 'Schenectady families compare Schenectady City, Niskayuna, Schalmont, Scotia-Glenville, and other districts — verify boundaries.',
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
            detail: 'Ellis Hospital and Capital Region specialty spillover serve the county; map peak freeflow to Albany specialty care.',
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
    intro: 'City stairs, high-value packing, and capital freeflow often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter ice reshape demand by pocket.',
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
