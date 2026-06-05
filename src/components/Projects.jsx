import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const enterpriseProjects = projects.filter(p => p.type === 'enterprise')
const webProjects = projects.filter(p => p.type === 'web')

function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-img">
        {project.img ? (
          <img
            src={project.img}
            alt={project.imgAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div className="project-img-placeholder">
            <i className={`bx ${project.icon}`}></i>
            <span>{project.url ? 'Web Project' : 'Internal System'}</span>
          </div>
        )}
        <span className="project-img-label">{project.label}</span>
        <div className="project-view-overlay">
          <span>
            <i className={`bx ${project.url ? 'bx-link-external' : 'bx-expand-alt'}`}></i>
            {project.url ? ' Live Site' : ' View Details'}
          </span>
        </div>
      </div>
      <div className="project-body">
        <div className="project-icon">
          <i className={`bx ${project.icon}`}></i>
        </div>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span className="tag" key={i}>{tag}</span>
          ))}
        </div>
        <div className="project-impact">
          <i className='bx bx-trending-up'></i> {project.impact}
        </div>
        {project.url ? (
          <a
            className="project-live-link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            <i className='bx bx-link-external'></i> View Live Site
          </a>
        ) : (
          <div className="project-private-badge">
            <i className='bx bx-lock-alt'></i> Private — Internal System
          </div>
        )}
      </div>
    </div>
  )
}

function Projects({ onProjectClick }) {
  const trackRef = useRef(null)
  const hasDragged = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    const trackWrap = track.parentElement
    let isDragging = false
    let startX, scrollLeft

    const onMouseDown = e => {
      isDragging = true
      hasDragged.current = false
      startX = e.pageX - track.offsetLeft
      scrollLeft = trackWrap.scrollLeft
      track.style.cursor = 'grabbing'
    }
    const onMouseLeave = () => { isDragging = false; track.style.cursor = 'grab' }
    const onMouseUp = () => { isDragging = false; track.style.cursor = 'grab' }
    const onMouseMove = e => {
      if (!isDragging) return
      e.preventDefault()
      if (Math.abs(e.pageX - track.offsetLeft - startX) > 5) hasDragged.current = true
      trackWrap.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.5
    }
    const onTouchStart = e => {
      startX = e.touches[0].pageX
      scrollLeft = trackWrap.scrollLeft
      hasDragged.current = false
    }
    const onTouchMove = e => {
      hasDragged.current = true
      trackWrap.scrollLeft = scrollLeft - (e.touches[0].pageX - startX)
    }

    track.style.cursor = 'grab'
    track.addEventListener('mousedown', onMouseDown)
    track.addEventListener('mouseleave', onMouseLeave)
    track.addEventListener('mouseup', onMouseUp)
    track.addEventListener('mousemove', onMouseMove)
    track.addEventListener('touchstart', onTouchStart)
    track.addEventListener('touchmove', onTouchMove)

    return () => {
      track.removeEventListener('mousedown', onMouseDown)
      track.removeEventListener('mouseleave', onMouseLeave)
      track.removeEventListener('mouseup', onMouseUp)
      track.removeEventListener('mousemove', onMouseMove)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove', onTouchMove)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section id="projects">

      {/* ── Enterprise Systems ── */}
      <div className="projects-header">
        <p className="section-eyebrow">Work</p>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Enterprise Systems</h2>
      </div>

      <div className="projects-track-wrap">
        <div className="projects-track" id="projectsTrack" ref={trackRef}>
          {enterpriseProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => {
                if (hasDragged.current) return
                onProjectClick(project)
              }}
            />
          ))}
        </div>
      </div>
      <div className="drag-hint">
        <i className='bx bx-right-arrow-alt'></i> Drag to explore &nbsp;·&nbsp; Click any card to view details
      </div>

      {/* ── Web Projects ── */}
      <div className="projects-header" style={{ marginTop: '72px' }}>
        <p className="section-eyebrow">Web</p>
        <h2 className="section-title" style={{ marginBottom: '32px' }}>Web Projects</h2>
      </div>

      <div className="web-projects-grid" style={{ padding: '0 var(--gutter)' }}>
        {webProjects.map(project => (
          <div key={project.id} className="web-project-card">
            <ProjectCard
              project={project}
              onClick={() => {
                if (project.url) {
                  window.open(project.url, '_blank', 'noopener,noreferrer')
                } else {
                  onProjectClick(project)
                }
              }}
            />
          </div>
        ))}
      </div>

    </section>
  )
}

export default Projects
