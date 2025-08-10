interface BlogProps {
  onBlogClick?: (blogId: string) => void
}

const Blog = ({ onBlogClick }: BlogProps) => {
  const blogPosts = [
    {
      id: 'aws-migration-strategy',
      title: 'On-Premise에서 AWS로의 대규모 마이그레이션 전략',
      excerpt: '아모레퍼시픽 프로젝트를 통해 배운 대규모 엔터프라이즈의 AWS 마이그레이션 경험과 전략을 공유합니다.',
      date: '2024년 1월 15일',
      readTime: '12분 읽기',
      category: 'AWS',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop'
    },
    {
      id: 'oracle-zdlra-architecture',
      title: 'Oracle ZDLRA 구축과 운영 노하우',
      excerpt: '국민연금, KB카드 등 대형 금융기관에서 Oracle Zero Data Loss Recovery Appliance를 구축하고 운영한 경험을 나눅니다.',
      date: '2024년 1월 10일',
      readTime: '15분 읽기',
      category: 'Oracle',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop'
    },
    {
      id: 'kubernetes-production-guide',
      title: '프로덕션 Kubernetes 클러스터 운영 가이드',
      excerpt: 'SKT T-deal, 메타버스 플랫폼 등에서 Kubernetes를 운영하며 얻은 실전 경험과 모니터링, 로깅 전략을 소개합니다.',
      date: '2024년 1월 5일',
      readTime: '10분 읽기',
      category: 'Kubernetes',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=200&fit=crop'
    },
    {
      id: 'multi-cloud-architecture',
      title: '멀티클라우드 아키텍처 설계 전략',
      excerpt: 'AWS, GCP, Azure를 활용한 멀틴클라우드 환경 구축 경험과 각 클라우드의 장단점, 비용 최적화 방안을 제시합니다.',
      date: '2023년 12월 28일',
      readTime: '8분 읽기',
      category: 'Cloud',
      image: 'https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=400&h=200&fit=crop'
    },
    {
      id: 'terraform-iac-best-practices',
      title: 'Terraform으로 구현하는 Infrastructure as Code',
      excerpt: 'SKT T-deal 인프라 구축에서 Terraform을 활용한 IaC 구현 경험과 모듈화, 상태 관리, 보안 베스트 프랙티스를 소개합니다.',
      date: '2023년 12월 20일',
      readTime: '11분 읽기',
      category: 'DevOps',
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=200&fit=crop'
    },
    {
      id: 'unix-system-administration',
      title: 'Unix/Linux 시스템 관리 노하우 12년의 기록',
      excerpt: 'Solaris, AIX, Linux 환경에서 12년간 시스템 엔지니어로 활동하며 쌓은 트러블슈팅, 성능 튜닝, 보안 강화 경험을 정리했습니다.',
      date: '2023년 12월 15일',
      readTime: '14분 읽기',
      category: 'Unix/Linux',
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=200&fit=crop'
    }
  ]

  const categories = ['전체', 'AWS', 'Oracle', 'Kubernetes', 'Cloud', 'DevOps', 'Unix/Linux']

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Tech Blog</h2>
          <p className="text-lg text-gray-600">
            개발하면서 배운 지식과 경험을 공유합니다
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index} 
              className="card group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onBlogClick && onBlogClick(post.id)}
            >
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.date}</span>
                <span 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={(e) => {
                    e.stopPropagation()
                    onBlogClick?.(post.id)
                  }}
                >
                  더 읽기
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
            모든 포스트 보기
          </button>
        </div>
      </div>
    </section>
  )
}

export default Blog