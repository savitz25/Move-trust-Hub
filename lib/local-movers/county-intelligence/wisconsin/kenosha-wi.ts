import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWiPack,
  WI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/wisconsin/wi-shared';

/**
 * Kenosha County, WI — IL border, Chicago commute patterns (not Milwaukee south clone, not Racine mid-size clone).
 */
export const kenoshaCountyWiIntelligence: CountyIntelligencePack = finalizeWiPack({
  countySlug: 'kenosha',
  hubTitle: 'Kenosha County Moving Intelligence Hub',
  eyebrow: 'Kenosha · Illinois border, Chicago commute corridors & I-94 logistics',
  h1: 'Moving in Kenosha County: IL-Border Access, Chicago Commute Patterns & I-94 Corridors',
  heroOpener:
    'Kenosha County is not a Milwaukee south neighborhood clone and not a Racine mid-size lake template alone — it is an Illinois-border market with Chicago commute patterns, Pleasant Prairie multi-family growth, lakeshore multi-unit, and I-94 freeflow that can flip a “local” quote into interstate FMCSA territory the moment a leg crosses into Illinois. A downtown Kenosha walk-up, a HarborPark condo elevator, a Pleasant Prairie HOA townhome, and a Twin Lakes western approach do not share truck access or authority assumptions. Winter ice and border freeflow are real inputs. This hub is for people moving in Kenosha County — not a renamed Milwaukee or Illinois page.',
  heroCredibility:
    'Wisconsin in-state written estimate & insurance diligence · FMCSA for interstate & IL-border legs · Chicago-collar logistics awareness · Curated listings',
  majorCorridors: 'I-94 · WI-50 · WI-158 · WI-31 · IL border approaches',
  whatMakesDifferent: {
    title: 'What makes moving in Kenosha County different',
    intro:
      'These are Illinois-border and Chicago-collar realities — I-94 freeflow, cross-border authority, and growth multi-family — not Milwaukee East Side density or Racine-only lake-city patterns.',
    bullets: [
      {
        title: 'Illinois destinations flip jobs to interstate FMCSA',
        detail:
          'Short I-94 hops into Lake County, IL need FMCSA — Wisconsin business registration alone is not enough. Clarify destinations early.',
      },
      {
        title: 'Chicago commute multi-family and HOA product dominate many jobs',
        detail:
          'Pleasant Prairie and growth corridors often need COI packets and timed windows that older Kenosha walk-ups do not.',
      },
      {
        title: 'I-94, WI-50, WI-158, and WI-31 burn portal time',
        detail:
          'Kenosha ↔ Milwaukee or Kenosha ↔ northern Illinois pairs look manageable and still burn billable hours at peak.',
      },
      {
        title: 'Lakeshore condo elevators rewrite labor vs western rural edges',
        detail:
          'Harbor-area multi-unit and Twin Lakes approaches are different products a few miles apart.',
      },
      {
        title: 'Winter ice and lake-effect snow reshape outdoor carries',
        detail:
          'December–March adds cancellation risk — flexible dates reduce soft costs.',
      },
      {
        title: 'Multi-county southeast and IL pairs are routine',
        detail:
          'Households regularly move Kenosha ↔ Racine, Milwaukee, or Illinois. Keep authority assumptions honest when any leg leaves Wisconsin.',
      },
      WI_REG_BULLET,
    ],
  },
  zonesHeading: 'Kenosha County access zones',
  zonesIntro:
    'Plan by downtown Kenosha multi-unit, lakeshore condos, Pleasant Prairie growth, Somers–Paris mid-county, and western Twin Lakes–Wheatland edges.',
  zones: [
    {
      id: 'downtown-kenosha',
      name: 'Downtown Kenosha multi-unit & near-core stock',
      shortName: 'Downtown Kenosha',
      neighborhoods: [
        'Downtown Kenosha',
        'Uptown edges',
        'HarborPark edges',
        'Library Park edges',
        'Civic Center edges',
        'Simmons Island edges',
      ],
      housingTypes: 'Multi-unit, older SFH, condo towers',
      challenges: [
        'Stairs and elevator/COI mix',
        'WI-32 freeflow',
        'Winter ice',
      ],
      moverTips:
        'Book elevators early on condo product. Survey stairs carefully. Prefer mid-week starts.',
      cityKeywords: [
        'kenosha',
      ],
    },
    {
      id: 'lakeshore-condo',
      name: 'Lakeshore condo & residential stock',
      shortName: 'Lakeshore',
      neighborhoods: [
        'Lakeshore',
        'Southport edges',
        'Alford Park edges',
        'Pennoyer edges',
        'Carol Beach edges',
        'Northside lakeshore',
      ],
      housingTypes: 'Condos, multi-unit, SFH',
      challenges: [
        'Elevator reservations',
        'Lake-effect weather',
        'Tourism/weekend curb',
      ],
      moverTips:
        'Collect COI packets early. Plan winter ice contingency. Prefer mid-week starts.',
      cityKeywords: [
        'kenosha',
      ],
    },
    {
      id: 'pleasant-prairie',
      name: 'Pleasant Prairie multi-family & IL-border growth',
      shortName: 'Pleasant Prairie',
      neighborhoods: [
        'Pleasant Prairie',
        'Prairie Ridge edges',
        'RecPlex edges',
        'IL border approaches',
        'Springbrook edges',
        'Tobin edges',
      ],
      housingTypes: 'Townhomes, multi-family, growth SFH',
      challenges: [
        'HOA timed windows',
        'I-94 freeflow',
        'Illinois destination authority complexity',
      ],
      moverTips:
        'Collect HOA packets. Clarify Illinois destinations early for FMCSA. Price I-94 honestly.',
      cityKeywords: [
        'pleasant prairie',
      ],
    },
    {
      id: 'somers-paris',
      name: 'Somers, Paris & mid-county approaches',
      shortName: 'Somers / Paris',
      neighborhoods: [
        'Somers',
        'Paris',
        'I-94 mid-county edges',
        'County Road corridors',
        'Bristol edges',
        'Paddock Lake edges',
      ],
      housingTypes: 'SFH, multi-family, rural-edge lots',
      challenges: [
        'I-94 freeflow',
        'Longer empty miles',
        'Winter driveway ice',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveways. Clarify village vs town addresses.',
      cityKeywords: [
        'somers',
        'paris',
        'bristol',
        'paddock lake',
      ],
    },
    {
      id: 'west-kenosha',
      name: 'Twin Lakes, Wheatland & western edges',
      shortName: 'West Kenosha',
      neighborhoods: [
        'Twin Lakes',
        'Wheatland',
        'Randall edges',
        'Silver Lake edges',
        'Powers Lake edges',
        'Genoa City edges',
      ],
      housingTypes: 'Lake SFH, multi-unit pockets, rural-edge lots',
      challenges: [
        'WI-50 / WI-83 empty miles',
        'Lake-adjacent staging',
        'School-calendar peaks',
      ],
      moverTips:
        'Price empty miles honestly. Survey lake driveways. Book peak summer weekends early.',
      cityKeywords: [
        'twin lakes',
        'wheatland',
        'silver lake',
        'genoa city',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kenosha County moving costs',
    intro:
      'IL-border authority, I-94 freeflow, HOA multi-family, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Illinois border FMCSA complexity',
        detail:
          'Cross-border pairs add authority checks and sometimes longer carrier selection cycles.',
      },
      {
        title: 'I-94 · WI-50 · WI-158 congestion',
        detail:
          'Chicago-collar and Milwaukee pairs burn portal-to-portal hours.',
      },
      {
        title: 'Pleasant Prairie HOA admin & elevators',
        detail:
          'Growth multi-family soft costs trend up vs older walk-ups.',
      },
      {
        title: 'Lakeshore condo COI packets',
        detail:
          'Vertical product adds schedule risk before packing skill matters.',
      },
      {
        title: 'Winter ice & weather contingency',
        detail:
          'December–March reshapes outdoor labor and cancellation risk.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators or peak I-94 pairs',
      },
      {
        label: '2–3BR multi-unit or townhome',
        value: '$1,400–$4,400+',
        note: 'HOA and elevator soft costs trend up',
      },
      {
        label: '3–4+ BR / IL-border / long pair',
        value: '$2,800–$9,000+',
        note: 'Interstate complexity and empty miles price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; packing and access scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Kenosha County move',
    intro:
      'Chicago-collar commute peaks, HOA windows, winter ice, and I-94 freeflow reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear HOA docks and ease I-94 pain.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family and multi-unit turnover fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter: ice and weather cancellations',
        detail:
          'December–March favors flexible dates and early starts.',
      },
      {
        title: 'Illinois reverse-commute mid-month spikes',
        detail:
          'Corporate and professional relocations often land mid-month rather than only on Saturday peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'il-border-chicago-collar',
      title: 'Illinois-border & Chicago-collar logistics module',
      intro:
        'Kenosha estimates fail more often on destination-state authority, I-94 freeflow, and HOA packets than on packing skill alone.',
      bullets: [
        'Clarify Illinois destinations early — short border hops often need FMCSA, not Wisconsin-only assumptions.',
        'Collect HOA COI packets for Pleasant Prairie multi-family before the survey is final.',
        'Price portal-to-portal time for I-94, WI-50, WI-158, and WI-31 pairs at peak.',
        'Book elevators early for lakeshore condo product.',
        'Plan winter ice contingency on outdoor carries.',
        'For pure in-state jobs insist on written estimates and insurance; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-milwaukee-south-clone',
      title: 'Kenosha vs Milwaukee / Racine micro-market module',
      intro:
        'A single “southeast rate” collapses when Kenosha IL-border product and Milwaukee or Racine products diverge.',
      bullets: [
        'Do not price Pleasant Prairie multi-family like Milwaukee East Side walk-ups.',
        'Ask which I-94 approaches the crew will actually use northbound vs southbound into Illinois.',
        'Keep Kenosha vs Racine / Milwaukee county lines clear on multi-address estimates.',
        'Match Chicago-commute calendars separately from Milwaukee industrial waves.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kenosha County?',
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
              'Kenosha Unified and neighboring districts (including Trevor-Wilmot, Westosha, and others) serve the county. Assignment is address-based.',
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
              'Froedtert South / Kenosha Medical Center campuses and regional clinics serve the county; many households also use northern Illinois or Milwaukee specialty care. Confirm insurance networks.',
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
              'Expect multi-unit and older SFH in Kenosha city; lakeshore condos; multi-family and growth SFH in Pleasant Prairie; lake and rural-edge stock west.',
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
            title: 'Downtown / lakeshore multi-unit',
            detail:
              'Suits people prioritizing lake adjacency and mid-size city amenities — with elevator/stair tradeoffs.',
          },
          {
            title: 'Pleasant Prairie growth multi-family',
            detail:
              'Often appeals for newer multi-unit and I-94 job access — with HOA logistics and IL-border freeflow.',
          },
          {
            title: 'Mid-county Somers approaches',
            detail:
              'Attracts households seeking space with corridor access — with empty-mile tradeoffs.',
          },
          {
            title: 'Western lake communities',
            detail:
              'Fits buyers chasing quieter lake living — with longer staging into Kenosha core.',
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
              'Logistics and manufacturing along I-94, healthcare, retail, education, and Chicago reverse-commutes concentrate demand.',
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
              'Kenosha is an Illinois-border Chicago-collar market — different from Milwaukee city density, Racine mid-size lake patterns, and Madison capital logistics.',
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
    title: 'Useful Kenosha County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For in-state Wisconsin moves insist on written estimates and insurance proof; verify FMCSA for any interstate or Illinois-border leg before deposits.',
    items: [
      {
        label: 'City of Kenosha — official site',
        href: 'https://www.kenosha.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Kenosha County',
        href: 'https://www.kenoshacounty.org/',
        external: true,
        note: 'County services & info',
      },
      {
        label: '511wi — traffic conditions',
        href: 'https://511wi.gov/',
        external: true,
        note: 'I-94 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with IL-border authority fluency for cross-state pairs; HOA multi-family experience for Pleasant Prairie; elevator readiness for lakeshore condos; honest I-94 · WI-50 · WI-158 · WI-31 timing. For in-state jobs insist on written estimates and insurance; verify FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
