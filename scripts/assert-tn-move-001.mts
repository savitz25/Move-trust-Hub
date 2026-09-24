import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { assertTennesseeMoveSnapshot } from '../lib/tennessee-intelligence/snapshot';
import { TN_MOVE_PUBLIC_FINGERPRINT } from '../lib/tennessee-intelligence/publication';
import { normalizedPublishedStatePath } from '../lib/seo/published-state-path';

execFileSync(process.platform === 'win32' ? 'python' : 'python3', ['-X', 'utf8', 'scripts/tennessee/build_snapshot.py', '--check'], { stdio: 'inherit' });
const snap = assertTennesseeMoveSnapshot();
if (snap.fingerprint !== TN_MOVE_PUBLIC_FINGERPRINT) throw new Error('publication fingerprint');
const sources = JSON.parse(readFileSync('data/tennessee/tn-move-001/sources.json', 'utf8'));
const pdf = readFileSync('data/tennessee/tn-move-001/raw/rules-1340-06-01.20260309.pdf');
if (createHash('sha256').update(pdf).digest('hex') !== snap.source_rule_pdf_sha256) throw new Error('rule PDF provenance');
if (sources.roster_search.TN_INTRASTATE_AUTHORITY_BULK !== 'NOT_ACQUIRED') throw new Error('roster search result');

const page = readFileSync('components/intelligence/TennesseeMoveIntelligence.tsx', 'utf8');
const sitemap = readFileSync('app/sitemap.ts', 'utf8');
if ((sitemap.match(/^\s*'\/tennessee',\s*$/gm) || []).length !== 1) throw new Error('sitemap route list has /tennessee once');
if (sitemap.includes("'/tennessee/")) throw new Error('local route');
if (!page.includes('not a USDOT or MC number')) throw new Error('state vs federal identity');
if (!page.includes('Form H')) throw new Error('Form H');
if (!page.includes('are not in the current text')) throw new Error('repealed rules are not presented as current');
if (!page.includes('A tariff is not a quote')) throw new Error('tariff is not a quote');
if (!/No Nashville, Memphis, Knoxville, Chattanooga, county or city moving-intelligence page/.test(page)) throw new Error('no local pages');
if (/Trust Score:|best mover|top mover|recommended mover/i.test(page)) throw new Error('ranking language');
if (normalizedPublishedStatePath('/Tennessee') !== '/tennessee') throw new Error('case');
if (normalizedPublishedStatePath('/TENNESSEE') !== '/tennessee') throw new Error('caps');
if (normalizedPublishedStatePath('/Tennessee/nashville') !== null) throw new Error('local path');
console.log('assert:tn-move-001 pass', snap.fingerprint.slice(0, 12));
