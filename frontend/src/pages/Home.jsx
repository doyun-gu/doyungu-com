import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <>
      <p className="main-quote">Complaining is not a strategy</p>

      <div className="dot-divider">
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
      </div>

      <div className="section-grid">
        <Link to="/about" className="link-hover-effect">About</Link>
        <Link to="/life" className="link-hover-effect">Life</Link>
        <Link to="/project" className="link-hover-effect">Project</Link>
        <Link to="/vision" className="link-hover-effect">Vision</Link>
      </div>
    </>
  )
}

export default Home
