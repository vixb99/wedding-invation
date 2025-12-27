"use client";

import { useState } from "react";

export default function WishForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!name || !message) return;
    await fetch("/api/wishes", {
      method: "POST",
      body: JSON.stringify({ name, message }),
    });
    setDone(true);
  };

  if (done)
    return (
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-lg p-10 rounded-[3rem] shadow-xl border border-[#e9dcc5] text-center">
        <p className="font-ballet text-4xl text-[#2b2b2b]">
          Cảm ơn bạn 💖
        </p>
        <p className="mt-4 italic text-[#4b4b4b]">
          Lời chúc của bạn đã được gửi đến cô dâu & chú rể
        </p>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-[#e9dcc5]">
      <h2 className="font-ballet text-4xl text-center text-[#2b2b2b] mb-10">
        Gửi lời chúc
      </h2>

      <input
        className="w-full mb-5 px-5 py-3 rounded-2xl
        border border-[#d9c7aa] bg-white/80
        text-[#2b2b2b]
        focus:outline-none focus:ring-2 focus:ring-[#b8926c]"
        placeholder="Tên của bạn"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="w-full mb-8 px-5 py-3 rounded-2xl
        border border-[#d9c7aa] bg-white/80
        text-[#2b2b2b]
        focus:outline-none focus:ring-2 focus:ring-[#b8926c]"
        placeholder="Lời chúc dành cho cô dâu & chú rể"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full py-4 rounded-full
        bg-[#b8926c] text-white text-lg
        shadow-lg hover:bg-[#a07b59] transition-all"
      >
        Gửi lời chúc 💍
      </button>
    </div>
  );
}
