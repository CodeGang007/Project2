'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  Tag,
  MapPin
} from 'lucide-react';
import clsx from 'clsx';

export type NewsItem = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  excerpt: string;
  category: string;
  tags?: string[];
  author?: string;
  location?: string;
  minutes?: number;
  coverImage?: string;
  body?: string[];
};

export type CategoryFilter = {
  key: string;
  label: string;
  match?: string[];
};

type Labels = {
  searchPlaceholder: string;
  searchEmpty: string;
  viewDetails: string;
  filterCount: string;
  minuteRead: string;
  paginationTemplate: string;
  prev: string;
  next: string;
};

export default function NewsArchive({
  items,
  categories,
  labels,
  locale,
  pageSize = 6
}: {
  items: NewsItem[];
  categories: CategoryFilter[];
  labels: Labels;
  locale: 'en' | 'zh';
  pageSize?: number;
}) {
  const [cat, setCat] = useState<string>('all');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const active = categories.find((c) => c.key === cat);
    return items.filter((item) => {
      if (cat !== 'all' && active?.match && !active.match.includes(item.category))
        return false;
      if (!query) return true;
      const hay = [
        item.title,
        item.subtitle,
        item.excerpt,
        item.author,
        item.location,
        ...(item.tags ?? [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(query);
    });
  }, [items, cat, q, categories]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  const paginationText = labels.paginationTemplate
    .replace('{total}', String(filtered.length))
    .replace('{page}', String(currentPage));

  const onCat = (key: string) => {
    setCat(key);
    setPage(1);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Category chips */}
        <div
          role="tablist"
          aria-label="Filter by category"
          className="inline-flex items-center gap-1 rounded-full bg-ink-50 border border-ink-200/80 p-1 overflow-x-auto max-w-full no-scrollbar"
        >
          {categories.map((c) => {
            const active = cat === c.key;
            return (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onCat(c.key)}
                className={clsx(
                  'px-3.5 md:px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors',
                  active
                    ? 'bg-ink-900 text-white'
                    : 'text-ink-600 hover:text-ink-900'
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex-1 lg:max-w-sm">
          <label htmlFor="news-search" className="sr-only">
            {labels.searchPlaceholder}
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              id="news-search"
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder={labels.searchPlaceholder}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-ink-200 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
            />
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-400 tabular-nums">
        {filtered.length} {labels.filterCount}
      </p>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="mt-16 text-center text-sm text-ink-500">{labels.searchEmpty}</p>
      ) : (
        <ul className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {visible.map((item, i) => (
            <NewsCard
              key={item.id}
              item={item}
              index={i}
              viewDetailsLabel={labels.viewDetails}
              minuteLabel={labels.minuteRead}
              locale={locale}
            />
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-5">
        <p className="text-sm text-ink-500 order-2 md:order-1 font-mono">{paginationText}</p>

        <nav
          aria-label="News pagination"
          className="order-1 md:order-2 inline-flex items-center gap-1 rounded-full border border-ink-200/80 bg-white p-1"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            aria-label={labels.prev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-600 hover:text-ink-900 hover:bg-ink-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            const active = n === currentPage;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'min-w-9 h-9 px-3 rounded-full text-sm font-semibold tabular-nums transition-colors',
                  active
                    ? 'bg-ink-900 text-white'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50'
                )}
              >
                {n}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            aria-label={labels.next}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-600 hover:text-ink-900 hover:bg-ink-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink-600 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>
  );
}

function NewsCard({
  item,
  index,
  viewDetailsLabel,
  minuteLabel,
  locale
}: {
  item: NewsItem;
  index: number;
  viewDetailsLabel: string;
  minuteLabel: string;
  locale: 'en' | 'zh';
}) {
  const d = new Date(item.date);
  const ok = !Number.isNaN(d.getTime());
  const day = ok ? String(d.getUTCDate()).padStart(2, '0') : '';
  const ym = ok
    ? `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
    : item.date;

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.2), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/news/${item.id}` as any}
        className="group flex flex-col h-full rounded-2xl overflow-hidden border border-ink-200/80 bg-white hover:border-ink-900/20 hover:shadow-[0_25px_50px_-20px_rgba(8,8,7,0.2)] transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
          {item.coverImage && (
            <Image
              src={item.coverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent"
            aria-hidden
          />

          {/* Stacked date badge */}
          <div className="absolute top-5 left-5 rounded-xl bg-white/95 backdrop-blur-sm text-ink-900 px-3 py-2 font-mono leading-tight tabular-nums shadow-sm">
            <p className="text-2xl font-semibold leading-none">{day}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500">
              {ym}
            </p>
          </div>

          <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-ink-950/70 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
            <Tag className="h-2.5 w-2.5" />
            {item.category}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-5 md:p-6 flex-1">
          <h3 className="font-display font-medium text-lg md:text-xl leading-snug text-ink-900 group-hover:text-brand-800 transition-colors line-clamp-2">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-sm text-ink-500 line-clamp-2">{item.subtitle}</p>
          )}

          <p className="text-sm text-ink-600 leading-relaxed line-clamp-3 flex-1">
            {item.excerpt}
          </p>

          <div className="mt-auto pt-4 border-t border-ink-100 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-ink-400">
            <span className="inline-flex items-center gap-3">
              {item.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </span>
              )}
              {item.minutes != null && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.minutes} {minuteLabel}
                </span>
              )}
            </span>
            <span className="inline-flex items-center gap-1 text-ink-900 group-hover:text-brand-800 transition-colors">
              {viewDetailsLabel}
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
