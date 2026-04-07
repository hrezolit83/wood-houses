import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(locale) {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));

  const posts = files.map((file) => {
    const raw = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
    return {
      slug: raw.slug,
      date: raw.date,
      image: raw.image,
      readTime: raw.readTime[locale],
      title: raw.title[locale],
      excerpt: raw.excerpt[locale],
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug, locale) {
  const filePath = path.join(BLOG_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return {
    slug: raw.slug,
    date: raw.date,
    image: raw.image,
    readTime: raw.readTime[locale],
    title: raw.title[locale],
    excerpt: raw.excerpt[locale],
    content: raw.content[locale],
  };
}

export function getAllSlugs() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
    return raw.slug;
  });
}
