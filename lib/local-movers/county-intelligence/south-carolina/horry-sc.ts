import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeScPack,
  SC_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/south-carolina/sc-shared';

/**
 * Horry County, SC — Grand Strand / coastal tourism core (not Charleston peninsula clone).
 * Myrtle Beach tourism peaks, seasonal demand, coastal traffic, HOA/vacation property.
 */
export const horryCountyScIntelligence: CountyIntelligencePack = finalizeScPack({
  countySlug: 'horry',
  hubTitle: 'Horry County Moving Intelligence Hub',
  eyebrow: 'Horry · Grand Strand SC · Myrtle Beach, Conway & coastal growth',
  h1: 'Moving in Horry County: Tourism Peaks, Coastal Traffic & Vacation-Property Logistics',
  heroOpener:
    'Horry County is Grand Strand logistics: Myrtle Beach oceanfront and resort corridors with elevator buildings and visitor traffic; master-planned HOA and golf communities from Carolina Forest to North Myrtle; Conway’s more inland street grid and university edge; and US-17 / SC-31 / US-501 spines that turn “across town” into peak-season crawl. A oceanfront condo, a North Myrtle vacation rental turnover, a Carolina Forest HOA two-story, and a Conway craftsman do not share truck access, gate rules, or calendar risk. Summer tourism demand competes with residential Saturday crews in ways Charleston’s peninsula COIs and Upstate plant shifts never do. This hub is for people moving in Horry County — not a renamed Charleston Lowcountry page or generic South Carolina template.',
  heroCredibility:
    'SC Class E (ORS/PSC) for intrastate moves · FMCSA for interstate · Grand Strand seasonal & HOA awareness · Curated listings',
  majorCorridors: 'US-17 · SC-31 (Carolina Bays) · SC-22 · US-501',
  whatMakesDifferent: {
    title: 'What makes moving in Horry County different',
    intro:
      'These are Horry Grand Strand realities — tourism calendars, coastal HOA density, and beach-corridor congestion — not peninsula historic-street rules or Midlands capital freeways.',
    bullets: [
      {
        title: 'Tourism peaks rewrite crew availability',
        detail:
          'Memorial Day through Labor Day, plus major bike weeks and holiday weeks, flood US-17 and resort corridors. Residential movers compete with short-term rental turnovers and visitor traffic for curb space and drive time.',
      },
      {
        title: 'Oceanfront and high-rise elevators are a specialty',
        detail:
          'Myrtle Beach and North Myrtle condo towers often require timed elevators, loading-dock rules, COI, and long vertical carries. That is a different job than an inland HOA ranch.',
      },
      {
        title: 'US-17, SC-31, US-501, and SC-9 turn short miles into billable time',
        detail:
          'Beach ↔ Conway, North Myrtle ↔ Carolina Forest, or any peak-Saturday coastal pair looks local and still burns 45–90+ minutes. Price portal-to-portal honestly — especially June–August.',
      },
      {
        title: 'HOA and vacation-property rules dominate growth tracts',
        detail:
          'Carolina Forest, Forestbrook, North Myrtle planned communities, and golf-edge product often need gate lists, truck limits, and approved hours. Short-term rental inventories add furniture sets and tight turn windows.',
      },
      {
        title: 'Hurricane season and coastal weather contingency',
        detail:
          'Tropical systems and heavy rain can freeze barrier approaches and outdoor staging. Summer estimates need flexible reschedule language and moisture protection for inventory.',
      },
      {
        title: 'Conway and inland Horry are not the beach strip',
        detail:
          'County seat street grids, Coastal Carolina University edges, and inland SFH behave more like a traditional Midlands suburb than oceanfront resort logistics — survey by zone.',
      },
      {
        title: 'Multi-county Strand and inland pairs are routine',
        detail:
          'Households move Horry ↔ Georgetown or inland toward Florence corridors. Clarify county lines so Class E vs FMCSA assumptions stay accurate when any leg leaves South Carolina (including NC Grand Strand destinations).',
      },
      SC_REG_BULLET,
    ],
  },
  zonesHeading: 'Horry County access zones',
  zonesIntro:
    'Plan by Myrtle Beach oceanfront/resort core, North Myrtle & SC-9 north strand, Carolina Forest/HOA growth, Conway/inland, and Garden City–Surfside south strand edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'myrtle-beach-oceanfront',
      name: 'Myrtle Beach oceanfront, resort corridor & central strand',
      shortName: 'Myrtle oceanfront',
      neighborhoods: [
        'Myrtle Beach oceanfront',
        'Central resort corridor',
        'Broadway / entertainment edges',
        'Market Common edges',
        'Withers Swash edges',
      ],
      housingTypes: 'High-rise condos, resort multifamily, some denser SFH inland of the strip',
      challenges: [
        'Elevator reservations, COI, and loading-dock rules',
        'Visitor traffic and limited curb staging',
        'US-17 peak congestion year-round, extreme in summer',
      ],
      moverTips:
        'Book elevator windows in writing. Prefer early mid-week starts outside holiday weeks. Confirm truck height and dock access before arrival.',
      cityKeywords: [
        'myrtle beach',
        'oceanfront',
        'market common',
        'broadway at the beach',
        'withers',
      ],
    },
    {
      id: 'north-myrtle-sc9',
      name: 'North Myrtle Beach, Little River & SC-9 north strand',
      shortName: 'North Myrtle / SC-9',
      neighborhoods: [
        'North Myrtle Beach',
        'Cherry Grove',
        'Ocean Drive',
        'Little River',
        'Barefoot / golf-edge communities',
      ],
      housingTypes: 'Condos, vacation SFH, golf-community HOA product, marina-edge stock',
      challenges: [
        'SC-9 and US-17 seasonal congestion',
        'Short-term rental turnovers with hard unit deadlines',
        'Gate and HOA truck limits on planned communities',
      ],
      moverTips:
        'Collect HOA and rental-management rules early. Inventory full furniture sets for vacation product. Build SC-9 / US-17 buffers in peak season.',
      cityKeywords: [
        'north myrtle beach',
        'cherry grove',
        'ocean drive',
        'little river',
        'barefoot',
      ],
    },
    {
      id: 'carolina-forest-hoa',
      name: 'Carolina Forest, Forestbrook & inland HOA growth',
      shortName: 'Carolina Forest / HOA',
      neighborhoods: [
        'Carolina Forest',
        'Forestbrook',
        'River Oaks edges',
        'International Drive corridors',
        'West of US-17 growth tracts',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, family inventories',
      challenges: [
        'HOA gate lists, COI, and approved hours',
        'High Saturday family demand May–August',
        'SC-31 / connector timing to beach jobs',
      ],
      moverTips:
        'Send HOA packets with the estimate. Book peak Saturdays 2–4 weeks ahead. Price beach-linked pairs with Carolina Bays (SC-31) realism.',
      cityKeywords: [
        'carolina forest',
        'forestbrook',
        'river oaks',
        'international drive',
      ],
    },
    {
      id: 'conway-inland',
      name: 'Conway, Coastal Carolina edges & inland Horry',
      shortName: 'Conway / Inland',
      neighborhoods: [
        'Conway',
        'Coastal Carolina University edges',
        'Red Hill',
        'Aynor edges',
        'US-501 corridors',
      ],
      housingTypes: 'Traditional SFH, student multifamily, older downtown stock, rural-edge lots',
      challenges: [
        'US-501 peak tourism and event traffic toward the beach',
        'Campus move-in/out waves',
        'Longer empty miles to oceanfront towers',
      ],
      moverTips:
        'Prefer early starts for any beach-bound pair. Survey older downtown Conway access separately from campus multifamily elevators. Clarify rural driveway photos inland.',
      cityKeywords: [
        'conway',
        'coastal carolina',
        'red hill',
        'aynor',
        'us-501',
      ],
    },
    {
      id: 'south-strand',
      name: 'Surfside Beach, Garden City & south strand edges',
      shortName: 'South strand',
      neighborhoods: [
        'Surfside Beach',
        'Garden City Beach',
        'Murrells Inlet edges (Horry pockets)',
        'South Kings Highway corridors',
      ],
      housingTypes: 'Coastal SFH, low- and mid-rise condos, vacation rentals',
      challenges: [
        'Seasonal visitor parking and curb competition',
        'Elevated homes and outdoor inventory near the marsh/beach',
        'US-17 south-strand congestion on summer weekends',
      ],
      moverTips:
        'Confirm parking and HOA rules for condos. Inventory outdoor and garage flood-zone gear carefully. Avoid summer Saturday noon windows when flexible.',
      cityKeywords: [
        'surfside beach',
        'garden city',
        'murrells inlet',
        'south kings highway',
      ],
    },
    {
      id: 'socastee-hwy707',
      name: 'Socastee, Highway 707 & mid-strand connectors',
      shortName: 'Socastee / 707',
      neighborhoods: [
        'Socastee',
        'Highway 707 corridor',
        'Mid-strand commercial and residential mix',
      ],
      housingTypes: 'Modest SFH, multifamily, contractor-heavy rentals, some newer tracts',
      challenges: [
        'Connector congestion between beach and inland jobs',
        'Mix of short-notice and seasonal workforce moves',
        'Inconsistent HOA vs non-HOA access on adjacent streets',
      ],
      moverTips:
        'Clarify gate vs open-road access address by address. Build buffer for US-17 / connector spillover. Ask about hard lease or rental-turn times.',
      cityKeywords: ['socastee', 'highway 707', 'mid strand', '707'],
    },
  ],
  costDrivers: {
    title: 'What drives Horry County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Elevator COI friction, peak-season portal time, and HOA/vacation soft costs separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Oceanfront elevators, docks & COI rules',
        detail: 'High-rise access and timed windows add labor and soft-cost delay before packing skill matters.',
      },
      {
        title: 'US-17 / SC-31 / US-501 / SC-9 congestion',
        detail: 'Peak tourism turns cross-zone pairs into multi-hour portal-to-portal jobs.',
      },
      {
        title: 'HOA and vacation-rental governance',
        detail: 'Gate lists, truck limits, and hard unit turn times push demand into peak pricing.',
      },
      {
        title: 'Seasonal crew competition',
        detail: 'Summer residential demand collides with rental turnovers and visitor traffic.',
      },
      {
        title: 'Coastal weather and storm contingency',
        detail: 'Humidity, rain, and tropical systems raise materials, risk, and reschedule cost.',
      },
      {
        title: 'Beach ↔ inland empty miles',
        detail: 'Conway and outer Horry destinations raise staging distance from strand-based crews.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple inland access)', value: '$400–$1,300+', note: 'Higher with tower elevators or peak US-17' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,600+', note: 'HOA and elevator soft costs trend up' },
      { label: '3–4+ BR / oceanfront / peak season', value: '$2,300–$7,000+', note: 'High-rise and summer Saturday pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$175+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Horry County move',
    intro: 'Tourism peaks, school calendars, hurricane season, and HOA windows reshape access and crew availability more than most SC inland counties.',
    items: [
      {
        title: 'Best windows: mid-week early mornings, shoulder seasons',
        detail:
          'Tuesday–Thursday starts outside June–early August clear curb space and reduce US-17 pain. Spring and fall often beat peak summer for oceanfront towers.',
      },
      {
        title: 'Peak tourism and family season: late May–mid-August',
        detail:
          'Residential SFH Saturdays and rental turnovers fill crews first. Book 2–4+ weeks ahead for peak weekends and holiday weeks.',
      },
      {
        title: 'Bike weeks, holidays, and major events',
        detail:
          'Major visitor events shrink legal staging and inflate drive times. Confirm local calendars before locking a strand load window.',
      },
      {
        title: 'Hurricane season contingency (roughly June–November)',
        detail:
          'Tropical systems can freeze coastal approaches. Build flexible reschedule language into peak-season contracts.',
      },
      {
        title: 'Campus and inland school calendars',
        detail:
          'Coastal Carolina and K–12 calendars create Conway-area waves that still compete with beach crews for trucks.',
      },
    ],
  },
  specialized: [
    {
      id: 'grand-strand-seasonal',
      title: 'Grand Strand tourism, high-rise & HOA module',
      intro:
        'Horry estimates fail more often on elevator windows, peak-season portal time, and vacation-property rules than on packing skill alone.',
      bullets: [
        'Reserve elevator and dock windows in writing for oceanfront and mid-rise condos.',
        'Price portal-to-portal time for any pair that rides US-17, SC-31, US-501, or SC-9 in peak season.',
        'Collect HOA gate lists, COI, and truck limits for Carolina Forest and golf-community product.',
        'Inventory short-term rental furniture sets and outdoor gear as full rooms, not leftovers.',
        'Plan humidity and tropical-weather contingency for open-air staging.',
        'Clarify Horry vs Georgetown / NC Strand addresses on every estimate.',
        'Verify SC Class E (ORS) for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'vacation-property-turns',
      title: 'Vacation rental & seasonal-property turn module',
      intro: 'Unit-ready deadlines and full furniture packages change labor planning.',
      bullets: [
        'Confirm hard checkout/check-in times with property managers before finalizing crew start.',
        'Photograph existing damage and inventory completeness on rental turns.',
        'Separate owner-primary moves from investor turnover jobs in the estimate notes.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Horry County?',
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
              'Horry County Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Carolina Forest or North Myrtle do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Inland growth corridors can see enrollment pressure as year-round population rises. Ask the district about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, South Carolina Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Grand Strand–area hospitals and regional facilities serve Myrtle Beach, Conway, and corridor communities. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from beach communities to preferred campuses — US-17 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Oceanfront product vs inland HOA tracts',
            detail:
              'Expect condos and vacation-oriented stock on the strand; larger HOA family tracts dominate Carolina Forest and many inland growth areas; Conway mixes traditional SFH with campus multifamily.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by ocean proximity, HOA amenities, and whether a unit is primary residence vs investment. Budget for insurance, flood considerations, and HOA dues.',
          },
          {
            title: 'HOA and condo governance',
            detail:
              'Planned communities and condo associations often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Horry areas fit whom',
        bullets: [
          {
            title: 'Myrtle Beach / oceanfront lifestyle',
            detail:
              'Suits people prioritizing beach access and resort amenities — with elevator logistics, visitor traffic, and seasonal noise tradeoffs.',
          },
          {
            title: 'Carolina Forest / inland HOA suburbs',
            detail:
              'Often appeals for newer family homes and space — with gate rules and strand-commute realism in peak season.',
          },
          {
            title: 'Conway / inland year-round pace',
            detail:
              'Attracts households seeking a more traditional town grid and university-adjacent energy — with US-501 timing to beach jobs.',
          },
          {
            title: 'North Myrtle / south strand coastal living',
            detail:
              'Fits vacation-oriented or quieter strand preferences — with seasonal traffic and HOA/condo rules varying block by block.',
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
              'Tourism and hospitality, healthcare, retail, construction, education (including Coastal Carolina), and growing year-round services concentrate along the strand and Conway corridors.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. US-17, SC-31, US-501, and SC-9 peaks — especially summer weekends — are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Horrys',
            detail:
              'Horry stacks resort oceanfront, golf-HOA suburbs, south-strand villages, and inland Conway — different from Charleston’s historic peninsula or Columbia’s capital-city fabric.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, mild winters, and tropical-season awareness. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Seasonal population swings',
            detail:
              'Visitor peaks change traffic, restaurant wait times, and curb competition. Visit in both peak and off-peak seasons when deciding on year-round fit.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Horry County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify SC Class E / ORS for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Horry County — official site',
        href: 'https://www.horrycountysc.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Myrtle Beach',
        href: 'https://www.cityofmyrtlebeach.com/',
        external: true,
      },
      {
        label: 'City of North Myrtle Beach',
        href: 'https://www.nmb.us/',
        external: true,
      },
      {
        label: 'City of Conway',
        href: 'https://www.cityofconway.com/',
        external: true,
      },
      {
        label: 'Horry County Schools',
        href: 'https://www.horrycountyschools.net/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'SCDOT 511 traffic',
        href: 'https://www.511sc.org/',
        external: true,
        note: 'US-17 / SC-31 / US-501 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with high-rise elevator and COI experience for oceanfront stock; HOA fluency for Carolina Forest and golf communities; honest peak-season US-17 / SC-31 timing for beach–inland pairs. Verify SC Class E (ORS) for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
