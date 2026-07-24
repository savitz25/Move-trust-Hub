import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const williamsonCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "williamson",
  hubTitle: "Williamson County Moving Intelligence Hub",
  eyebrow: "Williamson · Franklin/Brentwood affluent suburbs & higher-value inventory",
  h1: "Moving in Williamson County: Franklin Estates, Brentwood Access & I-65 Logistics",
  heroOpener: "Williamson County is Nashville’s premium south corridor: Franklin and Brentwood estate and HOA product, Cool Springs multi-family and corporate campuses, higher-value inventories that need careful handling, and I-65 portal time that is not Rutherford growth-tract logistics and not downtown Davidson elevators. A Brentwood estate, a Franklin historic-district home, a Cool Springs mid-rise, and a Nolensville-edge HOA two-story do not share truck access or handling expectations. This hub is for Williamson — not a Rutherford or Sumner clone.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-65 · TN-840 · US-31 · Cool Springs Blvd · Hillsboro Rd corridors",
  whatMakesDifferent: {
    title: "What makes moving in Williamson County different",
    intro: "Premium south-Nashville suburbs with higher-value inventory and dense HOA rules — not Murfreesboro growth tracts or Hendersonville lake edges.",
    bullets: [
      {
        title: "Higher-value inventory is common",
        detail: "Discuss valuation, padding, and specialty handling early — cheap released-value coverage is often inadequate.",
      },
      {
        title: "HOA and estate access dominate many addresses",
        detail: "Gate lists, long driveways, and approved hours are routine.",
      },
      {
        title: "I-65 defines Nashville-linked portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Cool Springs multi-unit is elevator product",
        detail: "Building packets still apply even outside downtown Nashville.",
      },
      {
        title: "Williamson is not Rutherford",
        detail: "Premium access and handling expectations differ from southeast growth-tract moves.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Williamson access zones",
  zonesIntro: "Plan by Franklin core/estates, Brentwood, Cool Springs multi-family, and eastern/southern growth edges.",
  zones: [
    {
      id: "franklin",
      name: "Franklin historic core & estate edges",
      shortName: "Franklin",
      neighborhoods: ["Franklin","Downtown Franklin edges","Fieldstone Farms edges","Estate corridors"],
      housingTypes: "Historic SFH, estates, HOA villages, some multi-family",
      challenges: ["Tight historic streets","Long estate driveways","HOA rules"],
      moverTips: "Survey driveway length. Collect HOA packets. Prefer mid-week mornings near downtown Franklin.",
      cityKeywords: ["franklin","fieldstone","williamson"],
    },
    {
      id: "brentwood",
      name: "Brentwood estates & multi-family",
      shortName: "Brentwood",
      neighborhoods: ["Brentwood","Maryland Farms edges","Concord Rd corridors","Estate HOAs"],
      housingTypes: "Estates, HOA SFH, multi-family",
      challenges: ["Gate lists","High-value contents","I-65 congestion"],
      moverTips: "Discuss valuation early. Photo gate and driveway. Build I-65 buffer.",
      cityKeywords: ["brentwood","maryland farms"],
    },
    {
      id: "cool-springs",
      name: "Cool Springs corporate & multi-unit",
      shortName: "Cool Springs",
      neighborhoods: ["Cool Springs","Mallory Station multi-family","Carothers multi-family"],
      housingTypes: "Mid-rise multi-family, townhomes",
      challenges: ["Elevators and COI","Retail/corporate congestion","Lease-end waves"],
      moverTips: "Reserve elevators in writing. Prefer early starts. Confirm building packets.",
      cityKeywords: ["cool springs","mallory station"],
    },
    {
      id: "east-south-growth",
      name: "Nolensville-edge & southern growth",
      shortName: "E/S growth",
      neighborhoods: ["Nolensville edges","Thompson Station edges","Southern HOA villages"],
      housingTypes: "HOA SFH, townhomes",
      challenges: ["Long empty miles","HOA density","County-line confusion with Rutherford/Davidson"],
      moverTips: "Clarify county lines. Price long pairs honestly. Collect HOA packets.",
      cityKeywords: ["nolensville","thompson station"],
    }
  ],
  costDrivers: {
    title: "What drives Williamson County moving costs",
    intro: "Higher-value handling, HOA soft costs, and I-65 portal time drive quotes above typical growth-suburb averages.",
    drivers: [
      { title: "High-value inventory handling", detail: "Specialty protection and survey rigor raise labor hours." },
      { title: "Estate and HOA access rules", detail: "Gate lists and long carries dominate many jobs." },
      { title: "I-65 Nashville-linked congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Cool Springs elevator buildings", detail: "COI and wait time add cost." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$500–$1,500+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,600–$4,500+", note: "HOA and handling soft costs trend up" },
      { label: "3–4+ BR estate / high-value", value: "$3,000–$9,500+", note: "Estates and careful-handling inventories price highest" },
      { label: "Typical 2-person crew rate", value: "$120–$200+/hr", note: "Portal-to-portal; specialty crews scale up" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Williamson County",
    intro: "Family seasons and corporate calendars reshape premium-suburb access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-65 pain and clear HOA hours." },
      { title: "Peak family season: late May–mid-August", detail: "Book estate and HOA Saturdays early." },
      { title: "Corporate apartment turns", detail: "Mid-month Cool Springs demand competes with weekend SFH." },
      { title: "Summer heat and storms", detail: "Prefer early starts; protect high-value outdoor staging." }
    ],
  },
  specialized: [
    {
      id: "williamson-premium-hoa",
      title: "Franklin/Brentwood premium HOA & high-value module",
      intro: "Williamson estimates fail when estate access or valuation is treated as generic suburb work.",
      bullets: ["Discuss valuation and specialty handling at survey.","Collect HOA and gate packets early.","Survey long driveways and truck turn radius on estates.","Price I-65 Davidson pairs portal-to-portal.","Do not reuse Rutherford growth-tract assumptions here.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Williamson County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Williamson County Schools and Franklin Special School District serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Tennessee DOE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Williamson Medical Center and Nashville-metro systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour I-65 times into Davidson specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Premium HOA and estate stock", detail: "Higher purchase prices often pair with stricter move-day rules and higher-value contents." },
          { title: "Cool Springs multi-unit", detail: "Elevator product with corporate lease dynamics." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Franklin lifestyle", detail: "Historic core amenities with estate and HOA logistics." },
          { title: "Brentwood pattern", detail: "Premium residential with gate and driveway access friction." },
          { title: "Cool Springs multi-unit", detail: "Corporate proximity with elevator tradeoffs." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents work in Davidson; Cool Springs corporate campuses and healthcare also employ locals." },
          { title: "Commute realism", detail: "I-65 peaks are real. Test drive peak routes into Nashville." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Premium south-corridor identity", detail: "Williamson is distinct from Rutherford growth tracts and Sumner lake-edge suburbs." },
          { title: "Climate", detail: "Hot humid summers and storms. Plan outdoor staging contingency for high-value goods." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Williamson County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Williamson County — official site", href: "https://www.williamsoncounty-tn.gov/", external: true },
      { label: "City of Franklin", href: "https://www.franklintn.gov/", external: true },
      { label: "City of Brentwood", href: "https://www.brentwoodtn.gov/", external: true },
      { label: "Williamson County Schools", href: "https://www.wcs.edu/", external: true },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer high-value handling and estate/HOA fluency; Cool Springs elevator experience; honest I-65 pricing. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
