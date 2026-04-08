import Container from "@/components/Container/Container";
import styles from "./Footer.module.css";

export default function Footer({ t, locale }) {
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
            {Object.entries(t.navLinks).map(([key, label]) => {
              const isPage = key === "objects" || key === "blog";
              const href = isPage ? `/${locale}/${key}` : `/${locale}#${key}`;
              return (
                <a key={key} href={href}>
                  {label}
                </a>
              );
            })}
          </div>

          <div className={styles.col}>
            <h4>{t.contactsTitle}</h4>
            <a href="tel:+380636485920">+38 (063) 648-59-20</a>
            <a href="tel:+380993258334">+38 (099) 325-83-34</a>
            <a href="mailto:info@timberhouse.biz">info@timberhouse.biz</a>
            <p>{t.address}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
