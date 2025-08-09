import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { useLanguage } from '../contexts/LanguageContext'
// import { useBlog } from '../contexts/BlogContext' // Currently unused
import { blogApi } from '../services/blogApi'
import type { BlogPost as BlogPostType } from '../types'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  // const navigate = useNavigate() // Currently unused
  const { language } = useLanguage()
  // const { state } = useBlog() // Currently unused
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 정적 포스트 데이터 (API 백업용)
  const staticPosts: Record<string, BlogPostType> = {
    'aws-migration-strategy': {
      id: 'aws-migration-strategy',
      title: language === 'ko' ? 'On-Premise에서 AWS로의 대규모 마이그레이션 전략' : 'Large-scale Migration Strategy from On-Premise to AWS',
      slug: 'aws-migration-strategy',
      excerpt: language === 'ko' 
        ? '아모레퍼시픽 프로젝트를 통해 배운 대규모 엔터프라이즈의 AWS 마이그레이션 경험과 전략을 공유합니다.'
        : 'Sharing large-scale enterprise AWS migration experience and strategies learned through the Amorepacific project.',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      published: true,
      featured: true,
      viewCount: 1240,
      likeCount: 89,
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z',
      publishedAt: '2024-01-15T09:00:00Z',
      authorId: 'static-author',
      author: { id: 'static-author', name: '박상준', username: 'david-devsecops' },
      categoryId: 'aws',
      category: { id: 'aws', name: 'AWS', slug: 'aws', color: '#FF9900' },
      tags: [{ id: 'aws-1', name: 'AWS', slug: 'aws', color: '#FF9900' }],
      content: `# On-Premise에서 AWS로의 대규모 마이그레이션 전략

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

*이 글은 실제 아모레퍼시픽 AWS 마이그레이션 프로젝트 경험을 바탕으로 작성되었습니다.*`
    },
    'oracle-zdlra-architecture': {
      id: 'oracle-zdlra-architecture',
      title: language === 'ko' ? 'Oracle ZDLRA 구축과 운영 노하우' : 'Oracle ZDLRA Construction and Operation Know-how',
      slug: 'oracle-zdlra-architecture',
      excerpt: language === 'ko'
        ? '국민연금, KB카드 등 대형 금융기관에서 Oracle Zero Data Loss Recovery Appliance를 구축하고 운영한 경험을 나눕니다.'
        : 'Sharing experience in constructing and operating Oracle Zero Data Loss Recovery Appliance at major financial institutions including National Pension Service and KB Card.',
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      published: true,
      featured: false,
      viewCount: 856,
      likeCount: 43,
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-10T09:00:00Z',
      publishedAt: '2024-01-10T09:00:00Z',
      authorId: 'static-author',
      author: { id: 'static-author', name: '박상준', username: 'david-devsecops' },
      categoryId: 'oracle',
      category: { id: 'oracle', name: 'Oracle', slug: 'oracle', color: '#F80000' },
      tags: [{ id: 'oracle-1', name: 'Oracle', slug: 'oracle', color: '#F80000' }],
      content: `# Oracle ZDLRA 구축과 운영 노하우

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

*이 글은 국민연금, KB카드, 수협은행 등에서 ZDLRA를 구축하고 운영한 실제 경험을 바탕으로 작성되었습니다.*`
    },
    'kubernetes-production-guide': {
      id: 'kubernetes-production-guide',
      title: language === 'ko' ? '프로덕션 Kubernetes 클러스터 운영 가이드' : 'Production Kubernetes Cluster Operation Guide',
      slug: 'kubernetes-production-guide',
      excerpt: language === 'ko'
        ? 'SKT T-deal, 메타버스 플랫폼 등에서 Kubernetes를 운영하며 얻은 실전 경험과 모니터링, 로깅 전략을 소개합니다.'
        : 'Introducing practical experience and monitoring, logging strategies gained from operating Kubernetes in SKT T-deal and metaverse platforms.',
      coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
      published: true,
      featured: false,
      viewCount: 723,
      likeCount: 67,
      createdAt: '2024-01-05T09:00:00Z',
      updatedAt: '2024-01-05T09:00:00Z',
      publishedAt: '2024-01-05T09:00:00Z',
      authorId: 'static-author',
      author: { id: 'static-author', name: '박상준', username: 'david-devsecops' },
      categoryId: 'kubernetes',
      category: { id: 'kubernetes', name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5' },
      tags: [{ id: 'k8s-1', name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5' }],
      content: `# 프로덕션 Kubernetes 클러스터 운영 가이드

SKT T-deal, 메타버스 플랫폼 등에서 Kubernetes를 운영하며 얻은 실전 경험과 모니터링, 로깅 전략을 소개합니다.

## 프로덕션 운영 경험

### SKT T-deal (2022)
- **규모**: 3-master, 20-worker 클러스터
- **워크로드**: 마이크로서비스 50+
- **트래픽**: 일 100만 요청

### 메타버스 플랫폼 (2023)
- **규모**: Multi-cluster (5개 리전)
- **워크로드**: 실시간 게임 서버
- **특징**: Auto-scaling, GPU 워크로드

## 운영 전략

### 1. 클러스터 설계

**고가용성 구성**
- Master node: 3대 (홀수 권장)
- etcd: 별도 클러스터 구성
- Load Balancer: HA Proxy + Keepalived

**네트워크 설계**
- CNI: Calico (네트워크 정책 지원)
- Service Mesh: Istio (트래픽 관리)
- Ingress: NGINX Ingress Controller

### 2. 모니터링

**메트릭 수집**
- Prometheus + Grafana
- Node Exporter, kube-state-metrics
- Custom metrics (비즈니스 KPI)

**로깅**
- ELK Stack (Elasticsearch + Logstash + Kibana)
- Fluent Bit (로그 수집)
- 구조화된 JSON 로그

### 3. 보안

**클러스터 보안**
- RBAC 세밀한 권한 관리
- Pod Security Policy
- Network Policy로 트래픽 제어

**이미지 보안**
- 프라이빗 레지스트리 사용
- 이미지 스캐닝 (Clair, Trivy)
- 최소 권한 컨테이너

## 운영 팁

### Resource Management
- Request/Limit 적절히 설정
- HPA (Horizontal Pod Autoscaler) 활용
- VPA (Vertical Pod Autoscaler) 검토

### 배포 전략
- Rolling Update (무중단 배포)
- Blue-Green 배포 (중요 서비스)
- Canary 배포 (점진적 롤아웃)

## 결론

Kubernetes는 복잡하지만 올바르게 운영하면 강력한 플랫폼입니다. 모니터링, 보안, 자동화를 통해 안정적인 프로덕션 환경을 구축할 수 있습니다.

---

*이 글은 SKT T-deal, 메타버스 플랫폼에서 Kubernetes를 운영한 실제 경험을 바탕으로 작성되었습니다.*`
    }
  }

  useEffect(() => {
    if (!slug) {
      setError('Invalid blog post URL')
      setLoading(false)
      return
    }
    
    fetchPost(slug)
  }, [slug, language])

  const fetchPost = async (postSlug: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // 1. API에서 포스트 조회 시도
      try {
        const apiPost = await blogApi.getPost(postSlug)
        setPost(apiPost)
        
        // 조회수 증가 (백그라운드에서 실행)
        try {
          // await blogApi.incrementView(apiPost.id)
        } catch (viewError) {
          console.warn('Failed to increment view count:', viewError)
        }
        
        return
      } catch (apiError) {
        console.warn('API not available, trying static data:', apiError)
      }
      
      // 2. 정적 데이터에서 조회
      const staticPost = staticPosts[postSlug]
      if (staticPost) {
        setPost(staticPost)
        return
      }
      
      // 3. 로컬 스토리지에서 조회 (임시 저장된 포스트)
      const tempPosts = JSON.parse(localStorage.getItem('tempBlogPosts') || '[]')
      const tempPost = tempPosts.find((p: BlogPostType) => p.slug === postSlug)
      if (tempPost) {
        setPost(tempPost)
        return
      }
      
      // 4. 포스트를 찾을 수 없음
      setError('Post not found')
    } catch (error) {
      console.error('Failed to fetch post:', error)
      setError('Failed to load post')
      toast.error(language === 'ko' ? '포스트를 불러오는데 실패했습니다.' : 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return language === 'ko' 
        ? format(date, 'yyyy년 M월 d일')
        : format(date, 'MMMM d, yyyy')
    } catch {
      return dateString
    }
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = language === 'ko' ? 200 : 250
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return language === 'ko' ? `${readTime}분 읽기` : `${readTime} min read`
  }

  // const handleBack = () => {
  //   navigate('/blog')
  // } // Currently unused

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
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

  if (error || !post) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="py-16">
            <div className="text-gray-400 text-6xl mb-6">📄</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'ko' ? '포스트를 찾을 수 없습니다' : 'Post Not Found'}
            </h1>
            <p className="text-gray-600 mb-8">
              {language === 'ko' 
                ? '요청한 블로그 포스트가 존재하지 않거나 삭제되었습니다.'
                : 'The requested blog post does not exist or has been deleted.'
              }
            </p>
            <Link 
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {language === 'ko' ? '블로그 목록으로' : 'Back to Blog'}
            </Link>
          </div>
        </div>
      </div>
    )
    }
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      {/* Hero 섹션 */}
      <div className="relative">
        {post.coverImage && (
          <div className="w-full h-64 md:h-96 relative mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}
        
        {/* 포스트 헤더 */}
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${post.coverImage ? '-mt-32 relative z-10' : 'pt-8'}`}>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            {/* 카테고리 및 메타 정보 */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              {post.category && (
                <span 
                  className="px-3 py-1 text-xs font-medium rounded-full text-white"
                  style={{ backgroundColor: post.category.color || '#6B7280' }}
                >
                  {post.category.name}
                </span>
              )}
              <span className="text-gray-500">
                {calculateReadTime(post.content)}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">
                {post.viewCount.toLocaleString()} {language === 'ko' ? '조회' : 'views'}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
            </div>
            
            {/* 제목 */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            {/* 요약 */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {post.author.name?.charAt(0) || post.author.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {post.author.name || post.author.username}
                  </div>
                  <div className="text-sm text-gray-500">
                    {language === 'ko' ? 'DevSecOps 엔지니어' : 'DevSecOps Engineer'}
                  </div>
                </div>
              </div>
              
              {/* 좋아요 및 공유 */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-red-500 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  {post.likeCount}
                </button>
                
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 본문 내용 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-6 text-gray-900 first:mt-0">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>,
                p: ({children}) => <p className="mb-4 leading-7 text-gray-700">{children}</p>,
                ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>,
                li: ({children}) => <li className="ml-4">{children}</li>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600">{children}</blockquote>,
                code: ({children}) => <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm">{children}</code>,
                pre: ({children}) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">{children}</pre>,
                strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                em: ({children}) => <em className="italic text-gray-600">{children}</em>,
                a: ({href, children}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                img: ({src, alt}) => <img src={src} alt={alt} className="rounded-lg shadow-md my-6" />,
                hr: () => <hr className="my-8 border-gray-200" />
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
          
          {/* 태그 */}
          {post.tags.length > 0 && (
            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  {language === 'ko' ? '태그:' : 'Tags:'}
                </span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/blog?tag=${tag.slug}`}
                    className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* 네비게이션 */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/blog"
            className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {language === 'ko' ? '블로그 목록으로' : 'Back to Blog'}
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to={`/blog/edit/${post.id}`}
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {language === 'ko' ? '수정' : 'Edit'}
            </Link>
          </div>
        </div>
        
        {/* 관련 포스트 (향후 구현) */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'ko' ? '관련 포스트' : 'Related Posts'}
          </h3>
          <p className="text-gray-500 text-center py-8">
            {language === 'ko' ? '관련 포스트 기능은 향후 구현 예정입니다.' : 'Related posts feature coming soon.'}
          </p>
        </div>
      </div>
    </div>
  )

}

export default BlogPost