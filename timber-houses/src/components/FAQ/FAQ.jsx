"use client";

import { useState } from "react";
import Container from "@/components/Container/Container";
import styles from "./FAQ.module.css";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
      <button className={styles.question} onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <svg
          className={styles.icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div className={styles.answer}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ({ t }) {
  return (
    <section id="faq" className={styles.faq}>
      <Container>
        <div className={styles.header}>
          <p className={styles.label}>{t.label}</p>
          <h2 className={styles.heading}>{t.heading}</h2>
        </div>

        <div className={styles.list}>
          {t.items.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </Container>
    </section>
  );
}
