import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKsPack,
  KS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kansas/ks-shared';

/**
 * Douglas County, KS — Lawrence / University of Kansas.
 * NOT Douglas County, NV (Lake Tahoe / Carson Valley).
 */
export const douglasCountyKsIntelligence: CountyIntelligencePack = finalizeKsPack({
  countySlug: 'douglas',
  hubTitle: 'Douglas County Moving Intelligence Hub',
  eyebrow:
    'Douglas County, KS · Lawrence, University of Kansas & I-70 / K-10 logistics',
  h1: 'Moving in Douglas County, KS: Lawrence Access, KU Density & I-70 / K-10 Logistics',
  heroOpener:
    'Douglas County, Kansas is Lawrence and the University of Kansas metro — not Douglas County, Nevada (Lake Tahoe / Carson Valley), not Denver-adjacent Douglas CO suburban HOAs, and not a Topeka capital-city clone. Expect downtown and Massachusetts Street multi-unit, Oread and near-campus student product, west Lawrence growth HOAs, Eudora and Baldwin City edges, and I-70 / US-40 / US-59 / K-10 freeflow that rewrites “local” estimates. A campus-edge walk-up stair stack, a downtown loft elevator, a west-side HOA driveway, and a rural-residential county edge do not share truck access or crew skill. Academic calendars compress labor in ways pure corporate JOCO corridors do not. This hub is for people moving in Douglas County, KS — Lawrence / KU — not a renamed Nevada or Colorado page.',
  heroCredibility:
    'KCC Certificate of Public Convenience and Necessity (HHG) for intrastate · FMCSA for interstate · Lawrence / KU campus access & I-70 / K-10 logistics awareness · Curated listings',
  majorCorridors: 'I-70 · US-40 · US-59 · K-10 · local Lawrence grid',
  whatMakesDifferent: {
    title: 'What makes moving in Douglas County different',
    intro:
      'These are Douglas County, Kansas / Lawrence university-metro realities — KU academic calendars, downtown multi-unit, west growth HOAs, and I-70 / K-10 freeflow — not Douglas County NV Tahoe product, not Douglas CO Denver suburbs, and not JOCO Overland Park defaults alone.',
    bullets: [
      {
        title: 'This is Douglas County, Kansas — not Douglas County, Nevada',
        detail:
          'Ignore Lake Tahoe / Carson Valley mountain-access templates and Douglas County, Colorado Denver-south HOA scripts. Douglas KS is the University of Kansas / Lawrence market with campus density, downtown multi-unit, and northeast Kansas freeflow. Match estimates to Lawrence–Eudora–Baldwin addresses and Kansas KCC authority — not Nevada or Colorado scripts.',
      },
      {
        title: 'University of Kansas academic calendars rewrite demand',
        detail:
          'August move-in, May move-out, mid-year lease turns, and faculty relocation waves compress elevators, curb, and crew availability. Flat-rate summer pricing that ignores campus peaks fails.',
      },
      {
        title: 'Downtown, Oread, and campus-adjacent multi-unit is not west Lawrence HOA product',
        detail:
          'Walk-ups, elevators, scarce curb, and student-dense blocks dominate core jobs. A west Lawrence cul-de-sac does not share that logistics stack.',
      },
      {
        title: 'Game-day and event freeflow compress staging',
        detail:
          'Football and major campus events rewrite downtown and near-campus curb rules. Prefer flexible dates and confirm building blackout windows.',
      },
      {
        title: 'West Lawrence growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and family peaks rewrite jobs that look suburban-simple on paper. Same-county campus product does not share that stack.',
      },
      {
        title: 'I-70, US-40, US-59, and K-10 burn portal time',
        detail:
          'Downtown ↔ west Lawrence, campus ↔ Eudora, or Baldwin ↔ KU pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly — K-10 JOCO pairs are routine.',
      },
      KS_REG_BULLET,
    ],
  },
  zonesHeading: 'Douglas County access zones',
  zonesIntro:
    'Plan by downtown–Massachusetts Street multi-unit, Oread and near-campus stock, central Lawrence neighborhood grids, west Lawrence growth HOAs, Eudora–Baldwin City edges, and rural-residential belts — access rules cluster by academic and HOA product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-mass-street',
      name: 'Downtown Lawrence, Massachusetts Street & core multi-unit',
      shortName: 'Downtown / Mass St',
      neighborhoods: [
        'Downtown Lawrence',
        'Massachusetts Street corridors',
        'Riverfront edges',
        'Core loft conversions',
        'New Hampshire Street corridors',
        'Downtown multi-unit pockets',
      ],
      housingTypes: 'Mid-rise multifamily, loft conversions, condo',
      challenges: [
        'Elevator reservations, docks, and building COIs where applicable',
        'Scarce curb and event-day freeflow',
        'Game-day and festival congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Avoid peak game-day and August/May campus windows when flexible. Photo curb staging options early.',
      cityKeywords: [
        'lawrence',
        'downtown lawrence',
      ],
    },
    {
      id: 'oread-campus',
      name: 'Oread, campus edge & near-KU student multi-unit',
      shortName: 'Oread / campus',
      neighborhoods: [
        'Oread',
        'Campus edge multi-unit',
        'Naismith corridors',
        '19th Street corridors',
        'Student-dense walk-ups',
        'Hillside campus approaches',
      ],
      housingTypes: 'Walk-up multifamily, student multi-unit, limited elevators, older SFH',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Academic move-in congestion and tight curb',
        'Hill grades and limited staging',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts outside term-start peaks. Inventory basements carefully.',
      cityKeywords: [
        'lawrence',
        'oread',
      ],
    },
    {
      id: 'central-lawrence',
      name: 'Central Lawrence, East Lawrence & neighborhood character grids',
      shortName: 'Central / East Lawrence',
      neighborhoods: [
        'Central Lawrence',
        'East Lawrence',
        'Old West Lawrence edges',
        'Brook Creek edges',
        'Pinckney edges',
        'Character residential grids',
      ],
      housingTypes: 'Character SFH, duplexes, walk-up multi-unit',
      challenges: [
        'Tree-lined curb, long carries, and driveway geometry',
        'Mixed multi-unit and SFH rules across short distances',
        'Local arterial freeflow',
      ],
      moverTips:
        'Photo driveway and curb options. Confirm multi-unit rules early. Protect older interiors and landscaping.',
      cityKeywords: [
        'lawrence',
        'east lawrence',
        'old west lawrence',
      ],
    },
    {
      id: 'west-lawrence-growth',
      name: 'West Lawrence growth HOAs, 6th Street & K-10 belts',
      shortName: 'West Lawrence',
      neighborhoods: [
        'West Lawrence',
        '6th Street corridors',
        'K-10 approach belts',
        'Western HOA growth',
        'Clinton Parkway corridors',
        'Newer multi-family pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch and two-story stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'K-10 / US-40 freeflow and longer empty miles vs campus core',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price K-10 honestly for campus unload pairs.',
      cityKeywords: [
        'lawrence',
        'west lawrence',
      ],
    },
    {
      id: 'eudora-baldwin',
      name: 'Eudora, Baldwin City & outer municipal edges',
      shortName: 'Eudora / Baldwin',
      neighborhoods: [
        'Eudora',
        'Baldwin City',
        'K-10 Eudora belts',
        'US-56 Baldwin corridors',
        'Outer multi-unit pockets',
        'Eastern and southern municipal edges',
      ],
      housingTypes: 'SFH, multi-family pockets, HOA limited, small-town stock',
      challenges: [
        'Longer empty miles to Lawrence core',
        'Mixed municipal rules',
        'K-10 / US-56 freeflow',
      ],
      moverTips:
        'Price empty miles honestly. Clarify Eudora, Baldwin City, and Lawrence addresses. Align with school calendars when relevant.',
      cityKeywords: [
        'eudora',
        'baldwin city',
        'baldwin',
      ],
    },
    {
      id: 'rural-edges',
      name: 'Lecompton edges, rural-residential & lake-adjacent belts',
      shortName: 'Rural / edges',
      neighborhoods: [
        'Lecompton edges',
        'Rural-residential corridors',
        'Clinton Lake edges',
        'Northern county belts',
        'Southern rural product',
        'Unincorporated Douglas County',
      ],
      housingTypes: 'SFH, rural-residential, lake-adjacent stock',
      challenges: [
        'Longer empty miles to Lawrence core',
        'Mixed driveway and gravel access product',
        'US-40 / US-59 / county road freeflow',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveway width and turnaround. Confirm unincorporated vs city addresses.',
      cityKeywords: [
        'lecompton',
        'lawrence',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Douglas County moving costs',
    intro:
      'Campus multi-unit access, academic calendar compression, HOA admin, and I-70 / K-10 freeflow move the number more than packing skill alone — this is Lawrence / KU logistics, not Douglas County NV mountain defaults and not JOCO HOA-only pricing.',
    drivers: [
      {
        title: 'Campus multi-unit elevators, docks & COIs',
        detail:
          'Downtown and campus-edge vertical product add labor and schedule risk — especially during term-start peaks.',
      },
      {
        title: 'Walk-up stairs, basements & Oread-grid curb',
        detail:
          'Oread, East Lawrence, and near-campus stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-70 · US-40 · US-59 · K-10 congestion',
        detail:
          'Cross-county pairs — including JOCO via K-10 — burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'West Lawrence HOA gates & growth windows',
        detail:
          'Western suburb packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Academic calendar compression & multi-county empty miles',
        detail:
          'August/May peaks and Johnson / Shawnee / Leavenworth destinations raise staging distance and schedule soft costs.',
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
        note: 'Campus peaks and long K-10 / I-70 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, and academic peaks scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Douglas County move',
    intro:
      'University of Kansas academic calendars, game-day freeflow, school calendars, summer heat, severe-storm and tornado season, and winter ice reshape access across the Lawrence grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings outside term peaks',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-70 / K-10 pain. Avoid late-August and mid-May campus crush when flexible; avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September (academic + family)',
        detail:
          'Student turnover and family school calendars fill first. Book 3–6 weeks ahead for August move-in and elevator or HOA slots.',
      },
      {
        title: 'Game-day and event freeflow',
        detail:
          'Football and major campus events compress downtown and near-campus staging. Prefer flexible dates and confirm building blackout windows.',
      },
      {
        title: 'Severe storms, summer heat & winter ice',
        detail:
          'Spring storms, June–August heat, and freeze-thaw winters reshape outdoor labor. Prefer early starts, covered staging plans, and weather contingency on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'lawrence-ku-hoa',
      title: 'Lawrence campus multi-unit, HOA & I-70 / K-10 logistics module',
      intro:
        'Douglas County, KS estimates fail more often on academic calendar compression, stair surveys, multi-unit packets, and I-70 / K-10 freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for downtown and campus multi-unit before the survey is final.',
        'Photo stair counts, curb options, and basement access for Oread, East Lawrence, and near-campus stock.',
        'Price portal-to-portal time for any pair that rides I-70, US-40, US-59, or K-10 at peak.',
        'Collect HOA packets early for west Lawrence growth product.',
        'Clarify Lawrence, Eudora, Baldwin City, and unincorporated addresses on every estimate.',
        'For in-state jobs verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-douglas-nv-not-joco',
      title: 'Not Douglas County NV/CO · not JOCO-only module',
      intro:
        'A single “Douglas County rate” collapses when Lawrence / KU product is confused with Nevada Tahoe markets, Colorado Denver suburbs, or Overland Park HOA-only logistics.',
      bullets: [
        'Do not price Oread walk-ups like Tahoe mountain access or like Overland Park cul-de-sacs as interchangeable defaults.',
        'State the market as Douglas County, Kansas / Lawrence on every estimate — disambiguate from Douglas NV and Douglas CO.',
        'Match August/May campus peaks separately from west Lawrence school-calendar waves.',
        'Keep Douglas vs Johnson / Shawnee / Leavenworth county lines clear on multi-address estimates.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Douglas County?',
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
              'Douglas County spans Lawrence Public Schools plus Eudora, Baldwin City, and other systems. The University of Kansas anchors higher education. Assignment for K–12 is address-based — marketing neighborhood names do not guarantee a campus.',
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
              'LMH Health and regional partners anchor care across Douglas County, with KC metro specialty access via K-10 / I-70. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — K-10 and I-70 freeflow change “nearby” on paper for KC metro specialty care. Transfer records early.',
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
              'Expect downtown multi-unit; Oread and campus-edge student product; central and East Lawrence character SFH; west Lawrence HOA growth; Eudora–Baldwin small-town stock; rural-residential edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by proximity to campus and product type. Budget for multi-unit dues, older-building repair risk, and competitive rental seasons near KU.',
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
            title: 'Central / East Lawrence character living',
            detail:
              'Often appeals for neighborhood feel — with stairs, curb limits, and denser staging constraints.',
          },
          {
            title: 'West Lawrence growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to campus core.',
          },
          {
            title: 'Eudora / Baldwin / rural-edge living',
            detail:
              'Attracts households seeking quieter product — with empty-mile logistics to Lawrence employment and campus cores.',
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
              'University of Kansas, healthcare, education, professional services, and K-10 reverse-commute patterns to JOCO / KC metro concentrate demand across Douglas County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-70, K-10, US-40, and US-59 freeflow is real — including JOCO reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Douglas County, KS is a university metro — Lawrence culture, KU academic calendars, and west growth belts — not Douglas County NV Tahoe product, not Douglas CO Denver suburbs, and not JOCO-only HOA suburbia.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
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
    title: 'Useful Douglas County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KCC Certificate of Public Convenience and Necessity (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Douglas County, Kansas — official site',
        href: 'https://www.douglascountyks.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Lawrence',
        href: 'https://lawrenceks.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Eudora',
        href: 'https://www.cityofeudoraks.gov/',
        external: true,
        note: 'Eastern municipality context',
      },
      {
        label: 'City of Baldwin City',
        href: 'https://www.baldwincity.org/',
        external: true,
        note: 'Southern municipality context',
      },
      {
        label: 'KanDrive — Kansas traveler information',
        href: 'https://www.kandrive.org/',
        external: true,
        note: 'I-70 / US-40 / US-59 / K-10 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with campus multi-unit and curb fluency for downtown–Oread product; academic-calendar awareness for August/May peaks; HOA fluency for west Lawrence growth; honest I-70 · US-40 · US-59 · K-10 timing for cross-zone pairs. Verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs) for intrastate moves and FMCSA for interstate legs before deposits. This is Douglas County, Kansas (Lawrence / KU) — not Douglas County, Nevada.',
  lastReviewed: '2026-07-24',
});
