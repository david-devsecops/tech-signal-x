import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Blog />
      <Newsletter />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
