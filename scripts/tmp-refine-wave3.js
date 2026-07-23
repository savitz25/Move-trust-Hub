const fs = require("fs");
const r = JSON.parse(fs.readFileSync("scripts/tmp-wave3-regions.json","utf8"));
// Promote VA rest to Northern Neck / Middle Peninsula
if (r.virginia["rest-va"]) {
  r.virginia["northern-neck"] = r.virginia["rest-va"];
  delete r.virginia["rest-va"];
}
// Move MI mason into northern-lower and drop rest-mi if only mason
if (r.michigan["rest-mi"]) {
  r.michigan["northern-lower"].push(...r.michigan["rest-mi"]);
  r.michigan["northern-lower"] = [...new Set(r.michigan["northern-lower"])];
  delete r.michigan["rest-mi"];
}
// TN rest-tn - check if exists and rename
if (r.tennessee["rest-tn"] && r.tennessee["rest-tn"].length) {
  // leave as rest or fold - check
  console.log("TN rest:", r.tennessee["rest-tn"]);
} else {
  delete r.tennessee["rest-tn"];
}

function validate(name, regions, file) {
  const t = fs.readFileSync("data/generated/states/"+file+".ts","utf8");
  const all = [...new Set([...t.matchAll(/"slug":\s*"([^"]+)"/g)].map(m=>m[1]))].filter(s=>s!==file);
  // also stateSlug lines - better use same as before
  const items=[]; const re=/\{\s*"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g; let m; while((m=re.exec(t))) items.push(m[1]);
  const allSlugs=[...new Set(items)];
  const seen=new Set(); let dups=0;
  for (const arr of Object.values(regions)) for (const s of arr) { if(seen.has(s)) dups++; seen.add(s); }
  const orphans=allSlugs.filter(s=>!seen.has(s));
  const unknown=[...seen].filter(s=>!allSlugs.includes(s));
  console.log(name, seen.size+"/"+allSlugs.length, "dups",dups,"orphans",orphans.length,"unknown",unknown.length);
  if (orphans.length) console.log(" orphans",orphans);
  if (unknown.length) console.log(" unknown",unknown);
  if (dups||orphans.length||unknown.length) throw new Error("fail "+name);
}
validate("co", r.colorado, "colorado");
validate("va", r.virginia, "virginia");
validate("mi", r.michigan, "michigan");
validate("nj", r["new-jersey"], "new-jersey");
validate("tn", r.tennessee, "tennessee");
fs.writeFileSync("scripts/tmp-wave3-regions.json", JSON.stringify(r,null,2));
console.log("regions refined OK");
console.log("keys", Object.fromEntries(Object.entries(r).map(([k,v])=>[k,Object.keys(v)])));
