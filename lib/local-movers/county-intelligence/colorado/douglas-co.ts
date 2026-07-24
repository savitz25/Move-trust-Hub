import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * Douglas County, CO — Highlands Ranch / Castle Rock / Parker master-planned HOAs
 * (not Denver elevators, not Adams airport growth).
 */
export const douglasCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'douglas',
  hubTitle: 'Douglas County Moving Intelligence Hub',
  eyebrow: 'Douglas · South metro · Highlands Ranch, Castle Rock, Parker & HOAs',
  h1: 'Moving in Douglas County: Highlands Ranch HOAs, Castle Rock Access & Parker Logistics',
  heroOpener:
    'Douglas County is Denver’s southern master-planned belt: Highlands Ranch villages and trail-connected HOAs, Parker family tracts along Founders and Lincoln, Castle Rock foothills-edge subdivisions, and Lone Tree / RidgeGate denseness where elevators meet gate lists. A Highlands Ranch HOA truck-limit packet, a Parker two-story with basement finish, a Castle Rock hillside driveway, and a Lone Tree mid-rise COI do not share truck access or crew skill. I-25, C-470, E-470, US-85, and Founders/Lincoln corridors rewrite “local” estimates that ignore HOA approved hours, school-calendar peaks, and south-metro portal time. This hub is for people moving in Douglas County — not a renamed RiNo loft page or generic Colorado template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Douglas master-planned HOA, Castle Rock & Parker corridor awareness · Curated listings',
  majorCorridors: 'I-25 · C-470 · E-470 · US-85 · Founders/Lincoln corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Douglas County different',
    intro:
      'These are Douglas south-metro realities — Highlands Ranch / Parker / Castle Rock master-planned HOA rules, school-calendar demand, and I-25 / C-470 logistics — not Denver walk-up micro-markets or Adams airport-adjacent growth sprawl.',
    bullets: [
      {
        title: 'Master-planned HOA fabric dominates the residential map',
        detail:
          'Highlands Ranch, Parker villages, Castle Pines, Sterling Ranch edges, and similar tracts routinely require gate lists, truck-length limits, approved hours, dumpster rules, and COI naming. Collect packets early or lose the crew day at the gate.',
      },
      {
        title: 'I-25, C-470, and E-470 turn short map miles into billable hours',
        detail:
          'Highlands Ranch ↔ Parker, Lone Tree ↔ Castle Rock, or Douglas ↔ DTC pairs look local and still burn 35–90+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Castle Rock mixes HOA product with foothills driveway grade',
        detail:
          'Not every Douglas job is a flat Highlands Ranch cul-de-sac. Hillside approaches, longer drives, and wind exposure change labor and truck selection.',
      },
      {
        title: 'Parker Founders / Lincoln corridors concentrate family SFH demand',
        detail:
          'Large inventories, finished basements, and garage overflow are common. Flight counts and patio sets drive crew hours more than square footage marketing claims.',
      },
      {
        title: 'Lone Tree and RidgeGate add vertical product inside an HOA county',
        detail:
          'Mid-rise condo and multifamily near I-25 need elevator reservations and building COIs — a different skill stack than village SFH gates a few miles away.',
      },
      {
        title: 'School calendars and corporate south-metro cycles cluster peaks',
        detail:
          'Douglas County School District calendars and DTC reverse-commuters compress Saturday demand late May–mid-August while mid-week HOA windows stay underused.',
      },
      {
        title: 'Cross-county south-metro pairs are routine',
        detail:
          'Households regularly move Douglas ↔ Arapahoe, Denver, El Paso County (Colorado Springs corridor), or out of state. Clarify addresses so Colorado PUC HHG vs FMCSA assumptions stay accurate when any leg leaves Colorado.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'Douglas County access zones',
  zonesIntro:
    'Plan by Highlands Ranch villages, Lone Tree / RidgeGate denseness, Parker Founders–Lincoln family corridors, Castle Rock / Castle Pines foothills-edge, and Sterling Ranch / west-growth filings — access rules cluster by HOA and corridor more than ZIP alone.',
  zones: [
    {
      id: 'highlands-ranch',
      name: 'Highlands Ranch villages & trail-connected HOAs',
      shortName: 'Highlands Ranch',
      neighborhoods: [
        'Highlands Ranch',
        'Backcountry edges',
        'Northridge / Town Center edges',
        'Wildcat / Falcon hills edges',
        'C-470 Highlands Ranch residential',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, limited multifamily',
      challenges: [
        'HOA gate lists, truck limits, and approved hours',
        'C-470 peak freeflow collapse',
        'Finished basements and large family inventories',
      ],
      moverTips:
        'Collect HOA packets and COI naming first. Survey basement access and garage overflow. Price C-470 pairs honestly for any DTC- or Denver-linked job.',
      cityKeywords: [
        'highlands ranch',
        'backcountry',
        'wildcat',
        'falcon hills',
        'highlands ranch town center',
      ],
    },
    {
      id: 'lone-tree-ridgegate',
      name: 'Lone Tree, RidgeGate & I-25 denseness',
      shortName: 'Lone Tree / RidgeGate',
      neighborhoods: [
        'Lone Tree',
        'RidgeGate',
        'Lincoln Station edges',
        'Park Meadows-adjacent residential',
        'I-25 south multifamily',
      ],
      housingTypes: 'Mid-rise condo, multifamily stacks, denser townhomes, HOA SFH edges',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'I-25 / C-470 / Lincoln congestion',
        'Mixed tower vs SFH product on short distances',
      ],
      moverTips:
        'Book elevators and COIs in writing before crew day. Confirm unit type before final estimate. Prefer mid-week early freight windows near retail peaks.',
      cityKeywords: [
        'lone tree',
        'ridgegate',
        'lincoln station',
        'park meadows',
        'lone tree colorado',
      ],
    },
    {
      id: 'parker-founders-lincoln',
      name: 'Parker, Founders Parkway & Lincoln corridor family tracts',
      shortName: 'Parker / Founders–Lincoln',
      neighborhoods: [
        'Parker',
        'Founders Parkway corridors',
        'Lincoln Avenue corridors',
        'Stroh Ranch edges',
        'The Pinery edges',
      ],
      housingTypes: 'HOA SFH, larger family homes, townhomes, some larger-lot edges',
      challenges: [
        'Founders / Lincoln peak freeflow collapse',
        'HOA rules and school-calendar Saturday demand',
        'Long driveway carries and basement finishes',
      ],
      moverTips:
        'Book peak Saturdays early. Collect HOA packets. Inventory basements, patio sets, and garage storage carefully for larger SFH.',
      cityKeywords: [
        'parker',
        'founders',
        'stroh ranch',
        'the pinery',
        'lincoln parker',
      ],
    },
    {
      id: 'castle-rock-castle-pines',
      name: 'Castle Rock, Castle Pines & I-25 south foothills-edge',
      shortName: 'Castle Rock / Castle Pines',
      neighborhoods: [
        'Castle Rock',
        'Castle Pines',
        'The Meadows edges',
        'Terrain / Crystal Valley edges',
        'Downtown Castle Rock edges',
      ],
      housingTypes: 'HOA SFH, hillside product, townhomes, limited multifamily near core',
      challenges: [
        'I-25 peak congestion and longer empty miles from north yards',
        'Driveway grade on foothills-edge tracts',
        'HOA packets on growth villages',
      ],
      moverTips:
        'Photo driveway grade and turn radius. Price I-25 portal time and empty miles honestly. Prefer early starts before recreational traffic builds on peak weekends.',
      cityKeywords: [
        'castle rock',
        'castle pines',
        'the meadows',
        'crystal valley',
        'terrain',
      ],
    },
    {
      id: 'sterling-ranch-west-growth',
      name: 'Sterling Ranch, Roxborough edges & west Douglas growth',
      shortName: 'Sterling Ranch / West growth',
      neighborhoods: [
        'Sterling Ranch',
        'Roxborough edges',
        'West Douglas new filings',
        'Chatfield-adjacent Douglas pockets',
      ],
      housingTypes: 'New master-planned HOA SFH, townhomes, active construction tracts',
      challenges: [
        'Incomplete curb, construction detours, and changing gate rules',
        'Longer access roads and empty miles',
        'HOA / builder move restrictions on new closings',
      ],
      moverTips:
        'Reconfirm street acceptance and gate codes day-of. Collect builder and HOA documents early. Share driveway photos while landscaping is still unfinished.',
      cityKeywords: [
        'sterling ranch',
        'roxborough',
        'west douglas',
        'chatfield douglas',
      ],
    },
    {
      id: 'larkspur-south-edge',
      name: 'Larkspur, south county & semi-rural Douglas edges',
      shortName: 'Larkspur / South edge',
      neighborhoods: [
        'Larkspur',
        'Southern Douglas rural-lot edges',
        'Perry Park edges',
        'I-25 far-south residential pockets',
      ],
      housingTypes: 'Larger-lot SFH, semi-rural drives, scattered HOA pockets',
      challenges: [
        'Long private drives and limited truck turnaround',
        'Long empty miles from metro staging yards',
        'Weather and wind exposure on open approaches',
      ],
      moverTips:
        'Pre-walk drive length and surface. Price empty miles explicitly. Prefer crews comfortable with semi-rural access and weather contingency.',
      cityKeywords: [
        'larkspur',
        'perry park',
        'southern douglas',
        'larkspur colorado',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Douglas County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, basement labor, Lone Tree elevators, and I-25 / C-470 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Master-planned HOA rules',
        detail:
          'Gate lists, truck limits, and weekday-only windows push demand into peak pricing across Highlands Ranch, Parker, and Castle Rock villages.',
      },
      {
        title: 'I-25 · C-470 · E-470 · Founders/Lincoln congestion',
        detail:
          'Cross-zone south-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Finished basements & large family inventories',
        detail:
          'Parker and Highlands Ranch SFH commonly add flights, patio sets, and garage overflow.',
      },
      {
        title: 'Lone Tree elevators & building COIs',
        detail:
          'Vertical product inside an HOA county adds labor and schedule risk that pure SFH quotes miss.',
      },
      {
        title: 'Castle Rock empty miles & foothills grade',
        detail:
          'Longer runs from north yards plus driveway elevation raise real cost vs Highlands Ranch flat cul-de-sacs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,650+',
        note: 'Higher with elevators, HOA gates, or peak I-25 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,450–$4,300+',
        note: 'HOA and basement soft costs trend up',
      },
      {
        label: '3–4+ BR / large HOA SFH / cross-zone',
        value: '$2,900–$8,800+',
        note: 'Large Parker / Highlands Ranch inventories and Castle Rock pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$205+/hr',
        note: 'Portal-to-portal; packing and COI admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Douglas County move',
    intro:
      'School calendars, HOA approved hours, summer storms, winter freeze–thaw, and I-25 south peaks reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear HOA gates, ease Lone Tree freight windows, and reduce I-25 / C-470 pain. Avoid month-end Fridays when closings and elevators collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Highlands Ranch, Parker, and Castle Rock SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends and elevator slots.',
      },
      {
        title: 'Summer heat and afternoon storms',
        detail:
          'Front Range heat and pop-up storms slow exterior carries on open cul-de-sacs. Prefer early starts and tarp plans.',
      },
      {
        title: 'Winter: ice on shaded HOA walks and Castle Rock grades',
        detail:
          'November–March adds icy driveways and delayed gate access after overnight snow. Prefer flexible dates and early starts with ice contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'douglas-hoa-master-planned',
      title: 'Douglas master-planned HOA, Parker & Castle Rock logistics module',
      intro:
        'Douglas estimates fail more often on HOA packets, basement inventories, and I-25 / C-470 portal time than on packing skill alone.',
      bullets: [
        'Collect HOA gate lists, truck-length limits, approved hours, dumpster rules, and COI naming before the survey is final.',
        'Collect building COI, elevator reservations, and dock rules for Lone Tree / RidgeGate vertical product.',
        'Price portal-to-portal time for any pair that rides I-25, C-470, E-470, US-85, or Founders/Lincoln at peak.',
        'Inventory finished basements, patio sets, and garage overflow explicitly on Highlands Ranch and Parker SFH.',
        'Photo driveway grade for Castle Rock / Castle Pines foothills-edge product.',
        'Clarify Douglas vs Arapahoe / Denver / El Paso County destinations on every estimate.',
        'Verify Colorado PUC household goods (HHG) permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'south-metro-school-corporate',
      title: 'South-metro school-calendar & DTC reverse-commute module',
      intro:
        'Many Douglas households move on district calendars and corporate south-metro timelines that do not flex with Saturday-only crews.',
      bullets: [
        'Ask about school start dates, lease ends, and hard report-to-office dates at estimate time.',
        'Prefer mid-week HOA windows when Saturday gate slots are already full.',
        'Clarify storage-in-transit needs for temporary housing during new-build delays.',
        'Match large family inventories to crews experienced with multi-level HOA product.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Douglas County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures village or town fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Douglas County School District (DCSD) covers most county addresses. Assignment is address-based — marketing names like Highlands Ranch or RidgeGate do not guarantee a campus.',
          },
          {
            title: 'Growth and capacity',
            detail:
              'Parker, Castle Rock, and west-growth filings can see enrollment pressure. Ask DCSD about capacity, boundary adjustments, and busing when touring new villages.',
          },
          {
            title: 'Research sources',
            detail:
              'DCSD boundary tools, Colorado Department of Education data, and campus visits beat ranking screenshots alone.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'UCHealth Highlands Ranch Hospital, Castle Rock Adventist / regional campuses, Sky Ridge and other south-metro HealthONE options, and Children’s Hospital Colorado network care serve Douglas residents. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Parker or Castle Rock to preferred campuses — I-25 and C-470 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Master-planned SFH, Lone Tree denseness & foothills edges',
            detail:
              'Expect village HOA product across Highlands Ranch and Parker; mid-rise/multifamily near Lone Tree; hillside and larger-lot product around Castle Rock and Castle Pines; and new filings at Sterling Ranch.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary from denser Lone Tree product to larger Parker and Castle Rock homes. Budget for HOA dues, basement finish quality, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA governance is the default',
            detail:
              'Most neighborhoods control move hours, truck size, exterior work, and deposits. Read covenants carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Douglas areas fit whom',
        bullets: [
          {
            title: 'Highlands Ranch planned-community living',
            detail:
              'Suits families prioritizing trails, amenities, and established villages — with HOA logistics and C-470 reverse-commute peaks.',
          },
          {
            title: 'Parker Founders–Lincoln family corridors',
            detail:
              'Often appeals for larger SFH and school-focused neighborhoods — with arterial congestion and basement inventories on move day.',
          },
          {
            title: 'Castle Rock / Castle Pines foothills-edge',
            detail:
              'Attracts households seeking slightly more space and foothills character — with driveway grade and longer I-25 runs.',
          },
          {
            title: 'Lone Tree / RidgeGate denser living',
            detail:
              'Fits people prioritizing I-25 access and multifamily amenities — with elevator COIs and retail-corridor traffic.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment anchors',
            detail:
              'Many residents reverse-commute to DTC, Denver, and Inverness; local healthcare, retail, and Castle Rock / Parker service employment also matter. Some households link south toward Colorado Springs-edge corridors.',
          },
          {
            title: 'Commute realism',
            detail:
              'Car dependence is high outside light-rail nodes at Lincoln / RidgeGate. I-25, C-470, E-470, US-85, and Founders/Lincoln peaks are real. Test drive peak routes before choosing solely on HOA amenities.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, master-planned south metro',
            detail:
              'Douglas stacks Highlands Ranch villages, Parker growth, Castle Rock foothills-edge, and Lone Tree denseness — different from Denver’s loft/walk-up core or Adams’s north-metro airport growth belt.',
          },
          {
            title: 'Climate',
            detail:
              'Front Range sun, summer thunderstorms, open-prairie wind on eastern tracts, and winter freeze–thaw. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Trail systems, youth sports, and school calendars dominate daily rhythm; retail energy clusters near Park Meadows, Parker, and Castle Rock. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Douglas County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Douglas County — official site',
        href: 'https://www.douglas.co.us/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Douglas County School District',
        href: 'https://www.dcsdk12.org/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Town of Castle Rock',
        href: 'https://www.crgov.com/',
        external: true,
        note: 'Municipal services & info',
      },
      {
        label: 'CDOT COtrip — road conditions',
        href: 'https://www.cotrip.org/',
        external: true,
        note: 'I-25 / C-470 / E-470 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with master-planned HOA fluency for Highlands Ranch / Parker / Castle Rock product; elevator/COI experience for Lone Tree / RidgeGate; driveway-grade awareness for Castle Pines edges; honest I-25 · C-470 · E-470 · Founders/Lincoln timing for cross-zone pairs. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
