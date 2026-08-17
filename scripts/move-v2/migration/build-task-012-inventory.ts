import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
const HOST = "https://www.movetrusthub.com";
const extractLocs = (xml: string) =>
  [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) =>
    m[1].replaceAll("&amp;", "&"),
  );
const csv = (v: unknown) => `"${String(v ?? "").replaceAll('"', '""')}"`;
async function fetchText(url: string) {
  const started = performance.now();
  const r = await fetch(url, {
    redirect: "manual",
    headers: { "user-agent": "MoveTrustHub/2.0 migration rehearsal" },
    signal: AbortSignal.timeout(30000),
  });
  return {
    url,
    status: r.status,
    location: r.headers.get("location"),
    text: await r.text(),
    elapsedMs: Math.round(performance.now() - started),
  };
}
function family(path: string) {
  if (path === "/") return "homepage";
  if (path.startsWith("/companies/") || path.startsWith("/company/"))
    return "provider";
  if (path === "/companies" || path === "/local-movers")
    return "mover_directory";
  if (/^\/local-movers\/[^/]+$/.test(path)) return "state_movers";
  if (path.startsWith("/local-movers/")) return "county_local_movers";
  if (path.startsWith("/moving-to/")) return "moving_to";
  if (path.startsWith("/resources/guides/")) return "guide";
  if (path.startsWith("/resources/routes/")) return "route_guide";
  if (path.startsWith("/resources")) return "resource";
  if (path.startsWith("/auto-transport")) return "auto_transport";
  if (path.includes("move-quote-check")) return "quote_tool";
  if (path === "/moving-calculator") return "inventory_calculator";
  if (path === "/verify-dot") return "dot_verification";
  if (path === "/compare") return "compare";
  if (path.startsWith("/my-move")) return "move_plan";
  if (path.startsWith("/about")) return "about_methodology";
  if (path === "/contact" || path.includes("privacy") || path.includes("terms"))
    return "legal_contact";
  if (path.startsWith("/api/")) return "public_api";
  if (path.includes("sitemap") || path === "/robots.txt")
    return "crawler_contract";
  if (
    path.startsWith("/experience-lab") ||
    path.startsWith("/admin") ||
    path.startsWith("/portal") ||
    path.startsWith("/for-movers")
  )
    return "internal_private";
  if (path.startsWith("/insurance") || path.startsWith("/lender"))
    return "separated_hub_legacy";
  return "other_public";
}
function decision(path: string, f: string, indexable: boolean) {
  if (!indexable) return "INTERNAL_ONLY / NOT PUBLIC";
  if (path === "/" || path === "/local-movers") return "REBUILD_IN_V2_SAME_URL";
  if (f === "compare" || f === "dot_verification")
    return "MERGE_INTO_EXISTING_V2_SURFACE";
  if (f === "provider" || f === "auto_transport" || f === "move_plan")
    return "KEEP_V1_TEMPORARILY";
  return "PRESERVE_AS_IS";
}
function routeFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name),
      s = statSync(p);
    if (s.isDirectory()) out.push(...routeFiles(p));
    else if (/(?:page|route)\.(?:ts|tsx)$/.test(name)) out.push(p);
  }
  return out;
}
function appPattern(file: string) {
  let p =
    "/" +
    relative("app", file)
      .split(sep)
      .slice(0, -1)
      .filter((x) => !/^\(.+\)$/.test(x))
      .join("/");
  p = p.replace(/\/page$|\/route$/g, "");
  return p === "/" ? p : p.replace(/\/$/, "");
}
function metadata(html: string) {
  const one = (re: RegExp) =>
    html
      .match(re)?.[1]
      ?.replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&") ?? null;
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)/gi)].map(
    (m) => m[1],
  );
  const schemas: string[] = [];
  for (const m of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const v = JSON.parse(m[1]);
      const walk = (x: unknown) => {
        if (!x || typeof x !== "object") return;
        const o = x as Record<string, unknown>;
        if (typeof o["@type"] === "string") schemas.push(o["@type"]);
        if (Array.isArray(o["@graph"])) o["@graph"].forEach(walk);
      };
      if (Array.isArray(v)) v.forEach(walk);
      else walk(v);
    } catch {
      schemas.push("INVALID_JSON_LD");
    }
  }
  return {
    title: one(/<title[^>]*>([^<]*)<\/title>/i),
    description:
      one(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i) ??
      one(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i),
    canonical:
      one(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i) ??
      one(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i),
    robots: one(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)/i),
    openGraph: Boolean(/property=["']og:/i.test(html)),
    twitter: Boolean(/name=["']twitter:/i.test(html)),
    schemas: [...new Set(schemas)].sort(),
    internalLinksOut: new Set(links.filter((x) => x.startsWith("/"))).size,
    externalLinksOut: new Set(
      links.filter((x) => /^https?:\/\//.test(x) && !x.startsWith(HOST)),
    ).size,
  };
}
async function main() {
  const main = await fetchText(`${HOST}/sitemap.xml`),
    localIndex = await fetchText(`${HOST}/sitemap-local/sitemap.xml`);
  const childUrls = extractLocs(localIndex.text);
  const localUrls: string[] = [];
  for (let i = 0; i < childUrls.length; i += 6) {
    const batch = await Promise.all(childUrls.slice(i, i + 6).map(fetchText));
    for (const r of batch)
      if (r.status === 200) localUrls.push(...extractLocs(r.text));
  }
  const sitemapUrls = [...new Set([...extractLocs(main.text), ...localUrls])];
  const rows = new Map<string, Record<string, unknown>>();
  for (const raw of sitemapUrls) {
    const u = new URL(raw),
      path = u.pathname,
      f = family(path),
      d = decision(path, f, true);
    rows.set(path, {
      current_path: path,
      route_family: f,
      page_type: f,
      static_dynamic: path.includes("[") ? "dynamic" : "generated/static",
      indexable: true,
      canonical: raw,
      title: "runtime; sampled in golden set",
      meta_description: "runtime; sampled in golden set",
      robots_directive: "index,follow (sitemap membership)",
      structured_data_types: "sampled by family",
      internal_links_in: "crawl-derived at rehearsal",
      internal_links_out: "runtime",
      v1_feature_dependency: f,
      v2_equivalent:
        d === "KEEP_V1_TEMPORARILY"
          ? "transition adapter / identity mapping"
          : "same intent V2 surface",
      decision: d,
      redirect_status: "",
      redirect_target: "",
      canonical_target: raw,
      launch_requirement:
        d === "KEEP_V1_TEMPORARILY"
          ? "transition route must remain available"
          : "preserve intent and metadata",
      risk: d === "KEEP_V1_TEMPORARILY" ? "MEDIUM" : "LOW",
      notes: "Production sitemap observation",
    });
  }
  for (const file of routeFiles("app")) {
    const path = appPattern(file);
    if (rows.has(path)) continue;
    const f = family(path),
      internal =
        f === "internal_private" ||
        f === "public_api" ||
        path.includes("[") ||
        f === "separated_hub_legacy";
    rows.set(path, {
      current_path: path,
      route_family: f,
      page_type: f,
      static_dynamic: path.includes("[") ? "dynamic pattern" : "static",
      indexable: false,
      canonical: "",
      title: "repository route",
      meta_description: "",
      robots_directive: internal
        ? "not public/indexable"
        : "not present in sitemap",
      structured_data_types: "",
      internal_links_in: "repository",
      internal_links_out: "runtime",
      v1_feature_dependency: f,
      v2_equivalent: internal ? "none" : "audit before launch",
      decision: internal ? "INTERNAL_ONLY / NOT PUBLIC" : "KEEP_V1_TEMPORARILY",
      redirect_status: "",
      redirect_target: "",
      canonical_target: "",
      launch_requirement: internal
        ? "remain inaccessible/noindex"
        : "manual intent review",
      risk: internal ? "HIGH if exposed" : "MEDIUM",
      notes: `Repository: ${file.replaceAll(sep, "/")}`,
    });
  }
  for (const row of rows.values()) {
    if (row.route_family === "separated_hub_legacy") {
      const lender = String(row.current_path).startsWith("/lender");
      const target = lender
        ? "https://www.lendertrusthub.com/"
        : "https://www.insurancetrusthub.com/";
      Object.assign(row, {
        decision: "REBUILD_IN_V2_NEW_URL_WITH_301",
        redirect_status: 301,
        redirect_target: target,
        canonical_target: target,
        launch_requirement: "preserve direct specialist-hub redirect",
        risk: "MEDIUM",
        notes: "Existing cross-domain separation; never route to Move homepage",
      });
    }
  }
  const redirects = [
    [/^\/about\/methodology$/, "/about/how-we-score-movers"],
    [/^\/methodology$/, "/about/how-we-score-movers"],
    [/^\/about\/trust(?:-center)?$/, "/about/how-we-score-movers"],
    [
      /^\/moving-to\/myrtle-beach-sc$/,
      "/moving-to/south-carolina/myrtle-beach-sc",
    ],
    [
      /^\/from-georgia-to-huntsville(?:-al)?$/,
      "/moving-to/alabama/huntsville-al",
    ],
  ] as const;
  for (const [re, target] of redirects) {
    const example = re.source
      .replaceAll("\\/", "/")
      .replace(/^\^|\$$/g, "")
      .replace(/\\/g, "")
      .replace(/\(\?:.*$/g, "");
    if (!rows.has(example))
      rows.set(example, {
        current_path: example,
        route_family: "legacy_redirect",
        page_type: "redirect",
        static_dynamic: "redirect rule",
        indexable: false,
        canonical: "",
        title: "",
        meta_description: "",
        robots_directive: "redirect",
        structured_data_types: "",
        internal_links_in: "legacy/Search Console",
        internal_links_out: "",
        v1_feature_dependency: "legacy URL",
        v2_equivalent: target,
        decision: "REBUILD_IN_V2_NEW_URL_WITH_301",
        redirect_status: 301,
        redirect_target: target,
        canonical_target: HOST + target,
        launch_requirement: "one-hop permanent redirect",
        risk: "LOW",
        notes: "Existing redirect preserved",
      });
  }
  for (const [re, target] of redirects)
    for (const row of rows.values())
      if (re.test(String(row.current_path)))
        Object.assign(row, {
          decision: "REBUILD_IN_V2_NEW_URL_WITH_301",
          redirect_status: 301,
          redirect_target: target,
          canonical_target: HOST + target,
          launch_requirement: "one-hop permanent redirect",
          risk: "LOW",
          notes: "Existing redirect preserved",
        });
  const headers = [
    "current_path",
    "route_family",
    "page_type",
    "static_dynamic",
    "indexable",
    "canonical",
    "title",
    "meta_description",
    "robots_directive",
    "structured_data_types",
    "internal_links_in",
    "internal_links_out",
    "v1_feature_dependency",
    "v2_equivalent",
    "decision",
    "redirect_status",
    "redirect_target",
    "canonical_target",
    "launch_requirement",
    "risk",
    "notes",
  ];
  const sorted = [...rows.values()].sort((a, b) =>
    String(a.current_path).localeCompare(String(b.current_path)),
  );
  writeFileSync(
    "docs/task-012-v1-v2-migration-matrix.csv",
    [
      headers.map(csv).join(","),
      ...sorted.map((r) => headers.map((h) => csv(r[h])).join(",")),
    ].join("\n") + "\n",
  );
  const paths = sitemapUrls.map((x) => new URL(x).pathname);
  const pick = (test: (p: string) => boolean, n: number) =>
    paths.filter(test).slice(0, n);
  const goldenPaths = [
    "/",
    ...pick((p) => p.startsWith("/companies/"), 5),
    ...pick((p) => /^\/local-movers\/[^/]+$/.test(p), 3),
    ...pick(
      (p) => p.startsWith("/local-movers/") && p.split("/").length > 3,
      5,
    ),
    ...pick((p) => p.startsWith("/moving-to/") && p.split("/").length > 3, 3),
    ...pick((p) => p.startsWith("/resources/guides/"), 3),
    "/moving-calculator",
    "/my-move",
    "/compare",
    "/verify-dot",
    "/auto-transport",
    "/companies/pods",
    "/about",
    "/about/how-we-score-movers",
  ]
    .filter((x, i, a) => a.indexOf(x) === i)
    .slice(0, 40);
  const golden = [];
  for (const path of goldenPaths) {
    const r = await fetchText(HOST + path);
    golden.push({
      path,
      status: r.status,
      location: r.location,
      responseMs: r.elapsedMs,
      ...metadata(r.text),
      routeFamily: family(path),
      expectedMigration: decision(path, family(path), true),
    });
  }
  writeFileSync(
    "docs/task-012-production-seo-golden-baseline.json",
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        canonicalHost: HOST,
        mainSitemap: {
          status: main.status,
          count: extractLocs(main.text).length,
        },
        localSitemap: {
          status: localIndex.status,
          children: childUrls.length,
          count: localUrls.length,
        },
        repositoryRouteFiles: routeFiles("app").length,
        totalUniqueRoutes: sorted.length,
        golden,
      },
      null,
      2,
    ) + "\n",
  );
  writeFileSync(
    "lib/move-v2/migration/seo-golden-set.json",
    JSON.stringify(
      golden.map((row) => ({
        path: row.path,
        expectedStatus: row.status,
        expectedCanonical: row.canonical,
        expectedIndexable: !String(row.robots ?? "").includes("noindex"),
        expectedRouteFamily: row.routeFamily,
        expectedStructuredDataTypes: row.schemas,
        expectedMigrationTarget: row.path,
      })),
      null,
      2,
    ) + "\n",
  );
  console.log(
    JSON.stringify(
      {
        main: extractLocs(main.text).length,
        localChildren: childUrls.length,
        local: localUrls.length,
        repositoryRoutes: routeFiles("app").length,
        total: sorted.length,
        golden: golden.length,
        goldenFailures: golden.filter((x) => x.status !== 200).length,
      },
      null,
      2,
    ),
  );
}
void main();
