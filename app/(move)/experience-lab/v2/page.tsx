import { notFound } from 'next/navigation';
import { ShieldCheck, MapPin, Phone, Scale } from 'lucide-react';
import { moveV2Flags } from '@/lib/move-v2/flags';
import { SYNTHETIC_PROVIDERS } from '@/lib/move-v2/synthetic-providers';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'MoveTrustHub V2 Experience Lab', robots: { index: false, follow: false } };

export default function MoveV2ExperienceLab() {
  const flags = moveV2Flags();
  if (process.env.VERCEL_ENV === 'production' || !flags.enabled) notFound();
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-10 rounded-3xl bg-slate-950 p-7 text-white md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[.18em] text-teal-300">Synthetic data · Preview only</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">Research your move without being sold a mover.</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">MoveTrustHub separates regulatory evidence, business information, and company-published claims. We cite. You decide.</p>
        </div>
        <div className="mb-7 grid gap-4 md:grid-cols-3">
          {[['Authority first', Scale], ['Move-aware eligibility', MapPin], ['No lead distribution', ShieldCheck]].map(([label, Icon]) => {
            const BadgeIcon = Icon as typeof Scale;
            return <div key={label as string} className="rounded-2xl border border-slate-200 bg-white p-5"><BadgeIcon className="mb-3 h-5 w-5 text-teal-700"/><p className="font-semibold">{label as string}</p></div>;
          })}
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {SYNTHETIC_PROVIDERS.map((provider) => (
            <article key={provider.providerId} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-teal-700">Synthetic provider</p><h2 className="mt-1 text-2xl font-semibold">{provider.displayName}</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{provider.classification.replaceAll('_', ' ')}</span></div>
              {provider.dbaName && <p className="mt-3 text-sm text-slate-600">Legal entity: {provider.legalName}</p>}
              <div className="mt-5 border-t border-slate-100 pt-4"><p className="text-sm font-semibold">Evidence</p>{provider.evidence.map((item) => <p key={item} className="mt-2 flex gap-2 text-sm text-slate-600"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700"/>{item}</p>)}</div>
              {provider.contacts.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{provider.contacts.map((contact) => <span key={contact} className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs text-blue-900"><Phone className="h-3 w-3"/>{contact}</span>)}</div>}
              {provider.enrichment && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-950">Google match: {provider.enrichment}</p>}
              {provider.stateAuthority && <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950"><span className="font-semibold">State authority:</span> {provider.stateAuthority}</div>}
              {provider.geography && <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-950"><span className="font-semibold">Geography:</span> {provider.geography}</div>}
              <p className="mt-5 text-xs text-slate-400">Provider ID: {provider.providerId}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
