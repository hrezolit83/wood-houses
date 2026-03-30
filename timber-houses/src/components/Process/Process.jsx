import Container from "@/components/Container/Container";
import styles from "./Process.module.css";

export default function Process({ t }) {
  const headingLines = t.heading.split("\n");

  return (
    <section id="process" className={styles.process}>
      <Container>
        <div className={styles.header}>
          <p className={styles.label}>{t.label}</p>
          <h2 className={styles.heading}>
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div className={styles.timeline}>
          {t.steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.number}>{step.number}</div>
              <div className={styles.line} />
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
