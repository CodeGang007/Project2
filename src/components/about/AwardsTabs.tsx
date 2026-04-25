'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Crown, Zap, Handshake, Heart, BadgeCheck } from 'lucide-react';
import clsx from 'clsx';

type Award = { title: string; year: string };
type Category = {
  key: string;
  label: string;
  icon: string;
  items: Award[];
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  zap: Zap,
  handshake: Handshake,
  heart: Heart
};

export default function AwardsTabs({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0]?.key ?? '');
  const current = categories.find((c) => c.key === active) ?? categories[0];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Award;
          const isActive = cat.key === active;
          const count = cat.items.length;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              className={clsx(
                'group inline-flex items-center gap-2.5 rounded-full px-4 md:px-5 py-2.5 text-sm font-semibold transition-all duration-300 border',
                isActive
                  ? 'bg-ink-900 text-white border-ink-900 shadow-lg shadow-ink-900/10'
                  : 'bg-white text-ink-700 border-ink-200 hover:border-ink-400 hover:text-ink-900'
              )}
              aria-pressed={isActive}
            >
              <Icon className={clsx('h-4 w-4', isActive ? 'text-accent-light' : 'text-ink-500')} />
              <span>{cat.label}</span>
              <span
                className={clsx(
                  'inline-flex h-5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums',
                  isActive ? 'bg-accent text-ink-900' : 'bg-ink-100 text-ink-600'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Items */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {current?.items.map((a, i) => (
            <li
              key={a.title + i}
              className="group relative rounded-2xl bg-white border border-ink-200/80 p-6 hover:border-ink-900/20 hover:shadow-lg hover:shadow-ink-900/5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 text-accent">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-ink-400">
                  {a.year}
                </span>
              </div>
              <h4 className="mt-5 text-base font-semibold text-ink-900 leading-snug">
                {a.title}
              </h4>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-500 to-accent group-hover:w-full transition-all duration-500"
              />
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
