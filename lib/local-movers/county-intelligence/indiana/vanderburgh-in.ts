import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeInPack } from '@/lib/local-movers/county-intelligence/indiana/in-shared';

export const vanderburghCountyInIntelligence: CountyIntelligencePack = finalizeInPack({
  countySlug: "vanderburgh",
  hubTitle: "Vanderburgh County Moving Intelligence Hub",
  eyebrow: "Vanderburgh · Evansville, Ohio River / tri-state & I-69/US-41",
  h1: "Moving in Vanderburgh County: Evansville Access, Ohio River Logistics & I-69/US-41 Corridors",
  heroOpener: "Vanderburgh County is southwest Indiana river-city logistics — not Indianapolis south clone: Evansville multi-unit and older stock, Ohio River / tri-state adjacency (KY/IL), west-side industrial corridors, and I-69/US-41 portal time that is not Marion/I-465 product and not Purdue university waves. A downtown Evansville multi-unit, an east-side HOA two-story, and a west industrial-adjacent ranch do not share truck access or empty-mile risk. This hub is for Vanderburgh — not an Indy rename.",
  heroCredibility:
    'Indiana DOR household goods operating authority (IC 8-2.1-22) for intrastate IN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-69 · US-41 · SR-62 · SR-66",
  whatMakesDifferent: {
    title: "What makes moving in Vanderburgh County different",
    intro: "These are Evansville / Ohio River realities — tri-state logistics, river-city access, and US-41 timing — not Indianapolis collar HOA defaults.",
    bullets: [
      {
        title: "Ohio River / tri-state pairs often need FMCSA",
        detail: "KY and IL destinations leave Indiana authority — clarify early.",
      },
      {
        title: "Evansville core multi-unit differs from east-side HOA product",
        detail: "Stairs, elevators, and curb limits rewrite near-core labor hours.",
      },
      {
        title: "I-69 / US-41 define portal-to-portal time",
        detail: "Pairs toward Indy look long-regional; price empty miles honestly.",
      },
      {
        title: "Not an Indianapolis south clone",
        detail: "River-city and industrial mix differs from Marion/I-465 product.",
      },
      {
        title: "West industrial corridors reshape crew timing",
        detail: "Shift-change windows matter near manufacturing belts.",
      },
      {
        title: "Intrastate Indiana DOR HHG authority vs interstate FMCSA",
        detail: "Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Vanderburgh access zones",
  zonesIntro: "Plan by downtown Evansville, east-side suburbs, west industrial edges, and north township growth.",
  zones: [
    {
      id: "evansville-core",
      name: "Downtown Evansville & near-core multi-unit",
      shortName: "Downtown Evansville",
      neighborhoods: ["Downtown Evansville","near-core multi-family","riverfront edges"],
      housingTypes: "Multi-unit, renovated stock, mid-rises",
      challenges: ["Elevators and stairs","Scarce curb staging","Event-day congestion"],
      moverTips: "Get building packets early. Prefer mid-week mornings.",
      cityKeywords: ["evansville","downtown"],
    },
    {
      id: "east-side",
      name: "East Evansville suburbs & HOA growth",
      shortName: "East side",
      neighborhoods: ["East Evansville","Newburgh edges","SR-66 corridors"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","SR-66 congestion","Longer portal time to core"],
      moverTips: "Collect HOA packets. Price east pairs portal-to-portal.",
      cityKeywords: ["east evansville","newburgh"],
    },
    {
      id: "west-industrial",
      name: "West side industrial-adjacent corridors",
      shortName: "West industrial",
      neighborhoods: ["West Evansville","industrial corridors","US-41 west"],
      housingTypes: "SFH, multi-family, industrial-adjacent stock",
      challenges: ["Industrial traffic","Older access","US-41 congestion"],
      moverTips: "Avoid shift peaks when flexible. Survey older stock carefully.",
      cityKeywords: ["west evansville"],
    },
    {
      id: "north-growth",
      name: "North township growth edges",
      shortName: "North growth",
      neighborhoods: ["Darmstadt edges","north township stock","I-69 approaches"],
      housingTypes: "SFH, multi-family, growth suburbs",
      challenges: ["Longer empty miles","I-69 timing","Winter access"],
      moverTips: "Price north pairs honestly. Photo driveway access.",
      cityKeywords: ["darmstadt"],
    }
  ],
  costDrivers: {
    title: "What drives Vanderburgh County moving costs",
    intro: "Core access friction and long I-69 empty miles drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Core multi-unit & curb friction", detail: "Downtown labor hours spike." },
      { title: "I-69 / US-41 empty miles", detail: "Portal-to-portal spikes on Indy and tri-state pairs." },
      { title: "HOA soft costs on east side", detail: "Gate lists push peak windows." },
      { title: "Tri-state authority soft costs", detail: "FMCSA may apply when any leg leaves Indiana." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$380–$1,300+", note: "Higher with elevators or long carries" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "Core friction trends up" },
      { label: "3–4+ BR / cross-metro / tri-state", value: "$2,100–$6,800+", note: "Indy or KY/IL pairs highest" },
      { label: "Typical 2-person crew rate", value: "$90–$165+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Vanderburgh County",
    intro: "Family peaks, multi-family turns, industrial calendars, and winter ice reshape Evansville windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce US-41 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book east-side Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Core elevators fill first." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "evansville-vanderburgh-ohio-river",
      title: "Evansville Ohio River / tri-state module",
      intro: "Vanderburgh estimates fail when tri-state authority or I-69 empty miles are treated like Indianapolis collar defaults.",
      bullets: ["Clarify Indiana vs Kentucky/Illinois destinations before quoting authority.","Price I-69/US-41 pairs portal-to-portal toward Indy or the river.","Survey downtown multi-unit access carefully.","Do not treat Vanderburgh as an Indy south clone.","Verify Indiana DOR household goods authority for pure in-state jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Vanderburgh County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Evansville Vanderburgh School Corporation and other systems serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Indiana Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Deaconess, Ascension St. Vincent Evansville, and other systems serve southwest corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from east-side growth into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Core multi-unit vs east HOA vs west industrial-adjacent", detail: "Submarkets differ sharply within short distances." },
          { title: "Cost variation", detail: "Near-core renovated stock often prices differently from north multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Downtown Evansville lifestyle", detail: "River-city amenities with multi-unit tradeoffs." },
          { title: "East suburban pattern", detail: "HOA product with SR-66 logistics." },
          { title: "West industrial-adjacent pattern", detail: "Plant traffic and older stock access." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing, logistics, education, and tri-state professional services shape employment." },
          { title: "Commute realism", detail: "US-41 and I-69 peaks are real — especially for tri-state workers." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Southwest river-city identity", detail: "Vanderburgh is Evansville / Ohio River — not Indianapolis spillover or Purdue university defaults." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Vanderburgh County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Vanderburgh County — official site", href: "https://www.vanderburghgov.org/", external: true },
      { label: "City of Evansville", href: "https://www.evansvillegov.org/", external: true },
      { label: "INDOT traffic", href: "https://www.in.gov/indot/", external: true }
    ],
  },
  directoryHint: "Prefer river-city multi-unit experience and honest I-69 pricing. Clarify tri-state authority. Verify Indiana DOR HHG in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
