import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const SKILLS = [
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 80 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Git', level: 90 },
  { name: 'Docker', level: 65 },
  { name: 'AWS', level: 60 },
  { name: 'REST APIs', level: 85 },
  { name: 'Testing', level: 75 },
  { name: 'CI/CD', level: 65 },
]

function SkillBar({ name, level, visible, index }) {
  return (
    <div
      className={`skill-item ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <div className="skill-label">
        <span>{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: visible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="skills section" id="skills" ref={ref}>
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} {...s} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
