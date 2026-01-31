"use client";

import { useEffect } from "react";
import { useLanguage } from "../lang/LanguageContext";

type Props = {
  onAccept: () => void;
  onDecline: () => void;
  titleClass: string;
};

const CONTENT = {
  vi: {
    title: "🎶 Một chút âm nhạc cho khoảnh khắc này nhé?",
    desc: "Một bản nhạc dịu dàng sẽ lan tỏa, khiến không gian này thêm ấm áp và khoảnh khắc của tụi mình thêm đáng nhớ...",
    accept: "Bật nhạc 💕",
    decline: "Để sau nhé 😚",
  },
  en: {
    title: "🎶 A little music for this moment?",
    desc: "A gentle melody will fill the air, making this moment warmer and even more memorable for us...",
    accept: "Play music 💕",
    decline: "Maybe later 😚",
  },
  zh: {
    title: "🎶 来一点音乐陪伴这个时刻吧？",
    desc: "一段温柔的旋律将流淌在空气中，让这一刻更加温暖，也更加值得被珍藏...",
    accept: "播放音乐 💕",
    decline: "稍后吧 😚",
  },
};

export default function MusicPopup({ onAccept, onDecline, titleClass }: Props) {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  /* ---------------- LOCK SCROLL ---------------- */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <>
      {/* BLUR BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20" />

      {/* POPUP */}
      <div className="fixed inset-0 flex items-center justify-center z-30">
        <div className="bg-[#f5e6ca] rounded-3xl p-10 text-center shadow-2xl">
          <h2 className={`${titleClass} text-4xl text-[#9c6b4e] mb-4`}>
            {t.title}
          </h2>

          <p className="text-lg mb-6 text-black">{t.desc}</p>

          <div className="flex justify-center gap-6">
            <button
              onClick={onAccept}
              className="bg-[#6b4f4f] text-[#f5e6ca] px-6 py-3 rounded-lg"
            >
              {t.accept}
            </button>

            <button
              onClick={onDecline}
              className="bg-[#d9c7aa] text-[#6b4f4f] px-6 py-3 rounded-lg"
            >
              {t.decline}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
