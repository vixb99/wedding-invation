import SparkleRain from "./components/effect/SparkleRain";
import { LanguageProvider } from "./components/lang/LanguageContext";
import "./globals.css";
import type { Metadata } from "next";

// app/layout.tsx
export const metadata = {
  title: "Trang cưới Chấn Vĩ & Trương Hiền 💍",
  description:
    "Trang cưới của chúng tôi, lưu lại những khoảnh khắc hạnh phúc nhất 💖",
  openGraph: {
    title: "Chấn Vĩ & Trương Hiền 💍",
    description:
      "Trang cưới của chúng tôi, lưu lại những khoảnh khắc hạnh phúc nhất 💖",
    url: "https://vixhien.vercel.app",
    siteName: "Chấn Vĩ & Trương Hiền Wedding",
    images: [
      {
        url: "https://vixhien.vercel.app/images/image.png",
        width: 1200,
        height: 630,
        alt: "Ảnh cưới Chấn Vĩ & Trương Hiền 💍",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chấn Vĩ & Trương Hiền 💍",
    description: "Trang cưới của chúng tôi 💖",
    images: ["https://vixhien.vercel.app/images/image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="relative">
        <SparkleRain />
        <LanguageProvider>{children}</LanguageProvider>\
      </body>
    </html>
  );
}
