import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'

function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark]
}

function Navbar({ dark, onToggle }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">NZ.</a>
      <ul className="nav-links">
        <li><a href="#experience">Experience</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
        {dark ? '☀️' : '🌙'}
      </button>
    </nav>
  )
}

export default function App() {
  const [dark, setDark] = useTheme()

  return (
    <>
      <Navbar dark={dark} onToggle={() => setDark(d => !d)} />
      <Hero />
      <Experience />
      <Skills />
      <Contact />
      <footer className="footer">
        Built with <span>♥</span> by Nate Zajac &mdash; {new Date().getFullYear()}
      </footer>
    </>
  )
}
