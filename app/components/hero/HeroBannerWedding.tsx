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

  const timeLeft = useCountdown("2026-03-28T18:00:00");
  const { audioRef, isPlaying, toggle } = useAudioFade();

  /* ---------- LOAD INITIAL WISHES ---------- */
  useEffect(() => {
    fetch("/api/wishes/list")
      .then((r) => r.json())
      .then((data) => {
        const latest = data.slice(-10);
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
      setCurrentWishes((prev) => [...prev, next]);

      setTimeout(() => {
        setCurrentWishes((prev) => prev.filter((w) => w.id !== next.id));
      }, 10000);
    }, 5000);

    return () => clearInterval(interval);
  }, [queue]);

  /* ---------- SEND WISH ---------- */
  const sendWish = async (wish: Omit<Wish, "id">) => {
    const newWish: Wish = {
      id: Date.now(),
      ...wish,
    };
    setQueue((q) => [...q, newWish]);

    await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wish),
    });
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex flex-col 
                 items-center justify-center md:justify-center 
                 md:items-start
                 px-4 md:px-20 bg-cover bg-center !bg-[center_40%]"
      style={{ backgroundImage: "url('/images/CTIN2142.JPG')" }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/10" />
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm
        ${showMusicPopup ? "opacity-100" : "opacity-10"}`}
      />
      {/* --- MAIN TEXT CONTENT --- */}
      {/* Mobile: text-center. Desktop: text-left */}
      <div className="relative z-10 text-center w-full max-w-xl p-4 md:p-8 md:pr-30 mt-[-10vh] md:mt-0">
        <h3 className="text-lg md:text-xl italic text-white/90 mb-2 font-light tracking-wide">
          Cùng với gia đình hai bên
        </h3>

       <h1 className="text-5xl md:text-7xl text-[#9c6b4e] mb-4 font-ballet leading-tight">
          <span className="block">Chấn Vĩ</span>
          <span className="block">&</span>
          <span className="block">Thị Hiền</span>
        </h1>

        <Countdown time={timeLeft} />

        <button
          onClick={() => setShowWishPopup(true)}
          className="mt-8 px-8 py-3 rounded-full
                     bg-[#b8926c] text-white text-lg font-medium
                     shadow-[0_0_20px_rgba(184,146,108,0.4)] 
                     hover:bg-[#a07b59] hover:scale-105
                     active:scale-95 transition-all duration-300"
        >
          Gửi lời chúc 💌
        </button>
      </div>
      {/* --- LIVE BUBBLES CONTAINER --- */}
      {/* Mobile: bottom-8, left-1/2 (giữa). Desktop: bottom-24, right-6 (góc phải) */}
      <div
        className="pointer-events-none absolute z-20 
                   bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-[340px]
                   md:bottom-24 md:left-auto md:right-6 md:translate-x-0 md:w-[340px]
                   flex flex-col gap-3 justify-end items-center md:items-end"
      >
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
      className="flex items-start gap-3 bg-white/80 backdrop-blur-md
                 px-4 py-3 rounded-2xl shadow-lg border border-white/20
                 animate-live-bubble text-black w-full"
    >
      <div
        className="shrink-0 w-9 h-9 rounded-full bg-[#b8926c]
                   text-white flex items-center justify-center font-bold shadow-sm"
      >
        {wish.name[0].toUpperCase()}
      </div>

      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-bold text-[#b8926c] truncate">{wish.name}</p>
        <p className="text-sm italic text-gray-700 break-words leading-tight">
          “{wish.message}”
        </p>
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-[2rem] p-6 md:p-8 w-[90%] max-w-[360px] shadow-2xl animate-fade-in-up">
        <h3 className="font-ballet text-3xl md:text-4xl text-center mb-6 text-[#b8926c]">
          Gửi lời chúc 💖
        </h3>

        <div className="space-y-4">
          <input
            className="w-full px-5 py-3 rounded-full border border-gray-200 
                       focus:outline-none focus:border-[#b8926c] focus:ring-1 focus:ring-[#b8926c]
                       bg-gray-50 text-black placeholder:text-gray-400 transition-all"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="w-full px-5 py-3 rounded-2xl border border-gray-200 
                       focus:outline-none focus:border-[#b8926c] focus:ring-1 focus:ring-[#b8926c]
                       bg-gray-50 text-black placeholder:text-gray-400 transition-all resize-none"
            placeholder="Lời chúc thân thương..."
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-gray-300 text-gray-500 font-medium hover:bg-gray-100 transition-colors"
          >
            Huỷ
          </button>
          <button
            onClick={submit}
            className="flex-1 py-2.5 rounded-full bg-[#b8926c] text-white font-medium 
                       shadow-md hover:bg-[#a07b59] transition-colors"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
