'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import {
  FileDown,
  Search,
  ChevronRight,
  Scale,
  CheckCircle2,
  ArrowUpRight,
  Info
} from 'lucide-react';
import clsx from 'clsx';

import type { ProductCategory, ProductItem } from '@/data/products';
import MolecularFormula from './MolecularFormula';
import { useCompare } from './CompareContext';

type Locale = 'en' | 'zh';

export type ProductTableLabels = {
  search: string;
  searchPlaceholder: string;
  noResults: string;
  productName: string;
  casNumber: string;
  formula: string;
  msds: string;
  coa: string;
  compare: string;
  viewDetail: string;
  inCompare: string;
  compareFull: string;
  filterAll: string;
  matches: string;
  msdsBadge: string;
  hasDetail: string;
};

export default function ProductTable({
  category,
  locale,
  labels,
  useCoa = false
}: {
  category: ProductCategory;
  locale: Locale;
  labels: ProductTableLabels;
  useCoa?: boolean;
}) {
  const { entries, toggle, has, isFull } = useCompare();
  const [q, setQ] = useState('');
  const [activeSeries, setActiveSeries] = useState<number | 'all'>('all');

  const filteredSeries = useMemo(() => {
    const lowerQ = q.trim().toLowerCase();
    return category.series
      .map((series, sIdx) => {
        const items = series.products.filter((p) => {
          if (activeSeries !== 'all' && activeSeries !== sIdx) return false;
          if (!lowerQ) return true;
          const haystack = [
            p.nameEn,
            p.nameZh,
            p.shortCode,
            p.cas,
            p.formula,
            p.id
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          return haystack.includes(lowerQ);
        });
        return { series, sIdx, items };
      })
      .filter((s) => s.items.length > 0);
  }, [category, q, activeSeries]);

  const totalMatches = filteredSeries.reduce((acc, s) => acc + s.items.length, 0);
  const totalAll = category.series.reduce((acc, s) => acc + s.products.length, 0);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 max-w-lg">
          <label htmlFor="product-search" className="sr-only">
            {labels.search}
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              id="product-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-ink-200 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-400 hover:text-ink-900"
              >
                {locale === 'zh' ? '清除' : 'Clear'}
              </button>
            )}
          </div>
          <p className="mt-2 text-[11px] font-mono text-ink-500 tabular-nums">
            {totalMatches}/{totalAll} {labels.matches}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter by series"
          className="inline-flex items-center gap-1 rounded-full bg-ink-50 border border-ink-200/80 p-1 overflow-x-auto max-w-full no-scrollbar"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeSeries === 'all'}
            onClick={() => setActiveSeries('all')}
            className={clsx(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap',
              activeSeries === 'all'
                ? 'bg-ink-900 text-white'
                : 'text-ink-600 hover:text-ink-900'
            )}
          >
            {labels.filterAll}
          </button>
          {category.series.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={activeSeries === i}
              onClick={() => setActiveSeries(i)}
              className={clsx(
                'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap',
                activeSeries === i
                  ? 'bg-ink-900 text-white'
                  : 'text-ink-600 hover:text-ink-900'
              )}
            >
              {locale === 'zh' ? s.titleZh : s.titleEn}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {filteredSeries.length === 0 ? (
        <div className="mt-16 text-center text-sm text-ink-500">{labels.noResults}</div>
      ) : (
        <div className="mt-10 md:mt-12 space-y-14">
          {filteredSeries.map(({ series, sIdx, items }) => (
            <section key={sIdx}>
              <header className="flex items-baseline justify-between gap-4 pb-4 border-b border-ink-200/80">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 tabular-nums">
                    {String(sIdx + 1).padStart(2, '0')} · {labels.productName}
                  </p>
                  <h3 className="mt-2 h-display text-2xl md:text-3xl">
                    {locale === 'zh' ? series.titleZh : series.titleEn}
                  </h3>
                </div>
                <p className="text-xs font-mono text-ink-500 tabular-nums">
                  {items.length} {locale === 'zh' ? '款' : 'items'}
                </p>
              </header>

              <ul className="mt-2 divide-y divide-ink-100">
                {items.map((p, i) => (
                  <ProductRow
                    key={p.id}
                    product={p}
                    categorySlug={category.slug}
                    locale={locale}
                    labels={labels}
                    useCoa={useCoa}
                    index={i}
                    has={has}
                    isFull={isFull}
                    toggle={toggle}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductRow({
  product,
  categorySlug,
  locale,
  labels,
  useCoa,
  index,
  has,
  isFull,
  toggle
}: {
  product: ProductItem;
  categorySlug: string;
  locale: Locale;
  labels: ProductTableLabels;
  useCoa: boolean;
  index: number;
  has: (id: string) => boolean;
  isFull: boolean;
  toggle: (e: { category: string; productId: string }) => boolean;
}) {
  const name = locale === 'zh' ? product.nameZh : product.nameEn;
  const detailHref = product.details
    ? (`/products/${categorySlug}/${product.id}` as const)
    : null;
  const selected = has(product.id);

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.2) }}
      className="group grid grid-cols-1 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)_auto] items-center gap-4 md:gap-8 py-5 md:py-6 hover:bg-gradient-to-r hover:from-ink-50/60 hover:to-transparent transition-colors rounded-lg -mx-2 px-2"
    >
      {/* Name + short code */}
      <div className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          {product.shortCode && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 text-brand-800 px-2.5 py-0.5 text-[11px] font-semibold">
              {product.shortCode}
            </span>
          )}
          {detailHref ? (
            <Link
              href={detailHref as any}
              className="font-semibold text-base md:text-lg text-ink-900 group-hover:text-brand-800 transition-colors"
            >
              {name}
            </Link>
          ) : (
            <span className="font-semibold text-base md:text-lg text-ink-900">{name}</span>
          )}
          {detailHref && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest">
              <Info className="h-2.5 w-2.5" />
              {labels.hasDetail}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-ink-500">
          {locale === 'zh' ? product.nameEn : product.nameZh}
        </p>
      </div>

      {/* Meta: CAS, formula */}
      <div className="flex flex-col gap-1 text-xs md:text-sm">
        {product.cas && (
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 mr-2">
              {labels.casNumber}
            </span>
            <span className="font-mono text-ink-800">{product.cas}</span>
          </div>
        )}
        {product.formula && (
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 mr-2">
              {labels.formula}
            </span>
            <MolecularFormula formula={product.formula} className="text-ink-800" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 md:gap-2 justify-end flex-wrap">
        <button
          type="button"
          onClick={() => toggle({ category: categorySlug, productId: product.id })}
          disabled={!selected && isFull}
          aria-pressed={selected}
          className={clsx(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
            selected
              ? 'bg-accent text-ink-950 hover:bg-accent-light'
              : 'border border-ink-200 text-ink-700 hover:border-ink-900 hover:bg-ink-900 hover:text-white',
            !selected && isFull && 'opacity-40 cursor-not-allowed'
          )}
          title={!selected && isFull ? labels.compareFull : undefined}
        >
          {selected ? (
            <>
              <CheckCircle2 className="h-3 w-3" />
              {labels.inCompare}
            </>
          ) : (
            <>
              <Scale className="h-3 w-3" />
              {labels.compare}
            </>
          )}
        </button>

        {product.msdsUrl ? (
          <a
            href={product.msdsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 text-ink-700 px-3 py-1.5 text-xs font-semibold hover:border-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
          >
            <FileDown className="h-3 w-3" />
            {useCoa ? labels.coa : labels.msds}
            {(product.msdsSize || product.msdsLang) && (
              <span className="hidden lg:inline font-mono text-[10px] text-ink-400 group-hover:text-white/60">
                · {[product.msdsLang, product.msdsSize].filter(Boolean).join(' · ')}
              </span>
            )}
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink-200 text-ink-400 px-3 py-1.5 text-xs font-semibold">
            <FileDown className="h-3 w-3" />
            {labels.msdsBadge}
          </span>
        )}

        {detailHref ? (
          <Link
            href={detailHref as any}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-white px-3 py-1.5 text-xs font-semibold hover:bg-brand-800 transition-colors"
          >
            {labels.viewDetail}
            <ChevronRight className="h-3 w-3" />
          </Link>
        ) : product.detailHref ? (
          <a
            href={product.detailHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full text-ink-500 px-2 py-1.5 text-xs font-semibold hover:text-ink-900 transition-colors"
          >
            <ArrowUpRight className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </motion.li>
  );
}
