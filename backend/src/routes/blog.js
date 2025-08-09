import express from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import slugify from 'slugify'
import { authenticateToken, optionalAuth, requireRole } from '../middleware/auth.js'
import { upload, processImage } from '../middleware/upload.js'

const router = express.Router()
const prisma = new PrismaClient()

// Validation schemas
const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional(),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  metaTitle: z.string().max(60, 'Meta title too long').optional(),
  metaDescription: z.string().max(160, 'Meta description too long').optional()
})

const updatePostSchema = createPostSchema.partial()

const querySchema = z.object({
  page: z.string().transform(val => parseInt(val, 10)).default('1'),
  limit: z.string().transform(val => Math.min(parseInt(val, 10), 50)).default('10'),
  category: z.string().optional(),
  published: z.string().transform(val => val === 'true').optional(),
  search: z.string().optional(),
  author: z.string().optional(),
  tag: z.string().optional()
})

// 슬러그 생성 함수
const generateSlug = (title) => {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: 'ko'
  })
}

// 고유한 슬러그 생성
const generateUniqueSlug = async (title, excludeId = null) => {
  let baseSlug = generateSlug(title)
  let slug = baseSlug
  let counter = 1
  
  while (true) {
    const existing = await prisma.blogPost.findFirst({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } })
      }
    })
    
    if (!existing) break
    
    slug = `${baseSlug}-${counter}`
    counter++
  }
  
  return slug
}

// GET /api/blog/posts - 블로그 포스트 목록 조회
router.get('/posts', optionalAuth, async (req, res) => {
  try {
    const query = querySchema.parse(req.query)
    
    // 기본 where 조건
    const whereConditions = {
      ...(query.published !== undefined && { published: query.published }),
      ...(query.category && {
        category: {
          slug: query.category
        }
      }),
      ...(query.author && {
        author: {
          username: query.author
        }
      }),
      ...(query.tag && {
        tags: {
          some: {
            tag: {
              slug: query.tag
            }
          }
        }
      })
    }
    
    // 검색 조건
    if (query.search) {
      whereConditions.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { excerpt: { contains: query.search, mode: 'insensitive' } },
        { content: { contains: query.search, mode: 'insensitive' } }
      ]
    }
    
    // 권한 체크 - 비공개 포스트는 작성자만 볼 수 있음
    if (!query.published && (!req.user || req.user.role !== 'ADMIN')) {
      if (req.user) {
        whereConditions.authorId = req.user.id
      } else {
        whereConditions.published = true
      }
    }
    
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: whereConditions,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              name: true
            }
          },
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
          }
        },
        orderBy: [
          { featured: 'desc' },
          { publishedAt: 'desc' },
          { createdAt: 'desc' }
        ],
        skip: (query.page - 1) * query.limit,
        take: query.limit
      }),
      prisma.blogPost.count({ where: whereConditions })
    ])
    
    // 태그 정보 변환
    const postsWithTags = posts.map(post => ({
      ...post,
      tags: post.tags.map(pt => pt.tag)
    }))
    
    const pagination = {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit)
    }
    
    res.json({
      success: true,
      data: {
        posts: postsWithTags,
        pagination
      }
    })
  } catch (error) {
    console.error('Get posts error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid query parameters',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts'
    })
  }
})

// GET /api/blog/posts/:slug - 특정 블로그 포스트 조회
router.get('/posts/:slug', optionalAuth, async (req, res) => {
  try {
    const { slug } = req.params
    
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            bio: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
            description: true
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
        }
      }
    })
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      })
    }
    
    // 권한 체크 - 비공개 포스트는 작성자만 볼 수 있음
    if (!post.published) {
      if (!req.user || (req.user.id !== post.authorId && req.user.role !== 'ADMIN')) {
        return res.status(403).json({
          success: false,
          error: 'Post is not published'
        })
      }
    }
    
    // 조회수 증가 (백그라운드에서 실행)
    if (post.published) {
      prisma.blogPost.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } }
      }).catch(error => console.error('View count update error:', error))
    }
    
    // 태그 정보 변환
    const postWithTags = {
      ...post,
      tags: post.tags.map(pt => pt.tag)
    }
    
    res.json({
      success: true,
      data: postWithTags
    })
  } catch (error) {
    console.error('Get post error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch post'
    })
  }
})

// POST /api/blog/posts - 새 블로그 포스트 생성
router.post('/posts', authenticateToken, async (req, res) => {
  try {
    const validatedData = createPostSchema.parse(req.body)
    
    // 권한 체크 - ADMIN, EDITOR만 포스트 작성 가능
    if (!['ADMIN', 'EDITOR'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions to create posts'
      })
    }
    
    // 고유한 슬러그 생성
    const slug = await generateUniqueSlug(validatedData.title)
    
    // 카테고리 존재 확인
    if (validatedData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: validatedData.categoryId }
      })
      if (!category) {
        return res.status(400).json({
          success: false,
          error: 'Category not found'
        })
      }
    }
    
    // 태그 존재 확인
    if (validatedData.tagIds.length > 0) {
      const existingTags = await prisma.tag.findMany({
        where: { id: { in: validatedData.tagIds } }
      })
      if (existingTags.length !== validatedData.tagIds.length) {
        return res.status(400).json({
          success: false,
          error: 'One or more tags not found'
        })
      }
    }
    
    // 포스트 생성
    const post = await prisma.blogPost.create({
      data: {
        title: validatedData.title,
        slug,
        content: validatedData.content,
        excerpt: validatedData.excerpt,
        coverImage: validatedData.coverImage,
        published: validatedData.published,
        publishedAt: validatedData.published ? new Date() : null,
        metaTitle: validatedData.metaTitle || validatedData.title,
        metaDescription: validatedData.metaDescription || validatedData.excerpt,
        authorId: req.user.id,
        categoryId: validatedData.categoryId,
        tags: {
          create: validatedData.tagIds.map(tagId => ({
            tagId
          }))
        }
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true
          }
        },
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
        }
      }
    })
    
    // 태그 정보 변환
    const postWithTags = {
      ...post,
      tags: post.tags.map(pt => pt.tag)
    }
    
    res.status(201).json({
      success: true,
      data: postWithTags,
      message: 'Post created successfully'
    })
  } catch (error) {
    console.error('Create post error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid post data',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create post'
    })
  }
})

// PUT /api/blog/posts/:id - 블로그 포스트 수정
router.put('/posts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const validatedData = updatePostSchema.parse(req.body)
    
    // 기존 포스트 조회
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
      include: { tags: true }
    })
    
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      })
    }
    
    // 권한 체크 - 작성자 또는 ADMIN만 수정 가능
    if (req.user.id !== existingPost.authorId && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions to edit this post'
      })
    }
    
    const updateData = { ...validatedData }
    
    // 제목이 변경되면 새 슬러그 생성
    if (validatedData.title && validatedData.title !== existingPost.title) {
      updateData.slug = await generateUniqueSlug(validatedData.title, id)
    }
    
    // 발행 상태가 변경되면 publishedAt 업데이트
    if (validatedData.published !== undefined) {
      if (validatedData.published && !existingPost.published) {
        updateData.publishedAt = new Date()
      } else if (!validatedData.published && existingPost.published) {
        updateData.publishedAt = null
      }
    }
    
    // 카테고리 존재 확인
    if (validatedData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: validatedData.categoryId }
      })
      if (!category) {
        return res.status(400).json({
          success: false,
          error: 'Category not found'
        })
      }
    }
    
    // 태그 업데이트 준비
    const tagUpdates = {}
    if (validatedData.tagIds) {
      // 기존 태그 연결 삭제
      tagUpdates.deleteMany = { postId: id }
      // 새 태그 연결 생성
      tagUpdates.create = validatedData.tagIds.map(tagId => ({ tagId }))
    }
    
    // 포스트 업데이트
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
        ...(Object.keys(tagUpdates).length > 0 && { tags: tagUpdates })
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true
          }
        },
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
        }
      }
    })
    
    // 태그 정보 변환
    const postWithTags = {
      ...updatedPost,
      tags: updatedPost.tags.map(pt => pt.tag)
    }
    
    res.json({
      success: true,
      data: postWithTags,
      message: 'Post updated successfully'
    })
  } catch (error) {
    console.error('Update post error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid post data',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update post'
    })
  }
})

// DELETE /api/blog/posts/:id - 블로그 포스트 삭제
router.delete('/posts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    
    // 기존 포스트 조회
    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    })
    
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      })
    }
    
    // 권한 체크 - 작성자 또는 ADMIN만 삭제 가능
    if (req.user.id !== existingPost.authorId && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions to delete this post'
      })
    }
    
    // 포스트 삭제 (Cascade로 관련 데이터도 자동 삭제됨)
    await prisma.blogPost.delete({
      where: { id }
    })
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    })
  } catch (error) {
    console.error('Delete post error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete post'
    })
  }
})

// PATCH /api/blog/posts/:id/publish - 포스트 발행 상태 변경
router.patch('/posts/:id/publish', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { published } = req.body
    
    if (typeof published !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'Published field must be a boolean'
      })
    }
    
    // 기존 포스트 조회
    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    })
    
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      })
    }
    
    // 권한 체크
    if (req.user.id !== existingPost.authorId && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      })
    }
    
    const updateData = {
      published,
      updatedAt: new Date()
    }
    
    // 발행 시 publishedAt 설정, 비발행 시 null
    if (published && !existingPost.published) {
      updateData.publishedAt = new Date()
    } else if (!published && existingPost.published) {
      updateData.publishedAt = null
    }
    
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true
          }
        },
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
        }
      }
    })
    
    const postWithTags = {
      ...updatedPost,
      tags: updatedPost.tags.map(pt => pt.tag)
    }
    
    res.json({
      success: true,
      data: postWithTags,
      message: `Post ${published ? 'published' : 'unpublished'} successfully`
    })
  } catch (error) {
    console.error('Update publish status error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update publish status'
    })
  }
})

// GET /api/blog/categories - 카테고리 목록 조회
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            posts: {
              where: { published: true }
            }
          }
        }
      }
    })
    
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    })
  }
})

// GET /api/blog/tags - 태그 목록 조회
router.get('/tags', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            posts: {
              where: {
                post: { published: true }
              }
            }
          }
        }
      }
    })
    
    res.json({
      success: true,
      data: tags
    })
  } catch (error) {
    console.error('Get tags error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tags'
    })
  }
})

// POST /api/blog/tags - 새 태그 생성
router.post('/tags', authenticateToken, requireRole(['ADMIN', 'EDITOR']), async (req, res) => {
  try {
    const { name, color } = req.body
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Tag name is required'
      })
    }
    
    const slug = generateSlug(name.trim())
    
    // 중복 확인
    const existing = await prisma.tag.findFirst({
      where: {
        OR: [
          { name: name.trim() },
          { slug }
        ]
      }
    })
    
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Tag already exists'
      })
    }
    
    const tag = await prisma.tag.create({
      data: {
        name: name.trim(),
        slug,
        color: color || null
      }
    })
    
    res.status(201).json({
      success: true,
      data: tag,
      message: 'Tag created successfully'
    })
  } catch (error) {
    console.error('Create tag error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create tag'
    })
  }
})

// POST /api/blog/upload - 이미지 업로드
router.post('/upload', authenticateToken, upload.single('image'), processImage, async (req, res) => {
  try {
    if (!req.processedFile) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      })
    }
    
    res.json({
      success: true,
      data: {
        url: `${req.protocol}://${req.get('host')}${req.processedFile.url}`,
        filename: req.processedFile.filename,
        size: req.processedFile.size
      },
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to upload image'
    })
  }
})

export default router