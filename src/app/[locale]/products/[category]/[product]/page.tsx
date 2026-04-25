import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  FileDown,
  BookOpen,
  Layers
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import {
  productData,
  findProduct,
  relatedProducts,
  type ProductSpecRow
} from '@/data/products';
import MolecularFormula from '@/components/products/MolecularFormula';
import MoleculeArt from '@/components/products/MoleculeArt';
import RequestQuoteButton from '@/components/products/RequestQuoteButton';
import CompareToggleButton from '@/components/products/CompareToggleButton';

type PageParams = { locale: string; category: string; product: string };

export function generateStaticParams() {
  const params: { category: string; product: string }[] = [];
  for (const cat of Object.values(productData)) {
    for (const series of cat.series) {
      for (const p of series.products) {
        if (p.details) params.push({ category: cat.slug, product: p.id });
      }
    }
  }
  return params;
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<PageParams>;
}) {
  const { locale, category, product } = await params;
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const match = findProduct(category, product);
  if (!match || !match.product.details) notFound();

  const { category: cat, series, product: p } = match;
  const details = p.details!;
  const name = l === 'zh' ? p.nameZh : p.nameEn;

  const t = await getTranslations('products');
  const categories = t.raw('categories') as {
    slug: string;
    name: string;
    tagline: string;
  }[];
  const catLabel = categories.find((c) => c.slug === cat.slug)?.name ?? cat.slug;
  const breadcrumb = t.raw('page.breadcrumb') as { home: string; current: string };
  const detailLabels = t.raw('page.detail') as {
    breadcrumb: string;
    summary: string;
    spec: string;
    applications: string;
    packaging: string;
    transport: string;
    share: string;
    back: string;
  };
  const quoteLabels = t.raw('page.quote') as any;

  const related = relatedProducts(cat.slug, p.id, 4);

  return (
    <>
      {/* ── Hero (split) ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={cat.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/85 to-brand-900/60"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '56px 56px'
          }}
        />

        <div className="relative container-wide pt-28 md:pt-36 pb-14 md:pb-20">
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
                <li>
                  <Link
                    href={`/products/${cat.slug}` as any}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {catLabel}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3 w-3 text-white/40" />
                </li>
                <li className="text-white font-semibold truncate max-w-[50vw]">
                  {p.shortCode || name}
                </li>
              </ol>
            </nav>
          </Reveal>

          <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-center">
            {/* Left: textual info */}
            <div className="lg:col-span-7">
              <Reveal delay={0.05}>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
                  <Layers className="h-3 w-3" />
                  {l === 'zh' ? series.titleZh : series.titleEn}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-5 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  {name}
                </h1>
              </Reveal>

              {details.summary && (
                <Reveal delay={0.15}>
                  <p className="mt-5 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
                    {details.summary[l]}
                  </p>
                </Reveal>
              )}

              {/* Inline key facts */}
              <Reveal delay={0.2}>
                <dl className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
                  {p.shortCode && (
                    <div>
                      <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/50">
                        {l === 'zh' ? '简称' : 'Code'}
                      </dt>
                      <dd className="mt-0.5 text-white font-semibold">{p.shortCode}</dd>
                    </div>
                  )}
                  {details.cas && (
                    <div>
                      <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/50">
                        CAS
                      </dt>
                      <dd className="mt-0.5 text-white font-mono tabular-nums">
                        {details.cas}
                      </dd>
                    </div>
                  )}
                  {details.formula && (
                    <div>
                      <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/50">
                        {l === 'zh' ? '分子式' : 'Formula'}
                      </dt>
                      <dd className="mt-0.5">
                        <MolecularFormula
                          formula={details.formula}
                          className="text-white"
                        />
                      </dd>
                    </div>
                  )}
                  {details.molecularWeight && (
                    <div>
                      <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/50">
                        MW
                      </dt>
                      <dd className="mt-0.5 text-white tabular-nums">
                        {details.molecularWeight}
                      </dd>
                    </div>
                  )}
                </dl>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <RequestQuoteButton
                    productLabel={`${p.shortCode ? p.shortCode + ' — ' : ''}${name}`}
                    variant="both"
                    labels={quoteLabels}
                  />
                  {p.msdsUrl && (
                    <a
                      href={p.msdsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white bg-white/5 backdrop-blur-md px-4 py-2.5 text-sm font-semibold hover:bg-white hover:text-ink-900 transition-colors"
                    >
                      <FileDown className="h-3.5 w-3.5" />
                      MSDS
                      {(p.msdsSize || p.msdsLang) && (
                        <span className="text-[10px] font-mono text-white/50">
                          · {[p.msdsLang, p.msdsSize].filter(Boolean).join(' · ')}
                        </span>
                      )}
                    </a>
                  )}
                  <CompareToggleButton
                    category={cat.slug}
                    productId={p.id}
                    locale={l}
                    labels={{
                      add: l === 'zh' ? '加入对比' : 'Add to compare',
                      added: l === 'zh' ? '已加入对比' : 'In compare',
                      full: l === 'zh' ? '对比栏已满' : 'Compare full'
                    }}
                  />
                </div>
              </Reveal>
            </div>

            {/* Right: molecular art card */}
            <Reveal delay={0.2} className="lg:col-span-5">
              <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-brand-900/80 via-ink-900 to-ink-950 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 text-accent-light/50">
                  <MoleculeArt seed={Number.parseInt(p.id, 36) || 13} />
                </div>
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
                    {l === 'zh' ? '结构示意' : 'Molecular art'}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                    ID · {p.id}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  {details.formula && (
                    <MolecularFormula
                      formula={details.formula}
                      className="text-4xl md:text-5xl text-white font-semibold"
                    />
                  )}
                  {details.appearance && (
                    <p className="mt-2 text-xs text-white/65 font-medium">
                      {details.appearance[l]}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Spec table ────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                01 · {detailLabels.spec}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-3xl md:text-4xl leading-[1.1]">
                {detailLabels.spec}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-sm text-ink-600 leading-relaxed">
                {l === 'zh'
                  ? '出厂质量按以下参数控制，每批次均附带 COA 检验报告。'
                  : 'Every lot ships with a COA that verifies each of the parameters below.'}
              </p>
            </Reveal>

            {(details.packaging || details.transport) && (
              <Reveal delay={0.15}>
                <dl className="mt-8 space-y-5">
                  {details.packaging && (
                    <div>
                      <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400">
                        {detailLabels.packaging}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-ink-900">
                        {details.packaging[l]}
                      </dd>
                    </div>
                  )}
                  {details.transport && (
                    <div>
                      <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400">
                        {detailLabels.transport}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-ink-900">
                        {details.transport[l]}
                      </dd>
                    </div>
                  )}
                </dl>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-2xl border border-ink-200/80 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {details.spec.map((row: ProductSpecRow, i) => {
                    const value =
                      typeof row.value === 'string' ? row.value : row.value[l];
                    return (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? 'bg-ink-50/60' : 'bg-white'}
                      >
                        <th
                          scope="row"
                          className="text-left p-5 md:p-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500 w-1/2"
                        >
                          {row.label[l]}
                        </th>
                        <td className="p-5 md:p-6 text-sm md:text-base font-medium text-ink-900">
                          {value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Applications ──────────────────────────────────── */}
      <section className="section bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                <BookOpen className="h-3.5 w-3.5" />
                02 · {detailLabels.applications}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-3xl md:text-4xl leading-[1.1]">
                {detailLabels.applications}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-8">
            <ol className="space-y-6">
              {details.applications[l].map((paragraph: string, i: number) => (
                <li
                  key={i}
                  className="relative pl-10 md:pl-14 text-base md:text-lg text-ink-800 leading-relaxed"
                >
                  <span className="absolute left-0 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-white text-[10px] font-mono tabular-nums tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {paragraph}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── Related products ─────────────────────────────── */}
      {related.length > 0 && (
        <section className="section bg-white">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-12">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                    03 · {t('page.relatedTitle')}
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mt-6 h-display text-3xl md:text-4xl leading-[1.1]">
                    {t('page.relatedTitle')}
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.1}>
                <Link
                  href={`/products/${cat.slug}` as any}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-800"
                >
                  {detailLabels.back}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {related.map((r, i) => {
                const href = r.details
                  ? `/products/${cat.slug}/${r.id}`
                  : `/products/${cat.slug}`;
                return (
                  <Reveal key={r.id} delay={0.04 + i * 0.04}>
                    <li>
                      <Link
                        href={href as any}
                        className="group flex flex-col h-full rounded-2xl border border-ink-200/80 bg-white p-5 hover:border-ink-900/20 hover:shadow-[0_25px_50px_-20px_rgba(8,8,7,0.2)] transition-all duration-500"
                      >
                        <div className="aspect-[5/3] -mx-5 -mt-5 mb-5 overflow-hidden rounded-t-2xl bg-gradient-to-br from-brand-900/80 via-ink-900 to-ink-950 text-accent-light/50 relative">
                          <MoleculeArt seed={Number.parseInt(r.id, 36) || i} />
                        </div>
                        <div>
                          {r.shortCode && (
                            <span className="inline-flex items-center rounded-full bg-brand-50 text-brand-800 px-2.5 py-0.5 text-[10px] font-semibold">
                              {r.shortCode}
                            </span>
                          )}
                          <p className="mt-2 font-semibold text-sm md:text-base text-ink-900 leading-snug line-clamp-2 group-hover:text-brand-800 transition-colors">
                            {l === 'zh' ? r.nameZh : r.nameEn}
                          </p>
                          {r.cas && (
                            <p className="mt-1 text-[11px] font-mono text-ink-500">
                              CAS · {r.cas}
                            </p>
                          )}
                        </div>
                        <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-ink-900 group-hover:text-brand-800 transition-colors">
                          {t('page.categoryCardCta')}
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>
                    </li>
                  </Reveal>
                );
              })}
            </ul>

            <div className="mt-10">
              <Link
                href={`/products/${cat.slug}` as any}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-ink-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {detailLabels.back}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
