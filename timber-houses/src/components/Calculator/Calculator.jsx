"use client";

import { useState, useMemo, useEffect } from "react";
import Container from "@/components/Container/Container";
import styles from "./Calculator.module.css";

const USEFUL_AREA_COEF = 0.85;

const TIMBER_CONFIG = {
  "200": { cubeCoef: 0.5,  price: 45000 },
  "240": { cubeCoef: 0.6,  price: 51700 },
  "300": { cubeCoef: 0.75, price: 51700 },
};

const ROOF_COEF = 1.3;
const ROOF_PRICE_PER_M2 = 1320;

const FLOORS_MULTIPLIER = { 1: 1, 2: 1.15 };

const PACKAGE_MULTIPLIER = {
  kit:     1,
  shell:   1.35,
  turnkey: 1.65,
};

const NBU_FALLBACK = 41;

export default function Calculator({ t }) {
  const [area,    setArea]    = useState(120);
  const [floors,  setFloors]  = useState(1);
  const [timber,  setTimber]  = useState("200");
  const [pkg,     setPkg]     = useState("turnkey");
  const [currency, setCurrency] = useState("uah");
  const [usdRate,  setUsdRate]  = useState(NBU_FALLBACK);
  const [rateDate, setRateDate] = useState("");

  useEffect(() => {
    fetch("https://bank.gov.ua/NBU_Exchange/exchange_site?valcode=USD&json")
      .then((r) => r.json())
      .then((data) => {
        if (data?.[0]?.rate) {
          setUsdRate(data[0].rate);
          setRateDate(data[0].exchangedate || "");
        }
      })
      .catch(() => {});
  }, []);

  const result = useMemo(() => {
    const cfg = TIMBER_CONFIG[timber];
    const usefulArea = area * USEFUL_AREA_COEF;

    const timberCost = usefulArea * cfg.cubeCoef * cfg.price * FLOORS_MULTIPLIER[floors];
    const roofArea   = area * ROOF_COEF;
    const roofCost   = roofArea * ROOF_PRICE_PER_M2;

    const base  = (timberCost + roofCost) * PACKAGE_MULTIPLIER[pkg];
    const total = Math.round(base);

    return {
      total,
      timberCost: Math.round(timberCost * PACKAGE_MULTIPLIER[pkg]),
      roofCost:   Math.round(roofCost   * PACKAGE_MULTIPLIER[pkg]),
    };
  }, [area, floors, timber, pkg]);

  const fmt = (n) => {
    if (currency === "usd") {
      return "$\u00a0" + Math.round(n / usdRate).toLocaleString("uk-UA");
    }
    return "₴\u00a0" + n.toLocaleString("uk-UA");
  };

  const scrollToLead = () => {
    document.getElementById("lead")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="calculator" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <p className={styles.label}>{t.label}</p>
          <h2 className={styles.heading}>
            {t.heading.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className={styles.desc}>{t.desc}</p>
        </div>

        <div className={styles.calculator}>
          <div className={styles.controls}>
            <div className={styles.control}>
              <div className={styles.controlHeader}>
                <span className={styles.controlLabel}>{t.areaLabel}</span>
                <span className={styles.controlValue}>{area} {t.areaUnit}</span>
              </div>
              <input
                type="range"
                min={40} max={300} step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className={styles.slider}
                style={{ "--progress": `${((area - 40) / (300 - 40)) * 100}%` }}
              />
              <div className={styles.sliderLabels}>
                <span>40 {t.areaUnit}</span>
                <span>300 {t.areaUnit}</span>
              </div>
            </div>

            <div className={styles.control}>
              <span className={styles.controlLabel}>{t.floorsLabel}</span>
              <div className={styles.toggleGroup}>
                {t.floors.map((label, i) => (
                  <button
                    key={i}
                    className={`${styles.toggleBtn} ${floors === i + 1 ? styles.toggleActive : ""}`}
                    onClick={() => setFloors(i + 1)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.control}>
              <span className={styles.controlLabel}>{t.timberLabel}</span>
              <div className={styles.optionGroup}>
                {t.timberOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionBtn} ${timber === opt.value ? styles.optionActive : ""}`}
                    onClick={() => setTimber(opt.value)}
                  >
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.control}>
              <span className={styles.controlLabel}>{t.packageLabel}</span>
              <div className={styles.optionGroup}>
                {t.packages.map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionBtn} ${pkg === opt.value ? styles.optionActive : ""}`}
                    onClick={() => setPkg(opt.value)}
                  >
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.result}>
            <div className={styles.resultCard}>
              <div className={styles.currencyToggle}>
                <button
                  className={`${styles.currencyBtn} ${currency === "uah" ? styles.currencyActive : ""}`}
                  onClick={() => setCurrency("uah")}
                >
                  ₴ UAH
                </button>
                <button
                  className={`${styles.currencyBtn} ${currency === "usd" ? styles.currencyActive : ""}`}
                  onClick={() => setCurrency("usd")}
                >
                  $ USD
                </button>
              </div>

              <p className={styles.resultLabel}>{t.resultLabel}</p>

              <div className={styles.resultPrice}>
                <span className={styles.resultFrom}>{t.resultFrom}</span>
                <span className={styles.resultAmount}>{fmt(result.total)}</span>
              </div>

              <div className={styles.resultMeta}>
                <div className={styles.resultMetaItem}>
                  <span className={styles.resultMetaLabel}>{t.timberCostLabel}</span>
                  <span className={styles.resultMetaValue}>{fmt(result.timberCost)}</span>
                </div>
                <div className={styles.resultMetaItem}>
                  <span className={styles.resultMetaLabel}>{t.roofCostLabel}</span>
                  <span className={styles.resultMetaValue}>{fmt(result.roofCost)}</span>
                </div>
                <div className={styles.resultMetaItem}>
                  <span className={styles.resultMetaLabel}>{t.areaLabel}</span>
                  <span className={styles.resultMetaValue}>{area} {t.areaUnit}</span>
                </div>
              </div>

              {currency === "usd" && (
                <p className={styles.rateNote}>
                  * {t.rateNote} {usdRate.toFixed(2)} ₴{rateDate ? ` (${rateDate})` : ""}
                </p>
              )}

              <p className={styles.resultNote}>{t.resultNote}</p>

              <button className={styles.cta} onClick={scrollToLead}>
                {t.cta}
              </button>
            </div>

            <p className={styles.disclaimer}>{t.disclaimer}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
