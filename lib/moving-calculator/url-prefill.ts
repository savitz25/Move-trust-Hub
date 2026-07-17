import type { MovePresetId } from '@/lib/moving-calculator/move-presets';

const PRESET_IDS = new Set<MovePresetId>([
  'studio',
  '1-bedroom',
  '2-bedroom',
  '3-bedroom',
  '4-plus',
  'custom',
  'scratch',
]);

/** Max length for free-text city labels from the URL. */
const MAX_CITY_LEN = 80;

/**
 * Full document navigation to the calculator.
 * Soft App Router transitions with prefill query params have caused
 * ChunkLoadError / client-side exceptions in production; hard navigation is reliable.
 */
export function navigateToCalculator(href: string): void {
  if (typeof window === 'undefined') return;
  const path = href.startsWith('/') ? href : `/${href}`;
  window.location.assign(path);
}

export function sanitizeCityLabel(raw: string | null | undefined): string {
  if (!raw) return '';
  try {
    return decodeURIComponent(raw)
      .replace(/[\u0000-\u001f\u007f]/g, '')
      .trim()
      .slice(0, MAX_CITY_LEN);
  } catch {
    return String(raw)
      .replace(/[\u0000-\u001f\u007f]/g, '')
      .trim()
      .slice(0, MAX_CITY_LEN);
  }
}

/** Accept 5-digit ZIP or return empty when clearly invalid. */
export function sanitizeZipParam(raw: string | null | undefined): string {
  if (!raw) return '';
  const digits = String(raw).replace(/\D/g, '').slice(0, 5);
  return digits.length === 5 ? digits : '';
}

export function parsePresetParam(raw: string | null | undefined): MovePresetId | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  if (PRESET_IDS.has(normalized as MovePresetId)) {
    return normalized as MovePresetId;
  }
  // Common aliases from marketing copy
  if (normalized === '2br' || normalized === '2 bedroom' || normalized === '2bed') {
    return '2-bedroom';
  }
  if (normalized === '1br' || normalized === '1 bedroom' || normalized === '1bed') {
    return '1-bedroom';
  }
  if (normalized === '3br' || normalized === '3 bedroom' || normalized === '3bed') {
    return '3-bedroom';
  }
  if (normalized === '4br' || normalized === '4+' || normalized === 'full-house' || normalized === 'full house') {
    return '4-plus';
  }
  return null;
}

export type CalculatorPrefill = {
  fromZip: string;
  toZip: string;
  fromCity: string;
  toCity: string;
  preset: MovePresetId | null;
};

export function readCalculatorPrefill(searchParams: {
  get: (key: string) => string | null;
}): CalculatorPrefill {
  try {
    const fromZip =
      sanitizeZipParam(searchParams.get('fromZip')) ||
      sanitizeZipParam(searchParams.get('from'));
    const toZip =
      sanitizeZipParam(searchParams.get('toZip')) ||
      sanitizeZipParam(searchParams.get('to'));
    const fromCity = sanitizeCityLabel(
      searchParams.get('fromCity') || searchParams.get('fromCityLabel')
    );
    const toCity = sanitizeCityLabel(
      searchParams.get('toCity') || searchParams.get('toCityLabel')
    );
    const preset = parsePresetParam(searchParams.get('preset'));
    return { fromZip, toZip, fromCity, toCity, preset };
  } catch {
    return { fromZip: '', toZip: '', fromCity: '', toCity: '', preset: null };
  }
}
