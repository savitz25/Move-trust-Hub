/**
 * Production smoke for Ask Trust Hub network (four apex domains).
 *
 * Run after network deploys:
 *   npm run smoke:network
 *
 * Exits non-zero on any failure. Does not require auth.
 */

type CheckResult = {
  name: string;
  ok: boolean;
  detail: string;
};

const UA = 'AskTrustHub-network-smoke/1.0 (+https://www.asktrusthub.com)';

async function fetchRaw(
  url: string,
  init?: RequestInit
): Promise<{ status: number; headers: Headers; body: string; finalUrl: string }> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'user-agent': UA,
      accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
      ...(init?.headers ?? {}),
    },
    redirect: init?.redirect ?? 'manual',
  });
  const body = init?.method === 'HEAD' ? '' : await res.text();
  return {
    status: res.status,
    headers: res.headers,
    body,
    finalUrl: res.url,
  };
}

function locationHost(headers: Headers): string {
  const loc = headers.get('location') ?? '';
  try {
    return new URL(loc, 'https://www.asktrusthub.com').hostname.replace(/^www\./, '');
  } catch {
    return loc;
  }
}

async function checkStatus(
  name: string,
  url: string,
  expect: number | number[]
): Promise<CheckResult> {
  const allowed = Array.isArray(expect) ? expect : [expect];
  try {
    const { status, headers } = await fetchRaw(url, { method: 'HEAD', redirect: 'manual' });
    // Some hosts ignore HEAD; fall back to GET without body parse if needed
    let finalStatus = status;
    if (status === 405 || status === 501) {
      const g = await fetchRaw(url, { method: 'GET', redirect: 'manual' });
      finalStatus = g.status;
    }
    const ok = allowed.includes(finalStatus);
    const loc = headers.get('location');
    return {
      name,
      ok,
      detail: ok
        ? `HTTP ${finalStatus}${loc ? ` → ${loc}` : ''}`
        : `expected ${allowed.join('|')}, got ${finalStatus}${loc ? ` → ${loc}` : ''}`,
    };
  } catch (e) {
    return { name, ok: false, detail: e instanceof Error ? e.message : String(e) };
  }
}

async function checkBody(
  name: string,
  url: string,
  opts: {
    status?: number;
    mustInclude?: RegExp[];
    mustNotInclude?: RegExp[];
  }
): Promise<CheckResult> {
  try {
    const { status, body } = await fetchRaw(url, { method: 'GET', redirect: 'follow' });
    const expectStatus = opts.status ?? 200;
    if (status !== expectStatus) {
      return { name, ok: false, detail: `expected HTTP ${expectStatus}, got ${status}` };
    }
    for (const re of opts.mustInclude ?? []) {
      if (!re.test(body)) {
        return { name, ok: false, detail: `body missing /${re.source}/i` };
      }
    }
    for (const re of opts.mustNotInclude ?? []) {
      if (re.test(body)) {
        return { name, ok: false, detail: `body matched forbidden /${re.source}/i` };
      }
    }
    return { name, ok: true, detail: `HTTP ${status}; body checks ok` };
  } catch (e) {
    return { name, ok: false, detail: e instanceof Error ? e.message : String(e) };
  }
}

async function checkRedirectToHost(
  name: string,
  url: string,
  hostIncludes: string
): Promise<CheckResult> {
  try {
    const { status, headers } = await fetchRaw(url, { method: 'GET', redirect: 'manual' });
    const okStatus = status === 301 || status === 302 || status === 307 || status === 308;
    const host = locationHost(headers);
    const okHost = host.includes(hostIncludes.replace(/^www\./, ''));
    const ok = okStatus && okHost;
    return {
      name,
      ok,
      detail: ok
        ? `HTTP ${status} → ${headers.get('location')}`
        : `expected 301/308 to *${hostIncludes}*, got ${status} → ${headers.get('location') ?? '(none)'}`,
    };
  } catch (e) {
    return { name, ok: false, detail: e instanceof Error ? e.message : String(e) };
  }
}

async function main() {
  console.log('Ask Trust Hub — production network smoke\n');

  const results: CheckResult[] = [];

  // Ask
  results.push(
    await checkBody('Ask /', 'https://www.asktrusthub.com/', {
      mustInclude: [/preparing for/i, /Live/i],
    })
  );
  results.push(await checkStatus('Ask /methodology', 'https://www.asktrusthub.com/methodology', 200));
  results.push(await checkStatus('Ask /network', 'https://www.asktrusthub.com/network', 200));
  results.push(
    await checkStatus('Ask /how-we-make-money', 'https://www.asktrusthub.com/how-we-make-money', 200)
  );
  results.push(
    await checkRedirectToHost(
      'Ask /moving-to → Move',
      'https://www.asktrusthub.com/moving-to',
      'movetrusthub.com'
    )
  );

  // Move
  results.push(
    await checkStatus(
      'Move methodology',
      'https://www.movetrusthub.com/about/how-we-score-movers',
      200
    )
  );
  results.push(
    await checkRedirectToHost(
      'Move /lender → LTH',
      'https://www.movetrusthub.com/lender',
      'lendertrusthub.com'
    )
  );
  results.push(
    await checkRedirectToHost(
      'Move /insurance → ITH',
      'https://www.movetrusthub.com/insurance',
      'insurancetrusthub.com'
    )
  );

  // Insurance
  results.push(
    await checkStatus('Insurance /methodology', 'https://www.insurancetrusthub.com/methodology', 200)
  );
  results.push(
    await checkBody('Insurance / (no quote CTAs)', 'https://www.insurancetrusthub.com/', {
      mustNotInclude: [/free quotes/i, /request quotes/i],
    })
  );

  // Lender
  results.push(
    await checkStatus('Lender /methodology', 'https://www.lendertrusthub.com/methodology', 200)
  );
  results.push(
    await checkBody('Lender / (network + no 3,142 flex)', 'https://www.lendertrusthub.com/', {
      mustInclude: [/Ask Trust Hub|methodology/i],
      mustNotInclude: [/\b3,142\b/],
    })
  );

  // Table
  const pad = Math.max(...results.map((r) => r.name.length), 8);
  console.log(`${'CHECK'.padEnd(pad)}  STATUS  DETAIL`);
  console.log(`${'-'.repeat(pad)}  ------  ------`);
  for (const r of results) {
    console.log(`${r.name.padEnd(pad)}  ${r.ok ? 'PASS' : 'FAIL'}    ${r.detail}`);
  }

  const failed = results.filter((r) => !r.ok);
  console.log('');
  console.log(
    failed.length === 0
      ? `All ${results.length} checks passed.`
      : `${failed.length}/${results.length} checks FAILED.`
  );

  if (failed.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
