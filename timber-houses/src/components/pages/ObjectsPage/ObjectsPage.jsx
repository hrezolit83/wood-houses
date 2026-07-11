"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container/Container";
import Lightbox from "@/components/Lightbox/Lightbox";
import styles from "./ObjectsPage.module.css";

function ProjectCard({ project, index, onImageClick }) {
  return (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className={styles.projectImage}
        onClick={onImageClick}
        style={{ cursor: "zoom-in" }}
      >
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
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
            onClick={() => setLightboxIndex(i)}
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

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={setLightboxIndex}
        />
      )}
    </>
  );
}

export default function ObjectsPage({ t }) {
  const [projectLightbox, setProjectLightbox] = useState(null);

  const projectImages = t.projects.map((p) => ({ src: p.image, caption: p.title }));

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

      <section className={styles.projects}>
        <Container>
          <div className={styles.projectsGrid}>
            {t.projects.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                index={i}
                onImageClick={() => setProjectLightbox(i)}
              />
            ))}
          </div>
        </Container>
      </section>

      {projectLightbox !== null && (
        <Lightbox
          images={projectImages}
          index={projectLightbox}
          onClose={() => setProjectLightbox(null)}
          onNav={setProjectLightbox}
        />
      )}

      <section className={styles.gallerySection}>
        <Container>
          <div className={styles.sectionHeader}>
            <p className={styles.label}>{t.construction.label}</p>
            <h2 className={styles.sectionHeading}>{t.construction.heading}</h2>
          </div>
          <ImageGallery images={t.construction.images} />
        </Container>
      </section>

      <section className={styles.gallerySection}>
        <Container>
          <div className={styles.sectionHeader}>
            <p className={styles.label}>{t.production.label}</p>
            <h2 className={styles.sectionHeading}>{t.production.heading}</h2>
          </div>
          <ImageGallery images={t.production.images} />
        </Container>
      </section>

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
