import './Home.css'
import { BlogCard } from '../components/BlogPost'
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

        <div className="blog-grid">
          {lifePosts.map((post) => (
            <BlogCard key={post.slug} post={post} to={`/life/${post.slug}`} />
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

export default Life
