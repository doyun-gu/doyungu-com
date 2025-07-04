import { Link } from 'react-router-dom'
import React from 'react'
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
        <Link to="/about">About</Link>
        <Link to="/life">Life</Link>
        <Link to="/project">Project</Link>
        <Link to="/vision">Vision</Link>
      </div>
    </>
  )
}

export default Home
