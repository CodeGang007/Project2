import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Rss,
  Tag,
  Newspaper
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import NewsArchive, {
  type CategoryFilter,
  type NewsItem
} from '@/components/news/NewsArchive';
import SubscribeForm from '@/components/newsletter/SubscribeForm';

export default async function NewsIndexPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const t = await getTranslations('news');
  const items = t.raw('items') as NewsItem[];
  const tabs = t.raw('tabs') as Record<string, string>;
  const page = t.raw('page') as any;

  const breadcrumb = page.breadcrumb as { home: string; current: string };

  // Build category filters with explicit matches per locale
  const categoryMatches: Record<string, string[]> = {
    company: l === 'zh' ? ['公司动态'] : ['Company'],
    press: l === 'zh' ? ['媒体报道'] : ['Press'],
    industry: l === 'zh' ? ['行业资讯'] : ['Industry'],
    csr: l === 'zh' ? ['企业责任'] : ['CSR'],
    events: l === 'zh' ? ['文化活动'] : ['Events']
  };

  const categories: CategoryFilter[] = [
    { key: 'all', label: tabs.all },
    { key: 'company', label: tabs.company, match: categoryMatches.company },
    { key: 'industry', label: tabs.industry, match: categoryMatches.industry },
    { key: 'csr', label: tabs.csr, match: categoryMatches.csr },
    { key: 'events', label: tabs.events, match: categoryMatches.events }
  ];

  // Sort newest first
  const sorted = [...items].sort((a, b) =>
    (b.date || '').localeCompare(a.date || '')
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const fdate = featured?.date ? new Date(featured.date) : null;
  const fOk = !!fdate && !Number.isNaN(fdate.getTime());
  const featuredDay = fOk ? String(fdate!.getUTCDate()).padStart(2, '0') : '';
  const featuredYm = fOk
    ? `${fdate!.getUTCFullYear()}-${String(fdate!.getUTCMonth() + 1).padStart(2, '0')}`
    : featured?.date ?? '';

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=85"
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
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '56px 56px'
          }}
        />

        <div className="relative container-wide pt-28 md:pt-36 pb-20 md:pb-24">
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
              <Newspaper className="h-3 w-3" />
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

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`/${locale}/news/rss.xml`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2.5 text-sm font-semibold hover:bg-white hover:text-ink-900 transition-colors"
              >
                <Rss className="h-3.5 w-3.5" />
                {page.rss}
              </a>
              <a
                href="#subscribe"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-ink-950 px-4 py-2.5 text-sm font-semibold hover:bg-accent-light transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {page.subscribeTitle}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured story ────────────────────────────────── */}
      {featured && (
        <section className="relative overflow-hidden section bg-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-100/50 blur-3xl"
          />

          <div className="relative container-wide">
            <Reveal>
              <Link
                href={`/news/${featured.id}` as any}
                className="group grid lg:grid-cols-12 gap-y-8 lg:gap-x-12 items-stretch rounded-2xl overflow-hidden border border-ink-200/80 bg-white hover:border-ink-900/20 hover:shadow-[0_40px_80px_-30px_rgba(8,8,7,0.25)] transition-all duration-500"
              >
                {/* Image */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] bg-ink-900 overflow-hidden">
                  {featured.coverImage && (
                    <Image
                      src={featured.coverImage}
                      alt=""
                      fill
                      priority
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-full bg-accent text-ink-950 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]">
                    <Sparkles className="h-3 w-3" />
                    {page.featuredLabel}
                  </span>
                  <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm text-ink-900 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]">
                    <Tag className="h-3 w-3" />
                    {featured.category}
                  </div>
                  {/* Stacked date — bottom-left */}
                  <div className="absolute bottom-6 left-6 rounded-xl bg-white/95 backdrop-blur-sm text-ink-900 px-3.5 py-2.5 font-mono leading-tight tabular-nums shadow-sm">
                    <p className="text-3xl md:text-4xl font-semibold leading-none">
                      {featuredDay}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                      {featuredYm}
                    </p>
                  </div>
                </div>

                {/* Text */}
                <div className="lg:col-span-5 p-7 md:p-10 flex flex-col">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400">
                    {featured.category}
                    {featured.location && <> · {featured.location}</>}
                  </p>
                  <h2 className="mt-4 font-display font-medium text-3xl md:text-4xl leading-tight text-ink-900 group-hover:text-brand-800 transition-colors">
                    {featured.title}
                  </h2>
                  {featured.subtitle && (
                    <p className="mt-3 text-base md:text-lg text-ink-600">
                      {featured.subtitle}
                    </p>
                  )}
                  <p className="mt-5 text-sm md:text-base text-ink-600 leading-relaxed line-clamp-4">
                    {featured.excerpt}
                  </p>

                  <div className="mt-8 pt-6 border-t border-ink-100 flex items-center justify-between text-xs">
                    <div className="inline-flex items-center gap-4 font-mono uppercase tracking-[0.22em] text-ink-400">
                      {featured.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {featured.location}
                        </span>
                      )}
                      {featured.minutes != null && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featured.minutes} {t('minuteRead')}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-ink-900 group-hover:text-brand-800 transition-colors">
                      {page.viewDetails}
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Archive ───────────────────────────────────────── */}
      <section className="relative section bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-12">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <Newspaper className="h-3.5 w-3.5" />
                  02 · {l === 'zh' ? '全部报道' : 'All stories'}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  {l === 'zh' ? '全部报道' : 'All stories'}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="text-base text-ink-600 max-w-md">
                {l === 'zh'
                  ? '按主题、地点、人物筛选 —— 或使用搜索快速定位特定故事。'
                  : 'Filter by category, location or people — or search to jump directly to a specific story.'}
              </p>
            </Reveal>
          </div>

          <NewsArchive
            items={rest}
            categories={categories}
            locale={l}
            labels={{
              searchPlaceholder: page.searchPlaceholder,
              searchEmpty: page.searchEmpty,
              viewDetails: page.viewDetails,
              filterCount: page.filterCount,
              minuteRead: t('minuteRead'),
              paginationTemplate: t.raw('page.pagination') as string,
              prev: page.prev,
              next: page.next
            }}
          />
        </div>
      </section>

      {/* ── Subscribe CTA ─────────────────────────────────── */}
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

        <div className="relative container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                <Rss className="h-3.5 w-3.5" />
                03 · {page.subscribeTitle}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {page.subscribeTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
                {page.subscribeBody}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6">
                <a
                  href={`/${locale}/news/rss.xml`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white"
                >
                  <Rss className="h-3.5 w-3.5" />
                  {page.rss}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-7">
              <SubscribeForm
                labels={{
                  placeholder: page.subscribePlaceholder,
                  submit: page.subscribeSubmit,
                  submitted: page.subscribeSubmitted,
                  legal: page.subscribeLegal,
                  invalid: page.subscribeInvalid
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
