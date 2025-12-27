type Props = { time: Record<string, string> };

export default function Countdown({ time }: Props) {
  const labels: Record<string, string> = {
    days: "Ngày",
    hours: "Giờ",
    minutes: "Phút",
    seconds: "Giây",
  };

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
          <span className="text-sm">{labels[key]}</span>
        </div>
      ))}
    </div>
  );
}
