'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
  Cpu,
  Layers3,
  Atom,
  Sparkles,
  Leaf,
  Gauge,
  PaintBucket
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

type Category = { slug: string; name: string; tagline?: string };

const icons = [FlaskConical, Cpu, Layers3, Atom, Sparkles, Leaf, Gauge, PaintBucket];

export default function ProductsSection() {
  const t = useTranslations('products');
  const categories = t.raw('categories') as Category[];

  return (
    <section className="relative overflow-hidden section bg-ink-950 text-white">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[700px] rounded-full bg-brand-600/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-accent/15 blur-[140px]"
      />
      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
      />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
                03 · {t('eyebrow')}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t('title')}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                {t('tagline')}
              </p>
            </Reveal>
          </div>
        </div>

        {/* 8-card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={c.slug} delay={0.04 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <Link
                    href={`/products/${c.slug}` as any}
                    className="group relative block h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 overflow-hidden hover:border-white/20 hover:bg-white/[0.06] transition-all duration-400"
                  >
                    {/* Hover gradient */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-brand-500/15 via-transparent to-accent/10 transition-opacity duration-500"
                    />

                    <div className="relative flex items-start justify-between">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 flex items-center justify-center text-accent-light group-hover:from-accent/25 group-hover:border-accent/40 transition-all duration-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-[11px] tracking-widest text-white/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="relative mt-6 text-base md:text-lg font-semibold leading-snug tracking-tight">
                      {c.name}
                    </h3>
                    {c.tagline && (
                      <p className="relative mt-3 text-[13px] text-white/55 leading-relaxed line-clamp-2">
                        {c.tagline}
                      </p>
                    )}

                    <div className="relative mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
                        View series
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 group-hover:bg-white group-hover:text-ink-900 group-hover:border-white transition-all">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              {categories.length} series · {'dozens of SKUs'}
            </p>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-ink-900 pl-6 pr-5 py-3 text-sm font-semibold hover:bg-accent-light transition-colors"
            >
              {t('cta')}
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-white group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
