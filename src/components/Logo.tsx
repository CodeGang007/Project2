import clsx from 'clsx';

export default function Logo({
  variant = 'light',
  showSubtitle = true,
  className
}: {
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
  className?: string;
}) {
  const wordmark = variant === 'dark' ? 'text-white' : 'text-ink-900';
  const subtitle = variant === 'dark' ? 'text-white/60' : 'text-ink-500';

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        aria-hidden
        className="shrink-0"
      >
        <defs>
          <linearGradient id="dynai-swoosh-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a73a6" />
            <stop offset="100%" stopColor="#0c243a" />
          </linearGradient>
          <linearGradient id="dynai-swoosh-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f2c94c" />
            <stop offset="100%" stopColor="#c7a24b" />
          </linearGradient>
        </defs>
        {/* Outer blue curved swoosh */}
        <path
          d="M22 4 C32.5 4 41 12.5 41 23 C41 31 36 37.5 29 40"
          fill="none"
          stroke="url(#dynai-swoosh-blue)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Inner gold swoosh */}
        <path
          d="M15 40 C8 37.5 3 31 3 23 C3 15.5 8 9 15 6"
          fill="none"
          stroke="url(#dynai-swoosh-gold)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Central molecule dot */}
        <circle cx="22" cy="22" r="3" fill="url(#dynai-swoosh-blue)" />
      </svg>
      <div className="leading-none">
        <div className={clsx('font-semibold tracking-[0.18em] text-[15px] md:text-base', wordmark)}>
          DYNAMIC
        </div>
        {showSubtitle && (
          <div className={clsx('mt-1 text-[10px] md:text-[11px] tracking-[0.25em]', subtitle)}>
            德纳股份
          </div>
        )}
      </div>
    </div>
  );
}
