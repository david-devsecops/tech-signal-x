import { useEffect, useState } from 'react'

interface BlogPostData {
  id: string
  title: string
  date: string
  readTime: string
  category: string
  image: string
  content: string
}

interface BlogPostProps {
  blogId: string
  onBack: () => void
}

const BlogPost = ({ blogId, onBack }: BlogPostProps) => {
  const [post, setPost] = useState<BlogPostData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      const blogPosts: Record<string, BlogPostData> = {
        'aws-migration-strategy': {
          id: 'aws-migration-strategy',
          title: 'On-Premise에서 AWS로의 대규모 마이그레이션 전략',
          date: '2024년 1월 15일',
          readTime: '12분 읽기',
          category: 'AWS',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
          content: `
# On-Premise에서 AWS로의 대규모 마이그레이션 전략

아모레퍼시픽 프로젝트를 통해 경험한 대규모 엔터프라이즈의 AWS 마이그레이션 여정을 공유합니다.

## 프로젝트 개요

- **기간**: 2023년 1월 ~ 2023년 10월 (10개월)
- **규모**: 100+ 서버, 50+ 애플리케이션
- **팀 구성**: 솔루션 아키텍트, 시스템 엔지니어, 네트워크 전문가

## 마이그레이션 전략

### 1. 6R 전략 적용

**Rehost (Lift & Shift)**
- 레거시 시스템의 빠른 마이그레이션
- AWS Application Migration Service 활용
- 다운타임 최소화 (< 4시간)

**Replatform**
- 데이터베이스를 RDS로 마이그레이션
- 웹서버를 ELB + Auto Scaling으로 현대화

**Refactor**
- 마이크로서비스 아키텍처로 전환
- 컨테이너화 및 EKS 도입

### 2. 주요 성과

**비용 절감**
- 인프라 비용: 30% 절감
- 운영 비용: 40% 절감
- 전력 비용: 100% 절감

**성능 향상**
- 응답 시간: 평균 25% 개선
- 가용성: 99.9% → 99.99% 향상
- 확장성: Auto Scaling으로 트래픽 변화 대응

## 결론

대규모 마이그레이션은 기술적 도전뿐만 아니라 조직의 변화 관리도 중요합니다. 충분한 준비와 단계적 접근을 통해 안전하고 성공적인 클라우드 여정을 만들어갈 수 있습니다.

---

*이 글은 실제 아모레퍼시픽 AWS 마이그레이션 프로젝트 경험을 바탕으로 작성되었습니다.*
          `
        },
        'oracle-zdlra-architecture': {
          id: 'oracle-zdlra-architecture',
          title: 'Oracle ZDLRA 구축과 운영 노하우',
          date: '2024년 1월 10일',
          readTime: '15분 읽기',
          category: 'Oracle',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
          content: `
# Oracle ZDLRA 구축과 운영 노하우

금융권에서 Oracle Zero Data Loss Recovery Appliance를 구축하고 운영하며 얻은 경험을 공유합니다.

## ZDLRA란?

Oracle Zero Data Loss Recovery Appliance는 Oracle Database의 백업과 복구를 위한 엔지니어드 시스템입니다. Real-Time Redo Transport를 통해 진정한 Zero Data Loss를 보장합니다.

## 구축 경험

### 국민연금공단 (2019-2020)
- **규모**: ZDLRA X8-2 2대 (HA 구성)
- **보호 대상**: 100+ Oracle Database
- **특징**: 24x7 무중단 서비스

### KB카드 (2020)
- **규모**: ZDLRA X7-2 1대
- **보호 대상**: 카드 결제 시스템
- **요구사항**: 15분 RPO, 30분 RTO

### 수협은행 (2020-2021)
- **규모**: ZDLRA X8-2 2대
- **보호 대상**: 핵심 뱅킹 시스템
- **특징**: 실시간 백업 모니터링

## 운영 노하우

### 1. 모니터링

**핵심 메트릭**
- Redo Transport Lag
- Backup Completion Rate
- Storage Utilization
- Network Throughput

### 2. 성능 튜닝

**네트워크 최적화**
- Dedicated 10Gb Network 구성
- ASYNC 모드로 운영 (LAG < 30초)
- Compression Level 조정 (MEDIUM)

**스토리지 최적화**
- ASM Disk Group 설계
- Flash Cache 활용
- 자동 공간 관리

## 결론

ZDLRA는 Oracle Database의 궁극적인 백업 솔루션입니다. 초기 투자 비용은 높지만, Zero Data Loss 보장과 운영 효율성을 고려하면 충분한 가치가 있습니다.

---

*이 글은 국민연금, KB카드, 수협은행 등에서 ZDLRA를 구축하고 운영한 실제 경험을 바탕으로 작성되었습니다.*
          `
        }
      }

      const foundPost = blogPosts[blogId]
      setPost(foundPost || null)
      setLoading(false)
    }

    fetchPost()
  }, [blogId])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">포스트를 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-8">요청한 블로그 포스트가 존재하지 않습니다.</p>
          <button onClick={onBack} className="btn-primary">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 relative mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meta Info */}
        <div className="flex items-center text-gray-500 text-sm mb-8">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
          <span className="mx-2">•</span>
          <button onClick={onBack} className="text-blue-600 hover:text-blue-800">
            박상준.dev
          </button>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="space-y-4">
            {post.content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>
              } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>
              } else if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>
              } else if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={index} className="font-bold mb-2">{line.substring(2, line.length - 2)}</p>
              } else if (line.startsWith('- ')) {
                return <li key={index} className="mb-1 ml-4">{line.substring(2)}</li>
              } else if (line.trim() === '') {
                return <br key={index} />
              } else if (line.startsWith('*') && line.endsWith('*')) {
                return <p key={index} className="text-gray-600 italic text-sm mt-8">{line.substring(1, line.length - 1)}</p>
              } else {
                return <p key={index} className="mb-4">{line}</p>
              }
            })}
          </div>
        </article>

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            블로그 목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPost