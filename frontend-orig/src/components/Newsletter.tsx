import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제로는 이메일 서비스와 연동
    setIsSubscribed(true)
    setEmail('')
  }

  const recentNewsletters = [
    {
      title: '2024년 1월 뉴스레터',
      date: '2024년 1월 20일',
      preview: '새해 목표, React 18 마이그레이션 경험, 추천 도구들을 소개합니다.',
      readers: '1,245'
    },
    {
      title: '2023년 12월 뉴스레터',
      date: '2023년 12월 20일',
      preview: '올해를 돌아보며, 내년 계획, 그리고 개발자로서의 성장에 대한 생각을 정리했습니다.',
      readers: '1,180'
    },
    {
      title: '2023년 11월 뉴스레터',
      date: '2023년 11월 20일',
      preview: 'TypeScript 5.0 업데이트, AWS re:Invent 후기, 팀 빌딩 경험담을 공유합니다.',
      readers: '1,056'
    }
  ]

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Newsletter</h2>
          <p className="text-lg text-gray-600">
            월간 기술 동향, 개발 팁, 그리고 개인적인 인사이트를 전해드립니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              구독하기
            </h3>
            <p className="text-gray-600 mb-6">
              매월 셋째 주에 발송되는 뉴스레터로 최신 기술 트렌드와 
              개발 경험을 공유받으세요.
            </p>

            {isSubscribed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800 font-medium">구독이 완료되었습니다!</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  환영 이메일을 확인해주세요.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 주소
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <button type="submit" className="w-full btn-primary">
                  구독하기
                </button>
                <p className="text-xs text-gray-500 text-center">
                  언제든지 구독을 해지할 수 있습니다. 개인정보는 안전하게 보호됩니다.
                </p>
              </form>
            )}

            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                월 1회 발송
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                스팸 없음
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              최근 뉴스레터
            </h3>
            <div className="space-y-6">
              {recentNewsletters.map((newsletter, index) => (
                <div key={index} className="card hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {newsletter.title}
                    </h4>
                    <span className="text-xs text-gray-500 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {newsletter.readers}명 구독
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {newsletter.preview}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {newsletter.date}
                    </span>
                    <span className="text-blue-600 text-sm font-medium hover:text-blue-800">
                      읽어보기 →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter