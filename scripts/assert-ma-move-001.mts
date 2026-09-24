import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { assertMassachusettsMoveSnapshot } from '../lib/massachusetts-intelligence/snapshot';
import { lookupMassachusettsDpuCertificate, searchMassachusettsDpuName } from '../lib/massachusetts-intelligence/lookup';
import { normalizedPublishedStatePath } from '../lib/seo/published-state-path';

const snap = assertMassachusettsMoveSnapshot();
const csv = readFileSync('data/massachusetts/ma-move-001/dpu-moving-company-tariff-list.csv');
if (createHash('sha256').update(csv).digest('hex') !== snap.source_csv_sha256) throw new Error('source csv hash');
const roster = JSON.parse(readFileSync('lib/massachusetts-intelligence/accepted-roster.json', 'utf8')).rows as Array<Record<string, unknown>>;
if (roster.length !== snap.current_hhg_roster.MA_DPU_HHG_LISTING_ROWS) throw new Error('roster rows');
if (roster.some((row) => Object.keys(row).some((key) => /usdot|mc|dot|email|phone/i.test(key)))) throw new Error('federal or contact field');
if (roster.some((row) => row.status !== 'LISTED_ON_DPU_REGULATED_HHG_MOVER_LIST')) throw new Error('status semantics');
if (roster.some((row) => row.tariffUrl && !String(row.tariffUrl).startsWith('https://www.mass.gov/'))) throw new Error('tariff host');

const page = readFileSync('components/intelligence/MassachusettsMoveIntelligence.tsx', 'utf8');
const sitemap = readFileSync('app/sitemap.ts', 'utf8');
if (!sitemap.includes("'/massachusetts'")) throw new Error('sitemap');
if (sitemap.includes("'/massachusetts/")) throw new Error('local route');
if (!page.includes('not a USDOT or MC number')) throw new Error('distinction');
if (!page.includes('not a quote')) throw new Error('tariff is not a quote');
if (!page.includes('No Boston, county or city moving-intelligence page')) throw new Error('boston page disclaimer');
if (normalizedPublishedStatePath('/Massachusetts') !== '/massachusetts') throw new Error('case');
if (normalizedPublishedStatePath('/Massachusetts/boston') !== null) throw new Error('local path');

if (lookupMassachusettsDpuCertificate('32011').hits.length !== 1) throw new Error('certificate 32011');
if (lookupMassachusettsDpuCertificate('24hg59').hits[0]?.companyName !== '5 SONS MOVING LLC') throw new Error('certificate 24HG59');
if (lookupMassachusettsDpuCertificate('1').hits.length) throw new Error('unknown certificate');
if (lookupMassachusettsDpuCertificate('USDOT 3244649').hits.length) throw new Error('usdot is not a certificate');
if (searchMassachusettsDpuName('massachusetts movers').hits.length) throw new Error('category words are not a name');
if (snap.current_hhg_roster.MA_DPU_HHG_EXACT_USDOT_JOINS !== 0) throw new Error('joins');
console.log('assert:ma-move-001 pass', snap.fingerprint.slice(0, 12));
