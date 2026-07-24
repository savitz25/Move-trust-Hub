import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const davidsonCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "davidson",
  hubTitle: "Davidson County Moving Intelligence Hub",
  eyebrow: "Davidson · Nashville urban core, music/tourism pulses & neighborhood micro-markets",
  h1: "Moving in Davidson County: Nashville Core, Condo Access & I-40/I-65 Logistics",
  heroOpener: "Davidson County is Nashville’s urban-and-corridor market: downtown and Gulch high-rises with COI and freight elevators, East Nashville and 12South micro-markets with tight streets, music-industry and tourism curb pulses, and suburban arms that still sit under one county name. A Gulch tower, an East Nashville bungalow, a Green Hills condo, and an Antioch multi-family unit do not share truck access or I-40/I-65 portal time. This hub is for Davidson — not Memphis river copy, not Williamson estate HOA patterns, and not a renamed Atlanta page.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-40 · I-24 · I-65 · Briley Pkwy · Ellington Pkwy · US-41",
  whatMakesDifferent: {
    title: "What makes moving in Davidson County different",
    intro: "These are Nashville-core realities — vertical product, tourism/event curb pressure, and neighborhood micro-markets — not Memphis heat-only tips or Williamson premium suburbs alone.",
    bullets: [
      {
        title: "Downtown / Gulch elevators make COI the default",
        detail: "Towers need building packets, freight elevators, and fixed move windows.",
      },
      {
        title: "Music and tourism calendars rewrite curb access",
        detail: "Event nights and Broadway-adjacent staging can erase “normal” residential windows.",
      },
      {
        title: "Neighborhood micro-markets are not interchangeable",
        detail: "East Nashville alleys differ from Green Hills multi-unit and Antioch multi-family.",
      },
      {
        title: "I-40 / I-24 / I-65 define portal-to-portal time",
        detail: "Cross-town pairs look local on maps and regional at peak.",
      },
      {
        title: "Cross-county Nashville pairs are routine",
        detail: "Williamson, Rutherford, Sumner, and Wilson destinations need clear county lines for drive time and authority assumptions.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Davidson access zones",
  zonesIntro: "Plan by downtown/Gulch vertical core, East Nashville, south/west near-core, and outer multi-family arms.",
  zones: [
    {
      id: "downtown-gulch",
      name: "Downtown, Gulch & SoBro vertical core",
      shortName: "Downtown / Gulch",
      neighborhoods: ["Downtown","The Gulch","SoBro","Music Row edges","Germantown"],
      housingTypes: "High-rises, mid-rises, lofts",
      challenges: ["Near-universal COI and elevators","Scarce curb staging","Event-day congestion"],
      moverTips: "Get building packets early. Prefer mid-week morning freight windows. Avoid major event nights when flexible.",
      cityKeywords: ["nashville","gulch","downtown","sobro","germantown"],
    },
    {
      id: "east-nashville",
      name: "East Nashville neighborhood micro-markets",
      shortName: "East Nashville",
      neighborhoods: ["East Nashville","Five Points","Lockeland Springs","Inglewood edges"],
      housingTypes: "Older SFH, multi-story walk-ups, limited multi-family",
      challenges: ["Tight streets and alleys","Stairs common","Limited legal curb"],
      moverTips: "Photo alley and curb. Prefer mid-week mornings. Confirm stair access unit-by-unit.",
      cityKeywords: ["east nashville","five points","lockeland","inglewood"],
    },
    {
      id: "green-hills-south",
      name: "Green Hills, 12South & south/west near-core",
      shortName: "South / west near-core",
      neighborhoods: ["Green Hills","12South","Hillsboro Village edges","Sylvan Park edges"],
      housingTypes: "Condos, townhomes, older SFH, mid-rise multi-family",
      challenges: ["Mixed elevators and tight residential streets","Retail-corridor traffic","High-value inventory handling"],
      moverTips: "Survey multi-unit and SFH as different products. Discuss valuation for higher-value contents.",
      cityKeywords: ["green hills","12south","hillsboro","sylvan park"],
    },
    {
      id: "outer-arms",
      name: "Antioch, Madison & outer multi-family arms",
      shortName: "Outer arms",
      neighborhoods: ["Antioch","Madison","Bordeaux edges","Briley multi-family"],
      housingTypes: "Multi-family, townhomes, tract SFH",
      challenges: ["I-24 / Briley congestion","Elevator buildings with guest parking chaos","Long portal time to core"],
      moverTips: "Book lease-end clusters early. Build freeway buffer. Confirm elevator reservations.",
      cityKeywords: ["antioch","madison","bordeaux","briley"],
    }
  ],
  costDrivers: {
    title: "What drives Davidson County moving costs",
    intro: "Elevator buildings, event curb friction, and freeway portal time drive quotes more than square footage alone.",
    drivers: [
      { title: "High-rise COI and elevators", detail: "Downtown labor and wait time dominate core jobs." },
      { title: "Event and tourism curb pressure", detail: "Peak nights raise time risk near entertainment corridors." },
      { title: "I-40 / I-24 / I-65 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Cross-county empty miles", detail: "Suburb-ring destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,400+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,400–$3,900+", note: "Core multi-unit trends up" },
      { label: "3–4+ BR / tower / cross-county", value: "$2,600–$7,800+", note: "Gulch towers and long freeway pairs highest" },
      { label: "Typical 2-person crew rate", value: "$110–$185+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Davidson County",
    intro: "Tourism, music calendars, and family seasons reshape Nashville access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce freeway pain." },
      { title: "CMA / major event weeks", detail: "Book early or avoid entertainment-district staging when flexible." },
      { title: "Peak family season: late May–mid-August", detail: "Suburban and multi-family Saturdays fill first." },
      { title: "Summer heat and storms", detail: "Prefer early starts; confirm weather contingency." }
    ],
  },
  specialized: [
    {
      id: "nashville-core-vertical",
      title: "Nashville vertical core & event-calendar module",
      intro: "Davidson estimates fail when tower packets or tourism curb rules are ignored.",
      bullets: ["Request building move packets at lease signing or escrow for towers.","Reserve freight elevators in writing and reconfirm the day before.","Avoid major event nights near Broadway/Gulch when flexible.","Price I-40/I-24/I-65 pairs portal-to-portal.","Clarify Davidson vs Williamson/Rutherford/Sumner/Wilson addresses.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Davidson County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Metro Nashville Public Schools is the primary public K–12 system. Assignment is address-based." },
          { title: "Research sources", detail: "District tools, Tennessee DOE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Vanderbilt, HCA TriStar, Ascension Saint Thomas, and other facilities serve Nashville corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from outer arms. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Vertical core vs neighborhood stock", detail: "Towers downtown; older SFH and multi-unit in East Nashville; multi-family on outer arms." },
          { title: "Cost variation", detail: "Prices vary sharply by corridor. Budget condo dues and parking fees in towers." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Downtown / Gulch lifestyle", detail: "Urban amenities with elevator tradeoffs." },
          { title: "East Nashville pattern", detail: "Neighborhood character with stair/curb logistics." },
          { title: "Outer multi-family pattern", detail: "Space and price tradeoffs with longer freeway portal time." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, music/entertainment, tourism, tech, education, and professional services shape employment." },
          { title: "Commute realism", detail: "I-40, I-24, I-65, and Briley peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Music-city identity", detail: "Davidson stacks entertainment density with neighborhood micro-markets — not Memphis river logistics or Knoxville foothills." },
          { title: "Climate", detail: "Hot humid summers and storms. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Davidson County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Metro Nashville / Davidson County", href: "https://www.nashville.gov/", external: true },
      { label: "Metro Nashville Public Schools", href: "https://www.mnps.org/", external: true, note: "Boundaries & calendars" },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer downtown elevator/COI experience for towers; East Nashville stair/curb fluency; honest I-40/I-65 pricing. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
