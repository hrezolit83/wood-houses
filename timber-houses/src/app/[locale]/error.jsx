"use client";

import styles from "./not-found.module.css";

export default function Error({ reset }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.code}>500</h1>
        <div className={styles.divider} />
        <div className={styles.text}>
          <h2 className={styles.title}>Щось пішло не так</h2>
          <p className={styles.desc}>Виникла непередбачена помилка. Спробуйте оновити сторінку.</p>
          <button onClick={() => reset()} className={styles.link}>
            Спробувати знову
          </button>
        </div>
      </div>
    </div>
  );
}
