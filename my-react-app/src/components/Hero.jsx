import { useEffect, useState } from 'react'
import './Hero.css'

const TITLES = [
  'Software Engineer',
  'Full Stack Developer',
  'Problem Solver',
  'Builder of Things',
]

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = TITLES[titleIndex]
    let timeout

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 80)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, 45)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setTitleIndex((titleIndex + 1) % TITLES.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, titleIndex])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }} />
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hey, I&apos;m</p>
          <h1 className="hero-name">Nate Zajac.</h1>
          <div className="hero-title-wrap">
            <span className="hero-title">{displayed}</span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-tagline">
            I build clean, fast, and impactful software.
          </p>
          <div className="hero-cta">
            <a href="#experience" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-outline">Get In Touch</a>
          </div>
        </div>
        <div className="hero-photo-wrap">
          <div className="hero-photo-ring" />
          <img
            src={`${import.meta.env.BASE_URL}profile.jpg`}
            alt="Nate Zajac"
            className="hero-photo"
            onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }}
          />
          <div className="hero-photo-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            <span>Add photo as<br/>public/profile.jpg</span>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span />
      </div>
    </section>
  )
}
