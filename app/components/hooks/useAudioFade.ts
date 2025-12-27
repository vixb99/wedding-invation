import { useRef, useState } from "react";

export function useAudioFade() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    audio.play();
    const id = setInterval(() => {
      audio.volume = Math.min(1, audio.volume + 0.05);
      if (audio.volume === 1) clearInterval(id);
    }, 100);
  };

  const fadeOut = (audio: HTMLAudioElement) => {
    const id = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - 0.05);
      if (audio.volume === 0) {
        audio.pause();
        clearInterval(id);
      }
    }, 100);
  };

  const toggle = () => {
    if (!audioRef.current) return;
    isPlaying ? fadeOut(audioRef.current) : fadeIn(audioRef.current);
    setIsPlaying(!isPlaying);
  };

  return { audioRef, isPlaying, toggle };
}
