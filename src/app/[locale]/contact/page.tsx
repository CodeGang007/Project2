import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ChevronRight,
  Building2,
  Mail,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  Handshake
} from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import DepartmentCards, {
  type DepartmentItem
} from '@/components/contact/DepartmentCards';
import FacilitiesGrid, {
  type Facility
} from '@/components/contact/FacilitiesGrid';
import ContactFormPro, {
  type Option
} from '@/components/contact/ContactFormPro';

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const t = await getTranslations('contact');
  const productsT = await getTranslations('products');
  const page = t.raw('page') as any;
  const breadcrumb = page.breadcrumb as { home: string; current: string };
  const primary = page.primary as any;
  const departments = page.departments as {
    eyebrow: string;
    title: string;
    lead: string;
    items: DepartmentItem[];
  };
  const facilities = page.facilities as Facility[];
  const form = page.form as any;
  const productCategories = productsT.raw('categories') as { slug: string; name: string }[];

  const productOptions: Option[] = productCategories.map((c) => ({
    value: c.slug,
    label: c.name
  }));
  const departmentOptions: Option[] = departments.items.map((d) => ({
    value: d.key,
    label: d.title
  }));

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/75 to-brand-900/55"
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
              <Handshake className="h-3 w-3" />
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

          {/* Quick contact strip */}
          <Reveal delay={0.2}>
            <dl className="mt-12 grid sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 max-w-3xl">
              <div className="bg-ink-950/85 p-5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 inline-flex items-center gap-1.5">
                  <Phone className="h-3 w-3" />
                  {primary.phoneLabel}
                </dt>
                <dd className="mt-2 font-mono tabular-nums text-lg text-white">
                  <a href={`tel:${t('phone').replace(/\s+/g, '')}`} className="hover:text-accent-light">
                    {t('phone')}
                  </a>
                </dd>
              </div>
              <div className="bg-ink-950/85 p-5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 inline-flex items-center gap-1.5">
                  <Mail className="h-3 w-3" />
                  {primary.emailLabel}
                </dt>
                <dd className="mt-2 text-base text-white">
                  <a href={`mailto:${t('email')}`} className="hover:text-accent-light">
                    {t('email')}
                  </a>
                </dd>
              </div>
              <div className="bg-ink-950/85 p-5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {primary.hoursLabel}
                </dt>
                <dd className="mt-2 text-sm text-white/85">{primary.hours}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Headquarters card + map ───────────────────────── */}
      <section className="relative overflow-hidden section bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-100/50 blur-3xl"
        />
        <div className="relative container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-stretch">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                <Building2 className="h-3.5 w-3.5" />
                01 · {primary.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                {primary.title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 divide-y divide-ink-100 border-y border-ink-100">
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    {primary.addressLabel}
                  </dt>
                  <dd className="text-base text-ink-800 leading-relaxed">{t('address')}</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-1.5">
                    <Phone className="h-3 w-3" />
                    {primary.phoneLabel}
                  </dt>
                  <dd>
                    <a
                      href={`tel:${t('phone').replace(/\s+/g, '')}`}
                      className="font-mono tabular-nums text-base text-ink-900 hover:text-brand-800 transition-colors"
                    >
                      {t('phone')}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-1.5">
                    <Mail className="h-3 w-3" />
                    {primary.emailLabel}
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${t('email')}`}
                      className="text-base text-ink-900 hover:text-brand-800 transition-colors"
                    >
                      {t('email')}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {primary.hoursLabel}
                  </dt>
                  <dd className="text-base text-ink-800">{primary.hours}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden border border-ink-200/80 bg-ink-100">
              <iframe
                title="Dana HQ location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=118.77,32.15,118.83,32.22&layer=mapnik&marker=32.19,118.80"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 inline-flex items-center justify-between gap-3 rounded-xl bg-white/95 backdrop-blur-sm border border-ink-200/80 px-4 py-3 text-sm shadow-lg">
                <span className="font-semibold text-ink-900 inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-brand-700" />
                  {t('mapLabel')}
                </span>
                <a
                  href="https://www.openstreetmap.org/?mlat=32.19&mlon=118.80#map=14/32.19/118.80"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-700 hover:text-brand-800"
                >
                  {l === 'zh' ? '在 OpenStreetMap 中打开' : 'Open in OpenStreetMap'}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Departments ───────────────────────────────────── */}
      <section className="relative section bg-ink-50 border-y border-ink-200/80">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  02 · {departments.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  {departments.title}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base md:text-lg text-ink-600 leading-relaxed">
                {departments.lead}
              </p>
            </Reveal>
          </div>

          <DepartmentCards items={departments.items} />
        </div>
      </section>

      {/* ── Facilities ────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-end mb-10 md:mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                  <MapPin className="h-3.5 w-3.5" />
                  03 · {page.facilitiesTitle}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 h-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  {page.facilitiesTitle}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-base text-ink-600 leading-relaxed">
                {page.facilitiesLead}
              </p>
            </Reveal>
          </div>

          <FacilitiesGrid items={facilities} />
        </div>
      </section>

      {/* ── Form ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden section bg-ink-950 text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/85 to-brand-900/60"
          aria-hidden
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                <Mail className="h-3.5 w-3.5" />
                04 · {form.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-medium tracking-tight text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                {form.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base md:text-lg text-white/70 leading-relaxed">
                {form.lead}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <ContactFormPro
              labels={{
                name: form.name,
                namePlaceholder: form.namePlaceholder,
                company: form.company,
                companyPlaceholder: form.companyPlaceholder,
                email: form.email,
                emailPlaceholder: form.emailPlaceholder,
                phone: form.phone,
                phonePlaceholder: form.phonePlaceholder,
                interest: form.interest,
                interestAny: form.interestAny,
                department: form.department,
                message: form.message,
                messagePlaceholder: form.messagePlaceholder,
                submit: form.submit,
                submitted: form.submitted,
                invalid: form.invalid,
                consent: form.consent
              }}
              productOptions={productOptions}
              departmentOptions={departmentOptions}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
