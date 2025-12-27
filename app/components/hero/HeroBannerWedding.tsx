"use client";

import { useState } from "react";
import Countdown from "./Countdown";
import MusicToggle from "./MusicToggle";
import MusicPopup from "./MusicPopup";
import { useCountdown } from "../hooks/useCountdown";
import { useAudioFade } from "../hooks/useAudioFade";

export default function HeroBannerWedding() {
  const [showPopup, setShowPopup] = useState(true);
  const timeLeft = useCountdown("2026-03-28T18:00:00");
  const { audioRef, isPlaying, toggle } = useAudioFade();

  const scrollToWishes = () => {
    document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative h-screen flex items-center 
                 justify-start 
                 px-6 md:px-20
                 bg-cover bg-center !bg-[center_40%]"
      style={{ backgroundImage: "url('/images/CTIN2142.JPG')" }}
    >
      {/* Overlay tối */}
      <div className="absolute inset-0 bg-black/20" />
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm
        ${showPopup ? "opacity-100" : "opacity-10"}`}
      />

      {/* Nội dung bên trái */}
      <div
        className="relative z-10 text-center max-w-xl
                   rounded-2xl p-6 md:p-8"
      >
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
          onClick={scrollToWishes}
          className="
      mt-6 px-8 py-3 rounded-full
      bg-[#b8926c] text-white text-lg
      shadow-lg backdrop-blur-md
      hover:bg-[#a07b59]
      transition-all duration-300
    "
        >
          Gửi lời chúc 💌
        </button>
      </div>

      {/* Toggle nhạc */}
      <MusicToggle isPlaying={isPlaying} onToggle={toggle} />

      {/* Popup nhạc */}
      {showPopup && (
        <MusicPopup
          titleClass=""
          onAccept={() => {
            toggle();
            setShowPopup(false);
          }}
          onDecline={() => setShowPopup(false)}
        />
      )}

      {/* Audio */}
      <audio ref={audioRef} loop src="/audio/music.mp3" />
    </section>
  );
}
