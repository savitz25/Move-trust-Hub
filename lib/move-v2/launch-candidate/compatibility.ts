export type V1CompanyRow = Record<string, unknown> & {
  id?: string | null;
  slug?: string | null;
  name?: string | null;
  usdot_number?: string | null;
  usdot_status?: string | null;
  authority_active?: boolean | null;
  out_of_service?: boolean | null;
};

export const V1_COMPOSED_COMPANY_FIELDS = [
  "id", "slug", "name", "usdot_number", "usdot_status", "authority_active",
  "out_of_service", "headquarters", "physical_address", "phone", "website",
] as const;

export function adaptV1Company(row: V1CompanyRow) {
  const status = row.usdot_status ??
    (row.out_of_service === true ? "OUT_OF_SERVICE" :
      row.authority_active === true ? "ACTIVE" :
        row.authority_active === false ? "INACTIVE" : "NOT_REPORTED");
  return { ...row, usdot_status: status };
}

export function hasComposedV1Fields(row: Record<string, unknown>) {
  const adapted: Record<string, unknown> = adaptV1Company(row);
  return ["id", "slug", "name", "usdot_status"].every((field) =>
    adapted[field] !== undefined && adapted[field] !== null && adapted[field] !== ""
  );
}
