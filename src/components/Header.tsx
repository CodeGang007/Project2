'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  FlaskConical,
  Cpu,
  Layers3,
  Atom,
  Sparkles,
  Leaf,
  Gauge,
  PaintBucket
} from 'lucide-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

type NavChild = { key: string; href: string };
type NavItem = { key: string; href: string; children?: NavChild[]; mega?: boolean };

const navItems: NavItem[] = [
  { key: 'home', href: '/' },
  {
    key: 'about',
    href: '/about',
    children: [
      { key: 'aboutCompany', href: '/about' },
      { key: 'research', href: '/rd' },
      { key: 'publication', href: '/newsletter' }
    ]
  },
  { key: 'products', href: '/products', mega: true },
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

const productIcons = [
  FlaskConical,
  Cpu,
  Layers3,
  Atom,
  Sparkles,
  Leaf,
  Gauge,
  PaintBucket
];

const productTaglines = [
  { en: 'EG & PG ethers, acetate solvents', zh: '乙/丙二醇醚及醋酸酯' },
  { en: 'Ultra-pure chemicals for electronics', zh: '高纯湿电子化学品' },
  { en: 'Double end-capped polyether series', zh: '双封端聚醚系列' },
  { en: 'EO & concrete admixture monomers', zh: '环氧乙烷及减水剂单体' },
  { en: 'Custom surfactants & functionals', zh: '定制表活与功能产品' },
  { en: 'Non-toxic, eco-friendly plasticisers', zh: '无毒环保增塑剂' },
  { en: 'Brake fluids & base fluids', zh: '制动液及基础液' },
  { en: 'Waterborne resins & low-odour coalescents', zh: '水性树脂与净味助剂' }
];

export default function Header() {
  const t = useTranslations('nav');
  const tProducts = useTranslations('products');
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  const productCategories = useMemo(
    () =>
      (tProducts.raw('categories') as { slug: string; name: string }[]) ?? [],
    [tProducts]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 transition-all duration-300 ease-editorial',
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(18,18,17,0.12)] border-b border-ink-100/70'
          : 'bg-white border-b border-transparent'
      )}
    >
      {/* Slim utility strip */}
      <div
        className={clsx(
          'hidden md:block border-b border-ink-100 transition-[max-height,opacity] duration-300 ease-editorial overflow-hidden',
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        )}
      >
        <div className="container-wide flex h-9 items-center justify-between text-[11px] text-ink-500">
          <div className="flex items-center gap-5">
            <a
              href="tel:4008080280"
              className="inline-flex items-center gap-1.5 hover:text-ink-900 transition-colors"
            >
              <Phone className="h-3 w-3" /> 400 808 0280
            </a>
            <a
              href="mailto:dynai.info@dynai.com"
              className="inline-flex items-center gap-1.5 hover:text-ink-900 transition-colors"
            >
              <Mail className="h-3 w-3" /> dynai.info@dynai.com
            </a>
          </div>
          <LanguageSwitcher traditionalLabel />
        </div>
      </div>

      {/* Main bar */}
      <div className="container-wide flex h-16 md:h-[76px] items-center justify-between gap-4 md:gap-8">
        <Link href="/" className="shrink-0" aria-label="Dynamic / 德纳股份 — Home">
          <Logo />
        </Link>

        <nav className="hidden xl:flex items-center" aria-label="Primary">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const hasChildren = Boolean(item.children || item.mega);

            return (
              <div
                key={item.key}
                className={clsx('relative', item.mega && 'static xl:static')}
                onMouseEnter={() => hasChildren && setOpenDropdown(item.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={clsx(
                    'group relative flex items-center gap-1 px-3.5 py-3 text-[13.5px] font-medium transition-colors duration-200',
                    active ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
                  )}
                  aria-haspopup={hasChildren ? 'true' : undefined}
                  aria-expanded={openDropdown === item.key}
                >
                  {t(item.key)}
                  {hasChildren && (
                    <ChevronDown
                      className={clsx(
                        'h-3 w-3 text-ink-400 transition-transform duration-300',
                        openDropdown === item.key && 'rotate-180'
                      )}
                    />
                  )}
                  <span
                    aria-hidden
                    className={clsx(
                      'absolute left-3.5 right-3.5 -bottom-[1px] h-[2px] bg-gradient-to-r from-brand-500 to-accent origin-left transition-transform duration-300 ease-editorial',
                      openDropdown === item.key || active ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </Link>

                {/* Standard dropdown */}
                <AnimatePresence>
                  {item.children && !item.mega && openDropdown === item.key && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-3 min-w-[240px]"
                    >
                      <div className="bg-white rounded-xl border border-ink-100 shadow-[0_20px_60px_-20px_rgba(18,18,17,0.25)] py-2 overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.key}
                            href={child.href}
                            className={clsx(
                              'flex items-center justify-between px-5 py-3 text-sm transition-colors',
                              isActive(child.href)
                                ? 'text-ink-900 bg-ink-50'
                                : 'text-ink-700 hover:bg-ink-50 hover:text-ink-900'
                            )}
                          >
                            <span>{t(child.key)}</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mega menu for products */}
                <AnimatePresence>
                  {item.mega && openDropdown === item.key && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="fixed left-0 right-0 top-[calc(var(--header-h,76px))] pt-3 hidden xl:block"
                      style={{ ['--header-h' as string]: scrolled ? '76px' : '112px' }}
                    >
                      <div className="container-wide">
                        <div className="bg-white rounded-2xl border border-ink-100 shadow-[0_30px_80px_-20px_rgba(18,18,17,0.25)] overflow-hidden">
                          <div className="grid grid-cols-12 gap-0">
                            <div className="col-span-3 bg-gradient-to-br from-ink-900 via-brand-900 to-brand-800 text-white p-8 flex flex-col justify-between">
                              <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent-light">
                                  {tProducts('eyebrow')}
                                </p>
                                <h3 className="mt-3 text-2xl font-semibold leading-tight">
                                  {tProducts('title')}
                                </h3>
                                <p className="mt-4 text-sm text-white/70 leading-relaxed">
                                  {t('productTagline')}
                                </p>
                              </div>
                              <Link
                                href="/products"
                                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all"
                              >
                                {t('viewAllProducts')}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                            <div className="col-span-9 p-6 grid grid-cols-2 gap-x-4 gap-y-1">
                              {productCategories.map((cat, i) => {
                                const Icon = productIcons[i % productIcons.length];
                                const tagline = productTaglines[i % productTaglines.length];
                                return (
                                  <Link
                                    key={cat.slug}
                                    href={`/products/${cat.slug}` as any}
                                    className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-ink-50"
                                  >
                                    <div className="shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-brand-50 to-accent/10 border border-ink-100 flex items-center justify-center text-brand-600 group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white group-hover:border-brand-500 transition-all">
                                      <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="text-[13.5px] font-semibold text-ink-900 leading-snug">
                                        {cat.name}
                                      </div>
                                      <div className="mt-0.5 text-[11.5px] text-ink-500 truncate">
                                        {tagline.en}
                                      </div>
                                    </div>
                                    <ArrowRight className="h-3.5 w-3.5 text-ink-300 group-hover:text-ink-900 group-hover:translate-x-0.5 transition-all mt-3.5" />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-50 hover:text-ink-900 transition-colors"
            aria-label={t('searchPlaceholder')}
            aria-expanded={searchOpen}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <div className="hidden lg:block xl:hidden">
            <LanguageSwitcher />
          </div>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 ml-1 px-5 py-2.5 rounded-full bg-ink-900 text-white text-[13px] font-semibold hover:bg-gradient-to-r hover:from-brand-600 hover:to-brand-800 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-brand-500/20"
          >
            {t('getQuote')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 hover:bg-ink-50 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label={t('openMenu')}
          >
            <Menu className="h-[20px] w-[20px]" />
          </button>
        </div>
      </div>

      {/* Expanding search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-ink-100 bg-white overflow-hidden"
          >
            <form action="/products" method="GET" className="container-wide py-5 flex items-center gap-3">
              <Search className="h-5 w-5 text-ink-400 shrink-0" />
              <input
                name="q"
                type="text"
                placeholder={t('searchPlaceholder')}
                className="flex-1 bg-transparent text-base placeholder:text-ink-400 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-white px-4 py-2 text-xs font-semibold hover:bg-brand-700 transition-colors"
              >
                Search
                <ArrowRight className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-[11px] font-medium text-ink-500 hover:text-ink-900 border border-ink-200 rounded-md px-2 py-1"
                aria-label="Close search"
              >
                Esc
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden fixed inset-0 z-50 bg-white"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full overflow-y-auto"
            >
              <div className="container-wide flex h-16 items-center justify-between border-b border-ink-100">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Dynamic / 德纳股份 — Home"
                >
                  <Logo />
                </Link>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 hover:bg-ink-50"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t('closeMenu')}
                >
                  <X className="h-[20px] w-[20px]" />
                </button>
              </div>

              {/* Mobile search */}
              <div className="container-wide pt-5">
                <form
                  action="/products"
                  method="GET"
                  className="flex items-center gap-3 rounded-full border border-ink-200 bg-ink-50/60 px-4 py-3"
                >
                  <Search className="h-4 w-4 text-ink-400" />
                  <input
                    name="q"
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    className="flex-1 bg-transparent text-sm placeholder:text-ink-400 focus:outline-none"
                  />
                </form>
              </div>

              <div className="container-wide pt-4 pb-10">
                <nav className="divide-y divide-ink-100">
                  {navItems.map((item) => {
                    const hasChildren = Boolean(item.children);
                    const mobileChildren = item.mega
                      ? productCategories.map((c) => ({
                          key: c.slug,
                          href: `/products/${c.slug}`,
                          label: c.name
                        }))
                      : item.children?.map((c) => ({
                          key: c.key,
                          href: c.href,
                          label: t(c.key)
                        }));

                    const expandable = Boolean(item.children || item.mega);

                    return (
                      <div key={item.key}>
                        {expandable ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMobileSection(
                                  openMobileSection === item.key ? null : item.key
                                )
                              }
                              className="flex w-full items-center justify-between py-4 text-lg font-semibold text-ink-900"
                              aria-expanded={openMobileSection === item.key}
                            >
                              <span>{t(item.key)}</span>
                              <span
                                aria-hidden
                                className={clsx(
                                  'h-7 w-7 rounded-full border border-ink-200 flex items-center justify-center text-ink-500 transition-transform duration-300',
                                  openMobileSection === item.key && 'rotate-45 border-ink-900 text-ink-900'
                                )}
                              >
                                +
                              </span>
                            </button>
                            <AnimatePresence initial={false}>
                              {openMobileSection === item.key && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-4 pl-1 space-y-1">
                                    {mobileChildren?.map((child) => (
                                      <Link
                                        key={child.key}
                                        href={child.href as any}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-between py-2.5 text-ink-700 hover:text-ink-900 transition-colors"
                                      >
                                        <span className="text-[15px]">{child.label}</span>
                                        <ArrowRight className="h-3.5 w-3.5 text-ink-300" />
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between py-4 text-lg font-semibold text-ink-900"
                          >
                            <span>{t(item.key)}</span>
                            <ArrowRight className="h-4 w-4 text-ink-400" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>

                <div className="mt-8 space-y-4">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-ink-900 text-white py-4 text-sm font-semibold hover:bg-brand-700 transition-colors"
                  >
                    {t('getQuote')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-xs text-ink-500">
                      <a
                        href="tel:4008080280"
                        className="inline-flex items-center gap-1.5 hover:text-ink-900"
                      >
                        <Phone className="h-3.5 w-3.5" /> 400 808 0280
                      </a>
                    </div>
                    <LanguageSwitcher traditionalLabel />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
