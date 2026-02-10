import { Link } from 'react-router-dom'
import './Home.css'

function July() {
  return (
    <>
      <div className="page-container">
        <p className="page-title">Project JULY</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <div className="page-section">
          <h3>Overview</h3>
          <p>
            Project JULY is focused on building the best AI-based farming model.
            This ongoing project combines machine learning with agricultural
            data to create intelligent farming solutions.
          </p>
        </div>

        <div className="page-section">
          <h3>Goals</h3>
          <ul>
            <li>AI-driven crop analysis and prediction</li>
            <li>Data-informed farming decisions</li>
            <li>Scalable and accessible platform</li>
          </ul>
        </div>

        <div className="page-section">
          <h3>Date</h3>
          <p>July 2025 — Present</p>
        </div>

        <div className="page-section">
          <Link to="/project" className="link-hover-effect">Back to Projects</Link>
        </div>
      </div>

      <div className="dot-divider dot-divider-bottom">
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
      </div>
    </>
  )
}

export default July
