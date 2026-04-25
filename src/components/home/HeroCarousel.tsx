'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import clsx from 'clsx';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Phone } from 'lucide-react';

type Slide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
};

const slideImages = [
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80'
];

const INTERVAL = 5000;

export default function HeroCarousel() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const slides = t.raw('slides') as Slide[];
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);

  const go = useCallback(
    (i: number) => setCurrent((i + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, reduce, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const slide = slides[current];
  const count = slides.length;

  const onTouchStart = (e: React.TouchEvent) => (dragStart.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragStart.current === null) return;
    const delta = e.changedTouches[0].clientX - dragStart.current;
    if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
    dragStart.current = null;
  };

  return (
    <section
      className="relative h-[100svh] min-h-[640px] max-h-[960px] w-full overflow-hidden bg-ink-950 text-white"
      aria-roledescription="carousel"
      aria-label={locale === 'zh' ? '首页主图轮播' : 'Homepage hero'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background images */}
      {slideImages.map((src, i) => (
        <AnimatePresence key={src} initial={false}>
          {i === current && (
            <motion.div
              key={`${src}-${current}`}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: reduce ? 0 : 0.9, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
                quality={85}
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Multi-layer wash — cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950/85 via-ink-950/40 to-brand-900/30" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,7,0.55)_100%)]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" aria-hidden />

      {/* Content */}
      <div className="relative z-10 container-wide h-full flex flex-col">
        {/* Main content centered */}
        <div className="flex-1 flex flex-col justify-center pt-16 pb-32 md:pb-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.12 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-light animate-pulse" />
                {slide.eyebrow}
              </div>

              {/* Giant locale-appropriate tagline (brand tagline across slides) */}
              <h1 className="mt-8 font-medium tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]">
                <span className="block bg-gradient-to-r from-white via-white to-accent-light/90 bg-clip-text text-transparent">
                  {locale === 'zh' ? t('taglineCn1') : t('taglineEn1')}
                </span>
                <span className="block mt-2 bg-gradient-to-r from-brand-200 via-white to-white bg-clip-text text-transparent">
                  {locale === 'zh' ? t('taglineCn2') : t('taglineEn2')}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-white/70 font-light tracking-wide">
                {locale === 'zh' ? t('taglineEnSub') : t('taglineCnSub')}
              </p>

              {/* Slide-specific title/subtitle as secondary info */}
              <div className="mt-10 flex flex-col md:flex-row md:items-end gap-4 md:gap-8 max-w-3xl">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40 font-semibold">
                    {slide.title}
                  </p>
                  <p className="mt-2 text-base md:text-lg text-white/85">{slide.subtitle}</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-ink-900 pl-6 pr-5 py-3.5 text-sm font-semibold hover:bg-accent-light transition-colors duration-200 shadow-lg shadow-black/30"
                >
                  {t('ctaPrimary')}
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-white group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/15 hover:border-white/50 transition-all"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {t('ctaSecondary')}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom control rail */}
        <div className="absolute bottom-6 md:bottom-8 left-5 md:left-12 right-5 md:right-12 z-10 flex items-center justify-between gap-4 md:gap-6">
          {/* Index + dot rail */}
          <div className="flex items-center gap-4 md:gap-6 flex-1 max-w-lg">
            <span className="font-mono text-xs tracking-widest tabular-nums text-white/70 shrink-0">
              <span className="text-white font-semibold text-base">
                {String(current + 1).padStart(2, '0')}
              </span>
              <span className="mx-1 text-white/30">/</span>
              {String(count).padStart(2, '0')}
            </span>
            <div className="flex-1 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="group flex-1 py-3 relative"
                >
                  <span
                    className={clsx(
                      'block h-[2px] w-full transition-all duration-300',
                      i === current ? 'bg-white' : 'bg-white/25 group-hover:bg-white/50'
                    )}
                  />
                  {/* Progress fill */}
                  {i === current && !paused && !reduce && (
                    <motion.span
                      key={`progress-${current}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                      style={{ transformOrigin: 'left' }}
                      className="absolute inset-x-0 top-3 h-[2px] bg-accent-light"
                      aria-hidden
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Arrows + pause */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? t('play') : t('pause')}
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label={t('prev')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t('next')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute left-1/2 top-auto bottom-24 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50"
          aria-hidden
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">{t('scroll')}</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-8 w-px bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
