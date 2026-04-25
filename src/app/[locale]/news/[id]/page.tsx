import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Clock,
  MapPin,
  Tag,
  User,
  Calendar,
  Newspaper
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import ShareButtons from '@/components/news/ShareButtons';

type NewsItem = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  excerpt: string;
  category: string;
  tags?: string[];
  author?: string;
  location?: string;
  minutes?: number;
  coverImage?: string;
  body?: string[];
};

export async function generateStaticParams() {
  const en = (
    await import('../../../../../messages/en.json').then((m) => m.default)
  ).news.items as NewsItem[];
  return en.map((item) => ({ id: item.id }));
}

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const t = await getTranslations('news');
  const items = t.raw('items') as NewsItem[];
  const page = t.raw('page') as any;
  const tabs = t.raw('tabs') as Record<string, string>;
  const breadcrumb = page.breadcrumb as { home: string; current: string };

  // Newest first
  const sorted = [...items].sort((a, b) =>
    (b.date || '').localeCompare(a.date || '')
  );
  const index = sorted.findIndex((x) => x.id === id);
  if (index < 0) notFound();

  const article = sorted[index];
  const prev = sorted[index + 1]; // older
  const next = sorted[index - 1]; // newer
  const related = sorted
    .filter((x) => x.id !== id && x.category === article.category)
    .slice(0, 3);

  const d = new Date(article.date);
  const ok = !Number.isNaN(d.getTime());
  const day = ok ? String(d.getUTCDate()).padStart(2, '0') : '';
  const month = ok ? String(d.getUTCMonth() + 1).padStart(2, '0') : '';
  const year = ok ? String(d.getUTCFullYear()) : '';
  const longDate = ok
    ? d.toLocaleDateString(l === 'zh' ? 'zh-CN' : 'en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : article.date;

  const shareUrl = `https://www.dynai.com/${locale}/news/${article.id}`;
  const body = Array.isArray(article.body) ? article.body : [];

  return (
    <>
      {/* ── Hero with cover image ─────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          {article.coverImage && (
            <Image
              src={article.coverImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50"
            />
          )}
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/60 to-ink-950"
          aria-hidden
        />

        <div className="relative container-wide pt-28 md:pt-36 pb-16 md:pb-24">
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
                    href="/news"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {breadcrumb.current}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3 w-3 text-white/40" />
                </li>
                <li className="text-white font-semibold truncate max-w-[55vw]">
                  {article.title}
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-ink-950 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]">
                <Tag className="h-3 w-3" />
                {article.category}
              </span>
              {article.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-8 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">
              {article.title}
            </h1>
          </Reveal>
          {article.subtitle && (
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-3xl text-base md:text-lg text-white/75 leading-relaxed">
                {article.subtitle}
              </p>
            </Reveal>
          )}

          {/* Meta strip */}
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-accent-light" />
                <time dateTime={article.date} className="font-mono tabular-nums">
                  {longDate}
                </time>
              </span>
              {article.author && (
                <span className="inline-flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-accent-light" />
                  {page.author} {article.author}
                </span>
              )}
              {article.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-accent-light" />
                  {article.location}
                </span>
              )}
              {article.minutes != null && (
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-accent-light" />
                  {article.minutes} {t('minuteRead')}
                </span>
              )}
            </div>
          </Reveal>
        </div>

        {/* Stacked date badge bottom-left */}
        <div
          className="hidden md:block absolute bottom-0 left-0 translate-x-10 translate-y-1/2 rounded-2xl bg-white text-ink-900 px-5 py-3 font-mono leading-tight tabular-nums shadow-xl z-10"
          aria-hidden
        >
          <p className="text-5xl font-semibold leading-none">{day}</p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
            {year}-{month}
          </p>
        </div>
      </section>

      {/* ── Body + share sidebar ──────────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-y-14 lg:gap-x-12">
          {/* Share sidebar (desktop) */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-28">
              <ShareButtons
                title={article.title}
                url={shareUrl}
                labels={{
                  label: page.shareLabel,
                  copy: page.copy,
                  copied: page.copied
                }}
                variant="stacked"
              />
            </div>
          </aside>

          {/* Body */}
          <article className="lg:col-span-7 max-w-3xl">
            <Reveal>
              <p className="text-lg md:text-xl text-ink-700 leading-relaxed font-medium">
                {article.excerpt}
              </p>
            </Reveal>

            <div className="mt-10 space-y-7">
              {body.length === 0 ? (
                <p className="italic text-ink-400">
                  {l === 'zh'
                    ? '— 完整正文将由内容团队补充 —'
                    : '— Full article body to be supplied by the content team —'}
                </p>
              ) : (
                body.map((paragraph, i) => (
                  <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                    <p
                      className={`text-base md:text-lg text-ink-800 leading-relaxed ${
                        i === 0
                          ? "first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-medium first-letter:text-ink-900 first-letter:leading-[0.85]"
                          : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  </Reveal>
                ))
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <Reveal delay={0.1}>
                <ul className="mt-12 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-ink-50 px-3 py-1.5 text-[11px] font-semibold text-ink-600 uppercase tracking-[0.18em]"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Share (mobile) */}
            <div className="mt-10 pt-10 border-t border-ink-100 lg:hidden">
              <ShareButtons
                title={article.title}
                url={shareUrl}
                labels={{
                  label: page.shareLabel,
                  copy: page.copy,
                  copied: page.copied
                }}
              />
            </div>

            {/* Prev / Next */}
            <nav
              aria-label="Article navigation"
              className="mt-14 pt-10 border-t border-ink-100 grid sm:grid-cols-2 gap-4"
            >
              {prev ? (
                <Link
                  href={`/news/${prev.id}` as any}
                  className="group block rounded-xl border border-ink-200/80 bg-white p-5 hover:border-ink-900/20 hover:bg-ink-50 transition-colors"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-2">
                    <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
                    {page.prevArticle}
                  </p>
                  <p className="mt-2 font-semibold text-ink-900 text-sm md:text-base line-clamp-2 group-hover:text-brand-800 transition-colors">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/news/${next.id}` as any}
                  className="group block rounded-xl border border-ink-200/80 bg-white p-5 text-right hover:border-ink-900/20 hover:bg-ink-50 transition-colors"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-2">
                    {page.nextArticle}
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </p>
                  <p className="mt-2 font-semibold text-ink-900 text-sm md:text-base line-clamp-2 group-hover:text-brand-800 transition-colors">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>

          {/* Related sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28">
              <p className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                <Newspaper className="h-3.5 w-3.5" />
                {page.related}
              </p>

              {related.length === 0 ? (
                <p className="mt-6 text-sm text-ink-500">
                  {l === 'zh'
                    ? '暂无同类相关故事。'
                    : 'No related stories in this category yet.'}
                </p>
              ) : (
                <ul className="mt-6 space-y-4">
                  {related.map((r) => {
                    const rd = new Date(r.date);
                    const rok = !Number.isNaN(rd.getTime());
                    const rday = rok ? String(rd.getUTCDate()).padStart(2, '0') : '';
                    const rym = rok
                      ? `${rd.getUTCFullYear()}-${String(
                          rd.getUTCMonth() + 1
                        ).padStart(2, '0')}`
                      : r.date;
                    return (
                      <li key={r.id}>
                        <Link
                          href={`/news/${r.id}` as any}
                          className="group flex gap-4 rounded-xl overflow-hidden border border-ink-100 bg-white hover:border-ink-900/20 hover:bg-ink-50 transition-colors"
                        >
                          <div className="relative w-24 md:w-28 flex-shrink-0 aspect-square bg-ink-900 overflow-hidden">
                            {r.coverImage && (
                              <Image
                                src={r.coverImage}
                                alt=""
                                fill
                                sizes="120px"
                                className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                              />
                            )}
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent"
                              aria-hidden
                            />
                            <span className="absolute top-2 left-2 rounded-md bg-white/95 backdrop-blur-sm text-ink-900 px-1.5 py-0.5 font-mono text-[9px] font-semibold tabular-nums leading-tight">
                              <span className="block text-sm leading-none">{rday}</span>
                              <span className="block text-[8px] tracking-[0.15em] uppercase text-ink-500">
                                {rym.slice(5)}
                              </span>
                            </span>
                          </div>
                          <div className="flex-1 min-w-0 py-3 pr-3">
                            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400">
                              {r.category}
                            </p>
                            <p className="mt-1 font-semibold text-sm text-ink-900 leading-snug line-clamp-3 group-hover:text-brand-800 transition-colors">
                              {r.title}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="mt-8 pt-8 border-t border-ink-100">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-ink-900 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {page.back}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
