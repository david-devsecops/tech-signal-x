import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const PORT = process.env.PORT || 3001

// Railway DATABASE_PUBLIC_URL 변환
if (!process.env.DATABASE_URL && process.env.DATABASE_PUBLIC_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_PUBLIC_URL
}

// Prisma 클라이언트 초기화
let prisma = null
try {
  if (process.env.DATABASE_URL) {
    prisma = new PrismaClient()
    console.log('✅ Prisma initialized')
  }
} catch (error) {
  console.error('❌ Prisma error:', error.message)
}

// CORS 설정
app.use(cors({
  origin: '*',
  credentials: false
}))
app.use(express.json())

// 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// 모든 라우트를 직접 정의
app.all('*', async (req, res) => {
  console.log(`Handling: ${req.method} ${req.path}`)
  
  if (req.path === '/health') {
    return res.json({ status: 'OK', timestamp: new Date().toISOString() })
  }
  
  if (req.path === '/debug/env') {
    return res.json({
      NODE_ENV: process.env.NODE_ENV || 'not set',
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      DATABASE_PUBLIC_URL: process.env.DATABASE_PUBLIC_URL ? 'SET' : 'NOT SET',
      PORT: process.env.PORT || 'not set',
      PRISMA: prisma ? 'INITIALIZED' : 'NOT_INITIALIZED'
    })
  }
  
  if (req.path === '/api/blog/test') {
    return res.json({
      success: true,
      message: 'Blog API working',
      timestamp: new Date().toISOString()
    })
  }
  
  if (req.path === '/api/blog/posts') {
    if (!prisma) {
      return res.json({
        success: false,
        error: 'Database not available'
      })
    }
    
    try {
      const posts = await prisma.blogPost.findMany({
        where: { published: true },
        include: {
          author: {
            select: { id: true, username: true, name: true }
          },
          category: {
            select: { id: true, name: true, slug: true, color: true }
          },
          tags: {
            include: {
              tag: {
                select: { id: true, name: true, slug: true, color: true }
              }
            }
          }
        },
        orderBy: [
          { publishedAt: 'desc' },
          { createdAt: 'desc' }
        ]
      })
      
      const postsWithTags = posts.map(post => ({
        ...post,
        tags: post.tags.map(pt => pt.tag)
      }))
      
      return res.json({
        success: true,
        data: {
          posts: postsWithTags,
          pagination: {
            page: 1,
            limit: 10,
            total: posts.length,
            totalPages: 1
          }
        }
      })
    } catch (error) {
      console.error('Database error:', error)
      return res.status(500).json({
        success: false,
        error: 'Database query failed'
      })
    }
  }
  
  // 404 for all other routes
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  })
})

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Minimal server running on port ${PORT}`)
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`)
  console.log(`💾 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not connected'}`)
})