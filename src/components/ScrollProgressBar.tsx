import { useEffect, useState } from 'react'
import './ScrollProgressBar.css'

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      const totalScroll = documentHeight - windowHeight
      const progress = (scrollTop / totalScroll) * 100
      
      setScrollProgress(Math.min(progress, 100))
    }

    // Обновляем при скролле
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    
    // Инициализируем
    updateScrollProgress()

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="scroll-progress-bar">
      <div 
        className="scroll-progress-fill"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}



