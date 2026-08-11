/**
 * Phase 3 — inventory vs estimate volume/weight comparison.
 * Deterministic thresholds. No fraud accusations.
 */

import { estimateWeight, LBS_PER_CU_FT } from '@/lib/moving-calculator/estimates';
import type {
  InventoryComparisonResult,
  InventoryComparisonStatus,
  QuoteCheckFinding,
} from '@/lib/move-quote-check/types';

/** Moderate: ≥12% or ≥80 cu.ft absolute (when both sides have cu.ft) */
export const VOLUME_MODERATE_PCT = 0.12;
export const VOLUME_MODERATE_ABS_CUFT = 80;
/** Material: ≥25% or ≥200 cu.ft absolute */
export const VOLUME_MATERIAL_PCT = 0.25;
export const VOLUME_MATERIAL_ABS_CUFT = 200;

/** Weight thresholds (lbs) — slightly looser because weight is derived on our side */
export const WEIGHT_MODERATE_PCT = 0.15;
export const WEIGHT_MODERATE_ABS_LBS = 600;
export const WEIGHT_MATERIAL_PCT = 0.28;
export const WEIGHT_MATERIAL_ABS_LBS = 1500;

export type UserInventoryTotals = {
  cubicFeet: number;
  weightLbs: number;
  itemCount: number;
  source: 'calculator_local';
};

export type InventoryComparison = InventoryComparisonResult;

const CALCULATOR_KEY = 'move-calculator-inventory';

/**
 * Read Smart Move Estimator / calculator local inventory totals (guest-friendly).
 */
export function loadUserInventoryTotals(): UserInventoryTotals | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CALCULATOR_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      state?: { inventory?: { volume?: number; quantity?: number }[] };
    };
    const inventory = parsed.state?.inventory ?? [];
    if (!Array.isArray(inventory) || inventory.length === 0) return null;
    const cubicFeet = inventory.reduce(
      (s, i) => s + (Number(i.volume) || 0) * (Number(i.quantity) || 0),
      0
    );
    if (cubicFeet <= 0) return null;
    const itemCount = inventory.reduce((s, i) => s + (Number(i.quantity) || 0), 0);
    return {
      cubicFeet: Math.round(cubicFeet * 10) / 10,
      weightLbs: estimateWeight(cubicFeet),
      itemCount,
      source: 'calculator_local',
    };
  } catch {
    return null;
  }
}

function parsePositiveNumber(raw: string): number | null {
  const n = Number(String(raw).replace(/[,$]/g, '').trim());
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function classifyDiff(
  abs: number,
  pct: number,
  moderateAbs: number,
  moderatePct: number,
  materialAbs: number,
  materialPct: number
): InventoryComparisonStatus {
  if (abs >= materialAbs || pct >= materialPct) return 'material_mismatch';
  if (abs >= moderateAbs || pct >= moderatePct) return 'moderate_mismatch';
  return 'aligned';
}

/**
 * Compare mover estimate volume/weight to MoveTrustHub inventory totals.
 */
export function compareInventoryToEstimate(input: {
  estimateCubicFeet: string;
  estimateWeightLbs: string;
  userInventory: UserInventoryTotals | null;
  useUserInventory: boolean;
}): InventoryComparison {
  const moverCuFt = parsePositiveNumber(input.estimateCubicFeet);
  const moverWeightEntered = parsePositiveNumber(input.estimateWeightLbs);
  const user = input.useUserInventory ? input.userInventory : null;

  if (!user) {
    return {
      status: 'unavailable',
      basis: 'none',
      moverCuFt,
      moverWeightLbs: moverWeightEntered,
      userCuFt: null,
      userWeightLbs: null,
      userItemCount: null,
      absDiffCuFt: null,
      pctDiffCuFt: null,
      absDiffLbs: null,
      pctDiffLbs: null,
      headline: 'No MoveTrustHub inventory on this device yet',
      body: 'Build an inventory in the Moving Calculator to compare your volume and weight against the mover’s estimate figures.',
      prompt: 'Open the Moving Calculator to create or update your inventory, then re-run Quote Check.',
    };
  }

  if (moverCuFt == null && moverWeightEntered == null) {
    return {
      status: 'unavailable',
      basis: 'none',
      moverCuFt: null,
      moverWeightLbs: null,
      userCuFt: user.cubicFeet,
      userWeightLbs: user.weightLbs,
      userItemCount: user.itemCount,
      absDiffCuFt: null,
      pctDiffCuFt: null,
      absDiffLbs: null,
      pctDiffLbs: null,
      headline: 'Estimate volume/weight not entered',
      body: `Your saved inventory is about ${Math.round(user.cubicFeet).toLocaleString('en-US')} cu. ft. (~${user.weightLbs.toLocaleString('en-US')} lbs at ${LBS_PER_CU_FT} lb/cu ft). Add the mover’s cubic feet or weight from the estimate to compare.`,
      prompt: 'Enter estimate cubic feet and/or weight on the questionnaire, then regenerate the report.',
    };
  }

  // Prefer volume comparison when both sides have cu.ft
  if (moverCuFt != null) {
    const abs = Math.abs(moverCuFt - user.cubicFeet);
    const denom = Math.max(moverCuFt, user.cubicFeet, 1);
    const pct = abs / denom;
    const status = classifyDiff(
      abs,
      pct,
      VOLUME_MODERATE_ABS_CUFT,
      VOLUME_MODERATE_PCT,
      VOLUME_MATERIAL_ABS_CUFT,
      VOLUME_MATERIAL_PCT
    );
    const moverLower = moverCuFt < user.cubicFeet;
    return {
      status,
      basis: 'volume',
      moverCuFt,
      moverWeightLbs: moverWeightEntered,
      userCuFt: user.cubicFeet,
      userWeightLbs: user.weightLbs,
      userItemCount: user.itemCount,
      absDiffCuFt: Math.round(abs * 10) / 10,
      pctDiffCuFt: Math.round(pct * 1000) / 10,
      absDiffLbs: null,
      pctDiffLbs: null,
      headline:
        status === 'aligned'
          ? 'Volume figures are relatively close'
          : status === 'moderate_mismatch'
            ? 'Moderate volume difference — review recommended'
            : 'Material volume difference — review before signing',
      body:
        status === 'aligned'
          ? `Mover estimate: ~${Math.round(moverCuFt).toLocaleString('en-US')} cu. ft. · Your inventory: ~${Math.round(user.cubicFeet).toLocaleString('en-US')} cu. ft. (difference ~${Math.round(abs).toLocaleString('en-US')} cu. ft., ~${Math.round(pct * 100)}%). Still confirm major items are listed.`
          : moverLower
            ? `Mover estimate: ~${Math.round(moverCuFt).toLocaleString('en-US')} cu. ft. · Your MoveTrustHub inventory: ~${Math.round(user.cubicFeet).toLocaleString('en-US')} cu. ft. · Difference: ~${Math.round(abs).toLocaleString('en-US')} cu. ft. (~${Math.round(pct * 100)}%). Your estimate appears to include less volume than your saved inventory. Review the mover’s inventory item-by-item before signing — this is a factual discrepancy, not a fraud verdict.`
            : `Mover estimate: ~${Math.round(moverCuFt).toLocaleString('en-US')} cu. ft. · Your inventory: ~${Math.round(user.cubicFeet).toLocaleString('en-US')} cu. ft. · Difference: ~${Math.round(abs).toLocaleString('en-US')} cu. ft. (~${Math.round(pct * 100)}%). The estimate is higher than your saved inventory — confirm what is included (packing, bulkies) and update your list if needed.`,
    };
  }

  // Weight-only comparison (mover weight vs our inventory-derived weight)
  const moverW = moverWeightEntered!;
  const abs = Math.abs(moverW - user.weightLbs);
  const denom = Math.max(moverW, user.weightLbs, 1);
  const pct = abs / denom;
  const status = classifyDiff(
    abs,
    pct,
    WEIGHT_MODERATE_ABS_LBS,
    WEIGHT_MODERATE_PCT,
    WEIGHT_MATERIAL_ABS_LBS,
    WEIGHT_MATERIAL_PCT
  );
  const moverLower = moverW < user.weightLbs;
  return {
    status,
    basis: 'weight',
    moverCuFt: null,
    moverWeightLbs: moverW,
    userCuFt: user.cubicFeet,
    userWeightLbs: user.weightLbs,
    userItemCount: user.itemCount,
    absDiffCuFt: null,
    pctDiffCuFt: null,
    absDiffLbs: Math.round(abs),
    pctDiffLbs: Math.round(pct * 1000) / 10,
    headline:
      status === 'aligned'
        ? 'Weight figures are relatively close'
        : status === 'moderate_mismatch'
          ? 'Moderate weight difference — review recommended'
          : 'Material weight difference — review before signing',
    body:
      status === 'aligned'
        ? `Mover estimate weight: ~${moverW.toLocaleString('en-US')} lbs · Your inventory (~${Math.round(user.cubicFeet)} cu. ft. × ${LBS_PER_CU_FT} lb/cu ft): ~${user.weightLbs.toLocaleString('en-US')} lbs. Still confirm major items.`
        : moverLower
          ? `Mover estimate weight: ~${moverW.toLocaleString('en-US')} lbs · Your inventory-derived weight: ~${user.weightLbs.toLocaleString('en-US')} lbs · Difference: ~${Math.round(abs).toLocaleString('en-US')} lbs (~${Math.round(pct * 100)}%). Your inventory implies more weight than the estimate shows. Review item lists before signing — factual comparison only.`
          : `Mover estimate weight: ~${moverW.toLocaleString('en-US')} lbs · Your inventory-derived weight: ~${user.weightLbs.toLocaleString('en-US')} lbs · Difference: ~${Math.round(abs).toLocaleString('en-US')} lbs. Confirm what the estimate includes and refresh your inventory if incomplete.`,
  };
}

export function inventoryComparisonFindings(
  comparison: InventoryComparison
): QuoteCheckFinding[] {
  if (comparison.status === 'unavailable') {
    return [
      {
        id: 'inventory_unavailable_prompt',
        family: 'inventory_compare',
        severity: 'info',
        status: 'missing_unclear',
        title: comparison.headline,
        explanation: comparison.body,
        action:
          comparison.prompt ??
          'Add estimate volume/weight and/or build a MoveTrustHub inventory to enable comparison.',
        citation:
          'MoveTrustHub inventory uses the Moving Calculator model (cu. ft. and 7 lb/cu ft weight estimate) — educational planning only.',
      },
    ];
  }
  if (comparison.status === 'aligned') {
    return [
      {
        id: 'inventory_aligned',
        family: 'inventory_compare',
        severity: 'info',
        status: 'present',
        title: comparison.headline,
        explanation: comparison.body,
        action: 'Still walk the inventory line-by-line for specialty items and packing scope.',
        citation:
          'Comparison uses conservative percentage and absolute thresholds on planning volumes — not a valuation of fraud or price fairness.',
      },
    ];
  }
  if (comparison.status === 'moderate_mismatch') {
    return [
      {
        id: 'inventory_moderate_mismatch',
        family: 'inventory_compare',
        severity: 'review',
        status: 'needs_review',
        title: comparison.headline,
        explanation: comparison.body,
        action:
          'Ask the mover to confirm the inventory basis (survey, item list, or cubic feet) and update your MoveTrustHub inventory if items changed.',
        citation:
          'Mismatch thresholds: moderate ≈ ≥12% or ≥80 cu. ft. (volume), or ≥15% / ≥600 lbs (weight). Educational only.',
      },
    ];
  }
  return [
    {
      id: 'inventory_material_mismatch',
      family: 'inventory_compare',
      severity: 'high',
      status: 'needs_review',
      title: comparison.headline,
      explanation: comparison.body,
      action:
        'Do not treat this as proof of wrongdoing — resolve the inventory basis in writing before you sign or pay a deposit. Re-run Quote Check after updates.',
      citation:
        'Mismatch thresholds: material ≈ ≥25% or ≥200 cu. ft. (volume), or ≥28% / ≥1,500 lbs (weight). Educational only.',
    },
  ];
}
