"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import styles from "./Header.module.css";

const navItems = [
  { key: "advantages", href: "#advantages" },
  { key: "process", href: "#process" },
  { key: "objects", href: "/objects", isPage: true },
  { key: "faq", href: "#faq" },
  { key: "contacts", href: "#lead" },
];

export default function Header({ t, locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const navLinks = navItems.map((item) => {
    if (item.isPage) {
      return {
        label: t.nav[item.key],
        href: `/${locale}${item.href}`,
      };
    }
    // Anchor links: if not on home page, prepend home path
    return {
      label: t.nav[item.key],
      href: isHomePage ? item.href : `/${locale}${item.href}`,
    };
  });

  const otherLocale = locale === "uk" ? "en" : "uk";
  const localeLabel = locale === "uk" ? "EN" : "UA";

  // On objects page, switch locale but stay on objects page
  const localeSwitchHref = isHomePage
    ? `/${otherLocale}`
    : pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Container>
        <div className={styles.inner}>
          <a href={`/${locale}`} className={styles.logo}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L2 14h4v14h8v-8h4v8h8V14h4L16 2z" fill="currentColor" />
            </svg>
            <span>TimberHouse</span>
          </a>

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.navLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a href={localeSwitchHref} className={styles.langSwitch}>
              {localeLabel}
            </a>
            <a href="tel:+380000000000" className={styles.phone}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>{t.phone}</span>
            </a>
            <a href={isHomePage ? "#lead" : `/${locale}#lead`} className={styles.cta}>
              {t.cta}
            </a>
          </div>

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>
    </header>
  );
}
