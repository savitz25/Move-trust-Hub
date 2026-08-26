import type { IntelligenceEducationModule } from './payload-types';

export const FLORIDA_MOVE_EDUCATION: IntelligenceEducationModule[] = [
  {
    id: 'interstate-vs-intrastate',
    title: 'Interstate vs intrastate',
    body: 'A move that crosses a state line is interstate and is regulated federally (USDOT / MC authority). A move that stays entirely inside Florida is intrastate and may require a Florida FDACS mover registration. Headquarters in Florida does not, by itself, prove either authority.',
    href: '/resources/fmcsa',
  },
  {
    id: 'carrier-vs-broker',
    title: 'Carrier vs broker',
    body: 'A carrier operates trucks and is responsible for the shipment. A broker arranges transportation and does not haul the goods. Some companies hold both. Research the entity that will actually move your household goods, not only the brand on the estimate.',
    href: '/resources/carrier-vs-broker',
  },
  {
    id: 'usdot-mc',
    title: 'Why USDOT and MC matter',
    body: 'USDOT identifies the motor-carrier entity. MC (docket) identifies operating authority. They are related but not interchangeable. A Florida registration number is a third identifier. Do not treat a numeric fragment as unique.',
    href: '/verify-dot',
  },
  {
    id: 'florida-registration',
    title: 'Florida registration',
    body: 'Intrastate household-goods movers in Florida register with FDACS. Registration status is a source field. Expired, inactive, or unresolved rows are not treated as current authority. Out-of-state companies can be registered to operate in Florida without being headquartered here.',
  },
  {
    id: 'estimates-contracts',
    title: 'Estimates and contracts',
    body: 'Compare the written estimate, the mover named on it, and the authority identifiers. Binding vs non-binding estimates, extra fees, and who will actually perform the work should be in writing before a deposit.',
    href: '/tools/move-quote-check',
  },
  {
    id: 'deposit-red-flags',
    title: 'Deposits and payment demands',
    body: 'Large up-front cash demands, last-minute truck swaps, and pressure to sign blank documents are research red flags — not automatic proof of fraud. Verify the named carrier’s authority and keep the paper trail.',
    href: '/resources/scams',
  },
  {
    id: 'complaints-enforcement',
    title: 'How to read complaint and enforcement records',
    body: 'A complaint is a raw observation, not a finding. An investigation is not enforcement. A notice is not a final order. When this research graph has final dispositions, they are labeled separately. Counts of complaints are not guilt.',
  },
];
