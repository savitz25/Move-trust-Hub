import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * DuPage County, IL — west-collar corporate & HOA belt (not Cook city clone, not Lake North Shore).
 * Naperville/Wheaton/Oak Brook HOA + corporate relo, I-88/I-355 logistics.
 */
export const duPageCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'dupage',
  hubTitle: 'DuPage County Moving Intelligence Hub',
  eyebrow: 'DuPage · western collar · Naperville, Wheaton, Oak Brook & I-88 corridor',
  h1: 'Moving in DuPage County: Naperville HOAs, Oak Brook Corporate & I-88 Logistics',
  heroOpener:
    'DuPage County is the western collar’s corporate and family engine: master-planned Naperville tracts, Wheaton and Glen Ellyn established grids, Oak Brook and Downers Grove commercial edges, and I-88 / I-355 corridors that pull executive and tech relocations through the same roads movers use. A Naperville HOA gate packet, an Oak Brook condo elevator window, a Wheaton craftsman with tight curb, and a mid-week corporate hard date do not share truck access or crew skill. I-88, I-355, I-294 links, IL-59, and Roosevelt Road rewrite “local” estimates that ignore HOA COIs, cul-de-sac geometry, and peak tollway portal time. This hub is for people moving in DuPage County — not a renamed Chicago street-permit page or generic Illinois template.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods license for intrastate moves · FMCSA for interstate · DuPage HOA, corporate relo & I-88 corridor awareness · Curated listings',
  majorCorridors: 'I-88 · I-355 · I-294 links · IL-59 · Roosevelt Road corridors',
  whatMakesDifferent: {
    title: 'What makes moving in DuPage County different',
    intro:
      'These are DuPage west-collar realities — Naperville-scale HOA villages, Oak Brook corporate calendars, and I-88/I-355 congestion — not Chicago elevator micro-markets or Lake County North Shore estate patterns.',
    bullets: [
      {
        title: 'Master-planned HOA product dominates growth fabric',
        detail:
          'Naperville, Aurora edges inside DuPage, and many Lisle–Bolingbrook-border tracts require gate lists, truck-length limits, approved hours, and COI naming. Collect packets early or lose the load window.',
      },
      {
        title: 'Corporate and professional relocation calendars shape demand',
        detail:
          'Oak Brook, Downers Grove, and I-88 office corridors create mid-week peaks, hard report dates, and executive inventories that compete with Saturday family demand for crews.',
      },
      {
        title: 'I-88 and I-355 turn short map miles into billable hours',
        detail:
          'Naperville ↔ Elmhurst, Wheaton ↔ Oak Brook, or Lisle ↔ Hinsdale pairs look local and still burn 40–75+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Established village grids still need stair and curb surveys',
        detail:
          'Wheaton, Glen Ellyn, Elmhurst, and Hinsdale stock includes basements, mature trees, and limited truck length — not only new-construction HOA checklists.',
      },
      {
        title: 'IL-59 and Roosevelt Road retail corridors reshape timing',
        detail:
          'Commercial strip congestion and signal density add empty minutes that suburban quotes often underprice, especially for IL-59 north–south pairs at rush hour.',
      },
      {
        title: 'Cross-county collar pairs are routine',
        detail:
          'Households regularly move DuPage ↔ Cook, Kane, Will, or Kendall edges. Clarify county lines so ICC intrastate vs FMCSA interstate assumptions stay accurate when any leg leaves Illinois.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'DuPage County access zones',
  zonesIntro:
    'Plan by Naperville growth tracts, Wheaton–Glen Ellyn village cores, Oak Brook–Hinsdale–Elmhurst east DuPage, Lisle–Downers–I-88 commercial edges, and west DuPage IL-59 corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'naperville-core-growth',
      name: 'Naperville core, 95th Street corridors & south/west growth',
      shortName: 'Naperville',
      neighborhoods: [
        'Downtown Naperville edges',
        'South Naperville growth',
        '95th Street corridor',
        'Neuqua / Waubonsie edges',
        'Naperville–Aurora DuPage edges',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, larger family inventories',
      challenges: [
        'HOA gate lists, truck limits, and approved hours',
        'I-88 / IL-59 peak congestion',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Book peak Saturdays early. Share gate codes and driveway photos with the estimate.',
      cityKeywords: ['naperville', '95th', 'neuqua', 'waubonsie'],
    },
    {
      id: 'wheaton-glen-ellyn',
      name: 'Wheaton, Glen Ellyn & central village grids',
      shortName: 'Wheaton / Glen Ellyn',
      neighborhoods: [
        'Wheaton',
        'Glen Ellyn',
        'Lombard edges',
        'Carol Stream edges',
        'Glendale Heights edges',
      ],
      housingTypes: 'Established SFH, basements, some townhomes and multifamily',
      challenges: [
        'Tree-lined curb with limited truck length',
        'Basement carries and older driveway geometry',
        'Roosevelt Road and I-355 approach timing',
      ],
      moverTips:
        'Survey stairs and driveway turn radius. Prefer early starts for any Oak Brook- or Naperville-linked pair. Inventory basement items carefully.',
      cityKeywords: [
        'wheaton',
        'glen ellyn',
        'lombard',
        'carol stream',
        'glendale heights',
      ],
    },
    {
      id: 'oak-brook-hinsdale-elmhurst',
      name: 'Oak Brook, Hinsdale, Elmhurst & east DuPage',
      shortName: 'East DuPage',
      neighborhoods: [
        'Oak Brook',
        'Hinsdale',
        'Elmhurst',
        'Oakbrook Terrace',
        'Villa Park edges',
      ],
      housingTypes: 'Higher-value SFH, condo, corporate-adjacent multifamily',
      challenges: [
        'I-294 / I-88 / I-290 link congestion',
        'Condo elevator and association rules',
        'High-value packing expectations',
      ],
      moverTips:
        'Confirm elevator/COI rules in writing. Price I-294 and I-88 portal time. Prefer experienced high-value crews for estate inventories.',
      cityKeywords: [
        'oak brook',
        'hinsdale',
        'elmhurst',
        'oakbrook terrace',
        'villa park',
      ],
    },
    {
      id: 'lisle-downers-i88',
      name: 'Lisle, Downers Grove & I-88 commercial edges',
      shortName: 'Lisle / Downers',
      neighborhoods: [
        'Lisle',
        'Downers Grove',
        'Woodridge',
        'Darien edges',
        'I-88 residential pockets',
      ],
      housingTypes: 'SFH, townhomes, office-corridor multifamily, HOA tracts',
      challenges: [
        'I-88 reverse-commute and freight peaks',
        'Mixed HOA and older-grid product on short distances',
        'Corporate hard dates mid-week',
      ],
      moverTips:
        'Ask about report-to-work dates. Build I-88 buffers for Naperville- or Oak Brook-linked pairs. Clarify association rules early.',
      cityKeywords: ['lisle', 'downers grove', 'woodridge', 'darien'],
    },
    {
      id: 'west-il59-corridor',
      name: 'West DuPage & IL-59 corridor (Warrenville, West Chicago edges)',
      shortName: 'West DuPage / IL-59',
      neighborhoods: [
        'Warrenville',
        'West Chicago',
        'Winfield',
        'IL-59 commercial residential edges',
        'Fermilab-adjacent pockets',
      ],
      housingTypes: 'HOA SFH, modest older stock, some rural-lot edges',
      challenges: [
        'IL-59 signal density and retail congestion',
        'Longer empty miles from east-county staging',
        'I-88 interchanges at peak',
      ],
      moverTips:
        'Price IL-59 and I-88 pairs honestly. Share driveway and gate photos. Clarify Kane vs DuPage address lines on border parcels.',
      cityKeywords: ['warrenville', 'west chicago', 'winfield', 'il-59'],
    },
  ],
  costDrivers: {
    title: 'What drives DuPage County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, corporate calendars, and I-88/I-355 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA gate lists, truck limits & approved hours',
        detail:
          'Naperville-scale planned communities add admin and schedule risk before packing skill matters.',
      },
      {
        title: 'I-88 / I-355 / I-294 link congestion',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Corporate hard dates & executive inventories',
        detail:
          'Oak Brook and I-88 office calendars create mid-week competition and higher packing complexity.',
      },
      {
        title: 'Basements, cul-de-sacs & village curb limits',
        detail:
          'Established Wheaton–Elmhurst stock and dead-end geometry add labor that flat quotes miss.',
      },
      {
        title: 'Cross-county collar empty miles',
        detail:
          'Cook, Kane, Will, and Kendall destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,400+',
        note: 'Higher with HOA friction or peak I-88 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$3,800+',
        note: 'HOA and basement soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,400–$7,500+',
        note: 'Naperville SFH and long I-88 / I-355 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$190+/hr',
        note: 'Portal-to-portal; packing and HOA admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a DuPage County move',
    intro:
      'School calendars, corporate relocation cycles, heat/humidity, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear cul-de-sacs and reduce I-88 / I-355 / IL-59 pain. Avoid month-end Fridays when leases and HOA windows collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Naperville and central-village SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends and HOA-approved slots.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans for open-path loads.',
      },
      {
        title: 'Corporate relocation clusters',
        detail:
          'I-88 office and Oak Brook calendars create mid-week spikes. Confirm report dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'dupage-hoa-corporate',
      title: 'DuPage HOA & corporate relocation logistics module',
      intro:
        'DuPage estimates fail more often on HOA packets, corporate hard dates, and I-88/I-355 portal time than on packing skill alone.',
      bullets: [
        'Collect HOA COI, gate lists, truck-length limits, and approved hours before the survey is final.',
        'Ask about hard report-to-work dates and storage-in-transit for corporate transfers.',
        'Price portal-to-portal time for any pair that rides I-88, I-355, I-294 links, IL-59, or Roosevelt Road at peak.',
        'Photo driveway length, cul-de-sac turn radius, and basement access for village SFH stock.',
        'Clarify DuPage vs Cook / Kane / Will addresses on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to DuPage County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures town fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'DuPage is served by multiple elementary and high-school districts (not one countywide K–12 system). Naperville, Wheaton, Elmhurst, and other municipalities each have their own assignment maps — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'South and west growth tracts can see enrollment pressure. Ask the specific district about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone.',
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
              'Edward-Elmhurst, Northwestern Medicine campuses, Advocate sites, and other regional facilities serve DuPage corridors. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Naperville or Carol Stream to preferred campuses — I-88 and I-355 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'HOA growth tracts vs established villages',
            detail:
              'Expect larger planned SFH in Naperville and west growth; older grids and higher-value pockets in Hinsdale, Elmhurst, and Wheaton; condo and multifamily near commercial edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor. Budget for HOA dues, property taxes, older-home repair risk, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and associations often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which DuPage areas fit whom',
        bullets: [
          {
            title: 'Naperville family and amenity lifestyle',
            detail:
              'Suits households prioritizing newer housing, parks, and downtown amenities — with HOA logistics and IL-59/I-88 peaks.',
          },
          {
            title: 'Wheaton–Glen Ellyn village character',
            detail:
              'Often appeals for established neighborhoods and train access — with basement carries and tighter curb.',
          },
          {
            title: 'Oak Brook–Hinsdale–Elmhurst east corridor',
            detail:
              'Attracts professional and higher-value inventories — with I-294 links and association rules on denser product.',
          },
          {
            title: 'Lisle–Downers I-88 corporate edge',
            detail:
              'Fits dual-career households near office corridors — with mid-week move pressure and tollway timing.',
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
              'Corporate campuses along I-88, healthcare systems, tech and professional services, retail hubs, and reverse-commute jobs from Chicago concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent outside Metra nodes. I-88, I-355, I-294 links, IL-59, and Roosevelt Road peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple DuPages',
            detail:
              'DuPage stacks master-planned family suburbs, classic village downtowns, corporate commercial edges, and higher-value east-county pockets — different from Chicago’s street-permit micro-markets or Will’s warehouse growth belt.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, cold winters with snow/ice, and frequent storms. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Family sports, school calendars, and retail corridors dominate daily life; dining and events cluster in Naperville, downtown villages, and Oak Brook edges. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful DuPage County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'DuPage County — official site',
        href: 'https://www.dupagecounty.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Naperville',
        href: 'https://www.naperville.il.us/',
        external: true,
      },
      {
        label: 'City of Wheaton',
        href: 'https://www.wheaton.il.us/',
        external: true,
      },
      {
        label: 'IDOT / Illinois traffic & road conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-88 / I-355 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA packet fluency for Naperville and planned tracts; corporate relo experience for Oak Brook / I-88 hard dates; honest I-88 · I-355 · IL-59 timing for cross-zone pairs. Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
