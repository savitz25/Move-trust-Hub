import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Cape May — NJ Tier 2 Wave 1 · southern shore tip · parent Atlantic */
export const capeMayCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'cape-may',
  hubTitle: 'Cape May County Moving Intelligence Hub',
  eyebrow: 'Cape May · southern shore tip · vs Atlantic',
  h1: 'Moving in Cape May County: Cape May, Wildwood & Barrier-Island Seasonal Access',
  heroOpener:
    'Cape May County is New Jersey’s southern shore tip — Cape May historic streets, Wildwood mid-century and motel-district stock, Ocean City / barrier approaches, and mainland towns along the Parkway south. Compared with Atlantic’s casino-district towers and Egg Harbor mainland suburbs, Cape May runs harder on seasonal tourism peaks, barrier-island bridge/causeway constraints, and vacation-rental calendars — not a Toms River/Ocean rename and not an Atlantic City high-rise script.',
  heroCredibility:
    'Seasonal shore tourism · Barrier-island access · Parkway south · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'Garden State Parkway · Route 9 · Route 47 · Route 109 · Barrier-island causeways / bridges',
  parentCompare: {
    parentLabel: 'Atlantic County',
    parentHref: '/local-movers/new-jersey/atlantic',
    title: 'Compared with Atlantic County',
    intro:
      'Cape May is the southern tip seasonal shore — Cape May, Wildwood, Ocean City approaches — not Atlantic City freight elevators or Egg Harbor planned suburbs alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Atlantic crews fight ACE Expressway event peaks and boardwalk tower docks. Cape May pairs ride the Garden State Parkway south, Routes 9/47/109, and island causeways — freer mid-day off-season, extreme peak congestion on summer Friday island approaches.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Atlantic mixes casino high-rises, Downbeach elevated homes, and mainland HOAs. Cape May mixes Victorian/historic Cape May streets, Wildwood mid-century and multi-unit tourism stock, barrier cottages, and quieter mainland parcels — more seasonal rental product, less continuous tower freight elevators.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Atlantic City needs security desks and reserved freight elevators. Cape May barrier towns need bridge timing, narrow tourist streets, sand staging, and vacation-turn clusters — mainland is simpler but still tourism-calendar sensitive.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cape May quotes can exceed simple Atlantic mainland rates when summer peak labor, island shuttles, and historic-street access apply — even when square footage matches.',
      },
      {
        title: 'Role difference',
        detail:
          'Cape May is seasonal shore-tip tourism living — not Atlantic’s casino-district dual market and not Ocean’s Toms River/Lakewood mix. Match crews to island calendars and barrier access.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Cape May County different',
    intro: 'Seasonal tourism and barrier access dominate more than corporate HOAs.',
    bullets: [
      {
        title: 'Summer tourism is a capacity constraint',
        detail:
          'Memorial Day through Labor Day fills trucks, curb space, and lodging for crews. Midweek mornings beat Saturday island chaos.',
      },
      {
        title: 'Barrier-island access constraints',
        detail:
          'Bridges and causeways limit truck size and timing — weather and peak traffic can cancel approaches.',
      },
      {
        title: 'Historic Cape May streets',
        detail:
          'Victorian blocks need smaller trucks, careful carries, and preservation-aware padding.',
      },
      {
        title: 'Vacation-rental turn clusters',
        detail:
          'Weekly rental calendars create short-notice local demand that mainland suburbs do not share.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Cape May zones: Cape May historic, Wildwood, barrier approaches & mainland',
  zonesIntro: 'Historic tip, tourism mid-county, and mainland are different access jobs.',
  zones: [
    {
      id: 'cape-may-historic',
      name: 'Cape May historic tip',
      shortName: 'Cape May',
      neighborhoods: ['Cape May', 'West Cape May', 'historic district edges'],
      housingTypes: 'Victorians, multi-story historic homes, some condos',
      challenges: ['Narrow streets', 'Tourism congestion', 'Preservation-sensitive handling'],
      moverTips: 'Measure street width; avoid peak weekend tourist hours when flexible.',
      cityKeywords: ['cape may', 'west cape may'],
    },
    {
      id: 'wildwood',
      name: 'Wildwood / North Wildwood / Wildwood Crest',
      shortName: 'Wildwood',
      neighborhoods: ['Wildwood', 'North Wildwood', 'Wildwood Crest'],
      housingTypes: 'Mid-century multi-unit, motels converted, seasonal rentals',
      challenges: ['Tourism peaks', 'Elevators in some multi-unit', 'Sand and parking'],
      moverTips: 'Book midweek in summer; confirm elevator and management rules.',
      cityKeywords: ['wildwood'],
    },
    {
      id: 'ocean-city-barrier',
      name: 'Ocean City & barrier approaches',
      shortName: 'Ocean City / barrier',
      neighborhoods: ['Ocean City', 'barrier approaches', 'causeway edges'],
      housingTypes: 'Beach homes, condos, elevated stock',
      challenges: ['Bridge timing', 'Narrow blocks', 'Summer curb scarcity'],
      moverTips: 'Ask about shuttle fees; protect against sand tracking.',
      cityKeywords: ['ocean city'],
    },
    {
      id: 'mainland-cape',
      name: 'Mainland Cape May County',
      shortName: 'Mainland',
      neighborhoods: ['Rio Grande', 'Cape May Court House', 'Villas edge', 'mainland tracts'],
      housingTypes: 'Suburban SFH, townhomes, year-round stock',
      challenges: ['Parkway south traffic', 'HOA rules in places'],
      moverTips: 'Treat as standard suburban access unless HOA docs say otherwise.',
      cityKeywords: ['rio grande', 'court house', 'villas', 'cape may court house'],
    },
  ],
  specialized: [
    {
      id: 'seasonal-tourism',
      title: 'Seasonal shore tourism module',
      intro: 'Peak summer rewrites capacity and curb access.',
      bullets: [
        'Prefer midweek island loads May–September.',
        'Expect firmer cancellation policies in peak season.',
        'Book elevators and parking early for multi-unit tourism stock.',
      ],
    },
    {
      id: 'barrier-access',
      title: 'Barrier-island access module',
      intro: 'Bridges and causeways are operational constraints.',
      bullets: [
        'Confirm truck size limits for island approaches.',
        'Build weather contingency for wind and storm closures.',
        'Protect floors from sand on elevated multi-story homes.',
      ],
    },
    {
      id: 'historic-cape-may',
      title: 'Historic Cape May streets module',
      intro: 'Victorian blocks reject full-trailer assumptions.',
      bullets: [
        'Share street-width photos with every quote.',
        'Allow more labor minutes for stairs and long carries.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Cape May County education is municipal/regional across shore and mainland communities — match every address to the correct district.',
        bullets: [
          {
            title: 'Shore vs mainland districts',
            detail:
              'Barrier and mainland systems differ in size and calendars; use NJ DOE performance reports and district maps.',
          },
          {
            title: 'Seasonal population effects',
            detail:
              'Tourism economies can affect year-round enrollment patterns — ask districts about capacity if relocating with school-age children.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Cape Regional / local acute care',
            detail:
              'Primary local hospital resources serve the tip; confirm specialties and insurer networks for your household.',
          },
          {
            title: 'Travel for tertiary care',
            detail:
              'Some residents travel toward Atlantic County or farther north for specialty care — map drive times in peak summer traffic.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Cape May County',
    intro: 'Seasonal labor scarcity and island access drive outliers more than inland miles.',
    drivers: [
      {
        title: 'Peak tourism labor',
        detail: 'Summer weekends price higher when crews and lodging are scarce.',
      },
      {
        title: 'Island shuttle / small truck',
        detail: 'Barrier blocks often cannot stage full trailers.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,000+' },
      { label: 'Family / multi-story shore home', value: '$1,800–$4,200+' },
      { label: '2-person crew', value: '$110–$170+/hr' },
    ],
  },
  seasonal: {
    title: 'Tourism calendar & storms',
    intro: 'Cape May’s calendar is more seasonal than most NJ inland counties.',
    items: [
      {
        title: 'Memorial Day–Labor Day',
        detail: 'Peak demand and worst island congestion.',
      },
      {
        title: 'Shoulder seasons',
        detail: 'Often best for historic Cape May and barrier moves.',
      },
    ],
  },
  resources: {
    title: 'Useful Cape May County resources',
    items: [
      {
        label: 'Cape May County',
        href: 'https://capemaycountynj.gov/',
        external: true,
      },
      {
        label: 'NJ DOE school performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Atlantic County guide (parent contrast)',
        href: '/local-movers/new-jersey/atlantic',
      },
      {
        label: 'Directory: Cape May filter',
        href: '/companies?coverage=state&state=NJ&counties=cape-may',
      },
    ],
  },
  directoryHint:
    'Prefer midweek summer island crews with barrier-access experience — not mainland-only rate cards.',
  lastReviewed: '2026-07-22',
});
