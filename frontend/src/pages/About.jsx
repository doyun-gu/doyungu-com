import './About.css'
import './Home.css'

const timelineEvents = [
  { year: '2022', desc: 'Joined University of Manchester' },
  { year: '2023', desc: 'Year 2 at University of Manchester' },
  { year: '2024', desc: 'Placement year at Aston Martin' },
  { year: '2025', desc: 'Year 3 at University of Manchester' },
  { year: '2026', desc: 'Still on going!' },
]

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

        <div className="page-section about-intro">
          <p>
            Hello! Welcome to doyungu.com. I'm Doyun Gu, a final-year Electrical and Electronics
            Engineering student at the University of Manchester, returning from a placement year at
            Aston Martin.
          </p>
          <p>I'm currently working on two projects in parallel:</p>
          <ol className="about-projects">
            <li>
              <strong>Project JULY</strong> — An automated agriculture system, serving as my
              3rd-year individual project
            </li>
            <li>
              <strong>Dynamic Phasor Simulation Framework</strong> — A circuit simulation research
              project using instantaneous dynamic phasor methods
            </li>
          </ol>
          <p>
            My current focus spans embedded system development, schematic and PCB design for Project
            JULY, and building a simulation framework that makes it easy for anyone to model and test
            resonant circuits. I'm driven by two passions: making food production more accessible
            through automation, and contributing to the electrical engineering community with tools
            that lower the barrier to circuit simulation and learning.
          </p>
        </div>

        <div className="page-section">
          <h3>My Journey</h3>

          <div className="about-journey">
            <div className="about-timeline">
              {timelineEvents.map((event) => (
                <div key={event.year} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">
                    <span className="timeline-year">{event.year}</span>
                    <span className="timeline-desc">{event.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-journey-text">
              <p>
                This all started in 2022 when I joined the BEng programme at Manchester. My
                interests centre on circuit design, power electronics, and robotics — particularly
                sensing and embedded systems.
              </p>
              <p>
                In 2024, I joined Aston Martin as a Software and Electronics Technology Intern on
                the ADAS team. There, I developed a custom PCB bridging an STM32F microcontroller
                with vehicle sensors to collect real-time data from Aston Martin and competitor
                vehicles, producing numerical performance metrics for Adaptive Cruise Control (ACC)
                and Lane Centring (LC) features.
              </p>
              <p>
                Now in 2025–26, I'm back in Manchester for my final year. For Project JULY, I'm
                designing a custom board around the STM32F411RET microcontroller, writing bare-metal
                firmware using HAL drivers to read multiple agricultural sensors, control grow
                lighting up to 75 V, and drive water pumps via PWM.
              </p>
              <p>
                Alongside this, I'm pursuing a research project on dynamic phasor simulation with the
                support of Dr Gus. This work is still ongoing, more details to come as the framework
                matures.
              </p>
              <p>
                Thank you for reading, and I hope you have a great day! Have a look around and see if
                anything catches your interest.
              </p>
            </div>
          </div>
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
