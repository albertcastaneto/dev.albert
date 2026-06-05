import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function About() {
  useEffect(() => {
    gsap.fromTo('.stat-box',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: .1, duration: .7, ease: 'power2.out',
        scrollTrigger: { trigger: '.stats-row', start: 'top 85%', toggleActions: 'play none none none' }
      }
    )

    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target)
      const suffix = el.dataset.suffix || ''
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target, duration: 1.8, ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val) + suffix
            }
          })
        }
      })
    })

    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      gsap.set(item, { opacity: 1, x: 0 })
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 95%', toggleActions: 'play none none none' },
        opacity: 0, x: -40, duration: .8, delay: i * .1, ease: 'power2.out'
      })
    })

    gsap.utils.toArray('.t-impact-item').forEach((item, i) => {
      gsap.set(item, { opacity: 1, x: 0 })
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 98%', toggleActions: 'play none none none' },
        opacity: 0, x: -16, duration: .6, delay: i * .08, ease: 'power2.out'
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="about">
      <div className="about-inner">
        <p className="section-eyebrow">Background</p>
        <h2 className="section-title">Experience &amp;<br />Philosophy</h2>

        <p style={{ color: 'var(--muted)', fontSize: '.98rem', lineHeight: 1.8, marginBottom: '40px', maxWidth: '720px', fontWeight: 300 }}>
          I'm a Software Developer with two areas of focus: <strong style={{ color: 'var(--text)', fontWeight: 600 }}>enterprise business applications</strong> built with ASP.NET Core MVC and SQL Server, and <strong style={{ color: 'var(--text)', fontWeight: 600 }}>professional websites</strong> for businesses that need a strong online presence. Everything I ship is production-ready and built to be maintained long-term.
        </p>

        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-num" data-target="3" data-suffix="+">0</span>
            <span className="stat-label">Years Pro</span>
          </div>
          <div className="stat-box">
            <span className="stat-num" data-target="6" data-suffix="+">0</span>
            <span className="stat-label">Projects Shipped</span>
          </div>
          <div className="stat-box">
            <span className="stat-num" data-target="2">0</span>
            <span className="stat-label">Tech Tracks</span>
          </div>
          <div className="stat-box">
            <span className="stat-num" data-target="100" data-suffix="%">0</span>
            <span className="stat-label">Production</span>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="t-year">2025<br />–<br />NOW</div>
            <div>
              <p className="t-title">Software Developer</p>
              <p className="t-desc">Developing and maintaining enterprise systems including approval workflows, KRA-based performance evaluation (ePMS), sales management platforms, and automated government form processing used by internal teams daily.</p>
              <div className="t-impact">
                <span className="t-impact-item">Reduced manual processing by automating multi-level approval workflows</span>
                <span className="t-impact-item">Improved reporting efficiency through real-time dashboard systems</span>
                <span className="t-impact-item">Eliminated encoding errors via automated Pag-IBIG form filling</span>
                <span className="t-impact-item">Built tools actively relied on by internal teams every day</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="t-year">2023</div>
            <div>
              <p className="t-title">ASP.NET Core Engineer</p>
              <p className="t-desc">Designed and built ASP.NET Core MVC applications with authentication, role-based access control, interactive dashboards, and Excel-based data pipelines — focused on maintainability and production reliability.</p>
              <div className="t-impact">
                <span className="t-impact-item">Architected systems with clean separation of concerns and repository pattern</span>
                <span className="t-impact-item">Delivered Excel import/export pipelines handling real business data</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="t-year">2021</div>
            <div>
              <p className="t-title">Philosophy &amp; Foundation</p>
              <p className="t-desc">Focused on backend architecture, SQL performance optimization, and building maintainable systems designed for long-term use — prioritizing reliability over visual complexity. Real business value over impressive screenshots.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
