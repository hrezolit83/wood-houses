"use client";

import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "th_cookie_consent_v1";

const COPY = {
  uk: {
    title: "Ми використовуємо файли cookie",
    text: "Сайт використовує необхідні cookie для роботи, а також аналітичні (Google Analytics) та маркетингові (Google Ads) — для покращення сервісу та реклами. Ви можете прийняти або відхилити необов'язкові категорії.",
    accept: "Прийняти всі",
    reject: "Відхилити",
    settings: "Налаштування",
    save: "Зберегти вибір",
    necessary: "Необхідні (завжди)",
    analytics: "Аналітика",
    marketing: "Маркетинг",
    learnMore: "Детальніше у",
    policyLink: "Політиці конфіденційності",
  },
  en: {
    title: "We use cookies",
    text: "This site uses necessary cookies for operation, plus analytics (Google Analytics) and marketing (Google Ads) cookies to improve service and ads. You can accept or reject non-essential categories.",
    accept: "Accept all",
    reject: "Reject",
    settings: "Settings",
    save: "Save choice",
    necessary: "Necessary (always)",
    analytics: "Analytics",
    marketing: "Marketing",
    learnMore: "Learn more in our",
    policyLink: "Privacy Policy",
  },
};

function applyConsent(consent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("consent", "update", {
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
  });
}

export default function CookieConsent({ locale = "uk" }) {
  const t = COPY[locale] || COPY.uk;
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      } else {
        const parsed = JSON.parse(stored);
        applyConsent(parsed);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {}
    applyConsent(consent);
    setVisible(false);
  };

  const handleAcceptAll = () => save({ analytics: true, marketing: true });
  const handleRejectAll = () => save({ analytics: false, marketing: false });
  const handleSave = () => save({ analytics, marketing });

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label={t.title}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h3 className={styles.title}>{t.title}</h3>
          <p className={styles.text}>
            {t.text}{" "}
            <span>
              {t.learnMore}{" "}
              <a href={`/${locale}/privacy`} className={styles.link}>
                {t.policyLink}
              </a>
              .
            </span>
          </p>

          {showSettings && (
            <div className={styles.settings}>
              <label className={styles.row}>
                <input type="checkbox" checked disabled />
                <span>{t.necessary}</span>
              </label>
              <label className={styles.row}>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span>{t.analytics}</span>
              </label>
              <label className={styles.row}>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                <span>{t.marketing}</span>
              </label>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          {!showSettings ? (
            <>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => setShowSettings(true)}
              >
                {t.settings}
              </button>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={handleRejectAll}
              >
                {t.reject}
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={handleAcceptAll}
              >
                {t.accept}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={handleRejectAll}
              >
                {t.reject}
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={handleSave}
              >
                {t.save}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
