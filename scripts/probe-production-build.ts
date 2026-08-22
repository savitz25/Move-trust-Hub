/** Probe www.movetrusthub.com data-build-id. Google: 0. */
async function main() {
  const url = 'https://www.movetrusthub.com/companies/allied-van-lines';
  const res = await fetch(url, {
    headers: { 'user-agent': 'MoveTrustHub-FL010-deploy-gate/1.0', 'cache-control': 'no-cache' },
  });
  const html = await res.text();
  const build = (html.match(/data-build-id="([^"]+)"/) ?? [])[1] ?? null;
  const expected = process.argv[2] ?? null;
  console.log(
    JSON.stringify(
      {
        status: res.status,
        build,
        xvercel: res.headers.get('x-vercel-id'),
        cache: res.headers.get('x-vercel-cache'),
        expected,
        match: expected ? Boolean(build && (build === expected || expected.startsWith(build) || build.startsWith(expected.slice(0, 8)))) : null,
      },
      null,
      2
    )
  );
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
