/** Editorial team — E-E-A-T authorship signals for guides and directory pages. */

export type EditorialExpert = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
};

export const EDITORIAL_ORGANIZATION = {
  name: 'Move Trust Hub Editorial Team',
  url: 'https://www.movetrusthub.com/about',
} as const;

export const EDITORIAL_EXPERTS: EditorialExpert[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Lead Moving Industry Editor',
    bio: 'Former logistics coordinator with 12+ years reviewing FMCSA licensing data, interstate pricing patterns, and consumer complaint trends. Sarah leads our county research program and reputation score methodology.',
    expertise: ['FMCSA compliance', 'Interstate pricing', 'Reputation scoring'],
  },
  {
    id: 'marcus-reed',
    name: 'Marcus Reed',
    role: 'Senior Route & Corridor Analyst',
    bio: 'Specializes in long-haul corridor logistics — seasonal demand, origin/destination accessorials, and binding estimate best practices. Marcus authors our interstate route guides and city destination hubs.',
    expertise: ['Route guides', 'Seasonal demand', 'Coastal & urban access'],
  },
  {
    id: 'elena-vargas',
    name: 'Elena Vargas',
    role: 'Local Markets Research Lead',
    bio: 'Researches hyper-local moving conditions across 3,100+ U.S. counties: HOA rules, parking permits, rural access, and metro-specific cost ranges. Elena maintains our curated county guides.',
    expertise: ['County market research', 'HOA & condo logistics', 'Local cost data'],
  },
];

export function getPrimaryEditorForContent(
  contentType: 'county' | 'route' | 'city-hub' | 'directory'
): EditorialExpert {
  switch (contentType) {
    case 'route':
    case 'city-hub':
      return EDITORIAL_EXPERTS[1];
    case 'county':
      return EDITORIAL_EXPERTS[2];
    default:
      return EDITORIAL_EXPERTS[0];
  }
}

export function buildEditorPersonSchema(expert: EditorialExpert) {
  return {
    '@type': 'Person',
    '@id': `https://www.movetrusthub.com/about#editor-${expert.id}`,
    name: expert.name,
    jobTitle: expert.role,
    description: expert.bio,
    worksFor: {
      '@type': 'Organization',
      name: 'Move Trust Hub',
      url: 'https://www.movetrusthub.com',
    },
    knowsAbout: expert.expertise,
  };
}