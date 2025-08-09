# Railway PostgreSQL 배포 가이드

## 🎯 추천: PostgreSQL

**PostgreSQL을 추천하는 이유:**
- Railway 무료 티어에서 512MB 제공
- JSON 필드 지원 (블로그 메타데이터에 유리)
- 풀텍스트 검색 내장 (블로그 검색 기능)
- Prisma와 완벽 호환
- 확장성이 뛰어남

## 🚀 단계별 배포 과정

### 1단계: Railway에서 PostgreSQL 추가

```bash
# Railway CLI 설치
npm install -g @railway/cli

# 프로젝트 로그인
railway login

# 현재 프로젝트에 PostgreSQL 추가
railway add postgresql
```

또는 Railway Dashboard에서:
1. 프로젝트 선택
2. "Add Service" → "Database" → "PostgreSQL"

### 2단계: 환경변수 설정

Railway Dashboard → PostgreSQL 서비스 → Variables에서 확인:

```bash
# 자동 생성되는 변수들
DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
PGDATABASE=railway
PGHOST=containers-us-west-xxx.railway.app
PGPASSWORD=xxxxxxxxxxxxx
PGPORT=5432
PGUSER=postgres
```

**백엔드 서비스에 추가할 환경변수:**
```bash
# JWT 설정
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-railway-version

# 서버 설정  
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.railway.app

# 파일 업로드
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp,gif
```

### 3단계: Prisma 스키마 업데이트

```bash
# 기존 schema.prisma를 백업
cp backend/prisma/schema.prisma backend/prisma/schema.sqlite.prisma

# PostgreSQL 스키마로 교체
cp backend/prisma/schema.postgresql.prisma backend/prisma/schema.prisma
```

### 4단계: 데이터 마이그레이션

**로컬에서 데이터 이전:**

```bash
cd backend

# Railway DATABASE_URL 환경변수 설정
export DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"

# PostgreSQL 스키마 적용
npx prisma migrate dev --name init

# 데이터 마이그레이션 실행
node migrate-to-postgresql.js
```

### 5단계: Railway 배포

```bash
# 백엔드 배포
cd backend
railway up

# 프론트엔드 배포 (별도 서비스)
cd ../
railway up
```

## 📊 제공해야 할 정보

Railway에서 PostgreSQL 생성 후 다음 정보를 제공해주세요:

### 필수 연결 정보:
```bash
DATABASE_URL=postgresql://username:password@host:port/database
```

또는 개별 정보:
```bash
PGHOST=containers-us-west-xxx.railway.app
PGPORT=5432  
PGUSER=postgres
PGPASSWORD=your-generated-password
PGDATABASE=railway
```

### 환경변수 설정:
```bash
# Railway Dashboard → Backend Service → Variables에서 설정
JWT_SECRET=your-jwt-secret-for-production
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.railway.app
DATABASE_URL=postgresql://postgres:password@host:port/railway
```

## 🔄 데이터 이전 과정

1. **현재 SQLite 데이터 확인**
   - 사용자 데이터
   - 블로그 포스트 (4개)
   - 카테고리 (Technology, Programming)
   - 태그 (React, JavaScript, Tutorial)

2. **PostgreSQL 스키마 생성**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **데이터 마이그레이션 실행**
   ```bash
   node migrate-to-postgresql.js
   ```

## 🛠️ 패키지 설정

**package.json에 스크립트 추가:**
```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js", 
    "build": "echo 'No build step needed for backend'",
    "migrate": "npx prisma migrate dev",
    "migrate:prod": "npx prisma migrate deploy",
    "seed": "node migrate-to-postgresql.js"
  }
}
```

## 🔍 확인사항

배포 후 확인할 사항들:

1. **API 엔드포인트 테스트**
   ```bash
   curl https://your-backend.railway.app/health
   curl https://your-backend.railway.app/api/posts
   ```

2. **데이터베이스 연결 확인**
   ```bash
   # Railway 대시보드에서 PostgreSQL 로그 확인
   ```

3. **CORS 설정 확인**
   - 프론트엔드 도메인이 FRONTEND_URL에 올바르게 설정되었는지 확인

## 📞 필요한 정보 요약

Railway에서 다음 정보만 제공해주시면 마이그레이션을 도와드릴 수 있습니다:

1. **PostgreSQL 연결 URL**
   ```
   postgresql://postgres:password@host:port/database
   ```

2. **Railway 프로젝트 이름/URL** (선택사항)

3. **프론트엔드 도메인** (CORS 설정용)
   ```
   https://your-frontend.railway.app
   ```

이 정보만 있으면 모든 데이터를 안전하게 PostgreSQL로 이전할 수 있습니다! 🚀