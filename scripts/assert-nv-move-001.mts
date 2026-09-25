import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { assertNevadaMoveSnapshot } from '../lib/nevada-intelligence/snapshot';
import { NV_MOVE_PUBLIC_FINGERPRINT } from '../lib/nevada-intelligence/publication';
import { lookupNevadaCpcn, searchNevadaNtaName } from '../lib/nevada-intelligence/lookup';
import { normalizedPublishedStatePath } from '../lib/seo/published-state-path';

execFileSync(process.platform === 'win32' ? 'python' : 'python3', ['-X', 'utf8', 'scripts/nevada/build_snapshot.py', '--check'], { stdio: 'inherit' });
const snap = assertNevadaMoveSnapshot();
if (snap.fingerprint !== NV_MOVE_PUBLIC_FINGERPRINT) throw new Error('publication fingerprint');

const roster = JSON.parse(readFileSync('lib/nevada-intelligence/accepted-roster.json', 'utf8')).rows as Array<Record<string, unknown>>;
if (roster.length !== snap.current_hhg_roster.NV_NTA_HHG_ROWS) throw new Error('roster rows');
if (roster.some((row) => Object.keys(row).some((key) => /usdot|\bmc\b|email|phone|fax|address/i.test(key)))) throw new Error('federal or contact field');
if (JSON.stringify(roster).match(/\b\d{3}-\d{3}-\d{4}\b/)) throw new Error('phone number in roster');
if (roster.some((row) => row.ntaActiveListStatus !== null && row.ntaActiveListStatus !== 'Active')) throw new Error('status invented');
if (roster.some((row) => !String(row.classificationEvidence).startsWith('NTA_'))) throw new Error('classification needs NTA evidence');
if (roster.some((row) => row.tariffUrl && !String(row.tariffUrl).startsWith('https://nta.nv.gov/'))) throw new Error('tariff host');
if (new Set(roster.map((row) => String(row.cpcn).split('.')[0])).size !== snap.current_hhg_roster.NV_NTA_HHG_DISTINCT_CPCN) {
  throw new Error('distinct CPCN');
}

const page = readFileSync('components/intelligence/NevadaMoveIntelligence.tsx', 'utf8');
const sitemap = readFileSync('app/sitemap.ts', 'utf8');
if ((sitemap.match(/^\s*'\/nevada',\s*$/gm) || []).length !== 1) throw new Error('sitemap route list has /nevada once');
if (sitemap.includes("'/nevada/")) throw new Error('local route');
if (!page.includes('is not a USDOT or MC number')) throw new Error('state vs federal identity');
if (!page.includes('A tariff is not a quote')) throw new Error('tariff is not a quote');
if (!page.includes('does not have jurisdiction over interstate service')) throw new Error('interstate jurisdiction');
if (!page.includes('No combined NTA plus FMCSA mover count')) throw new Error('combined count');
if (!page.includes('An\n          application is not a granted CPCN') && !page.includes('application is not a granted CPCN')) throw new Error('application semantics');
if (!/No Las Vegas, Reno, Henderson, Carson City, county or city moving-intelligence page/.test(page)) throw new Error('no local pages');
if (/Trust Score:|best mover|top mover|recommended mover|aggregateRating/i.test(page)) throw new Error('ranking language');
if (normalizedPublishedStatePath('/Nevada') !== '/nevada') throw new Error('case');
if (normalizedPublishedStatePath('/NEVADA') !== '/nevada') throw new Error('caps');
if (normalizedPublishedStatePath('/Nevada/las-vegas') !== null) throw new Error('local path');

if (lookupNevadaCpcn('3251.3').hits[0]?.carrierName !== 'Ace World Wide Moving and Storage Co Inc') throw new Error('CPCN 3251.3');
if (lookupNevadaCpcn('3380').hits[0]?.cpcn !== '3380.1') throw new Error('bare certificate number matches revision suffix');
if (lookupNevadaCpcn('7304').hits.length) throw new Error('towing certificate is not household goods');
if (lookupNevadaCpcn('USDOT 3244649').hits.length) throw new Error('usdot is not a CPCN');
if (searchNevadaNtaName('Nevada movers').hits.length) throw new Error('category words are not a name');
console.log('assert:nv-move-001 pass', snap.fingerprint.slice(0, 12));
