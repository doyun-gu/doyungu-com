import { Link } from 'react-router-dom'
import './Projects.css'

const STATUS_LABEL = {
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
}

const projects = [
  {
    to: '/july',
    title: 'Project JULY',
    date: 'July 2025 – Present',
    description: 'Building the best JULY model for AI-based farming.',
    image: '/images/spec-posts/july/JULY-V1-3D.jpg',
    status: 'active',
  },
  {
    to: '/circuit-sim',
    title: 'Circuit Simulation',
    date: 'Coming Soon',
    description: 'Circuit simulation and analysis project.',
    image: '/images/spec-posts/circuit-sim/TAB_col_white_background.png',
    status: 'active',
  },
  {
    to: '/spyder',
    title: 'SPYDER',
    date: '2023-2024',
    description: 'Building the best SPYDER model for AI-based farming.',
    status: 'paused',
  },
  {
    to: '/bvat',
    title: 'BVAT at Aston Martin',
    date: 'Sept 2024 – Sept 2025',
    description: 'This is a tester GUI for BVAT at Aston Martin.',
    image: '/images/spec-posts/bvat/aml-logo.png',
    status: 'completed',
  },
  {
    to: '/hackathon',
    title: 'Hackathon',
    date: 'March 2025',
    description: 'This app fetched live data from Raspberry Pi 5 during the event.',
    status: 'completed',
  },
]

function Projects() {
  return (
    <>
      <div className="page-container project-page">
        <p className="page-title">Projects</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <Link key={project.to} to={project.to} className="project-card">
              <div className="project-card-preview">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="project-card-image" />
                ) : (
                  <div className="project-card-placeholder" />
                )}
              </div>
              <div className="project-card-body">
                <div className="project-card-meta">
                  <span className={`project-card-status ${project.status}`}>
                    {STATUS_LABEL[project.status]}
                  </span>
                  <span className="project-card-date">{project.date}</span>
                </div>
                <h2 className="project-card-title">{project.title}</h2>
                <p className="project-card-description">{project.description}</p>
                <span className="project-card-arrow">View project &#8594;</span>
              </div>
            </Link>
          ))}
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
