"use client";

import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 6;

export default function WishDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/wishes/list")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  return (
    <section className="mt-24 max-w-5xl mx-auto">
      {/* Title */}
      <h2 className="font-ballet text-5xl text-center text-[#2b2b2b] mb-4">
        Lời chúc yêu thương
      </h2>
      <p className="text-center text-[#7a7a7a] italic mb-14">
        Những lời chúc từ gia đình & bạn bè thân yêu
      </p>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {pageData.map((w, i) => (
          <div
            key={i}
            className="relative bg-white/70 backdrop-blur-xl
            p-8 rounded-[2.5rem]
            shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            border border-[#e9dcc5]"
          >
            {/* Gold line */}
            <div className="absolute top-6 right-6 h-10 w-10 rounded-full border border-[#b8926c]/40" />

            <p className="text-lg font-semibold text-[#2b2b2b]">
              {w.name}
            </p>

            <p className="mt-4 italic text-[#4b4b4b] leading-relaxed">
              “{w.message}”
            </p>

            <p className="mt-6 text-sm text-right text-[#7a7a7a]">
              {w.time}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-14">
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`
                  px-5 py-2 rounded-full text-sm
                  transition-all shadow-md
                  ${
                    page === p
                      ? "bg-[#b8926c] text-white"
                      : "bg-white text-[#2b2b2b] hover:bg-[#f5e6ca]"
                  }
                `}
              >
                {p}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
