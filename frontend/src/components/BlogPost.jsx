import { useState } from 'react'
import './BlogPost.css'

/**
 * Parses inline formatting:
 *   **bold**   → <strong>
 *   *italic*   → <em>
 *   `code`     → <code>
 */
function parseInline(text) {
  const parts = []
  const regex = /(`(.+?)`|\*\*(.+?)\*\*|\*(.+?)\*)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    if (match[2]) {
      parts.push(<code key={match.index} className="blog-inline-code">{match[2]}</code>)
    } else if (match[3]) {
      parts.push(<strong key={match.index}>{match[3]}</strong>)
    } else if (match[4]) {
      parts.push(<em key={match.index}>{match[4]}</em>)
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function CodeBlock({ value }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="blog-code-wrapper">
      <button className="blog-code-copy" onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="blog-code-block">
        <code>{value}</code>
      </pre>
    </div>
  )
}

function BlogBlock({ block }) {
  switch (block.type) {
    case 'text':
      return <p className="blog-text">{parseInline(block.value)}</p>
    case 'highlight':
      return (
        <p className="blog-text">
          <mark className="blog-highlight">{parseInline(block.value)}</mark>
        </p>
      )
    case 'heading':
      return <h3 className="blog-heading">{block.value}</h3>
    case 'code':
      return <CodeBlock value={block.value} />
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

/** Full blog post — used on detail pages */
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

/** Blog card — used on listing pages */
function BlogCard({ post, to }) {
  return (
    <a href={to} className="blog-card">
      {post.date && <span className="blog-card-date">{post.date}</span>}
      <h3 className="blog-card-title">{post.title}</h3>
      {post.summary && <p className="blog-card-summary">{post.summary}</p>}
    </a>
  )
}

export default BlogPost
export { BlogCard }
