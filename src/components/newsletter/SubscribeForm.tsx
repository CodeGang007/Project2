'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';

export type SubscribeLabels = {
  placeholder: string;
  submit: string;
  submitted: string;
  legal: string;
  invalid: string;
};

export default function SubscribeForm({ labels }: { labels: SubscribeLabels }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success' | 'loading'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    window.setTimeout(() => setStatus('success'), 650);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-4 md:p-5 text-white"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink-950">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <p className="text-sm md:text-base font-medium">{labels.submitted}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
            noValidate
            className="group"
          >
            <div className="relative flex items-center rounded-full bg-white/8 border border-white/15 backdrop-blur-md focus-within:border-accent-light focus-within:bg-white/12 transition-colors">
              <Mail
                aria-hidden
                className="absolute left-5 h-4 w-4 text-white/60 group-focus-within:text-accent-light"
              />
              <label htmlFor="newsletter-email" className="sr-only">
                {labels.placeholder}
              </label>
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={labels.placeholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                aria-invalid={status === 'error'}
                className="w-full bg-transparent pl-12 pr-36 sm:pr-44 py-3.5 text-sm md:text-base text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-1.5 inline-flex items-center gap-2 rounded-full bg-accent text-ink-950 pl-4 pr-3 py-2 text-sm font-semibold hover:bg-accent-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">{labels.submit}</span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-950 text-accent-light">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </button>
            </div>

            <p
              className={`mt-3 text-xs leading-relaxed ${
                status === 'error' ? 'text-rose-300' : 'text-white/55'
              }`}
              aria-live="polite"
            >
              {status === 'error' ? labels.invalid : labels.legal}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
