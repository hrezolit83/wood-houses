"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container/Container";
import Lightbox from "@/components/Lightbox/Lightbox";
import styles from "./ProjectsPage.module.css";

const PAGE_SIZE = 9;

function ProjectCard({ project, index, onOpen, t }) {
  return (
    <motion.div
      id={project.slug}
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
    >
      <div className={styles.cardImg} onClick={onOpen} style={{ cursor: "zoom-in" }}>
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            width={480}
            height={339}
            className={styles.img}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.noImg}>{t.noImage}</div>
        )}
        {project.area && (
          <div className={styles.areaBadge}>{project.area} м²</div>
        )}
        {project.images && project.images.length > 1 && (
          <div className={styles.imgCount}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
            {project.images.length}
          </div>
        )}
        <div className={styles.zoomHint}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <div className={styles.cardMeta}>
          {project.dimensions && (
            <span className={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
              {project.dimensions} м
            </span>
          )}
          {project.bedrooms && (
            <span className={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              {project.bedrooms} {project.bedrooms === 1 ? t.bedroom : t.bedrooms}
            </span>
          )}
        </div>
        <button className={styles.cardCta} onClick={onOpen}>{t.cta}</button>
      </div>
    </motion.div>
  );
}

function PricingSection({ pricing }) {
  return (
    <section className={styles.pricingSection}>
      <Container>
        <div className={styles.sectionHeader}>
          <p className={styles.label}>{pricing.label}</p>
          <h2 className={styles.sectionHeading}>{pricing.heading}</h2>
          <p className={styles.sectionSubtitle}>{pricing.subtitle}</p>
        </div>
        <div className={styles.pricingGrid}>
          {pricing.items.map((item, i) => (
            <motion.div
              key={i}
              className={`${styles.pricingCard} ${item.vip ? styles.pricingCardFeatured : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={styles.pricingIcon}>
                {i === 0 && (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>)}
                {i === 1 && (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>)}
                {i === 2 && (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>)}
                {i === 3 && (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>)}
              </div>
              <h3 className={styles.pricingName}>{item.name}</h3>
              <p className={styles.pricingDesc}>{item.desc}</p>
              <div className={styles.pricingPrices}>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>{pricing.standard}</span>
                  <span className={styles.priceValue}>${item.standard}<span className={styles.pricePer}>/м²</span></span>
                </div>
                {item.vip && (
                  <div className={`${styles.priceRow} ${styles.priceRowVip}`}>
                    <span className={styles.priceLabel}>{pricing.vip}</span>
                    <span className={styles.priceValue}>${item.vip}<span className={styles.pricePer}>/м²</span></span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <p className={styles.pricingNote}>{pricing.note}</p>
      </Container>
    </section>
  );
}

export default function ProjectsPage({ t, projects }) {
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "small") return projects.filter((p) => p.area && p.area < 100);
    if (filter === "medium") return projects.filter((p) => p.area && p.area >= 100 && p.area <= 200);
    if (filter === "large") return projects.filter((p) => p.area && p.area > 200);
    return projects;
  }, [filter, projects]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleFilterChange = (key) => {
    setFilter(key);
    setVisible(PAGE_SIZE);
  };

  const lightboxImages = useMemo(() => {
    if (!lightbox) return [];
    const p = lightbox.project;
    return (p.images || []).map((src, i) => ({
      src,
      caption: `${p.title}${p.area ? ` · ${p.area} м²` : ""} — ${i === 0 ? t.renders : t.drawing}`,
    }));
  }, [lightbox, t]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.label}>{t.label}</p>
            <h1 className={styles.title}>{t.heading}</h1>
            <p className={styles.subtitle}>{t.subtitle}</p>
          </motion.div>
        </Container>
      </section>

      <section className={styles.gridSection}>
        <Container>
          <div className={styles.filters}>
            {[
              { key: "all", label: t.filterAll },
              { key: "small", label: t.filterSmall },
              { key: "medium", label: t.filterMedium },
              { key: "large", label: t.filterLarge },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`${styles.filterBtn} ${filter === key ? styles.filterBtnActive : ""}`}
                onClick={() => handleFilterChange(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {shown.map((project, i) => (
              <ProjectCard
                key={project.slug || i}
                project={project}
                index={i}
                t={t}
                onOpen={() => setLightbox({ project, imgIndex: 0 })}
              />
            ))}
          </div>

          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button className={styles.loadMore} onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                {t.loadMore} ({filtered.length - visible})
              </button>
            </div>
          )}
        </Container>
      </section>

      {lightbox && (
        <Lightbox
          images={lightboxImages}
          index={lightbox.imgIndex}
          onClose={() => setLightbox(null)}
          onNav={(idx) => setLightbox((prev) => ({ ...prev, imgIndex: typeof idx === "function" ? idx(prev.imgIndex) : idx }))}
        />
      )}

      <PricingSection pricing={t.pricing} />
    </div>
  );
}
