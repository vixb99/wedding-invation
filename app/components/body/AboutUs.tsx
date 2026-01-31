"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../lang/LanguageContext";

/* ---------------- TYPES ---------------- */

type Lang = "vi" | "en" | "zh";

/* ---------------- CONTENT ---------------- */

const content: Record<Lang, any> = {
  vi: {
    title: "Câu Chuyện Của Tụi Mình",
    groomName: "Chấn Vĩ",
    brideName: "Trương Hiền",
    intro:
      "Từ một cuộc gặp gỡ rất tình cờ, tụi mình đã tìm thấy nhau trong những điều giản dị nhất của cuộc sống.",
    paragraphs: [
      "Có những mối duyên đến rất nhẹ nhàng, không ồn ào cũng chẳng vội vã. Tụi mình gặp nhau như thế — đúng lúc, đúng người, và đủ chân thành để chọn ở lại bên nhau.",
      "Tình yêu của tụi mình được nuôi dưỡng từ những điều rất nhỏ: một lời hỏi han mỗi ngày, những buổi chiều bình yên, và cả những lúc chẳng hoàn hảo nhưng vẫn chọn lắng nghe nhau.",
      "Qua thời gian, tụi mình hiểu rằng hạnh phúc không nằm ở những điều lớn lao, mà ở việc có một người sẵn sàng nắm tay mình, cùng bước qua mọi đổi thay của cuộc đời.",
      "Và hôm nay, tụi mình chọn viết tiếp câu chuyện ấy — bằng một lời hứa yêu thương, trân trọng và đồng hành cùng nhau suốt đời."
    ],
    quote:
      "“Yêu không phải là tìm một người hoàn hảo, mà là học cách yêu sự không hoàn hảo của nhau một cách trọn vẹn.”"
  },

  en: {
    title: "Our Story",
    groomName: "Chan Vi",
    brideName: "Truong Hien",
    intro:
      "From a simple encounter, we found each other in the most ordinary moments of life.",
    paragraphs: [
      "Some connections arrive quietly, without rush or noise. We met at the right time, as the right people, with hearts sincere enough to choose staying together.",
      "Our love grew from the smallest things: daily check-ins, peaceful afternoons, and moments of imperfection where we still chose to listen.",
      "With time, we learned that happiness isn’t about grand things, but about having someone willing to hold your hand through every change.",
      "And today, we choose to continue that story — with a promise of love, respect, and a lifetime side by side."
    ],
    quote:
      "“Love is not about finding a perfect person, but learning to love imperfectly — together.”"
  },

  zh: {
    title: "我們的故事",
    groomName: "震煒",
    brideName: "張賢",
    intro:
      "從一次看似平凡的相遇，我們在生活最簡單的瞬間找到了彼此。",
    paragraphs: [
      "有些緣分來得很輕，很靜，不急不躁。我們在對的時間遇見對的人，並選擇真心留下。",
      "我們的愛，來自日常的小事：一句關心、一個寧靜的午後，以及不完美卻願意傾聽的時刻。",
      "隨著時間，我們明白幸福不在於偉大的事，而是在於有人願意牽著你的手，一起走過人生的改變。",
      "而今天，我們選擇寫下新的篇章——以愛、珍惜與一生的陪伴作為承諾。"
    ],
    quote:
      "「愛不是尋找完美的人，而是學會完整地愛彼此的不完美。」"
  }
};

/* ---------------- COMPONENT ---------------- */

export default function AboutUs() {
  const { lang } = useLanguage();
  const t = content[lang as Lang];

  return (
    <section className="relative w-full bg-[#faf7f4] py-24 px-4 md:px-20 overflow-hidden">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="font-ballet text-5xl md:text-6xl text-[#b8926c] mb-2">
          {t.title}
        </h2>

        {/* NAMES */}
        <p className="text-xl md:text-2xl font-light text-gray-700 tracking-wide mb-4 flex items-center justify-center gap-2">
          <span className="font-medium text-[#b8926c]">{t.groomName}</span>
          <span className="text-[#b8926c] text-2xl">❤️</span>
          <span className="font-medium text-[#b8926c]">{t.brideName}</span>
        </p>

        <p className="text-gray-600 italic max-w-xl mx-auto mb-6">
          {t.intro}
        </p>
      </motion.div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        {/* -------- STORY TEXT -------- */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6 text-gray-700 leading-relaxed"
        >
          {t.paragraphs.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}

          <p className="italic text-[#b8926c]/80 text-sm pt-4">
            {t.quote}
          </p>
        </motion.div>

        {/* -------- IMAGE -------- */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-[2rem] overflow-hidden shadow-xl">
            <img
              src="/images/about-us.jpg"
              alt={`${t.groomName} ❤️ ${t.brideName}`}
              className="w-full h-[550px] object-cover"
            />
          </div>

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 -right-6 w-32 h-32 
                       border-2 border-[#b8926c]/40 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
