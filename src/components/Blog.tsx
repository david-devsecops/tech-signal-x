
const Blog = () => {
  const blogPosts = [
    {
      title: 'React 18의 새로운 기능들',
      excerpt: 'Concurrent Rendering, Automatic Batching, Suspense 등 React 18의 주요 업데이트를 살펴봅니다.',
      date: '2024년 1월 15일',
      readTime: '5분 읽기',
      category: 'React',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop'
    },
    {
      title: 'TypeScript로 더 안전한 코드 작성하기',
      excerpt: '타입스크립트의 고급 기능을 활용하여 런타임 에러를 줄이고 개발 생산성을 높이는 방법을 알아봅니다.',
      date: '2024년 1월 10일',
      readTime: '7분 읽기',
      category: 'TypeScript',
      image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=400&h=200&fit=crop'
    },
    {
      title: 'Node.js 성능 최적화 팁',
      excerpt: '메모리 사용량 줄이기, 비동기 처리 최적화, 캐싱 전략 등 Node.js 애플리케이션의 성능을 향상시키는 방법들을 정리했습니다.',
      date: '2024년 1월 5일',
      readTime: '8분 읽기',
      category: 'Node.js',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop'
    },
    {
      title: 'AWS로 서버리스 아키텍처 구축하기',
      excerpt: 'Lambda, API Gateway, DynamoDB를 활용한 완전한 서버리스 웹 애플리케이션 구축 과정을 단계별로 설명합니다.',
      date: '2023년 12월 28일',
      readTime: '10분 읽기',
      category: 'AWS',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop'
    },
    {
      title: 'Git 워크플로우 최적화',
      excerpt: '팀 개발에서 효율적인 Git 브랜칭 전략과 코드 리뷰 프로세스를 통해 협업 품질을 높이는 방법을 소개합니다.',
      date: '2023년 12월 20일',
      readTime: '6분 읽기',
      category: 'Git',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop'
    },
    {
      title: 'Docker로 개발 환경 표준화하기',
      excerpt: 'Docker와 Docker Compose를 활용하여 팀 전체가 동일한 개발 환경에서 작업할 수 있는 환경을 구축하는 방법을 알아봅니다.',
      date: '2023년 12월 15일',
      readTime: '9분 읽기',
      category: 'DevOps',
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=200&fit=crop'
    }
  ]

  const categories = ['전체', 'React', 'TypeScript', 'Node.js', 'AWS', 'Git', 'DevOps']

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
            <article key={index} className="card group hover:shadow-lg transition-shadow cursor-pointer">
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
                <span className="flex items-center text-blue-600">
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
          <a href="/blog" className="btn-primary">
            모든 포스트 보기
          </a>
        </div>
      </div>
    </section>
  )
}

export default Blog