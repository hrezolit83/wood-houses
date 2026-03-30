import Container from "@/components/Container/Container";
import styles from "./RealObject.module.css";

export default function RealObject({ t }) {
  const headingLines = t.heading.split("\n");

  return (
    <section id="objects" className={styles.real}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <img
              src="/images/house-1.jpg"
              alt={t.heading}
              className={styles.image}
            />
            <div className={styles.badge}>
              <span className={styles.badgeValue}>{t.badgeValue}</span>
              <span className={styles.badgeLabel}>{t.badgeLabel}</span>
            </div>
          </div>

          <div className={styles.text}>
            <p className={styles.label}>{t.label}</p>
            <h2 className={styles.heading}>
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <p className={styles.desc}>{t.desc}</p>

            <ul className={styles.features}>
              {t.features.map((f, i) => (
                <li key={i}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <a href="#lead" className={styles.cta}>
              {t.cta}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
