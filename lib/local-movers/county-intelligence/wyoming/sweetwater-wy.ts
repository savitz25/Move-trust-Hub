import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeWyPack } from '@/lib/local-movers/county-intelligence/wyoming/wy-shared';

/**
 * Sweetwater County, WY — Rock Springs–Green River / I-80 energy corridor.
 * Distinct from Cheyenne capital (Laramie County) and Casper (Natrona).
 */
export const sweetwaterCountyWyIntelligence: CountyIntelligencePack = finalizeWyPack({
  countySlug: 'sweetwater',
  hubTitle: 'Sweetwater County Moving Intelligence Hub',
  eyebrow:
    'Sweetwater County · Rock Springs–Green River WY · I-80 energy corridor · US-191',
  h1: 'Moving in Sweetwater County: Rock Springs–Green River Access, I-80 Corridor Logistics & High-Desert Winter Wind',
  heroOpener:
    'Sweetwater County, Wyoming is the Rock Springs–Green River I-80 energy corridor — Rock Springs multi-unit and commercial stock, Green River county-seat residential belts, trona and energy-adjacent housing edges, and the long I-80 freeflow that rewrites “local” estimates across southwestern Wyoming — not a Cheyenne capital rename and not a Casper mountain-hub clone. A Rock Springs downtown walk-up, a Green River ranch driveway, an industrial-adjacent SFH, and a high-desert rural long-carry do not share truck access, curb rules, or empty-mile risk. I-80, US-191, and the local Rock Springs / Green River grid freeflow, energy-sector turnover, and high-desert winter wind and ice can erase schedule optimism overnight. This hub is for people moving in Sweetwater County, Wyoming — Rock Springs–Green River realities — not a recycled Cheyenne or Casper page.',
  heroCredibility:
    'WYDOT Operating Authority · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-80 · US-191 · local Rock Springs/Green River grid',
  whatMakesDifferent: {
    title: 'What makes moving in Sweetwater County different',
    intro:
      'These are Rock Springs–Green River / I-80 corridor realities — dual-city product, energy and trona-sector turnover, high-desert winter wind, and long empty miles — not Cheyenne capital product, not Casper mountain approaches, and not a Utah or Colorado rename.',
    bullets: [
      {
        title: 'Rock Springs and Green River are dual markets — not one flat rate',
        detail:
          'County seat is Green River; larger commercial density often sits in Rock Springs. A Rock Springs third-floor walk-up is not a Green River garage-friendly ranch. State both cities clearly on every estimate.',
      },
      {
        title: 'I-80 freeflow and empty miles dominate portal-to-portal math',
        detail:
          'Rock Springs ↔ Green River pairs look short on maps and still burn real time at peak, construction, wind events, or winter closures. Cross-county I-80 legs stack empty miles fast — price honestly.',
      },
      {
        title: 'Energy, mining, and trona-sector turnover reshapes demand',
        detail:
          'Project cycles, short-notice housing turns, and mixed industrial-adjacent residential product underprice flat-suburb optimism. Survey photos and flexible windows beat bedroom-count quotes alone.',
      },
      {
        title: 'High-desert winter wind and ice are real schedule risk',
        detail:
          'November–March wind, freeze-thaw ice, and I-80 weather windows reshape morning outdoor staging. Build contingency — especially on open desert and corridor pairs.',
      },
      {
        title: 'US-191 and rural Sweetwater edges rewrite access assumptions',
        detail:
          'Long driveway carries, limited truck turnaround, gravel approaches, and wind-exposed staging are not downtown Rock Springs curb problems. Flat-rate optimism underprices edge product.',
      },
      {
        title:
          'WYDOT Operating Authority for intrastate HHG · FMCSA for interstate',
        detail:
          'Moves entirely within Wyoming by for-hire household goods carriers generally require WYDOT Operating Authority (Letter of Authority). Match the legal name on the estimate to WYDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not apply Colorado PUC, Montana, Idaho, Utah, North Dakota, South Dakota, or New Jersey consumer-mover frameworks as Wyoming intrastate requirements. A Wyoming business registration alone does not authorize interstate delivery, and a USDOT alone is not automatic WYDOT intrastate permission.',
      },
    ],
  },
  zonesHeading: 'Sweetwater County access zones',
  zonesIntro:
    'Plan by Rock Springs multi-unit and commercial core, Green River county-seat residential belts, industrial / energy-adjacent edges, and rural I-80 / US-191 approaches — access rules cluster by dual-city geography and corridor more than ZIP alone.',
  zones: [
    {
      id: 'rock-springs-core',
      name: 'Rock Springs downtown, commercial core & multi-unit',
      shortName: 'Rock Springs core',
      neighborhoods: [
        'Downtown Rock Springs',
        'Commercial multi-unit pockets',
        'Medical corridor edges',
        'Older character SFH near core',
        'I-80 Rock Springs exits',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, limited elevators, commercial-adjacent stock',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Building packets near commercial and medical corridors',
        'I-80 freeflow into Green River and east/west corridor pairs',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm building COIs and curb options in writing. Clarify Rock Springs vs Green River on every estimate.',
      cityKeywords: [
        'rock springs',
        'downtown rock springs',
      ],
    },
    {
      id: 'green-river-seat',
      name: 'Green River county seat, residential belts & river-corridor stock',
      shortName: 'Green River',
      neighborhoods: [
        'Green River',
        'Downtown Green River edges',
        'Residential belts',
        'School-corridor SFH',
        'River-adjacent approaches',
      ],
      housingTypes: 'Ranch and two-story SFH, small multi-unit, townhome pockets',
      challenges: [
        'Portal time to Rock Springs on I-80',
        'Mixed driveway geometry and small-town curb',
        'Winter ice and wind on open approaches',
      ],
      moverTips:
        'Price Rock Springs ↔ Green River pairs portal-to-portal — not free local miles. Survey driveway width early. Confirm Green River municipal vs unincorporated Sweetwater addresses.',
      cityKeywords: [
        'green river',
        'sweetwater county',
      ],
    },
    {
      id: 'industrial-energy-edges',
      name: 'Industrial, trona & energy-adjacent housing edges',
      shortName: 'Industrial / energy edges',
      neighborhoods: [
        'Industrial-adjacent Rock Springs edges',
        'Trona and mining corridor pockets',
        'Energy-service residential',
        'Shift-housing and multi-family pockets',
        'US-191 approach edges',
      ],
      housingTypes: 'SFH, multi-family, manufactured, industrial-adjacent stock',
      challenges: [
        'Short-notice energy and mining housing turns',
        'Mixed curb, industrial freeflow, and limited staging',
        'I-80 / US-191 empty miles into cores',
      ],
      moverTips:
        'Align with project and shift calendars when relevant. Photo curb and driveway early. Do not treat industrial-edge product as quiet residential SFH defaults.',
      cityKeywords: [
        'rock springs',
        'green river',
        'sweetwater county',
      ],
    },
    {
      id: 'rural-i80-us191',
      name: 'Rural I-80 / US-191 approaches & high-desert edges',
      shortName: 'Rural I-80 / US-191',
      neighborhoods: [
        'Unincorporated Sweetwater County',
        'I-80 east and west edges',
        'US-191 corridors',
        'Farson and rural north edges',
        'High-desert rural-residential',
      ],
      housingTypes: 'Rural SFH, acreage lots, manufactured, limited multi-unit',
      challenges: [
        'Long empty miles and soft-shoulder or gravel access',
        'High-desert wind, winter ice, and limited staging space',
        'I-80 weather and construction freeflow',
      ],
      moverTips:
        'Survey rural driveway width, turnaround, and surface condition. Price empty miles and weather contingency honestly. Check WYDOT traveler info before load windows on I-80.',
      cityKeywords: [
        'sweetwater county',
        'farson',
        'wamsutter',
        'point of rocks',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Sweetwater County moving costs',
    intro:
      'Dual-city Rock Springs–Green River friction, energy-sector short-notice soft costs, I-80 empty miles, high-desert winter wind, and rural access drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Rock Springs multi-unit stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate core jobs.',
      },
      {
        title: 'Rock Springs ↔ Green River portal time',
        detail:
          'Dual-city pairs burn real hours even when map miles look short — especially on I-80 freeflow.',
      },
      {
        title: 'Energy / mining / trona turnover soft costs',
        detail:
          'Project cycles and industrial-adjacent housing spike labor and schedule risk.',
      },
      {
        title: 'I-80 / US-191 empty miles and winter wind / ice delays',
        detail:
          'Corridor pairs and high-desert approaches rewrite schedules; weather contingency is billable risk.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with walk-ups, dual-city pairs, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$4,200+',
        note: 'Core and dual-city friction trends up',
      },
      {
        label: '3–4+ BR / dual-city / rural / energy-edge',
        value: '$2,600–$8,500+',
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
    title: 'When to schedule a move in Sweetwater County',
    intro:
      'Energy and mining project cycles, family school calendars, dual-city lease turns, and high-desert winter wind reshape Rock Springs–Green River windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Clear core curb and reduce I-80 / US-191 pain before peak and wind events.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Book Rock Springs multi-unit and Green River residential Saturdays early.',
      },
      {
        title: 'Energy and industrial turnover windows',
        detail:
          'Short-notice industrial-edge turns fill crews first — book flexible dates when project calendars shift.',
      },
      {
        title: 'Winter wind, ice & I-80 corridor risk',
        detail:
          'Plan outdoor staging contingency and flexible start times November–March — check WYDOT traveler info before load windows.',
      },
    ],
  },
  specialized: [
    {
      id: 'rock-springs-green-river-i80',
      title: 'Rock Springs–Green River dual-city & I-80 logistics module',
      intro:
        'Sweetwater County estimates fail when dual-city addresses, energy-sector short notice, I-80 empty miles, or high-desert winter wind are ignored — and when crews treat this as a Cheyenne or Casper rename.',
      bullets: [
        'State Rock Springs vs Green River clearly on every estimate — dual markets, not one flat rate.',
        'Request Rock Springs multi-unit building packets early.',
        'Photo stair access, driveway geometry, and rural staging on energy-edge and high-desert jobs.',
        'Price I-80 · US-191 pairs portal-to-portal — especially Rock Springs ↔ Green River.',
        'Check WYDOT traveler information before winter and wind-event load windows.',
        'For pure in-state Wyoming jobs insist on WYDOT Operating Authority (Letter of Authority) matching the legal business name; verify FMCSA for any interstate leg — not CO PUC, MT, ID, UT, ND, SD, or NJ frameworks.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Sweetwater County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Rock Springs–Green River / I-80 corridor living, not Cheyenne or Casper product.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Sweetwater County School District #1 (Rock Springs area) and #2 (Green River area) and other systems serve different addresses. Confirm zoning carefully — dual-city geography means district lines are not interchangeable with marketing neighborhood names.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Wyoming Department of Education data beat ranking screenshots.',
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
              'Memorial Hospital of Sweetwater County and affiliated campuses anchor regional care. Confirm networks and specialist access for your household — complex care may route to larger metros along I-80.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times from Green River and rural edges into Rock Springs medical corridors. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Rock Springs multi-unit vs Green River SFH vs energy-edge vs rural stock',
            detail:
              'Rock Springs walk-ups, Green River residential belts, industrial-adjacent product, and high-desert rural homes price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Energy and mining demand cycles can tighten rentals and short-term housing. Budget for dual-city commute math and older-building repair risk near industrial edges.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Rock Springs core lifestyle',
            detail:
              'Commercial density and multi-unit living with stair, curb, and winter wind tradeoffs.',
          },
          {
            title: 'Green River county-seat pattern',
            detail:
              'Often quieter residential belts with I-80 portal time to Rock Springs employment and medical anchors.',
          },
          {
            title: 'Industrial / energy-edge pattern',
            detail: 'Proximity to shift work with short-notice turnover and mixed access logistics.',
          },
          {
            title: 'Rural high-desert pattern',
            detail:
              'Acreage and quieter approaches with gravel access, wind, and long empty miles into dual cores.',
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
              'Energy, mining and trona, logistics on I-80, healthcare, education, government, and regional retail shape employment across the Rock Springs–Green River corridor.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-80 and US-191 peaks and weather are real. Test drive peak and winter routes between Rock Springs, Green River, and industrial edges before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Rock Springs–Green River / I-80 corridor identity',
            detail:
              'Sweetwater County is southwestern Wyoming’s dual-city energy corridor — Rock Springs density, Green River county seat, and high-desert I-80 logistics — not Cheyenne capital product and not Casper mountain-hub product alone.',
          },
          {
            title: 'Climate',
            detail:
              'High-desert semi-arid climate with strong wind, cold winters, and I-80 weather risk. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Sweetwater County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify WYDOT Operating Authority (Letter of Authority) for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Sweetwater County, Wyoming — official site',
        href: 'https://www.sweetwatercountywy.gov/',
        external: true,
      },
      {
        label: 'City of Rock Springs — official site',
        href: 'https://www.rswy.net/',
        external: true,
        note: 'Primary commercial multi-unit context',
      },
      {
        label: 'City of Green River — official site',
        href: 'https://www.cityofgreenriver.org/',
        external: true,
        note: 'County seat municipal context',
      },
      {
        label: 'WYDOT — traveler information',
        href: 'https://www.wyoroad.info/',
        external: true,
        note: 'I-80 / US-191 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer Rock Springs multi-unit and Green River residential experience with honest I-80 · US-191 dual-city pricing and high-desert winter wind awareness. Insist on WYDOT Operating Authority (Letter of Authority) for intrastate WY moves; verify FMCSA interstate. Not CO PUC, MT, ID, UT, ND, SD, or NJ frameworks. This is Sweetwater County WY (Rock Springs–Green River / I-80) — not Cheyenne capital and not Casper.',
  lastReviewed: '2026-07-24',
});
