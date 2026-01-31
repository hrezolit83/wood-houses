"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container/Container";
import styles from "./Hero.module.css";

const slides = [
  { src: "/images/hero/step-1.jpg", label: "Фундамент" },
  { src: "/images/hero/step-2.jpg", label: "Збірка бруса" },
  { src: "/images/hero/step-3.jpg", label: "Покрівля" },
  { src: "/images/hero/step-4.jpg", label: "Вигляд із середини" },
  { src: "/images/hero/step-5.jpg", label: "Готовий будинок" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.grid}>
          {/* TEXT */}
          <div className={styles.content}>
            <h1>
              Будинки з клеєного бруса <br />
              <span>під ключ</span>
            </h1>

            <p>
              Проєктування, виробництво та будівництво енергоефективних будинків
              по всій Україні.
            </p>

            {/* КНОПКА — СТИЛЬ НЕ ЧІПАЄМО */}
            <a href="#lead" className={styles.cta}>
              Отримати консультацію
            </a>
          </div>

          {/* SLIDER */}
          <div className={styles.slider}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].src}
                className={styles.slide}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={slides[index].src}
                  alt={slides[index].label}
                  fill
                  priority
                />

                <div className={styles.caption}>{slides[index].label}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
