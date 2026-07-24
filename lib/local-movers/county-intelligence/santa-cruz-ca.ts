import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  CA_TIER2_BHGS_BULLET,
  finalizeCaTier2Pack,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Santa Cruz County — California Tier 2 (coastal south-of-Bay secondary).
 * Parent: Santa Clara County (South Bay). Also contrast Monterey — not a peninsula clone.
 */
export const santaCruzCountyIntelligence: CountyIntelligencePack = finalizeCaTier2Pack({
  countySlug: 'santa-cruz',
  hubTitle: 'Santa Cruz County Moving Intelligence Hub',
  eyebrow: 'Santa Cruz County · Coastal secondary · South-of-Bay / mountain approaches',
  h1: 'Moving in Santa Cruz County: Coastal South-of-Bay Secondary, Narrow Access & Mountain Approaches',
  heroOpener:
    'Santa Cruz County is the coastal secondary south of the Bay — not a Santa Clara office-park suburb and not Monterey with the names swapped. Santa Cruz city and Live Oak mean narrow grids, tourism curb fights, and UCSC semester churn. Capitola and Aptos add beach-town staging limits; Watsonville runs valley multi-unit and ag-edge volume on CA-1 / CA-152 approaches; mountain and San Lorenzo Valley pockets demand CA-17 / CA-9 grade plans full-size boxes often cannot run. Fog, visitor weekends, and mountain weather rewrite “local.” Quote the pocket: beach town, UCSC multi-unit, Watsonville valley, or mountain approach — never “Santa Cruz County” as one product.',
  heroCredibility:
    'Coastal secondary · CA-17 mountain approaches · UCSC / tourism · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'CA-1 · CA-17 · CA-9 · CA-129 · CA-152 approaches',
  parentCompare: {
    parentLabel: 'Santa Clara County',
    parentHref: '/local-movers/california/santa-clara',
    title: 'Compared with Santa Clara County (and Monterey contrast)',
    intro:
      'Santa Cruz is a coastal south-of-Bay secondary — tourism, UCSC turnover, and mountain approaches, not Silicon Valley tract density. It also differs from Monterey’s peninsula/Salinas split. Use this when one address is Santa Clara County and the other is Santa Cruz; treat Monterey pairs as a separate Central Coast product.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'CA-17 is the mountain spine to San Jose; CA-1 runs the coast; CA-9 serves San Lorenzo Valley; CA-129 and CA-152 approaches link Watsonville toward the South Valley. Santa Cruz ↔ San Jose is a timed mountain-corridor haul, not a South Bay city-pair local. Coast ↔ mountain or Watsonville legs understate clock in fog, visitors, and grade.',
      },
      {
        title: 'Housing differences',
        detail:
          'Coastal cottages, hillside SFH, UCSC-adjacent multi-unit, Capitola/Aptos beach stock, Watsonville suburban/ag-edge homes, and mountain cabins replace South Bay condo and tract products. Premium coastal inventories and constrained mountain driveways both sit under one county label.',
      },
      {
        title: 'Truck access vs South Bay & Monterey',
        detail:
          'Downtown Santa Cruz and beach towns often need shuttles; CA-17 weather and closures rewrite Bay freeflow assumptions. Unlike Monterey’s Pebble Beach gated estates or Salinas ag valley, Santa Cruz volume mixes tourism curb loss with mountain grade and Watsonville multi-unit — not a peninsula golf-gate script.',
      },
      {
        title: 'Cost posture',
        detail:
          'Coastal staging and CA-17 mountain time push prices above many Santa Clara suburban locals of similar bedrooms. Tourist weekends, UCSC peaks, and mountain long-carries can dominate the bill even when square footage looks ordinary.',
      },
      {
        title: 'Market role',
        detail:
          'Coastal secondary south of the Bay: residential and tourism volume on the shore belt, university churn near UCSC, valley volume in Watsonville, mountain product on 17/9. Popular long-locals bias toward Santa Clara/South Bay and nearby Monterey/Central Coast secondaries — not a pure Silicon Valley rate card.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Santa Cruz County different',
    intro:
      'Secondary-market realities — narrow coastal access, UCSC/tourism calendars, mountain approaches, and California licensing.',
    bullets: [
      {
        title: 'Coast, valley, and mountains are different products',
        detail:
          'Santa Cruz beach grids, Capitola cottages, Watsonville multi-unit, and Felton/Boulder Creek mountain homes do not share truck access or climate. Name both cities — “Santa Cruz County local” fails across CA-1 ↔ CA-17 splits.',
      },
      {
        title: 'Narrow coastal streets and tourism curb loss',
        detail:
          'Visitor peaks fill downtown Santa Cruz, Boardwalk-adjacent blocks, Capitola Village, and summer beach approaches. Shuttle and long-carry language is common; mid-week mornings often win when leases allow.',
      },
      {
        title: 'UCSC semester churn',
        detail:
          'University move-in/move-out windows concentrate multi-unit load-outs near campus and student-adjacent stock. Book early and confirm building rules around academic peaks.',
      },
      {
        title: 'CA-17 / CA-9 mountain approaches',
        detail:
          'Grade, weather, closures, and limited turnaround rewrite Bay-area freeflow assumptions. Never assume a 26′ box reaches every San Lorenzo Valley or summit-edge door.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesHeading: 'Santa Cruz County zones: city coast, mid-county, Watsonville & mountains',
  zonesIntro:
    'Four sharp zones — Santa Cruz city / Live Oak, mid-county beach towns, Watsonville valley, and mountain / San Lorenzo Valley approaches. Access and corridor time define the job more than generic Bay tips.',
  zones: [
    {
      id: 'santa-cruz-city',
      name: 'Santa Cruz City, Live Oak & UCSC Edge',
      shortName: 'Santa Cruz',
      neighborhoods: [
        'Downtown Santa Cruz',
        'Westside / Eastside',
        'Seabright',
        'Live Oak',
        'UCSC-adjacent',
        'Twin Lakes edge',
      ],
      housingTypes:
        'Coastal multi-unit and cottages, hillside SFH, student-adjacent rentals, denser grid stock',
      challenges: [
        'Tourism and Boardwalk-adjacent curb scarcity',
        'Narrow streets, hills, and limited truck staging',
        'UCSC semester multi-unit peaks',
      ],
      moverTips:
        'Access-first photos for hillside and downtown blocks. Prefer mid-week mornings outside visitor peaks. Book early around UCSC move-in/out; confirm elevator/parking plans for multi-unit.',
      cityKeywords: [
        'santa cruz',
        'live oak',
        'seabright',
        'ucsc',
        'twin lakes',
        'westside santa cruz',
        'eastside santa cruz',
      ],
    },
    {
      id: 'midcounty-beach',
      name: 'Capitola, Aptos & Mid-County Coast',
      shortName: 'Mid-County',
      neighborhoods: [
        'Capitola',
        'Capitola Village',
        'Aptos',
        'Rio Del Mar edge',
        'Soquel',
        'Seacliff edge',
      ],
      housingTypes:
        'Beach cottages, mid-century SFH, hillside homes, limited multi-unit, HOA pockets',
      challenges: [
        'Village and beach-access staging limits',
        'CA-1 congestion on summer weekends',
        'Steep final approaches on some mid-county hillsides',
      ],
      moverTips:
        'Avoid peak tourist Saturdays for Capitola Village when flexible. Share driveway grade photos on hillside Aptos/Soquel stock. Price mid-county ↔ Santa Cruz city with CA-1 portal time.',
      cityKeywords: [
        'capitola',
        'aptos',
        'soquel',
        'rio del mar',
        'seacliff',
        'mid-county',
      ],
    },
    {
      id: 'watsonville-south',
      name: 'Watsonville & South County Valley',
      shortName: 'Watsonville',
      neighborhoods: [
        'Watsonville',
        'Freedom edge',
        'Pajaro edge',
        'CA-1 / CA-129 corridors',
        'CA-152 approaches',
      ],
      housingTypes:
        'Suburban SFH, multi-family, older urban stock, ag-adjacent edges',
      challenges: [
        'Ag freight on valley approaches',
        'Multi-unit parking scarcity',
        'Longer coastal haul to Santa Cruz city than map miles suggest in peak traffic',
      ],
      moverTips:
        'Price Watsonville ↔ Santa Cruz as a timed CA-1 local with ag and visitor buffer. Confirm multi-unit rules early. Flag farm-edge access on rural south-county parcels.',
      cityKeywords: [
        'watsonville',
        'freedom',
        'pajaro',
        'south county',
        'watsonville ca',
      ],
    },
    {
      id: 'mountain-slv',
      name: 'Mountain & San Lorenzo Valley Approaches',
      shortName: 'Mountains / SLV',
      neighborhoods: [
        'Scotts Valley',
        'Felton',
        'Ben Lomond',
        'Boulder Creek',
        'CA-17 corridor',
        'CA-9 San Lorenzo Valley',
      ],
      housingTypes:
        'Mountain SFH, cabin-style stock, hillside driveways, limited multi-unit — many constrained approaches',
      challenges: [
        'Narrow, winding roads and limited turnaround',
        'CA-17 weather, traffic, and occasional closures',
        'Canopy clearance and soft shoulders on final approaches',
      ],
      moverTips:
        'Never assume a standard box truck reaches the door — measure road width, grades, and turnaround before dispatch. Discuss shuttle for constrained SLV addresses. Price mountain ↔ coast or mountain ↔ San Jose with honest 17/9 clock and weather contingency.',
      cityKeywords: [
        'scotts valley',
        'felton',
        'ben lomond',
        'boulder creek',
        'san lorenzo valley',
        'ca-17',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Santa Cruz County',
    intro:
      'Compressed drivers — CA-17/coast corridor time, coastal staging, and mountain or tourism soft costs.',
    drivers: [
      {
        title: 'CA-17 / CA-1 / mountain cross-zone time',
        detail:
          'Santa Cruz ↔ San Jose, coast ↔ SLV, or Watsonville ↔ mid-county legs burn 45–120+ minutes depending on fog, visitors, and grade. Hourly billing follows the clock.',
      },
      {
        title: 'Coastal staging, shuttles & tourism curb loss',
        detail:
          'Downtown, Village, and beach blocks often need smaller trucks or long carries. Get shuttle fees in writing.',
      },
      {
        title: 'Mountain access & UCSC multi-unit soft costs',
        detail:
          'Constrained SLV approaches, weather contingency, and elevator/parking windows near campus add soft costs before labor starts.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$600–$1,800+',
        note: 'Higher with hills, shuttles, or multi-unit windows',
      },
      {
        label: '2–3BR house / condo',
        value: '$1,800–$5,000+',
        note: 'Coastal staging and CA-17 pairs trend up',
      },
      {
        label: '3–4+ BR (mountain approach / tourism peak / Bay corridor)',
        value: '$2,900–$8,500+',
        note: 'SLV access and Santa Cruz ↔ South Bay pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'Tourism, UCSC calendars, and mountain weather set risk more than mild coastal temperatures.',
    items: [
      {
        title: 'Peak tourism & residential (late spring – early fall)',
        detail:
          'Visitor weekends fill coastal curb space; school calendars and leases stack Saturday demand. Mid-week mornings reduce fights when community windows allow.',
      },
      {
        title: 'UCSC move-in / move-out peaks',
        detail:
          'Semester transitions concentrate multi-unit volume near campus and student-adjacent stock. Book early and confirm building rules.',
      },
      {
        title: 'CA-17 mountain weather & winter risk',
        detail:
          'Rain, fog, and occasional closures rewrite mountain and Bay-corridor timing. Build flexibility and written weather policies for SLV and 17-dependent pairs.',
      },
    ],
  },
  specialized: [
    {
      id: 'coastal-narrow-access',
      title: 'Narrow coastal access & tourism logistics',
      intro:
        'Beach towns and downtown grids are access jobs first — visitor calendars collide with residential Saturdays.',
      bullets: [
        'Share street-width, driveway, and turnaround photos for hillside and village addresses before booking.',
        'Expect shuttle or long-carry language on Capitola Village, downtown Santa Cruz, and tight beach blocks.',
        'Prefer mid-week mornings outside major visitor and festival weekends when flexible.',
      ],
    },
    {
      id: 'ucsc-turnover',
      title: 'UCSC university turnover',
      intro:
        'Campus-adjacent multi-unit creates academic peaks distinct from pure tourism or Bay tech calendars.',
      bullets: [
        'Align booking with semester move-in/out windows when either household is student- or faculty-adjacent.',
        'Confirm elevator reservations, parking plans, and building hours early.',
        'Treat UCSC-edge density as its own product — not a beach cottage quote with the city name swapped.',
      ],
    },
    {
      id: 'mountain-approaches',
      title: 'CA-17 / CA-9 mountain approach logistics',
      intro:
        'San Lorenzo Valley and 17-corridor homes need truck plans South Bay freeflow crews often skip.',
      bullets: [
        'Verify road suitability before dispatching a full-size truck on SLV and summit-edge addresses.',
        'Discuss weather contingency and alternate staging for CA-17-dependent pairs.',
        'Price mountain ↔ coast or mountain ↔ Santa Clara portal-to-portal — map miles understate grade and delay.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Santa Cruz County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test CA-17 commute tolerance and coastal vs mountain weather before choosing on price alone.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple districts (Santa Cruz City Schools pathways, Live Oak, Soquel Union, Pajaro Valley / Watsonville-area systems, San Lorenzo Valley, Scotts Valley, and others). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Unincorporated edges and mountain pockets can span feeders.',
          },
          {
            title: 'Coast vs Watsonville vs mountains',
            detail:
              'Program mix and enrollment pressure differ sharply. UC Santa Cruz and Cabrillo College shape rental demand near campus-adjacent and mid-county corridors.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail:
              'Dignity Health Dominican (Santa Cruz) and Watsonville Community Hospital / Pajaro Valley services cover different pockets — map ER drive times at rush hour and over CA-17 weather from your target neighborhood.',
          },
          {
            title: 'South Bay specialty spillover',
            detail:
              'Some residents use Santa Clara County specialty systems. Confirm insurer networks and realistic CA-17 appointment times before choosing a far-mountain or far-south address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Santa Cruz County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Santa Cruz',
        href: 'https://www.santacruzcountyca.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Santa Cruz',
        href: 'https://www.cityofsantacruz.com/',
        external: true,
      },
      {
        label: 'City of Watsonville',
        href: 'https://www.cityofwatsonville.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Santa Cruz, Mid-County, Watsonville, Mountains/SLV) when available. Confirm coastal staging, UCSC timing, CA-17 weather, and never assume full-size trucks on constrained mountain approaches. Parent South Bay: Santa Clara guide; nearby Central Coast secondary: Monterey.',
  lastReviewed: '2026-07-24',
});
