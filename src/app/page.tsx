export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">
          Tech Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Vercel 데이터베이스와 연결된 현대적인 기술 블로그
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h2 className="text-lg font-semibold">✅ Next.js 설정 완료</h2>
            <p>App Router와 TypeScript로 구성</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h2 className="text-lg font-semibold">🚀 Vercel 배포 준비</h2>
            <p>GitHub 연결 및 자동 배포 설정 가능</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h2 className="text-lg font-semibold">🗄️ 데이터베이스 연결 대기</h2>
            <p>Vercel Postgres 연결 설정 예정</p>
          </div>
        </div>
      </div>
    </main>
  )
}