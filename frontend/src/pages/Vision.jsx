import './Home.css'
import BlogPost from '../components/BlogPost'
import visionPosts from '../data/vision-posts'

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

        {visionPosts.map((post, index) => (
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

export default Vision
