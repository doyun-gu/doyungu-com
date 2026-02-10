import './BlogPost.css'

function BlogBlock({ block }) {
  switch (block.type) {
    case 'text':
      return <p className="blog-text">{block.value}</p>
    case 'highlight':
      return <p className="blog-highlight">{block.value}</p>
    case 'heading':
      return <h3 className="blog-heading">{block.value}</h3>
    case 'image':
      return (
        <figure className="blog-figure">
          <img src={block.src} alt={block.alt || ''} className="blog-image" />
          {block.caption && <figcaption className="blog-caption">{block.caption}</figcaption>}
        </figure>
      )
    default:
      return null
  }
}

function BlogPost({ post }) {
  return (
    <article className="blog-post">
      <div className="blog-post-header">
        <h2 className="blog-post-title">{post.title}</h2>
        {post.date && <span className="blog-post-date">{post.date}</span>}
      </div>
      <div className="blog-post-body">
        {post.content.map((block, index) => (
          <BlogBlock key={index} block={block} />
        ))}
      </div>
    </article>
  )
}

export default BlogPost
