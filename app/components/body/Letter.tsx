"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../lang/LanguageContext";

/* ---------------- CONTENT ---------------- */

const CONTENT = {
  vi: {
    title: "Lời Cảm Ơn",
    message:
      "Tụi mình thật sự biết ơn vì đã nhận được tình yêu thương, lời chúc phúc và sự hiện diện của mọi người trong hành trình đặc biệt này. Sự quan tâm của mọi người chính là món quà ý nghĩa nhất đối với tụi mình.",
    ending: "Hẹn gặp mọi người trong ngày đặc biệt của tụi mình 💖",
    signature: "Chấn Vĩ ❤️ Trương Hiền"
  },

  en: {
    title: "With Gratitude",
    message:
      "We are truly grateful for all the love, blessings, and presence you have given us on this special journey. Your support is the most meaningful gift we could ever receive.",
    ending: "We can’t wait to see you on our special day 💖",
    signature: "Chấn Vĩ ❤️ Trương Hiền"
  },

  zh: {
    title: "感謝的話",
    message:
      "我們真心感謝大家在這段特別旅程中給予的愛、祝福與陪伴。你們的支持是我們收到最珍貴的禮物。",
    ending: "期待在我們特別的日子與大家相見 💖",
    signature: "震煒 ❤️ 張賢"
  }
};

/* ---------------- COMPONENT ---------------- */

export default function ThankYouLetterSection() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <section className="bg-[#efe7dd] py-32 px-6 md:px-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 80, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative max-w-3xl w-full"
      >
        {/* PAPER LETTER */}
        <div
          className="
          bg-[#fffdf9]
          p-10 md:p-14
          shadow-[0_25px_60px_rgba(0,0,0,0.18)]
          border border-[#e8dccb]
          relative
        "
        >
          {/* PAPER TEXTURE FAKE */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.25] bg-[radial-gradient(#d6c6b4_1px,transparent_1px)] [background-size:14px_14px]" />

          {/* CONTENT */}
          <div className="relative z-10 text-center">
            <h2 className="font-ballet text-5xl md:text-6xl text-[#b8926c] mb-10">
              {t.title}
            </h2>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 font-light">
              {t.message}
            </p>

            {/* ENDING LINE */}
            <p className="text-[#b8926c] text-xl italic mb-12">
              {t.ending}
            </p>

            {/* SIGNATURE */}
            <p className="font-ballet text-3xl text-[#b8926c]">
              {t.signature}
            </p>
          </div>
        </div>

        {/* PAPER SHADOW LAYER */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#e8dccb]/40 -z-10" />
      </motion.div>
    </section>
  );
}
