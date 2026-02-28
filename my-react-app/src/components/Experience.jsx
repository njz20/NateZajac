import { useEffect, useRef, useState } from 'react'
import './Experience.css'

const JOBS = [
  {
    title: 'Associate Consultant',
    company: 'Capgemini',
    period: 'July 2021 – Present',
    bullets: [
      'Implemented robust testing suites for the full tech stack on multiple projects',
      'Led migration from legacy system to modern stack for multiple clients (React)',
      'Collaborated with cross-functional teams in an agile environment to ship features on tight deadlines',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Guardian Life Insurance Company',
    period: 'September 2024 – April 2026',
    bullets: [
      'Developed RESTful APIs consumed by web and mobile clients',
      'Improved test coverage from 0 to above 80% in multiple repositories',
      'Participated in code reviews and contributed to internal tooling',
    ],
  },
    {
    title: 'Software Engineer',
    company: 'Discover',
    period: 'February 2022 – August 2024',
    bullets: [
      'Led migration of legacy application to a modern stack',
      'Improved test suite and coverage in all aspects (end-to-end, performance, integration, accessbility tests)',
      'Participated in code reviews and contributed to internal tooling',
    ],
  },
]

function JobCard({ job, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
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
        <ul className="job-bullets">
          {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
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
