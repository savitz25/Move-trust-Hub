import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Clayton County, Georgia moving intelligence.
 * Airport-adjacent logistics, south-metro housing, I-75 corridor — not north-metro tech suburbs.
 */
export const claytonCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'clayton',
  hubTitle: 'Clayton County Moving Intelligence Hub',
  eyebrow: 'Clayton · South metro Atlanta · Airport & I-75 corridor',
  h1: 'Moving in Clayton County: Airport Edges, South-Metro Housing & I-75 Access',
  heroOpener:
    'Clayton County is Atlanta’s south-metro airport and interstate puzzle — Hartsfield-Jackson flight paths and cargo edges, I-75 and I-285 choke points, older and mid-century southside stock, and growing multifamily corridors that do not behave like Alpharetta cul-de-sacs. A “local” move can mean a garden apartment near the airport one day and a long I-75 haul toward Henry or Fulton the next. This guide is built for Clayton realities — jet noise, south-metro traffic, and southside access — not a north-metro HOA script.',
  heroCredibility:
    'Georgia DPS MCCD for intrastate household goods · FMCSA for interstate legs · Airport & I-75 corridor awareness · Curated directory listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Clayton County different',
    intro:
      'Airport adjacency, south-metro arterials, and mixed older/newer housing stock define estimates here more than north-Atlanta tech-corridor culture.',
    bullets: [
      {
        title: 'Airport-adjacent traffic is a real line item',
        detail:
          'Hartsfield-Jackson passenger and cargo patterns, rental-car loops, and Camp Creek / Riverdale corridors create mid-day and peak delays that map apps understate. Origin and destination near airport edges need honest portal buffers.',
      },
      {
        title: 'I-75 and I-285 define most cross-zone time',
        detail:
          'North–south and loop trips through Clayton often hinge on I-75 interchanges and the southern I-285 arc. Peak freights and airport-bound traffic turn short miles into billable hours.',
      },
      {
        title: 'South-metro housing is not north-metro product',
        detail:
          'Older ranch and split-level stock, garden apartments, and newer townhome pockets mix on the same estimate sheet. Stairs, long carries, and tight courts show up more than master-plan elevator towers.',
      },
      {
        title: 'Multifamily and lease-end clusters near corridors',
        detail:
          'Apartment and townhome turnover along major arterials compresses weekend calendars. Building rules, reserved loading, and shared parking change labor more than pure square footage.',
      },
      {
        title: 'Cross-county south-metro pairs are routine',
        detail:
          'Households regularly move Clayton ↔ Fulton, Henry, Fayette, or DeKalb. Price the full south-metro drive — not a single “Atlanta local” rate without both addresses.',
      },
      {
        title: 'Heat, humidity & summer family peaks',
        detail:
          'Georgia summers punish late starts and unshaded lots. School calendars and weekend SFH demand fill first; early mid-week windows remain the value play.',
      },
      {
        title: 'Working corridors vs quiet residential pockets',
        detail:
          'Industrial and logistics edges near the airport differ from interior residential streets in Jonesboro, Morrow, and Riverdale. Staging and truck approach change by pocket.',
      },
      {
        title: 'Georgia DPS MCCD vs FMCSA authority',
        detail:
          'Moves entirely within Georgia are generally subject to Georgia DPS Motor Carrier Compliance Division (MCCD) household-goods frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority — verify the legal name on the estimate.',
      },
    ],
  },
  zonesHeading: 'Clayton County zones: airport edges, south corridors & residential cores',
  zonesIntro:
    'Price each pocket as its own access and traffic problem. Airport-adjacent multifamily, Jonesboro core, Riverdale corridors, and I-75 edge tracts are not one Clayton product.',
  zones: [
    {
      id: 'airport-edge',
      name: 'Airport edge & Camp Creek / College Park influence',
      shortName: 'Airport edge',
      neighborhoods: [
        'Hartsfield-Jackson adjacent corridors',
        'College Park edge influence',
        'Camp Creek corridors',
        'Airport cargo / logistics edges',
        'Riverdale north approaches',
      ],
      housingTypes:
        'Garden apartments, mid-rise multifamily, older SFH, corridor commercial-adjacent residential',
      challenges: [
        'Airport and cargo traffic windows',
        'Limited curb staging near busy arterials',
        'Apartment loading and COI rules',
        'Noise and flight-path awareness for long outdoor carries',
      ],
      moverTips:
        'Build airport-traffic buffer into morning and mid-day starts. Confirm complex loading rules early. Prefer crews who know Camp Creek and airport-loop routing.',
      cityKeywords: [
        'college park',
        'camp creek',
        'airport',
        'hartsfield',
        'riverdale',
      ],
    },
    {
      id: 'jonesboro-core',
      name: 'Jonesboro core & county-seat residential',
      shortName: 'Jonesboro',
      neighborhoods: [
        'Jonesboro',
        'Downtown Jonesboro edges',
        'Southlake area influence',
        'Interior residential streets',
        'County-seat service corridors',
      ],
      housingTypes:
        'SFH ranch and two-story stock, townhomes, some multifamily near arterials',
      challenges: [
        'Mixed driveway and street-parking quality',
        'School-zone timing on family streets',
        'Older homes with stairs and long carries',
        'Weekend demand from family inventory',
      ],
      moverTips:
        'Share access photos for tight drives. Mid-week early starts beat school peaks. Inventory attic/basement volume common in older south-metro stock.',
      cityKeywords: [
        'jonesboro',
        'southlake',
        'clayton',
      ],
    },
    {
      id: 'morrow-lake-city',
      name: 'Morrow, Lake City & mid-county corridors',
      shortName: 'Morrow / Lake City',
      neighborhoods: [
        'Morrow',
        'Lake City',
        'Forest Park edge influence',
        'Mid-county arterial belts',
        'Commercial-adjacent residential pockets',
      ],
      housingTypes:
        'Mix of SFH, apartments, townhomes, commercial-edge product',
      challenges: [
        'Arterial congestion on retail corridors',
        'Varied multifamily loading rules',
        'I-75 interchange delay risk',
        'Limited shaded staging in heat',
      ],
      moverTips:
        'Name both addresses and preferred I-75 vs surface routing. Confirm elevator or stair-only buildings. Budget heat breaks on large outdoor carries.',
      cityKeywords: [
        'morrow',
        'lake city',
        'forest park',
      ],
    },
    {
      id: 'riverdale-rex',
      name: 'Riverdale, Rex & western Clayton residential',
      shortName: 'Riverdale / Rex',
      neighborhoods: [
        'Riverdale',
        'Rex',
        'Western residential subdivisions',
        'Highway 85 corridors',
        'South Fulton edge influence',
      ],
      housingTypes:
        'Suburban SFH, townhomes, garden apartments, subdivision tracts',
      challenges: [
        'HOA hour and parking rules in some tracts',
        'Cross-county pairs into Fulton or Fayette',
        'Peak arterial traffic near retail nodes',
        'Family summer weekend booking pressure',
      ],
      moverTips:
        'Send HOA packets with the estimate when applicable. Treat Riverdale ↔ north Fulton as a long local. Prefer Tue–Thu early starts in summer.',
      cityKeywords: [
        'riverdale',
        'rex',
        'highway 85',
      ],
    },
    {
      id: 'i75-south-edge',
      name: 'I-75 south edge toward Lovejoy & Henry influence',
      shortName: 'I-75 south',
      neighborhoods: [
        'Lovejoy edge',
        'I-75 south residential belts',
        'Henry County approach corridors',
        'Newer subdivision pockets',
        'Outer south-metro growth edges',
      ],
      housingTypes:
        'Newer SFH, townhomes, some larger lots on outer edges',
      challenges: [
        'Long empty miles to airport-edge origins',
        'Construction and growth traffic',
        'I-75 peak freight and commute waves',
        'HOA rules in newer communities',
      ],
      moverTips:
        'Price portal-to-portal distance for Lovejoy-edge ↔ airport pairs. Confirm gate codes and approved truck sizes. Early starts beat I-75 freight peaks.',
      cityKeywords: [
        'lovejoy',
        'i-75',
        'south clayton',
        'henry',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Clayton County',
    intro:
      'Airport traffic, I-75 time, multifamily rules, and south-metro distance move the needle more than pure bedroom count.',
    drivers: [
      {
        title: 'Airport & corridor delay risk',
        detail:
          'Passenger, cargo, and arterial peaks near Hartsfield-Jackson edges add billable time. Fixed quotes should document assumed windows.',
      },
      {
        title: 'I-75 / I-285 portal-to-portal distance',
        detail:
          'South-edge ↔ airport-edge and Clayton ↔ north-metro pairs burn empty miles that “Atlanta local” labels hide.',
      },
      {
        title: 'Multifamily loading soft costs',
        detail:
          'Garden apartments and corridor complexes add COIs, reserved docks, long carries, and elevator or stair labor.',
      },
      {
        title: 'Older southside access complexity',
        detail:
          'Tight drives, stairs, and limited truck turnarounds on older streets increase labor vs open suburban lots.',
      },
      {
        title: 'Summer heat labor & early-start premiums',
        detail:
          'Heat-safe packing and early crew starts can add labor or multi-day splits on large inventories.',
      },
      {
        title: 'Cross-county south-metro pairs',
        detail:
          'Henry, Fayette, Fulton, and DeKalb legs need explicit drive-time pricing — not a flat county rate card.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,000+',
        note: 'Higher with apartment rules or peak airport windows',
      },
      {
        label: '2–3BR house / townhome',
        value: '$1,500–$3,600+',
        note: 'Cross-I-75 and long south-metro pairs trend up',
      },
      {
        label: '3–4+ BR (cross-zone / cross-county)',
        value: '$2,000–$5,500+',
        note: 'Airport-edge to far south or north-metro legs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$155+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & traffic intelligence',
    intro:
      'Clayton peaks follow school calendars, summer family weekends, airport travel waves, and Georgia heat — not north-metro tech lease cycles alone.',
    items: [
      {
        title: 'School & family summer weekends',
        detail:
          'SFH and townhome moves fill first May–August. Mid-week early starts are the realistic backups.',
      },
      {
        title: 'Airport travel peaks',
        detail:
          'Holiday and summer travel waves worsen airport-edge corridors. Prefer non-peak windows for Camp Creek / College Park edge jobs when flexible.',
      },
      {
        title: 'Lease-end apartment clusters',
        detail:
          'Month-end multifamily turnover competes with weekend SFH demand. Book elevators and loading slots early.',
      },
      {
        title: 'Heat season (late spring–early fall)',
        detail:
          'Plan early starts, hydration breaks, and possible multi-day splits for large outdoor inventories.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Beat I-75 commute peaks and heat. Still honor complex loading windows where required.',
      },
    ],
  },
  specialized: [
    {
      id: 'airport-i75-logistics',
      title: 'Airport-adjacent & I-75 corridor logistics',
      intro:
        'Clayton’s defining operational problem is often airport-edge delay plus interstate portal time under one south-metro label.',
      bullets: [
        'Price portal-to-portal time honestly for any pair near Hartsfield-Jackson edges or peak I-75 windows.',
        'Name both origin and destination zones on the estimate — “Clayton local” is too vague for airport vs Lovejoy-edge pairs.',
        'Prefer early starts to avoid airport passenger waves and freight peaks.',
        'Confirm staging plans when busy arterials cannot hold full trailers.',
        'Share preferred routing (I-75 vs surface) when crews have a choice.',
      ],
    },
    {
      id: 'south-metro-housing-access',
      title: 'South-metro housing & multifamily access module',
      intro:
        'Older SFH stock, garden apartments, and newer townhomes create three access products that generic “Atlanta movers” marketing often flattens.',
      bullets: [
        'Inventory stairs, long carries, and tight courts on older southside streets before sizing the truck.',
        'Send apartment/HOA packets with the estimate; confirm COI naming and reserved loading hours.',
        'Budget heat protection and floor coverings on long outdoor carries in summer.',
        'Clarify cross-county destinations (Henry, Fayette, Fulton) so drive time is priced up front.',
        'Photograph driveway and court access for complex multifamily origins.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Clayton County?',
    intro:
      'Airport-adjacent convenience, south-metro affordability, and I-75 access are the usual draws — pick the pocket first, then validate traffic, schools, and housing stock.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Clayton County Public Schools covers most of the county, with private and charter options. Match every listing to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before neighborhood brand',
            detail:
              'Use district boundary tools. “Jonesboro” or “Riverdale” marketing can span multiple feeders.',
          },
          {
            title: 'Family relocation calendars',
            detail:
              'Summer moves cluster around school start; book crews early if you need a pre-term date.',
          },
          {
            title: 'Higher education & training edges',
            detail:
              'Nearby colleges and technical programs shape rental demand along some corridors — confirm commute times at peak.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Georgia DOE data should lead; third-party rankings are secondary signals only.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'South-metro acute-care access',
            detail:
              'Southern Crescent and other south-metro facilities serve Clayton households. Map ER drive times including I-75 delays.',
          },
          {
            title: 'Atlanta core specialty trips',
            detail:
              'Some specialty care still pulls north into Fulton or DeKalb — test peak-hour routes from your target pocket.',
          },
          {
            title: 'Airport-edge emergency logistics',
            detail:
              'Airport and cargo traffic can slow ambulance and personal routes near busy edges; factor real drive times when choosing housing.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'South-metro price ladder',
            detail:
              'Clayton often prices below many north-metro suburbs for comparable size — compare taxes, insurance, and commute, not only list price.',
          },
          {
            title: 'Stock variety',
            detail:
              'Older ranch SFH, garden apartments, townhomes, and newer edge subdivisions each change move-day access and ongoing maintenance.',
          },
          {
            title: 'Airport noise & flight paths',
            detail:
              'Some pockets sit under approach/departure paths. Visit at different times of day before committing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Airport-adjacent convenience',
            detail:
              'Best for frequent flyers and airport-related work — with traffic and noise tradeoffs.',
          },
          {
            title: 'Jonesboro / county-seat living',
            detail:
              'Civic and residential core with mixed older stock; more neighborhood feel than pure corridor living.',
          },
          {
            title: 'Riverdale / western residential',
            detail:
              'Subdivision and multifamily mix with Fulton/Fayette adjacency for some commuters.',
          },
          {
            title: 'I-75 south growth edge',
            detail:
              'Newer product and longer hauls toward Henry — family space with freeway dependence.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Airport and aviation support, logistics/distribution, healthcare, retail corridors, and government services are major themes.',
          },
          {
            title: 'I-75 commute reality',
            detail:
              'Northbound peaks toward the city and airport-bound waves set daily drive times more than straight-line miles.',
          },
          {
            title: 'South-metro hybrid patterns',
            detail:
              'Hybrid office roles still need realistic I-75 / I-285 plans on in-office days — test your actual pair at peak.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'South-metro access without north-metro premiums',
            detail:
              'Many households choose Clayton for space and access relative to cost — lifestyle is corridor- and neighborhood-dependent.',
          },
          {
            title: 'Heat & humidity',
            detail:
              'Hot summers require early-move starts and flexible outdoor labor plans. Shade and hydration matter on large homes.',
          },
          {
            title: 'Parks & community recreation',
            detail:
              'County parks and community facilities are lifestyle draws; weekend event traffic can affect nearby streets on move day.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Clayton County resources',
    intro:
      'Official links and licensing notes — airport corridors, county services, and Georgia DPS MCCD credentials change; verify before move day.',
    items: [
      {
        label: 'Clayton County government',
        href: 'https://www.claytoncountyga.gov/',
        note: 'County services and public information',
        external: true,
      },
      {
        label: 'City of Jonesboro',
        href: 'https://www.jonesboroga.com/',
        external: true,
      },
      {
        label: 'City of Riverdale',
        href: 'https://www.riverdalega.gov/',
        external: true,
      },
      {
        label: 'City of Morrow',
        href: 'https://www.cityofmorrow.com/',
        external: true,
      },
      {
        label: 'Clayton County Public Schools',
        href: 'https://www.clayton.k12.ga.us/',
        external: true,
      },
      {
        label: 'Hartsfield-Jackson Atlanta International Airport',
        href: 'https://www.atl.com/',
        note: 'Airport operations context for adjacent corridors',
        external: true,
      },
      {
        label: 'Georgia DPS — Department of Public Safety',
        href: 'https://dps.georgia.gov/',
        note: 'MCCD / intrastate household goods mover context',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter by zone (Airport edge, Jonesboro, Morrow/Lake City, Riverdale/Rex, I-75 south). Confirm airport routing, I-75 windows, and Georgia DPS MCCD vs FMCSA authority.',
  lastReviewed: '2026-07-23',
};
