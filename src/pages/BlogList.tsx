import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { useLanguage } from '../contexts/LanguageContext'
import { useBlog, useBlogActions } from '../contexts/BlogContext'
import { blogApi, categoryApi } from '../services/blogApi'
import type { BlogPost } from '../types'

const BlogList = () => {
  const { language } = useLanguage()
  const { state } = useBlog()
  const actions = useBlogActions()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // 정적 포스트 데이터 제거 - 실제 API에서만 데이터 가져오기

  const categories = [
    { id: 'all', name: language === 'ko' ? '전체' : 'All', slug: 'all' },
    { id: 'aws', name: 'AWS', slug: 'aws', color: '#FF9900' },
    { id: 'oracle', name: 'Oracle', slug: 'oracle', color: '#F80000' },
    { id: 'kubernetes', name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5' },
    { id: 'cloud', name: 'Cloud', slug: 'cloud', color: '#4285F4' },
    { id: 'devops', name: 'DevOps', slug: 'devops', color: '#FF6B35' }
  ]

  // 데이터 로드
  useEffect(() => {
    loadPosts()
    loadCategories()
  }, [selectedCategory, searchTerm])

  const loadPosts = useCallback(async () => {
    try {
      actions.setLoading(true)
      
      // 실제 API에서 데이터 가져오기
      const result = await blogApi.getPosts({
        page: 1,
        limit: 10,
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        published: true,
        search: searchTerm || undefined
      })
      
      actions.setPosts(result.posts, result.pagination)
    } catch (error) {
      console.error('Failed to load posts:', error)
      toast.error(language === 'ko' ? '포스트를 불러오는데 실패했습니다.' : 'Failed to load posts')
      actions.setError('Failed to load posts')
      // API 실패 시 빈 배열로 설정
      actions.setPosts([], {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      })
    } finally {
      actions.setLoading(false)
    }
  }, [selectedCategory, searchTerm, actions, language])

  const loadCategories = async () => {
    try {
      // API에서 카테고리 로드 시도 (실패해도 정적 데이터 사용)
      const apiCategories = await categoryApi.getCategories()
      actions.setCategories(apiCategories)
    } catch (error) {
      // API 실패 시 정적 데이터 사용
      console.warn('Categories API not available, using static data')
    }
  }

  const handlePostClick = (post: BlogPost) => {
    navigate(`/blog/${post.slug}`)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return language === 'ko' 
        ? format(date, 'yyyy년 M월 d일')
        : format(date, 'MMMM d, yyyy')
    } catch {
      return dateString
    }
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = language === 'ko' ? 200 : 250
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return language === 'ko' ? `${readTime}분 읽기` : `${readTime} min read`
  }

  if (state.isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ko' ? '기술 블로그' : 'Tech Blog'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'ko' 
              ? '개발하면서 배운 지식과 경험을 공유합니다' 
              : 'Sharing knowledge and experience gained through development'
            }
          </p>
          
          {/* 새 글 작성 버튼 */}
          <Link 
            to="/blog/write"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {language === 'ko' ? '새 글 작성' : 'Write New Post'}
          </Link>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-8 space-y-4">
          {/* 검색바 */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder={language === 'ko' ? '검색...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 블로그 포스트 그리드 */}
        {state.posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'ko' ? '포스트가 없습니다' : 'No posts found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ko' 
                ? '첫 번째 블로그 포스트를 작성해보세요!' 
                : 'Write your first blog post!'
              }
            </p>
            <Link 
              to="/blog/write"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'ko' ? '글 작성하기' : 'Write Post'}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {state.posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
                onClick={() => handlePostClick(post)}
              >
                {/* 커버 이미지 */}
                {post.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  {/* 카테고리 및 메타 정보 */}
                  <div className="flex items-center gap-2 mb-3">
                    {post.category && (
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: post.category.color || '#6B7280' }}
                      >
                        {post.category.name}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">
                      {calculateReadTime(post.content || post.excerpt || '')}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 text-sm">{post.viewCount.toLocaleString()} views</span>
                  </div>
                  
                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {/* 요약 */}
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* 작성자 및 날짜 */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-2">
                        {post.author.name?.charAt(0) || post.author.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{post.author.name || post.author.username}</div>
                        <div>{formatDate(post.publishedAt || post.createdAt)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-red-500">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {post.likeCount}
                    </div>
                  </div>
                  
                  {/* 태그 */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag.id}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 페이지네이션 (향후 구현) */}
        {state.pagination.totalPages > 1 && (
          <div className="flex justify-center">
            <div className="text-gray-500">
              {language === 'ko' ? '페이지네이션은 향후 구현 예정입니다.' : 'Pagination will be implemented soon.'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList