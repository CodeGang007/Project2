'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  CheckCircle2,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
  Linkedin
} from 'lucide-react';
import clsx from 'clsx';

export type ApplyLabels = {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  linkedin: string;
  linkedinPlaceholder: string;
  resume: string;
  resumeHint: string;
  resumeBrowse: string;
  resumeReplace: string;
  resumeMissing: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitted: string;
  invalid: string;
  close: string;
  consent: string;
};

const MAX_BYTES = 8 * 1024 * 1024;

export default function JobApplicationModal({
  open,
  onClose,
  jobTitle,
  labels,
  locale
}: {
  open: boolean;
  onClose: () => void;
  jobTitle: string;
  labels: ApplyLabels;
  locale: 'en' | 'zh';
}) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'loading' | 'success'>('idle');
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);

  // Reset state when closed
  useEffect(() => {
    if (!open) {
      setStatus('idle');
      setErrMsg(null);
      setFile(null);
    }
  }, [open]);

  const acceptFile = (f: File | null | undefined) => {
    if (!f) return;
    if (f.size > MAX_BYTES) {
      setErrMsg(locale === 'zh' ? '文件超过 8 MB 上限。' : 'File exceeds the 8 MB limit.');
      setStatus('error');
      return;
    }
    if (
      !/\.(pdf|docx?|rtf)$/i.test(f.name) &&
      !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(f.type)
    ) {
      setErrMsg(locale === 'zh' ? '请上传 PDF 或 DOCX 文件。' : 'Please upload a PDF or DOCX file.');
      setStatus('error');
      return;
    }
    setFile(f);
    if (status === 'error') {
      setStatus('idle');
      setErrMsg(null);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value?.trim() ?? '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim() ?? '';
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value?.trim() ?? '';

    if (!file) {
      setErrMsg(labels.resumeMissing);
      setStatus('error');
      return;
    }
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 6) {
      setErrMsg(labels.invalid);
      setStatus('error');
      return;
    }

    setErrMsg(null);
    setStatus('loading');
    window.setTimeout(() => setStatus('success'), 700);
  };

  if (!mounted) return null;

  const formatBytes = (n: number) => {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(2)} MB`;
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
            className="relative z-[121] w-full max-w-2xl mx-auto my-4 md:my-0 bg-white rounded-none md:rounded-2xl overflow-hidden shadow-2xl max-h-[100dvh] md:max-h-[92dvh] flex flex-col"
          >
            <header className="flex items-start justify-between gap-4 px-5 md:px-7 py-5 border-b border-ink-100 flex-shrink-0">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                  {labels.title}
                </p>
                <p className="mt-1 text-lg md:text-xl font-semibold text-ink-900">
                  {jobTitle}
                </p>
                <p className="mt-1 text-sm text-ink-500">{labels.subtitle}</p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label={labels.close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:text-white hover:bg-ink-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {status === 'success' ? (
              <div className="p-8 md:p-12 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink-950">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <p className="mt-5 text-lg md:text-xl font-semibold text-ink-900 max-w-md mx-auto">
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
              <form onSubmit={onSubmit} noValidate className="flex flex-col flex-1 min-h-0">
                <div className="overflow-y-auto p-5 md:p-7 space-y-5">
                  {/* Resume upload */}
                  <div>
                    <label
                      htmlFor="resume"
                      className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500"
                    >
                      <Upload className="inline h-3 w-3 -mt-0.5" /> {labels.resume}
                    </label>
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        acceptFile(e.dataTransfer?.files?.[0]);
                      }}
                      className={clsx(
                        'mt-1.5 relative rounded-2xl border-2 border-dashed p-5 text-center transition-colors cursor-pointer',
                        dragOver
                          ? 'border-brand-500 bg-brand-50'
                          : file
                          ? 'border-accent bg-accent/5'
                          : 'border-ink-200 hover:border-ink-400 bg-ink-50/40'
                      )}
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                    >
                      <input
                        ref={fileInputRef}
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="sr-only"
                        onChange={(e) => acceptFile(e.target.files?.[0])}
                      />

                      {file ? (
                        <div className="flex items-center gap-3 text-left">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink-950">
                            <FileText className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-ink-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-ink-500 font-mono">
                              {formatBytes(file.size)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                            className="text-xs font-semibold text-ink-700 hover:text-brand-800 underline underline-offset-2"
                          >
                            {labels.resumeReplace}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-2">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-100 text-ink-600">
                            <Upload className="h-4 w-4" />
                          </span>
                          <p className="text-sm text-ink-700">
                            <span className="font-semibold underline underline-offset-2 text-brand-800">
                              {labels.resumeBrowse}
                            </span>{' '}
                            <span className="text-ink-500">
                              {locale === 'zh' ? '或拖放至此' : 'or drop here'}
                            </span>
                          </p>
                          <p className="text-[11px] font-mono text-ink-400">
                            {labels.resumeHint}
                          </p>
                        </div>
                      )}
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
                      id="email"
                      type="email"
                      icon={Mail}
                      label={labels.email}
                      placeholder={labels.emailPlaceholder}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      id="phone"
                      icon={Phone}
                      label={labels.phone}
                      placeholder={labels.phonePlaceholder}
                      required
                    />
                    <Field
                      id="linkedin"
                      icon={Linkedin}
                      label={labels.linkedin}
                      placeholder={labels.linkedinPlaceholder}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500"
                    >
                      {labels.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder={labels.messagePlaceholder}
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </div>

                  {status === 'error' && errMsg && (
                    <p role="alert" className="text-xs text-rose-600">
                      {errMsg}
                    </p>
                  )}

                  <p className="text-[11px] text-ink-400">{labels.consent}</p>
                </div>

                <footer className="flex items-center justify-end gap-2 px-5 md:px-7 py-4 border-t border-ink-100 bg-ink-50/50 flex-shrink-0">
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
                </footer>
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
