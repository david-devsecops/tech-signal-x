import { NextResponse } from 'next/server'
import { testConnection, createPostsTable } from '@/lib/db'

export async function GET() {
  try {
    // 데이터베이스 연결 테스트
    const connectionTest = await testConnection()
    
    if (!connectionTest.success) {
      return NextResponse.json(
        { error: 'Database connection failed', details: connectionTest.error },
        { status: 500 }
      )
    }

    // 테이블 생성
    const tableCreation = await createPostsTable()
    
    if (!tableCreation.success) {
      return NextResponse.json(
        { error: 'Table creation failed', details: tableCreation.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Database connection successful',
      connection: connectionTest.data,
      tableCreated: true
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}