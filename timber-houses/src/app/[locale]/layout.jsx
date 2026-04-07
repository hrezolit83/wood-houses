import { locales } from "@/lib/dictionaries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.ua";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await import(`@/dictionaries/${locale}.json`).then((m) => m.default);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${BASE_URL}/${locale}`,
      siteName: "TimberHouse",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/hero/modern-timber-house.jpg`,
          width: 1200,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        uk: `${BASE_URL}/uk`,
        en: `${BASE_URL}/en`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <div lang={locale} data-locale={locale}>
      {children}
    </div>
  );
}
