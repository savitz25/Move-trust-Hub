import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Insurance Trust Hub — independent DOI-verified insurance research';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Dynamic OG fallback — Shield navy + Shield Blue (not emerald).
 * Prefer static /insurance/brand/insurance-trust-hub-og.png in metadata.
 */
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
          background: 'linear-gradient(145deg, #071525 0%, #0A2540 48%, #0d3a66 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 26,
            fontWeight: 700,
            color: '#7dd3fc',
            letterSpacing: '0.04em',
          }}
        >
          INSURANCE TRUST HUB
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 980 }}>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
            Independent insurance research
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 920,
            }}
          >
            Licensed agencies, educational tools, and DOI re-check pathways. No paid placements.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 20,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          {['DOI Verified', 'Health Hubs', 'ACA & Medicare'].map((label) => (
            <span
              key={label}
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                background: 'rgba(0, 119, 212, 0.25)',
                border: '1px solid rgba(125, 211, 252, 0.35)',
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
