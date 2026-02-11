import { useState } from 'react'
import './BlogPost.css'

/** Estimate reading time from content blocks (approx 200 wpm) */
function getReadingTime(content) {
  const text = content
    .map(b => b.value || b.caption || '')
    .join(' ')
    .replace(/[*`#]/g, '')
  const words = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

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

/** Simple syntax highlighter for JS-like code */
function highlightCode(code) {
  const TOKEN = /\/\/.*|\/\*[\s\S]*?\*\/|`[^`]*`|"[^"]*"|'[^']*'|\b(const|let|var|function|return|if|else|for|while|class|import|export|default|new|this|true|false|null|undefined|async|await|try|catch|throw|switch|case|break|continue|from|of|in)\b|\b\d+\.?\d*\b|\b[a-zA-Z_$]\w*(?=\s*\()/g

  const parts = []
  let last = 0
  let m

  while ((m = TOKEN.exec(code)) !== null) {
    if (m.index > last) parts.push(code.slice(last, m.index))
    const t = m[0]
    let cls
    if (t.startsWith('//') || t.startsWith('/*')) cls = 'syn-comment'
    else if (t.startsWith('"') || t.startsWith("'") || t.startsWith('`')) cls = 'syn-string'
    else if (m[1]) cls = 'syn-keyword'
    else if (/^\d/.test(t)) cls = 'syn-number'
    else cls = 'syn-func'
    parts.push(<span key={m.index} className={cls}>{t}</span>)
    last = TOKEN.lastIndex
  }

  if (last < code.length) parts.push(code.slice(last))
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
        <code>{highlightCode(value)}</code>
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
        <div className="blog-post-meta">
          {post.date && <span className="blog-post-date">{post.date}</span>}
          <span className="blog-post-reading-time">{getReadingTime(post.content)}</span>
        </div>
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
      <div className="blog-card-meta">
        {post.date && <span className="blog-card-date">{post.date}</span>}
        <span className="blog-card-reading-time">{getReadingTime(post.content)}</span>
      </div>
      <h3 className="blog-card-title">{post.title}</h3>
      {post.summary && <p className="blog-card-summary">{post.summary}</p>}
    </a>
  )
}

export default BlogPost
export { BlogCard, CodeBlock }
