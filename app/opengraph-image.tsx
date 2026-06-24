import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Move Trust Hub — free interstate moving quotes from licensed long-distance movers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(145deg, #071525 0%, #0B3D6B 42%, #0077D4 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #34D058 0%, #0077D4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
            }}
          >
            🏠
          </div>
          Move Trust Hub
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
            }}
          >
            Free Interstate Moving Quotes
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: 'rgba(255,255,255,0.92)',
              maxWidth: 920,
            }}
          >
            Compare licensed long-distance movers by price, reviews, and FMCSA ratings.
            Save time and money on your move.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 22,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          <span
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            FMCSA Verified
          </span>
          <span
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            Free Quotes
          </span>
          <span
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            Trusted Reviews
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}