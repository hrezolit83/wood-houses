import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import USP from "@/components/USP/USP";
import Stats from "@/components/Stats/Stats";
import Process from "@/components/Process/Process";
import Calculator from "@/components/Calculator/Calculator";
import RealObject from "@/components/RealObject/RealObject";
import FAQ from "@/components/FAQ/FAQ";
import LeadForm from "@/components/LeadForm/LeadForm";
import Footer from "@/components/Footer/Footer";
import FloatingButtons from "@/components/FloatingButtons/FloatingButtons";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <>
      <Header t={t.header} locale={locale} />
      <main>
        <Hero t={t.hero} />
        <USP t={t.usp} />
        <Stats t={t.stats} />
        <Process t={t.process} />
        <Calculator t={t.calculator} />
        <RealObject t={t.realObject} />
        <FAQ t={t.faq} />
        <LeadForm t={t.leadForm} />
      </main>
      <Footer t={t.footer} locale={locale} />
      <FloatingButtons />
    </>
  );
}
