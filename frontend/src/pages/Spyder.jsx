import { Link } from 'react-router-dom'
import './Home.css'

function Spyder() {
  return (
    <>
      <div className="page-container">
        <p className="page-title">SPYDER</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <div className="page-section">
          <h3>Overview</h3>
          <p>
            SPYDER is a long-running project focused on AI-based farming.
            Started in 2023, it continues to evolve as new data and techniques
            become available.
          </p>
        </div>

        <div className="page-section">
          <h3>Progress</h3>
          <ul>
            <li>Data collection and model training</li>
            <li>Iterative improvement of prediction accuracy</li>
            <li>Integration with real-world farming workflows</li>
          </ul>
        </div>

        <div className="page-section">
          <h3>Date</h3>
          <p>2023–2024 — Present</p>
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

export default Spyder
