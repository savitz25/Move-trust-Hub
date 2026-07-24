import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeRiPack,
  RI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/rhode-island/ri-shared';

/**
 * Washington County, RI — South County: Narragansett, South Kingstown, URI, tourism.
 * NOT Washington State, NOT Washington County AR, NOT Washington County UT, NOT Washington County MN/OR/etc.
 */
export const washingtonCountyRiIntelligence: CountyIntelligencePack = finalizeRiPack({
  countySlug: 'washington',
  hubTitle: 'Washington County Moving Intelligence Hub',
  eyebrow:
    'Washington County, RI · South County / Narragansett / URI & US-1 / coastal logistics',
  h1: 'Moving in Washington County, RI: South County Access, Narragansett Grids & US-1 / Coastal Logistics',
  heroOpener:
    'Washington County, Rhode Island is South County — Narragansett coastal grids, South Kingstown / Wakefield, University of Rhode Island Kingston campus density, Westerly–Charlestown west belts, North Kingstown north edges, and rural inland South County product — not Washington State, not Washington County Arkansas, not Washington County Utah, and not a renamed Providence capital page. Expect tourism freeflow that rewrites summer load windows, coastal neck and dune-adjacent access constraints, URI academic peaks, and US-1 / RI-4 / RI-138 freeflow across “local” pairs. A Narragansett seasonal multi-unit, a Kingston campus walk-up, a Wakefield ranch, and a Westerly character home do not share truck access or crew skill. Tourism calendars and university waves are real inputs. This hub is for people moving in Washington County, RI — Rhode Island South County — not any other Washington County in the United States.',
  heroCredibility:
    'RI DPUC Motor Carriers household goods certificate for intrastate · FMCSA for interstate · South County coastal & URI logistics awareness · Curated listings',
  majorCorridors: 'US-1 · RI-4 · RI-138 · local South County grid',
  whatMakesDifferent: {
    title: 'What makes moving in Washington County, RI different',
    intro:
      'These are Washington County, Rhode Island / South County realities — Narragansett coastal access, URI Kingston density, tourism freeflow, and US-1 logistics — not Washington State, not Washington County AR/UT, and not Providence capital triple-decker defaults alone.',
    bullets: [
      {
        title: 'This is Washington County, Rhode Island (South County) — not Washington State or other U.S. Washington Counties',
        detail:
          'Ignore Seattle–Tacoma freeflow templates, Fayetteville AR growth scripts, St. George UT desert product, and any other “Washington County” national default. Washington County RI is Rhode Island’s South County with Narragansett, South Kingstown, URI Kingston, Westerly, Charlestown, North Kingstown, and rural inland belts. Match estimates to Rhode Island South County addresses and Rhode Island DPUC authority — never Washington State or out-of-state Washington County logistics.',
      },
      {
        title: 'Tourism peaks rewrite summer access on coastal grids',
        detail:
          'Narragansett, Watch Hill edges, Charlestown beaches, and US-1 weekend freeflow fill curb and burn portal time from Memorial Day through Labor Day. Mid-week early windows matter more than map miles.',
      },
      {
        title: 'URI Kingston campus density rewrites academic-calendar jobs',
        detail:
          'Student turnover, walk-up multi-unit, scarce curb near campus edges, and late-August peaks dominate Kingston product that inland ranch estimates never see.',
      },
      {
        title: 'Coastal necks, seasonal stock & character grids underprice access',
        detail:
          'Narrow approaches, dune-adjacent staging limits, older coastal interiors, and mixed seasonal vs year-round product fail estimates more often than packing skill alone.',
      },
      {
        title: 'US-1, RI-4, and RI-138 burn portal time',
        detail:
          'Narragansett ↔ Westerly, Kingston ↔ North Kingstown, or Wakefield ↔ Charlestown pairs look local and still burn 25–55+ minutes at peak tourism windows. Price portal-to-portal honestly.',
      },
      {
        title: 'Metro and interstate pairs are routine',
        detail:
          'Households regularly move Washington County RI ↔ Kent, Providence, Newport, or Bristol County, or into Connecticut (Westerly–Stonington edges) and Massachusetts corridors. A Rhode Island DPUC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Rhode Island.',
      },
      RI_REG_BULLET,
    ],
  },
  zonesHeading: 'Washington County, RI (South County) access zones',
  zonesIntro:
    'Plan by Narragansett coastal product, South Kingstown / Wakefield, URI Kingston campus density, Westerly–Charlestown west belts, North Kingstown north edges, and rural inland South County — access rules cluster by tourism freeflow, campus calendars, and coastal geometry more than ZIP alone. This is Rhode Island South County, not Washington State.',
  zones: [
    {
      id: 'narragansett-coastal',
      name: 'Narragansett coastal grids, pier edges & seasonal multi-unit',
      shortName: 'Narragansett',
      neighborhoods: [
        'Narragansett',
        'Narragansett Pier edges',
        'Galilee edges',
        'Bonnet Shores edges',
        'Coastal multi-unit pockets',
        'US-1A / Ocean Road corridors',
      ],
      housingTypes: 'Seasonal and year-round multi-unit, coastal SFH, condo, limited elevators',
      challenges: [
        'Tourism freeflow and scarce summer curb',
        'Narrow coastal approaches and long carries',
        'US-1 weekend congestion',
      ],
      moverTips:
        'Prefer mid-week non-holiday starts in peak tourism season. Photo curb staging early. Confirm truck length on tight coastal streets and protect landscaping.',
      cityKeywords: [
        'narragansett',
        'galilee',
      ],
    },
    {
      id: 'south-kingstown-wakefield',
      name: 'South Kingstown, Wakefield & central South County product',
      shortName: 'South Kingstown / Wakefield',
      neighborhoods: [
        'South Kingstown',
        'Wakefield',
        'Peace Dale edges',
        'Main Street corridors',
        'Central multi-unit pockets',
        'Local arterial belts',
      ],
      housingTypes: 'SFH, multi-unit, duplexes, mixed condo stock',
      challenges: [
        'Mixed municipal and village product across short distances',
        'US-1 / local freeflow into coastal unload pairs',
        'School-calendar and tourism overlap peaks',
      ],
      moverTips:
        'Clarify South Kingstown village addresses carefully. Survey stairs and driveway geometry. Price US-1 honestly for Narragansett and Westerly pairs.',
      cityKeywords: [
        'south kingstown',
        'wakefield',
        'peace dale',
      ],
    },
    {
      id: 'uri-kingston',
      name: 'URI Kingston campus density & academic multi-unit belts',
      shortName: 'URI / Kingston',
      neighborhoods: [
        'Kingston',
        'URI campus edges',
        'Student multi-unit belts',
        'Kingston village edges',
        'RI-138 corridors',
        'Campus-adjacent rental stock',
      ],
      housingTypes: 'Walk-up multifamily, student rentals, limited elevators, mixed SFH',
      challenges: [
        'Academic-calendar turnover peaks (especially late August)',
        'Scarce curb and multi-flight stairs near campus',
        'RI-138 freeflow and inventory bulk from student households',
      ],
      moverTips:
        'Book around major move-in/move-out weekends early. Survey stair counts with photos. Prefer mid-week starts; inventory student bulk carefully.',
      cityKeywords: [
        'kingston',
        'uri',
        'university of rhode island',
      ],
    },
    {
      id: 'westerly-charlestown-west',
      name: 'Westerly, Charlestown & western South County coastal belts',
      shortName: 'Westerly / Charlestown',
      neighborhoods: [
        'Westerly',
        'Watch Hill edges',
        'Misquamicut edges',
        'Charlestown',
        'Charlestown beach corridors',
        'Connecticut-border approaches',
      ],
      housingTypes: 'Character SFH, seasonal coastal product, multi-unit pockets, estate edges',
      challenges: [
        'Tourism freeflow and scarce beach-weekend staging',
        'Interstate authority when any leg enters Connecticut',
        'US-1 freeflow and longer empty miles to Kingston / Narragansett',
      ],
      moverTips:
        'Clarify Rhode Island vs Connecticut addresses on every estimate. Prefer mid-week non-beach-weekend starts. Verify FMCSA when any leg leaves Rhode Island.',
      cityKeywords: [
        'westerly',
        'charlestown',
        'watch hill',
        'misquamicut',
      ],
    },
    {
      id: 'north-kingstown-north',
      name: 'North Kingstown north edges, Quonset & RI-4 approaches',
      shortName: 'North Kingstown',
      neighborhoods: [
        'North Kingstown',
        'Wickford edges',
        'Quonset edges',
        'Post Road corridors',
        'RI-4 approach belts',
        'Northern multi-unit pockets',
      ],
      housingTypes: 'SFH, multi-unit, townhomes, mixed commercial-adjacent stock',
      challenges: [
        'RI-4 / US-1 freeflow into Kent and Providence pairs',
        'Mixed driveway and multi-unit access product',
        'Employment-corridor congestion near Quonset edges',
      ],
      moverTips:
        'Price RI-4 and US-1 honestly for northbound unload pairs. Survey multi-unit stairs and curb. Clarify North Kingstown vs South Kingstown addresses.',
      cityKeywords: [
        'north kingstown',
        'wickford',
        'quonset',
      ],
    },
    {
      id: 'rural-inland-south-county',
      name: 'Rural inland South County, Exeter edges & interior belts',
      shortName: 'Inland South County',
      neighborhoods: [
        'Exeter edges',
        'Richmond edges',
        'Hopkinton edges',
        'Inland rural-residential belts',
        'Wooded lot corridors',
        'Cross-county approaches to Kent County',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit',
      challenges: [
        'Longer empty miles to coastal and campus cores',
        'Mixed driveway, gravel, and overhead clearance risk',
        'Sparse staging options on interior lots',
      ],
      moverTips:
        'Price empty miles honestly. Survey driveway width, turnaround, and overhead clearance. Align with school calendars when relevant.',
      cityKeywords: [
        'exeter',
        'richmond',
        'hopkinton',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Washington County, RI moving costs',
    intro:
      'Tourism freeflow, URI campus stairs, coastal neck access, and US-1 / RI-4 / RI-138 timing move the number more than packing skill alone — this is Rhode Island South County logistics, not Washington State and not Providence capital defaults alone.',
    drivers: [
      {
        title: 'Summer tourism freeflow & scarce coastal curb',
        detail:
          'Narragansett, Westerly, and Charlestown beach-weekend windows rewrite jobs that look simple on a map.',
      },
      {
        title: 'URI Kingston multi-unit stairs & academic peaks',
        detail:
          'Campus turnover adds labor, inventory bulk, and schedule risk before packing skill matters.',
      },
      {
        title: 'Coastal necks, seasonal stock & character-grid access',
        detail:
          'Narrow approaches and long carries fail estimates more often than inventory alone on South County shore product.',
      },
      {
        title: 'US-1 · RI-4 · RI-138 congestion',
        detail:
          'Cross–South County pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Metro & interstate empty miles',
        detail:
          'Kent, Providence, Newport destinations and Connecticut / Massachusetts pairs raise staging distance and authority complexity when leaving Washington County RI or Rhode Island.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$2,000+',
        note: 'Higher with campus walk-ups, coastal access, or peak tourism pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,600+',
        note: 'Stairs, seasonal stock, and US-1 freeflow soft costs trend up',
      },
      {
        label: '3–4+ BR / coastal / cross-zone',
        value: '$2,900–$9,500+',
        note: 'Tourism peaks and long US-1 / RI-4 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$210+/hr',
        note: 'Portal-to-portal; packing, stairs, coastal access, and tourism timing scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Washington County, RI move',
    intro:
      'Tourism calendars, URI academic cycles, summer beach freeflow, nor’easter risk, and winter ice reshape access and crew availability across Rhode Island South County — not Washington State climate defaults.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce US-1 / tourism pain. Avoid holiday weekends and month-end Fridays when leases and beach freeflow collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Tourism, family school calendars, and URI turnover fill first. Book 2–4 weeks ahead for peak weekends, coastal access, and campus move-in windows.',
      },
      {
        title: 'URI academic & tourism overlap risk',
        detail:
          'Late August campus peaks plus residual summer tourism tighten Kingston, Narragansett, and Wakefield capacity. Prefer flexible dates and early starts.',
      },
      {
        title: 'Summer humidity, storms & winter ice',
        detail:
          'June–August humidity, coastal storms, and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency on coastal and older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'south-county-coastal-uri',
      title: 'South County coastal, URI Kingston & US-1 / RI-4 logistics module',
      intro:
        'Washington County, RI estimates fail more often on tourism freeflow, campus stairs, coastal access geometry, and US-1 timing than on packing skill alone. This is Rhode Island South County — not Washington State.',
      bullets: [
        'State the market as Washington County, Rhode Island / South County on every estimate — disambiguate from Washington State and all other U.S. Washington Counties.',
        'Prefer mid-week non-holiday starts for Narragansett, Westerly, and Charlestown product in peak tourism season.',
        'Book around URI Kingston major move-in/move-out weekends early; survey stair counts and student inventory bulk with photos.',
        'Photo coastal approaches, truck length, and staging options for Narragansett and western shore product.',
        'Price portal-to-portal time for any pair that rides US-1, RI-4, or RI-138 at peak.',
        'Clarify Narragansett, South Kingstown, Kingston, Westerly, Charlestown, North Kingstown, Exeter, and unincorporated addresses on every estimate.',
        'For in-state jobs verify RI DPUC Motor Carriers household goods certificate status; verify FMCSA for any out-of-state leg (including Connecticut Westerly-border pairs).',
      ],
    },
    {
      id: 'not-washington-state-not-other-wa-counties',
      title: 'Not Washington State · not other U.S. Washington Counties module',
      intro:
        'A single “Washington County rate” collapses when Rhode Island South County product is confused with Washington State metro logistics, Washington County AR/UT growth scripts, or Providence capital defaults alone.',
      bullets: [
        'Do not price Narragansett coastal or URI Kingston product like Seattle–Tacoma freeflow, Fayetteville AR suburbs, St. George UT, or Providence triple-deckers as interchangeable defaults.',
        'State Washington County, RI / South County explicitly — never imply Washington State jurisdiction or out-of-state Washington County regulation.',
        'Keep Rhode Island vs Connecticut addresses clear when Westerly–Stonington pairs appear — interstate authority applies when any leg leaves Rhode Island.',
        'Match tourism peaks separately from URI academic windows and inland rural-residential jobs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Washington County, RI?',
    intro:
      'Use this as a practical fit checklist for Rhode Island South County — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is not Washington State.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Washington County, RI spans Narragansett, South Kingstown, North Kingstown, Westerly, Charlestown, Chariho (Charlestown–Richmond–Hopkinton), Exeter–West Greenwich arrangements, and related systems. Assignment is address-based — marketing village names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and coastal demand belts can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Rhode Island Department of Education data, and campus visits beat ranking screenshots alone. University of Rhode Island shapes rental and calendar demand far beyond K–12 rankings.',
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
              'South County Hospital anchors local acute care, with regional specialty access into Providence systems. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to South County Hospital and Providence specialty campuses — US-1 and RI-4 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Narragansett coastal and seasonal multi-unit; South Kingstown / Wakefield mixed stock; URI Kingston student multi-unit; Westerly–Charlestown character and seasonal product; North Kingstown mixed SFH; inland rural-residential.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by shore vs inland and year-round vs seasonal product. Budget for older-building repair risk, flood/insurance diligence on coastal stock, and competitive summer rental seasons.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully — especially seasonal coastal buildings.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Narragansett coastal lifestyle',
            detail:
              'Suits people prioritizing shore access and amenities — with tourism freeflow and scarce summer curb tradeoffs on move day.',
          },
          {
            title: 'South Kingstown / Wakefield year-round living',
            detail:
              'Often appeals for village amenities and central South County access — with mixed multi-unit logistics and US-1 freeflow.',
          },
          {
            title: 'URI Kingston academic living',
            detail:
              'Fits students, staff, and households tied to campus calendars — with walk-up stairs and peak turnover windows.',
          },
          {
            title: 'Westerly / Charlestown western coastal living',
            detail:
              'Attracts households seeking western shore character — with tourism peaks, longer empty miles, and Connecticut border authority awareness.',
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
              'University of Rhode Island, tourism and hospitality, healthcare, Quonset-related logistics edges, professional services, and reverse-commute pairs into Kent and Providence concentrate demand across Washington County RI.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak US-1, RI-4, and RI-138 freeflow is real — including summer tourism and Providence reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Washington County, RI is Rhode Island South County — Narragansett coast, URI Kingston, and tourism freeflow — not Washington State, not other U.S. Washington Counties, and not a Providence capital rename.',
          },
          {
            title: 'Climate',
            detail:
              'Coastal New England climate with humid summers, tourism peaks, coastal storm risk, nor’easters, and freeze-thaw winters. Plan outdoor staging, ice, and humidity contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak tourism and off-peak times when deciding — beach weekends, URI calendars, and winter storms reshape daily rhythm across South County.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Washington County, RI (South County) resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify RI DPUC household goods certificate status for in-state moves and FMCSA for interstate legs before deposits. This hub covers Washington County, Rhode Island only.',
    items: [
      {
        label: 'Town of Narragansett',
        href: 'https://www.narragansettri.gov/',
        external: true,
        note: 'Coastal South County municipality context',
      },
      {
        label: 'Town of South Kingstown',
        href: 'https://www.southkingstownri.com/',
        external: true,
        note: 'Wakefield / central South County context',
      },
      {
        label: 'University of Rhode Island',
        href: 'https://www.uri.edu/',
        external: true,
        note: 'Kingston campus calendar & logistics context',
      },
      {
        label: 'Town of Westerly',
        href: 'https://westerlyri.gov/',
        external: true,
        note: 'Western coastal municipality context',
      },
      {
        label: 'Town of North Kingstown',
        href: 'https://www.northkingstownri.gov/',
        external: true,
        note: 'Northern South County / RI-4 approach context',
      },
      {
        label: 'Rhode Island 511 — traveler information',
        href: 'https://www.ri511.com/',
        external: true,
        note: 'US-1 / RI-4 / RI-138 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with coastal access and tourism-window fluency for Narragansett–Westerly–Charlestown product; URI Kingston multi-unit and academic-peak experience; honest US-1 · RI-4 · RI-138 timing for cross–South County pairs; rural driveway surveys for inland edges. Verify RI DPUC Motor Carriers household goods certificate for intrastate moves and FMCSA for interstate legs before deposits. This is Washington County, Rhode Island (South County) — not Washington State and not any other U.S. Washington County.',
  lastReviewed: '2026-07-24',
});
