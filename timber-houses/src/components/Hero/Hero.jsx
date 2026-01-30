import Container from "@/components/Container/Container";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          <h1 className={styles.title}>Будинки з клеєного бруса під ключ</h1>

          <p className={styles.subtitle}>
            Проєктування, виробництво та будівництво енергоефективних будинків з
            клеєного бруса по всій Україні
          </p>

          <div className={styles.actions}>
            <a href="#lead" className={styles.primary}>
              Отримати консультацію
            </a>
            <a href="#projects" className={styles.secondary}>
              Реалізовані проєкти
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
