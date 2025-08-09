import type { BlogPost, BlogPostInput, Category, Tag } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// API 응답 타입
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

interface BlogListResponse {
  posts: BlogPost[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 블로그 포스트 관련 API
export const blogApi = {
  // 블로그 포스트 목록 조회
  async getPosts(params: {
    page?: number
    limit?: number
    category?: string
    published?: boolean
    search?: string
  } = {}): Promise<BlogListResponse> {
    const searchParams = new URLSearchParams()
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.limit) searchParams.append('limit', params.limit.toString())
    if (params.category) searchParams.append('category', params.category)
    if (params.published !== undefined) searchParams.append('published', params.published.toString())
    if (params.search) searchParams.append('search', params.search)

    const response = await fetch(`${API_BASE}/posts?${searchParams}`)
    if (!response.ok) throw new Error('Failed to fetch posts')
    
    const result: ApiResponse<BlogListResponse> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to fetch posts')
    
    return result.data!
  },

  // 특정 블로그 포스트 조회
  async getPost(slug: string): Promise<BlogPost> {
    const response = await fetch(`${API_BASE}/posts/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch post')
    
    const result: ApiResponse<BlogPost> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to fetch post')
    
    return result.data!
  },

  // 블로그 포스트 생성
  async createPost(postData: BlogPostInput): Promise<BlogPost> {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    })
    
    if (!response.ok) throw new Error('Failed to create post')
    
    const result: ApiResponse<BlogPost> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to create post')
    
    return result.data!
  },

  // 블로그 포스트 수정
  async updatePost(id: string, postData: Partial<BlogPostInput>): Promise<BlogPost> {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    })
    
    if (!response.ok) throw new Error('Failed to update post')
    
    const result: ApiResponse<BlogPost> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to update post')
    
    return result.data!
  },

  // 블로그 포스트 삭제
  async deletePost(id: string): Promise<void> {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) throw new Error('Failed to delete post')
    
    const result: ApiResponse<null> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to delete post')
  },

  // 발행 상태 변경
  async publishPost(id: string, published: boolean): Promise<BlogPost> {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE}/posts/${id}/publish`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ published })
    })
    
    if (!response.ok) throw new Error('Failed to update post status')
    
    const result: ApiResponse<BlogPost> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to update post status')
    
    return result.data!
  }
}

// 카테고리 관련 API
export const categoryApi = {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE}/categories`)
    if (!response.ok) throw new Error('Failed to fetch categories')
    
    const result: ApiResponse<Category[]> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to fetch categories')
    
    return result.data!
  }
}

// 태그 관련 API
export const tagApi = {
  async getTags(): Promise<Tag[]> {
    const response = await fetch(`${API_BASE}/tags`)
    if (!response.ok) throw new Error('Failed to fetch tags')
    
    const result: ApiResponse<Tag[]> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to fetch tags')
    
    return result.data!
  },

  async createTag(name: string): Promise<Tag> {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    })
    
    if (!response.ok) throw new Error('Failed to create tag')
    
    const result: ApiResponse<Tag> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to create tag')
    
    return result.data!
  }
}

// 파일 업로드 API
export const uploadApi = {
  async uploadImage(file: File): Promise<{ url: string }> {
    const token = localStorage.getItem('authToken')
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    
    if (!response.ok) throw new Error('Failed to upload image')
    
    const result: ApiResponse<{ url: string }> = await response.json()
    if (!result.success) throw new Error(result.error || 'Failed to upload image')
    
    return result.data!
  }
}