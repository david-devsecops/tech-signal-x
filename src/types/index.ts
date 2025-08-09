// Common types for the application

export type Language = 'ko' | 'en'

export type ViewType = 'home' | 'blog' | 'blog-post' | 'blog-write' | 'blog-edit'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: string
  published: boolean
  featured: boolean
  metaTitle?: string
  metaDescription?: string
  viewCount: number
  likeCount: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  authorId: string
  author: {
    id: string
    name?: string
    username: string
  }
  categoryId?: string
  category?: {
    id: string
    name: string
    slug: string
    color?: string
  }
  tags: {
    id: string
    name: string
    slug: string
    color?: string
  }[]
}

export interface BlogPostInput {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  categoryId?: string
  tagIds: string[]
  published: boolean
  metaTitle?: string
  metaDescription?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  color?: string
}

export interface Newsletter {
  title: string
  date: string
  preview: string
  readers: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  link?: string
  internal?: boolean
}

export interface Experience {
  company: string
  position: string
  period: string
  description: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  credentialId?: string
}