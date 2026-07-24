import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Comal County — Texas Tier 2 (New Braunfels — SA/Austin growth corridor).
 * Secondary-market contract vs Bexar Tier 1 parent — I-35 New Braunfels /
 * Canyon Lake / Bulverde growth, not San Antonio core elevators or renamed Bexar scripts.
 */
export const comalCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'comal',
  hubTitle: 'Comal County Moving Intelligence Hub',
  eyebrow: 'Comal · SA/Austin growth corridor · New Braunfels / Canyon Lake / Bulverde',
  h1: 'Moving in Comal County: New Braunfels Growth Corridor — I-35, Canyon Lake & Bulverde Edges',
  heroOpener:
    'Comal County is the San Antonio–Austin growth corridor anchored by New Braunfels — river-town grids, tourism peaks, Canyon Lake recreation edges, and Bulverde / Garden Ridge north-Bexar spillover — not downtown San Antonio elevators with a different nameplate. I-35 freeflow still bills at peak; SH-46 and FM-306 rewrite last-mile assumptions; Loop 337 and the local New Braunfels grid stage differently than Bexar core docks. A Gruene-edge bungalow, a Canyon Lake hillside home, a Bulverde acreage tract, and a new HOA two-story on the I-35 spine do not share truck access. Compared with Bexar (and with Travis farther up the same corridor), you get freer mid-day freeflow than SA inner loops, denser tourism and river-weekend friction than pure bedroom collars, and almost no vertical tower product. This guide is for people moving in Comal as a corridor market with its own role — not a recycled Bexar or Austin-core script.',
  heroCredibility:
    'SA/Austin growth corridor · New Braunfels / Canyon Lake · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-35 · SH-46 · FM-306 · Loop 337 · local New Braunfels grid',
  parentCompare: {
    parentLabel: 'Bexar County',
    parentHref: '/local-movers/texas/bexar',
    title: 'Compared with Bexar County',
    intro:
      'Comal is the I-35 growth corridor north of San Antonio — New Braunfels, Canyon Lake, Bulverde, and Garden Ridge edges — not a drop-in template for downtown SA elevators, medical-center docks, or far-west Bexar HOA belts. Travis sits farther up the same SA–Austin spine for contrast: Comal still prices and stages as a Bexar-parent collar first, with Austin-direction long locals as a secondary comparison. Use Bexar as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Bexar crews fight I-10, Loop 1604, I-35 through town, and multi-hour cross-county pairs into Medical Center and downtown. Comal pairs ride I-35, SH-46, FM-306, Loop 337, and the local New Braunfels grid — freer mid-day than SA inner loops, still peak-heavy on New Braunfels ↔ north Bexar and Bulverde ↔ SA job-center hauls. Portal-to-portal time is real; it is not a 45-minute downtown dock job. Travis-direction pairs on I-35 north add long-local clock without becoming an Austin-core product.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Bexar mixes towers, historic urban grids, and sprawling suburban HOAs under one county label. Comal’s ladder is New Braunfels historic and river-adjacent stock, tourism-edge rentals, Canyon Lake hillside and recreation product, Bulverde/Garden Ridge larger-lot and horse-country edges, and rapid I-35 HOA growth — far less elevator density, far more grade, gate, and weekend-staging friction.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Bexar core needs COI elevators and curb permits; many Bexar suburbs still allow freer driveway work. Comal defaults to driveway, cul-de-sac, hillside approach, and tourism-weekend curb limits — HOA packets appear heavily in newer I-35 villages and Bulverde tracts. Expect access photos and river-weekend timing first, then the truck.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Comal quotes often sit near or slightly below dense Bexar urban rates for comparable square footage when access is a simple driveway — tourism peaks, I-35 portal time, heat windows, and Canyon Lake grades still push prices up. Expect secondary-corridor labor rates with recreation and growth-edge friction as the main premium, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Comal is the SA–Austin I-35 bedroom and river-recreation growth engine — schools, tourism calendars, and corridor inventory — not Bexar’s job-center core and not Travis downtown or Williamson tech-suburb product. Treat it as its own corridor market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Comal County different',
    intro:
      'Corridor realities — New Braunfels tourism and river calendars, I-35 freeflow that still bills, Canyon Lake grades, and freer mid-day than Bexar core — that change estimates.',
    bullets: [
      {
        title: 'New Braunfels, Canyon Lake, and Bulverde are different products',
        detail:
          'A river-town grid bungalow, a Canyon Lake hillside home, and a Bulverde acreage tract do not share truck access. Put both communities on the estimate — “Comal County local” fails across I-35 vs lake-edge last-mile.',
      },
      {
        title: 'I-35 / SH-46 / FM-306 timing is a line item',
        detail:
          'New Braunfels ↔ north Bexar or Bulverde ↔ SA pairs freer than SA inner loops still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Tourism and river-weekend staging friction',
        detail:
          'Peak river, Gruene, and summer visitor weekends tighten curb, parking, and downtown-edge approaches. Mid-week early starts often beat Saturday tourist density that pure Bexar suburb scripts miss.',
      },
      {
        title: 'Hill Country heat on open and hillside staging',
        detail:
          'June–September afternoons on asphalt cul-de-sacs and exposed lake-edge drives stress crews and sealed goods. Prefer early starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Comal zones: New Braunfels core, Canyon Lake, Bulverde / Garden Ridge & I-35 growth',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. New Braunfels planned/historic core, Canyon Lake recreation edge, Bulverde/Garden Ridge north spillover, and I-35 growth villages price and stage differently under the same corridor.',
  zones: [
    {
      id: 'new-braunfels-core',
      name: 'New Braunfels Core',
      shortName: 'New Braunfels',
      neighborhoods: [
        'Downtown / historic New Braunfels',
        'Gruene edges',
        'Loop 337 residential ring',
        'River-adjacent corridors',
        'I-35 / local grid approaches',
      ],
      housingTypes:
        'Historic-grid SFH, river-edge and tourism-adjacent product, mid-century tracts, multi-family pockets, newer HOA edges',
      challenges: [
        'Tourism and river-weekend curb and parking limits',
        'Older street grids and tighter staging near historic cores',
        'I-35 interchange timing into and out of town',
        'High family- and short-term-rental volume on summer weekends',
      ],
      moverTips:
        'Prefer mid-week early starts outside peak river weekends when flexible. Confirm street width and parking near historic/Gruene edges. Inventory tourism-adjacent and family SFH carefully. Clarify New Braunfels ↔ north Bexar drive assumptions.',
      cityKeywords: [
        'new braunfels',
        'gruene',
        'loop 337',
        'new braunfels tx',
        'comal new braunfels',
      ],
    },
    {
      id: 'canyon-lake',
      name: 'Canyon Lake & Recreation Edge',
      shortName: 'Canyon Lake',
      neighborhoods: [
        'Canyon Lake',
        'FM-306 lake corridors',
        'Hillside and waterfront-edge pockets',
        'Recreation-adjacent residential',
        'Western Comal lake approaches',
      ],
      housingTypes:
        'Larger-lot SFH, hillside and recreation-adjacent homes, cabin-style and vacation-edge stock, limited multi-unit',
      challenges: [
        'Grades, longer approaches, and limited truck turnaround',
        'Weekend visitor traffic on peak recreation days',
        'Long empty miles from New Braunfels or I-35 staging',
        'Not interchangeable with flat I-35 HOA cul-de-sacs',
      ],
      moverTips:
        'Send driveway, grade, and turnaround photos before booking. Never assume New Braunfels grid truck assumptions transfer. Price Canyon Lake ↔ New Braunfels or Bexar as long locals with honest empty-mile time. Prefer mid-week lake windows when flexible.',
      cityKeywords: [
        'canyon lake',
        'canyon lake tx',
        'fm 306',
        'comal canyon lake',
      ],
    },
    {
      id: 'bulverde-garden-ridge',
      name: 'Bulverde & Garden Ridge',
      shortName: 'Bulverde / Garden Ridge',
      neighborhoods: [
        'Bulverde',
        'Garden Ridge',
        'US-281 / SH-46 approach edges',
        'Larger-lot and horse-country pockets',
        'North Bexar border residential',
      ],
      housingTypes:
        'Larger-lot SFH, acreage and equestrian-edge product, some HOA villages, limited multi-family',
      challenges: [
        'Long approaches and limited turnaround on acreage lots',
        'SH-46 / US-281 peak congestion toward San Antonio',
        'HOA and gate lists on newer villages',
        'Cross-county pairs into north Bexar job centers',
      ],
      moverTips:
        'Treat Bulverde/Garden Ridge as long-local jobs into Bexar. Collect access photos and gate lists early. Build SH-46 timing into estimates. Do not price like New Braunfels river-grid bungalows.',
      cityKeywords: [
        'bulverde',
        'garden ridge',
        'bulverde tx',
        'garden ridge tx',
        'sh 46',
      ],
    },
    {
      id: 'i35-growth-villages',
      name: 'I-35 Growth Villages',
      shortName: 'I-35 growth',
      neighborhoods: [
        'North New Braunfels growth tracts',
        'I-35 corridor multi-family',
        'Master-planned HOA villages',
        'Spring Branch edges',
        'Corridor new-construction phases',
      ],
      housingTypes:
        'New-construction SFH, master-planned HOA communities, townhomes, multi-family, rapid growth product',
      challenges: [
        'HOA COI, gate lists, and approved move hours',
        'I-35 peak congestion toward SA and Austin-direction pairs',
        'Incomplete roads and truck-turn constraints in newest phases',
        'High school-calendar Saturday demand',
      ],
      moverTips:
        'Collect HOA packets early. Price I-35 corridor pairs with honest portal time. Confirm builder access the week of the move in new sections. Prefer early summer starts for heat.',
      cityKeywords: [
        'spring branch',
        'i-35 new braunfels',
        'comal growth',
        'new braunfels hoa',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Comal County',
    intro:
      'Same square footage prices differently by tourism peaks, HOA soft costs, I-35 portal time, and whether the job is New Braunfels grid stock or Canyon Lake long-local.',
    drivers: [
      {
        title: 'I-35 / SH-46 / FM-306 corridor time',
        detail:
          'New Braunfels ↔ Bulverde, Canyon Lake ↔ I-35, or any peak corridor leg can burn far more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'Tourism & river-weekend soft costs',
        detail:
          'Peak visitor weekends tighten curb, parking, and staging near New Braunfels river and Gruene edges — forcing longer carries or mid-week reschedules.',
      },
      {
        title: 'Hillside & lake-edge access',
        detail:
          'Canyon Lake grades, longer approaches, and limited turnaround add labor and vehicle risk versus pure I-35 growth-tract jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,400+',
        note: 'Higher with multi-unit carries, tourism peaks, or heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,800+',
        note: 'HOA soft costs and I-35 corridor hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / Canyon Lake / long-local)',
        value: '$2,300–$5,800+',
        note: 'Lake-edge and Bulverde pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tourism & heat-calendar intelligence',
    intro:
      'Comal peaks follow river tourism, school calendars, extreme heat, and SA–Austin corridor spillover — not downtown lease density alone.',
    items: [
      {
        title: 'River & tourism peaks: roughly Memorial Day – Labor Day',
        detail:
          'Weekend visitor traffic tightens New Braunfels and Canyon Lake approaches. Prefer mid-week starts when flexible; treat peak Saturday river windows as high-friction.',
      },
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when heat and I-35 peaks are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'new-braunfels-tourism-logistics',
      title: 'New Braunfels tourism & river logistics',
      intro:
        'Comal’s defining urban product is river-town and tourism-edge access — not Bexar core elevators.',
      bullets: [
        'Prefer mid-week early starts outside peak river and Gruene weekends when flexible.',
        'Confirm curb, parking, and street width near historic and river-adjacent cores.',
        'Inventory tourism-adjacent and family-volume SFH carefully.',
        'Price New Braunfels ↔ north Bexar with honest I-35 portal time.',
      ],
    },
    {
      id: 'i35-corridor-freeflow',
      title: 'I-35 corridor freeflow (SA–Austin spine)',
      intro:
        'I-35, SH-46, FM-306, and Loop 337 turn “local” Comal pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for New Braunfels ↔ Bexar and Bulverde ↔ SA pairs.',
        'Build buffer for school and commute peaks on I-35 and SH-46.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
        'Collect HOA packets for I-35 growth villages before booking Saturday crews.',
      ],
    },
    {
      id: 'canyon-lake-hillside-access',
      title: 'Canyon Lake & hillside access',
      intro:
        'Lake-edge and Bulverde acreage product is grade, approach, and empty-mile work — not flat I-35 cul-de-sacs.',
      bullets: [
        'Verify grades, road width, and turnaround before dispatching a full-size truck.',
        'Prefer mid-week starts outside peak recreation weekends when flexible.',
        'Price New Braunfels ↔ Canyon Lake pairs with honest empty-mile and grade time.',
        'Share driveway and gate photos for larger-lot and hillside homes.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Corridor value, New Braunfels river-town product, and Canyon Lake recreation edges are different bets — validate schools and healthcare by pocket, then plan for heat and tourism calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include New Braunfels ISD and Comal ISD, with edge spillover into neighboring districts on growth corridors. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'New Braunfels ISD vs Comal ISD',
            detail:
              'In-town New Braunfels addresses often fall in New Braunfels ISD; much of Canyon Lake, Bulverde, Garden Ridge, and western/northern growth uses Comal ISD. Marketing names and new tracts can span feeders — verify with official boundary tools.',
          },
          {
            title: 'Growth-corridor boundary checks',
            detail:
              'I-35 and SH-46 growth product may sit near district edges. Do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'Resolute Health Hospital (New Braunfels) and other regional campuses serve greater Comal. Map ER drive times at rush hour from your target pocket — especially Canyon Lake and Bulverde edges.',
          },
          {
            title: 'Bexar specialty spillover',
            detail:
              'San Antonio medical campuses remain common for complex needs. Confirm insurer networks and realistic I-35 / SH-46 times.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer tourism and move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Comal resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of New Braunfels',
        href: 'https://www.newbraunfels.gov/',
        note: 'City services; HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Bulverde',
        href: 'https://www.bulverdetx.gov/',
        external: true,
      },
      {
        label: 'Comal County — official site',
        href: 'https://www.co.comal.tx.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (New Braunfels core, Canyon Lake, Bulverde/Garden Ridge, I-35 growth) when available. Confirm tourism-weekend staging, HOA packets on growth villages, and honest I-35 / SH-46 / Canyon Lake drive assumptions — this is an SA–Austin corridor, not Bexar core.',
  lastReviewed: '2026-07-24',
});
