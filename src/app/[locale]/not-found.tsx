import { Link } from '@/i18n/routing';
import { Compass, Home, ArrowRight } from 'lucide-react';

export default function LocaleNotFound() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white min-h-[80vh] flex items-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-500/20 blur-3xl"
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
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
          <Compass className="h-3 w-3" />
          404
        </p>
        <h1 className="mt-6 font-display font-semibold text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
          404
        </h1>
        <p className="mt-6 text-2xl md:text-3xl font-medium leading-snug">
          We couldn&apos;t find that page.
        </p>
        <p className="mt-3 text-base md:text-lg text-white/70 leading-relaxed">
          The link may be out of date, or the page has moved. Try one of these instead.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent text-ink-950 px-5 py-3 text-sm font-semibold hover:bg-accent-light transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-3 text-sm font-semibold hover:bg-white hover:text-ink-900 transition-colors"
          >
            Browse products
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/sitemap"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-3 text-sm font-semibold hover:bg-white hover:text-ink-900 transition-colors"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </section>
  );
}
