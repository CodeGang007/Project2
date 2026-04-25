'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import clsx from 'clsx';

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  base: string;
  years: string;
  photo: string;
};

export default function Testimonials({
  items,
  prevLabel = 'Previous',
  nextLabel = 'Next'
}: {
  items: Testimonial[];
  prevLabel?: string;
  nextLabel?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = items[i];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setI((x) => (x + 1) % items.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [items.length, paused]);

  if (!items.length) return null;

  const go = (n: number) => setI((items.length + n) % items.length);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-ink-900 via-brand-900 to-ink-950 text-white border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]"
    >
      <div className="grid md:grid-cols-[1fr_320px] min-h-[420px]">
        {/* Quote */}
        <div className="relative p-7 md:p-10 lg:p-14 flex flex-col justify-between">
          <Quote
            aria-hidden
            className="h-10 w-10 md:h-12 md:w-12 text-accent-light/60"
          />

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="my-6 font-display font-medium text-2xl md:text-3xl lg:text-[2rem] leading-snug"
            >
              {t.quote}
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${i}-meta`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-end justify-between gap-6"
            >
              <div>
                <p className="text-base md:text-lg font-semibold">{t.name}</p>
                <p className="text-sm text-white/65">{t.role} · {t.base}</p>
                <p className="mt-0.5 text-[11px] font-mono uppercase tracking-[0.22em] text-white/45">
                  {t.years}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(i - 1)}
                  aria-label={prevLabel}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-ink-900 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(i + 1)}
                  aria-label={nextLabel}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-ink-900 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-6 flex items-center gap-1.5">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                aria-current={idx === i}
                className={clsx(
                  'h-1.5 rounded-full transition-all duration-300',
                  idx === i ? 'w-10 bg-accent-light' : 'w-3 bg-white/25 hover:bg-white/40'
                )}
              />
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div className="relative min-h-[260px] md:min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${i}-photo`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={t.photo}
                alt={t.name}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30 md:bg-gradient-to-l md:from-ink-950/0 md:via-transparent md:to-ink-950/40"
                aria-hidden
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
