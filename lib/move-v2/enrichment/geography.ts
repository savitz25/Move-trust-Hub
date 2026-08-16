import { GEOGRAPHY_RULE_VERSION, type GeographyStatus } from "./types";
export function decideGeographyEvidence(input: {
  explicitAreas: string[];
  ambiguousAreas?: string[];
  branchCount?: number;
  fleetSize?: number;
  subscriptionState?: string;
}): {
  status: GeographyStatus;
  derivedServiceAreaRequired: boolean;
  ruleVersion: typeof GEOGRAPHY_RULE_VERSION;
} {
  if (input.ambiguousAreas?.length)
    return {
      status: "SERVICE_AREA_REVIEW",
      derivedServiceAreaRequired: false,
      ruleVersion: GEOGRAPHY_RULE_VERSION,
    };
  if (input.explicitAreas.length >= 2)
    return {
      status: "SERVICE_AREA_EXPLICIT",
      derivedServiceAreaRequired: false,
      ruleVersion: GEOGRAPHY_RULE_VERSION,
    };
  if (input.explicitAreas.length === 1)
    return {
      status: "SERVICE_AREA_PARTIAL",
      derivedServiceAreaRequired: false,
      ruleVersion: GEOGRAPHY_RULE_VERSION,
    };
  return {
    status: "SERVICE_AREA_NOT_FOUND",
    derivedServiceAreaRequired: true,
    ruleVersion: GEOGRAPHY_RULE_VERSION,
  };
}
