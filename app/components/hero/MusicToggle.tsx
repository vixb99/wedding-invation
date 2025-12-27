import { Volume2, VolumeX } from "lucide-react";

type Props = {
  isPlaying: boolean;
  onToggle: () => void;
};

export default function MusicToggle({ isPlaying, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-5 right-5 bg-[#6b4f4f]/40 backdrop-blur-md
      p-3 rounded-full z-20"
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-[#f5e6ca]" />
      ) : (
        <VolumeX className="w-6 h-6 text-[#f5e6ca]" />
      )}
    </button>
  );
}
