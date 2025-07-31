import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

interface BlogPostData {
  id: string
  title: string
  date: string
  readTime: string
  category: string
  image: string
  content: string
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPostData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 실제로는 API에서 데이터를 가져오겠지만, 여기서는 하드코딩된 데이터 사용
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

### 2. 네트워크 설계

\`\`\`
VPC 구성:
├── Production VPC (10.0.0.0/16)
│   ├── Public Subnet (DMZ)
│   ├── Private Subnet (Application)
│   └── Database Subnet (Isolated)
├── Staging VPC (10.1.0.0/16)
└── Development VPC (10.2.0.0/16)
\`\`\`

### 3. 보안 강화

- **네트워크 보안**: Security Groups, NACLs 설정
- **데이터 암호화**: EBS, S3, RDS 암호화 적용
- **접근 제어**: IAM 역할 기반 접근 제어 구현
- **모니터링**: CloudTrail, Config, GuardDuty 활성화

## 마이그레이션 단계

### Phase 1: 준비 및 계획 (2개월)
- 현재 인프라 분석 및 의존성 매핑
- AWS Well-Architected Review 수행
- 마이그레이션 순서 및 일정 수립

### Phase 2: 파일럿 마이그레이션 (1개월)
- 비중요 시스템부터 테스트 마이그레이션
- 성능 벤치마크 및 최적화
- 운영 프로세스 검증

### Phase 3: 단계적 마이그레이션 (6개월)
- 주차별 마이그레이션 실행
- 24/7 모니터링 및 장애 대응
- 성능 튜닝 및 비용 최적화

### Phase 4: 최적화 (1개월)
- Reserved Instances 구매
- CloudWatch 대시보드 구성
- 자동화 스크립트 배포

## 주요 성과

### 비용 절감
- **인프라 비용**: 30% 절감
- **운영 비용**: 40% 절감
- **전력 비용**: 100% 절감

### 성능 향상
- **응답 시간**: 평균 25% 개선
- **가용성**: 99.9% → 99.99% 향상
- **확장성**: Auto Scaling으로 트래픽 변화 대응

### 운영 효율성
- **배포 시간**: 4시간 → 30분 단축
- **백업 복구**: 수동 → 자동화
- **모니터링**: 실시간 알림 및 대시보드

## 교훈 및 베스트 프랙티스

### 1. 철저한 사전 준비
- 애플리케이션 의존성 분석이 가장 중요
- 네트워크 대역폭 충분히 확보
- 롤백 계획 필수

### 2. 단계적 접근
- Big Bang 방식보다 점진적 마이그레이션 권장
- 파일럿을 통한 검증 필수
- 주요 시스템은 마지막에 마이그레이션

### 3. 조직 변화 관리
- 팀 교육 및 AWS 인증 취득 지원
- 새로운 도구와 프로세스 도입
- 클라우드 네이티브 사고방식 전환

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

## 아키텍처 설계

### 네트워크 구성

\`\`\`
Production Database Servers
├── Primary Database (10Gb Network)
│   ├── Async Redo Transport → ZDLRA
│   └── Sync Redo Transport → Standby
└── Physical Standby Database
    └── Async Redo Transport → ZDLRA

ZDLRA Cluster
├── Node 1 (Active)
├── Node 2 (Standby)
└── Shared Storage (500TB+)
\`\`\`

### 백업 정책

**실시간 백업**
- Real-Time Redo Transport
- 15초 간격 증분 백업
- 압축률: 2-4배

**보존 정책**
- 일간 백업: 30일
- 주간 백업: 12주
- 월간 백업: 12개월
- 연간 백업: 7년

## 운영 노하우

### 1. 모니터링

**핵심 메트릭**
- Redo Transport Lag
- Backup Completion Rate
- Storage Utilization
- Network Throughput

**알림 설정**
\`\`\`sql
-- Redo Transport 지연 모니터링
SELECT client_name, lag_time
FROM ra_client
WHERE lag_time > INTERVAL '5' MINUTE;

-- 백업 실패 확인
SELECT * FROM ra_backup_job
WHERE status = 'FAILED'
AND start_time > SYSDATE - 1;
\`\`\`

### 2. 성능 튜닝

**네트워크 최적화**
- Dedicated 10Gb Network 구성
- ASYNC 모드로 운영 (LAG < 30초)
- Compression Level 조정 (MEDIUM)

**스토리지 최적화**
- ASM Disk Group 설계
- Flash Cache 활용
- 자동 공간 관리

### 3. 장애 대응

**일반적인 이슈**
1. **Redo Transport 중단**
   - 원인: 네트워크 단절, ZDLRA 디스크 부족
   - 해결: 네트워크 복구, 백업 정책 조정

2. **백업 실패**
   - 원인: 스토리지 부족, 성능 이슈
   - 해결: 백업 스케줄 조정, 하드웨어 증설

3. **복구 지연**
   - 원인: 네트워크 대역폭 부족
   - 해결: 전용 복구 네트워크 구성

## 복구 시나리오

### Point-in-Time Recovery

\`\`\`sql
-- 특정 시점으로 복구
RECOVER DATABASE UNTIL TIME '2024-01-10 14:30:00';

-- SCN 기준 복구
RECOVER DATABASE UNTIL CHANGE 2845678;

-- 로그 시퀀스 기준 복구
RECOVER DATABASE UNTIL LOGSEQ 1234 THREAD 1;
\`\`\`

### 전체 데이터베이스 복구

\`\`\`bash
# RMAN을 통한 전체 복구
rman target / catalog rman_user@zdlra

RESTORE DATABASE;
RECOVER DATABASE;
ALTER DATABASE OPEN RESETLOGS;
\`\`\`

## 비용 최적화

### 백업 정책 최적화
- **Incremental Forever**: Full Backup 최소화
- **Block Change Tracking**: 변경된 블록만 백업
- **Compression**: 네트워크 및 스토리지 절약

### 스토리지 관리
- **자동 삭제**: 보존 정책에 따른 자동 정리
- **중복 제거**: 동일 블록 중복 제거
- **압축**: 평균 3:1 압축률 달성

## 모범 사례

### 1. 용량 계획
- 일일 변경량의 15-20배 용량 확보
- 압축률 3:1 가정하여 계산
- 3년 단위 증설 계획 수립

### 2. 네트워크 설계
- 전용 백업 네트워크 구성
- 최소 10Gb 대역폭 확보
- 이중화 네트워크 권장

### 3. 보안 강화
- TLS 암호화 적용
- 관리자 계정 분리
- 감사 로그 유지

## 결론

ZDLRA는 Oracle Database의 궁극적인 백업 솔루션입니다. 초기 투자 비용은 높지만, Zero Data Loss 보장과 운영 효율성을 고려하면 충분한 가치가 있습니다.

특히 금융권과 같이 데이터 손실이 치명적인 환경에서는 필수적인 솔루션이라고 할 수 있습니다.

---

*이 글은 국민연금, KB카드, 수협은행 등에서 ZDLRA를 구축하고 운영한 실제 경험을 바탕으로 작성되었습니다.*
          `
        }
        // 다른 블로그 포스트들도 추가 가능
      }

      const foundPost = blogPosts[id || '']
      setPost(foundPost || null)
      setLoading(false)
    }

    fetchPost()
  }, [id])

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
          <Link to="/" className="btn-primary">
            홈으로 돌아가기
          </Link>
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
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            박상준.dev
          </Link>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ 
            __html: post.content
              .split('\n')
              .map(line => {
                if (line.startsWith('# ')) {
                  return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.substring(2)}</h1>`
                } else if (line.startsWith('## ')) {
                  return `<h2 class="text-2xl font-bold mt-6 mb-3">${line.substring(3)}</h2>`
                } else if (line.startsWith('### ')) {
                  return `<h3 class="text-xl font-bold mt-4 mb-2">${line.substring(4)}</h3>`
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return `<p class="font-bold mb-2">${line.substring(2, line.length - 2)}</p>`
                } else if (line.startsWith('- ')) {
                  return `<li class="mb-1">${line.substring(2)}</li>`
                } else if (line.startsWith('```')) {
                  return line.includes('```') && line !== '```' ? 
                    `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>${line.substring(3)}</code></pre>` :
                    line === '```' ? '' : `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>`
                } else if (line.trim() === '') {
                  return '<br>'
                } else {
                  return `<p class="mb-4">${line}</p>`
                }
              })
              .join('')
          }} 
          />
        </article>

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link 
            to="/#blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogPost