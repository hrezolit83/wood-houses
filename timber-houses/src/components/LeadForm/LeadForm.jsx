"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Container from "@/components/Container/Container";
import { isValidPhone } from "@/lib/validation";
import styles from "./LeadForm.module.css";

export default function LeadForm({ t }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPhone(form.phone)) {
      toast.error(t.errorPhone);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      toast.success(t.successToast);
      setSubmitted(true);
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      toast.error(t.errorToast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead" className={styles.lead}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <p className={styles.label}>{t.label}</p>
            <h2 className={styles.heading}>{t.heading}</h2>
            <p className={styles.desc}>{t.desc}</p>

            <div className={styles.contacts}>
              <div className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>{t.phone}</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{t.email}</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t.address}</span>
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.thanks}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>{t.thanksTitle}</h3>
                <p>{t.thanksText}</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label htmlFor="name">{t.nameLabel}</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder={t.namePlaceholder}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">{t.phoneLabel}</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder={t.phonePlaceholder}
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">{t.messageLabel}</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t.messagePlaceholder}
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <button type="submit" className={styles.submit} disabled={loading}>
                  {loading ? t.submitting : t.submit}
                </button>

                <p className={styles.privacy}>{t.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
