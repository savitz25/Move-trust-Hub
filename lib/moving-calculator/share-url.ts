import type { InventoryItem, InputMode } from '@/store/calculator-store';

export type ShareableState = {
  inventory: Pick<InventoryItem, 'name' | 'volume' | 'quantity' | 'room'>[];
  mode: InputMode;
  preset?: string | null;
};

const SHARE_PARAM = 'inv';

function toBase64Url(str: string): string {
  if (typeof window !== 'undefined') {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  return Buffer.from(str, 'utf-8').toString('base64url');
}

function fromBase64Url(encoded: string): string {
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  if (typeof window !== 'undefined') {
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(padded, 'base64').toString('utf-8');
}

export function encodeShareUrl(state: ShareableState, basePath = '/moving-calculator'): string {
  const payload = JSON.stringify({
    i: state.inventory.map((item) => ({
      n: item.name,
      v: item.volume,
      q: item.quantity,
      r: item.room,
    })),
    m: state.mode,
    p: state.preset,
  });
  const encoded = toBase64Url(payload);
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.movetrusthub.com';
  return `${origin}${basePath}?${SHARE_PARAM}=${encoded}`;
}

export function decodeShareParam(param: string): ShareableState | null {
  try {
    const json = fromBase64Url(param);
    const data = JSON.parse(json) as {
      i: { n: string; v: number; q: number; r?: string }[];
      m?: InputMode;
      p?: string;
    };
    if (!Array.isArray(data.i)) return null;
    return {
      inventory: data.i.map((item) => ({
        name: item.n,
        volume: item.v,
        quantity: item.q,
        room: item.r,
      })),
      mode: data.m ?? 'room',
      preset: data.p ?? null,
    };
  } catch {
    return null;
  }
}

export function getShareParamFromUrl(search: string): string | null {
  const params = new URLSearchParams(search);
  return params.get(SHARE_PARAM);
}