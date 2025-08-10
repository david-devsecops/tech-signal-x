import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '박상준 - AWS Cloud Solutions Architect',
  description: '12년 경력의 시니어 클라우드 엔지니어, 엔터프라이즈급 인프라 설계 및 클라우드 마이그레이션 전문가',
  keywords: 'AWS, Cloud Architecture, DevOps, Kubernetes, Infrastructure, CBDC, 박상준',
  authors: [{ name: '박상준' }],
  creator: '박상준',
  openGraph: {
    title: '박상준 - AWS Cloud Solutions Architect',
    description: '12년 경력의 시니어 클라우드 엔지니어, 엔터프라이즈급 인프라 설계 및 클라우드 마이그레이션 전문가',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '박상준 - AWS Cloud Solutions Architect',
    description: '12년 경력의 시니어 클라우드 엔지니어, 엔터프라이즈급 인프라 설계 및 클라우드 마이그레이션 전문가',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}