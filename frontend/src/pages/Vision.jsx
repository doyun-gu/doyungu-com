import { Link } from 'react-router-dom'
import './Home.css'

function Vision() {
  return (
    <>
      <div className="page-container">
        <p className="page-title">Vision</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <div className="page-section">
          <h3>Where I Am Heading</h3>
          <p>
            I want to build technology that matters. My goal is to create tools
            and systems that solve real problems — whether that is in automotive
            engineering, agriculture, or everyday life.
          </p>
        </div>

        <div className="page-section">
          <h3>What Drives Me</h3>
          <ul>
            <li>Making complex data simple and accessible</li>
            <li>Bridging the gap between hardware and software</li>
            <li>Building products people actually want to use</li>
            <li>Continuous learning and pushing boundaries</li>
          </ul>
        </div>

        <div className="page-section">
          <h3>The Future</h3>
          <p>
            I am working towards building a portfolio of projects that demonstrate
            what is possible when engineering meets design. Every project on this
            site is a step in that direction.
          </p>
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

export default Vision
