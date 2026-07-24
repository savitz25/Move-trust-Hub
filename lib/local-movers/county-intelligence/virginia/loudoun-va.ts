import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Loudoun County, VA — western NoVA growth & data-center belt (not Fairfax Tysons clone, not PW I-95).
 * Ashburn data centers, Leesburg historic core, planned communities, Dulles Toll Road.
 */
export const loudounCountyVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'loudoun',
  hubTitle: 'Loudoun County Moving Intelligence Hub',
  eyebrow: 'Loudoun · Northern Virginia · Ashburn, Leesburg, planned communities & Dulles corridor',
  h1: 'Moving in Loudoun County: Ashburn Data-Center Belt, Leesburg Access & Dulles Toll Road Logistics',
  heroOpener:
    'Loudoun County is Northern Virginia’s western growth and digital-infrastructure engine: data-center–adjacent residential in Ashburn and Sterling, master-planned villages from South Riding to Brambleton, a historic Leesburg core with tighter curb, and western horse-country edges that still need driveway surveys. A Sterling elevator condo, a Brambleton HOA two-story, a Leesburg townhouse near the historic district, and a Purcellville large-lot home do not share truck access or portal time. VA-7, VA-28, the Dulles Toll Road, US-15, and Loudoun County Parkway rewrite “local” estimates that ignore HOA packets, toll-road peaks, and tech/data-center shift calendars. This hub is for people moving in Loudoun County — not a renamed Fairfax or Prince William page.',
  heroCredibility:
    'Virginia DMV Motor Carrier / Household Goods authority for intrastate moves · FMCSA for interstate · Loudoun HOA, data-center corridor & Dulles Toll Road awareness · Curated listings',
  majorCorridors: 'VA-7 · VA-28 · Dulles Toll Road · US-15 · Loudoun County Pkwy',
  whatMakesDifferent: {
    title: 'What makes moving in Loudoun County different',
    intro:
      'These are Loudoun realities — Ashburn data-center growth, planned-community HOA density, and Dulles Toll Road timing — not Fairfax Beltway employment cores or Arlington high-rise elevators alone.',
    bullets: [
      {
        title: 'Ashburn and the data-center belt reshape traffic and demand',
        detail:
          'Data-center construction and operations traffic, contractor fleets, and tech-adjacent households create mid-week peaks and corridor congestion that pure residential quotes underprice.',
      },
      {
        title: 'Master-planned communities dominate eastern and central growth',
        detail:
          'Ashburn, Brambleton, Broadlands, South Riding, Stone Ridge, and similar villages often require gate lists, COI, truck-length limits, and approved hours. Collect packets early.',
      },
      {
        title: 'Dulles Toll Road and VA-28 turn short miles into billable time',
        detail:
          'Sterling ↔ Leesburg, Ashburn ↔ Fairfax, or South Riding ↔ Reston pairs look local and still burn 40–80+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Leesburg historic core is not suburban HOA product',
        detail:
          'Older street grids, limited truck length, and denser townhouse/walk-up stock need curb photos and stair counts — different from Brambleton driveway jobs.',
      },
      {
        title: 'Western Loudoun still has rural and large-lot access',
        detail:
          'Purcellville, Hamilton, Round Hill, and horse-country parcels bring long drives, soft shoulders, and outbuilding inventories that HOA-only checklists miss.',
      },
      {
        title: 'Cross-county Dulles corridor pairs are routine',
        detail:
          'Households regularly move Loudoun ↔ Fairfax, PW, Arlington, or MD/WV. Clarify state lines so Virginia DMV vs FMCSA assumptions stay accurate when any leg leaves Virginia.',
      },
      {
        title: 'Tech and federal-contractor calendars stack with school season',
        detail:
          'Corporate relocations, cloud/data-center vendors, and family school calendars compete for the same Saturday crews from late May through August.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Loudoun County access zones',
  zonesIntro:
    'Plan by Ashburn–Sterling data-center east, Leesburg core, Brambleton–Broadlands–South Riding planned south/central, western towns and rural edges, and VA-7 corridor nodes — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'ashburn-sterling',
      name: 'Ashburn, Sterling & data-center east',
      shortName: 'Ashburn / Sterling',
      neighborhoods: [
        'Ashburn',
        'Sterling',
        'Cascades',
        'Countryside',
        'Dulles Town Center edges',
        'Data-center residential pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, condo/multifamily, tech-corridor rentals',
      challenges: [
        'VA-28 / Dulles Toll Road congestion and freight',
        'HOA gate lists and approved move hours',
        'Mix of elevator product and driveway SFH on short distances',
      ],
      moverTips:
        'Collect HOA packets first. Price Toll Road and VA-28 pairs honestly. Confirm elevator vs walk-up before final estimate.',
      cityKeywords: ['ashburn', 'sterling', 'cascades', 'countryside', 'dulles', 'data center'],
    },
    {
      id: 'leesburg-core',
      name: 'Leesburg historic core & central Loudoun',
      shortName: 'Leesburg',
      neighborhoods: [
        'Downtown Leesburg',
        'Leesburg suburbs',
        'Lansdowne edges',
        'US-15 corridor residential',
      ],
      housingTypes: 'Historic townhomes, older SFH, newer HOA pockets, multifamily',
      challenges: [
        'Tight curb and limited truck length near historic core',
        'US-15 / VA-7 peak approaches',
        'Event and tourism-day congestion downtown',
      ],
      moverTips:
        'Photo curb options and stair counts for near-core stock. Prefer mid-week early starts. Survey driveway width outside the historic grid.',
      cityKeywords: ['leesburg', 'lansdowne', 'downtown leesburg', 'us-15'],
    },
    {
      id: 'brambleton-south-riding',
      name: 'Brambleton, Broadlands, South Riding & southern planned belt',
      shortName: 'South planned',
      neighborhoods: [
        'Brambleton',
        'Broadlands',
        'South Riding',
        'Stone Ridge',
        'Aldie edges',
        'Arcola / Loudoun County Pkwy corridor',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, larger family inventories',
      challenges: [
        'HOA COI, gate lists, and truck-length limits',
        'Loudoun County Parkway and VA-50 peak congestion',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Book peak Saturdays early. Send HOA COI requirements with the estimate. Share gate and driveway photos.',
      cityKeywords: [
        'brambleton',
        'broadlands',
        'south riding',
        'stone ridge',
        'aldie',
        'arcola',
      ],
    },
    {
      id: 'western-loudoun',
      name: 'Purcellville, Hamilton, Round Hill & western rural edges',
      shortName: 'Western Loudoun',
      neighborhoods: [
        'Purcellville',
        'Hamilton',
        'Round Hill',
        'Hillsboro edges',
        'Horse-country and large-lot parcels',
      ],
      housingTypes: 'Town SFH, large-lot estates, farmhouses, barns and outbuildings',
      challenges: [
        'Long drives, grade, and soft shoulders',
        'Limited truck turn radius on private lanes',
        'VA-7 / US-9 timing into Leesburg and points east',
      ],
      moverTips:
        'Survey driveway length, surface, and gates. Inventory outdoor and equestrian gear carefully. Prefer early starts for east-bound pairs.',
      cityKeywords: [
        'purcellville',
        'hamilton',
        'round hill',
        'hillsboro',
        'western loudoun',
        'horse country',
      ],
    },
    {
      id: 'va7-corridor',
      name: 'VA-7 corridor nodes & Leesburg–Sterling spine',
      shortName: 'VA-7 spine',
      neighborhoods: [
        'VA-7 retail and multifamily nodes',
        'Belmont edges',
        'Corridor workforce housing',
      ],
      housingTypes: 'Multifamily, townhomes, commercial-adjacent rentals, some SFH',
      challenges: [
        'Retail peak congestion and limited staging',
        'Lease-end waves for corridor workforce',
        'Mix of short-notice and hard corporate dates',
      ],
      moverTips:
        'Avoid peak retail ingress when flexible. Clarify storage needs. Photo loading zones near commercial strips.',
      cityKeywords: ['va-7', 'belmont', 'corridor', 'leesburg sterling'],
    },
    {
      id: 'dulles-airport-edge',
      name: 'Dulles airport edge & southern Sterling approaches',
      shortName: 'Dulles edge',
      neighborhoods: [
        'Dulles airport-adjacent residential',
        'Southern Sterling / Route 28 pockets',
        'Airport-corridor multifamily',
      ],
      housingTypes: 'Workforce multifamily, townhomes, contractor-heavy rentals',
      challenges: [
        'Airport and freight traffic windows',
        'Noise and early-morning operational constraints',
        'High turnover lease cycles',
      ],
      moverTips:
        'Build VA-28 / Toll Road buffers. Ask about hard report-to-work dates. Prefer crews used to multifamily docks.',
      cityKeywords: ['dulles airport', 'route 28', 'sterling south', 'airport corridor'],
    },
  ],
  costDrivers: {
    title: 'What drives Loudoun County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, Dulles Toll Road portal time, and planned-community density separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA master-planned rules',
        detail: 'Gate lists, COI, and truck limits across Ashburn–Brambleton–South Riding push labor and scheduling risk.',
      },
      {
        title: 'Dulles Toll Road / VA-28 / VA-7 congestion',
        detail: 'Cross-zone and Fairfax-linked pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'Data-center and tech-corridor demand spikes',
        detail: 'Contractor and corporate calendars create mid-week competition for crews.',
      },
      {
        title: 'Leesburg curb and western driveway friction',
        detail: 'Historic-core staging and long rural carries add labor before packing skill matters.',
      },
      {
        title: 'Cross-county Dulles corridor empty miles',
        detail: 'Fairfax, PW, and interstate destinations raise staging distance from Loudoun yards.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$480–$1,500+',
        note: 'Higher with elevators or peak Toll Road pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$3,900+',
        note: 'HOA soft costs trend up in planned villages',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,400–$7,200+',
        note: 'Brambleton SFH and long VA-28 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$195+/hr',
        note: 'Portal-to-portal; packing and HOA admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Loudoun County move',
    intro:
      'School calendars, tech/data-center hiring cycles, heat/humidity, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce VA-7 / VA-28 / Toll Road pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Planned-community SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends and gate-restricted hours.',
      },
      {
        title: 'Corporate and data-center relocation clusters',
        detail:
          'Tech vendor and contractor calendars create mid-week spikes. Confirm report dates and storage needs early.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans, especially on western open lots.',
      },
    ],
  },
  specialized: [
    {
      id: 'loudoun-hoa-dulles-datacenter',
      title: 'Loudoun HOA, Dulles Toll Road & data-center corridor module',
      intro:
        'Loudoun estimates fail more often on HOA packets, toll-road portal time, and corridor congestion than on packing skill alone.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'Price portal-to-portal time for any pair that rides VA-7, VA-28, the Dulles Toll Road, US-15, or Loudoun County Parkway at peak.',
        'Photo curb and stairs for Leesburg historic-core stock; survey driveway grade for western large lots.',
        'Ask about hard start dates for tech/data-center-adjacent households and storage-in-transit needs.',
        'Clarify Loudoun vs Fairfax / PW addresses on every estimate.',
        'Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'western-loudoun-rural-access',
      title: 'Western Loudoun rural & estate access module',
      intro:
        'Purcellville-to-horse-country jobs fail when crews assume eastern HOA driveway norms.',
      bullets: [
        'Pre-walk driveway length, surface, and gate width; share photos with the estimate.',
        'Inventory barns, workshops, and outdoor equipment as separate line items when needed.',
        'Prefer smaller equipment when private lanes limit tractor-trailer access.',
        'Build VA-7 timing buffers for any Leesburg- or Ashburn-linked pair.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Loudoun County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Loudoun County Public Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Ashburn or Brambleton do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Eastern and southern growth corridors can see enrollment pressure. Ask the district about capacity, boundary adjustments, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Virginia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Inova Loudoun Hospital and related campuses serve much of the county, with additional specialty options in Fairfax and the broader metro. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from South Riding or Purcellville to preferred campuses — VA-7 and VA-28 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Planned eastern villages vs western large lots',
            detail:
              'Expect dense HOA SFH and townhomes in Ashburn, Brambleton, and South Riding; larger lots and town centers define much of western Loudoun; Leesburg mixes historic and suburban product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor and commute. Budget for HOA dues, newer-home premiums, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and condo buildings often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Loudoun areas fit whom',
        bullets: [
          {
            title: 'Ashburn–Sterling tech and data-center corridor',
            detail:
              'Suits households prioritizing Dulles-corridor jobs and newer amenities — with HOA logistics and toll-road peaks.',
          },
          {
            title: 'Leesburg core and central nodes',
            detail:
              'Often appeals for town character and US-15 / VA-7 access — with historic-core curb constraints.',
          },
          {
            title: 'Brambleton–South Riding planned south',
            detail:
              'Attracts families seeking newer homes and community amenities — with parkway congestion and HOA rules.',
          },
          {
            title: 'Western towns and rural edges',
            detail:
              'Fits people seeking slower pace and larger lots — with longer peak drives toward eastern employment centers.',
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
              'Data centers and digital infrastructure, federal contractors, airport-adjacent logistics, healthcare, local government, and reverse-commute Fairfax tech sites shape demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent outside limited transit nodes. VA-7, VA-28, the Dulles Toll Road, US-15, and Loudoun County Parkway peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Loudouns',
            detail:
              'Loudoun stacks data-center east density, master-planned villages, a historic county seat, and western rural edges — different from Fairfax’s Beltway cores, PW’s I-95 spine, or Arlington’s high-rise peninsula.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters with occasional ice. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Wineries, town main streets, and trail networks contrast with eastern retail corridors. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Loudoun County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Loudoun County — official site',
        href: 'https://www.loudoun.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Loudoun County Public Schools',
        href: 'https://www.lcps.org/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Town of Leesburg',
        href: 'https://www.leesburgva.gov/',
        external: true,
      },
      {
        label: 'VDOT 511 Virginia traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'VA-7 / VA-28 / Dulles Toll Road before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA fluency for Ashburn–Brambleton–South Riding product; historic-core curb experience for Leesburg; rural driveway surveys for western parcels; honest Dulles Toll Road / VA-28 timing for cross-zone pairs. Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
