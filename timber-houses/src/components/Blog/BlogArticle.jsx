"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import styles from "./BlogArticle.module.css";

export default function BlogArticle({ post, t, locale }) {
  return (
    <article className={styles.article}>
      <Container>
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href={`/${locale}/blog`} className={styles.back}>
            &larr; {t.back}
          </a>

          <div className={styles.meta}>
            <time className={styles.date}>{formatDate(post.date, locale)}</time>
            <span className={styles.readTime}>{post.readTime}</span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.heroImage}>
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={675}
              className={styles.heroImg}
              sizes="(max-width: 780px) 100vw, 780px"
              priority
            />
          </div>

          <div className={styles.content}>
            {post.content.map((block, i) => {
              if (block.type === "heading") {
                return <h2 key={i} className={styles.h2}>{block.text}</h2>;
              }
              return <p key={i} className={styles.paragraph}>{block.text}</p>;
            })}
          </div>

          <div className={styles.ctaBox}>
            <p className={styles.ctaText}>{t.ctaText}</p>
            <a href={`/${locale}#lead`} className={styles.ctaButton}>
              {t.cta}
            </a>
          </div>
        </motion.div>
      </Container>
    </article>
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
