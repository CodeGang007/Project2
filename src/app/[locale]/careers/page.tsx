import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  Users,
  TrendingUp,
  Heart,
  ShieldCheck,
  HeartPulse,
  Bed,
  Bus,
  Utensils,
  Gift,
  Cake,
  Stethoscope,
  HandHeart,
  Briefcase,
  GraduationCap,
  Trophy,
  Sun
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import SubTabs from '@/components/about/SubTabs';
import TestimonialsCarousel, {
  type Testimonial
} from '@/components/careers/TestimonialsCarousel';

type PhilosophyItem = {
  key: string;
  kicker: string;
  title: string;
  body: string;
};
type DevelopmentItem = { title: string; body: string };
type BenefitItem = { icon: string; title: string; body: string };
type DayItem = { time: string; activity: string; body: string };
type GalleryItem = { label: string; image: string };

const philosophyIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  attract: Users,
  develop: TrendingUp,
  inspire: Heart
};

const benefitIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: ShieldCheck,
  'heart-pulse': HeartPulse,
  bed: Bed,
  bus: Bus,
  utensils: Utensils,
  gift: Gift,
  cake: Cake,
  stethoscope: Stethoscope,
  ring: HandHeart
};

const developmentIcons = [Briefcase, Trophy, GraduationCap];

export default async function CareersPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const t = await getTranslations('join');
  const page = t.raw('page') as any;
  const breadcrumb = page.breadcrumb as { home: string; current: string };
  const subnav = page.subnav as { mechanism: string; recruitment: string };
  const philosophy = page.philosophy as {
    eyebrow: string;
    title: string;
    lead: string;
    items: PhilosophyItem[];
  };
  const development = page.development as {
    eyebrow: string;
    title: string;
    lead: string;
    items: DevelopmentItem[];
  };
  const benefits = page.benefits as {
    eyebrow: string;
    title: string;
    lead: string;
    items: BenefitItem[];
  };
  const testimonials = page.testimonials as {
    eyebrow: string;
    title: string;
    lead: string;
    items: Testimonial[];
  };
  const dayInLife = page.dayInLife as {
    eyebrow: string;
    title: string;
    lead: string;
    items: DayItem[];
  };
  const gallery = page.gallery as {
    eyebrow: string;
    title: string;
    items: GalleryItem[];
  };
  const cta = page.cta as {
    title: string;
    body: string;
    viewJobs: string;
    contact: string;
    openPositionsLabel: string;
  };

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/70 to-brand-900/40"
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
                <li className="text-white font-semibold">{breadcrumb.current}</li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
              <Sun className="h-3 w-3" />
              {page.heroTag}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-medium tracking-tight text-5xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl">
              {page.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
              {page.heroSubtitle}
            </p>
          </Reveal>

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

      {/* ── Talent Philosophy ─────────────────────────────── */}
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
                  <Users className="h-3.5 w-3.5" />
                  01 · {philosophy.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {philosophy.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base md:text-lg text-ink-600 leading-relaxed">
                {philosophy.lead}
              </p>
            </Reveal>
          </div>

          <ul className="grid md:grid-cols-3 gap-px bg-ink-200/80 rounded-2xl overflow-hidden border border-ink-200/80">
            {philosophy.items.map((item, i) => {
              const Icon = philosophyIcons[item.key] || Users;
              return (
                <Reveal key={item.key} delay={0.05 * i}>
                  <li className="group bg-white h-full p-7 md:p-9 flex flex-col gap-6 hover:bg-gradient-to-br hover:from-white hover:to-brand-50/60 transition-colors duration-500">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-ink-200/70 text-brand-700 group-hover:from-brand-600 group-hover:to-brand-800 group-hover:text-white group-hover:border-brand-600 transition-all duration-500">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-[11px] tracking-widest text-ink-300">
                        0{i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                        {item.kicker}
                      </p>
                      <h3 className="mt-2 h-display text-2xl md:text-3xl leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Career Development ────────────────────────────── */}
      <section className="section bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <TrendingUp className="h-3.5 w-3.5" />
                  02 · {development.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {development.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base md:text-lg text-ink-600 leading-relaxed">
                {development.lead}
              </p>
            </Reveal>
          </div>

          <ol className="grid md:grid-cols-3 gap-5 md:gap-6">
            {development.items.map((item, i) => {
              const Icon = developmentIcons[i] || Briefcase;
              return (
                <Reveal key={item.title} delay={0.05 + i * 0.05}>
                  <li className="group h-full rounded-2xl border border-ink-200/80 bg-white p-7 md:p-8 hover:border-ink-900/20 hover:shadow-[0_25px_50px_-20px_rgba(8,8,7,0.2)] transition-all duration-500">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[11px] tracking-widest text-ink-300 tabular-nums">
                        STEP {String(i + 1).padStart(2, '0')}
                      </span>
                      <Icon className="h-5 w-5 text-brand-700" />
                    </div>
                    <h3 className="mt-6 h-display text-2xl md:text-3xl leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-ink-600 leading-relaxed">
                      {item.body}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Benefits grid ─────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <Gift className="h-3.5 w-3.5" />
                  03 · {benefits.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {benefits.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base md:text-lg text-ink-600 leading-relaxed">
                {benefits.lead}
              </p>
            </Reveal>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200/80 rounded-2xl overflow-hidden border border-ink-200/80">
            {benefits.items.map((b, i) => {
              const Icon = benefitIcons[b.icon] || Gift;
              return (
                <Reveal key={b.title} delay={0.03 * i}>
                  <li className="group bg-white h-full p-6 md:p-7 hover:bg-gradient-to-br hover:from-white hover:to-brand-50/40 transition-colors duration-500">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display font-medium text-lg md:text-xl text-ink-900 leading-snug">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-600 leading-relaxed">{b.body}</p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="section bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  04 · {testimonials.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {testimonials.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base md:text-lg text-ink-600 leading-relaxed">
                {testimonials.lead}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <TestimonialsCarousel
              items={testimonials.items}
              labels={{
                prev: l === 'zh' ? '上一位' : 'Previous',
                next: l === 'zh' ? '下一位' : 'Next',
                pause: l === 'zh' ? '暂停轮播' : 'Pause autoplay',
                play: l === 'zh' ? '继续轮播' : 'Resume autoplay'
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Day in the Life timeline ──────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <Sun className="h-3.5 w-3.5" />
                  05 · {dayInLife.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {dayInLife.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base md:text-lg text-ink-600 leading-relaxed">
                {dayInLife.lead}
              </p>
            </Reveal>
          </div>

          <ol className="relative border-l-2 border-ink-200 ml-3 md:ml-6 space-y-8 md:space-y-10">
            {dayInLife.items.map((item, i) => (
              <Reveal key={i} delay={0.04 + i * 0.04}>
                <li className="relative pl-7 md:pl-10">
                  <span
                    aria-hidden
                    className="absolute -left-[9px] top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-ink-900 text-white"
                  >
                    <span className="block h-1.5 w-1.5 rounded-full bg-accent-light" />
                  </span>
                  <div className="grid md:grid-cols-[100px_1fr] gap-3 md:gap-8 items-baseline">
                    <p className="font-mono text-lg md:text-xl font-semibold text-ink-900 tabular-nums">
                      {item.time}
                    </p>
                    <div>
                      <h3 className="font-display font-medium text-xl md:text-2xl text-ink-900 leading-snug">
                        {item.activity}
                      </h3>
                      <p className="mt-2 text-sm md:text-base text-ink-600 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────── */}
      <section className="section bg-ink-950 text-white relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative container-wide">
          <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-end mb-10 md:mb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                  06 · {gallery.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {gallery.title}
                </h2>
              </Reveal>
            </div>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {gallery.items.map((g, i) => (
              <Reveal key={g.label} delay={0.04 + i * 0.04}>
                <li className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900">
                  <Image
                    src={g.image}
                    alt={g.label}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm text-ink-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {g.label}
                    </span>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-100/60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="h-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-2xl">
                {cta.title}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-base md:text-lg text-ink-600 max-w-xl">{cta.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex flex-col gap-3">
              <Link
                href="/jobs"
                className="group inline-flex items-center justify-between gap-4 rounded-2xl bg-ink-900 text-white px-6 py-4 hover:bg-brand-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-accent-light">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{cta.viewJobs}</p>
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/55">
                      {(t.raw('teams') as string[]).length}+ {cta.openPositionsLabel}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between gap-4 rounded-2xl border border-ink-200 text-ink-900 px-6 py-4 hover:border-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-50 text-ink-700 group-hover:bg-white/10 group-hover:text-accent-light transition-colors">
                    <HeartPulse className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold">{cta.contact}</p>
                </div>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
