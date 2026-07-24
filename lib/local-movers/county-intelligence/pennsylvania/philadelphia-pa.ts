import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const philadelphiaCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "philadelphia",
  hubTitle: "Philadelphia County Moving Intelligence Hub",
  eyebrow: "Philadelphia · Center City elevators, rowhomes & neighborhood micro-markets",
  h1: "Moving in Philadelphia: Rowhomes, Center City COIs & I-95/I-76 Logistics",
  heroOpener: "Philadelphia County is the city itself: Center City towers with COI and freight elevators, South Philly and Fishtown rowhomes on narrow streets, Northeast multi-family corridors, and Northwest hills that are not Montgomery Main Line HOA product. A Center City condo, a South Philly rowhome, a Northeast apartment, and a Northwest twin do not share truck access or I-95/I-76 portal time. This hub is for Philadelphia — not a collar-county clone and not renamed Brooklyn or Jersey City copy.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-95 · I-76 · I-676 · US-1 · Roosevelt Blvd · Broad Street",
  whatMakesDifferent: {
    title: "What makes moving in Philadelphia County different",
    intro: "These are city-of-Philadelphia realities — rowhome curb limits, Center City elevators, and neighborhood micro-markets — not Main Line suburbs or Pittsburgh hills.",
    bullets: [
      {
        title: "Rowhomes and narrow streets dominate many neighborhoods",
        detail: "Limited legal truck length, long carries, and stoops define labor hours more than square footage alone.",
      },
      {
        title: "Center City elevators make COI the default downtown",
        detail: "Building packets, freight elevators, and fixed windows prevent day-of refusals.",
      },
      {
        title: "I-95 / I-76 / I-676 rewrite portal-to-portal time",
        detail: "Cross-city pairs look local on maps and regional at peak.",
      },
      {
        title: "Northeast, Northwest, South, and West are different products",
        detail: "Do not price Fishtown like Northeast multi-family or Center City towers.",
      },
      {
        title: "Collar-county pairs are routine but not “city local”",
        detail: "Montgomery, Bucks, Delaware, and Chester destinations need clear county lines for drive time and PA PUC vs FMCSA assumptions.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Philadelphia access zones",
  zonesIntro: "Plan by Center City, South Philly, Northeast, Northwest, and West/University corridors.",
  zones: [
    {
      id: "center-city",
      name: "Center City & elevated core",
      shortName: "Center City",
      neighborhoods: ["Center City","Rittenhouse","Washington Square West","Old City edges","Logan Square"],
      housingTypes: "High-rises, mid-rises, condos, some rowhomes",
      challenges: ["Near-universal COI and elevators","Scarce curb staging","Event-day congestion"],
      moverTips: "Get building packets early. Prefer mid-week morning freight windows.",
      cityKeywords: ["philadelphia","center city","rittenhouse","old city"],
    },
    {
      id: "south-philly",
      name: "South Philadelphia rowhome corridors",
      shortName: "South Philly",
      neighborhoods: ["South Philadelphia","Passyunk","Point Breeze","Graduate Hospital edges"],
      housingTypes: "Rowhomes, twins, limited multi-family",
      challenges: ["Narrow streets","Limited truck length","Long carries and stoops"],
      moverTips: "Photo curb and street width. Prefer smaller trucks when required.",
      cityKeywords: ["south philly","passyunk","point breeze"],
    },
    {
      id: "northeast",
      name: "Northeast Philadelphia multi-family & SFH",
      shortName: "Northeast",
      neighborhoods: ["Northeast Philadelphia","Roosevelt Blvd corridors","Mayfair","Bustleton edges"],
      housingTypes: "Multi-family, twins, SFH",
      challenges: ["Roosevelt Blvd congestion","Elevator buildings","Long portal time to Center City"],
      moverTips: "Build Blvd buffer. Confirm elevator vs stair access.",
      cityKeywords: ["northeast philadelphia","mayfair","bustleton","roosevelt"],
    },
    {
      id: "northwest",
      name: "Northwest hills & twin stock",
      shortName: "Northwest",
      neighborhoods: ["Northwest Philadelphia","Germantown","Mount Airy","Chestnut Hill edges"],
      housingTypes: "Twins, older SFH, multi-unit",
      challenges: ["Hills and stairs","Tree-lined narrow streets","Winter access"],
      moverTips: "Survey grade and curb. Prefer mid-week mornings.",
      cityKeywords: ["germantown","mount airy","chestnut hill","northwest"],
    },
    {
      id: "west-university",
      name: "West Philly & University City",
      shortName: "West / University City",
      neighborhoods: ["University City","West Philadelphia","Spruce Hill","Powelton edges"],
      housingTypes: "Multi-unit, rowhomes, student multi-family",
      challenges: ["Lease-end waves","Mixed elevators and stairs","I-76 approach congestion"],
      moverTips: "Book academic peaks early. Confirm unit access type.",
      cityKeywords: ["university city","west philadelphia","powelton"],
    }
  ],
  costDrivers: {
    title: "What drives Philadelphia County moving costs",
    intro: "Rowhome access, elevators, and expressway portal time drive quotes more than square footage alone.",
    drivers: [
      { title: "Center City elevator / COI buildings", detail: "Labor and wait time dominate core jobs." },
      { title: "Rowhome long carries", detail: "Narrow streets raise labor hours." },
      { title: "I-95 / I-76 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Collar-county empty miles", detail: "Suburban destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,400+", note: "Higher with elevators or narrow streets" },
      { label: "2–3BR rowhome or condo", value: "$1,400–$4,000+", note: "Stoops and COI soft costs trend up" },
      { label: "3–4+ BR / tower / cross-city", value: "$2,600–$7,800+", note: "Center City towers and long I-95 pairs highest" },
      { label: "Typical 2-person crew rate", value: "$110–$185+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Philadelphia County",
    intro: "Lease turns, university calendars, heat/humidity, and winter storms reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-95/I-76 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book early for multi-family and rowhome Saturdays." },
      { title: "University lease waves", detail: "May/August clusters near University City multi-family." },
      { title: "Winter ice and snow", detail: "Hills and narrow streets need weather contingency language." }
    ],
  },
  specialized: [
    {
      id: "philly-rowhome-centercity",
      title: "Philadelphia rowhome & Center City elevator module",
      intro: "Philadelphia estimates fail when curb width or building packets are ignored.",
      bullets: ["Request Center City building packets at lease signing or escrow.","Survey street width and truck length for rowhome blocks.","Price I-95/I-76 pairs portal-to-portal.","Clarify Philadelphia vs Montgomery/Bucks/Delaware/Chester destinations.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Philadelphia County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "School District of Philadelphia is the primary public K–12 system. Assignment is address-based." },
          { title: "Research sources", detail: "District tools, Pennsylvania PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Penn Medicine, Jefferson, Temple, CHOP, and other facilities serve city corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Northeast or Northwest. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Rowhome vs tower stock", detail: "Most neighborhoods are rowhomes/twins; vertical product concentrates Center City and select multi-family corridors." },
          { title: "Cost variation", detail: "Prices vary sharply by neighborhood. Budget condo fees and parking constraints downtown." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Center City lifestyle", detail: "Walkable amenities with elevator tradeoffs." },
          { title: "South Philly pattern", detail: "Rowhome density with narrow-street logistics." },
          { title: "Northeast / Northwest pattern", detail: "More multi-family or twin stock with longer portal time to core jobs." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, education, professional services, logistics, and hospitality shape employment." },
          { title: "Commute realism", detail: "I-95, I-76, and SEPTA-oriented cores still leave many car-dependent edges. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "City-county identity", detail: "Philadelphia is not a collar-county suburb and not Pittsburgh hills — neighborhood micro-markets dominate." },
          { title: "Climate", detail: "Hot humid summers, winter ice/snow. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Philadelphia County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "City of Philadelphia", href: "https://www.phila.gov/", external: true },
      { label: "School District of Philadelphia", href: "https://www.philasd.org/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer Center City elevator/COI experience and rowhome curb surveys; honest I-95/I-76 pricing. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
