'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { GitCompareArrows, X, Trash2, Scale, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

import { useCompare } from './CompareContext';
import { findProduct, type BilingualText, type ProductSpecRow } from '@/data/products';
import MolecularFormula from './MolecularFormula';

type Locale = 'en' | 'zh';

export type CompareTrayLabels = {
  title: string;
  compareCta: string;
  clear: string;
  slot: string;
  modalTitle: string;
  noSpecs: string;
  close: string;
  removeSlot: string;
  empty: string;
  full: string;
};

function text(v: BilingualText | string, locale: Locale): string {
  if (typeof v === 'string') return v;
  return v[locale];
}

export default function CompareTray({
  locale,
  labels
}: {
  locale: Locale;
  labels: CompareTrayLabels;
}) {
  const { entries, remove, clear, max } = useCompare();
  const [open, setOpen] = useState(false);

  const loaded = useMemo(
    () =>
      entries
        .map((e) => {
          const match = findProduct(e.category, e.productId);
          if (!match) return null;
          return { ...match };
        })
        .filter(Boolean) as Array<NonNullable<ReturnType<typeof findProduct>>>,
    [entries]
  );

  if (entries.length === 0) return null;

  return (
    <>
      {/* Sticky tray */}
      <div
        aria-live="polite"
        className="fixed inset-x-0 bottom-0 z-40 pointer-events-none px-3 pb-3 md:px-6 md:pb-5"
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto mx-auto w-full max-w-5xl rounded-2xl bg-ink-950/95 text-white border border-white/10 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <div className="flex items-center gap-4 px-3 md:px-5 py-3">
            <span className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-accent-light">
              <Scale className="h-4 w-4" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                {labels.title}
                <span className="ml-2 text-white/40 tabular-nums">
                  {entries.length}/{max}
                </span>
              </p>
              <div className="mt-1.5 flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
                {Array.from({ length: max }).map((_, i) => {
                  const slot = loaded[i];
                  if (!slot) {
                    return (
                      <div
                        key={`slot-${i}`}
                        className="flex-shrink-0 min-w-[96px] md:min-w-[140px] h-[36px] md:h-[42px] rounded-lg border border-dashed border-white/15 flex items-center justify-center text-[10px] uppercase tracking-[0.22em] text-white/40"
                      >
                        {labels.slot} {i + 1}
                      </div>
                    );
                  }
                  const { product } = slot;
                  return (
                    <div
                      key={product.id}
                      className="group flex-shrink-0 inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-lg bg-white/10 border border-white/15"
                    >
                      <div className="leading-tight min-w-0 max-w-[180px]">
                        <p className="text-[11px] font-semibold truncate">
                          {product.shortCode || product.id}
                        </p>
                        <p className="text-[10px] text-white/55 truncate">
                          {locale === 'zh' ? product.nameZh : product.nameEn}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white/60 hover:bg-white/15 hover:text-white"
                        aria-label={labels.removeSlot}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clear}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {labels.clear}
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={entries.length < 2}
                className="inline-flex items-center gap-2 rounded-full bg-accent text-ink-950 px-4 md:px-5 py-2 text-xs md:text-sm font-semibold hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <GitCompareArrows className="h-4 w-4" />
                {labels.compareCta}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <CompareModal
        open={open}
        locale={locale}
        loaded={loaded}
        onClose={() => setOpen(false)}
        onRemove={remove}
        labels={labels}
      />
    </>
  );
}

function CompareModal({
  open,
  locale,
  loaded,
  onClose,
  onRemove,
  labels
}: {
  open: boolean;
  locale: Locale;
  loaded: Array<NonNullable<ReturnType<typeof findProduct>>>;
  onClose: () => void;
  onRemove: (id: string) => void;
  labels: CompareTrayLabels;
}) {
  if (typeof document === 'undefined') return null;

  // Build unified list of spec labels (union across all loaded products)
  const labelMap = new Map<string, BilingualText>();
  loaded.forEach(({ product }) => {
    product.details?.spec?.forEach((row: ProductSpecRow) => {
      const key = row.label.en;
      if (!labelMap.has(key)) labelMap.set(key, row.label);
    });
  });
  const unifiedLabels = Array.from(labelMap.values());

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={labels.modalTitle}
          className="fixed inset-0 z-[110] flex items-stretch justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
            aria-label={labels.close}
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[111] flex flex-col w-full max-w-6xl mx-auto my-4 md:my-8 bg-white rounded-none md:rounded-2xl overflow-hidden shadow-2xl"
          >
            <header className="flex items-center justify-between gap-4 px-5 md:px-7 py-4 border-b border-ink-100">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                  <Scale className="inline h-3.5 w-3.5 -mt-0.5" /> {labels.modalTitle}
                </p>
                <p className="mt-1 text-base md:text-lg font-semibold text-ink-900 tabular-nums">
                  {loaded.length} {locale === 'zh' ? '款产品' : 'products'}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:text-white hover:bg-ink-900 transition-colors"
                aria-label={labels.close}
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[720px]">
                <thead>
                  <tr>
                    <th scope="col" className="sticky left-0 z-10 bg-white text-left p-5 align-bottom w-48">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400">
                        {locale === 'zh' ? '参数' : 'Specification'}
                      </span>
                    </th>
                    {loaded.map(({ product, category }) => (
                      <th
                        key={product.id}
                        scope="col"
                        className="text-left align-top p-5 border-l border-ink-100 min-w-[220px]"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-800 px-2.5 py-0.5 text-[10px] font-semibold">
                              {product.shortCode || product.id}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemove(product.id)}
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-ink-400 hover:text-white hover:bg-ink-900 transition-colors"
                              aria-label={labels.removeSlot}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-ink-900 leading-snug">
                            {locale === 'zh' ? product.nameZh : product.nameEn}
                          </p>
                          {product.formula && (
                            <MolecularFormula
                              formula={product.formula}
                              className="text-xs text-ink-500"
                            />
                          )}
                          {product.cas && (
                            <p className="text-[11px] font-mono text-ink-400">
                              CAS · {product.cas}
                            </p>
                          )}
                          <a
                            href={`/${locale}/products/${category.slug}/${product.id}`}
                            className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:text-brand-800"
                          >
                            {locale === 'zh' ? '查看详情' : 'View details'}
                            <ArrowRight className="h-3 w-3" />
                          </a>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {unifiedLabels.length === 0 ? (
                    <tr>
                      <td
                        colSpan={loaded.length + 1}
                        className="p-8 text-center text-sm text-ink-500"
                      >
                        {labels.noSpecs}
                      </td>
                    </tr>
                  ) : (
                    unifiedLabels.map((label, rowIdx) => (
                      <tr
                        key={label.en}
                        className={clsx(rowIdx % 2 === 0 ? 'bg-ink-50/50' : 'bg-white')}
                      >
                        <th
                          scope="row"
                          className="sticky left-0 z-10 bg-inherit text-left align-top p-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500"
                        >
                          {label[locale]}
                        </th>
                        {loaded.map(({ product }) => {
                          const row = product.details?.spec?.find(
                            (r: ProductSpecRow) => r.label.en === label.en
                          );
                          const v = row?.value
                            ? typeof row.value === 'string'
                              ? row.value
                              : row.value[locale]
                            : '—';
                          return (
                            <td
                              key={product.id}
                              className="align-top p-5 border-l border-ink-100 text-sm text-ink-800"
                            >
                              {v}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
