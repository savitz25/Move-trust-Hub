import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { assertMinnesotaMoveSnapshot } from '../lib/minnesota-intelligence/snapshot';
import { MN_MOVE_PUBLIC_FINGERPRINT } from '../lib/minnesota-intelligence/publication';
import { normalizedPublishedStatePath } from '../lib/seo/published-state-path';

execFileSync(process.platform === 'win32' ? 'python' : 'python3', ['-X', 'utf8', 'scripts/minnesota/build_snapshot.py', '--check'], { stdio: 'inherit' });
const snap = assertMinnesotaMoveSnapshot();
if (snap.fingerprint !== MN_MOVE_PUBLIC_FINGERPRINT) throw new Error('publication fingerprint');
const sources = JSON.parse(readFileSync('data/minnesota/mn-move-001/sources.json', 'utf8'));
if (sources.roster_search.MN_HHG_PERMIT_ROSTER !== 'NOT_ACQUIRED') throw new Error('roster search result');
if (sources.mndot_carrier_search.rows_collected !== 0) throw new Error('no carrier rows collected from the search');
if (JSON.stringify(sources).match(/\(?\b\d{3}\)?[-.\s]\d{3}-\d{4}\b/g)?.some((p: string) => !/651-366-3661|651-291-6150|651-350-2000/.test(p))) {
  throw new Error('unexpected phone number in sources');
}

const page = readFileSync('components/intelligence/MinnesotaMoveIntelligence.tsx', 'utf8');
const sitemap = readFileSync('app/sitemap.ts', 'utf8');
if ((sitemap.match(/^\s*'\/minnesota',\s*$/gm) || []).length !== 1) throw new Error('sitemap route list has /minnesota once');
if (sitemap.includes("'/minnesota/")) throw new Error('local route');
if (!page.includes('is not a USDOT or MC')) throw new Error('state vs federal identity');
if (!page.includes('A tariff is not a quote')) throw new Error('tariff is not a quote');
if (!page.includes('A shipment record, a tariff and a quote are three different things')) throw new Error('record vs tariff vs quote');
if (!page.includes('No combined Minnesota permit plus FMCSA mover count')) throw new Error('combined count');
if (!page.includes('missing is not zero')) throw new Error('missing is not zero');
if (!/No Minneapolis, St\. Paul, Rochester, Duluth, Bloomington, county or city moving-intelligence page/.test(page)) throw new Error('no local pages');
if (/Trust Score:|best mover|top mover|recommended mover|aggregateRating/i.test(page)) throw new Error('ranking language');
if (normalizedPublishedStatePath('/Minnesota') !== '/minnesota') throw new Error('case');
if (normalizedPublishedStatePath('/MINNESOTA') !== '/minnesota') throw new Error('caps');
if (normalizedPublishedStatePath('/Minnesota/minneapolis') !== null) throw new Error('local path');
console.log('assert:mn-move-001 pass', snap.fingerprint.slice(0, 12));
