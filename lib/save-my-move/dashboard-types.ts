export type CompanySummary = {
  slug: string;
  name: string;
  overallRating: number;
  reviewCount: number;
  reputationScore: number;
  avgPricePerMove: number;
  fmcsaSafetyRating: string;
  isVerified: boolean;
  usdotNumber: string;
};

export type MyMoveDashboardPayload = {
  user: { id: string; email: string };
  profile: {
    marketing_opt_in: boolean;
    mover_alerts_opt_in: boolean;
  } | null;
  inventories: Array<{
    id: string;
    name: string;
    inventory: unknown;
    mode: string | null;
    move_preset: string | null;
    total_volume: number | null;
    total_items: number | null;
    created_at: string;
    updated_at: string;
  }>;
  movers: Array<{
    id: string;
    company_slug: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
  }>;
  comparisons: Array<{
    id: string;
    company_slugs: string[];
    name: string | null;
    created_at: string;
  }>;
  companyNames: Record<string, string>;
  companySummaries: Record<string, CompanySummary>;
};