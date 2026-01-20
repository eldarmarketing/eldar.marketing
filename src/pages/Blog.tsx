import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '../constants/blogData'
import './Blog.css'

export default function Blog() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="blog-page">
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Блог о нейромаркетинге, вайбкодинге и оптимизации</h1>
          <p className="hero-subtitle">
            Практические статьи о том, как увеличить продажи, автоматизировать процессы и принимать решения на основе данных
          </p>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="container">
          <div className="blog-posts">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-header">
                  <div className="blog-meta">
                    <time className="blog-date">{formatDate(post.date)}</time>
                    <span className="blog-divider">•</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                  <div className="blog-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to={`/blog/${post.id}`} className="blog-card-link">
                  <h2 className="blog-card-title">{post.title}</h2>
                </Link>
                <p className="blog-card-description">{post.description}</p>
                <Link to={`/blog/${post.id}`} className="blog-read-more">
                  Читать полностью →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
