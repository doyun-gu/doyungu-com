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

        <div className="page-section">
          <p className="page-intro">
            Hello! This is my personal blog where I'd like to show you around my hobbies and personal stories of my life.
          </p>
          <p className="page-intro">
            Welcome to my Life Blog! This is where I share the things I enjoy beyond engineering from photography and badminton to travelling around the world. Here you'll find stories from my travels, photos with friends, and moments from my time studying in Manchester. Have a scroll through and take a peek into my life!
          </p>
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
