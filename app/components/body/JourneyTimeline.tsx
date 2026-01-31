"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../lang/LanguageContext";

/* ---------------- TYPES ---------------- */

type TimelineItem = {
  year: string;
  title: string;
  desc: string;
  image: string;
};

/* ---------------- CONTENT ---------------- */

const CONTENT = {
  vi: {
    title: "Hành Trình Của Tụi Mình",
    subtitle:
      "Từ những ngày đầu gặp gỡ… đến quyết định cùng nhau đi hết cuộc đời.",
    timeline: [
      {
        year: "2022",
        title: "Lần đầu gặp nhau",
        desc: "Một cuộc gặp gỡ tưởng chừng rất bình thường, nhưng lại mở ra một câu chuyện đặc biệt. Tụi mình bắt đầu từ những cuộc trò chuyện nhỏ, những lần quan tâm rất giản dị.",
        image: "/images/2022.jpg",
      },
      {
        year: "2023",
        title: "Bắt đầu yêu",
        desc: "Tụi mình chính thức bước vào hành trình yêu thương. Cùng nhau trải qua những chuyến đi, những kỷ niệm đầu tiên và học cách hiểu nhau nhiều hơn mỗi ngày.",
        image: "/images/2023.jpg",
      },
      {
        year: "2024",
        title: "Đồng hành và trưởng thành",
        desc: "Không chỉ là tình yêu, tụi mình trở thành người đồng hành trong cuộc sống. Cùng vượt qua thử thách, cùng chia sẻ ước mơ.",
        image: "/images/2024.jpg",
      },
      {
        year: "2025",
        title: "Quyết định tương lai",
        desc: "Sau tất cả, tụi mình biết rằng đối phương chính là người muốn đi cùng suốt đời.",
        image: "/images/2025.jpg",
      },
      {
        year: "2026",
        title: "Về chung một nhà",
        desc: "Tụi mình chọn viết tiếp câu chuyện này bằng một đám cưới — nơi tình yêu được chứng kiến bởi gia đình và những người thân yêu.",
        image: "/images/2026.jpg",
      },
    ],
  },

  en: {
    title: "Our Journey",
    subtitle:
      "From the first meeting… to choosing to walk through life together.",
    timeline: [
      {
        year: "2022",
        title: "First Meeting",
        desc: "What seemed like a simple encounter turned into something meaningful. We started with small talks and simple care for each other.",
        image: "/images/2022.jpg",
      },
      {
        year: "2023",
        title: "Falling in Love",
        desc: "We officially began our love journey. Trips together, first memories, and learning to understand each other more every day.",
        image: "/images/2023.jpg",
      },
      {
        year: "2024",
        title: "Growing Together",
        desc: "Beyond love, we became partners in life. Facing challenges and sharing dreams together.",
        image: "/images/2024.jpg",
      },
      {
        year: "2025",
        title: "Choosing Our Future",
        desc: "Through everything, we realized we wanted to spend our lives together.",
        image: "/images/2025.jpg",
      },
      {
        year: "2026",
        title: "Becoming One Family",
        desc: "We choose to continue our story with a wedding — surrounded by family and loved ones.",
        image: "/images/2026.jpg",
      },
    ],
  },

  zh: {
    title: "我們的旅程",
    subtitle: "從最初的相遇… 到決定攜手走過一生。",
    timeline: [
      {
        year: "2022",
        title: "第一次相遇",
        desc: "看似平凡的相遇，卻成為特別的開始。我們從簡單的聊天與關心開始。",
        image: "/images/2022.jpg",
      },
      {
        year: "2023",
        title: "開始相愛",
        desc: "我們正式開始愛情旅程，一起旅行、創造回憶，也更加了解彼此。",
        image: "/images/2023.jpg",
      },
      {
        year: "2024",
        title: "一起成長",
        desc: "我們不只是戀人，更是人生的夥伴，一起面對挑戰、分享夢想。",
        image: "/images/2024.jpg",
      },
      {
        year: "2025",
        title: "決定未來",
        desc: "經歷一切後，我們知道彼此就是想攜手一生的人。",
        image: "/images/2025.jpg",
      },
      {
        year: "2026",
        title: "成為一家人",
        desc: "我們選擇用婚禮繼續這段故事，與家人和摯愛一同見證。",
        image: "/images/2026.jpg",
      },
    ],
  },
};

/* ---------------- COMPONENT ---------------- */

export default function JourneyTimeline() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <section className="relative bg-[#f8f3ed] py-32 px-4 md:px-20 overflow-hidden">
      {/* CENTER ROPE */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#d6b98c]/40" />

      <div className="text-center mb-24">
        <h2 className="font-ballet text-5xl md:text-6xl text-[#b8926c] mb-4">
          {t.title}
        </h2>
        <p className="text-gray-600 italic max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      <div className="max-w-6xl mx-auto space-y-32">
        {t.timeline.map((item: TimelineItem, i: number) => (
          <StoryBlock key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- STORY BLOCK ---------------- */

function StoryBlock({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);

  const isLeft = index % 2 === 0;

  return (
  <div
    ref={ref}
    className="relative grid md:grid-cols-2 items-center gap-12"
  >
    {/* DOT CENTER */}
    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#b8926c] border-4 border-white shadow-lg z-10" />

    {/* IMAGE */}
    <div
      className={`
        w-full
        ${isLeft ? "md:order-1 md:pr-16" : "md:order-2 md:pl-16"}
      `}
    >
      <ImageBlock item={item} y={y} />
    </div>

    {/* TEXT */}
    <div
      className={`
        w-full
        ${isLeft ? "md:order-2 md:pl-16" : "md:order-1 md:pr-16"}
      `}
    >
      <TextBlock item={item} />
    </div>
  </div>
);

}

function ImageBlock({ item, y }: { item: TimelineItem; y: any }) {
  return (
    <motion.div style={{ y }} className="relative max-w-md mx-auto">
      {/* ROPE */}
      <div className="absolute -top-6 left-0 right-0 h-[2px] bg-[#d6b98c]/70" />

      {/* PIN */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#c8a46b] rounded-sm rotate-45 shadow" />

      <div className="rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#b8926c]/20 bg-white p-2">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[420px] object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function TextBlock({ item }: { item: TimelineItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-[#b8926c]/10"
    >
      <p className="text-sm tracking-widest text-[#b8926c] mb-2 font-semibold">
        {item.year}
      </p>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        {item.title}
      </h3>

      <p className="text-gray-600 leading-relaxed text-base">{item.desc}</p>
    </motion.div>
  );
}
