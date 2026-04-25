'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { useTransition } from 'react';
import clsx from 'clsx';

const LOCALES: { code: Locale; labelKey: 'languageEn' | 'languageZh' | 'languageZhTraditional' }[] = [
  { code: 'en', labelKey: 'languageEn' },
  { code: 'zh', labelKey: 'languageZh' },
  { code: 'zh-TW', labelKey: 'languageZhTraditional' }
];

export default function LanguageSwitcher({
  variant = 'light'
}: {
  variant?: 'light' | 'dark';
  /** @deprecated kept for backwards compat — switcher always shows EN/中/繁 now */
  traditionalLabel?: boolean;
}) {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const isDark = variant === 'dark';
  const base = isDark ? 'text-white/55' : 'text-ink-500';
  const active = isDark ? 'text-white' : 'text-ink-900';
  const divider = isDark ? 'bg-white/20' : 'bg-ink-300';
  const hover = isDark ? 'hover:text-white' : 'hover:text-ink-900';

  return (
    <div
      className={clsx(
        'flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em]',
        isPending && 'opacity-60 pointer-events-none'
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((loc, i) => (
        <span key={loc.code} className="contents">
          {i > 0 && <span className={clsx('h-3 w-px', divider)} aria-hidden />}
          <button
            type="button"
            onClick={() => switchTo(loc.code)}
            className={clsx(
              'transition-colors duration-200',
              locale === loc.code ? active : clsx(base, hover)
            )}
            aria-pressed={locale === loc.code}
            aria-label={`Switch to ${loc.code}`}
          >
            {t(loc.labelKey)}
          </button>
        </span>
      ))}
    </div>
  );
}
