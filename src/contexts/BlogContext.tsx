import React, { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { BlogPost, Category, Tag } from '../types'

// 블로그 상태 타입 정의
interface BlogState {
  posts: BlogPost[]
  categories: Category[]
  tags: Tag[]
  selectedPost: BlogPost | null
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 액션 타입 정의
type BlogAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_POSTS'; payload: { posts: BlogPost[]; pagination: BlogState['pagination'] } }
  | { type: 'ADD_POST'; payload: BlogPost }
  | { type: 'UPDATE_POST'; payload: BlogPost }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'SET_SELECTED_POST'; payload: BlogPost | null }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_TAGS'; payload: Tag[] }
  | { type: 'ADD_TAG'; payload: Tag }

// 초기 상태
const initialState: BlogState = {
  posts: [],
  categories: [],
  tags: [],
  selectedPost: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  }
}

// 리듀서 함수
const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }

    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload.posts,
        pagination: action.payload.pagination,
        isLoading: false,
        error: null
      }

    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1
        }
      }

    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
        selectedPost: state.selectedPost?.id === action.payload.id 
          ? action.payload 
          : state.selectedPost
      }

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        pagination: {
          ...state.pagination,
          total: Math.max(0, state.pagination.total - 1)
        },
        selectedPost: state.selectedPost?.id === action.payload 
          ? null 
          : state.selectedPost
      }

    case 'SET_SELECTED_POST':
      return { ...state, selectedPost: action.payload }

    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }

    case 'SET_TAGS':
      return { ...state, tags: action.payload }

    case 'ADD_TAG':
      return { ...state, tags: [...state.tags, action.payload] }

    default:
      return state
  }
}

// Context 생성
const BlogContext = createContext<{
  state: BlogState
  dispatch: React.Dispatch<BlogAction>
} | null>(null)

// Provider 컴포넌트
interface BlogProviderProps {
  children: ReactNode
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState)

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  )
}

// Custom Hook
export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}

// 편의 함수들
export const useBlogActions = () => {
  const { dispatch } = useBlog()

  return {
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
    setPosts: (posts: BlogPost[], pagination: BlogState['pagination']) => 
      dispatch({ type: 'SET_POSTS', payload: { posts, pagination } }),
    addPost: (post: BlogPost) => dispatch({ type: 'ADD_POST', payload: post }),
    updatePost: (post: BlogPost) => dispatch({ type: 'UPDATE_POST', payload: post }),
    deletePost: (id: string) => dispatch({ type: 'DELETE_POST', payload: id }),
    setSelectedPost: (post: BlogPost | null) => dispatch({ type: 'SET_SELECTED_POST', payload: post }),
    setCategories: (categories: Category[]) => dispatch({ type: 'SET_CATEGORIES', payload: categories }),
    setTags: (tags: Tag[]) => dispatch({ type: 'SET_TAGS', payload: tags }),
    addTag: (tag: Tag) => dispatch({ type: 'ADD_TAG', payload: tag })
  }
}