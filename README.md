# Dynai Chemical — Next.js 14 Site

A modern, fully responsive, bilingual (中文 / English) rebuild of the Jiangsu Dynai Chemical corporate website.

Built with:

- **Next.js 14** (App Router, React Server Components)
- **TypeScript**
- **Tailwind CSS**
- **next-intl** for i18n (URL-prefixed locales: `/zh/…`, `/en/…`)
- **Framer Motion** for scroll-triggered animations
- **lucide-react** icons

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000  (redirects to /zh by default)

# 3. Production build
npm run build
npm start
```

Requires Node.js **18.18+** (Node 20 LTS recommended).

---

## Project structure

```
dyna-site/
├── messages/
│   ├── en.json              # All English copy
│   └── zh.json              # All Simplified Chinese copy
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (minimal)
│   │   └── [locale]/
│   │       ├── layout.tsx   # Locale layout with Header/Footer
│   │       ├── page.tsx     # Home
│   │       ├── about/
│   │       ├── rd/
│   │       ├── products/
│   │       │   └── [category]/
│   │       ├── news/
│   │       │   └── [id]/
│   │       ├── careers/
│   │       ├── jobs/
│   │       ├── sustainability/
│   │       │   └── [slug]/
│   │       ├── contact/
│   │       └── newsletter/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── home/            # 8 home-page sections
│   │   └── ui/              # Reveal, PageHero, SectionHeading
│   ├── i18n/
│   │   ├── routing.ts       # Locales & navigation helpers
│   │   └── request.ts       # Server-side locale resolution
│   └── middleware.ts        # next-intl middleware (locale routing)
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

---

## Editing content

### Text copy

All copy lives in `messages/en.json` and `messages/zh.json` — one key per string, mirrored across both files. Edit the JSON, save, hit refresh. No rebuild needed in dev.

### Products

Add / edit / remove product categories in `messages/{en,zh}.json` under `products.categories`. The slug must match in both locales. Detail pages live at `/[locale]/products/[slug]`.

### News articles

Same pattern — `news.items` in both JSON files. For full long-form articles, wire up a CMS (Sanity / Strapi / Contentful) and replace the stub in `src/app/[locale]/news/[id]/page.tsx`.

### Images

Replace the Unsplash placeholder URLs in these files with the client's assets:

| Where                                      | What to replace                                   |
| ------------------------------------------ | ------------------------------------------------- |
| `src/components/home/HeroCarousel.tsx`     | `slideImages` → place files in `public/banners/`  |
| `src/components/home/RDSection.tsx`        | `images` array                                    |
| `src/components/home/NewsSection.tsx`      | `heroImages`                                      |
| `src/components/home/SustainabilitySection.tsx` | `cardImages`                                 |
| `src/components/home/JoinUsSection.tsx`    | Background in `style.backgroundImage`             |
| `src/components/home/ContactSection.tsx`   | HQ photo                                          |

Put optimised `.webp` / `.avif` assets in `public/` and swap to `next/image` for automatic resizing:

```tsx
import Image from 'next/image';
<Image src="/banners/banner1.webp" alt="" fill className="object-cover" />
```

### Adding a new language

1. Add the locale code to `src/i18n/routing.ts` (`locales: ['en', 'zh', 'ja']`).
2. Copy `messages/en.json` → `messages/ja.json` and translate.
3. Add a button in `src/components/LanguageSwitcher.tsx`.

---

## Improvements over the original site

| Original                               | This rebuild                                        |
| -------------------------------------- | --------------------------------------------------- |
| jQuery + multiple plugins (slick, SuperSlide, modernizr) | Zero jQuery. Framer Motion + native CSS animations. |
| No mobile menu — horizontal nav only   | Hamburger drawer with collapsible sub-sections.     |
| Separate `.html` files per locale      | URL-prefixed locales with proper `<html lang>`.     |
| Fixed-width 1200 px layout             | Fluid responsive (sm/md/lg/xl breakpoints).         |
| No SEO metadata beyond `<title>`       | Per-locale metadata + OpenGraph ready.              |
| Images served unoptimised from `/Uploads` | `next/image` with auto WebP/AVIF, lazy loading.   |
| Inline styles everywhere               | Tailwind design system (see `tailwind.config.ts`).  |
| No accessibility                       | Keyboard nav, ARIA labels, `prefers-reduced-motion`.|

---

## Deployment

### Vercel (recommended)

```bash
npx vercel
```

Set production domain. Done — it's a zero-config Next.js app.

### Self-host

```bash
npm run build
npm start    # listens on PORT env var, default 3000
```

Run behind nginx with a reverse proxy. For static export (simpler hosting), change `output: 'export'` in `next.config.mjs` — note that loses ISR and middleware-based locale redirects.

---

## Assets currently wired in (from dynai.com)

The following are hot-linked from the live Dynai site so the build looks correct out of the box. **For production, download them and serve from `/public/`** — relying on the origin server is fragile.

- Hero banners 1–5 → `https://www.dynai.com/Html/images/banner1.jpg` … `banner5.jpg`
- Logo → `https://www.dynai.com/Html/images/logo.png`
- Footer QR code → `https://www.dynai.com/Html/images/img15.jpg`

To localise, run `curl` on each URL into `public/banners/`, `public/logo.png`, `public/qr.png` and update the paths in `HeroCarousel.tsx`, `Header.tsx`, and `Footer.tsx`.

## Client handover checklist

- [ ] Download the hot-linked images above into `public/` and update component paths.
- [ ] Supply the logo as SVG if available (sharper at all sizes).
- [ ] Supply full news article bodies; wire up CMS if preferred.
- [ ] Supply product TDS / SDS PDFs; add download links to category pages.
- [ ] Confirm Chinese ICP filing number in `messages/zh.json > footer.icp`.
- [ ] Configure analytics (GA4 / Baidu Tongji) via a `<Script>` tag in the locale layout.
- [ ] Set up a contact form backend (e.g. Resend + serverless route at `/api/contact`).
- [ ] Swap OpenStreetMap embed for Baidu Maps / AMap — the client's users will expect it.

---

## License

Proprietary — content and branding © Jiangsu Dynai Chemical Co., Ltd.
Code written for this rebuild is delivered to the client; reuse subject to engagement terms.
