import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// uploads 디렉토리 생성
const uploadsDir = path.join(__dirname, '../../uploads')
const createUploadsDir = async () => {
  try {
    await fs.access(uploadsDir)
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true })
  }
}

// 초기화 시 디렉토리 생성
createUploadsDir()

// 파일 필터
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif'
  ]
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'), false)
  }
}

// Multer 설정
const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 제한
    files: 1 // 한 번에 하나의 파일만
  }
})

// 이미지 처리 미들웨어
export const processImage = async (req, res, next) => {
  if (!req.file) {
    return next()
  }

  try {
    const { buffer, mimetype } = req.file
    
    // 파일명 생성 (타임스탬프 + 랜덤 문자열)
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = mimetype.split('/')[1] === 'jpeg' ? 'jpg' : mimetype.split('/')[1]
    const filename = `${timestamp}-${randomString}.${extension}`
    const filepath = path.join(uploadsDir, filename)

    // 이미지 최적화 및 저장
    let sharpInstance = sharp(buffer)
    
    // 메타데이터 조회
    const metadata = await sharpInstance.metadata()
    
    // 큰 이미지는 리사이징 (최대 1920px)
    if (metadata.width > 1920) {
      sharpInstance = sharpInstance.resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
    }
    
    // 품질 최적화
    if (extension === 'jpg' || extension === 'jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: 85, mozjpeg: true })
    } else if (extension === 'png') {
      sharpInstance = sharpInstance.png({ quality: 85, compressionLevel: 6 })
    } else if (extension === 'webp') {
      sharpInstance = sharpInstance.webp({ quality: 85 })
    }
    
    // 파일 저장
    await sharpInstance.toFile(filepath)
    
    // 요청 객체에 처리된 파일 정보 추가
    req.processedFile = {
      filename,
      filepath,
      originalname: req.file.originalname,
      mimetype,
      size: (await fs.stat(filepath)).size,
      url: `/uploads/${filename}` // 클라이언트에서 접근할 URL
    }
    
    next()
  } catch (error) {
    console.error('Image processing error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to process image'
    })
  }
}

// 업로드된 파일 정적 서빙을 위한 미들웨어 설정 헬퍼
export const serveUploads = (app) => {
  app.use('/uploads', express.static(uploadsDir))
}