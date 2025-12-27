"use client";

import { useEffect, useState } from "react";

type Sparkle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
};

export default function SparkleRain() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const batchSize = 30; 

      const batch: Sparkle[] = Array.from({ length: batchSize }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 4, 
        duration: Math.random() * 4 + 6,
        delay: Math.random() * 1.5,
      }));

      setSparkles((prev) => [...prev, ...batch]);

      setTimeout(() => {
        setSparkles((prev) =>
          prev.filter((s) => !batch.some((b) => b.id === s.id))
        );
      }, 14000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
