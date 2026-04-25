import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Briefcase, Users, TrendingUp } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const OPEN_POSITIONS = 12;

export default function JoinUsSection() {
  const t = useTranslations('join');
  const teams = t.raw('teams') as string[];

  return (
    <section className="relative overflow-hidden section bg-ink-50">
      {/* Decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-white via-white/60 to-transparent"
      />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                06 · {t('eyebrow')}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t('title')}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/jobs"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink-900 text-white pl-6 pr-3 py-3 text-sm font-semibold hover:bg-gradient-to-r hover:from-brand-700 hover:to-brand-900 transition-all shadow-lg shadow-ink-900/10"
              >
                <Briefcase className="h-4 w-4" />
                <span>{t('viewJobs')}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent text-ink-900 px-2.5 py-0.5 text-[11px] font-bold tabular-nums">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {OPEN_POSITIONS}
                </span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-xs text-ink-500">
                <span className="tabular-nums font-semibold text-ink-900">{OPEN_POSITIONS}</span>{' '}
                {t('openings')} · updated weekly
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <blockquote className="font-display text-2xl md:text-3xl lg:text-[2.3rem] text-ink-900 leading-snug tracking-tight border-l-2 border-ink-900 pl-6 md:pl-8">
                {t('body')}
              </blockquote>
            </Reveal>

            {/* Two sub-link cards */}
            <Reveal delay={0.18}>
              <div className="mt-12 grid sm:grid-cols-2 gap-4">
                <Link
                  href="/careers"
                  className="group rounded-2xl bg-white border border-ink-200/80 p-6 hover:border-ink-900/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500">
                    <Users className="h-4 w-4" /> 01
                  </div>
                  <h3 className="mt-4 h-display text-xl md:text-2xl group-hover:text-brand-700 transition-colors">
                    {t('mechanism')}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500">
                    Attract · Develop · Inspire
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
                    {t('cta')}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/jobs"
                  className="group rounded-2xl bg-gradient-to-br from-ink-900 to-ink-800 text-white p-6 hover:from-brand-800 hover:to-brand-900 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">
                    <TrendingUp className="h-4 w-4" /> 02
                  </div>
                  <h3 className="mt-4 h-display font-semibold text-xl md:text-2xl">
                    {t('jobs')}
                  </h3>
                  <p className="mt-2 text-sm text-white/65">
                    <span className="tabular-nums text-white font-semibold">{OPEN_POSITIONS}</span>{' '}
                    {t('openings')}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-light">
                    {t('viewJobs')}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </div>
            </Reveal>

            {/* Team chips */}
            <Reveal delay={0.25}>
              <div className="mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                  Hiring across teams
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {teams.map((team) => (
                    <li
                      key={team}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-xs font-medium text-ink-700 hover:border-ink-900 hover:text-ink-900 transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {team}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
