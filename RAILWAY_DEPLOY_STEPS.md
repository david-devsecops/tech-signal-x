# 🚀 Railway 즉시 배포 가이드

현재 상태: **배포 준비 완료** ✅  
빌드 상태: **성공** ✅  
설정 파일: **모두 준비됨** ✅

## 📋 배포 순서

### 1단계: Railway 백엔드 배포 (3분 소요)

1. **Railway 대시보드 접속**: https://railway.app/dashboard
2. **새 프로젝트 생성**: 
   - "New Project" 클릭
   - "Deploy from GitHub repo" 선택
   - 이 저장소 선택
3. **백엔드 서비스 설정**:
   - **Root Directory**: `backend` 입력 ⚠️ 중요!
   - "Add Service" 클릭

#### 백엔드 환경변수 설정 (Variables 탭):
```
DATABASE_URL=postgresql://postgres:fTZQzbawxHnESAYJFMKdQNxYUYBPkNgA@mainline.proxy.rlwy.net:23039/railway
JWT_SECRET=super-secret-jwt-key-change-in-production-2024
NODE_ENV=production  
PORT=3001
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp,gif
```

4. **백엔드 도메인 생성**:
   - "Settings" → "Domains" → "Generate Domain"
   - 생성된 URL 복사 (예: `https://your-backend-xxx.railway.app`)

### 2단계: Railway 프론트엔드 배포 (2분 소요)

1. **프론트엔드 서비스 추가**:
   - 같은 프로젝트에서 "Add Service" 클릭
   - "Deploy from GitHub repo" 선택
   - 이 저장소 선택
   - **Root Directory**: 비워둠 (루트 폴더)

#### 프론트엔드 환경변수 설정 (Variables 탭):
```
VITE_API_URL=https://your-backend-xxx.railway.app/api
```
⚠️ `your-backend-xxx` 부분을 1단계에서 생성한 실제 백엔드 URL로 교체

2. **프론트엔드 도메인 생성**:
   - "Settings" → "Domains" → "Generate Domain"
   - 생성된 URL 복사 (예: `https://your-frontend-yyy.railway.app`)

### 3단계: 환경변수 상호 연결 (1분 소요)

1. **백엔드 환경변수 업데이트**:
   - 백엔드 서비스 → Variables 탭
   - 다음 환경변수 추가:
   ```
   FRONTEND_URL=https://your-frontend-yyy.railway.app
   ```

### 4단계: 배포 테스트 (2분 소요)

1. **백엔드 API 테스트**:
   ```
   https://your-backend-xxx.railway.app/health
   https://your-backend-xxx.railway.app/api/posts  
   https://your-backend-xxx.railway.app/api/categories
   ```

2. **프론트엔드 테스트**:
   ```
   https://your-frontend-yyy.railway.app
   https://your-frontend-yyy.railway.app/blog
   https://your-frontend-yyy.railway.app/blog/write
   ```

## 🎯 예상 배포 시간: **총 8분**

## 📊 배포 후 확인사항

✅ **백엔드**: `/health` 엔드포인트에서 "OK" 응답  
✅ **API**: `/api/posts`에서 4개 포스트 조회  
✅ **프론트엔드**: 블로그 목록 페이지 정상 표시  
✅ **글 작성**: "새 글 작성" 버튼으로 에디터 접근  

## 🔧 현재 데이터베이스 상태

- **사용자**: 1명 (Test User - EDITOR 권한)
- **카테고리**: 2개 (Technology, Programming)  
- **태그**: 3개 (React, JavaScript, Tutorial)
- **블로그 포스트**: 4개 (모두 발행됨)

## 🚨 문제 발생 시

1. **빌드 실패**: 로그에서 구체적 오류 확인
2. **환경변수 오류**: Variables 탭에서 오타 확인
3. **Database 연결 오류**: DATABASE_URL 정확성 확인
4. **CORS 오류**: FRONTEND_URL 설정 확인

## 🎉 배포 완료 후

배포가 성공하면:
- Header의 "Blog" 버튼 클릭 → 블로그 목록 표시
- "새 글 작성" 버튼 → 마크다운 에디터 
- API와 프론트엔드 정상 연동
- Railway PostgreSQL 데이터베이스 연결됨

---

**🚀 지금 Railway Dashboard로 이동해서 배포를 시작하세요!**  
https://railway.app/dashboard