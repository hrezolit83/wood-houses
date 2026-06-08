const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.biz";

export function LocalBusinessJsonLd({ locale = "uk" }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${BASE_URL}/#organization`,
    name: "TimberHouse",
    url: `${BASE_URL}/${locale}`,
    image: `${BASE_URL}/images/hero/modern-timber-house.jpg`,
    logo: `${BASE_URL}/images/hero/modern-timber-house.jpg`,
    description:
      locale === "uk"
        ? "Проєктування, виробництво та будівництво будинків з клеєного бруса по всій Україні."
        : "Design, manufacturing and construction of glulam timber houses across Ukraine.",
    telephone: "+380636485920",
    email: "info@timberhouse.biz",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UA",
      addressLocality: locale === "uk" ? "Київ" : "Kyiv",
    },
    areaServed: {
      "@type": "Country",
      name: locale === "uk" ? "Україна" : "Ukraine",
    },
    sameAs: ["https://t.me/timberhouse_ua"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+380636485920",
        contactType: "sales",
        availableLanguage: ["uk", "en"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+380993258334",
        contactType: "customer support",
        availableLanguage: ["uk", "en"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQPageJsonLd({ items }) {
  if (!items || items.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd({ locale = "uk" }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: `${BASE_URL}/${locale}`,
    name: "TimberHouse",
    inLanguage: locale === "uk" ? "uk-UA" : "en-US",
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
