# 🚀 Railway 배포 완전 가이드

## 📋 배포 준비 완료 상태

### ✅ 백엔드 배포 준비 완료
- PostgreSQL 데이터베이스 마이그레이션 완료
- Railway용 설정 파일 (`nixpacks.toml`, `Procfile`) 생성
- 환경변수 설정 파일 (`.env.production`) 준비
- package.json 스크립트 최적화

### ✅ 프론트엔드 배포 준비 완료  
- API URL 환경변수화 (`VITE_API_URL`)
- Railway용 start 스크립트 설정
- 환경변수 파일 (`.env.production`, `.env.local`) 준비
- 빌드 설정 최적화

## 🎯 Railway 배포 단계

### 1단계: Railway 백엔드 서비스 생성

**Railway Dashboard에서:**
1. **New Project** 클릭
2. **Deploy from GitHub repo** 선택
3. 이 저장소 선택
4. **Add variables** → **backend** 폴더 선택

**환경변수 설정:**
```bash
# 필수 환경변수
DATABASE_URL=postgresql://postgres:fTZQzbawxHnESAYJFMKdQNxYUYBPkNgA@mainline.proxy.rlwy.net:23039/railway
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
PORT=3001

# FRONTEND_URL은 프론트엔드 배포 후 설정
FRONTEND_URL=https://your-frontend.railway.app

# 파일 업로드 설정
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp,gif
```

### 2단계: Railway 프론트엔드 서비스 생성

**Railway Dashboard에서:**
1. **Add Service** → **Deploy from GitHub repo**  
2. **Root directory** 선택 (backend 아님)
3. **Add variables**

**환경변수 설정:**
```bash
# 백엔드 배포 후 URL 설정
VITE_API_URL=https://your-backend.railway.app/api
```

### 3단계: 도메인 설정

**백엔드 서비스:**
1. **Settings** → **Domains**
2. **Generate Domain** 또는 **Custom Domain** 설정
3. 생성된 URL: `https://your-backend.railway.app`

**프론트엔드 서비스:**
1. **Settings** → **Domains** 
2. **Generate Domain** 또는 **Custom Domain** 설정
3. 생성된 URL: `https://your-frontend.railway.app`

### 4단계: 환경변수 업데이트

**백엔드 서비스 환경변수 업데이트:**
```bash
FRONTEND_URL=https://your-frontend.railway.app
```

**프론트엔드 서비스 환경변수 업데이트:**
```bash  
VITE_API_URL=https://your-backend.railway.app/api
```

## 🔧 로컬 개발 설정

### 백엔드 (Railway PostgreSQL 사용)
```bash
cd backend
cp .env.railway .env
npm install
npm run dev  # 포트 3001
```

### 프론트엔드 (로컬 백엔드 연결)
```bash
npm install
npm run dev  # 포트 5174
```

## 🧪 배포 테스트 URL

배포 완료 후 테스트할 엔드포인트들:

### 백엔드 API 테스트
```bash
# Health check
https://your-backend.railway.app/health

# 블로그 포스트 목록 (4개 포스트 확인)
https://your-backend.railway.app/api/posts

# 카테고리 목록
https://your-backend.railway.app/api/categories

# 태그 목록
https://your-backend.railway.app/api/tags
```

### 프론트엔드 테스트
```bash
# 메인 페이지
https://your-frontend.railway.app

# 블로그 목록
https://your-frontend.railway.app/blog

# 글 작성 페이지 (Header에서 Blog 버튼 클릭 후 "새 글 작성")
https://your-frontend.railway.app/blog/write
```

## 📊 현재 데이터베이스 상태

### Railway PostgreSQL에 저장된 데이터
- **👤 사용자**: 1명 (Test User - EDITOR 권한)
- **📁 카테고리**: 2개 (Technology, Programming)
- **🏷️ 태그**: 3개 (React, JavaScript, Tutorial) 
- **📝 블로그 포스트**: 4개 (모두 발행됨)

### 테스트 포스트 목록
1. "My First Blog Post"
2. "React 18의 새로운 기능들" 
3. "Next.js 14 App Router 완전 정복"
4. "2024 웹 개발 트렌드"

## 🚨 배포 시 주의사항

### 필수 확인사항
1. ✅ DATABASE_URL이 올바르게 설정되었는지 확인
2. ✅ JWT_SECRET이 프로덕션용으로 변경되었는지 확인
3. ✅ FRONTEND_URL과 VITE_API_URL이 서로 연결되었는지 확인
4. ✅ 포트 설정이 Railway 환경변수와 일치하는지 확인

### 배포 순서
1. **백엔드 먼저 배포** → URL 확보
2. **프론트엔드 배포** → 백엔드 URL 설정  
3. **환경변수 상호 업데이트**
4. **재배포** → 설정 적용

## 🎉 성공 확인 방법

배포가 성공적으로 완료되었다면:

1. **백엔드**: `/health` 엔드포인트에서 "OK" 응답
2. **API**: `/api/posts`에서 4개 포스트 조회
3. **프론트엔드**: 블로그 페이지에서 포스트 목록 표시
4. **글 작성**: Header → Blog → "새 글 작성" 버튼으로 에디터 접근

## 🔄 롤백 계획

문제 발생 시:
1. **백엔드 롤백**: Railway Dashboard에서 이전 배포로 복원
2. **데이터베이스**: SQLite 백업에서 재마이그레이션
3. **프론트엔드**: 로컬 개발 환경으로 복원

---

**🚀 배포 준비가 모두 완료되었습니다!**  
**이제 Railway Dashboard에서 위 가이드를 따라 배포를 진행하시면 됩니다!** 🎉