import Container from "@/components/Container/Container";
import styles from "./Footer.module.css";

export default function Footer({ t, locale }) {
  const navLinks = {
    advantages: locale === "uk" ? "Переваги" : "Advantages",
    process: locale === "uk" ? "Як працюємо" : "How We Work",
    objects: locale === "uk" ? "Об'єкти" : "Projects",
    faq: locale === "uk" ? "Питання" : "FAQ",
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2L2 14h4v14h8v-8h4v8h8V14h4L16 2z"
                  fill="currentColor"
                />
              </svg>
              <span>TimberHouse</span>
            </div>
            <p className={styles.desc}>{t.desc}</p>
          </div>

          <div className={styles.col}>
            <h4>{t.navTitle}</h4>
            {Object.entries(navLinks).map(([key, label]) => (
              <a key={key} href={`#${key}`}>
                {label}
              </a>
            ))}
          </div>

          <div className={styles.col}>
            <h4>{t.contactsTitle}</h4>
            <a href="tel:+380000000000">+38 (000) 000-00-00</a>
            <a href="mailto:info@timberhouse.ua">info@timberhouse.ua</a>
            <p>{locale === "uk" ? "Україна, м. Київ" : "Ukraine, Kyiv"}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
