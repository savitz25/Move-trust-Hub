/**
 * Phase 2 — client-side estimate text assist (deterministic patterns only).
 * Prefills questionnaire suggestions; never claims full document understanding.
 */

import type {
  CompanyRole,
  EstimateType,
  PaymentMethod,
  QuoteCheckAnswers,
  ValuationType,
  YesNoUnsure,
} from '@/lib/move-quote-check/types';

export type PasteSuggestion = {
  field: keyof QuoteCheckAnswers;
  value: QuoteCheckAnswers[keyof QuoteCheckAnswers];
  note: string;
  confidence: 'high' | 'medium';
};

export type PasteParseResult = {
  suggestions: PasteSuggestion[];
  /** Short list of what was noticed (for UI) */
  notices: string[];
};

function moneyCandidates(text: string): number[] {
  const out: number[] = [];
  const re =
    /(?:\$|USD\s*)(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+(?:\.\d{2})?)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const n = Number(m[1].replace(/,/g, ''));
    if (Number.isFinite(n) && n >= 50 && n <= 500_000) out.push(n);
  }
  return out;
}

/**
 * Scan pasted estimate text for high-confidence prefills.
 */
export function parseEstimatePasteText(raw: string): PasteParseResult {
  const text = raw.replace(/\r\n/g, '\n').trim();
  const suggestions: PasteSuggestion[] = [];
  const notices: string[] = [];
  if (text.length < 20) {
    return { suggestions, notices: ['Paste more estimate text to detect terms.'] };
  }
  const lower = text.toLowerCase();

  // Estimate type
  if (
    /\bbinding\s+not[- ]?to[- ]?exceed\b|\bnot[- ]?to[- ]?exceed\b|\bnte\b/i.test(text)
  ) {
    suggestions.push({
      field: 'estimateType',
      value: 'binding_nte' satisfies EstimateType,
      note: 'Found “not-to-exceed” / NTE language',
      confidence: 'high',
    });
    notices.push('Not-to-exceed language detected');
  } else if (/\bnon[-\s]?binding\b/i.test(text)) {
    suggestions.push({
      field: 'estimateType',
      value: 'non_binding' satisfies EstimateType,
      note: 'Found “non-binding” language',
      confidence: 'high',
    });
    notices.push('Non-binding estimate language detected');
  } else if (/\bbinding\s+estimate\b|\bbinding\b(?![-\s]?not)/i.test(text) && !/\bnon[-\s]?binding\b/i.test(text)) {
    suggestions.push({
      field: 'estimateType',
      value: 'binding' satisfies EstimateType,
      note: 'Found “binding” language (confirm it is not non-binding)',
      confidence: 'medium',
    });
    notices.push('Binding language detected — please confirm');
  }

  // USDOT
  const usdotMatch =
    text.match(/(?:USDOT|U\.S\.?\s*DOT|DOT)\s*[#:]?\s*(\d{5,8})\b/i) ||
    text.match(/\bDOT\s*#?\s*(\d{5,8})\b/i);
  if (usdotMatch) {
    suggestions.push({
      field: 'usdot',
      value: usdotMatch[1],
      note: `Found USDOT ${usdotMatch[1]}`,
      confidence: 'high',
    });
    notices.push(`USDOT ${usdotMatch[1]}`);
  }

  // MC
  const mcMatch = text.match(/\bMC[-\s#:]?(\d{3,8})\b/i);
  if (mcMatch) {
    suggestions.push({
      field: 'mcNumber',
      value: mcMatch[1],
      note: `Found MC-${mcMatch[1]}`,
      confidence: 'high',
    });
    notices.push(`MC-${mcMatch[1]}`);
  }

  // Broker language
  if (/\bbroker\b|\barrange(?:s|d)?\s+(?:transportation|shipment)\b/i.test(text)) {
    suggestions.push({
      field: 'companyRole',
      value: 'broker' satisfies CompanyRole,
      note: 'Broker / arrange-transport language found',
      confidence: 'medium',
    });
    notices.push('Possible broker language');
  } else if (/\bmotor\s+carrier\b|\bhousehold\s+goods\s+carrier\b/i.test(text)) {
    suggestions.push({
      field: 'companyRole',
      value: 'carrier' satisfies CompanyRole,
      note: 'Carrier language found',
      confidence: 'medium',
    });
  }

  // Valuation
  if (/\bfull\s+value\s+protection\b|\bfvp\b/i.test(text)) {
    suggestions.push({
      field: 'valuation',
      value: 'full_value' satisfies ValuationType,
      note: 'Full Value Protection wording found',
      confidence: 'high',
    });
    notices.push('Full Value Protection wording');
  } else if (/\breleased\s+value\b|\b60\s*¢\b|\b\.60\s*per\s*pound\b/i.test(text)) {
    suggestions.push({
      field: 'valuation',
      value: 'released' satisfies ValuationType,
      note: 'Released value wording found',
      confidence: 'high',
    });
    notices.push('Released value wording');
  }

  // Subject to change / blanks
  if (
    /\bsubject\s+to\s+change\b|\bto\s+be\s+determined\b|\btbd\b|\b____+\b|\bblank\b/i.test(
      text
    )
  ) {
    suggestions.push({
      field: 'blankOrSubjectToChange',
      value: 'yes' satisfies YesNoUnsure,
      note: 'Open-ended / subject-to-change style phrasing found',
      confidence: 'medium',
    });
    notices.push('Open-ended or blank-style language');
  }

  // Rights booklet
  if (
    /\bright(?:s)?\s+and\s+responsibilities\b|\bconsumer\s+rights\b|\byour\s+rights\s+and\s+responsibilities\b/i.test(
      text
    )
  ) {
    suggestions.push({
      field: 'rightsBookletReferenced',
      value: 'yes' satisfies YesNoUnsure,
      note: 'Consumer rights materials referenced',
      confidence: 'medium',
    });
  }

  // Payment methods
  if (/\bwire\s+transfer\b|\bwiring\s+instructions\b/i.test(text)) {
    suggestions.push({
      field: 'paymentMethod',
      value: 'wire' satisfies PaymentMethod,
      note: 'Wire transfer language found',
      confidence: 'medium',
    });
    notices.push('Wire payment language');
  } else if (/\bzelle\b|\bcash\s+app\b|\bvenmo\b/i.test(text)) {
    suggestions.push({
      field: 'paymentMethod',
      value: 'zelle' satisfies PaymentMethod,
      note: 'Instant-transfer app language found',
      confidence: 'medium',
    });
    notices.push('Instant-transfer payment language');
  } else if (/\bcash\s+only\b|\bpay\s+in\s+cash\b/i.test(text)) {
    suggestions.push({
      field: 'paymentMethod',
      value: 'cash' satisfies PaymentMethod,
      note: 'Cash payment language found',
      confidence: 'medium',
    });
  } else if (/\bcredit\s+card\b|\bdebit\s+card\b|\bvisa\b|\bmastercard\b/i.test(text)) {
    suggestions.push({
      field: 'paymentMethod',
      value: 'card' satisfies PaymentMethod,
      note: 'Card payment language found',
      confidence: 'medium',
    });
  }

  // Packing / shuttle / storage
  if (/\bpacking\s+included\b|\bfull\s+packing\b|\bwe\s+pack\b/i.test(text)) {
    suggestions.push({
      field: 'packingIncluded',
      value: 'yes',
      note: 'Packing-included language found',
      confidence: 'medium',
    });
  } else if (/\bcustomer\s+pack\b|\bself[-\s]?pack\b|\bpacking\s+not\s+included\b/i.test(text)) {
    suggestions.push({
      field: 'packingIncluded',
      value: 'no',
      note: 'Self-pack / packing not included language found',
      confidence: 'medium',
    });
  }
  if (/\bshuttle\b/i.test(text)) {
    suggestions.push({
      field: 'shuttleMentioned',
      value: 'yes',
      note: 'Shuttle wording found',
      confidence: 'medium',
    });
  }
  if (/\bstorage\b|\bSIT\b|\bstorage[-\s]?in[-\s]?transit\b/i.test(text)) {
    suggestions.push({
      field: 'storageMentioned',
      value: 'yes',
      note: 'Storage wording found',
      confidence: 'medium',
    });
  }

  // Cubic feet
  const cuFtMatch = text.match(
    /(\d{2,5}(?:\.\d+)?)\s*(?:cu\.?\s*ft\.?|cubic\s*feet|cf\b)/i
  );
  if (cuFtMatch) {
    const n = Number(cuFtMatch[1]);
    if (Number.isFinite(n) && n >= 50 && n <= 50_000) {
      suggestions.push({
        field: 'estimateCubicFeet',
        value: String(n),
        note: `Found ~${n} cubic feet wording`,
        confidence: 'high',
      });
      notices.push(`Possible volume ${n} cu. ft.`);
    }
  }

  // Weight (lbs)
  const weightMatch = text.match(
    /(\d{3,6}(?:,\d{3})?)\s*(?:lbs?\.?|pounds)\b/i
  );
  if (weightMatch) {
    const n = Number(weightMatch[1].replace(/,/g, ''));
    if (Number.isFinite(n) && n >= 200 && n <= 100_000) {
      suggestions.push({
        field: 'estimateWeightLbs',
        value: String(n),
        note: `Found ~${n.toLocaleString('en-US')} lbs wording`,
        confidence: 'medium',
      });
      notices.push(`Possible weight ${n.toLocaleString('en-US')} lbs`);
    }
  }

  // Deposit
  const depositLine = text.match(
    /deposit(?:\s+amount)?\s*(?:of|:)?\s*\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+)/i
  );
  if (depositLine) {
    const n = Number(depositLine[1].replace(/,/g, ''));
    if (Number.isFinite(n) && n >= 25) {
      suggestions.push({
        field: 'depositAmount',
        value: String(n),
        note: `Deposit amount near “deposit” wording: $${n.toLocaleString('en-US')}`,
        confidence: 'medium',
      });
      notices.push(`Possible deposit $${n.toLocaleString('en-US')}`);
    }
  }

  // Estimated total — prefer lines with estimate/total
  const totalLine = text.match(
    /(?:estimated?\s+total|total\s+estimated?\s+charges|estimate\s+total|grand\s+total|total\s+charges)\s*(?:of|:)?\s*\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+)/i
  );
  if (totalLine) {
    const n = Number(totalLine[1].replace(/,/g, ''));
    if (Number.isFinite(n) && n >= 100) {
      suggestions.push({
        field: 'estimatedTotal',
        value: String(n),
        note: `Total near estimate wording: $${n.toLocaleString('en-US')}`,
        confidence: 'medium',
      });
      notices.push(`Possible estimate total $${n.toLocaleString('en-US')}`);
    }
  } else {
    const monies = moneyCandidates(text).sort((a, b) => b - a);
    // Heuristic: largest $ amount often the total if no labeled total
    if (monies[0] && monies[0] >= 500) {
      suggestions.push({
        field: 'estimatedTotal',
        value: String(monies[0]),
        note: `Largest dollar amount in text (unlabeled): $${monies[0].toLocaleString('en-US')} — confirm`,
        confidence: 'medium',
      });
      notices.push(`Largest $ amount $${monies[0].toLocaleString('en-US')} (confirm as total)`);
    }
  }

  // Company name — first line-ish with Moving/Movers/Van
  const companyLine = text.match(
    /(?:^|\n)\s*([A-Z][A-Za-z0-9&.'\-\s]{2,60}(?:Moving|Movers|Van\s+Lines|Relocation|Transport)[A-Za-z0-9&.'\-\s]{0,40})/
  );
  if (companyLine) {
    const name = companyLine[1].replace(/\s+/g, ' ').trim().slice(0, 80);
    if (name.length >= 4) {
      suggestions.push({
        field: 'companyName',
        value: name,
        note: 'Possible company name line',
        confidence: 'medium',
      });
      notices.push(`Possible company: ${name}`);
    }
  }

  // Deduplicate by field — keep highest confidence
  const byField = new Map<string, PasteSuggestion>();
  for (const s of suggestions) {
    const prev = byField.get(s.field);
    if (!prev || (prev.confidence === 'medium' && s.confidence === 'high')) {
      byField.set(s.field, s);
    }
  }

  return {
    suggestions: [...byField.values()],
    notices: [...new Set(notices)].slice(0, 12),
  };
}

/** Apply suggestions onto answers (only fills empty / default-ish fields unless force). */
export function applyPasteSuggestions(
  answers: QuoteCheckAnswers,
  suggestions: PasteSuggestion[],
  opts?: { force?: boolean }
): {
  next: QuoteCheckAnswers;
  applied: PasteSuggestion[];
  sources: Partial<Record<keyof QuoteCheckAnswers, string>>;
} {
  const next = { ...answers };
  const applied: PasteSuggestion[] = [];
  const sources: Partial<Record<keyof QuoteCheckAnswers, string>> = {};
  const force = opts?.force === true;

  for (const s of suggestions) {
    if (s.confidence === 'medium' && !force && s.field === 'estimatedTotal') {
      // still apply medium for totals with note — user confirms in UI
    }
    const current = next[s.field];
    const isEmptyString = typeof current === 'string' && current.trim() === '';
    const isDefaultEnum =
      current === 'not_sure' ||
      current === 'unclear' ||
      current === 'none';
    if (!force && !isEmptyString && !isDefaultEnum) continue;

    Object.assign(next, { [s.field]: s.value });
    applied.push(s);
    sources[s.field] = s.note;
  }

  return { next, applied, sources };
}
