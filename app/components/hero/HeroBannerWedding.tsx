"use client";

import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import MusicToggle from "./MusicToggle";
import MusicPopup from "./MusicPopup";
import { useCountdown } from "../hooks/useCountdown";
import { useAudioFade } from "../hooks/useAudioFade";

/* ---------------- TYPES ---------------- */

type Wish = {
  id: number;
  name: string;
  message: string;
};

/* ---------------- MAIN ---------------- */

export default function HeroBannerWedding() {
  const [showMusicPopup, setShowMusicPopup] = useState(true);
  const [showWishPopup, setShowWishPopup] = useState(false);

  // QUEUE + CURRENT (livestream core)
  const [queue, setQueue] = useState<Wish[]>([]);
  const [current, setCurrent] = useState<Wish | null>(null);

  const timeLeft = useCountdown("2026-03-28T18:00:00");
  const { audioRef, isPlaying, toggle } = useAudioFade();

  /* ---------- LOAD INITIAL WISHES ---------- */
  useEffect(() => {
    fetch("/api/wishes/list")
      .then((r) => r.json())
      .then((data) => {
        const latest = data.slice(-10); // lấy nhiều comment
        setQueue(
          latest.map((w: any, i: number) => ({
            id: Date.now() + i,
            name: w.name,
            message: w.message,
          }))
        );
      });
  }, []);

  /* ---------- LIVE STREAM CONTROLLER ---------- */
  const [currentWishes, setCurrentWishes] = useState<Wish[]>([]);

  useEffect(() => {
    if (queue.length === 0) return;

    const interval = setInterval(() => {
      if (queue.length === 0) {
        clearInterval(interval);
        return;
      }

      const next = queue[0];
      setQueue((q) => q.slice(1));

      // Thêm bubble mới vào currentWishes
      setCurrentWishes((prev) => [...prev, next]);

      // Xoá bubble sau 6s
      setTimeout(() => {
        setCurrentWishes((prev) => prev.filter((w) => w.id !== next.id));
      }, 10000);
    }, 4000);

    return () => clearInterval(interval);
  }, [queue]);

  /* ---------- SEND WISH ---------- */
  const sendWish = async (wish: Omit<Wish, "id">) => {
    const newWish: Wish = {
      id: Date.now(),
      ...wish,
    };

    // chỉ push vào QUEUE
    setQueue((q) => [...q, newWish]);

    await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wish),
    });
  };

  return (
    <section
      className="relative h-screen flex items-center justify-start
                 px-6 md:px-20 bg-cover bg-center !bg-[center_40%]"
      style={{ backgroundImage: "url('/images/CTIN2142.JPG')" }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm
        ${showMusicPopup ? "opacity-100" : "opacity-10"}`}
      />
      {/* LEFT CONTENT */}
      <div className="relative z-10 text-center max-w-xl p-6 md:p-8">
        <h3 className="text-xl italic text-white mb-2">
          Cùng với gia đình hai bên
        </h3>

        <h1 className="text-5xl md:text-7xl text-[#FF0066] mb-4 font-ballet leading-tight">
          <span className="block">Chấn Vĩ</span>
          <span className="block">&</span>
          <span className="block">Thị Hiền</span>
        </h1>

        <Countdown time={timeLeft} />

        <button
          onClick={() => setShowWishPopup(true)}
          className="mt-6 px-8 py-3 rounded-full
                     bg-[#b8926c] text-white text-lg
                     shadow-lg hover:bg-[#a07b59]
                     transition-all"
        >
          Gửi lời chúc 💌
        </button>
      </div>
      {/* LIVE COMMENT (ONLY 1 AT A TIME) */}
      <div className="pointer-events-none absolute bottom-24 right-6 w-[340px] z-20">
        {current && <WishBubble wish={current} />}
      </div>
      <div className="pointer-events-none absolute bottom-24 right-6 w-[340px] z-20">
        {currentWishes.map((w) => (
          <WishBubble key={w.id} wish={w} />
        ))}
      </div>
      {/* MUSIC */} <MusicToggle isPlaying={isPlaying} onToggle={toggle} />{" "}
      {showMusicPopup && (
        <MusicPopup
          titleClass=""
          onAccept={() => {
            toggle();
            setShowMusicPopup(false);
          }}
          onDecline={() => setShowMusicPopup(false)}
        />
      )}{" "}
      <audio ref={audioRef} loop src="/audio/music.mp3" />
      {/* POPUP SEND WISH */}
      {showWishPopup && (
        <WishPopup onClose={() => setShowWishPopup(false)} onSend={sendWish} />
      )}
    </section>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function WishBubble({ wish }: { wish: Wish }) {
  return (
    <div
      className="flex items-start gap-3 bg-white/90 backdrop-blur
                 px-4 py-3 rounded-2xl shadow-lg
                 animate-live-bubble text-black"
    >
      <div
        className="w-9 h-9 rounded-full bg-[#b8926c]
                      text-white flex items-center justify-center font-bold"
      >
        {wish.name[0].toUpperCase()}
      </div>

      <div>
        <p className="text-sm font-semibold">{wish.name}</p>
        <p className="text-sm italic">“{wish.message}”</p>
      </div>
    </div>
  );
}

function WishPopup({
  onClose,
  onSend,
}: {
  onClose: () => void;
  onSend: (w: { name: string; message: string }) => void;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!name || !message) return;
    onSend({ name, message });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center text-black">
      <div className="bg-white rounded-[2.5rem] p-8 w-[360px] shadow-xl">
        <h3 className="font-ballet text-3xl text-center mb-6">
          Gửi lời chúc 💖
        </h3>

        <input
          className="w-full mb-4 px-4 py-2 rounded-full border"
          placeholder="Tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full mb-6 px-4 py-2 rounded-2xl border"
          placeholder="Lời chúc..."
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 rounded-full border">
            Huỷ
          </button>
          <button
            onClick={submit}
            className="flex-1 py-2 rounded-full bg-[#b8926c] text-white"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
