import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKyPack,
  KY_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kentucky/ky-shared';

/**
 * Kenton County, KY — Covington / Northern Kentucky Cincinnati collar.
 * NOT Louisville north. NOT Boone County Florence/CVG growth clone.
 */
export const kentonCountyKyIntelligence: CountyIntelligencePack = finalizeKyPack({
  countySlug: 'kenton',
  hubTitle: 'Kenton County Moving Intelligence Hub',
  eyebrow:
    'Kenton County · Covington riverfront, NKY collar & I-71/75 / I-275 logistics',
  h1: 'Moving in Kenton County: Covington Riverfront Access, NKY Grids & Cincinnati-Collar Corridors',
  heroOpener:
    'Kenton County, Kentucky is Northern Kentucky’s Covington–Independence core — not Louisville north, not Lexington horse-country, and not a Boone County Florence/CVG growth clone. Expect Covington riverfront and Mainstrasse multi-unit density, Fort Mitchell and Park Hills hillside stock, Erlanger and Elsmere grids, Independence and Taylor Mill growth product, and I-71/75 / I-275 / KY-16 / KY-17 freeflow that rewrites “local” estimates. A Roebling Bridge approach loft, a Fort Wright hillside driveway, a Latonia bungalow stair stack, and an Independence HOA cul-de-sac do not share truck access or crew skill. Ohio-side Cincinnati pairs are interstate jobs. This hub is for people moving in Kenton County — Covington/NKY Cincinnati collar — not a renamed Louisville page or Boone CVG script.',
  heroCredibility:
    'KYTC Division of Motor Carriers household goods certificate for intrastate · FMCSA for interstate · NKY riverfront & I-71/75 logistics awareness · Curated listings',
  majorCorridors: 'I-71/75 · I-275 · KY-16 · KY-17 · local NKY grid',
  whatMakesDifferent: {
    title: 'What makes moving in Kenton County different',
    intro:
      'These are Northern Kentucky Cincinnati-collar realities — Covington riverfront elevators and walk-ups, hillside approaches, Independence growth, and I-71/75 freeflow — not Louisville I-264 product and not Boone Florence airport HOAs alone.',
    bullets: [
      {
        title: 'Covington/NKY collar is not Louisville north',
        detail:
          'Ignore Waterfront tower defaults from Jefferson County and do not treat Kenton as a northern spillover of Louisville logistics. Corridors, Ohio River bridge approaches, and housing mix are Cincinnati-metro Kentucky-side product.',
      },
      {
        title: 'Riverfront multi-unit and Mainstrasse stairs rewrite labor',
        detail:
          'Covington lofts, elevators where present, walk-ups, and scarce river-town curb fail estimates more often than packing skill alone. Flat-rate optimism from Independence driveways underprices carries.',
      },
      {
        title: 'Hillside Fort Mitchell / Park Hills / Fort Wright approaches rewrite access',
        detail:
          'Pitch, turnaround limits, and tight residential streets differ from flat Erlanger ranch stock and from Boone CVG multi-family belts.',
      },
      {
        title: 'I-71/75, I-275, KY-16, and KY-17 burn portal time',
        detail:
          'Covington ↔ Independence, Fort Mitchell ↔ Erlanger, or Latonia ↔ Ohio-side pairs look local and still burn 20–55+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not a Boone County Florence/CVG clone',
        detail:
          'Boone stacks airport-adjacent growth and KY-18 / KY-237 freeflow; Kenton stacks riverfront density, older NKY grids, and Independence interior product. Same-region jobs still need county-specific surveys.',
      },
      {
        title: 'Ohio-side Cincinnati pairs are routine interstate jobs',
        detail:
          'Households regularly move Kenton ↔ Hamilton County OH or other Cincinnati suburbs. A Kentucky household goods certificate alone does not authorize Ohio delivery — verify FMCSA. Do not assume OH PUCO credentials cover Kentucky intrastate work, and do not treat OH PUCO as a substitute for KYTC on in-state legs.',
      },
      KY_REG_BULLET,
    ],
  },
  zonesHeading: 'Kenton County access zones',
  zonesIntro:
    'Plan by Covington riverfront multi-unit, Fort Mitchell–Park Hills hillside stock, Erlanger–Elsmere grids, Latonia neighborhood product, Independence–Taylor Mill growth, and I-71/75 commercial-residential edges.',
  zones: [
    {
      id: 'covington-riverfront',
      name: 'Covington riverfront, Mainstrasse & downtown multi-unit',
      shortName: 'Covington riverfront',
      neighborhoods: [
        'Downtown Covington',
        'Mainstrasse Village',
        'Roebling Point edges',
        'Mutter Gottes edges',
        'Licking Riverside edges',
        'Madison Avenue corridors',
      ],
      housingTypes: 'Loft conversions, walk-up multifamily, limited elevators, historic SFH',
      challenges: [
        'Elevator/COI where present and scarce curb',
        'Bridge and event freeflow toward Cincinnati',
        'Tight historic blocks and stair counts',
      ],
      moverTips:
        'Book elevators early when present. Prefer mid-week non-event starts. Photo curb options on riverfront blocks.',
      cityKeywords: [
        'covington',
        'mainstrasse',
        'downtown covington',
      ],
    },
    {
      id: 'fort-mitchell-hills',
      name: 'Fort Mitchell, Park Hills, Fort Wright & hillside belts',
      shortName: 'Fort Mitchell hills',
      neighborhoods: [
        'Fort Mitchell',
        'Park Hills',
        'Fort Wright',
        'Lookout Heights edges',
        'Dixie Highway corridors',
        'Hillside residential edges',
      ],
      housingTypes: 'SFH, hillside lots, multi-unit pockets, split-level stock',
      challenges: [
        'Driveway pitch, turnaround limits, and long carries',
        'I-71/75 freeflow and limited alternate routes on some approaches',
        'Weather-sensitive slopes',
      ],
      moverTips:
        'Photo driveway pitch and truck turnarounds. Prefer smaller trucks when approaches are tight. Plan weather contingency.',
      cityKeywords: [
        'fort mitchell',
        'park hills',
        'fort wright',
        'lookout heights',
      ],
    },
    {
      id: 'erlanger-elsmere',
      name: 'Erlanger, Elsmere & western NKY grids',
      shortName: 'Erlanger / Elsmere',
      neighborhoods: [
        'Erlanger',
        'Elsmere',
        'Edgewood edges',
        'Dixie Highway west corridors',
        'Commonwealth corridors',
        'Turfway edges',
      ],
      housingTypes: 'Ranch and split-level SFH, multi-unit, some newer multi-family',
      challenges: [
        'I-275 / I-71/75 freeflow',
        'Mixed municipal rules across short distances',
        'Airport-adjacent traffic spikes on some approaches',
      ],
      moverTips:
        'Clarify Erlanger vs Elsmere vs Edgewood addresses. Price I-275 honestly for eastbound unload pairs. Survey older stock carefully.',
      cityKeywords: [
        'erlanger',
        'elsmere',
        'edgewood',
      ],
    },
    {
      id: 'latonia-south-covington',
      name: 'Latonia, south Covington & southern grid stock',
      shortName: 'Latonia',
      neighborhoods: [
        'Latonia',
        'South Covington corridors',
        'Rosedale edges',
        'Decoursey corridors',
        'Winston Avenue edges',
        'Southern residential grids',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets',
      challenges: [
        'Stairs, basements, and tighter residential curb',
        'KY-16 / KY-17 freeflow',
        'Mixed older stock and long carries',
      ],
      moverTips:
        'Survey stairs and basements with photos. Prefer mid-week starts. Clarify Latonia vs central Covington on the estimate.',
      cityKeywords: [
        'latonia',
        'covington',
      ],
    },
    {
      id: 'independence-taylor-mill',
      name: 'Independence, Taylor Mill & southern growth product',
      shortName: 'Independence / Taylor Mill',
      neighborhoods: [
        'Independence',
        'Taylor Mill',
        'KY-17 corridors',
        'Nicholson edges',
        'Visalia edges',
        'Southern HOA pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, larger-lot edges',
      challenges: [
        'HOA packets and truck-length limits where present',
        'KY-17 freeflow and longer empty miles vs riverfront',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets early. Price KY-17 honestly for Covington unload pairs. Confirm truck length rules.',
      cityKeywords: [
        'independence',
        'taylor mill',
        'nicholson',
      ],
    },
    {
      id: 'i71-commercial-residential',
      name: 'I-71/75 commercial-residential & corridor-edge stock',
      shortName: 'I-71/75 edges',
      neighborhoods: [
        'I-71/75 corridor edges',
        'Crestview Hills edges',
        'Lakeside Park edges',
        'Commercial-residential mix',
        'Mall Road edges',
        'Buttermilk Pike edges',
      ],
      housingTypes: 'Multi-unit, townhomes, SFH, commercial-adjacent residential',
      challenges: [
        'I-71/75 freeflow and retail traffic spikes',
        'Mixed curb and driveway product',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Price I-71/75 honestly. Confirm commercial-adjacent staging limits. Clarify load and unload city lines.',
      cityKeywords: [
        'crestview hills',
        'lakeside park',
        'erlanger',
        'fort mitchell',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kenton County moving costs',
    intro:
      'Riverfront access product, hillside approaches, HOA admin, and I-71/75 freeflow move the number more than packing skill alone — this is NKY Cincinnati-collar logistics, not Louisville north pricing and not Boone CVG-only templates.',
    drivers: [
      {
        title: 'Riverfront walk-ups, lofts & scarce curb',
        detail:
          'Covington multi-unit and historic blocks add flight counts and staging risk that suburban optimism underprices.',
      },
      {
        title: 'Hillside driveways & pitch logistics',
        detail:
          'Fort Mitchell, Park Hills, and Fort Wright approaches rewrite labor hours before packing skill matters.',
      },
      {
        title: 'I-71/75 · I-275 · KY-16 · KY-17 congestion',
        detail:
          'Cross-county and bridge-approach pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Independence growth HOA windows',
        detail:
          'Southern packets and school-calendar peaks rewrite jobs that look simple on a map.',
      },
      {
        title: 'Ohio-side & multi-county empty miles',
        detail:
          'Hamilton County OH, Boone, and Campbell destinations raise staging distance and authority complexity when leaving Kentucky or crossing the river.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with riverfront stairs, elevators, or peak I-71/75 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,300+',
        note: 'Stairs, hillside access, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / hillside / cross-zone',
        value: '$2,800–$8,800+',
        note: 'Hillside and long bridge-approach pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; packing, access admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Kenton County move',
    intro:
      'Lease cycles, riverfront event freeflow, school calendars, summer heat, severe-storm season, and winter ice on hills reshape access and crew availability across NKY.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease riverfront staging, and reduce I-71/75 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and multi-unit slots.',
      },
      {
        title: 'Riverfront events & bridge freeflow',
        detail:
          'Festivals, sports calendars, and Ohio River bridge incidents compress Covington staging. Prefer flexible dates near the riverfront.',
      },
      {
        title: 'Summer heat, storms & hillside ice',
        detail:
          'June–August heat and thunderstorms raise cancellation risk; winter ice is especially costly on Fort Mitchell–Park Hills approaches. Prefer early starts and contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'kenton-riverfront-hillside',
      title: 'Covington riverfront, hillside & I-71/75 logistics module',
      intro:
        'Kenton County estimates fail more often on stair surveys, hillside access, multi-unit curb, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Survey stair counts and curb options with photos for Covington riverfront and Latonia stock.',
        'Photo driveway pitch and turnarounds for Fort Mitchell, Park Hills, and Fort Wright product.',
        'Price portal-to-portal time for any pair that rides I-71/75, I-275, KY-16, or KY-17 at peak.',
        'Collect HOA packets early for Independence and Taylor Mill growth product.',
        'Clarify Covington, Erlanger, Fort Mitchell, Independence, and unincorporated addresses on every estimate.',
        'For in-state jobs verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR); verify FMCSA for any out-of-state leg — especially Ohio-side pairs. Do not substitute OH PUCO for Kentucky intrastate authority.',
      ],
    },
    {
      id: 'not-louisville-not-boone-clone',
      title: 'Not Louisville north · not Boone CVG clone module',
      intro:
        'A single “NKY rate” collapses when Covington riverfront product is confused with Louisville Jefferson logistics or Boone County Florence/CVG growth alone.',
      bullets: [
        'Do not price Mainstrasse walk-ups like NuLu elevators or like Florence HOA driveways as interchangeable defaults.',
        'Keep Kenton vs Boone vs Campbell county lines clear on multi-address estimates.',
        'Match riverfront lease peaks separately from Independence school-calendar waves.',
        'Treat Ohio River crossings as interstate authority problems — KYTC alone is not enough for Ohio delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kenton County?',
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
              'Kenton County spans Covington Independent, Kenton County Schools, Beechwood Independent, Erlanger-Elsmere, Fort Thomas-adjacent edges, and other systems depending on address. Assignment is address-based — marketing city names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Independent districts and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
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
              'St. Elizabeth Healthcare campuses (including Edgewood and other NKY locations), Cincinnati-side systems across the river, and specialty care anchor options for Kenton households. Confirm insurance networks — including Ohio providers if relevant.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-71/75 freeflow and bridge conditions change “nearby” on paper. Transfer records early.',
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
              'Expect Covington riverfront multi-unit and historic SFH; Fort Mitchell hillside product; Erlanger–Elsmere ranch grids; Latonia older stock; Independence–Taylor Mill growth HOAs.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for condo/HOA dues, older-building repair risk, and hillside maintenance where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Covington riverfront urban lifestyle',
            detail:
              'Suits people prioritizing walkability and Cincinnati access — with stairs, curb limits, and event-day tradeoffs on move day.',
          },
          {
            title: 'Fort Mitchell / Park Hills hillside character',
            detail:
              'Often appeals for established neighborhood feel — with driveway pitch and staging constraints.',
          },
          {
            title: 'Erlanger / Elsmere grid living',
            detail:
              'Attracts households seeking relative value and airport-adjacent convenience — with I-275 freeflow as a daily input.',
          },
          {
            title: 'Independence / Taylor Mill growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with longer empty miles to the riverfront core.',
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
              'Cincinnati CBD reverse-commute professional services, St. Elizabeth and healthcare, logistics, manufacturing, and NKY commercial corridors concentrate demand on both sides of the river.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-71/75 and bridge freeflow is real — including Ohio-side reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
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
              'Kenton County stacks Covington riverfront urban cores, hillside suburbs, and Independence growth — different from Louisville Jefferson product and from Boone Florence/CVG airport growth alone.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental-to-subtropical transition climate with hot summers, severe-storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and hillside ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — riverfront events, school calendars, Cincinnati sports days, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kenton County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KYTC Division of Motor Carriers household goods licensing for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Kenton County, Kentucky — official site',
        href: 'https://www.kentoncounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Covington',
        href: 'https://www.covingtonky.gov/',
        external: true,
        note: 'Riverfront municipality permits & services',
      },
      {
        label: 'City of Independence',
        href: 'https://www.cityofindependence.org/',
        external: true,
        note: 'Southern growth municipality context',
      },
      {
        label: 'GOKY — Kentucky 511 traveler info',
        href: 'https://goky.ky.gov/',
        external: true,
        note: 'I-71/75 / I-275 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with riverfront multi-unit and stair fluency for Covington product; hillside driveway skill for Fort Mitchell–Park Hills–Fort Wright; grid and multi-family experience for Erlanger–Elsmere and Latonia; HOA fluency for Independence–Taylor Mill; honest I-71/75 · I-275 · KY-16 · KY-17 timing for cross-zone pairs. Verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR) for intrastate moves and FMCSA for interstate legs (including Ohio-side pairs) before deposits.',
  lastReviewed: '2026-07-24',
});
