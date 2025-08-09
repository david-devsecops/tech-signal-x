import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { authenticateToken, requireRole } from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username too long').regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  name: z.string().min(1, 'Name is required').max(50, 'Name too long').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password too long'),
  bio: z.string().max(500, 'Bio too long').optional()
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

const updateProfileSchema = z.object({
  name: z.string().max(50, 'Name too long').optional(),
  bio: z.string().max(500, 'Bio too long').optional()
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters').max(100, 'Password too long')
})

// JWT 토큰 생성
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

// POST /api/user/register - 사용자 회원가입
router.post('/register', async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body)
    
    // 이메일 중복 확인
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username }
        ]
      }
    })
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: existingUser.email === validatedData.email 
          ? 'Email already registered' 
          : 'Username already taken'
      })
    }
    
    // 비밀번호 해시
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds)
    
    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        name: validatedData.name || validatedData.username,
        password: hashedPassword,
        bio: validatedData.bio,
        role: 'USER', // 기본 역할
        emailVerified: true // 개발 편의를 위해 기본적으로 true로 설정
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        emailVerified: true,
        createdAt: true
      }
    })
    
    // JWT 토큰 생성
    const token = generateToken(user.id)
    
    res.status(201).json({
      success: true,
      data: {
        user,
        token
      },
      message: 'User registered successfully'
    })
  } catch (error) {
    console.error('Register error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid registration data',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to register user'
    })
  }
})

// POST /api/user/login - 사용자 로그인
router.post('/login', async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body)
    
    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        emailVerified: true,
        password: true,
        createdAt: true
      }
    })
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      })
    }
    
    // 비밀번호 확인
    const validPassword = await bcrypt.compare(validatedData.password, user.password)
    
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      })
    }
    
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        error: 'Email verification required'
      })
    }
    
    // JWT 토큰 생성
    const token = generateToken(user.id)
    
    // 비밀번호 제거
    const { password, ...userWithoutPassword } = user
    
    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid login data',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to login'
    })
  }
})

// GET /api/user/profile - 현재 사용자 프로필 조회
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: {
              where: { published: true }
            }
          }
        }
      }
    })
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    })
  }
})

// PUT /api/user/profile - 사용자 프로필 수정
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const validatedData = updateProfileSchema.parse(req.body)
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...validatedData,
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    res.json({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    })
  } catch (error) {
    console.error('Update profile error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid profile data',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    })
  }
})

// POST /api/user/change-password - 비밀번호 변경
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const validatedData = changePasswordSchema.parse(req.body)
    
    // 현재 사용자 조회
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { password: true }
    })
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    
    // 현재 비밀번호 확인
    const validPassword = await bcrypt.compare(validatedData.currentPassword, user.password)
    
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      })
    }
    
    // 새 비밀번호 해시
    const saltRounds = 12
    const hashedNewPassword = await bcrypt.hash(validatedData.newPassword, saltRounds)
    
    // 비밀번호 업데이트
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        password: hashedNewPassword,
        updatedAt: new Date()
      }
    })
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    console.error('Change password error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid password data',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to change password'
    })
  }
})

// GET /api/user/posts - 현재 사용자의 포스트 목록
router.get('/posts', authenticateToken, async (req, res) => {
  try {
    const { published } = req.query
    
    const whereConditions = {
      authorId: req.user.id
    }
    
    if (published !== undefined) {
      whereConditions.published = published === 'true'
    }
    
    const posts = await prisma.blogPost.findMany({
      where: whereConditions,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true
          }
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
                color: true
              }
            }
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      orderBy: [
        { updatedAt: 'desc' }
      ]
    })
    
    const postsWithTags = posts.map(post => ({
      ...post,
      tags: post.tags.map(pt => pt.tag)
    }))
    
    res.json({
      success: true,
      data: postsWithTags
    })
  } catch (error) {
    console.error('Get user posts error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts'
    })
  }
})

// GET /api/user/stats - 사용자 통계
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const [totalPosts, publishedPosts, totalViews, totalLikes] = await Promise.all([
      prisma.blogPost.count({
        where: { authorId: req.user.id }
      }),
      prisma.blogPost.count({
        where: { authorId: req.user.id, published: true }
      }),
      prisma.blogPost.aggregate({
        where: { authorId: req.user.id, published: true },
        _sum: { viewCount: true }
      }),
      prisma.blogPost.aggregate({
        where: { authorId: req.user.id, published: true },
        _sum: { likeCount: true }
      })
    ])
    
    const stats = {
      totalPosts,
      publishedPosts,
      draftPosts: totalPosts - publishedPosts,
      totalViews: totalViews._sum.viewCount || 0,
      totalLikes: totalLikes._sum.likeCount || 0
    }
    
    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Get user stats error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    })
  }
})

export default router