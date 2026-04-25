'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  User,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Tag,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import clsx from 'clsx';

export type ContactFormLabels = {
  name: string;
  namePlaceholder: string;
  company: string;
  companyPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  interest: string;
  interestAny: string;
  department: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitted: string;
  invalid: string;
  consent: string;
};

export type Option = { value: string; label: string };

export default function ContactFormPro({
  labels,
  productOptions,
  departmentOptions
}: {
  labels: ContactFormLabels;
  productOptions: Option[];
  departmentOptions: Option[];
}) {
  const [status, setStatus] = useState<'idle' | 'error' | 'loading' | 'success'>('idle');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value?.trim() ?? '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim() ?? '';
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    window.setTimeout(() => setStatus('success'), 700);
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-white border border-ink-200/80 p-8 md:p-10 text-center shadow-[0_25px_50px_-25px_rgba(8,8,7,0.2)]"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink-950">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <p className="mt-5 text-lg md:text-xl font-semibold text-ink-900 max-w-md mx-auto">
            {labels.submitted}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          onSubmit={onSubmit}
          noValidate
          className="rounded-2xl bg-white border border-ink-200/80 p-6 md:p-8 shadow-[0_25px_50px_-25px_rgba(8,8,7,0.15)] space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field id="name" icon={User} label={labels.name} placeholder={labels.namePlaceholder} required />
            <Field id="company" icon={Building2} label={labels.company} placeholder={labels.companyPlaceholder} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field id="email" type="email" icon={Mail} label={labels.email} placeholder={labels.emailPlaceholder} required />
            <Field id="phone" icon={Phone} label={labels.phone} placeholder={labels.phonePlaceholder} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <SelectField id="interest" icon={Tag} label={labels.interest} options={[{ value: 'any', label: labels.interestAny }, ...productOptions]} />
            <SelectField id="department" icon={Briefcase} label={labels.department} options={departmentOptions} />
          </div>

          <div>
            <label htmlFor="message" className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
              <MessageSquare className="inline h-3 w-3 -mt-0.5" /> {labels.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder={labels.messagePlaceholder}
              className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {status === 'error' && <p className="text-xs text-rose-600">{labels.invalid}</p>}

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-ink-100">
            <p className="text-[11px] text-ink-400 max-w-xs">{labels.consent}</p>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors disabled:opacity-60"
            >
              <Send className="h-3.5 w-3.5" />
              {labels.submit}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
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
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
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

function SelectField({
  id,
  label,
  icon: Icon,
  options
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  options: Option[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
        <Icon className="inline h-3 w-3 -mt-0.5" /> {label}
      </label>
      <div className="relative mt-1.5">
        <select
          id={id}
          name={id}
          defaultValue={options[0]?.value}
          className={clsx(
            'appearance-none w-full rounded-xl border border-ink-200 bg-white pl-3.5 pr-10 py-2.5 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100'
          )}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-400 pointer-events-none" />
      </div>
    </div>
  );
}
