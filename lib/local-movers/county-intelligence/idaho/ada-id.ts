import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeIdPack } from '@/lib/local-movers/county-intelligence/idaho/id-shared';

/**
 * Ada County, ID — Boise metro core, foothills & Treasure Valley east (not Canyon rename, not Spokane/WA template).
 */
export const adaCountyIdIntelligence: CountyIntelligencePack = finalizeIdPack({
  countySlug: 'ada',
  hubTitle: 'Ada County Moving Intelligence Hub',
  eyebrow:
    'Ada · Boise ID capital metro · I-84 · US-20/26 · ID-55 · foothills elevation',
  h1: 'Moving in Ada County: Boise Neighborhoods, Foothills Access & Downtown–North End Logistics',
  heroOpener:
    'Ada County, Idaho is Boise capital metro — downtown and North End character stock, East End and foothills elevation, Bench and southwest growth HOAs, Meridian and Eagle corridor product — not a Canyon County Nampa rename, not a Spokane or Seattle template, and not a Salt Lake Valley clone. Foothills driveways above ~2,700–3,500 ft, winter approaches toward Bogus Basin and ID-55 mountain corridors, elevator-scarce core multi-unit, and I-84 / US-20/26 freeflow rewrite “local” estimates. A North End tree-canopy carry, a Hidden Springs hillside two-story, a downtown loft elevator job, and a Meridian HOA cul-de-sac do not share truck access or empty-mile risk. This hub is for people moving in Ada County, Idaho — Boise market realities, not a renamed Washington, Oregon, or Utah page.',
  heroCredibility:
    'IPUC household goods / motor carrier frameworks · FMCSA · Curated directory listings',
  majorCorridors: 'I-84 · US-20/26 · ID-55 · local Boise arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Ada County different',
    intro:
      'These are Boise capital-metro realities — foothills elevation, North End character access, growth HOAs, and multi-corridor timing — not Treasure Valley west defaults or a generic Mountain West template.',
    bullets: [
      {
        title: 'Foothills elevation and hillside stock rewrite labor hours',
        detail:
          'North End edges, East End, Boise foothills, and Hidden Springs–style approaches add pitch, limited turnaround, long carries, and winter ice risk. Flat-suburb optimism underprices these jobs — survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Downtown Boise multi-unit differs from Bench and Meridian SFH',
        detail:
          'Elevators, COI packets, scarce curb staging, and stair-heavy product dominate core jobs. A downtown loft is not a southwest Boise garage-friendly two-story or Meridian HOA tract.',
      },
      {
        title: 'I-84, US-20/26, ID-55, and the Boise arterial grid define portal time',
        detail:
          'Meridian ↔ downtown, Eagle ↔ Bench, or foothills ↔ airport pairs look local on maps and regional at peak. Price honestly — empty miles, construction, and winter mountain approaches stack fast.',
      },
      {
        title: 'Growth HOAs and outer belts are not core product',
        detail:
          'Meridian, Eagle, southwest Boise, and newer tracts mix HOA gate lists, truck-length limits, and different curb rules than North End walk-ups or downtown elevators.',
      },
      {
        title: 'Not Canyon County west, not Spokane/WA, not a Salt Lake rename',
        detail:
          'This is Ada County, Idaho — Boise capital metro. Nampa/Caldwell growth, Spokane inland-empire templates, and Wasatch Front pages use different access rules and corridors — survey each Ada address on its own terms.',
      },
      {
        title: 'Intrastate IPUC household goods / motor carrier frameworks vs interstate FMCSA',
        detail:
          'Moves entirely within Idaho by for-hire household goods carriers generally fall under Idaho Public Utilities Commission (IPUC) household goods / motor carrier frameworks — not Washington UTC, Oregon, Utah, Montana, Nevada NTA, or New Jersey rules. Match the legal name on the estimate to applicable IPUC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Ada County access zones',
  zonesIntro:
    'Plan by downtown / North End character core, East End & foothills elevation belts, Bench / southwest growth, and Meridian–Eagle corridor stock — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-north-end',
      name: 'Downtown Boise, North End & midtown character',
      shortName: 'Downtown / North End',
      neighborhoods: [
        'Downtown Boise',
        'North End',
        'Hyde Park edges',
        'Warm Springs / East End edges',
        'Boise River greenbelt approaches',
      ],
      housingTypes: 'Lofts, mid-rises, renovated multi-unit, denser walk-ups, character SFH',
      challenges: [
        'Elevators, COI, and timed building windows downtown',
        'Scarce curb staging and event-day / BSU-adjacent congestion',
        'Tree canopy, stairs, and tight North End approaches',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options, stair counts, and driveway pitch before final pricing.',
      cityKeywords: [
        'boise',
        'downtown boise',
        'north end',
        'hyde park',
        'warm springs',
      ],
    },
    {
      id: 'foothills-east-end-elevation',
      name: 'East End, Boise foothills & elevation approaches',
      shortName: 'Foothills / East End',
      neighborhoods: [
        'East End / foothills',
        'Table Rock approaches',
        'Hidden Springs edges',
        'Harris Ranch / Barber Valley edges',
        'Bogus Basin corridor approaches',
      ],
      housingTypes: 'Hillside SFH, elevation lots, some custom and gated product',
      challenges: [
        'Elevation pitch, limited truck turnaround, long carries',
        'Winter ice and mountain-approach risk on foothills roads',
        'Narrow private drives and HOA / gate constraints on some tracts',
      ],
      moverTips:
        'Survey driveway pitch, staging length, and winter access. Build weather buffers Nov–Mar. Confirm gate codes and truck-length limits early.',
      cityKeywords: [
        'east end',
        'foothills',
        'hidden springs',
        'harris ranch',
        'bogus basin',
      ],
    },
    {
      id: 'bench-southwest-growth',
      name: 'Bench, southwest Boise & growth HOA belts',
      shortName: 'Bench / SW Boise',
      neighborhoods: [
        'Boise Bench',
        'Southwest Boise',
        'Five Mile / Maple Grove corridors',
        'Newer HOA tracts',
        'I-84 south/west approaches',
      ],
      housingTypes: 'Mixed older SFH, newer tracts, townhomes, multi-family edges',
      challenges: [
        'HOA packets and truck-length limits on newer product',
        'I-84 and arterial peak congestion toward core',
        'Longer portal time on SW–downtown pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price SW–core pairs portal-to-portal. Avoid peak I-84 / arterial windows when flexible.',
      cityKeywords: [
        'boise bench',
        'southwest boise',
        'five mile',
        'maple grove',
        'boise',
      ],
    },
    {
      id: 'meridian-eagle-corridors',
      name: 'Meridian, Eagle & US-20/26 / ID-55 corridors',
      shortName: 'Meridian / Eagle',
      neighborhoods: [
        'Meridian',
        'Eagle',
        'Eagle Road / Fairview corridors',
        'US-20/26 west approaches',
        'ID-55 north approaches',
      ],
      housingTypes: 'Growth SFH, HOA tracts, some multi-family and townhome product',
      challenges: [
        'HOA gate lists and tract curb rules',
        'US-20/26 and Eagle Road freeflow into Boise core',
        'Winter mountain approaches north on ID-55 for foothills-adjacent jobs',
      ],
      moverTips:
        'Price Meridian/Eagle–Boise pairs with arterial buffers. Survey HOA access. Clarify elevation and ice risk on northbound ID-55 legs.',
      cityKeywords: [
        'meridian',
        'eagle',
        'eagle road',
        'fairview',
        'id-55',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Ada County moving costs',
    intro:
      'Foothills elevation access, core multi-unit friction, growth HOA rules, and corridor portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Foothills / East End long carries & elevation',
        detail: 'Pitch, turnaround limits, winter ice, and carry distance spike labor hours.',
      },
      {
        title: 'Downtown / North End elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'I-84 / US-20/26 / ID-55 congestion',
        detail: 'Portal-to-portal spikes at peak, construction, and winter approach windows.',
      },
      {
        title: 'Cross-zone empty miles (Meridian–core and foothills–Bench)',
        detail: 'Map-short pairs still bill regional time across the Treasure Valley grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,850+',
        note: 'Higher with elevators or foothills carries',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,450–$4,400+',
        note: 'Core and elevation friction trends up',
      },
      {
        label: '3–4+ BR / foothills / cross-metro',
        value: '$2,700–$8,800+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Ada County',
    intro:
      'Summer family peaks, multi-family lease turns, foothills winter ice, and wildfire-smoke afternoons reshape Boise windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-84 / arterial pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Meridian, Eagle, and North End Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown elevators and core curb fill first.',
      },
      {
        title: 'Winter foothills ice & mountain approaches',
        detail: 'Nov–Mar elevation jobs need weather buffers; ID-55 / Bogus Basin corridors can delay trucks.',
      },
    ],
  },
  specialized: [
    {
      id: 'boise-ada-foothills-capital-metro',
      title: 'Boise foothills & capital-metro module',
      intro:
        'Ada ID estimates fail when foothills elevation, core building packets, or I-84 / US-20/26 / ID-55 empty miles are ignored — and when crews treat this as a Canyon Nampa or Spokane/WA rename page.',
      bullets: [
        'Request downtown building packets early.',
        'Photo driveway pitch, turnaround, and winter access on foothills jobs.',
        'Price I-84 / US-20/26 / ID-55 pairs portal-to-portal.',
        'Clarify Ada vs Canyon destinations on multi-county Treasure Valley estimates.',
        'Verify IPUC-applicable authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Ada County?',
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
              'Boise School District, West Ada (Meridian), and other systems serve different addresses. Confirm zoning carefully — district lines shift block by block across Boise, Meridian, and Eagle.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Idaho State Department of Education data beat ranking screenshots.',
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
              'St. Luke’s Health System, Saint Alphonsus, and related campuses anchor core and corridor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Meridian, Eagle, and foothills belts into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs foothills SFH vs growth HOA stock',
            detail:
              'Downtown lofts, North End character homes, and Meridian/Eagle product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Foothills and renovated North End stock often prices differently from southwest multi-family or outer HOA tracts.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / North End lifestyle',
            detail: 'Walkable amenities with elevator, curb, canopy, and density tradeoffs.',
          },
          {
            title: 'Foothills / East End pattern',
            detail: 'Elevation views and hillside logistics near Bogus Basin approaches.',
          },
          {
            title: 'Meridian / Eagle / SW growth pattern',
            detail: 'More space, HOA rules, and different commute math to core jobs.',
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
              'State government, healthcare, tech and professional services, Boise State, logistics, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-84, US-20/26, ID-55, and local arterial peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Boise capital-metro identity',
            detail:
              'Ada is Idaho capital metro with foothills outdoor access — not Canyon west product alone, and not a Spokane or Salt Lake rename.',
          },
          {
            title: 'Climate & elevation',
            detail:
              'Semi-arid summers, cold winters with foothills ice, elevation ~2,700+ ft in core with higher foothills lots. Plan outdoor staging and winter contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Ada County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify IPUC-applicable Idaho household goods / motor carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Ada County, Idaho — official site',
        href: 'https://adacounty.id.gov/',
        external: true,
      },
      {
        label: 'City of Boise — official site',
        href: 'https://www.cityofboise.org/',
        external: true,
      },
      {
        label: 'ITD traffic & road conditions',
        href: 'https://511.idaho.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer foothills elevation access and core multi-unit experience with honest I-84 / US-20/26 / ID-55 pricing. Verify IPUC frameworks in-state and FMCSA interstate. This is Ada County ID (Boise) — not Canyon, Spokane/WA, or Salt Lake.',
  lastReviewed: '2026-07-24',
});
