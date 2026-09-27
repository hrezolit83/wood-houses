import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header/Header";
import ProjectsPage from "@/components/pages/ProjectsPage/ProjectsPage";
import LeadForm from "@/components/LeadForm/LeadForm";
import Footer from "@/components/Footer/Footer";
import FloatingButtons from "@/components/FloatingButtons/FloatingButtons";
import projects from "@/data/projects.json";
import {
  LocalBusinessJsonLd,
  ProjectsItemListJsonLd,
  DesignServiceJsonLd,
} from "@/components/JsonLd/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.biz";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return {
    title: `${t.projectsPage.heading} | TimberHouse`,
    description: t.projectsPage.subtitle,
    openGraph: {
      title: `${t.projectsPage.heading} | TimberHouse`,
      description: t.projectsPage.subtitle,
      url: `${BASE_URL}/${locale}/projects`,
      images: [{ url: `${BASE_URL}/images/projects/project-timber-house.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function Projects({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <>
      <LocalBusinessJsonLd locale={locale} />
      <ProjectsItemListJsonLd
        projects={projects}
        locale={locale}
        name={t.projectsPage.heading}
      />
      <DesignServiceJsonLd pricing={t.projectsPage.pricing} locale={locale} />
      <Header t={t.header} locale={locale} />
      <main>
        <ProjectsPage t={t.projectsPage} projects={projects} />
        <LeadForm t={t.leadForm} />
      </main>
      <Footer t={t.footer} locale={locale} />
      <FloatingButtons />
    </>
  );
}
