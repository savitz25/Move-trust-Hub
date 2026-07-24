import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNhPack,
  NH_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-hampshire/nh-shared';

/**
 * Strafford County, NH — Dover–Rochester / Spaulding Turnpike.
 * NOT Rockingham seacoast clone only; UNH Durham adjacency matters.
 */
export const straffordCountyNhIntelligence: CountyIntelligencePack = finalizeNhPack({
  countySlug: 'strafford',
  hubTitle: 'Strafford County Moving Intelligence Hub',
  eyebrow:
    'Strafford County, NH · Dover–Rochester / Spaulding Turnpike & UNH adjacency',
  h1: 'Moving in Strafford County: Dover–Rochester Access, Spaulding Turnpike Density & UNH Logistics',
  heroOpener:
    'Strafford County is New Hampshire’s Spaulding Turnpike inland belt — Dover multi-unit and mill-adjacent stock, Rochester residential and commercial freeflow, Somersworth edges, Durham / University of New Hampshire adjacency with semester cycles, Barrington–Lee growth and rural edges, and northern township belts. NH-16 (Spaulding), US-4, and local Dover–Rochester grids rewrite “local” estimates when mill stairs, student-calendar peaks, and winter ice stack on mixed access product. A Dover walk-up, a Rochester ranch, a Durham student multi-unit, and a Barrington driveway do not share truck access or crew skill. This hub is for people moving in Strafford County — not a Portsmouth seacoast rename and not a Manchester density page.',
  heroCredibility:
    'NH DOS / Bureau Household Goods Carrier authority (RSA 359-T) for intrastate · FMCSA for interstate · Dover–Rochester & Spaulding logistics awareness · Curated listings',
  majorCorridors: 'NH-16 (Spaulding) · US-4 · local Dover/Rochester grid',
  whatMakesDifferent: {
    title: 'What makes moving in Strafford County different',
    intro:
      'These are Strafford / Dover–Rochester realities — mill multi-unit density, Spaulding Turnpike freeflow, UNH semester cycles near Durham, and NH winter ice — not Portsmouth coastal tourism stock alone and not Concord capital workforce defaults.',
    bullets: [
      {
        title: 'This is Strafford — Dover–Rochester inland, not seacoast-only defaults',
        detail:
          'Ignore Hampton Beach tourism-only templates and Manchester mill-only scripts. Strafford mixes Dover multi-unit, Rochester belts, Somersworth edges, and Durham/UNH adjacency. Match estimates to Spaulding corridor addresses — not a generic “seacoast NH” rate.',
      },
      {
        title: 'Dover mill multi-unit underprices flat-rate optimism',
        detail:
          'Older mill-adjacent walk-ups, scarce curb, multi-flight stairs, and winter ice rewrite labor before packing skill matters. Elevator buildings still need reservations and COIs that ranch suburbs never see.',
      },
      {
        title: 'Durham / UNH semester cycles reshape calendars',
        detail:
          'Move-in and move-out waves near campus multi-unit compress August, January, and mid-semester windows. Mid-week early starts and written elevator rules matter more near Durham than in pure suburban belts.',
      },
      {
        title: 'Rochester and Somersworth product is not Dover-simple',
        detail:
          'Mixed multi-unit, SFH, and commercial freeflow across short distances fail estimates written for one downtown only. Confirm municipality and truck access on every survey.',
      },
      {
        title: 'NH-16 (Spaulding) and US-4 burn portal-to-portal hours',
        detail:
          'Dover ↔ Rochester, Durham ↔ Barrington, or Somersworth ↔ Dover pairs look short and still burn 20–45+ minutes at peak — longer in winter weather and seacoast-adjacent reverse freeflow. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice and snow are operational constraints, not footnotes',
        detail:
          'December–March ice on mill exterior stairs, plow-dependent northern and Barrington–Lee edges, and Spaulding delays reshape access. Prefer early starts, flexible dates, and weather contingency on older stock.',
      },
      NH_REG_BULLET,
    ],
  },
  zonesHeading: 'Strafford County access zones',
  zonesIntro:
    'Plan by Dover multi-unit and mill-adjacent product, Rochester belts, Somersworth edges, Durham / UNH adjacency, Barrington–Lee growth, and rural northern townships — access rules cluster by multi-unit era and campus calendars more than ZIP alone.',
  zones: [
    {
      id: 'dover-multi-unit',
      name: 'Dover multi-unit, mill stock & downtown freeflow',
      shortName: 'Dover / core',
      neighborhoods: [
        'Downtown Dover',
        'Mill and mill-adjacent belts',
        'Central Avenue corridors',
        'Dover multi-unit pockets',
        'Cocheco river edges',
        'Residential walk-up blocks',
      ],
      housingTypes: 'Mill conversions, walk-up multifamily, limited elevators, mixed older SFH',
      challenges: [
        'Multi-flight stairs, scarce curb, and winter ice on exterior access',
        'Elevator reservations and building COIs where present',
        'NH-16 / local grid freeflow into load windows',
      ],
      moverTips:
        'Survey stair counts with photos. Book elevators and COIs in writing when required. Prefer mid-week early freight windows.',
      cityKeywords: [
        'dover',
        'dover nh',
      ],
    },
    {
      id: 'rochester',
      name: 'Rochester residential, multi-unit & commercial freeflow',
      shortName: 'Rochester',
      neighborhoods: [
        'Downtown Rochester edges',
        'Rochester multi-unit pockets',
        'NH-11 / Spaulding approach corridors',
        'Northern Rochester residential',
        'Southern Rochester belts',
        'Commercial freeflow edges',
      ],
      housingTypes: 'Multi-unit limited, SFH, mixed older stock, townhomes',
      challenges: [
        'Mixed curb and driveway access across short distances',
        'Spaulding freeflow and empty miles to Dover docks',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Clarify exact Rochester address and truck access. Price Spaulding portal time. Survey stairs where multi-unit appears.',
      cityKeywords: [
        'rochester',
        'rochester nh',
      ],
    },
    {
      id: 'somersworth',
      name: 'Somersworth edges & tri-city fringe belts',
      shortName: 'Somersworth',
      neighborhoods: [
        'Somersworth',
        'Downtown Somersworth edges',
        'High Street corridors',
        'Multi-unit limited pockets',
        'Maine-adjacent pairs',
        'Tri-city fringe residential',
      ],
      housingTypes: 'Multi-unit limited, older SFH, mixed stock',
      challenges: [
        'Village curb limits and older stair product',
        'Cross-zone freeflow into Dover or Rochester',
        'Interstate authority when any leg enters Maine',
      ],
      moverTips:
        'Confirm Somersworth vs Dover addresses. Survey curb and stairs. Verify FMCSA when any leg leaves New Hampshire into Maine.',
      cityKeywords: [
        'somersworth',
      ],
    },
    {
      id: 'durham-unh',
      name: 'Durham, UNH adjacency & campus multi-unit',
      shortName: 'Durham / UNH',
      neighborhoods: [
        'Durham',
        'UNH campus-adjacent multi-unit',
        'Main Street village edges',
        'Student rental belts',
        'US-4 corridors',
        'Madbury edges',
      ],
      housingTypes: 'Student multi-unit, walk-ups, limited elevators, mixed SFH',
      challenges: [
        'Semester move-in / move-out peaks and short windows',
        'Elevator and building rules near campus product',
        'US-4 freeflow and scarce curb at peak',
      ],
      moverTips:
        'Align estimates with semester calendars. Book elevators early. Prefer mid-week windows outside mass move-in weekends.',
      cityKeywords: [
        'durham',
        'durham nh',
        'madbury',
      ],
    },
    {
      id: 'barrington-lee-edges',
      name: 'Barrington, Lee, Nottingham & southwestern edges',
      shortName: 'Barrington / Lee',
      neighborhoods: [
        'Barrington',
        'Lee',
        'Nottingham edges',
        'US-4 / NH-125 corridors',
        'Growth residential belts',
        'Rural-residential pockets',
      ],
      housingTypes: 'SFH, HOA pockets limited, rural-residential, multi-unit limited',
      challenges: [
        'Longer empty miles to Dover multi-unit docks',
        'Mixed driveway and winter-access product',
        'US-4 freeflow at peak',
      ],
      moverTips:
        'Price empty miles honestly. Survey driveway width and winter plow status. Align with school calendars when relevant.',
      cityKeywords: [
        'barrington',
        'lee',
        'nottingham',
      ],
    },
    {
      id: 'rural-northern-belts',
      name: 'Farmington, Milton, Middleton & rural northern belts',
      shortName: 'North / rural belts',
      neighborhoods: [
        'Farmington edges',
        'Milton edges',
        'Middleton edges',
        'New Durham edges',
        'Northern rural townships',
        'Spaulding northern approaches',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit',
      challenges: [
        'Long empty miles to Dover–Rochester cores',
        'Gravel drives, low clearances, and winter unplowed approaches',
        'NH-16 freeflow and weather risk',
      ],
      moverTips:
        'Survey rural driveway width, bridge limits, and plow status. Price empty miles and weather contingency honestly.',
      cityKeywords: [
        'farmington',
        'milton',
        'middleton',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Strafford County moving costs',
    intro:
      'Mill stairs, campus multi-unit peaks, suburban driveway mix, and Spaulding freeflow move the number more than packing skill alone — this is Dover–Rochester inland logistics, not Portsmouth beach defaults.',
    drivers: [
      {
        title: 'Mill multi-unit stairs, curb limits & winter ice',
        detail:
          'Dover and older walk-ups add flight counts and weather risk that flat-rate optimism underprices.',
      },
      {
        title: 'UNH semester peaks & elevator / building rules',
        detail:
          'Durham campus-adjacent product compresses calendars and adds COI labor before packing skill matters.',
      },
      {
        title: 'Mixed municipal access across Dover–Rochester–Somersworth',
        detail:
          'Short-distance rule and curb mix fails one-size estimates written for a single downtown.',
      },
      {
        title: 'NH-16 (Spaulding) · US-4 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short — worse in winter.',
      },
      {
        title: 'Rural northern empty miles & Maine-border pairs',
        detail:
          'Northern township destinations and Maine-adjacent legs raise staging distance and FMCSA authority complexity when leaving New Hampshire.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with mill stairs, campus elevators, or peak Spaulding pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, semester timing, and winter soft costs trend up',
      },
      {
        label: '3–4+ BR / campus peak / cross-zone',
        value: '$2,800–$9,000+',
        note: 'UNH peaks and long rural / Spaulding pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$200+/hr',
        note: 'Portal-to-portal; packing, stairs, and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Strafford County move',
    intro:
      'UNH semester cycles, school calendars, apartment turnover, and long New Hampshire winters reshape access and crew availability across the Spaulding corridor.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear multi-unit curb, ease freight windows, and reduce Spaulding pain. Avoid month-end Fridays and peak UNH move-in weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (plus semester waves)',
        detail:
          'Family school calendars, apartment turnover, and UNH August / January waves fill first. Book 2–4 weeks ahead for peak weekends and elevator slots near Durham and Dover.',
      },
      {
        title: 'Winter ice, snow & corridor delays',
        detail:
          'December–March ice on mill stairs, plow-dependent northern edges, and NH-16 weather slowdowns raise cancellation and labor risk. Prefer flexible dates, early starts, and covered staging when forecasts allow.',
      },
      {
        title: 'Shoulder seasons & off-peak campus value',
        detail:
          'October–April (outside holiday weeks, storm windows, and semester turnovers) often improves crew availability if winter access is planned honestly.',
      },
    ],
  },
  specialized: [
    {
      id: 'dover-spaulding-unh',
      title: 'Dover multi-unit, Spaulding & UNH logistics module',
      intro:
        'Strafford estimates fail more often on mill stair surveys, semester calendars, multi-unit COIs, and Spaulding freeflow than on packing skill alone.',
      bullets: [
        'Survey stair counts, curb options, and winter exterior access for Dover mill and walk-up product with photos.',
        'Align Durham / UNH multi-unit jobs with semester move-in and move-out calendars; book elevators early.',
        'Clarify Dover, Rochester, Somersworth, Durham, Barrington, and Lee addresses on every estimate.',
        'Price portal-to-portal time for any pair that rides NH-16 (Spaulding) or US-4 at peak — longer in winter.',
        'Survey rural driveway width and plow status for northern and Barrington–Lee product early.',
        'For in-state jobs verify New Hampshire household goods carrier authority under RSA 359-T frameworks; verify FMCSA for any out-of-state leg (including Maine-adjacent pairs).',
      ],
    },
    {
      id: 'not-seacoast-not-manchester',
      title: 'Not Rockingham seacoast-only · not Manchester density module',
      intro:
        'A single “eastern NH rate” collapses when Dover–Rochester inland product is confused with Portsmouth coastal tourism logistics or Manchester mill density alone.',
      bullets: [
        'Do not price Dover mill walk-ups like Hampton Beach seasonal rentals or like Manchester core as interchangeable defaults.',
        'State the market as Strafford County / Dover–Rochester on every estimate — disambiguate from Rockingham seacoast and Hillsborough density.',
        'Keep UNH semester peaks explicit near Durham — do not underwrite campus multi-unit as quiet suburban ranch defaults.',
        'Keep New Hampshire vs Maine addresses clear when Somersworth-adjacent pairs appear — interstate authority applies when any leg leaves New Hampshire.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Strafford County?',
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
              'Strafford spans Dover, Rochester, Somersworth, Durham/Oyster River contexts, Barrington, and other SAU systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus. UNH is a separate higher-education anchor, not a K–12 district.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year — especially near high-demand suburban and village SAUs.',
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
              'Wentworth-Douglass Hospital, Frisbie Memorial Hospital, and regional specialty campuses anchor care across Dover–Rochester and surrounding towns. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — Spaulding and US-4 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Dover mill multi-unit and older SFH; Rochester mixed residential; Somersworth edges; Durham student and village multi-unit; Barrington–Lee growth; rural northern township stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by multi-unit core vs rural product. Budget for older-building repair risk and competitive rental seasons near UNH and employment corridors.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits — especially near Dover and Durham. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Dover multi-unit / downtown lifestyle',
            detail:
              'Suits people prioritizing amenities and employment density — with stair, curb, and winter-access tradeoffs on move day.',
          },
          {
            title: 'Rochester / Somersworth living',
            detail:
              'Often appeals for relative value and Spaulding access — with mixed multi-unit and municipal rule awareness.',
          },
          {
            title: 'Durham / UNH adjacency',
            detail:
              'Fits households tied to the university — with semester calendar peaks and campus multi-unit logistics.',
          },
          {
            title: 'Barrington–Lee / northern rural living',
            detail:
              'Attracts buyers seeking space and quieter belts — with longer portal time and winter secondary-road logistics.',
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
              'Healthcare systems, manufacturing and logistics, education (including UNH), retail, and seacoast reverse-commute patterns concentrate demand across Dover–Rochester.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak NH-16 (Spaulding) and US-4 freeflow is real — including reverse pairs toward Portsmouth and southern employment. Test peak routes before choosing solely on rent or purchase price.',
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
              'Strafford is New Hampshire’s Spaulding inland belt — Dover–Rochester employment density, UNH adjacency, and northern rural townships — not Portsmouth seacoast tourism-only and not Manchester mill-only defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with warm summers, long freeze-thaw winters, ice, and snow that reshape outdoor staging and mill exterior access. Plan winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — UNH semesters, school calendars, and winter storms reshape daily rhythm across the Spaulding corridor.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Strafford County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify New Hampshire household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Strafford County, New Hampshire',
        href: 'https://www.co.strafford.nh.us/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Dover',
        href: 'https://www.dover.nh.gov/',
        external: true,
        note: 'Largest Strafford municipality context',
      },
      {
        label: 'City of Rochester',
        href: 'https://www.rochesternh.gov/',
        external: true,
        note: 'Spaulding corridor municipality context',
      },
      {
        label: 'Town of Durham',
        href: 'https://www.ci.durham.nh.us/',
        external: true,
        note: 'UNH-adjacent municipality context',
      },
      {
        label: '511 NH — traveler information',
        href: 'https://www.511nh.com/',
        external: true,
        note: 'NH-16 / US-4 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with mill multi-unit and stair fluency for Dover; Spaulding freeflow timing for Dover–Rochester–Somersworth pairs; semester-calendar and elevator fluency for Durham / UNH product; rural driveway and winter plow skill for Barrington–Lee and northern belts. Verify New Hampshire household goods carrier authority under RSA 359-T frameworks for intrastate moves and FMCSA for interstate legs (including Maine-adjacent pairs) before deposits. This is Strafford County / Dover–Rochester — not Rockingham seacoast-only and not Manchester density defaults.',
  lastReviewed: '2026-07-24',
});
