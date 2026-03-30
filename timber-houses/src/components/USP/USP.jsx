"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container/Container";
import styles from "./USP.module.css";

const icons = [
  <svg key="0" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 10h.01" />
    <path d="M15 10h.01" />
  </svg>,
  <svg key="1" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M9 12l2 2 4-4" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>,
  <svg key="2" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
  </svg>,
  <svg key="3" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>,
];

export default function USP({ t }) {
  const [openIndex, setOpenIndex] = useState(null);
  const cardRefs = useRef([]);

  const toggle = useCallback((i) => {
    const isClosing = openIndex === i;
    setOpenIndex(isClosing ? null : i);

    if (!isClosing) {
      // Wait for framer-motion animation to mostly finish, then scroll
      setTimeout(() => {
        const card = cardRefs.current[i];
        if (!card) return;
        const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        const cardTop = card.getBoundingClientRect().top + window.scrollY;
        const targetScroll = cardTop - headerHeight - 12;

        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }, 380);
    }
  }, [openIndex]);

  return (
    <section id="advantages" className={styles.usp}>
      <Container>
        <div className={styles.header}>
          <p className={styles.label}>{t.label}</p>
          <h2 className={styles.heading}>{t.heading}</h2>
        </div>

        <div className={styles.grid}>
          {t.items.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i} ref={(el) => (cardRefs.current[i] = el)} className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}>
                <div
                  className={styles.cardHeader}
                  onClick={() => toggle(i)}
                >
                  <div className={styles.icon}>{icons[i]}</div>
                  <h3>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                  <button
                    className={`${styles.expandBtn} ${isOpen ? styles.expandBtnOpen : ""}`}
                    aria-label="Toggle details"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className={styles.expandedContent}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <div className={styles.expandedInner}>
                        <p className={styles.details}>{item.details}</p>

                        {item.features && (
                          <ul className={styles.features}>
                            {item.features.map((f, j) => (
                              <li key={j}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.images && (
                          <div className={styles.gallery}>
                            {item.images.map((src, j) => (
                              <div key={j} className={styles.galleryItem}>
                                <Image
                                  src={src}
                                  alt={`${item.title} - ${j + 1}`}
                                  width={600}
                                  height={400}
                                  className={styles.galleryImg}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {item.video && (
                          <div className={styles.videoWrap}>
                            <video
                              src={item.video}
                              muted
                              playsInline
                              controls
                              preload="metadata"
                              className={styles.video}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
