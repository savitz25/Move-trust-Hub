import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMdPack } from '@/lib/local-movers/county-intelligence/maryland/md-shared';

export const montgomeryCountyMdIntelligence: CountyIntelligencePack = finalizeMdPack({
  countySlug: "montgomery",
  hubTitle: "Montgomery County Moving Intelligence Hub",
  eyebrow: "Montgomery · Bethesda/Rockville/Silver Spring federal density & I-270/I-495",
  h1: "Moving in Montgomery County: Bethesda–Rockville Access, Federal Density & I-270/I-495 Logistics",
  heroOpener: "Montgomery County is Maryland’s high-density DC-northwest collar: Bethesda and Chevy Chase elevators, Silver Spring multi-unit, Rockville/North Bethesda corporate stock, and I-495/I-270 portal time that is not Prince George’s east-of-DC product and not Fairfax Virginia logistics. A Bethesda high-rise, a Silver Spring condo, a Rockville HOA two-story, and a Germantown multi-family unit do not share truck access or empty-mile risk. This hub is for Montgomery — not a renamed Fairfax or PG page.",
  heroCredibility:
    'Maryland household goods mover registration (Dept. of Labor) for intrastate MD moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-495 · I-270 · MD-355 · MD-97 · River Road corridors",
  whatMakesDifferent: {
    title: "What makes moving in Montgomery County different",
    intro: "These are Bethesda/Rockville/Silver Spring realities — federal/contractor calendars, high-rise COIs, and beltway timing — not PG National Harbor patterns or Baltimore metro defaults.",
    bullets: [
      {
        title: "Federal and contractor relo calendars create hard report dates",
        detail: "PCS and contractor start dates compress windows more than pure family suburb moves.",
      },
      {
        title: "Bethesda / Chevy Chase / North Bethesda elevators rewrite labor hours",
        detail: "Building packets and freight elevators dominate near-core jobs.",
      },
      {
        title: "I-495 / I-270 define portal-to-portal time",
        detail: "Cross-county pairs look local on maps and regional at peak.",
      },
      {
        title: "HOA growth outer belt is not Bethesda high-rise product",
        detail: "Germantown and Clarksburg access rules differ from downtown Bethesda staging.",
      },
      {
        title: "Not Prince George’s and not Fairfax VA as the default product",
        detail: "Survey each Montgomery address — northwest DC collar has its own inventory patterns.",
      },
      {
        title: "Intrastate Maryland HHG registration vs interstate FMCSA",
        detail: "Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Montgomery access zones",
  zonesIntro: "Plan by Bethesda/Chevy Chase, Silver Spring, Rockville/North Bethesda, and outer I-270 growth.",
  zones: [
    {
      id: "bethesda-chevy-chase",
      name: "Bethesda, Chevy Chase & Friendship Heights edges",
      shortName: "Bethesda / Chevy Chase",
      neighborhoods: ["Bethesda","Chevy Chase","Friendship Heights edges","Somerset edges"],
      housingTypes: "High-rises, condos, luxury SFH, multi-unit",
      challenges: ["Elevators and COI","Scarce curb staging","I-495 peak congestion"],
      moverTips: "Get building packets early. Prefer mid-week morning freight windows.",
      cityKeywords: ["bethesda","chevy chase"],
    },
    {
      id: "silver-spring",
      name: "Silver Spring & east-central multi-unit",
      shortName: "Silver Spring",
      neighborhoods: ["Downtown Silver Spring","Takoma Park edges","Four Corners edges","White Oak edges"],
      housingTypes: "Mid-rises, multi-family, older SFH",
      challenges: ["Elevator reservations","Lease-end waves","MD-97 / Colesville congestion"],
      moverTips: "Book elevators early for month-end. Survey curb and truck length.",
      cityKeywords: ["silver spring","takoma park"],
    },
    {
      id: "rockville-north",
      name: "Rockville, North Bethesda & Pike corridors",
      shortName: "Rockville / North Bethesda",
      neighborhoods: ["Rockville","North Bethesda","Potomac edges","MD-355 corridors"],
      housingTypes: "HOA SFH, multi-family, corporate-adjacent housing",
      challenges: ["I-270 congestion","HOA rules","Corporate hard dates"],
      moverTips: "Align crew days with report dates. Collect HOA packets.",
      cityKeywords: ["rockville","north bethesda","potomac"],
    },
    {
      id: "i270-outer",
      name: "Germantown, Gaithersburg & outer I-270 growth",
      shortName: "Outer I-270",
      neighborhoods: ["Germantown","Gaithersburg","Clarksburg","Damascus edges"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["I-270 portal time","HOA gate lists","Longer empty miles to Bethesda core"],
      moverTips: "Price outer-belt pairs portal-to-portal. Collect HOA rules early.",
      cityKeywords: ["germantown","gaithersburg","clarksburg"],
    }
  ],
  costDrivers: {
    title: "What drives Montgomery County moving costs",
    intro: "Elevator/COI friction, federal hard dates, and I-495/I-270 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "High-rise elevator & curb friction", detail: "Bethesda/North Bethesda labor hours spike." },
      { title: "I-495 / I-270 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on outer belt", detail: "Gate lists push demand into peak windows." },
      { title: "Federal/contractor hard-date premiums", detail: "Short windows raise weekend demand." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$550–$1,800+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,700–$4,800+", note: "Core curb friction trends up" },
      { label: "3–4+ BR / tower / cross-metro", value: "$3,200–$10,000+", note: "Towers and long beltway pairs highest" },
      { label: "Typical 2-person crew rate", value: "$125–$210+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Montgomery County",
    intro: "Federal calendars, multi-family lease turns, summer peak, and winter ice reshape windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-495/I-270 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book HOA Saturdays early." },
      { title: "Federal fiscal and PCS peaks", detail: "Summer and fiscal-year transitions cluster demand." },
      { title: "Winter ice and snow", detail: "Confirm driveway and curb contingency." }
    ],
  },
  specialized: [
    {
      id: "montgomery-bethesda-federal-hoa",
      title: "Bethesda/Rockville federal density & high-rise module",
      intro: "Montgomery estimates fail when building packets, HOA rules, or I-270 empty miles are ignored.",
      bullets: ["Request Bethesda/Silver Spring building packets at lease signing or escrow.","Price I-495/I-270 pairs portal-to-portal.","Separate federal/contractor hard dates from standard suburban SFH scopes.","Clarify Montgomery vs PG/Howard/Fairfax destinations on multi-county estimates.","Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Montgomery County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Montgomery County Public Schools serves most addresses; magnet and cluster boundaries matter. Confirm zoning carefully." },
          { title: "Research sources", detail: "MCPS tools and Maryland State Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Suburban Hospital, Adventist HealthCare, Holy Cross, NIH-adjacent care, and DC systems (via commute) serve the county. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Germantown into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "High-rise core vs outer-belt HOA stock", detail: "Bethesda product differs sharply from Germantown/Clarksburg two-stories." },
          { title: "Cost variation", detail: "Close-in renovated stock often prices differently from far-north multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Bethesda / Chevy Chase lifestyle", detail: "Walkable amenities with elevator and curb tradeoffs." },
          { title: "Silver Spring pattern", detail: "Multi-unit density with MD-97 logistics." },
          { title: "Outer I-270 pattern", detail: "HOA product with longer portal time to DC core jobs." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Federal agencies, contractors, biotech/health, hospitality, and professional services shape employment." },
          { title: "Commute realism", detail: "I-270, I-495, and Metro-adjacent peaks are real. Test drive peak routes before choosing a submarket." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Northwest DC-collar identity", detail: "Montgomery is Maryland’s high-density DC northwest — not PG east-of-DC or Baltimore metro defaults." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Montgomery County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Montgomery County — official site", href: "https://www.montgomerycountymd.gov/", external: true },
      { label: "MDOT CHART traffic", href: "https://chart.maryland.gov/", external: true }
    ],
  },
  directoryHint: "Prefer high-rise/HOA experience and honest I-270/I-495 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
