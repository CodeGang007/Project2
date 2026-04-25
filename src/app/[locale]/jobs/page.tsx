import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  Sparkles,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Workflow,
  ArrowUpRight
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import SubTabs from '@/components/about/SubTabs';
import RecruitmentProcess, {
  type ProcessStep
} from '@/components/careers/RecruitmentProcess';
import JobsTable, { type JobItem, type JobsTableLabels } from '@/components/careers/JobsTable';
import { type ApplyLabels } from '@/components/careers/JobApplicationModal';

export default async function JobsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const t = await getTranslations('join');
  const subnav = t.raw('page.subnav') as { mechanism: string; recruitment: string };
  const jp = t.raw('jobsPage') as any;

  const breadcrumb = jp.breadcrumb as {
    home: string;
    join: string;
    current: string;
  };
  const process = jp.process as {
    eyebrow: string;
    title: string;
    lead: string;
    steps: ProcessStep[];
  };
  const tabs = jp.tabs as { campus: string; social: string };
  const filters = jp.filters as {
    search: string;
    all: string;
    location: string;
    education: string;
    noResults: string;
    showing: string;
    campusBadge: string;
    socialBadge: string;
  };
  const tableLabels = jp.table as {
    no: string;
    title: string;
    positions: string;
    location: string;
    education: string;
    major: string;
    apply: string;
    expand: string;
    collapse: string;
    responsibilities: string;
    requirements: string;
    posted: string;
  };
  const applyLabels = jp.apply as ApplyLabels;
  const cta = jp.cta as {
    title: string;
    body: string;
    speculative: string;
    viewMechanism: string;
  };

  const campusJobs = jp.campusItems as JobItem[];
  const socialJobs = jp.socialItems as JobItem[];

  const buildJobsLabels = (variant: 'campus' | 'social'): JobsTableLabels => ({
    search: filters.search,
    all: filters.all,
    location: filters.location,
    education: filters.education,
    noResults: filters.noResults,
    showing: filters.showing,
    campusBadge: filters.campusBadge,
    socialBadge: filters.socialBadge,
    no: tableLabels.no,
    title: tableLabels.title,
    positions: tableLabels.positions,
    locationCol: tableLabels.location,
    educationCol: tableLabels.education,
    major: tableLabels.major,
    apply: tableLabels.apply,
    expand: tableLabels.expand,
    collapse: tableLabels.collapse,
    responsibilities: tableLabels.responsibilities,
    requirements: tableLabels.requirements,
    posted: tableLabels.posted
  });

  const totalOpen = campusJobs
    .reduce((a, j) => a + (j.positions || 0), 0) +
    socialJobs.reduce((a, j) => a + (j.positions || 0), 0);

  return (
    <>
      {/* ── Hero with sub-nav ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/75 to-brand-900/55"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '56px 56px'
          }}
        />

        <div className="relative container-wide pt-28 md:pt-36 pb-0">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-[12px] text-white/60">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    {breadcrumb.home}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3 w-3 text-white/40" />
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {breadcrumb.join}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3 w-3 text-white/40" />
                </li>
                <li className="text-white font-semibold">{breadcrumb.current}</li>
              </ol>
            </nav>
          </Reveal>

          <div className="mt-8 grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
                  <Sparkles className="h-3 w-3" />
                  {jp.heroTag}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-6 font-medium tracking-tight text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
                  {jp.heroTitle}
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
                  {jp.heroSubtitle}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="lg:col-span-4">
              <dl className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                <div className="bg-ink-950/90 p-5">
                  <dd className="font-display font-medium text-3xl md:text-4xl leading-none text-white tabular-nums">
                    {campusJobs.length + socialJobs.length}
                  </dd>
                  <dt className="mt-2 text-[11px] text-white/60 leading-tight">
                    {l === 'zh' ? '在招岗位' : 'Open roles'}
                  </dt>
                </div>
                <div className="bg-ink-950/90 p-5">
                  <dd className="font-display font-medium text-3xl md:text-4xl leading-none text-white tabular-nums">
                    {totalOpen}+
                  </dd>
                  <dt className="mt-2 text-[11px] text-white/60 leading-tight">
                    {l === 'zh' ? '招聘人数' : 'Headcount'}
                  </dt>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="mt-14 md:mt-20 border-t border-white/10 pt-1">
            <SubTabs
              tabs={[
                { key: 'mechanism', label: subnav.mechanism, href: '/careers' },
                { key: 'recruitment', label: subnav.recruitment, href: '/jobs' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Recruitment Process ───────────────────────────── */}
      <section className="relative overflow-hidden section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-100/50 blur-3xl"
        />

        <div className="relative container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <Workflow className="h-3.5 w-3.5" />
                  01 · {process.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {process.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base md:text-lg text-ink-600 leading-relaxed">
                {process.lead}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <RecruitmentProcess steps={process.steps} />
          </Reveal>
        </div>
      </section>

      {/* ── Campus recruitment ────────────────────────────── */}
      <section
        id="campus"
        className="relative section bg-ink-50 border-y border-ink-200/80"
      >
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-10 md:mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <GraduationCap className="h-3.5 w-3.5" />
                  02 · {tabs.campus}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  {tabs.campus}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base text-ink-600 leading-relaxed">
                {l === 'zh'
                  ? '面向 2026 届校园招聘 —— 通过简洁的流程与合理的成长路径，迎接你的第一份正式工作。'
                  : 'Open positions for the 2026 graduate intake — a clear process and a real growth path for your first full-time role.'}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <JobsTable
              jobs={campusJobs}
              variant="campus"
              locale={l}
              labels={buildJobsLabels('campus')}
              applyLabels={applyLabels}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Social recruitment ────────────────────────────── */}
      <section id="social" className="relative section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-10 md:mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <Briefcase className="h-3.5 w-3.5" />
                  03 · {tabs.social}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  {tabs.social}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base text-ink-600 leading-relaxed">
                {l === 'zh'
                  ? '面向有经验的化学家、工程师与运营专才 —— 每个岗位均附完整的职责与任职要求。'
                  : 'For experienced chemists, engineers and operations specialists — each role lists the full responsibilities and requirements.'}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <JobsTable
              jobs={socialJobs}
              variant="social"
              locale={l}
              labels={buildJobsLabels('social')}
              applyLabels={applyLabels}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Speculative CTA ───────────────────────────────── */}
      <section className="relative overflow-hidden section bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/85 to-brand-900/60"
          aria-hidden
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-center">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="font-medium tracking-tight text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-2xl">
                {cta.title}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
                {cta.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-4 flex flex-col gap-3">
            <a
              href="mailto:dynai.info@dynai.com?subject=Speculative%20application"
              className="group inline-flex items-center justify-between gap-4 rounded-2xl bg-accent text-ink-950 px-5 py-4 hover:bg-accent-light transition-colors"
            >
              <div>
                <p className="text-sm font-semibold">{cta.speculative}</p>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-700/70">
                  dynai.info@dynai.com
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <Link
              href="/careers"
              className="group inline-flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md text-white px-5 py-4 hover:bg-white hover:text-ink-900 transition-colors"
            >
              <p className="text-sm font-semibold">{cta.viewMechanism}</p>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
