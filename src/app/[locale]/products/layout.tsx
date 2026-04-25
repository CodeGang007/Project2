import { getTranslations } from 'next-intl/server';
import { CompareProvider } from '@/components/products/CompareContext';
import CompareTray from '@/components/products/CompareTray';

export default async function ProductsLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';
  const t = await getTranslations('products');

  const compare = t.raw('page.compare') as {
    title: string;
    compareCta: string;
    clear: string;
    slot: string;
    modalTitle: string;
    noSpecs: string;
    close: string;
    removeSlot: string;
    empty: string;
    full: string;
  };

  return (
    <CompareProvider>
      {children}
      <CompareTray locale={l} labels={compare} />
    </CompareProvider>
  );
}
