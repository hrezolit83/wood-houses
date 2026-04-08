import { getDictionary, locales } from "@/lib/dictionaries";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FloatingButtons from "@/components/FloatingButtons/FloatingButtons";
import BlogArticle from "@/components/Blog/BlogArticle";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.biz";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  return {
    title: `${post.title} | TimberHouse`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | TimberHouse`,
      description: post.excerpt,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      type: "article",
      images: post.image ? [{ url: `${BASE_URL}${post.image}`, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  const t = await getDictionary(locale);
  const post = getPostBySlug(slug, locale);

  if (!post) notFound();

  return (
    <>
      <Header t={t.header} locale={locale} />
      <main>
        <BlogArticle post={post} t={t.blog} locale={locale} />
      </main>
      <Footer t={t.footer} locale={locale} />
      <FloatingButtons />
    </>
  );
}
