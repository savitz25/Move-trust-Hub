import type { ReactNode } from 'react';
import { ImageResponse } from 'next/og';
import {
  moveFallbackShareModel,
  type MoveShareCardModel,
} from '@/lib/seo/share-card-model';

export const MOVE_OG_SIZE = { width: 1200, height: 630 };
export const MOVE_OG_CONTENT_TYPE = 'image/png';

const FALLBACK_ALT =
  'MoveTrustHub — independent moving company research and moving tools';

function HubMark() {
  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 14,
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
          width: 9,
          height: 9,
          borderRadius: 9,
          background: '#FF5A1F',
          top: 11,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 9,
          height: 9,
          borderRadius: 9,
          background: '#38BDF8',
          left: 11,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 9,
          height: 9,
          borderRadius: 9,
          background: '#0D9488',
          right: 11,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 9,
          height: 9,
          borderRadius: 9,
          background: '#A855F7',
          bottom: 11,
        }}
      />
    </div>
  );
}

function MoveShareFrame({
  children,
  accentBar,
}: {
  children: ReactNode;
  accentBar: boolean;
}) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '52px 64px',
        background: 'linear-gradient(145deg, #071525 0%, #0A2540 48%, #1a3a55 100%)',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        position: 'relative',
      }}
    >
      {accentBar ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            background: '#FF5A1F',
          }}
        />
      ) : null}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <HubMark />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#FF5A1F',
              }}
            >
              MOVE
            </div>
            <div
              style={{
                fontSize: 16,
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
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          ASK TRUST HUB NETWORK
        </div>
      </div>
      {children}
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
  );
}

function MoveShareInner({ model }: { model: MoveShareCardModel }) {
  if (model.kind === 'fallback') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 980 }}>
        <div
          style={{
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}
        >
          {model.title}
        </div>
        {model.subtitle ? (
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.35,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {model.subtitle}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1040 }}>
      {model.eyebrow ? (
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '0.14em',
            color: '#FF5A1F',
          }}
        >
          {model.eyebrow}
        </div>
      ) : null}
      <div
        style={{
          fontSize: 58,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
        }}
      >
        {model.title}
      </div>
      {model.subtitle ? (
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          {model.subtitle}
        </div>
      ) : null}
      {model.fact ? (
        <div
          style={{
            marginTop: 8,
            fontSize: 24,
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          {model.fact}
        </div>
      ) : null}
    </div>
  );
}

export function renderMoveShareImage(model: MoveShareCardModel = moveFallbackShareModel()) {
  return new ImageResponse(
    (
      <MoveShareFrame accentBar={model.kind !== 'fallback'}>
        <MoveShareInner model={model} />
      </MoveShareFrame>
    ),
    { ...MOVE_OG_SIZE },
  );
}

export function renderMoveFallbackImage() {
  return renderMoveShareImage(moveFallbackShareModel());
}

export { FALLBACK_ALT as MOVE_OG_FALLBACK_ALT };
