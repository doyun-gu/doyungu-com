import { Link } from 'react-router-dom'
import './Home.css'

function Hackathon() {
  return (
    <>
      <div className="page-container">
        <p className="page-title">Hackathon</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <div className="page-section">
          <h3>Overview</h3>
          <p>
            A hackathon project built in March 2025. This application
            fetched live data from a Raspberry Pi 5 during the event,
            demonstrating real-time data acquisition and visualisation.
          </p>
        </div>

        <div className="page-section">
          <h3>Technology</h3>
          <ul>
            <li>Raspberry Pi 5 — Live sensor data acquisition</li>
            <li>Real-time data streaming</li>
            <li>Web-based dashboard</li>
          </ul>
        </div>

        <div className="page-section">
          <h3>Date</h3>
          <p>March 2025</p>
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

export default Hackathon
