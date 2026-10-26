"use client";

import { usePathname } from "next/navigation";
import styles from "./not-found.module.css";

const COPY = {
  uk: {
    title: "Щось пішло не так",
    desc: "Виникла непередбачена помилка. Спробуйте оновити сторінку.",
    retry: "Спробувати знову",
  },
  en: {
    title: "Something went wrong",
    desc: "An unexpected error occurred. Please try reloading the page.",
    retry: "Try again",
  },
};

export default function Error({ reset }) {
  const pathname = usePathname() || "";
  const t = COPY[pathname.startsWith("/en") ? "en" : "uk"];

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.code}>500</h1>
        <div className={styles.divider} />
        <div className={styles.text}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.desc}>{t.desc}</p>
          <button onClick={() => reset()} className={styles.link}>
            {t.retry}
          </button>
        </div>
      </div>
    </div>
  );
}
