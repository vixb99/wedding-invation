
import { useEffect, useState } from "react";

const zero = { days: "00", hours: "00", minutes: "00", seconds: "00" };

export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState(zero);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const id = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) return setTimeLeft(zero);

      setTimeLeft({
        days: Math.floor(diff / 86400000).toString(),
        hours: Math.floor((diff % 86400000) / 3600000).toString(),
        minutes: Math.floor((diff % 3600000) / 60000).toString(),
        seconds: Math.floor((diff % 60000) / 1000).toString(),
      });
    }, 1000);

    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}
