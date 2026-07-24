import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const oaklandCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "oakland",
  hubTitle: "Oakland County Moving Intelligence Hub",
  eyebrow: "Oakland · Troy/Birmingham/Rochester north-metro & I-75/I-696",
  h1: "Moving in Oakland County: Troy–Birmingham Suburbs, Corporate HQ Density & I-75/I-696 Logistics",
  heroOpener: "Oakland County is Detroit’s affluent north-metro collar: Troy and Auburn Hills corporate campuses, Birmingham and Royal Oak village cores, Rochester Hills HOA product, and I-75/I-696/M-59 portal time that is not Detroit walk-up logistics and not Grand Rapids west-MI. A Birmingham condo, a Troy executive two-story, a Pontiac multi-family unit, and a Rochester Hills HOA ranch do not share truck access or empty-mile risk. This hub is for Oakland — not a Wayne clone or Macomb industrial-east page.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-75 · I-696 · M-59 · Telegraph · Woodward corridors",
  whatMakesDifferent: {
    title: "What makes moving in Oakland County different",
    intro: "These are north-metro Oakland realities — corporate HQ density, HOA villages, and Woodward/Telegraph logistics — not Detroit core alleys or Macomb east-metro industrial mix.",
    bullets: [
      {
        title: "Troy / Auburn Hills corporate density shapes relo calendars",
        detail: "Hard report dates and executive inventories appear more often than pure city lease waves.",
      },
      {
        title: "Birmingham / Royal Oak village cores mix curb limits and multi-unit stock",
        detail: "Limited staging and elevators rewrite labor hours near walkable cores.",
      },
      {
        title: "HOA growth suburbs are not Detroit product",
        detail: "Gate lists, driveway rules, and longer empty miles differ from Wayne city stock.",
      },
      {
        title: "I-75 / I-696 / M-59 define portal-to-portal time",
        detail: "North-south and east-west pairs look short on maps and regional at peak.",
      },
      {
        title: "North-metro identity is not Macomb east-metro",
        detail: "Corporate/HOA mix differs from Warren/Sterling Heights industrial-suburban patterns.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Oakland access zones",
  zonesIntro: "Plan by Troy/Auburn Hills corporate corridors, Birmingham/Royal Oak cores, Rochester Hills north, and Pontiac/west-Oakland edges.",
  zones: [
    {
      id: "troy-auburn",
      name: "Troy, Auburn Hills & corporate corridors",
      shortName: "Troy / Auburn Hills",
      neighborhoods: ["Troy","Auburn Hills","Bloomfield Twp edges","Rochester Road corridors"],
      housingTypes: "Executive SFH, multi-family, corporate-adjacent housing",
      challenges: ["I-75 congestion","HOA packets","Corporate hard dates"],
      moverTips: "Align crew days with report dates. Collect HOA and building packets early.",
      cityKeywords: ["troy","auburn hills"],
    },
    {
      id: "birmingham-royal-oak",
      name: "Birmingham, Royal Oak & south-Oakland villages",
      shortName: "Birmingham / Royal Oak",
      neighborhoods: ["Birmingham","Royal Oak","Berkley","Clawson","Ferndale edges"],
      housingTypes: "Village multi-unit, condos, older SFH, renovated stock",
      challenges: ["Limited curb staging","Elevators/COI","Woodward peak traffic"],
      moverTips: "Prefer mid-week mornings. Survey truck length and elevator reservations.",
      cityKeywords: ["birmingham","royal oak","ferndale"],
    },
    {
      id: "rochester-north",
      name: "Rochester Hills & northern Oakland",
      shortName: "Rochester north",
      neighborhoods: ["Rochester Hills","Rochester","Lake Orion edges","Oakland Twp edges"],
      housingTypes: "HOA SFH, multi-family, lake-adjacent stock",
      challenges: ["M-59 congestion","HOA rules","Longer portal time to Detroit core"],
      moverTips: "Price empty miles honestly. Photo driveway grades and HOA access rules.",
      cityKeywords: ["rochester hills","rochester","lake orion"],
    },
    {
      id: "pontiac-west",
      name: "Pontiac, Farmington Hills & west-Oakland edges",
      shortName: "Pontiac / west-Oakland",
      neighborhoods: ["Pontiac","Farmington Hills","Novi edges","Southfield edges","Waterford edges"],
      housingTypes: "Multi-family, SFH, mixed suburban stock",
      challenges: ["I-696 / Telegraph congestion","Mixed elevators and stairs","Winter access"],
      moverTips: "Clarify west-Oakland vs south-Oakland destinations. Survey multi-unit access type.",
      cityKeywords: ["pontiac","farmington hills","novi","southfield"],
    }
  ],
  costDrivers: {
    title: "What drives Oakland County moving costs",
    intro: "HOA/elevator friction, executive inventories, and I-75/I-696 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Village-core curb & elevator friction", detail: "Birmingham/Royal Oak labor hours spike." },
      { title: "HOA soft costs", detail: "Gate lists push demand into peak windows." },
      { title: "I-75 / I-696 / M-59 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Corporate hard-date premiums", detail: "Short windows raise weekend demand." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$550–$1,700+", note: "Higher near village elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,600–$4,500+", note: "HOA and curb friction trends up" },
      { label: "3–4+ BR / executive / cross-metro", value: "$3,000–$9,000+", note: "Executive inventories and long pairs highest" },
      { label: "Typical 2-person crew rate", value: "$120–$195+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Oakland County",
    intro: "Corporate calendars, school-year suburb demand, summer peak, and winter ice reshape north-metro windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-75/I-696 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book HOA Saturdays early." },
      { title: "Corporate Q-end transfers", detail: "Hard dates cluster around fiscal and plant calendars." },
      { title: "Winter ice and snow", detail: "Confirm driveway and hillside contingency north of M-59." }
    ],
  },
  specialized: [
    {
      id: "oakland-troy-birmingham-corporate",
      title: "Troy/Birmingham north-metro & corporate HQ module",
      intro: "Oakland estimates fail when HOA packets, village curb limits, or I-75/I-696 empty miles are ignored.",
      bullets: ["Collect HOA and elevator packets before final quotes on Troy, Birmingham, and Royal Oak stock.","Price I-75/I-696/M-59 pairs portal-to-portal — not as pure local flat rates.","Separate executive inventory scopes from standard suburban SFH.","Clarify Oakland vs Wayne/Macomb destinations on multi-county estimates.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Oakland County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Numerous high-performing suburban districts (Troy, Birmingham, Rochester, Novi, and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Michigan Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Corewell/Beaumont sites, Henry Ford West Bloomfield, and other systems serve north-metro corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Rochester and Novi edges into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Village multi-unit vs HOA executive stock", detail: "Birmingham/Royal Oak product differs from Rochester Hills and Troy two-stories." },
          { title: "Cost variation", detail: "North-metro premium suburbs often price differently from Pontiac multi-family." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Birmingham / Royal Oak lifestyle", detail: "Walkable villages with curb and elevator tradeoffs." },
          { title: "Troy / Auburn Hills pattern", detail: "Corporate adjacency with HOA and multi-family mix." },
          { title: "Rochester north pattern", detail: "HOA product with longer portal time to Detroit core." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Auto suppliers, tech/professional campuses, healthcare, and corporate HQs shape north-metro employment." },
          { title: "Commute realism", detail: "I-75, I-696, and M-59 peaks are real. Test drive peak routes before choosing a submarket." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "North-metro identity", detail: "Oakland is affluent north Detroit metro — not Wayne city alleys or Macomb east industrial-suburban defaults." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Oakland County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Oakland County — official site", href: "https://www.oakgov.com/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer HOA/village-core experience and honest I-75/I-696 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
