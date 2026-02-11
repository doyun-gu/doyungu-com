import './Home.css'
import '../components/BlogPost.css'

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
          <h3>Introduction</h3>
          <p>
            This page is where I share my vision — the ideas and experiences that shape how I
            think about engineering and where I want to take it.
          </p>
          <p>
            I believe <em>engineering on its own</em> isn't what makes something great.{' '}
            <mark className="blog-highlight">Its true power emerges when it's combined with
            broader perspectives</mark> — an understanding of people, culture, and purpose. I'm
            fortunate to have interests that stretch well beyond the technical: I enjoy{' '}
            <strong>music and the arts</strong>, and I often turn to them to clear my head and
            organise my thoughts. Listening to <em>classical music</em>, in particular, gives me
            space to reflect. These influences shape how I approach my work, and I'd like to
            share a bit of that here.
          </p>
        </div>

        <div className="page-section">
          <h3>Artistic Engineering</h3>
          <p>
            I see{' '}
            <mark className="blog-highlight">engineering as a form of modern art</mark>.
            Engineers can optimise for performance — that much is expected — but the products
            that truly resonate carry something deeper: <em>a story, a belief, a sense of
            purpose</em>. This way of thinking pushes me to consider the narrative behind every
            project I work on, and it's what keeps me motivated to see them through.
          </p>
          <p>
            My decision to study <strong>Electrical and Electronics Engineering</strong> was, in
            truth, somewhat spontaneous. I had been leaning towards <em>Computer Science</em>,
            but I also enjoyed building physical things. Electrical engineering felt like the
            perfect middle ground — a discipline where I could work with both the{' '}
            <em>tangible</em> and the <em>abstract</em>. I was lucky that I genuinely fell in
            love with the subject, and with the process of understanding electrical principles
            well enough to turn them into real products.
          </p>
          <p>
            Before my placement year at <strong>Aston Martin</strong>, I assumed that great
            engineering performance was what customers valued most. I was wrong.{' '}
            <mark className="blog-highlight">Performance is a baseline expectation. What
            customers truly care about is the history, the design philosophy, and the story
            behind what they're buying.</mark> That realisation fundamentally changed how I think
            about my work.
          </p>
        </div>

        <div className="page-section">
          <h3>Project Vision</h3>
          <p>
            My current projects span two fields: <strong>agriculture</strong> and{' '}
            <strong>power electronics</strong>. As a student, I don't see these as vastly
            different domains — both require me to apply what I've learned to solve specific,
            real-world problems.
          </p>
          <p>
            This path isn't entirely new to me. My grandparents are farmers, and I grew up
            visiting their farm on weekends, helping out wherever I could. That connection to
            the land has stayed with me. My ultimate goal is to{' '}
            <mark className="blog-highlight">combine power electronics and computational
            methods to support farmers — to help maximise crop yields and make food more
            accessible to everyone</mark>.
          </p>
          <p>
            I'm still in the early stages of this journey, but it's the thread that ties my
            projects together. Whether I'm working on <em>agricultural automation</em> or{' '}
            <em>circuit simulation</em>, I believe these experiences are building towards
            something meaningful — a future where the tools I develop can make a{' '}
            <strong>real difference</strong> for the people who feed us.
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
