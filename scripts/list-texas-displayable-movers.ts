import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';
import { texasCountyMoverAssignments } from '../data/texas-county-assignments';
import { metroMoverPools } from '../data/local-movers-seed';

const all = Object.values(fullMoversCatalog).filter(isCuratedMover);

const txRe =
  /texas|\btx\b|houston|dallas|fort worth|austin|san antonio|el paso|lubbock|amarillo|midland|odessa|corpus|mcallen|brownsville|waco|beaumont|tyler|plano|arlington|irving|garland|frisco|mckinney|round rock|killeen|college station|galveston|laredo|abilene|wichita falls|longview|lufkin|temple|bryan|denison|harlingen|sugar land|the woodlands|conroe|pearland|league city|baytown|missouri city|odessa|midland|katy|cypress|spring, tx|humble|pasadena|tomball|league city|friendswood|denton|lewisville|allen|richardson|carrollton|grapevine|euless|bedford|hurst|mansfield|cedar park|pflugerville|leander|new braunfels|san marcos|georgetown|kyle|boerne|schertz|universal city|mission|edinburg|pharr|weslaco|harlingen|brownsville|port arthur|orange, tx|nacogdoches|marshall|texarkana|sherman|denison|paris, tx|victoria|del rio|eagle pass|san angelo|big spring|odessa/;

const tx = all.filter((m) => {
  const blob = [m.id, m.city, m.name, m.shortDescription || '', (m as { website?: string }).website || '']
    .join(' ')
    .toLowerCase();
  return (
    txRe.test(blob) ||
    /houston|dallas|austin|san-antonio|el-paso|fort-worth|lubbock|amarillo|corpus|mcallen|brownsville|waco|beaumont|tyler|laredo|midland|odessa|texas|denison|killeen|college-station/.test(
      m.id
    )
  );
});

console.log('curated TX-ish', tx.length);
console.log(
  tx
    .map((m) => `${m.id} | ${m.city} | ${m.name}`)
    .sort()
    .join('\n')
);

const assignedIds = new Set<string>();
for (const a of texasCountyMoverAssignments) {
  for (const id of a.moverIds) assignedIds.add(id);
}
const assignedOk = [...assignedIds].filter(
  (id) => fullMoversCatalog[id] && isCuratedMover(fullMoversCatalog[id])
);
const assignedBad = [...assignedIds].filter(
  (id) => !fullMoversCatalog[id] || !isCuratedMover(fullMoversCatalog[id])
);
console.log(
  `\nunique assigned ${assignedIds.size} displayable ${assignedOk.length} not ${assignedBad.length}`
);
console.log('displayable assigned:\n' + assignedOk.sort().join('\n'));

// All TX-related pool ids
const poolIds = new Set<string>();
for (const [k, pool] of Object.entries(metroMoverPools)) {
  if (/tx|texas|houston|dallas|austin|dfw|san-antonio|el-paso|permian|panhandle|rio-grande|east-tx/.test(k)) {
    for (const id of pool.moverIds || []) poolIds.add(id);
  }
}
const poolOk = [...poolIds].filter(
  (id) => fullMoversCatalog[id] && isCuratedMover(fullMoversCatalog[id])
);
console.log(`\npool displayable ${poolOk.length}:\n` + poolOk.sort().join('\n'));
