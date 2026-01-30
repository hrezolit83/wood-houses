import Container from "@/components/Container/Container";
import styles from "./USP.module.css";

const items = [
  {
    title: "Власне виробництво клеєного бруса",
    text: "Контролюємо якість матеріалу на кожному етапі — від сушки деревини до профілювання.",
  },
  {
    title: "Будівництво під ключ",
    text: "Беремо на себе проєктування, виробництво, будівництво та введення в експлуатацію.",
  },
  {
    title: "Реальні об’єкти, а не рендери",
    text: "Маємо збудовані будинки, які можна подивитись наживо або на відео.",
  },
  {
    title: "Архітектори та інженери в команді",
    text: "Проєкти адаптуємо під ділянку, бюджет і стиль життя клієнта.",
  },
];

export default function USP() {
  return (
    <section className={styles.usp}>
      <Container>
        <h2 className={styles.heading}>Чому обирають нас</h2>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <div key={index} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
