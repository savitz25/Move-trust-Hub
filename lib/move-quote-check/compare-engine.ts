/**
 * Phase 4 — deterministic side-by-side comparison of two estimates.
 * No winner verdict. Normalize assumptions, not just sticker price.
 */

import type { QuoteCheckAnswers } from '@/lib/move-quote-check/types';
import {
  compareInventoryToEstimate,
  type InventoryComparison,
  type UserInventoryTotals,
} from '@/lib/move-quote-check/inventory-compare';

function parseMoney(raw: string): number | null {
  const n = Number(String(raw).replace(/[,$]/g, '').trim());
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function parsePositive(raw: string): number | null {
  const n = Number(String(raw).replace(/[,$]/g, '').trim());
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function labelEstimateType(t: QuoteCheckAnswers['estimateType']): string {
  switch (t) {
    case 'binding':
      return 'Binding';
    case 'non_binding':
      return 'Non-binding';
    case 'binding_nte':
      return 'Binding NTE / similar';
    default:
      return 'Unclear';
  }
}

function labelRole(r: QuoteCheckAnswers['companyRole']): string {
  if (r === 'carrier') return 'Carrier / mover';
  if (r === 'broker') return 'Broker';
  return 'Unclear';
}

function labelYesNo(v: QuoteCheckAnswers['packingIncluded']): string {
  if (v === 'yes') return 'Yes';
  if (v === 'no') return 'No';
  return 'Unclear';
}

function labelValuation(v: QuoteCheckAnswers['valuation']): string {
  if (v === 'released') return 'Released value';
  if (v === 'full_value') return 'Full Value Protection';
  return 'Unclear';
}

function labelSurvey(v: QuoteCheckAnswers['surveyBasis']): string {
  switch (v) {
    case 'in_home':
      return 'In-home';
    case 'virtual':
      return 'Virtual/video';
    case 'phone_only':
      return 'Phone only / none';
    default:
      return 'Unclear';
  }
}

function labelInventory(v: QuoteCheckAnswers['inventoryDetail']): string {
  switch (v) {
    case 'itemized':
      return 'Itemized';
    case 'room_or_volume':
      return 'Room/volume only';
    case 'little_or_none':
      return 'Little/none';
    default:
      return 'Unclear';
  }
}

function labelDeposit(a: QuoteCheckAnswers): string {
  const d = parseMoney(a.depositAmount);
  const method =
    a.paymentMethod === 'not_sure' ? '' : ` · ${a.paymentMethod.replace('_', ' ')}`;
  if (d == null) return a.depositTiming === 'none' ? 'None' : `Timing: ${a.depositTiming}${method}`;
  return `$${d.toLocaleString('en-US')}${method}`;
}

export type CompareMatrixRow = {
  id: string;
  label: string;
  valueA: string;
  valueB: string;
  differs: boolean;
  material: boolean;
  note?: string;
};

export type CompareCallout = {
  id: string;
  severity: 'info' | 'review' | 'high';
  title: string;
  body: string;
};

export type EstimateSideSummary = {
  label: 'A' | 'B';
  companyName: string;
  usdot: string;
  price: number | null;
  cuFt: number | null;
  weightLbs: number | null;
  estimateType: string;
  educational110: number | null;
};

export type TwoEstimateCompareReport = {
  sideA: EstimateSideSummary;
  sideB: EstimateSideSummary;
  price: {
    priceA: number | null;
    priceB: number | null;
    absDiff: number | null;
    lowerSticker: 'A' | 'B' | 'tie' | 'unknown';
    snapshotLine: string;
  };
  callouts: CompareCallout[];
  matrix: CompareMatrixRow[];
  inventory: {
    againstA: InventoryComparison | null;
    againstB: InventoryComparison | null;
    fartherFromInventory: 'A' | 'B' | 'tie' | 'unknown';
    inventoryLine: string | null;
  };
  questions: string[];
  educationalDisclaimer: string;
};

function educational110(answers: QuoteCheckAnswers): number | null {
  if (answers.estimateType !== 'non_binding') return null;
  const t = parseMoney(answers.estimatedTotal);
  if (t == null || t <= 0) return null;
  return Math.round(t * 1.1 * 100) / 100;
}

function sideSummary(label: 'A' | 'B', a: QuoteCheckAnswers): EstimateSideSummary {
  return {
    label,
    companyName: a.companyName.trim() || `Estimate ${label}`,
    usdot: a.usdot.replace(/\D/g, ''),
    price: parseMoney(a.estimatedTotal),
    cuFt: parsePositive(a.estimateCubicFeet),
    weightLbs: parsePositive(a.estimateWeightLbs),
    estimateType: labelEstimateType(a.estimateType),
    educational110: educational110(a),
  };
}

/**
 * Compare two completed estimate questionnaires.
 */
export function compareTwoEstimates(
  a: QuoteCheckAnswers,
  b: QuoteCheckAnswers,
  opts?: {
    userInventory?: UserInventoryTotals | null;
    useUserInventory?: boolean;
  }
): TwoEstimateCompareReport {
  const sideA = sideSummary('A', a);
  const sideB = sideSummary('B', b);
  const priceA = sideA.price;
  const priceB = sideB.price;

  let lowerSticker: 'A' | 'B' | 'tie' | 'unknown' = 'unknown';
  let absDiff: number | null = null;
  if (priceA != null && priceB != null) {
    absDiff = Math.round(Math.abs(priceA - priceB) * 100) / 100;
    if (priceA < priceB) lowerSticker = 'A';
    else if (priceB < priceA) lowerSticker = 'B';
    else lowerSticker = 'tie';
  }

  const snapshotLine =
    priceA != null && priceB != null
      ? lowerSticker === 'tie'
        ? `Sticker prices are the same ($${priceA.toLocaleString('en-US')}). Assumptions may still differ.`
        : `Estimate ${lowerSticker} is lower on sticker price by $${absDiff!.toLocaleString('en-US')} (A $${priceA.toLocaleString('en-US')} vs B $${priceB.toLocaleString('en-US')}). Sticker price alone is not the full comparison.`
      : 'Enter totals for both estimates to compare sticker prices.';

  const matrix: CompareMatrixRow[] = [];
  const push = (
    id: string,
    label: string,
    valueA: string,
    valueB: string,
    opts?: { material?: boolean; note?: string; differs?: boolean }
  ) => {
    const differs = opts?.differs ?? valueA !== valueB;
    matrix.push({
      id,
      label,
      valueA,
      valueB,
      differs,
      material: Boolean(opts?.material && differs),
      note: opts?.note,
    });
  };

  push('company', 'Company name', sideA.companyName, sideB.companyName);
  push(
    'usdot',
    'USDOT',
    sideA.usdot || 'Not provided',
    sideB.usdot || 'Not provided',
    {
      material: !sideA.usdot || !sideB.usdot,
      note:
        !sideA.usdot || !sideB.usdot
          ? 'Missing USDOT on one or both estimates reduces identity clarity.'
          : undefined,
    }
  );
  push('role', 'Company type', labelRole(a.companyRole), labelRole(b.companyRole), {
    material: a.companyRole !== b.companyRole && (a.companyRole === 'broker' || b.companyRole === 'broker'),
  });
  push('est_type', 'Estimate type', labelEstimateType(a.estimateType), labelEstimateType(b.estimateType), {
    material: a.estimateType !== b.estimateType,
    note: 'Binding vs non-binding changes price exposure if services or weight change.',
  });
  push(
    'price',
    'Sticker total',
    priceA != null ? `$${priceA.toLocaleString('en-US')}` : '—',
    priceB != null ? `$${priceB.toLocaleString('en-US')}` : '—',
    { material: false }
  );
  push(
    'cuft',
    'Cubic feet',
    sideA.cuFt != null ? `~${Math.round(sideA.cuFt).toLocaleString('en-US')}` : '—',
    sideB.cuFt != null ? `~${Math.round(sideB.cuFt).toLocaleString('en-US')}` : '—',
    {
      material: Boolean(
        sideA.cuFt != null &&
          sideB.cuFt != null &&
          (Math.abs(sideA.cuFt - sideB.cuFt) >= 80 ||
            Math.abs(sideA.cuFt - sideB.cuFt) / Math.max(sideA.cuFt, sideB.cuFt, 1) >= 0.12)
      ),
    }
  );
  push(
    'weight',
    'Weight (lbs)',
    sideA.weightLbs != null ? `~${sideA.weightLbs.toLocaleString('en-US')}` : '—',
    sideB.weightLbs != null ? `~${sideB.weightLbs.toLocaleString('en-US')}` : '—',
    {
      material: Boolean(
        sideA.weightLbs != null &&
          sideB.weightLbs != null &&
          (Math.abs(sideA.weightLbs - sideB.weightLbs) >= 600 ||
            Math.abs(sideA.weightLbs - sideB.weightLbs) /
              Math.max(sideA.weightLbs, sideB.weightLbs, 1) >=
              0.15)
      ),
    }
  );
  push('survey', 'Survey basis', labelSurvey(a.surveyBasis), labelSurvey(b.surveyBasis));
  push(
    'inv_detail',
    'Inventory detail',
    labelInventory(a.inventoryDetail),
    labelInventory(b.inventoryDetail),
    {
      material:
        a.inventoryDetail !== b.inventoryDetail &&
        (a.inventoryDetail === 'little_or_none' || b.inventoryDetail === 'little_or_none'),
    }
  );
  push(
    'packing',
    'Packing included',
    labelYesNo(a.packingIncluded),
    labelYesNo(b.packingIncluded),
    {
      material:
        a.packingIncluded !== b.packingIncluded &&
        (a.packingIncluded === 'yes' || b.packingIncluded === 'yes'),
    }
  );
  push('shuttle', 'Shuttle mentioned', labelYesNo(a.shuttleMentioned), labelYesNo(b.shuttleMentioned));
  push('storage', 'Storage mentioned', labelYesNo(a.storageMentioned), labelYesNo(b.storageMentioned));
  push('valuation', 'Valuation', labelValuation(a.valuation), labelValuation(b.valuation), {
    material: a.valuation !== b.valuation,
  });
  push('deposit', 'Deposit / payment', labelDeposit(a), labelDeposit(b));

  const callouts: CompareCallout[] = [];

  if (lowerSticker === 'A' || lowerSticker === 'B') {
    const cheaper = lowerSticker;
    const other = cheaper === 'A' ? 'B' : 'A';
    const cheapCu = cheaper === 'A' ? sideA.cuFt : sideB.cuFt;
    const otherCu = other === 'A' ? sideA.cuFt : sideB.cuFt;
    if (
      cheapCu != null &&
      otherCu != null &&
      cheapCu < otherCu &&
      (otherCu - cheapCu >= 80 || (otherCu - cheapCu) / Math.max(otherCu, 1) >= 0.12)
    ) {
      callouts.push({
        id: 'cheaper-less-volume',
        severity: 'review',
        title: `Estimate ${cheaper} is lower on sticker price but assumes less volume`,
        body: `Estimate ${cheaper} (~${Math.round(cheapCu).toLocaleString('en-US')} cu. ft.) is cheaper on sticker price than ${other} (~${Math.round(otherCu).toLocaleString('en-US')} cu. ft.). Compare inventories item-by-item — a lower price can reflect a smaller assumed shipment, not a better offer.`,
      });
    } else {
      callouts.push({
        id: 'sticker-only',
        severity: 'info',
        title: `Estimate ${cheaper} is lower on sticker price only`,
        body: snapshotLine + ' Check estimate type, packing, valuation, and volume before treating it as better value.',
      });
    }
  }

  if (a.estimateType !== b.estimateType) {
    callouts.push({
      id: 'type-diff',
      severity: 'review',
      title: 'Estimate types differ',
      body: `A is “${labelEstimateType(a.estimateType)}”; B is “${labelEstimateType(b.estimateType)}”. Binding vs non-binding vs NTE changes what happens if weight or services change.`,
    });
  }

  if (a.estimateType === 'non_binding' && sideA.educational110 != null) {
    callouts.push({
      id: 'a-110',
      severity: 'info',
      title: 'Estimate A non-binding — educational delivery context',
      body: `Educational 110% figure for A’s entered total: $${sideA.educational110.toLocaleString('en-US')}. Confirm written delivery collection terms. Not legal advice.`,
    });
  }
  if (b.estimateType === 'non_binding' && sideB.educational110 != null) {
    callouts.push({
      id: 'b-110',
      severity: 'info',
      title: 'Estimate B non-binding — educational delivery context',
      body: `Educational 110% figure for B’s entered total: $${sideB.educational110.toLocaleString('en-US')}. Confirm written delivery collection terms. Not legal advice.`,
    });
  }

  const aHasDot = Boolean(sideA.usdot);
  const bHasDot = Boolean(sideB.usdot);
  if (aHasDot !== bHasDot) {
    callouts.push({
      id: 'usdot-one-side',
      severity: 'review',
      title: 'Only one estimate identifies a USDOT number',
      body: aHasDot
        ? 'Estimate A includes a USDOT; B does not. Verify the A number and request B’s USDOT before comparing identity apples-to-apples.'
        : 'Estimate B includes a USDOT; A does not. Verify the B number and request A’s USDOT before comparing identity apples-to-apples.',
    });
  }

  if (
    (a.packingIncluded === 'yes' && b.packingIncluded !== 'yes') ||
    (b.packingIncluded === 'yes' && a.packingIncluded !== 'yes')
  ) {
    const withPack = a.packingIncluded === 'yes' ? 'A' : 'B';
    const without = withPack === 'A' ? 'B' : 'A';
    callouts.push({
      id: 'packing-diff',
      severity: 'review',
      title: `Estimate ${withPack} includes packing; ${without} does not (or is unclear)`,
      body:
        priceA != null && priceB != null
          ? `Estimate ${withPack} may cost more because packing is included. Sticker price is not comparable without normalizing packing and materials.`
          : 'Normalize packing scope before treating either total as the better deal.',
    });
  }

  if (a.valuation !== b.valuation && (a.valuation !== 'unclear' || b.valuation !== 'unclear')) {
    callouts.push({
      id: 'val-diff',
      severity: 'review',
      title: 'Valuation options differ',
      body: `A: ${labelValuation(a.valuation)}. B: ${labelValuation(b.valuation)}. Released value vs Full Value Protection changes loss/damage exposure — not a quality score of the mover.`,
    });
  }

  // Inventory baseline
  const useInv = opts?.useUserInventory !== false;
  const userInv = opts?.userInventory ?? null;
  const againstA =
    useInv && userInv
      ? compareInventoryToEstimate({
          estimateCubicFeet: a.estimateCubicFeet,
          estimateWeightLbs: a.estimateWeightLbs,
          userInventory: userInv,
          useUserInventory: true,
        })
      : null;
  const againstB =
    useInv && userInv
      ? compareInventoryToEstimate({
          estimateCubicFeet: b.estimateCubicFeet,
          estimateWeightLbs: b.estimateWeightLbs,
          userInventory: userInv,
          useUserInventory: true,
        })
      : null;

  let fartherFromInventory: 'A' | 'B' | 'tie' | 'unknown' = 'unknown';
  let inventoryLine: string | null = null;
  if (againstA && againstB && userInv) {
    const score = (c: InventoryComparison): number | null => {
      if (c.status === 'unavailable') return null;
      if (c.pctDiffCuFt != null) return c.pctDiffCuFt;
      if (c.pctDiffLbs != null) return c.pctDiffLbs;
      return null;
    };
    const sa = score(againstA);
    const sb = score(againstB);
    if (sa != null && sb != null) {
      if (sa > sb + 2) fartherFromInventory = 'A';
      else if (sb > sa + 2) fartherFromInventory = 'B';
      else fartherFromInventory = 'tie';
      inventoryLine = `Your inventory baseline is ~${Math.round(userInv.cubicFeet).toLocaleString('en-US')} cu. ft. Estimate A is ${againstA.status.replace(/_/g, ' ')}; B is ${againstB.status.replace(/_/g, ' ')}.${
        fartherFromInventory === 'A' || fartherFromInventory === 'B'
          ? ` Estimate ${fartherFromInventory} is farther from your inventory baseline.`
          : ' Both are similarly close (or similarly far) from your inventory.'
      }`;
      if (fartherFromInventory === 'A' || fartherFromInventory === 'B') {
        callouts.push({
          id: 'inv-farther',
          severity: 'review',
          title: `Estimate ${fartherFromInventory} is farther from your MoveTrustHub inventory`,
          body: inventoryLine,
        });
      }
    } else {
      inventoryLine =
        'Enter cubic feet or weight on both estimates to compare each against your saved inventory.';
    }
  } else if (userInv) {
    inventoryLine = `Inventory on this device: ~${Math.round(userInv.cubicFeet).toLocaleString('en-US')} cu. ft. Add estimate volume/weight on A and B to compare each against this baseline.`;
  } else {
    inventoryLine = null;
  }

  if (callouts.length === 0) {
    callouts.push({
      id: 'generic',
      severity: 'info',
      title: 'Review the matrix for assumption gaps',
      body: 'Sticker price is only one row. Check estimate type, volume, packing, valuation, and USDOT before deciding which document better matches the move you need.',
    });
  }

  const questions = buildCompareQuestions(a, b, matrix, fartherFromInventory);

  return {
    sideA,
    sideB,
    price: {
      priceA,
      priceB,
      absDiff,
      lowerSticker,
      snapshotLine,
    },
    callouts,
    matrix,
    inventory: {
      againstA,
      againstB,
      fartherFromInventory,
      inventoryLine,
    },
    questions,
    educationalDisclaimer:
      'Research comparison only — not an endorsement, not legal advice, and not a SAFE/SCAM verdict. We surface differences; you decide what to verify.',
  };
}

function buildCompareQuestions(
  a: QuoteCheckAnswers,
  b: QuoteCheckAnswers,
  matrix: CompareMatrixRow[],
  farther: 'A' | 'B' | 'tie' | 'unknown'
): string[] {
  const qs: string[] = [];
  const byId = Object.fromEntries(matrix.map((r) => [r.id, r]));

  if (byId.est_type?.differs) {
    qs.push(
      'Can each company confirm in writing whether their estimate is binding, non-binding, or not-to-exceed, and point to where that appears on the document?'
    );
  }
  if (byId.cuft?.material || byId.weight?.material) {
    qs.push(
      'Please share the inventory list and cubic-foot (or weight) basis used for each estimate so I can reconcile the volume difference between A and B.'
    );
  }
  if (byId.packing?.material || byId.packing?.differs) {
    qs.push(
      'Is full packing included in the total, and which materials/labor are extra, on each estimate?'
    );
  }
  if (byId.usdot?.differs || byId.usdot?.material) {
    qs.push(
      'What is the USDOT (and transporting carrier, if you are a broker) that will appear on my bill of lading for each estimate?'
    );
  }
  if (byId.valuation?.differs) {
    qs.push(
      'Which valuation option is selected on each estimate (Released Value vs Full Value Protection), and what deductible applies?'
    );
  }
  if (byId.deposit?.differs) {
    qs.push(
      'What is the deposit amount, payment method, refund policy, and when is the balance due on each estimate?'
    );
  }
  if (farther === 'A' || farther === 'B') {
    qs.push(
      `Estimate ${farther} looks farther from my own inventory totals — can you confirm every major item is listed and the survey basis used?`
    );
  }
  if (qs.length < 5) {
    qs.push('Which accessorials (stairs, long carry, shuttle, storage) are included vs extra on each estimate?');
  }
  if (qs.length < 6) {
    qs.push('Will I receive a bill of lading before loading, and who is the named motor carrier on it for each option?');
  }
  return qs.slice(0, 8);
}

/** Session key to hand Estimate A from single-quote report into compare flow */
export const COMPARE_HANDOFF_KEY = 'mth-quote-check-compare-a-v1';

export function saveCompareHandoffA(answers: QuoteCheckAnswers): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(COMPARE_HANDOFF_KEY, JSON.stringify(answers));
  } catch {
    /* ignore */
  }
}

export function loadCompareHandoffA(): QuoteCheckAnswers | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(COMPARE_HANDOFF_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuoteCheckAnswers;
  } catch {
    return null;
  }
}

export function clearCompareHandoffA(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(COMPARE_HANDOFF_KEY);
  } catch {
    /* ignore */
  }
}
