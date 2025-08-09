
import { useState, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { ARIA_LABELS } from '../constants'

const Header = memo(() => {
  const { language, setLanguage } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ko' ? 'en' : 'ko')
  }, [language, setLanguage])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">박상준.dev</h1>
          </div>
          
          <nav className="hidden md:block" role="navigation" aria-label={ARIA_LABELS.navigation.main}>
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="nav-link" aria-label="Go to Home page">Home</Link>
              <a href="/#about" className="nav-link" aria-label="Go to About section">About</a>
              <a href="/#projects" className="nav-link" aria-label="Go to Projects section">Projects</a>
              <Link to="/blog" className="nav-link" aria-label="Go to Blog page">Blog</Link>
              <a href="/#newsletter" className="nav-link" aria-label="Go to Newsletter section">Newsletter</a>
            </div>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              title={language === 'ko' ? 'Switch to English' : '한국어로 변경'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-sm font-medium">
                {language === 'ko' ? 'EN' : 'KO'}
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={isMobileMenuOpen ? ARIA_LABELS.mobileMenuToggle.close : ARIA_LABELS.mobileMenuToggle.open}
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav 
            className="md:hidden bg-white border-t border-gray-200" 
            role="navigation" 
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
                aria-label="Go to Home page"
              >
                Home
              </Link>
              <a 
                href="/#about" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
                aria-label="Go to About section"
              >
                About
              </a>
              <a 
                href="/#projects" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
                aria-label="Go to Projects section"
              >
                Projects
              </a>
              <Link 
                to="/blog" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
                aria-label="Go to Blog page"
              >
                Blog
              </Link>
              <a 
                href="/#newsletter" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
                aria-label="Go to Newsletter section"
              >
                Newsletter
              </a>
            </div>
          </nav>
        )}
      </nav>
    </header>
  )
})

Header.displayName = 'Header'

export default Header