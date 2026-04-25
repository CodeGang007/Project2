'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  HardHat,
  Heart,
  ShieldCheck
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

type Card = {
  slug: string;
  title: string;
  description: string;
  icon: 'leaf' | 'shield' | 'heart';
};

const iconMap = {
  leaf: Leaf,
  shield: HardHat,
  heart: Heart
};

const isoBadges = [
  { code: 'ISO 9001', year: 'Quality' },
  { code: 'ISO 14001', year: 'Environment' },
  { code: 'ISO 45001', year: 'H&S' }
];

export default function SustainabilitySection() {
  const t = useTranslations('sustainability');
  const locale = useLocale() as 'en' | 'zh';
  const cards = t.raw('cards') as Card[];

  return (
    <section className="relative overflow-hidden section bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white">
      {/* Hero image */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-emerald-900/80 to-emerald-950/95"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute -top-32 right-1/3 h-[400px] w-[600px] rounded-full bg-emerald-400/20 blur-[120px]"
      />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                <Leaf className="h-3 w-3" />
                05 · {t('eyebrow')}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t('title')}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-xl">
                {t('body')}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/5 backdrop-blur-md border border-white/15 pl-4 pr-2 py-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  {t('certifications')}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Three icon cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((c, i) => {
            const Icon = iconMap[c.icon] || Leaf;
            return (
              <Reveal key={c.slug} delay={0.05 + i * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
                  <Link
                    href={`/sustainability/${c.slug}` as any}
                    className="group relative block rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-7 md:p-8 overflow-hidden hover:bg-white/10 hover:border-white/25 transition-all duration-400"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-emerald-400/15 to-transparent transition-opacity duration-500"
                    />

                    <div className="relative flex items-center justify-between">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-400/5 border border-emerald-300/20 flex items-center justify-center text-emerald-200 group-hover:from-emerald-300/40 group-hover:border-emerald-300/50 transition-all">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[11px] tracking-widest text-white/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="relative mt-7 text-xl md:text-2xl font-semibold leading-snug tracking-tight">
                      {c.title}
                    </h3>
                    <p className="relative mt-3 text-sm text-white/65 leading-relaxed">
                      {c.description}
                    </p>

                    <div className="relative mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                        {t('viewMore')}
                      </span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 group-hover:bg-white group-hover:border-white group-hover:text-ink-900 transition-all">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* ISO ribbon */}
        <Reveal delay={0.3}>
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                  Certifications
                </p>
                <p className="mt-2 text-sm text-white/70 max-w-md">{t('certLegend')}</p>
              </div>
              <ul className="flex flex-wrap items-center gap-3">
                {isoBadges.map((b) => (
                  <li
                    key={b.code}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2"
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    <span className="text-xs font-semibold tracking-wider text-white">
                      {b.code}
                    </span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest">
                      {b.year}
                    </span>
                  </li>
                ))}
                <li className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2">
                  <span className="text-xs font-semibold tracking-wider text-emerald-100">
                    2009 · Jiangsu Level-II
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-10">
            <Link
              href="/sustainability/disclosure"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              <span className="border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                {t('cta')}
              </span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
