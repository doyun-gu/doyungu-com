import React from 'react'
import { Link } from 'react-router-dom' // ADDED: Import Link
import './Header.css'

function Header() {
  const currentYear = new Date().getFullYear()

  return (
    <header className="site-header">
      <div className="header-left">
        {/* MODIFIED: Wrap site-name in Link */}
        <Link to="/" className="site-name-link"> {/* Added a new class for styling the Link itself */}
          <span className="site-name">doyungu.com</span>
        </Link>
        <span className="copyright">© {currentYear} All rights reserved.</span>
      </div>

      <nav className="header-right">
        <a href="https://www.linkedin.com/in/doyun-gu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://www.instagram.com/44y4755" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://github.com/doyun-gu" target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>
    </header>
  )
}

export default Header