import { cn } from '@/lib/utils';

type HeroIconProps = {
  className?: string;
};

/** Interstate moving — delivery truck with packed boxes. */
export function MovingHeroIcon({ className }: HeroIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="6" y="26" width="32" height="16" rx="2.5" fill="#0077D4" />
      <path d="M38 26h11l5 7v9H38V26Z" fill="#003366" />
      <rect x="10" y="29" width="7" height="7" rx="1" fill="#B8E4FF" />
      <rect x="19" y="29" width="7" height="7" rx="1" fill="#B8E4FF" />
      <rect x="28" y="29" width="6" height="7" rx="1" fill="#B8E4FF" />
      <circle cx="17" cy="44" r="3.5" fill="#003366" />
      <circle cx="17" cy="44" r="1.5" fill="#F7F8FA" />
      <circle cx="45" cy="44" r="3.5" fill="#003366" />
      <circle cx="45" cy="44" r="1.5" fill="#F7F8FA" />
      <path d="M4 20h10l3.5 6H4V20Z" fill="#00C6FF" />
      <path
        d="M50 16h7v5h-7l-1.5-2.5L50 16Z"
        fill="#0077D4"
      />
      <path
        d="M52 14v8M55.5 16l3.5-1.5v5l-3.5-1.5"
        stroke="#003366"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Mortgage lending — home with key and rising rate trend. */
export function LendingHeroIcon({ className }: HeroIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 11 12 28v20h14V37h12v11h14V28 32 11Z"
        fill="#3B82F6"
      />
      <path d="M27 37h10v11H27V37Z" fill="#DBEAFE" />
      <circle cx="32" cy="23" r="3.5" fill="#0A2540" />
      <rect x="40" y="34" width="14" height="14" rx="2.5" fill="#0A2540" />
      <path
        d="M43 43h8M44 40v6"
        stroke="#93C5FD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M44 44 47 41l3 2 4-5"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="40" r="2" fill="#93C5FD" />
    </svg>
  );
}

/** Insurance — protective shield with umbrella and checkmark. */
export function InsuranceHeroIcon({ className }: HeroIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 9 11 19v13c0 11.5 8.8 17.8 21 23.5C44.2 49.8 53 43.5 53 32V19 32 9Z"
        fill="#059669"
      />
      <path
        d="M32 15v32c-8-3.8-13.5-8.8-13.5-15V21L32 15Z"
        fill="#10B981"
      />
      <path
        d="M20 27c0-6.6 5.4-12 12-12s12 5.4 12 12"
        stroke="#ECFDF5"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M32 17v3M25.5 20.5l1.8 2.8M38.5 20.5l-1.8 2.8"
        stroke="#ECFDF5"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M27 37.5 31 42l9-11"
        stroke="#ECFDF5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}