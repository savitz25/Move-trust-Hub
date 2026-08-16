export const GOOGLE_MATCH_RULE_VERSION =
  "MOVE_GOOGLE_MATCH_2026_08_V1" as const;
export const WEBSITE_MATCH_RULE_VERSION =
  "MOVE_WEBSITE_MATCH_2026_08_V1" as const;
export const GEOGRAPHY_RULE_VERSION =
  "MOVE_SERVICE_AREA_PRECEDENCE_2026_08_V1" as const;
export type RegulatoryIdentity = {
  providerId: string;
  usdot?: string | null;
  legalName: string;
  dbaName?: string | null;
  phone?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  website?: string | null;
  classification: string;
};
export type GoogleCandidate = {
  placeId: string;
  displayName: string;
  formattedAddress?: string | null;
  phone?: string | null;
  websiteUri?: string | null;
  businessStatus?: string | null;
};
export type GoogleMatchStatus =
  | "GOOGLE_MATCH_HIGH_CONFIDENCE"
  | "GOOGLE_MATCH_REVIEW"
  | "GOOGLE_NO_MATCH"
  | "GOOGLE_MULTIPLE_PLAUSIBLE_MATCHES"
  | "GOOGLE_CLOSED_BUSINESS"
  | "GOOGLE_EXISTING_MATCH_REUSED";
export type GoogleMatchDecision = {
  status: GoogleMatchStatus;
  score: number;
  reasonCodes: string[];
  conflictCodes: string[];
  placeId: string | null;
  ruleVersion: typeof GOOGLE_MATCH_RULE_VERSION;
};
export type WebsiteStatus =
  "WEBSITE_HIGH_CONFIDENCE" | "WEBSITE_REVIEW" | "WEBSITE_REJECTED";
export type GeographyStatus =
  | "SERVICE_AREA_EXPLICIT"
  | "SERVICE_AREA_PARTIAL"
  | "SERVICE_AREA_NOT_FOUND"
  | "SERVICE_AREA_REVIEW";
