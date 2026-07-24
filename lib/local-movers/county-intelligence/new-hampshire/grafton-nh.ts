import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNhPack,
  NH_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-hampshire/nh-shared';

/**
 * Grafton County, NH — Lebanon/Hanover Upper Valley / Dartmouth.
 * NOT southern NH density north; VT border pairs need FMCSA; winter mountain access.
 */
export const graftonCountyNhIntelligence: CountyIntelligencePack = finalizeNhPack({
  countySlug: 'grafton',
  hubTitle: 'Grafton County Moving Intelligence Hub',
  eyebrow:
    'Grafton County, NH · Upper Valley / Hanover–Lebanon & Dartmouth logistics',
  h1: 'Moving in Grafton County: Upper Valley Access, Hanover–Lebanon Density & Dartmouth Logistics',
  heroOpener:
    'Grafton County is New Hampshire’s Upper Valley and mountain north — Lebanon multi-unit and employment freeflow, Hanover / Dartmouth campus-adjacent product, Plymouth and Plymouth State contexts, Littleton northern edges, wide rural mountain townships, and Connecticut River pairs that regularly touch Vermont. I-89, I-91 links, US-4, and local Upper Valley grids rewrite “local” estimates when campus calendars, winter mountain access, and interstate authority stack on mixed housing. A Lebanon walk-up, a Hanover faculty home, a Plymouth multi-unit, and a mountain township farmhouse do not share truck access or crew skill. This hub is for people moving in Grafton County — not a southern NH density rename and not a Concord capital page.',
  heroCredibility:
    'NH DOS / Bureau Household Goods Carrier authority (RSA 359-T) for intrastate · FMCSA for interstate · Upper Valley & Dartmouth logistics awareness · Curated listings',
  majorCorridors: 'I-89 · I-91 links · US-4 · local Upper Valley grid',
  whatMakesDifferent: {
    title: 'What makes moving in Grafton County different',
    intro:
      'These are Grafton / Upper Valley realities — Hanover–Lebanon density, Dartmouth calendars, Vermont-border short hops needing FMCSA, mountain winter access, and rural empty miles — not Manchester mill density and not seacoast tourism stock.',
    bullets: [
      {
        title: 'This is Grafton — Upper Valley / Dartmouth, not southern NH north',
        detail:
          'Ignore Manchester–Nashua density templates and Concord capital-only scripts. Grafton is Lebanon multi-unit, Hanover campus product, Plymouth belts, Littleton edges, and mountain townships. Match estimates to Upper Valley and mountain addresses — not a generic “northern NH” rate.',
      },
      {
        title: 'Hanover / Dartmouth calendars reshape peaks',
        detail:
          'Academic year move-in and move-out waves, faculty relocations, and campus-adjacent multi-unit compress late summer and January windows. Mid-week early starts and written elevator rules matter more near Hanover than in pure rural townships.',
      },
      {
        title: 'Lebanon multi-unit and employment freeflow underprice curb optimism',
        detail:
          'Mixed multi-unit, medical-campus adjacency, scarce staging, and winter ice rewrite labor before packing skill matters. Rural mountain drives do not share that stack.',
      },
      {
        title: 'Vermont-border and Connecticut River pairs need FMCSA',
        detail:
          'Upper Valley households regularly move New Hampshire ↔ Vermont across short river distances. Any leg into Vermont needs active FMCSA USDOT (and usually MC) — New Hampshire household goods authority alone does not authorize interstate delivery.',
      },
      {
        title: 'I-89, I-91 links, and US-4 burn portal-to-portal hours',
        detail:
          'Lebanon ↔ Hanover, Lebanon ↔ Plymouth, or Littleton ↔ Upper Valley pairs look manageable and still burn real portal time — longer in winter mountain weather. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter mountain ice and snow are operational constraints',
        detail:
          'December–March ice, steep unplowed approaches, low clearances, and I-89 / mountain secondary-road delays reshape access and crew availability. Prefer early starts, flexible dates, and weather contingency on rural and hillside stock.',
      },
      NH_REG_BULLET,
    ],
  },
  zonesHeading: 'Grafton County access zones',
  zonesIntro:
    'Plan by Lebanon multi-unit and employment corridors, Hanover / Dartmouth campus product, Plymouth belts, Littleton northern edges, rural mountain townships, and Connecticut River / Vermont-adjacent edges — access rules cluster by campus density vs mountain product more than ZIP alone.',
  zones: [
    {
      id: 'lebanon-multi-unit',
      name: 'Lebanon multi-unit, medical campus & Upper Valley freeflow',
      shortName: 'Lebanon / core',
      neighborhoods: [
        'Downtown Lebanon edges',
        'Medical campus-adjacent belts',
        'Multi-unit pockets',
        'I-89 approach corridors',
        'West Lebanon edges',
        'Employment freeflow residential',
      ],
      housingTypes: 'Multi-unit, limited elevators, mixed SFH, townhomes',
      challenges: [
        'Scarce curb, elevator COIs, and winter ice on exterior access',
        'I-89 freeflow into load windows',
        'Healthcare and employment calendar peaks',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Photo curb staging early. Prefer mid-week early freight windows near medical campuses.',
      cityKeywords: [
        'lebanon',
        'lebanon nh',
        'west lebanon',
      ],
    },
    {
      id: 'hanover-dartmouth',
      name: 'Hanover, Dartmouth campus-adjacent & character grids',
      shortName: 'Hanover / Dartmouth',
      neighborhoods: [
        'Hanover',
        'Dartmouth campus-adjacent multi-unit',
        'Faculty and residential character blocks',
        'Downtown Hanover edges',
        'Connecticut River approaches',
        'Village multi-unit pockets',
      ],
      housingTypes: 'Campus multi-unit, character SFH, limited elevators, mixed condo',
      challenges: [
        'Academic calendar peaks and short load windows',
        'Tight village curb and truck-length limits',
        'VT-border short hops needing FMCSA',
      ],
      moverTips:
        'Align with academic calendars. Survey curb and stairs with photos. Clarify NH-only vs Vermont-crossing estimates early.',
      cityKeywords: [
        'hanover',
        'hanover nh',
      ],
    },
    {
      id: 'plymouth',
      name: 'Plymouth, Plymouth State contexts & central mountain belts',
      shortName: 'Plymouth',
      neighborhoods: [
        'Plymouth',
        'Plymouth State-adjacent multi-unit',
        'Main Street village edges',
        'I-93 approach corridors',
        'Holderness edges',
        'Central mountain residential',
      ],
      housingTypes: 'Student multi-unit limited, SFH, village stock, rural-residential',
      challenges: [
        'Semester and school-calendar peaks',
        'Longer empty miles to Upper Valley cores',
        'I-93 / mountain weather freeflow',
      ],
      moverTips:
        'Align with campus and school calendars when relevant. Price empty miles and winter contingency. Survey multi-unit stairs where present.',
      cityKeywords: [
        'plymouth',
        'plymouth nh',
        'holderness',
      ],
    },
    {
      id: 'littleton-northern-edges',
      name: 'Littleton, Bethlehem & northern mountain edges',
      shortName: 'Littleton / north',
      neighborhoods: [
        'Littleton',
        'Bethlehem edges',
        'Franconia approach pockets',
        'I-93 northern corridors',
        'Northern village multi-unit limited',
        'Mountain residential edges',
      ],
      housingTypes: 'SFH, village multi-unit limited, rural-residential, seasonal mix',
      challenges: [
        'Long empty miles to Lebanon–Hanover cores',
        'Mountain winter access and secondary roads',
        'I-93 freeflow and weather delays',
      ],
      moverTips:
        'Price empty miles and winter mountain access honestly. Survey driveway grade and plow status. Prefer flexible storm windows.',
      cityKeywords: [
        'littleton',
        'bethlehem',
        'franconia',
      ],
    },
    {
      id: 'rural-mountain-townships',
      name: 'Canaan, Enfield, Lyme & rural mountain townships',
      shortName: 'Rural mountain',
      neighborhoods: [
        'Canaan edges',
        'Enfield edges',
        'Lyme edges',
        'Orford / Piermont pockets',
        'Rural mountain townships',
        'Secondary road networks',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit, hillside stock',
      challenges: [
        'Steep drives, low clearances, and winter unplowed approaches',
        'Long empty miles to Lebanon multi-unit docks',
        'US-4 / secondary road freeflow and weather risk',
      ],
      moverTips:
        'Survey driveway grade, width, bridge limits, and plow status with photos. Price empty miles and weather contingency honestly. Use smaller trucks when geometry demands.',
      cityKeywords: [
        'canaan',
        'enfield',
        'lyme',
      ],
    },
    {
      id: 'connecticut-river-edges',
      name: 'Connecticut River edges & Vermont-adjacent pairs',
      shortName: 'River / VT edges',
      neighborhoods: [
        'River-adjacent residential',
        'Hanover–Norwich approach pairs',
        'Lebanon–Hartford VT freeflow pairs',
        'US-4 river corridors',
        'Border multi-unit limited pockets',
        'Upper Valley cross-river belts',
      ],
      housingTypes: 'Mixed SFH, multi-unit limited, character stock on both sides of the river',
      challenges: [
        'Interstate authority when any leg enters Vermont',
        'Short map miles with real portal and bridge freeflow',
        'Winter ice on river approaches and village curb',
      ],
      moverTips:
        'State origin and destination states on every estimate. Verify FMCSA for any Vermont leg. Price bridge and river freeflow honestly even when miles look local.',
      cityKeywords: [
        'hanover',
        'lebanon',
        'upper valley',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Grafton County moving costs',
    intro:
      'Campus multi-unit peaks, mountain driveway geometry, rural empty miles, winter access, and I-89 / VT-border freeflow move the number more than packing skill alone — this is Upper Valley logistics, not southern NH density defaults.',
    drivers: [
      {
        title: 'Campus multi-unit elevators, curb limits & academic peaks',
        detail:
          'Hanover / Dartmouth and Plymouth State-adjacent product compress calendars and add COI labor that flat-rate optimism underprices.',
      },
      {
        title: 'Lebanon multi-unit, medical adjacency & winter ice',
        detail:
          'Employment-core multi-unit adds stair, curb, and weather risk before packing skill matters.',
      },
      {
        title: 'Mountain driveway grade, plow status & truck geometry',
        detail:
          'Rural hillside and township product fails estimates written for flat suburban ranches.',
      },
      {
        title: 'I-89 · I-91 links · US-4 congestion & weather',
        detail:
          'Cross-county and mountain pairs burn portal-to-portal hours even when map miles look short — worse in winter.',
      },
      {
        title: 'Vermont-border & interstate empty miles',
        detail:
          'Connecticut River pairs and long northern destinations raise staging distance and FMCSA authority complexity when leaving New Hampshire.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$2,000+',
        note: 'Higher with campus elevators, mountain access, or peak I-89 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,800+',
        note: 'Stairs, academic timing, and winter soft costs trend up',
      },
      {
        label: '3–4+ BR / mountain / cross-zone / VT pair',
        value: '$3,000–$10,000+',
        note: 'Mountain access, long empty miles, and interstate pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$210+/hr',
        note: 'Portal-to-portal; packing, stairs, mountain access, and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Grafton County move',
    intro:
      'Dartmouth and Plymouth State calendars, healthcare employment cycles, mountain tourism shoulders, and long Upper Valley winters reshape access and crew availability across Grafton.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear multi-unit curb, ease freight windows, and reduce I-89 pain. Avoid month-end Fridays and peak academic move-in weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (plus academic waves)',
        detail:
          'Family school calendars, apartment turnover, and Dartmouth / Plymouth State waves fill first. Book 2–4 weeks ahead for peak weekends and elevator slots near Hanover and Lebanon.',
      },
      {
        title: 'Winter mountain ice, snow & corridor delays',
        detail:
          'December–March ice, steep unplowed approaches, and I-89 / mountain secondary-road slowdowns raise cancellation and labor risk. Prefer flexible dates, early starts, smaller trucks when grade demands, and covered staging when forecasts allow.',
      },
      {
        title: 'Shoulder seasons & off-peak mountain value',
        detail:
          'October–April (outside holiday weeks, storm windows, and semester turnovers) often improves crew availability if mountain winter access is planned honestly.',
      },
    ],
  },
  specialized: [
    {
      id: 'upper-valley-dartmouth',
      title: 'Upper Valley multi-unit, Dartmouth & I-89 / VT-border logistics module',
      intro:
        'Grafton estimates fail more often on campus calendars, multi-unit COIs, mountain driveway surveys, and interstate freeflow than on packing skill alone.',
      bullets: [
        'Align Hanover / Dartmouth multi-unit jobs with academic calendars; book elevators and COIs early.',
        'Survey curb, stairs, and winter exterior access for Lebanon multi-unit with photos.',
        'Survey driveway grade, width, plow status, and turnaround for mountain township product early — use appropriate truck size.',
        'Price portal-to-portal time for any pair that rides I-89, I-91 links, or US-4 at peak — longer in winter mountain weather.',
        'State origin and destination states clearly for Connecticut River pairs; verify FMCSA when any leg enters Vermont.',
        'For in-state jobs verify New Hampshire household goods carrier authority under RSA 359-T frameworks; New Hampshire authority alone does not authorize Vermont delivery.',
      ],
    },
    {
      id: 'not-southern-nh-not-concord',
      title: 'Not southern NH density · not Concord capital-only module',
      intro:
        'A single “northern NH rate” collapses when Upper Valley / Dartmouth product is confused with Manchester mill logistics or Concord capital workforce calendars alone.',
      bullets: [
        'Do not price Hanover campus multi-unit like Manchester mill conversions or like downtown Concord capital product as interchangeable defaults.',
        'State the market as Grafton County / Upper Valley on every estimate — disambiguate from Hillsborough southern density and Merrimack capital product.',
        'Keep Vermont-border pairs explicit — short river miles still require interstate authority when any leg leaves New Hampshire.',
        'Match academic peaks separately from pure rural mountain and tourism shoulder windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Grafton County?',
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
              'Grafton spans Hanover, Lebanon, Plymouth, Littleton, and multiple rural SAU systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus. Dartmouth College and Plymouth State University are higher-education anchors, not K–12 districts.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive near Upper Valley employment cores. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, New Hampshire Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Dartmouth Hitchcock Medical Center and regional specialty campuses anchor care for the Upper Valley and much of northern New Hampshire. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times to preferred campuses — I-89, mountain secondary roads, and weather change “nearby” on paper. Transfer records early.',
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
              'Expect Lebanon multi-unit and employment-adjacent stock; Hanover character SFH and campus multi-unit; Plymouth village and student product; Littleton northern edges; wide rural mountain and Connecticut River residential.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by Upper Valley core vs remote mountain product. Budget for heating costs, older-building repair risk, and competitive rental seasons near Dartmouth and medical employment.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits near Hanover and Lebanon. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Lebanon multi-unit / employment lifestyle',
            detail:
              'Suits people prioritizing medical and professional access — with multi-unit curb, stair, and winter-access tradeoffs on move day.',
          },
          {
            title: 'Hanover / Dartmouth living',
            detail:
              'Often appeals for campus and village character — with academic calendars, curb limits, and Vermont-border commute awareness.',
          },
          {
            title: 'Plymouth / central mountain living',
            detail:
              'Fits households seeking college-town and mountain access — with longer portal time to Upper Valley cores and winter logistics.',
          },
          {
            title: 'Littleton / rural mountain living',
            detail:
              'Attracts buyers chasing space and northern character — with empty miles, steep drives, and plow-dependent approaches.',
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
              'Dartmouth Hitchcock and healthcare, Dartmouth College, professional services, education (including Plymouth State), tourism and hospitality, and Upper Valley retail concentrate demand — with Vermont reverse-commute patterns common.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-89, I-91 links, US-4, and mountain secondary freeflow is real — including winter weather and Vermont reverse pairs. Test peak and winter routes before choosing solely on rent or purchase price.',
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
              'Grafton is New Hampshire’s Upper Valley and mountain north — Hanover–Lebanon employment and academic density, Plymouth belts, and rural mountain townships — not southern NH corridor density and not Concord capital-only rhythm.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / mountain climate with warm summers, long freeze-thaw winters, heavy snow, ice, and steep access constraints. Plan outdoor staging and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — academic calendars, healthcare shifts, tourism shoulders, and winter storms reshape daily rhythm across the Upper Valley.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Grafton County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify New Hampshire household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Grafton County, New Hampshire',
        href: 'https://www.graftoncountynh.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Lebanon',
        href: 'https://lebanonnh.gov/',
        external: true,
        note: 'Upper Valley employment municipality context',
      },
      {
        label: 'Town of Hanover',
        href: 'https://www.hanovernh.org/',
        external: true,
        note: 'Dartmouth-adjacent municipality context',
      },
      {
        label: 'Town of Plymouth',
        href: 'https://www.plymouthnh.org/',
        external: true,
        note: 'Central mountain municipality context',
      },
      {
        label: '511 NH — traveler information',
        href: 'https://www.511nh.com/',
        external: true,
        note: 'I-89 / US-4 / mountain corridors before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit and elevator fluency for Lebanon; academic-calendar and village curb skill for Hanover / Dartmouth product; mountain driveway grade and winter plow fluency for rural townships; honest I-89 · I-91 links · US-4 timing for cross-zone pairs; FMCSA readiness for Vermont-border short hops. Verify New Hampshire household goods carrier authority under RSA 359-T frameworks for intrastate moves and FMCSA for interstate legs (including Vermont pairs) before deposits. This is Grafton County / Upper Valley — not southern NH density and not Concord capital defaults.',
  lastReviewed: '2026-07-24',
});
