import { cn } from '@/lib/utils';

type HeroIconProps = {
  className?: string;
};

/** Interstate moving — box truck with cargo bay, cab, and packed boxes. */
export function MovingHeroIcon({ className }: HeroIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cargo box — tall moving van body */}
      <rect x="7" y="15" width="30" height="24" rx="2" fill="#0077D4" />
      <path d="M7 19h30" stroke="#005FA3" strokeWidth="1.25" />
      <path
        d="M12 22h20M12 27h20M12 32h20"
        stroke="#B8E4FF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Cab — separate from cargo (box-truck profile) */}
      <path d="M37 22h13l5 6v11H37V22Z" fill="#003366" />
      <path d="M39 24h9l3.5 4.5V33H39V24Z" fill="#B8E4FF" />
      <path d="M37 22v17" stroke="#005FA3" strokeWidth="1.25" />

      {/* Bumper & exhaust stack */}
      <rect x="52" y="34" width="3" height="3" rx="0.75" fill="#003366" />
      <rect x="54" y="26" width="1.5" height="6" rx="0.75" fill="#64748B" />

      {/* Wheels — rear axle + front cab axle */}
      <circle cx="18" cy="43" r="4" fill="#003366" />
      <circle cx="18" cy="43" r="2" fill="#F7F8FA" />
      <circle cx="46" cy="43" r="4" fill="#003366" />
      <circle cx="46" cy="43" r="2" fill="#F7F8FA" />

      {/* Packed boxes beside the truck */}
      <rect x="4" y="30" width="6" height="6" rx="1" fill="#00C6FF" />
      <rect x="4" y="24" width="5" height="5" rx="1" fill="#4DB8FF" />
      <path
        d="M5 27h3M5.5 25.5v3"
        stroke="#0077D4"
        strokeWidth="0.75"
        strokeLinecap="round"
      />

      {/* Motion arrow — interstate move */}
      <path
        d="M54 14h6M58 12l3 2-3 2"
        stroke="#0077D4"
        strokeWidth="2"
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