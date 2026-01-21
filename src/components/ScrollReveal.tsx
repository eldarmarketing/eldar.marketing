import { ReactNode } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import './ScrollReveal.css'

interface ScrollRevealProps {
  children: ReactNode
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn'
  delay?: number
  className?: string
}

export default function ScrollReveal({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  className = '' 
}: ScrollRevealProps) {
  const { elementRef, isVisible } = useScrollReveal()

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-wrapper ${animation} ${isVisible ? 'is-revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}



