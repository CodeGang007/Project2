import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  FlaskConical,
  GraduationCap,
  Building2,
  Microscope,
  FileSearch,
  Gauge,
  Atom,
  ShieldCheck,
  BookOpen,
  Calendar,
  Clock,
  ChevronLeft
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import SubTabs from '@/components/about/SubTabs';

type Counter = { value: number; suffix?: string; label: string };
type Platform = {
  title: string;
  since: string;
  focus: string;
  description: string;
};
type Equipment = { name: string; code: string; tag: string };
type Partner = { name: string; abbr: string; type: string };
type Article = {
  id: string;
  title: string;
  date: string;
  category: string;
  minutes: number;
  excerpt: string;
};

const platformIcons = [Building2, GraduationCap, FlaskConical];

const equipmentIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'GC-MS': Microscope,
  HPLC: FileSearch,
  FTIR: Atom,
  'ICP-MS': Gauge,
  Pilot: FlaskConical,
  Cleanroom: ShieldCheck,
  中试: FlaskConical,
  净化: ShieldCheck
};

const equipmentImages = [
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80'
];

const articleImages = [
  'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&w=1100&q=80',
  'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=1100&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=80'
];

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { year: '', monthDay: iso, full: iso };
  const year = d.getUTCFullYear();
  const monthDay = `${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(
    d.getUTCDate()
  ).padStart(2, '0')}`;
  return { year: String(year), monthDay, full: `${year}.${monthDay}` };
}

export default async function RDPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('rd');
  const breadcrumb = t.raw('page.breadcrumb') as {
    home: string;
    about: string;
    current: string;
  };
  const aboutT = await getTranslations('about');
  const tabLabels = aboutT.raw('page.tabs') as {
    profile: string;
    research: string;
    publication: string;
  };
  const intro = t.raw('page.intro') as {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
  };
  const counters = t.raw('page.counters') as Counter[];
  const platforms = t.raw('page.platforms') as {
    eyebrow: string;
    title: string;
    lead: string;
    items: Platform[];
  };
  const equipment = t.raw('page.equipment') as {
    eyebrow: string;
    title: string;
    lead: string;
    items: Equipment[];
  };
  const partners = t.raw('page.partners') as {
    eyebrow: string;
    title: string;
    lead: string;
    items: Partner[];
  };
  const articles = t.raw('page.articles') as {
    eyebrow: string;
    title: string;
    lead: string;
    pagination: string;
    readMore: string;
    items: Article[];
  };

  const paginationText = articles.pagination
    .replace('{total}', String(articles.items.length))
    .replace('{page}', '1');

  return (
    <>
      {/* ── Hero banner with sub-nav ────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1920&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950/90 via-ink-950/70 to-brand-900/55" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden />

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
                  <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                    {breadcrumb.about}
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

          <div className="mt-14 md:mt-20 border-t border-white/10 pt-1">
            <SubTabs
              tabs={[
                { key: 'profile', label: tabLabels.profile, href: '/about' },
                { key: 'research', label: tabLabels.research, href: '/rd' },
                { key: 'publication', label: tabLabels.publication, href: '/newsletter' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Intro + counters ───────────────────────────────── */}
      <section className="relative overflow-hidden section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-100/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative container-wide grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                01 · {intro.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {intro.title}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl text-ink-700 leading-relaxed">{intro.lead}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 text-base text-ink-600 leading-relaxed">{intro.body}</p>
            </Reveal>

            {/* Counters */}
            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-200/80">
                {counters.map((c, i) => (
                  <div
                    key={c.label}
                    className="group bg-white p-6 md:p-7 hover:bg-gradient-to-br hover:from-white hover:to-brand-50/60 transition-colors duration-500"
                  >
                    <dd className="font-display font-medium text-4xl md:text-5xl leading-none bg-gradient-to-br from-ink-900 to-ink-700 bg-clip-text text-transparent">
                      <Counter to={c.value} suffix={c.suffix || ''} />
                    </dd>
                    <dt className="mt-3 text-[11px] text-ink-500 uppercase tracking-[0.14em] leading-tight">
                      {c.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Innovation Platforms ───────────────────────────── */}
      <section className="section bg-ink-50">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  02 · {platforms.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                  {platforms.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="text-base text-ink-600 max-w-md">{platforms.lead}</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {platforms.items.map((p, i) => {
              const Icon = platformIcons[i % platformIcons.length];
              return (
                <Reveal key={p.title} delay={0.05 + i * 0.08}>
                  <article className="group h-full relative rounded-2xl bg-white border border-ink-200/80 p-6 md:p-8 hover:border-ink-900/20 hover:shadow-xl hover:shadow-ink-900/5 transition-all duration-500">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-ink-200/70 text-brand-700 group-hover:from-brand-600 group-hover:to-brand-800 group-hover:text-white group-hover:border-brand-600 transition-all duration-500">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="inline-flex rounded-full bg-ink-900/5 text-ink-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                        {p.since}
                      </span>
                    </div>
                    <h3 className="mt-6 h-display text-xl md:text-2xl leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[13px] font-medium text-accent">
                      {p.focus}
                    </p>
                    <p className="mt-4 text-sm text-ink-600 leading-relaxed">
                      {p.description}
                    </p>
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-500 to-accent group-hover:w-full transition-all duration-500"
                    />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lab equipment showcase ─────────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  03 · {equipment.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                  {equipment.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="text-base text-ink-600 max-w-md">{equipment.lead}</p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {equipment.items.map((e, i) => {
              const Icon = equipmentIcons[e.code] || Microscope;
              return (
                <Reveal key={e.code} delay={0.05 + i * 0.05}>
                  <article className="group relative rounded-2xl overflow-hidden border border-ink-200/80 bg-white hover:border-ink-900/20 hover:shadow-xl hover:shadow-ink-900/5 transition-all duration-500">
                    <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                      <Image
                        src={equipmentImages[i % equipmentImages.length]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" aria-hidden />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-900">
                        {e.tag}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                        <div className="font-display text-3xl md:text-4xl font-medium text-white leading-none tracking-tight drop-shadow">
                          {e.code}
                        </div>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                          <Icon className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[15px] font-semibold text-ink-900 leading-snug">
                        {e.name}
                      </h3>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Academic Partners ──────────────────────────────── */}
      <section className="relative overflow-hidden section bg-gradient-to-br from-ink-950 via-ink-950 to-brand-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[700px] rounded-full bg-brand-600/25 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
        />

        <div className="relative container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                  <BookOpen className="h-3 w-3 text-accent-light" />
                  04 · {partners.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                  {partners.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="text-base text-white/65 max-w-md">{partners.lead}</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/15">
            {partners.items.map((p, i) => (
              <Reveal key={p.abbr} delay={0.04 * i}>
                <div className="group h-full bg-ink-950 hover:bg-gradient-to-br hover:from-brand-900/60 hover:to-ink-950 transition-colors duration-500 p-6 md:p-7 flex flex-col justify-between aspect-square">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold">
                      {p.type}
                    </span>
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full bg-accent-light/30 group-hover:bg-accent-light transition-colors"
                    />
                  </div>
                  {/* Monogram "logo" */}
                  <div className="font-display font-medium text-white/90 text-3xl md:text-4xl leading-none tracking-tight group-hover:text-accent-light transition-colors">
                    {p.abbr}
                  </div>
                  <p className="text-[11px] text-white/60 leading-snug font-medium line-clamp-2">
                    {p.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <p className="mt-8 text-center text-xs text-white/40">
              + additional industry partners and national research programmes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── R&D Articles grid + pagination ─────────────────── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  05 · {articles.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                  {articles.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="text-base text-ink-600 max-w-md">{articles.lead}</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {articles.items.map((a, i) => {
              const { year, monthDay, full } = formatDate(a.date);
              return (
                <Reveal key={a.id} delay={0.05 + i * 0.06}>
                  <Link
                    href={`/news/${a.id}` as any}
                    className="group block h-full rounded-2xl bg-white border border-ink-200/80 overflow-hidden hover:border-ink-900/20 hover:shadow-xl hover:shadow-ink-900/5 transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                      <Image
                        src={articleImages[i % articleImages.length]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                      <div className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-sm px-3 py-2 text-center shadow-sm">
                        <div className="font-display text-xl leading-none font-semibold text-ink-900">
                          {monthDay}
                        </div>
                        <div className="mt-1 font-mono text-[9px] tracking-widest text-ink-500">
                          {year}
                        </div>
                      </div>
                      <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-ink-900/85 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                        {a.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-[11px] text-ink-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" /> {full}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> {a.minutes} min read
                        </span>
                      </div>
                      <h3 className="mt-4 h-display text-lg md:text-xl leading-snug text-ink-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                        {a.title}
                      </h3>
                      <p className="mt-3 text-sm text-ink-500 leading-relaxed line-clamp-3">
                        {a.excerpt}
                      </p>
                      <div className="mt-5 pt-5 border-t border-ink-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-ink-900">
                          {articles.readMore}
                        </span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-500 group-hover:bg-ink-900 group-hover:border-ink-900 group-hover:text-white transition-all">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Pagination */}
          <Reveal delay={0.2}>
            <div className="mt-14 pt-8 border-t border-ink-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <p className="text-sm text-ink-500">{paginationText}</p>
              <nav aria-label="Pagination" className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled
                  aria-label="Previous page"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-300 cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-current="page"
                  aria-label="Page 1"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-white text-sm font-semibold"
                >
                  1
                </button>
                <button
                  type="button"
                  disabled
                  aria-label="Next page"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-300 cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="mt-14 flex items-center justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-ink-900 text-white pl-6 pr-4 py-3.5 text-sm font-semibold hover:bg-brand-800 transition-colors"
              >
                Partner with our research team
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
