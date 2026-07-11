"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Lightbox.module.css";

function getDistance(t1, t2) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function ZoomableImage({ src, alt }) {
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const pinchRef = useRef(null);
  const imgRef = useRef(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setOrigin({ x: 50, y: 50 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [src, resetZoom]);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinchRef.current = {
        dist: getDistance(e.touches[0], e.touches[1]),
        scale,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.stopPropagation();
      const newDist = getDistance(e.touches[0], e.touches[1]);
      const ratio = newDist / pinchRef.current.dist;
      const newScale = Math.min(Math.max(pinchRef.current.scale * ratio, 1), 4);

      const rect = imgRef.current?.getBoundingClientRect();
      if (rect) {
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const ox = ((midX - rect.left) / rect.width) * 100;
        const oy = ((midY - rect.top) / rect.height) * 100;
        setOrigin({ x: ox, y: oy });
      }

      setScale(newScale);
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      pinchRef.current = null;
      if (scale < 1.05) resetZoom();
    }
  };

  const handleDoubleTap = (() => {
    let lastTap = 0;
    return () => {
      const now = Date.now();
      if (now - lastTap < 300) {
        scale > 1 ? resetZoom() : setScale(2.5);
      }
      lastTap = now;
    };
  })();

  return (
    <div
      ref={imgRef}
      className={styles.zoomContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleDoubleTap}
    >
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={900}
        className={styles.img}
        priority
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transition: scale === 1 ? "transform 0.2s ease" : "none",
        }}
      />
    </div>
  );
}

export default function Lightbox({ images, index, onClose, onNav }) {
  const touchStart = useRef(null);
  const isZoomed = useRef(false);

  const goPrev = useCallback(() => {
    onNav((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, onNav]);

  const goNext = useCallback(() => {
    onNav((prev) => (prev + 1) % images.length);
  }, [images.length, onNav]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    const viewport = document.querySelector("meta[name=viewport]");
    const original = viewport?.getAttribute("content") || "";
    if (viewport) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
    }

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      if (viewport && original) viewport.setAttribute("content", original);
    };
  }, [onClose, goPrev, goNext]);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStart.current = e.touches[0].clientX;
    } else {
      touchStart.current = null;
    }
  };

  const handleTouchEnd = (e) => {
    if (isZoomed.current || touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStart.current = null;
  };

  const current = images[index];
  const isVideo = current.type === "video";

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className={styles.content}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.imgWrap}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            {isVideo ? (
              <video
                src={current.src}
                controls
                autoPlay
                playsInline
                className={styles.video}
              />
            ) : (
              <ZoomableImage
                src={current.src}
                alt={current.caption || ""}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {current.caption && (
          <p className={styles.caption}>{current.caption}</p>
        )}

        {images.length > 1 && (
          <div className={styles.counter}>
            {index + 1} / {images.length}
          </div>
        )}

        <button className={styles.close} onClick={onClose} aria-label="Закрити">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button className={`${styles.nav} ${styles.navPrev}`} onClick={goPrev} aria-label="Попереднє">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className={`${styles.nav} ${styles.navNext}`} onClick={goNext} aria-label="Наступне">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </motion.div>

      {images.length > 1 && (
        <div className={styles.dots} onClick={(e) => e.stopPropagation()}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => onNav(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
