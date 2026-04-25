'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  Send
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export default function ContactSection() {
  const t = useTranslations('contact');

  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', company: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4500);
  };

  const phoneHref = `tel:${t('phone').replace(/\s/g, '')}`;
  const emailHref = `mailto:${t('email')}`;

  // Luhe District, Nanjing approx coordinates
  const mapSrc =
    'https://www.openstreetmap.org/export/embed.html?bbox=118.80%2C32.33%2C118.92%2C32.42&layer=mapnik&marker=32.375%2C118.865';
  const mapsExternal = 'https://maps.google.com/?q=Nanjing+Luhe+Tiansheng+Road+75';

  return (
    <section className="relative overflow-hidden section bg-gradient-to-b from-ink-950 via-ink-950 to-[#05050a] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-0 h-[400px] w-[600px] rounded-full bg-brand-600/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-accent/10 blur-[140px]"
      />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-14 md:mb-20">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                07 · {t('eyebrow')}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-medium tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t('title')}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-md">
                {t('formSubtitle')}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: contact details + map */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <li>
                  <a
                    href={phoneHref}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all"
                  >
                    <span className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-brand-500/30 to-brand-700/20 border border-brand-400/30 flex items-center justify-center text-brand-200">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-semibold">
                        {t('phoneLabel')}
                      </p>
                      <p className="mt-1.5 text-base md:text-lg font-semibold tracking-tight group-hover:text-accent-light transition-colors break-all">
                        {t('phone')}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={emailHref}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all"
                  >
                    <span className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 flex items-center justify-center text-accent-light">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-semibold">
                        {t('emailLabel')}
                      </p>
                      <p className="mt-1.5 text-sm md:text-base font-semibold group-hover:text-accent-light transition-colors break-all">
                        {t('email')}
                      </p>
                    </div>
                  </a>
                </li>
                <li className="sm:col-span-2 lg:col-span-1">
                  <a
                    href={mapsExternal}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all"
                  >
                    <span className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-700/20 border border-emerald-400/30 flex items-center justify-center text-emerald-200">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-semibold">
                        {t('addressLabel')}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/85 group-hover:text-white transition-colors">
                        {t('address')}
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-xs text-white/70">
                <Clock className="h-3.5 w-3.5 text-accent-light" />
                <span className="font-semibold text-white/80">{t('hoursLabel')}:</span>
                <span>{t('hoursValue')}</span>
              </div>
            </Reveal>

            {/* Embedded map */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <iframe
                  title={t('mapLabel')}
                  src={mapSrc}
                  className="w-full h-[280px] md:h-[320px] grayscale-[0.3] contrast-[1.05] invert-[0.92] hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="px-5 py-3 flex items-center justify-between border-t border-white/10 text-xs">
                  <span className="text-white/60">{t('mapLabel')}</span>
                  <a
                    href={mapsExternal}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-accent-light hover:text-white transition-colors"
                  >
                    Open in Maps <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: contact form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 md:p-10">
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight">
                  {t('formTitle')}
                </h3>
                <p className="mt-2 text-sm text-white/65 max-w-md">{t('formSubtitle')}</p>

                <form onSubmit={submit} className="mt-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/60">
                        {t('formName')}
                      </span>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t('formNamePlaceholder')}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-accent-light focus:bg-white/10 transition-all"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/60">
                        {t('formCompany')}
                      </span>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder={t('formCompanyPlaceholder')}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-accent-light focus:bg-white/10 transition-all"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/60">
                      {t('formEmail')}
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t('formEmailPlaceholder')}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-accent-light focus:bg-white/10 transition-all"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/60">
                      {t('formMessage')}
                    </span>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t('formMessagePlaceholder')}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-accent-light focus:bg-white/10 transition-all resize-none"
                    />
                  </label>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p className="text-[11px] text-white/40">
                      We'll never share your contact details.
                    </p>
                    <button
                      type="submit"
                      disabled={submitted}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink-900 pl-6 pr-5 py-3.5 text-sm font-semibold hover:bg-accent-light transition-colors disabled:opacity-80"
                    >
                      {submitted ? (
                        <>
                          <Check className="h-4 w-4" /> {t('formSuccess')}
                        </>
                      ) : (
                        <>
                          {t('formSubmit')}
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-white group-hover:translate-x-0.5 transition-transform">
                            <Send className="h-3 w-3" />
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  <span className="border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                    {t('cta')}
                  </span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
