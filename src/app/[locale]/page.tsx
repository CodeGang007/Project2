import { setRequestLocale } from 'next-intl/server';
import HeroCarousel from '@/components/home/HeroCarousel';
import AboutSection from '@/components/home/AboutSection';
import RDSection from '@/components/home/RDSection';
import ProductsSection from '@/components/home/ProductsSection';
import NewsSection from '@/components/home/NewsSection';
import SustainabilitySection from '@/components/home/SustainabilitySection';
import JoinUsSection from '@/components/home/JoinUsSection';
import ContactSection from '@/components/home/ContactSection';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroCarousel />
      <AboutSection />
      <RDSection />
      <ProductsSection />
      <NewsSection />
      <SustainabilitySection />
      <JoinUsSection />
      <ContactSection />
    </>
  );
}
