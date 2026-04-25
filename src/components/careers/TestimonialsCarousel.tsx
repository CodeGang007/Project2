'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react';
import clsx from 'clsx';

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  base?: string;
  years?: string;
  photo?: string;
};

export default function TestimonialsCarousel({
  items,
  labels
}: {
  items: Testimonial[];
  labels: { prev: string; next: string; pause: string; play: string };
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  if (items.length === 0) return null;

  const current = items[active];

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-[1fr_minmax(280px,420px)] gap-y-10 lg:gap-x-12 items-stretch">
        {/* Quote */}
        <div className="relative flex flex-col justify-between rounded-2xl bg-gradient-to-br from-ink-900 via-brand-900/90 to-ink-950 text-white p-8 md:p-12 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-[260px] w-[260px] rounded-full bg-accent/15 blur-3xl"
          />
          <Quote
            aria-hidden
            className="h-12 w-12 text-accent-light/70"
          />

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 mb-10 font-display font-medium text-2xl md:text-3xl leading-snug tracking-tight"
            >
              "{current.quote}"
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.figcaption
              key={`caption-${active}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <div>
                <p className="font-semibold text-base">{current.name}</p>
                <p className="text-sm text-white/65">
                  {current.role}
                  {current.base && <> · {current.base}</>}
                </p>
                {current.years && (
                  <p className="mt-0.5 text-[11px] font-mono uppercase tracking-[0.22em] text-white/50">
                    {current.years}
                  </p>
                )}
              </div>
            </motion.figcaption>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActive((i) => (i - 1 + items.length) % items.length)}
              aria-label={labels.prev}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActive((i) => (i + 1) % items.length)}
              aria-label={labels.next}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/50 tabular-nums">
              {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? labels.play : labels.pause}
              className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full text-white/50 hover:text-white transition-colors"
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Photo + thumbnails */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`photo-${active}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ink-900"
            >
              {current.photo && (
                <Image
                  src={current.photo}
                  alt={current.name}
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="object-cover"
                />
              )}
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent"
                aria-hidden
              />
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="flex gap-2">
              {items.map((it, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  aria-label={it.name}
                  className={clsx(
                    'relative flex-1 aspect-[4/5] max-w-[80px] overflow-hidden rounded-lg bg-ink-900 transition-all',
                    active === i ? 'ring-2 ring-accent' : 'opacity-60 hover:opacity-100'
                  )}
                >
                  {it.photo && (
                    <Image
                      src={it.photo}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
