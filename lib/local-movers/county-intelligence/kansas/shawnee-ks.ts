import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKsPack,
  KS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kansas/ks-shared';

/**
 * Shawnee County, KS — Topeka capital metro.
 * Not JOCO west / Overland Park growth; not Shawnee the JOCO city alone.
 */
export const shawneeCountyKsIntelligence: CountyIntelligencePack = finalizeKsPack({
  countySlug: 'shawnee',
  hubTitle: 'Shawnee County Moving Intelligence Hub',
  eyebrow:
    'Shawnee County · Topeka capital, state employment & I-70 / US-75 logistics',
  h1: 'Moving in Shawnee County: Topeka Capital Access, Neighborhood Grids & I-70 / US-75 Logistics',
  heroOpener:
    'Shawnee County is the Topeka capital metro — Kansas’s seat of state government — not Johnson County west-side Overland Park HOA growth and not the City of Shawnee inside JOCO alone. Expect downtown and capitol-adjacent multi-unit, Potwin and historic character grids, west and southwest Topeka growth belts, Washburn University density, and I-70 / US-75 / US-24 freeflow that rewrites “local” estimates. A capitol-corridor curb stack, a Potwin stair carry, a west-side HOA driveway, and a rural-residential county edge do not share truck access or crew skill. State-government, healthcare, and insurance employment waves are real inputs. This hub is for people moving in Shawnee County — Topeka capital — not a renamed JOCO page.',
  heroCredibility:
    'KCC Certificate of Public Convenience and Necessity (HHG) for intrastate · FMCSA for interstate · Topeka capital access & I-70 logistics awareness · Curated listings',
  majorCorridors: 'I-70 · US-75 · US-24 · local Topeka grid',
  whatMakesDifferent: {
    title: 'What makes moving in Shawnee County different',
    intro:
      'These are Shawnee County / Topeka capital realities — state employment density, historic neighborhood grids, west growth product, and I-70 freeflow — not JOCO Overland Park HOA defaults and not Wichita aircraft-industrial logistics.',
    bullets: [
      {
        title: 'This is Shawnee County / Topeka capital — not JOCO west',
        detail:
          'Ignore Overland Park cul-de-sac templates and “Shawnee, KS” city-in-JOCO assumptions. Shawnee County is Topeka: capitol corridors, state offices, Washburn density, and northeast Kansas freeflow. Match estimates to Topeka addresses and Kansas KCC authority — not Johnson County suburban scripts.',
      },
      {
        title: 'Capitol-adjacent and downtown multi-unit rewrite labor',
        detail:
          'Building rules, scarce curb, elevator product where present, and government-event freeflow dominate core jobs. A west Topeka ranch does not share that logistics stack.',
      },
      {
        title: 'Potwin, historic Midtown, and character grids underprice flat-rate optimism',
        detail:
          'Walk-ups, basements, tight residential curb, and older interiors fail estimates more often than packing skill alone.',
      },
      {
        title: 'State-government and insurance employment reshapes mid-week demand',
        detail:
          'Capitol, agency, and regional corporate cycles drive schedule-sensitive relocations that pure apartment-lease templates underprice.',
      },
      {
        title: 'West and southwest growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and summer family peaks rewrite jobs that look suburban-simple on paper. Same-county downtown product does not share that stack.',
      },
      {
        title: 'I-70, US-75, and US-24 burn portal time',
        detail:
          'Downtown ↔ west Topeka, Potwin ↔ south belts, or county-edge ↔ capitol pairs look local and still burn 20–45+ minutes at peak. Price portal-to-portal honestly.',
      },
      KS_REG_BULLET,
    ],
  },
  zonesHeading: 'Shawnee County access zones',
  zonesIntro:
    'Plan by downtown–capitol multi-unit, Potwin–historic character grids, Washburn-adjacent product, west and southwest growth belts, north Topeka and US-24 corridors, and rural-residential edges — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-capitol',
      name: 'Downtown Topeka, capitol corridors & core multi-unit',
      shortName: 'Downtown / capitol',
      neighborhoods: [
        'Downtown Topeka',
        'Capitol corridors',
        'NOTO edges',
        'Kansas Avenue corridors',
        'Core multi-unit pockets',
        'Government campus edges',
      ],
      housingTypes: 'Mid-rise multifamily, loft conversions, condo, mixed SFH',
      challenges: [
        'Elevator reservations, docks, and building COIs where applicable',
        'Limited legal curb and government-event freeflow',
        'I-70 / US-75 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows. Photo curb staging options early.',
      cityKeywords: [
        'topeka',
        'downtown topeka',
      ],
    },
    {
      id: 'potwin-historic',
      name: 'Potwin, historic Midtown & central character grids',
      shortName: 'Potwin / Midtown',
      neighborhoods: [
        'Potwin',
        'Midtown',
        'Historic districts',
        'Central character corridors',
        'Tree-lined residential grids',
        'Near-downtown SFH pockets',
      ],
      housingTypes: 'Character SFH, walk-up multifamily, duplexes',
      challenges: [
        'Multi-flight stairs, basements, and scarce truck length',
        'Tree-lined curb and long carries',
        'Tight residential staging',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts. Protect older interiors and landscaping.',
      cityKeywords: [
        'potwin',
        'topeka',
        'midtown topeka',
      ],
    },
    {
      id: 'washburn-central',
      name: 'Washburn University edges & central multi-unit belts',
      shortName: 'Washburn / central',
      neighborhoods: [
        'Washburn University edges',
        'Central multi-unit corridors',
        '17th Street corridors',
        'Campus-adjacent stock',
        'Central Topeka belts',
        'Mixed student and professional multi-unit',
      ],
      housingTypes: 'Multi-family, older SFH, duplexes, limited elevators',
      challenges: [
        'Academic calendar compression near campus',
        'Mixed multi-unit rules and scarce curb',
        'Local arterial freeflow',
      ],
      moverTips:
        'Avoid peak term-start windows when flexible. Collect multi-unit building rules early. Inventory stairs carefully.',
      cityKeywords: [
        'topeka',
        'washburn',
      ],
    },
    {
      id: 'west-southwest-growth',
      name: 'West & southwest Topeka growth HOAs',
      shortName: 'West / SW Topeka',
      neighborhoods: [
        'West Topeka',
        'Southwest Topeka',
        'Wanamaker corridors',
        'I-470 edges',
        'Western HOA growth',
        'Retail-corridor residential belts',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch and two-story stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-70 / Wanamaker freeflow and longer empty miles vs downtown',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-70 honestly for eastbound unload pairs.',
      cityKeywords: [
        'topeka',
        'west topeka',
      ],
    },
    {
      id: 'north-us24',
      name: 'North Topeka, US-24 corridors & northern belts',
      shortName: 'North / US-24',
      neighborhoods: [
        'North Topeka',
        'US-24 corridors',
        'Northern multi-unit pockets',
        'River-adjacent edges',
        'Northern arterial residential',
        'Oakland edges',
      ],
      housingTypes: 'SFH, multi-family, ranch and older stock',
      challenges: [
        'US-24 / US-75 freeflow',
        'Mixed older stock and long carries',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Price US-24 honestly. Survey older stock carefully. Clarify north Topeka addresses.',
      cityKeywords: [
        'topeka',
        'north topeka',
        'oakland',
      ],
    },
    {
      id: 'county-edges',
      name: 'Silver Lake, Rossville, Auburn & rural-residential edges',
      shortName: 'County edges',
      neighborhoods: [
        'Silver Lake',
        'Rossville edges',
        'Auburn edges',
        'Berryton edges',
        'Rural-residential corridors',
        'Outer county belts',
      ],
      housingTypes: 'SFH, multi-unit pockets, rural-residential stock',
      challenges: [
        'Longer empty miles to Topeka core',
        'Mixed driveway and gravel access product',
        'US-24 / county road freeflow',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveway width and turnaround. Align with school calendars when relevant.',
      cityKeywords: [
        'silver lake',
        'rossville',
        'auburn',
        'berryton',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Shawnee County moving costs',
    intro:
      'Access product, multi-unit admin, character-grid stairs, and I-70 / US-75 freeflow move the number more than packing skill alone — this is Topeka capital logistics, not JOCO Overland Park HOA pricing.',
    drivers: [
      {
        title: 'Downtown multi-unit elevators, docks & COIs',
        detail:
          'Capitol-adjacent and core vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, basements & historic-grid curb',
        detail:
          'Potwin, Midtown, and older multi-unit stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-70 · US-75 · US-24 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'West growth HOA gates & school-calendar windows',
        detail:
          'West and southwest packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Multi-county & interstate empty miles',
        detail:
          'Douglas, Jefferson, Osage, and out-of-state destinations raise staging distance and authority complexity when leaving Shawnee County or Kansas.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,700+',
        note: 'Higher with elevators, walk-ups, or peak I-70 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,300–$4,000+',
        note: 'Stairs, multi-unit, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-zone',
        value: '$2,500–$8,000+',
        note: 'Core multi-unit and long I-70 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$190+/hr',
        note: 'Portal-to-portal; packing, stairs, and admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Shawnee County move',
    intro:
      'State-government cycles, school calendars, Washburn academic windows, summer heat, severe-storm and tornado season, and winter ice reshape access across the Topeka grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-70 / US-75 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and multi-unit or HOA slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat & winter ice',
        detail:
          'June–August heat and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency on older historic stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'topeka-capitol-hoa',
      title: 'Topeka capital multi-unit, HOA & I-70 logistics module',
      intro:
        'Shawnee County estimates fail more often on stair surveys, multi-unit packets, HOA gates, and I-70 freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for downtown and capitol-adjacent multi-unit before the survey is final.',
        'Photo stair counts, curb options, and basement access for Potwin, Midtown, and older stock.',
        'Price portal-to-portal time for any pair that rides I-70, US-75, or US-24 at peak.',
        'Collect HOA packets early for west and southwest growth product.',
        'Clarify Topeka, Silver Lake, Rossville, Auburn, and unincorporated addresses on every estimate.',
        'For in-state jobs verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-joco-not-wichita',
      title: 'Not JOCO west · not Wichita module',
      intro:
        'A single “Shawnee” or “Kansas rate” collapses when Topeka capital product is confused with the City of Shawnee in JOCO, Overland Park HOAs, or Wichita aircraft-industrial logistics.',
      bullets: [
        'Do not price capitol-corridor multi-unit like Overland Park cul-de-sacs or like Wichita Old Town lofts as interchangeable defaults.',
        'State the market as Shawnee County / Topeka on every estimate — not the City of Shawnee in Johnson County.',
        'Match state-government mid-week waves separately from school-calendar peaks.',
        'Keep Shawnee vs Douglas / Jefferson / Osage county lines clear on multi-address estimates.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Shawnee County?',
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
              'Shawnee County spans Topeka Public Schools plus Auburn-Washburn, Seaman, Shawnee Heights, Silver Lake, and other systems. Washburn University anchors higher education. Assignment for K–12 is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Kansas State Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Stormont Vail Health, The University of Kansas Health System St. Francis Campus, and regional partners anchor care across Shawnee County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-70 and Wanamaker freeflow change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect downtown and capitol multi-unit; Potwin and historic character SFH; Washburn-adjacent multi-family; west and southwest HOA growth; north Topeka stock; rural-residential edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by neighborhood and product type. Budget for multi-unit dues, older-building repair risk, and competitive seasons near employment cores.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / capitol urban lifestyle',
            detail:
              'Suits people prioritizing government and urban amenities — with multi-unit access and event freeflow tradeoffs on move day.',
          },
          {
            title: 'Potwin / historic character living',
            detail:
              'Often appeals for neighborhood feel — with stairs, basements, and curb limits.',
          },
          {
            title: 'West / southwest growth belts',
            detail:
              'Fits buyers chasing newer product and retail access — with HOA rules and longer empty miles to the core.',
          },
          {
            title: 'County-edge small-town living',
            detail:
              'Attracts households seeking quieter product — with empty-mile logistics to Topeka employment cores.',
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
              'State government, healthcare systems, insurance and professional services, education, and regional logistics concentrate demand across the Topeka metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-70, US-75, and US-24 freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Shawnee County is Topeka capital — state employment density, historic neighborhoods, and west growth belts — not JOCO Overland Park suburbia and not the City of Shawnee in Johnson County.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — legislative calendars, school seasons, and storm weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Shawnee County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KCC Certificate of Public Convenience and Necessity (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Shawnee County — official site',
        href: 'https://www.snco.us/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Topeka',
        href: 'https://www.topeka.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'KanDrive — Kansas traveler information',
        href: 'https://www.kandrive.org/',
        external: true,
        note: 'I-70 / US-75 / US-24 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit and curb fluency for downtown–capitol product; stair and character-grid fluency for Potwin–Midtown stock; HOA fluency for west/southwest growth; honest I-70 · US-75 · US-24 timing for cross-zone pairs. Verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs) for intrastate moves and FMCSA for interstate legs before deposits. This is Shawnee County / Topeka capital — not JOCO west or the City of Shawnee in Johnson County.',
  lastReviewed: '2026-07-24',
});
