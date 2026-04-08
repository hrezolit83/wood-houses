import { getAllSlugs } from "@/lib/blog";
import { locales } from "@/lib/dictionaries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.biz";

export default function sitemap() {
  const routes = [];

  for (const locale of locales) {
    // Home
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    // Objects
    routes.push({
      url: `${BASE_URL}/${locale}/objects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });

    // Blog index
    routes.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Blog posts
    const slugs = getAllSlugs();
    for (const slug of slugs) {
      routes.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
