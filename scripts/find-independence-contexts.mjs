const h = await (
  await fetch('https://www.movetrusthub.com/', { headers: { 'cache-control': 'no-cache' } })
).text();
const visible = h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
const re = /.{0,60}(?:no lead fees|no paid placements|Independent directory|INDEPENDENT &amp; VERIFIED).{0,60}/gi;
let m;
let i = 0;
while ((m = re.exec(visible)) && i < 25) {
  console.log(++i, m[0].replace(/\s+/g, ' ').trim());
}