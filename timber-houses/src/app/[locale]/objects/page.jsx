import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header/Header";
import ObjectsPage from "@/components/pages/ObjectsPage/ObjectsPage";
import LeadForm from "@/components/LeadForm/LeadForm";
import Footer from "@/components/Footer/Footer";
import FloatingButtons from "@/components/FloatingButtons/FloatingButtons";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.biz";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return {
    title: `${t.objects.heading} | TimberHouse`,
    description: t.objects.subtitle,
    openGraph: {
      title: `${t.objects.heading} | TimberHouse`,
      description: t.objects.subtitle,
      url: `${BASE_URL}/${locale}/objects`,
      images: [{ url: `${BASE_URL}/images/projects/project-timber-house.jpg`, width: 1200, height: 630 }],
    },
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
