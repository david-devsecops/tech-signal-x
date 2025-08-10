import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'

function App() {
  const [currentView, setCurrentView] = useState<'home' | string>('home')
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)

  const showBlogPost = (blogId: string) => {
    setSelectedBlogId(blogId)
    setCurrentView('blog-post')
  }

  const showHome = () => {
    setCurrentView('home')
    setSelectedBlogId(null)
  }

  if (currentView === 'blog-post' && selectedBlogId) {
    return (
      <div className="min-h-screen">
        <Header />
        <BlogPost blogId={selectedBlogId} onBack={showHome} />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Blog onBlogClick={showBlogPost} />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default App
