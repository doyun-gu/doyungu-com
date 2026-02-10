import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-col footer-brand">
          <span className="footer-logo">doyungu.com</span>
          <p className="footer-tagline">Engineering things that matter.</p>
        </div>

        <div className="footer-col footer-nav">
          <span className="footer-col-title">Pages</span>
          <Link to="/about">About</Link>
          <Link to="/project">Projects</Link>
          <Link to="/life">Life</Link>
          <Link to="/vision">Vision</Link>
        </div>

        <div className="footer-col footer-contact">
          <span className="footer-col-title">Contact</span>
          <a href="mailto:me@doyungu.com">me@doyungu.com</a>
          <div className="footer-locations">
            <span>Manchester</span>
            <span>Coventry</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {currentYear} Doyun Gu. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
