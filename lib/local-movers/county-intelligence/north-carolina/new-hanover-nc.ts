import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** New Hanover County, NC — Wilmington coastal (not mountain Buncombe, not Onslow PCS). */
export const newHanoverCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'new-hanover',
  hubTitle: 'New Hanover County Moving Intelligence Hub',
  eyebrow: 'New Hanover · Wilmington coastal, river/port & beach-adjacent logistics',
  h1: 'Moving in New Hanover County: Wilmington Coastal Access, Humidity & River Logistics',
  heroOpener:
    'New Hanover County is a coastal plain and river city market: downtown Wilmington historic streets, midtown multi-family, beach-adjacent and barrier logistics, humidity and storm risk, and an I-40 terminus that feeds long-distance arrivals without making every job a “local hop.” A downtown Wilmington walk-up, a midtown multi-family unit, a Monkey Junction HOA home, and a Wrightsville Beach–edge condo do not share truck access or staging rules. This hub is for New Hanover — not Asheville mountains and not Camp Lejeune PCS copy.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · Wilmington coastal humidity & storm awareness · Curated listings',
  majorCorridors: 'I-40 terminus · US-17 · US-74/76 · Oleander Drive · College Road',
  whatMakesDifferent: {
    title: 'What makes moving in New Hanover County different',
    intro: 'Coastal humidity, river/port adjacency, and beach-edge access — not Piedmont freeways or mountain grades.',
    bullets: [
      { title: 'Humidity and storm risk affect open staging', detail: 'Protect cardboard and electronics; confirm hurricane-season contingency language.' },
      { title: 'Downtown historic streets limit truck size', detail: 'Long carries and careful placement beat map-mile quotes.' },
      { title: 'Beach-adjacent and multi-unit product need COI and elevators', detail: 'Association rules can dominate labor hours near barrier approaches.' },
      { title: 'I-40 terminus feeds interstate arrivals', detail: 'Long-distance unload days still need local coastal logistics planning.' },
      { title: 'New Hanover is not Onslow', detail: 'Tourism and coastal residential patterns differ from Marine PCS-driven Jacksonville.' },
      { title: 'Intrastate NC rules vs interstate authority', detail: 'In-state household moves generally need NCUC C-#. Interstate needs FMCSA.' },
    ],
  },
  zonesHeading: 'New Hanover access zones',
  zonesIntro: 'Plan by downtown Wilmington, midtown multi-family, southern growth, beach-adjacent edges, and I-40 approach corridors.',
  zones: [
    {
      id: 'downtown-wilmington',
      name: 'Downtown Wilmington historic core',
      shortName: 'Downtown Wilmington',
      neighborhoods: ['Downtown', 'Historic District', 'Castle Street edges', 'Riverfront multi-unit'],
      housingTypes: 'Historic SFH, multi-story walk-ups, limited mid-rise',
      challenges: ['Tight streets', 'Tourism curb competition', 'Stairs common'],
      moverTips: 'Prefer mid-week mornings. Photo curb and stairs. Use smaller trucks when required.',
      cityKeywords: ['wilmington', 'downtown', 'historic district', 'riverfront'],
    },
    {
      id: 'midtown',
      name: 'Midtown multi-family & Oleander corridors',
      shortName: 'Midtown',
      neighborhoods: ['Midtown', 'Oleander Drive multi-family', 'Independence Boulevard edges', 'College Road multi-family'],
      housingTypes: 'Multi-family, townhomes, SFH',
      challenges: ['Elevators and guest parking', 'Arterial congestion', 'Lease-end waves'],
      moverTips: 'Confirm elevator reservations. Book month-end early. Build Oleander/College buffer.',
      cityKeywords: ['midtown', 'oleander', 'college road', 'independence'],
    },
    {
      id: 'south-growth',
      name: 'Southern growth & Monkey Junction edges',
      shortName: 'South growth',
      neighborhoods: ['Monkey Junction', 'Carolina Beach Road corridors', 'Southern HOA villages', 'Myrtle Grove edges'],
      housingTypes: 'HOA SFH, multi-family, townhomes',
      challenges: ['HOA rules', 'US-421 / beach-road congestion', 'Longer empty miles from downtown yards'],
      moverTips: 'Collect HOA packets. Prefer early starts for beach-road pairs.',
      cityKeywords: ['monkey junction', 'carolina beach road', 'myrtle grove'],
    },
    {
      id: 'beach-edge',
      name: 'Beach-adjacent & barrier approaches',
      shortName: 'Beach edge',
      neighborhoods: ['Wrightsville Beach edges', 'Harbor Island approaches', 'Landfall edges', 'Coastal multi-unit'],
      housingTypes: 'Condos, multi-unit, higher-value coastal SFH',
      challenges: ['Association rules', 'Bridge/approach timing', 'Humidity and salt-air inventory care'],
      moverTips: 'Get association packets early. Discuss valuation for higher-value coastal inventories. Confirm truck limits.',
      cityKeywords: ['wrightsville', 'harbor island', 'landfall', 'beach'],
    },
  ],
  costDrivers: {
    title: 'What drives New Hanover moving costs',
    intro: 'Historic-street access, coastal multi-unit rules, and humidity/storm risk drive quotes.',
    drivers: [
      { title: 'Downtown tight-street access', detail: 'Labor hours rise with long carries.' },
      { title: 'Coastal association elevators/COI', detail: 'Building rules dominate beach-edge product.' },
      { title: 'Humidity and storm contingency', detail: 'Protection and reschedule language matter.' },
      { title: 'I-40 terminus interstate unloads', detail: 'Long-distance arrivals still need local coastal logistics.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,350+', note: 'Higher with stairs or elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,300–$3,800+', note: 'Coastal association soft costs trend up' },
      { label: '3–4+ BR / beach-edge / long local', value: '$2,400–$7,200+', note: 'Barrier approaches price highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$180+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a New Hanover move',
    intro: 'Tourism peaks, student turns, and hurricane season reshape access.',
    items: [
      { title: 'Best windows: mid-week off-peak tourism mornings', detail: 'Clear downtown curb and reduce beach-road pain.' },
      { title: 'Summer tourism peak', detail: 'Book early; expect curb competition near riverfront and beaches.' },
      { title: 'Hurricane season awareness', detail: 'Late summer–fall; confirm contingency language before deposits.' },
      { title: 'University / multi-family lease waves', detail: 'May/August clusters near midtown multi-family.' },
    ],
  },
  specialized: [
    {
      id: 'wilmington-coastal',
      title: 'Wilmington coastal & humidity logistics module',
      intro: 'New Hanover estimates fail when historic streets or beach association rules are ignored.',
      bullets: [
        'Survey truck size limits on historic blocks early.',
        'Collect coastal association COI and elevator rules.',
        'Protect inventories for humidity and storm risk.',
        'Price Oleander, College, and US-17 pairs portal-to-portal.',
        'Verify NCUC C-# in-state and FMCSA interstate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to New Hanover County?',
    intro: 'Practical fit checklist — verify on official sources. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'New Hanover County Schools is the primary public K–12 system. Assignment is address-based.' },
          { title: 'Coastal geography', detail: 'Commute times can be tourism- and bridge-sensitive. Test drive peak routes.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and campus visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'Novant Health New Hanover and other facilities serve Wilmington corridors. Confirm networks.' },
          { title: 'What relocators should do', detail: 'Map peak-hour drive times from southern growth and beach edges. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Historic core vs beach-edge stock', detail: 'Older downtown product vs multi-unit coastal associations vs inland HOA growth.' },
          { title: 'Flood and insurance considerations', detail: 'Coastal and river-adjacent addresses may involve insurance realities beyond sticker price — verify with local experts.' },
          { title: 'HOA and condo governance', detail: 'Many multi-unit communities control move hours and truck size.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which New Hanover areas fit whom',
        bullets: [
          { title: 'Downtown historic lifestyle', detail: 'Walkable amenities with stair/curb tradeoffs.' },
          { title: 'Midtown multi-family pattern', detail: 'Employment access with elevator logistics.' },
          { title: 'Beach-edge lifestyle', detail: 'Coastal amenities with association and approach friction on move day.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Healthcare, port/logistics, education, tourism, and professional services shape employment.' },
          { title: 'Commute realism', detail: 'US-17, Oleander, College, and beach roads peak are real. Test drive peak routes.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'Coastal river-city identity', detail: 'New Hanover is geographically distinct from mountain Buncombe and Piedmont metros.' },
          { title: 'Climate', detail: 'Hot humid summers, storms, and hurricane-season risk. Plan staging contingency.' },
          { title: 'Tourism pace', detail: 'Peak visitor seasons change downtown and beach-road feel. Visit peak and off-peak.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful New Hanover resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'New Hanover County — official site', href: 'https://www.nhcgov.com/', external: true },
      { label: 'City of Wilmington', href: 'https://www.wilmingtonnc.gov/', external: true },
      { label: 'New Hanover County Schools', href: 'https://www.nhcs.net/', external: true },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer historic-street and coastal multi-unit experience; humidity/storm protection discipline; honest US-17/Oleander timing. Verify NCUC C-# and FMCSA.',
  lastReviewed: '2026-07-23',
});
