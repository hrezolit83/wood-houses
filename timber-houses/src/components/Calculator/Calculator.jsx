"use client";

import { useState, useMemo } from "react";
import Container from "@/components/Container/Container";
import styles from "./Calculator.module.css";

const BASE_PRICE = 350;

const TIMBER_MULTIPLIER = {
  "180": 1,
  "200": 1.12,
  "240": 1.25,
};

const PACKAGE_MULTIPLIER = {
  kit: 1,
  shell: 1.35,
  turnkey: 1.65,
};

const FLOORS_MULTIPLIER = {
  1: 1,
  2: 1.15,
};

export default function Calculator({ t }) {
  const [area, setArea] = useState(120);
  const [floors, setFloors] = useState(1);
  const [timber, setTimber] = useState("200");
  const [pkg, setPkg] = useState("turnkey");

  const result = useMemo(() => {
    const pricePerM2 =
      BASE_PRICE *
      TIMBER_MULTIPLIER[timber] *
      PACKAGE_MULTIPLIER[pkg] *
      FLOORS_MULTIPLIER[floors];

    const total = Math.round(pricePerM2 * area);
    return { total, pricePerM2: Math.round(pricePerM2) };
  }, [area, floors, timber, pkg]);

  const formatPrice = (n) => n.toLocaleString("uk-UA");

  const scrollToLead = () => {
    const el = document.getElementById("lead");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="calculator" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <p className={styles.label}>{t.label}</p>
          <h2 className={styles.heading}>
            {t.heading.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.desc}>{t.desc}</p>
        </div>

        <div className={styles.calculator}>
          <div className={styles.controls}>
            {/* Area slider */}
            <div className={styles.control}>
              <div className={styles.controlHeader}>
                <span className={styles.controlLabel}>{t.areaLabel}</span>
                <span className={styles.controlValue}>
                  {area} {t.areaUnit}
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={300}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className={styles.slider}
                style={{
                  "--progress": `${((area - 40) / (300 - 40)) * 100}%`,
                }}
              />
              <div className={styles.sliderLabels}>
                <span>40 {t.areaUnit}</span>
                <span>300 {t.areaUnit}</span>
              </div>
            </div>

            {/* Floors */}
            <div className={styles.control}>
              <span className={styles.controlLabel}>{t.floorsLabel}</span>
              <div className={styles.toggleGroup}>
                {t.floors.map((label, i) => (
                  <button
                    key={i}
                    className={`${styles.toggleBtn} ${
                      floors === i + 1 ? styles.toggleActive : ""
                    }`}
                    onClick={() => setFloors(i + 1)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timber thickness */}
            <div className={styles.control}>
              <span className={styles.controlLabel}>{t.timberLabel}</span>
              <div className={styles.optionGroup}>
                {t.timberOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionBtn} ${
                      timber === opt.value ? styles.optionActive : ""
                    }`}
                    onClick={() => setTimber(opt.value)}
                  >
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Package */}
            <div className={styles.control}>
              <span className={styles.controlLabel}>{t.packageLabel}</span>
              <div className={styles.optionGroup}>
                {t.packages.map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionBtn} ${
                      pkg === opt.value ? styles.optionActive : ""
                    }`}
                    onClick={() => setPkg(opt.value)}
                  >
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result card */}
          <div className={styles.result}>
            <div className={styles.resultCard}>
              <p className={styles.resultLabel}>{t.resultLabel}</p>
              <div className={styles.resultPrice}>
                <span className={styles.resultFrom}>{t.resultFrom}</span>
                <span className={styles.resultAmount}>
                  {t.resultCurrency}
                  {formatPrice(result.total)}
                </span>
              </div>
              <div className={styles.resultMeta}>
                <div className={styles.resultMetaItem}>
                  <span className={styles.resultMetaLabel}>
                    {t.pricePerM2Label}
                  </span>
                  <span className={styles.resultMetaValue}>
                    {t.resultCurrency}
                    {formatPrice(result.pricePerM2)} {t.resultPerM2}
                  </span>
                </div>
                <div className={styles.resultMetaItem}>
                  <span className={styles.resultMetaLabel}>{t.areaLabel}</span>
                  <span className={styles.resultMetaValue}>
                    {area} {t.areaUnit}
                  </span>
                </div>
              </div>
              <p className={styles.resultNote}>{t.resultNote}</p>
              <button className={styles.cta} onClick={scrollToLead}>
                {t.cta}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
