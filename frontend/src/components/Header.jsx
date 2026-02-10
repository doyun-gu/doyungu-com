import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  const currentYear = new Date().getFullYear()

  return (
    <header className="site-header">
      <div className="header-left">
        <Link to="/" className="site-name-link link-hover-effect">
          <span className="site-name">doyungu.com</span>
        </Link>
        <span className="copyright">© {currentYear} All rights reserved.</span>
      </div>

      <nav className="header-right">
        <a
          href="https://www.linkedin.com/in/doyun-gu"
          className="link-hover-effect"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        
        <a
          href="https://www.instagram.com/44y4755"
          className="link-hover-effect"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>

        <a
          href="https://github.com/doyun-gu"
          className="link-hover-effect"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>

      </nav>
    </header>
  )
}

export default Header