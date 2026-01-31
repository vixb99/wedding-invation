"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../lang/LanguageContext";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* ---------------- CONTENT ---------------- */

const CONTENT = {
  vi: {
    title: "Album Kỷ Niệm",
    subtitle: "Những khoảnh khắc đẹp tụi mình đã cùng nhau lưu giữ 💖",
  },
  en: {
    title: "Our Memories",
    subtitle: "Beautiful moments we captured together 💖",
  },
  zh: {
    title: "我們的回憶",
    subtitle: "我們一起珍藏的美好時刻 💖",
  },
};

/* ---------------- PHOTOS ---------------- */

const PHOTOS = [
  "/images/album/album_01.jpg",
  "/images/album/album_02.jpg",
  "/images/album/album_03.jpg",
  "/images/album/album_04.jpg",
  "/images/album/album_05.jpg",
  "/images/album/album_06.jpg",
  "/images/album/album_07.jpg",
  "/images/album/album_08.jpg",
  "/images/album/album_09.jpg",
  "/images/album/album_10.jpg",
];

/* ---------------- COMPONENT ---------------- */

export default function WeddingStoryGallery() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  /* ---------- NAV ---------- */

  const next = () => {
    setIndex((p) => (p === PHOTOS.length - 1 ? 0 : p + 1));
  };

  const prev = () => {
    setIndex((p) => (p === 0 ? PHOTOS.length - 1 : p - 1));
  };

  /* ---------- SWIPE MOBILE ---------- */

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const MIN = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > MIN) next();
    if (dist < -MIN) prev();
  };

  /* ---------- ESC CLOSE LIGHTBOX ---------- */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ---------- UI ---------- */

  return (
    <section className="bg-[#faf7f4] py-32 px-4 md:px-20 overflow-hidden">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="font-ballet text-5xl md:text-6xl text-[#b8926c] mb-4">
          {t.title}
        </h2>
        <p className="text-gray-600 italic max-w-xl mx-auto">{t.subtitle}</p>
      </motion.div>

      {/* GALLERY */}
      <div className="max-w-5xl mx-auto relative">
        {/* IMAGE FRAME */}
        <div
          className="relative w-full h-[520px] overflow-hidden cursor-zoom-in"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={PHOTOS[index]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>

        {/* ARROWS DESKTOP */}
        <button
          onClick={prev}
          className="hidden md:block absolute left-[-70px] top-1/2 -translate-y-1/2 bg-white/70 p-4 border border-[#b8926c]/30"
        >
          <ChevronLeft className="w-8 h-8 text-[#b8926c]" />
        </button>

        <button
          onClick={next}
          className="hidden md:block absolute right-[-70px] top-1/2 -translate-y-1/2 bg-white/70 p-4 border border-[#b8926c]/30"
        >
          <ChevronRight className="w-8 h-8 text-[#b8926c]" />
        </button>

        {/* DOTS */}
        <div className="flex justify-center mt-8 gap-3">
          {PHOTOS.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-10 ${
                i === index ? "bg-[#b8926c]" : "bg-[#e5d6c7]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ---------------- LIGHTBOX ---------------- */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* CLOSE BUTTON */}
            <button className="absolute top-6 right-6 text-white">
              <X size={32} />
            </button>

            {/* IMAGE */}
            <motion.img
              src={PHOTOS[index]}
              className="max-h-[90vh] max-w-[95vw] object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
