'use client';

type FacebookSignInButtonProps = {
  disabled?: boolean;
  onStart?: () => void;
};

function FacebookLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.026 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.026 24 18.1 24 12.073z"
      />
    </svg>
  );
}

/**
 * Facebook Login via server OAuth kickoff — matches Meta "Continue with Facebook" styling.
 * @see https://developers.facebook.com/docs/facebook-login/web/login-button
 */
export function FacebookSignInButton({ disabled = false, onStart }: FacebookSignInButtonProps) {
  const handleClick = () => {
    onStart?.();
    window.location.assign('/api/auth/facebook');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label="Continue with Facebook"
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#1877F2]/30 bg-background px-4 text-sm font-medium text-[#1877F2] transition-colors hover:bg-[#1877F2]/5 disabled:pointer-events-none disabled:opacity-50"
    >
      <FacebookLogo className="h-5 w-5 shrink-0" />
      <span>Continue with Facebook</span>
    </button>
  );
}