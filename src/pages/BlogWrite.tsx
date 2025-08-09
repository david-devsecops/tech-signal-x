import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import toast from 'react-hot-toast'
import { useLanguage } from '../contexts/LanguageContext'
import { useBlogActions } from '../contexts/BlogContext'
import { blogApi, categoryApi, tagApi } from '../services/blogApi'
import type { BlogPostInput, Category, Tag } from '../types'

const BlogWrite = () => {
  const { language } = useLanguage()
  const actions = useBlogActions()
  const navigate = useNavigate()
  const { id } = useParams() // edit 모드일 때 사용
  const isEditMode = Boolean(id)

  // 폼 상태
  const [formData, setFormData] = useState<BlogPostInput>({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    categoryId: '',
    tagIds: [],
    published: false,
    metaTitle: '',
    metaDescription: ''
  })

  // UI 상태
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [newTagName, setNewTagName] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // 자동 저장 관련
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    if (id && isEditMode) {
      loadPostForEdit(id)
    }
  }, [id, isEditMode])

  // 자동 저장 (5초마다)
  useEffect(() => {
    if (formData.title.trim() && formData.content.trim()) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }
      
      const timeout = setTimeout(() => {
        handleAutoSave()
      }, 5000)
      
      setAutoSaveTimeout(timeout)
    }
    
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }
    }
  }, [formData.title, formData.content])

  const loadInitialData = async () => {
    try {
      setIsLoading(true)
      
      // 카테고리 로드
      try {
        const categoriesData = await categoryApi.getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.warn('Categories API not available, using empty array')
        setCategories([])
      }
      
      // 태그 로드
      try {
        const tagsData = await tagApi.getTags()
        setTags(tagsData)
      } catch (error) {
        console.warn('Tags API not available, using empty array')
        setTags([])
      }
    } catch (error) {
      console.error('Failed to load initial data:', error)
      toast.error(language === 'ko' ? '초기 데이터를 불러오는데 실패했습니다.' : 'Failed to load initial data')
    } finally {
      setIsLoading(false)
    }
  }

  const loadPostForEdit = async (_postId: string) => {
    try {
      setIsLoading(true)
      // 실제 API에서 포스트 로드 (현재는 구현되지 않음)
      // const post = await blogApi.getPost(postId)
      // setFormData({ ... })
      toast.error(language === 'ko' ? '편집 기능은 아직 구현되지 않았습니다.' : 'Edit functionality not implemented yet')
      navigate('/blog')
    } catch (error) {
      console.error('Failed to load post for edit:', error)
      toast.error(language === 'ko' ? '포스트를 불러오는데 실패했습니다.' : 'Failed to load post')
      navigate('/blog')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAutoSave = async () => {
    if (isEditMode && formData.title.trim() && formData.content.trim()) {
      try {
        // 실제 자동 저장은 API 구현 후 활성화
        // await blogApi.updatePost(id!, formData)
        setLastSaved(new Date())
        console.log('Auto-saved at', new Date())
      } catch (error) {
        console.warn('Auto-save failed:', error)
      }
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleInputChange = (field: keyof BlogPostInput, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // 제목 변경 시 SEO 제목도 자동으로 설정
      ...(field === 'title' && !prev.metaTitle ? { metaTitle: value } : {}),
      // 요약 변경 시 SEO 설명도 자동으로 설정
      ...(field === 'excerpt' && !prev.metaDescription ? { metaDescription: value } : {})
    }))
  }

  const handleTagSelect = (tag: Tag) => {
    if (!selectedTags.find(t => t.id === tag.id)) {
      const newSelectedTags = [...selectedTags, tag]
      setSelectedTags(newSelectedTags)
      setFormData(prev => ({
        ...prev,
        tagIds: newSelectedTags.map(t => t.id)
      }))
    }
  }

  const handleTagRemove = (tagId: string) => {
    const newSelectedTags = selectedTags.filter(t => t.id !== tagId)
    setSelectedTags(newSelectedTags)
    setFormData(prev => ({
      ...prev,
      tagIds: newSelectedTags.map(t => t.id)
    }))
  }

  const handleNewTagCreate = async () => {
    if (!newTagName.trim()) return
    
    try {
      const newTag = await tagApi.createTag(newTagName.trim())
      setTags(prev => [...prev, newTag])
      handleTagSelect(newTag)
      setNewTagName('')
      toast.success(language === 'ko' ? '새 태그가 생성되었습니다.' : 'New tag created successfully')
    } catch (error) {
      console.error('Failed to create tag:', error)
      toast.error(language === 'ko' ? '태그 생성에 실패했습니다.' : 'Failed to create tag')
    }
  }

  const handleSave = async (publish: boolean = false) => {
    if (!formData.title.trim()) {
      toast.error(language === 'ko' ? '제목을 입력해주세요.' : 'Please enter a title')
      return
    }

    if (!formData.content.trim()) {
      toast.error(language === 'ko' ? '내용을 입력해주세요.' : 'Please enter content')
      return
    }

    try {
      setIsSaving(true)
      const postData = { ...formData, published: publish }
      
      if (isEditMode) {
        // 수정 모드 (아직 미구현)
        // const updatedPost = await blogApi.updatePost(id!, postData)
        // actions.updatePost(updatedPost)
        toast.error(language === 'ko' ? '편집 기능은 아직 구현되지 않았습니다.' : 'Edit functionality not implemented yet')
        return
      } else {
        // 새 포스트 생성
        try {
          const newPost = await blogApi.createPost(postData)
          actions.addPost(newPost)
          toast.success(
            language === 'ko' 
              ? (publish ? '포스트가 발행되었습니다!' : '포스트가 임시저장되었습니다!')
              : (publish ? 'Post published successfully!' : 'Post saved as draft!')
          )
          navigate('/blog')
        } catch (error) {
          // API 실패 시 로컬 스토리지에 임시 저장
          const tempPost = {
            ...postData,
            id: `temp-${Date.now()}`,
            slug: generateSlug(formData.title),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: publish ? new Date().toISOString() : undefined,
            viewCount: 0,
            likeCount: 0,
            authorId: 'temp-author',
            author: { id: 'temp-author', name: '박상준', username: 'david-devsecops' }
          }
          
          // 로컬 스토리지에 저장
          const savedPosts = JSON.parse(localStorage.getItem('tempBlogPosts') || '[]')
          savedPosts.push(tempPost)
          localStorage.setItem('tempBlogPosts', JSON.stringify(savedPosts))
          
          toast.success(
            language === 'ko' 
              ? '서버가 연결되지 않아 임시로 로컬에 저장되었습니다.'
              : 'Server not available. Post saved locally.'
          )
          navigate('/blog')
        }
      }
    } catch (error) {
      console.error('Failed to save post:', error)
      toast.error(language === 'ko' ? '포스트 저장에 실패했습니다.' : 'Failed to save post')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (formData.title.trim() || formData.content.trim()) {
      const confirmMessage = language === 'ko' 
        ? '작성 중인 내용이 있습니다. 정말로 취소하시겠습니까?'
        : 'You have unsaved changes. Are you sure you want to cancel?'
      
      if (window.confirm(confirmMessage)) {
        navigate('/blog')
      }
    } else {
      navigate('/blog')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode 
                ? (language === 'ko' ? '포스트 수정' : 'Edit Post')
                : (language === 'ko' ? '새 포스트 작성' : 'Write New Post')
              }
            </h1>
            
            {lastSaved && (
              <div className="text-sm text-gray-500">
                {language === 'ko' ? '마지막 저장: ' : 'Last saved: '}
                {lastSaved.toLocaleTimeString()}
              </div>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {language === 'ko' 
              ? '마크다운을 지원합니다. 자동 저장이 활성화되어 있습니다.'
              : 'Markdown is supported. Auto-save is enabled.'
            }
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 space-y-6">
            {/* 제목 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ko' ? '제목 *' : 'Title *'}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={language === 'ko' ? '포스트 제목을 입력하세요' : 'Enter post title'}
              />
            </div>

            {/* 요약 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ko' ? '요약' : 'Excerpt'}
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={language === 'ko' ? '포스트 요약을 입력하세요 (선택사항)' : 'Enter post excerpt (optional)'}
              />
            </div>

            {/* 카테고리 및 태그 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 카테고리 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '카테고리' : 'Category'}
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">
                    {language === 'ko' ? '카테고리 선택' : 'Select category'}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 태그 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ko' ? '태그' : 'Tags'}
                </label>
                <div className="space-y-2">
                  {/* 선택된 태그들 */}
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <span 
                          key={tag.id}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          #{tag.name}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag.id)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* 태그 선택 드롭다운 */}
                  <select
                    onChange={(e) => {
                      const selectedTag = tags.find(t => t.id === e.target.value)
                      if (selectedTag) {
                        handleTagSelect(selectedTag)
                        e.target.value = ''
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">
                      {language === 'ko' ? '태그 선택' : 'Select tags'}
                    </option>
                    {tags
                      .filter(tag => !selectedTags.find(st => st.id === tag.id))
                      .map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))
                    }
                  </select>
                  
                  {/* 새 태그 추가 */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      placeholder={language === 'ko' ? '새 태그 이름' : 'New tag name'}
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleNewTagCreate()}
                    />
                    <button
                      type="button"
                      onClick={handleNewTagCreate}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      {language === 'ko' ? '추가' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 고급 설정 토글 */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <svg 
                  className={`w-4 h-4 mr-1 transition-transform ${
                    showAdvanced ? 'rotate-90' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {language === 'ko' ? 'SEO 설정' : 'SEO Settings'}
              </button>
              
              {showAdvanced && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ko' ? 'SEO 제목' : 'SEO Title'}
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder={language === 'ko' ? '검색엔진에 표시될 제목' : 'Title for search engines'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ko' ? 'SEO 설명' : 'SEO Description'}
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder={language === 'ko' ? '검색엔진에 표시될 설명' : 'Description for search engines'}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 마크다운 에디터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ko' ? '내용 *' : 'Content *'}
              </label>
              <div data-color-mode="light">
                <MDEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value || '')}
                  preview="edit"
                  hideToolbar={false}
                  height={500}
                  data-testid="md-editor"
                />
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => handleInputChange('published', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {language === 'ko' ? '즉시 발행' : 'Publish immediately'}
                  </span>
                </label>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {language === 'ko' ? '취소' : 'Cancel'}
                </button>
                
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                      {language === 'ko' ? '저장 중...' : 'Saving...'}
                    </div>
                  ) : (
                    language === 'ko' ? '임시저장' : 'Save Draft'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {language === 'ko' ? '발행 중...' : 'Publishing...'}
                    </div>
                  ) : (
                    language === 'ko' ? '발행하기' : 'Publish'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogWrite