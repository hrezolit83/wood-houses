const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.biz";
const isProduction = BASE_URL.includes("timberhouse.biz");

export default function robots() {
  if (!isProduction) {
    // Block indexing on preview/staging (Vercel, etc.)
    return {
      rules: [
        {
          userAgent: "*",
          disallow: ["/"],
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
