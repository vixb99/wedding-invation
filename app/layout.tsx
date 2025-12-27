import SparkleRain from './components/effect/SparkleRain';
import './globals.css'
import type { Metadata } from 'next'

// app/layout.tsx
export const metadata = {
  title: "Trang cưới Chấn Vĩ & Thị Hiền 💍",
  description: "Trang cưới của chúng tôi, lưu lại những khoảnh khắc hạnh phúc nhất 💖",
  openGraph: {
    title: "Chấn Vĩ & Thị Hiền 💍",
    description: "Trang cưới của chúng tôi, lưu lại những khoảnh khắc hạnh phúc nhất 💖",
    url: "https://vixhien.vercel.app",
    siteName: "Chấn Vĩ & Thị Hiền Wedding",
    images: [
      {
        url: "https://vixhien.vercel.app/images/image.png",
        width: 1200,
        height: 630,
        alt: "Ảnh cưới Chấn Vĩ & Thị Hiền 💍",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chấn Vĩ & Thị Hiền 💍",
    description: "Trang cưới của chúng tôi 💖",
    images: ["https://yourwedding.vercel.app/images/image.png"],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="relative">
         <SparkleRain />
        {children}</body>
    </html>
  )
}
