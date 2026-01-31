"use client";

import { useLanguage } from "../lang/LanguageContext";


type Props = { time: Record<string, string> };

type CountdownLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const LABELS: Record<string, CountdownLabels> = {
  vi: {
    days: "Ngày",
    hours: "Giờ",
    minutes: "Phút",
    seconds: "Giây",
  },
  en: {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  zh: {
    days: "天",
    hours: "小時",
    minutes: "分鐘",
    seconds: "秒",
  },
};

export default function Countdown({ time }: Props) {
  const { lang } = useLanguage();
  const labels = LABELS[lang] || LABELS.vi;

  return (
    <div className="flex justify-center gap-4 mb-6">
      {Object.entries(time).map(([key, value]) => (
        <div
          key={key}
          className="bg-[#f5e6ca]/80 rounded-lg px-4 py-2 shadow-md"
        >
          <span className="block text-2xl font-semibold text-[#9c6b4e]">
            {value}
          </span>
          <span className="text-sm">
            {labels[key as keyof CountdownLabels]}
          </span>
        </div>
      ))}
    </div>
  );
}
