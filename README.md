# Tech Blog

Vercel Postgres 데이터베이스와 연결된 현대적인 기술 블로그

## 기능

- ✅ Next.js 14 App Router
- ✅ TypeScript 지원
- ✅ Vercel Postgres 데이터베이스 연결
- ✅ REST API 엔드포인트
- ✅ 자동 배포 설정

## 배포 가이드

### 1. GitHub 리포지토리 생성 및 푸시

```bash
# 현재 디렉토리에서 실행
git add .
git commit -m "Initial commit: Next.js blog with Vercel Postgres integration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tech-blog.git
git push -u origin main
```

### 2. Vercel에서 프로젝트 배포

1. [Vercel 대시보드](https://vercel.com/dashboard)에 접속
2. "New Project" 클릭
3. GitHub에서 tech-blog 리포지토리 선택
4. 프로젝트 설정은 기본값 사용 (자동으로 Next.js 감지)
5. "Deploy" 클릭

### 3. Vercel Postgres 데이터베이스 추가

1. 배포된 프로젝트에서 "Storage" 탭 이동
2. "Create Database" 클릭
3. "Postgres" 선택
4. 데이터베이스 이름 입력 (예: tech-blog-db)
5. "Create" 클릭

### 4. 환경 변수 자동 설정 확인

Vercel이 자동으로 다음 환경 변수들을 설정합니다:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### 5. 데이터베이스 테스트

배포 후 다음 엔드포인트에서 데이터베이스 연결을 테스트할 수 있습니다:
- `https://your-project.vercel.app/api/test-db` - 데이터베이스 연결 테스트 및 테이블 생성

## API 엔드포인트

- `GET /api/test-db` - 데이터베이스 연결 테스트
- `GET /api/posts` - 모든 포스트 조회
- `POST /api/posts` - 새 포스트 생성

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

로컬에서 개발할 때는 `.env.local` 파일을 생성하고 Vercel 대시보드에서 환경 변수를 복사해야 합니다.

## 주요 파일 구조

```
src/
├── app/
│   ├── api/
│   │   ├── test-db/
│   │   └── posts/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
└── lib/
    └── db.ts
```