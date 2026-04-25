'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  GraduationCap,
  Users,
  ChevronDown,
  Send,
  Calendar,
  CircleDot,
  CircleCheck
} from 'lucide-react';
import clsx from 'clsx';

import JobApplicationModal, { type ApplyLabels } from './JobApplicationModal';

export type JobItem = {
  id: string;
  title: string;
  positions: number;
  location: string;
  education: string;
  major: string;
  posted?: string;
  responsibilities?: string[];
  requirements?: string[];
};

export type JobsTableLabels = {
  // filters
  search: string;
  all: string;
  location: string;
  education: string;
  noResults: string;
  showing: string;
  campusBadge: string;
  socialBadge: string;
  // table
  no: string;
  title: string;
  positions: string;
  locationCol: string;
  educationCol: string;
  major: string;
  apply: string;
  expand: string;
  collapse: string;
  responsibilities: string;
  requirements: string;
  posted: string;
};

export default function JobsTable({
  jobs,
  variant,
  locale,
  labels,
  applyLabels
}: {
  jobs: JobItem[];
  variant: 'campus' | 'social';
  locale: 'en' | 'zh';
  labels: JobsTableLabels;
  applyLabels: ApplyLabels;
}) {
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('all');
  const [edu, setEdu] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [applying, setApplying] = useState<JobItem | null>(null);

  const locations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => set.add(j.location));
    return Array.from(set);
  }, [jobs]);

  const educations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => set.add(j.education));
    return Array.from(set);
  }, [jobs]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return jobs.filter((j) => {
      if (loc !== 'all' && j.location !== loc) return false;
      if (edu !== 'all' && j.education !== edu) return false;
      if (!query) return true;
      const hay = [j.title, j.location, j.education, j.major]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(query);
    });
  }, [jobs, q, loc, edu]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3 mb-6">
        <div className="flex-1">
          <label htmlFor={`search-${variant}`} className="sr-only">
            {labels.search}
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              id={`search-${variant}`}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={labels.search}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-ink-200 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:gap-3">
          <SelectChip
            icon={MapPin}
            label={labels.location}
            value={loc}
            onChange={setLoc}
            options={locations}
            allLabel={labels.all}
          />
          <SelectChip
            icon={GraduationCap}
            label={labels.education}
            value={edu}
            onChange={setEdu}
            options={educations}
            allLabel={labels.all}
          />
        </div>
      </div>

      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-400 tabular-nums mb-4">
        {filtered.length} / {jobs.length} {labels.showing}
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-500 bg-white rounded-2xl border border-ink-200/80">
          {labels.noResults}
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white">
          {/* Header (desktop only) */}
          <div className="hidden md:grid grid-cols-[60px_minmax(0,2.4fr)_minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.6fr)_140px] gap-4 px-5 py-4 bg-ink-50/70 border-b border-ink-200/80 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
            <span>{labels.no}</span>
            <span>{labels.title}</span>
            <span className="text-center">{labels.positions}</span>
            <span>{labels.locationCol}</span>
            <span>{labels.educationCol}</span>
            <span>{labels.major}</span>
            <span />
          </div>

          <ul>
            {filtered.map((job, i) => {
              const open = expanded === job.id;
              const hasDetail =
                (job.responsibilities && job.responsibilities.length > 0) ||
                (job.requirements && job.requirements.length > 0);
              return (
                <li key={job.id} className="border-b border-ink-100 last:border-b-0">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.18) }}
                    className={clsx(
                      'transition-colors',
                      open ? 'bg-brand-50/30' : 'hover:bg-ink-50/40'
                    )}
                  >
                    {/* Row */}
                    <div className="grid grid-cols-1 md:grid-cols-[60px_minmax(0,2.4fr)_minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.6fr)_140px] items-center gap-3 md:gap-4 px-5 py-5">
                      <div className="font-mono tabular-nums text-sm text-ink-400 hidden md:block">
                        {String(i + 1).padStart(2, '0')}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={clsx(
                              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]',
                              variant === 'campus'
                                ? 'bg-brand-50 text-brand-800'
                                : 'bg-accent/15 text-accent'
                            )}
                          >
                            {variant === 'campus' ? labels.campusBadge : labels.socialBadge}
                          </span>
                          <p className="font-semibold text-base md:text-lg text-ink-900">
                            {job.title}
                          </p>
                        </div>
                        <p className="md:hidden mt-1 text-xs text-ink-500 inline-flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {job.education}
                          </span>
                        </p>
                        {job.posted && (
                          <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {labels.posted} · <time dateTime={job.posted}>{job.posted}</time>
                          </p>
                        )}
                      </div>

                      <div className="hidden md:flex justify-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 text-ink-700 px-3 py-1 text-xs font-semibold tabular-nums">
                          <Users className="h-3 w-3" />
                          {job.positions}
                        </span>
                      </div>

                      <div className="hidden md:block text-sm text-ink-700 truncate">
                        {job.location}
                      </div>

                      <div className="hidden md:block text-sm text-ink-700 truncate">
                        {job.education}
                      </div>

                      <div className="md:block text-xs md:text-sm text-ink-600 line-clamp-2 leading-snug">
                        <span className="md:hidden text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 mr-2">
                          {labels.major}:
                        </span>
                        {job.major}
                      </div>

                      <div className="flex flex-wrap md:justify-end gap-2 mt-1 md:mt-0">
                        {hasDetail && (
                          <button
                            type="button"
                            onClick={() => setExpanded(open ? null : job.id)}
                            aria-expanded={open}
                            aria-controls={`job-detail-${job.id}`}
                            className={clsx(
                              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                              open
                                ? 'border-ink-900 bg-ink-900 text-white'
                                : 'border-ink-200 text-ink-700 hover:border-ink-900 hover:bg-ink-900 hover:text-white'
                            )}
                          >
                            {open ? labels.collapse : labels.expand}
                            <ChevronDown
                              className={clsx(
                                'h-3 w-3 transition-transform',
                                open && 'rotate-180'
                              )}
                            />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setApplying(job)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-accent text-ink-950 px-3 py-1.5 text-xs font-semibold hover:bg-accent-light transition-colors"
                        >
                          <Send className="h-3 w-3" />
                          {labels.apply}
                        </button>
                      </div>
                    </div>

                    {/* Expandable detail */}
                    <AnimatePresence initial={false}>
                      {open && hasDetail && (
                        <motion.div
                          id={`job-detail-${job.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 grid lg:grid-cols-2 gap-8 lg:gap-12 border-t border-ink-100">
                            {job.responsibilities && job.responsibilities.length > 0 && (
                              <div className="pt-6">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent inline-flex items-center gap-2">
                                  <CircleDot className="h-3 w-3" />
                                  {labels.responsibilities}
                                </p>
                                <ol className="mt-4 space-y-3">
                                  {job.responsibilities.map((r, idx) => (
                                    <li
                                      key={idx}
                                      className="relative pl-7 text-sm text-ink-700 leading-relaxed"
                                    >
                                      <span className="absolute left-0 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-white text-[10px] font-mono tabular-nums">
                                        {String(idx + 1).padStart(2, '0')}
                                      </span>
                                      {r}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}

                            {job.requirements && job.requirements.length > 0 && (
                              <div className="pt-6">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700 inline-flex items-center gap-2">
                                  <CircleCheck className="h-3 w-3" />
                                  {labels.requirements}
                                </p>
                                <ul className="mt-4 space-y-3">
                                  {job.requirements.map((r, idx) => (
                                    <li
                                      key={idx}
                                      className="relative pl-7 text-sm text-ink-700 leading-relaxed"
                                    >
                                      <CircleCheck className="absolute left-0 top-1 h-4 w-4 text-brand-700" />
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <JobApplicationModal
        open={!!applying}
        jobTitle={applying?.title ?? ''}
        onClose={() => setApplying(null)}
        labels={applyLabels}
        locale={locale}
      />
    </div>
  );
}

function SelectChip({
  icon: Icon,
  label,
  value,
  onChange,
  options,
  allLabel
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
}) {
  return (
    <label className="relative inline-flex items-center gap-2 rounded-full bg-white border border-ink-200 pl-3.5 pr-2 py-2 text-xs font-semibold text-ink-700 hover:border-ink-900 transition-colors cursor-pointer">
      <Icon className="h-3.5 w-3.5 text-ink-500" />
      <span className="text-ink-500 mr-1">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent text-ink-900 font-semibold focus:outline-none pr-5"
      >
        <option value="all">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 h-3 w-3 text-ink-400 pointer-events-none" />
    </label>
  );
}
