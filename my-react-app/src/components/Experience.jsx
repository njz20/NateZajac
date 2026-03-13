import { useEffect, useRef, useState } from 'react'
import './Experience.css'

const JOBS = [
  {
    title: 'Frontend Software Engineer – React/TypeScript Consultant',
    company: 'Capgemini',
    period: 'July 2021 – Present',
    bullets: [],
    placements: [
      {
        title: 'Frontend Software Engineer',
        client: 'Guardian Life Insurance Company',
        period: '2024 – Present',
        bullets: [
          'Lead front-end React development on a large agile team, translating Figma designs into pixel-perfect, responsive components',
          'Established unit testing practices from the ground up using Jest, growing code coverage from 0% to 80% across the frontend codebase',
          'Championed adoption of AI-powered development tools across the team, measurably boosting team productivity',
        ],
      },
      {
        title: 'Frontend Software Engineer',
        client: 'Discover Financial Services',
        period: '2022 – 2024',
        bullets: [
          'Led React/TypeScript frontend development during migration of a legacy application to modern architecture, improving maintainability and performance',
          'Served as lead developer in a cross-functional agile team, coordinating sprints and delivering features on schedule',
          'Owned unit, end-to-end, and accessibility testing strategy using Jest and Playwright, growing code coverage from 0% to 90%',
        ],
      },
    ],
  },
]

function PlacementCard({ placement }) {
  return (
    <div className="placement-card">
      <div className="placement-header">
        <div>
          <h4 className="placement-title">{placement.title}</h4>
          <p className="placement-client">{placement.client}</p>
        </div>
        <span className="job-period">{placement.period}</span>
      </div>
      <ul className="job-bullets">
        {placement.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  )
}

function JobCard({ job, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`job-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="job-dot" />
      <div className="job-body">
        <div className="job-header">
          <div>
            <h3 className="job-title">{job.title}</h3>
            <p className="job-company">{job.company}</p>
          </div>
          <span className="job-period">{job.period}</span>
        </div>
        {job.bullets.length > 0 && (
          <ul className="job-bullets">
            {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
        {job.placements && (
          <div className="placements">
            <p className="placements-label">Client Placements</p>
            {job.placements.map((p, i) => (
              <PlacementCard key={i} placement={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {JOBS.map((job, i) => (
            <JobCard key={i} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
