export type Queryable = {
  query: (
    sql: string,
    values?: unknown[],
  ) => Promise<{ rows: Record<string, unknown>[] }>;
};
export type OriginResolution = {
  status: "GEOGRAPHIC_ZCTA" | "UNSUPPORTED_NON_GEOGRAPHIC" | "REVIEW";
  postalZip: string;
  zcta: string | null;
  state: string | null;
  countyGeoid: string | null;
  explanation: string;
};
export const placementExplanation = (reason: string, label?: string) =>
  reason === "PROVIDER_EXPLICIT_COUNTY"
    ? `This mover states that it serves ${label ?? "this county"}.`
    : reason === "PROVIDER_EXPLICIT_ZIP"
      ? `This mover states that it serves origin ZIP ${label ?? "this area"}.`
      : reason.startsWith("TRUSTHUB_DERIVED")
        ? "MoveTrustHub estimates this mover is relevant for pickups in this area based on its verified business location and reported operating capacity."
        : "This mover's current state authority and geographic evidence support this origin.";
const base = `select o.provider_id,f.display_name,f.legal_name,f.dba_name,e.eligibility authority_status,o.state,o.county_geoid,o.zcta,o.evidence_tier,o.placement_reason,o.evidence_reference,o.distance_miles,f.power_units,g.website_uri,case when o.placement_reason like 'TRUSTHUB_DERIVED%' then 'EXPERIMENTAL_DERIVED' else 'EXPLICIT' end placement_class from move_v2.origin_search_placement o join move_v2.provider_local_eligibility e on e.provider_id=o.provider_id and e.state=o.state and e.superseded_at is null and e.eligibility='STATE_VERIFIED_LOCAL_MOVER' join move_v2.fmcsa_provider_fact f on f.provider_id=o.provider_id left join move_v2.google_place_cache g on g.provider_id=o.provider_id where o.active=true and o.invalidated_at is null`;
const experimentalGate=(include=false)=>include?"":" and o.placement_reason not like 'TRUSTHUB_DERIVED%'";
export async function findLocalMoversByOriginCounty(
  db: Queryable,
  state: string,
  countyGeoid: string,
  options: { includeExperimentalDerived?: boolean } = {},
) {
  return (
    await db.query(
      `${base}${experimentalGate(options.includeExperimentalDerived)} and o.state=$1 and o.county_geoid=$2 and o.zcta is null order by o.evidence_tier,o.distance_miles nulls last,f.display_name,o.provider_id`,
      [state, countyGeoid],
    )
  ).rows;
}
export async function resolveOriginZip(
  db: Queryable,
  postalZip: string,
): Promise<OriginResolution> {
  if (!/^\d{5}$/.test(postalZip))
    return {
      status: "REVIEW",
      postalZip,
      zcta: null,
      state: null,
      countyGeoid: null,
      explanation: "Origin ZIP must contain exactly five digits.",
    };
  const r = await db.query(
    `select postal_zip,zcta,status,state,primary_county_geoid,explanation from move_v2.postal_zip_resolution where postal_zip=$1`,
    [postalZip],
  );
  if (!r.rows.length)
    return {
      status: "UNSUPPORTED_NON_GEOGRAPHIC",
      postalZip,
      zcta: null,
      state: null,
      countyGeoid: null,
      explanation:
        "No geographic 2020 Census ZCTA is available for this typed ZIP; no area was inferred.",
    };
  const x = r.rows[0];
  return {
    status: x.status as OriginResolution["status"],
    postalZip,
    zcta: String(x.zcta),
    state: String(x.state),
    countyGeoid: String(x.primary_county_geoid),
    explanation: String(x.explanation),
  };
}
export async function findLocalMoversByOriginZip(
  db: Queryable,
  postalZip: string,
  options: { includeExperimentalDerived?: boolean } = {},
) {
  const resolution = await resolveOriginZip(db, postalZip);
  if (resolution.status !== "GEOGRAPHIC_ZCTA")
    return { resolution, providers: [] };
  const providers = (
    await db.query(
      `${base}${experimentalGate(options.includeExperimentalDerived)} and o.zcta=$1 order by o.evidence_tier,o.distance_miles nulls last,f.display_name,o.provider_id`,
      [resolution.zcta],
    )
  ).rows;
  return { resolution, providers };
}
export function searchInputsAffectTrustworthiness() {
  return false;
}
export function mayEnterOriginSearch(input:{state:string;eligibility:string;role:"MOVER"|"BROKER";identityResolved:boolean;vertical?:"MOVE"|"AUTO_TRANSPORT";subscription?:string;rating?:number}) {
  return ["FL","WA","IL"].includes(input.state) && input.eligibility === "STATE_VERIFIED_LOCAL_MOVER" && input.role === "MOVER" && input.identityResolved && input.vertical !== "AUTO_TRANSPORT";
}
export const evidenceTier=(reason:string)=>reason.startsWith("PROVIDER_EXPLICIT")?1:reason.startsWith("REGULATORY_")?2:reason==="TRUSTHUB_DERIVED_HOME_COUNTY"?3:reason==="TRUSTHUB_DERIVED_MEANINGFUL_COVERAGE"?4:99;
export function orderOriginResults<T extends{placementReason:string;distanceMiles?:number|null;providerId:string}>(rows:T[]) {
  return [...rows].sort((a,b)=>evidenceTier(a.placementReason)-evidenceTier(b.placementReason)||(a.distanceMiles??Infinity)-(b.distanceMiles??Infinity)||a.providerId.localeCompare(b.providerId));
}
export function placementInvalidationReasons(input:{authorityChanged?:boolean;identityChanged?:boolean;explicitChanged?:boolean;locationChanged?:boolean;fleetChanged?:boolean;modelChanged?:boolean;geographyVintageChanged?:boolean}) {
  return Object.entries(input).filter(([,value])=>value).map(([key])=>key);
}
