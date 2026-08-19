import { readFileSync, writeFileSync } from "node:fs";

const HOST =
  process.env.MOVE_CUTOVER_BASE_URL ?? "https://www.movetrusthub.com";

async function main() {
  const golden = JSON.parse(
    readFileSync("lib/move-v2/migration/seo-golden-set.json", "utf8"),
  ) as Array<{ path: string }>;
  const links = new Set<string>();
  const sourceResults = [];
  for (const row of golden) {
    const r = await fetch(HOST + row.path, {
      signal: AbortSignal.timeout(30_000),
    });
    const html = await r.text();
    for (const m of html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["']/gi)) {
      try {
        const u = new URL(m[1], HOST);
        if (u.origin === new URL(HOST).origin) links.add(u.pathname + u.search);
      } catch {
        // Malformed hrefs are handled by the browser migration suite.
      }
    }
    sourceResults.push({ path: row.path, status: r.status, links: links.size });
  }
  const targets = [...links].slice(0, 300);
  const checks: Array<{
    path: string;
    status: number;
    location: string | null;
    error?: string;
  }> = [];
  for (let i = 0; i < targets.length; i += 12) {
    const batch = await Promise.all(
      targets.slice(i, i + 12).map(async (path) => {
        try {
          const r = await fetch(HOST + path, {
            redirect: "manual",
            signal: AbortSignal.timeout(20_000),
          });
          return {
            path,
            status: r.status,
            location: r.headers.get("location"),
          };
        } catch (error) {
          return {
            path,
            status: 0,
            location: null,
            error: error instanceof Error ? error.name : "Error",
          };
        }
      }),
    );
    checks.push(...batch);
  }
  const broken = checks.filter(
    (x) => x.status === 0 || x.status === 404 || x.status >= 500,
  );
  const redirects = checks.filter((x) => x.status >= 300 && x.status < 400);
  const forbidden = targets.filter((x) =>
    /experience-lab|localhost|vercel\.app|\/internal\//.test(x),
  );
  const out = {
    capturedAt: new Date().toISOString(),
    baseUrl: HOST,
    goldenSources: golden.length,
    uniqueInternalLinks: links.size,
    checked: checks.length,
    broken,
    redirects,
    forbidden,
    sourceResults,
  };
  writeFileSync(
    "docs/task-012-internal-link-audit.json",
    JSON.stringify(out, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      {
        goldenSources: golden.length,
        uniqueInternalLinks: links.size,
        checked: checks.length,
        broken: broken.length,
        redirects: redirects.length,
        forbidden: forbidden.length,
      },
      null,
      2,
    ),
  );
}
void main();
