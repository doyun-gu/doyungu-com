import { useParams, Link } from 'react-router-dom'
import BlogPost from '../components/BlogPost'
import visionPosts from '../data/vision-posts'
import './Home.css'

function VisionPost() {
  const { slug } = useParams()
  const post = visionPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="page-container">
        <p className="page-title">Post Not Found</p>
        <div className="page-section">
          <Link to="/vision" className="link-hover-effect blog-back-link">Back to Vision</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="page-container">
        <Link to="/vision" className="link-hover-effect blog-back-link">Back to Vision</Link>
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

export default VisionPost
