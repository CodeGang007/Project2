'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Layers,
  Grid3x3,
  LayoutList
} from 'lucide-react';
import clsx from 'clsx';

import MagazineCover, { type CoverIssue, type CoverLabels } from './MagazineCover';
import PdfViewerModal, { type PdfViewerLabels } from './PdfViewerModal';

type ArchiveLabels = {
  archiveEyebrow: string;
  archiveTitle: string;
  archiveLead: string;
  allYears: string;
  gridView: string;
  listView: string;
  readOnline: string;
  downloadPdf: string;
  paginationTemplate: string;
  prev: string;
  next: string;
  empty: string;
};

export default function NewsletterArchive({
  issues,
  coverLabels,
  viewerLabels,
  labels,
  pageSize = 6
}: {
  issues: CoverIssue[];
  coverLabels: CoverLabels;
  viewerLabels: PdfViewerLabels;
  labels: ArchiveLabels;
  pageSize?: number;
}) {
  const years = useMemo(() => {
    const set = new Set<string>();
    issues.forEach((i) => {
      const m = /\d{4}/.exec(i.id);
      if (m) set.add(m[0]);
    });
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [issues]);

  const [year, setYear] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [openIssue, setOpenIssue] = useState<{ issue: CoverIssue; index: number } | null>(null);

  const filtered = useMemo(() => {
    if (year === 'all') return issues;
    return issues.filter((i) => i.id.startsWith(year));
  }, [issues, year]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  const paginationText = labels.paginationTemplate
    .replace('{total}', String(filtered.length))
    .replace('{page}', String(currentPage));

  const onYearChange = (next: string) => {
    setYear(next);
    setPage(1);
  };

  return (
    <>
      {/* Header row */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
            <Layers className="h-3.5 w-3.5" />
            {labels.archiveEyebrow}
          </div>
          <h2 className="mt-5 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
            {labels.archiveTitle}
          </h2>
          <p className="mt-4 text-base text-ink-600 leading-relaxed">{labels.archiveLead}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Year filter */}
          <div
            role="tablist"
            aria-label="Filter by year"
            className="flex items-center gap-1 rounded-full bg-ink-50 border border-ink-200/80 p-1 overflow-x-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={year === 'all'}
              onClick={() => onYearChange('all')}
              className={clsx(
                'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors',
                year === 'all'
                  ? 'bg-ink-900 text-white'
                  : 'text-ink-600 hover:text-ink-900'
              )}
            >
              {labels.allYears}
            </button>
            {years.map((y) => (
              <button
                key={y}
                type="button"
                role="tab"
                aria-selected={year === y}
                onClick={() => onYearChange(y)}
                className={clsx(
                  'px-3.5 py-1.5 rounded-full text-xs font-semibold tabular-nums transition-colors',
                  year === y ? 'bg-ink-900 text-white' : 'text-ink-600 hover:text-ink-900'
                )}
              >
                {y}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="hidden md:flex items-center rounded-full border border-ink-200/80 bg-white p-1">
            <button
              type="button"
              onClick={() => setView('grid')}
              aria-pressed={view === 'grid'}
              aria-label={labels.gridView}
              className={clsx(
                'inline-flex items-center justify-center h-8 w-8 rounded-full transition-colors',
                view === 'grid' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:text-ink-900'
              )}
            >
              <Grid3x3 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              aria-pressed={view === 'list'}
              aria-label={labels.listView}
              className={clsx(
                'inline-flex items-center justify-center h-8 w-8 rounded-full transition-colors',
                view === 'list' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:text-ink-900'
              )}
            >
              <LayoutList className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {visible.length === 0 ? (
        <p className="mt-16 text-center text-ink-500">{labels.empty}</p>
      ) : view === 'grid' ? (
        <ul className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {visible.map((issue, i) => {
            const realIndex = issues.findIndex((x) => x.id === issue.id);
            const delay = Math.min(i * 0.04, 0.24);
            return (
              <motion.li
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIssue({ issue, index: realIndex })}
                  className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-xl"
                >
                  <div className="relative transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                    <MagazineCover
                      issue={issue}
                      index={realIndex}
                      labels={coverLabels}
                      size="default"
                      className="transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(8,8,7,0.35)]"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/20 transition-[box-shadow,ring] duration-500"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 text-ink-900 px-4 py-2 text-xs font-semibold shadow-lg">
                        <Eye className="h-3.5 w-3.5" />
                        {labels.readOnline}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 px-0.5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400">
                      {coverLabels.volume} · {String(realIndex + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-1.5 font-semibold text-ink-900 text-sm md:text-base leading-snug group-hover:text-brand-800 transition-colors">
                      {issue.period}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-500 line-clamp-1">{issue.title}</p>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      ) : (
        <ul className="mt-10 md:mt-14 divide-y divide-ink-100 border-y border-ink-100">
          {visible.map((issue, i) => {
            const realIndex = issues.findIndex((x) => x.id === issue.id);
            return (
              <motion.li
                key={issue.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.2) }}
                className="group py-5 md:py-6 grid grid-cols-[88px_1fr_auto] md:grid-cols-[120px_1fr_auto] gap-5 md:gap-8 items-center"
              >
                <button
                  type="button"
                  onClick={() => setOpenIssue({ issue, index: realIndex })}
                  className="block rounded-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  aria-label={`${labels.readOnline} — ${issue.period}`}
                >
                  <MagazineCover
                    issue={issue}
                    index={realIndex}
                    labels={coverLabels}
                    size="default"
                  />
                </button>

                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400">
                    {coverLabels.volume} · {String(realIndex + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1.5 font-display font-medium text-xl md:text-2xl leading-snug text-ink-900">
                    {issue.period}
                  </h3>
                  <p className="mt-1 text-sm text-ink-600">{issue.title}</p>
                  <p className="mt-2 hidden md:block text-sm text-ink-500 line-clamp-2 max-w-2xl leading-relaxed">
                    {issue.excerpt}
                  </p>
                  <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-400">
                    {issue.pages} {coverLabels.pages} · {issue.size}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenIssue({ issue, index: realIndex })}
                    className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-white px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold hover:bg-brand-800 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{labels.readOnline}</span>
                  </button>
                  <a
                    href="#"
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-ink-200 text-ink-800 px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold hover:border-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{labels.downloadPdf}</span>
                  </a>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}

      {/* Pagination */}
      <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-5">
        <p className="text-sm text-ink-500 order-2 md:order-1 font-mono">{paginationText}</p>

        <nav
          aria-label="Archive pagination"
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

      <PdfViewerModal
        open={!!openIssue}
        onClose={() => setOpenIssue(null)}
        issue={openIssue?.issue ?? null}
        issueIndex={openIssue?.index ?? 0}
        labels={viewerLabels}
        coverLabels={coverLabels}
      />
    </>
  );
}
