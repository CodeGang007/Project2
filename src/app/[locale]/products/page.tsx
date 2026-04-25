import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ChevronRight, ArrowUpRight, Sparkles, FlaskConical } from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import CatalogSearch from '@/components/products/CatalogSearch';
import { productData, getAllProducts } from '@/data/products';

export default async function ProductsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const t = await getTranslations('products');
  const categories = t.raw('categories') as {
    slug: string;
    name: string;
    tagline: string;
  }[];

  const breadcrumb = t.raw('page.breadcrumb') as { home: string; current: string };
  const stats = t.raw('page.stats') as {
    categories: string;
    skus: string;
    iso: string;
    bases: string;
  };

  const totalSkus = getAllProducts().length;

  // Build a map slug -> localized name for the search component
  const categoryMap: Record<string, string> = {};
  categories.forEach((c) => {
    categoryMap[c.slug] = c.name;
  });

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85"
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

        <div className="relative container-wide pt-28 md:pt-36 pb-20 md:pb-28">
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
              <Sparkles className="h-3 w-3" />
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

          {/* Search bar */}
          <Reveal delay={0.2}>
            <div className="mt-10 md:mt-12">
              <CatalogSearch
                locale={l}
                placeholder={t('page.searchPlaceholder')}
                emptyLabel={t('page.searchEmpty')}
                viewLabel={t('page.searchViewDetail')}
                categoryMap={categoryMap}
              />
            </div>
          </Reveal>

          {/* Stats strip */}
          <Reveal delay={0.25}>
            <dl className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 max-w-3xl">
              {[
                { value: String(categories.length), label: stats.categories },
                { value: `${totalSkus}+`, label: stats.skus },
                { value: '3', label: stats.bases },
                { value: 'ISO', label: stats.iso }
              ].map((s) => (
                <div key={s.label} className="bg-ink-950/90 p-5">
                  <dd className="font-display font-medium text-3xl md:text-4xl leading-none text-white tabular-nums">
                    {s.value}
                  </dd>
                  <dt className="mt-2 text-[11px] text-white/60 leading-tight">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Category grid ──────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <FlaskConical className="h-3.5 w-3.5" />
                  01 · {t('page.categoriesTitle')}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                  {t('page.categoriesTitle')}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="text-base text-ink-600 max-w-md">{t('page.categoriesLead')}</p>
            </Reveal>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {categories.map((c, i) => {
              const data = productData[c.slug];
              const overview = data?.overview[l] ?? c.tagline;
              const skuCount =
                data?.series.reduce((acc, s) => acc + s.products.length, 0) ?? 0;
              return (
                <Reveal key={c.slug} delay={0.04 + i * 0.05}>
                  <li>
                    <Link
                      href={`/products/${c.slug}` as any}
                      className="group block h-full"
                    >
                      <article className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white hover:border-ink-900/20 hover:shadow-[0_30px_60px_-25px_rgba(8,8,7,0.25)] transition-all duration-500">
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
                          {data?.heroImage && (
                            <Image
                              src={data.heroImage}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                              className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            />
                          )}
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent"
                            aria-hidden
                          />
                          <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm text-ink-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                            <span className="font-mono tabular-nums">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            · {c.slug}
                          </span>
                          {skuCount > 0 && (
                            <span className="absolute top-5 right-5 inline-flex items-center rounded-full bg-ink-950/70 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] tabular-nums">
                              {skuCount} SKU
                            </span>
                          )}
                          <div className="absolute bottom-5 left-5 right-5">
                            <h3 className="text-white font-display font-medium text-2xl md:text-3xl leading-tight">
                              {c.name}
                            </h3>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 flex flex-col gap-4 flex-1">
                          <p className="text-sm text-ink-600 leading-relaxed line-clamp-3">
                            {overview}
                          </p>

                          {data?.applications?.[l] && (
                            <ul className="flex flex-wrap gap-1.5">
                              {data.applications[l].slice(0, 4).map((app) => (
                                <li
                                  key={app}
                                  className="rounded-full bg-ink-50 border border-ink-200/80 px-2.5 py-1 text-[10.5px] font-semibold text-ink-600"
                                >
                                  {app}
                                </li>
                              ))}
                            </ul>
                          )}

                          <div className="mt-auto pt-4 border-t border-ink-100 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover:text-brand-800 transition-colors">
                              {t('page.categoryCardCta')}
                              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400">
                              /typeid/{c.slug}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
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
