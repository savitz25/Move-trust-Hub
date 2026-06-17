// Core domain types for Move Trust Hub

export type ServiceType = 
  | 'Full Service'
  | 'Carrier'
  | 'Container / Portable'
  | 'Auto Transport'
  | 'Storage';

export type Region = 
  | 'All 50 States'
  | 'Continental US'
  | 'East Coast'
  | 'West Coast'
  | 'Midwest'
  | 'South'
  | 'Northeast'
  | 'Southeast'
  | 'Southwest'
  | 'Pacific Northwest';

export interface Company {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  shortDescription: string;
  description: string;
  foundedYear: number;
  headquarters: string;
  website: string;
  
  // Licensing & Compliance (FMCSA)
  usdotNumber: string;
  mcNumber: string;
  fmcsaSafetyRating: 'Satisfactory' | 'Conditional' | 'Unsatisfactory' | 'Not Rated';
  fmcsaComplaints: number; // last 2 years reported
  fmcsaShipments: number; // approx reported
  bbbRating: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'NR';
  bbbAccredited: boolean;

  // Reputation
  overallRating: number; // 0-5
  reviewCount: number;
  reputationScore: number; // 0-100 composite (weighted)

  // Business
  yearsInBusiness: number;
  avgPricePerMove: number; // estimated average $ for 3BR cross-country
  priceRange: string; // e.g. "$$$ - Premium"

  // Coverage & Specialties
  coverage: Region;
  services: ServiceType[];
  specialties: string[]; // e.g. "Military", "Senior", "Art & Antiques", "International"

  // Aggregated review breakdown
  ratingBreakdown: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };

  // Trust signals
  isVerified: boolean; // we mark as verified if we have direct data sources
  lastUpdated: string; // ISO date
}

export interface Review {
  id: string;
  companyId: string;
  companyName?: string;
  author: string;
  rating: number;
  date: string; // ISO
  source: 'Google' | 'BBB' | 'Trustpilot' | 'Yelp' | 'MoverReviews' | 'Verified Customer';
  title?: string;
  content: string;
  verified: boolean; // true for verified move
  location?: string;
}

export type SortOption = 
  | 'reputation'
  | 'rating'
  | 'reviews'
  | 'price-low'
  | 'price-high'
  | 'years'
  | 'complaints';

export interface DirectoryFilters {
  search: string;
  sort: SortOption;
  minRating: number;
  maxPrice: number;
  services: ServiceType[];
  coverage: Region | 'Any';
  bbbMin?: string;
  onlyFullService: boolean;
  onlyVerified: boolean;
  specialties: string[];
}

export interface ComparisonCompany extends Company {
  selected: boolean;
}

// Admin types (simple)
export interface AdminCompanyInput extends Omit<Company, 'id' | 'reputationScore' | 'yearsInBusiness' | 'ratingBreakdown'> {
  id?: string;
}
