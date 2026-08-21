import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'MoveTrustHub — independent moving company research and moving tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default OG / Twitter card — Move orange + navy, with a quiet Ask network mark.
 */
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
          padding: '56px 64px',
          background: 'linear-gradient(145deg, #071525 0%, #0A2540 48%, #1a3a55 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 16,
                background: 'rgba(255,90,31,0.12)',
                border: '2px solid #FF5A1F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  background: '#FF5A1F',
                  top: 12,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  background: '#38BDF8',
                  left: 12,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  background: '#0D9488',
                  right: 12,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  background: '#A855F7',
                  bottom: 12,
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#FF5A1F',
                }}
              >
                MOVE
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                TRUST HUB
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.72)',
            }}
          >
            ASK TRUST HUB NETWORK
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
            }}
          >
            Plan your move with better information
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.35,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 900,
            }}
          >
            Mover research · licensing · calculators · comparisons
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            Independent consumer research
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#FF5A1F',
            }}
          >
            movetrusthub.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
