# Railway 환경변수 설정 가이드

## 백엔드 서비스 환경변수 설정

Railway Dashboard → tech-signal-x (백엔드) → Variables 탭에서 다음 환경변수를 추가해야 합니다:

### 필수 환경변수

```
DATABASE_URL=postgresql://postgres:fTZQzbawxHnESAYJFMKdQNxYUYBPkNgA@postgres.railway.internal:5432/railway
JWT_SECRET=your-super-secret-jwt-key-railway-production
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tech-portfolio-blog.railway.app
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp,gif
```

### 중요 사항

1. **DATABASE_URL**: 반드시 `postgres.railway.internal:5432` (internal hostname) 사용
2. **PORT**: Railway가 자동으로 할당하지만 명시적으로 3001 설정
3. **FRONTEND_URL**: 프론트엔드 Railway 도메인으로 설정

### 현재 문제점

백엔드 서비스에 DATABASE_URL 환경변수가 전혀 설정되지 않아 있음. 이로 인해:
- 데이터베이스 연결 실패
- API 엔드포인트 404 오류
- 블로그 포스트 로딩/저장 불가

### 해결 방법

1. Railway Dashboard에서 백엔드 서비스 선택
2. Variables 탭 이동
3. 위의 환경변수들을 모두 추가
4. 서비스 재배포 대기

생성일: 2025-08-09 20:17 KST