'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileDown,
  Search,
  ChevronDown,
  Calendar,
  MapPin,
  FileText
} from 'lucide-react';
import clsx from 'clsx';

export type DisclosureItem = {
  id: string;
  title: string;
  date: string;
  type: string;
  facility: string;
  size: string;
  url?: string;
};

export type DisclosureLabels = {
  search: string;
  all: string;
  year: string;
  facility: string;
  type: string;
  noResults: string;
  showing: string;
  no: string;
  titleCol: string;
  typeCol: string;
  facilityCol: string;
  view: string;
  download: string;
  posted: string;
};

export default function DisclosureList({
  items,
  typeMap,
  facilityMap,
  labels
}: {
  items: DisclosureItem[];
  typeMap: Record<string, string>;
  facilityMap: Record<string, string>;
  labels: DisclosureLabels;
}) {
  const [q, setQ] = useState('');
  const [year, setYear] = useState('all');
  const [type, setType] = useState('all');
  const [facility, setFacility] = useState('all');

  const years = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      const y = i.date?.slice(0, 4);
      if (y) set.add(y);
    });
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [items]);

  const types = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(i.type));
    return Array.from(set);
  }, [items]);

  const facilities = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(i.facility));
    return Array.from(set);
  }, [items]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items
      .filter((i) => {
        if (year !== 'all' && !i.date.startsWith(year)) return false;
        if (type !== 'all' && i.type !== type) return false;
        if (facility !== 'all' && i.facility !== facility) return false;
        if (!query) return true;
        const hay = [i.title, i.type, i.facility, i.date].join(' ').toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [items, q, year, type, facility]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3 mb-6">
        <div className="flex-1">
          <label htmlFor="disc-search" className="sr-only">
            {labels.search}
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              id="disc-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={labels.search}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-ink-200 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <SelectChip
            icon={Calendar}
            label={labels.year}
            value={year}
            onChange={setYear}
            options={years.map((y) => ({ value: y, label: y }))}
            allLabel={labels.all}
          />
          <SelectChip
            icon={MapPin}
            label={labels.facility}
            value={facility}
            onChange={setFacility}
            options={facilities.map((f) => ({ value: f, label: facilityMap[f] || f }))}
            allLabel={labels.all}
          />
          <SelectChip
            icon={FileText}
            label={labels.type}
            value={type}
            onChange={setType}
            options={types.map((t) => ({ value: t, label: typeMap[t] || t }))}
            allLabel={labels.all}
          />
        </div>
      </div>

      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-400 tabular-nums mb-4">
        {filtered.length} / {items.length} {labels.showing}
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-500 bg-white rounded-2xl border border-ink-200/80">
          {labels.noResults}
        </p>
      ) : (
        <ul className="rounded-2xl border border-ink-200/80 bg-white divide-y divide-ink-100 overflow-hidden">
          {filtered.map((item, i) => {
            const d = new Date(item.date);
            const ok = !Number.isNaN(d.getTime());
            const day = ok ? String(d.getUTCDate()).padStart(2, '0') : '';
            const ym = ok
              ? `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
              : item.date;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.18) }}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 px-5 py-5 hover:bg-ink-50/60 transition-colors"
              >
                {/* Stacked date */}
                <div className="rounded-xl bg-ink-50 border border-ink-200/80 px-3 py-2 font-mono leading-tight tabular-nums text-center min-w-[64px]">
                  <p className="text-2xl font-semibold leading-none text-ink-900">{day}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                    {ym}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-ink-900 text-base md:text-lg leading-snug group-hover:text-brand-800 transition-colors">
                    {item.title}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-ink-500">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-800 px-2 py-0.5">
                      <FileText className="h-3 w-3" />
                      {typeMap[item.type] || item.type}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {facilityMap[item.facility] || item.facility}
                    </span>
                    <span>{item.size}</span>
                  </div>
                </div>

                <a
                  href={item.url || '#'}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-white px-4 py-2 text-xs font-semibold hover:bg-brand-800 transition-colors"
                >
                  <FileDown className="h-3 w-3" />
                  {labels.download}
                </a>
              </motion.li>
            );
          })}
        </ul>
      )}
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
  options: { value: string; label: string }[];
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
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 h-3 w-3 text-ink-400 pointer-events-none" />
    </label>
  );
}
