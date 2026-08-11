/**
 * Move Quote Check Phase 1 — deterministic rules engine.
 * No LLM. No SAFE/SCAM verdicts. Educational FMCSA-oriented framing only.
 */

import type {
  QuoteCheckAnswers,
  QuoteCheckFinding,
  QuoteCheckReport,
} from '@/lib/move-quote-check/types';

function parseMoney(raw: string): number | null {
  const n = Number(String(raw).replace(/[,$]/g, '').trim());
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, '');
}

function estimateTypeLabel(t: QuoteCheckAnswers['estimateType']): string {
  switch (t) {
    case 'binding':
      return 'Binding estimate';
    case 'non_binding':
      return 'Non-binding estimate';
    case 'binding_nte':
      return 'Binding not-to-exceed (or similar)';
    default:
      return 'Estimate type unclear / not stated';
  }
}

function finding(f: QuoteCheckFinding): QuoteCheckFinding {
  return f;
}

/**
 * Evaluate questionnaire answers → structured findings + educational math.
 */
export function evaluateQuoteCheck(answers: QuoteCheckAnswers): QuoteCheckReport {
  const findings: QuoteCheckFinding[] = [];
  const total = parseMoney(answers.estimatedTotal);
  const deposit = parseMoney(answers.depositAmount);
  const usdot = digitsOnly(answers.usdot);

  // —— A. Estimate type / exposure ——
  if (answers.estimateType === 'non_binding') {
    findings.push(
      finding({
        id: 'est-non-binding',
        family: 'estimate_type',
        severity: 'review',
        status: 'needs_review',
        title: 'Non-binding estimate — charges can change',
        explanation:
          'A non-binding estimate is not a guaranteed price. Final charges may differ after the inventory is verified at pickup. Federal consumer-protection materials for household goods moves discuss how non-binding estimates work and limits on what a carrier may demand before unloading in certain situations.',
        action:
          'Confirm in writing what happens if the shipment weighs more or costs more than estimated, and what you must pay before delivery is released.',
        citation:
          'FMCSA household goods consumer-protection concepts (estimate types; non-binding estimates) — educational context, not legal advice.',
      })
    );
  } else if (answers.estimateType === 'binding') {
    findings.push(
      finding({
        id: 'est-binding',
        family: 'estimate_type',
        severity: 'info',
        status: 'present',
        title: 'Binding estimate indicated',
        explanation:
          'A binding estimate generally means the price is set based on the estimate terms (subject to the written agreement and any allowed changes). Still read exclusions, accessorials, and valuation carefully.',
        action: 'Verify the estimate is labeled binding and matches the inventory you expect to ship.',
        citation: 'FMCSA household goods estimate-type concepts — educational only.',
      })
    );
  } else if (answers.estimateType === 'binding_nte') {
    findings.push(
      finding({
        id: 'est-nte',
        family: 'estimate_type',
        severity: 'info',
        status: 'present',
        title: 'Binding not-to-exceed (or similar) indicated',
        explanation:
          'Not-to-exceed style estimates cap the amount under stated conditions. Confirm what can still increase the price (extra stops, stairs, storage, packing changes).',
        action: 'Ask which accessorials are included in the not-to-exceed amount and which are extra.',
        citation: 'FMCSA household goods estimate-type concepts — educational only.',
      })
    );
  } else {
    findings.push(
      finding({
        id: 'est-unclear',
        family: 'estimate_type',
        severity: 'review',
        status: 'missing_unclear',
        title: 'Estimate type not clear on the document',
        explanation:
          'Whether an estimate is binding, non-binding, or not-to-exceed changes your exposure if the final weight or services differ. If the document does not state the type clearly, you cannot evaluate price risk.',
        action:
          'Ask the company to state the estimate type in writing before you sign or pay a deposit.',
        citation: 'FMCSA household goods estimate-type concepts — educational only.',
      })
    );
  }

  let exposureNote: QuoteCheckReport['exposureNote'] = null;
  if (answers.estimateType === 'non_binding' && total != null && total > 0) {
    const cap = Math.round(total * 1.1 * 100) / 100;
    exposureNote = {
      estimatedTotal: total,
      educationalMaxAtDelivery: cap,
      explanation:
        'For educational context only: federal consumer materials for interstate household goods moves discuss a common protection pattern around non-binding estimates and amounts demanded before delivery is completed. This calculator multiplies your entered estimate by 110% so you can discuss delivery payment terms with the company. It is not legal advice and does not decide your specific shipment.',
    };
    findings.push(
      finding({
        id: 'est-110-context',
        family: 'estimate_type',
        severity: 'info',
        status: 'needs_review',
        title: 'Educational delivery-payment context (110% figure)',
        explanation: `Based on your entered estimate of $${total.toLocaleString('en-US')}, a commonly discussed educational figure is about $${cap.toLocaleString('en-US')} (110%). Confirm the company’s written delivery collection policy.`,
        action:
          'Ask in writing how much must be paid before unloading and what happens if the final charges exceed the estimate.',
        citation:
          'FMCSA household goods consumer-protection materials on non-binding estimates — educational framing only.',
      })
    );
  }

  // —— B. Company identity ——
  if (!usdot || usdot.length < 5) {
    findings.push(
      finding({
        id: 'id-missing-usdot',
        family: 'identity',
        severity: 'high',
        status: 'missing_unclear',
        title: 'USDOT number missing or incomplete on the estimate',
        explanation:
          'Interstate household goods movers generally operate under federal authority identified by a USDOT number. If the estimate does not show a verifiable USDOT, you cannot easily match the paper to public FMCSA records.',
        action:
          'Ask for the USDOT (and MC if used) that will appear on the bill of lading, then verify it on FMCSA SAFER / Move Trust Hub Verify DOT before paying a deposit.',
        citation: 'FMCSA registration / authority concepts — educational only.',
      })
    );
  } else {
    findings.push(
      finding({
        id: 'id-usdot-present',
        family: 'identity',
        severity: 'info',
        status: 'present',
        title: 'USDOT number provided — verify before you pay',
        explanation:
          'A USDOT on the estimate is a starting point. Confirm the legal name and authority status match the company you are dealing with.',
        action: 'Run Verify DOT with this number and compare the legal name to the estimate.',
        citation: 'FMCSA SAFER / company snapshot — public records.',
      })
    );
  }

  if (answers.companyRole === 'broker') {
    findings.push(
      finding({
        id: 'id-broker',
        family: 'identity',
        severity: 'high',
        status: 'needs_review',
        title: 'Broker indicated — transporting carrier may differ',
        explanation:
          'Brokers arrange transportation; they typically do not haul household goods as the motor carrier. Consumers should know the name and USDOT of the carrier that will actually transport the shipment.',
        action:
          'Ask for the transporting carrier’s legal name and USDOT in writing before load day, and verify that carrier separately.',
        citation: 'FMCSA broker vs carrier roles — educational only.',
      })
    );
  } else if (answers.companyRole === 'unclear') {
    findings.push(
      finding({
        id: 'id-role-unclear',
        family: 'identity',
        severity: 'review',
        status: 'missing_unclear',
        title: 'Company role unclear (mover vs broker)',
        explanation:
          'If you cannot tell whether the company is the motor carrier or a broker, responsibilities for pickup, delivery, and claims can be hard to track.',
        action: 'Ask them to state whether they are the carrier, a broker, or both — and who will haul the load.',
        citation: 'FMCSA broker vs carrier roles — educational only.',
      })
    );
  } else {
    findings.push(
      finding({
        id: 'id-carrier',
        family: 'identity',
        severity: 'info',
        status: 'present',
        title: 'Appears to identify as a mover/carrier',
        explanation:
          'Still confirm USDOT authority and that the bill of lading will be issued by the same entity.',
        action: 'Match legal name on the estimate to FMCSA records.',
        citation: 'FMCSA authority concepts — educational only.',
      })
    );
  }

  // —— C. Survey ——
  if (answers.surveyBasis === 'phone_only') {
    findings.push(
      finding({
        id: 'survey-phone',
        family: 'survey',
        severity: 'review',
        status: 'needs_review',
        title: 'Phone-only / no physical or video survey',
        explanation:
          'Estimates based only on a phone conversation often miss volume, access, and packing needs — which can lead to revised charges later.',
        action: 'Request a virtual or in-home survey, or document inventory carefully yourself before signing.',
        citation: 'FMCSA estimate / survey best-practice concepts — educational only.',
      })
    );
  } else if (answers.surveyBasis === 'virtual' || answers.surveyBasis === 'in_home') {
    findings.push(
      finding({
        id: 'survey-done',
        family: 'survey',
        severity: 'info',
        status: 'present',
        title:
          answers.surveyBasis === 'in_home'
            ? 'In-home survey indicated'
            : 'Virtual/video survey indicated',
        explanation:
          'A documented survey generally supports a more complete inventory and estimate. Keep notes from the survey with your paperwork.',
        action: 'Confirm the estimate inventory matches what was surveyed.',
        citation: 'FMCSA estimate / survey concepts — educational only.',
      })
    );
  } else {
    findings.push(
      finding({
        id: 'survey-unsure',
        family: 'survey',
        severity: 'review',
        status: 'missing_unclear',
        title: 'Survey basis unclear',
        explanation: 'If you are unsure how the estimate was prepared, price confidence is lower.',
        action: 'Ask how the company measured volume and services (phone, video, or in-home).',
        citation: 'FMCSA estimate / survey concepts — educational only.',
      })
    );
  }

  // —— D. Inventory ——
  if (answers.inventoryDetail === 'little_or_none') {
    findings.push(
      finding({
        id: 'inv-thin',
        family: 'inventory',
        severity: 'review',
        status: 'missing_unclear',
        title: 'Little or no inventory detail on the estimate',
        explanation:
          'Without an itemized or documented inventory, disputes about what was agreed and what was shipped are harder to resolve.',
        action: 'Request a written inventory or complete your own item list before signing.',
        citation: 'Household goods inventory / documentation practices — educational only.',
      })
    );
  } else if (answers.inventoryDetail === 'room_or_volume') {
    findings.push(
      finding({
        id: 'inv-volume',
        family: 'inventory',
        severity: 'review',
        status: 'needs_review',
        title: 'Generic volume or room-level inventory only',
        explanation:
          'Room totals or cubic-foot guesses can undercount specialty items and packing. Useful as a start, but weaker than a line-item inventory.',
        action: 'Add major items in writing (pianos, safes, appliances) and confirm packing scope.',
        citation: 'Household goods inventory practices — educational only.',
      })
    );
  } else if (answers.inventoryDetail === 'itemized') {
    findings.push(
      finding({
        id: 'inv-itemized',
        family: 'inventory',
        severity: 'info',
        status: 'present',
        title: 'Itemized inventory indicated',
        explanation: 'Item-level detail supports clearer estimates and claim documentation.',
        action: 'Still review quantities and high-value items for accuracy.',
        citation: 'Household goods inventory practices — educational only.',
      })
    );
  } else {
    findings.push(
      finding({
        id: 'inv-unsure',
        family: 'inventory',
        severity: 'review',
        status: 'missing_unclear',
        title: 'Inventory detail unclear',
        explanation: 'Clarify what is listed before relying on the price.',
        action: 'Ask for the inventory attachment or schedule that supports the estimate total.',
        citation: 'Household goods inventory practices — educational only.',
      })
    );
  }

  // —— E. Deposit / payment ——
  if (deposit != null && total != null && total > 0) {
    const ratio = deposit / total;
    if (ratio >= 0.5) {
      findings.push(
        finding({
          id: 'dep-large-pct',
          family: 'deposit',
          severity: 'review',
          status: 'needs_review',
          title: 'Deposit is a large share of the estimate',
          explanation: `Your entered deposit is about ${Math.round(ratio * 100)}% of the estimate total. Large upfront payments increase consumer risk if service is delayed or disputed. This tool does not invent a legal maximum deposit percentage.`,
          action:
            'Ask what the deposit covers, whether it is refundable, and when remaining balances are due — in writing.',
          citation:
            'FMCSA-style consumer warnings about deposits and payment pressure — educational patterns, not a statutory calculator.',
        })
      );
    } else if (deposit >= 1000) {
      findings.push(
        finding({
          id: 'dep-large-abs',
          family: 'deposit',
          severity: 'review',
          status: 'needs_review',
          title: 'Significant deposit amount entered',
          explanation:
            'Larger deposits deserve written terms (refund, cancellation, and who holds the money).',
          action: 'Get deposit terms in writing before you pay.',
          citation: 'Consumer deposit caution patterns — educational only.',
        })
      );
    }
  }

  if (
    answers.paymentMethod === 'cash' ||
    answers.paymentMethod === 'wire' ||
    answers.paymentMethod === 'zelle'
  ) {
    findings.push(
      finding({
        id: 'pay-pressure',
        family: 'deposit',
        severity: 'high',
        status: 'needs_review',
        title: 'Cash, wire, or instant-transfer style payment indicated',
        explanation:
          'Consumer protection materials often warn that pressure to pay large sums by cash, wire, or irreversible transfers can be harder to reverse if problems arise. This is a caution pattern — not a determination of wrongdoing.',
        action:
          'Prefer traceable payment methods stated in the written estimate, and avoid paying large sums before services are performed when you can negotiate safer terms.',
        citation:
          'FMCSA / consumer-protection style warnings on payment methods — educational only.',
      })
    );
  }

  if (answers.depositTiming === 'at_booking' || answers.depositTiming === 'before_load') {
    findings.push(
      finding({
        id: 'dep-timing',
        family: 'deposit',
        severity: 'info',
        status: 'needs_review',
        title: 'Deposit timing is before delivery',
        explanation:
          'Know what happens if the move is rescheduled or cancelled after the deposit is paid.',
        action: 'Request the refund/cancellation policy in writing.',
        citation: 'Consumer deposit caution patterns — educational only.',
      })
    );
  }

  // —— F. Valuation ——
  if (answers.valuation === 'released') {
    findings.push(
      finding({
        id: 'val-released',
        family: 'valuation',
        severity: 'review',
        status: 'needs_review',
        title: 'Released value protection indicated',
        explanation:
          'Released value is a minimal protection option (historically discussed as a limited per-pound amount unless you declare higher value). It is usually inexpensive but may not cover replacement cost of household goods.',
        action:
          'Confirm the valuation declaration on the estimate/BOL and whether Full Value Protection was offered in writing.',
        citation: 'FMCSA household goods valuation concepts — educational only.',
      })
    );
  } else if (answers.valuation === 'full_value') {
    findings.push(
      finding({
        id: 'val-fvp',
        family: 'valuation',
        severity: 'info',
        status: 'present',
        title: 'Full Value Protection indicated',
        explanation:
          'Full Value Protection generally provides broader coverage options for loss/damage subject to the contract, deductibles, and exceptions. Read the written terms carefully.',
        action: 'Confirm deductible, declared value, and excluded items on the written agreement.',
        citation: 'FMCSA household goods valuation concepts — educational only.',
      })
    );
  } else {
    findings.push(
      finding({
        id: 'val-unclear',
        family: 'valuation',
        severity: 'review',
        status: 'missing_unclear',
        title: 'Valuation / liability option unclear',
        explanation:
          'Valuation choice affects what happens if items are lost or damaged. If it is not selected clearly, you may default into limited protection without realizing it.',
        action: 'Ask which valuation option is selected and get the selection on the signed documents.',
        citation: 'FMCSA household goods valuation concepts — educational only.',
      })
    );
  }

  // —— G. Completeness ——
  if (answers.signedCustomer === 'no' || answers.signedCompany === 'no') {
    findings.push(
      finding({
        id: 'doc-unsigned',
        family: 'completeness',
        severity: 'review',
        status: 'missing_unclear',
        title: 'Signatures incomplete',
        explanation:
          'Unsigned estimates or missing company signatures can leave terms harder to enforce or clarify later.',
        action: 'Do not pay a deposit until required parties have signed the written estimate as required.',
        citation: 'Written estimate / agreement documentation practices — educational only.',
      })
    );
  }
  if (answers.datesPresent === 'no') {
    findings.push(
      finding({
        id: 'doc-dates',
        family: 'completeness',
        severity: 'review',
        status: 'missing_unclear',
        title: 'Dates missing on the estimate',
        explanation: 'Dates help establish when services and pricing were offered.',
        action: 'Request a dated written estimate.',
        citation: 'Written estimate documentation practices — educational only.',
      })
    );
  }
  if (answers.originDestinationPresent === 'no') {
    findings.push(
      finding({
        id: 'doc-od',
        family: 'completeness',
        severity: 'review',
        status: 'missing_unclear',
        title: 'Origin or destination not clearly present',
        explanation: 'Addresses (or clear city/state pairs) should appear so the scope of the move is unambiguous.',
        action: 'Add complete origin and destination to the written estimate before signing.',
        citation: 'Written estimate documentation practices — educational only.',
      })
    );
  }
  if (answers.rightsBookletReferenced === 'no') {
    findings.push(
      finding({
        id: 'doc-rights',
        family: 'completeness',
        severity: 'review',
        status: 'needs_review',
        title: 'Consumer rights booklet not referenced',
        explanation:
          'Interstate household goods movers are associated with providing consumer rights information (often discussed as a rights and responsibilities booklet). If nothing references it, ask for the current version.',
        action: 'Request the consumer rights materials before you sign or pay.',
        citation: 'FMCSA household goods consumer rights materials — educational only.',
      })
    );
  }
  if (answers.blankOrSubjectToChange === 'yes') {
    findings.push(
      finding({
        id: 'doc-open-ended',
        family: 'completeness',
        severity: 'high',
        status: 'needs_review',
        title: 'Open-ended or blank “subject to change” style language noticed',
        explanation:
          'Broad language that leaves major terms blank or indefinitely changeable can shift risk onto you after a deposit is paid. This is a documentation caution — not a verdict about the company.',
        action:
          'Ask for complete, specific terms (services, price basis, dates, valuation) before any payment.',
        citation: 'Written contract completeness practices — educational only.',
      })
    );
  }

  // Positive completeness when mostly yes
  if (
    answers.signedCustomer === 'yes' &&
    answers.signedCompany === 'yes' &&
    answers.datesPresent === 'yes' &&
    answers.originDestinationPresent === 'yes'
  ) {
    findings.push(
      finding({
        id: 'doc-complete-ish',
        family: 'completeness',
        severity: 'info',
        status: 'present',
        title: 'Core document fields look present',
        explanation:
          'Signatures, dates, and origin/destination appearing is a constructive completeness signal — still read price type, valuation, and inventory carefully.',
        action: 'Keep copies of everything you sign and pay against.',
        citation: 'Written estimate documentation practices — educational only.',
      })
    );
  }

  const highCount = findings.filter((f) => f.severity === 'high').length;
  const reviewCount = findings.filter((f) => f.severity === 'review').length;
  const infoCount = findings.filter((f) => f.severity === 'info').length;

  let summaryHeadline: string;
  let summaryBody: string;
  if (highCount >= 2 || (highCount >= 1 && reviewCount >= 3)) {
    summaryHeadline = 'Important gaps to resolve before paying a deposit';
    summaryBody =
      'Several high-priority documentation or identity items deserve attention. Resolve them in writing before you sign or send money. This is not a scam verdict and not legal advice.';
  } else if (highCount >= 1 || reviewCount >= 3) {
    summaryHeadline = 'Several items deserve review before signing';
    summaryBody =
      'Your answers flagged topics that commonly affect price exposure, identity verification, or documentation quality. Use the checklist and questions below with the company.';
  } else if (reviewCount >= 1) {
    summaryHeadline = 'A few items deserve a closer look';
    summaryBody =
      'Overall documentation may be usable, but at least one area should be clarified in writing before you commit.';
  } else {
    summaryHeadline = 'Looks relatively complete based on your answers';
    summaryBody =
      'Your answers suggest fewer structural gaps — still verify USDOT authority, read valuation and accessorials, and keep copies. Completeness is not an endorsement.';
  }

  const questions = buildQuestions(answers, findings, usdot);
  const verifyDotHref = usdot.length >= 5 ? `/verify-dot?q=${encodeURIComponent(usdot)}` : null;

  return {
    summaryHeadline,
    summaryBody,
    estimateTypeLabel: estimateTypeLabel(answers.estimateType),
    reviewCount,
    highCount,
    infoCount,
    findings,
    exposureNote,
    questions,
    verifyDotHref,
  };
}

function buildQuestions(
  answers: QuoteCheckAnswers,
  findings: QuoteCheckFinding[],
  usdot: string
): string[] {
  const qs: string[] = [];
  const ids = new Set(findings.map((f) => f.id));

  if (ids.has('est-unclear') || ids.has('est-non-binding')) {
    qs.push(
      'Is this estimate binding, non-binding, or not-to-exceed — and where is that stated on the document?'
    );
  }
  if (ids.has('est-non-binding') || ids.has('est-110-context')) {
    qs.push(
      'If final charges exceed the non-binding estimate, how much must I pay before you unload, and what is your written policy?'
    );
  }
  if (ids.has('id-missing-usdot') || usdot) {
    qs.push(
      usdot
        ? `Please confirm USDOT ${usdot} is the authority that will appear on my bill of lading and matches the legal name on this estimate.`
        : 'What is the USDOT (and MC, if any) of the company that will transport my household goods?'
    );
  }
  if (ids.has('id-broker') || ids.has('id-role-unclear')) {
    qs.push(
      'Are you the motor carrier or a broker? If a broker, what is the name and USDOT of the transporting carrier?'
    );
  }
  if (ids.has('survey-phone') || ids.has('survey-unsure')) {
    qs.push('Can we complete a virtual or in-home survey so the inventory matches what I am shipping?');
  }
  if (ids.has('inv-thin') || ids.has('inv-volume') || ids.has('inv-unsure')) {
    qs.push('Please provide an itemized inventory attachment that supports this estimate total.');
  }
  if (ids.has('dep-large-pct') || ids.has('dep-large-abs') || ids.has('pay-pressure')) {
    qs.push(
      'What payment methods do you accept, when is each payment due, and what is your written refund/cancellation policy for the deposit?'
    );
  }
  if (ids.has('val-unclear') || ids.has('val-released')) {
    qs.push(
      'Which valuation option is selected (Released Value vs Full Value Protection), and can you show the written selection and any deductible?'
    );
  }
  if (ids.has('doc-rights') || ids.has('doc-open-ended')) {
    qs.push(
      'Please provide the current household goods consumer rights materials and a complete, filled-in estimate with no open blanks on price or services.'
    );
  }

  // Always useful baseline questions (cap 8)
  if (qs.length < 5) {
    qs.push('Will I receive a bill of lading before loading, and who is the named carrier on it?');
  }
  if (qs.length < 6) {
    qs.push('Which accessorials (stairs, long carry, packing, storage) are included vs extra?');
  }

  return qs.slice(0, 8);
}
