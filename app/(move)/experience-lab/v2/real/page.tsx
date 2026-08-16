import { notFound } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { moveV2Flags } from '@/lib/move-v2/flags';
import samples from '@/lib/move-v2/fmcsa/real-qa-sample.json';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'MoveTrustHub V2 FMCSA QA', robots: { index: false, follow: false } };

export default function RealFmcsaQaLab() {
  const flags = moveV2Flags();
  if (process.env.VERCEL_ENV === 'production' || !flags.enabled || !flags.realProviderData) notFound();
  return <main className="min-h-screen bg-slate-950 px-5 py-12 text-white"><div className="mx-auto max-w-5xl">
    <p className="text-sm font-bold uppercase tracking-widest text-teal-300">Real FMCSA data · bounded QA · Preview only</p>
    <h1 className="mt-3 text-4xl font-semibold">National spine classification sample</h1>
    <p className="mt-4 max-w-3xl text-slate-300">Exact official identities from the 2026-08-16 release. This engineering surface is noindex and never renders in Production.</p>
    <div className="mt-9 grid gap-5 md:grid-cols-2">{samples.map((provider) => <article key={provider.providerId} className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <p className="text-xs font-bold uppercase text-teal-300">{provider.classification.replaceAll('_',' ')}</p><h2 className="mt-2 text-2xl font-semibold">{provider.displayName}</h2>
      {provider.dbaName && <p className="mt-2 text-sm text-slate-400">Legal entity: {provider.legalName}</p>}
      <p className="mt-4 text-sm">USDOT {provider.usdot} · {provider.city}, {provider.state}</p><p className="mt-2 text-sm text-slate-300">Power units: {provider.powerUnits ?? 'Unknown'} · Drivers: {provider.drivers ?? 'Unknown'}</p>
      <div className="mt-4 flex gap-2 text-xs text-slate-300"><ShieldCheck className="h-4 w-4 text-teal-300"/><span>FMCSA release {provider.sourceRelease}</span></div>
    </article>)}</div>
  </div></main>;
}
