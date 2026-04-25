'use client';

import { useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function LocaleError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error to console / monitoring during dev
    // eslint-disable-next-line no-console
    console.error('[locale error boundary]', error);
  }, [error]);

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white min-h-[80vh] flex items-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-rose-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '56px 56px'
        }}
      />

      <div className="relative container-wide py-20 max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-300">
          <AlertTriangle className="h-3 w-3" />
          Unexpected error
        </p>
        <h1 className="mt-6 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
          Something went wrong on this page.
        </h1>
        <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
          The error has been logged. Try again — if it persists, head back home or contact us.
        </p>

        {error?.digest && (
          <p className="mt-4 font-mono text-[11px] tracking-widest text-white/40">
            ref · {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-accent text-ink-950 px-5 py-3 text-sm font-semibold hover:bg-accent-light transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-3 text-sm font-semibold hover:bg-white hover:text-ink-900 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
