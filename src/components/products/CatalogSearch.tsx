'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { Search, ArrowRight } from 'lucide-react';

import { getAllProducts } from '@/data/products';
import MolecularFormula from './MolecularFormula';

type Locale = 'en' | 'zh';

export default function CatalogSearch({
  locale,
  placeholder,
  emptyLabel,
  viewLabel,
  categoryMap
}: {
  locale: Locale;
  placeholder: string;
  emptyLabel: string;
  viewLabel: string;
  categoryMap: Record<string, string>;
}) {
  const [q, setQ] = useState('');
  const all = useMemo(() => getAllProducts(), []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return all
      .filter(({ product }) => {
        const haystack = [
          product.nameEn,
          product.nameZh,
          product.shortCode,
          product.cas,
          product.formula,
          product.id
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(query);
      })
      .slice(0, 12);
  }, [q, all]);

  const showPanel = q.trim().length > 0;

  return (
    <div className="relative max-w-2xl">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50"
          aria-hidden
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full pl-11 pr-28 py-3.5 md:py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm md:text-base text-white placeholder:text-white/55 focus:border-accent-light focus:outline-none focus:bg-white/15 transition-colors"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50 hover:text-white"
          >
            {locale === 'zh' ? '清除' : 'Clear'}
          </button>
        )}
      </div>

      {showPanel && (
        <div className="absolute left-0 right-0 top-full mt-3 rounded-2xl bg-white text-ink-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] border border-ink-200/80 overflow-hidden z-30">
          {results.length === 0 ? (
            <div className="p-6 text-sm text-ink-500">{emptyLabel}</div>
          ) : (
            <ul className="max-h-96 overflow-y-auto divide-y divide-ink-100">
              {results.map(({ product, category, seriesTitle }) => (
                <li key={`${category}-${product.id}`}>
                  <Link
                    href={
                      (product.details
                        ? `/products/${category}/${product.id}`
                        : `/products/${category}`) as any
                    }
                    onClick={() => setQ('')}
                    className="group grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 hover:bg-ink-50 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400">
                        {categoryMap[category] ?? category} ·{' '}
                        {locale === 'zh' ? seriesTitle.zh : seriesTitle.en}
                      </p>
                      <p className="mt-1 font-semibold truncate">
                        {product.shortCode && (
                          <span className="inline-flex items-center rounded-full bg-brand-50 text-brand-800 px-2 py-0.5 text-[10px] font-semibold mr-2">
                            {product.shortCode}
                          </span>
                        )}
                        {locale === 'zh' ? product.nameZh : product.nameEn}
                      </p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-ink-500">
                        {product.cas && <span className="font-mono">CAS · {product.cas}</span>}
                        {product.formula && (
                          <MolecularFormula formula={product.formula} />
                        )}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 group-hover:text-brand-800 whitespace-nowrap">
                      {viewLabel}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
