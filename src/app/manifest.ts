import { MetadataRoute } from 'next'
import { PROFILE } from '@/data/profile'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} - ${PROFILE.role}`,
    short_name: PROFILE.name,
    description: `${PROFILE.experience} 경력의 시니어 클라우드 엔지니어, 엔터프라이즈급 인프라 설계 및 클라우드 마이그레이션 전문가`,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0b0d',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}