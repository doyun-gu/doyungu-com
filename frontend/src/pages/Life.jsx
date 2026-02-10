import { Link } from 'react-router-dom'
import './Home.css'

function Life() {
  return (
    <>
      <div className="page-container">
        <p className="page-title">Life</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <div className="page-section">
          <h3>Beyond the Code</h3>
          <p>
            When I am not building software, I am exploring the world around me.
            I believe that living a full life outside of work is what fuels
            creativity and fresh thinking inside of it.
          </p>
        </div>

        <div className="page-section">
          <h3>Interests</h3>
          <ul>
            <li>Motorsport & Automotive Engineering</li>
            <li>Photography & Visual Storytelling</li>
            <li>Travelling & Discovering New Cultures</li>
            <li>Fitness & Wellbeing</li>
          </ul>
        </div>

        <div className="page-section">
          <h3>Places</h3>
          <p>
            Currently based between Coventry and Manchester, I enjoy
            the energy of city life while staying connected to the
            engineering heartland of the UK.
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

export default Life
