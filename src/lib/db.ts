import { sql } from '@vercel/postgres'

// 데이터베이스 연결 테스트 함수
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`
    return { success: true, data: result.rows[0] }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// 포스트 테이블 생성 함수
export async function createPostsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// 포스트 목록 조회
export async function getPosts() {
  try {
    const result = await sql`
      SELECT id, title, slug, published, created_at, updated_at 
      FROM posts 
      ORDER BY created_at DESC
    `
    return { success: true, data: result.rows }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// 포스트 상세 조회
export async function getPostBySlug(slug: string) {
  try {
    const result = await sql`
      SELECT * FROM posts 
      WHERE slug = ${slug} AND published = true
    `
    return { success: true, data: result.rows[0] || null }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// 포스트 생성
export async function createPost(title: string, content: string, slug: string) {
  try {
    const result = await sql`
      INSERT INTO posts (title, content, slug, published)
      VALUES (${title}, ${content}, ${slug}, true)
      RETURNING *
    `
    return { success: true, data: result.rows[0] }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}