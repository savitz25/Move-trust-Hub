export const MOVE_HOME_LIMITATIONS: string[] = [
  'MoveTrustHub’s directory is not the complete FMCSA universe.',
  'Not every state publishes equivalent mover registration data.',
  'Headquarters location does not prove service territory.',
  'No complaint found is not proof that no complaints exist.',
  'Inspection volume varies with activity and exposure and is not a quality score.',
  'FMCSA authority does not mean TrustHub endorsement.',
  'National inspection and crash evidence is not yet represented in a bounded homepage census.',
  'National complaint trend is not yet represented by an immutable dated series.',
  'Insurance-on-file is not yet a defensible national homepage metric.',
  'County Enhanced Local Research is not nationally activated.',
];

export const MOVE_HOME_EVIDENCE_DEPTH = [
  {
    id: 'identity',
    label: 'Identity',
    status: 'Partial' as const,
    note: 'USDOT, MC, and legal name appear on directory profiles when stored. This is the published research directory, not a complete FMCSA census.',
  },
  {
    id: 'fmcsa_authority',
    label: 'FMCSA Authority',
    status: 'Partial' as const,
    note: 'authority_active is a source flag on directory profiles. Null is unknown. Active is not an endorsement, recommendation, or safety finding.',
  },
  {
    id: 'insurance',
    label: 'Insurance Filings',
    status: 'Not currently available as a national homepage metric' as const,
    note: 'No first-class bounded BIPD/cargo census is published on the national homepage.',
  },
  {
    id: 'safety',
    label: 'Safety / Inspections',
    status: 'Not currently available as a national homepage metric' as const,
    note: 'Inspection volume is not quality. No attributed national inspection or crash event census is homepage-ready.',
  },
  {
    id: 'complaints',
    label: 'Complaints',
    status: 'Not currently available as a national homepage metric' as const,
    note: 'A complaint is not wrongdoing. No immutable dated national complaint series is published here.',
  },
  {
    id: 'state_registration',
    label: 'State Registration',
    status: 'State-specific' as const,
    note: 'Florida FDACS registrations are researched on Florida Moving Intelligence. They are not a national count.',
  },
  {
    id: 'geography',
    label: 'Geography',
    status: 'Partial' as const,
    note: 'State landings are site coverage. Headquarters is stored location, not service territory or authorization to serve a state.',
  },
  {
    id: 'contacts',
    label: 'Business / Contact Evidence',
    status: 'Partial' as const,
    note: 'Phones, emails, and addresses appear on profiles when stored. Missing contact is omitted, never invented.',
  },
];

export const MOVE_HOME_MARKET_ROLES = [
  {
    id: 'carrier',
    title: 'Carrier',
    body: 'A carrier performs transportation under applicable operating authority. The carrier is the entity that hauls household goods.',
  },
  {
    id: 'broker',
    title: 'Broker',
    body: 'A broker arranges transportation and does not haul the shipment. Research the carrier named on the dispatch paperwork, not only the brand on the estimate.',
  },
  {
    id: 'carrier-broker',
    title: 'Carrier/Broker',
    body: 'Some companies hold both carrier and broker authority in the regulatory record. Dual authority stays dual — it is not collapsed into a single “better” role.',
  },
] as const;

export const MOVE_HOME_ASK_THE_MARKET = [
  {
    q: 'What does a USDOT number tell me?',
    href: '/verify-dot',
    hint: 'USDOT identifies the motor-carrier entity. Verify it on the official record.',
  },
  {
    q: 'What is the difference between a mover and a broker?',
    href: '/resources/carrier-vs-broker',
    hint: 'A carrier hauls. A broker arranges. They are not the same role.',
  },
  {
    q: 'What does active FMCSA authority mean?',
    href: '/resources/fmcsa',
    hint: 'It is a regulatory status, not a TrustHub recommendation.',
  },
  {
    q: 'What should I verify before paying a deposit?',
    href: '/resources/scams',
    hint: 'Match the name on the estimate to authority identifiers in writing.',
  },
  {
    q: 'What does a complaint tell me?',
    href: '/resources/how-to-choose',
    hint: 'A complaint is an observation, not a finding of wrongdoing.',
  },
  {
    q: 'How should I interpret inspection history?',
    href: '/verify-dot',
    hint: 'Inspection volume varies with activity. It is not a quality score.',
  },
  {
    q: 'What is different about interstate and intrastate moving regulation?',
    href: '/resources/fmcsa',
    hint: 'Crossing a state line is federal. Staying inside one state may require state registration.',
  },
] as const;
