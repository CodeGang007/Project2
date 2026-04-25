import clsx from 'clsx';

export type CoverIssue = {
  id: string;
  title: string;
  period: string;
  excerpt: string;
  pages: number;
  size: string;
};

export type CoverLabels = {
  pdfTag: string;
  pages: string;
  size: string;
  volume: string;
};

const palettes = [
  {
    key: 'blue',
    bg: 'bg-gradient-to-br from-brand-600 via-brand-800 to-ink-950',
    accent: 'text-accent-light',
    stripe: 'bg-accent'
  },
  {
    key: 'emerald',
    bg: 'bg-gradient-to-br from-emerald-700 via-emerald-900 to-ink-950',
    accent: 'text-emerald-200',
    stripe: 'bg-emerald-300'
  },
  {
    key: 'amber',
    bg: 'bg-gradient-to-br from-amber-600 via-orange-800 to-ink-950',
    accent: 'text-amber-200',
    stripe: 'bg-amber-300'
  },
  {
    key: 'rose',
    bg: 'bg-gradient-to-br from-rose-600 via-rose-900 to-ink-950',
    accent: 'text-rose-200',
    stripe: 'bg-rose-300'
  },
  {
    key: 'cyan',
    bg: 'bg-gradient-to-br from-cyan-600 via-blue-900 to-ink-950',
    accent: 'text-cyan-200',
    stripe: 'bg-cyan-300'
  },
  {
    key: 'lime',
    bg: 'bg-gradient-to-br from-lime-700 via-green-900 to-ink-950',
    accent: 'text-lime-200',
    stripe: 'bg-lime-300'
  },
  {
    key: 'fuchsia',
    bg: 'bg-gradient-to-br from-fuchsia-700 via-purple-900 to-ink-950',
    accent: 'text-fuchsia-200',
    stripe: 'bg-fuchsia-300'
  }
];

// Generative SVG decoration — one of several per index for visual variety
function CoverPattern({ index }: { index: number }) {
  const variant = index % 4;

  if (variant === 0) {
    // Connected molecule dots
    return (
      <svg
        aria-hidden
        viewBox="0 0 100 140"
        className="absolute inset-0 h-full w-full opacity-25"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="white" strokeWidth="0.3">
          <line x1="10" y1="20" x2="40" y2="40" />
          <line x1="40" y1="40" x2="75" y2="30" />
          <line x1="40" y1="40" x2="55" y2="75" />
          <line x1="55" y1="75" x2="85" y2="90" />
          <line x1="55" y1="75" x2="25" y2="110" />
          <line x1="25" y1="110" x2="65" y2="125" />
        </g>
        <g fill="white">
          <circle cx="10" cy="20" r="1.5" />
          <circle cx="40" cy="40" r="2.5" />
          <circle cx="75" cy="30" r="1.8" />
          <circle cx="55" cy="75" r="3" />
          <circle cx="85" cy="90" r="1.5" />
          <circle cx="25" cy="110" r="2" />
          <circle cx="65" cy="125" r="1.8" />
        </g>
      </svg>
    );
  }

  if (variant === 1) {
    // Concentric circles
    return (
      <svg
        aria-hidden
        viewBox="0 0 100 140"
        className="absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="white" strokeWidth="0.4">
          {[10, 22, 34, 46, 58, 70, 82].map((r) => (
            <circle key={r} cx="80" cy="25" r={r} />
          ))}
        </g>
      </svg>
    );
  }

  if (variant === 2) {
    // Diagonal grid of dots
    return (
      <svg
        aria-hidden
        viewBox="0 0 100 140"
        className="absolute inset-0 h-full w-full opacity-30"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="white" />
          </pattern>
        </defs>
        <rect width="100" height="140" fill="url(#dots)" />
      </svg>
    );
  }

  // Orbit / atom
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 140"
      className="absolute inset-0 h-full w-full opacity-25"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="white" strokeWidth="0.35">
        <ellipse cx="50" cy="70" rx="40" ry="15" transform="rotate(20 50 70)" />
        <ellipse cx="50" cy="70" rx="40" ry="15" transform="rotate(-20 50 70)" />
        <ellipse cx="50" cy="70" rx="40" ry="15" transform="rotate(90 50 70)" />
      </g>
      <circle cx="50" cy="70" r="2.5" fill="white" />
    </svg>
  );
}

export default function MagazineCover({
  issue,
  index,
  labels,
  size = 'default',
  className
}: {
  issue: CoverIssue;
  index: number;
  labels: CoverLabels;
  size?: 'default' | 'large';
  className?: string;
}) {
  const palette = palettes[index % palettes.length];

  return (
    <div
      className={clsx(
        'relative overflow-hidden text-white shadow-2xl shadow-ink-950/30',
        palette.bg,
        size === 'large' ? 'rounded-2xl' : 'rounded-xl',
        className
      )}
      style={{ aspectRatio: '3 / 4' }}
    >
      {/* Decorative pattern */}
      <CoverPattern index={index} />

      {/* Top-left accent stripe */}
      <span
        aria-hidden
        className={clsx(
          'absolute left-0 top-0 h-1 w-16',
          palette.stripe
        )}
      />

      {/* Grain overlay */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.35] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]"
      />

      {/* Content */}
      <div
        className={clsx(
          'relative h-full flex flex-col justify-between',
          size === 'large' ? 'p-7 md:p-9' : 'p-5 md:p-6'
        )}
      >
        {/* Top masthead */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className={clsx(
                'font-mono font-semibold uppercase tracking-[0.28em]',
                palette.accent,
                size === 'large' ? 'text-[11px]' : 'text-[9px]'
              )}
            >
              DANA · 德纳内刊
            </p>
            <p
              className={clsx(
                'mt-1 text-white/60',
                size === 'large' ? 'text-[11px]' : 'text-[9px]'
              )}
            >
              {labels.volume} · No. {String(index + 1).padStart(2, '0')}
            </p>
          </div>
          <span
            className={clsx(
              'inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white/90 font-semibold uppercase tracking-widest',
              size === 'large' ? 'px-3 py-1 text-[10px]' : 'px-2 py-0.5 text-[9px]'
            )}
          >
            {labels.pdfTag}
          </span>
        </div>

        {/* Middle period */}
        <div>
          <p
            className={clsx(
              'font-display font-medium leading-[0.95] tracking-tight',
              size === 'large'
                ? 'text-4xl md:text-5xl lg:text-6xl'
                : 'text-2xl md:text-3xl'
            )}
          >
            {issue.period}
          </p>
          <div
            className={clsx(
              'mt-3 h-px w-12 bg-white/40',
              size === 'large' && 'w-16'
            )}
            aria-hidden
          />
          <p
            className={clsx(
              'mt-3 text-white/85 font-medium leading-snug',
              size === 'large' ? 'text-base md:text-lg' : 'text-xs md:text-sm'
            )}
          >
            {issue.title}
          </p>
        </div>

        {/* Bottom meta */}
        <div>
          <p
            className={clsx(
              'text-white/65 leading-snug line-clamp-3',
              size === 'large' ? 'text-sm' : 'text-[10.5px]'
            )}
          >
            {issue.excerpt}
          </p>
          <div
            className={clsx(
              'mt-4 flex items-center justify-between font-mono text-white/55 uppercase tracking-widest',
              size === 'large' ? 'text-[11px]' : 'text-[9px]'
            )}
          >
            <span>
              {issue.pages} {labels.pages}
            </span>
            <span>{issue.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
