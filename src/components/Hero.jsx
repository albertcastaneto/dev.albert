import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Hero({ onResumeClick }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl
        .to('.gsap-hero-badge', { opacity: 1, y: 0, duration: .6, delay: .2 }, 0)
        .fromTo('.gsap-hero-line', { opacity: 0, y: 60, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, duration: .9, stagger: .12 }, 0.3)
        .to('.gsap-hero-sub',  { opacity: 1, y: 0, duration: .6 }, 0.7)
        .to('.gsap-hero-desc', { opacity: 1, y: 0, duration: .7 }, 0.85)
        .to('.gsap-hero-cta',  { opacity: 1, y: 0, duration: .6 }, 1.0)
        .to('.gsap-hero-img',  { opacity: 1, scale: 1, duration: .9, ease: 'back.out(1.4)' }, 0.5)
    }, sectionRef)

    const section = sectionRef.current
    let rafId

    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
        document.querySelectorAll('.parallax-slow').forEach(el => {
          el.style.transform = `translate(${dx * -10}px,${dy * -10}px)`
        })
        document.querySelectorAll('.parallax-fast').forEach(el => {
          el.style.transform = `translate(${dx * 18}px,${dy * 10}px)`
        })
      })
    }

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId)
      document.querySelectorAll('.parallax-slow, .parallax-fast').forEach(el => {
        el.style.transition = 'transform 0.6s ease'
        el.style.transform = ''
        setTimeout(() => { el.style.transition = '' }, 600)
      })
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      ctx.revert()
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-content">
        <div className="hero-badge gsap-hero-badge">
          <div className="badge-dot"></div> Available for work
        </div>
        <h1>
          <span className="gsap-hero-line">Solving</span>
          <span className="gsap-hero-line line-outline">Business</span>
          <span className="gsap-hero-line line-amber">With Systems.</span>
        </h1>
        <p className="hero-sub gsap-hero-sub">Software Developer — Enterprise Systems</p>
        <p className="hero-desc gsap-hero-desc">
          Hi, I'm Albert — a Software Developer focused on building internal enterprise systems. I design and develop production-ready platforms — from <strong>approval workflows</strong> and <strong>performance management systems</strong> to <strong>sales dashboards</strong> — using ASP.NET Core, SQL Server, and clean architecture principles.
        </p>
        <div className="cta-group gsap-hero-cta">
          <a href="#contact" className="cta cta-primary">Let's Talk</a>
          <button className="cta cta-secondary" onClick={onResumeClick}>
            <i className='bx bx-download'></i> View Resume
          </button>
        </div>
      </div>

      <div className="hero-image gsap-hero-img">
        <div className="profile-wrap parallax-slow">
          <div className="orbit-ring">
            <div className="orbit-dot"></div>
          </div>
          <div className="profile-photo">
            <img
              src="me.png"
              alt="Albert Castañeto"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => e.target.style.display = 'none'}
            />
          </div>
          <div className="float-chip float-chip-1 parallax-fast"><i className='bx bx-code-curly'></i> ASP.NET Core</div>
          <div className="float-chip float-chip-2 parallax-fast"><i className='bx bx-data'></i> SQL Server</div>
          <div className="float-chip float-chip-3 parallax-fast"><i className='bx bx-code'></i> JavaScript</div>
          <div className="float-chip float-chip-4 parallax-fast"><i className='bx bx-bar-chart'></i> Bootstrap</div>
          <div className="float-chip float-chip-5 parallax-fast"><i className='bx bx-code-alt'></i> C#</div>
        </div>
      </div>
    </section>
  )
}

export default Hero