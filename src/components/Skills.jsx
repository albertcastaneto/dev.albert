import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'ASP.NET Core MVC', context: 'Enterprise web applications, RBAC, dashboards', level: 92, tooltip: 'Primary daily framework — used across all 4 core systems' },
  { name: 'SQL Server', context: 'Query optimization, reporting, data modeling', level: 88, tooltip: 'Complex queries, stored procedures, performance tuning' },
  { name: 'Repository Pattern', context: 'Clean architecture, separation of concerns', level: 85, tooltip: 'Applied in production — enforces clean data access layers' },
  { name: 'Dashboards & Reports', context: 'Operational reporting, real-time data views', level: 80, tooltip: 'Built interactive dashboards for sales and performance systems' },
  { name: 'Excel / PDF Mapping', context: 'Bulk data pipelines, form automation, reporting', level: 82, tooltip: 'EPPlus + PDF mapping — used in Pag-IBIG auto-fill and sales reporting' },
  { name: 'Auth & Role-Based Access', context: 'Authentication flows, permission systems', level: 87, tooltip: 'Granular RBAC — different access levels per role across systems' },
]

function Skills() {
  useEffect(() => {
    // Set everything visible first
    document.querySelectorAll('.skill-row').forEach(row => {
      gsap.set(row, { opacity: 1, x: 0 })
    })
    document.querySelectorAll('.skill-bar').forEach(bar => {
      gsap.set(bar, { width: '0%' })
    })

    ScrollTrigger.create({
      trigger: '#skillsList', start: 'top 80%', once: true,
      onEnter: () => {
        document.querySelectorAll('.skill-bar').forEach((bar, i) => {
          gsap.to(bar, {
            width: bar.dataset.w + '%',
            duration: 1.4, delay: i * .1, ease: 'power2.out'
          })
        })
        document.querySelectorAll('.skill-row').forEach((row, i) => {
          gsap.fromTo(row,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: .7, delay: i * .1, ease: 'power2.out' }
          )
        })
      }
    })
  }, [])

  return (
    <section id="skills">
      <div className="skills-layout">
        <div className="skills-sticky">
          <p className="section-eyebrow">Stack</p>
          <h2 className="section-title" style={{ marginBottom: '18px' }}>Technical<br />Depth</h2>
          <p>Technologies and tools I use to build and maintain production systems — focused on backend development, data handling, and system reliability. Every skill here is production-tested in real enterprise contexts.</p>
        </div>
        <div className="skills-list" id="skillsList">
          {skills.map((skill, i) => (
            <div className="skill-row" key={i}>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-context">{skill.context}</span>
              </div>
              <div className="skill-bar-wrap">
                <div className="skill-bar" data-w={skill.level}></div>
              </div>
              <span className="skill-level" data-tooltip={skill.tooltip}>
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills