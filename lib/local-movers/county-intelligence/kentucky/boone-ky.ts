import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKyPack,
  KY_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kentucky/ky-shared';

/**
 * Boone County, KY — Florence / CVG airport growth / western NKY.
 * NOT a Kenton (Covington) clone. NOT Louisville north.
 */
export const booneCountyKyIntelligence: CountyIntelligencePack = finalizeKyPack({
  countySlug: 'boone',
  hubTitle: 'Boone County Moving Intelligence Hub',
  eyebrow:
    'Boone County · Florence growth, CVG approaches & I-71/75 / KY-18 logistics',
  h1: 'Moving in Boone County: Florence Growth Access, CVG Corridors & Western NKY Logistics',
  heroOpener:
    'Boone County, Kentucky is Florence–Union–Hebron growth on the western Northern Kentucky collar — not a Kenton County Covington riverfront clone, not Louisville north, and not Lexington horse-country. Expect multi-family belts near Florence Mall and KY-18, airport-adjacent Hebron logistics, Union and Richwood HOA growth, Burlington county-seat stock, and I-71/75 / I-275 / KY-18 / KY-237 / CVG approaches that rewrite “local” estimates. A Florence townhome gate list, a Hebron long-driveway approach under flight paths, a Union cul-de-sac, and a Burlington older grid do not share truck access or crew skill. Ohio-side and airport-schedule freeflow are real inputs. This hub is for people moving in Boone County — Florence/CVG airport growth — not a renamed Covington page.',
  heroCredibility:
    'KYTC Division of Motor Carriers household goods certificate for intrastate · FMCSA for interstate · Florence growth & CVG approach logistics awareness · Curated listings',
  majorCorridors: 'I-71/75 · I-275 · KY-18 · KY-237 · CVG approaches',
  whatMakesDifferent: {
    title: 'What makes moving in Boone County different',
    intro:
      'These are western NKY growth realities — Florence multi-family, CVG airport approaches, Union HOAs, and KY-18 freeflow — not Covington riverfront stairs alone and not Louisville Jefferson product.',
    bullets: [
      {
        title: 'Florence/CVG growth is not a Kenton Covington clone',
        detail:
          'Ignore Mainstrasse walk-up defaults as the county template. Boone stacks airport-adjacent multi-family, HOA cul-de-sacs, and KY-18 / KY-237 freeflow that riverfront historic product does not share — even when “NKY” marketing groups both counties.',
      },
      {
        title: 'CVG approaches and Hebron logistics rewrite timing',
        detail:
          'Airport freeflow, freight traffic, and KY-237 / I-275 spikes turn short map miles into billable hours. Prefer off-peak windows when flexible.',
      },
      {
        title: 'Florence multi-family and HOA product is not Burlington town stock',
        detail:
          'Gate lists, truck-length limits, and newer multi-unit rules differ from older county-seat grids and rural-edge driveways. Same-county jobs still need product-specific surveys.',
      },
      {
        title: 'I-71/75, I-275, KY-18, and KY-237 burn portal time',
        detail:
          'Florence ↔ Union, Hebron ↔ Burlington, or Mall Road ↔ Ohio-side pairs look local and still burn 20–55+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not Louisville north',
        detail:
          'Do not apply I-264 East End or Jeffersontown HOA templates as defaults. Boone’s corridors, airport adjacency, and Cincinnati-metro reverse-commute patterns are NKY-specific.',
      },
      {
        title: 'Ohio-side and multi-county pairs are routine interstate or multi-market jobs',
        detail:
          'Households regularly move Boone ↔ Hamilton County OH, Kenton, Campbell, or farther on I-71/75. A Kentucky household goods certificate alone does not authorize Ohio delivery — verify FMCSA. Do not substitute OH PUCO for KYTC on Kentucky intrastate legs.',
      },
      KY_REG_BULLET,
    ],
  },
  zonesHeading: 'Boone County access zones',
  zonesIntro:
    'Plan by Florence multi-family and retail corridors, Hebron–CVG approach belts, Union–Richwood HOA growth, Burlington county-seat stock, Walton southern edges, and I-71/75 commercial-residential cutters.',
  zones: [
    {
      id: 'florence-multi-family',
      name: 'Florence multi-family, Mall Road & KY-18 growth belts',
      shortName: 'Florence',
      neighborhoods: [
        'Florence',
        'Mall Road corridors',
        'KY-18 corridors',
        'Houston Road edges',
        'Turfway edges',
        'Florence multi-unit belts',
      ],
      housingTypes: 'Townhomes, multi-family, HOA SFH, some older ranch stock',
      challenges: [
        'HOA timed windows and truck limits',
        'I-71/75 / KY-18 freeflow at peak',
        'Retail-corridor staging limits',
      ],
      moverTips:
        'Collect HOA packets early. Price KY-18 and I-71/75 honestly. Clarify Florence multi-unit vs SFH access on the survey.',
      cityKeywords: [
        'florence',
        'mall road',
      ],
    },
    {
      id: 'hebron-cvg',
      name: 'Hebron, CVG approaches & airport-adjacent stock',
      shortName: 'Hebron / CVG',
      neighborhoods: [
        'Hebron',
        'CVG approach corridors',
        'KY-237 corridors',
        'Airport industrial edges',
        'Petersburg edges',
        'North Bend edges',
      ],
      housingTypes: 'SFH, multi-unit, larger-lot and industrial-adjacent residential',
      challenges: [
        'Airport freeflow and freight traffic spikes',
        'Longer empty miles vs Florence core on some pairs',
        'Mixed driveway product and weather-sensitive edges',
      ],
      moverTips:
        'Avoid peak airport windows when flexible. Photo driveway access. Price KY-237 / I-275 honestly for southbound unload pairs.',
      cityKeywords: [
        'hebron',
        'petersburg',
        'cvg',
      ],
    },
    {
      id: 'union-richwood',
      name: 'Union, Richwood & southern HOA growth',
      shortName: 'Union / Richwood',
      neighborhoods: [
        'Union',
        'Richwood',
        'US-42 corridors',
        'Triple Crown edges',
        'Hampton Ridge edges',
        'Southern HOA pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'US-42 / I-75 freeflow',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price southern approach freeflow for Florence unload pairs.',
      cityKeywords: [
        'union',
        'richwood',
      ],
    },
    {
      id: 'burlington-county-seat',
      name: 'Burlington county-seat stock & central corridors',
      shortName: 'Burlington',
      neighborhoods: [
        'Burlington',
        'Central Boone corridors',
        'KY-18 west corridors',
        'Camp Ernst edges',
        'Gunpowder edges',
        'County-seat residential grids',
      ],
      housingTypes: 'Older SFH, small multi-unit, larger-lot edges',
      challenges: [
        'Mixed small-town curb product',
        'KY-18 freeflow and empty miles vs Florence multi-family',
        'Longer staging distance for some metro crews',
      ],
      moverTips:
        'Price empty miles honestly for Florence unload pairs. Confirm approach photos. Clarify Burlington vs unincorporated addresses.',
      cityKeywords: [
        'burlington',
      ],
    },
    {
      id: 'walton-south',
      name: 'Walton, southern larger-lot & I-75 south edges',
      shortName: 'Walton / south',
      neighborhoods: [
        'Walton',
        'I-75 south corridors',
        'Southern rural-edge pockets',
        'Beaver Road edges',
        'Verona edges',
        'Southern larger-lot stock',
      ],
      housingTypes: 'SFH, larger lots, limited multi-unit, rural-edge approaches',
      challenges: [
        'Longer empty miles and narrower approaches',
        'I-75 freeflow',
        'Gravel and soft-edge risk in weather',
      ],
      moverTips:
        'Confirm approach width and turnarounds with photos. Price southern empty miles honestly. Plan weather contingency.',
      cityKeywords: [
        'walton',
        'verona',
      ],
    },
    {
      id: 'i71-commercial-cutters',
      name: 'I-71/75 commercial-residential cutters & retail edges',
      shortName: 'I-71/75 cutters',
      neighborhoods: [
        'I-71/75 corridor edges',
        'Florence industrial-residential mix',
        'Houston Road commercial edges',
        'Mineola Pike edges',
        'Turfway commercial edges',
        'I-275 belt edges',
      ],
      housingTypes: 'Mixed multi-unit, SFH, commercial-adjacent residential',
      challenges: [
        'I-71/75 / I-275 freeflow and retail traffic spikes',
        'Mixed curb and driveway product',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Price freeways honestly. Confirm commercial-adjacent staging limits. Clarify load and unload city lines.',
      cityKeywords: [
        'florence',
        'hebron',
        'erlanger edges',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Boone County moving costs',
    intro:
      'HOA multi-family admin, CVG approach freeflow, and I-71/75 empty miles move the number more than packing skill alone — this is Florence/CVG growth logistics, not Covington riverfront defaults.',
    drivers: [
      {
        title: 'HOA gates, multi-family windows & truck rules',
        detail:
          'Florence and Union product adds schedule risk before packing skill matters.',
      },
      {
        title: 'CVG / KY-237 airport freeflow',
        detail:
          'Hebron and approach corridors burn portal time even when map miles look short.',
      },
      {
        title: 'I-71/75 · I-275 · KY-18 congestion',
        detail:
          'Cross-zone pairs and retail peaks rewrite “local” estimates.',
      },
      {
        title: 'Rural-edge driveways & southern empty miles',
        detail:
          'Walton and larger-lot approaches add carry distance and weather risk.',
      },
      {
        title: 'Ohio-side & multi-county empty miles',
        detail:
          'Hamilton County OH, Kenton, and Campbell destinations raise staging distance and authority complexity when leaving Kentucky.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with HOA windows or peak I-71/75 pairs',
      },
      {
        label: '2–3BR condo, townhome, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'HOA soft costs and multi-family access trend up',
      },
      {
        label: '3–4+ BR / cross-zone / airport peak',
        value: '$2,700–$8,500+',
        note: 'Long CVG-approach and interstate pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and access scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Boone County move',
    intro:
      'Lease cycles, school calendars, airport freeflow, summer heat, severe-storm season, and winter ice reshape access and crew availability across Florence and western NKY.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear HOA windows, ease retail-corridor staging, and reduce I-71/75 pain. Avoid month-end Fridays when multi-family turnovers collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Airport & holiday freeflow spikes',
        detail:
          'Travel peaks around CVG compress Hebron and I-275 approaches. Prefer flexible dates near airport-adjacent load addresses.',
      },
      {
        title: 'Summer heat, storms & winter ice',
        detail:
          'June–August heat and thunderstorms raise cancellation risk; winter ice affects longer driveways. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'boone-florence-cvg',
      title: 'Florence multi-family, CVG approach & KY-18 logistics module',
      intro:
        'Boone County estimates fail more often on HOA packets, airport freeflow, and freeway empty miles than on packing skill alone.',
      bullets: [
        'Collect HOA packets, gate codes, and truck-length rules before the survey is final for Florence and Union product.',
        'Price portal-to-portal time for any pair that rides I-71/75, I-275, KY-18, or KY-237 at peak — especially CVG approaches.',
        'Avoid peak airport windows for Hebron loads when flexible.',
        'Photo rural-edge driveway width and turnarounds for Walton and larger-lot stock.',
        'Clarify Florence, Union, Hebron, Burlington, and Walton addresses on every estimate.',
        'For in-state jobs verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR); verify FMCSA for any out-of-state leg — especially Ohio-side pairs. Do not substitute OH PUCO for Kentucky intrastate authority.',
      ],
    },
    {
      id: 'not-kenton-clone-not-louisville',
      title: 'Not Kenton riverfront clone · not Louisville north module',
      intro:
        'A single “NKY rate” collapses when Florence/CVG growth product is confused with Covington riverfront logistics or Louisville Jefferson East End HOAs.',
      bullets: [
        'Do not price Florence townhomes like Mainstrasse walk-ups or like Jeffersontown cul-de-sacs as interchangeable defaults.',
        'Keep Boone vs Kenton vs Campbell county lines clear on multi-address estimates.',
        'Match multi-family lease peaks separately from Union school-calendar waves.',
        'Treat Ohio River and state-line legs as interstate authority problems — KYTC alone is not enough for Ohio delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Boone County?',
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
              'Boone County Schools covers most of the county, with growth-area enrollment pressure in Florence, Union, and Hebron belts. Assignment is address-based — marketing subdivision names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and growth-boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Kentucky Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'St. Elizabeth Healthcare campuses across NKY, Cincinnati-side systems for some households, and specialty care anchor options. Confirm insurance networks — including Ohio providers if relevant.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-71/75 and I-275 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Florence multi-family and HOA growth; Hebron airport-adjacent SFH; Union–Richwood newer product; Burlington county-seat stock; Walton larger-lot and rural-edge homes.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by growth belt vs older town stock. Budget for HOA dues, multi-family fees, and longer-commute tradeoffs where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Florence multi-family & retail convenience',
            detail:
              'Suits people prioritizing amenities and I-71/75 access — with HOA rules and retail freeflow on move day.',
          },
          {
            title: 'Hebron / CVG-adjacent living',
            detail:
              'Often appeals for airport and logistics workers — with freeflow and industrial-adjacent tradeoffs.',
          },
          {
            title: 'Union / Richwood growth living',
            detail:
              'Attracts households seeking newer product and schools — with HOA packets and longer empty miles to some job centers.',
          },
          {
            title: 'Burlington / Walton town & edge living',
            detail:
              'Fits buyers chasing relative space and small-town feel — with longer staging distance to Florence multi-family cores.',
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
              'CVG airport and logistics, Amazon and industrial corridors, retail, healthcare, and Cincinnati CBD reverse-commute professional services concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-71/75 freeflow is real — including Ohio-side reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Boone County stacks Florence growth, CVG airport adjacency, and western NKY suburbs — different from Covington riverfront Kenton product and from Louisville Jefferson patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental-to-subtropical transition climate with hot summers, severe-storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, airport travel spikes, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Boone County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KYTC Division of Motor Carriers household goods licensing for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Boone County, Kentucky — official site',
        href: 'https://www.boonecountyky.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Florence',
        href: 'https://florence-ky.gov/',
        external: true,
        note: 'Growth municipality permits & services',
      },
      {
        label: 'Cincinnati/Northern Kentucky International Airport (CVG)',
        href: 'https://www.cvgairport.com/',
        external: true,
        note: 'Airport approach & travel freeflow context',
      },
      {
        label: 'GOKY — Kentucky 511 traveler info',
        href: 'https://goky.ky.gov/',
        external: true,
        note: 'I-71/75 / I-275 / KY-18 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA multi-family fluency for Florence–Union product; airport-approach timing awareness for Hebron–CVG belts; small-town and rural-edge skill for Burlington–Walton stock; honest I-71/75 · I-275 · KY-18 · KY-237 timing for cross-zone pairs. Verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR) for intrastate moves and FMCSA for interstate legs (including Ohio-side pairs) before deposits.',
  lastReviewed: '2026-07-24',
});
