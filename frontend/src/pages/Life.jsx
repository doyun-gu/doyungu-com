import './Home.css'
import BlogPost from '../components/BlogPost'
import lifePosts from '../data/life-posts'

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

        {lifePosts.map((post, index) => (
          <BlogPost key={index} post={post} />
        ))}
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
