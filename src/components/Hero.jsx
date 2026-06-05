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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-content">
        <div className="hero-badge gsap-hero-badge">
          <div className="badge-dot"></div> Available for work
        </div>
        <h1>
          <span className="gsap-hero-line">I Build</span>
          <span className="gsap-hero-line line-outline">Systems &amp;</span>
          <span className="gsap-hero-line line-amber">Websites.</span>
        </h1>
        <p className="hero-sub gsap-hero-sub">ASP.NET Core · SQL Server · Web Development</p>
        <p className="hero-desc gsap-hero-desc">
          Hi, I'm Koi — a Software Developer who builds <strong>internal business systems</strong> and <strong>professional websites</strong>. I specialize in ASP.NET Core MVC, C#, and SQL Server for enterprise applications, and deliver clean, responsive websites for businesses that need a strong online presence.
        </p>
        <div className="cta-group gsap-hero-cta">
          <a href="#contact" className="cta cta-primary">Let's Talk</a>
          <a href="#projects" className="cta cta-secondary">
            <i className='bx bx-layer'></i> See My Work
          </a>
          {/* <button className="cta cta-secondary" onClick={onResumeClick}>
            <i className='bx bx-download'></i> View Resume
          </button> */}
        </div>
      </div>
    </section>
  )
}

export default Hero
