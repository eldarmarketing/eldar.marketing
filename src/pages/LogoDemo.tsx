import { useState } from 'react'
import '../components/LogoAnimations.css'
import './LogoDemo.css'

const animations = [
  { id: 'advanced', name: 'Advanced', description: '⭐ Рекомендуется! Комбинированная анимация - загрузка + hover' },
  { id: 'draw', name: 'Draw Animation', description: '🎨 Эффектная отрисовка контура логотипа' },
  { id: 'fade-slide', name: 'Fade + Slide', description: '✨ Классическое появление с fade эффектом' },
  { id: 'glitch', name: 'Glitch Effect', description: '⚡ Современный технологичный эффект глитча' },
  { id: 'glow', name: 'Hover Glow', description: '💎 Элегантное свечение при наведении' },
  { id: 'breathing', name: 'Breathing', description: '🫁 Тонкая пульсирующая анимация' },
  { id: 'morph', name: 'Morphing', description: '🌀 Морфинг при наведении' },
  { id: 'split-reveal', name: 'Split Reveal', description: '🎬 Кинематографичное появление' },
  { id: 'parallax', name: 'Parallax Layers', description: '📐 Многослойный эффект глубины' },
  { id: 'rainbow', name: 'Rainbow', description: '🌈 Радужный градиент (смело!)' },
]

export default function LogoDemo() {
  const [selectedAnimation, setSelectedAnimation] = useState('advanced')
  const [key, setKey] = useState(0)

  const replayAnimation = () => {
    setKey(prev => prev + 1)
  }

  return (
    <div className="logo-demo-page">
      <div className="demo-container">
        <header className="demo-header">
          <h1>🎨 Анимации логотипа</h1>
          <p>Выберите анимацию для предварительного просмотра</p>
        </header>

        <div className="demo-preview">
          <div className="preview-card">
            <div 
              key={key}
              className={`logo-preview logo-${selectedAnimation}`}
            >
              <img src="/logo.svg" alt="Eldar Marketing Logo" />
            </div>
            <button 
              className="replay-btn"
              onClick={replayAnimation}
            >
              🔄 Повторить анимацию
            </button>
          </div>
        </div>

        <div className="demo-grid">
          {animations.map(animation => (
            <button
              key={animation.id}
              className={`demo-card ${selectedAnimation === animation.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedAnimation(animation.id)
                replayAnimation()
              }}
            >
              <h3>{animation.name}</h3>
              <p>{animation.description}</p>
              <div className="demo-code">
                <code>logo-{animation.id}</code>
              </div>
            </button>
          ))}
        </div>

        <div className="demo-instructions">
          <h2>📝 Как использовать</h2>
          <div className="instruction-card">
            <h3>1. В Header.tsx добавьте класс:</h3>
            <pre><code>{`<Link to="/" className="logo logo-${selectedAnimation}">`}</code></pre>
          </div>
          <div className="instruction-card">
            <h3>2. Или используйте компонент:</h3>
            <pre><code>{`<AnimatedLogo variant="${selectedAnimation}" />`}</code></pre>
          </div>
          <a 
            href="/LOGO_ANIMATION_GUIDE.md" 
            className="guide-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            📚 Открыть полное руководство
          </a>
        </div>
      </div>
    </div>
  )
}



