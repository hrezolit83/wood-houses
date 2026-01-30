"use client";

import { useState } from "react";
import Container from "@/components/Container/Container";
import styles from "./LeadForm.module.css";

export default function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Помилка відправки");

      setSubmitted(true);
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error("Lead submission error:", err);
      alert("Сталася помилка. Спробуйте ще раз.");
    }
  };

  return (
    <section className={styles.lead}>
      <Container>
        <h2 className={styles.heading}>Залиште заявку</h2>
        {submitted ? (
          <p className={styles.thanks}>
            Дякуємо! Ми зв’яжемось з вами найближчим часом.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Ваше ім’я"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Повідомлення (не обов'язково)"
              value={form.message}
              onChange={handleChange}
            />
            <button type="submit">Відправити заявку</button>
          </form>
        )}
      </Container>
    </section>
  );
}
