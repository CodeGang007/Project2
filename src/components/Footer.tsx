'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Youtube,
  Twitter,
  MessageCircle,
  ArrowUp,
  Check
} from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const footerGroups: {
  key: string;
  href: string;
  children?: { key: string; href: string }[];
}[] = [
  {
    key: 'about',
    href: '/about',
    children: [
      { key: 'aboutCompany', href: '/about' },
      { key: 'research', href: '/rd' },
      { key: 'publication', href: '/newsletter' }
    ]
  },
  { key: 'products', href: '/products' },
  { key: 'news', href: '/news' },
  {
    key: 'joinUs',
    href: '/careers',
    children: [
      { key: 'careers', href: '/careers' },
      { key: 'jobs', href: '/jobs' }
    ]
  },
  {
    key: 'sustainability',
    href: '/sustainability/disclosure',
    children: [
      { key: 'disclosure', href: '/sustainability/disclosure' },
      { key: 'safety', href: '/sustainability/safety' },
      { key: 'community', href: '/sustainability/community' }
    ]
  },
  { key: 'contact', href: '/contact' }
];

const socials = [
  { name: 'LinkedIn', href: '#', Icon: Linkedin },
  { name: 'WeChat', href: '#', Icon: MessageCircle },
  { name: 'YouTube', href: '#', Icon: Youtube },
  { name: 'Twitter', href: '#', Icon: Twitter }
];

export default function Footer() {
  const t = useTranslations('nav');
  const tf = useTranslations('footer');
  const tc = useTranslations('contact');

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3500);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-ink-900 via-ink-900 to-ink-950 text-white">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-brand-600/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 right-0 h-[380px] w-[600px] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative container-wide pt-20 pb-12">
        {/* Top CTA block */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 pb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-light">
              {tf('newsletterTitle')}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08]">
              Chemistry that <span className="bg-gradient-to-r from-brand-300 to-accent-light bg-clip-text text-transparent">moves industries</span> forward.
            </h2>
            <p className="mt-5 max-w-xl text-base text-white/70 leading-relaxed">
              {tf('newsletterDescription')}
            </p>

            <form onSubmit={handleSubscribe} className="mt-8 max-w-md">
              <div className="relative flex items-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm focus-within:border-brand-300/60 focus-within:bg-white/10 transition-all duration-300">
                <Mail className="absolute left-5 h-4 w-4 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tf('newsletterPlaceholder')}
                  aria-label={tf('newsletterPlaceholder')}
                  className="flex-1 bg-transparent pl-12 pr-2 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="m-1.5 inline-flex items-center gap-1.5 rounded-full bg-white text-ink-900 px-5 py-2.5 text-xs font-semibold hover:bg-accent-light transition-colors duration-200"
                  aria-label={tf('newsletterSubmit')}
                >
                  {submitted ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Subscribed
                    </>
                  ) : (
                    <>
                      {tf('newsletterSubmit')} <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 text-[11px] text-white/40">{tf('newsletterLegal')}</p>
            </form>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-light">
              {tf('contactHeading')}
            </p>

            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <Phone className="h-4 w-4 text-accent-light" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-white/40">Phone</p>
                  <a
                    href={`tel:${tc('phone')}`}
                    className="mt-1 block text-base font-medium text-white hover:text-accent-light transition-colors"
                  >
                    {tc('phone')}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <Mail className="h-4 w-4 text-accent-light" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-white/40">Email</p>
                  <a
                    href={`mailto:${tc('email')}`}
                    className="mt-1 block text-base font-medium text-white hover:text-accent-light transition-colors break-all"
                  >
                    {tc('email')}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <MapPin className="h-4 w-4 text-accent-light" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-white/40">Headquarters</p>
                  <p className="mt-1 text-sm text-white/80 leading-relaxed max-w-xs">
                    {tc('address')}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Sitemap + brand */}
        <div className="grid gap-12 lg:grid-cols-12 pt-16">
          <div className="lg:col-span-4">
            <Logo variant="dark" />
            <p className="mt-6 max-w-sm text-sm text-white/60 leading-relaxed">
              {tf('tagline')}
            </p>

            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                {tf('followUs')}
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white hover:text-ink-900 hover:border-white transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <nav
            className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
            aria-label="Footer"
          >
            {footerGroups.map((group) => (
              <div key={group.key}>
                <Link
                  href={group.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light hover:text-white transition-colors"
                >
                  {t(group.key)}
                </Link>
                {group.children && (
                  <ul className="mt-5 space-y-3">
                    {group.children.map((child) => (
                      <li key={child.key}>
                        <Link
                          href={child.href}
                          className="group inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {t(child.key)}
                          <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom legal strip */}
      <div className="relative border-t border-white/10 bg-ink-950/60 backdrop-blur-sm">
        <div className="container-wide py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>{tf('copyright')}</p>
            <span aria-hidden className="hidden md:inline text-white/20">·</span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              {tf('icp')}
            </a>
          </div>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                {tf('sitemap')}
              </Link>
            </li>
            <li>
              <Link href="/legal" className="hover:text-white transition-colors">
                {tf('legal.privacy')}
              </Link>
            </li>
            <li>
              <Link href="/legal" className="hover:text-white transition-colors">
                {tf('legal.terms')}
              </Link>
            </li>
            <li className="pl-3 ml-1 border-l border-white/15">
              <LanguageSwitcher variant="dark" traditionalLabel />
            </li>
            <li>
              <button
                type="button"
                onClick={scrollTop}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 hover:border-white hover:text-white transition-colors"
                aria-label={tf('backToTop')}
              >
                <ArrowUp className="h-3 w-3" />
                <span>{tf('backToTop')}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
