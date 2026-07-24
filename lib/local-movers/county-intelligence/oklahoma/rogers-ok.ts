import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOkPack,
  OK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/oklahoma/ok-shared';

/**
 * Rogers County, OK — Claremore / Catoosa NE Tulsa fringe.
 * Not Tulsa County core rename; not Owasso-only clone.
 */
export const rogersCountyOkIntelligence: CountyIntelligencePack = finalizeOkPack({
  countySlug: 'rogers',
  hubTitle: 'Rogers County Moving Intelligence Hub',
  eyebrow:
    'Rogers County · Claremore–Catoosa NE Tulsa fringe, Inola stock & I-44 / OK-66 logistics',
  h1: 'Moving in Rogers County: Claremore & Catoosa Access, NE Tulsa Fringe & I-44 / OK-66 Logistics',
  heroOpener:
    'Rogers County is the northeast Tulsa metro fringe — Claremore, Catoosa, and Inola — not a downtown Tulsa Blue Dome rename, not Broken Arrow east growth alone, and not an Owasso-only north template. Expect Claremore character grids and multi-unit, Catoosa industrial-adjacent residential, Verdigris and growth HOA pockets, Inola fringe stock, and I-44 / OK-66 / OK-20 freeflow that rewrites “local” estimates. A Claremore downtown curb stack, a Catoosa ranch near port and freight belts, a Verdigris cul-de-sac, and a rural OK-20 driveway do not share truck access or crew skill. Cross-county pairs into Tulsa County are real inputs. This hub is for people moving in Rogers County — Claremore / Catoosa NE fringe — not a renamed Tulsa core page.',
  heroCredibility:
    'OCC Household Goods Certificate for intrastate · FMCSA for interstate · NE Tulsa fringe & I-44 / OK-66 logistics awareness · Curated listings',
  majorCorridors: 'I-44 · OK-66 · OK-20 · local northeast metro grid',
  whatMakesDifferent: {
    title: 'What makes moving in Rogers County different',
    intro:
      'These are Rogers County NE fringe realities — Claremore grids, Catoosa industrial-residential mix, and I-44 / OK-66 freeflow — not downtown Tulsa elevators and not Broken Arrow Creek Turnpike HOA defaults alone.',
    bullets: [
      {
        title: 'NE Tulsa fringe is not downtown Tulsa core product',
        detail:
          'Ignore Blue Dome tower and Brookside walk-up defaults. Rogers County stacks Claremore municipal grids, Catoosa freight-adjacent residential, and longer empty miles into Tulsa that core-city scripts underprice.',
      },
      {
        title: 'Claremore character grids rewrite labor differently than growth HOAs',
        detail:
          'Older SFH, multi-unit pockets, and downtown-adjacent curb fail estimates more often than packing skill alone. Flat-rate optimism from new Verdigris driveways underprices carries.',
      },
      {
        title: 'Catoosa industrial-residential mix is not pure suburb product',
        detail:
          'Port and freight freeflow, mixed curb rules, and industrial-adjacent staging rewrite jobs that look residential-simple on paper.',
      },
      {
        title: 'I-44, OK-66, and OK-20 burn portal time',
        detail:
          'Claremore ↔ Catoosa, Verdigris ↔ Tulsa County, or Inola ↔ Claremore pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not Broken Arrow and not Owasso alone',
        detail:
          'Tulsa County east and north growth share some HOA patterns but different corridors, municipalities, and empty-mile stacks. Keep county lines clear on every estimate.',
      },
      {
        title: 'Multi-county NE metro and interstate pairs are routine',
        detail:
          'Households regularly move Rogers County ↔ Tulsa, Wagoner, Mayes, or Washington County, or out-of-state on I-44. An OCC Household Goods Certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Oklahoma.',
      },
      OK_REG_BULLET,
    ],
  },
  zonesHeading: 'Rogers County access zones',
  zonesIntro:
    'Plan by Claremore core grids, Catoosa industrial-residential belts, Verdigris growth HOAs, Inola southern fringe, OK-66 corridor stock, and rural northeast larger lots — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'claremore-core',
      name: 'Claremore core grids, multi-unit & historic residential',
      shortName: 'Claremore / core',
      neighborhoods: [
        'Claremore',
        'Downtown Claremore',
        'Will Rogers corridors',
        'Central multi-unit pockets',
        'Historic residential grids',
        'Lynn Riggs Boulevard edges',
      ],
      housingTypes: 'Older SFH, walk-up multifamily, ranch stock, limited elevators',
      challenges: [
        'Stairs, basements, and tighter residential curb',
        'OK-66 / local arterial freeflow',
        'Mixed older stock and long carries',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts. Photo curb and driveway options.',
      cityKeywords: [
        'claremore',
        'rogers county',
      ],
    },
    {
      id: 'catoosa-industrial-residential',
      name: 'Catoosa, port-adjacent & industrial-residential belts',
      shortName: 'Catoosa / port edge',
      neighborhoods: [
        'Catoosa',
        'Port of Catoosa edges',
        'Industrial-residential mix',
        'Highway 66 Catoosa corridors',
        'South Catoosa residential',
        'I-44 Catoosa approach edges',
      ],
      housingTypes: 'Ranch SFH, multi-unit pockets, industrial-adjacent residential',
      challenges: [
        'Freight and industrial freeflow near residential streets',
        'I-44 approach congestion',
        'Mixed curb and driveway product',
      ],
      moverTips:
        'Avoid peak freight windows when flexible. Confirm staging limits near industrial edges. Clarify Catoosa vs Tulsa addresses.',
      cityKeywords: [
        'catoosa',
        'claremore',
      ],
    },
    {
      id: 'verdigris-growth',
      name: 'Verdigris growth HOAs & mid-county residential',
      shortName: 'Verdigris / growth',
      neighborhoods: [
        'Verdigris',
        'Mid-county growth edges',
        'HOA SFH pockets',
        'School-corridor residential',
        'OK-66 mid belts',
        'Cross-county approach edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-44 / OK-66 freeflow',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price freeflow honestly for Tulsa pairs.',
      cityKeywords: [
        'verdigris',
        'claremore',
        'catoosa',
      ],
    },
    {
      id: 'inola-south',
      name: 'Inola, southern fringe & OK-33 approach stock',
      shortName: 'Inola / south',
      neighborhoods: [
        'Inola',
        'Southern Rogers County',
        'OK-33 approach edges',
        'Larger-lot south stock',
        'Fringe multi-family pockets',
        'County-line residential',
      ],
      housingTypes: 'SFH, ranch stock, larger lots, limited multi-unit',
      challenges: [
        'Longer empty miles vs Claremore and Tulsa',
        'OK-33 / local freeflow',
        'Driveway geometry and turnaround limits',
      ],
      moverTips:
        'Price empty miles honestly. Photo driveway turnarounds. Clarify Inola and unincorporated addresses.',
      cityKeywords: [
        'inola',
        'claremore',
      ],
    },
    {
      id: 'ok66-corridor',
      name: 'OK-66 corridor commercial-residential belts',
      shortName: 'OK-66 corridor',
      neighborhoods: [
        'OK-66 corridor belts',
        'Route 66 commercial-residential',
        'Claremore–Catoosa mid corridor',
        'Service-road residential pockets',
        'Retail-adjacent multi-unit',
        'Historic highway edges',
      ],
      housingTypes: 'Mixed SFH, multi-unit, commercial-adjacent residential',
      challenges: [
        'OK-66 freeflow and commercial traffic',
        'Scarce curb near retail peaks',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Prefer mid-week early starts near corridor retail peaks. Photo curb options. Confirm municipal lines.',
      cityKeywords: [
        'claremore',
        'catoosa',
        'verdigris',
      ],
    },
    {
      id: 'northeast-rural-fringe',
      name: 'Northeast rural fringe, Oologah edges & larger lots',
      shortName: 'NE rural fringe',
      neighborhoods: [
        'Oologah edges',
        'Northeast Rogers County fringe',
        'Larger-lot corridors',
        'OK-20 residential edges',
        'Lake-adjacent stock',
        'Farm-edge approaches',
      ],
      housingTypes: 'Larger-lot SFH, ranch stock, lake-adjacent and farm-edge homes',
      challenges: [
        'Soft shoulders, pitch, and turnaround limits',
        'Long empty miles vs Claremore and Tulsa',
        'Gate codes and long driveways',
      ],
      moverTips:
        'Survey approach roads before crew day. Confirm truck length and turnarounds. Price empty miles honestly.',
      cityKeywords: [
        'oologah',
        'claremore',
        'rogers county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Rogers County moving costs',
    intro:
      'Access product, HOA admin, industrial freeflow, and I-44 / OK-66 empty miles move the number more than packing skill alone — this is NE Tulsa fringe logistics, not downtown Tulsa tower pricing.',
    drivers: [
      {
        title: 'Claremore grid stairs, basements & curb',
        detail:
          'Older stock adds flight counts that flat-rate new-build optimism underprices.',
      },
      {
        title: 'I-44 · OK-66 · OK-20 congestion & Tulsa pairs',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Catoosa industrial-adjacent freeflow',
        detail:
          'Freight traffic and staging limits rewrite residential jobs near port and industrial edges.',
      },
      {
        title: 'Verdigris HOA gates & truck-length rules',
        detail:
          'Growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Multi-county & interstate empty miles',
        detail:
          'Tulsa County, Mayes, Wagoner, and out-of-state destinations raise staging distance and authority complexity when leaving Rogers County or Oklahoma.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with stairs, multi-unit, or peak I-44 pairs',
      },
      {
        label: '2–3BR multi-unit, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, HOA, and empty-mile soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Large homes and long Tulsa pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, and freeflow scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Rogers County move',
    intro:
      'School calendars, summer heat, severe-storm and tornado season, and winter ice reshape access and crew availability across the NE Tulsa fringe.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA windows, and reduce I-44 / OK-66 pain. Avoid month-end Fridays when family moves collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and multi-family turnover fill first. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates and covered staging plans.',
      },
      {
        title: 'Summer heat & winter ice',
        detail:
          'June–August heat and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'rogers-claremore-catoosa',
      title: 'Claremore grid, Catoosa industrial edge & I-44 logistics module',
      intro:
        'Rogers County estimates fail more often on stair surveys, industrial freeflow, HOA packets, and I-44 empty miles than on packing skill alone.',
      bullets: [
        'Photo stair counts, curb options, and driveway access for Claremore grid stock.',
        'Plan staging carefully near Catoosa industrial and port-adjacent residential belts.',
        'Price portal-to-portal time for any pair that rides I-44, OK-66, or OK-20 at peak — especially Tulsa County unload pairs.',
        'Collect HOA packets early for Verdigris growth product.',
        'Clarify Claremore, Catoosa, Verdigris, Inola, Oologah, and unincorporated addresses on every estimate.',
        'For in-state jobs verify OCC Household Goods Certificate; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-tulsa-core-not-broken-arrow',
      title: 'Not Tulsa core · not Broken Arrow-only module',
      intro:
        'A single “Tulsa metro rate” collapses when Rogers County fringe product is confused with downtown Tulsa elevators or Broken Arrow Creek Turnpike HOA defaults alone.',
      bullets: [
        'Do not price Claremore grids like Blue Dome towers or like Broken Arrow gated cul-de-sacs as interchangeable defaults.',
        'Keep Rogers vs Tulsa vs Wagoner vs Mayes county lines clear on multi-address estimates.',
        'Match school-calendar peaks separately from downtown Tulsa lease waves.',
        'Treat out-of-state legs as interstate authority problems — OCC alone is not enough for interstate delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Rogers County?',
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
              'Rogers County spans Claremore, Catoosa, Verdigris, Inola, Oologah-Talala, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Oklahoma State Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Claremore-area campuses plus Tulsa systems (Saint Francis, Hillcrest, Ascension St. John, and others) anchor care for Rogers County households. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-44 freeflow into Tulsa changes “nearby” on paper. Transfer records early.',
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
              'Expect Claremore older grids and multi-unit; Catoosa industrial-adjacent residential; Verdigris HOA growth; Inola and Oologah larger-lot fringe — not downtown Tulsa vertical product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for HOA dues, commute fuel, and older-building repair risk where relevant.',
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
            title: 'Claremore core lifestyle',
            detail:
              'Suits people prioritizing a municipal center with services — with older stock and curb tradeoffs on move day.',
          },
          {
            title: 'Catoosa industrial-edge living',
            detail:
              'Attracts households seeking relative value and Tulsa access — with freight freeflow as a daily input.',
          },
          {
            title: 'Verdigris growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and empty miles to Tulsa.',
          },
          {
            title: 'Inola / Oologah fringe living',
            detail:
              'Often appeals for space and quieter pace — with longer approaches and empty-mile logistics.',
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
              'Local education and services, port and industrial employment near Catoosa, and reverse-commute links into Tulsa County employment centers concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-44 freeflow into Tulsa is real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Rogers County stacks Claremore municipal life, Catoosa industrial-residential mix, and NE fringe growth — different from downtown Tulsa, Broken Arrow east growth alone, and Owasso north-metro patterns alone.',
          },
          {
            title: 'Climate',
            detail:
              'Southern plains climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, commute peaks, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Rogers County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify OCC Household Goods Certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Rogers County, Oklahoma — official site',
        href: 'https://www.rogerscounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Claremore',
        href: 'https://www.claremorecity.com/',
        external: true,
        note: 'County seat municipality context',
      },
      {
        label: 'City of Catoosa',
        href: 'https://cityofcatoosa.org/',
        external: true,
        note: 'Port-adjacent municipality context',
      },
      {
        label: 'OKGO — Oklahoma 511 traveler info',
        href: 'https://okgo.ok.gov/',
        external: true,
        note: 'I-44 / OK-66 / OK-20 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with grid and stair fluency for Claremore product; industrial-edge staging fluency for Catoosa belts; HOA gate fluency for Verdigris growth; honest I-44 · OK-66 · OK-20 timing for NE fringe and Tulsa pairs. This is Claremore / Catoosa NE Tulsa fringe — not a downtown Tulsa rename. Verify OCC Household Goods Certificate for intrastate moves (even within city limits) and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
