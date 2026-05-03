import { useEffect } from 'react'

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [])

  if (!project) return null

  return (
    <div className="project-modal active" onClick={e => { if (e.target.classList.contains('project-modal')) onClose() }}>
      <div className="project-modal-content">
        <div className="pm-image">
          <img
            src={project.img}
            alt={project.imgAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <span className="pm-image-label">{project.label}</span>
          <button className="pm-close" onClick={onClose}>
            <i className='bx bx-x'></i>
          </button>
        </div>
        <div className="pm-body">
          <div className="pm-header">
            <div className="pm-icon">
              <i className={`bx ${project.icon}`}></i>
            </div>
            <div>
              <div className="pm-title">{project.title}</div>
              <div className="pm-subtitle">{project.subtitle}</div>
            </div>
          </div>
          <div className="pm-section">
            <div className="pm-section-label">Overview</div>
            <p className="pm-desc" dangerouslySetInnerHTML={{ __html: project.desc }} />
          </div>
          <div className="pm-section">
            <div className="pm-section-label">Key Features</div>
            <div className="pm-highlights">
              {project.highlights.map((h, i) => (
                <div className="pm-highlight" key={i}>{h}</div>
              ))}
            </div>
          </div>
          <div className="pm-section">
            <div className="pm-section-label">Stack</div>
            <div className="pm-tags">
              {project.tags.map((tag, i) => (
                <span className="pm-tag" key={i}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="pm-section">
            <div className="pm-section-label">Impact</div>
            <div className="pm-impact-box">
              <i className='bx bx-trending-up'></i>
              <p className="pm-impact-text">{project.impact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal