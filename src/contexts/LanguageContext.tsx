import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '../types'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ko: {
    // Header (한국어는 영어 그대로 유지)
    'nav.about': 'About',
    'nav.projects': 'Projects', 
    'nav.blog': 'Blog',
    'nav.newsletter': 'Newsletter',
    
    // Hero
    'hero.greeting': '안녕하세요, {name}입니다',
    'hero.description': '12년 9개월의 클라우드 엔지니어 경험을 바탕으로\nAWS, GCP, Azure 등 멀티클라우드 아키텍처를 설계하고 구축합니다',
    'hero.viewProjects': '프로젝트 보기',
    'hero.readBlog': '블로그 읽기',
    
    // About
    'about.title': 'About Me',
    'about.description': '12년 9개월의 클라우드 엔지니어 경험을 바탕으로 AWS, Azure, GCP 등 멀티클라우드 환경에서 인프라를 설계하고 구축합니다.\n오라클 데이터베이스부터 쿠버네티스까지, 다양한 기술 스택을 활용하여 안정적이고 확장 가능한 시스템을 구축합니다.',
    'about.skills': '기술 스택',
    'about.experience': '경력 사항',
    'about.certifications': '자격증',
    
    // Projects
    'projects.title': 'Major Projects',
    'projects.description': '클라우드 아키텍트로서 수행한 주요 프로젝트들입니다',
    'projects.internal': '기업 내부 프로젝트',
    
    // Blog
    'blog.title': 'Tech Blog',
    'blog.description': '개발하면서 배운 지식과 경험을 공유합니다',
    'blog.category.all': '전체',
    'blog.readMore': '더 읽기',
    'blog.viewAll': '모든 포스트 보기',
    'blog.backToList': '블로그 목록으로 돌아가기',
    'blog.notFound': '포스트를 찾을 수 없습니다',
    'blog.notFoundDesc': '요청한 블로그 포스트가 존재하지 않습니다.',
    'blog.backHome': '홈으로 돌아가기',
    
    // Newsletter
    'newsletter.title': 'Newsletter',
    'newsletter.description': '최신 기술 트렌드와 개발 노하우를 이메일로 받아보세요',
    'newsletter.placeholder': '이메일 주소를 입력하세요',
    'newsletter.subscribe': '구독하기',
    
    // Footer
    'footer.quickLinks': '빠른 링크',
    'footer.categories': '카테고리',
    'footer.privacy': '개인정보처리방침',
    'footer.terms': '이용약관',
    'footer.rights': 'All rights reserved.',
  },
  en: {
    // Header
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog', 
    'nav.newsletter': 'Newsletter',
    
    // Hero
    'hero.greeting': 'Hello, I\'m {name}',
    'hero.description': 'With 12 years and 9 months of cloud engineering experience,\nI design and build multi-cloud architectures using AWS, GCP, Azure, and more.',
    'hero.viewProjects': 'View Projects',
    'hero.readBlog': 'Read Blog',
    
    // About
    'about.title': 'About Me',
    'about.description': 'With 12 years and 9 months of cloud engineering experience, I design and build infrastructure in multi-cloud environments including AWS, Azure, and GCP.\nFrom Oracle databases to Kubernetes, I leverage diverse technology stacks to build stable and scalable systems.',
    'about.skills': 'Tech Stack',
    'about.experience': 'Experience',
    'about.certifications': 'Certifications',
    
    // Projects
    'projects.title': 'Major Projects',
    'projects.description': 'Key projects performed as a cloud architect',
    'projects.internal': 'Internal Enterprise Project',
    
    // Blog
    'blog.title': 'Tech Blog',
    'blog.description': 'Sharing knowledge and experience gained through development',
    'blog.category.all': 'All',
    'blog.readMore': 'Read More',
    'blog.viewAll': 'View All Posts',
    'blog.backToList': 'Back to Blog List',
    'blog.notFound': 'Post Not Found',
    'blog.notFoundDesc': 'The requested blog post does not exist.',
    'blog.backHome': 'Back to Home',
    
    // Newsletter
    'newsletter.title': 'Newsletter',
    'newsletter.description': 'Get the latest tech trends and development insights delivered to your email',
    'newsletter.placeholder': 'Enter your email address',
    'newsletter.subscribe': 'Subscribe',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.categories': 'Categories',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service', 
    'footer.rights': 'All rights reserved.',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko') // 기본값: 한국어

  const t = useCallback((key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }, [language])

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, t])

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}