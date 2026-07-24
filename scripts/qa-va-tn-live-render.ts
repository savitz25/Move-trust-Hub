/**
 * Live HTML QA for VA + TN Tier-1 render wiring.
 * Run after deploy: npx tsx scripts/qa-va-tn-live-render.ts
 * Optional: LIVE_BASE=https://www.movetrusthub.com
 */
const BASE = (process.env.LIVE_BASE ?? 'https://www.movetrusthub.com').replace(/\/$/, '');

type Check = {
  url: string;
  pass: boolean;
  h1: string;
  narrativeH1: boolean;
  notMoversServing: boolean;
  majorCorridors: boolean;
  regulator: boolean;
  regulatorLabel: string;
  notes: string[];
};

const TARGETS: Array<{ path: string; regulator: RegExp; regulatorLabel: string }> = [
  // VA
  { path: '/local-movers/virginia/fairfax', regulator: /Licensing in Virginia|DMV Motor Carrier|Certificate of Fitness|household goods carrier/i, regulatorLabel: 'VA DMV' },
  { path: '/local-movers/virginia/arlington', regulator: /Licensing in Virginia|DMV Motor Carrier|Certificate of Fitness/i, regulatorLabel: 'VA DMV' },
  { path: '/local-movers/virginia/richmond', regulator: /Licensing in Virginia|DMV Motor Carrier|Certificate of Fitness/i, regulatorLabel: 'VA DMV' },
  { path: '/local-movers/virginia/virginia-beach', regulator: /Licensing in Virginia|DMV Motor Carrier|Certificate of Fitness/i, regulatorLabel: 'VA DMV' },
  // TN
  { path: '/local-movers/tennessee/davidson', regulator: /Licensing in Tennessee|TDOR|Department of Revenue/i, regulatorLabel: 'TN TDOR' },
  { path: '/local-movers/tennessee/shelby', regulator: /Licensing in Tennessee|TDOR|Department of Revenue/i, regulatorLabel: 'TN TDOR' },
  { path: '/local-movers/tennessee/sevier', regulator: /Licensing in Tennessee|TDOR|Department of Revenue/i, regulatorLabel: 'TN TDOR' },
  { path: '/local-movers/tennessee/montgomery', regulator: /Licensing in Tennessee|TDOR|Department of Revenue/i, regulatorLabel: 'TN TDOR' },
  // Regression
  { path: '/local-movers/north-carolina/mecklenburg', regulator: /Licensing in North Carolina|NCUC|Utilities Commission/i, regulatorLabel: 'NC NCUC' },
];

function extractH1(html: string): string {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return '';
  return m[1]
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

async function checkOne(t: (typeof TARGETS)[0]): Promise<Check> {
  const url = `${BASE}${t.path}`;
  const notes: string[] = [];
  let html = '';
  try {
    const res = await fetch(url, {
      headers: { 'cache-control': 'no-cache', pragma: 'no-cache' },
      // Prefer origin over edge where possible
    });
    html = await res.text();
    if (!res.ok) notes.push(`HTTP ${res.status}`);
  } catch (e) {
    return {
      url,
      pass: false,
      h1: '',
      narrativeH1: false,
      notMoversServing: false,
      majorCorridors: false,
      regulator: false,
      regulatorLabel: t.regulatorLabel,
      notes: [`fetch failed: ${e instanceof Error ? e.message : String(e)}`],
    };
  }

  const h1 = extractH1(html);
  const narrativeH1 = /^Moving in\b/i.test(h1);
  const notMoversServing = !/^Movers Serving\b/i.test(h1);
  const majorCorridors =
    /Major corridors/i.test(html) &&
    /\b(I-\d|US-\d|VA-\d|TN-\d|US-\d{1,3}|Briley|Ellington|Turnpike|Pkwy|Expressway)\b/i.test(
      html
    );
  const regulator = t.regulator.test(html);

  if (t.path.includes('/richmond')) {
    if (/Richmond County(?!\s*\(Warsaw\))/i.test(h1) && !/Richmond City/i.test(h1)) {
      notes.push('H1 still looks like Richmond County (Northern Neck), not Richmond City');
    }
    if (/Richmond City|Moving in Richmond City/i.test(h1)) {
      notes.push('Richmond City labeling OK');
    }
  }

  // Bleed checks
  if (!t.path.includes('new-jersey') && /NJ public-mover credentials/i.test(html)) {
    notes.push('NJ public-mover bleed');
  }
  if (t.path.includes('virginia') && /NCUC|FDACS|TxDMV|TDOR/i.test(html) && !/FMCSA/i.test(html)) {
    // soft
  }
  if (t.path.includes('virginia') && /NCUC|FDACS|TxDMV|BHGS/i.test(html)) {
    notes.push('possible foreign regulator bleed on VA page');
  }
  if (t.path.includes('tennessee') && /NCUC|FDACS|TxDMV|BHGS|Certificate of Fitness/i.test(html)) {
    notes.push('possible foreign regulator bleed on TN page');
  }

  const pass =
    narrativeH1 &&
    notMoversServing &&
    majorCorridors &&
    regulator &&
    !notes.some((n) => /bleed|HTTP|failed|Northern Neck/i.test(n));

  return {
    url,
    pass,
    h1,
    narrativeH1,
    notMoversServing,
    majorCorridors,
    regulator,
    regulatorLabel: t.regulatorLabel,
    notes,
  };
}

async function main() {
  const rows: Check[] = [];
  for (const t of TARGETS) {
    rows.push(await checkOne(t));
  }

  const report = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    passCount: rows.filter((r) => r.pass).length,
    failCount: rows.filter((r) => !r.pass).length,
    rows,
  };

  console.log(JSON.stringify(report, null, 2));
  if (report.failCount > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
