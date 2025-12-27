"use client";

export default function WishBubble({
  wish,
}: {
  wish: { name: string; message: string };
}) {
  return (
    <div
      className="flex items-start gap-3 bg-white/90 backdrop-blur-md
                 px-4 py-3 rounded-2xl shadow-lg
                 animate-[liveBubble_6s_ease-in-out]
                 max-w-full break-words"
    >
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full bg-[#b8926c] text-white
                   flex items-center justify-center font-bold text-lg"
      >
        {wish.name[0].toUpperCase()}
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{wish.name}</p>
        <p className="text-sm italic break-words whitespace-pre-wrap">{wish.message}</p>
      </div>
    </div>
  );
}
