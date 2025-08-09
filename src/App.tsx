import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'
import BlogList from './pages/BlogList'
import BlogWrite from './pages/BlogWrite'
import { LanguageProvider } from './contexts/LanguageContext'
import { BlogProvider } from './contexts/BlogContext'

// 홈 페이지 컴포넌트
const HomePage = () => {
  const handleBlogClick = (blogId: string) => {
    // 이 함수는 이제 라우팅으로 대체됨
    console.log('Blog click:', blogId)
  }

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Blog onBlogClick={handleBlogClick} />
      <Newsletter />
    </>
  )
}

// 레이아웃 컴포넌트
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
)

function App() {
  return (
    <LanguageProvider>
      <BlogProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/write" element={<BlogWrite />} />
              <Route path="/blog/edit/:id" element={<BlogWrite />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </Layout>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff'
              }
            }}
          />
        </Router>
      </BlogProvider>
    </LanguageProvider>
  )
}

export default App
