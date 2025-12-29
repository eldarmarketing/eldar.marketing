import { useRef, useEffect } from 'react'
import { COMPANY } from '../constants/data'
import './LogoAnimations.css'

interface AnimatedLogoProps {
  variant?: 
    | 'draw' 
    | 'fade-slide' 
    | 'glitch' 
    | 'breathing' 
    | 'glow' 
    | 'morph'
    | 'split-reveal'
    | 'magnetic'
    | 'parallax'
    | 'rainbow'
    | 'advanced'
  className?: string
}

export default function AnimatedLogo({ 
  variant = 'advanced',
  className = '' 
}: AnimatedLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null)

  // Магнитный эффект
  useEffect(() => {
    if (variant !== 'magnetic') return

    const logo = logoRef.current
    if (!logo) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = logo.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * 0.15
      const deltaY = (e.clientY - centerY) * 0.15
      
      logo.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }

    const handleMouseLeave = () => {
      logo.style.transform = 'translate(0, 0)'
    }

    logo.addEventListener('mousemove', handleMouseMove)
    logo.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      logo.removeEventListener('mousemove', handleMouseMove)
      logo.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [variant])

  const variantClass = `logo-${variant}`

  return (
    <div 
      ref={logoRef}
      className={`${variantClass} ${className}`}
    >
      <img 
        src="/logo.svg" 
        alt={COMPANY.name} 
        className="logo-img"
      />
    </div>
  )
}

