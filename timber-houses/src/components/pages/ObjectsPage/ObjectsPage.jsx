"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container/Container";
import styles from "./ObjectsPage.module.css";

function ProjectCard({ project, index }) {
  return (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.projectImage}>
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={400}
          className={styles.projectImg}
        />
        <div className={styles.projectBadge}>{project.area}</div>
      </div>
      <div className={styles.projectContent}>
        <div className={styles.projectMeta}>
          <span className={styles.location}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {project.location}
          </span>
          <span className={styles.time}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {project.time}
          </span>
        </div>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDesc}>{project.description}</p>
        <div className={styles.projectFeatures}>
          {project.features.map((f, i) => (
            <span key={i} className={styles.featureTag}>{f}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ImageGallery({ images }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <div className={styles.imageGrid}>
        {images.map((img, i) => (
          <motion.div
            key={i}
            className={styles.gridItem}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            onClick={() => setLightbox(i)}
          >
            <Image
              src={img.src}
              alt={img.caption}
              width={500}
              height={350}
              className={styles.gridImg}
            />
            <div className={styles.gridCaption}>{img.caption}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox].src}
                alt={images[lightbox].caption}
                width={1200}
                height={800}
                className={styles.lightboxImg}
              />
              <p className={styles.lightboxCaption}>{images[lightbox].caption}</p>
              <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              {lightbox > 0 && (
                <button
                  className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                  onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
              )}
              {lightbox < images.length - 1 && (
                <button
                  className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                  onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ObjectsPage({ t }) {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
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

      {/* Projects Grid */}
      <section className={styles.projects}>
        <Container>
          <div className={styles.projectsGrid}>
            {t.projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Construction Gallery */}
      <section className={styles.gallerySection}>
        <Container>
          <div className={styles.sectionHeader}>
            <p className={styles.label}>{t.construction.label}</p>
            <h2 className={styles.sectionHeading}>{t.construction.heading}</h2>
          </div>
          <ImageGallery images={t.construction.images} />
        </Container>
      </section>

      {/* Production Gallery */}
      <section className={styles.gallerySection}>
        <Container>
          <div className={styles.sectionHeader}>
            <p className={styles.label}>{t.production.label}</p>
            <h2 className={styles.sectionHeading}>{t.production.heading}</h2>
          </div>
          <ImageGallery images={t.production.images} />
        </Container>
      </section>

      {/* Videos */}
      <section className={styles.videosSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <p className={styles.label}>{t.videos.label}</p>
            <h2 className={styles.sectionHeading}>{t.videos.heading}</h2>
          </div>
          <div className={styles.videosGrid}>
            {t.videos.items.map((v, i) => (
              <motion.div
                key={i}
                className={styles.videoCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <video
                  src={v.src}
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  className={styles.video}
                />
                <p className={styles.videoTitle}>{v.title}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <Container>
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.ctaHeading}>{t.heading}</h2>
            <a href="#lead" className={styles.ctaBtn}>{t.cta}</a>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
