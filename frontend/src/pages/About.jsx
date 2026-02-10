import './About.css'
import './Home.css'
import '../components/BlogPost.css'

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
          <img
            src="/images/doyungu.JPG"
            alt="Doyun Gu"
            className="about-photo"
          />
          <p>
            Hello! Welcome to doyungu.com. I'm <strong>Doyun Gu</strong>, a final-year{' '}
            <em>Electrical and Electronics Engineering</em> student at the{' '}
            <strong>University of Manchester</strong>, returning from a placement year at{' '}
            <strong>Aston Martin</strong>.
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
            My current focus spans <em>embedded system development</em>, schematic and PCB design
            for Project JULY, and building a simulation framework that makes it easy for anyone to
            model and test resonant circuits. I'm driven by two passions:{' '}
            <mark className="blog-highlight">making food production more accessible through
            automation</mark>, and contributing to the electrical engineering community with tools
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
                This all started in <strong>2022</strong> when I joined the BEng programme at
                Manchester. My interests centre on <em>circuit design</em>,{' '}
                <em>power electronics</em>, and <em>robotics</em> — particularly sensing and
                embedded systems.
              </p>
              <p>
                In <strong>2024</strong>, I joined <strong>Aston Martin</strong> as a{' '}
                <em>Software and Electronics Technology Intern</em> on the ADAS team. There, I
                developed a custom PCB bridging an <strong>STM32F</strong> microcontroller with
                vehicle sensors to collect real-time data from Aston Martin and competitor vehicles,
                producing numerical performance metrics for{' '}
                <em>Adaptive Cruise Control (ACC)</em> and <em>Lane Centring (LC)</em> features.
              </p>
              <p>
                Now in <strong>2025–26</strong>, I'm back in Manchester for my final year. For{' '}
                <strong>Project JULY</strong>, I'm designing a custom board around the{' '}
                <strong>STM32F411RET</strong> microcontroller, writing bare-metal firmware using HAL
                drivers to read multiple agricultural sensors, control grow lighting up to 75 V, and
                drive water pumps via PWM.
              </p>
              <p>
                Alongside this, I'm pursuing a research project on{' '}
                <em>dynamic phasor simulation</em> with the support of <strong>Dr Gus</strong>.
                This work is still ongoing, more details to come as the framework matures.
              </p>
              <p>
                Thank you for reading, and I hope you have a great day!{' '}
                <mark className="blog-highlight">Have a look around and see if anything catches
                your interest.</mark>
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
