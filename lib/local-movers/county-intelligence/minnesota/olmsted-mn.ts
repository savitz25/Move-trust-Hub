import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMnPack,
  MN_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/minnesota/mn-shared';

/**
 * Olmsted County, MN — Rochester + Mayo Clinic medical relocation (not Twin Cities clone).
 */
export const olmstedCountyMnIntelligence: CountyIntelligencePack = finalizeMnPack({
  countySlug: 'olmsted',
  hubTitle: 'Olmsted County Moving Intelligence Hub',
  eyebrow: 'Olmsted · Rochester Mayo medical relo, downtown multi-unit & US-52 logistics',
  h1: 'Moving in Olmsted County: Rochester Access, Mayo Medical Relo & US-52 Corridors',
  heroOpener:
    'Olmsted County is not a Twin Cities suburb clone — it is Rochester medical-relocation logistics around Mayo Clinic campuses, downtown and midtown multi-unit elevators, professional housing turnover, and US-52 / US-14 / US-63 freeflow that rewrites “local” estimates. A downtown Rochester freight elevator, a midtown walk-up, a northwest HOA townhome, and a Byron cul-de-sac do not share truck access or crew calendars. Fellowship start dates and clinic report days are real inputs. This hub is for people moving in Olmsted County — not a renamed Hennepin page or generic southeast Minnesota script.',
  heroCredibility:
    'MnDOT household goods mover permit for intrastate moves · FMCSA for interstate · Mayo medical relo logistics awareness · Curated listings',
  majorCorridors: 'US-52 · US-14 · US-63 · 2nd Street / local grid',
  whatMakesDifferent: {
    title: 'What makes moving in Olmsted County different',
    intro:
      'These are Rochester and Mayo medical-market realities — hard report dates, multi-unit elevators, and US-52 freeflow — not Minneapolis lakeside product or Dakota south-metro HOAs alone.',
    bullets: [
      {
        title: 'Mayo Clinic medical relocation calendars dominate demand',
        detail:
          'Fellows, residents, nurses, and physicians often have hard report dates mid-month. Storage-in-transit and temporary housing are common estimate inputs — not afterthoughts.',
      },
      {
        title: 'Downtown and midtown elevators rewrite labor vs suburban driveways',
        detail:
          'Core multi-unit needs elevator reservations and COI naming. Northwest growth SFH does not share that stack.',
      },
      {
        title: 'US-52, US-14, and US-63 turn short pairs into billable hours',
        detail:
          'Downtown ↔ northwest Rochester or Rochester ↔ Byron pairs look local and still burn portal time at peak clinic shift changes.',
      },
      {
        title: 'Professional high-value inventories need careful packing standards',
        detail:
          'Medical professionals often move dense electronics, instruments, and high-value goods — survey inventory honestly.',
      },
      {
        title: 'Winter ice and wind reshape outdoor carries in southeast Minnesota',
        detail:
          'December–March adds cancellation risk — flexible dates reduce soft costs around clinic start dates.',
      },
      {
        title: 'Twin Cities and interstate medical pairs are routine',
        detail:
          'Households regularly move Olmsted ↔ Twin Cities, Iowa, or Wisconsin. Clarify destinations so MnDOT vs FMCSA assumptions stay accurate when any leg leaves Minnesota.',
      },
      MN_REG_BULLET,
    ],
  },
  zonesHeading: 'Olmsted County access zones',
  zonesIntro:
    'Plan by downtown Rochester vertical product, midtown multi-unit, northwest growth suburbs, southern and eastern approaches, and Byron–Stewartville edges.',
  zones: [
    {
      id: 'downtown-rochester-vertical',
      name: 'Downtown Rochester towers & Mayo-adjacent multi-unit',
      shortName: 'Downtown Rochester',
      neighborhoods: [
        'Downtown Rochester',
        'Mayo campus edges',
        'Peace Plaza edges',
        'Center Street corridors',
        '1st Avenue edges',
        'Discovery Square edges',
      ],
      housingTypes: 'High-rise condo, mid-rise multifamily, professional multi-unit',
      challenges: [
        'Elevator reservations and building COIs',
        'Clinic traffic and limited curb',
        'Hard report-date calendars',
      ],
      moverTips:
        'Book elevators and COIs early. Prefer mid-week early starts. Confirm clinic-adjacent staging rules.',
      cityKeywords: [
        'rochester',
        'downtown rochester',
      ],
    },
    {
      id: 'midtown-southeast',
      name: 'Midtown, southeast & central multi-unit belts',
      shortName: 'Midtown / SE',
      neighborhoods: [
        'Southeast Rochester',
        'Slatterly Park edges',
        'Kutzky Park edges',
        'Meadow Park edges',
        'Folwell edges',
        'Homestead edges',
      ],
      housingTypes: 'Walk-up multi-unit, older SFH, duplexes',
      challenges: [
        'Multi-flight stairs',
        'Tight residential curb',
        'Lease-end volume spikes',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts. Inventory basements carefully.',
      cityKeywords: [
        'rochester',
      ],
    },
    {
      id: 'northwest-growth',
      name: 'Northwest Rochester growth SFH & townhomes',
      shortName: 'NW growth',
      neighborhoods: [
        'Northwest Rochester',
        '55th Street corridors',
        'Cascade Lake edges',
        'Parkway edges',
        'Northern Hills edges',
        'West Circle edges',
      ],
      housingTypes: 'Growth SFH, townhomes, HOA multi-family',
      challenges: [
        'HOA timed windows',
        'US-52 freeflow at peak',
        'Longer empty miles vs downtown',
      ],
      moverTips:
        'Collect HOA packets early. Price US-52 honestly. Confirm cul-de-sac truck access.',
      cityKeywords: [
        'rochester',
      ],
    },
    {
      id: 'byron-stewartville',
      name: 'Byron, Stewartville & outer edges',
      shortName: 'Byron / Stewartville',
      neighborhoods: [
        'Byron',
        'Stewartville',
        'Eyota edges',
        'Chatfield edges',
        'Oronoco edges',
        'Pine Island edges',
      ],
      housingTypes: 'Suburban SFH, small-town multi-unit, rural-edge lots',
      challenges: [
        'Long empty miles',
        'Rural driveway approaches',
        'School-calendar peaks',
      ],
      moverTips:
        'Price empty miles honestly. Survey long driveways. Do not price outer edges like downtown elevators.',
      cityKeywords: [
        'byron',
        'stewartville',
        'eyota',
        'oronoco',
        'pine island',
      ],
    },
    {
      id: 'south-east-approaches',
      name: 'Southern & eastern Rochester approaches',
      shortName: 'S/E approaches',
      neighborhoods: [
        'Southern Rochester',
        'Eastern Rochester',
        'Marion edges',
        'Haverhill edges',
        'Rochester Township edges',
        'Kalmar edges',
      ],
      housingTypes: 'SFH, multi-family, township lots',
      challenges: [
        'US-14 / US-63 freeflow',
        'Mixed product',
        'Winter driveway ice',
      ],
      moverTips:
        'Clarify city vs township addresses. Price US-14 / US-63 pairs honestly. Plan winter ice contingency.',
      cityKeywords: [
        'rochester',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Olmsted County moving costs',
    intro:
      'Medical hard dates, elevator/COI admin, US-52 freeflow, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Elevator / COI downtown multi-unit',
        detail:
          'Mayo-adjacent towers add schedule risk before packing skill matters.',
      },
      {
        title: 'Hard report dates & storage-in-transit',
        detail:
          'Medical calendars create premium windows and temporary-housing logistics.',
      },
      {
        title: 'US-52 · US-14 · US-63 congestion & empty miles',
        detail:
          'Cross-zone and outer-edge pairs burn portal-to-portal hours.',
      },
      {
        title: 'High-value professional inventories',
        detail:
          'Dense electronics and careful packing standards raise labor hours.',
      },
      {
        title: 'Winter ice & weather contingency',
        detail:
          'December–March reshapes outdoor labor around inflexible clinic dates.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with elevators or peak clinic windows',
      },
      {
        label: '2–3BR condo or walk-up',
        value: '$1,300–$4,000+',
        note: 'Stairs and COI soft costs trend up',
      },
      {
        label: '3–4+ BR / medical executive / long pair',
        value: '$2,600–$8,000+',
        note: 'Hard dates and high-value stock price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$190+/hr',
        note: 'Portal-to-portal; packing and elevators scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Olmsted County move',
    intro:
      'Medical report dates, fellowship cycles, winter ice, and US-52 freeflow reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear downtown curb and ease clinic-adjacent congestion. Align with report-date flexibility when possible.',
      },
      {
        title: 'Medical peak: summer fellowship / residency transitions',
        detail:
          'June–August medical turnover fills fleets first. Book 2–4 weeks ahead for hard dates.',
      },
      {
        title: 'Winter: ice and weather cancellations',
        detail:
          'December–March favors flexible dates — but clinic starts often are not flexible; build contingency early.',
      },
      {
        title: 'Year-round mid-month employer spikes',
        detail:
          'Healthcare hiring often lands mid-month rather than only Saturday peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'mayo-medical-relo',
      title: 'Mayo Clinic medical relocation logistics module',
      intro:
        'Olmsted estimates fail more often on hard report dates, elevator packets, and storage-in-transit than on packing skill alone.',
      bullets: [
        'Capture hard report dates, temporary housing, and storage-in-transit needs before the survey is final.',
        'Collect building COI and elevator reservations for downtown multi-unit early.',
        'Price portal-to-portal time for US-52, US-14, and US-63 pairs at peak clinic traffic.',
        'Match high-value professional inventories to careful packing standards.',
        'Plan winter ice contingency around inflexible clinic start dates.',
        'Verify MnDOT household goods mover permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'not-twin-cities-clone',
      title: 'Rochester vs Twin Cities micro-market module',
      intro:
        'A single “Minnesota metro rate” collapses when Rochester medical product and Twin Cities multi-county logistics diverge.',
      bullets: [
        'Do not price Rochester downtown elevators like Minneapolis North Loop as interchangeable empty-mile markets.',
        'Ask which US-52 approaches the crew will actually use at load and unload.',
        'Match medical calendars separately from Twin Cities lease-end waves.',
        'Clarify Olmsted vs Twin Cities multi-county destinations on every estimate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Olmsted County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Rochester Public Schools covers most city addresses; surrounding communities operate separate systems. Assignment is address-based. Confirm enrollment windows early for mid-year medical relocations.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Minnesota Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Mayo Clinic campuses dominate specialty care; Olmsted Medical Center and regional clinics also serve the county. Confirm insurance networks and campus locations carefully.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — congestion changes “nearby” on paper. Transfer records early.',
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
              'Expect downtown multi-unit and professional housing near Mayo; midtown walk-ups; northwest growth SFH and townhomes; small-town SFH in Byron and Stewartville.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for HOA dues, older-building repair risk, and parking where relevant.',
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
            title: 'Downtown / Mayo-adjacent multi-unit',
            detail:
              'Suits people prioritizing short campus commutes — with elevator and curb tradeoffs on move day.',
          },
          {
            title: 'Northwest growth suburbs',
            detail:
              'Often appeals for newer SFH and schools — with HOA logistics and US-52 freeflow.',
          },
          {
            title: 'Midtown character multi-unit',
            detail:
              'Attracts renters seeking relative value — with stair logistics and lease-end competition.',
          },
          {
            title: 'Byron / Stewartville small-city options',
            detail:
              'Fits households seeking quieter edges — with empty-mile tradeoffs into Rochester.',
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
              'Mayo Clinic and healthcare systems dominate employment; professional services, education, and retail support the medical economy. Twin Cities reverse-commutes are less common than medical inflows.',
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
              'Olmsted is a medical-destination county — different from Twin Cities multi-county collars, Duluth port logistics, or St. Cloud regional patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Continental four-season climate with long cold winters and snow/ice. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Olmsted County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify MnDOT household goods mover permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Rochester — official site',
        href: 'https://www.rochestermn.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Olmsted County',
        href: 'https://www.olmstedcounty.gov/',
        external: true,
        note: 'County services & info',
      },
      {
        label: 'Rochester Public Schools',
        href: 'https://www.rochesterschools.org/',
        external: true,
        note: 'Boundaries & calendars (Rochester addresses)',
      },
      {
        label: '511mn — traffic conditions',
        href: 'https://511mn.org/',
        external: true,
        note: 'US-52 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with medical-relo and elevator/COI experience for downtown Rochester product; HOA readiness for northwest growth; honest US-52 · US-14 · US-63 timing. Verify MnDOT household goods mover permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
