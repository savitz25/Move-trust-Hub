import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Clay County — Florida Tier 2 (Jax south collar).
 * Parent: Duval County. Orange Park / Middleburg —
 * NOT a Duval rename.
 */
export const clayCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'clay',
  hubTitle: 'Clay County Moving Intelligence Hub',
  eyebrow: 'Clay County · Jax south collar · Orange Park / Middleburg',
  h1: 'Moving in Clay County: Jax South Collar — Orange Park, Middleburg & River Edges',
  heroOpener:
    'Clay County is Jacksonville’s south collar — Orange Park suburban and multi-family corridors, Middleburg west growth, Green Cove Springs seat and older stock, and Fleming Island / St. Johns River edges — not Duval downtown elevators with a different nameplate. US-17, Blanding Boulevard, FL-21, I-295 approaches, and the local Orange Park grid set portal-to-portal time for households still oriented to Jax jobs. Compared with Duval, you get freer mid-day freeflow than core river-crossing gridlock, denser south-metro HOA and multi-family mix in Orange Park, and river-edge logistics that are not a Jacksonville rename. This guide is for people moving in Clay as a south collar market with its own role — not recycled Duval scripts.',
  heroCredibility:
    'Jax south collar · Orange Park / Middleburg · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-17 · Blanding Blvd · FL-21 · I-295 approaches · local Orange Park grid',
  parentCompare: {
    parentLabel: 'Duval County',
    parentHref: '/local-movers/florida/duval',
    title: 'Compared with Duval County',
    intro:
      'Clay is Jacksonville’s south collar — Orange Park, Middleburg, Green Cove Springs, and Fleming Island/river edges — not a drop-in template for downtown elevators, Arlington, or westside Duval sprawl. Use Duval as the dense North Florida Tier 1 parent contrast. Not a Duval rename.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Duval crews fight I-95 / I-10 / bridges and multi-zone river-sprawl pairs. Clay pairs ride US-17, Blanding Blvd, FL-21, and I-295 approaches — freer mid-day than Jax core, still peak-heavy on Orange Park ↔ Middleburg and river-crossing hauls into Duval. Portal-to-portal time is real; it is not a 45-minute downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Duval mixes urban core, beach towns, and vast suburban sprawl under one large county. Clay’s ladder is Orange Park suburban SFH and multi-family, Middleburg west growth tracts, Green Cove Springs smaller-city stock, and Fleming Island river-edge product — more south-metro bedroom density and river logistics, less Jax-scale multi-bridge urban core.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Duval core needs elevators, curb permits, and bridge timing. Clay stages more driveway, cul-de-sac, multi-family, and river-edge work. HOAs exist in planned pockets; multi-unit COI appears on Orange Park corridors. St. Johns River approaches add a logistics layer Duval inland sprawl alone does not capture.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Clay quotes often sit near secondary-collar rates for simple driveway access — multi-family long carries, US-17/Blanding peaks, river-edge access, and long locals into Duval still push prices up. Expect south-metro labor rates with corridor friction — not Jacksonville core scarcity pricing alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Clay is Jax south’s bedroom and river-collar engine — Orange Park / Middleburg identity — not Duval’s job-center core. Treat it as its own south collar market when matching crews and rate cards. Not a Duval rename.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Clay County different',
    intro:
      'South-collar realities — Orange Park multi-family and suburbs, Middleburg growth, river-edge product, and US-17/Blanding freeflow that is still billable — that change estimates.',
    bullets: [
      {
        title: 'Orange Park, Middleburg, Green Cove Springs, and Fleming Island are different products',
        detail:
          'An Orange Park multi-family elevator, a Middleburg growth tract, a Green Cove Springs bungalow, and a Fleming Island river-edge home do not share truck access. Name both cities on the estimate.',
      },
      {
        title: 'US-17 / Blanding freeflow is not Jax core — still a line item',
        detail:
          'Orange Park ↔ Middleburg or Clay ↔ Duval pairs freer than river-core still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'St. Johns River edges add logistics',
        detail:
          'Fleming Island and river-adjacent parcels can mean longer approaches, flood-aware lots, and different staging than pure inland HOA cul-de-sacs.',
      },
      {
        title: 'South-metro suburbs are not a Duval zone dump',
        detail:
          'Clay’s school calendars, HOA pockets, and multi-family lease cycles are their own market — refuse recycled Jacksonville core rate cards without naming both cities and access type.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Clay zones: Orange Park, Middleburg, Green Cove Springs & Fleming Island / river edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Orange Park, Middleburg, Green Cove Springs, and Fleming Island/river edges price and stage differently under the same south collar.',
  zones: [
    {
      id: 'orange-park',
      name: 'Orange Park & South-Metro Core',
      shortName: 'Orange Park',
      neighborhoods: [
        'Orange Park',
        'Blanding Boulevard corridors',
        'US-17 Orange Park approaches',
        'Multi-family and mid-density pockets',
        'Established suburban SFH rings',
      ],
      housingTypes:
        'Suburban SFH, apartments and elevators, townhomes, mid-century stock, commercial-adjacent multi-unit',
      challenges: [
        'Elevator/COI rules and end-of-month lease churn',
        'US-17 / Blanding congestion',
        'Limited curb staging near commercial strips',
        'Cross-county pairs into Duval job corridors',
      ],
      moverTips:
        'Share building packets and truck-height limits for multi-unit. Avoid last-Saturday-of-month when flexible. Price Orange Park ↔ Middleburg or Orange Park ↔ Duval edges portal-to-portal.',
      cityKeywords: [
        'orange park',
        'orange park fl',
        'blanding',
        'blanding boulevard',
      ],
    },
    {
      id: 'middleburg',
      name: 'Middleburg & West Growth',
      shortName: 'Middleburg',
      neighborhoods: [
        'Middleburg',
        'FL-21 corridors',
        'West Clay growth tracts',
        'Master-planned and HOA pockets',
        'Larger-lot west edges',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, newer construction, some larger-lot edges, limited multi-family',
      challenges: [
        'HOA rules in planned villages',
        'FL-21 / arterial timing into Orange Park',
        'School-calendar Saturday demand',
        'New-construction incomplete roads',
      ],
      moverTips:
        'Collect HOA packets early. Confirm builder access the week of the move in new sections. Price Middleburg ↔ Orange Park as a timed local. Early summer starts beat heat on open tracts.',
      cityKeywords: [
        'middleburg',
        'middleburg fl',
        'west clay',
        'fl-21',
        'state road 21',
      ],
    },
    {
      id: 'green-cove-springs',
      name: 'Green Cove Springs: seat & older stock',
      shortName: 'Green Cove Springs',
      neighborhoods: [
        'Downtown Green Cove Springs',
        'Established residential grid',
        'US-17 south corridors',
        'Smaller-city multi-unit',
        'South Clay connector stock',
      ],
      housingTypes:
        'Older SFH, small-city multi-unit, mid-century stock, modest suburban tracts, mixed older access',
      challenges: [
        'Older grids and constrained curb staging',
        'US-17 approach timing',
        'Different product mix than Orange Park multi-family',
        'Longer empty miles from north Clay staging',
      ],
      moverTips:
        'Survey curb, stairs, and driveway constraints on older blocks. Price Green Cove Springs ↔ Orange Park with honest corridor time. Prefer mid-week starts over peak US-17 traffic.',
      cityKeywords: [
        'green cove springs',
        'green cove springs fl',
        'green cove',
      ],
    },
    {
      id: 'fleming-island-river',
      name: 'Fleming Island & St. Johns River Edges',
      shortName: 'Fleming Island / river',
      neighborhoods: [
        'Fleming Island',
        'St. Johns River edges',
        'River-adjacent suburban stock',
        'US-17 river corridors',
        'North Clay river approaches',
      ],
      housingTypes:
        'Suburban SFH, river-edge homes, planned communities, multi-family near corridors, flood-aware parcels',
      challenges: [
        'Flood-mapped and storm-exposed parcels near the river',
        'US-17 / I-295 approach congestion into Duval',
        'HOA rules in planned river villages',
        'Cross-zone pairs toward Orange Park or Duval',
      ],
      moverTips:
        'Check flood maps for river-edge addresses. Collect gate lists in planned villages. Price Fleming Island ↔ Duval as a timed long local. Do not assume pure inland Orange Park playbooks apply.',
      cityKeywords: [
        'fleming island',
        'fleming island fl',
        'clay river',
        'st johns river clay',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Clay County',
    intro:
      'Same square footage prices differently by multi-family access, HOA soft costs, US-17/Blanding portal time, and whether the job is Orange Park core or river/west edge.',
    drivers: [
      {
        title: 'US-17 / Blanding / FL-21 / I-295 corridor time',
        detail:
          'Orange Park ↔ Middleburg, Fleming Island ↔ Duval, or peak Blanding legs burn more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'Multi-family elevator & long-carry labor',
        detail:
          'Orange Park apartments and mid-density buildings add elevator waits, parking scarcity, and stair carries suburban SFH quotes miss.',
      },
      {
        title: 'HOA soft costs (growth / river villages)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Cross-county pairs into Duval',
        detail:
          'Long locals on US-17 and I-295 approaches raise portal-to-portal time; confirm whether pure local rate cards still apply.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,300+',
        note: 'Higher with elevators, HOA windows, or peak US-17',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,400–$3,700+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / river edge / long local)',
        value: '$2,200–$6,200+',
        note: 'Long locals into Duval and large river/HOA homes price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, school-calendar & corridor intelligence',
    intro:
      'Clay peaks follow school calendars, multi-family lease ends, and south-metro commute patterns — not downtown Jacksonville lease density alone.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Orange Park and Middleburg. Book 2–4 weeks ahead for popular HOA and multi-family windows.',
      },
      {
        title: 'US-17 / Blanding commute peaks',
        detail:
          'Weekday rush and school traffic worsen portal time even for pure Clay addresses near the main arterials.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Open suburban streets get hot early. Prefer dawn starts; plan moisture protection for afternoon storms.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows and building elevator rules. Avoid last Friday/Saturday of the month when leases and family moves collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'south-metro-suburbs',
      title: 'South-metro suburban & multi-family mix',
      intro:
        'Clay’s defining product is south-metro bedroom suburbs plus Orange Park multi-family — not Jacksonville core elevators alone.',
      bullets: [
        'Match crews to pocket: Orange Park elevator vs Middleburg HOA driveway vs Green Cove Springs older access.',
        'Collect multi-unit COI and elevator reservations on Orange Park corridors before booking.',
        'Inventory family-volume SFH carefully in Middleburg and Fleming Island growth stock.',
        'Name both cities on the estimate — refuse vague “south Jax local” language. Not a Duval rename.',
      ],
    },
    {
      id: 'st-johns-river-logistics',
      title: 'St. Johns River edge logistics',
      intro:
        'Fleming Island and river-adjacent product add flood awareness, approach constraints, and corridor timing Duval inland sprawl alone does not capture.',
      bullets: [
        'Share flood-map context and approach photos for river-edge addresses.',
        'Price Fleming Island ↔ Orange Park or Duval pairs as portal-to-portal jobs.',
        'Confirm HOA gate lists in planned river villages early.',
        'Build buffer for US-17 / I-295 peak approaches into Jacksonville.',
      ],
    },
    {
      id: 'not-duval-rename',
      title: 'South collar without Duval rename assumptions',
      intro:
        'US-17, Blanding, FL-21, and I-295 freeflow is real — but Clay is not a thinner Duval script. Survey the actual pocket and corridor pair.',
      bullets: [
        'Name both pockets on every estimate (e.g. Orange Park → Middleburg); “Clay local” hides portal time.',
        'Price peak US-17 / Blanding pairs honestly — map miles understate school and commute congestion.',
        'Clarify Duval destinations near county lines so distance assumptions stay accurate.',
        'Do not import Jacksonville rate cards without naming both cities and access type — this is not a Duval rename.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in. Not a full Tier 1 lifestyle essay.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Clay County District Schools serves most public K–12 students and is often a relocator focus. Match every listing address to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before city marketing',
            detail:
              'Use official district boundary tools. Orange Park, Middleburg, Green Cove Springs, and Fleming Island brands can span multiple feeders.',
          },
          {
            title: 'Growth vs established systems',
            detail:
              'Enrollment pressures differ between west growth edges and longer-established Orange Park corridors — do not treat county averages as neighborhood truth.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'HCA Florida Orange Park Hospital and other regional facilities cover much of Clay; map ER drive times at rush hour from Middleburg and Green Cove Springs — not only from Orange Park proper.',
          },
          {
            title: 'Jacksonville specialty spillover',
            detail:
              'Some residents use Duval specialty systems. Confirm insurer networks and realistic US-17 / I-295 appointment drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Clay County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Clay County',
        href: 'https://www.claycountygov.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'Town of Orange Park',
        href: 'https://www.townoforangepark.com/',
        external: true,
      },
      {
        label: 'City of Green Cove Springs',
        href: 'https://www.greencovesprings.com/',
        external: true,
      },
      {
        label: 'Clay County District Schools',
        href: 'https://www.oneclay.net/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'US-17, I-295, Blanding before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Orange Park, Middleburg, Green Cove Springs, Fleming Island/river) when available. Confirm multi-unit packets, river-edge access, and honest US-17/Blanding time — this is Jax’s south collar, not a renamed Duval core pack. Parent market: Duval guide for metro-core context.',
  lastReviewed: '2026-07-24',
});
