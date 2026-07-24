import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWiPack,
  WI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/wisconsin/wi-shared';

/**
 * Dane County, WI — Madison isthmus, UW cycles, capital patterns (not Milwaukee west, not Waukesha).
 */
export const daneCountyWiIntelligence: CountyIntelligencePack = finalizeWiPack({
  countySlug: 'dane',
  hubTitle: 'Dane County Moving Intelligence Hub',
  eyebrow: 'Dane · Madison isthmus, UW lease cycles & capital-city logistics',
  h1: 'Moving in Dane County: Madison Isthmus Access, UW Cycles & Capital Corridors',
  heroOpener:
    'Dane County is not a Milwaukee west suburb clone — it is Madison isthmus multi-unit density with limited curb, UW–Madison semester lease waves, state-capital calendars, west-side and Fitchburg multi-family growth, and I-39/90/94 / Beltline freeflow that rewrites “local” estimates. A State Street walk-up, a downtown elevator condo, a Middleton HOA townhome, and a Sun Prairie cul-de-sac do not share truck access or crew calendars. Winter ice and academic peaks are real inputs. This hub is for people moving in Dane County — not a renamed Milwaukee or Waukesha page.',
  heroCredibility:
    'Wisconsin in-state written estimate & insurance diligence · FMCSA for interstate · Madison isthmus, UW & capital logistics awareness · Curated listings',
  majorCorridors: 'I-39/90/94 · US-12 · US-18/151 · Beltline corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Dane County different',
    intro:
      'These are Madison capital and university realities — isthmus curb limits, UW lease waves, and Beltline freeflow — not Milwaukee East Side product or Waukesha west-metro HOAs alone.',
    bullets: [
      {
        title: 'Isthmus multi-unit and scarce curb rewrite labor',
        detail:
          'Downtown and near-campus stock stacks stairs, tight staging, and limited truck length. Flat-rate optimism from suburban driveways underprices flight counts.',
      },
      {
        title: 'UW–Madison semester peaks compress elevators and crews',
        detail:
          'August and January multi-unit turnover fills first. Elevator reservations and mid-week starts matter more than packing skill alone.',
      },
      {
        title: 'Capital and professional calendars cluster mid-month demand',
        detail:
          'State government and professional relocations often land mid-month rather than only on Saturday peaks.',
      },
      {
        title: 'I-39/90/94, US-12/18/151, and the Beltline burn portal time',
        detail:
          'Isthmus ↔ Fitchburg or downtown ↔ Sun Prairie pairs look local and still burn 20–50+ minutes at peak.',
      },
      {
        title: 'West-side and suburb-ring HOA product is not isthmus product',
        detail:
          'Middleton, Verona, and Sun Prairie multi-family need HOA packets that downtown walk-ups do not.',
      },
      {
        title: 'Winter ice and isthmus wind reshape outdoor carries',
        detail:
          'December–March adds cancellation risk — flexible dates reduce soft costs around inflexible lease ends.',
      },
      {
        title: 'Multi-county southern Wisconsin pairs are routine',
        detail:
          'Households regularly move Dane ↔ Milwaukee, Rock, or Illinois border destinations. Clarify addresses so Wisconsin consumer controls vs FMCSA assumptions stay accurate when any leg leaves Wisconsin.',
      },
      WI_REG_BULLET,
    ],
  },
  zonesHeading: 'Dane County access zones',
  zonesIntro:
    'Plan by isthmus and downtown multi-unit, near-campus stock, west-side Madison multi-family, Fitchburg–Verona growth, and eastern Sun Prairie–Cottage Grove belts.',
  zones: [
    {
      id: 'isthmus-downtown',
      name: 'Isthmus, downtown & near-Capitol multi-unit',
      shortName: 'Isthmus / downtown',
      neighborhoods: [
        'Downtown Madison',
        'Isthmus',
        'Capitol Square edges',
        'State Street corridors',
        'Bassett edges',
        'James Madison Park edges',
      ],
      housingTypes: 'Walk-up multi-unit, mid-rise, limited elevators, condo towers',
      challenges: [
        'Scarce curb and stair carries',
        'Elevator/COI where present',
        'Event and capital freeflow',
      ],
      moverTips:
        'Book elevators early. Prefer mid-week starts. Photo curb options on the isthmus.',
      cityKeywords: [
        'madison',
        'downtown madison',
      ],
    },
    {
      id: 'uw-campus-belt',
      name: 'UW–Madison campus-adjacent multi-unit',
      shortName: 'Campus belt',
      neighborhoods: [
        'University Avenue corridors',
        'Regent edges',
        'Greenbush edges',
        'Vilas edges',
        'Eagle Heights edges',
        'Near West campus edges',
      ],
      housingTypes: 'Student multi-unit, walk-ups, limited elevators',
      challenges: [
        'Semester lease waves',
        'Scarce curb at move-in peaks',
        'Long stair carries',
      ],
      moverTips:
        'Book crews early for August and January. Prefer mid-week starts. Confirm building rules in writing.',
      cityKeywords: [
        'madison',
      ],
    },
    {
      id: 'west-side-madison',
      name: 'West Side Madison multi-family & professional stock',
      shortName: 'West Side',
      neighborhoods: [
        'Near West',
        'University Hill Farms edges',
        'Odana corridors',
        'Mineral Point corridors',
        'Junction Ridge edges',
        'High Point edges',
      ],
      housingTypes: 'Multi-family, townhomes, SFH, some elevators',
      challenges: [
        'Beltline / US-12 freeflow',
        'HOA timed windows',
        'Mixed product',
      ],
      moverTips:
        'Collect HOA packets early. Price Beltline honestly. Clarify west-side vs Middleton addresses.',
      cityKeywords: [
        'madison',
      ],
    },
    {
      id: 'fitchburg-verona',
      name: 'Fitchburg, Verona & southwest growth',
      shortName: 'Fitchburg / Verona',
      neighborhoods: [
        'Fitchburg',
        'Verona',
        'Neptune corridors',
        'Nine Springs edges',
        'Epic-adjacent edges',
        'McKee corridors',
      ],
      housingTypes: 'Growth multi-family, townhomes, SFH',
      challenges: [
        'US-18/151 freeflow',
        'HOA COI packets',
        'Longer empty miles vs isthmus',
      ],
      moverTips:
        'Collect HOA packets. Price US-18/151 honestly. Do not price growth multi-family like isthmus walk-ups.',
      cityKeywords: [
        'fitchburg',
        'verona',
      ],
    },
    {
      id: 'middleton-west',
      name: 'Middleton & western suburb ring',
      shortName: 'Middleton',
      neighborhoods: [
        'Middleton',
        'Greenway Station edges',
        'Parmenter corridors',
        'Pheasant Branch edges',
        'West Middleton edges',
        'Cross Plains edges',
      ],
      housingTypes: 'Multi-family, townhomes, SFH',
      challenges: [
        'US-12 freeflow',
        'HOA timed windows',
        'Empty miles vs campus core',
      ],
      moverTips:
        'Confirm HOA rules. Price US-12 honestly. Prefer mid-week starts.',
      cityKeywords: [
        'middleton',
        'cross plains',
      ],
    },
    {
      id: 'sun-prairie-east',
      name: 'Sun Prairie, Cottage Grove & eastern growth',
      shortName: 'East growth',
      neighborhoods: [
        'Sun Prairie',
        'Cottage Grove',
        'McFarland edges',
        'Monona edges',
        'Stoughton edges',
        'Deerfield edges',
      ],
      housingTypes: 'Growth SFH, townhomes, multi-family',
      challenges: [
        'I-39/90/94 freeflow',
        'Cul-de-sac truck access',
        'School-calendar peaks',
      ],
      moverTips:
        'Price empty miles honestly. Survey cul-de-sacs. Book peak school windows early.',
      cityKeywords: [
        'sun prairie',
        'cottage grove',
        'mcfarland',
        'monona',
        'stoughton',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Dane County moving costs',
    intro:
      'Isthmus access, UW peaks, Beltline freeflow, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Isthmus stairs, curb & elevator/COI product',
        detail:
          'Downtown and campus multi-unit add schedule risk before packing skill matters.',
      },
      {
        title: 'UW semester lease waves',
        detail:
          'August and January windows premium-price crews and elevators.',
      },
      {
        title: 'Beltline · I-39/90/94 · US-12/18/151 congestion',
        detail:
          'Cross-zone pairs burn portal-to-portal hours.',
      },
      {
        title: 'Suburb-ring HOA admin & empty miles',
        detail:
          'Fitchburg, Middleton, and Sun Prairie product adds soft costs and staging distance.',
      },
      {
        title: 'Winter ice & weather contingency',
        detail:
          'December–March reshapes outdoor labor around inflexible lease ends.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with isthmus access or semester peaks',
      },
      {
        label: '2–3BR multi-unit or townhome',
        value: '$1,500–$4,500+',
        note: 'Stairs, elevators, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / suburb-ring / long pair',
        value: '$2,900–$9,000+',
        note: 'Empty miles and high-value stock price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal; packing and access scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Dane County move',
    intro:
      'UW calendars, capital timing, winter ice, and Beltline freeflow reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings outside semester peaks',
        detail:
          'Tuesday–Thursday starts clear isthmus curb and ease Beltline pain.',
      },
      {
        title: 'Peak UW: mid-August and early January',
        detail:
          'Student multi-unit turnover fills fleets first. Book 2–4 weeks ahead.',
      },
      {
        title: 'Peak family season: late May–mid-September',
        detail:
          'Family SFH and townhome moves compete with campus waves — book early.',
      },
      {
        title: 'Winter: ice and weather cancellations',
        detail:
          'December–March favors flexible dates and early starts.',
      },
    ],
  },
  specialized: [
    {
      id: 'madison-isthmus-uw',
      title: 'Madison isthmus, UW & capital logistics module',
      intro:
        'Dane estimates fail more often on isthmus staging, semester multi-unit waves, and Beltline freeflow than on packing skill alone.',
      bullets: [
        'Book elevators and crews early for August and January campus peaks.',
        'Photo isthmus curb options and stair counts before the survey is final.',
        'Price portal-to-portal time for Beltline, I-39/90/94, US-12, and US-18/151 pairs at peak.',
        'Collect HOA packets for Fitchburg, Middleton, and Sun Prairie multi-family.',
        'Plan winter ice contingency around inflexible lease ends.',
        'For in-state jobs insist on written estimates and insurance; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-milwaukee-west-clone',
      title: 'Capital/university vs Milwaukee metro module',
      intro:
        'A single “Wisconsin metro rate” collapses when Madison capital product and Milwaukee multi-county logistics diverge.',
      bullets: [
        'Do not price isthmus walk-ups like Milwaukee East Side as interchangeable empty-mile markets.',
        'Match UW and capital calendars separately from Milwaukee industrial and corporate waves.',
        'Ask which Beltline vs interstate approaches the crew will actually use.',
        'Keep Dane destinations clear from Waukesha west-metro HOA assumptions.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Dane County?',
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
              'Madison Metropolitan School District covers most city addresses; surrounding communities (Middleton-Cross Plains, Sun Prairie, Verona, Fitchburg area options, and others) operate separate systems. Assignment is address-based.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Wisconsin DPI data, and campus visits beat ranking screenshots alone.',
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
              'UW Health, UnityPoint Health – Meriter, SSM Health, and other campuses anchor care across Madison. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — freeway freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect isthmus multi-unit and downtown condos; campus multi-unit; west-side multi-family; growth SFH and townhomes in Fitchburg, Middleton, Verona, and Sun Prairie.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for condo/HOA dues, older-building repair risk, and parking where relevant.',
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
            title: 'Isthmus / downtown urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with curb, stairs, and event-day tradeoffs.',
          },
          {
            title: 'Campus-adjacent multi-unit',
            detail:
              'Often appeals for short UW commutes — with semester competition and stair logistics.',
          },
          {
            title: 'West-side and Middleton professional suburbs',
            detail:
              'Attracts households seeking schools and multi-family amenities — with Beltline freeflow.',
          },
          {
            title: 'Sun Prairie / eastern growth',
            detail:
              'Fits families seeking newer SFH — with empty-mile tradeoffs into the isthmus.',
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
              'State government, UW–Madison, healthcare, insurance/tech (including major west-side employers), and professional services concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Dane is a capital and university county — different from Milwaukee industrial-urban product, Waukesha west-metro collars, and Fox Cities manufacturing corridors.',
          },
          {
            title: 'Climate',
            detail:
              'Continental four-season climate with cold winters, lake-effect snow near Lake Michigan, and rapid weather swings. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, winter weather, and local events reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Dane County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For in-state Wisconsin moves insist on written estimates and insurance proof; verify FMCSA for any interstate leg before deposits.',
    items: [
      {
        label: 'City of Madison — official site',
        href: 'https://www.cityofmadison.com/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Madison Metropolitan School District',
        href: 'https://www.madison.k12.wi.us/',
        external: true,
        note: 'Boundaries & calendars (Madison addresses)',
      },
      {
        label: '511wi — traffic conditions',
        href: 'https://511wi.gov/',
        external: true,
        note: 'Beltline / interstates before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with isthmus multi-unit experience for downtown and campus product; HOA readiness for Fitchburg–Middleton–Sun Prairie; honest Beltline · I-39/90/94 · US-12 · US-18/151 timing. For in-state jobs insist on written estimates and insurance; verify FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
