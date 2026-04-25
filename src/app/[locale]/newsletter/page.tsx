import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  ArrowRight,
  Download,
  Eye,
  BookOpen,
  Mail,
  Sparkles
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import SubTabs from '@/components/about/SubTabs';
import MagazineCover, {
  type CoverIssue,
  type CoverLabels
} from '@/components/newsletter/MagazineCover';
import NewsletterArchive from '@/components/newsletter/NewsletterArchive';
import SubscribeForm from '@/components/newsletter/SubscribeForm';

export default async function NewsletterPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('newsletter');
  const aboutT = await getTranslations('about');

  const breadcrumb = t.raw('page.breadcrumb') as {
    home: string;
    about: string;
    current: string;
  };
  const tabLabels = aboutT.raw('page.tabs') as {
    profile: string;
    research: string;
    publication: string;
  };
  const intro = t.raw('page.intro') as { eyebrow: string; title: string; body: string };
  const issues = t.raw('page.issues') as CoverIssue[];
  const subscribe = t.raw('page.subscribe') as {
    eyebrow: string;
    title: string;
    body: string;
    placeholder: string;
    submit: string;
    submitted: string;
    legal: string;
    invalid: string;
  };
  const archive = t.raw('page.archive') as {
    eyebrow: string;
    title: string;
    lead: string;
    allYears: string;
    gridView: string;
    listView: string;
    prev: string;
    next: string;
    empty: string;
  };
  const viewer = t.raw('page.viewer') as {
    title: string;
    close: string;
    download: string;
    share: string;
    placeholder: string;
  };

  const coverLabels: CoverLabels = {
    pdfTag: t('page.pdfTag'),
    pages: t('page.pages'),
    size: t('page.size'),
    volume: t('page.volume')
  };

  const featured = issues[0];
  const featuredIndex = 0;

  return (
    <>
      {/* ── Hero banner with sub-nav ────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/75 to-brand-900/60"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent"
          aria-hidden
        />
        {/* Subtle grid pattern */}
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
                <li>
                  <Link
                    href="/about"
                    className="text-white/80 hover:text-white transition-colors"
                  >
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

      {/* ── Intro + Featured Latest Issue ───────────────────── */}
      <section className="relative overflow-hidden section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-brand-100/50 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative container-wide grid lg:grid-cols-12 gap-y-14 lg:gap-x-16 items-start">
          {/* Intro column */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                <BookOpen className="h-3.5 w-3.5" />
                01 · {intro.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {intro.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-ink-600 leading-relaxed max-w-xl">
                {intro.body}
              </p>
            </Reveal>

            {/* Stats strip */}
            <Reveal delay={0.15}>
              <dl className="mt-10 grid grid-cols-3 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-200/80 max-w-xl">
                <div className="bg-white p-5">
                  <dd className="font-display font-medium text-3xl md:text-4xl leading-none bg-gradient-to-br from-ink-900 to-ink-600 bg-clip-text text-transparent tabular-nums">
                    {issues.length}
                  </dd>
                  <dt className="mt-2 text-[11px] text-ink-500 leading-tight">
                    {locale === 'zh' ? '往期合集' : 'Issues published'}
                  </dt>
                </div>
                <div className="bg-white p-5">
                  <dd className="font-display font-medium text-3xl md:text-4xl leading-none bg-gradient-to-br from-ink-900 to-ink-600 bg-clip-text text-transparent tabular-nums">
                    {issues.reduce((acc, i) => acc + (Number(i.pages) || 0), 0)}+
                  </dd>
                  <dt className="mt-2 text-[11px] text-ink-500 leading-tight">
                    {locale === 'zh' ? '累计页数' : 'Pages of stories'}
                  </dt>
                </div>
                <div className="bg-white p-5">
                  <dd className="font-display font-medium text-3xl md:text-4xl leading-none bg-gradient-to-br from-ink-900 to-ink-600 bg-clip-text text-transparent">
                    3
                  </dd>
                  <dt className="mt-2 text-[11px] text-ink-500 leading-tight">
                    {locale === 'zh' ? '生产基地' : 'Production bases'}
                  </dt>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#archive"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink-900 text-white pl-5 pr-4 py-3 text-sm font-semibold hover:bg-brand-800 transition-colors"
                >
                  {locale === 'zh' ? '浏览全部刊期' : 'Browse the archive'}
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink-900 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
                <a
                  href="#subscribe"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 text-ink-800 px-5 py-3 text-sm font-semibold hover:border-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {locale === 'zh' ? '订阅新刊' : 'Subscribe'}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Featured latest issue */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="relative">
              {/* Decorative stacked covers behind */}
              <div
                aria-hidden
                className="absolute -inset-4 md:-inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-ink-100/80 via-white to-brand-50/60 shadow-[0_40px_80px_-30px_rgba(8,8,7,0.25)]"
              />
              <div className="relative grid sm:grid-cols-[1.35fr_1fr] gap-6 md:gap-8 p-5 md:p-8">
                <div className="relative">
                  <span className="absolute -top-3 left-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink-950 text-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] shadow-lg">
                    <Sparkles className="h-3 w-3 text-accent-light" />
                    {t('page.featuredLabel')}
                  </span>
                  <MagazineCover
                    issue={featured}
                    index={featuredIndex}
                    labels={coverLabels}
                    size="large"
                    className="shadow-[0_40px_80px_-20px_rgba(8,8,7,0.45)]"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400">
                      {coverLabels.volume} · {String(featuredIndex + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 font-display font-medium text-2xl md:text-3xl leading-snug text-ink-900">
                      {featured.period}
                    </h3>
                    <p className="mt-1.5 text-sm md:text-base text-ink-600 font-medium">
                      {featured.title}
                    </p>
                    <p className="mt-4 text-sm text-ink-500 leading-relaxed line-clamp-4">
                      {featured.excerpt}
                    </p>

                    <dl className="mt-6 flex items-center gap-5 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-400 tabular-nums">
                      <div>
                        <dt className="sr-only">{coverLabels.pages}</dt>
                        <dd>
                          {featured.pages} {coverLabels.pages}
                        </dd>
                      </div>
                      <span className="h-3 w-px bg-ink-200" aria-hidden />
                      <div>
                        <dt className="sr-only">{coverLabels.size}</dt>
                        <dd>{featured.size}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-8 flex flex-col gap-2">
                    <a
                      href="#archive"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-800 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      {t('page.readOnline')}
                    </a>
                    <a
                      href="#"
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 text-ink-800 px-5 py-2.5 text-sm font-semibold hover:border-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      {t('page.downloadPdf')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Archive grid + pagination ──────────────────────── */}
      <section id="archive" className="relative section bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide">
          <NewsletterArchive
            issues={issues}
            coverLabels={coverLabels}
            labels={{
              archiveEyebrow: `02 · ${archive.eyebrow}`,
              archiveTitle: archive.title,
              archiveLead: archive.lead,
              allYears: archive.allYears,
              gridView: archive.gridView,
              listView: archive.listView,
              readOnline: t('page.readOnline'),
              downloadPdf: t('page.downloadPdf'),
              paginationTemplate: t.raw('page.pagination') as string,
              prev: archive.prev,
              next: archive.next,
              empty: archive.empty
            }}
            viewerLabels={{
              title: viewer.title,
              close: viewer.close,
              download: viewer.download,
              share: viewer.share,
              placeholder: viewer.placeholder,
              pdfBadge: t('page.pdfBadge'),
              pages: coverLabels.pages,
              size: coverLabels.size
            }}
          />
        </div>
      </section>

      {/* ── Subscription CTA ───────────────────────────────── */}
      <section
        id="subscribe"
        className="relative overflow-hidden section bg-ink-950 text-white"
      >
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/90 to-brand-900/60"
          aria-hidden
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative container-wide grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                <Mail className="h-3.5 w-3.5" />
                03 · {subscribe.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {subscribe.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
                {subscribe.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-7">
              <SubscribeForm
                labels={{
                  placeholder: subscribe.placeholder,
                  submit: subscribe.submit,
                  submitted: subscribe.submitted,
                  legal: subscribe.legal,
                  invalid: subscribe.invalid
                }}
              />

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.22em] text-white/50">
                <span>{coverLabels.pdfTag} · {coverLabels.volume}</span>
                <span className="tabular-nums">
                  {String(issues.length).padStart(2, '0')} / {String(issues.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
