"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import styles from "./BlogList.module.css";

export default function BlogList({ posts, t, locale }) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <span className={styles.label}>{t.heading}</span>
          <h1 className={styles.heading}>{t.heading}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {posts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={375}
                  className={styles.image}
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <time className={styles.date}>{formatDate(post.date, locale)}</time>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <span className={styles.readMore}>{t.readMore} &rarr;</span>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

function formatDate(dateStr, locale) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
