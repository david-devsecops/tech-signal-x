
const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">박상준.dev</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="nav-link">About</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#blog" className="nav-link">Blog</a>
              <a href="#newsletter" className="nav-link">Newsletter</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header