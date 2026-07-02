import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Lender Trust Hub — NMLS-verified mortgage lenders by county';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function LenderOpenGraphImage() {
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
          background: 'linear-gradient(145deg, #0A2540 0%, #1E3A5F 42%, #3B82F6 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, fontWeight: 700 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #34D058 0%, #3B82F6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
            }}
          >
            🏦
          </div>
          Lender Trust Hub
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 980 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
            NMLS-Verified Mortgage Lenders
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: 'rgba(255,255,255,0.92)', maxWidth: 920 }}>
            Compare county-level lenders, FDIC banks, and free mortgage calculators. Zero paid
            placements.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, fontSize: 22, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>
          {['NMLS Verified', 'County Insights', 'Free Calculators'].map((label) => (
            <span
              key={label}
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}