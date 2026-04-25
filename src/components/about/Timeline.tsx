'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

type Milestone = { year: string; title: string; body: string };

const milestoneImages = [
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1530305408560-82d13781b33a?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=700&q=80'
];

export default function Timeline({ milestones }: { milestones: Milestone[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const p = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      setProgress(p);
      setCanScroll({ left: el.scrollLeft > 10, right: el.scrollLeft < maxScroll - 10 });
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [milestones.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div ref={sectionRef} className="relative">
      {/* Nav + progress */}
      <div className="flex items-center gap-5 mb-8">
        <div className="flex-1 h-[3px] rounded-full bg-ink-200 overflow-hidden">
          <motion.div
            animate={{ width: `${Math.max(8, progress * 100)}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent"
          />
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canScroll.left}
            aria-label="Previous"
            className={clsx(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all',
              canScroll.left
                ? 'border-ink-300 text-ink-900 hover:bg-ink-900 hover:text-white hover:border-ink-900'
                : 'border-ink-200 text-ink-300 cursor-not-allowed'
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canScroll.right}
            aria-label="Next"
            className={clsx(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all',
              canScroll.right
                ? 'border-ink-300 text-ink-900 hover:bg-ink-900 hover:text-white hover:border-ink-900'
                : 'border-ink-200 text-ink-300 cursor-not-allowed'
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        className="relative -mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12 flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {milestones.map((m, i) => (
          <motion.article
            key={m.year + m.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            className="group snap-start shrink-0 w-[280px] md:w-[320px] lg:w-[340px] rounded-2xl bg-white border border-ink-200/80 overflow-hidden hover:shadow-xl hover:shadow-ink-900/5 hover:border-ink-900/20 transition-all duration-400"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 to-ink-100">
              {/* Milestone image */}
              <img
                src={milestoneImages[i % milestoneImages.length]}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-ink-900/60 via-ink-900/30 to-transparent"
                aria-hidden
              />
              <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-900">
                Milestone · {String(i + 1).padStart(2, '0')}
              </div>
              <div className="absolute bottom-4 left-4 font-display font-medium text-white text-5xl md:text-6xl leading-none tracking-tight drop-shadow-lg">
                {m.year}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-medium text-ink-900 leading-snug">
                {m.title}
              </h3>
              <p className="mt-3 text-sm text-ink-600 leading-relaxed line-clamp-4">{m.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
