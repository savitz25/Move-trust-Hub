import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Insurance Trust Hub — DOI-verified insurance agents and health hubs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function InsuranceOpenGraphImage() {
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
          background: 'linear-gradient(145deg, #064E3B 0%, #065F46 42%, #10B981 100%)',
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
              background: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
            }}
          >
            🛡️
          </div>
          Insurance Trust Hub
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 980 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
            DOI-Verified Insurance Agents
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: 'rgba(255,255,255,0.92)', maxWidth: 920 }}>
            Health insurance hubs, ACA & Medicare calculators, and 54 market directories. Zero paid
            placements.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, fontSize: 22, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>
          {['DOI Verified', 'Health Hubs', 'ACA & Medicare'].map((label) => (
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