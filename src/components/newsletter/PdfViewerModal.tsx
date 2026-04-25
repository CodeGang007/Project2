'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, FileText, Maximize2, Minimize2 } from 'lucide-react';
import clsx from 'clsx';

import MagazineCover, { type CoverIssue, type CoverLabels } from './MagazineCover';

export type PdfViewerLabels = {
  title: string;
  close: string;
  download: string;
  share: string;
  placeholder: string;
  pdfBadge: string;
  pages: string;
  size: string;
};

export default function PdfViewerModal({
  issue,
  issueIndex,
  open,
  onClose,
  pdfUrl,
  labels,
  coverLabels
}: {
  issue: CoverIssue | null;
  issueIndex: number;
  open: boolean;
  onClose: () => void;
  pdfUrl?: string;
  labels: PdfViewerLabels;
  coverLabels: CoverLabels;
}) {
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {open && issue && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${labels.title} — ${issue.period}`}
          className="fixed inset-0 z-[100] flex items-stretch justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Backdrop */}
          <button
            aria-label={labels.close}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: 40, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              'relative z-[101] flex flex-col w-full max-w-6xl mx-auto my-4 md:my-8 bg-white rounded-none md:rounded-2xl overflow-hidden shadow-2xl',
              expanded && 'max-w-[calc(100vw-2rem)] md:my-4'
            )}
          >
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-ink-100 px-4 md:px-6 py-3.5 bg-white">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <FileText className="h-4 w-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                  {labels.title}
                </p>
                <p className="truncate text-sm md:text-base font-semibold text-ink-900">
                  {issue.period}
                  <span className="ml-2 hidden sm:inline text-ink-400 font-normal">
                    · {issue.title}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:text-ink-900 hover:bg-ink-50 transition-colors"
                aria-label={expanded ? 'Collapse' : 'Expand'}
              >
                {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:text-white hover:bg-ink-900 transition-colors"
                aria-label={labels.close}
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Body */}
            <div className="grid md:grid-cols-[300px_1fr] flex-1 min-h-0 bg-ink-50">
              {/* Side panel — cover + meta */}
              <aside className="hidden md:flex flex-col gap-5 p-6 border-r border-ink-100 bg-white">
                <MagazineCover
                  issue={issue}
                  index={issueIndex}
                  labels={coverLabels}
                  size="default"
                />
                <dl className="space-y-2.5 text-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                      {labels.pages}
                    </dt>
                    <dd className="text-ink-900 font-medium">{issue.pages}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                      {labels.size}
                    </dt>
                    <dd className="text-ink-900 font-medium">{issue.size}</dd>
                  </div>
                </dl>

                <p className="text-sm text-ink-600 leading-relaxed border-t border-ink-100 pt-4">
                  {issue.excerpt}
                </p>

                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href={pdfUrl || '#'}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    {labels.download}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof navigator !== 'undefined' && navigator.share) {
                        navigator.share({
                          title: issue.title,
                          text: `${issue.period} — ${issue.title}`,
                          url: typeof window !== 'undefined' ? window.location.href : ''
                        }).catch(() => {});
                      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                        navigator.clipboard
                          .writeText(typeof window !== 'undefined' ? window.location.href : '')
                          .catch(() => {});
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 text-ink-800 px-5 py-2.5 text-sm font-semibold hover:border-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    {labels.share}
                  </button>
                </div>
              </aside>

              {/* Viewer */}
              <div className="relative flex-1 min-h-[60vh] md:min-h-0 bg-ink-900/90">
                {pdfUrl ? (
                  <iframe
                    title={`${issue.title} — ${issue.period}`}
                    src={pdfUrl}
                    className="absolute inset-0 h-full w-full border-0 bg-ink-100"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="max-w-md text-center">
                      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md">
                        <FileText className="h-7 w-7" />
                      </div>
                      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
                        {labels.pdfBadge}
                      </p>
                      <p className="mt-3 text-base text-white/80 leading-relaxed">
                        {labels.placeholder}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile action bar */}
            <div className="md:hidden border-t border-ink-100 bg-white p-3 flex gap-2">
              <a
                href={pdfUrl || '#'}
                download
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 text-white px-4 py-2.5 text-sm font-semibold"
              >
                <Download className="h-4 w-4" />
                {labels.download}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 text-ink-800 px-4 py-2.5 text-sm font-semibold"
              >
                {labels.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
