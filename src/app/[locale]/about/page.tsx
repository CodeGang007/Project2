import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  Building2,
  Target,
  Globe2,
  ArrowUpRight,
  ArrowRight,
  Quote
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import SubTabs from '@/components/about/SubTabs';
import Timeline from '@/components/about/Timeline';
import AwardsTabs from '@/components/about/AwardsTabs';

type Stat = { value: string; suffix?: string; label: string };
type Base = { name: string; zh: string; meta: string; description: string };
type Highlight = { icon: string; title: string; caption: string };
type MVI = { kicker: string; title: string; body: string };
type Milestone = { year: string; title: string; body: string };
type FounderHighlight = { value: string; label: string };

const highlightIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  building: Building2,
  target: Target,
  globe: Globe2
};

const baseImages = [
  'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1100&q=80',
  'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1100&q=80',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1100&q=80'
];

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const stats = t.raw('stats') as Stat[];

  const breadcrumb = t.raw('page.breadcrumb') as {
    home: string;
    about: string;
    current: string;
  };
  const tabs = t.raw('page.tabs') as {
    profile: string;
    research: string;
    publication: string;
  };
  const profile = t.raw('page.profile') as {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    watermark: string;
  };
  const highlights = t.raw('page.highlights') as Highlight[];
  const basesBlock = t.raw('page.bases') as {
    eyebrow: string;
    title: string;
    cta: string;
    items: Base[];
  };
  const culture = t.raw('page.culture') as {
    eyebrow: string;
    title: string;
    body: string;
    founder: {
      name: string;
      nameZh: string;
      years: string;
      role: string;
      highlights: FounderHighlight[];
      quote: string;
    };
  };
  const mvi = t.raw('page.mvi') as {
    eyebrow: string;
    title: string;
    items: MVI[];
  };
  const timeline = t.raw('page.timeline') as {
    eyebrow: string;
    title: string;
    lead: string;
    milestones: Milestone[];
  };
  const awards = t.raw('page.awards') as {
    eyebrow: string;
    title: string;
    lead: string;
    categories: any[];
  };

  return (
    <>
      {/* ── Hero banner with sub-nav ────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1920&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950/90 via-ink-950/70 to-brand-900/50" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden />

        <div className="relative container-wide pt-28 md:pt-36 pb-0">
          {/* Breadcrumb */}
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
                <li className="text-white/80">{breadcrumb.about}</li>
                <li aria-hidden>
                  <ChevronRight className="h-3 w-3 text-white/40" />
                </li>
                <li className="text-white font-semibold">{breadcrumb.current}</li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
              {t('page.heroTag')}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-medium tracking-tight text-5xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl">
              {t('page.heroTitle')}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
              {t('page.heroSubtitle')}
            </p>
          </Reveal>

          {/* Sub-nav tabs anchored to bottom */}
          <div className="mt-14 md:mt-20 border-t border-white/10 pt-1">
            <SubTabs
              tabs={[
                { key: 'profile', label: tabs.profile, href: '/about' },
                { key: 'research', label: tabs.research, href: '/rd' },
                { key: 'publication', label: tabs.publication, href: '/newsletter' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Company Profile ────────────────────────────────── */}
      <section className="relative overflow-hidden section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-100/50 blur-3xl"
        />

        <div className="relative container-wide grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                01 · {profile.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {profile.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg md:text-xl text-ink-700 leading-relaxed">
                {profile.lead}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 text-base text-ink-600 leading-relaxed">{profile.body}</p>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={0.2}>
              <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-200/80">
                {stats.map((s) => {
                  const numeric = parseInt(s.value, 10);
                  return (
                    <div key={s.label} className="bg-white p-5">
                      <dd className="font-display font-medium text-3xl md:text-4xl leading-none bg-gradient-to-br from-ink-900 to-ink-600 bg-clip-text text-transparent">
                        {!isNaN(numeric) ? (
                          <Counter to={numeric} suffix={s.suffix || ''} />
                        ) : (
                          <>{s.value}{s.suffix}</>
                        )}
                      </dd>
                      <dt className="mt-2 text-[11px] text-ink-500 leading-tight">{s.label}</dt>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          </div>

          {/* Right image with watermark */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-2xl overflow-hidden bg-ink-900">
              <Image
                src="https://images.unsplash.com/photo-1530305408560-82d13781b33a?auto=format&fit=crop&w=1200&q=85"
                alt="Dynai production facility"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" aria-hidden />
              {/* Giant watermark */}
              <div className="absolute inset-0 flex items-end p-6 md:p-10">
                <p className="font-display font-semibold text-white/15 text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight uppercase">
                  {profile.watermark}
                </p>
              </div>
              {/* Floating caption */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
                  Nanjing · Jiangbei
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Three icon blocks ──────────────────────────────── */}
      <section className="bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide py-16 md:py-20">
          <div className="grid md:grid-cols-3 gap-px bg-ink-200/80 rounded-2xl overflow-hidden border border-ink-200/80">
            {highlights.map((h, i) => {
              const Icon = highlightIcons[h.icon] || Building2;
              return (
                <Reveal key={h.title} delay={0.05 * i}>
                  <div className="group bg-white h-full p-8 md:p-10 flex flex-col gap-6 hover:bg-gradient-to-br hover:from-white hover:to-brand-50/60 transition-colors duration-500">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-ink-200/70 text-brand-700 group-hover:from-brand-600 group-hover:to-brand-800 group-hover:text-white group-hover:border-brand-600 transition-all duration-500">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-[11px] tracking-widest text-ink-300">
                        0{i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="h-display text-2xl md:text-3xl leading-snug">{h.title}</h3>
                      <p className="mt-3 text-sm text-ink-500 leading-relaxed">{h.caption}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Production Bases ──────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  02 · {basesBlock.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                  {basesBlock.title}
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {basesBlock.items.map((b, i) => (
              <Reveal key={b.name} delay={0.05 + i * 0.08}>
                <article className="group relative rounded-2xl overflow-hidden border border-ink-200/80 bg-white hover:border-ink-900/20 hover:shadow-xl hover:shadow-ink-900/5 transition-all duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                    <Image
                      src={baseImages[i % baseImages.length]}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" aria-hidden />
                    <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-900">
                      0{i + 1} · {b.meta}
                    </div>
                    <div className="absolute bottom-5 left-5">
                      <h3 className="text-white font-display font-medium text-2xl md:text-3xl leading-tight">
                        {b.name}
                      </h3>
                      <p className="mt-1 text-sm text-white/70">{b.zh}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-ink-600 leading-relaxed">{b.description}</p>
                    <Link
                      href="/contact"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 group-hover:text-brand-700 transition-colors"
                    >
                      {basesBlock.cta}
                      <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Corporate Culture — Founder ───────────────────── */}
      <section className="relative overflow-hidden section bg-gradient-to-b from-ink-50 to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-20 h-[400px] w-[500px] rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative container-wide grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                03 · {culture.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                {culture.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base text-ink-600 leading-relaxed">{culture.body}</p>
            </Reveal>
          </div>

          {/* Founder card */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-ink-200/80 overflow-hidden shadow-sm">
              <div className="grid sm:grid-cols-5">
                <div className="sm:col-span-2 relative aspect-[3/4] sm:aspect-auto bg-gradient-to-br from-ink-900 via-brand-900 to-ink-800">
                  {/* Portrait placeholder — monogram */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-display text-[8rem] md:text-[9rem] font-medium leading-none text-white/15">
                        秦
                      </div>
                      <p className="mt-4 font-display text-white/90 text-xl md:text-2xl tracking-wide">
                        {culture.founder.nameZh}
                      </p>
                      <p className="mt-1 text-xs text-white/50 tracking-widest uppercase">
                        {culture.founder.name}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    Founder
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white/70 text-xs font-mono tracking-widest">
                    {culture.founder.years}
                  </div>
                </div>

                <div className="sm:col-span-3 p-6 md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    {culture.founder.role}
                  </p>

                  {/* Quote */}
                  <div className="mt-4 relative pl-6">
                    <Quote
                      aria-hidden
                      className="absolute left-0 top-0 h-4 w-4 text-accent"
                    />
                    <blockquote className="font-display text-lg md:text-xl leading-snug text-ink-900">
                      {culture.founder.quote}
                    </blockquote>
                  </div>

                  {/* Achievements */}
                  <dl className="mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-ink-100">
                    {culture.founder.highlights.map((h) => (
                      <div key={h.label}>
                        <dd className="font-display text-xl md:text-2xl font-medium text-ink-900 leading-none">
                          {h.value}
                        </dd>
                        <dt className="mt-1.5 text-[11px] text-ink-500 leading-tight">
                          {h.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mission / Vision / Idea / Core Values ─────────── */}
      <section className="relative overflow-hidden section bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/30" aria-hidden />

        <div className="relative container-wide grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                04 · {mvi.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {mvi.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm md:text-base text-white/65 leading-relaxed">
                The principles behind every decision — from the lab bench to the boardroom.
              </p>
            </Reveal>
          </div>

          <ol className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {mvi.items.map((item, i) => (
              <Reveal key={item.kicker} delay={0.05 + i * 0.08}>
                <li className="group py-8 md:py-10 grid md:grid-cols-[120px_1fr] gap-6 md:gap-10 items-start">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-widest text-white/40 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="inline-flex rounded-full bg-accent/15 text-accent-light px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
                      {item.kicker}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-medium leading-snug tracking-tight group-hover:text-accent-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-white/65 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Development History Timeline ─────────────────── */}
      <section className="section bg-ink-50">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 md:mb-12">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  05 · {timeline.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {timeline.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="text-base text-ink-600 max-w-md">{timeline.lead}</p>
            </Reveal>
          </div>

          <Timeline milestones={timeline.milestones} />
        </div>
      </section>

      {/* ── Honors & Awards ──────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  06 · {awards.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                  {awards.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="text-base text-ink-600 max-w-md">{awards.lead}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <AwardsTabs categories={awards.categories} />
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-14 flex items-center justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-ink-900 text-white pl-6 pr-4 py-3.5 text-sm font-semibold hover:bg-brand-800 transition-colors"
              >
                Talk to our team
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink-900 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
