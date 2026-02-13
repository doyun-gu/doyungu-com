import { Link } from 'react-router-dom'
import '../components/BlogPost.css'
import './Home.css'

function CircuitSim() {
  return (
    <>
      <div className="page-container">
        <p className="page-title">Circuit Simulation</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <article className="blog-post">
          <div className="blog-post-header">
            <h2 className="blog-post-title">Circuit Simulation</h2>
            <div className="blog-post-meta">
              <span className="blog-post-date">Coming Soon</span>
            </div>
          </div>

          <div className="blog-post-body">
            <p className="blog-text">
              Details for this project will be added soon.
            </p>
          </div>
        </article>

        <Link to="/project" className="link-hover-effect blog-back-link">Back to Projects</Link>
      </div>

      <div className="dot-divider dot-divider-bottom">
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
      </div>
    </>
  )
}

export default CircuitSim
