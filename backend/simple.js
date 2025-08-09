import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

// Basic middleware
app.use(cors())
app.use(express.json())

// Test routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.get('/debug/env', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV || 'not set',
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    PORT: process.env.PORT || 'not set'
  })
})

app.get('/api/blog/test', (req, res) => {
  res.json({
    success: true,
    message: 'Blog API working',
    timestamp: new Date().toISOString()
  })
})

app.get('/api/blog/posts', (req, res) => {
  res.json({
    success: true,
    data: {
      posts: [],
      message: 'Database not connected yet'
    }
  })
})

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Simple server running on port ${PORT}`)
  console.log(`📊 Health check: /health`)
})