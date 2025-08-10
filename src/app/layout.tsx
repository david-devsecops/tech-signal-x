import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech Blog',
  description: 'Modern tech blog with database integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}