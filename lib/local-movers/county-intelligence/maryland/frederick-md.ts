import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMdPack } from '@/lib/local-movers/county-intelligence/maryland/md-shared';

export const frederickCountyMdIntelligence: CountyIntelligencePack = finalizeMdPack({
  countySlug: "frederick",
  hubTitle: "Frederick County Moving Intelligence Hub",
  eyebrow: "Frederick · I-270 growth corridor, DC-commute west & US-15/I-70",
  h1: "Moving in Frederick County: I-270 Growth Corridor, DC-West Commute & US-15/I-70 Logistics",
  heroOpener: "Frederick County is western growth-corridor Maryland — not Montgomery core: downtown Frederick multi-unit, Urbana/I-270 HOA growth, US-15 north stock, and I-70/I-270 portal time that is not Bethesda elevators and not Baltimore metro ring product. A downtown Frederick condo, an Urbana two-story, and a Thurmont-edge home do not share truck access or empty-mile risk. This hub is for Frederick — not a Montgomery clone.",
  heroCredibility:
    'Maryland household goods mover registration (Dept. of Labor) for intrastate MD moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-70 · I-270 · US-15 · US-40",
  whatMakesDifferent: {
    title: "What makes moving in Frederick County different",
    intro: "These are western growth-corridor realities — longer DC-commute empty miles, historic downtown stock, and I-270 timing — not close-in Bethesda product.",
    bullets: [
      {
        title: "I-270 DC-commute growth rewrites empty-mile math",
        detail: "Pairs toward Montgomery look regional at peak — price portal-to-portal.",
      },
      {
        title: "Downtown Frederick multi-unit differs from Urbana HOA product",
        detail: "Historic streets and elevators are not gate-list suburbs.",
      },
      {
        title: "I-70 / US-15 define cross-county portal time",
        detail: "North-south and east-west pairs are longer than map glances suggest.",
      },
      {
        title: "Not Montgomery core density as the default",
        detail: "Frederick is west-corridor growth with its own inventory patterns.",
      },
      {
        title: "School and family peaks still matter in growth villages",
        detail: "Summer Saturdays fill HOA crews first.",
      },
      {
        title: "Intrastate Maryland HHG registration vs interstate FMCSA",
        detail: "Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Frederick access zones",
  zonesIntro: "Plan by downtown Frederick, Urbana/I-270 south growth, north US-15 corridors, and east toward Mount Airy edges.",
  zones: [
    {
      id: "frederick-core",
      name: "Downtown Frederick & near-core multi-unit",
      shortName: "Downtown Frederick",
      neighborhoods: ["Downtown Frederick","Baker Park edges","East Frederick edges"],
      housingTypes: "Multi-unit, renovated SFH, mid-rises",
      challenges: ["Curb staging","Elevators and stairs","Event-day congestion"],
      moverTips: "Prefer mid-week mornings. Confirm elevator reservations.",
      cityKeywords: ["frederick","downtown frederick"],
    },
    {
      id: "urbana-i270",
      name: "Urbana, I-270 south growth & HOA villages",
      shortName: "Urbana / I-270",
      neighborhoods: ["Urbana","Ballenger Creek edges","Buckeystown edges","I-270 corridors"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["I-270 congestion","HOA rules","Longer portal time to Montgomery"],
      moverTips: "Collect HOA packets. Price I-270 pairs portal-to-portal.",
      cityKeywords: ["urbana","ballenger creek"],
    },
    {
      id: "us15-north",
      name: "Thurmont, Emmitsburg approaches & north US-15",
      shortName: "North US-15",
      neighborhoods: ["Thurmont","Emmitsburg edges","Walkersville edges"],
      housingTypes: "SFH, rural stock, limited multi-family",
      challenges: ["Longer empty miles","US-15 timing","Winter access"],
      moverTips: "Price north pairs honestly. Photo driveway and turn radius.",
      cityKeywords: ["thurmont","walkersville","emmitsburg"],
    },
    {
      id: "east-frederick",
      name: "New Market, Mount Airy edges & east corridors",
      shortName: "East Frederick",
      neighborhoods: ["New Market","Mount Airy edges","I-70 east corridors"],
      housingTypes: "HOA SFH, multi-family, small-town stock",
      challenges: ["I-70 congestion","Longer empty miles to core","HOA pockets"],
      moverTips: "Clarify Frederick vs Carroll destinations. Collect HOA packets.",
      cityKeywords: ["new market","mount airy"],
    }
  ],
  costDrivers: {
    title: "What drives Frederick County moving costs",
    intro: "Growth-corridor empty miles and HOA friction drive quotes more than bedroom count alone.",
    drivers: [
      { title: "I-270 / I-70 long empty miles", detail: "Portal-to-portal spikes on DC-commute pairs." },
      { title: "HOA soft costs on Urbana growth", detail: "Gate lists push peak windows." },
      { title: "Downtown curb & multi-unit friction", detail: "Core labor hours spike." },
      { title: "Winter ice on northern approaches", detail: "Confirm driveway contingency." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,450+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,350–$3,900+", note: "HOA friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,400–$7,800+", note: "Montgomery/DC pairs highest" },
      { label: "Typical 2-person crew rate", value: "$105–$180+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Frederick County",
    intro: "Growth-suburb family peaks, downtown events, and winter ice reshape windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-270 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book Urbana Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Downtown elevators fill first." },
      { title: "Winter ice and snow", detail: "Confirm contingency especially north of Frederick." }
    ],
  },
  specialized: [
    {
      id: "frederick-i270-growth-corridor",
      title: "Frederick I-270 growth corridor module",
      intro: "Frederick estimates fail when I-270 empty miles or HOA packets are treated like close-in Montgomery jobs.",
      bullets: ["Price I-270/I-70 pairs portal-to-portal toward Montgomery and DC.","Collect Urbana HOA packets early.","Survey downtown Frederick curb separately from growth suburbs.","Do not treat Frederick as a Montgomery core clone.","Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Frederick County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Frederick County Public Schools serves most addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "FCPS tools and Maryland State Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Frederick Health Hospital and other systems serve west-corridor communities. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Urbana and Thurmont into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Downtown multi-unit vs I-270 HOA growth", detail: "Historic-adjacent product differs from Urbana two-stories." },
          { title: "Cost variation", detail: "Close-in renovated stock often prices differently from northern rural SFH." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Downtown Frederick lifestyle", detail: "Walkable amenities with curb tradeoffs." },
          { title: "Urbana growth pattern", detail: "HOA product with I-270 logistics." },
          { title: "North US-15 pattern", detail: "Longer empty miles and rural access." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Healthcare, government, biotech/federal adjacency, logistics, and DC-commute professional jobs shape employment." },
          { title: "Commute realism", detail: "I-270 peaks toward Montgomery/DC are first-class planning factors." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Western growth-corridor identity", detail: "Frederick is west-of-Montgomery growth — not Bethesda density or Baltimore metro ring as the default." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Frederick County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Frederick County — official site", href: "https://www.frederickcountymd.gov/", external: true },
      { label: "City of Frederick", href: "https://www.cityoffrederickmd.gov/", external: true },
      { label: "MDOT CHART traffic", href: "https://chart.maryland.gov/", external: true }
    ],
  },
  directoryHint: "Prefer growth-corridor HOA experience and honest I-270 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
