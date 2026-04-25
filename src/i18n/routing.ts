import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh', 'zh-TW'],
  defaultLocale: 'zh',
  localePrefix: 'always',
  // Detect from cookie + Accept-Language header on first visit
  localeDetection: true
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
