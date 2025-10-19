import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vĩ & Hiền Wedding',
  description: 'A love story forever 💖',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="relative">{children}</body>
    </html>
  )
}
