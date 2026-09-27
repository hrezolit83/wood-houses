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
      {
        "@type": "ContactPoint",
        telephone: "+380665053877",
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

export function ProjectsItemListJsonLd({ projects, locale = "uk", name }) {
  if (!projects || projects.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SingleFamilyResidence",
        name: project.title,
        url: `${BASE_URL}/${locale}/projects#${project.slug}`,
        image: `${BASE_URL}${project.image_url}`,
        ...(project.area
          ? {
              floorSize: {
                "@type": "QuantitativeValue",
                value: project.area,
                unitCode: "MTK",
              },
            }
          : {}),
        ...(project.bedrooms ? { numberOfBedrooms: project.bedrooms } : {}),
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

export function DesignServiceJsonLd({ pricing, locale = "uk" }) {
  if (!pricing || !pricing.items || pricing.items.length === 0) return null;

  const unitPrice = (price) => ({
    "@type": "UnitPriceSpecification",
    price,
    priceCurrency: "USD",
    unitCode: "MTK",
    referenceQuantity: {
      "@type": "QuantitativeValue",
      value: 1,
      unitCode: "MTK",
    },
  });

  const offers = [];
  for (const item of pricing.items) {
    offers.push({
      "@type": "Offer",
      name: `${item.name} — ${pricing.standard}`,
      itemOffered: {
        "@type": "Service",
        name: item.name,
        description: item.desc,
      },
      priceSpecification: unitPrice(item.standard),
    });
    if (item.vip) {
      offers.push({
        "@type": "Offer",
        name: `${item.name} — ${pricing.vip}`,
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.desc,
        },
        priceSpecification: unitPrice(item.vip),
      });
    }
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType:
      locale === "uk"
        ? "Проєктування будинків з клеєного бруса"
        : "Glulam timber house design",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: {
      "@type": "Country",
      name: locale === "uk" ? "Україна" : "Ukraine",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: pricing.heading,
      itemListElement: offers,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
