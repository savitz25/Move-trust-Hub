#!/usr/bin/env node
/**
 * MOVE-SEO-PATTERN-002 HTML check for /colorado (read-only GET, JavaScript disabled).
 * Usage: node scripts/check-move-seo-pattern-002.mjs <baseUrl> [canonicalOrigin]
 *
 * /colorado must show one visible H1 and substantive Colorado Intelligence in
 * the initial HTML: no "Loading Colorado" placeholder and no pending streamed
 * Suspense chunk. Canonical stays self and robots stays "index, follow".
 * Unknown /colorado/* routes must be a real noindex 404, not a 200 or a copy
 * of the homepage.
 */
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const canonicalOrigin = (process.argv[3] || "https://www.movetrusthub.com").replace(/\/$/, "");
const UA = "TrustHubOps-MOVESEO002/1.0 (read-only check)";
const H1 = "Colorado Moving & Household-Goods Intelligence";

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const text = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<template[\s\S]*?<\/template>/gi, " ")
      .replace(/<div hidden[^>]*>[\s\S]*?<\/div>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  ).replace(/\s+/g, " ").trim();
const get = async (path) => {
  const started = Date.now();
  const response = await fetch(base + path, { headers: { "user-agent": UA }, redirect: "manual" });
  const html = await response.text();
  return { response, html, ms: Date.now() - started };
};
const meta = (html, name) => (html.match(new RegExp(`<meta[^>]+name="${name}"[^>]+content="([^"]+)"`)) || [])[1] || null;
const h1s = (html) => [...html.replace(/<div hidden[^>]*>[\s\S]*?<\/div>/gi, "").matchAll(/<h1[\s\S]*?<\/h1>/g)].map((m) => text(m[0]));
const title = (html) => text((html.match(/<title[^>]*>[\s\S]*?<\/title>/) || [""])[0]);

let failed = 0;
const results = [];
const record = (path, extra, checks) => {
  const ok = Object.values(checks).every(Boolean);
  if (!ok) failed++;
  results.push({ path, ok, ...extra, checks });
};

const home = await get("/");
const homeH1 = h1s(home.html)[0] || null;
const homeTitle = title(home.html);

for (const { path, canonicalPath, minWords } of [
  { path: "/colorado", canonicalPath: "/colorado", minWords: 800 },
  { path: "/colorado?permit=HHG-00513", canonicalPath: "/colorado", minWords: 800 },
]) {
  const { response, html, ms } = await get(path);
  const visible = text(html);
  const words = visible ? visible.split(" ").length : 0;
  const pageH1s = h1s(html);
  const canonical = (html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/) || [])[1] || null;
  const robots = meta(html, "robots");
  const xRobots = response.headers.get("x-robots-tag");
  record(path, { status: response.status, ms, bytes: html.length, visibleWords: words, h1s: pageH1s, title: title(html), canonical, robots, xRobots }, {
    status200: response.status === 200,
    singleH1: pageH1s.length === 1,
    h1Exact: pageH1s[0] === H1,
    noLoadingPlaceholder: !/Loading Colorado/.test(html),
    noPendingStreamChunks: !/<div hidden id="S:\d+"/.test(html) && !/<!--\$\?-->/.test(html),
    substantive: words >= minWords && /Colorado/.test(visible) && /PUC|Public Utilities Commission/.test(visible),
    canonicalSelf: canonical === canonicalOrigin + canonicalPath,
    robotsIndexFollow: robots === "index, follow" && !xRobots,
    notHomepageCopy: pageH1s[0] !== homeH1,
  });
}

for (const path of ["/colorado/not-a-real-page", "/colorado/denver", "/colorado/movers/xyz"]) {
  const { response, html, ms } = await get(path);
  const pageH1s = h1s(html);
  const robots = meta(html, "robots") || "";
  record(path, { status: response.status, ms, h1s: pageH1s, title: title(html), robots }, {
    real404: response.status === 404,
    noindex: /noindex/.test(robots) || /noindex/.test(response.headers.get("x-robots-tag") || ""),
    notHomepageCopy: pageH1s[0] !== homeH1 && title(html) !== homeTitle,
    notColoradoCopy: !pageH1s.includes(H1),
  });
}

console.log(JSON.stringify({ homepage: { h1: homeH1, title: homeTitle }, results }, null, 2));
if (failed) {
  console.error(`MOVE-SEO-PATTERN-002: ${failed} check(s) FAILED`);
  process.exit(1);
}
console.log("MOVE-SEO-PATTERN-002: /colorado initial HTML and unknown-route 404s PASS");
