#!/bin/bash
# Railway 환경변수 설정 스크립트

echo "Railway 환경변수 설정 중..."

# Railway에 로그인이 필요합니다
# railway login

# 백엔드 프로젝트로 연결
# railway connect

# 환경변수 설정
railway variables set DATABASE_URL=postgresql://postgres:fTZQzbawxHnESAYJFMKdQNxYUYBPkNgA@postgres.railway.internal:5432/railway
railway variables set JWT_SECRET=your-super-secret-jwt-key-railway-production
railway variables set JWT_EXPIRES_IN=7d
railway variables set NODE_ENV=production
railway variables set PORT=3001
railway variables set FRONTEND_URL=https://tech-portfolio-blog.railway.app
railway variables set UPLOAD_DIR=uploads
railway variables set MAX_FILE_SIZE=5242880
railway variables set ALLOWED_EXTENSIONS=jpg,jpeg,png,webp,gif

echo "환경변수 설정 완료!"