import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Palm Beach County, Florida moving intelligence.
 * Differentiators: higher-cost coastal, HOA/gated density, seasonal demand,
 * long north–south spread — not Broward condo-corridor or Miami tower boilerplate.
 */
export const palmBeachCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'palm-beach',
  hubTitle: 'Palm Beach County Moving Intelligence Hub',
  eyebrow: 'Palm Beach · Coastal premium & north–south spread',
  h1: 'Moving in Palm Beach County: Coastal Estates, HOAs & North–South Zone Guide',
  heroOpener:
    'Palm Beach County stretches from Boca Raton and Delray through West Palm Beach to Jupiter and the western ag-edge communities — a long north–south market that punishes “one local rate” thinking. Coastal and barrier addresses bring condo COI rules, gated estates, and careful-handling expectations; inland corridors from Boynton and Lake Worth through Wellington and Royal Palm Beach flip to HOA villages, equestrian edges, and Turnpike / I-95 portal time. Seasonal residents compress demand in winter; hurricane season rewrites contingency on the coast. This hub is for people actually moving in Palm Beach County — not generic South Florida tips recycled from Fort Lauderdale or Miami.',
  heroCredibility:
    'FDACS Ch. 507 for intrastate Florida moves · FMCSA for interstate legs · Seasonal & HOA/gated awareness · Curated directory listings',
  majorCorridors: 'I-95 · Florida Turnpike · US-1 · PGA Boulevard · Glades Road corridors',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Palm Beach County different',
    intro:
      'These are Palm Beach realities — premium coastal product, gated communities, and long-county drive times — not interchangeable tri-county boilerplate.',
    bullets: [
      {
        title: 'Higher-cost coastal and island product raises handling expectations',
        detail:
          'Palm Beach, Boca oceanfront, Delray, and Jupiter-area waterfront inventories often include higher-value furniture, art, and multi-story homes. Cheap released-value coverage is frequently inadequate — discuss valuation early.',
      },
      {
        title: 'HOA and gated communities are dense inland and on many coastal edges',
        detail:
          'Certificates of insurance, gate lists, approved hours, and truck length limits are common from Boca planned villages through Wellington and northern HOA corridors. Collect management packets before move day.',
      },
      {
        title: 'North–south spread makes “local” a distance problem',
        detail:
          'Boca ↔ Jupiter or coastal ↔ western pairs are long locals on I-95, the Turnpike, PGA, Glades, and Southern corridors. Portal-to-portal time must be priced honestly — map miles understate peak friction.',
      },
      {
        title: 'Seasonal residents reshape demand and building access',
        detail:
          'Winter and early spring raise condo turnovers, estate openings, and crew scarcity along the coast. Summer can open calendar space but adds heat and storm risk.',
      },
      {
        title: 'Barrier islands and Intracoastal bridges constrain trucks',
        detail:
          'Palm Beach island, Singer Island approaches, and similar Intracoastal crossings add bridge timing, narrow staging, and association rules that mainland SFH jobs never see.',
      },
      {
        title: 'Equestrian and large-lot western edges need access photos',
        detail:
          'Wellington and related western pockets can mean long drives, gate codes, barn-adjacent inventories, and soft surfaces after rain — survey access, not just square footage.',
      },
      {
        title: 'Cross-county pairs with Broward are routine',
        detail:
          'Households often move Palm Beach ↔ Broward. Keep FDACS Ch. 507 frameworks in mind for in-state-only work; FMCSA authority applies when any leg leaves Florida.',
      },
      {
        title: 'Intrastate Florida rules vs interstate authority',
        detail:
          'Moves entirely within Florida are generally subject to Florida Statutes Chapter 507 household-mover frameworks administered by FDACS. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Palm Beach County access zones',
  zonesIntro:
    'Plan by southern coastal belt, central urban core, northern corridor, and western inland communities — distance and HOA rules vary as much as housing type.',
  zones: [
    {
      id: 'south-coastal',
      name: 'South coastal: Boca Raton, Delray & Boynton coast',
      shortName: 'South Coastal',
      neighborhoods: [
        'Boca Raton',
        'Delray Beach',
        'Gulf Stream',
        'Ocean Ridge',
        'Boynton Beach coastal',
        'Highland Beach',
      ],
      housingTypes:
        'Coastal condos and mid-rises, gated SFH communities, downtown multi-story, higher-value waterfront and near-coast product',
      challenges: [
        'Elevator/COI and association move windows',
        'I-95 / Federal Highway congestion',
        'Gated entry and truck length limits',
        'Seasonal demand spikes in winter',
      ],
      moverTips:
        'Get HOA and condo packets early for Boca and Delray product. Prefer mid-week morning elevator windows. Price careful-handling and valuation for premium inventories explicitly.',
      cityKeywords: [
        'boca raton',
        'delray',
        'boynton beach',
        'gulf stream',
        'highland beach',
        'ocean ridge',
      ],
    },
    {
      id: 'west-palm-core',
      name: 'West Palm Beach core & near-inland',
      shortName: 'West Palm Core',
      neighborhoods: [
        'Downtown West Palm Beach',
        'Northwood',
        'Flamingo Park',
        'El Cid',
        'CityPlace / downtown corridors',
        'Riviera Beach edge',
      ],
      housingTypes:
        'Urban mid-rises and condos, historic SFH grids, multi-family, mixed older and redevelopment stock',
      challenges: [
        'Downtown staging and event traffic',
        'Elevator rules in newer towers',
        'Older stairs and tight street parking',
        'Bridge timing toward Palm Beach island',
      ],
      moverTips:
        'Clarify island vs mainland addresses. Reserve elevators for downtown towers. Mid-week mornings reduce downtown curb fights. Share street-width photos for historic grids.',
      cityKeywords: [
        'west palm beach',
        'northwood',
        'riviera beach',
        'flamingo park',
      ],
    },
    {
      id: 'palm-beach-island',
      name: 'Palm Beach island & barrier approaches',
      shortName: 'Palm Beach Island',
      neighborhoods: [
        'Town of Palm Beach',
        'Singer Island / Palm Beach Shores approaches',
        'Intracoastal waterfront pockets',
      ],
      housingTypes:
        'Estate homes, luxury condos, multi-story waterfront, highly managed associations and town rules',
      challenges: [
        'Bridge access and truck restrictions',
        'Strict association and municipal staging rules',
        'High-value contents and careful-handling norms',
        'Limited legal staging on narrow island streets',
      ],
      moverTips:
        'Confirm truck permits, bridge approaches, and association rules in writing. Budget shuttle or smaller trucks when full trailers cannot stage. Discuss full-value protection early.',
      cityKeywords: [
        'palm beach',
        'singer island',
        'palm beach shores',
        'manalapan',
      ],
    },
    {
      id: 'central-inland',
      name: 'Central inland: Lake Worth, Greenacres, Palm Springs & Wellington edge',
      shortName: 'Central Inland',
      neighborhoods: [
        'Lake Worth Beach',
        'Greenacres',
        'Palm Springs',
        'Lake Clarke Shores',
        'Wellington approaches',
        'Royal Palm Beach edge',
      ],
      housingTypes:
        'Suburban SFH, townhomes, HOA communities, multi-family corridors, mix of mid-century and newer tracts',
      challenges: [
        'HOA gate lists and approved hours',
        'Southern / Forest Hill / Jog arterial peaks',
        'Long carries in large planned communities',
        'Heat and afternoon storms in summer',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Start early in summer. Price Lake Worth ↔ Boca or Wellington pairs with honest portal-to-portal assumptions.',
      cityKeywords: [
        'lake worth',
        'greenacres',
        'palm springs',
        'wellington',
        'royal palm beach',
        'lake clarke',
      ],
    },
    {
      id: 'north-corridor',
      name: 'North corridor: Palm Beach Gardens, Jupiter & Tequesta',
      shortName: 'North Corridor',
      neighborhoods: [
        'Palm Beach Gardens',
        'Jupiter',
        'Tequesta',
        'Juno Beach',
        'North Palm Beach',
        'Abacoa / Gardens edges',
      ],
      housingTypes:
        'Gated SFH communities, coastal condos, townhomes, golf-course villages, some mid-rise product',
      challenges: [
        'PGA / Indiantown / US-1 congestion',
        'HOA and gated access rules',
        'Long empty-mile time from southern staging',
        'Seasonal and weekend coastal traffic',
      ],
      moverTips:
        'Confirm gate codes and COI holders for Gardens and Jupiter villages. Do not treat Boca ↔ Jupiter as a quick local. Prefer mid-week mornings near PGA corridor retail peaks.',
      cityKeywords: [
        'palm beach gardens',
        'jupiter',
        'tequesta',
        'juno beach',
        'north palm beach',
        'abacoa',
      ],
    },
    {
      id: 'western-ag-edge',
      name: 'Western edge: Loxahatchee, The Acreage & ag-adjacent',
      shortName: 'Western Edge',
      neighborhoods: [
        'Loxahatchee',
        'The Acreage',
        'Loxahatchee Groves',
        'Western Wellington edges',
        'Belle Glade / Pahokee approaches (far west)',
      ],
      housingTypes:
        'Larger-lot SFH, equestrian and rural-edge properties, agricultural-adjacent parcels, fewer high-rises',
      challenges: [
        'Long driveways and soft or narrow final approaches',
        'Gate and property-access complexity',
        'Distance from coastal crew staging',
        'Weather-sensitive unpaved or soft surfaces after rain',
      ],
      moverTips:
        'Share driveway, gate, and turnaround photos. Ask about shuttle from hard surface if trucks cannot reach the door. Confirm whether far-west pairs still use a pure local rate card.',
      cityKeywords: [
        'loxahatchee',
        'acreage',
        'loxahatchee groves',
        'belle glade',
        'pahokee',
        'south bay',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Palm Beach County moving costs',
    intro:
      'Ranges are market context for local / regional moves — not quotes. Premium coastal handling and north–south portal time separate lowball estimates from real costs.',
    drivers: [
      {
        title: 'Gated / HOA soft costs and truck limits',
        detail:
          'COI, gate lists, approved hours, and community truck restrictions add admin time and can force weekday-only crews.',
      },
      {
        title: 'Premium inventory careful-handling',
        detail:
          'Coastal estates and higher-value condos raise packing, padding, and valuation expectations — labor minutes per item climb.',
      },
      {
        title: 'North–south and coastal–inland distance',
        detail:
          'Boca ↔ Jupiter or island ↔ western pairs burn portal-to-portal hours on I-95 and the Turnpike at peak.',
      },
      {
        title: 'Barrier / Intracoastal shuttles',
        detail:
          'When full trailers cannot stage on island or waterfront streets, shuttle or long-carry strategies add crew hours.',
      },
      {
        title: 'Seasonal demand premiums',
        detail:
          'Winter snowbird and seasonal openings tighten Saturday capacity along the coast; last-minute crews price scarcity.',
      },
      {
        title: 'Western large-lot access',
        detail:
          'Long carries, soft approaches, and barn-adjacent inventories on western edges add time not visible in Zillow square footage.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$1,550+',
        note: 'Higher with elevators, gates, or seasonal peaks',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,900–$5,000+',
        note: 'HOA soft costs and careful-handling trend up',
      },
      {
        label: '3–4+ BR / estate / long north–south pair',
        value: '$3,400–$10,500+',
        note: 'Island estates and Boca↔Jupiter pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$135–$220+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Palm Beach County move',
    intro:
      'Seasonal occupancy, school calendars, and hurricane risk all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday starts before 9 a.m. usually clear gates and docks and reduce I-95 / PGA pain. Avoid month-end Fridays when possible.',
      },
      {
        title: 'Seasonal peak: roughly November–April',
        detail:
          'Snowbird arrivals, condo turnovers, and estate openings raise coastal demand. Book elevators and premium crews earlier in peak months.',
      },
      {
        title: 'Shoulder seasons: late spring and fall',
        detail:
          'Often better availability for coastal and gated jobs — still confirm association blackout dates and event calendars.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Coastal and island closings may need flexible date language. Confirm weather reschedule policies in writing.',
      },
      {
        title: 'Summer heat inland',
        detail:
          'Western and central suburban streets get hot early. Prefer dawn starts; plan hydration and moisture protection for afternoon storms.',
      },
    ],
  },
  specialized: [
    {
      id: 'gated-hoa-premium',
      title: 'Gated community, HOA & premium inventory module',
      intro:
        'Palm Beach County’s volume of managed communities and higher-value contents fails day-labor quotes that skip packets and valuation.',
      bullets: [
        'Collect COI, gate lists, approved hours, and truck limits before the survey is final.',
        'Discuss full-value protection and inventory detail for coastal and estate product early.',
        'Reconfirm gate codes and security desk contacts the day before arrival.',
        'Budget extra labor for long driveway carries inside large planned villages.',
        'Ask whether weekend moves are banned — many associations force weekday windows.',
      ],
    },
    {
      id: 'north-south-seasonal',
      title: 'North–south distance & seasonal demand module',
      intro:
        'The county’s defining logistics problem is often distance plus winter capacity — not a single downtown elevator.',
      bullets: [
        'Price portal-to-portal time honestly for any Boca ↔ central ↔ Jupiter pair on I-95 or the Turnpike.',
        'Book winter coastal and island moves earlier; summer may trade availability for heat and storm risk.',
        'Clarify island vs mainland addresses so bridge and truck assumptions stay accurate.',
        'If sale and occupancy dates may shift for weather or seasonal tenants, keep short-term storage as a backup.',
        'Confirm far-west or equestrian-edge access with photos — empty miles from coastal staging add cost.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Palm Beach County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, coastal premium vs inland value — then verify on official district and hospital sites. Avoid treating lifestyle rankings as facts.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'The School District of Palm Beach County serves most public K–12 students. Choice and boundary options vary by address.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public schools are largely under the School District of Palm Beach County, with magnets, choice, and charter options layered on. Confirm zoning for any address before assuming a school assignment.',
          },
          {
            title: 'North–south differences',
            detail:
              'Family patterns and campus options differ from Boca through Wellington to Jupiter. Tour schools and review district data rather than relying on countywide reputation alone.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools, Florida Department of Education reports, and independent comparison sites are starting points — validate with visits and current enrollment info.',
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
              'Regional care includes systems such as Baptist Health facilities in the county, Jupiter Medical Center, hospitals in the West Palm / Atlantis area, and other community campuses. Confirm specialties and networks for your needs.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from your target zone — northern and western addresses can be far from southern facilities. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Coastal premium vs inland mix',
            detail:
              'Oceanfront, island, and prime coastal product prices as a lifestyle premium; inland SFH and townhome stock is more mixed. Compare total monthly costs including insurance and HOA dues.',
          },
          {
            title: 'Insurance reality',
            detail:
              'Wind, homeowners, and flood insurance (where mapped) can be material. Get quotes before assuming a purchase budget is complete.',
          },
          {
            title: 'HOA governance',
            detail:
              'Many desirable villages run through strong associations. Read rules on trucks, rentals, and renovations before closing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Palm Beach areas fit whom',
        bullets: [
          {
            title: 'Southern coastal lifestyle',
            detail:
              'Boca Raton and Delray often attract people prioritizing dining, walkable cores, and coastal access — with traffic and HOA density as tradeoffs.',
          },
          {
            title: 'Central urban energy',
            detail:
              'West Palm Beach core suits those wanting cultural amenities and a denser urban grid without living on the island.',
          },
          {
            title: 'Northern and western space',
            detail:
              'Palm Beach Gardens, Jupiter, Wellington, and western large-lot areas often appeal for gated communities, recreation, and more space — with longer north–south trips.',
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
              'Healthcare, tourism and hospitality, professional services, retail, education, agriculture on the western edge, and corporate offices along major corridors shape local jobs.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-95 and Turnpike peaks are the main timing constraint for north–south workers. Test drive peak routes before choosing solely on housing cost.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Seasonal population swings',
            detail:
              'Winter visitors and seasonal residents change traffic, restaurant wait times, and condo activity. Visit in both peak and off-season if you can.',
          },
          {
            title: 'Climate & storms',
            detail:
              'Hot humid summers and a defined hurricane season apply countywide; coastal and island parcels add flood and wind considerations.',
          },
          {
            title: 'Recreation',
            detail:
              'Beaches, Intracoastal access, golf communities, and equestrian culture in parts of the west are major quality-of-life draws — with HOA rules often attached.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Palm Beach County resources',
    intro:
      'Start with official sources; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Palm Beach County — official site',
        href: 'https://discover.pbcgov.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'School District of Palm Beach County',
        href: 'https://www.palmbeachschools.org/',
        external: true,
        note: 'Boundaries, choice & calendars',
      },
      {
        label: 'City of West Palm Beach',
        href: 'https://www.wpb.org/',
        external: true,
      },
      {
        label: 'City of Boca Raton',
        href: 'https://www.myboca.us/',
        external: true,
      },
      {
        label: 'Town of Palm Beach',
        href: 'https://www.townofpalmbeach.com/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        external: true,
        note: 'I-95, Turnpike before load windows',
      },
      {
        label: 'FEMA Flood Map Service Center',
        href: 'https://msc.fema.gov/portal/home',
        external: true,
        note: 'Check parcel flood zones',
      },
      {
        label: 'FDACS — Florida household movers (Ch. 507)',
        href: 'https://www.fdacs.gov/',
        external: true,
        note: 'Intrastate mover registration & consumer resources',
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
        note: 'Required when the move crosses state lines',
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
      {
        label: 'All Florida local mover guides',
        href: '/local-movers/florida',
      },
    ],
  },
  directoryHint:
    'Prefer crews fluent in gated HOA packets and coastal careful-handling for Boca, Delray, Palm Beach island, and Gardens/Jupiter villages. Price north–south pairs as long locals. Verify FDACS for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
