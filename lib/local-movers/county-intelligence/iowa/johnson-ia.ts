import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIaPack,
  IA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/iowa/ia-shared';

/**
 * Johnson County, IA — Iowa City / University of Iowa / Coralville / North Liberty.
 * NOT Johnson County, KS (KC metro). NOT Johnson County, TN.
 */
export const johnsonCountyIaIntelligence: CountyIntelligencePack = finalizeIaPack({
  countySlug: 'johnson',
  hubTitle: 'Johnson County Moving Intelligence Hub',
  eyebrow:
    'Johnson County, IA · Iowa City, University of Iowa density & I-80 / US-218 logistics',
  h1: 'Moving in Johnson County, IA: Iowa City Access, University Density & I-80 Logistics',
  heroOpener:
    'Johnson County, Iowa is Iowa City and the University of Iowa metro — not Johnson County, Kansas (Kansas City suburban HOAs), not Johnson County, Tennessee, and not a Des Moines capital-city clone. Expect downtown and Northside multi-unit, campus-adjacent student and faculty product, Coralville and North Liberty growth belts, hospital and research employment density, and I-80 / US-218 / US-6 freeflow that rewrites “local” estimates. A downtown loft elevator, a Northside walk-up stair stack, a Coralville HOA driveway, and a North Liberty cul-de-sac do not share truck access or crew skill. Academic calendars compress labor in ways insurance-corridor Des Moines and industrial Cedar Rapids do not. This hub is for people moving in Johnson County, IA — Iowa City — not a renamed Johnson KS page or Polk script.',
  heroCredibility:
    'Iowa DOT Intrastate Motor Carrier Permit (household goods) for intrastate · FMCSA for interstate · Iowa City / UI campus access & I-80 logistics awareness · Curated listings',
  majorCorridors: 'I-80 · US-218 · US-6 · local Iowa City grid',
  whatMakesDifferent: {
    title: 'What makes moving in Johnson County different',
    intro:
      'These are Iowa City university-metro realities — campus lease waves, hospital employment, Coralville–North Liberty growth, and I-80 freeflow — not Johnson County KS Overland Park HOAs, not Johnson TN, and not Des Moines insurance towers.',
    bullets: [
      {
        title: 'This is Johnson County, Iowa — not Johnson County, Kansas or Tennessee',
        detail:
          'Ignore Kansas City metro Overland Park / Olathe HOA templates and Tennessee Appalachian assumptions. Johnson IA is the University of Iowa / Iowa City market with campus density, hospital systems, and I-80 eastern Iowa logistics. Match estimates to Iowa City–Coralville–North Liberty addresses and Iowa DOT authority — not Kansas KCC or Tennessee scripts.',
      },
      {
        title: 'University of Iowa academic calendars rewrite demand',
        detail:
          'August move-in, May move-out, mid-year lease turns, and faculty relocation waves compress elevators, curb, and crew availability. Flat-rate summer pricing that ignores campus peaks fails.',
      },
      {
        title: 'Downtown, Northside, and campus-adjacent multi-unit is not North Liberty HOA product',
        detail:
          'Walk-ups, elevators, scarce curb, and student-dense blocks dominate core jobs. A North Liberty cul-de-sac or Tiffin ranch does not share that logistics stack.',
      },
      {
        title: 'Hospital and research employment density adds mid-week professional moves',
        detail:
          'UIHC and research campuses drive schedule-sensitive relocations that pure student-lease templates underprice. Confirm building rules near hospital corridors.',
      },
      {
        title: 'Coralville and North Liberty growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and family peaks rewrite jobs that look “suburban simple” on paper. Same-county downtown product does not share that stack.',
      },
      {
        title: 'I-80, US-218, and US-6 burn portal time',
        detail:
          'Downtown ↔ North Liberty, Coralville ↔ Eastside, or University Heights ↔ Tiffin pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      IA_REG_BULLET,
    ],
  },
  zonesHeading: 'Johnson County access zones',
  zonesIntro:
    'Plan by downtown–campus multi-unit, Northside and Eastside neighborhood stock, Coralville growth, North Liberty–Tiffin belts, and hospital-corridor product — access rules cluster by academic and HOA product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-campus-ic',
      name: 'Downtown Iowa City, campus edge & Ped Mall multi-unit',
      shortName: 'Downtown / campus',
      neighborhoods: [
        'Downtown Iowa City',
        'Ped Mall edges',
        'Campus edge multi-unit',
        'Riverfront edges',
        'Gilbert Street corridors',
        'Clinton Street corridors',
      ],
      housingTypes: 'Mid-rise multifamily, loft conversions, student and professional multi-unit',
      challenges: [
        'Elevator reservations, docks, and building COIs where applicable',
        'Scarce curb and academic move-in congestion',
        'Event-day and game-day freeflow',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Avoid peak August/May campus windows when flexible. Photo curb staging options early.',
      cityKeywords: [
        'iowa city',
        'downtown iowa city',
      ],
    },
    {
      id: 'northside-eastside',
      name: 'Northside, Eastside & near-campus neighborhood stock',
      shortName: 'Northside / Eastside',
      neighborhoods: [
        'Northside',
        'Eastside',
        'Goosetown edges',
        'Longfellow edges',
        'Manville Heights edges',
        'Rochester Avenue corridors',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, duplexes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight residential curb and student-dense blocks',
        'Basement and porch staging limits',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts outside term-start peaks. Inventory basements carefully.',
      cityKeywords: [
        'iowa city',
        'northside iowa city',
        'eastside iowa city',
      ],
    },
    {
      id: 'university-heights-westside',
      name: 'University Heights, westside & UIHC corridor edges',
      shortName: 'University Heights / west',
      neighborhoods: [
        'University Heights',
        'Westside Iowa City',
        'UIHC corridor edges',
        'Melrose corridors',
        'Mormon Trek edges',
        'Westside multi-family pockets',
      ],
      housingTypes: 'Multi-family, townhomes, older SFH, hospital-adjacent stock',
      challenges: [
        'Hospital and research traffic spikes',
        'Mixed multi-unit rules across short distances',
        'US-6 / arterial freeflow',
      ],
      moverTips:
        'Avoid peak clinic and shift windows when flexible. Collect multi-unit building rules early. Clarify University Heights vs Iowa City addresses.',
      cityKeywords: [
        'university heights',
        'iowa city',
      ],
    },
    {
      id: 'coralville',
      name: 'Coralville growth, Iowa River Landing & HOA belts',
      shortName: 'Coralville',
      neighborhoods: [
        'Coralville',
        'Iowa River Landing edges',
        'Coral Ridge corridors',
        '2nd Street corridors',
        'Western Coralville HOAs',
        'Clear Creek edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, mixed retail-adjacent stock',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-80 / US-6 freeflow',
        'Retail-corridor and event staging limits',
      ],
      moverTips:
        'Collect HOA packets early. Price I-80 honestly for downtown unload pairs. Confirm Coralville vs Iowa City addresses.',
      cityKeywords: [
        'coralville',
      ],
    },
    {
      id: 'north-liberty-tiffin',
      name: 'North Liberty, Tiffin & northern growth HOAs',
      shortName: 'North Liberty / Tiffin',
      neighborhoods: [
        'North Liberty',
        'Tiffin',
        'Forevergreen corridors',
        'Penn Street corridors',
        'Northern HOA growth',
        'Highway 965 edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch stock',
      challenges: [
        'Longer empty miles vs campus core',
        'I-380 / I-80 approach freeflow',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Price empty miles for campus unload pairs. Clarify North Liberty vs Tiffin addresses.',
      cityKeywords: [
        'north liberty',
        'tiffin',
      ],
    },
    {
      id: 'solon-lone-tree-edges',
      name: 'Solon, Lone Tree & rural-residential edges',
      shortName: 'Solon / edges',
      neighborhoods: [
        'Solon',
        'Lone Tree edges',
        'Hills edges',
        'Rural-residential corridors',
        'Lake Macbride edges',
        'Southeastern county edges',
      ],
      housingTypes: 'SFH, multi-unit pockets, rural-residential, lake-adjacent stock',
      challenges: [
        'Longer empty miles to Iowa City core',
        'Mixed driveway and gravel access product',
        'US-1 / county road freeflow',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveway width and turnaround. Align with school calendars when relevant.',
      cityKeywords: [
        'solon',
        'lone tree',
        'hills',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Johnson County moving costs',
    intro:
      'Campus multi-unit access, academic calendar compression, HOA admin, and I-80 / US-218 freeflow move the number more than packing skill alone — this is Iowa City university logistics, not Johnson County KS HOA defaults.',
    drivers: [
      {
        title: 'Campus multi-unit elevators, docks & COIs',
        detail:
          'Downtown and campus-edge vertical product add labor and schedule risk — especially during term-start peaks.',
      },
      {
        title: 'Walk-up stairs, basements & Northside-grid curb',
        detail:
          'Northside, Eastside, and near-campus stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-80 · US-218 · US-6 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Coralville / North Liberty HOA gates & growth windows',
        detail:
          'Northern and western suburb packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Academic calendar compression & multi-county empty miles',
        detail:
          'August/May peaks and Linn / Washington / Cedar destinations raise staging distance and schedule soft costs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,700+',
        note: 'Higher with elevators, walk-ups, or peak campus windows',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,300–$4,000+',
        note: 'Stairs, multi-unit, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-zone',
        value: '$2,500–$8,000+',
        note: 'Campus peaks and long I-80 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, and academic peaks scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Johnson County move',
    intro:
      'University of Iowa academic calendars, hospital employment cycles, school calendars, summer heat, severe-storm season, and winter ice reshape access across the Iowa City grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings outside term peaks',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-80 pain. Avoid late-August and mid-May campus crush when flexible; avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September (academic + family)',
        detail:
          'Student turnover and family school calendars fill first. Book 3–6 weeks ahead for August move-in and elevator or HOA slots.',
      },
      {
        title: 'Game-day and event freeflow',
        detail:
          'Football and major campus events compress downtown and corridor staging. Prefer flexible dates and confirm building blackout windows.',
      },
      {
        title: 'Winter ice, freeze-thaw, and holiday freeflow',
        detail:
          'December–February adds icy stoops, frozen driveways, and weather cancellations. Prefer flexible dates, salt contingency, and tarps on older Northside stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'johnson-ic-university-hoa',
      title: 'Iowa City campus multi-unit, HOA & I-80 logistics module',
      intro:
        'Johnson County estimates fail more often on academic calendar compression, stair surveys, multi-unit packets, and I-80 freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for downtown and campus multi-unit before the survey is final.',
        'Photo stair counts, curb options, and basement access for Northside and Eastside stock.',
        'Price portal-to-portal time for any pair that rides I-80, US-218, or US-6 at peak.',
        'Collect HOA packets early for Coralville, North Liberty, and Tiffin product.',
        'Clarify Iowa City, University Heights, Coralville, North Liberty, and unincorporated addresses on every estimate.',
        'For in-state jobs verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-johnson-ks-not-dsm',
      title: 'Not Johnson County KS/TN · not Des Moines module',
      intro:
        'A single “Johnson County rate” collapses when Iowa City university product is confused with Kansas City suburban HOAs, Tennessee markets, or Des Moines insurance-corridor logistics.',
      bullets: [
        'Do not price Ped Mall multi-unit like Overland Park HOAs or like Des Moines East Village towers as interchangeable defaults.',
        'State the market as Johnson County, Iowa / Iowa City on every estimate — disambiguate from Johnson KS and Johnson TN.',
        'Match August/May campus peaks separately from North Liberty school-calendar waves.',
        'Keep Johnson vs Linn / Washington / Cedar county lines clear on multi-address estimates.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Johnson County?',
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
              'Johnson County spans Iowa City Community School District plus Clear Creek Amana, Lone Tree, Solon, and other systems. The University of Iowa anchors higher education. Assignment for K–12 is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Iowa Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'University of Iowa Hospitals & Clinics (UIHC) and regional partners anchor care across Johnson County — a major employer as well as healthcare destination. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — US-6 and I-80 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown and campus multi-unit; Northside/Eastside walk-ups and older SFH; University Heights and westside multi-family; Coralville and North Liberty HOA growth; rural-residential edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by proximity to campus and product type. Budget for multi-unit dues, older-building repair risk, and competitive rental seasons.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully — academic peaks fill freight windows first.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / campus urban lifestyle',
            detail:
              'Suits people prioritizing walkability and university amenities — with multi-unit access and academic-calendar tradeoffs on move day.',
          },
          {
            title: 'Northside / Eastside character living',
            detail:
              'Often appeals for neighborhood feel — with stairs, curb limits, and denser staging constraints.',
          },
          {
            title: 'Coralville convenience living',
            detail:
              'Attracts households seeking retail access and mixed product — with HOA rules and I-80 freeflow.',
          },
          {
            title: 'North Liberty / Tiffin growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with longer empty miles to campus and hospital cores.',
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
              'University of Iowa, UIHC and healthcare, research, education, technology, and regional professional services concentrate demand across the metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-80 and US-218 freeflow is real. Test peak routes — including Coralville and North Liberty reverse commutes — before choosing solely on rent or purchase price.',
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
              'Johnson County, IA is a university and hospital metro — Iowa City culture, academic calendars, and Coralville–North Liberty growth — not Johnson County KS suburban Kansas City product and not Des Moines capital-city insurance corridors.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm risk, and freeze-thaw winters with ice and snow. Plan outdoor staging, heat, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — academic calendars, game days, school seasons, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Johnson County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Iowa DOT Intrastate Motor Carrier Permit (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Johnson County, Iowa — official site',
        href: 'https://www.johnsoncountyiowa.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Iowa City',
        href: 'https://www.icgov.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Coralville',
        href: 'https://www.coralville.org/',
        external: true,
        note: 'Western growth municipality context',
      },
      {
        label: 'City of North Liberty',
        href: 'https://northlibertyiowa.org/',
        external: true,
        note: 'Northern growth municipality context',
      },
      {
        label: '511ia — Iowa traveler information',
        href: 'https://www.511ia.org/',
        external: true,
        note: 'I-80 / US-218 / US-6 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with campus multi-unit and curb fluency for downtown–Northside product; academic-calendar awareness for August/May peaks; HOA fluency for Coralville–North Liberty; honest I-80 · US-218 · US-6 timing for cross-zone pairs. Verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file) for intrastate moves and FMCSA for interstate legs before deposits. This is Johnson County, Iowa — not Johnson KS or Johnson TN.',
  lastReviewed: '2026-07-24',
});
