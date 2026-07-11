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

function getMidpoint(t1, t2) {
  return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
}

function ZoomableImage({ src, alt, onSwipe }) {
  const [transform, setTransform] = useState({ scale: 1, tx: 0, ty: 0 });
  const gestureRef = useRef(null);
  const containerRef = useRef(null);

  const resetZoom = useCallback(() => {
    setTransform({ scale: 1, tx: 0, ty: 0 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [src, resetZoom]);

  const clampTranslate = (scale, tx, ty) => {
    if (scale <= 1) return { tx: 0, ty: 0 };
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { tx, ty };
    const maxTx = (rect.width * (scale - 1)) / 2;
    const maxTy = (rect.height * (scale - 1)) / 2;
    return {
      tx: Math.min(Math.max(tx, -maxTx), maxTx),
      ty: Math.min(Math.max(ty, -maxTy), maxTy),
    };
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    if (e.touches.length === 1) {
      gestureRef.current = {
        type: "pan",
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startTx: transform.tx,
        startTy: transform.ty,
        scale: transform.scale,
        moved: false,
      };
    } else if (e.touches.length === 2) {
      gestureRef.current = {
        type: "pinch",
        startDist: getDistance(e.touches[0], e.touches[1]),
        startMid: getMidpoint(e.touches[0], e.touches[1]),
        startScale: transform.scale,
        startTx: transform.tx,
        startTy: transform.ty,
      };
    }
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    if (!gestureRef.current) return;

    if (gestureRef.current.type === "pan" && e.touches.length === 1) {
      const dx = e.touches[0].clientX - gestureRef.current.startX;
      const dy = e.touches[0].clientY - gestureRef.current.startY;
      gestureRef.current.moved = Math.abs(dx) > 5 || Math.abs(dy) > 5;

      if (gestureRef.current.scale <= 1) return;

      const { tx, ty } = clampTranslate(
        gestureRef.current.scale,
        gestureRef.current.startTx + dx,
        gestureRef.current.startTy + dy
      );
      setTransform((prev) => ({ ...prev, tx, ty }));
    } else if (gestureRef.current.type === "pinch" && e.touches.length === 2) {
      const newDist = getDistance(e.touches[0], e.touches[1]);
      const ratio = newDist / gestureRef.current.startDist;
      const newScale = Math.min(Math.max(gestureRef.current.startScale * ratio, 1), 4);

      const newMid = getMidpoint(e.touches[0], e.touches[1]);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const originX = newMid.x - rect.left - rect.width / 2;
        const originY = newMid.y - rect.top - rect.height / 2;
        const scaleDiff = newScale / gestureRef.current.startScale;
        const newTx = originX + (gestureRef.current.startTx - originX) * scaleDiff;
        const newTy = originY + (gestureRef.current.startTy - originY) * scaleDiff;
        const { tx, ty } = clampTranslate(newScale, newTx, newTy);
        setTransform({ scale: newScale, tx, ty });
      }
    }
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    if (!gestureRef.current) return;

    if (
      gestureRef.current.type === "pan" &&
      gestureRef.current.scale <= 1 &&
      gestureRef.current.moved
    ) {
      const dx = (e.changedTouches[0]?.clientX ?? 0) - gestureRef.current.startX;
      if (Math.abs(dx) > 40) onSwipe(dx < 0 ? "left" : "right");
    }

    if (transform.scale < 1.05) resetZoom();
    gestureRef.current = null;
  };

  const lastTap = useRef(0);
  const handleClick = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      transform.scale > 1 ? resetZoom() : setTransform({ scale: 2.5, tx: 0, ty: 0 });
    }
    lastTap.current = now;
  };

  const isZoomed = transform.scale > 1;

  return (
    <div
      ref={containerRef}
      className={styles.zoomContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      style={{ cursor: isZoomed ? "grab" : "default" }}
    >
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={900}
        className={styles.img}
        priority
        style={{
          transform: `translate(${transform.tx}px, ${transform.ty}px) scale(${transform.scale})`,
          transition: isZoomed ? "none" : "transform 0.25s ease",
        }}
        draggable={false}
      />
    </div>
  );
}

export default function Lightbox({ images, index, onClose, onNav }) {
  const scrollY = useRef(0);

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

    scrollY.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    const viewport = document.querySelector("meta[name=viewport]");
    const originalViewport = viewport?.getAttribute("content") || "";
    if (viewport) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
    }

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY.current);
      if (viewport && originalViewport) viewport.setAttribute("content", originalViewport);
    };
  }, [onClose, goPrev, goNext]);

  const handleSwipe = useCallback((dir) => {
    dir === "left" ? goNext() : goPrev();
  }, [goNext, goPrev]);

  const current = images[index];
  const isVideo = current.type === "video";

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
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
                onSwipe={handleSwipe}
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
