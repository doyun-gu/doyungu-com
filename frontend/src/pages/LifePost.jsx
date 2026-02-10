import { useParams, Link } from 'react-router-dom'
import BlogPost from '../components/BlogPost'
import lifePosts from '../data/life-posts'
import './Home.css'

function LifePost() {
  const { slug } = useParams()
  const post = lifePosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="page-container">
        <p className="page-title">Post Not Found</p>
        <div className="page-section">
          <Link to="/life" className="link-hover-effect blog-back-link">Back to Life</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="page-container">
        <Link to="/life" className="link-hover-effect blog-back-link">Back to Life</Link>
        <BlogPost post={post} />
      </div>

      <div className="dot-divider dot-divider-bottom">
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
      </div>
    </>
  )
}

export default LifePost
