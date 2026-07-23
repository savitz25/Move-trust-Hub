const fs=require("fs");
const t=fs.readFileSync("data/generated/states/virginia.ts","utf8");
const items=[];
const re=/\{\s*"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g;
let m; while((m=re.exec(t))) items.push({slug:m[1],name:m[2]});
for (const d of ["bedford","fairfax","franklin","richmond","roanoke"]) {
  console.log(d+":", JSON.stringify(items.filter(i=>i.slug===d)));
}
