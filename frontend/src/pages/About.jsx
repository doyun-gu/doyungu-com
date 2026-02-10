import { Link } from 'react-router-dom'
import './Home.css'

function About() {
  return (
    <>
      <div className="page-container">
        <p className="page-title">About</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <div className="page-section">
          <h3>Who I Am</h3>
          <p>
            I am Doyun Gu — an engineer, builder, and problem solver based in the UK.
            I am passionate about designing systems that make a real impact, from
            data-driven tools to intelligent automation.
          </p>
        </div>

        <div className="page-section">
          <h3>What I Do</h3>
          <p>
            I work at the intersection of software engineering and data science,
            building tools that turn complex data into clear, actionable insights.
            My experience spans from vehicle testing at Aston Martin to developing
            AI-based farming solutions.
          </p>
        </div>

        <div className="page-section">
          <h3>Education</h3>
          <ul>
            <li>University of Manchester</li>
            <li>Coventry University</li>
          </ul>
        </div>

        <div className="page-section">
          <h3>Skills</h3>
          <ul>
            <li>Python, JavaScript, React</li>
            <li>Data Visualisation & Analysis</li>
            <li>Machine Learning & AI</li>
            <li>Embedded Systems & IoT</li>
          </ul>
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

export default About
