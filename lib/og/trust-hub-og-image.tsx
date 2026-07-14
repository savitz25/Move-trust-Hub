import React from 'react';
import type { TrustHubOgConfig } from '@/lib/og/trust-hub-og-config';
import { TRUST_HUB_LOGO_VERSION } from '@/lib/hub/config';

const NAVY = '#0A2540';
const TEAL = '#00BFA5';
const LOGO_URL = `https://www.movetrusthub.com/logo.png?v=${TRUST_HUB_LOGO_VERSION}`;

function Illustration({ vertical }: { vertical: TrustHubOgConfig['vertical'] }) {
  if (vertical === 'move') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 18,
          width: 360,
          height: 360,
        }}
      >
        <div
          style={{
            width: 300,
            height: 120,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${NAVY} 0%, #1E4A6F 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 220,
              height: 72,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.14)',
              border: '2px solid rgba(255,255,255,0.22)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 28,
              top: 24,
              width: 56,
              height: 56,
              borderRadius: 28,
              background: TEAL,
              opacity: 0.9,
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 72,
                height: 72,
                borderRadius: 10,
                background: i === 1 ? TEAL : '#E8F4F8',
                border: `2px solid ${i === 1 ? TEAL : '#C5DDE8'}`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            width: 140,
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '70px solid transparent',
              borderRight: '70px solid transparent',
              borderBottom: `48px solid ${NAVY}`,
            }}
          />
          <div
            style={{
              width: 120,
              height: 52,
              background: '#F8FAFC',
              border: `3px solid ${NAVY}`,
              borderTop: 'none',
            }}
          />
        </div>
      </div>
    );
  }

  if (vertical === 'lender') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          width: 360,
          height: 360,
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            background: `linear-gradient(145deg, ${TEAL}22 0%, #E8F8F5 100%)`,
            border: `3px solid ${TEAL}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 88,
              height: 100,
              borderRadius: 12,
              background: NAVY,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 14,
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '36px solid transparent',
                borderRight: '36px solid transparent',
                borderBottom: `28px solid #F8FAFC`,
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
          {[72, 96, 58].map((h, i) => (
            <div
              key={i}
              style={{
                width: 44,
                height: h,
                borderRadius: 8,
                background: i === 1 ? TEAL : '#D6E8F0',
              }}
            />
          ))}
        </div>
        <div
          style={{
            width: 120,
            height: 48,
            borderRadius: 24,
            background: NAVY,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          %
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 360,
        height: 360,
        position: 'relative',
      }}
    >
      <div
        style={{
          width: 260,
          height: 260,
          borderRadius: 130,
          background: `linear-gradient(145deg, ${TEAL}33 0%, #E8F8F5 70%)`,
          border: `4px solid ${TEAL}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 120,
            height: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '60px solid transparent',
              borderRight: '60px solid transparent',
              borderBottom: `42px solid ${NAVY}`,
            }}
          />
          <div
            style={{
              width: 100,
              height: 58,
              background: '#F8FAFC',
              border: `3px solid ${NAVY}`,
              borderTop: 'none',
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 48,
          width: 72,
          height: 88,
          borderRadius: '36px 36px 8px 36px',
          background: NAVY,
          opacity: 0.92,
        }}
      />
    </div>
  );
}

export function TrustHubOgImage({ config }: { config: TrustHubOgConfig }) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #FFFFFF 0%, #F4FAFB 45%, #E8F6F3 100%)',
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Helvetica Neue, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 420,
          height: 420,
          borderRadius: 210,
          background: `radial-gradient(circle, ${TEAL}18 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 36,
          paddingBottom: 8,
        }}
      >
        <img src={LOGO_URL} alt="Move Trust Hub" width={420} height={113} />
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          padding: '12px 64px 48px',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 680,
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: NAVY,
            }}
          >
            {config.headline}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              lineHeight: 1.3,
              color: TEAL,
            }}
          >
            {config.subHeadline}
          </div>
          <div
            style={{
              fontSize: 20,
              lineHeight: 1.4,
              color: '#4A6275',
              maxWidth: 620,
            }}
          >
            {config.supportingText}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
            {config.trustBadges.map((badge) => (
              <span
                key={badge}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 999,
                  background: '#FFFFFF',
                  border: `1.5px solid ${TEAL}55`,
                  color: NAVY,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: TEAL,
                  }}
                />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <Illustration vertical={config.vertical} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 28,
          right: 48,
          fontSize: 17,
          fontWeight: 600,
          color: '#6B8296',
          letterSpacing: '0.01em',
        }}
      >
        {config.domain}
      </div>
    </div>
  );
}