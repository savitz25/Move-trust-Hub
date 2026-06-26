export type DestinationGuide = {
  slug: string;
  title: string;
  description: string;
  destinationHubPath: string;
  destinationLabel: string;
  sections: { heading: string; paragraphs: string[] }[];
  checklist: string[];
  relatedLinks: { title: string; href: string; description: string }[];
};

export const destinationGuides: DestinationGuide[] = [
  {
    slug: 'moving-to-myrtle-beach-2026',
    title: '2026 Moving Guide to Myrtle Beach & the Grand Strand',
    description:
      'Neighborhood overview, seasonal timing, hurricane prep, HOA/condo move rules, and a printable mover-vetting checklist for relocations to Myrtle Beach, SC and the Wilmington–Brunswick corridor.',
    destinationHubPath: '/moving-to/south-carolina',
    destinationLabel: 'South Carolina',
    sections: [
      {
        heading: 'Why families and retirees choose the Grand Strand',
        paragraphs: [
          'Myrtle Beach and the surrounding Grand Strand remain a top inbound market for retirees, remote workers, and families seeking lower taxes, coastal amenities, and relative affordability compared to Northeast metros. Horry County anchors the South Carolina side; Brunswick and New Hanover counties across the state line add Wilmington-area employment and healthcare options.',
          'Interstate moves into this corridor typically originate from Pennsylvania, New Jersey, New York, Ohio, and the Midwest. Peak demand runs May through September, with October–April offering more flexible delivery windows and modestly lower pricing.',
        ],
      },
      {
        heading: 'Neighborhoods and county coverage',
        paragraphs: [
          'Myrtle Beach proper, North Myrtle Beach, Surfside Beach, and Conway fall under Horry County. Southport, Leland, and coastal Brunswick County communities sit between Wilmington and the SC border. Wrightsville Beach and Wilmington are in New Hanover County.',
          'Use our county-level mover directories for vetted local companies in each jurisdiction, and our Myrtle Beach destination hub for interstate carrier comparisons and cost tables.',
        ],
      },
      {
        heading: 'Condo, HOA, and seasonal logistics',
        paragraphs: [
          'Oceanfront condos and gated communities often require move-in certificates, certificate of insurance (COI) naming the building, elevator reservations, and padded hallway protection. Book elevator windows before your carrier loads — missed slots are a common source of rescheduling fees.',
          'Hurricane season (June–November) can affect delivery timing. Confirm contingency language in your bill of lading and avoid scheduling fragile deliveries during named-storm watches when possible.',
        ],
      },
    ],
    checklist: [
      'Build a room-by-room inventory with our moving calculator before requesting quotes',
      'Verify USDOT/MC numbers on FMCSA.gov for every interstate carrier',
      'Request binding or not-to-exceed estimates after a virtual or in-home survey',
      'Confirm HOA/condo move-in rules and elevator reservations at your destination',
      'Compare at least 2–3 quotes on equal cubic footage — not just lowest price',
      'Read our scam avoidance guide before paying deposits',
    ],
    relatedLinks: [
      {
        title: 'South Carolina destination cluster',
        href: '/moving-to/south-carolina',
        description: 'Grand Strand costs, movers, calculator, and FAQ',
      },
      {
        title: 'New York → Myrtle Beach route guide',
        href: '/resources/routes/new-york-to-myrtle-beach',
        description: 'Distance, pricing, and planning tips',
      },
      {
        title: 'Horry County local movers',
        href: '/local-movers/south-carolina/horry',
        description: '10 vetted movers with FMCSA data',
      },
      {
        title: 'FMCSA licensing guide',
        href: '/resources/fmcsa',
        description: 'Verify any carrier before booking',
      },
    ],
  },
];

export function getDestinationGuide(slug: string): DestinationGuide | undefined {
  return destinationGuides.find((guide) => guide.slug === slug);
}