"use client";

import { useEffect, useState } from "react";
import WishBubble from "./WishBubble";
import WishPopup from "./WishPopup";

type Wish = {
  name: string;
  message: string;
};

export default function HeroWishLive() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  // load recent wishes
  useEffect(() => {
    fetch("/api/wishes/list")
      .then((r) => r.json())
      .then((data) => setWishes(data.slice(-5).reverse()));
  }, []);

  const onSend = (wish: Wish) => {
    setWishes((prev) => [wish, ...prev].slice(0, 6));
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* HERO CONTENT */}
      <div className="h-full flex flex-col items-center justify-center text-center">
        <h1 className="font-ballet text-7xl mb-6">Vĩ & Hiền</h1>
        <p className="italic text-lg mb-10">Chúng tôi sắp cưới 💍</p>

        <button
          onClick={() => setShowPopup(true)}
          className="px-8 py-4 rounded-full bg-[#b8926c] text-white shadow-lg"
        >
          💬 Gửi lời chúc
        </button>
      </div>

      {/* LIVE COMMENT ZONE */}
      <div className="absolute top-24 right-6 w-[340px] space-y-4 pointer-events-none">
        {wishes.map((w, i) => (
          <WishBubble key={i} wish={w} />
        ))}
      </div>

      {showPopup && (
        <WishPopup
          onClose={() => setShowPopup(false)}
          onSend={onSend}
        />
      )}
    </section>
  );
}
