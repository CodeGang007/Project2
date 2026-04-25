'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  X,
  CheckCircle2,
  Building2,
  Mail,
  Beaker,
  MessageSquare,
  User
} from 'lucide-react';
import clsx from 'clsx';

export type QuoteLabels = {
  buttonQuote: string;
  buttonSample: string;
  title: string;
  subtitle: string;
  productLabel: string;
  name: string;
  namePlaceholder: string;
  company: string;
  companyPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  quantity: string;
  quantityPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitted: string;
  invalid: string;
  close: string;
  purpose: string;
  purposeQuote: string;
  purposeSample: string;
};

export default function RequestQuoteButton({
  productLabel,
  variant = 'quote',
  className,
  labels
}: {
  productLabel: string;
  variant?: 'quote' | 'sample' | 'both';
  className?: string;
  labels: QuoteLabels;
}) {
  const [open, setOpen] = useState(false);
  const [purpose, setPurpose] = useState<'quote' | 'sample'>(
    variant === 'sample' ? 'sample' : 'quote'
  );

  return (
    <>
      {variant === 'both' ? (
        <div className={clsx('inline-flex items-center gap-2', className)}>
          <button
            type="button"
            onClick={() => {
              setPurpose('quote');
              setOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-white px-4 md:px-5 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
            {labels.buttonQuote}
          </button>
          <button
            type="button"
            onClick={() => {
              setPurpose('sample');
              setOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 text-ink-800 px-4 md:px-5 py-2.5 text-sm font-semibold hover:border-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
          >
            <Beaker className="h-3.5 w-3.5" />
            {labels.buttonSample}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setPurpose(variant);
            setOpen(true);
          }}
          className={clsx(
            'inline-flex items-center gap-2 rounded-full bg-ink-900 text-white px-4 md:px-5 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors',
            className
          )}
        >
          {variant === 'sample' ? (
            <Beaker className="h-3.5 w-3.5" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          {variant === 'sample' ? labels.buttonSample : labels.buttonQuote}
        </button>
      )}

      <QuoteModal
        open={open}
        onClose={() => setOpen(false)}
        productLabel={productLabel}
        labels={labels}
        purpose={purpose}
        setPurpose={setPurpose}
      />
    </>
  );
}

function QuoteModal({
  open,
  onClose,
  productLabel,
  purpose,
  setPurpose,
  labels
}: {
  open: boolean;
  onClose: () => void;
  productLabel: string;
  purpose: 'quote' | 'sample';
  setPurpose: (p: 'quote' | 'sample') => void;
  labels: QuoteLabels;
}) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'loading' | 'success'>('idle');
  const closeBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim() ?? '';
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value?.trim() ?? '';
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    window.setTimeout(() => setStatus('success'), 650);
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={labels.title}
          className="fixed inset-0 z-[120] flex items-stretch md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            onClick={onClose}
            aria-label={labels.close}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[121] w-full max-w-2xl mx-auto my-4 md:my-0 bg-white rounded-none md:rounded-2xl overflow-hidden shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 px-5 md:px-7 py-5 border-b border-ink-100">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                  {labels.title}
                </p>
                <p className="mt-1 text-lg md:text-xl font-semibold text-ink-900">
                  {productLabel}
                </p>
                <p className="mt-1 text-sm text-ink-500">{labels.subtitle}</p>
              </div>
              <button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                aria-label={labels.close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:text-white hover:bg-ink-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {status === 'success' ? (
              <div className="p-8 md:p-10 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink-950">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <p className="mt-5 text-lg md:text-xl font-semibold text-ink-900">
                  {labels.submitted}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors"
                >
                  {labels.close}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="p-5 md:p-7 space-y-5">
                {/* Purpose toggle */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                    {labels.purpose}
                  </p>
                  <div className="mt-2 inline-flex rounded-full bg-ink-50 border border-ink-200/80 p-1">
                    {(['quote', 'sample'] as const).map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setPurpose(k)}
                        className={clsx(
                          'px-4 py-1.5 rounded-full text-xs font-semibold transition-colors',
                          purpose === k
                            ? 'bg-ink-900 text-white'
                            : 'text-ink-600 hover:text-ink-900'
                        )}
                      >
                        {k === 'quote' ? labels.purposeQuote : labels.purposeSample}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    id="name"
                    icon={User}
                    label={labels.name}
                    placeholder={labels.namePlaceholder}
                    required
                  />
                  <Field
                    id="company"
                    icon={Building2}
                    label={labels.company}
                    placeholder={labels.companyPlaceholder}
                  />
                </div>
                <Field
                  id="email"
                  type="email"
                  icon={Mail}
                  label={labels.email}
                  placeholder={labels.emailPlaceholder}
                  required
                />
                <Field
                  id="quantity"
                  icon={Beaker}
                  label={labels.quantity}
                  placeholder={labels.quantityPlaceholder}
                />
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500"
                  >
                    <MessageSquare className="inline h-3 w-3 -mt-0.5" /> {labels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder={labels.messagePlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-rose-600">{labels.invalid}</p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-ink-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold text-ink-500 hover:text-ink-900 transition-colors"
                  >
                    {labels.close}
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors disabled:opacity-60"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {labels.submit}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Field({
  id,
  label,
  placeholder,
  icon: Icon,
  type = 'text',
  required
}: {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500"
      >
        <Icon className="inline h-3 w-3 -mt-0.5" /> {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}
