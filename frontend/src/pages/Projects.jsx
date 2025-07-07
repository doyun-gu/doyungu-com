import React from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'
import amlLogo from '../images/aml-logo.png'

function Projects() {
  return (
    <>
    <div className="project-container">
      <h1 className="project-title">List of Projects</h1>

      <div className="dot-divider">
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
      </div>

      <div className="project-grid">
        <Link to="/bvat" className="project-card">
          {/* <img src={amlLogo} alt="BVAT Project" className="project-image" /> */}
          <h2>BVAT at Aston Martin</h2>
          <p className="project-date">Sept 2024 – Sept 2025</p>
          <p className="project-description">This is a tester GUI for BVAT at Aston Martin.</p>
        </Link>

        <Link to="/hackathon" className="project-card">
          {/* <img src="/images/hackathon.jpg" alt="Hackathon" className="project-image" /> */}
          <h2>Hackathon</h2>
          <p className="project-date">March 2025</p>
          <p className="project-description">This app fetched live data from Raspberry Pi 5 during the event.</p>
        </Link>

        <Link to="/july" className="project-card">
          {/* <img src="/images/july.jpg" alt="Project July" className="project-image" /> */}
          <h2>Project JULY</h2>
          <p className="project-date">July 2025 – Present</p>
          <p className="project-description">Building the best JULY model for AI-based farming.</p>
        </Link>

        <Link to="/spyder" className="project-card">
          {/* <img src="/images/spyder.jpg" alt="SPYDER" className="project-image" /> */}
          <h2>SPYDER</h2>
          <p className="project-date">2023-2024 – Present</p>
          <p className="project-description">Building the best SPYDER model for AI-based farming.</p>
        </Link>
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

export default Projects
