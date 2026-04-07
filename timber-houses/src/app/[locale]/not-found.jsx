import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.code}>404</h1>
        <div className={styles.divider} />
        <div className={styles.text}>
          <h2 className={styles.title}>Сторінку не знайдено</h2>
          <p className={styles.desc}>Можливо, вона була видалена або ви перейшли за невірним посиланням.</p>
          <a href="/uk" className={styles.link}>На головну</a>
        </div>
      </div>
    </div>
  );
}
