/**
 * SHARE-003 — pure Move share-card models (no I/O).
 * Cards use only public directory/geography fields already shown on the page.
 */

export type MoveShareCardKind = 'fallback' | 'entity' | 'content';

export type MoveShareCardModel = {
  kind: MoveShareCardKind;
  eyebrow: string;
  title: string;
  subtitle?: string;
  fact?: string;
};

export function truncateShareText(value: string, maxChars: number): string {
  const text = value.replace(/\s+/g, ' ').trim();
  if (!text) return '';
  if (text.length <= maxChars) return text;
  return `${text.slice(0, Math.max(0, maxChars - 1)).trimEnd()}…`;
}

export function moveFallbackShareModel(): MoveShareCardModel {
  return {
    kind: 'fallback',
    eyebrow: '',
    title: 'Move Trust Hub',
    subtitle: 'Independent Moving Research',
    fact: 'movetrusthub.com',
  };
}

export function moveEntityShareModel(input: {
  name: string;
  headquarters?: string | null;
  usdotLabel?: string | null;
  profileLabel?: string | null;
}): MoveShareCardModel {
  const name = truncateShareText(input.name || '', 72);
  const location = truncateShareText(input.headquarters || '', 52);
  const usdot = (input.usdotLabel || '').trim();
  const profile = (input.profileLabel || 'Company profile').trim();
  const fact = usdot ? `${usdot} · ${profile}` : profile;

  return {
    kind: 'entity',
    eyebrow: 'MOVER RESEARCH · EVIDENCE SUMMARY',
    title: name || 'Moving company profile',
    subtitle: location || undefined,
    fact: truncateShareText(fact, 72),
  };
}

export function moveCountyShareModel(input: {
  countyLabel: string;
  stateName: string;
}): MoveShareCardModel {
  const state = truncateShareText((input.stateName || '').toUpperCase(), 28);
  const county = truncateShareText(input.countyLabel || '', 46);
  return {
    kind: 'content',
    eyebrow: state ? `${state} MOVING RESEARCH` : 'MOVING RESEARCH',
    title: county ? `${county} movers` : 'County moving research',
    fact: 'Licensing · company research · moving tools',
  };
}

export function moveStateShareModel(input: { stateName: string }): MoveShareCardModel {
  const name = truncateShareText(input.stateName || '', 36);
  return {
    kind: 'content',
    eyebrow: name ? `${name.toUpperCase()} INTELLIGENCE` : 'STATE INTELLIGENCE',
    title: name ? `${name} Moving Intelligence` : 'State Moving Intelligence',
    fact: 'Registration · authority · public-source research',
  };
}

export function moverProfileLabel(input: {
  serviceScope?: string | null;
  services?: string[] | null;
}): string {
  if (input.serviceScope === 'intrastate') return 'Local mover profile';
  if (input.serviceScope === 'interstate') return 'Interstate mover profile';
  const services = input.services ?? [];
  if (services.includes('Auto Transport')) return 'Auto transport profile';
  if (services.includes('Container / Portable')) return 'Container mover profile';
  return 'Company profile';
}
