// Common types for the application

export type Language = 'ko' | 'en'

export type ViewType = 'home' | 'blog-post'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  readTime: string
  tags: string[]
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