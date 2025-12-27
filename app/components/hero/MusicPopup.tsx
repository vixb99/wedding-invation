type Props = {
  onAccept: () => void;
  onDecline: () => void;
  titleClass: string;
};

export default function MusicPopup({ onAccept, onDecline, titleClass }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="bg-[#f5e6ca] rounded-3xl p-10 text-center shadow-2xl">
        <h2 className={`${titleClass} text-4xl text-[#9c6b4e] mb-4`}>
          🎶 Một chút nhạc cho tình yêu nhé?
        </h2>
        <p className="text-lg mb-6 text-black">
          Một bản piano dịu dàng sẽ khiến khung cảnh thêm ấm áp hơn...
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={onAccept}
            className="bg-[#6b4f4f] text-[#f5e6ca] px-6 py-3 rounded-lg"
          >
            Bật nhạc 💕
          </button>
          <button
            onClick={onDecline}
            className="bg-[#d9c7aa] text-[#6b4f4f] px-6 py-3 rounded-lg"
          >
            Không cần đâu 😚
          </button>
        </div>
      </div>
    </div>
  );
}
