import { getDictionary, locales } from "@/lib/dictionaries";
import { getAllPosts } from "@/lib/blog";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FloatingButtons from "@/components/FloatingButtons/FloatingButtons";
import BlogList from "@/components/Blog/BlogList";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://timberhouse.ua";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return {
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    openGraph: {
      title: t.blog.metaTitle,
      description: t.blog.metaDescription,
      url: `${BASE_URL}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const posts = getAllPosts(locale);

  return (
    <>
      <Header t={t.header} locale={locale} />
      <main>
        <BlogList posts={posts} t={t.blog} locale={locale} />
      </main>
      <Footer t={t.footer} locale={locale} />
      <FloatingButtons />
    </>
  );
}
