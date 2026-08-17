import { readFileSync } from "node:fs";
import { CANONICAL_PRODUCTION_HOST } from "../../../lib/move-v2/migration/contract";
type Golden = {
  path: string;
  expectedStatus: number;
  expectedCanonical: string;
  expectedIndexable: boolean;
  expectedRouteFamily: string;
  expectedStructuredDataTypes: string[];
};
const golden = JSON.parse(
  readFileSync("lib/move-v2/migration/seo-golden-set.json", "utf8"),
) as Golden[];
const csv = readFileSync("docs/task-012-v1-v2-migration-matrix.csv", "utf8");
const errors: string[] = [];
for (const row of golden) {
  if (row.expectedStatus !== 200)
    errors.push(`${row.path}: golden status ${row.expectedStatus}`);
  if (!row.expectedCanonical.startsWith(CANONICAL_PRODUCTION_HOST))
    errors.push(`${row.path}: wrong canonical`);
  if (!row.expectedIndexable)
    errors.push(`${row.path}: sitemap golden URL noindex`);
  if (!csv.includes(`"${row.path}"`))
    errors.push(`${row.path}: not classified`);
}
const forbidden = [
  "experience-lab",
  "/api/",
  "internal/review",
  "localhost",
  "vercel.app",
];
for (const value of forbidden)
  for (const row of golden)
    if (row.expectedCanonical.includes(value))
      errors.push(`${row.path}: forbidden canonical ${value}`);
if (errors.length) throw new Error(errors.join("\n"));
console.log(
  JSON.stringify(
    {
      golden: golden.length,
      classified: true,
      canonicalHost: CANONICAL_PRODUCTION_HOST,
      errors: 0,
    },
    null,
    2,
  ),
);
