const fs = require("fs");
const path = require("path");
function getCounties(s) {
  const t = fs.readFileSync(path.join("data/generated/states", s + ".ts"), "utf8");
  // extract objects with slug and name
  const items = [];
  const re = /\{\s*"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(t))) items.push({ slug: m[1], name: m[2] });
  return items;
}
for (const s of ["colorado","virginia","michigan","new-jersey","tennessee"]) {
  const items = getCounties(s);
  const slugs = items.map(i => i.slug);
  const unique = new Set(slugs);
  console.log(s + ": total=" + items.length + " unique_slugs=" + unique.size);
  if (items.length !== unique.size) {
    const counts = {};
    for (const sl of slugs) counts[sl] = (counts[sl]||0)+1;
    console.log("  DUPLICATES:", Object.entries(counts).filter(([,c])=>c>1));
  }
  // write full list
  fs.writeFileSync("scripts/tmp-wave3-"+s+"-counties.json", JSON.stringify(items, null, 2));
}
console.log("done");
