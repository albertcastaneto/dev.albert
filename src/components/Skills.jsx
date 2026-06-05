import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const backendSkills = [
  { name: 'ASP.NET Core MVC', context: 'Enterprise web applications, RBAC, dashboards', level: 92, tooltip: 'Primary daily framework — used across all core systems' },
  { name: 'C# / .NET', context: 'Business logic, EF Core, dependency injection', level: 90, tooltip: 'Core language — used across all backend and data layers' },
  { name: 'SQL Server', context: 'Query optimization, stored procedures, data modeling', level: 88, tooltip: 'Complex queries, stored procedures, performance tuning' },
  { name: 'Entity Framework Core', context: 'ORM, migrations, repository pattern', level: 85, tooltip: 'Applied in production — enforces clean data access layers' },
  { name: 'Auth & Role-Based Access', context: 'Authentication flows, permission systems', level: 87, tooltip: 'Granular RBAC — different access levels per role across systems' },
  { name: 'Excel / PDF Mapping', context: 'Bulk data pipelines, form automation, reporting', level: 82, tooltip: 'EPPlus + PDF mapping — used in Pag-IBIG auto-fill and sales reporting' },
]

const frontendSkills = [
  { name: 'JavaScript / jQuery', context: 'DOM manipulation, AJAX, dynamic UI interactions', level: 78, tooltip: 'Used across all system UIs — forms, dashboards, live data' },
  { name: 'Bootstrap', context: 'Responsive layouts, component systems', level: 82, tooltip: 'Primary CSS framework for all system interfaces and websites' },
  { name: 'HTML5 / CSS3', context: 'Semantic markup, responsive design, layouts', level: 80, tooltip: 'Foundation of all frontend work — clean, accessible markup' },
  { name: 'Responsive Web Design', context: 'Mobile-first layouts, cross-browser compatibility', level: 78, tooltip: 'Applied on both internal systems and client-facing websites' },
  { name: 'WordPress', context: 'Theme customization, plugin setup, CMS', level: 70, tooltip: 'Setup and customization for business websites' },
]

function SkillGroup({ skills, idPrefix }) {
  return (
    <div className="skills-list" id={idPrefix}>
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
            {skill.level}%
          </span>
        </div>
      ))}
    </div>
  )
}

function Skills() {
  useEffect(() => {
    document.querySelectorAll('.skill-row').forEach(row => {
      gsap.set(row, { opacity: 1, x: 0 })
    })
    document.querySelectorAll('.skill-bar').forEach(bar => {
      gsap.set(bar, { width: '0%' })
    })

    const animateGroup = (triggerId) => {
      ScrollTrigger.create({
        trigger: `#${triggerId}`, start: 'top 80%', once: true,
        onEnter: () => {
          const bars = document.querySelectorAll(`#${triggerId} .skill-bar`)
          const rows = document.querySelectorAll(`#${triggerId} .skill-row`)
          bars.forEach((bar, i) => {
            gsap.to(bar, { width: bar.dataset.w + '%', duration: 1.4, delay: i * .1, ease: 'power2.out' })
          })
          rows.forEach((row, i) => {
            gsap.fromTo(row,
              { opacity: 0, x: 30 },
              { opacity: 1, x: 0, duration: .7, delay: i * .1, ease: 'power2.out' }
            )
          })
        }
      })
    }

    animateGroup('skillsBackend')
    animateGroup('skillsFrontend')
  }, [])

  return (
    <section id="skills">
      <div className="skills-layout">
        <div className="skills-sticky">
          <p className="section-eyebrow">Stack</p>
          <h2 className="section-title" style={{ marginBottom: '18px' }}>Technical<br />Depth</h2>
          <p>Technologies I use to build and ship production systems and professional websites. Backend expertise covers enterprise applications and database design. Frontend skills cover responsive layouts, interactive interfaces, and client-facing sites.</p>
        </div>
        <div>
          <p className="skills-group-label">Backend &amp; Database</p>
          <SkillGroup skills={backendSkills} idPrefix="skillsBackend" />

          <p className="skills-group-label" style={{ marginTop: '32px' }}>Frontend &amp; Tools</p>
          <SkillGroup skills={frontendSkills} idPrefix="skillsFrontend" />
        </div>
      </div>
    </section>
  )
}

export default Skills
