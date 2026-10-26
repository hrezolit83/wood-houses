"use client";

import { usePathname } from "next/navigation";
import styles from "./not-found.module.css";

const COPY = {
  uk: {
    title: "Сторінку не знайдено",
    desc: "Можливо, вона була видалена або ви перейшли за невірним посиланням.",
    link: "На головну",
  },
  en: {
    title: "Page not found",
    desc: "It may have been removed, or the link you followed is incorrect.",
    link: "Back to home",
  },
};

export default function NotFound() {
  const pathname = usePathname() || "";
  const locale = pathname.startsWith("/en") ? "en" : "uk";
  const t = COPY[locale];

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.code}>404</h1>
        <div className={styles.divider} />
        <div className={styles.text}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.desc}>{t.desc}</p>
          <a href={`/${locale}`} className={styles.link}>{t.link}</a>
        </div>
      </div>
    </div>
  );
}
