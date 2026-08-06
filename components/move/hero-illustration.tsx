/**
 * Soft geometric hub + house/truck mark for the hero.
 * CSS/SVG only — no marketplace stock art. Omit on very small screens via parent.
 */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden
    >
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-[280px]"
      >
        {/* Soft radial base */}
        <defs>
          <radialGradient id="moveHeroGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#FF7A4D" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="moveTruck" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF7A4D" />
            <stop offset="100%" stopColor="#FF5A1F" />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="150" rx="130" ry="100" fill="url(#moveHeroGlow)" />

        {/* Hub nodes (echo brand mark) */}
        <circle cx="160" cy="88" r="7" fill="#0A2540" />
        <circle cx="120" cy="118" r="5" fill="#FF5A1F" />
        <circle cx="200" cy="118" r="5" fill="#FF7A4D" />
        <circle cx="140" cy="148" r="4.5" fill="#0A2540" opacity="0.7" />
        <circle cx="180" cy="148" r="4.5" fill="#FF5A1F" opacity="0.85" />
        <path
          d="M160 88 L120 118 M160 88 L200 118 M120 118 L140 148 M200 118 L180 148 M140 148 L180 148"
          stroke="#0A2540"
          strokeWidth="1.5"
          strokeOpacity="0.25"
        />

        {/* House (simple isometric-ish) */}
        <path
          d="M72 168 L112 140 L152 168 L152 208 L72 208 Z"
          fill="#fff"
          stroke="#0A2540"
          strokeWidth="1.75"
          strokeOpacity="0.35"
        />
        <path d="M72 168 L112 140 L152 168" fill="#FF5A1F" fillOpacity="0.15" stroke="#FF5A1F" strokeWidth="1.5" />
        <rect x="104" y="184" width="16" height="24" rx="1" fill="#0A2540" fillOpacity="0.12" />

        {/* Moving truck */}
        <rect x="168" y="176" width="88" height="36" rx="4" fill="url(#moveTruck)" />
        <rect x="248" y="186" width="28" height="26" rx="3" fill="#0A2540" fillOpacity="0.85" />
        <circle cx="188" cy="218" r="9" fill="#0A2540" fillOpacity="0.75" />
        <circle cx="188" cy="218" r="4" fill="#fff" fillOpacity="0.5" />
        <circle cx="248" cy="218" r="9" fill="#0A2540" fillOpacity="0.75" />
        <circle cx="248" cy="218" r="4" fill="#fff" fillOpacity="0.5" />
        {/* Bracket hint */}
        <path
          d="M48 120 L48 100 L58 100 M272 100 L282 100 L282 120 M48 180 L48 200 L58 200 M272 200 L282 200 L282 180"
          stroke="#FF5A1F"
          strokeWidth="2"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
