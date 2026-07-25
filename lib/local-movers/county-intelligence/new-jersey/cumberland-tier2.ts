import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Cumberland — NJ Tier 2 Wave 1 · Vineland / Bridgeton interior · parent Atlantic/Camden */
export const cumberlandCountyNjTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'cumberland',
  hubTitle: 'Cumberland County Moving Intelligence Hub',
  eyebrow: 'Cumberland · South Jersey interior · vs Atlantic / Camden',
  h1: 'Moving in Cumberland County: Vineland, Bridgeton & South Jersey Interior Logistics',
  heroOpener:
    'Cumberland is South Jersey’s interior — Vineland’s small-city stock, Bridgeton as a historic county-seat scale market, Millville, and ag-adjacent township edges. Compared with Atlantic’s shore towers or Camden’s Philly-collar suburbs, Cumberland jobs skew longer empty miles, agricultural approaches, thinner local crew coverage, and small-city stairs without boardwalk elevators. This guide is for people moving in Cumberland as interior product — not a shore rename and not a Cherry Hill script.',
  heroCredibility:
    'South Jersey interior · Ag-adjacent + small-city · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'Route 55 · Route 47 · Route 49 · Route 77 · NJ Turnpike (distant approaches)',
  parentCompare: {
    parentLabel: 'Atlantic County (and Camden collar patterns)',
    parentHref: '/local-movers/new-jersey/atlantic',
    title: 'Compared with Atlantic County',
    intro:
      'Cumberland is South Jersey interior — Vineland, Bridgeton, Millville, ag edges — not Atlantic City freight elevators or Downbeach sand staging, and not Cherry Hill planned-suburb density.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Atlantic crews fight ACE and Parkway shore peaks. Cumberland pairs ride Routes 55/47/49/77 with longer empty miles from denser South Jersey bases — freer mid-day than boardwalk approaches, still travel-minimum heavy for regional crews.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Atlantic mixes towers, beach blocks, and mainland HOAs. Cumberland mixes small-city multi-story, mid-century SFH, and farm-adjacent lots — more ag-edge outbuildings and rural approaches, almost no casino-district vertical product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Atlantic needs elevators and beach shuttles. Cumberland defaults to driveway access, small downtown staging, and gravel/soft-shoulder risk on township parcels — HOA elevators are the exception, not the rule.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cumberland quotes can look lower on simple driveways than shore peak rates — travel minimums and long ag-edge carries still push prices up when crews stage from denser counties.',
      },
      {
        title: 'Role difference',
        detail:
          'Cumberland is interior small-city + ag-adjacent living — not shore tourism product and not Philly-collar growth alone. Match crews to last-mile access and travel fees, not boardwalk playbooks.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Cumberland County different',
    intro: 'Interior empty miles and ag-edge access — not shore elevators.',
    bullets: [
      {
        title: 'Longer empty miles',
        detail:
          'Regional crews often stage from denser South Jersey markets — travel minimums should be transparent.',
      },
      {
        title: 'Ag-adjacent approaches',
        detail:
          'Farm lanes, outbuildings, and soft shoulders after rain rewrite truck selection.',
      },
      {
        title: 'Small-city stairs without tower docks',
        detail:
          'Vineland and Bridgeton multi-story stock needs stair inventories — not freight elevators.',
      },
      {
        title: 'Thinner local coverage',
        detail:
          'Confirm the mover actually serves your specific town; coverage is thinner than Cherry Hill or A.C. mainland.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Cumberland zones: Vineland, Bridgeton, Millville & ag-edge townships',
  zonesIntro: 'Small-city cores and agricultural edges are different access jobs.',
  zones: [
    {
      id: 'vineland',
      name: 'Vineland small-city core',
      shortName: 'Vineland',
      neighborhoods: ['Vineland', 'central multi-unit edges'],
      housingTypes: 'Small-city SFH, multi-story, apartments',
      challenges: ['Stairs', 'Street parking', 'Mixed access'],
      moverTips: 'Inventory stairs carefully; confirm multi-unit building rules.',
      cityKeywords: ['vineland'],
    },
    {
      id: 'bridgeton',
      name: 'Bridgeton county-seat scale',
      shortName: 'Bridgeton',
      neighborhoods: ['Bridgeton', 'nearby approaches'],
      housingTypes: 'Older multi-story, small-lot SFH',
      challenges: ['Downtown staging', 'Older interiors'],
      moverTips: 'Stage on wider side streets; protect plaster in older homes.',
      cityKeywords: ['bridgeton'],
    },
    {
      id: 'millville',
      name: 'Millville',
      shortName: 'Millville',
      neighborhoods: ['Millville', 'river-adjacent edges'],
      housingTypes: 'Mixed SFH, multi-unit, mid-century stock',
      challenges: ['Mixed street width', 'Regional travel time'],
      moverTips: 'Confirm the crew is not pricing a pure shore surcharge for interior addresses.',
      cityKeywords: ['millville'],
    },
    {
      id: 'ag-edge',
      name: 'Agricultural & township edges',
      shortName: 'Ag / rural edge',
      neighborhoods: ['Rural townships', 'farm-adjacent roads'],
      housingTypes: 'Farm edges, long-lot homes, outbuildings',
      challenges: ['Gravel access', 'Low wires', 'Soft ground'],
      moverTips: 'Send driveway video; mark septic and wells.',
      cityKeywords: ['deerfield', 'hopewell township', 'fairfield'],
    },
  ],
  specialized: [
    {
      id: 'ag-edge-access',
      title: 'Ag-adjacent access module',
      intro: 'Farm edges rewrite truck plans more than map miles.',
      bullets: [
        'List sheds, shops, and equipment explicitly.',
        'Photo unpaved approaches after rain.',
        'Ask about shuttle from the main road when trailers cannot turn.',
      ],
    },
    {
      id: 'travel-minimums',
      title: 'Regional travel minimums module',
      intro: 'Thinner local coverage means crews often stage from denser counties.',
      bullets: [
        'Clarify travel fees before comparing hourly rates.',
        'Ask about local storage if closings slip.',
      ],
    },
    {
      id: 'small-city-stairs',
      title: 'Small-city multi-story module',
      intro: 'Vineland and Bridgeton stairs are not boardwalk elevators.',
      bullets: [
        'Measure stair turns before accepting a “standard local” quote.',
        'Plan longer carries on tight lots.',
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
          'Cumberland education is municipal/regional across Vineland, Bridgeton, Millville, and township systems — match every address to the correct district.',
        bullets: [
          {
            title: 'District map first',
            detail:
              'Use NJ DOE performance reports and district sites; interior systems differ in size from shore and Philly-collar districts.',
          },
          {
            title: 'Program breadth',
            detail:
              'Ask about course offerings and extracurricular capacity when comparing with larger suburban districts.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Inspira / regional South Jersey systems',
            detail:
              'Primary care anchors for much of Cumberland; confirm campus and specialty access in-network.',
          },
          {
            title: 'Travel for tertiary care',
            detail:
              'Some residents travel toward Atlantic, Camden, or Philly systems — map drive times honestly.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Cumberland County',
    intro: 'Travel minimums and ag-edge access matter more than shore peak premiums.',
    drivers: [
      {
        title: 'Travel minimums',
        detail: 'Common when crews stage from denser South Jersey markets.',
      },
      {
        title: 'Ag-edge carries',
        detail: 'Outbuildings and long approaches add labor minutes.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$400–$850+' },
      { label: 'Family / rural-edge home', value: '$1,500–$3,200+' },
      { label: '2-person crew', value: '$95–$145+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Agricultural and family calendars — not boardwalk tourism peaks.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings fill weekend crews first.',
      },
      {
        title: 'Harvest / ag activity',
        detail: 'Rural roads and local activity can affect timing on township edges.',
      },
    ],
  },
  resources: {
    title: 'Useful Cumberland County resources',
    items: [
      {
        label: 'Cumberland County',
        href: 'https://www.cumberlandcountynj.gov/',
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
        label: 'Directory: Cumberland filter',
        href: '/companies?coverage=state&state=NJ&counties=cumberland',
      },
    ],
  },
  directoryHint:
    'Confirm the mover serves your specific town; clarify travel fees for interior addresses.',
  lastReviewed: '2026-07-22',
});
