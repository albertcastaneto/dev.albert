import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

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

    if (window.innerWidth > 900) {
      const totalScroll = track.scrollWidth - trackWrap.offsetWidth
      gsap.to(trackWrap, {
        scrollLeft: totalScroll, ease: 'none',
        scrollTrigger: {
          trigger: '#projects', start: 'top top',
          end: () => `+=${totalScroll}`, pin: true, scrub: 1, anticipatePin: 1
        }
      })
    } else {
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          opacity: 0, y: 40, duration: .8, delay: i * .15, ease: 'power2.out'
        })
      })
    }

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
      <div className="projects-header">
        <p className="section-eyebrow">Work</p>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Core Systems</h2>
      </div>

      <div className="projects-track-wrap">
        <div className="projects-track" id="projectsTrack" ref={trackRef}>
          {projects.map((project) => (
            <div
              className="project-card"
              key={project.id}
              onClick={() => {
                if (hasDragged.current) return
                onProjectClick(project)
              }}
            >
              <div className="project-img">
                <img
                    src={project.img}
                    alt={project.imgAlt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <span className="project-img-label">{project.label}</span>
                <div className="project-view-overlay">
                    <span><i className='bx bx-expand-alt'></i> View Details</span>
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
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="drag-hint">
        <i className='bx bx-right-arrow-alt'></i> Drag to explore &nbsp;·&nbsp; Click any card to view details
      </div>
    </section>
  )
}

export default Projects