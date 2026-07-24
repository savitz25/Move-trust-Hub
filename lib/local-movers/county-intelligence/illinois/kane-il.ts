import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * Kane County, IL — west-collar Fox River (not DuPage clone, not McHenry far-north).
 * Aurora/Elgin cores, St. Charles–Geneva–Batavia, Randall Road / I-88 / I-90 logistics.
 */
export const kaneCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'kane',
  hubTitle: 'Kane County Moving Intelligence Hub',
  eyebrow: 'Kane · west collar · Aurora, Elgin, Fox River towns & Randall Road',
  h1: 'Moving in Kane County: Fox River Towns, Aurora–Elgin Access & Randall Road Logistics',
  heroOpener:
    'Kane County is the Fox River west-collar market: Aurora and Elgin urban cores with multi-unit and older SFH stock, riverside villages from Batavia to St. Charles and Geneva with boutique downtowns and HOA edges, and Randall Road / I-88 / I-90 corridors that pull family and reverse-commute traffic through the same windows movers use. An Aurora three-flat, a Geneva HOA two-story, a Carpentersville rental, and a winter move across the river do not share truck access or crew skill. I-88, I-90, IL-47, and Randall Road rewrite “local” estimates that ignore bridge timing, HOA packets, and long north–south empty miles. This hub is for people moving in Kane County — not a renamed Naperville page or generic Illinois template.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods license for intrastate moves · FMCSA for interstate · Fox River access, Aurora–Elgin & Randall Road corridor awareness · Curated listings',
  majorCorridors: 'I-88 · I-90 · IL-47 · Randall Road corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Kane County different',
    intro:
      'These are Kane Fox River realities — Aurora/Elgin cores, riverside village fabric, and Randall Road congestion — not DuPage’s denser corporate HOA belt alone or McHenry’s lower-density far-north runs.',
    bullets: [
      {
        title: 'Fox River geography splits the county into timed corridors',
        detail:
          'Bridge crossings and river-adjacent downtowns mean north–south pairs (Elgin ↔ Aurora, St. Charles ↔ South Elgin) can lose more time than raw miles suggest. Build river and Randall Road buffers into portal pricing.',
      },
      {
        title: 'Aurora and Elgin cores are different jobs than Tri-Cities villages',
        detail:
          'Multi-unit walk-ups, older grids, and denser curb limits do not share logistics with Batavia–Geneva–St. Charles HOA and established SFH product. Survey by zone.',
      },
      {
        title: 'Randall Road is a billable corridor, not just a map line',
        detail:
          'Retail signal density and peak volumes on Randall Road turn “cross-town” Kane jobs into 40–70+ minute burns at rush hour. Price honestly.',
      },
      {
        title: 'I-88 and I-90 link west-collar and Chicago-bound demand',
        detail:
          'Corporate reverse-commute and city-linked pairs ride tollway peaks that suburban ranch quotes underprice. I-88 south Kane and I-90 north Kane are not interchangeable.',
      },
      {
        title: 'HOA growth and older village stock both exist',
        detail:
          'Campton Hills, Sugar Grove, and north-Kane growth tracts need gate packets; older Elgin and Aurora neighborhoods need stair and driveway photos.',
      },
      {
        title: 'IL-47 adds long north–south empty miles',
        detail:
          'Huntley-edge to Sugar Grove-style pairs look “same metro” and still burn significant portal time when IL-47 is the spine.',
      },
      {
        title: 'Cross-county west-metro pairs are routine',
        detail:
          'Households regularly move Kane ↔ DuPage, Cook, Kendall, DeKalb, or McHenry. Clarify county lines so ICC vs FMCSA assumptions stay accurate when any leg leaves Illinois.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'Kane County access zones',
  zonesIntro:
    'Plan by Aurora core/south Kane, Elgin–Carpentersville north, Tri-Cities (Batavia–Geneva–St. Charles), Randall Road central corridor, and west rural-suburban edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'aurora-south-kane',
      name: 'Aurora core, south Kane & I-88 edges',
      shortName: 'Aurora / South Kane',
      neighborhoods: [
        'Downtown Aurora',
        'East Aurora',
        'West Aurora',
        'North Aurora',
        'Montgomery edges',
        'Sugar Grove edges',
      ],
      housingTypes: 'Multi-unit walk-ups, older SFH, HOA growth tracts, townhomes',
      challenges: [
        'Stairs and limited curb on denser older stock',
        'I-88 peak congestion',
        'Mixed HOA and city-grid product on short distances',
      ],
      moverTips:
        'Photo stair counts and curb options for multi-unit. Collect HOA packets for growth tracts. Build I-88 buffers for DuPage-linked pairs.',
      cityKeywords: [
        'aurora',
        'north aurora',
        'montgomery',
        'sugar grove',
      ],
    },
    {
      id: 'elgin-north-kane',
      name: 'Elgin, Carpentersville, South Elgin & north Kane',
      shortName: 'Elgin / North Kane',
      neighborhoods: [
        'Elgin',
        'South Elgin',
        'Carpentersville',
        'East Dundee edges',
        'West Dundee edges',
        'Sleepy Hollow edges',
      ],
      housingTypes: 'Older SFH, multi-unit, HOA tracts, riverside product',
      challenges: [
        'I-90 approach timing',
        'Stairs and hillside/river-adjacent access in places',
        'IL-31 / Randall-linked congestion',
      ],
      moverTips:
        'Survey driveway grade near river edges. Price I-90 portal time. Clarify Cook vs Kane addresses on eastern border parcels.',
      cityKeywords: [
        'elgin',
        'south elgin',
        'carpentersville',
        'east dundee',
        'west dundee',
        'sleepy hollow',
      ],
    },
    {
      id: 'tri-cities',
      name: 'Tri-Cities: Batavia, Geneva & St. Charles',
      shortName: 'Tri-Cities',
      neighborhoods: [
        'Batavia',
        'Geneva',
        'St. Charles',
        'River-adjacent downtown edges',
        'Tri-Cities HOA tracts',
      ],
      housingTypes: 'Established SFH, higher-value inventories, HOA edges, some condo',
      challenges: [
        'Downtown curb limits and event-day congestion',
        'Bridge timing across the Fox',
        'High-value packing expectations on some inventories',
      ],
      moverTips:
        'Prefer mid-week early starts near downtowns. Pre-walk driveway and street staging. Match high-value inventories to experienced crews.',
      cityKeywords: ['batavia', 'geneva', 'st. charles', 'st charles'],
    },
    {
      id: 'randall-road-corridor',
      name: 'Randall Road corridor & central Kane commercial residential',
      shortName: 'Randall Road',
      neighborhoods: [
        'Randall Road residential pockets',
        'Campton Hills edges',
        'Lily Lake edges',
        'Central Kane retail-adjacent tracts',
      ],
      housingTypes: 'HOA SFH, townhomes, multifamily near commercial strips',
      challenges: [
        'Randall Road peak signal and retail congestion',
        'HOA gate lists on newer tracts',
        'North–south empty miles between Aurora and Elgin poles',
      ],
      moverTips:
        'Price Randall Road pairs honestly at peak. Collect HOA COI early. Avoid major retail rush windows when flexible.',
      cityKeywords: [
        'randall road',
        'campton hills',
        'lily lake',
        'kane',
      ],
    },
    {
      id: 'west-kane-edges',
      name: 'West Kane rural-suburban edges (Maple Park, Hampshire edges)',
      shortName: 'West Kane',
      neighborhoods: [
        'Hampshire edges',
        'Maple Park edges',
        'Pingree Grove',
        'Burlington edges',
        'Western township parcels',
      ],
      housingTypes: 'Larger-lot SFH, some HOA, agricultural-edge homes',
      challenges: [
        'Longer empty miles from Fox River staging yards',
        'IL-47 timing and limited services nearby',
        'Driveway length, grade, and soft shoulders',
      ],
      moverTips:
        'Survey driveway length and turn radius. Price empty miles honestly. Confirm cell coverage and access notes for rural parcels.',
      cityKeywords: [
        'hampshire',
        'maple park',
        'pingree grove',
        'burlington',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kane County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Randall Road and tollway portal time, river geography, and multi-unit friction separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Randall Road / I-88 / I-90 congestion',
        detail:
          'North–south and east–west pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Fox River bridge timing & downtown curb',
        detail:
          'Tri-Cities and river-adjacent cores add staging friction and crossing delays.',
      },
      {
        title: 'Aurora–Elgin multi-unit stairs',
        detail:
          'Walk-ups and older grids add flight counts that HOA-ranch quotes underprice.',
      },
      {
        title: 'HOA growth tracts & west-edge empty miles',
        detail:
          'Gate packets and long IL-47 runs raise soft cost and truck time.',
      },
      {
        title: 'Cross-county west-metro empty miles',
        detail:
          'DuPage, Cook, Kendall, DeKalb, and McHenry destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,350+',
        note: 'Higher with stairs or peak Randall / I-90 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,600+',
        note: 'HOA and basement soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,200–$7,000+',
        note: 'Tri-Cities SFH and long north–south pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$180+/hr',
        note: 'Portal-to-portal; packing and HOA admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Kane County move',
    intro:
      'School calendars, river-town event weekends, winter ice, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce Randall Road / I-88 / I-90 pain. Avoid month-end Fridays when leases and HOA windows collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Tri-Cities and growth-tract SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter: snow, ice, and river-edge winds',
        detail:
          'Icy driveways and bridge approaches slow exterior carries. Prefer flexible dates, early starts, and salt plans.',
      },
      {
        title: 'Downtown festival and event clusters',
        detail:
          'Geneva, St. Charles, and Aurora event weekends shrink legal curb. Schedule around major festivals when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'kane-fox-river-randall',
      title: 'Fox River & Randall Road logistics module',
      intro:
        'Kane estimates fail more often on river/Randall portal time and mixed urban-vs-village product than on packing skill alone.',
      bullets: [
        'Price portal-to-portal time for any pair that rides Randall Road, I-88, I-90, or IL-47 at peak.',
        'Build Fox River bridge buffers for north–south Tri-Cities and Elgin–Aurora pairs.',
        'Collect HOA packets for growth tracts; survey stairs for Aurora and Elgin multi-unit stock.',
        'Photo driveway grade and length on river-adjacent and west-edge parcels.',
        'Clarify Kane vs DuPage / Cook / Kendall / McHenry addresses on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kane County?',
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
              'Kane County is served by multiple elementary and high-school districts across Aurora, Elgin, and the Tri-Cities. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'West and north growth corridors can see enrollment pressure. Ask the specific district about capacity, transfers, and busing when touring.',
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
              'Advocate Sherman (Elgin), Northwestern Medicine Delnor (Geneva), Rush Copley (Aurora), and other regional campuses serve Kane corridors. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Carpentersville or Sugar Grove to preferred campuses — Randall Road and tollway congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Urban cores, Tri-Cities villages & west lots',
            detail:
              'Expect multi-unit and older SFH in Aurora and Elgin; higher-value and village character in Batavia–Geneva–St. Charles; larger lots and newer HOA product toward the west edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply river-town to west township. Budget for HOA dues, taxes, and commute costs into DuPage or Cook job centers.',
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
        title: 'Which Kane areas fit whom',
        bullets: [
          {
            title: 'Aurora urban and south Kane lifestyle',
            detail:
              'Suits households seeking city amenities or relative value — with multi-unit logistics and I-88 timing.',
          },
          {
            title: 'Elgin–Carpentersville north corridor',
            detail:
              'Often appeals for jobs access and mixed housing stock — with I-90 peaks and varied building types.',
          },
          {
            title: 'Tri-Cities riverside living',
            detail:
              'Attracts buyers prioritizing downtown character and schools — with curb limits and higher move complexity on some inventories.',
          },
          {
            title: 'West Kane larger-lot edges',
            detail:
              'Fits households wanting space and quieter roads — with longer empty miles and IL-47 commute realism.',
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
              'Healthcare, manufacturing, logistics, retail along Randall Road, and reverse-commute or Chicago-bound corridors via I-88 and I-90 concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent outside Metra nodes. Randall Road, I-88, I-90, and IL-47 peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, Fox River spine',
            detail:
              'Kane stacks two midsize urban cores, riverside boutique towns, Randall Road retail suburbia, and west agricultural edges — different from DuPage’s denser HOA corporate belt or Will’s south-collar warehouse growth.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, cold snowy winters, and river-edge wind. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Festivals and dining concentrate in Tri-Cities and Aurora/Elgin cores; Randall corridor feels more retail- and family-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kane County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Kane County — official site',
        href: 'https://www.countyofkane.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Aurora',
        href: 'https://www.aurora-il.org/',
        external: true,
      },
      {
        label: 'City of Elgin',
        href: 'https://www.cityofelgin.org/',
        external: true,
      },
      {
        label: 'IDOT / Illinois traffic & road conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-88 / I-90 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit experience for Aurora and Elgin cores; Tri-Cities curb and high-value fluency for Batavia–Geneva–St. Charles; honest Randall Road · I-88 · I-90 · IL-47 timing for cross-zone pairs. Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
