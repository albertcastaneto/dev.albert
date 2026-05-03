import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useToast } from '../context/ToastContext'

const RESUME_URL = '/me-resume.pdf'

function ResumeModal({ onClose }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const showToast = useToast()

  const [dlCount, setDlCount] = useState(
    parseInt(localStorage.getItem('resume_downloads') || '0')
  )

  useEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current

    gsap.set(overlay, { opacity: 0 })
    gsap.set(content, { y: 32, scale: 0.96, opacity: 0 })

    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(content, {
      y: 0, scale: 1, opacity: 1,
      duration: 0.4, ease: 'back.out(1.3)', delay: 0.05
    })

    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const handleClose = () => {
    const overlay = overlayRef.current
    const content = contentRef.current

    gsap.to(content, { y: 20, scale: 0.97, opacity: 0, duration: 0.22, ease: 'power2.in' })
    gsap.to(overlay, {
      opacity: 0, duration: 0.28, ease: 'power2.in',
      onComplete: onClose
    })
  }

  const handleDownload = () => {
    const newCount = dlCount + 1
    setDlCount(newCount)
    localStorage.setItem('resume_downloads', newCount)

    const a = document.createElement('a')
    a.href = RESUME_URL
    a.download = 'Albert_Castaneto_Resume.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    showToast('Resume download started!', 'success')
  }

  const handleOverlayClick = e => {
    if (e.target === overlayRef.current) handleClose()
  }

  return (
    <div
      ref={overlayRef}
      className="resume-modal active"
      onClick={handleOverlayClick}
    >
      <div ref={contentRef} className="resume-modal-content">
        <div className="resume-header">
          <h3>Resume Preview</h3>
          <button className="close-modal" onClick={handleClose}>
            <i className='bx bx-x'></i>
          </button>
        </div>

        <div className="resume-body">
          <iframe
            src={`${RESUME_URL}#toolbar=0`}
            style={{
                width: '100%',
                minHeight: '480px',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                display: 'block'
            }}
            title="Resume Preview"
            />
        </div>

        <div className="resume-footer">
          <div className="download-stats">
            <i className='bx bx-download'></i>
            <span>{dlCount} downloads</span>
          </div>
          <button className="cta cta-primary" onClick={handleDownload}>
            <i className='bx bx-download'></i> Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeModal