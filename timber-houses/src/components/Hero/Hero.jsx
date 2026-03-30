"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container/Container";
import styles from "./Hero.module.css";

const slides = [
  "/images/hero/modern-timber-house.jpg",
  "/images/hero/glass-facade-cabin.jpg",
  "/images/hero/family-house-terrace.jpg",
  "/images/hero/two-story-lodge.jpg",
  "/images/hero/winter-timber-cabin.jpg",
  "/images/hero/resort-cottages.jpg",
];

const INTERVAL = 5000;

export default function Hero({ t }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef(null);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(goNext, INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, goNext]);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStart.current = null;
  };

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.label}>{t.label}</p>

            <h1 className={styles.title}>
              {t.titleLine1}
              <br />
              <span>{t.titleLine2}</span>
            </h1>

            <p className={styles.subtitle}>{t.subtitle}</p>

            <div className={styles.ctaGroup}>
              <a href="#lead" className={styles.cta}>
                {t.cta}
              </a>
              <a href="#process" className={styles.ctaOutline}>
                {t.ctaOutline}
              </a>
            </div>

            <div className={styles.trust}>
              {t.trust.map((item, i) => (
                <div key={i} className={styles.trustItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={styles.slider}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={slides[index]}
                className={styles.slide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Image
                  src={slides[index]}
                  alt={t.slides?.[index] || ""}
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={goPrev} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={goNext} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>

            {/* Caption */}
            <div className={styles.caption}>{t.slides?.[index]}</div>

            {/* Progress dots */}
            <div className={styles.dots}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                >
                  {i === index && (
                    <motion.span
                      className={styles.dotProgress}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                      key={`progress-${index}`}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Slide counter */}
            <div className={styles.counter}>
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
