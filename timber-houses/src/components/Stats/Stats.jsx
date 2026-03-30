"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import styles from "./Stats.module.css";

function useCountUp(target, inView) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const duration = 2000;
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, inView]);

  return count;
}

function StatItem({ value, suffix, label }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(value, inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.item}>
      <div className={styles.value}>
        {count}
        {suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default function Stats({ t }) {
  return (
    <section className={styles.stats}>
      <Container>
        <div className={styles.grid}>
          {t.items.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
