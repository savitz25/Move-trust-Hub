const fs = require("fs");
const path = require("path");
const geoDir = "lib/local-movers/geography";
const states = {
  colorado: "colorado-overrides.ts",
  virginia: "virginia-overrides.ts",
  michigan: "michigan-overrides.ts",
  "new-jersey": "new-jersey.ts",
  tennessee: "tennessee-overrides.ts",
};
// Also check data/generated
for (const s of ["colorado","virginia","michigan","new-jersey","tennessee"]) {
  const p = path.join("data/generated/states", s + ".ts");
  const t = fs.readFileSync(p, "utf8");
  // Extract slugs - look for common patterns
  const m1 = [...t.matchAll(/slug:\s*"([^"]+)"/g)].map(x => x[1]);
  const m2 = [...t.matchAll(/"slug":\s*"([^"]+)"/g)].map(x => x[1]);
  const slugs = m1.length ? m1 : m2;
  // filter out state slug if present
  const counties = slugs.filter(x => x !== s && !x.match(/^[a-z]{2}$/));
  console.log("=== " + s + " count=" + counties.length + " ===");
  console.log(counties.join(", "));
  console.log("");
}
