import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { BLOG_POSTS } from '../constants/blogData'
import './BlogPost.css'

export default function BlogPost() {
  const { postId } = useParams<{ postId: string }>()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const post = BLOG_POSTS.find((p) => p.id === postId)

  useEffect(() => {
    if (!post) return

    fetch(post.contentPath)
      .then((response) => response.text())
      .then((text) => {
        setContent(text)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading blog post:', error)
        setLoading(false)
      })
  }, [post])

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="blog-post-not-found">
            <h1>Статья не найдена</h1>
            <p>К сожалению, запрашиваемая статья не существует.</p>
            <Link to="/blog" className="btn btn-primary">
              Вернуться к блогу
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="blog-post-page">
      <article className="blog-post">
        <div className="container">
          <div className="blog-post-header">
            <Link to="/blog" className="blog-back-link">
              ← Все статьи
            </Link>
            <div className="blog-post-meta">
              <time className="blog-post-date">{formatDate(post.date)}</time>
              <span className="blog-divider">•</span>
              <span className="blog-post-read-time">{post.readTime}</span>
            </div>
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="blog-post-loading">
              <p>Загрузка статьи...</p>
            </div>
          ) : (
            <div className="blog-post-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          <div className="blog-post-footer">
            <Link to="/blog" className="btn btn-outline">
              ← Все статьи
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
