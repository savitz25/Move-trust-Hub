import { readFileSync, writeFileSync } from "node:fs";
import { Client } from "pg";
import { databaseUrl, ssl } from "../db/connection";
async function main() {
  const HOST = "https://www.movetrusthub.com";
  const xml = await fetch(`${HOST}/sitemap.xml`).then((r) => r.text());
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((m) => m[1])
    .filter((x) => /\/compan(?:y|ies)\//.test(x));
  const v2 = JSON.parse(
    readFileSync("lib/move-v2/consumer-discovery/release-v2.json", "utf8"),
  ).providers as Array<{
    providerId: string;
    usdot: string | null;
    legalName: string;
    displayName: string;
  }>;
  const byDot = new Map(v2.filter((p) => p.usdot).map((p) => [p.usdot!, p]));
  const rows = [];
  for (let i = 0; i < urls.length; i += 6) {
    const batch = await Promise.all(
      urls.slice(i, i + 6).map(async (url) => {
        const html = await fetch(url, {
          signal: AbortSignal.timeout(20000),
        }).then((r) => r.text());
        const dots = [
          ...new Set(
            [
              ...html.matchAll(
                /(?:USDOT|US\s*DOT|DOT Number|\bDOT)\D{0,30}(\d{5,8})/gi,
              ),
            ].map((m) => m[1]),
          ),
        ];
        const matches = dots.map((d) => byDot.get(d)).filter(Boolean);
        return {
          v1_url: new URL(url).pathname,
          observed_usdot: dots.join("|"),
          match_status:
            matches.length === 1
              ? "EXACT_USDOT_MATCH"
              : matches.length > 1
                ? "IDENTITY_REVIEW"
                : "UNMATCHED",
          provider_id: matches.length === 1 ? matches[0]!.providerId : "",
          v2_display_name: matches.length === 1 ? matches[0]!.displayName : "",
          proposed_canonical: new URL(url).pathname,
          redirect_required: "NO",
          notes: dots.length
            ? "Exact identifier only; no fuzzy merge"
            : "No USDOT extracted from rendered Production HTML",
        };
      }),
    );
    rows.push(...batch);
  }
  const dots = [
    ...new Set(
      rows.flatMap((row) => row.observed_usdot.split("|")).filter(Boolean),
    ),
  ];
  const client = new Client({ connectionString: databaseUrl(), ssl });
  await client.connect();
  try {
    const db = await client.query(
      `select provider_id,usdot,display_name from move_v2.fmcsa_provider_fact where usdot=any($1::text[])`,
      [dots],
    );
    for (const match of db.rows)
      byDot.set(match.usdot, {
        providerId: match.provider_id,
        usdot: match.usdot,
        legalName: match.display_name,
        displayName: match.display_name,
      });
    for (const row of rows) {
      const matches = row.observed_usdot
        .split("|")
        .map((dot) => byDot.get(dot))
        .filter(Boolean);
      row.match_status =
        matches.length === 1
          ? "EXACT_USDOT_MATCH"
          : matches.length > 1
            ? "IDENTITY_REVIEW"
            : "UNMATCHED";
      row.provider_id = matches.length === 1 ? matches[0]!.providerId : "";
      row.v2_display_name = matches.length === 1 ? matches[0]!.displayName : "";
    }
  } finally {
    await client.end();
  }
  const headers = Object.keys(rows[0]);
  const cell = (v: unknown) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  writeFileSync(
    "docs/task-012-provider-url-identity-map.csv",
    [
      headers.map(cell).join(","),
      ...rows.map((r) =>
        headers.map((h) => cell(r[h as keyof typeof r])).join(","),
      ),
    ].join("\n") + "\n",
  );
  console.log(
    JSON.stringify(
      {
        providerUrls: rows.length,
        exact: rows.filter((r) => r.match_status === "EXACT_USDOT_MATCH")
          .length,
        review: rows.filter((r) => r.match_status === "IDENTITY_REVIEW").length,
        unmatched: rows.filter((r) => r.match_status === "UNMATCHED").length,
      },
      null,
      2,
    ),
  );
}
void main();
