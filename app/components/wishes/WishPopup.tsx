"use client";

import { useState } from "react";

export default function WishPopup({
  onClose,
  onSend,
}: {
  onClose: () => void;
  onSend: (w: { name: string; message: string }) => void;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!name || !message) return;

    const wish = { name, message };
    onSend(wish); // show instantly

    await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wish),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 w-full max-w-md shadow-xl flex flex-col gap-4">
        <h3 className="font-ballet text-3xl text-center mb-2 sm:mb-4">
          Gửi lời chúc 💖
        </h3>

        <input
          className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8926c] text-black"
          placeholder="Tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8926c] text-black resize-none break-words whitespace-pre-wrap"
          placeholder="Lời chúc..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex gap-3 mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            Huỷ
          </button>
          <button
            onClick={submit}
            className="flex-1 py-3 rounded-full bg-[#b8926c] text-white hover:bg-[#a07b59] transition"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
