import Container from "@/components/Container/Container";
import styles from "./RealObject.module.css";

export default function RealObject() {
  return (
    <section className={styles.real}>
      <Container>
        <h2 className={styles.heading}>Наш реальний об’єкт</h2>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              src="/images/house1.jpg"
              alt="Будинок з клеєного бруса"
              className={styles.image}
            />
          </div>

          <div className={styles.text}>
            <p>
              Цей будинок з клеєного бруса збудований для реального клієнта.
              Повністю готовий під ключ, з усіма інженерними системами та
              меблями. Можемо показати об’єкт наживо або по відео.
            </p>
            <p>
              Клієнт отримав готовий будинок за 5 місяців від проєктування до
              здачі. Власне виробництво та досвідчена команда гарантують якість.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
