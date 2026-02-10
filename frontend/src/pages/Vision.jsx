import './Home.css'
import { BlogCard } from '../components/BlogPost'
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

        <div className="blog-grid">
          {visionPosts.map((post) => (
            <BlogCard key={post.slug} post={post} to={`/vision/${post.slug}`} />
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

export default Vision
