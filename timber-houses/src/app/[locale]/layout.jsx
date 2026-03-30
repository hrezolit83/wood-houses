import { locales } from "@/lib/dictionaries";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await import(`@/dictionaries/${locale}.json`).then((m) => m.default);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
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
