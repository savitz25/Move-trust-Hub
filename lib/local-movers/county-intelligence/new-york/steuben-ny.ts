import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * steuben — NY Tier 2 Wave 2
 */
export const steubenCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'steuben',
  hubTitle: 'Steuben County Moving Intelligence Hub',
  eyebrow: 'Steuben · Corning / Hornell · vs Broome / Chemung',
  h1: 'Moving in Steuben County: Corning, Hornell & Southern Tier West Access',
  heroOpener:
    'Steuben County is Southern Tier west product — Corning multi-story and industrial-campus edges, Hornell seat corridors, Bath approaches, and I-86 freeflow that is not Binghamton university density and not Elmira alone. Expect glass-corridor employment stock, hill towns, and longer empty miles than Broome’s Triple Cities stack. This guide is for people moving in Steuben as Corning / Hornell Southern Tier west — not Broome or Chemung renames.',
  heroCredibility:
    'Corning / Hornell · Southern Tier west · I-86 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-86 · NY-15 · NY-17 · NY-21 · NY-36 · NY-415',
  parentCompare: {
    parentLabel: 'Broome County (and Chemung Southern Tier patterns)',
    parentHref: '/local-movers/new-york/broome',
    title: 'Compared with Broome County (and Chemung Southern Tier patterns)',
    intro:
      'Steuben is Corning / Hornell Southern Tier west — not Binghamton university multi-family and not Elmira/Horseheads alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Broome crews fight I-81 Binghamton peaks; Chemung rides I-86 Elmira. Steuben pairs ride I-86 west, NY-15, and NY-36 — freer mid-day Southern Tier freeflow, still peak-heavy on Corning arterials and Hornell pairs.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Broome mixes university multi-family; Chemung mixes Elmira city and Horseheads growth. Steuben mixes Corning multi-story, Hornell corridors, and rural hill lots — more industrial-campus edge product, less continuous student density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Corning multi-story and hills need stair inventories; rural ridges add empty miles and winter ice uncommon on pure Horseheads driveway days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Steuben quotes often sit near secondary Southern Tier rates — city access and empty-mile edges still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Steuben is Corning / Hornell Southern Tier west — not Broome or Chemung renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Steuben County different',
    intro: 'Corning industrial-edge density, Hornell corridors, and Southern Tier west freeflow — not a Broome clone.',
    bullets: [
      {
        title: 'Corning multi-story is first-class product',
        detail:
          'Stairs and grades need inventories different from pure rural playbooks.',
      },
      {
        title: 'I-86 freeflow is still billable',
        detail:
          'East–west pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Hill-town last-mile rewrites truck size',
        detail:
          'Photo approaches; winter ridges need flexible mornings.',
      },
      {
        title: 'PA adjacency creates interstate legs',
        detail:
          'Short-looking border hops still need FMCSA authority.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Steuben zones: Corning core, Hornell corridors, Bath edges & rural ridges',
  zonesIntro: 'Two to four sharp products — Corning city, Hornell seat, Bath approaches, and rural ridges.',
  zones: [
    {
      id: 'corning-core',
      name: 'Corning city & campus edges',
      shortName: 'Corning',
      neighborhoods: ["Corning","downtown","industrial-campus edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Hills","Street parking"],
      moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
      cityKeywords: ["corning"],
    },
    {
      id: 'hornell',
      name: 'Hornell seat corridors',
      shortName: 'Hornell',
      neighborhoods: ["Hornell","corridor edges"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Mixed access","Arterial timing"],
      moverTips: 'Confirm street width; price portal-to-portal toward Corning.',
      cityKeywords: ["hornell"],
    },
    {
      id: 'bath-edges',
      name: 'Bath & mid-county edges',
      shortName: 'Bath edges',
      neighborhoods: ["Bath","mid-county towns"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Longer local pairs","Corridor freeflow"],
      moverTips: 'Price empty miles honestly on cross-county pairs.',
      cityKeywords: ["bath"],
    },
    {
      id: 'rural-ridges',
      name: 'Rural ridges & larger lots',
      shortName: 'Rural ridges',
      neighborhoods: ["Canisteo edges","ridge towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice","Grades"],
      moverTips: 'Photo last-mile; winter buffers required.',
      cityKeywords: ["canisteo"],
    }
  ],
  specialized: [
    {
      id: 'corning-city',
      title: 'Corning multi-story & hills',
      intro: 'City stairs and grades are first-class cost drivers.',
      bullets: ["Inventory floor counts and approaches.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'hornell-corridor',
      title: 'Hornell seat corridor logistics',
      intro: 'Mid-size city freeflow still peaks hard.',
      bullets: ["Price portal-to-portal on Corning ↔ Hornell pairs.","Confirm street width on older blocks."],
    },
    {
      id: 'i86-west',
      title: 'I-86 Southern Tier west freeflow',
      intro: 'East–west pairs rewrite hourly math.',
      bullets: ["Clarify PA second addresses for interstate authority.","Do not quote Binghamton university rates for rural ridge days."],
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
        intro: 'Steuben families compare Corning-Painted Post, Hornell, Bath, and other districts — verify boundaries across a large county.',
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
            detail: 'Guthrie Corning Hospital, St. James Hospital (Hornell), and regional clinics anchor acute care; map peak freeflow across Corning–Hornell corridors.',
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
    intro: 'City access, ridge empty miles, and winter grades often matter more than raw miles.',
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
    intro: 'School years, winter ridges, and Southern Tier weather reshape demand more than university-term spikes alone.',
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
        label: 'Broome County (and Chemung Southern Tier patterns) movers (parent contrast)',
        href: '/local-movers/new-york/broome',
      },
    ],
  },
});
