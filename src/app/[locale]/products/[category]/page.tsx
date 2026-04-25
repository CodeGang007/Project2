import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  FlaskConical,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import { productData } from '@/data/products';
import CategoryTabs from '@/components/products/CategoryTabs';
import ProductTable from '@/components/products/ProductTable';
import RequestQuoteButton from '@/components/products/RequestQuoteButton';
import MoleculeArt from '@/components/products/MoleculeArt';

type PageParams = { locale: string; category: string };

export function generateStaticParams() {
  return Object.keys(productData).map((category) => ({ category }));
}

export default async function ProductCategoryPage({
  params
}: {
  params: Promise<PageParams>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const t = await getTranslations('products');
  const categories = t.raw('categories') as {
    slug: string;
    name: string;
    tagline: string;
  }[];

  const label = categories.find((c) => c.slug === category);
  if (!label) notFound();

  const data = productData[category];
  if (!data) notFound();

  const breadcrumb = t.raw('page.breadcrumb') as { home: string; current: string };
  const tableLabels = t.raw('page.table') as any;
  const quoteLabels = t.raw('page.quote') as any;

  // Use COA label for category 20 (water-based resins) per spec
  const useCoa = category === '20';

  const totalSkus = data.series.reduce((a, s) => a + s.products.length, 0);

  return (
    <>
      {/* ── Category hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={data.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/80 to-brand-900/60"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
          aria-hidden
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
                    href="/products"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {breadcrumb.current}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3 w-3 text-white/40" />
                </li>
                <li className="text-white font-semibold truncate max-w-[50vw]">
                  {label.name}
                </li>
              </ol>
            </nav>
          </Reveal>

          <div className="mt-8 md:mt-10 grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
                  <FlaskConical className="h-3 w-3" />
                  /typeid/{data.slug}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-5 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">
                  {label.name}
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-2xl text-sm md:text-base text-white/75 leading-relaxed line-clamp-4">
                  {data.overview[l]}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-4">
              <dl className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                <div className="bg-ink-950/80 p-5">
                  <dd className="font-display font-medium text-3xl md:text-4xl leading-none text-white tabular-nums">
                    {totalSkus}+
                  </dd>
                  <dt className="mt-2 text-[11px] text-white/60 leading-tight">SKUs</dt>
                </div>
                <div className="bg-ink-950/80 p-5">
                  <dd className="font-display font-medium text-3xl md:text-4xl leading-none text-white tabular-nums">
                    {data.series.length}
                  </dd>
                  <dt className="mt-2 text-[11px] text-white/60 leading-tight">
                    {l === 'zh' ? '系列' : 'Series'}
                  </dt>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="mt-14 md:mt-20 border-t border-white/10 pt-1">
            <CategoryTabs tabs={categories} activeSlug={category} />
          </div>
        </div>
      </section>

      {/* ── Overview + applications ───────────────────────── */}
      <section className="relative overflow-hidden section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-100/50 blur-3xl"
        />
        <div className="relative container-wide grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                01 · {t('page.categoryOverview')}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                {label.name}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-ink-600 leading-relaxed">
                {data.overview[l]}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                <RequestQuoteButton
                  productLabel={label.name}
                  variant="both"
                  labels={quoteLabels}
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-ink-200/80 bg-gradient-to-br from-ink-900 via-brand-900/90 to-ink-950 text-white p-6 md:p-8 min-h-[280px]">
              <div className="absolute inset-0 text-accent-light/40 pointer-events-none">
                <MoleculeArt seed={Number.parseInt(category, 10) || 13} />
              </div>
              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent-light">
                  <Sparkles className="inline h-3 w-3 -mt-0.5 mr-1" />
                  {t('page.categoryApplications')}
                </p>
                {data.applications?.[l] && (
                  <ul className="mt-5 grid grid-cols-2 gap-2.5">
                    {data.applications[l].map((app) => (
                      <li
                        key={app}
                        className="rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm px-3.5 py-2.5 text-sm font-medium"
                      >
                        {app}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Product table ─────────────────────────────────── */}
      <section className="relative section bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide">
          <div className="max-w-2xl mb-10 md:mb-12">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                02 · {tableLabels.productName}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-3xl md:text-4xl leading-[1.1]">
                {l === 'zh' ? '全部产品' : 'All products'}
              </h2>
            </Reveal>
          </div>

          <ProductTable
            category={data}
            locale={l}
            labels={tableLabels}
            useCoa={useCoa}
          />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden section bg-ink-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-center">
          <div className="lg:col-span-8">
            <h2 className="font-medium tracking-tight text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-2xl">
              {l === 'zh'
                ? '需要定制化的规格、包装或认证？'
                : 'Need bespoke specifications, packaging or certifications?'}
            </h2>
            <p className="mt-5 max-w-xl text-base text-white/70">
              {l === 'zh'
                ? '我们的销售与技术团队将在一个工作日内与您对接。'
                : "Our sales and technical team will reach out within one business day."}
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <RequestQuoteButton
              productLabel={label.name}
              variant="both"
              labels={quoteLabels}
            />
          </div>
        </div>
      </section>
    </>
  );
}
