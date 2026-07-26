'use client';

import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { formatCurrency } from '@/lib/lender/utils';

type Snapshot = {
  homePrice: number;
  downPct: number;
  rate: number;
  term: number;
  loan: number;
  piti: number;
  loanType: string;
};

function readSnapshot(): Snapshot | null {
  try {
    const raw = localStorage.getItem('lth-calc-payment-piti');
    if (!raw) return null;
    const s = JSON.parse(raw) as Record<string, number | string>;
    const homePrice = Number(s.homePrice) || 0;
    const downPct = Number(s.downPct) || 0;
    const rate = Number(s.rate) || 0;
    const term = Number(s.term) || 30;
    if (homePrice <= 0) return null;
    const loan = homePrice * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    const pi =
      monthlyRate === 0
        ? loan / n
        : (loan * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const tax = (Number(s.taxAmount) || homePrice * 0.011) / 12;
    const ins = (Number(s.insurance) || 1800) / 12;
    const hoa = Number(s.hoa) || 0;
    const ltv = homePrice > 0 ? (loan / homePrice) * 100 : 0;
    const pmi = ltv > 80 ? (loan * 0.0055) / 12 : 0;
    const piti = pi + tax + ins + hoa + pmi;
    const loanType = ltv > 95 ? 'FHA' : loan > 766550 ? 'Jumbo' : 'Conventional';
    return { homePrice, downPct, rate, term, loan, piti, loanType };
  } catch {
    return null;
  }
}

/** Lightweight “Your Numbers” card from the flagship PITI localStorage session. */
export function SessionSnapshot() {
  const [snap, setSnap] = useState<Snapshot | null>(null);

  useEffect(() => {
    const refresh = () => setSnap(readSnapshot());
    refresh();
    const id = window.setInterval(refresh, 1500);
    window.addEventListener('storage', refresh);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  if (!snap) {
    return (
      <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
          <Bookmark className="h-4 w-4 text-[#2563EB]" aria-hidden />
          Your Numbers
        </p>
        <p className="mt-2 text-sm text-[#6B7280]">
          Adjust the payment calculator above — your scenario is saved in this browser for this
          session.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-white p-5 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
        <Bookmark className="h-4 w-4 text-[#2563EB]" aria-hidden />
        Your Numbers
        <span className="ml-auto rounded-full bg-[#DBEAFE] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1E40AF]">
          Saved in browser
        </span>
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-6">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">Price</dt>
          <dd className="font-bold tabular-nums text-[#111827]">{formatCurrency(snap.homePrice)}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">Down</dt>
          <dd className="font-bold tabular-nums text-[#111827]">{snap.downPct}%</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">Loan</dt>
          <dd className="font-bold tabular-nums text-[#111827]">{formatCurrency(snap.loan)}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">Rate</dt>
          <dd className="font-bold tabular-nums text-[#111827]">{snap.rate}%</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Est. payment
          </dt>
          <dd className="font-bold tabular-nums text-[#2563EB]">{formatCurrency(snap.piti)}/mo</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Loan type
          </dt>
          <dd className="font-bold text-[#111827]">{snap.loanType}</dd>
        </div>
      </dl>
    </div>
  );
}
