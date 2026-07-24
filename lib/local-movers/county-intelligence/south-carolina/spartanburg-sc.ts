import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeScPack,
  SC_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/south-carolina/sc-shared';

/**
 * Spartanburg County, SC — Upstate industrial + residential (not Greenville clone).
 * I-85/I-26 logistics, mill-town heritage, Boiling Springs/Inman growth, Greenville complement.
 */
export const spartanburgCountyScIntelligence: CountyIntelligencePack = finalizeScPack({
  countySlug: 'spartanburg',
  hubTitle: 'Spartanburg County Moving Intelligence Hub',
  eyebrow: 'Spartanburg · Upstate SC · industrial corridors, suburbs & I-85/I-26 links',
  h1: 'Moving in Spartanburg County: I-85 Logistics, Mill-Town Grids & Upstate Growth Edges',
  heroOpener:
    'Spartanburg County is the Upstate’s industrial-residential twin — not a Greenville downtown revival copy. Expect a working city core with older mill-era street grids, Business I-85 links into plant and warehouse belts, family growth in Boiling Springs and Inman, and routine Greenville-bound pairs that still need honest portal time on I-85 and I-26. A downtown Spartanburg walk-up, a Duncan plant-adjacent rental, a Boiling Springs HOA two-story, and a Landrum foothill craftsman do not share truck access or shift-window risk. This hub is for people moving in Spartanburg County — complementary to Greenville, not a renamed Greenville page or generic South Carolina template.',
  heroCredibility:
    'SC Class E (ORS/PSC) for intrastate moves · FMCSA for interstate · Upstate industrial & I-85/I-26 corridor awareness · Curated listings',
  majorCorridors: 'I-85 · I-26 · US-221 · SC-9 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Spartanburg County different',
    intro:
      'These are Spartanburg Upstate realities — industrial shift traffic, mill-town street grids, and I-85/I-26 cross-county pairs — not Greenville’s Main Street loft scene or Lowcountry peninsula rules.',
    bullets: [
      {
        title: 'Industrial and logistics calendars shape mid-week demand',
        detail:
          'Manufacturing, distribution, and I-85 plant corridors create shift-change truck traffic, contractor housing waves, and corporate relocation clusters that compete with residential Saturday demand — with a heavier industrial fabric than Greenville’s downtown-led brand.',
      },
      {
        title: 'Older mill-town grids still matter',
        detail:
          'Spartanburg core neighborhoods, Pacolet edges, and historic mill communities often mean narrow streets, porch stairs, and limited curb — different friction from master-planned Boiling Springs tracts.',
      },
      {
        title: 'I-85, I-26, and Business I-85 turn short miles into billable time',
        detail:
          'Downtown ↔ Boiling Springs, Spartanburg ↔ Greer-edge, or any Greenville County pair looks local and still burns 35–70+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Suburban growth is real but not a Five Forks clone',
        detail:
          'Boiling Springs, Inman, Reidville, and Lyman-area growth include HOA packets and truck limits — with local road patterns and plant proximity that differ from Greenville’s south-suburb Woodruff corridor.',
      },
      {
        title: 'Greenville complement, not Greenville substitute',
        detail:
          'Households routinely live in one county and work in the other. Estimates must name Spartanburg vs Greenville addresses clearly so empty miles, HOA rules, and authority assumptions stay accurate.',
      },
      {
        title: 'Foothill and rural northern edges',
        detail:
          'Landrum, Campobello, and northern rural parcels add driveway grade, longer staging, and weather exposure that industrial-edge multifamily never sees.',
      },
      {
        title: 'Multi-county Upstate pairs are routine',
        detail:
          'Moves regularly link Spartanburg ↔ Greenville, Cherokee, or Union. Clarify county lines so Class E vs FMCSA assumptions stay accurate when any leg leaves South Carolina (e.g. NC destinations).',
      },
      SC_REG_BULLET,
    ],
  },
  zonesHeading: 'Spartanburg County access zones',
  zonesIntro:
    'Plan by Spartanburg core/mill-grid, Boiling Springs north growth, west I-85 / Duncan–Lyman industrial edge, Inman–Landrum north, and east Pacolet–Cowpens corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'spartanburg-core',
      name: 'Spartanburg core, downtown & near-city neighborhoods',
      shortName: 'Spartanburg core',
      neighborhoods: [
        'Downtown Spartanburg',
        'Converse Heights edges',
        'Hampton Heights',
        'Northside edges',
        'Near-campus multifamily',
      ],
      housingTypes: 'Older SFH, multi-story walk-ups, denser multifamily, revitalizing core stock',
      challenges: [
        'Limited curb staging on older street grids',
        'Stairs and mixed elevator buildings',
        'Business I-85 / arterial congestion into the core',
      ],
      moverTips:
        'Photo curb options and stair counts. Prefer mid-week early starts. Confirm building COI or landlord rules for multifamily in writing.',
      cityKeywords: [
        'spartanburg',
        'downtown spartanburg',
        'hampton heights',
        'converse heights',
        'northside',
      ],
    },
    {
      id: 'boiling-springs-north',
      name: 'Boiling Springs & north suburban growth',
      shortName: 'Boiling Springs',
      neighborhoods: [
        'Boiling Springs',
        'Rainbow Lake edges',
        'North SC-9 / Highway 9 corridors',
        'Newer HOA tracts north of the core',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, family inventories',
      challenges: [
        'HOA gate lists, COI, and approved hours',
        'Peak family Saturday demand May–August',
        'I-85 and arterial timing into plant and Greenville jobs',
      ],
      moverTips:
        'Collect HOA packets first. Book peak Saturdays early. Price any Greenville- or plant-linked pair with honest freeway buffer.',
      cityKeywords: [
        'boiling springs',
        'rainbow lake',
        'highway 9',
        'north spartanburg',
      ],
    },
    {
      id: 'west-i85-industrial',
      name: 'West I-85, Duncan, Lyman & plant-adjacent edges',
      shortName: 'West I-85 / Duncan',
      neighborhoods: [
        'Duncan',
        'Lyman',
        'Wellford edges',
        'I-85 plant- and warehouse-adjacent rentals',
        'Business I-85 residential pockets',
      ],
      housingTypes: 'Workforce multifamily, modest SFH, contractor-heavy rentals, some newer tracts',
      challenges: [
        'Shift-change truck traffic near plants and distribution',
        'Lease-end waves for industrial workforce',
        'Mix of short notice and hard corporate dates',
      ],
      moverTips:
        'Ask about hard report-to-work dates. Avoid peak plant ingress windows when flexible. Clarify storage-in-transit needs for corporate moves.',
      cityKeywords: [
        'duncan',
        'lyman',
        'wellford',
        'i-85',
        'business i-85',
        'industrial',
      ],
    },
    {
      id: 'inman-landrum',
      name: 'Inman, Landrum & northern foothill approaches',
      shortName: 'Inman / Landrum',
      neighborhoods: [
        'Inman',
        'Landrum',
        'Campobello',
        'Northern rural-suburban mix',
      ],
      housingTypes: 'Craftsman and older SFH, hillside lots, small-town stock, some new subdivisions',
      challenges: [
        'Driveway grade, turn radius, and tree canopy',
        'Longer empty miles from core or I-85 staging',
        'Weather exposure on open carries',
      ],
      moverTips:
        'Survey driveway grade and overhead clearance. Prefer early starts for southbound freeway pairs. Inventory outdoor and garage gear carefully.',
      cityKeywords: ['inman', 'landrum', 'campobello', 'northern spartanburg'],
    },
    {
      id: 'east-pacolet-cowpens',
      name: 'East Spartanburg, Pacolet, Cowpens & US-221 corridors',
      shortName: 'East / Pacolet',
      neighborhoods: [
        'Pacolet',
        'Cowpens',
        'Eastside Spartanburg pockets',
        'US-221 corridors',
      ],
      housingTypes: 'Mill-town SFH, modest suburban stock, rural-edge parcels',
      challenges: [
        'Older street widths and porch/stair carries',
        'Longer staging from west-side industrial yards',
        'US-221 and local arterial timing',
      ],
      moverTips:
        'Photo curb and porch access. Price empty miles from I-85-west staging. Clarify rural driveway conditions on outer parcels.',
      cityKeywords: ['pacolet', 'cowpens', 'us-221', 'east spartanburg'],
    },
    {
      id: 'reidville-woodruff-edge',
      name: 'Reidville, Woodruff edge & south growth spillover',
      shortName: 'Reidville / South',
      neighborhoods: [
        'Reidville',
        'Woodruff edges (Spartanburg County pockets)',
        'South suburban growth tracts',
      ],
      housingTypes: 'HOA SFH, townhomes, larger family inventories',
      challenges: [
        'Greenville County line confusion on nearby addresses',
        'HOA approved hours on newer subdivisions',
        'I-26 / connector congestion on cross-metro pairs',
      ],
      moverTips:
        'Confirm exact county line for every estimate. Send HOA COI requirements with the survey. Price I-26 and Greenville-bound portal time honestly.',
      cityKeywords: ['reidville', 'woodruff', 'south spartanburg', 'i-26'],
    },
  ],
  costDrivers: {
    title: 'What drives Spartanburg County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Core curb friction, I-85/I-26 portal time, HOA soft costs, and industrial demand spikes separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Core curb, stairs & older street grids',
        detail: 'Near-city staging friction and multi-story access add labor before packing skill matters.',
      },
      {
        title: 'I-85 / I-26 / Business I-85 congestion',
        detail: 'Cross-zone and Greenville-bound pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'HOA growth tracts (Boiling Springs and south/north edges)',
        detail: 'Gate lists, COI, and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'Manufacturing-adjacent demand spikes',
        detail: 'Plant and logistics calendars create mid-week competition for crews.',
      },
      {
        title: 'Cross-county Upstate empty miles',
        detail: 'Greenville, Cherokee, and Union destinations raise staging distance from Spartanburg yards.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,200+', note: 'Higher with core stairs or peak freeways' },
      { label: '2–3BR condo or modest SFH', value: '$1,150–$3,300+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / HOA / cross-zone', value: '$2,100–$6,200+', note: 'Boiling Springs SFH and long I-85 pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$165+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Spartanburg County move',
    intro: 'School calendars, manufacturing shifts, heat/humidity, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear core curb space and reduce I-85 / I-26 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Boiling Springs and growth-edge SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans.',
      },
      {
        title: 'Corporate / plant relocation clusters',
        detail:
          'I-85 industrial calendars create mid-week spikes. Confirm report dates and storage needs early.',
      },
    ],
  },
  specialized: [
    {
      id: 'upstate-industrial-i85',
      title: 'Upstate industrial, HOA & I-85/I-26 logistics module',
      intro:
        'Spartanburg estimates fail more often on freeway portal time, plant calendars, and HOA packets than on packing skill — and should never be priced as a Greenville loft clone.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours for Boiling Springs and growth-edge product before the survey is final.',
        'Price portal-to-portal time for any pair that rides I-85, I-26, or Business I-85 at peak.',
        'Photo core curb options and stair counts for older mill-grid and downtown stock.',
        'Ask plant-adjacent customers about shift windows and hard report-to-work dates.',
        'Clarify Spartanburg vs Greenville / Cherokee / Union addresses on every estimate.',
        'Verify SC Class E (ORS) for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Spartanburg County?',
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
              'Spartanburg County is served by multiple public school districts (often referenced as Districts 1–7 and related systems) with address-based assignment. Marketing names like Boiling Springs do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'North and some south growth corridors can see enrollment pressure. Confirm which district serves a specific address and ask about capacity when touring.',
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
              'Spartanburg Regional and other regional facilities serve the county, with additional Upstate specialty options including Greenville-metro campuses. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Boiling Springs or Duncan to preferred campuses — I-85 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core older stock vs suburban tracts',
            detail:
              'Expect mill-era and older street-grid SFH near the city core; larger HOA tracts dominate much of Boiling Springs and several growth edges; plant-adjacent multifamily clusters along I-85 nodes.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor and district. Budget for HOA dues, older-home repair risk, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and apartment buildings often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Spartanburg areas fit whom',
        bullets: [
          {
            title: 'Spartanburg core / revitalizing urban lifestyle',
            detail:
              'Suits people prioritizing shorter in-city access and older-neighborhood character — with curb and stair tradeoffs on move day.',
          },
          {
            title: 'Boiling Springs suburban growth',
            detail:
              'Often appeals for newer homes and family space — with HOA logistics and freeway commute realism.',
          },
          {
            title: 'Duncan / Lyman industrial-edge practicality',
            detail:
              'Fits workforce and plant-commute households — with shift traffic and multifamily turnover patterns.',
          },
          {
            title: 'Inman / Landrum foothill edge',
            detail:
              'Attracts households seeking smaller-town feel and northern access — with driveway grade and longer staging.',
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
              'Advanced manufacturing, logistics and distribution, healthcare, education, and professional services concentrate along I-85/I-26 nodes and the urban core — with many households also commuting into Greenville County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent outside the densest core blocks. I-85, I-26, and Business I-85 peaks are real. Test drive peak routes — including Greenville-bound pairs — before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Spartanburgs',
            detail:
              'Spartanburg stacks a working industrial city, HOA growth suburbs, mill-town edges, and foothill approaches — complementary to Greenville’s downtown revival brand, not identical to it, and unlike Lowcountry coastal patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Local arts, college energy, and dining exist in and near the core; suburban corridors feel more family- and retail-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Spartanburg County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify SC Class E / ORS for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Spartanburg County — official site',
        href: 'https://www.spartanburgcounty.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Spartanburg',
        href: 'https://www.cityofspartanburg.org/',
        external: true,
      },
      {
        label: 'Spartanburg County — school districts directory',
        href: 'https://www.spartanburgcounty.gov/409/School-Districts',
        external: true,
        note: 'Districts 1–7; confirm by address',
      },
      {
        label: 'Spartanburg School District 7',
        href: 'https://www.spartanburg7.org/',
        external: true,
        note: 'City / core campuses',
      },
      {
        label: 'SCDOT 511 traffic',
        href: 'https://www.511sc.org/',
        external: true,
        note: 'I-85 / I-26 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with older street-grid and stair experience for core/mill-town stock; HOA fluency for Boiling Springs product; honest I-85/I-26 timing and plant-calendar awareness for Duncan–Lyman and Greenville-bound pairs. Verify SC Class E (ORS) for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
