import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';
import { productData, type ProductCategory } from '@/data/products';
import { FileDown, ExternalLink, ArrowUpRight } from 'lucide-react';

type PageParams = { locale: string; category: string };

// Allow static generation for every known category slug
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
  const t = await getTranslations('products');
  const tn = await getTranslations('nav');
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  // Category display name — fall back to the i18n list if no detailed data yet
  const categories = t.raw('categories') as { slug: string; name: string }[];
  const label = categories.find((c) => c.slug === category)?.name;
  if (!label) notFound();

  const data: ProductCategory | undefined = productData[category];

  return (
    <>
      {/* HERO — full-bleed product 