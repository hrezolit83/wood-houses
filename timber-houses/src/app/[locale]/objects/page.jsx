import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header/Header";
import ObjectsPage from "@/components/pages/ObjectsPage/ObjectsPage";
import LeadForm from "@/components/LeadForm/LeadForm";
import Footer from "@/components/Footer/Footer";
import FloatingButtons from "@/components/FloatingButtons/FloatingButtons";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return {
    title: `${t.objects.heading} | TimberHouse`,
    description: t.objects.subtitle,
  };
}

export default async function Objects({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <>
      <Header t={t.header} locale={locale} />
      <main>
        <ObjectsPage t={t.objects} />
        <LeadForm t={t.leadForm} />
      </main>
      <Footer t={t.footer} locale={locale} />
      <FloatingButtons />
    </>
  );
}
