export const SERVICE_GEOGRAPHY_RULE_VERSION =
  "MOVE_SERVICE_GEOGRAPHY_2026_08_V1" as const;
export type GeographyObservation = {
  rawClaim: string;
  geographyType:
    "STATE" | "COUNTY" | "CITY" | "ZIP" | "REGION" | "NAMED_SERVICE_AREA";
  normalizedLabel: string | null;
  normalizedGeoid: string | null;
  normalizationReason: string;
  isExclusion: boolean;
  confidence: number;
};
const regions = [
  "South Florida",
  "Central Florida",
  "North Florida",
  "Puget Sound",
  "Seattle metro",
  "Tampa Bay",
  "Treasure Coast",
  "Space Coast",
];
const clean = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
export function extractServiceClaims(html: string) {
  const text = clean(html);
  return [
    ...new Set(
      text
        .split(/(?<=[.!?])\s+/)
        .filter(
          (s) =>
            s.length >= 12 &&
            s.length <= 420 &&
            /(serv(?:e|es|ing|ice area)|areas? we serve|moving services? (?:in|throughout)|local moves? (?:in|within)|do not serve|count(?:y|ies))/i.test(
              s,
            ),
        )
        .map((s) => s.trim()),
    ),
  ];
}
export function normalizeServiceClaim(
  rawClaim: string,
  counties: { name: string; geoid: string }[],
  cities: string[] = [],
): GeographyObservation[] {
  const exclusion =
    /\b(?:do not|don't|does not|excluding|except|only within)\b/i.test(
      rawClaim,
    );
  const out: GeographyObservation[] = [];
  for (const c of counties)
    if (new RegExp(`\\b${escape(c.name)}(?: County)?\\b`, `i`).test(rawClaim))
      out.push({
        rawClaim,
        geographyType: "COUNTY",
        normalizedLabel: `${c.name} County`,
        normalizedGeoid: c.geoid,
        normalizationReason: "EXACT_OFFICIAL_COUNTY_NAME",
        isExclusion: exclusion,
        confidence: 0.98,
      });
  for (const z of new Set(rawClaim.match(/\b\d{5}\b/g) ?? []))
    out.push({
      rawClaim,
      geographyType: "ZIP",
      normalizedLabel: z,
      normalizedGeoid: z,
      normalizationReason:
        "EXACT_PUBLISHED_FIVE_DIGIT_CODE; ZCTA_RESOLUTION_SEPARATE",
      isExclusion: exclusion,
      confidence: 0.9,
    });
  for (const region of regions)
    if (new RegExp(`\\b${escape(region)}\\b`, `i`).test(rawClaim))
      out.push({
        rawClaim,
        geographyType: "REGION",
        normalizedLabel: region,
        normalizedGeoid: null,
        normalizationReason: "NAMED_REGION_RETAINED_WITHOUT_COUNTY_INFERENCE",
        isExclusion: exclusion,
        confidence: 0.85,
      });
  for (const city of cities)
    if (new RegExp(`\\b${escape(city)}\\b`, `i`).test(rawClaim))
      out.push({
        rawClaim,
        geographyType: "CITY",
        normalizedLabel: city,
        normalizedGeoid: null,
        normalizationReason: "EXACT_RECOGNIZED_CITY_NAME; NO_COUNTY_EXPANSION",
        isExclusion: exclusion,
        confidence: 0.9,
      });
  if (!out.length)
    out.push({
      rawClaim,
      geographyType: "NAMED_SERVICE_AREA",
      normalizedLabel: null,
      normalizedGeoid: null,
      normalizationReason:
        "UNSTRUCTURED_PROVIDER_LANGUAGE_RETAINED_WITHOUT_PRECISE_INFERENCE",
      isExclusion: exclusion,
      confidence: 0.6,
    });
  return out;
}
const escape = (v: string) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export function geographyConflict(rows: GeographyObservation[]) {
  const keys = new Map<string, Set<boolean>>();
  for (const r of rows) {
    const key = `${r.geographyType}:${r.normalizedGeoid ?? r.normalizedLabel ?? r.rawClaim}`;
    const s = keys.get(key) ?? new Set<boolean>();
    s.add(r.isExclusion);
    keys.set(key, s);
  }
  return [...keys.values()].some((x) => x.size > 1);
}
