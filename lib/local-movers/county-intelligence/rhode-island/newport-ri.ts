import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeRiPack,
  RI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/rhode-island/ri-shared';

/**
 * Newport County, RI — peninsula / historic / Aquidneck access constraints.
 * NOT Providence coastal clone, NOT Warwick airport product.
 */
export const newportCountyRiIntelligence: CountyIntelligencePack = finalizeRiPack({
  countySlug: 'newport',
  hubTitle: 'Newport County Moving Intelligence Hub',
  eyebrow:
    'Newport County, RI · Aquidneck / historic peninsula & RI-138 / RI-114 logistics',
  h1: 'Moving in Newport County: Aquidneck Peninsula Access, Historic Grids & RI-138 / Bridge Logistics',
  heroOpener:
    'Newport County, Rhode Island is Aquidneck peninsula product — Downtown Newport and Historic Hill tight streets, Bellevue mansion-edge character, Middletown multi-unit and commercial belts, Portsmouth north Aquidneck, Jamestown island access, and harbor multi-unit — not a Providence coastal rename and not Warwick airport freeflow. Expect bridge-dependent access that rewrites portal time, tourism freeflow that fills curb from spring through fall, historic street geometry that limits truck length, and RI-138 / RI-114 freeflow across “local” pairs. A Historic Hill walk-up, a Bellevue estate driveway, a Middletown condo, and a Portsmouth ranch do not share truck access or crew skill. Tourism calendars and naval employment waves are real inputs. This hub is for people moving in Newport County, RI — peninsula and historic logistics — not a renamed capital-city page.',
  heroCredibility:
    'RI DPUC Motor Carriers household goods certificate for intrastate · FMCSA for interstate · Historic peninsula & bridge-access logistics awareness · Curated listings',
  majorCorridors: 'RI-138 · RI-114 · local peninsula grid',
  whatMakesDifferent: {
    title: 'What makes moving in Newport County different',
    intro:
      'These are Newport County, Rhode Island realities — Aquidneck peninsula constraints, historic tight streets, tourism freeflow, and bridge-dependent RI-138 / RI-114 logistics — not Providence capital triple-decker defaults and not Warwick airport suburb scripts.',
    bullets: [
      {
        title: 'This is Newport County peninsula / historic product — not Providence coastal clone',
        detail:
          'Ignore Downtown Providence multi-unit templates and Warwick HOA freeflow as interchangeable defaults. Newport County is Aquidneck Island plus Jamestown with Downtown Newport, Historic Hill, Bellevue edges, Middletown, Portsmouth, and harbor product. Match estimates to Newport County addresses and Rhode Island DPUC authority — not Providence or Kent County logistics alone.',
      },
      {
        title: 'Historic tight streets and scarce truck length rewrite access',
        detail:
          'Historic Hill, downtown lanes, and older Newport grids routinely limit truck size, staging, and turnarounds. Flat-rate optimism fails when crews cannot get a full tractor near the door.',
      },
      {
        title: 'Tourism freeflow fills curb and burns portal time',
        detail:
          'Cliff Walk edges, Bellevue Avenue visitor peaks, harbor events, and summer weekends rewrite load windows that look simple on a winter map. Mid-week early starts matter more than map miles.',
      },
      {
        title: 'Bridge and causeway dependency rewrites “local” pairs',
        detail:
          'Newport ↔ Jamestown, Aquidneck ↔ mainland Kent/Providence pairs, and RI-138 bridge freeflow burn portal time and add weather contingency ranch interiors never see.',
      },
      {
        title: 'RI-138 and RI-114 burn portal time across Aquidneck',
        detail:
          'Downtown Newport ↔ Portsmouth, Middletown ↔ Historic Hill, or Jamestown ↔ Newport pairs look local and still burn 20–50+ minutes at peak tourism windows. Price portal-to-portal honestly.',
      },
      {
        title: 'Metro and interstate pairs are routine',
        detail:
          'Households regularly move Newport County ↔ Providence, Kent, Bristol, or Washington County RI, or into Massachusetts corridors. A Rhode Island DPUC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Rhode Island.',
      },
      RI_REG_BULLET,
    ],
  },
  zonesHeading: 'Newport County access zones',
  zonesIntro:
    'Plan by Downtown Newport / Historic Hill, Bellevue mansion edges, Middletown commercial and multi-unit belts, Portsmouth north Aquidneck, Jamestown island access, and harbor multi-unit — access rules cluster by historic geometry, tourism freeflow, and bridge dependency more than ZIP alone.',
  zones: [
    {
      id: 'downtown-newport-historic-hill',
      name: 'Downtown Newport, Historic Hill & tight-street core',
      shortName: 'Downtown / Historic Hill',
      neighborhoods: [
        'Downtown Newport',
        'Historic Hill',
        'Thames Street corridors',
        'Spring Street edges',
        'Broadway multi-unit pockets',
        'Harbor-adjacent walk-ups',
      ],
      housingTypes: 'Walk-up multi-unit, historic SFH, condo, limited elevators, tight lots',
      challenges: [
        'Scarce truck length, tight turns, and limited staging',
        'Tourism freeflow and event-day curb loss',
        'Multi-flight stairs and older interiors',
      ],
      moverTips:
        'Confirm truck length and staging before final pricing. Prefer mid-week early non-event starts. Photo stair counts and curb options; protect historic interiors and landscaping.',
      cityKeywords: [
        'newport',
        'historic hill',
      ],
    },
    {
      id: 'bellevue-mansion-edges',
      name: 'Bellevue Avenue edges, mansion district & eastern character grids',
      shortName: 'Bellevue edges',
      neighborhoods: [
        'Bellevue Avenue corridors',
        'Mansion district edges',
        'Ochre Point edges',
        'Kay Street / Catherine edges',
        'Eastern character SFH',
        'Estate driveway product',
      ],
      housingTypes: 'Character SFH, estate lots, carriage-house edges, limited multi-unit',
      challenges: [
        'Long carries, driveway geometry, and landscape protection',
        'Visitor traffic near attractions and scarce curb',
        'Tourism freeflow on Bellevue corridors',
      ],
      moverTips:
        'Survey driveway turnarounds and gate clearances early. Prefer non-weekend tourism windows. Protect landscaping, stonework, and older interiors.',
      cityKeywords: [
        'newport',
        'bellevue',
      ],
    },
    {
      id: 'middletown',
      name: 'Middletown multi-unit, commercial belts & central Aquidneck',
      shortName: 'Middletown',
      neighborhoods: [
        'Middletown',
        'West Main Road corridors',
        'East Main Road corridors',
        'Middletown multi-unit pockets',
        'Aquidneck Avenue edges',
        'Central commercial-adjacent stock',
      ],
      housingTypes: 'Multi-family, condo, townhomes, mixed SFH, limited elevators',
      challenges: [
        'Elevator/COI needs on multi-unit product',
        'RI-114 freeflow and commercial curb competition',
        'Cross-island empty miles to Historic Hill and Portsmouth',
      ],
      moverTips:
        'Book elevators and COIs when required. Clarify Middletown vs Newport addresses. Price RI-114 honestly for north–south Aquidneck pairs.',
      cityKeywords: [
        'middletown',
      ],
    },
    {
      id: 'portsmouth-north-aquidneck',
      name: 'Portsmouth north Aquidneck, ranch belts & bridge approaches',
      shortName: 'Portsmouth',
      neighborhoods: [
        'Portsmouth',
        'Island Park edges',
        'Common Fence Point edges',
        'East Main / West Main northern belts',
        'Mount Hope Bridge approaches',
        'Northern SFH and multi-unit pockets',
      ],
      housingTypes: 'Ranch and two-story SFH, multi-unit pockets, limited HOA product',
      challenges: [
        'Bridge freeflow and longer empty miles to Downtown Newport',
        'Mixed driveway and multi-unit access product',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Price bridge and RI-114 timing honestly. Survey driveway width on edge lots. Align with school calendars when relevant.',
      cityKeywords: [
        'portsmouth',
      ],
    },
    {
      id: 'jamestown',
      name: 'Jamestown island access, village grids & bridge dependency',
      shortName: 'Jamestown',
      neighborhoods: [
        'Jamestown',
        'Jamestown village edges',
        'North Road corridors',
        'East Shore / West Shore edges',
        'Island multi-unit pockets',
        'Claiborne Pell / Newport Bridge approaches',
      ],
      housingTypes: 'SFH, character product, multi-unit limited, waterfront edges',
      challenges: [
        'Bridge-only access and weather contingency',
        'Scarce staging and tourism freeflow in peak season',
        'Longer empty miles to Aquidneck unload pairs',
      ],
      moverTips:
        'Price bridge freeflow and weather contingency honestly. Photo curb and driveway options early. Prefer mid-week non-holiday starts in summer.',
      cityKeywords: [
        'jamestown',
      ],
    },
    {
      id: 'harbor-multi-unit',
      name: 'Harbor multi-unit, waterfront condo & marina-adjacent stock',
      shortName: 'Harbor multi-unit',
      neighborhoods: [
        'Harbor multi-unit pockets',
        'America’s Cup Avenue edges',
        'Long Wharf edges',
        'Waterfront condo product',
        'Marina-adjacent buildings',
        'Goat Island edges',
      ],
      housingTypes: 'Elevator condo, mid-rise multi-unit, waterfront walk-ups',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Event and cruise-day curb loss',
        'Scarce truck staging near marina corridors',
      ],
      moverTips:
        'Book elevators and COIs in writing. Prefer mid-week early freight windows away from events. Photo curb staging options early.',
      cityKeywords: [
        'newport',
        'goat island',
        'harbor',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Newport County moving costs',
    intro:
      'Historic tight streets, tourism freeflow, bridge dependency, multi-unit elevators, and RI-138 / RI-114 timing move the number more than packing skill alone — this is Aquidneck peninsula logistics, not Providence capital or Warwick airport defaults.',
    drivers: [
      {
        title: 'Historic truck-length limits, tight turns & scarce staging',
        detail:
          'Downtown Newport and Historic Hill rewrite jobs that look simple on a map.',
      },
      {
        title: 'Tourism freeflow & event-day curb loss',
        detail:
          'Bellevue, harbor, and summer weekend peaks add schedule risk before packing skill matters.',
      },
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Harbor multi-unit and Middletown condo product add labor and soft costs flat-rate optimism underprices.',
      },
      {
        title: 'RI-138 · RI-114 · bridge congestion',
        detail:
          'Cross-island and mainland pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Metro & interstate empty miles',
        detail:
          'Providence, Kent, Bristol, Washington County RI destinations and Massachusetts pairs raise staging distance and authority complexity when leaving Newport County or Rhode Island.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$2,200+',
        note: 'Higher with historic tight streets, elevators, or peak tourism pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,700–$5,000+',
        note: 'Stairs, curb limits, and bridge freeflow soft costs trend up',
      },
      {
        label: '3–4+ BR / estate / cross-zone',
        value: '$3,400–$11,000+',
        note: 'Historic access, Bellevue edges, and long bridge pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$225+/hr',
        note: 'Portal-to-portal; packing, stairs, COIs, tourism timing, and bridge freeflow scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Newport County move',
    intro:
      'Tourism calendars, naval and hospitality employment cycles, summer event freeflow, nor’easter risk, and winter ice reshape access and crew availability across the Aquidneck and Jamestown grids.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce tourism and bridge pain. Avoid event weekends and month-end Fridays when leases and hotel occupancy collide.',
      },
      {
        title: 'Peak season: late May–mid-October',
        detail:
          'Tourism, family school calendars, and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends, elevator slots, and historic-core access.',
      },
      {
        title: 'Event & tourism freeflow risk',
        detail:
          'Festivals, sailing events, and holiday weekends raise cancellation and staging risk downtown and on Bellevue corridors. Prefer flexible dates and early starts.',
      },
      {
        title: 'Summer humidity, coastal storms & winter ice',
        detail:
          'June–August humidity, coastal storms, and freeze-thaw winters reshape outdoor labor and bridge contingency. Prefer early starts and weather plans on historic and waterfront stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'aquidneck-historic-bridge',
      title: 'Aquidneck historic, harbor multi-unit & bridge logistics module',
      intro:
        'Newport County, RI estimates fail more often on truck-length limits, tourism freeflow, elevator COIs, and bridge timing than on packing skill alone.',
      bullets: [
        'Confirm truck length, staging, and turnarounds for Downtown Newport and Historic Hill before the survey is final.',
        'Prefer mid-week non-event starts in peak tourism season for Bellevue, harbor, and downtown product.',
        'Book elevators and building COIs for harbor multi-unit and Middletown condo stock early.',
        'Price portal-to-portal time for any pair that rides RI-138, RI-114, or bridges at peak.',
        'Clarify Newport, Middletown, Portsmouth, Jamestown, and unincorporated addresses on every estimate.',
        'For in-state jobs verify RI DPUC Motor Carriers household goods certificate status; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-providence-coastal-not-warwick',
      title: 'Not Providence coastal clone · not Warwick airport module',
      intro:
        'A single “Newport County rate” collapses when peninsula historic product is confused with Providence triple-decker density or Kent County airport freeflow alone.',
      bullets: [
        'Do not price Historic Hill walk-ups like Downtown Providence multi-unit or like Warwick HOA cul-de-sacs as interchangeable defaults.',
        'State the market as Newport County, Rhode Island / Aquidneck peninsula on every estimate — distinct from Providence and Kent County logistics.',
        'Keep bridge-dependent Jamestown and mainland pairs explicit — weather and freeflow contingency is not optional.',
        'Match tourism peaks separately from naval and hospitality mid-week employment windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Newport County?',
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
              'Newport County spans Newport, Middletown, Portsmouth, and Jamestown systems and related municipal arrangements. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and island demand belts can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Rhode Island Department of Education data, and campus visits beat ranking screenshots alone. Naval and hospitality employment shape household calendars more than rankings alone.',
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
              'Newport Hospital anchors local acute care, with regional specialty access into Providence systems. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to Newport Hospital and Providence specialty campuses — RI-138 bridge freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect Downtown Newport and Historic Hill walk-ups; Bellevue character and estate edges; Middletown multi-unit and SFH; Portsmouth ranch belts; Jamestown island SFH; harbor elevator condo product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by historic core vs north Aquidneck and year-round vs tourism-adjacent product. Budget for older-building repair risk, parking scarcity, and competitive summer rental seasons.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully — especially waterfront buildings.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / Historic Hill lifestyle',
            detail:
              'Suits people prioritizing walkability and harbor amenities — with tight-street access and tourism freeflow tradeoffs on move day.',
          },
          {
            title: 'Bellevue / character living',
            detail:
              'Often appeals for estate feel and shore proximity — with driveway geometry, visitor traffic, and landscape protection needs.',
          },
          {
            title: 'Middletown / Portsmouth Aquidneck living',
            detail:
              'Fits buyers chasing relative space and schools — with RI-114 freeflow and longer empty miles to historic core.',
          },
          {
            title: 'Jamestown island living',
            detail:
              'Attracts households seeking island pace — with bridge dependency and peak tourism staging constraints.',
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
              'Naval Station Newport and related defense support, tourism and hospitality, healthcare, professional services, and reverse-commute pairs into Providence concentrate demand across Newport County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak RI-138, RI-114, and bridge freeflow is real — including mainland reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Newport County, RI is Aquidneck peninsula historic density, harbor multi-unit, and bridge-dependent island living — not Providence capital triple-decker defaults and not a Warwick airport rename.',
          },
          {
            title: 'Climate',
            detail:
              'Coastal New England climate with humid summers, tourism freeflow peaks, coastal storm risk, nor’easters, and freeze-thaw winters. Plan outdoor staging, ice, and bridge contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak tourism and off-peak times when deciding — event weekends, naval cycles, and winter storms reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Newport County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify RI DPUC household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Newport',
        href: 'https://www.cityofnewport.com/',
        external: true,
        note: 'Historic peninsula municipality context',
      },
      {
        label: 'Town of Middletown',
        href: 'https://www.middletownri.com/',
        external: true,
        note: 'Central Aquidneck municipality context',
      },
      {
        label: 'Town of Portsmouth',
        href: 'https://www.portsmouthri.gov/',
        external: true,
        note: 'North Aquidneck municipality context',
      },
      {
        label: 'Town of Jamestown',
        href: 'https://www.jamestownri.gov/',
        external: true,
        note: 'Island access municipality context',
      },
      {
        label: 'Rhode Island 511 — traveler information',
        href: 'https://www.ri511.com/',
        external: true,
        note: 'RI-138 / RI-114 / bridge freeflow before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with historic tight-street and truck-length fluency for Downtown Newport–Historic Hill product; elevator/COI experience for harbor multi-unit; tourism-window honesty for Bellevue and event corridors; bridge freeflow fluency for Jamestown and mainland pairs; honest RI-138 · RI-114 timing for cross-island jobs. Verify RI DPUC Motor Carriers household goods certificate for intrastate moves and FMCSA for interstate legs before deposits. This is Newport County, Rhode Island Aquidneck peninsula product — not Providence coastal clone logistics.',
  lastReviewed: '2026-07-24',
});
