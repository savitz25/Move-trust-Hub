import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  CA_TIER2_BHGS_BULLET,
  finalizeCaTier2Pack,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Tulare County — California Tier 2 (Visalia–Tulare Valley secondary vs Fresno).
 * Parent: Fresno County Tier 1. Not a renamed Fresno metro script.
 */
export const tulareCountyIntelligence: CountyIntelligencePack = finalizeCaTier2Pack({
  countySlug: 'tulare',
  hubTitle: 'Tulare County Moving Intelligence Hub',
  eyebrow: 'Tulare County · Valley secondary · Visalia–Tulare / Fresno collar',
  h1: 'Moving in Tulare County: Visalia–Tulare Valley Secondary, Ag Logistics & Fresno Collar',
  heroOpener:
    'Tulare County is the Visalia–Tulare Valley secondary south of Fresno — not Fresno metro with the city names swapped. Visalia and Tulare run family suburban stock, multi-unit pockets, and CA-99 / CA-198 timing; Porterville and south-county edges add longer ag-adjacent hauls; the foothills toward Three Rivers and Sequoia approaches demand grade and canopy plans valley crews often skip. Summer heat rewrites outdoor packing windows. Crews that paste a Fresno rate card without naming Visalia vs Porterville vs foothill access underprice ag freight delay, cross-99 portal time, and farm-edge long carries.',
  heroCredibility:
    'Valley secondary · Visalia–Tulare hub · Ag logistics · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'CA-99 · CA-198 · CA-63 · CA-65 · CA-190',
  parentCompare: {
    parentLabel: 'Fresno County',
    parentHref: '/local-movers/california/fresno',
    title: 'Compared with Fresno County',
    intro:
      'Tulare is a Visalia–Tulare Valley secondary and Fresno collar — not Clovis/Fresno elevator density with a different ZIP. Use this when one address sits in Fresno County and the other in Tulare.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'CA-99 is the north–south spine toward Fresno; CA-198 links Visalia–Tulare–Hanford approaches; CA-63, CA-65, and CA-190 feed south-county and foothill pairs. Visalia ↔ Fresno is a timed inter-county local, not a same-metro city-pair. Porterville or foothill legs add ag two-lane clock Fresno grid quotes miss.',
      },
      {
        title: 'Housing differences',
        detail:
          'Visalia family tracts and multi-unit, Tulare in-town stock, Porterville suburban/ag-edge homes, and foothill SFH replace many Fresno/Clovis product types. Farm outbuildings and rural driveways appear more often on Tulare edges than core Fresno multi-unit jobs.',
      },
      {
        title: 'Truck access, ag & density',
        detail:
          'Harvest and packing seasons congest 99 approaches and farm-adjacent roads. Visalia arterials stage more easily than foothill grades toward Three Rivers. Fresno loading-dock assumptions do not transfer to ranch-edge or Sequoia-approach parcels.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Visalia jobs can look Valley-simple until heat and multi-unit windows hit. Visalia ↔ Porterville, Visalia ↔ Fresno, and foothill pairs price higher on corridor time, ag delay, and long-carry access than flat Fresno locals of similar bedrooms.',
      },
      {
        title: 'Market role',
        detail:
          'South Valley secondary: residential volume in Visalia–Tulare plus ag-economy logistics and foothill edges. Popular long-locals bias toward Fresno County and nearby Valley secondaries — not a pure Fresno metro rate card.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Tulare County different',
    intro:
      'Secondary-market realities — Visalia–Tulare suburban volume, ag corridor timing, foothill access, and California licensing.',
    bullets: [
      {
        title: 'Visalia–Tulare is not Fresno metro',
        detail:
          'Family suburban stock, mid-size multi-unit, and in-town grids dominate the hub — not Fresno tower or Clovis growth scripts. Name both cities on the estimate; “Tulare County local” fails across Visalia ↔ Porterville or foothill pairs.',
      },
      {
        title: 'Ag logistics choke harvest windows',
        detail:
          'Farm trucks, packing houses, and 99 freight peaks slow cross-county and south-county legs. Build buffer on CA-198 / CA-65 / CA-190 approaches during harvest — portal-to-portal time, not map miles, sets the bill.',
      },
      {
        title: 'Family suburban vs foothill access',
        detail:
          'Planned Visalia tracts stage differently than Three Rivers / Sequoia-approach grades, canopy, and limited turnaround. Share driveway photos on foothill and rural-edge jobs before dispatch.',
      },
      {
        title: 'Valley summer heat',
        detail:
          'Afternoon highs rewrite outdoor packing, electronics protection, and crew hydration. Prefer early starts on summer Visalia–Tulare and south-county jobs.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesHeading: 'Tulare County zones: Visalia hub, Tulare, south county & foothills',
  zonesIntro:
    'Four sharp zones — Visalia metro, City of Tulare / west approaches, Porterville–south county, and foothill / Sequoia edges. Ag timing and heat define the job more than generic Fresno tips.',
  zones: [
    {
      id: 'visalia-metro',
      name: 'Visalia Metro & North Hub',
      shortName: 'Visalia',
      neighborhoods: [
        'Downtown Visalia',
        'North / East / West Visalia',
        'Mooney Boulevard corridor',
        'Visalia multi-unit pockets',
        'Goshen edge',
      ],
      housingTypes:
        'Family SFH tracts, multi-family and condos, older in-town stock, newer suburban edges',
      challenges: [
        'CA-99 / CA-198 peak congestion toward Fresno and Tulare',
        'Multi-unit elevators and reserved move windows',
        'Summer heat on open suburban staging',
      ],
      moverTips:
        'Early weekday starts beat heat and 99 peaks. Confirm elevator/COI for multi-unit. Price Visalia ↔ Fresno or Visalia ↔ Porterville as timed corridor locals — not map-mile quotes.',
      cityKeywords: [
        'visalia',
        'goshen',
        'mooney',
        'north visalia',
        'east visalia',
        'west visalia',
      ],
    },
    {
      id: 'tulare-west',
      name: 'City of Tulare & West Approaches',
      shortName: 'Tulare',
      neighborhoods: [
        'Tulare',
        'Downtown Tulare',
        'North / South Tulare',
        'CA-99 Tulare approaches',
        'Tagus / west edge',
      ],
      housingTypes:
        'Suburban SFH, multi-family, older urban stock, ag-adjacent edges',
      challenges: [
        '99 freight and event/fair-season traffic spikes',
        'Cross-town Visalia pairs still burn arterial clock',
        'Ag-edge soft shoulders and long carries',
      ],
      moverTips:
        'Flag fairgrounds and peak-event weekends when flexible. Price Tulare ↔ Visalia portal-to-portal on 99/198 approaches. Note farm-edge access on west and south parcels.',
      cityKeywords: ['tulare', 'tagus', 'tulare ca', 'city of tulare'],
    },
    {
      id: 'porterville-south',
      name: 'Porterville & South County',
      shortName: 'South County',
      neighborhoods: [
        'Porterville',
        'Lindsay',
        'Exeter edge',
        'Strathmore edge',
        'CA-65 / CA-190 corridors',
      ],
      housingTypes:
        'Suburban SFH, small-town multi-unit, ag-edge lots, ranch-adjacent stock',
      challenges: [
        'Longer deadhead from Visalia hub crews',
        'Ag harvest congestion on south-county roads',
        'Heat and limited service density outside Porterville core',
      ],
      moverTips:
        'Treat Visalia ↔ Porterville as a full timed local with ag buffer. Share road-width and turnaround photos on rural final approaches. Book early around harvest peaks.',
      cityKeywords: [
        'porterville',
        'lindsay',
        'exeter',
        'strathmore',
        'south county',
      ],
    },
    {
      id: 'foothill-sequoia',
      name: 'Foothills & Sequoia Approaches',
      shortName: 'Foothills',
      neighborhoods: [
        'Three Rivers',
        'Lemon Cove edge',
        'Springville edge',
        'CA-198 foothill approaches',
        'Sequoia gateway edges',
      ],
      housingTypes:
        'Foothill SFH, cabin-style stock, rural driveways, limited multi-unit — many constrained approaches',
      challenges: [
        'Grade, canopy, and limited truck turnaround',
        'Longer portal time from Visalia valley floor',
        'Weather and visitor traffic on gateway weekends',
      ],
      moverTips:
        'Access-first: driveway grade, road width, and turnaround photos before dispatch. Never assume a full-size box reaches every foothill door — discuss shuttle or long-carry. Price foothill ↔ Visalia with honest elevation and two-lane clock.',
      cityKeywords: [
        'three rivers',
        'lemon cove',
        'springville',
        'sequoia',
        'foothills',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Tulare County',
    intro:
      'Compressed drivers — cross-zone 99/198 time, ag delay and rural access, and when the pair leaves Visalia for south county or foothills.',
    drivers: [
      {
        title: 'CA-99 / CA-198 / south-county corridor time',
        detail:
          'Visalia ↔ Fresno, Visalia ↔ Porterville, or Tulare ↔ foothill legs burn more clock than Valley map miles — especially harvest days. Hourly billing follows the clock.',
      },
      {
        title: 'Ag logistics & rural / farm-edge access',
        detail:
          'Freight peaks, soft shoulders, long driveways, and outbuilding carries add labor before boxes move. Get long-carry and shuttle fees in writing.',
      },
      {
        title: 'Summer heat & multi-unit soft costs',
        detail:
          'Heat slows packing; elevator COI and reserved windows in Visalia multi-unit add soft costs before the truck rolls.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,400+',
        note: 'Higher with elevators, heat delays, or rural long-carry',
      },
      {
        label: '2–3BR house / family tract',
        value: '$1,400–$3,800+',
        note: 'Cross-99 pairs and ag-edge access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / foothills / Fresno collar)',
        value: '$2,200–$6,500+',
        note: 'Foothill access and Visalia ↔ Fresno pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'School calendars, harvest freight, and Valley heat set risk more than mild winter temperatures.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Visalia and Tulare. Book 2–4 weeks ahead for popular multi-unit and family-tract windows.',
      },
      {
        title: 'Harvest freight peaks (variable by crop; often summer – fall)',
        detail:
          'Ag trucks congest 99, 198, 65, and farm-adjacent roads. Prefer mid-week mornings for south-county and ag-edge pairs when lease windows allow.',
      },
      {
        title: 'Valley summer heat',
        detail:
          'Afternoon highs can be extreme. Early starts, shaded staging, and heat-safe packing for electronics protect inventory and crews.',
      },
    ],
  },
  specialized: [
    {
      id: 'ag-corridor-logistics',
      title: 'Ag corridor & harvest logistics',
      intro:
        'Tulare’s secondary role includes farm freight and packing-season delay Valley residential crews often underprice.',
      bullets: [
        'Build harvest-season buffer on CA-99, CA-198, CA-65, and CA-190 approaches.',
        'Note packing-house and farm-road adjacency on the survey for south-county addresses.',
        'Price portal-to-portal time honestly when either address leaves Visalia for ag-edge towns.',
      ],
    },
    {
      id: 'family-suburban-stock',
      title: 'Family suburban & multi-unit Visalia–Tulare stock',
      intro:
        'Hub volume is family tracts and mid-size multi-unit — not Fresno tower product.',
      bullets: [
        'Collect elevator reservations and building rules early for Visalia multi-unit.',
        'Confirm driveway and HOA/parking rules on newer suburban tracts.',
        'Prefer early summer starts on open street staging.',
      ],
    },
    {
      id: 'foothill-access',
      title: 'Foothill & Sequoia-approach access',
      intro:
        'Three Rivers and gateway edges need truck plans valley floor jobs never see.',
      bullets: [
        'Share driveway grade, canopy clearance, and turnaround photos before booking.',
        'Discuss shuttle options when a full-size box cannot stage at the door.',
        'Price foothill ↔ Visalia with two-lane and elevation clock — not flat Valley map miles.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Tulare County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test 99 commute to Fresno and heat tolerance for the address you want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple districts (Visalia Unified, Tulare City and Tulare Joint Union pathways, Porterville Unified, Exeter, Lindsay, and foothill/smaller systems). Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Visalia hub vs south county vs foothills',
            detail:
              'Enrollment pressure and program mix differ by pocket. College of the Sequoias shapes some rental and traffic patterns near Visalia campus-adjacent areas.',
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
              'Kaweah Health (Visalia) anchors the north hub; Adventist Health Tulare, Sierra View (Porterville), and other south-county services cover different pockets — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Fresno specialty spillover',
            detail:
              'Some households use Fresno County specialty networks. Confirm insurer networks and realistic CA-99 appointment times before choosing a far-south or foothill-only address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Tulare County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Tulare',
        href: 'https://tularecounty.ca.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Visalia',
        href: 'https://www.visalia.city/',
        external: true,
      },
      {
        label: 'City of Tulare',
        href: 'https://www.tulare.ca.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Visalia, Tulare, South County, Foothills) when available. Confirm ag-season timing, heat starts, and foothill access photos — not Fresno metro assumptions alone. Parent Valley market: Fresno guide for long-haul context.',
  lastReviewed: '2026-07-24',
});
