'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FlaskConical, Microscope, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

type Facility = { title: string; tag: string; caption: string };

const facilityImages = [
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80'
];

const facilityIcons = [FlaskConical, Microscope, ShieldCheck];

const credentials: { zh: string; en: string }[] = [
  { zh: '江苏省工程技术研发中心', en: 'Jiangsu Provincial R&D Centre' },
  { zh: '博士后流动分站', en: 'Postdoctoral Research Station' },
  { zh: '校企联合研发中心', en: 'University–Industry Joint Centre' },
  { zh: '多项自主知识产权关键技术', en: 'Proprietary Core Technologies' }
];

export default function RDSection() {
  const t = useTranslations('rd');
  const locale = useLocale() as 'en' | 'zh';
  const facilities = t.raw('facilities') as Facility[];

  return (
    <section className="relative overflow-hidden section bg-ink-50">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end mb-14 md:mb-20">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                02 · {t('eyebrow')}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t('title')}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <p className="text-base md:text-lg text-ink-600 leading-relaxed">{t('body')}</p>
            </Reveal>
          </div>
        </div>

        {/* Facility cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {facilities.map((f, i) => {
            const Icon = facilityIcons[i % facilityIcons.length];
            return (
              <Reveal key={f.title} delay={0.05 + i * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-ink-200/70 shadow-sm hover:shadow-xl hover:shadow-ink-900/5 transition-shadow duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-900">
                    <Image
                      src={facilityImages[i % facilityImages.length]}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" aria-hidden />

                    {/* Top tag */}
                    <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-900">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {f.tag}
                    </div>

                    {/* Bottom caption overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                          <Icon className="h-4 w-4 text-accent-light" />
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight leading-snug">
                            {f.title}
                          </h3>
                          <p className="mt-2 text-sm text-white/75 leading-relaxed line-clamp-3 group-hover:text-white transition-colors">
                            {f.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5">
                    <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-ink-400">
                      0{i + 1} / 0{facilities.length}
                    </span>
                    <span className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-ink-200 text-ink-500 group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-white transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        {/* Credentials ribbon */}
        <Reveal delay={0.3}>
          <ul className="mt-16 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-ink-200/80 bg-white overflow-hidden">
            {credentials.map((c, i) => (
              <li
                key={i}
                className={
                  'py-6 md:py-7 px-5 md:px-7 flex items-start gap-3 ' +
                  (i > 0 ? 'lg:border-l border-ink-200/80 ' : '') +
                  (i >= 2 ? 'border-t lg:border-t-0 border-ink-200/80 ' : '') +
                  (i === 1 ? 'border-l border-ink-200/80 ' : '')
                }
              >
                <span className="font-mono text-xs tracking-widest text-ink-400 pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base font-medium text-ink-900 leading-snug">
                  {locale === 'zh' ? c.zh : c.en}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12">
            <Link
              href="/rd"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-900"
            >
              <span className="border-b border-ink-900 pb-0.5">{t('cta')}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
