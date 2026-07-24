import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMdPack } from '@/lib/local-movers/county-intelligence/maryland/md-shared';

export const anneArundelCountyMdIntelligence: CountyIntelligencePack = finalizeMdPack({
  countySlug: "anne-arundel",
  hubTitle: "Anne Arundel County Moving Intelligence Hub",
  eyebrow: "Anne Arundel · Annapolis capital, Naval Academy/DoD adjacency & US-50/I-97",
  h1: "Moving in Anne Arundel County: Annapolis Capital Access, DoD Adjacency & US-50/I-97 Logistics",
  heroOpener: "Anne Arundel County mixes capital, military, and coastal-suburban product: Annapolis historic stock and elevators, Naval Academy / DoD adjacency calendars, Glen Burnie multi-unit, and US-50/I-97 portal time that is not Howard’s Columbia planned community and not Montgomery northwest density. An Annapolis condo, a Crofton HOA two-story, and a Glen Burnie multi-family unit do not share truck access or empty-mile risk. This hub is for Anne Arundel — not a generic DC-suburb clone.",
  heroCredibility:
    'Maryland household goods mover registration (Dept. of Labor) for intrastate MD moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "US-50 · I-97 · MD-2 · MD-100",
  whatMakesDifferent: {
    title: "What makes moving in Anne Arundel County different",
    intro: "These are Annapolis capital / DoD / coastal-suburban realities — not Columbia planned villages or Bethesda high-rises as the default.",
    bullets: [
      {
        title: "Naval Academy and DoD adjacency create hard report dates",
        detail: "PCS windows and base-adjacent timing reshape crew calendars.",
      },
      {
        title: "Annapolis historic stock and elevators rewrite access plans",
        detail: "Narrow streets and building packets dominate capital-core jobs.",
      },
      {
        title: "US-50 / I-97 define portal-to-portal time",
        detail: "Pairs toward DC or Baltimore look regional at peak.",
      },
      {
        title: "Glen Burnie / Odenton multi-unit differs from Annapolis core",
        detail: "Lease waves and HOA product are not historic-district logistics.",
      },
      {
        title: "Not a generic Montgomery or Howard clone",
        detail: "Capital + military + coastal-suburban mix is unique in Core 8.",
      },
      {
        title: "Intrastate Maryland HHG registration vs interstate FMCSA",
        detail: "Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Anne Arundel access zones",
  zonesIntro: "Plan by Annapolis core, west county (Crofton/Odenton), Glen Burnie north, and southern peninsula edges.",
  zones: [
    {
      id: "annapolis-core",
      name: "Annapolis core & capital corridors",
      shortName: "Annapolis",
      neighborhoods: ["Downtown Annapolis","Eastport edges","Parole edges","West Annapolis edges"],
      housingTypes: "Historic SFH, condos, multi-unit, waterfront stock",
      challenges: ["Narrow streets","Elevators and COI","Tourism congestion"],
      moverTips: "Photo street width. Get building packets early. Avoid major event peaks when flexible.",
      cityKeywords: ["annapolis","eastport"],
    },
    {
      id: "crofton-odenton",
      name: "Crofton, Odenton & west county growth",
      shortName: "Crofton / Odenton",
      neighborhoods: ["Crofton","Odenton","Gambrills edges","Fort Meade adjacency"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["MD-3 / MD-32 congestion","HOA rules","DoD hard dates"],
      moverTips: "Collect HOA packets. Align with PCS calendars when possible.",
      cityKeywords: ["crofton","odenton","gambrills"],
    },
    {
      id: "glen-burnie",
      name: "Glen Burnie, Pasadena & north corridors",
      shortName: "Glen Burnie / north",
      neighborhoods: ["Glen Burnie","Pasadena","Brooklyn Park edges","MD-2 corridors"],
      housingTypes: "Multi-family, SFH, mixed stock",
      challenges: ["I-97 / MD-100 timing","Lease-end waves","Mixed elevators and stairs"],
      moverTips: "Book elevators early for month-end. Price north pairs portal-to-portal.",
      cityKeywords: ["glen burnie","pasadena"],
    },
    {
      id: "south-peninsula",
      name: "Edgewater, Severna Park & peninsula edges",
      shortName: "Peninsula",
      neighborhoods: ["Severna Park","Edgewater","Arnold edges","Mayo edges"],
      housingTypes: "SFH, multi-family, waterfront-adjacent stock",
      challenges: ["US-50 congestion","Longer empty miles","Driveway access"],
      moverTips: "Price peninsula pairs honestly. Photo driveway grades.",
      cityKeywords: ["severna park","edgewater","arnold"],
    }
  ],
  costDrivers: {
    title: "What drives Anne Arundel County moving costs",
    intro: "Capital-core access, DoD hard dates, and US-50/I-97 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Annapolis curb & elevator friction", detail: "Capital-core labor hours spike." },
      { title: "US-50 / I-97 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "DoD/PCS hard-date premiums", detail: "Short windows raise weekend demand." },
      { title: "HOA soft costs on west county growth", detail: "Gate lists push peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$500–$1,600+", note: "Higher near Annapolis core" },
      { label: "2–3BR condo or modest SFH", value: "$1,500–$4,200+", note: "Core friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,700–$8,500+", note: "DC/Baltimore pairs highest" },
      { label: "Typical 2-person crew rate", value: "$115–$195+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Anne Arundel County",
    intro: "PCS seasons, capital events, summer tourism, and winter ice reshape windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce US-50 pain." },
      { title: "PCS peak: late spring–summer", detail: "Book west-county and base-adjacent jobs early." },
      { title: "Peak family season: late May–mid-August", detail: "Book HOA Saturdays early." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "anne-arundel-annapolis-dod",
      title: "Annapolis capital & DoD adjacency module",
      intro: "Anne Arundel estimates fail when historic-street access, PCS hard dates, or US-50 empty miles are ignored.",
      bullets: ["Photo Annapolis street width and request building packets early.","Align west-county jobs with PCS calendars when possible.","Price US-50/I-97 pairs portal-to-portal toward DC or Baltimore.","Do not treat Anne Arundel as a Howard or Montgomery clone.","Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Anne Arundel County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Anne Arundel County Public Schools serves most addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "AACPS tools and Maryland State Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Luminis Health Anne Arundel Medical Center and other systems serve capital and corridor communities. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Glen Burnie and Crofton into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Capital historic vs west-county HOA vs north multi-unit", detail: "Submarkets differ sharply within short distances." },
          { title: "Cost variation", detail: "Annapolis-adjacent stock often prices differently from Glen Burnie multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Annapolis capital lifestyle", detail: "Historic density with curb and elevator tradeoffs." },
          { title: "Crofton / Odenton pattern", detail: "HOA product with DoD adjacency logistics." },
          { title: "Glen Burnie north pattern", detail: "Multi-unit density with I-97 timing." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "State government, DoD/Fort Meade adjacency, healthcare, tourism, and professional services shape employment." },
          { title: "Commute realism", detail: "US-50 and I-97 peaks are real for DC- and Baltimore-bound workers." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Capital + coastal-suburban identity", detail: "Anne Arundel is Annapolis metro — not Columbia planned community or Bethesda high-rise defaults." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Anne Arundel County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Anne Arundel County — official site", href: "https://www.aacounty.org/", external: true },
      { label: "City of Annapolis", href: "https://www.annapolis.gov/", external: true },
      { label: "MDOT CHART traffic", href: "https://chart.maryland.gov/", external: true }
    ],
  },
  directoryHint: "Prefer capital-core and DoD-window experience with honest US-50 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
