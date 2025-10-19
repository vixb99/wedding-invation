"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroBannerWedding() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const toggleAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (isPlaying) fadeOut(audio);
    else fadeIn(audio);
    setIsPlaying(!isPlaying);
  };

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    audio.play();
    const fade = setInterval(() => {
      if (audio.volume < 1) {
        audio.volume = Math.min(1, audio.volume + 0.05);
      } else {
        clearInterval(fade);
      }
    }, 100);
  };

  const fadeOut = (audio: HTMLAudioElement) => {
    const fade = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - 0.05);
      } else {
        clearInterval(fade);
        audio.pause();
      }
    }, 100);
  };

  const handleUserChoice = (play: boolean) => {
    if (play) toggleAudio();
    setShowPopup(false);
  };

  // Countdown logic
  useEffect(() => {
    const weddingDate = new Date("2025-12-20T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString(),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ).toString(),
          minutes: Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          ).toString(),
          seconds: Math.floor((distance % (1000 * 60)) / 1000).toString(),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const section = document.getElementById("details");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center transition-all duration-500 text-[#6b4f4f]"
      style={{
        backgroundImage: "url('/images/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* lớp overlay nền */}
      <div
        className={`absolute inset-0 bg-[#6b4f4f]/30 backdrop-blur-sm transition-opacity duration-500 ${
          showPopup ? "opacity-100" : "opacity-10"
        }`}
      ></div>

      <div className="relative z-10 text-center px-4">
        <h3 className="text-xl md:text-2xl mb-2 italic">
          Cùng với gia đình hai bên
        </h3>
        <h1 className="text-5xl md:text-7xl text-[#b8926c] mb-4 drop-shadow-lg text-center">
          <span className="block">Chấn Vĩ</span>
          <span className="block text-4xl md:text-5xl my-2">&</span>
          <span className="block">Thị Hiền 💍</span>
        </h1>

        {/* Countdown */}
        <div className="flex justify-center gap-4 mb-6">
          {["days", "hours", "minutes", "seconds"].map((key) => (
            <div
              key={key}
              className="bg-[#f5e6ca]/80 rounded-lg px-4 py-2 shadow-md text-center"
            >
              <span className="block text-2xl font-semibold text-[#9c6b4e]">
                {timeLeft[key as keyof typeof timeLeft]}
              </span>
              <span className="text-sm capitalize">
                {key === "days"
                  ? "Ngày"
                  : key === "hours"
                  ? "Giờ"
                  : key === "minutes"
                  ? "Phút"
                  : "Giây"}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToNext}
          className="bg-[#b8926c] text-[#fffaf3] px-6 py-3 rounded-full hover:bg-[#a07b59] transition-all text-lg shadow-md"
        >
          Xem chi tiết lịch trình 💫
        </button>
      </div>

      {/* Nút bật/tắt nhạc */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-5 right-5 bg-[#6b4f4f]/40 backdrop-blur-md p-3 rounded-full hover:bg-[#6b4f4f]/60 transition-all z-20"
        aria-label="Toggle music"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-[#f5e6ca]" />
        ) : (
          <VolumeX className="w-6 h-6 text-[#f5e6ca]" />
        )}
      </button>

      {/* Popup bật nhạc */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-30 animate-fadeIn">
          <div className="bg-[#f5e6ca] text-[#6b4f4f] rounded-3xl p-10 text-center shadow-2xl border border-[#6b4f4f]/20 max-w-lg mx-4">
            <h2 className="text-4xl font-['Great_Vibes'] text-[#9c6b4e] mb-4">
              🎶 Một chút nhạc cho tình yêu nhé?
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Một bản piano dịu dàng sẽ khiến khung cảnh thêm ấm áp hơn...
              <br />
              Bạn có muốn để nhạc vang lên cùng tình yêu này không? 💖
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleUserChoice(true)}
                className="bg-[#6b4f4f] text-[#f5e6ca] px-6 py-3 rounded-lg hover:bg-[#5a3f3f] transition-all text-lg font-medium"
              >
                Bật nhạc 💕
              </button>
              <button
                onClick={() => handleUserChoice(false)}
                className="bg-[#d9c7aa] text-[#6b4f4f] px-6 py-3 rounded-lg hover:bg-[#cbb997] transition-all text-lg font-medium"
              >
                Không cần đâu 😚
              </button>
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} loop src="/audio/music.mp3" />
    </section>
  );
}
