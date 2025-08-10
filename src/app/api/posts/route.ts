import { NextRequest, NextResponse } from 'next/server'
import { getPosts, createPost } from '@/lib/db'

// GET: 모든 포스트 조회
export async function GET() {
  try {
    const result = await getPosts()
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to fetch posts', details: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json(result.data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST: 새 포스트 생성
export async function POST(request: NextRequest) {
  try {
    const { title, content, slug } = await request.json()

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Title, content, and slug are required' },
        { status: 400 }
      )
    }

    const result = await createPost(title, content, slug)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to create post', details: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json(result.data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}