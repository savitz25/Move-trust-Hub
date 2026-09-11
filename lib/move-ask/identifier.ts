/** Regulatory identifiers are strings. Formatting never changes their digits. */
export type MoveIdentifier = { type: 'usdot' | 'mc'; value: string; rawSpan: string; start: number; end: number; normalization: string[] };
export type IdentifierParse = { identifiers: MoveIdentifier[]; error?: string };

export function parseMoveIdentifiers(raw: string): IdentifierParse {
  const identifiers: MoveIdentifier[] = [];
  const labels = [...raw.matchAll(/\b(USDOT|DOT|MC)(?=\s|#|-|\d|$)/gi)];
  for (const label of labels) {
    const start = label.index!;
    const tail = raw.slice(start + label[0].length);
    const span = tail.match(/^\s*(?:#\s*|-\s*)?(\d+(?:\s+\d+)*)/);
    if (!span) return { identifiers, error: 'Enter a labelled USDOT or MC number (3–8 digits).' };
    const numeric = span[1]!;
    const groups = numeric.split(/\s+/);
    const value = groups.join('');
    const end = start + label[0].length + span[0].length;
    const following = raw.slice(end);
    if (!/^\d{3,8}$/.test(value) || /^[\w+-]|^[.,]\d/.test(following)) {
      return { identifiers, error: 'The labelled identifier is malformed or too long. No partial lookup was performed.' };
    }
    // Grouped notation is accepted only as a short leading group followed by
    // three-digit groups. A second independent number/year is never guessed.
    if (groups.length > 1 && (groups[0]!.length > 4 || groups.slice(1).some((g) => g.length !== 3))) {
      return { identifiers, error: 'The numeric groups are ambiguous. Enter each identifier without internal spaces.' };
    }
    const type = label[1]!.toUpperCase() === 'MC' ? 'mc' : 'usdot';
    identifiers.push({ type, value, rawSpan: raw.slice(start, end), start, end,
      normalization: [ ...(groups.length > 1 ? ['Removed formatting whitespace within the labelled number'] : []),
        ...(/[#-]/.test(span[0]) ? ['Removed label separator'] : []),
        ...(label[1] !== (type === 'usdot' ? 'USDOT' : 'MC') ? ['Standardized identifier label'] : []) ] });
  }
  if (identifiers.length > 2 || new Set(identifiers.map((id) => id.type)).size !== identifiers.length) {
    return { identifiers, error: 'Multiple identifiers of the same family need separate requests or a supported comparison. They were not combined.' };
  }
  return { identifiers };
}

/** Stored MC label variants are a documented formatting convention; zeroes stay meaningful. */
export function normalizeStoredIdentifier(raw: string | null | undefined, type: 'usdot' | 'mc'): string | null {
  const value = raw?.trim() ?? '';
  const match = type === 'mc' ? value.match(/^(?:MC[- ]?)?(\d{3,8})$/i) : value.match(/^(\d{3,8})$/);
  return match?.[1] ?? null;
}

export function identifierVariants(id: Pick<MoveIdentifier, 'type' | 'value'>): string[] {
  return id.type === 'usdot' ? [id.value] : [id.value, `MC${id.value}`, `MC-${id.value}`, `MC ${id.value}`];
}
