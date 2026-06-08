import { getDictionary, locales } from "@/lib/dictionaries";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FloatingButtons from "@/components/FloatingButtons/FloatingButtons";
import Container from "@/components/Container/Container";
import styles from "./privacy.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.biz";

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const p = t.privacy;

  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy`,
      languages: {
        uk: `${BASE_URL}/uk/privacy`,
        en: `${BASE_URL}/en/privacy`,
      },
    },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: `${BASE_URL}/${locale}/privacy`,
      siteName: "TimberHouse",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const p = t.privacy;

  return (
    <>
      <Header t={t.header} locale={locale} />
      <main className={styles.main}>
        <Container>
          <article className={styles.article}>
            <header className={styles.header}>
              <h1 className={styles.title}>{p.title}</h1>
              <p className={styles.updated}>{p.updated}</p>
            </header>

            {p.sections.map((section, idx) => (
              <section key={idx} className={styles.section}>
                <h2 className={styles.h2}>{section.heading}</h2>
                {section.paragraphs?.map((text, i) => (
                  <p key={i} className={styles.p}>
                    {text}
                  </p>
                ))}
                {section.list && (
                  <ul className={styles.list}>
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className={styles.contact}>
              <h2 className={styles.h2}>{p.contactHeading}</h2>
              <p className={styles.p}>{p.contactText}</p>
              <p className={styles.p}>
                <a href="mailto:info@timberhouse.biz">info@timberhouse.biz</a>
              </p>
            </section>
          </article>
        </Container>
      </main>
      <Footer t={t.footer} locale={locale} />
      <FloatingButtons />
    </>
  );
}
