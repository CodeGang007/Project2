import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  Map,
  ArrowUpRight,
  Building2,
  FlaskConical,
  Leaf,
  Newspaper,
  Users,
  Mail
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';

type SiteLink = {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
};
type SiteGroup = { title: string; items: SiteLink[] };

const groupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Company: Building2,
  公司: Building2,
  Products: FlaskConical,
  产品: FlaskConical,
  Sustainability: Leaf,
  可持续发展: Leaf,
  Newsroom: Newspaper,
  新闻: Newspaper,
  'Join Us': Users,
  加入我们: Users,
  Contact: Mail,
  联系: Mail
};

export default async function SitemapPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const t = await getTranslations('sitemap');
  const groups = t.raw('groups') as SiteGroup[];
  const breadcrumb = t.raw('breadcrumb') as { home: string; current: string };

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/80 to-brand-900/55"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '56px 56px'
          }}
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
                <li className="text-white font-semibold">{breadcrumb.current}</li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
              <Map className="h-3 w-3" />
              {t('heroTag')}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-medium tracking-tight text-5xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl">
              {t('heroTitle')}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={`/${locale}/sitemap.xml`}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2.5 text-sm font-semibold hover:bg-white hover:text-ink-900 transition-colors"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              {t('xmlLabel')}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Grouped grid ──────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {groups.map((group, gi) => {
              const Icon = groupIcons[group.title] || Map;
              return (
                <Reveal key={group.title} delay={0.04 + gi * 0.04}>
                  <li className="rounded-2xl border border-ink-200/80 bg-white p-6 md:p-7 h-full hover:border-ink-900/20 hover:shadow-[0_25px_50px_-25px_rgba(8,8,7,0.18)] transition-all duration-500">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-ink-300 tabular-nums">
                        {String(gi + 1).padStart(2, '0')} · {group.items.length} {l === 'zh' ? '页' : 'pages'}
                      </span>
                    </div>
                    <h2 className="mt-5 h-display text-xl md:text-2xl">{group.title}</h2>

                    <ul className="mt-5 divide-y divide-ink-100 border-t border-ink-100">
                      {group.items.map((item) =>
                        item.external ? (
                          <li key={item.href}>
                            <a
                              href={`/${locale}${item.href}`}
                              className="group block py-3.5"
                            >
                              <p className="flex items-center gap-2 text-sm font-semibold text-ink-900 group-hover:text-brand-800 transition-colors">
                                {item.label}
                                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </p>
                              {item.description && (
                                <p className="mt-1 text-xs text-ink-500 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </a>
                          </li>
                        ) : (
                          <li key={item.href}>
                            <Link
                              href={item.href as any}
                              className="group block py-3.5"
                            >
                              <p className="flex items-center gap-2 text-sm font-semibold text-ink-900 group-hover:text-brand-800 transition-colors">
                                {item.label}
                                <ChevronRight className="h-3.5 w-3.5 text-ink-300 group-hover:text-brand-700 group-hover:translate-x-0.5 transition-all" />
                              </p>
                              {item.description && (
                                <p className="mt-1 text-xs text-ink-500 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
