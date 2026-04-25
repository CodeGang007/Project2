'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import clsx from 'clsx';
import Reveal from '@/components/ui/Reveal';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  minutes: number;
};

const thumbs = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80'
];

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { year: '', monthDay: iso, full: iso };
  const year = d.getUTCFullYear();
  const monthDay = `${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(
    d.getUTCDate()
  ).padStart(2, '0')}`;
  return { year: String(year), monthDay, full: `${year}.${monthDay}` };
}

export default function NewsSection() {
  const t = useTranslations('news');
  const items = t.raw('items') as NewsItem[];

  const tabs = useMemo(() => {
    const labels = t.raw('tabs') as Record<string, string>;
    return [
      { key: 'all', label: labels.all },
      { key: 'company', label: labels.company },
      { key: 'press', label: labels.press },
      { key: 'industry', label: labels.industry }
    ];
  }, [t]);

  const [tab, setTab] = useState('all');

  const filtered = items.filter((n) => {
    if (tab === 'all') return true;
    const labelByKey: Record<string, string> = {
      company: (t.raw('tabs') as any).company,
      press: (t.raw('tabs') as any).press,
      industry: (t.raw('tabs') as any).industry
    };
    return n.category === labelByKey[tab];
  });

  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-12 md:mb-16">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                04 · {t('eyebrow')}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t('title')}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 rounded-full bg-ink-50 border border-ink-200/80 p-1">
              {tabs.map((ttab) => (
                <button
                  key={ttab.key}
                  type="button"
                  onClick={() => setTab(ttab.key)}
                  className={clsx(
                    'px-4 py-2 rounded-full text-xs font-semibold transition-all',
                    tab === ttab.key
                      ? 'bg-ink-900 text-white shadow-sm'
                      : 'text-ink-600 hover:text-ink-900'
                  )}
                >
                  {ttab.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {filtered.length === 0 && (
            <p className="col-span-full py-16 text-center text-ink-500">No articles in this category yet.</p>
          )}
          {filtered.map((n, i) => {
            const { year, monthDay, full } = formatDate(n.date);
            return (
              <Reveal key={n.id} delay={0.05 * i}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
                  <Link
                    href={`/news/${n.id}`}
                    className="group block rounded-2xl bg-white border border-ink-200/80 overflow-hidden hover:border-ink-900/20 hover:shadow-xl hover:shadow-ink-900/5 transition-all duration-400"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                      <Image
                        src={thumbs[i % thumbs.length]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                      {/* Date badge */}
                      <div className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-sm px-3 py-2 text-center shadow-sm">
                        <div className="font-display text-xl leading-none font-semibold text-ink-900">
                          {monthDay}
                        </div>
                        <div className="mt-1 font-mono text-[9px] tracking-widest text-ink-500">
                          {year}
                        </div>
                      </div>
                      {/* Category */}
                      <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-ink-900/85 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                        {n.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-[11px] text-ink-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" /> {full}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> {n.minutes} {t('minuteRead')}
                        </span>
                      </div>
                      <h3 className="mt-4 h-display text-lg md:text-xl leading-snug text-ink-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                        {n.title}
                      </h3>
                      <p className="mt-3 text-sm text-ink-500 leading-relaxed line-clamp-3">
                        {n.excerpt}
                      </p>
                      <div className="mt-5 pt-5 border-t border-ink-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-ink-900">
                          {t('readMore')}
                        </span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-500 group-hover:bg-ink-900 group-hover:border-ink-900 group-hover:text-white transition-all">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </motion.div>

        <Reveal delay={0.25}>
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-900"
            >
              <span className="border-b border-ink-900 pb-0.5">{t('cta')}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
