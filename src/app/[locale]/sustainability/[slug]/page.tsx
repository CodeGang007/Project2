import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  Sparkles,
  Leaf,
  ShieldCheck,
  Heart,
  Award,
  Activity,
  ArrowRight,
  Tag
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import SubTabs from '@/components/about/SubTabs';
import DisclosureList, {
  type DisclosureItem
} from '@/components/sustainability/DisclosureList';
import KpiDashboard, {
  type KpiItem
} from '@/components/sustainability/KpiDashboard';
import CertificationGrid, {
  type Certification
} from '@/components/sustainability/CertificationGrid';
import CommunityProjects, {
  type CommunityProject
} from '@/components/sustainability/CommunityProjects';

const SLUGS = ['disclosure', 'safety', 'community'] as const;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function SustainabilityPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!(SLUGS as readonly string[]).includes(slug)) notFound();
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const t = await getTranslations('sustainability');
  const page = t.raw('page') as any;
  const breadcrumb = page.breadcrumb as { home: string; current: string };
  const subnav = page.subnav as {
    disclosure: string;
    safety: string;
    community: string;
  };

  // Pick hero image per slug
  const heroImage =
    slug === 'safety'
      ? 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1920&q=85'
      : slug === 'community'
      ? 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=85'
      : 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1920&q=85';

  // Pick eyebrow icon per slug
  const HeroIcon = slug === 'safety' ? ShieldCheck : slug === 'community' ? Heart : Leaf;

  // Active tab label
  const activeTabLabel =
    slug === 'disclosure'
      ? subnav.disclosure
      : slug === 'safety'
      ? subnav.safety
      : subnav.community;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/70 to-brand-900/55"
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
                <li className="text-white/80">{breadcrumb.current}</li>
                <li aria-hidden>
                  <ChevronRight className="h-3 w-3 text-white/40" />
                </li>
                <li className="text-white font-semibold">{activeTabLabel}</li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
              <HeroIcon className="h-3 w-3" />
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
                { key: 'disclosure', label: subnav.disclosure, href: '/sustainability/disclosure' },
                { key: 'safety', label: subnav.safety, href: '/sustainability/safety' },
                { key: 'community', label: subnav.community, href: '/sustainability/community' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Per-slug content ───────────────────────────────── */}
      {slug === 'disclosure' && <DisclosureSection l={l} t={page.disclosure} />}
      {slug === 'safety' && <SafetySection l={l} t={page.safety} />}
      {slug === 'community' && <CommunitySection l={l} t={page.community} />}

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden section bg-ink-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-center">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="font-medium tracking-tight text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-2xl">
                {page.cta.title}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-xl text-base md:text-lg text-white/70">
                {page.cta.body}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-accent text-ink-950 pl-5 pr-4 py-3 text-sm font-semibold hover:bg-accent-light transition-colors"
            >
              {page.cta.primary}
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-950 text-accent-light group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-3 text-sm font-semibold hover:bg-white hover:text-ink-900 transition-colors"
            >
              {page.cta.secondary}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ── Disclosure ────────────────────────────────────────────── */
function DisclosureSection({ l, t }: { l: 'en' | 'zh'; t: any }) {
  const items = t.items as DisclosureItem[];
  const types = t.types as Record<string, string>;
  const facilities = t.facilities as Record<string, string>;
  const filters = t.filters as any;
  const table = t.table as any;

  return (
    <section className="relative section bg-ink-50 border-y border-ink-200/80">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-10 md:mb-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                <Leaf className="h-3.5 w-3.5" />
                01 · {t.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-base md:text-lg text-ink-600 leading-relaxed">{t.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <DisclosureList
            items={items}
            typeMap={types}
            facilityMap={facilities}
            labels={{
              search: filters.search,
              all: filters.all,
              year: filters.year,
              facility: filters.facility,
              type: filters.type,
              noResults: filters.noResults,
              showing: filters.showing,
              no: table.no,
              titleCol: table.title,
              typeCol: table.type,
              facilityCol: table.facility,
              view: table.view,
              download: table.download,
              posted: table.posted
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ── Safety ───────────────────────────────────────────────── */
function SafetySection({ l, t }: { l: 'en' | 'zh'; t: any }) {
  const body = (Array.isArray(t.body) ? t.body : [t.body]) as string[];
  const kpis = t.kpis as { eyebrow: string; title: string; asOf: string; items: KpiItem[] };
  const certs = t.certifications as {
    eyebrow: string;
    title: string;
    items: Certification[];
  };
  return (
    <>
      {/* Body paragraphs */}
      <section className="relative overflow-hidden section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-100/50 blur-3xl"
        />
        <div className="relative container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                01 · {t.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-ink-600 leading-relaxed">{t.lead}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <ol className="space-y-7">
              {body.map((p, i) => (
                <li
                  key={i}
                  className="relative pl-10 md:pl-14 text-base md:text-lg text-ink-800 leading-relaxed"
                >
                  <span className="absolute left-0 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-white text-[10px] font-mono tabular-nums tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {p}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* KPI dashboard */}
      <section className="section bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-10 md:mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <Activity className="h-3.5 w-3.5" />
                  02 · {kpis.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  {kpis.title}
                </h2>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.1}>
            <KpiDashboard items={kpis.items} asOfLabel={kpis.asOf} />
          </Reveal>
        </div>
      </section>

      {/* Certifications */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-10 md:mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <Award className="h-3.5 w-3.5" />
                  03 · {certs.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  {certs.title}
                </h2>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.1}>
            <CertificationGrid
              items={certs.items}
              sinceLabel={l === 'zh' ? '认证起' : 'Certified since'}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ── Community ─────────────────────────────────────────────── */
function CommunitySection({ l, t }: { l: 'en' | 'zh'; t: any }) {
  const stats = t.stats as { value: string; label: string }[];
  const projects = t.projects as CommunityProject[];
  const ngos = t.ngos as { name: string; tag: string }[];
  const gallery = t.gallery as { image: string; caption: string }[];
  return (
    <>
      {/* Intro + stats */}
      <section className="relative overflow-hidden section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                <Heart className="h-3.5 w-3.5" />
                01 · {t.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-ink-600 leading-relaxed">{t.lead}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-6">
            <dl className="grid grid-cols-3 gap-px bg-ink-200/80 rounded-2xl overflow-hidden border border-ink-200/80">
              {stats.map((s) => (
                <div key={s.label} className="bg-white p-5 md:p-6">
                  <dd className="font-display font-medium text-3xl md:text-4xl leading-none bg-gradient-to-br from-ink-900 to-ink-600 bg-clip-text text-transparent tabular-nums">
                    {s.value}
                  </dd>
                  <dt className="mt-2 text-[11px] text-ink-500 leading-tight">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="section bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  02 · {t.projectsTitle}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  {t.projectsTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base md:text-lg text-ink-600 leading-relaxed">
                {t.projectsLead}
              </p>
            </Reveal>
          </div>

          <CommunityProjects items={projects} impactLabel={l === 'zh' ? '影响' : 'Impact'} />
        </div>
      </section>

      {/* NGO partners */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-end mb-10 md:mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  03 · {t.ngoTitle}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-3xl md:text-4xl leading-[1.05]">
                  {t.ngoTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base text-ink-600 leading-relaxed">{t.ngoLead}</p>
            </Reveal>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200/80 rounded-2xl overflow-hidden border border-ink-200/80">
            {ngos.map((ngo, i) => (
              <Reveal key={ngo.name} delay={0.03 + i * 0.04}>
                <li className="group bg-white h-full p-6 flex items-center gap-4 hover:bg-gradient-to-br hover:from-white hover:to-brand-50/40 transition-colors duration-500">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors flex-shrink-0">
                    <Heart className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-900 leading-snug">{ngo.name}</p>
                    <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-1.5">
                      <Tag className="h-3 w-3" />
                      {ngo.tag}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-ink-950 text-white relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative container-wide">
          <div className="mb-10 md:mb-12">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                <Sparkles className="h-3.5 w-3.5" />
                04 · {t.galleryTitle}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-medium tracking-tight text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                {t.galleryTitle}
              </h2>
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {gallery.map((g, i) => (
              <Reveal key={g.caption} delay={0.04 + i * 0.04}>
                <li className="group relative aspect-square overflow-hidden rounded-2xl bg-ink-900">
                  <Image
                    src={g.image}
                    alt={g.caption}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute bottom-3 left-3 right-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white">
                    {g.caption}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
