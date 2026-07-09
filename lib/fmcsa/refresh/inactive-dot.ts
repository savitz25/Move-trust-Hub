/** Detect FMCSA/SAFER inactive USDOT responses (API message or empty content). */
export function isInactiveSaferDotMessage(message: string | null | undefined): boolean {
  if (!message?.trim()) return false;
  const lower = message.toLowerCase();
  return (
    lower.includes('inactive') &&
    (lower.includes('safer') || lower.includes('database') || lower.includes('usdot'))
  );
}

export function inactiveSaferMessageForDot(dot: string): string {
  return `The record matching USDOT Number = ${dot} is INACTIVE in the SAFER database`;
}

export type DotLookupResult = {
  dot: string;
  carrier: Record<string, unknown> | null;
  inactiveInSafer: boolean;
  saferMessage: string | null;
};

function extractApiMessage(json: Record<string, unknown>): string | null {
  const candidates = [
    json.message,
    json.error,
    json.errorMessage,
    (json.content as Record<string, unknown> | null)?.message,
    (json.content as Record<string, unknown> | null)?.error,
  ];

  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

/** Classify a raw FMCSA carriers/{dot} JSON payload. */
export function classifyDotLookupResponse(
  dot: string,
  json: Record<string, unknown> | null
): DotLookupResult {
  if (!json) {
    return {
      dot,
      carrier: null,
      inactiveInSafer: true,
      saferMessage: inactiveSaferMessageForDot(dot),
    };
  }

  const apiMessage = extractApiMessage(json);
  if (isInactiveSaferDotMessage(apiMessage)) {
    return {
      dot,
      carrier: null,
      inactiveInSafer: true,
      saferMessage: apiMessage,
    };
  }

  const content = json.content as Record<string, unknown> | null | undefined;
  if (!content) {
    return {
      dot,
      carrier: null,
      inactiveInSafer: true,
      saferMessage: inactiveSaferMessageForDot(dot),
    };
  }

  const carrier = content.carrier as Record<string, unknown> | undefined;
  const legalName = String(carrier?.legalName ?? '').trim();
  if (!carrier || !legalName) {
    const contentMessage = extractApiMessage(content);
    if (isInactiveSaferDotMessage(contentMessage)) {
      return {
        dot,
        carrier: null,
        inactiveInSafer: true,
        saferMessage: contentMessage,
      };
    }
    return {
      dot,
      carrier: carrier ?? null,
      inactiveInSafer: true,
      saferMessage: inactiveSaferMessageForDot(dot),
    };
  }

  return {
    dot,
    carrier,
    inactiveInSafer: false,
    saferMessage: null,
  };
}

export const INACTIVE_DOT_NO_MATCH_REASON = 'Inactive DOT with no name match' as const;